const path = require('path')
const fs = require('fs/promises')

// Sentinel attributes / strings used to make HTML and markdown post-processing
// idempotent across re-runs (e.g. when scripts/verify-llms-output.js is invoked
// against an already-processed outDir).
const MD_ALT_MARKER = 'data-llms-md-alt'
const BODY_DIRECTIVE_MARKER = 'data-llms-directive'
const MD_DIRECTIVE_LINE = '> For the complete documentation index, see [llms.txt](/llms.txt).'

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
 *    rendered HTML `<article>` (turndown). This is the only way to get true
 *    HTML/`.md` parity for pages assembled from MDX `import` partials, which
 *    the upstream plugin cannot resolve. Fixes `markdown-content-parity`.
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

  const replaced = await replaceMdWithHtmlDerived(outDir)
  console.log(
    `[llms-html-injector] Regenerated ${replaced.replaced} per-page .md from rendered HTML ` +
      `(skipped ${replaced.skipped}: no HTML sibling or empty <article>)`
  )

  const directiveCount = await prependMdDirective(outDir)
  console.log(`[llms-html-injector] Prepended llms.txt directive to ${directiveCount} .md file(s)`)

  const rewriteCount = await rewriteLlmsIndexes(outDir, renames, siteUrl)
  console.log(`[llms-html-injector] Updated URLs in ${rewriteCount} llms*.txt file(s)`)

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

  const { injected, missing, skippedRoot, bodyInjected } = await injectAlternateLinks(
    outDir,
    siteUrl
  )
  console.log(
    `[llms-html-injector] Injected markdown alternate link into ${injected} HTML pages ` +
      `(skipped ${missing} pages with no matching .md sibling, ` +
      `${skippedRoot} root index.html page(s) by design)`
  )
  console.log(
    `[llms-html-injector] Injected sr-only llms.txt body directive into ${bodyInjected} HTML pages`
  )
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
 */
async function injectAlternateLinks(outDir, siteUrl) {
  let injected = 0
  let missing = 0
  let skippedRoot = 0
  let bodyInjected = 0
  await visit(outDir)
  return { injected, missing, skippedRoot, bodyInjected }

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
      }
    }
  }

  async function injectOne(htmlAbs) {
    const relDir = toPosix(path.relative(outDir, path.dirname(htmlAbs)))
    let html
    try {
      html = await fs.readFile(htmlAbs, 'utf8')
    } catch {
      return { altLink: false, bodyDirective: false }
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
        const href = `${siteUrl}/${mdRel}`
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

    if (changed) {
      await fs.writeFile(htmlAbs, html, 'utf8')
    }

    return { altLink: altLinkResult, bodyDirective: bodyDirectiveAdded }
  }
}

/**
 * Replace each per-page `.md` body with markdown derived from the rendered
 * HTML `<article>`. This is the only mechanism that achieves true HTML/MD
 * parity: the upstream `docusaurus-plugin-llms` reads raw source MDX and
 * cannot resolve `import` partials, leaving pages built from imported
 * components nearly empty in the upstream `.md` (e.g.
 * `services/reference/.../eth_sendrawtransaction`).
 *
 * Algorithm:
 *   1. Walk every URL-aligned `.md` (set produced by `normalizeMarkdownLayout`).
 *   2. Locate the sibling `index.html` (path = `<md without .md>/index.html`).
 *   3. Parse with cheerio, select `<article>`, strip everything tagged with
 *      `data-markdown-ignore` plus nav/script/style/aside.
 *   4. Convert the remaining HTML to markdown via turndown (GFM enabled).
 *   5. Overwrite the `.md` with the new body.
 *
 * Frontmatter is intentionally not preserved: the upstream-generated `.md`
 * frontmatter mirrors the source MDX frontmatter, but the rendered HTML
 * already inlines the resolved title/description/etc. into the article body
 * via Docusaurus components, so the new `.md` is self-contained.
 */
async function replaceMdWithHtmlDerived(outDir) {
  const turndownService = makeTurndownService()
  const cheerio = require('cheerio')
  const mdFiles = await collectMarkdownFiles(outDir)

  let replaced = 0
  let skipped = 0

  // Sequential is fine: ~2.5k pages * ~10ms parse + turndown = well under a
  // minute. Parallelism would add complexity without measurable benefit at
  // this scale and risk hitting the open-file-descriptor limit.
  for (const mdAbs of mdFiles) {
    const relMd = toPosix(path.relative(outDir, mdAbs))
    const baseName = relMd.slice(0, -'.md'.length)
    const htmlAbs = path.join(outDir, baseName, 'index.html')

    let html
    try {
      html = await fs.readFile(htmlAbs, 'utf8')
    } catch {
      skipped++
      continue
    }

    const newBody = htmlToMarkdown(html, cheerio, turndownService)
    if (!newBody) {
      skipped++
      continue
    }

    await fs.writeFile(mdAbs, newBody, 'utf8')
    replaced++
  }

  return { replaced, skipped }
}

function htmlToMarkdown(html, cheerio, turndownService) {
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
  // simply pass the container through to turndown, the resulting markdown
  // contains every math expression two or three times (mrow text + annotation
  // text + visual text), which AFDocs' content-parity check counts as
  // "missing from markdown" relative to the rendered HTML's deduplicated
  // visual text. Replace every `.katex` with just the LaTeX source from
  // `<annotation encoding="application/x-tex">`, wrapped as inline math.
  $article.find('.katex').each((_, el) => {
    const $el = $(el)
    const annotation = $el.find('annotation[encoding="application/x-tex"]').first().text().trim()
    if (annotation) {
      // Use a single-dollar inline math fence; remark-math (already in the
      // repo's remark plugin chain) round-trips this format. The leading and
      // trailing spaces keep the fence from glomming onto adjacent words.
      $el.replaceWith(` $${annotation}$ `)
    } else {
      // No annotation (rare). Fall back to the visual-only katex-html text.
      $el.replaceWith($el.find('.katex-html').text())
    }
  })

  // Strip elements that are intentionally human-only (chrome wrappers tagged
  // with data-markdown-ignore in src/theme/DocItem/Layout/index.jsx) plus
  // structural noise that turndown would otherwise leave as empty markdown.
  // `.katex` elements are gone by this point so the aria-hidden selector
  // only catches non-math hidden content (e.g. anchor link icons).
  $article.find('[data-markdown-ignore]').remove()
  $article.find('nav, script, style, aside, [aria-hidden="true"]').remove()
  // The body directive injected by injectAlternateLinks() lives outside
  // <article>, so it is not present here. No removal needed.

  const contentHtml = ($article.html() || '').trim()
  if (!contentHtml) return null

  const md = turndownService.turndown(contentHtml).trim()
  if (!md) return null
  return md + '\n'
}

function makeTurndownService() {
  const TurndownService = require('turndown')
  const { gfm } = require('turndown-plugin-gfm')
  const td = new TurndownService({
    headingStyle: 'atx',
    hr: '---',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    fence: '```',
    emDelimiter: '_',
    strongDelimiter: '**',
    linkStyle: 'inlined',
    linkReferenceStyle: 'full',
  })
  td.use(gfm)
  // Preserve `<details>`/`<summary>` (used by Docusaurus admonitions) as raw
  // HTML so collapsed content survives the conversion. Turndown's default
  // would strip the wrappers and keep only the inner text, losing structure.
  td.keep(['details', 'summary'])
  // Override the default escape so character sequences that have no
  // ambiguous meaning in our doc body — square brackets in prose like
  // "(string) [optional]", parentheses, hash symbols mid-sentence, asterisks
  // adjacent to letters etc. — don't get backslash-escaped. The default
  // turndown escape inserts `\[`, `\]`, `\(`, `\)`, `\#`, `\-`, `\>`, `\!`,
  // `\*`, `\_`, etc., none of which the AFDocs `markdown-content-parity`
  // normalizer strips. The result is segments like
  // `callGasLimit: (string) [optional] - description` failing to match
  // `callGasLimit: (string) \[optional\] - description` even though the
  // prose is identical. Underscores inside identifiers are also escaped by
  // default (`my_var` -> `my\_var`), which breaks the same substring check.
  //
  // This safe escape only neutralises the two sequences that would actually
  // produce broken markdown if left raw: a leading `#`/`>`/`-`/`*`/digit at
  // the start of a line (could create a heading/blockquote/list) and a
  // backtick mid-prose (could open an inline code span). Everything else is
  // left alone — the upstream HTML never had escapes there either, so the
  // markdown round-trip stays faithful to the source content.
  td.escape = function safeEscape(text) {
    return text
      .replace(/^([#>])/gm, '\\$1')
      .replace(/^([-*+])(\s)/gm, '\\$1$2')
      .replace(/^(\d+)\.(\s)/gm, '$1\\.$2')
  }
  return td
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

    // If a file still has YAML frontmatter (i.e. `replaceMdWithHtmlDerived`
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

function toPosix(p) {
  return p.split(path.sep).join('/')
}
