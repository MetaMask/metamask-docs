// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebar = {
  sdkSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      collapsible: false,
      collapsed: false,
      link: {
        type: "doc",
        id: "index"
      },
      items: [
        'introduction/supported-platforms',
        'introduction/supported-networks',
        'introduction/llm-prompt',
      ],
    },
    {
      type: 'category',
      label: 'Connect to MetaMask',
      collapsible: false,
      collapsed: false,
      items: [
        'connect/javascript-wagmi',
        'connect/javascript',
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
        {
          type: 'category',
          label: 'Advanced',
          collapsible: true,
          collapsed: true,
          items: [
            'guides/advanced/connect-and-sign',
            'guides/advanced/batch-requests',
            'guides/advanced/production-readiness',
          ],
        },
      ],
    },
    {
      type:'category',
      label: 'Tutorials',
      collapsible: false,
      collapsed: false,
      items: ['tutorials/create-wallet-ai-agent'],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsible: false,
      collapsed: false,
      items: ['reference/sdk-options'],
    },
  ],
}

module.exports = sidebar
