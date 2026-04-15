const OsanoPlugin = () => {
  return {
    name: 'docusaurus-plugin-osano',
    injectHtmlTags() {
      // Prevent Osano from running in Vercel preview/dev builds where it can block React hydration.
      if (process.env.VERCEL_ENV !== 'production') {
        return {}
      }

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
