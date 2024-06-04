import * as path from "path";

module.exports = function () {
  return {
    name: "docusaurus-plugin-launchdarkly",
    getClientModules() {
      return [path.resolve(__dirname, "./ldClient")];
    },
    configureWebpack() {
      return {
        resolve: {
          alias: {
            launchdarkly: path.resolve(__dirname, "./ldClient.ts"),
          },
        },
      };
    },
  };
};
