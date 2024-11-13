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
      collapsible: true,
      collapsed: false,
      link: { type: "doc", id: "connect/index" },
      items: [
        {
          type: "category",
          label: "MetaMask SDK",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "connect/metamask-sdk/index" },
          items: [
            {
              type: "category",
              label: "JavaScript",
              collapsible: true,
              collapsed: true,
              link: { type: "doc", id: "connect/metamask-sdk/javascript/index" },
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
        },
        {
          type: "category",
          label: "Third-party libraries",
          collapsible: true,
          collapsed: true,
          link: {
            type: "generated-index",
            slug: "/connect/3rd-party-libraries",
            description: "You can connect to MetaMask using third-party libraries that integrate MetaMask SDK."
          },
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
        },
        {
          type: "doc",
          label: "Wallet API",
          id: "connect/wallet-api",
        },
      ],
    },
    {
      type: "category",
      label: "How to",
      collapsible: true,
      collapsed: true,
      link: { type: "generated-index", slug: "/how-to" },
      items: [
        {
          type: "category",
          label: "JavaScript",
          collapsible: true,
          collapsed: true,
          link: { type: "generated-index", slug: "/how-to/javascript" },
          items: [
            {
              type: "doc",
              label: "Access a user's accounts",
              id: "how-to/javascript/access-accounts"
            },
            {
              type: "category",
              label: "Manage networks",
              collapsible: true,
              collapsed: true,
              link: { type: "generated-index", slug: "/how-to/javascript/manage-networks" },
              items: [
                {
                  type: "doc",
                  label: "Detect a user's network",
                  id: "how-to/javascript/manage-networks/detect-network"
                },
                {
                  type: "doc",
                  label: "Add a network",
                  id: "how-to/javascript/manage-networks/add-network"
                }
              ]
            },
            {
              type: "category",
              label: "Sign data",
              collapsible: true,
              collapsed: true,
              link: { type: "doc", id: "how-to/javascript/sign-data/index" },
              items: [
                {
                  type: "doc",
                  label: "Connect and sign",
                  id: "how-to/javascript/sign-data/connect-and-sign"
                },
                {
                  type: "doc",
                  label: "Sign in with Ethereum",
                  id: "how-to/javascript/sign-data/siwe"
                }
              ]
            },
            {
              type: "doc",
              label: "Send transactions",
              id: "how-to/javascript/send-transactions"
            },
            {
              type: "doc",
              label: "Make read-only requests",
              id: "how-to/javascript/make-read-only-requests"
            },
            {
              type: "doc",
              label: "Batch JSON-RPC requests",
              id: "how-to/javascript/batch-json-rpc-requests"
            },
            {
              type: "category",
              label: "Display in MetaMask",
              collapsible: true,
              collapsed: true,
              link: { type: "generated-index", slug: "/how-to/javascript/display" },
              items: [
                {
                  type: "doc",
                  label: "Display tokens",
                  id: "how-to/javascript/display/tokens"
                },
                {
                  type: "doc",
                  label: "Display a contract's method names",
                  id: "how-to/javascript/display/method-names"
                },
                {
                  type: "doc",
                  label: "Display a dapp icon",
                  id: "how-to/javascript/display/icon"
                },
                {
                  type: "doc",
                  label: "Display custom modals",
                  id: "how-to/javascript/display/custom-modals"
                }
              ]
            },
            {
              type: "doc",
              label: "Manage permissions",
              id: "how-to/javascript/manage-permissions"
            },
            {
              type: "category",
              label: "Use non-EVM networks",
              collapsible: true,
              collapsed: true,
              link: { type: "doc", id: "how-to/javascript/use-non-evm-networks/index" },
              items: [
                {
                  type: "category",
                  label: "Use Starknet",
                  collapsible: true,
                  collapsed: true,
                  link: { type: "doc", id: "how-to/javascript/use-non-evm-networks/starknet/index" },
                  items: [
                    {
                      type: "doc",
                      label: "Connect to Starknet",
                      id: "how-to/javascript/use-non-evm-networks/starknet/connect-to-starknet"
                    },
                    {
                      type: "doc",
                      label: "Manage Starknet accounts",
                      id: "how-to/javascript/use-non-evm-networks/starknet/manage-starknet-accounts"
                    },
                    {
                      type: "doc",
                      label: "Manage Starknet networks",
                      id: "how-to/javascript/use-non-evm-networks/starknet/manage-starknet-networks"
                    },
                    {
                      type: "doc",
                      label: "Send Starknet transactions",
                      id: "how-to/javascript/use-non-evm-networks/starknet/send-starknet-transactions"
                    },
                    {
                      type: "doc",
                      label: "Sign Starknet transactions",
                      id: "how-to/javascript/use-non-evm-networks/starknet/sign-starknet-data"
                    },
                    {
                      type: "doc",
                      label: "Create a simple Starknet dapp",
                      id: "how-to/javascript/use-non-evm-networks/starknet/create-a-simple-starknet-dapp"
                    },
                    {
                      type: "doc",
                      label: "Troubleshoot",
                      id: "how-to/javascript/use-non-evm-networks/starknet/troubleshoot"
                    },
                    {
                      type: "doc",
                      label: "About get-starknet",
                      id: "how-to/javascript/use-non-evm-networks/starknet/about-get-starknet"
                    }
                  ]
                }
              ]
            },
            {
              type: "doc",
              label: "Onboard users",
              id: "how-to/javascript/onboard-users"
            },
            {
              type: "doc",
              label: "Run a development network",
              id: "how-to/javascript/run-devnet"
            },
            {
              type: "doc",
              label: "Secure your dapp",
              id: "how-to/javascript/secure-dapp"
            },
          ],
        },
        {
          type: "category",
          label: "Mobile",
          collapsible: true,
          collapsed: true,
          link: { type: "generated-index", slug: "/how-to/mobile" },
          items: [
            {
              type: "category",
              label: "iOS",
              collapsible: true,
              collapsed: true,
              link: { type: "generated-index", slug: "/how-to/mobile/ios" },
              items: [
                {
                  type: "doc",
                  label: "Connect and sign",
                  id: "how-to/mobile/ios/connect-and-sign"
                },
              ]
            },
            {
              type: "category",
              label: "Android",
              collapsible: true,
              collapsed: true,
              link: { type: "generated-index", slug: "/how-to/mobile/android" },
              items: [
                {
                  type: "doc",
                  label: "Batch JSON-RPC requests",
                  id: "how-to/mobile/android/batch-json-rpc-requests"
                },
                {
                  type: "doc",
                  label: "Connect and sign",
                  id: "how-to/mobile/android/connect-and-sign"
                }
              ]
            },
          ]
        },
        {
          type: "category",
          label: "Gaming",
          collapsible: true,
          collapsed: true,
          link: { type: "generated-index", slug: "/how-to/gaming" },
          items: [
            {
              type: "category",
              label: "Unity",
              collapsible: true,
              collapsed: true,
              link: { type: "doc", id: "how-to/gaming/unity/index" },
              items: [
                {
                  type: "doc",
                  label: "Connect and sign",
                  id: "how-to/gaming/unity/connect-and-sign"
                },
                {
                  type: "doc",
                  label: "Set up Infura",
                  id: "how-to/gaming/unity/infura"
                },
                {
                  type: "category",
                  label: "Interact with smart contracts",
                  collapsible: true,
                  collapsed: true,
                  link: { type: "doc", id: "how-to/gaming/unity/smart-contracts/index" },
                  items: [
                    {
                      type: "doc",
                      label: "Contract interface",
                      id: "how-to/gaming/unity/smart-contracts/contract-interface"
                    },
                    {
                      type: "doc",
                      label: "Contract factory",
                      id: "how-to/gaming/unity/smart-contracts/contract-factory"
                    },
                    {
                      type: "doc",
                      label: "Contract proxy class",
                      id: "how-to/gaming/unity/smart-contracts/contract-proxy-class"
                    },
                    {
                      type: "doc",
                      label: "Contract provider",
                      id: "how-to/gaming/unity/smart-contracts/contract-provider"
                    }
                  ]
                },
                {
                  type: "doc",
                  label: "Enable human-readable addresses",
                  id: "how-to/gaming/unity/dweb"
                },
              ],
            },
          ],
        },
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
          collapsed: true,
          collapsible: true,
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
