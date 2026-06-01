// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import fs from 'fs'
require('dotenv').config()
const { themes } = require('prism-react-renderer')
const { REF_ALLOW_LOGIN_PATH } = require('./src/lib/constants')
const codeTheme = themes.dracula
const productsDropdown = fs.readFileSync('./src/components/NavDropdown/Products.html', 'utf-8')
const baseUrl = process.env.DEST || '/'
const siteUrl = 'https://docs.metamask.io'

// Options for the `llms-html-injector` plugin (which wraps
// `docusaurus-plugin-llms`). Centralized in a standalone CommonJS module so
// the same configuration drives both this production build and the
// `scripts/verify-llms-output.js` sanity check, eliminating the silent-drift
// risk that existed when both files maintained their own copy of the
// `customLLMFiles` array and `ignoreFiles` list.
const llmsPluginOptions = require('./src/plugins/llms-html-injector/options')

const remarkPlugins = [
  require('remark-math'),
  [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }],
]

const rehypePlugins = [[require('rehype-katex'), { strict: false }]]
/** @type {import('@docusaurus/types').Config} */
const fullUrl = new URL(baseUrl, siteUrl).toString()
const config = {
  title: 'MetaMask developer documentation',
  // tagline: '',
  url: 'https://docs.metamask.io',
  baseUrl, // overwritten in github action for staging / latest
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  favicon: 'img/favicons/favicon-96x96.png',

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: 'img/favicons/favicon-96x96.png',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'algolia-site-verification',
        content: '1AA18A875C92F2F7',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        href: 'img/favicons/web-app-manifest-192x192.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        href: 'img/favicons/web-app-manifest-512x512.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: 'img/favicons/apple-touch-icon.png',
      },
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${fullUrl}#organization`,
        name: 'MetaMask',
        url: fullUrl,
        logo: new URL('img/favicons/favicon-96x96.png', fullUrl).toString(),
        description:
          'MetaMask is the leading self-custodial cryptocurrency wallet and Web3 gateway, enabling developers to build dapps that connect to MetaMask across EVM and Solana ecosystems.',
        sameAs: [
          'https://github.com/MetaMask',
          'https://twitter.com/MetaMask',
          'https://www.linkedin.com/company/metamask',
          'https://metamask.io',
        ],
      }),
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${fullUrl}#website`,
        name: 'MetaMask Developer Documentation',
        url: fullUrl,
        publisher: { '@id': `${fullUrl}#organization` },
        description:
          'Official developer documentation for MetaMask Connect, Embedded Wallets, Snaps, and the MetaMask developer platform.',
      }),
    },
  ],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'metamask', // Usually your GitHub org/user name.
  projectName: 'metamask-docs', // Usually your repo name.

  // Even if you don't use internationalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en' /*, "zh", "ko"*/],
  },

  customFields: {
    LD_CLIENT_ID: process.env.LD_CLIENT_ID,
    VERCEL_ENV: process.env.VERCEL_ENV,
    DASHBOARD_URL: process.env.DASHBOARD_URL || 'http://localhost:3000',
    SENTRY_KEY: process.env.SENTRY_KEY,
    LINEA_ENS_URL: process.env.LINEA_ENS_URL,
    SEGMENT_ANALYTICS_KEY: process.env.SEGMENT_ANALYTICS_KEY,
    DISCOURSE_API_KEY: process.env.DISCOURSE_API_KEY,
    DISCOURSE_API_USERNAME: process.env.DISCOURSE_API_USERNAME,
    DISCOURSE_CATEGORY_ID: process.env.DISCOURSE_CATEGORY_ID,
  },

  trailingSlash: true,

  scripts: [
    {
      src: baseUrl + 'js/fix-trailing-slash.js',
      async: false,
      defer: false,
    },
    {
      src: baseUrl + 'js/code-focus.js',
      async: false,
      defer: true,
    },
  ],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        // The classic preset's `docs` plugin is disabled. It previously
        // rendered a single orphan page (`docs/whats-new.md`) at `/whats-new/`
        // that pointed offsite for release notes. The page had no incoming
        // internal links and is redirected to `/` in `vercel.json`. Per-product
        // documentation is served by dedicated `plugin-content-docs` instances
        // configured below in `plugins`, not by this preset slot.
        //
        // Theme-safety note: theme overrides under `src/theme/DocItem/**`
        // consume `useDoc` from `@docusaurus/plugin-content-docs/client`,
        // which binds to whichever named content-docs instance owns the
        // current route. The classic preset's docs slot is unused at runtime,
        // so disabling it has no impact on theme rendering.
        docs: false,
        // The blog plugin is disabled too: this site has no blog content and
        // the default-enabled `/blog/` route was being indexed as an orphan
        // (Ahrefs orphan report, 2026-05-25).
        blog: false,
        pages: {
          path: 'src/pages',
          routeBasePath: '/',
          include: ['**/**.{js,jsx,ts,tsx,md,mdx}'],
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
            // The quickstart "builder" tree is a library of React/MDX content
            // fragments imported by `src/pages/quickstart/index.jsx`. The default
            // `**/**.{js,jsx,ts,tsx,md,mdx}` include also turns each fragment
            // into a standalone, content-less route (Ahrefs orphan report,
            // 2026-05-25). Excluding the trees here removes the routes without
            // breaking the imports.
            'quickstart/builder/**',
            'quickstart/commonSteps/**',
            'quickstart/NavigationOverlay/**',
            'quickstart/MediaStep/**',
            'quickstart/interfaces.ts',
            'quickstart/utils.tsx',
          ],
          mdxPageComponent: '@theme/MDXPage',
          remarkPlugins,
          rehypePlugins,
        },
        theme: {
          customCss: require.resolve('./src/scss/custom.scss'),
        },
      },
    ],
  ],
  plugins: [
    [
      './src/plugins/docusaurus-plugin-virtual-files',
      { rootDir: '.integrationBuilderCache', globalDataKeys: ['EW_AI_SKILL_MD'] },
    ],
    './src/plugins/docusaurus-plugin-tutorials',
    'docusaurus-plugin-sass',
    './src/plugins/mm-scss-utils',
    './src/plugins/plugin-snaps-docs.ts',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'snaps',
        path: 'snaps',
        routeBasePath: 'snaps',
        editUrl: 'https://github.com/MetaMask/metamask-docs/edit/main/',
        sidebarPath: require.resolve('./snaps-sidebar.js'),
        breadcrumbs: false,
        remarkPlugins,
        rehypePlugins,
        admonitions: {
          keywords: [
            'info',
            'success',
            'danger',
            'note',
            'tip',
            'warning',
            'important',
            'caution',
            'security',
            'flaskOnly',
          ],
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'gator',
        path: 'smart-accounts-kit',
        routeBasePath: 'smart-accounts-kit',
        editUrl: 'https://github.com/MetaMask/metamask-docs/edit/main/',
        sidebarPath: require.resolve('./gator-sidebar.js'),
        breadcrumbs: false,
        remarkPlugins,
        rehypePlugins,
        sidebarCollapsed: false,
        includeCurrentVersion: true,
        // Set to the latest release.
        lastVersion: '1.6.0',
        versions: {
          // Defaults to the ./docs folder.
          // Using "development" instead of "next" as path.
          current: {
            label: 'development',
            path: 'development',
          },
          // The latest release.
          '1.6.0': {
            label: 'latest (1.6.0)',
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'services',
        path: 'services',
        routeBasePath: 'services',
        editUrl: 'https://github.com/MetaMask/metamask-docs/edit/main/',
        sidebarPath: require.resolve('./services-sidebar.js'),
        breadcrumbs: false,
        remarkPlugins,
        rehypePlugins,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'dashboard',
        path: 'developer-tools/dashboard',
        routeBasePath: 'developer-tools/dashboard',
        editUrl: 'https://github.com/MetaMask/metamask-docs/edit/main/',
        sidebarPath: require.resolve('./dashboard-sidebar.js'),
        breadcrumbs: false,
        remarkPlugins,
        rehypePlugins,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'metamask-connect',
        path: 'metamask-connect',
        routeBasePath: 'metamask-connect',
        editUrl: 'https://github.com/MetaMask/metamask-docs/edit/main/',
        sidebarPath: require.resolve('./mm-connect-sidebar.js'),
        breadcrumbs: false,
        showLastUpdateTime: true,
        remarkPlugins,
        rehypePlugins,
      },
    ],

    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'embedded-wallets',
        path: 'embedded-wallets',
        routeBasePath: 'embedded-wallets',
        editUrl: 'https://github.com/MetaMask/metamask-docs/edit/main/',
        sidebarPath: require.resolve('./ew-sidebar.js'),
        breadcrumbs: false,
        remarkPlugins,
        rehypePlugins,
      },
    ],
    './src/plugins/plugin-json-rpc.ts',
    // Custom Segment plugin for controlled analytics
    './src/plugins/segment',
    './src/plugins/launchdarkly',
    './src/plugins/sentry',
    './src/plugins/osano.ts',
    [
      '@docusaurus/plugin-google-tag-manager',
      {
        containerId: 'GTM-5FGPLC2Q',
      },
    ],
    // The llms-html-injector plugin wraps docusaurus-plugin-llms so that
    // generation (per-section `llms-<product>.txt` files and per-page `.md`
    // files) runs sequentially before our post-processing (path normalization,
    // index URL rewrites, and `<link rel="alternate" type="text/markdown">`
    // injection). Wrapping is required because Docusaurus 3.x executes
    // `postBuild` hooks concurrently via `Promise.all`, so registering both
    // plugins separately would let the injector race against the generator.
    //
    // Options (ignoreFiles, customLLMFiles, pathTransformation, etc.) live in
    // `./src/plugins/llms-html-injector/options.js` so the local sanity-check
    // script can consume the exact same configuration.
    //
    // Related Vercel-level note (kept here because `vercel.json` is pure JSON
    // and can't carry inline comments): `vercel.json` sets `cleanUrls: false`.
    // With `trailingSlash: true` Docusaurus emits directory-style
    // `/foo/index.html` URLs and never `*.html` leaves, so Vercel's `.html`
    // stripping is a no-op for our content and adds an unnecessary redirect
    // hop for any static `*.html` asset. Disabling it also stops Vercel from
    // doing its own URL normalization underneath the Edge middleware in
    // `middleware.ts`, which performs the `Accept: text/markdown`
    // content-negotiation rewrite to the `.md` siblings emitted here.
    ['./src/plugins/llms-html-injector', llmsPluginOptions],
  ],
  clientModules: [require.resolve('./src/client/scroll-fix.js')],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: 'keywords',
          content:
            'MetaMask, Embedded Wallets, Quickstart, Web3 Development, SDK, MetaMask Connect, Wallet Integration, API, Dapp Development, Blockchain Development, Ethereum Development, Smart Contract, Account Abstraction, Snaps, Crypto Wallet, DeFi, NFT, Infura, Services, Dashboard',
        },
        // Twitter-specific meta tags
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:image',
          content: 'https://docs.metamask.io/img/metamaskog.jpg',
        },
        {
          name: 'twitter:image:alt',
          content: 'MetaMask Developer Documentation',
        },
        {
          name: 'twitter:site',
          content: '@MetaMask',
        },
        {
          name: 'twitter:creator',
          content: '@MetaMask',
        },
        // Open Graph meta tags for better social sharing
        {
          property: 'og:image',
          content: 'https://docs.metamask.io/img/metamaskog.jpg',
        },
        {
          property: 'og:image:width',
          content: '1200',
        },
        {
          property: 'og:image:height',
          content: '630',
        },
        {
          property: 'og:image:alt',
          content: 'MetaMask Developer Documentation',
        },
        {
          property: 'og:type',
          content: 'website',
        },
      ],
      image: '/img/metamaskog.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        logo: {
          alt: 'MetaMask logo',
          src: 'img/metamask-logo.svg',
          srcDark: 'img/metamask-logo-dark.svg',
          width: 150,
        },
        hideOnScroll: false,
        items: [
          {
            type: 'dropdown',
            label: 'Products',
            items: [
              {
                type: 'html',
                value: productsDropdown,
              },
            ],
          },
          {
            label: 'Quickstart',
            to: '/quickstart',
            position: 'left',
          },
          {
            label: 'Tutorials',
            to: '/tutorials',
            position: 'left',
          },
          {
            to: 'developer-tools/faucet/',
            label: 'Faucet',
            position: 'right',
          },
          {
            to: 'https://builder.metamask.io/',
            label: 'Help ↗',
            position: 'right',
          },
          // {
          //   type: 'custom-navbarWallet',
          //   position: 'right',
          //   includeUrl: REF_ALLOW_LOGIN_PATH,
          // },
          /* Language drop down
          {
            type: "localeDropdown",
            position: "right",
          },
          */
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: false,
        },
      },
      footer: {
        logo: {
          alt: 'MetaMask logo',
          src: 'img/metamask-logo.svg',
          srcDark: 'img/metamask-logo-dark.svg',
          href: 'https://metamask.io/',
          width: 250,
        },
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'MetaMask Connect',
                to: '/metamask-connect',
              },
              {
                label: 'Embedded Wallets',
                to: '/embedded-wallets',
              },
              {
                label: 'Smart Accounts Kit',
                to: '/smart-accounts-kit',
              },
              {
                label: 'Snaps',
                to: '/snaps',
              },
              {
                label: 'Services',
                to: '/services',
              },
              {
                label: 'Developer dashboard',
                to: '/developer-tools/dashboard',
              },
            ],
          },
          {
            title: 'GitHub',
            items: [
              {
                label: 'Documentation GitHub',
                href: 'https://github.com/MetaMask/metamask-docs',
              },
              {
                label: 'MetaMask extension GitHub',
                href: 'https://github.com/MetaMask/metamask-extension/',
              },
              {
                label: 'MetaMask Connect GitHub',
                href: 'https://github.com/MetaMask/metamask-sdk/',
              },
              {
                label: 'Smart Accounts Kit GitHub',
                href: 'https://github.com/MetaMask/smart-accounts-kit',
              },
              {
                label: 'MetaMask mobile GitHub',
                href: 'https://github.com/MetaMask/metamask-mobile',
              },
              {
                label: 'Snaps GitHub',
                href: 'https://github.com/MetaMask/snaps-monorepo',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Faucet',
                to: '/developer-tools/faucet',
              },
              {
                label: 'MetaMask Developer',
                href: 'https://developer.metamask.io/login',
              },
              {
                label: 'Consensys Discord',
                href: 'https://discord.gg/consensys',
              },
              {
                label: 'Contribute to MetaMask',
                href: 'https://github.com/MetaMask/metamask-extension/blob/develop/docs/README.md',
              },
              {
                label: 'Contribute to the docs',
                href: 'https://github.com/MetaMask/metamask-docs/blob/main/CONTRIBUTING.md',
              },
              {
                label: 'MetaMask user support',
                href: 'https://support.metamask.io/',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Privacy Policy',
                href: 'https://consensys.net/privacy-policy/',
              },
              {
                label: 'Terms of Use',
                href: 'https://consensys.net/terms-of-use/',
              },
              {
                label: 'Contributor License Agreement',
                href: 'https://metamask.io/cla/',
              },
              {
                label: 'Accessibility',
                href: 'https://consensys.io/accessibility',
              },
              {
                html: "<button id='manage-cookie-btn'>Manage cookies</button>",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} MetaMask • A Consensys Formation`,
      },
      prism: {
        theme: codeTheme,
        additionalLanguages: [
          'csharp',
          'gradle',
          'bash',
          'json',
          'java',
          'kotlin',
          'swift',
          'groovy',
          'dart',
        ],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: 'code-unfocus',
            line: 'unfocus-next-line',
            block: { start: 'unfocus-start', end: 'unfocus-end' },
          },
          {
            className: 'code-focus',
            line: 'focus-next-line',
            block: { start: 'focus-start', end: 'focus-end' },
          },
          {
            className: 'git-diff-remove',
            line: 'remove-next-line',
            block: { start: 'remove-start', end: 'remove-end' },
          },
          {
            className: 'git-diff-add',
            line: 'add-next-line',
            block: { start: 'add-start', end: 'add-end' },
          },
        ],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'W4ZOZ72ZFG',
        apiKey: 'b4e925aa9bf05e5bef2e40b3ee6ee431',
        indexName: 'mmdocs',
        contextualSearch: false,
        translations: {
          button: {
            buttonText: 'Search or Ask AI',
            buttonAriaLabel: 'Search or Ask AI',
          },
        },
        askAi: {
          assistantId: 'REak1eiP5wfp',
        },
        // Disable the standalone `/search/` results page. The Algolia DocSearch
        // modal still works; the dedicated page was being indexed as an orphan
        // (Ahrefs orphan report, 2026-05-25).
        searchPagePath: false,
        // Optional: see doc section below
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: "external\\.com|domain\\.com",
        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        // replaceSearchResultPathname: {
        //   from: '/',
        //   to: baseUrl,
        // },
        // Optional: Algolia search parameters
        // searchParameters: {},
        //... other Algolia params
      },
      mermaid: {
        options: {
          fontFamily: 'arial, verdana, sans-serif',
          wrap: true,
          securityLevel: 'loose',
          sequence: {
            diagramMarginX: 25,
            diagramMarginY: 25,
          },
          flowchart: {
            diagramPadding: 5,
            nodeSpacing: 75,
          },
        },
      },
    }),
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.25/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-WcoG4HRXMzYzfCgiyfrySxx90XSl2rxY5mnVY5TwtWE6KLrArNKn0T/mOgNL0Mmi',
      crossorigin: 'anonymous',
    },
  ],
}

module.exports = config
