import * as path from "path";

module.exports = function () {
  return {
    name: "docusaurus-plugin-launchdarkly",
    getClientModules() {
      if (typeof window !== "undefined") {
        return [path.resolve(__dirname, "./ldClient")];
      }
      return [];
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