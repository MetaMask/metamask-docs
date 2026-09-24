import { writeAttributionCookie } from '@site/src/lib/attribution-cookie'

/**
 * Parks campaign tags from /agent-wallet landings (e.g. /agent-wallet/quickstart)
 * into the shared `mm_attribution` cookie. Same last-touch rules as metamask.io.
 */
export function onRouteDidUpdate({ location, previousLocation }) {
  if (
    previousLocation &&
    previousLocation.pathname === location.pathname &&
    previousLocation.search === location.search
  ) {
    return
  }

  writeAttributionCookie(location.pathname, location.search)
}
