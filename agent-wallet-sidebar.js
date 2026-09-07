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
      label: 'CLI setup',
      id: 'cli-setup',
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
        'guides/earn-yield-vaults',
        'guides/pay-for-apis-x402',
        'guides/check-balances-and-prices',
        'guides/sign-messages-and-transactions',
      ],
    },
    {
      type: 'category',
      label: 'Plugins',
      collapsed: false,
      items: ['plugins/index', 'plugins/install-a-plugin', 'plugins/build-a-plugin'],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'reference/architecture',
        'reference/trading-modes',
        'reference/outflow-policy',
        'reference/commands',
        'reference/plugins',
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
