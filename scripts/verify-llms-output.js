#!/usr/bin/env node
/**
 * Dev-only sanity check that invokes docusaurus-plugin-llms against the current
 * docs source tree. The exact options object used by the production build is
 * imported from `src/plugins/llms-html-injector/options.js`, so this script
 * cannot silently drift from `docusaurus.config.js`.
 *
 * After the move to a hand-curated root `static/llms.txt`, the standard
 * llms.txt / llms-full.txt generators are disabled in production. This script
 * mirrors that: both flags are off, customLLMFiles drives every per-section
 * file, and the static root is copied into the verify outDir so the post-
 * injector summary reflects what end users actually see at /llms.txt.
 *
 * Usage: node scripts/verify-llms-output.js [outDir]
 */

const path = require('path')
const fs = require('fs/promises')

// Single source of truth shared with `docusaurus.config.js`. Both the
// production build and this sanity check now consume the exact same options
// object (ignoreFiles, customLLMFiles, pathTransformation, etc.), so the
// previous "keep these two arrays in sync by comment" arrangement — and its
// silent-drift risk — is gone.
const llmsPluginOptions = require('../src/plugins/llms-html-injector/options')

async function main() {
  const siteDir = path.resolve(__dirname, '..')
  const outDir = path.resolve(siteDir, process.argv[2] || '.llms-verify')

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

main().catch(err => {
  console.error(err)
  process.exit(1)
})
