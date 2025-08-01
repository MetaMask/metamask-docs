// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import fs from 'fs'
require('dotenv').config()
const { themes } = require('prism-react-renderer')
const { REF_ALLOW_LOGIN_PATH } = require('./src/lib/constants')
const {
  fetchAndGenerateDynamicSidebarItems,
  NETWORK_NAMES,
  MM_REF_PATH,
  MM_RPC_URL,
} = require('./src/plugins/plugin-json-rpc')
const codeTheme = themes.dracula
const learnDropdown = fs.readFileSync('./src/components/NavDropdown/Learn.html', 'utf-8')
const productsDropdown = fs.readFileSync(
  './src/components/NavDropdown/Products.html',
  'utf-8'
)
const baseUrl = process.env.DEST || '/';
const siteUrl = 'https://docs.metamask.io';

const npm2yarnPlugin = [require('@docusaurus/remark-plugin-npm2yarn'), { sync: true }]
/** @type {import('@docusaurus/types').Config} */
const fullUrl = new URL(baseUrl, siteUrl).toString()
const config = {
  title: 'MetaMask developer documentation',
  // tagline: '',
  url: 'https://docs.metamask.io',
  baseUrl, // overwritten in github action for staging / latest
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
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

  // Even if you don't use internalization, you can use this field to set useful
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
  },

  trailingSlash: true,

  scripts: [
    {
      src: baseUrl + "js/fix-trailing-slash.js",
      async: false,
      defer: false,
    },
    {
      src: baseUrl + "js/code-focus.js",
      async: false,
      defer: true,
    },
    {
      src: 'https://cmp.osano.com/AzZMxHTbQDOQD8c1J/84e64bce-4a70-4dcc-85cb-7958f22b2371/osano.js',
    },
  ],

  markdown: {
    mermaid: true,
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
          remarkPlugins: [npm2yarnPlugin],
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
            '**/quickstart/**',  // Exclude quickstart directory from pages plugin
          ],
          mdxPageComponent: '@theme/MDXPage',
          remarkPlugins: [npm2yarnPlugin],
        },
        theme: {
          customCss: require.resolve('./src/scss/custom.scss'),
        },
      },
    ],
  ],
  plugins: [
    ['./src/plugins/docusaurus-plugin-virtual-files', { rootDir: '.integrationBuilderCache' }],
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
        remarkPlugins: [npm2yarnPlugin],
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
        path: 'delegation-toolkit',
        routeBasePath: 'delegation-toolkit',
        editUrl: 'https://github.com/MetaMask/metamask-docs/edit/main/',
        sidebarPath: require.resolve('./gator-sidebar.js'),
        breadcrumbs: false,
        remarkPlugins: [npm2yarnPlugin],
        sidebarCollapsed: false,
        includeCurrentVersion: true,
        // Set to the latest release.
        lastVersion: '0.12.0',
        versions: {
          // Defaults to the ./docs folder.
          // Using "development" instead of "next" as path.
          current: {
            label: 'development',
            path: 'development',
          },
          // The latest release.
          '0.12.0': {
            label: 'latest (0.12.0)',
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
        remarkPlugins: [npm2yarnPlugin],
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
        remarkPlugins: [npm2yarnPlugin],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'wallet',
        path: 'wallet',
        routeBasePath: 'wallet',
        editUrl: 'https://github.com/MetaMask/metamask-docs/edit/main/',
        sidebarPath: require.resolve('./wallet-sidebar.js'),
        breadcrumbs: false,
        remarkPlugins: [npm2yarnPlugin],
        sidebarItemsGenerator: async function ({ defaultSidebarItemsGenerator, ...args }) {
          const sidebarItems = await defaultSidebarItemsGenerator(args)
          const dynamicItems = await fetchAndGenerateDynamicSidebarItems(
            MM_RPC_URL,
            MM_REF_PATH,
            NETWORK_NAMES.metamask
          )
          if (args.item.dirName === 'reference/json-rpc-methods') {
            return [...sidebarItems, ...dynamicItems]
          }
          return sidebarItems
        },
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
        remarkPlugins: [npm2yarnPlugin],
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
  ],
  clientModules: [require.resolve('./src/client/scroll-fix.js')],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        {
          name: 'keywords',
          content:
            'MetaMask, SDK, Wallet, API, Dapp, App, Connect, Delegation, Toolkit, Documentation, Smart, Account, Snaps, Infura, Services, Dashboard',
        },
        // Twitter-specific meta tags
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          name: 'twitter:image',
          content: 'https://docs.metamask.io/img/metamaskog.jpeg',
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
          content: 'https://docs.metamask.io/img/metamaskog.jpeg',
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
      image: '/img/metamaskog.jpeg',
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
        hideOnScroll: true,
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
            type: 'dropdown',
            label: 'Learn',
            items: [
              {
                type: 'html',
                value: learnDropdown,
              },
            ],
          },
          {
            label: 'Quick Start',
            to: '/quickstart',
            position: 'left',
          },
          {
            to: 'developer-tools/faucet/',
            label: "Faucet",
            position: 'right',
            excludeUrl: REF_ALLOW_LOGIN_PATH,
          },
          {
            to: 'https://community.metamask.io/',
            label: "Help ↗",
            position: 'right',
          },
          {
            type: 'custom-navbarWallet',
            position: 'right',
            includeUrl: REF_ALLOW_LOGIN_PATH,
          },
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
                label: 'SDK',
                to: '/sdk',
              },
              {
                label: 'Wallet API',
                to: '/wallet',
              },
              {
                label: 'Delegation Toolkit',
                to: '/delegation-toolkit',
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
                label: 'MetaMask SDK GitHub',
                href: 'https://github.com/MetaMask/metamask-sdk/',
              },
              {
                label: 'Delegation Toolkit GitHub',
                href: 'https://github.com/MetaMask/delegation-toolkit',
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
        additionalLanguages: ['csharp', 'gradle', 'bash', 'json'],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: "code-unfocus",
            line: "unfocus-next-line",
            block: { start: "unfocus-start", end: "unfocus-end" },
          },
          {
            className: "code-focus",
            line: "focus-next-line",
            block: { start: "focus-start", end: "focus-end" },
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
