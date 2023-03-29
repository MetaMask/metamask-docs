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
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "MetaMask docs",
        hideOnScroll: true,
        logo: {
          alt: "MetaMask logo",
          src: "img/metamask-fox.svg",
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
          src: "img/metamask-fox.svg",
          href: "https://metamask.io/",
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
