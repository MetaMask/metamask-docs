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

const remarkPlugins = [
  require('remark-math'),
  [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]
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
      innerHTML: `
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": "${fullUrl}",
      "logo": "${new URL('img/favicons/favicon-96x96.png', fullUrl).toString()}"
    }
  `,
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
    {
      src: 'https://cmp.osano.com/AzZMxHTbQDOQD8c1J/84e64bce-4a70-4dcc-85cb-7958f22b2371/osano.js',
    },
  ],

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          id: 'docs',
          path: 'docs',
          routeBasePath: '/',
          editUrl: 'https://github.com/MetaMask/metamask-docs/edit/main/',
          sidebarPath: false,
          breadcrumbs: false,
          remarkPlugins,
          rehypePlugins,
        },
        pages: {
          path: 'src/pages',
          routeBasePath: '/',
          include: ['**/**.{js,jsx,ts,tsx,md,mdx}'],
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
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
    ['./src/plugins/docusaurus-plugin-virtual-files', { rootDir: '.integrationBuilderCache' }],
    './src/plugins/docusaurus-plugin-tutorials',
    'docusaurus-plugin-sass',
    './src/plugins/mm-scss-utils',
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
        lastVersion: '0.1.0',
        versions: {
          // Defaults to the ./docs folder.
          // Using "development" instead of "next" as path.
          current: {
            label: 'development',
            path: 'development',
          },
          // The latest release.
          '0.1.0': {
            label: 'latest (0.1.0)',
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
        id: 'sdk',
        path: 'sdk',
        routeBasePath: 'sdk',
        editUrl: 'https://github.com/MetaMask/metamask-docs/edit/main/',
        sidebarPath: require.resolve('./sdk-sidebar.js'),
        breadcrumbs: false,
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
    [
      '@docusaurus/plugin-google-tag-manager',
      {
        containerId: 'GTM-5FGPLC2Q',
      },
    ],
    [
      'docusaurus-plugin-llms',
      {
        // Set docsDir to site root to collect from all directories
        docsDir: '.',
        // Disable default files since we're generating section-specific files
        generateLLMsTxt: false,
        generateLLMsFullTxt: false,
        // Ignore common non-doc directories
        // Note: src/pages/** is not ignored so tutorials can be collected
        // Each customLLMFiles entry filters by includePatterns, so only matching files are included
        ignoreFiles: [
          'node_modules/**',
          'build/**',
          '.docusaurus/**',
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
          'i18n/**',
          '*.config.js',
          '*.json',
          '*.lock',
          'README.md',
          'CONTRIBUTING.md',
          'gator_versioned_docs/**',
        ],
        excludeImports: true,
        removeDuplicateHeadings: true,
        // Path transformation to fix URL construction
        // Since docsDir is '.', we need to remove 'docs/' prefix and handle src/pages paths
        pathTransformation: {
          ignorePaths: ['docs', 'src/pages'],
        },
        // Generate separate files for each section
        customLLMFiles: [
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
            filename: 'llms-sdk.txt',
            includePatterns: ['sdk/**/*.{md,mdx}'],
            fullContent: false,
            title: 'MetaMask SDK documentation',
            description: 'Documentation links for MetaMask SDK',
          },
          {
            filename: 'llms-sdk-full.txt',
            includePatterns: ['sdk/**/*.{md,mdx}'],
            fullContent: true,
            title: 'MetaMask SDK documentation',
            description: 'Complete documentation for MetaMask SDK',
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
        ],
      },
    ],
  ],
  clientModules: [require.resolve('./src/client/scroll-fix.js')],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: 'keywords',
          content:
            'MetaMask, Embedded Wallets, Quickstart, Web3 Development, SDK, MM Connect, Wallet Integration, API, Dapp Development, Blockchain Development, Ethereum Development, Smart Contract, Account Abstraction, Snaps, Crypto Wallet, DeFi, NFT, Infura, Services, Dashboard',
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
                label: 'MM Connect',
                to: '/sdk',
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
                label: 'MM Connect GitHub',
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
        additionalLanguages: ['csharp', 'gradle', 'bash', 'json', 'java', 'kotlin', 'swift', 'groovy', 'dart'],
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
        appId: 'AWX4QVM59R',

        // Public API key: it is safe to commit it
        apiKey: '861f327c200a8eab62a28ee1396f90de',

        indexName: 'mm--v2-staging',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: '/',
          to: baseUrl,
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',

        //... other Algolia params
      },
      mermaid: {
        options: {
          fontFamily: 'arial, verdana, sans-serif;',
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
}

module.exports = config
