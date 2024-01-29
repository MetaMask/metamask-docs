// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const codeTheme = require("prism-react-renderer/themes/dracula");
const remarkCodesandbox = require("remark-codesandbox");
const path = require("path");
const isProd = process.env.NODE_ENV === "production";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "MetaMask developer documentation",
  // tagline: '',
  url: "https://docs.metamask.io",
  baseUrl: process.env.DEST || "/", // overwritten in github action for staging / latest
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/metamask-fox.svg",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "metamask", // Usually your GitHub org/user name.
  projectName: "metamask-docs", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  trailingSlash: true,

  scripts: [
    { src: "https://cmp.osano.com/AzZMxHTbQDOQD8c1J/a2e89f0e-f467-4542-bfea-30ea2c1a6648/osano.js" },
    { src: "https://plausible.io/js/script.js", defer: true, "data-domain": "docs.metamask.io" },
    { src: "/js/feedback-script.js", defer: true, async: true },
    { src: "/js/getfeedback.js", defer: true, async: true },
  ],

  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  presets: [
    [
      "@metamask/docusaurus-openrpc/dist/preset",
      /** @type {import('@metamask/docusaurus-openrpc/dist/preset').Options} */
      ({
        docs: {
          path: "wallet",
          routeBasePath: "wallet",
          sidebarPath: require.resolve("./wallet-sidebar.js"),
          breadcrumbs: false,
          editUrl: "https://github.com/MetaMask/metamask-docs/edit/main/",
          remarkPlugins: [
            require("remark-docusaurus-tabs"),
            [remarkCodesandbox, {
              mode: "iframe",
              autoDeploy: process.env.NODE_ENV === "production",
            }],
          ],
          openrpc: {
            openrpcDocument: "https://metamask.github.io/api-specs/latest/openrpc.json",
            path: "reference",
            sidebarLabel: "JSON-RPC API",
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      ({
        id: "snaps",
        path: "snaps",
        routeBasePath: "snaps",
        editUrl: "https://github.com/MetaMask/metamask-docs/edit/main/",
        sidebarPath: require.resolve("./snaps-sidebar.js"),
        breadcrumbs: false,
        remarkPlugins: [
          require("remark-docusaurus-tabs"),
        ],
        admonitions: {
          tag: ":::",
          keywords: [
            "info",
            "success",
            "danger",
            "note",
            "tip",
            "warning",
            "important",
            "caution",
            "security",
            "flaskOnly",
          ],
        },
      }),
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "services",
        path: "services",
        routeBasePath: "services",
        editUrl: "https://github.com/MetaMask/metamask-docs/edit/main/",
        sidebarPath: require.resolve("./services-sidebar.js"),
        breadcrumbs: false,
      },
    ],
    [
      "docusaurus-plugin-typedoc",
      {
        entryPoints: ["./external/keyring-api/src/index.ts"],
        tsconfig: "./external/keyring-api/tsconfig.json",
        readme: "snaps/reference/keyring-api-index/index.md",
        out: path.join(__dirname, "snaps/reference/keyring-api"),
        sidebar: {
          filteredIds: ["reference/keyring-api/index"],
        },
        useCodeBlocks: true,
        expandObjects: true,
        parametersFormat: "table",
        hideGenerator: true,
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        fromExtensions: ["html", "htm"],
        redirects: [
          {
            from: ["/guide", "/guide/common-terms", "/guide/contributors", "/wallet/how-to/get-started-building", "/wallet/how-to/set-up-dev-environment", "/guide/create-dapp", "/guide/getting-started", "/wallet/category/get-started", "/wallet/get-started/set-up-dev-environment", "/wallet/how-to/get-started-building/set-up-dev-environment"],
            to: "/wallet",
          },
          {
            from: "/wallet/how-to/connect",
            to: "/wallet/quickstart/javascript",
          },
          {
            from: "/wallet/category/how-to",
            to: "/wallet/how-to",
          },
          {
            from: ["/guide/mobile-getting-started", "/guide/site-compatibility-checklist", "/guide/mobile-best-practices", "/wallet/how-to/use-mobile", "/wallet/how-to/integrate-with-mobile", "/sdk"],
            to: "/wallet/how-to/use-sdk",
          },
          {
            from: ["/wallet/get-started/detect-metamask", "/wallet/how-to/connect/detect-metamask"],
            to: "/wallet/how-to/detect-metamask",
          },
          {
            from: ["/wallet/get-started/detect-network", "/wallet/how-to/connect/detect-network"],
            to: "/wallet/how-to/detect-network",
          },
          {
            from: ["/guide/accessing-accounts", "/wallet/how-to/connect/access-accounts", "/wallet/get-started/access-accounts"],
            to: "/wallet/how-to/access-accounts",
          },
          {
            from: "/guide/sending-transactions",
            to: "/wallet/how-to/send-transactions",
          },
          {
            from: "/guide/signing-data",
            to: "/wallet/how-to/sign-data",
          },
          {
            from: "/wallet/how-to/use-siwe",
            to: "/wallet/how-to/sign-data/siwe",
          },
          {
            from: ["/guide/registering-your-token", "/wallet/how-to/register-token"],
            to: "/wallet/how-to/display/tokens",
          },
          {
            from: ["/guide/registering-function-names", "/wallet/how-to/register-method-names"],
            to: "/wallet/how-to/display/method-names",
          },
          {
            from: ["/guide/defining-your-icon", "/wallet/how-to/set-icon"],
            to: "/wallet/how-to/display/icon",
          },
          {
            from: "/wallet/how-to/request-permissions",
            to: "/wallet/how-to/manage-permissions",
          },
          {
            from: "/guide/metamask-extension-provider",
            to: "/wallet/how-to/access-provider",
          },
          {
            from: "/guide/initializing-dapps",
            to: "/wallet/how-to/interact-with-smart-contracts",
          },
          {
            from: "/guide/ethereum-provider",
            to: "/wallet/reference/provider-api",
          },
          {
            from: ["/guide/onboarding-library", "/wallet/how-to/use-onboarding-library"],
            to: "/wallet/how-to/onboard-users",
          },
          {
            from: ["/wallet/get-started/run-development-network", "/wallet/how-to/get-started-building/run-devnet"],
            to: "/wallet/how-to/run-devnet",
          },
          {
            from: "/wallet/how-to/get-started-building/secure-dapp",
            to: "/wallet/how-to/secure-dapp",
          },
          {
            from: "/wallet/category/concepts",
            to: "/wallet/concepts",
          },
          {
            from: ["/guide/provider-migration", "/wallet/concepts/provider-api", "/wallet/concepts/rpc-api", "/wallet/how-to/migrate-api"],
            to: "/wallet/concepts/apis",
          },
          {
            from: "/wallet/category/tutorials",
            to: "/wallet/tutorials",
          },
          {
            from: "/wallet/tutorials/simple-react-dapp",
            to: "/wallet/tutorials/react-dapp-local-state",
          },
          {
            from: "/wallet/category/reference",
            to: "/wallet/reference",
          },
          {
            from: ["/guide/rpc-api", "/wallet/reference/rpc-api"],
            to: "/wallet/reference/json-rpc-api",
          },
          {
            from: "/guide/snaps",
            to: "/snaps",
          },
          {
            from: "/snaps/category/get-started",
            to: "/snaps/get-started",
          },
          {
            from: "/snaps/get-started/install-snaps",
            to: "/snaps/get-started/install-flask",
          },
          {
            from: "/snaps/category/how-to",
            to: "/snaps/how-to",
          },
          {
            from: "/guide/snaps-development-guide",
            to: "/snaps/how-to/develop-a-snap",
          },
          {
            from: "/guide/snaps-permissions",
            to: "/snaps/how-to/request-permissions",
          },
          {
            from: "/snaps/tutorials/custom-evm-accounts",
            to: "/snaps/how-to/use-keyring-api/create-account-snap",
          },
          {
            from: "/snaps/how-to/work-with-existing-snaps",
            to: "/snaps/how-to/use-3rd-party-snaps",
          },
          {
            from: "/guide/snaps-patching-dependencies",
            to: "/snaps/how-to/troubleshoot",
          },
          {
            from: ["/guide/snaps-concepts", "/snaps/category/concepts", "/snaps/concepts/lifecycle", "/snaps/concepts/user-interface"],
            to: "/snaps/concepts/overview",
          },
          {
            from: "/snaps/concepts/anatomy",
            to: "/snaps/concepts/files",
          },
          {
            from: "/snaps/category/tutorials",
            to: "/snaps/tutorials",
          },
          {
            from: "/snaps/category/reference",
            to: "/snaps/reference",
          },
          {
            from: ["/guide/snaps-rpc-api", "/snaps/reference/rpc-api"],
            to: "/snaps/reference/snaps-api",
          },
          {
            from: "/guide/snaps-exports",
            to: "/snaps/reference/exports",
          }
        ].reduce((acc, item) => {
          acc.push(item);
          acc.push({ from: item.from + ".html", to: item.to });
          return acc;
        }, []),
        createRedirects(existingPath) {
          if (existingPath.includes("/use-sdk")) {
            return [
              existingPath.replace("/use-sdk", "/connect/set-up-sdk"),
            ];
          }
          return undefined;
        },
      },
    ],
    isProd ? 
      [
        "docusaurus-plugin-segment",
        {
          apiKey: process.env.SEGMENT_ANALYTICS_KEY,
          load: { cookie: { sameSite: "None", secure: true } },
          page: true,
        },
      ] : null,
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
          width: 150,
        },
        items: [
          {
            to: "wallet",
            label: "Wallet",
          },
          {
            to: "/wallet/how-to/use-sdk",
            label: "SDK",
            className: "navbar-item-beta",
          },
          {
            to: "snaps",
            label: "Snaps",
            className: "navbar-item-beta",
          },
          {
            to: "services",
            label: "Services",
          },
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
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
            title: "Documentation",
            items: [
              {
                label: "Home",
                to: "/",
              },
              {
                label: "MetaMask wallet",
                to: "/wallet",
              },
              {
                label: "MetaMask SDK",
                to: "/sdk",
              },
              {
                label: "Snaps",
                to: "/snaps",
              },
              {
                label: "Services",
                to: "/services",
              },
            ],
          },
          {
            title: "GitHub",
            items: [
              {
                label: "Documentation GitHub",
                href: "https://github.com/MetaMask/metamask-docs",
              },
              {
                label: "MetaMask wallet GitHub",
                href: "https://github.com/MetaMask/metamask-extension/",
              },
              {
                label: "MetaMask SDK GitHub",
                href: "https://github.com/MetaMask/metamask-sdk/",
              },
              {
                label: "Snaps GitHub",
                href: "https://github.com/MetaMask/snaps-monorepo",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Consensys Discord",
                href: "https://discord.gg/consensys",
              },
              {
                label: "Contribute to MetaMask",
                href: "https://github.com/MetaMask/metamask-extension/blob/develop/docs/README.md",
              },
              {
                label: "Contribute to the docs",
                href: "https://github.com/MetaMask/metamask-docs/blob/main/CONTRIBUTING.md",
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
              {
                html: "<button id='manage-cookie-btn'>Manage cookies</button>",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} MetaMask • A Consensys Formation`,
      },
      prism: {
        theme: codeTheme,
        additionalLanguages: ["csharp","swift","gradle","kotlin"],
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
      mermaid: {
        options: {
          fontFamily: "arial, verdana, sans-serif;",
          wrap: true,
          sequence: {
            diagramMarginX: 25,
            diagramMarginY: 25,
          },
          flowchart: {
            diagramPadding: 5,
            nodeSpacing: 75,
          },
        },
      },
    }),
};

module.exports = config;
