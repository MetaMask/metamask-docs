const path = require('path')
const fs = require('fs/promises')

// Sentinel attributes / strings used to make HTML and markdown post-processing
// idempotent across re-runs (e.g. when scripts/verify-llms-output.js is invoked
// against an already-processed outDir).
const MD_ALT_MARKER = 'data-llms-md-alt'
const BODY_DIRECTIVE_MARKER = 'data-llms-directive'
const MD_DIRECTIVE_LINE = '> For the complete documentation index, see [llms.txt](/llms.txt).'

// Matches the opening tag of every `<span class="katex-mathml">` (KaTeX
// always emits this exact class with no additional classes on the wrapper
// itself; the mathml subtree is the off-screen MathML rendering used by
// screen readers). The `[^>]*` allow for any other attributes (rare but
// possible if upstream rehype plugins add them). The capture group is
// reused to splice the marker into the same position in the tag.
const KATEX_MATHML_OPEN_TAG_RE =
  /<span\b((?:[^>"']|"[^"]*"|'[^']*')*?\bclass="katex-mathml"(?:[^>"']|"[^"]*"|'[^']*')*?)>/g

// Visible-but-screen-reader-only directive injected at the top of every
// `<body>` in the build. AFDocs scans `<body>` (excluding nav/script/style)
// for a mention of `llms.txt`, so this satisfies `llms-txt-directive-html`.
// `.sr-only` is defined in src/scss/commons/_utils.scss and loaded site-wide
// via src/scss/custom.scss, so no styling work is needed at the page level.
function buildBodyDirective(siteUrl) {
  // The href is intentionally site-relative (`/llms.txt`) so it works on the
  // production host and any preview/staging deployment alike. The siteUrl
  // argument is accepted for symmetry with the head-link injector and to
  // allow a future absolute variant without touching call sites.
  void siteUrl
  return (
    `<div ${BODY_DIRECTIVE_MARKER} class="sr-only">` +
    'For AI agents: a documentation index is available at ' +
    '<a href="/llms.txt">/llms.txt</a>. A markdown version of this page is ' +
    'available at the same URL with .md appended (or via Accept: text/markdown).' +
    `</div>`
  )
}

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

/**
 * Vercel sets several deployment URL env vars on every build:
 *
 *   - `VERCEL_URL` — the deployment-specific host
 *     (e.g. `metamask-docs-f8nytczy3-consensys.vercel.app`). Changes on
 *     every deploy.
 *   - `VERCEL_BRANCH_URL` — the stable branch alias
 *     (e.g. `metamask-docs-git-my-branch-consensys.vercel.app`). Same URL
 *     across rebuilds of the same branch — this is the URL collaborators
 *     and CI tools normally test against.
 *   - `VERCEL_ENV` — `production`, `preview`, or `development`.
 *
 * On preview/development deployments we want the curated `static/llms.txt`,
 * the generated `llms-*.txt` index files, and the per-page `.md` link
 * bodies to point at the same host AFDocs is being pointed at — otherwise
 * AFDocs sees the absolute URLs as cross-origin and silently degrades
 * checks like `llms-txt-links-markdown` and `llms-txt-coverage` to
 * "skipped: all links external".
 *
 * `VERCEL_BRANCH_URL` is preferred because it matches the URL most reviewers
 * paste into `npx afdocs check`. `VERCEL_URL` is the fallback when the
 * branch URL isn't available (e.g. on `vercel dev`, where only the
 * deployment-specific URL is set). Returns null on production deployments
 * and outside Vercel so the canonical `siteConfig.url` is preserved.
 */
function resolvePreviewSiteUrl() {
  const env = process.env.VERCEL_ENV
  const host = process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
  if (!host) return null
  // VERCEL_ENV is "preview" for branch deploys (PRs, branch URLs) and
  // "development" when running `vercel dev`. Both should rewrite to the
  // ephemeral host. "production" deploys keep the canonical URL.
  if (env !== 'preview' && env !== 'development') return null
  return `https://${host}`
}

// Source path prefixes that Docusaurus strips when constructing public URLs.
// Mirrors `pathTransformation.ignorePaths` we pass to `docusaurus-plugin-llms`.
const URL_STRIPPED_PREFIXES = ['src/pages/']

// Path prefix → all-pages bucket filename. Generated files live alongside the
// existing per-product `llms-<product>.txt` files in the build root and are
// referenced from `static/llms.txt` so the AFDocs walker descends one level
// into them and discovers every sitemap URL (fixes `llms-txt-coverage`).
const ALL_PAGES_BUCKETS = [
  {
    prefix: '/metamask-connect/',
    filename: 'llms-all-metamask-connect.txt',
    title: 'All MetaMask Connect pages',
  },
  {
    prefix: '/embedded-wallets/',
    filename: 'llms-all-embedded-wallets.txt',
    title: 'All Embedded Wallets pages',
  },
  {
    prefix: '/smart-accounts-kit/',
    filename: 'llms-all-smart-accounts-kit.txt',
    title: 'All Smart Accounts Kit pages',
  },
  { prefix: '/services/', filename: 'llms-all-services.txt', title: 'All Services pages' },
  { prefix: '/snaps/', filename: 'llms-all-snaps.txt', title: 'All Snaps pages' },
  {
    prefix: '/developer-tools/',
    filename: 'llms-all-dashboard.txt',
    title: 'All Developer dashboard pages',
  },
  { prefix: '/tutorials/', filename: 'llms-all-tutorials.txt', title: 'All Tutorials pages' },
]
const ALL_PAGES_MISC_FILENAME = 'llms-all-misc.txt'
const ALL_PAGES_MISC_TITLE = 'All other documentation pages'

// docusaurus-plugin-llms is wrapped (rather than registered separately) because
// Docusaurus 3.x runs `postBuild` hooks concurrently via `Promise.all`. As two
// independent plugins, the injector below would race against the generator and
// find an empty outDir. Wrapping guarantees the generator's postBuild completes
// before we normalize/rewrite/inject.
const upstreamLlmsPlugin = require('docusaurus-plugin-llms').default

/**
 * Docusaurus plugin that:
 *
 * 1. Delegates per-section `llms-<product>.txt` and per-page `.md` generation
 *    to `docusaurus-plugin-llms` (the upstream walks raw source MDX).
 *
 * 2. Normalizes the per-page `.md` files so their location mirrors the public
 *    URL of the corresponding HTML page (e.g. `embedded-wallets/README.md` ->
 *    `embedded-wallets.md`, `src/pages/tutorials/foo.md` -> `tutorials/foo.md`).
 *
 * 3. Replaces every per-page `.md` body with markdown derived from the
 *    rendered HTML `<article>` (node-html-markdown). This is the only way
 *    to get true HTML/`.md` parity for pages assembled from MDX `import`
 *    partials, which the upstream plugin cannot resolve. Fixes
 *    `markdown-content-parity`.
 *
 * 4. Prepends a `> For the complete documentation index, see [llms.txt](/llms.txt).`
 *    blockquote to every per-page `.md`. Fixes `llms-txt-directive-md`.
 *
 * 5. Rewrites every `build/llms*.txt` URL so it points at the normalized
 *    `.md` location, eliminating stale "links not in sitemap" warnings.
 *
 * 6. Prunes link-index `llms-*.txt` files of any link whose target URL is
 *    absent from the build's sitemap (defensive — only operates on
 *    non-`-full` link indexes to avoid corrupting embedded content).
 *
 * 7. Generates `llms-all-<product>.txt` files from the build's sitemap so
 *    `llms-txt-coverage` reaches 100% deterministically. The static root
 *    `llms.txt` links to these files; the AFDocs walker descends one level
 *    and picks up every sitemap URL.
 *
 * 8. Injects `<link rel="alternate" type="text/markdown">` into `<head>` and
 *    a hidden `<div>` directive at the top of `<body>` of every doc page,
 *    satisfying `llms-txt-directive-html` and the existing markdown-alt
 *    discovery hook for HTML clients.
 *
 * Together these steps satisfy every Agent Score check in the
 * content-discoverability and observability categories.
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

  const regen = await regenerateMdFromHtml(outDir)
  console.log(
    `[llms-html-injector] Regenerated ${regen.regenerated} per-page .md from rendered HTML, ` +
      `created ${regen.created} new .md for pages without an upstream-emitted sibling ` +
      `(skipped ${regen.skipped}: unreadable HTML or empty <article>)`
  )

  const directiveCount = await prependMdDirective(outDir)
  console.log(`[llms-html-injector] Prepended llms.txt directive to ${directiveCount} .md file(s)`)

  const rewriteCount = await rewriteLlmsIndexes(outDir, renames, siteUrl)
  console.log(`[llms-html-injector] Updated URLs in ${rewriteCount} llms*.txt file(s)`)

  // Normalize the sitemap *before* reading its URLs: normalizeSitemap drops
  // `<loc>`s shadowed by a vercel.json redirect (they 3XX on the deployed
  // site) and strips trailing slashes from dotted-segment routes. Reading the
  // sitemap afterward ensures pruneStaleLlmsLinks and generateAllPagesIndex
  // operate on the same 200-only URL set the deployed sitemap exposes, so the
  // generated llms-all-*.txt indexes never point agents at redirecting pages.
  const sitemap = await normalizeSitemap(outDir, siteUrl)
  if (sitemap.skipped) {
    console.warn(
      '[llms-html-injector] No sitemap.xml found in outDir; skipping sitemap normalization.'
    )
  } else {
    console.log(
      `[llms-html-injector] Sitemap: stripped trailing slash from ${sitemap.rewritten} dotted-segment <loc>(s) ` +
        `and dropped ${sitemap.dropped} URL(s) shadowed by a vercel.json redirect`
    )
  }

  const sitemapUrls = await readSitemapUrls(outDir)
  if (sitemapUrls) {
    const stale = await pruneStaleLlmsLinks(outDir, sitemapUrls, siteUrl)
    console.log(
      `[llms-html-injector] Pruned ${stale.removed} stale link(s) from ${stale.fileCount} link-index file(s)`
    )

    const all = await generateAllPagesIndex(outDir, siteUrl, sitemapUrls)
    console.log(
      `[llms-html-injector] Generated ${all.fileCount} llms-all-*.txt index file(s) covering ${all.urlCount} sitemap URL(s)`
    )
  } else {
    console.warn(
      '[llms-html-injector] No sitemap.xml found in outDir; skipping pruneStaleLlmsLinks and generateAllPagesIndex.'
    )
  }

  const { injected, missing, skippedRoot, bodyInjected, katexMarked, canonicalFixed } =
    await injectAlternateLinks(outDir, siteUrl)
  console.log(
    `[llms-html-injector] Injected markdown alternate link into ${injected} HTML pages ` +
      `(skipped ${missing} pages with no matching .md sibling, ` +
      `${skippedRoot} root index.html page(s) by design)`
  )
  console.log(
    `[llms-html-injector] Injected sr-only llms.txt body directive into ${bodyInjected} HTML pages`
  )
  console.log(
    `[llms-html-injector] Marked ${katexMarked} KaTeX MathML span(s) as data-markdown-ignore`
  )
  console.log(
    `[llms-html-injector] Stripped trailing slash from canonical/og:url on ${canonicalFixed} dotted-route page(s)`
  )

  // On Vercel preview/development deployments, rewrite every absolute URL in
  // generated llms*.txt files and per-page .md files from the canonical
  // production host to the preview's auto-assigned host. The HTML alternate
  // link injected above already uses a path-only href, so HTML files don't
  // need this pass — only text artifacts that the llmstxt.org spec requires
  // to carry absolute URLs.
  const previewSiteUrl = resolvePreviewSiteUrl()
  if (previewSiteUrl && previewSiteUrl !== siteUrl) {
    const rewriteStats = await rewriteHostInBuildArtifacts(outDir, siteUrl, previewSiteUrl)
    const hostSource = process.env.VERCEL_BRANCH_URL ? 'VERCEL_BRANCH_URL' : 'VERCEL_URL'
    console.log(
      `[llms-html-injector] Vercel preview detected (${hostSource}=${process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL}); ` +
        `rewrote ${siteUrl} -> ${previewSiteUrl} in ${rewriteStats.txtFiles} llms*.txt file(s) ` +
        `and ${rewriteStats.mdFiles} per-page .md file(s)`
    )
  }
}

module.exports = function llmsHtmlInjectorPlugin(context, options = {}) {
  const inner = upstreamLlmsPlugin(context, options)
  const siteUrl = resolveSiteUrl(context && context.siteConfig)

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
// directly and then runs only the post-processing stage.
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

    let targetExists = true
    try {
      await fs.access(absTo)
    } catch {
      targetExists = false
    }

    if (targetExists) {
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
 * into the `<head>`. Independently, inject a hidden `<div>` directive into the
 * `<body>` of every page so HTML-only agents can discover `/llms.txt`.
 *
 * Also marks every `<span class="katex-mathml">` with `data-markdown-ignore`.
 * KaTeX renders each math expression three times in the DOM (`mrow` text +
 * `<annotation>` LaTeX source + the visual `.katex-html`), which AFDocs'
 * `markdown-content-parity` HTML extractor concatenates into segments like
 * `retrievePubKey()retrievePubKey()retrievePubKey()` that can never match
 * the single `$retrievePubKey()$` in the regenerated `.md`. Marking the
 * MathML subtree as `data-markdown-ignore` makes AFDocs strip it before
 * extracting text, leaving only the visual rendering — invisible to the
 * markdown side via `htmlToMarkdown`'s own `.katex` replacement, but
 * structurally aligned with what the parity check measures.
 */
async function injectAlternateLinks(outDir, siteUrl) {
  let injected = 0
  let missing = 0
  let skippedRoot = 0
  let bodyInjected = 0
  let katexMarked = 0
  let canonicalFixed = 0
  await visit(outDir)
  return { injected, missing, skippedRoot, bodyInjected, katexMarked, canonicalFixed }

  async function visit(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        await visit(full)
      } else if (entry.name === 'index.html') {
        const result = await injectOne(full)
        if (result.altLink === true) injected++
        else if (result.altLink === false) missing++
        else if (result.altLink === 'root') skippedRoot++
        if (result.bodyDirective) bodyInjected++
        if (result.canonicalFixed) canonicalFixed++
        katexMarked += result.katexMarked
      }
    }
  }

  async function injectOne(htmlAbs) {
    const relDir = toPosix(path.relative(outDir, path.dirname(htmlAbs)))
    let html
    try {
      html = await fs.readFile(htmlAbs, 'utf8')
    } catch {
      return { altLink: false, bodyDirective: false, katexMarked: 0 }
    }

    let changed = false
    let altLinkResult

    if (!relDir || relDir === '.') {
      altLinkResult = 'root'
    } else {
      const mdRel = `${relDir}.md`
      const mdAbs = path.join(outDir, mdRel)
      let mdExists = true
      try {
        await fs.access(mdAbs)
      } catch {
        mdExists = false
      }
      if (!mdExists) {
        altLinkResult = false
      } else if (html.includes(MD_ALT_MARKER) || !html.includes('</head>')) {
        altLinkResult = null
      } else {
        // Use a path-only href (`/foo/bar.md`) rather than an absolute URL.
        // Browsers and AFDocs both resolve relative hrefs against the page's
        // origin, so the same HTML works correctly on production
        // (docs.metamask.io), Vercel preview deployments
        // (`*.vercel.app`), and `localhost` without any host-rewrite step
        // touching HTML files. The `siteUrl` parameter is retained for
        // signature compatibility but no longer baked into the href.
        void siteUrl
        const href = `/${mdRel}`
        const tag = `<link ${MD_ALT_MARKER} rel="alternate" type="text/markdown" href="${href}">`
        html = html.replace('</head>', `${tag}</head>`)
        altLinkResult = true
        changed = true
      }
    }

    let bodyDirectiveAdded = false
    if (!html.includes(BODY_DIRECTIVE_MARKER)) {
      const directive = buildBodyDirective(siteUrl)
      // Insert just after the opening <body...> tag so the directive is at the
      // very top of the document body, well before navigation/header markup.
      // Use a regex on the first <body...> tag rather than a naive string
      // replace to handle attributes/whitespace variations.
      const bodyTagMatch = html.match(/<body\b[^>]*>/i)
      if (bodyTagMatch) {
        const insertAt = bodyTagMatch.index + bodyTagMatch[0].length
        html = html.slice(0, insertAt) + directive + html.slice(insertAt)
        bodyDirectiveAdded = true
        changed = true
      }
    }

    // Mark every KaTeX MathML wrapper with data-markdown-ignore. The marker
    // is idempotent: we skip any opening tag that already carries the
    // attribute (which a previous run may have added) so re-invoking the
    // postBuild stage against an already-processed outDir does not append
    // duplicate attributes.
    let katexMarkedHere = 0
    html = html.replace(KATEX_MATHML_OPEN_TAG_RE, (match, attrs) => {
      if (/\bdata-markdown-ignore\b/.test(attrs)) return match
      katexMarkedHere++
      return `<span${attrs} data-markdown-ignore>`
    })
    if (katexMarkedHere > 0) changed = true

    // Normalize trailing slashes in canonical/og:url metadata for "dotted"
    // routes. Docusaurus (`trailingSlash: true`) always emits a trailing-slash
    // canonical, but Vercel (`trailingSlash: true`) treats any final path
    // segment containing a dot (e.g. `use-web3.js`, version `1.0.0`,
    // `android-v7.1.1-to-v7.1.2`) as a file and 308-strips the slash. That
    // makes the canonical point to a redirect. Stripping the slash here aligns
    // the canonical/og:url with the URL Vercel actually serves with a 200.
    let canonicalFixedHere = false
    if (relDir && relDir !== '.' && lastSegmentHasDot(relDir)) {
      const beforeCanonical = html
      html = stripDottedTrailingSlashInMetadata(html)
      if (html !== beforeCanonical) {
        canonicalFixedHere = true
        changed = true
      }
    }

    if (changed) {
      await fs.writeFile(htmlAbs, html, 'utf8')
    }

    return {
      altLink: altLinkResult,
      bodyDirective: bodyDirectiveAdded,
      katexMarked: katexMarkedHere,
      canonicalFixed: canonicalFixedHere,
    }
  }
}

/**
 * Return true when the final non-empty segment of a route/path contains a dot.
 * These are the routes Vercel treats as files and serves without a trailing
 * slash (308-stripping any trailing-slash variant).
 */
function lastSegmentHasDot(routePath) {
  const segments = routePath.split('/').filter(Boolean)
  const last = segments[segments.length - 1] || ''
  return last.includes('.')
}

/**
 * Strip the trailing slash from the `<link rel="canonical">` href and the
 * `og:url` content in a page's HTML. Only called for dotted routes, where the
 * emitted absolute URL is guaranteed to be this page's own trailing-slash URL.
 */
function stripDottedTrailingSlashInMetadata(html) {
  // <link rel="canonical" href="...://.../use-web3.js/">
  html = html.replace(/(<link\b[^>]*\brel="canonical"[^>]*\bhref=")([^"]+?)\/("[^>]*>)/i, '$1$2$3')
  // <meta property="og:url" content="...://.../use-web3.js/"> (property first)
  html = html.replace(
    /(<meta\b[^>]*\bproperty="og:url"[^>]*\bcontent=")([^"]+?)\/("[^>]*>)/i,
    '$1$2$3'
  )
  // <meta content="..." property="og:url"> (content first)
  html = html.replace(
    /(<meta\b[^>]*\bcontent=")([^"]+?)\/("[^>]*\bproperty="og:url"[^>]*>)/i,
    '$1$2$3'
  )
  return html
}

/**
 * Generate (or regenerate) every per-page `.md` from its rendered HTML
 * `<article>`. This achieves true HTML/MD parity AND fills coverage gaps:
 *
 *   - The upstream `docusaurus-plugin-llms` reads raw source MDX and
 *     cannot resolve `import` partials, leaving pages built from imported
 *     components nearly empty in the upstream `.md` (e.g.
 *     `services/reference/.../eth_sendrawtransaction`). Regenerating from
 *     the rendered HTML resolves every partial and component.
 *
 *   - Some pages exist in the build with NO upstream-emitted `.md` at all
 *     (e.g. Docusaurus-versioned docs: gator's `current` version publishes
 *     under `/smart-accounts-kit/development/...` while the upstream only
 *     emits a single `.md` per source file at the version-less path). The
 *     ghost URLs fail AFDocs' `markdown-url-support`, `content-negotiation`,
 *     and `llms-txt-directive-md` checks. Walking `build/**\/index.html`
 *     and creating a `.md` sibling for any page that lacks one closes
 *     that gap deterministically.
 *
 * Algorithm:
 *   1. Walk every `build/**\/index.html` (skipping the root index.html,
 *      which has no meaningful `.md` companion).
 *   2. Compute the URL-aligned `.md` path (`<dir>.md`).
 *   3. Read the HTML, parse with cheerio, select `<article>`, strip
 *      `data-markdown-ignore` plus nav/script/style/aside.
 *   4. Convert the remaining HTML to markdown via node-html-markdown
 *      (GFM-aware: tables, strikethrough, line breaks).
 *   5. Write the `.md`, creating the directory if needed.
 *
 * Frontmatter is intentionally not preserved: the upstream-generated `.md`
 * frontmatter mirrors the source MDX frontmatter, but the rendered HTML
 * already inlines the resolved title/description/etc. into the article body
 * via Docusaurus components, so the new `.md` is self-contained.
 */
async function regenerateMdFromHtml(outDir) {
  const mdConverter = makeMarkdownConverter()
  const cheerio = require('cheerio')

  let regenerated = 0
  let created = 0
  let skipped = 0

  await visit(outDir)
  return { regenerated, created, skipped }

  // Sequential is fine: ~2.5k pages * ~10ms parse + convert is well under a
  // minute. Parallelism would add complexity without measurable benefit at
  // this scale and risk hitting the open-file-descriptor limit.
  async function visit(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        await visit(full)
      } else if (entry.name === 'index.html') {
        await processOne(full, dir)
      }
    }
  }

  async function processOne(htmlAbs, dir) {
    const relDir = toPosix(path.relative(outDir, dir))
    // Skip the site root: `<outDir>/index.html` would map to a top-level
    // `.md` that has no canonical URL counterpart in the markdown space.
    if (!relDir || relDir === '.') return

    let html
    try {
      html = await fs.readFile(htmlAbs, 'utf8')
    } catch {
      skipped++
      return
    }

    const newBody = htmlToMarkdown(html, cheerio, mdConverter)
    if (!newBody) {
      skipped++
      return
    }

    const mdAbs = path.join(outDir, `${relDir}.md`)
    let existed = true
    try {
      await fs.access(mdAbs)
    } catch {
      existed = false
    }

    if (!existed) {
      await fs.mkdir(path.dirname(mdAbs), { recursive: true })
    }
    await fs.writeFile(mdAbs, newBody, 'utf8')
    if (existed) regenerated++
    else created++
  }
}

function htmlToMarkdown(html, cheerio, mdConverter) {
  const $ = cheerio.load(html)
  let $article = $('article').first()
  if ($article.length === 0) {
    $article = $('main').first()
  }
  if ($article.length === 0) return null

  // KaTeX renders each math expression as a `.katex` container holding BOTH a
  // `.katex-mathml` (MathML for screen readers, with a `<math>` element whose
  // child `<mrow>` and child `<annotation>` both produce the same text) AND a
  // `.katex-html` (visual rendering, marked `aria-hidden="true"`). If we
  // simply pass the container through to the markdown converter, the
  // resulting markdown contains every math expression two or three times
  // (mrow text + annotation text + visual text), which AFDocs' content-parity
  // check counts as "missing from markdown" relative to the rendered HTML's
  // deduplicated visual text.
  //
  // Replace each `.katex` with a `<code>` element holding the **visual**
  // text extracted from `.katex-html`. NHM converts `<code>` to a single
  // backtick span (`` `n` ``) in the .md, and AFDocs' markdown stripper
  // protects backtick spans then restores their bare content as plain text.
  // The HTML side (post-`injectAlternateLinks`) marks `.katex-mathml` with
  // `data-markdown-ignore` so AFDocs only sees the `.katex-html` rendering
  // — the exact same string we embed here. Both sides thus normalize to
  // identical text, so prose sentences with inline math (`\sigma` → σ,
  // `a_1` → a1, etc.) substring-match cleanly. Using the LaTeX annotation
  // source instead would re-introduce the mismatch that broke parity on
  // `embedded-wallets/infrastructure/sss-architecture` (52% missing).
  $article.find('.katex').each((_, el) => {
    const $el = $(el)
    const visual = $el.find('.katex-html').first().text().trim()
    const annotation = $el.find('annotation[encoding="application/x-tex"]').first().text().trim()
    const inner = visual || annotation
    if (!inner) {
      $el.remove()
      return
    }
    const $code = $('<code></code>')
    $code.text(inner)
    $el.replaceWith($code)
  })

  // Strip elements that are intentionally human-only (chrome wrappers tagged
  // with data-markdown-ignore in src/theme/DocItem/Layout/index.jsx) plus
  // structural noise the converter would otherwise leave as empty markdown.
  // `.katex` elements are gone by this point so the aria-hidden selector
  // only catches non-math hidden content (e.g. anchor link icons).
  $article.find('[data-markdown-ignore]').remove()
  $article.find('nav, script, style, aside, [aria-hidden="true"]').remove()
  // The body directive injected by injectAlternateLinks() lives outside
  // <article>, so it is not present here. No removal needed.

  // Flatten Docusaurus chrome inside <details> elements. Docusaurus wraps
  // collapsible content like this:
  //
  //   <details class="details_lb9f alert ..." data-collapsed="true">
  //     <summary>Title</summary>
  //     <div>
  //       <div class="collapsibleContent_i85q">
  //         <div>
  //           <p>real content</p>
  //         </div>
  //       </div>
  //     </div>
  //   </details>
  //
  // The custom NHM translator below preserves <details>/<summary> as raw
  // HTML wrappers and recurses into children. Without this flattening, the
  // emitted .md would carry every wrapper <div>, which AFDocs'
  // markdown-content-parity normalizer collapses to text (`<x>` becomes
  // `x`), smushing classnames like `collapsibleContent_i85q` into adjacent
  // prose and breaking substring matches against the clean HTML segments.
  //
  // Unwrap iteratively so arbitrary depths of nested wrapper <div>s flatten.
  // We only unwrap direct children of <details> that are <div>s with either
  // no class or the Docusaurus collapsible-content class — never <div>s
  // that the author intentionally placed (which always carry meaningful
  // class names).
  $article.find('details').each((_, el) => {
    const $det = $(el)
    Object.keys($det.attr() || {}).forEach(attr => $det.removeAttr(attr))
    $det.children('summary').each((__, sEl) => {
      const $sum = $(sEl)
      Object.keys($sum.attr() || {}).forEach(attr => $sum.removeAttr(attr))
    })
    let didUnwrap = true
    while (didUnwrap) {
      didUnwrap = false
      $det.children('div').each((__, dEl) => {
        const $d = $(dEl)
        const cls = $d.attr('class') || ''
        if (!cls.trim() || /\bcollapsibleContent[_-]/.test(cls)) {
          $d.replaceWith($d.contents())
          didUnwrap = true
        }
      })
    }
  })

  const contentHtml = ($article.html() || '').trim()
  if (!contentHtml) return null

  const md = mdConverter.translate(contentHtml).trim()
  if (!md) return null
  return md + '\n'
}

function makeMarkdownConverter() {
  const { NodeHtmlMarkdown } = require('node-html-markdown')
  // node-html-markdown is GFM-aware by default (tables, strikethrough, line
  // breaks), and ATX-only for headings, so no plugin equivalent of
  // turndown-plugin-gfm is required. The remaining style options mirror the
  // previous turndown configuration: fenced code blocks with ```, `-`
  // bullets (NHM defaults to `*`), `_` for emphasis, `**` for strong,
  // inline links over reference style.
  const options = {
    codeFence: '```',
    codeBlockStyle: 'fenced',
    bulletMarker: '-',
    emDelimiter: '_',
    strongDelimiter: '**',
    useInlineLinks: true,
    // Override both default escapes to a narrower set. Character sequences
    // that have no ambiguous meaning in our doc body — square brackets in
    // prose like "(string) [optional]", parentheses, hash symbols
    // mid-sentence, asterisks adjacent to letters etc. — shouldn't get
    // backslash-escaped. NHM's defaults would insert `\[`, `\]`, `\#`,
    // `\>`, `\*`, `\_`, etc., none of which the AFDocs
    // `markdown-content-parity` normalizer strips. The result is segments
    // like `callGasLimit: (string) [optional] - description` failing to
    // match `callGasLimit: (string) \[optional\] - description` even
    // though the prose is identical. Underscores inside identifiers are
    // also escaped by default (`my_var` -> `my\_var`), which breaks the
    // same substring check.
    //
    // `globalEscape` is narrowed to backticks ONLY. A literal backtick in
    // a text node (i.e. outside any `<code>`/`<pre>` — those elements set
    // `noEscape: true` in NHM's default translators, so this regex is not
    // applied to their contents) is the one character we cannot leave raw:
    // unescaped, it would open an unintended inline code span in the
    // emitted markdown, splicing surrounding prose into a `<code>` block
    // when the markdown is rendered. The other characters NHM escapes by
    // default (`\\`, `*`, `_`, `~`, `[`, `]`) are intentionally left raw
    // for the parity-check reasons above. `lineStartEscape` is reduced
    // to the sequences that would actually produce broken markdown if
    // left raw at the start of a line: a leading `#`/`>` (could create a
    // heading or blockquote) or a leading `-`/`*`/`+` followed by
    // whitespace (could create a list item). A leading `\d+.<space>`
    // escape was previously included, but NHM applies these escapes to
    // the text content of headings BEFORE prefixing `### ` etc.: a
    // heading like `<h3>1. Set up the project</h3>` becomes
    // `### 1\. Set up the project`, and AFDocs'
    // markdown-content-parity stripper does not consume the literal `\`,
    // so the segment fails to match the HTML side `1. Set up the
    // project`. Body lists are emitted by NHM's `<ol>`/`<li>`
    // translators directly (which insert their own `1. ` markers), so
    // dropping this escape only affects free-standing `1. foo` text at
    // line start — which our docs do not produce outside list contexts.
    // NHM's TS signature documents the replacement as a string, but it
    // passes the tuple straight through to `String.prototype.replace()`,
    // which accepts a function at runtime; the function form is the only
    // way to express the per-branch backslash positioning below.
    globalEscape: [/`/g, '\\$&'],
    lineStartEscape: [
      /^([#>])|^([-*+])(?=\s)/gm,
      (match, hashOrGt, bullet) => {
        if (hashOrGt !== undefined) return '\\' + hashOrGt
        if (bullet !== undefined) return '\\' + bullet
        return match
      },
    ],
  }
  const customTranslators = {
    // Keep `<details>` and `<summary>` as raw HTML wrappers (GFM renders
    // them natively in `.md`), but let NHM convert their children to
    // markdown so the body of a collapsible block is plain markdown — not
    // raw HTML chrome.
    //
    // The blank line between `</summary>` and the first content element is
    // load-bearing: GFM-flavoured markdown parsers only treat inline-HTML
    // children as markdown when there's a blank line separator. The
    // `postfix: '</summary>\n\n'` plus NHM's own `\n\n` around block
    // children produce that separator.
    //
    // The previous translator returned `content: node.outerHTML`, which
    // embedded Docusaurus class wrappers (`details_lb9f`,
    // `collapsibleContent_i85q`, etc.) verbatim into the .md. AFDocs'
    // markdown-content-parity normalizer collapses `<x>` to its content,
    // jamming those class names into adjacent prose and breaking
    // substring matches against the rendered HTML's clean text segments.
    // The cheerio pre-pass in `htmlToMarkdown` flattens those wrappers
    // before NHM ever sees the tree.
    details: {
      prefix: '<details>\n',
      postfix: '\n</details>',
      surroundingNewlines: 2,
      noEscape: true,
    },
    summary: {
      prefix: '<summary>',
      postfix: '</summary>\n\n',
      noEscape: true,
    },
  }
  return new NodeHtmlMarkdown(options, customTranslators)
}

/**
 * Prepend a single-line blockquote pointing to `/llms.txt` to every per-page
 * `.md`. Idempotent: skips files that already contain the directive (so
 * scripts/verify-llms-output.js can be re-run safely against an existing
 * outDir).
 */
async function prependMdDirective(outDir) {
  const mdFiles = await collectMarkdownFiles(outDir)
  let updated = 0
  for (const mdAbs of mdFiles) {
    const text = await fs.readFile(mdAbs, 'utf8')
    if (text.includes(MD_DIRECTIVE_LINE)) continue

    // If a file still has YAML frontmatter (i.e. `regenerateMdFromHtml`
    // skipped it because no HTML sibling was found), insert the directive
    // after the closing `---` so frontmatter parsers still see the document
    // as well-formed.
    let next
    const fmMatch = text.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/)
    if (fmMatch) {
      const idx = fmMatch[0].length
      next = text.slice(0, idx) + '\n' + MD_DIRECTIVE_LINE + '\n\n' + text.slice(idx)
    } else {
      next = MD_DIRECTIVE_LINE + '\n\n' + text
    }
    await fs.writeFile(mdAbs, next, 'utf8')
    updated++
  }
  return updated
}

/**
 * Convert a `vercel.json` redirect `source` into an anchored RegExp matching a
 * URL pathname (trailing slash stripped). Mirrors Vercel's path-to-regexp
 * subset we use: `:name*` / `:name+` match across segments, `:name` matches a
 * single segment.
 */
function redirectSourceToRegExp(source) {
  let s = source.replace(/\/+$/, '')
  // Escape regex metacharacters, but leave `:`/`*`/`+` for param handling.
  s = s.replace(/[.^${}()|[\]\\?]/g, '\\$&')
  // `:name*` or `:name+` -> match across one or more segments (`.*`).
  s = s.replace(/:\w+[*+]/g, '.*')
  // `:name` -> match a single path segment.
  s = s.replace(/:\w+/g, '[^/]+')
  return new RegExp(`^${s}$`)
}

/**
 * Load the list of redirect matchers from `vercel.json` (located in the repo
 * root, one level above the build `outDir`). Returns an empty array if the file
 * is missing or unparseable so sitemap normalization degrades gracefully.
 */
async function loadRedirectMatchers(outDir) {
  const vercelPath = path.join(outDir, '..', 'vercel.json')
  let raw
  try {
    raw = await fs.readFile(vercelPath, 'utf8')
  } catch {
    return []
  }
  let parsed
  try {
    parsed = JSON.parse(raw)
  } catch {
    return []
  }
  const redirects = Array.isArray(parsed.redirects) ? parsed.redirects : []
  const matchers = []
  for (const r of redirects) {
    if (!r || typeof r.source !== 'string') continue
    try {
      matchers.push(redirectSourceToRegExp(r.source))
    } catch {
      // Ignore sources we can't compile.
    }
  }
  return matchers
}

/**
 * Normalize `build/sitemap.xml` so every listed URL returns 200 (not a 3XX):
 *
 *   - Strip the trailing slash from `<loc>`s whose final path segment contains
 *     a dot (Vercel serves these without a trailing slash; see
 *     `stripDottedTrailingSlashInMetadata`).
 *   - Drop entire `<url>` entries whose pathname is shadowed by a `vercel.json`
 *     redirect (e.g. `.../eth_newpendingtransactionfilter/`, `.../tron/web/`),
 *     since those 3XX-redirect on the deployed site and should not be indexed.
 */
async function normalizeSitemap(outDir, siteUrl) {
  const xmlPath = path.join(outDir, 'sitemap.xml')
  let xml
  try {
    xml = await fs.readFile(xmlPath, 'utf8')
  } catch {
    return { skipped: true, rewritten: 0, dropped: 0 }
  }

  const firstIdx = xml.indexOf('<url>')
  const lastIdx = xml.lastIndexOf('</url>')
  if (firstIdx === -1 || lastIdx === -1) {
    return { skipped: false, rewritten: 0, dropped: 0 }
  }
  const head = xml.slice(0, firstIdx)
  const tail = xml.slice(lastIdx + '</url>'.length)
  const blocksRegion = xml.slice(firstIdx, lastIdx + '</url>'.length)
  const blocks = blocksRegion.match(/<url>[\s\S]*?<\/url>/g) || []

  const matchers = await loadRedirectMatchers(outDir)
  let rewritten = 0
  let dropped = 0
  const kept = []

  for (const block of blocks) {
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/)
    if (!locMatch) {
      kept.push(block)
      continue
    }
    const loc = locMatch[1].trim()
    let pathname
    try {
      pathname = loc.startsWith(siteUrl) ? loc.slice(siteUrl.length) : new URL(loc).pathname
    } catch {
      pathname = loc
    }
    if (!pathname.startsWith('/')) pathname = `/${pathname}`
    const pathNoSlash = pathname.replace(/\/+$/, '') || '/'

    if (matchers.some(re => re.test(pathNoSlash))) {
      dropped++
      continue
    }

    if (lastSegmentHasDot(pathname)) {
      const newLoc = loc.replace(/\/+$/, '')
      if (newLoc !== loc) {
        kept.push(block.replace(/<loc>[^<]+<\/loc>/, `<loc>${newLoc}</loc>`))
        rewritten++
        continue
      }
    }
    kept.push(block)
  }

  const newXml = head + kept.join('\n') + tail
  if (newXml !== xml) {
    await fs.writeFile(xmlPath, newXml, 'utf8')
  }
  return { skipped: false, rewritten, dropped }
}

/**
 * Read `<loc>` URLs from build/sitemap.xml. Returns null if the sitemap is
 * absent (e.g. when the script is run against an outDir that wasn't produced
 * by a full Docusaurus build).
 */
async function readSitemapUrls(outDir) {
  const xmlPath = path.join(outDir, 'sitemap.xml')
  let xml
  try {
    xml = await fs.readFile(xmlPath, 'utf8')
  } catch {
    return null
  }
  const matches = xml.match(/<loc>([^<]+)<\/loc>/g) || []
  return matches.map(m => m.replace(/<\/?loc>/g, '').trim())
}

/**
 * Prune links from per-section LINK-INDEX `llms-*.txt` files (i.e. the
 * `fullContent: false` ones — filenames not containing `-full`) whose target
 * page is absent from the build's sitemap.
 *
 * The `-full.txt` files are intentionally left alone: they intersperse
 * markdown links with embedded page content, so removing a single link line
 * would orphan the content block beneath it and corrupt the file. The
 * link-index files are pure link lists, so safe to filter line-by-line.
 */
async function pruneStaleLlmsLinks(outDir, sitemapUrls, siteUrl) {
  // Normalize sitemap URLs so trailing-slash variants both match.
  const sitemapSet = new Set()
  for (const url of sitemapUrls) {
    sitemapSet.add(url)
    sitemapSet.add(url.endsWith('/') ? url.slice(0, -1) : url + '/')
  }

  const entries = await fs.readdir(outDir, { withFileTypes: true })
  let removed = 0
  let fileCount = 0

  for (const entry of entries) {
    if (!entry.isFile()) continue
    if (!/^llms-[^.]+\.txt$/.test(entry.name)) continue
    if (entry.name.includes('-full')) continue
    if (entry.name.startsWith('llms-all-')) continue

    const abs = path.join(outDir, entry.name)
    const text = await fs.readFile(abs, 'utf8')
    const lines = text.split('\n')
    const filtered = []
    let changed = false

    for (const line of lines) {
      const linkMatch = line.match(/\[[^\]]+\]\(([^)]+)\)/)
      if (linkMatch) {
        const url = linkMatch[1].trim()
        if (url.startsWith(siteUrl + '/')) {
          // Map a `<siteUrl>/<path>.md` link to its corresponding HTML route.
          // Docusaurus is configured with `trailingSlash: true`, so the route
          // ends with `/`. Try both forms to be safe.
          const htmlUrl = url.endsWith('.md') ? url.slice(0, -'.md'.length) + '/' : url
          const htmlNoSlash = htmlUrl.endsWith('/') ? htmlUrl.slice(0, -1) : htmlUrl
          if (!sitemapSet.has(htmlUrl) && !sitemapSet.has(htmlNoSlash)) {
            removed++
            changed = true
            continue
          }
        }
      }
      filtered.push(line)
    }

    if (changed) {
      await fs.writeFile(abs, filtered.join('\n'), 'utf8')
      fileCount++
    }
  }

  return { removed, fileCount }
}

/**
 * Generate `llms-all-<product>.txt` files from the build's sitemap. Each
 * file lists every sitemap URL whose path starts with the matching prefix
 * (and a `llms-all-misc.txt` for anything that doesn't).
 *
 * Each entry takes the form `- [<path>](<url>.md)`, pointing at the per-page
 * markdown that exists in the build. The static root `llms.txt` references
 * each of these files so the AFDocs walker (which descends one level into
 * linked `.txt` files) discovers every sitemap URL, pushing
 * `llms-txt-coverage` to 100%.
 */
async function generateAllPagesIndex(outDir, siteUrl, sitemapUrls) {
  const buckets = new Map()
  for (const b of ALL_PAGES_BUCKETS) {
    buckets.set(b.filename, { ...b, links: [] })
  }
  buckets.set(ALL_PAGES_MISC_FILENAME, {
    filename: ALL_PAGES_MISC_FILENAME,
    title: ALL_PAGES_MISC_TITLE,
    prefix: '',
    links: [],
  })

  let urlCount = 0
  const seen = new Set()

  for (const rawUrl of sitemapUrls) {
    if (!rawUrl.startsWith(siteUrl)) continue
    const pathPart = rawUrl.slice(siteUrl.length) || '/'

    // Skip the homepage (no .md sibling — root LLMS surface is static/llms.txt)
    // and AFDocs-builtin non-doc patterns.
    if (pathPart === '/' || pathPart === '') continue
    if (
      /^\/(blog|pricing|about|career|careers|job|jobs|contact|legal|privacy|terms|login|signup|sign-up|sign-in|register|404|500)(\/|$)/.test(
        pathPart
      )
    ) {
      continue
    }

    if (seen.has(pathPart)) continue
    seen.add(pathPart)

    // Map a directory-style URL (`/foo/bar/`) to its `.md` sibling
    // (`/foo/bar.md`). `trailingSlash: true` is assumed.
    const mdPath = pathPart.endsWith('/') ? pathPart.slice(0, -1) + '.md' : pathPart + '.md'
    const mdUrl = `${siteUrl}${mdPath}`
    const label = pathPart.replace(/^\/|\/$/g, '') || pathPart

    let bucket = null
    for (const b of ALL_PAGES_BUCKETS) {
      if (pathPart.startsWith(b.prefix)) {
        bucket = buckets.get(b.filename)
        break
      }
    }
    if (!bucket) bucket = buckets.get(ALL_PAGES_MISC_FILENAME)
    bucket.links.push(`- [${label}](${mdUrl})`)
    urlCount++
  }

  let fileCount = 0
  for (const bucket of buckets.values()) {
    if (bucket.links.length === 0) continue
    const header =
      `# ${bucket.title}\n\n` +
      `> Auto-generated complete index of every page in this section. ` +
      `Generated from build/sitemap.xml so coverage stays in sync with the deployed site.\n\n` +
      `## Pages\n\n`
    const body = bucket.links.join('\n') + '\n'
    await fs.writeFile(path.join(outDir, bucket.filename), header + body, 'utf8')
    fileCount++
  }

  return { fileCount, urlCount }
}

/**
 * Rewrite every literal occurrence of `fromHost` to `toHost` in:
 *
 *   - `build/llms*.txt` (root): hand-curated `llms.txt`, the upstream-emitted
 *     per-section `llms-<product>.txt` / `llms-<product>-full.txt`, and the
 *     `llms-all-<product>.txt` we generate from the sitemap.
 *   - Every per-page `.md` under `outDir` (excluding `llms*.md` to mirror
 *     `collectMarkdownFiles()`).
 *
 * Used only on Vercel preview/development deployments to swap the canonical
 * production host (`https://docs.metamask.io`) for the deploy's auto-assigned
 * `https://*.vercel.app` host so AFDocs running against the preview URL sees
 * same-origin links it can resolve, and so the `llms-txt-coverage` walker
 * actually descends into the linked `.txt` files (it skips cross-origin
 * links). HTML files are intentionally untouched: the alternate link is now
 * path-only (`/foo.md`), and rewriting other absolute URLs in HTML would
 * break canonical/OG/JSON-LD metadata that should keep the canonical host
 * even on preview.
 *
 * Plain string replace is sufficient and safer than a regex: `fromHost` is a
 * fully-qualified URL, so the chance of an accidental match inside prose is
 * effectively zero.
 */
async function rewriteHostInBuildArtifacts(outDir, fromHost, toHost) {
  if (fromHost === toHost) return { txtFiles: 0, mdFiles: 0 }

  let txtFiles = 0
  let mdFiles = 0

  const rootEntries = await fs.readdir(outDir, { withFileTypes: true })
  for (const entry of rootEntries) {
    if (!entry.isFile()) continue
    if (!/^llms.*\.txt$/.test(entry.name)) continue
    const abs = path.join(outDir, entry.name)
    const text = await fs.readFile(abs, 'utf8')
    if (!text.includes(fromHost)) continue
    await fs.writeFile(abs, text.split(fromHost).join(toHost), 'utf8')
    txtFiles++
  }

  const mdAbsPaths = await collectMarkdownFiles(outDir)
  for (const mdAbs of mdAbsPaths) {
    const text = await fs.readFile(mdAbs, 'utf8')
    if (!text.includes(fromHost)) continue
    await fs.writeFile(mdAbs, text.split(fromHost).join(toHost), 'utf8')
    mdFiles++
  }

  return { txtFiles, mdFiles }
}

function toPosix(p) {
  return p.split(path.sep).join('/')
}
