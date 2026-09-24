/**
 * Writes the `mm_attribution` cookie so developer.metamask.io can read
 * campaign tags from a docs.metamask.io landing.
 *
 * Keep this in sync with metamask-website `src/lib/hooks/use-attribution-cookie.js`.
 * Format matches the dashboard `readCookieTouch()` contract:
 * `{ "utm": { "utm_source": "…" }, "click": { "gclid": "…" }, "at": "<ISO>" }`
 */

const COOKIE_NAME = 'mm_attribution'
const COOKIE_MAX_AGE_DAYS = 90

/**
 * Ad-network click IDs to capture from the landing URL.
 * Matches the whitelist in the developer-dashboard attribution reader.
 */
const CLICK_ID_KEYS = ['gclid', 'twclid', 'fbclid', 'msclkid', 'ttclid', 'li_fat_id']

/**
 * UTM parameter keys to capture from the landing URL.
 */
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

/**
 * Bounds mirror the server-side limits in backend/pkg/auth/attribution.go
 * and the developer-dashboard reader. A stuffed cookie must not be able to
 * occupy every slot so a last-touch URL parameter is dropped.
 */
const MAX_UTM_PARAMS = 10
const MAX_CLICK_PARAMS = 10
const MAX_KEY_LENGTH = 34
const MAX_VALUE_LENGTH = 255
const UTM_KEY_PATTERN = /^utm_[a-z0-9_]{1,30}$/
const CLICK_KEY_PATTERN = /^[a-z0-9_]{1,40}$/

/**
 * Osano consent category that gates marketing-attribution storage.
 * Attribution (UTM + ad click IDs) is marketing tracking, so it must not be
 * persisted unless the visitor has accepted this category.
 */
const MARKETING_CATEGORY = 'MARKETING'

/**
 * Osano event fired once the CMP script has loaded and resolved stored consent.
 * For returning visitors whose marketing cookies are already accepted this is
 * the only lifecycle event that fires — `osano-cm-consent-saved` requires the
 * visitor to actively interact with the consent banner.
 */
const CONSENT_INITIALIZED_EVENT = 'osano-cm-initialized'

/**
 * Osano event fired when the visitor saves their cookie preferences.
 */
const CONSENT_SAVED_EVENT = 'osano-cm-consent-saved'

/**
 * Cleanup function for the active consent listener pair so repeated
 * /agent-wallet landings don't stack duplicate listeners; the latest landing
 * wins.
 *
 * @type {(() => void) | null}
 */
let activeConsentCleanup = null

/**
 * Returns true when the visitor has granted Osano MARKETING consent.
 *
 * Osano exposes the current decision via `cm.getConsent()`. When Osano is
 * absent (e.g. local dev / non-production, where the CMP script is not
 * injected) consent is treated as not granted, so the attribution cookie is
 * never written without a consent signal.
 *
 * @returns {boolean}
 */
function hasMarketingConsent() {
  try {
    return window.Osano?.cm?.getConsent?.()?.[MARKETING_CATEGORY] === 'ACCEPT'
  } catch {
    return false
  }
}

/**
 * Deletes the `mm_attribution` cookie by setting it in the past with the same
 * domain/path attributes so the browser removes it immediately.
 */
function deleteCookie() {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.metamask.io; secure; sameSite=lax`
}

/**
 * Listens for Osano consent lifecycle events and reacts to both grants and
 * withdrawals for the lifetime of the current landing.
 *
 * Uses `document` rather than `Osano.cm` so the listeners work even when the
 * Osano script hasn't loaded yet. Only one landing stays active at a time.
 *
 * - `osano-cm-initialized` — covers returning visitors whose stored consent
 *   resolves after the script loads.
 * - `osano-cm-consent-saved` — fires each time the visitor saves prefs; the
 *   listener stays active so a later withdrawal deletes the cookie.
 *
 * @param {() => void} commit
 */
function watchConsent(commit) {
  // Replace any earlier listener pair so only the latest landing is active.
  if (activeConsentCleanup) {
    activeConsentCleanup()
  }

  const onConsentInitialized = () => {
    if (hasMarketingConsent()) commit()
  }

  const onConsentSaved = () => {
    if (hasMarketingConsent()) {
      commit()
    } else {
      deleteCookie()
    }
  }

  const cleanup = () => {
    document.removeEventListener(CONSENT_INITIALIZED_EVENT, onConsentInitialized)
    document.removeEventListener(CONSENT_SAVED_EVENT, onConsentSaved)
    activeConsentCleanup = null
  }

  activeConsentCleanup = cleanup
  document.addEventListener(CONSENT_INITIALIZED_EVENT, onConsentInitialized)
  document.addEventListener(CONSENT_SAVED_EVENT, onConsentSaved)
}

/**
 * Sanitises a parameter value: strips markup-significant / control characters
 * and truncates to MAX_VALUE_LENGTH. Returns null for empty/invalid input.
 *
 * @param {string} raw
 * @returns {string | null}
 */
function clean(raw) {
  if (!raw || typeof raw !== 'string') return null

  /* eslint-disable-next-line no-control-regex */
  const stripped = raw.replace(/[<>"'`\\]|[\u0000-\u001f\u007f]/g, '').trim()

  if (!stripped) return null

  return stripped.length > MAX_VALUE_LENGTH ? stripped.slice(0, MAX_VALUE_LENGTH) : stripped
}

/**
 * @param {string} key
 * @returns {string | undefined}
 */
function normalizeUtmKey(key) {
  const lowered = key.trim().toLowerCase()

  if (!lowered || lowered.length > MAX_KEY_LENGTH) return undefined

  return UTM_KEY_PATTERN.test(lowered) ? lowered : undefined
}

/**
 * @param {string} key
 * @returns {string | undefined}
 */
function normalizeClickKey(key) {
  const lowered = key.trim().toLowerCase()

  if (!lowered || lowered.length > MAX_KEY_LENGTH) return undefined

  return CLICK_KEY_PATTERN.test(lowered) && CLICK_ID_KEYS.includes(lowered) ? lowered : undefined
}

/**
 * @param {unknown} input
 * @param {(key: string) => string | undefined} allowKey
 * @param {number} max
 * @returns {Record<string, string>}
 */
function takeAllowedMap(input, allowKey, max) {
  const out = {}

  if (!input || typeof input !== 'object') return out

  Object.entries(input).forEach(([rawKey, rawValue]) => {
    if (typeof rawValue !== 'string' || Object.keys(out).length >= max) return

    const key = allowKey(rawKey)
    const val = clean(rawValue)

    if (key && val) out[key] = val
  })

  return out
}

/**
 * Last-touch (`incoming`) keys take the budget first; leftover slots are
 * filled from `existing`. Cookie-first insertion would let a full cookie
 * occupy every slot so a new URL parameter is discarded.
 *
 * @param {Record<string, string>} incoming
 * @param {Record<string, string>} existing
 * @param {number} max
 * @returns {Record<string, string>}
 */
function mergePreferIncoming(incoming, existing, max) {
  const out = { ...incoming }

  Object.entries(existing).forEach(([key, value]) => {
    if (key in out || Object.keys(out).length >= max) return

    out[key] = value
  })

  return out
}

/**
 * Reads and parses the existing `mm_attribution` cookie, returning its `utm`
 * and `click` maps. Returns empty maps when the cookie is absent or malformed,
 * so a corrupt value never blocks a fresh write.
 *
 * @returns {{ utm: Record<string, string>, click: Record<string, string> }}
 */
function readExistingCookie() {
  const empty = { utm: {}, click: {} }

  const entry = document.cookie.split('; ').find(c => c.startsWith(`${COOKIE_NAME}=`))

  if (!entry) return empty

  try {
    const parsed = JSON.parse(decodeURIComponent(entry.slice(COOKIE_NAME.length + 1)))

    if (!parsed || typeof parsed !== 'object') return empty

    return {
      utm: takeAllowedMap(parsed.utm, normalizeUtmKey, MAX_UTM_PARAMS),
      click: takeAllowedMap(parsed.click, normalizeClickKey, MAX_CLICK_PARAMS),
    }
  } catch {
    return empty
  }
}

/**
 * Writes the `mm_attribution` cookie with `Domain=.metamask.io` so the
 * developer-dashboard (developer.metamask.io) can read it.
 *
 * Only fires on /agent-wallet paths when the URL carries at least one
 * UTM or click-ID parameter, and only once the visitor has granted Osano
 * MARKETING consent (either already on load, or later via the consent banner).
 *
 * @param {string} pathname
 * @param {string} [search]
 */
export function writeAttributionCookie(pathname, search) {
  if (typeof document === 'undefined') return
  if (!pathname || !pathname.includes('/agent-wallet')) return

  const searchParams = new URLSearchParams(search || '')
  const utm = {}
  const click = {}

  UTM_KEYS.forEach(key => {
    const val = clean(searchParams.get(key))

    if (val) utm[key] = val
  })

  CLICK_ID_KEYS.forEach(key => {
    const val = clean(searchParams.get(key))

    if (val) click[key] = val
  })

  const hasUtm = Object.keys(utm).length > 0
  const hasClick = Object.keys(click).length > 0

  if (!hasUtm && !hasClick) return

  const commit = () => {
    // Last-touch: URL keys take the 10-key budget first so a stuffed cookie
    // cannot evict a new campaign tag. Remaining slots keep earlier click IDs
    // / UTMs so a UTM-only visit does not drop a prior gclid.
    const existing = readExistingCookie()

    const mergedUtm = mergePreferIncoming(utm, existing.utm, MAX_UTM_PARAMS)
    const mergedClick = mergePreferIncoming(click, existing.click, MAX_CLICK_PARAMS)

    const payload = {
      ...(Object.keys(mergedUtm).length > 0 ? { utm: mergedUtm } : {}),
      ...(Object.keys(mergedClick).length > 0 ? { click: mergedClick } : {}),
      at: new Date().toISOString(),
    }

    const encoded = encodeURIComponent(JSON.stringify(payload))

    const d = new Date()

    d.setTime(d.getTime() + COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000)

    document.cookie = `${COOKIE_NAME}=${encoded}; expires=${d.toUTCString()}; path=/; domain=.metamask.io; secure; sameSite=lax`
  }

  // Respect the visitor's cookie-consent choice: attribution is marketing
  // tracking, so only persist it once MARKETING consent has been granted.
  // If the visitor later withdraws consent, the cookie is deleted.
  if (hasMarketingConsent()) {
    commit()
  }

  watchConsent(commit)
}
