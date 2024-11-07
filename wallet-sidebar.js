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
      label: "Connect to MetaMask",
      link: { type: "doc", id: "connect/index" },
      items: [
        {
          type: "category",
          label: "MetaMask SDK",
          link: { type: "doc", id: "connect/metamask-sdk/index" },
          items: [
            {
              type: "category",
              label: "JavaScript",
              link: { type: "doc", id: "connect/metamask-sdk/javascript/index" },
              collapsible: true,
              collapsed: true,
              items: [
                {
                  type: "category",
                  label: "React",
                  collapsible: true,
                  collapsed: true,
                  link: { type: "doc", id: "connect/metamask-sdk/javascript/react/index" },
                  items: [
                    {
                      type: "doc",
                      label: "React UI",
                      id: "connect/metamask-sdk/javascript/react/react-ui"
                    },
                  ],
                },
                {
                  type: "doc",
                  label: "Pure JavaScript",
                  id: "connect/metamask-sdk/javascript/pure-js"
                },
                {
                  type: "doc",
                  label: "Other web frameworks",
                  id: "connect/metamask-sdk/javascript/other-web-frameworks"
                },
                {
                  type: "doc",
                  label: "Node.js",
                  id: "connect/metamask-sdk/javascript/nodejs"
                },
                {
                  type: "doc",
                  label: "Electron",
                  id: "connect/metamask-sdk/javascript/electron"
                },
              ],
            },
            {
              type: "category",
              label: "Mobile",
              collapsible: true,
              collapsed: true,
              link: { type: "doc", id: "connect/metamask-sdk/mobile/index" },
              items: [
                {
                  type: "doc",
                  label: "iOS",
                  id: "connect/metamask-sdk/mobile/ios"
                },
                {
                  type: "doc",
                  label: "Android",
                  id: "connect/metamask-sdk/mobile/android"
                },
                {
                  type: "doc",
                  label: "React Native",
                  id: "connect/metamask-sdk/mobile/react-native"
                },
              ],
            },
            {
              type: "category",
              label: "Gaming",
              collapsible: true,
              collapsed: true,
              link: { type: "doc", id: "connect/metamask-sdk/gaming/index" },
              items: [
                {
                  type: "doc",
                  label: "Unity",
                  id: "connect/metamask-sdk/gaming/unity"
                }
              ],
            },
          ],
          collapsible: true,
          collapsed: true,
        },
        {
          type: "category",
          label: "Third-party libraries",
          items: [
            {
              type: "doc",
              label: "Wagmi",
              id: "connect/3rd-party-libraries/wagmi"
            },
            {
              type: "doc",
              label: "Web3-Onboard",
              id: "connect/3rd-party-libraries/web3-onboard"
            },
          ],
          collapsible: true,
          collapsed: true,
        },
        {
          type: "doc",
          label: "Wallet API",
          id: "connect/wallet-api",
        },
      ],
      collapsible: true,
      collapsed: false,
    },
    {
      type: "category",
      label: "How to",
      link: { type: "generated-index", slug: "/how-to" },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          label: "Access a user's accounts",
          id: "how-to/access-accounts"
        },
        {
          type: "category",
          label: "Manage networks",
          link: { type: "generated-index", slug: "/how-to/manage-networks" },
          collapsible: true,
          collapsed: true,
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
            }
          ]
        },
        {
          type: "category",
          label: "Sign data",
          link: { type: "doc", id: "how-to/sign-data/index" },
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: "doc",
              label: "Connect and sign",
              id: "how-to/sign-data/connect-and-sign"
            },
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
          type: "doc",
          label: "Make read-only requests",
          id: "how-to/make-read-only-requests"
        },
        {
          type: "doc",
          label: "Batch JSON-RPC requests",
          id: "how-to/batch-json-rpc-requests"
        },
        {
          type: "category",
          label: "Display in MetaMask",
          link: { type: "generated-index", slug: "/how-to/display" },
          collapsible: true,
          collapsed: true,
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
            },
            {
              type: "doc",
              label: "Display custom modals",
              id: "how-to/display/headless"
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
          link: { type: "doc", id: "how-to/use-non-evm-networks/index" },
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: "category",
              label: "Use Starknet",
              link: { type: "doc", id: "how-to/use-non-evm-networks/starknet/index" },
              collapsible: true,
              collapsed: true,
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
          type: "category",
          label: "Use the Unity SDK",
          link: { type: "doc", id: "how-to/use-unity-sdk/index" },
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: "doc",
              label: "Connect and sign",
              id: "how-to/use-unity-sdk/connect-and-sign"
            },
            {
              type: "doc",
              label: "Set up Infura",
              id: "how-to/use-unity-sdk/infura"
            },
            {
              type: "category",
              label: "Interact with smart contracts",
              link: { type: "doc", id: "how-to/use-unity-sdk/smart-contracts/index" },
              collapsible: true,
              collapsed: true,
              items: [
                {
                  type: "doc",
                  label: "Contract interface",
                  id: "how-to/use-unity-sdk/smart-contracts/contract-interface"
                },
                {
                  type: "doc",
                  label: "Contract factory",
                  id: "how-to/use-unity-sdk/smart-contracts/contract-factory"
                },
                {
                  type: "doc",
                  label: "Contract proxy class",
                  id: "how-to/use-unity-sdk/smart-contracts/contract-proxy-class"
                },
                {
                  type: "doc",
                  label: "Contract provider",
                  id: "how-to/use-unity-sdk/smart-contracts/contract-provider"
                }
              ]
            },
            {
              type: "doc",
              label: "Enable human-readable addresses",
              id: "how-to/use-unity-sdk/dweb"
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
      link: { type: "generated-index", slug: "/concepts" },
      collapsible: true,
      collapsed: true,
      items: [
        {
          type: "doc",
          label: "Architecture",
          id: "concepts/architecture"
        },
        {
          type: "doc",
          label: "About the Wallet API",
          id: "concepts/wallet-api"
        },
        {
          type: "doc",
          label: "SDK connections",
          id: "concepts/sdk-connections"
        },
        {
          type: "doc",
          label: "Android SDK architecture",
          id: "concepts/android-sdk"
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
      link: { type: "generated-index", slug: "/tutorials" },
      collapsible: true,
      collapsed: true,
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
          type: "doc",
          label: "JavaScript SDK options",
          id: "reference/sdk-js-options",
        },
        {
          type: "doc",
          label: "Unity SDK API",
          id: "reference/sdk-unity-api",
        },
        {
          type: "category",
          label: "Non-EVM APIs",
          link: { type: "generated-index", slug: "/reference/non-evm-apis" },
          collapsed: true,
          collapsible: true,
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
          type: "category",
          label: "JSON-RPC API",
          link: { type: "doc",  id: "reference/json-rpc-methods/index" },
          collapsible: true,
          collapsed: true,
          items: [{ type: "autogenerated", dirName: "reference/json-rpc-methods" }],
        },
      ],
    },
  ],
};

module.exports = sidebar;
