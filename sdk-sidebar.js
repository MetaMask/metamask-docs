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
        'reference/sdk-options',
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
        'multichain/connect/reference/multichain-api',
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
        'evm/connect/get-started/javascript-wagmi',
        'evm/connect/get-started/javascript',
        'evm/connect/get-started/javascript-rainbowkit',
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
            'evm/connect/guides/send-transactions/send-batch-transactions',
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
        'evm/connect/reference/sdk-methods',
        'evm/connect/reference/provider-api',
        {
          type: "category",
          label: "JSON-RPC API",
          collapsible: true,
          collapsed: true,
          link: { type: "doc",  id: "evm/connect/reference/json-rpc-methods/index" },
          items: [],
        },
      ],
    },
  ],
  solana: [
    'solana/index',
  ],
  starknet: [
    'starknet/index',
    {
      type: "category",
      label: "Guides",
      collapsible: false,
      collapsed: false,
      items: [
        'starknet/guides/connect-to-starknet',
        'starknet/guides/manage-starknet-accounts',
        'starknet/guides/manage-starknet-networks',
        'starknet/guides/send-starknet-transactions',
        'starknet/guides/sign-starknet-data',
        'starknet/guides/troubleshoot',
      ],
    },
    {
      type: "category",
      label: "Concepts",
      collapsible: false,
      collapsed: false,
      items: [
        'starknet/concepts/about-get-starknet',
      ],
    },
    {
      type: "category",
      label: "Tutorials",
      collapsible: false,
      collapsed: false,
      items: [
        'starknet/tutorials/create-a-simple-starknet-dapp',
      ],
    },
    {
      type: "category",
      label: "Reference",
      collapsible: false,
      collapsed: false,
      items: [
        'starknet/reference/starknet-snap-api',
      ],
    },
  ],
}

module.exports = sdkSidebar
