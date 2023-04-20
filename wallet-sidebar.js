// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebar = {
  walletSidebar: [
    "index",
    {
      type: "category",
      label: "Get started",
      link: { type: "generated-index" },
      collapsed: false,
      items: [
        "get-started/set-up-dev-environment",
        "get-started/run-development-network",
        "get-started/detect-metamask",
        "get-started/detect-network",
        "get-started/access-accounts",
      ],
    },
    {
      type: "category",
      label: "How to",
      link: { type: "generated-index" },
      items: [
        {
          type: "category",
          label: "Use MetaMask SDK",
          link: {
            type: "doc",
            id: "how-to/use-sdk/index",
          },
          items: [
            {
              type: "category",
              label: "JavaScript",
              link: {
                type: "doc",
                id: "how-to/use-sdk/javascript/index",
              },
              items: [
                "how-to/use-sdk/javascript/react",
                "how-to/use-sdk/javascript/pure-js",
                "how-to/use-sdk/javascript/other-web-frameworks",
                "how-to/use-sdk/javascript/react-native",
                "how-to/use-sdk/javascript/nodejs",
                "how-to/use-sdk/javascript/electron",
              ],
            },
            {
              type: "category",
              label: "Mobile",
              link: {
                type: "doc",
                id: "how-to/use-sdk/mobile/index",
              },
              items: [
                "how-to/use-sdk/mobile/ios",
                "how-to/use-sdk/mobile/android",
              ],
            },
            {
              type: "category",
              label: "Gaming",
              link: {
                type: "doc",
                id: "how-to/use-sdk/gaming/index",
              },
              items: [
                "how-to/use-sdk/gaming/unity",
                "how-to/use-sdk/gaming/unreal-engine",
              ],
            },
          ],
        },
        "how-to/use-mobile",
        "how-to/interact-with-smart-contracts",
        "how-to/send-transactions",
        "how-to/sign-data",
        "how-to/register-token",
        "how-to/register-method-names",
        "how-to/access-provider",
        "how-to/secure-dapp",
        "how-to/set-icon",
        "how-to/use-onboarding-library",
        "how-to/migrate-api",
      ],
    },
    {
      type: "category",
      label: "Concepts",
      link: { type: "generated-index" },
      items: [
        "concepts/sdk-connections",
        "concepts/signing-methods",
        "concepts/convenience-libraries",
      ],
    },
    {
      type: "doc",
      id: "tutorials/index",
      label: "Tutorials",
    },
    {
      type: "category",
      label: "Reference",
      link: { type: "generated-index" },
      items: [
        "reference/provider-api",
        "reference/rpc-api",
        "reference/sdk-js-options",
      ],
    },
  ],
};

module.exports = sidebar;
