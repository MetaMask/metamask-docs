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
      label: 'Install SDK via Wagmi',
      collapsible: false,  
      collapsed: false,
      items: [
        'install-sdk-via-wagmi/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Install SDK',
      collapsible: false,  
      collapsed: false,
      items: [
        'install-sdk/javascript',
        'install-sdk/react-native',
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
          label: 'Advanced Patterns',
          collapsible: true,  
          collapsed: true,
          items: [
            'guides/advanced-patterns/read-from-contracts',
            'guides/advanced-patterns/write-to-contracts',
            'guides/advanced-patterns/batch-requests',
            'guides/advanced-patterns/gas-estimation',
            'guides/advanced-patterns/using-custom-networks',
            'guides/advanced-patterns/testing',
          ],
        }
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsible: false,  
      collapsed: false,
      items: [
        'api-reference/sdk-api',
        'api-reference/json-rpc-methods',
        'api-reference/provider-api',
        'api-reference/wallet-api',
      ],
    }
  ],
};

module.exports = sidebar;
