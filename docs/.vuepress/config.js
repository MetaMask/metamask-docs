module.exports = _ctx => ({
  dest: 'docs/dist',

  locales: {
    '/': {
      lang: 'en-US',
      title: 'MetaMask Docs',
      description: 'Welcome'
    }
  },

  head: [
    ['link', { rel: 'icon', href: `/metamask-fox.svg` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],

  theme: '@vuepress/vue',

  themeConfig: {
    repo: 'MetaMask/metamask-docs',
    logo: '/metamask-fox.svg',
    editLinks: true,
    docsDir: 'packages/docs/dist',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: require('./nav/en'),
        sidebar: {
          '/guide/': getGuideSidebar('Guide', 'API Reference', 'Best Practices', 'Mobile', 'Resources'),
        }
      }
    }
  },

  plugins: [
    ['@vuepress/back-to-top', true],
    ['@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/google-analytics', {
      ga: 'UA-128189152-1'
    }],
    ['container', {
      type: 'vue',
      before: '<pre class="vue-container"><code>',
      after: '</code></pre>',
    }],
    ['container', {
      type: 'upgrade',
      before: info => `<UpgradePath title="${info}">`,
      after: '</UpgradePath>',
    }],
    ['vuepress-plugin-redirect', {
      redirectors: [
        {
          base: '/',
          alternative: '/guide/'
        },
      ],
    }]
  ],

  extraWatchFiles: [
    '.vuepress/nav/en.js',
  ]
})

function getGuideSidebar(guide, api, bestPractices, mobile, resources) {
  return [
    {
      title: guide,
      collapsable: false,
      children: [
        '',
        'getting-started',
        'common-terms',
        'initializing-dapps',
        'accessing-accounts',
        'sending-transactions',
      ]
    },
    {
      title: api,
      collapsable: false,
      children: [
        'ethereum-provider',
        'json-rpc-api',
        'experimental-apis',
        'signing-data',
      ]
    },
    {
      title: bestPractices,
      collapsable: false,
      children: [
        'registering-function-names',
        'registering-your-token',
        'defining-your-icon',
        'onboarding-library',
      ]
    },
    {
      title: mobile,
      collapsable: false,
      children: [
        'dapp-compatibility',

      ]
    },
    {
      title: resources,
      collapsable: false,
      children: [
        'create-dapp'
      ]
    }
  ]
}

