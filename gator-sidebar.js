// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebar = {
  gatorSidebar: [
    {
      type: 'doc',
      label: 'Introduction',
      id: "index",
    },
    {
      type: 'category',
      label: 'Get started',
      collapsed: false,
      items: [
        'get-started/install',
        {
          type: 'category',
          label: 'Smart account quickstart',
          collapsed: false,
          link: { type: "doc", id: "get-started/smart-account-quickstart/index" },
          items: [
            'get-started/smart-account-quickstart/eip7702',
          ],
        },
        'get-started/erc7715-quickstart',
        'get-started/use-the-cli',
        'get-started/supported-networks',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      collapsed: false,
      items: [
        'concepts/smart-accounts',
        {
          type: 'category',
          label: 'Delegation',
          collapsed: false,
          link: { type: "doc", id: "concepts/delegation/index" },
          items: [
            'concepts/delegation/caveat-enforcers',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      collapsed: false,
      items: [
        'guides/configure-toolkit',
        {
          type: 'category',
          label: 'MetaMask Smart Accounts',
          collapsed: false,
          items: [
            'guides/smart-accounts/create-smart-account',
            'guides/smart-accounts/deploy-smart-account',
            'guides/smart-accounts/send-user-operation',
            'guides/smart-accounts/send-gasless-transaction',
            'guides/smart-accounts/generate-multisig-signature',
          ],
        },
        {
          type: 'category',
          label: 'Delegation',
          collapsed: false,
          items: [
            'guides/delegation/execute-on-smart-accounts-behalf',
            'guides/delegation/restrict-delegation',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Experimental',
      collapsed: false,
      items: [
        'experimental/erc-7715-request-permissions',
        'experimental/erc-7710-redeem-delegations',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      collapsed: false,
      items: [
        {
          type: "link",
          label: "Use an ERC-20 paymaster",
          href: "/tutorials/use-erc20-paymaster"
        },
        {
          type: "link",
          label: "Use a passkey as a backup signer",
          href: "/tutorials/use-passkey-as-backup-signer"
        },
        {
          type: "link",
          label: "Create a custom caveat enforcer",
          href: "/tutorials/create-custom-caveat-enforcer"
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'reference/caveats',
        {
          type: 'category',
          label: 'Delegation Toolkit API',
          collapsed: false,
          items: [
            'reference/api/delegation',
            'reference/api/smart-account',
            {
              type: 'category',
              label: 'Experimental actions',
              collapsed: false,
              items: [
                'reference/api/experimental-actions/bundler-client',
                'reference/api/experimental-actions/wallet-client',
              ],
            },
          ],
        },
      ],
    },
  ],
}

module.exports = sidebar;
