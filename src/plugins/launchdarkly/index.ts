module.exports = function () {
  const { LD_CLIENT_ID } = process.env;
  return {
    name: "docusaurus-plugin-launchdarkly",
    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            attributes: {
              src: "/js/ldclient.min.js",
            },
          },
          {
            tagName: "script",
            innerHTML: `
              const context = {
                kind: 'user',
                anonymous: true,
                key: "ld-anonymous-user-key"
              };
              var options = {
                allAttributesPrivate: true,
                bootstrap: "localStorage",
              };
              window.ldclient = LDClient.initialize("${LD_CLIENT_ID}", context, options);
              window.ldclient?.on('ready', function() {
                var user = {
                  anonymous: true,
                  key: "ld-anonymous-user-key"
                };
                ldclient.identify(user);
              });
            `,
          },
        ],
      };
    },
  };
};
