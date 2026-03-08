import * as path from 'path'

const SentryPlugin = () => {
  return {
    name: 'docusaurus-plugin-sentry',
    getClientModules() {
      return [path.resolve(__dirname, './sentry')]
    },
    configureWebpack() {
      return {
        resolve: {
          alias: {
            'sentry-plugin': path.resolve(__dirname, './sentry.ts'),
          },
        },
      }
    },
  }
}

export default SentryPlugin
