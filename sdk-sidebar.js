// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebar = {
  sdkSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      collapsible: false,
      collapsed: false,
      items: [
        'introduction/welcome',
        'introduction/supported-platforms',
        'introduction/supported-networks',
        'introduction/llm-prompt',
        {
          type: 'link',
          label: 'Try demo dapp',
          href: 'https://metamask-sdk-examples.vercel.app/',
        },
      ],
    },
    {
      type: 'category',
      label: 'Quickstart',
      collapsible: false,
      collapsed: false,
      items: [
        'quickstart/javascript-wagmi',
        'quickstart/javascript',
        'quickstart/javascript-dynamic',
        'quickstart/javascript-web3auth',
        'quickstart/react-native',
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
