// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebar = {
  agentWalletSidebar: [
    {
      type: 'doc',
      label: 'Overview',
      id: 'README',
    },
    {
      type: 'doc',
      label: 'Quickstart',
      id: 'quickstart',
    },
    {
      type: 'doc',
      label: 'Use the CLI directly',
      id: 'use-the-cli-directly',
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
      label: 'Reference',
      collapsed: true,
      items: [
        'reference/architecture',
        'reference/commands',
        'reference/error-codes',
        'reference/supported-chains',
      ],
    },
    {
      type: 'doc',
      id: 'troubleshooting',
      label: 'Troubleshooting',
    },
  ],
}

module.exports = sidebar
