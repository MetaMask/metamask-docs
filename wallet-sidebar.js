// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebar = {
  walletSidebar: [
    {
      type: "doc",
      label: "Introduction",
      id: "index",
    },
    {
      type: "category",
      label: "How to",
      collapsible: true,
      collapsed: false,
      link: { type: "generated-index", slug: "/how-to" },
      items: [
        {
          type: "doc",
          label: "Connect to MetaMask",
          id: "how-to/connect"
        },
        {
          type: "doc",
          label: "Access a user's accounts",
          id: "how-to/access-accounts"
        },
        {
          type: "category",
          label: "Manage networks",
          collapsible: true,
          collapsed: true,
          link: { type: "generated-index", slug: "/how-to/manage-networks" },
          items: [
            {
              type: "doc",
              label: "Detect a user's network",
              id: "how-to/manage-networks/detect-network"
            },
            {
              type: "doc",
              label: "Add a network",
              id: "how-to/manage-networks/add-network"
            },
            {
              type: "doc",
              label: "Interact with multiple networks",
              id: "how-to/manage-networks/use-multichain"
            }
          ]
        },
        {
          type: "category",
          label: "Sign data",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "how-to/sign-data/index" },
          items: [
            {
              type: "doc",
              label: "Sign in with Ethereum",
              id: "how-to/sign-data/siwe"
            }
          ]
        },
        {
          type: "doc",
          label: "Send transactions",
          id: "how-to/send-transactions"
        },
        {
          type: "category",
          label: "Display in MetaMask",
          collapsible: true,
          collapsed: true,
          link: { type: "generated-index", slug: "/how-to/display" },
          items: [
            {
              type: "doc",
              label: "Display tokens",
              id: "how-to/display/tokens"
            },
            {
              type: "doc",
              label: "Display a contract's method names",
              id: "how-to/display/method-names"
            },
            {
              type: "doc",
              label: "Display a dapp icon",
              id: "how-to/display/icon"
            }
          ]
        },
        {
          type: "doc",
          label: "Manage permissions",
          id: "how-to/manage-permissions"
        },
        {
          type: "category",
          label: "Use non-EVM networks",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "how-to/use-non-evm-networks/index" },
          items: [
            {
              type: "category",
              label: "Use Starknet",
              link: { type: "doc", id: "how-to/use-non-evm-networks/starknet/index" },
              items: [
                {
                  type: "doc",
                  label: "Connect to Starknet",
                  id: "how-to/use-non-evm-networks/starknet/connect-to-starknet"
                },
                {
                  type: "doc",
                  label: "Manage Starknet accounts",
                  id: "how-to/use-non-evm-networks/starknet/manage-starknet-accounts"
                },
                {
                  type: "doc",
                  label: "Manage Starknet networks",
                  id: "how-to/use-non-evm-networks/starknet/manage-starknet-networks"
                },
                {
                  type: "doc",
                  label: "Send Starknet transactions",
                  id: "how-to/use-non-evm-networks/starknet/send-starknet-transactions"
                },
                {
                  type: "doc",
                  label: "Sign Starknet transactions",
                  id: "how-to/use-non-evm-networks/starknet/sign-starknet-data"
                },
                {
                  type: "doc",
                  label: "Create a simple Starknet dapp",
                  id: "how-to/use-non-evm-networks/starknet/create-a-simple-starknet-dapp"
                },
                {
                  type: "doc",
                  label: "Troubleshoot",
                  id: "how-to/use-non-evm-networks/starknet/troubleshoot"
                },
                {
                  type: "doc",
                  label: "About get-starknet",
                  id: "how-to/use-non-evm-networks/starknet/about-get-starknet"
                }
              ]
            }
          ]
        },
        {
          type: "doc",
          label: "Onboard users",
          id: "how-to/onboard-users"
        },
        {
          type: "doc",
          label: "Run a development network",
          id: "how-to/run-devnet"
        },
        {
          type: "doc",
          label: "Secure your dapp",
          id: "how-to/secure-dapp"
        }
      ],
    },
    {
      type: "category",
      label: "Concepts",
      collapsible: true,
      collapsed: true,
      link: { type: "generated-index", slug: "/concepts" },
      items: [
        {
          type: "doc",
          label: "About the Wallet API",
          id: "concepts/wallet-api"
        },
        {
          type: "doc",
          label: "About the Multichain API",
          id: "concepts/multichain-api"
        },
        {
          type: "doc",
          label: "Convenience libraries",
          id: "concepts/convenience-libraries"
        },
        {
          type: "doc",
          label: "Signing methods",
          id: "concepts/signing-methods"
        },
        {
          type: "doc",
          label: "Wallet interoperability",
          id: "concepts/wallet-interoperability"
        },
        {
          type: "doc",
          label: "Smart contracts",
          id: "concepts/smart-contracts"
        },
      ],
    },
    {
      type: "category",
      label: "Tutorials",
      collapsible: true,
      collapsed: true,
      link: { type: "generated-index", slug: "/tutorials" },
      items: [
        {
          type: "doc",
          label: "Create a React dapp with local state",
          id: "tutorials/react-dapp-local-state",
        },
        {
          type: "doc",
          label: "Create a React dapp with global state",
          id: "tutorials/react-dapp-global-state",
        },
        {
          type: "doc",
          label: "Create a simple dapp",
          id: "tutorials/javascript-dapp-simple",
        },
      ],
    },
    {
      type: "category",
      label: "Reference",
      collapsible: true,
      collapsed: false,
      link: { type: "generated-index", slug: "/reference" },
      items: [
        {
          type: "category",
          label: "Non-EVM APIs",
          collapsible: true,
          collapsed: true,
          link: {
            type: "generated-index",
            slug: "/reference/non-evm-apis",
            description: "Use the following APIs to interact with users' non-EVM accounts."
          },
          items: [
            {
              type: "doc",
              label: "Starknet Snap API",
              id: "reference/non-evm-apis/starknet-snap-api",
            },
          ],
        },
        {
          type: "doc",
          label: "Ethereum provider API",
          id: "reference/provider-api",
        },
        {
          type: "doc",
          label: "Multichain API",
          id: "reference/multichain-api",
        },
        {
          type: "category",
          label: "JSON-RPC API",
          collapsible: true,
          collapsed: true,
          link: { type: "doc",  id: "reference/json-rpc-methods/index" },
          items: [{ type: "autogenerated", dirName: "reference/json-rpc-methods" }],
        },
      ],
    },
  ],
};

module.exports = sidebar;
