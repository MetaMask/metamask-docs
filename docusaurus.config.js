// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const codeTheme = require("prism-react-renderer/themes/dracula");
const remarkCodesandbox = require("remark-codesandbox");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "MetaMask docs",
  // tagline: '',
  url: "https://metamask.github.io/",
  baseUrl: process.env.DEST || "/", // overwritten in github action for staging / latest
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/metamask-fox.svg",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.

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
        ],
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: " │ ‎ Documentation",
        hideOnScroll: true,
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
                label: "Snaps GitHub discussions",
                href: "https://github.com/MetaMask/snaps-monorepo/discussions",
              },
              {
                label: "Documentation requests",
                href: "https://github.com/MetaMask/mm-docs-v2/issues/new",
              },
              {
                label: "User support",
                href: "https://support.metamask.io/hc/en-us",
              },
            ],
          },
          {
            title: "Contributors",
            items: [
              {
                label: "Contribute to the documentation",
                href: "https://github.com/MetaMask/mm-docs-v2",
              },
              {
                label: "Contribute to the MetaMask wallet",
                href: "https://github.com/MetaMask/metamask-extension/",
              },
              {
                label: "Contribute to MetaMask Snaps",
                href: "https://github.com/MetaMask/snaps-monorepo",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} MetaMask • A ConsenSys Formation`,
      },
      prism: {
        theme: codeTheme,
        additionalLanguages: ["csharp"],
      },
    }),
};

module.exports = config;
