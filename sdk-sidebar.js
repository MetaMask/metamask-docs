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
      label: 'Install SDK',
      collapsible: false,  
      collapsed: false,
      items: [
        'install-sdk/javascript-+-wagmi',
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
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      collapsible: false,  
      collapsed: false,
      items: [
        'api-reference/sdk-api',
        {
          type: 'link',
          label: 'Provider API',
          href: '/wallet/reference/provider-api',
        },
        {
          type: 'link',
          label: 'JSON-RPC API',
          href: '/wallet/reference/json-rpc-methods',
        },
      ],
    }
  ],
};

module.exports = sidebar;
