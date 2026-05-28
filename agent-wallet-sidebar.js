// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebar = {
  agentWalletSidebar: [
    {
      type: 'doc',
      label: 'Introduction',
      id: 'index',
    },
    {
      type: 'category',
      label: 'Get started',
      collapsed: false,
      items: ['get-started/install', 'get-started/quickstart', 'get-started/choose-wallet-mode'],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/send-tokens',
        'guides/swap-and-bridge',
        'guides/trade-perpetuals',
        'guides/trade-prediction-markets',
        'guides/check-balances-and-prices',
        'guides/sign-messages-and-transactions',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      collapsed: true,
      items: ['concepts/architecture', 'concepts/security', 'concepts/skills-for-agents'],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: true,
      items: ['reference/commands', 'reference/error-codes', 'reference/supported-chains'],
    },
    {
      type: 'doc',
      id: 'troubleshooting',
      label: 'Troubleshooting',
    },
  ],
}

module.exports = sidebar
