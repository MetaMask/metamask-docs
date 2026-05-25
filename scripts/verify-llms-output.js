#!/usr/bin/env node
/**
 * Dev-only sanity check that invokes docusaurus-plugin-llms against the current
 * docs source tree, using the same options we configured in docusaurus.config.js.
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

// Keep this list in sync with the customLLMFiles array in docusaurus.config.js.
// Section indexes (no fullContent) stay under the AFDocs 50KB recommendation
// for individual indexes; -full.txt files contain the bulk content per product.
const CUSTOM_LLM_FILES = [
  {
    filename: 'llms-embedded-wallets.txt',
    includePatterns: ['embedded-wallets/**/*.{md,mdx}'],
    fullContent: false,
    title: 'MetaMask Embedded Wallets documentation',
    description: 'Documentation links for MetaMask Embedded Wallets',
  },
  {
    filename: 'llms-embedded-wallets-full.txt',
    includePatterns: ['embedded-wallets/**/*.{md,mdx}'],
    fullContent: true,
    title: 'MetaMask Embedded Wallets documentation',
    description: 'Complete documentation for MetaMask Embedded Wallets',
  },
  {
    filename: 'llms-metamask-connect.txt',
    includePatterns: ['metamask-connect/**/*.{md,mdx}'],
    fullContent: false,
    title: 'MetaMask Connect documentation',
    description: 'Documentation links for MetaMask Connect',
  },
  {
    filename: 'llms-metamask-connect-full.txt',
    includePatterns: ['metamask-connect/**/*.{md,mdx}'],
    fullContent: true,
    title: 'MetaMask Connect documentation',
    description: 'Complete documentation for MetaMask Connect',
  },
  {
    filename: 'llms-smart-accounts-kit.txt',
    includePatterns: ['smart-accounts-kit/**/*.{md,mdx}'],
    fullContent: false,
    title: 'MetaMask Smart Accounts Kit documentation',
    description: 'Documentation links for MetaMask Smart Accounts Kit',
  },
  {
    filename: 'llms-smart-accounts-kit-full.txt',
    includePatterns: ['smart-accounts-kit/**/*.{md,mdx}'],
    fullContent: true,
    title: 'MetaMask Smart Accounts Kit documentation',
    description: 'Complete documentation for MetaMask Smart Accounts Kit',
  },
  {
    filename: 'llms-snaps.txt',
    includePatterns: ['snaps/**/*.{md,mdx}'],
    fullContent: false,
    title: 'Snaps documentation',
    description: 'Documentation links for Snaps',
  },
  {
    filename: 'llms-snaps-full.txt',
    includePatterns: ['snaps/**/*.{md,mdx}'],
    fullContent: true,
    title: 'Snaps documentation',
    description: 'Complete documentation for Snaps',
  },
  {
    filename: 'llms-wallet.txt',
    includePatterns: ['wallet/**/*.{md,mdx}'],
    fullContent: false,
    title: 'Wallet API documentation',
    description: 'Documentation links for Wallet API',
  },
  {
    filename: 'llms-wallet-full.txt',
    includePatterns: ['wallet/**/*.{md,mdx}'],
    fullContent: true,
    title: 'Wallet API documentation',
    description: 'Complete documentation for Wallet API',
  },
  {
    filename: 'llms-tutorials.txt',
    includePatterns: ['src/pages/tutorials/**/*.{md,mdx}'],
    fullContent: false,
    title: 'Tutorials',
    description: 'Documentation links for MetaMask tutorials',
  },
  {
    filename: 'llms-tutorials-full.txt',
    includePatterns: ['src/pages/tutorials/**/*.{md,mdx}'],
    fullContent: true,
    title: 'Tutorials',
    description: 'Complete documentation for MetaMask tutorials',
  },
  {
    filename: 'llms-dashboard.txt',
    includePatterns: ['developer-tools/dashboard/**/*.{md,mdx}'],
    fullContent: false,
    title: 'Developer dashboard documentation',
    description: 'Documentation links for MetaMask Developer dashboard',
  },
  {
    filename: 'llms-dashboard-full.txt',
    includePatterns: ['developer-tools/dashboard/**/*.{md,mdx}'],
    fullContent: true,
    title: 'Developer dashboard documentation',
    description: 'Complete documentation for MetaMask Developer dashboard',
  },
  {
    filename: 'llms-services.txt',
    includePatterns: ['services/**/*.md'],
    fullContent: false,
    title: 'Services documentation',
    description: 'Documentation links for MetaMask services',
  },
  {
    filename: 'llms-services-full.txt',
    includePatterns: ['services/**/*.md'],
    fullContent: true,
    title: 'Services documentation',
    description: 'Complete documentation for MetaMask services',
  },
]

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

  const options = {
    docsDir: '.',
    generateLLMsTxt: false,
    generateLLMsFullTxt: false,
    generateMarkdownFiles: true,
    excludeImports: true,
    removeDuplicateHeadings: true,
    pathTransformation: { ignorePaths: ['src/pages'] },
    ignoreFiles: [
      'node_modules/**',
      'build/**',
      '.docusaurus/**',
      '.llms-verify/**',
      '.cursor/**',
      '.github/**',
      '.husky/**',
      '.vscode/**',
      '.integrationBuilderCache/**',
      'scripts/**',
      'static/**',
      'src/components/**',
      'src/theme/**',
      'src/lib/**',
      'src/config/**',
      'src/hooks/**',
      'src/utils/**',
      'src/plugins/**',
      'src/specs/**',
      'src/client/**',
      'src/scss/**',
      'src/pages/quickstart/builder/**',
      'src/pages/quickstart/commonSteps/**',
      'i18n/**',
      '*.config.js',
      '*.json',
      '*.lock',
      'README.md',
      'CONTRIBUTING.md',
      'AGENTS.md',
      'LICENSE*',
      'gator_versioned_docs/**',
    ],
    customLLMFiles: CUSTOM_LLM_FILES,
  }

  const context = {
    siteDir,
    outDir,
    docsDir: options.docsDir,
    siteUrl,
    docTitle: 'MetaMask developer documentation',
    docDescription:
      'MetaMask is the leading self-custodial cryptocurrency wallet and Web3 gateway.',
    options,
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
