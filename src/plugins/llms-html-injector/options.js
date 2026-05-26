/**
 * Single source of truth for the options passed to `docusaurus-plugin-llms`
 * (via the `llms-html-injector` wrapper).
 *
 * Two consumers must agree exactly on this configuration:
 *
 *   - `docusaurus.config.js` registers the plugin at build time.
 *   - `scripts/verify-llms-output.js` invokes the generator directly to sanity-
 *     check the same output locally without running a full Docusaurus build.
 *
 * Previously these two files each maintained their own copy of the options
 * object (kept in sync only by comment), so adding, removing, or renaming an
 * entry in one file silently desynced the verify script — defeating its
 * purpose as a sanity check. Centralizing here makes drift impossible.
 *
 * This file is plain CommonJS with no Docusaurus-specific imports so it can
 * be `require()`d by a standalone Node script. Do not import from
 * `@docusaurus/*` or anything that pulls in ESM-only deps.
 */

// Source-tree globs that should never be walked by the generator. Comments
// inline below explain non-obvious exclusions.
const ignoreFiles = [
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
  // Quickstart "builder" markdown is content fragments embedded by the
  // builder UI, not standalone routes; include only the entry pages.
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
]

// Per-section indexes (`fullContent: false`) stay under the AFDocs 50,000-char
// `llms-txt-size` threshold for individual indexes. The `-full.txt` variants
// contain the bulk page content for each product.
//
// The Embedded Wallets section is intentionally split into four `-full.txt`
// files. A single `llms-embedded-wallets-full.txt` was previously ~3.9 MB,
// exceeding most agent context windows; the sub-domain split keeps each file
// under ~1.5 MB while preserving complete coverage.
const customLLMFiles = [
  {
    filename: 'llms-embedded-wallets.txt',
    includePatterns: ['embedded-wallets/**/*.{md,mdx}'],
    fullContent: false,
    title: 'MetaMask Embedded Wallets documentation',
    description: 'Documentation links for MetaMask Embedded Wallets',
  },
  {
    filename: 'llms-embedded-wallets-sdk-full.txt',
    includePatterns: ['embedded-wallets/sdk/**/*.{md,mdx}'],
    fullContent: true,
    title: 'MetaMask Embedded Wallets SDKs',
    description:
      'Complete documentation for Embedded Wallets SDKs (React, Vue, JS, Node, Android, iOS, React Native, Flutter, Unity, Unreal)',
  },
  {
    filename: 'llms-embedded-wallets-evm-full.txt',
    includePatterns: ['embedded-wallets/connect-blockchain/evm/**/*.{md,mdx}'],
    fullContent: true,
    title: 'MetaMask Embedded Wallets EVM chain connections',
    description: 'Complete documentation for connecting Embedded Wallets to EVM-compatible chains',
  },
  {
    filename: 'llms-embedded-wallets-non-evm-full.txt',
    includePatterns: [
      'embedded-wallets/connect-blockchain/solana/**/*.{md,mdx}',
      'embedded-wallets/connect-blockchain/other/**/*.{md,mdx}',
      'embedded-wallets/connect-blockchain/*.{md,mdx}',
    ],
    fullContent: true,
    title: 'MetaMask Embedded Wallets non-EVM chain connections',
    description:
      'Complete documentation for connecting Embedded Wallets to Solana and other non-EVM chains',
  },
  {
    filename: 'llms-embedded-wallets-platform-full.txt',
    includePatterns: [
      'embedded-wallets/authentication/**/*.{md,mdx}',
      'embedded-wallets/features/**/*.{md,mdx}',
      'embedded-wallets/dashboard/**/*.{md,mdx}',
      'embedded-wallets/infrastructure/**/*.{md,mdx}',
      'embedded-wallets/troubleshooting/**/*.{md,mdx}',
      'embedded-wallets/*.{md,mdx}',
    ],
    fullContent: true,
    title: 'MetaMask Embedded Wallets platform features',
    description:
      'Complete documentation for Embedded Wallets authentication, features, dashboard, infrastructure, and troubleshooting',
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

// Full options object passed to the plugin. Both `docusaurus.config.js` and
// `scripts/verify-llms-output.js` consume this directly; do not spread or
// partially copy it from a single call site.
//
// Inline notes for non-obvious flags:
//   - `docsDir: '.'`         — collect from the site root so every product
//                              folder is discoverable (each entry filters
//                              itself via `includePatterns`).
//   - `generateLLMsTxt: false` and `generateLLMsFullTxt: false` — the root
//                              `llms.txt` is hand-curated at `static/llms.txt`
//                              to stay under the AFDocs 50,000-char
//                              `llms-txt-size` threshold; a monolithic
//                              `llms-full.txt` would exceed every agent's
//                              context window.
//   - `generateMarkdownFiles: true` — emit an individual `.md` next to every
//                              doc page so `.md` URLs return 200 (Agent Score
//                              `markdown-url-support` / `llms-txt-directive-md`).
//   - `pathTransformation.ignorePaths: ['src/pages']` — strip the `src/pages`
//                              prefix from generated URLs so a file at
//                              `src/pages/quickstart/foo.md` resolves to
//                              `/quickstart/foo/`, matching the public route.
const llmsPluginOptions = {
  docsDir: '.',
  generateLLMsTxt: false,
  generateLLMsFullTxt: false,
  generateMarkdownFiles: true,
  ignoreFiles,
  excludeImports: true,
  removeDuplicateHeadings: true,
  pathTransformation: {
    ignorePaths: ['src/pages'],
  },
  customLLMFiles,
}

// Export the options object as the module default. `customLLMFiles` and
// `ignoreFiles` are already reachable as properties on the exported object;
// do NOT add a self-referential `llmsPluginOptions` property here — Docusaurus
// runs `JSON.stringify` over the entire site config during `genSiteConfig`
// (codegen.js), and a cycle would crash the build with
// `TypeError: Converting circular structure to JSON`.
module.exports = llmsPluginOptions
