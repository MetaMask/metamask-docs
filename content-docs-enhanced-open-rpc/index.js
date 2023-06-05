const docsPluginExports = require("@docusaurus/plugin-content-docs");
const join = require("path").join;
const docsPlugin = docsPluginExports.default;
const { parseOpenRPCDocument } = require("@open-rpc/schema-utils-js");
const openrpcPlugin = require("@metamask/docusaurus-openrpc").default;

async function docsPluginEnhanced(context, options) {
  const docsPluginInstance = await docsPlugin(context, options);
  const path = join(options.path, options.openrpcPath);

  const openrpcPluginInstance = await openrpcPlugin(context, {
    id: options.id,
    path,
    openrpcDocument: options.openrpcDocument,
  });
  const openrpcDocument = await parseOpenRPCDocument(options.openrpcDocument);

  return {
    ...docsPluginInstance,

    name: "docusaurus-plugin-content-docs",

    async loadContent() {
      const results = await docsPluginInstance.loadContent();
      results.loadedVersions[0].sidebars = Object.keys(results.loadedVersions[0].sidebars).reduce((acc, key) => {
        acc[key] = results.loadedVersions[0].sidebars[key].map((item) => {
          if (item.type === "category") {
            if (item.label === "Reference") {
              item.items.push({
                type: "category",
                label: "JSON-RPC",
                collapsible: true,
                collapsed: true,
                items: openrpcDocument.methods.map((method) => {
                  const p = join(context.baseUrl, options.path, options.openrpcPath, method.name.toLowerCase());
                  return {
                    type: "link",
                    label: method.name,
                    href: p,
                  };  
                }),
              });
            }
          }
          return item;
        });
        return acc;
      }, {});
      return results;
    },
    async contentLoaded({ content, allContent, actions }) {
      await docsPluginInstance.contentLoaded({ content, allContent, actions });
      return openrpcPluginInstance.contentLoaded({ content: { openrpcDocument, loadedVersions: content.loadedVersions }, actions });
    },
    configureWebpack(...args) {
      const docsConf = docsPluginInstance.configureWebpack(...args);
      const openrpcConf = openrpcPluginInstance.configureWebpack(...args);

      const conf = {
        ...docsConf,
        ...openrpcConf,
        plugins: [
          ...docsConf.plugins || [],
          ...openrpcConf.plugins,
        ],
        resolve: {
          alias: {
            ...openrpcConf.resolve.alias,
            ...docsConf.resolve.alias,
          },
        },
      };
      return conf;
    },
    getThemePath() {
      return "../node_modules/@metamask/docusaurus-openrpc/dist/theme";
    },
    gethPathsToWatch() {
      const openrpcPaths = openrpcPluginInstance.gethPathsToWatch();
      const docsPaths = docsPluginInstance.gethPathsToWatch();
      return [
        ...openrpcPaths,
        ...docsPaths,
      ];
    },

    injectHtmlTags() {
      return openrpcPluginInstance.injectHtmlTags();
    },
  };

}

module.exports = {
  ...docsPluginExports,
  default: docsPluginEnhanced,
  validateOptions: ({ validate, options }) => {
    const docOptions = {
      ...options,
    };
    delete docOptions.openrpcDocument;
    delete docOptions.openrpcPath;
    const returns = docsPluginExports.validateOptions({ validate, options: docOptions });
    return {
      ...returns,
      openrpcDocument: options.openrpcDocument,
      openrpcPath: options.openrpcPath,
    };
  },
};