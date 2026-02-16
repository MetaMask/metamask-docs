const OsanoPlugin = () => {
  return {
    name: 'docusaurus-plugin-osano',
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              src: 'https://cmp.osano.com/AzZMxHTbQDOQD8c1J/84e64bce-4a70-4dcc-85cb-7958f22b2371/osano.js',
            },
          },
        ],
      }
    },
  }
}

export default OsanoPlugin
