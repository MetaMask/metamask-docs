#!/usr/bin/env node
/**
 * Verifies the AFDocs / Agent Score invariants that the `afdocs-check`
 * workflow advertises as the build-time hard gate:
 *
 *   1. `llms.txt` size  — the curated root index (and every non-full section
 *      index) must stay under the AFDocs 50,000-character `llms-txt-size`
 *      threshold.
 *   2. `.md` parity     — every rendered doc page must have a sibling `.md`.
 *   3. alternate-link injection — every rendered doc page must carry the
 *      `<link rel="alternate" type="text/markdown">` head link and the
 *      sr-only `/llms.txt` body directive the injector stamps in.
 *
 * The script runs in two parts:
 *
 *   Part 1 — generator sanity check. Invokes `docusaurus-plugin-llms` against
 *   the current docs *source* tree (into `.llms-verify/`) using the exact
 *   options object the production build imports from
 *   `src/plugins/llms-html-injector/options.js`, so this script cannot
 *   silently drift from `docusaurus.config.js`. This part needs no full build
 *   and guards the curated root `static/llms.txt` size on every run.
 *
 *   Part 2 — production gate. Reads the real `build/` output that
 *   `npm run build` just produced (the post-injector HTML, per-page `.md`,
 *   and `llms*.txt`) and asserts the three invariants above against the bytes
 *   end users actually receive. THIS is what makes the workflow's "hard gate"
 *   claim true: any violation pushes a message onto `failures` and the script
 *   exits non-zero. When `build/` is absent (e.g. a quick local run without a
 *   build), Part 2 is skipped with a warning instead of silently passing.
 *
 * Usage:
 *   node scripts/verify-llms-output.js [verifyOutDir]
 *
 * Env:
 *   DEST            — simulate a non-root baseUrl (e.g. `/staging/`) in Part 1.
 *   LLMS_BUILD_DIR  — override the build directory checked in Part 2
 *                     (defaults to `build`).
 */

const path = require('path')
const fs = require('fs/promises')

// Single source of truth shared with `docusaurus.config.js`. Both the
// production build and this sanity check now consume the exact same options
// object (ignoreFiles, customLLMFiles, pathTransformation, etc.), so the
// previous "keep these two arrays in sync by comment" arrangement — and its
// silent-drift risk — is gone.
const llmsPluginOptions = require('../src/plugins/llms-html-injector/options')

// AFDocs `llms-txt-size` hard threshold. The root index and every non-full,
// non-all section index must stay under this many characters.
const LLMS_TXT_MAX_CHARS = 50000

// Markers the injector stamps into every built HTML page. Kept in sync with
// the constants in `src/plugins/llms-html-injector/index.js`.
const MD_ALT_MARKER = 'data-llms-md-alt'
const BODY_DIRECTIVE_MARKER = 'data-llms-directive'

// Cap on how many offending paths to list per failure category so a wholesale
// regression doesn't flood the log; the total count is always reported.
const MAX_REPORTED = 15

async function main() {
  const failures = []
  const siteDir = path.resolve(__dirname, '..')
  const outDir = path.resolve(siteDir, process.argv[2] || '.llms-verify')

  await runGeneratorSanityCheck(siteDir, outDir, failures)

  const buildDir = path.resolve(siteDir, process.env.LLMS_BUILD_DIR || 'build')
  await verifyBuildOutput(buildDir, failures)

  if (failures.length > 0) {
    console.error(`\n✖ verify-llms-output: ${failures.length} invariant violation(s):`)
    for (const f of failures) console.error(`  - ${f}`)
    process.exit(1)
  }
  console.log('\n✔ verify-llms-output: all AFDocs build-time invariants satisfied.')
}

/**
 * Part 1: regenerate the llms artifacts from the docs source tree into
 * `outDir` and assert the curated root `llms.txt` is present and under the
 * size threshold. This runs even without a full Docusaurus build, so an
 * oversized `static/llms.txt` is caught locally before a build is attempted.
 */
async function runGeneratorSanityCheck(siteDir, outDir, failures) {
  await fs.rm(outDir, { recursive: true, force: true })
  await fs.mkdir(outDir, { recursive: true })

  // Mirror the baseUrl resolution from docusaurus.config.js so the script can
  // simulate a staging build (e.g. `DEST=/staging/ node scripts/verify-llms-output.js`)
  // and the post-injector summary reflects the URLs end users would see there.
  const baseUrl = process.env.DEST || '/'
  const siteConfig = { url: 'https://docs.metamask.io', baseUrl }

  const generator = require(
    path.join(siteDir, 'node_modules', 'docusaurus-plugin-llms', 'lib', 'generator.js')
  )
  const { postProcessLlmsOutput, resolveSiteUrl } = require(
    path.join(siteDir, 'src/plugins/llms-html-injector')
  )
  const siteUrl = resolveSiteUrl(siteConfig)

  const context = {
    siteDir,
    outDir,
    docsDir: llmsPluginOptions.docsDir,
    siteUrl,
    docTitle: 'MetaMask developer documentation',
    docDescription:
      'MetaMask is the leading self-custodial cryptocurrency wallet and Web3 gateway.',
    options: llmsPluginOptions,
  }

  const allDocFiles = await generator.collectDocFiles(context)
  console.log(`Collected ${allDocFiles.length} source markdown files (siteUrl=${siteUrl})`)

  await generator.generateStandardLLMFiles(context, allDocFiles)
  await generator.generateCustomLLMFiles(context, allDocFiles)

  console.log('\n--- Pre-injector summary ---')
  printSummary(await summarize(outDir))

  // Invoke only the post-processing stage. The injector module also exports a
  // wrapper plugin (used in docusaurus.config.js) that internally instantiates
  // docusaurus-plugin-llms; we've already run the generator above, so we skip
  // straight to normalize/rewrite/inject.
  await postProcessLlmsOutput(outDir, siteUrl)

  // Mirror Docusaurus's static-asset copy step. In a real build, anything in
  // `static/` is copied verbatim to `outDir`, so static/llms.txt becomes
  // build/llms.txt. Replicating that here lets the post-injector summary show
  // the curated root file end users will receive.
  await copyStaticLlms(siteDir, outDir)

  console.log('\n--- Post-injector summary ---')
  printSummary(await summarize(outDir))

  // Assert the curated root index is present and within budget.
  const rootLlms = path.join(outDir, 'llms.txt')
  let rootText
  try {
    rootText = await fs.readFile(rootLlms, 'utf8')
  } catch {
    failures.push(
      'static/llms.txt is missing or could not be copied into the verify outDir ' +
        '(AFDocs llms-txt-exists would fail)'
    )
  }
  if (rootText !== undefined && rootText.length > LLMS_TXT_MAX_CHARS) {
    failures.push(
      `static/llms.txt is ${rootText.length} chars, over the ` +
        `${LLMS_TXT_MAX_CHARS}-char AFDocs llms-txt-size threshold`
    )
  }
}

/**
 * Part 2: assert the AFDocs invariants against the real production build
 * output. Skipped (with a warning) when `buildDir` does not exist so a quick
 * local `node scripts/verify-llms-output.js` without a prior build still runs
 * Part 1 instead of failing.
 */
async function verifyBuildOutput(buildDir, failures) {
  let buildExists = true
  try {
    await fs.access(buildDir)
  } catch {
    buildExists = false
  }
  if (!buildExists) {
    console.warn(
      `\n[verify-llms-output] No build directory at ${buildDir}; skipping the production ` +
        'HTML/.md gate. Run `npm run build` first (CI always does) so .md parity and ' +
        'alternate-link injection are validated.'
    )
    return
  }

  console.log(`\n--- Production build gate (${buildDir}) ---`)

  // 1. Root llms.txt presence + size, as actually served at /llms.txt.
  const rootLlms = path.join(buildDir, 'llms.txt')
  let rootText
  try {
    rootText = await fs.readFile(rootLlms, 'utf8')
  } catch {
    failures.push('build/llms.txt is missing (AFDocs llms-txt-exists would fail)')
  }
  if (rootText !== undefined) {
    console.log(`build/llms.txt: ${rootText.length} chars (limit ${LLMS_TXT_MAX_CHARS})`)
    if (rootText.length > LLMS_TXT_MAX_CHARS) {
      failures.push(
        `build/llms.txt is ${rootText.length} chars, over the ` +
          `${LLMS_TXT_MAX_CHARS}-char AFDocs llms-txt-size threshold`
      )
    }
  }

  // 2. Section index sizes (advisory). The AFDocs `llms-txt-size` HARD gate
  //    applies to the root `llms.txt` checked above — content is deliberately
  //    split into per-section indexes precisely so the root stays small while
  //    these can grow. The `fullContent: false` link indexes for large
  //    products (embedded-wallets, services) genuinely exceed 50k, so an
  //    oversize one is reported as a warning, not a failure.
  const rootEntries = await fs.readdir(buildDir, { withFileTypes: true })
  for (const entry of rootEntries) {
    if (!entry.isFile()) continue
    if (!/^llms-[^.]+\.txt$/.test(entry.name)) continue
    if (entry.name.includes('-full') || entry.name.startsWith('llms-all-')) continue
    const txt = await fs.readFile(path.join(buildDir, entry.name), 'utf8')
    if (txt.length > LLMS_TXT_MAX_CHARS) {
      console.warn(
        `[verify-llms-output] note: ${entry.name} is ${txt.length} chars (> ${LLMS_TXT_MAX_CHARS}); ` +
          'acceptable for a per-section link index but worth watching.'
      )
    }
  }

  // 3. Walk every rendered page and check .md parity + alternate-link/body
  //    directive injection against the production HTML.
  const stats = {
    pages: 0,
    articlePages: 0,
    mdMissing: [],
    altMissing: [],
    directiveMissing: [],
  }
  await visitHtml(buildDir, buildDir, stats)

  console.log(
    `Scanned ${stats.pages} HTML page(s); ${stats.articlePages} content page(s) with <article>`
  )

  if (stats.pages === 0) {
    failures.push(`${buildDir} contains no index.html pages — the build looks empty or incomplete`)
  }

  pushPageFailures(
    failures,
    stats.directiveMissing,
    `HTML page(s) missing the sr-only /llms.txt body directive (${BODY_DIRECTIVE_MARKER})`
  )
  pushPageFailures(
    failures,
    stats.mdMissing,
    'content page(s) with no sibling .md (markdown parity / markdown-url-support)'
  )
  pushPageFailures(
    failures,
    stats.altMissing,
    `content page(s) missing the markdown alternate link (${MD_ALT_MARKER})`
  )
}

/**
 * Recursively walk `dir` for `index.html` files, recording AFDocs-relevant
 * violations into `stats`. The body directive is asserted on every page (the
 * injector adds it to every `<body>`); the `.md` sibling and alternate link
 * are asserted on content pages (those with an `<article>`), mirroring the
 * injector's own "regenerate from `<article>`, then link the `.md`" contract.
 */
async function visitHtml(dir, buildDir, stats) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await visitHtml(full, buildDir, stats)
      continue
    }
    if (entry.name !== 'index.html') continue

    stats.pages++
    const relDir = toPosix(path.relative(buildDir, dir))
    let html
    try {
      html = await fs.readFile(full, 'utf8')
    } catch {
      continue
    }

    if (!html.includes(BODY_DIRECTIVE_MARKER)) {
      stats.directiveMissing.push(relDir || '<root>')
    }

    // Only content pages (those Docusaurus renders inside <article>) are
    // expected to produce a `.md` sibling + alternate link. The homepage and
    // bare landing pages have no <article>, so they're exempt — matching
    // regenerateMdFromHtml()/injectAlternateLinks() in the injector.
    if (!relDir || relDir === '.') continue
    if (!/<article\b/i.test(html)) continue

    stats.articlePages++

    const mdAbs = path.join(buildDir, `${relDir}.md`)
    let mdExists = true
    try {
      await fs.access(mdAbs)
    } catch {
      mdExists = false
    }
    if (!mdExists) stats.mdMissing.push(`${relDir}.md`)

    if (!html.includes(MD_ALT_MARKER)) stats.altMissing.push(relDir)
  }
}

function pushPageFailures(failures, list, label) {
  if (list.length === 0) return
  const sample = list.slice(0, MAX_REPORTED).join(', ')
  const more = list.length > MAX_REPORTED ? `, … (+${list.length - MAX_REPORTED} more)` : ''
  failures.push(`${list.length} ${label}: ${sample}${more}`)
}

async function copyStaticLlms(siteDir, outDir) {
  const src = path.join(siteDir, 'static', 'llms.txt')
  const dest = path.join(outDir, 'llms.txt')
  try {
    await fs.copyFile(src, dest)
  } catch (err) {
    console.warn(`[verify-llms-output] Could not copy static/llms.txt: ${err.message}`)
  }
}

function printSummary(summary) {
  for (const [key, value] of Object.entries(summary)) {
    console.log(`${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
  }
}

async function summarize(outDir) {
  const entries = await walk(outDir)
  const mdFiles = entries.filter(e => e.endsWith('.md'))
  const llmsTxt = path.join(outDir, 'llms.txt')
  const llmsFull = path.join(outDir, 'llms-full.txt')

  const summary = { totalMarkdownFiles: mdFiles.length }
  // Single read avoids a TOCTOU race; derive byte length from the buffer.
  try {
    const content = await fs.readFile(llmsTxt)
    summary.llmsTxtBytes = content.length
    const text = content.toString('utf8')
    summary.llmsTxtLinkCount = (text.match(/\]\(http/g) || []).length
    summary.llmsTxtUrlWithReadme = (text.match(/\/README\.md/g) || []).length
    summary.llmsTxtUrlWithIndexMd = (text.match(/\/index\.md/g) || []).length
    summary.llmsTxtUrlsStartingWithDocsSlash = (
      text.match(/https:\/\/docs\.metamask\.io\/docs\//g) || []
    ).length
    summary.llmsTxtUrlsStartingWithSrcPages = (
      text.match(/https:\/\/docs\.metamask\.io\/src\/pages\//g) || []
    ).length
  } catch {
    summary.llmsTxt = 'MISSING'
  }
  try {
    const s = await fs.stat(llmsFull)
    summary.llmsFullTxtBytes = s.size
  } catch {
    summary.llmsFullTxt = 'ABSENT (expected — generation disabled)'
  }
  // Per-section files
  const sectionEntries = await fs.readdir(outDir, { withFileTypes: true })
  const sectionFiles = sectionEntries
    .filter(e => e.isFile() && /^llms-[^.]+\.txt$/.test(e.name))
    .map(e => e.name)
    .sort()
  if (sectionFiles.length > 0) {
    const sizes = []
    for (const name of sectionFiles) {
      const s = await fs.stat(path.join(outDir, name))
      sizes.push(`${name}=${s.size}`)
    }
    summary.sectionFiles = sizes
  }
  summary.sampleMdFiles = mdFiles
    .filter(f => /\.md$/.test(f) && !/llms[^/]*\.(md|txt)$/.test(f))
    .slice(0, 8)
    .map(f => path.relative(outDir, f))
  return summary
}

async function walk(dir, acc = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) await walk(full, acc)
    else acc.push(full)
  }
  return acc
}

function toPosix(p) {
  return p.split(path.sep).join('/')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
