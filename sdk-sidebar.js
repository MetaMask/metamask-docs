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
          label: 'Try Demo App',
          href: 'https://example.com',
        },
      ],
    },
    {
      type: 'category',
      label: 'Quick Start',
      collapsible: false,  
      collapsed: false,
      items: [
        'quick-start/javascript-+-wagmi',
        'quick-start/javascript',
        'quick-start/react-native',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsible: false,  
      collapsed: false,
      items: [
        'guides/user-authentication',
        'guides/network-management',
        'guides/transaction-handling',
        'guides/interact-with-contracts',
        {
          type: 'category',
          label: 'Advanced',
          collapsible: true,  
          collapsed: true,
          items: [
            'guides/advanced/connect-and-sign',
            'guides/advanced/batch-requests',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsible: false,  
      collapsed: false,
      items: [
        'api-reference/sdk-api'
      ],
    }
  ],
};

module.exports = sidebar;
