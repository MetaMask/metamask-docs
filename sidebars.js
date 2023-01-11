// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  apiSidebar: [
    'api-sdk/index',
    {
      type: 'category',
      label: 'Get started',
      link: { type: 'generated-index' },
      collapsed: false,
      items: [
        'api-sdk/get-started/set-up-dev-environment',
        'api-sdk/get-started/run-test-network',
        'api-sdk/get-started/detect-metamask',
        'api-sdk/get-started/access-account',
        'api-sdk/get-started/log-in-users'
      ]
    },
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
        },
        'api-sdk/how-to/use-metamask-mobile',
        'api-sdk/how-to/interact-with-smart-contracts',
        'api-sdk/how-to/send-transactions',
        'api-sdk/how-to/sign-data',
        'api-sdk/how-to/register-token',
        'api-sdk/how-to/register-method-names',
        'api-sdk/how-to/access-provider',
        'api-sdk/how-to/use-onboarding-library',
        'api-sdk/how-to/set-icon',
        'api-sdk/how-to/migrate-api'
      ]
    },
    {
      type: 'category',
      label: 'Reference',
      link: { type: 'generated-index' },
      items: [
        'api-sdk/reference/provider-api',
        'api-sdk/reference/rpc-api',
        'api-sdk/reference/sdk-js-options'
      ]
    },
    {
      type: 'category',
      label: 'Concepts',
      link: { type: 'generated-index' },
      items: [
        'api-sdk/concepts/sdk',
        'api-sdk/concepts/signing-methods',
        'api-sdk/concepts/onboarding-library'
      ]
    },
    {
      type: 'category',
      label: 'Tutorials',
      link: { type: 'generated-index' },
      items: [
        'api-sdk/tutorials/create-simple-dapp',
        'api-sdk/tutorials/create-simple-dapp-with-sdk'
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
