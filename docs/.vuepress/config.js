module.exports = {
  plugins: ['@vuepress/back-to-top', '@vuepress/medium-zoom'],
  title: 'Hello VuePress',
  description: 'Just playing around',
  themeConfig: {
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/language/chinese/' },
          { text: 'Japanese', link: '/language/japanese/' }
        ]
      },
      { text: 'External', link: 'https://google.com' },
    ],
    sidebar: [
      {
        title: 'Group 1',   // required
        path: '/foo/',      // optional, which should be a absolute path.
        collapsable: false, // optional, defaults to true
        sidebarDepth: 1,    // optional, defaults to 1
        children: [
          '/guide/',
          '/installation/',
          '/advanced/',
        ]
      },
      {
        title: 'Group 2',
        children: [
          '/installation/',
          '/advanced/',
          '/guide/',
        ]
      }
    ]
  }
}
