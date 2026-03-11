// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const metamaskConnectSidebar = {
  overview: [
    'index',
    'architecture',
    'integration-options',
    'supported-platforms',
    {
      type: 'category',
      label: 'Reference',
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '@metamask/connect-multichain',
          collapsible: true,
          collapsed: false,
          items: [
            'multichain/reference/methods',
            'multichain/reference/api',
          ],
        },
        {
          type: 'category',
          label: '@metamask/connect-evm',
          collapsible: true,
          collapsed: false,
          items: [
            'evm/reference/methods',
            'evm/reference/provider-api',
          ],
        },
        {
          type: 'category',
          label: '@metamask/connect-solana',
          collapsible: true,
          collapsed: false,
          items: [
            'solana/reference/methods',
          ],
        },
      ],
    },
  ],
  multichain: [
    'multichain/index',
    'multichain/quickstart',
    {
      type: 'category',
      label: 'Concepts',
      collapsible: false,
      collapsed: false,
      items: [
        'multichain/concepts/scopes',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsible: false,
      collapsed: false,
      items: [
        'multichain/guides/sign-transactions',
        'multichain/guides/send-transactions',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      collapsible: false,
      collapsed: false,
      items: [
        'multichain/tutorials/create-multichain-dapp',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsible: false,
      collapsed: false,
      items: [
        'multichain/reference/methods',
        'multichain/reference/api',
      ],
    },
  ],
  evm: [
    'evm/index',
    {
      type: 'category',
      label: 'Quickstart',
      collapsible: false,
      collapsed: false,
      items: [
        'evm/quickstart/javascript',
        'evm/quickstart/wagmi',
        'evm/quickstart/rainbowkit',
        'evm/quickstart/connectkit',
        'evm/quickstart/react-native',
        'evm/quickstart/dynamic',
        'evm/quickstart/web3auth',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsible: false,
      collapsed: false,
      items: [
        'evm/migrate-from-sdk',
        'evm/guides/manage-user-accounts',
        'evm/guides/manage-networks',
        {
          type: 'category',
          label: 'Send transactions',
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "evm/guides/send-transactions/index" },
          items: [
            'evm/guides/send-transactions/batch-transactions',
          ],
        },
        {
          type: 'category',
          label: 'Sign data',
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "evm/guides/sign-data/index" },
          items: [
            'evm/guides/sign-data/siwe',
          ],
        },
        'evm/guides/interact-with-contracts',
        {
          type: 'category',
          label: 'MetaMask exclusive',
          collapsible: true,
          collapsed: true,
          items: [
            'evm/guides/metamask-exclusive/batch-requests',
            'evm/guides/metamask-exclusive/use-deeplinks',
            'evm/guides/metamask-exclusive/display-tokens',
          ],
        },
        {
          type: 'category',
          label: 'Best practices',
          collapsible: true,
          collapsed: true,
          items: [
            'evm/guides/best-practices/display',
            'evm/guides/best-practices/run-devnet',
            'evm/guides/best-practices/production-readiness',
          ],
        },
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
        'evm/reference/methods',
        'evm/reference/provider-api',
        {
          type: "category",
          label: "JSON-RPC API",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "evm/reference/json-rpc-api/index" },
          items: [
            "evm/reference/json-rpc-api/wallet_sendCalls",
            "evm/reference/json-rpc-api/eth_signTypedData_v4",
          ],
        },
      ],
    },
  ],
  solana: [
    'solana/index',
    {
      type: 'category',
      label: 'Quickstart',
      collapsible: false,
      collapsed: false,
      items: [
        'solana/quickstart/javascript',
        'solana/quickstart/dynamic',
        'solana/quickstart/web3auth',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsible: false,
      collapsed: false,
      items: [
        'solana/guides/use-framework-kit',
        'solana/guides/use-wallet-adapter',
        {
          type: 'category',
          label: 'Send transactions',
          collapsible: true,
          collapsed: true,
          items: [
            'solana/guides/send-legacy-transaction',
            'solana/guides/send-versioned-transaction',
          ],
        },
        {
          type: 'category',
          label: 'Sign data',
          collapsible: true,
          collapsed: true,
          items: [
            'solana/guides/sign-data/sign-message',
            'solana/guides/sign-data/siws',
          ],
        },
      ],
    },
    // {
    //   type: 'category',
    //   label: 'Tutorials',
    //   collapsible: false,
    //   collapsed: false,
    //   items: [
    //     {
    //       type: "link",
    //       label: "Integrate SNS with MetaMask Connect",
    //       href: "/tutorials/"
    //     },
    //     {
    //       type: "link",
    //       label: "Integrate Solana Pay with MetaMask Connect",
    //       href: "/tutorials/"
    //     },
    //   ],
    // },
    {
      type: 'category',
      label: 'Reference',
      collapsible: false,
      collapsed: false,
      items: [
        'solana/reference/methods',
      ],
    },
  ],
}

module.exports = metamaskConnectSidebar
