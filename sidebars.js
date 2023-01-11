// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  apiSidebar: [
    'api-sdk/index',
    {
      type: 'category',
      label: 'How to',
      link: { type: 'generated-index' },
      items: [
        {
          type: 'category',
          label: 'Use MetaMask SDK',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'api-sdk/how-to/use-sdk/index'
          },
          items: [
            'api-sdk/how-to/use-sdk/react-native',
            'api-sdk/how-to/use-sdk/pure-js'
          ]
        }
      ]
    }
  ],
  snapsSidebar: [
    'snaps/index',
    {
      type: 'category',
      label: 'How to',
      link: { type: 'generated-index' },
      items: [
        "snaps/how-to/guide",
        "snaps/how-to/patching-dependencies",
      ]
    },
    {
      type: "category",
      label: "Reference",
      link: { type: "generated-index" },
      items: [
        "snaps/reference/rpc-api",
        "snaps/reference/permissions",
        "snaps/reference/exports"
      ]
    }
  ]
};

module.exports = sidebars;
