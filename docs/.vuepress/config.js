module.exports = (_ctx) => ({
  sourceDir: 'docs',
  dest: 'docs/dist',

  locales: {
    '/': {
      lang: 'en-US',
      title: 'MetaMask Docs',
      description: 'Developer documentation for the MetaMask Ethereum wallet',
    },
  },

  head: [
    ['link', { rel: 'icon', href: `/metamask-fox.svg` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'script',
      {
        'data-domain': 'docs.metamask.io',
        src: 'https://plausible.io/js/plausible.js',
      },
    ],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` },
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#3eaf7c',
      },
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/icons/msapplication-icon-144x144.png',
      },
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }],
  ],

  theme: '@vuepress/theme-default',

  themeConfig: {
    repo: 'MetaMask/metamask-docs',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    logo: '/metamask-fox.svg',
    smoothScroll: true,
    algolia: {
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: process.env.ALGOLIA_INDEX_NAME,
    },
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: {
          '/guide/': guideSidebar,
        },
      },
    },
  },

  plugins: [
    ['@vuepress/back-to-top', true],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true,
      },
    ],
    ['@vuepress/medium-zoom', true],
    [
      'container',
      {
        type: 'vue',
        before: '<pre class="vue-container"><code>',
        after: '</code></pre>',
      },
    ],
    [
      'container',
      {
        type: 'upgrade',
        before: (info) => `<UpgradePath title="${info}">`,
        after: '</UpgradePath>',
      },
    ],
    [
      'vuepress-plugin-redirect',
      {
        redirectors: [
          {
            base: '/',
            alternative: '/guide/',
          },
        ],
      },
    ],
    [
      'tabs',
      {
        useUrlFragment: false,
      },
    ],
  ],

  extraWatchFiles: ['.vuepress/nav/en.js'],
});

const guideSidebar = [
  {
    title: 'Guide',
    collapsable: false,
    children: [
      '',
      'getting-started',
      'common-terms',
      'initializing-dapps',
      'accessing-accounts',
      'sending-transactions',
    ],
  },
  {
    title: 'API Reference',
    collapsable: false,
    children: [
      'ethereum-provider',
      'provider-migration',
      'rpc-api',
      'signing-data',
    ],
  },
  {
    title: 'Best Practices',
    collapsable: false,
    children: [
      'registering-function-names',
      'registering-your-token',
      'defining-your-icon',
      'onboarding-library',
      'metamask-extension-provider',
    ],
  },
  {
    title: 'Mobile',
    collapsable: false,
    children: [
      'mobile-getting-started',
      'site-compatibility-checklist',
      'mobile-best-practices',
    ],
  },
  {
    title: 'Snaps',
    collapsable: false,
    children: [
      'snaps',
      'snaps-development-guide',
      'snaps-rpc-api',
      'snaps-patching-dependencies',
    ],
  },
  {
    title: 'Resources',
    collapsable: false,
    children: ['create-dapp', 'contributors'],
  },
];
