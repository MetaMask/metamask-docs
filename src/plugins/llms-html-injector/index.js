const path = require('path')
const fs = require('fs/promises')

const MARKER = 'data-llms-md-alt'

/**
 * Build the URL prefix the upstream `docusaurus-plugin-llms` uses when it
 * stamps absolute links into the generated `llms*.txt` indexes and `.md`
 * files. The upstream concatenates `siteConfig.url` with `siteConfig.baseUrl`
 * (trimmed of any trailing slash), so when the site is deployed under a
 * non-root base path (e.g. `DEST=/staging/` in CI) the emitted URLs look like
 * `https://docs.metamask.io/staging/...`.
 *
 * Both `rewriteLlmsIndexes` (find-and-replace match keys) and
 * `injectAlternateLinks` (`<link rel="alternate">` hrefs) must use the same
 * prefix; otherwise the rewrites silently no-op and the alternate links 404.
 *
 * Mirrors `node_modules/docusaurus-plugin-llms/lib/index.js`.
 */
function resolveSiteUrl(siteConfig) {
  const url = (siteConfig && siteConfig.url) || ''
  const rawBase = (siteConfig && siteConfig.baseUrl) || ''
  const base = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase
  return `${url}${base}`
}

// Source path prefixes that Docusaurus strips when constructing public URLs.
// Mirrors `pathTransformation.ignorePaths` we pass to `docusaurus-plugin-llms`.
const URL_STRIPPED_PREFIXES = ['src/pages/']

// docusaurus-plugin-llms is wrapped (rather than registered separately) because
// Docusaurus 3.x runs `postBuild` hooks concurrently via `Promise.all`. As two
// independent plugins, the injector below would race against the generator and
// find an empty outDir. Wrapping guarantees the generator's postBuild completes
// before we normalize/rewrite/inject.
const upstreamLlmsPlugin = require('docusaurus-plugin-llms').default

/**
 * Docusaurus plugin that:
 *
 * 1. Delegates LLM-friendly file generation to `docusaurus-plugin-llms`
 *    (per-section `llms-<product>.txt` indexes plus per-page `.md` files when
 *    `generateMarkdownFiles: true`).
 *
 * 2. Normalizes the generated per-page `.md` files so their location mirrors
 *    the public URL of the corresponding HTML page (e.g.
 *    `embedded-wallets/README.md` -> `embedded-wallets.md`,
 *    `src/pages/tutorials/foo.md` -> `tutorials/foo.md`). This makes Fern's
 *    `markdown-url-support` check pass because `<page-url>.md` now returns 200.
 *
 * 3. Rewrites every `build/llms*.txt` URL so it points at the normalized file
 *    location instead of the original source path. This eliminates stale
 *    "links not in sitemap" warnings.
 *
 * 4. Injects `<link rel="alternate" type="text/markdown" href="<route>.md">`
 *    into the `<head>` of every doc page that now has a sibling `.md`,
 *    satisfying `Llms Txt Directive Html` / `Llms Txt Directive Md`.
 *
 * The combination satisfies all five failing Agent Score checks together with
 * the Vercel `Accept: text/markdown` rewrite in `vercel.json`.
 */
async function postProcessLlmsOutput(outDir, siteUrl) {
  if (!siteUrl) {
    throw new Error(
      '[llms-html-injector] postProcessLlmsOutput requires a siteUrl. ' +
        'Pass the value produced by resolveSiteUrl(siteConfig) so the URL prefix ' +
        '(including any non-root baseUrl such as /staging/) matches what ' +
        'docusaurus-plugin-llms emitted into the generated files.'
    )
  }

  const renames = await normalizeMarkdownLayout(outDir)
  console.log(
    `[llms-html-injector] Normalized ${renames.size} .md file(s) into URL-aligned positions`
  )

  const rewriteCount = await rewriteLlmsIndexes(outDir, renames, siteUrl)
  console.log(`[llms-html-injector] Updated URLs in ${rewriteCount} llms*.txt file(s)`)

  const { injected, missing, skippedRoot } = await injectAlternateLinks(outDir, siteUrl)
  console.log(
    `[llms-html-injector] Injected markdown alternate link into ${injected} HTML pages ` +
      `(skipped ${missing} pages with no matching .md sibling, ` +
      `${skippedRoot} root index.html page(s) by design)`
  )
}

module.exports = function llmsHtmlInjectorPlugin(context, options = {}) {
  const inner = upstreamLlmsPlugin(context, options)
  // Resolve once at plugin construction. `context.siteConfig` is populated by
  // Docusaurus before any plugin factory runs, and `baseUrl` cannot change
  // between then and `postBuild`, so we don't need to recompute per build.
  const siteUrl = resolveSiteUrl(context && context.siteConfig)

  // Spread the inner plugin object so any lifecycle hook the upstream package
  // already exposes (or adds in a future release) — e.g. `contentLoaded`,
  // `loadContent`, `configureWebpack`, `getPathsToWatch`, `getThemePath`,
  // `extendCli` — is forwarded to Docusaurus untouched. Only `name` and
  // `postBuild` are overridden: `name` to identify this wrapper in build
  // output, and `postBuild` to chain the generator's hook before our
  // post-processing step (see the wrapper rationale at the top of this file).
  return {
    ...inner,
    name: 'llms-html-injector',
    async postBuild(props) {
      if (typeof inner.postBuild === 'function') {
        await inner.postBuild.call(inner, props)
      }
      await postProcessLlmsOutput(props.outDir, siteUrl)
    },
  }
}

// Exported for scripts/verify-llms-output.js, which invokes the generator
// directly and then runs only the post-processing stage. The verify script
// passes its own siteUrl (and uses `resolveSiteUrl` to mirror the production
// computation when a non-root baseUrl is in play).
module.exports.postProcessLlmsOutput = postProcessLlmsOutput
module.exports.resolveSiteUrl = resolveSiteUrl

/**
 * Walk every `.md` file under `outDir`, skipping the llms*.txt index files,
 * and move it to its URL-aligned target path if different. Returns a map of
 * old-relative-path -> new-relative-path (using forward slashes, no leading `/`).
 */
async function normalizeMarkdownLayout(outDir) {
  const renames = new Map()
  const allMd = await collectMarkdownFiles(outDir)

  const dirsToPrune = new Set()

  for (const absFrom of allMd) {
    const relFrom = toPosix(path.relative(outDir, absFrom))
    const relTo = urlAlignedRelative(relFrom)
    if (!relTo || relTo === relFrom) continue

    const absTo = path.join(outDir, relTo)

    // `fs.access` is used purely as an existence probe: a throw means "target
    // is absent, proceed to rename", which is expected control flow. Errors
    // from the subsequent `fs.unlink` are real I/O failures (file locked,
    // permission denied, etc.) and must propagate rather than silently fall
    // through to `fs.rename`, which would overwrite the existing target and
    // contradict the "target exists -> drop the duplicate source" intent.
    let targetExists = true
    try {
      await fs.access(absTo)
    } catch {
      targetExists = false
    }

    if (targetExists) {
      // Two source files normalize to the same URL-aligned target (e.g.
      // `foo/README.md` and `foo/index.md` both -> `foo.md`). Whichever
      // `collectMarkdownFiles` emits first wins; this loser is dropped.
      // Today no source tree triggers this, but logging makes the silent
      // delete loud if a future restructure ever does.
      console.warn(
        `[llms-html-injector] Target ${relTo} already exists; dropping duplicate source ${relFrom}`
      )
      await fs.unlink(absFrom)
      renames.set(relFrom, relTo)
      dirsToPrune.add(path.dirname(absFrom))
      continue
    }

    await fs.mkdir(path.dirname(absTo), { recursive: true })
    await fs.rename(absFrom, absTo)
    renames.set(relFrom, relTo)
    dirsToPrune.add(path.dirname(absFrom))
  }

  await pruneEmptyDirs(outDir, dirsToPrune)
  return renames
}

/**
 * Remove now-empty directories that previously held source-path markdown
 * files. Walks upward from each pruned location until a non-empty ancestor
 * is reached or we exit `outDir`.
 */
async function pruneEmptyDirs(outDir, dirs) {
  const root = path.resolve(outDir)
  for (const start of dirs) {
    let current = path.resolve(start)
    while (current.startsWith(root) && current !== root) {
      let entries
      try {
        entries = await fs.readdir(current)
      } catch {
        break
      }
      if (entries.length > 0) break
      try {
        await fs.rmdir(current)
      } catch {
        break
      }
      current = path.dirname(current)
    }
  }
}

async function collectMarkdownFiles(outDir, acc = []) {
  const entries = await fs.readdir(outDir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(outDir, entry.name)
    if (entry.isDirectory()) {
      await collectMarkdownFiles(full, acc)
    } else if (
      entry.name.endsWith('.md') &&
      !/^llms.*\.txt$/.test(entry.name) &&
      !/^llms.*\.md$/.test(entry.name)
    ) {
      acc.push(full)
    }
  }
  return acc
}

/**
 * Map a source-path-style markdown filename to its URL-aligned location:
 *   - Strip a leading `docs/` or `src/pages/` (Docusaurus URL transformation).
 *   - Replace trailing `/README.md` or `/index.md` with `.md` of the parent dir.
 *   - A bare `README.md` or `index.md` at the build root maps to nothing (homepage).
 */
function urlAlignedRelative(relFrom) {
  let p = relFrom
  for (const prefix of URL_STRIPPED_PREFIXES) {
    if (p.startsWith(prefix)) {
      p = p.slice(prefix.length)
      break
    }
  }
  if (p === 'README.md' || p === 'index.md') return null
  p = p.replace(/\/(README|index)\.md$/, '.md')
  return p
}

/**
 * Rewrite every llms*.txt index so URLs that referenced an old source-path
 * markdown file now point at the URL-aligned location. Returns the number of
 * files rewritten.
 */
async function rewriteLlmsIndexes(outDir, renames, siteUrl) {
  if (renames.size === 0) return 0
  const entries = await fs.readdir(outDir, { withFileTypes: true })
  let count = 0
  for (const entry of entries) {
    if (!entry.isFile()) continue
    if (!/^llms.*\.txt$/.test(entry.name)) continue
    const abs = path.join(outDir, entry.name)
    let text = await fs.readFile(abs, 'utf8')
    let changed = false
    for (const [from, to] of renames) {
      const fromUrl = `${siteUrl}/${from}`
      const toUrl = `${siteUrl}/${to}`
      if (text.includes(fromUrl)) {
        text = text.split(fromUrl).join(toUrl)
        changed = true
      }
    }
    if (changed) {
      await fs.writeFile(abs, text, 'utf8')
      count++
    }
  }
  return count
}

/**
 * Walk `build/**\/index.html`, and for each page that has a sibling `.md` at
 * the URL-aligned location, inject a `<link rel="alternate" type="text/markdown" href="...">`
 * into the `<head>`.
 */
async function injectAlternateLinks(outDir, siteUrl) {
  let injected = 0
  let missing = 0
  let skippedRoot = 0
  await visit(outDir)
  return { injected, missing, skippedRoot }

  async function visit(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        await visit(full)
      } else if (entry.name === 'index.html') {
        const ok = await injectOne(full)
        if (ok === true) injected++
        else if (ok === false) missing++
        else if (ok === 'root') skippedRoot++
      }
    }
  }

  // The site root (`build/index.html`) is rendered from a React component
  // (`src/pages/index.tsx`) and intentionally has no `.md` sibling — the
  // root LLMS surface is the hand-curated `static/llms.txt`. Return the
  // sentinel `'root'` instead of `null` so the caller can count this
  // skip explicitly rather than letting it vanish; if a future change
  // ever causes a non-homepage page to land at `relDir === '.'`, the
  // bump in `skippedRoot` will make it visible.
  async function injectOne(htmlAbs) {
    const relDir = toPosix(path.relative(outDir, path.dirname(htmlAbs)))
    if (!relDir || relDir === '.') return 'root'
    const mdRel = `${relDir}.md`
    const mdAbs = path.join(outDir, mdRel)
    try {
      await fs.access(mdAbs)
    } catch {
      return false
    }
    let html
    try {
      html = await fs.readFile(htmlAbs, 'utf8')
    } catch {
      return false
    }
    if (html.includes(MARKER) || !html.includes('</head>')) return null
    const href = `${siteUrl}/${mdRel}`
    const tag = `<link ${MARKER} rel="alternate" type="text/markdown" href="${href}">`
    const next = html.replace('</head>', `${tag}</head>`)
    await fs.writeFile(htmlAbs, next, 'utf8')
    return true
  }
}

function toPosix(p) {
  return p.split(path.sep).join('/')
}
