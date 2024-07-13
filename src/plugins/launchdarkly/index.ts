import * as path from "path";

const LDPlugin = () => {
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

export default LDPlugin;
