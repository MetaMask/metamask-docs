// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebar = {
  sdkSidebar: [
    {
      type: 'doc',
      label: 'Introduction',
      id: "index",
    },
    {
      type: 'category',
      label: 'Connect to MetaMask',
      collapsible: false,
      collapsed: false,
      items: [
        'connect/javascript-wagmi',
        'connect/javascript',
        'connect/javascript-rainbowkit',
        'connect/javascript-connectkit',
        'connect/javascript-dynamic',
        'connect/javascript-web3auth',
        'connect/react-native',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsible: false,
      collapsed: false,
      items: [
        'guides/authenticate-users',
        'guides/manage-networks',
        'guides/handle-transactions',
        'guides/interact-with-contracts',
        'guides/use-deeplinks',
        'guides/batch-requests',
        'guides/production-readiness',
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
        'reference/llm-prompt',
        'reference/supported-platforms',
        'reference/sdk-options',
        'reference/sdk-methods',
      ],
    },
  ],
}

module.exports = sidebar
