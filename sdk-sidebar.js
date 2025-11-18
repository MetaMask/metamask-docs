// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sdkSidebar = {
  overview: [
    'index',
    'about',
    {
      type: 'category',
      label: 'Reference',
      collapsible: false,
      collapsed: false,
      items: [
        'reference/options',
      ],
    },
  ],
  multichain: [
    'multichain/index',
    {
      type: 'category',
      label: 'Guides',
      collapsible: false,
      collapsed: false,
      items: [
        'multichain/connect/guides/connect-to-multichain',
        'multichain/connect/guides/send-transactions',
        'multichain/connect/guides/connector-libraries',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      collapsible: false,
      collapsed: false,
      items: [
        'multichain/connect/tutorials/create-multichain-dapp',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsible: false,
      collapsed: false,
      items: [
        'multichain/connect/reference/api',
      ],
    },
  ],
  evm: [
    'evm/index',
    {
      type: 'category',
      label: 'Guides',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'JavaScript',
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "evm/connect/guides/javascript/index" },
          items: [
            'evm/connect/guides/javascript/manage-user-accounts',
            'evm/connect/guides/javascript/manage-networks',
            {
              type: 'category',
              label: 'Send transactions',
              collapsible: true,
              collapsed: true,
              link: { type: "doc", id: "evm/connect/guides/javascript/send-transactions/index" },
              items: [
                'evm/connect/guides/javascript/send-transactions/batch-transactions',
              ],
            },
            {
              type: 'category',
              label: 'Sign data',
              collapsible: true,
              collapsed: true,
              link: { type: "doc", id: "evm/connect/guides/javascript/sign-data/index" },
              items: [
                'evm/connect/guides/javascript/sign-data/siwe',
              ],
            },
            'evm/connect/guides/javascript/batch-requests',
            'evm/connect/guides/javascript/interact-with-contracts',
            'evm/connect/guides/javascript/use-deeplinks',
            'evm/connect/guides/javascript/display-tokens',
            {
              type: 'category',
              label: 'Best practices',
              collapsible: true,
              collapsed: true,
              items: [
                'evm/connect/guides/javascript/best-practices/display',
                'evm/connect/guides/javascript/best-practices/run-devnet',
                'evm/connect/guides/javascript/best-practices/production-readiness',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Wagmi',
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "evm/connect/guides/wagmi/index" },
          items: [
            'evm/connect/guides/wagmi/manage-user-accounts',
            'evm/connect/guides/wagmi/manage-networks',
            'evm/connect/guides/wagmi/send-transactions',
            'evm/connect/guides/wagmi/interact-with-contracts',
          ],
        },
        'evm/connect/guides/rainbowkit',
        'evm/connect/guides/connectkit',
        'evm/connect/guides/react-native',
        'evm/connect/guides/dynamic',
        'evm/connect/guides/web3auth',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "link",
          label: "Create a wallet AI agent",
          href: "/tutorials/create-wallet-ai-agent"
        },
        { 
          type: "link",
          label: "Upgrade an EOA to a smart account",
          href: "/tutorials/upgrade-eoa-to-smart-account"
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsible: false,
      collapsed: false,
      items: [
        'evm/connect/reference/methods',
        'evm/connect/reference/provider-api',
        {
          type: "category",
          label: "JSON-RPC API",
          collapsible: true,
          collapsed: true,
          link: { type: "doc",  id: "evm/connect/reference/json-rpc-api/index" },
          items: [
            "evm/connect/reference/json-rpc-api/wallet_sendCalls",
            "evm/connect/reference/json-rpc-api/eth_signTypedData_v4",
          ],
        },
      ],
    },
  ],
  solana: [
    'solana/index',
    {
      type: 'category',
      label: 'Guides',
      collapsible: false,
      collapsed: false,
      items: [
        'solana/connect/guides/use-wallet-adapter',
        'solana/connect/guides/send-legacy-transaction',
        'solana/connect/guides/send-versioned-transaction',
      ],
    },
  ],
}

module.exports = sdkSidebar
