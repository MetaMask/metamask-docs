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
      label: 'Get started',
      collapsible: false,
      collapsed: false,
      items: [
        'evm/connect/get-started/wagmi',
        'evm/connect/get-started/javascript',
        'evm/connect/get-started/rainbowkit',
        'evm/connect/get-started/react-native',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsible: false,
      collapsed: false,
      items: [
        'evm/connect/guides/manage-user-accounts',
        'evm/connect/guides/manage-networks',
        {
          type: 'category',
          label: 'Send transactions',
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "evm/connect/guides/send-transactions/index" },
          items: [
            'evm/connect/guides/send-transactions/batch-transactions',
          ],
        },
        {
          type: 'category',
          label: 'Sign data',
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "evm/connect/guides/sign-data/index" },
          items: [
            'evm/connect/guides/sign-data/siwe',
          ],
        },
        'evm/connect/guides/batch-requests',
        'evm/connect/guides/interact-with-contracts',
        'evm/connect/guides/use-deeplinks',
        'evm/connect/guides/display-tokens',
        'evm/connect/guides/connect-extension',
        {
          type: 'category',
          label: 'Best practices',
          collapsible: true,
          collapsed: true,
          items: [
            'evm/connect/guides/best-practices/display',
            'evm/connect/guides/best-practices/run-devnet',
            'evm/connect/guides/best-practices/production-readiness',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Partner guides',
      collapsible: false,
      collapsed: false,
      items: [
        'evm/connect/partners/dynamic',
        'evm/connect/partners/web3auth',
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
  ],
}

module.exports = sdkSidebar
