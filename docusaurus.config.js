// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

require("dotenv").config();
const { themes } = require("prism-react-renderer");
const codeTheme = themes.dracula;
const remarkCodesandbox = require("remark-codesandbox");
const isProd = process.env.NODE_ENV === "production";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "MetaMask developer documentation",
  // tagline: '',
  url: "https://docs.metamask.io",
  baseUrl: process.env.DEST || "/", // overwritten in github action for staging / latest
  onBrokenLinks: "warn",
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
    locales: ["en"/*, "zh", "ko"*/],
  },

  customFields: {
    LD_CLIENT_ID: process.env.LD_CLIENT_ID,
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
            openrpcDocument: "https://metamask.github.io/api-specs/0.9.3/openrpc.json",
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
      "@docusaurus/plugin-content-docs",
      {
        id: "docs",
        path: "docs",
        routeBasePath: "/",
        editUrl: "https://github.com/MetaMask/metamask-docs/edit/main/",
        sidebarPath: false,
        breadcrumbs: false,
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        fromExtensions: ["html", "htm"],
        // These redirects are (mostly) organized in the same order as the sidebar.
        redirects: [
          {
            from: ["/guide", "/guide/common-terms", "/guide/contributors", "/wallet/how-to/get-started-building", "/wallet/how-to/set-up-dev-environment", "/guide/create-dapp", "/guide/getting-started", "/wallet/category/get-started", "/wallet/get-started/set-up-dev-environment", "/wallet/how-to/get-started-building/set-up-dev-environment"],
            to: "/wallet",
          },
          {
            from: "/wallet/category/how-to",
            to: "/wallet/how-to",
          },
          {
            from: ["/wallet/quickstart/javascript", "/wallet/quickstart/react", "/wallet/quickstart/other-platforms", "/wallet/how-to/discover-multiple-wallets", "/wallet/how-to/detect-wallet", "/wallet/how-to/detect-wallet/multiple-wallets", "/guide/metamask-extension-provider", "/wallet/how-to/access-provider"],
            to: "/wallet/how-to/connect",
          },
          {
            from: ["/wallet/get-started/detect-metamask", "/wallet/how-to/detect-metamask", "/wallet/how-to/detect-wallet/metamask", "/wallet/how-to/connect/detect-metamask"],
            to: "/wallet/tutorials/javascript-dapp-simple",
          },
          {
            from: ["/guide/accessing-accounts", "/wallet/how-to/access-accounts", "/wallet/get-started/access-accounts"],
            to: "/wallet/how-to/connect/access-accounts",
          },
          {
            from: ["/wallet/get-started/detect-network", "/wallet/how-to/connect/detect-network", "/wallet/how-to/detect-network"],
            to: "/wallet/how-to/manage-networks/detect-network",
          },
          {
            from: "/wallet/how-to/add-network",
            to: "/wallet/how-to/manage-networks/add-network",
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
            from: ["/guide/mobile-getting-started", "/guide/site-compatibility-checklist", "/guide/mobile-best-practices", "/wallet/how-to/use-mobile", "/wallet/how-to/integrate-with-mobile", "/sdk"],
            to: "/wallet/how-to/use-sdk",
          },
          {
            from: "/wallet/how-to/sign-data/connect-and-sign",
            to: "/wallet/how-to/use-sdk/javascript/connect-and-sign",
          },
          {
            from: ["/wallet/how-to/use-3rd-party-integrations/js-infura-api", "/wallet/how-to/make-read-only-requests"],
            to: "/wallet/how-to/use-sdk/javascript/make-read-only-requests",
          },
          {
            from: "/wallet/how-to/batch-json-rpc-requests",
            to: "/wallet/how-to/use-sdk/javascript/batch-json-rpc-requests",
          },
          {
            from: "/wallet/how-to/display/custom-modals",
            to: "/wallet/how-to/use-sdk/javascript/display-custom-modals",
          },
          {
            from: "/wallet/how-to/use-3rd-party-integrations/unity-dweb",
            to: "/wallet/how-to/use-sdk/gaming/unity/dweb",
          },
          {
            from: "/wallet/how-to/use-3rd-party-integrations/unity-infura",
            to: "/wallet/how-to/use-sdk/gaming/unity/infura",
          },
          {
            from: "/wallet/how-to/use-3rd-party-integrations",
            to: "/wallet/how-to/use-sdk/3rd-party-libraries",
          },
          {
            from: "/wallet/how-to/use-3rd-party-integrations/web3-onboard",
            to: "/wallet/how-to/use-sdk/3rd-party-libraries/web3-onboard",
          },
          {
            from: ["/guide/initializing-dapps", "/wallet/how-to/interact-with-smart-contracts"],
            to: "/wallet/concepts/smart-contracts",
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
            from: ["/guide/provider-migration", "/wallet/concepts/provider-api", "/wallet/concepts/rpc-api", "/wallet/how-to/migrate-api", "/wallet/concepts/apis"],
            to: "/wallet/concepts/wallet-api",
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
            from: ["/guide/snaps-concepts", "/snaps/category/concepts", "/snaps/concepts/lifecycle", "/snaps/concepts/user-interface", "/snaps/concepts/overview", "/snaps/concepts", "/snaps/concepts/apis", "/snaps/concepts/execution-environment"],
            to: "/snaps/learn/about-snaps",
          },
          {
            from: ["/snaps/concepts/anatomy", "/snaps/concepts/files"],
            to: "/snaps/learn/about-snaps/files",
          },
          {
            from: ["/snaps/category/tutorials", "/snaps/tutorials"],
            to: "/snaps/learn/tutorials",
          },
          {
            from: "/snaps/tutorials/gas-estimation",
            to: "/snaps/learn/tutorials/gas-estimation",
          },
          {
            from: "/snaps/tutorials/transaction-insights",
            to: "/snaps/learn/tutorials/transaction-insights",
          },
          {
            from: "/snaps/category/how-to",
            to: "/snaps/how-to",
          },
          {
            from: "/snaps/how-to/use-custom-ui",
            to: "/snaps/features/custom-ui",
          },
          {
            from: "/snaps/how-to/localize-a-snap",
            to: "/snaps/features/localization",
          },
          {
            from: "/snaps/how-to/manage-keys",
            to: "/snaps/features/non-evm-networks",
          },
          {
            from: "/snaps/concepts/keyring-api",
            to: "/snaps/features/custom-evm-accounts",
          },
          {
            from: "/snaps/tutorials/custom-evm-accounts",
            to: "/snaps/features/custom-evm-accounts/create-account-snap",
          },
          {
            from: ["/snaps/concepts/design-guidelines", "/snaps/how-to/design-a-snap"],
            to: "/snaps/learn/best-practices/design-guidelines",
          },
          {
            from: ["/snaps/concepts/security-guidelines", "/snaps/how-to/secure-a-snap"],
            to: "/snaps/learn/best-practices/security-guidelines",
          },
          {
            from: "/guide/snaps-permissions",
            to: "/snaps/how-to/request-permissions",
          },
          {
            from: ["/guide/snaps-patching-dependencies", "/snaps/how-to/troubleshoot"],
            to: "/snaps/how-to/debug-a-snap/common-issues",
          },
          {
            from: ["/guide/snaps-development-guide", "/snaps/how-to/develop-a-snap"],
            to: "/snaps/how-to/publish-a-snap",
          },
          {
            from: ["/snaps/how-to/work-with-existing-snaps", "/snaps/how-to/use-3rd-party-snaps"],
            to: "/snaps/how-to/connect-to-a-snap",
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
            from: ["/guide/snaps-exports", "/snaps/reference/exports"],
            to: "/snaps/reference/entry-points",
          },
        ].reduce((acc, item) => {
          acc.push(item);
          acc.push({ from: item.from + ".html", to: item.to });
          return acc;
        }, []),
        createRedirects(existingPath) {
          if (existingPath.includes("/use-sdk")) {
            // Redirect from /connect/set-up-sdk/X to /use-sdk/X
            return [
              existingPath.replace("/use-sdk", "/connect/set-up-sdk"),
            ];
          }
          if (existingPath.includes("/use-sdk/gaming/unity")) {
            return [
              existingPath.replace("/use-sdk/gaming/unity", "/interact-with-smart-contracts/unity"),
            ];
          }
          if (existingPath.includes("/features/custom-evm-accounts")) {
            return [
              existingPath.replace("/features/custom-evm-accounts", "/how-to/use-keyring-api"),
            ];
          }
          return undefined;
        },
      },
    ],
    "./src/plugins/plugin-json-rpc.ts",
    isProd ? 
      [
        "docusaurus-plugin-segment",
        {
          apiKey: process.env.SEGMENT_ANALYTICS_KEY,
          load: { cookie: { sameSite: "None", secure: true } },
          page: true,
        },
      ] : null,
    "./src/plugins/launchdarkly",
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      metadata: [
        { name: "og:image", content: "/img/metamaskog.jpeg" },
      ],
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
            to: "snaps",
            label: "Snaps",
          },
          {
            to: "services",
            label: "Services",
          },
          {
            to: "whats-new",
            label: "What's new?",
            position: "right",
          },
          /* Language drop down
          {
            type: "localeDropdown",
            position: "right",
          },
          */
        ],
      },
      docs: {
        sidebar: {
          autoCollapseCategories: false,
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
                to: "/wallet/how-to/use-sdk",
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
        additionalLanguages: ["csharp","gradle","bash","json"],
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
