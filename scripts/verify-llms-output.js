#!/usr/bin/env node
/**
 * Dev-only sanity check that invokes docusaurus-plugin-llms against the current
 * docs source tree, using the same options we configured in docusaurus.config.js.
 *
 * This lets us verify the new generateMarkdownFiles output and llms.txt coverage
 * without doing a full `docusaurus build` (which is currently blocked by an
 * unrelated swizzled-Tabs incompatibility on this machine).
 *
 * Usage: node scripts/verify-llms-output.js [outDir]
 */

const path = require('path')
const fs = require('fs/promises')

async function main() {
  const siteDir = path.resolve(__dirname, '..')
  const outDir = path.resolve(siteDir, process.argv[2] || '.llms-verify')

  await fs.rm(outDir, { recursive: true, force: true })
  await fs.mkdir(outDir, { recursive: true })

  const generator = require(
    path.join(siteDir, 'node_modules', 'docusaurus-plugin-llms', 'lib', 'generator.js')
  )

  const options = {
    docsDir: '.',
    generateLLMsTxt: true,
    generateLLMsFullTxt: true,
    generateMarkdownFiles: true,
    excludeImports: true,
    removeDuplicateHeadings: true,
    pathTransformation: { ignorePaths: ['docs', 'src/pages'] },
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
    customLLMFiles: [],
  }

  const context = {
    siteDir,
    outDir,
    docsDir: options.docsDir,
    siteUrl: 'https://docs.metamask.io',
    docTitle: 'MetaMask developer documentation',
    docDescription:
      'MetaMask is the leading self-custodial cryptocurrency wallet and Web3 gateway.',
    options,
  }

  const allDocFiles = await generator.collectDocFiles(context)
  console.log(`Collected ${allDocFiles.length} source markdown files`)

  await generator.generateStandardLLMFiles(context, allDocFiles)

  console.log('\n--- Pre-injector summary ---')
  printSummary(await summarize(outDir))

  const injector = require(path.join(siteDir, 'src/plugins/llms-html-injector'))()
  await injector.postBuild({ outDir, routesPaths: [] })

  console.log('\n--- Post-injector summary ---')
  printSummary(await summarize(outDir))
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
  try {
    const s = await fs.stat(llmsTxt)
    summary.llmsTxtBytes = s.size
    const content = await fs.readFile(llmsTxt, 'utf8')
    summary.llmsTxtLinkCount = (content.match(/\]\(http/g) || []).length
    summary.llmsTxtUrlWithReadme = (content.match(/\/README\.md/g) || []).length
    summary.llmsTxtUrlWithIndexMd = (content.match(/\/index\.md/g) || []).length
    summary.llmsTxtUrlsStartingWithDocsSlash = (
      content.match(/https:\/\/docs\.metamask\.io\/docs\//g) || []
    ).length
    summary.llmsTxtUrlsStartingWithSrcPages = (
      content.match(/https:\/\/docs\.metamask\.io\/src\/pages\//g) || []
    ).length
  } catch {
    summary.llmsTxt = 'MISSING'
  }
  try {
    const s = await fs.stat(llmsFull)
    summary.llmsFullTxtBytes = s.size
  } catch {
    summary.llmsFullTxt = 'MISSING'
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
