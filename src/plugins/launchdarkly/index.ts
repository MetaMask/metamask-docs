import * as path from "path";

interface LaunchDarklyPluginOptions {
  clientId: string;
}

module.exports = function (context: any, options: LaunchDarklyPluginOptions) {
  const { clientId } = options;
  return {
    name: "docusaurus-plugin-launchdarkly",
    getClientModules() {
      if (typeof window !== "undefined") {
        // Inject clientId into window object for simplicity
        window.__LD_CLIENT_ID__ = clientId;
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