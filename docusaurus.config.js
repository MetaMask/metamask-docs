// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const codeTheme = require("prism-react-renderer/themes/dracula");
const remarkCodesandbox = require("remark-codesandbox");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "MetaMask docs",
  // tagline: '',
  url: "https://docs.metamask.io",
  baseUrl: process.env.DEST || "/", // overwritten in github action for staging / latest
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/metamask-fox.svg",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "metamask", // Usually your GitHub org/user name.
  projectName: "mm-docs-v2", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  scripts: [
    { src: "https://plausible.io/js/script.js", defer: true, "data-domain": "docs.metamask.io" },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: "wallet",
          routeBasePath: "wallet",
          sidebarPath: require.resolve("./wallet-sidebar.js"),
          breadcrumbs: false,
          remarkPlugins: [
            require("remark-docusaurus-tabs"),
            [remarkCodesandbox, {
              mode: "iframe",
              autoDeploy: process.env.NODE_ENV === "production",
            }],
          ],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      "content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').PluginOptions} */
      ({
        id: "snaps",
        path: "snaps",
        routeBasePath: "snaps",
        sidebarPath: require.resolve("./snaps-sidebar.js"),
        breadcrumbs: false,
        remarkPlugins: [
          require("remark-docusaurus-tabs"),
        ],
      }),
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        fromExtensions: ["html", "htm"],
        redirects: [
          {
            from: "/guide/",
            to: "/wallet/",
          },
          {
            from: "/guide/getting-started",
            to: "/wallet/get-started/set-up-dev-environment",
          },
          {
            from: "/guide/common-terms",
            to: "/wallet/",
          },
          {
            from: "/guide/initializing-dapps",
            to: "/wallet/how-to/interact-with-smart-contracts",
          },
          {
            from: "/guide/accessing-accounts",
            to: "/wallet/get-started/access-accounts",
          },
          {
            from: "/guide/sending-transactions",
            to: "/wallet/how-to/send-transactions",
          },
          {
            from: "/guide/ethereum-provider",
            to: "/wallet/reference/provider-api",
          },
          {
            from: "/guide/provider-migration",
            to: "/wallet/how-to/migrate-api",
          },
          {
            from: "/guide/rpc-api",
            to: "/wallet/reference/rpc-api",
          },
          {
            from: "/guide/signing-data",
            to: "/wallet/how-to/sign-data",
          },
          {
            from: "/guide/registering-function-names",
            to: "/wallet/how-to/register-method-names",
          },
          {
            from: "/guide/registering-your-token",
            to: "/wallet/how-to/register-token",
          },
          {
            from: "/guide/defining-your-icon",
            to: "/wallet/how-to/set-icon",
          },
          {
            from: "/guide/onboarding-library",
            to: "/wallet/how-to/use-onboarding-library",
          },
          {
            from: "/guide/metamask-extension-provider",
            to: "/wallet/how-to/access-provider",
          },
          {
            from: "/guide/mobile-getting-started",
            to: "/wallet/how-to/use-mobile",
          },
          {
            from: "/guide/site-compatibility-checklist",
            to: "/wallet/how-to/use-mobile",
          },
          {
            from: "/guide/mobile-best-practices",
            to: "/wallet/how-to/use-mobile",
          },
          {
            from: "/guide/snaps",
            to: "/snaps/",
          },
          {
            from: "/guide/snaps-development-guide",
            to: "/snaps/how-to/develop-a-snap",
          },
          {
            from: "/guide/snaps-concepts",
            to: "/snaps/category/concepts",
          },
          {
            from: "/guide/snaps-rpc-api",
            to: "/snaps/reference/rpc-api",
          },
          {
            from: "/guide/snaps-permissions",
            to: "/snaps/how-to/request-permissions",
          },
          {
            from: "/guide/snaps-exports",
            to: "/snaps/reference/exports",
          },
          {
            from: "/guide/snaps-patching-dependencies",
            to: "/snaps/how-to/troubleshoot",
          },
          {
            from: "/guide/create-dapp",
            to: "/wallet/get-started/set-up-dev-environment",
          },
          {
            from: "/guide/contributors",
            to: "/wallet/",
          },
        ].reduce((acc, item) => {
          acc.push(item);
          acc.push({ from: item.from + ".html", to: item.to });
          return acc;
        }, []),
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: " │ ‎ Documentation",
        logo: {
          alt: "MetaMask logo",
          src: "img/metamask-logo.svg",
          srcDark: "img/metamask-logo-dark.svg",
          href: "/wallet/",
          width: 150,
        },
        items: [
          {
            type: "doc",
            docId: "index",
            label: "Wallet",
          },
          {
            type: "doc",
            docId: "index",
            docsPluginId: "snaps",
            label: "Snaps",
          },
        ],
      },
      footer: {
        logo: {
          alt: "MetaMask logo",
          src: "img/metamask-logo.svg",
          srcDark: "img/metamask-logo-dark.svg",
          href: "https://metamask.io/",
          width: 250,
        },
        links: [
          {
            title: "Wallet",
            items: [
              {
                label: "Introduction",
                to: "/wallet",
              },
              {
                label: "Get started",
                to: "/wallet/category/get-started",
              },
              {
                label: "How to guides",
                to: "/wallet/category/how-to",
              },
              {
                label: "Tutorials",
                to: "/wallet/tutorials",
              },
              {
                label: "Reference",
                to: "/wallet/category/reference",
              },
            ],
          },
          {
            title: "Snaps",
            items: [
              {
                label: "Introduction",
                to: "/snaps",
              },
              {
                label: "Get started",
                to: "/snaps/category/get-started",
              },
              {
                label: "How to guides",
                to: "/snaps/category/how-to",
              },
              {
                label: "Tutorials",
                to: "/snaps/category/tutorials",
              },
              {
                label: "Reference",
                to: "/snaps/category/reference",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "ConsenSys Discord",
                href: "https://discord.gg/consensys",
              },
              {
                label: "Documentation GitHub",
                href: "https://github.com/MetaMask/mm-docs-v2",
              },
              {
                label: "MetaMask wallet GitHub",
                href: "https://github.com/MetaMask/metamask-extension/",
              },
              {
                label: "Snaps GitHub",
                href: "https://github.com/MetaMask/snaps-monorepo",
              },
            ],
          },
          {
            title: "Legal",
            items: [
              {
                label: "Privacy Policy",
                href: "https://consensys.net/privacy-policy/",
              },
              {
                label: "Terms of Use",
                href: "https://consensys.net/terms-of-use/",
              },
              {
                label: "Contributor License Agreement",
                href: "https://metamask.io/cla/",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} MetaMask • A ConsenSys Formation`,
      },
      prism: {
        theme: codeTheme,
        additionalLanguages: ["csharp","swift"],
      },
      algolia: {
        // The application ID provided by Algolia
        appId: "AWX4QVM59R",

        // Public API key: it is safe to commit it
        apiKey: "6095a25a6824bfa909fa0692e6847ec4",

        indexName: "mm--v2-staging",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from:  "/",
          to: process.env.DEST || "/",
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        //... other Algolia params
      },
    }),
};

module.exports = config;
