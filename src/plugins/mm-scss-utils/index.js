const path = require('path')

module.exports = function (context, options) {
  return {
    name: 'mm-scss-utils',
    configureWebpack(config, isServer, utils) {
      return {
        module: {
          rules: [
            {
              test: /\.scss$/,
              use: [
                {
                  loader: 'sass-loader',
                  options: {
                    sassOptions: {
                      includePaths: [path.resolve(context.siteDir, 'src/scss')],
                    },
                    additionalData: `@use "sass:math"; @import "${path.resolve(context.siteDir, 'src/scss/utils/global-import')}";`,
                  },
                },
              ],
            },
          ],
        },
      }
    },
  }
}