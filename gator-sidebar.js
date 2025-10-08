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
          collapsed: true,
          link: { type: "doc", id: "get-started/smart-account-quickstart/index" },
          items: [
            'get-started/smart-account-quickstart/eip7702',
          ],
        },
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
          collapsed: true,
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
          collapsed: true,
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
          collapsed: true,
          items: [
            'guides/delegation/execute-on-smart-accounts-behalf',
            {
              type: 'category',
              label: 'Use delegation scopes',
              collapsed: true,
              link: { type: "doc", id: "guides/delegation/use-delegation-scopes/index" },
              items: [
                'guides/delegation/use-delegation-scopes/spending-limit',
                'guides/delegation/use-delegation-scopes/function-call',
                'guides/delegation/use-delegation-scopes/ownership-transfer',
                'guides/delegation/use-delegation-scopes/constrain-scope',
              ],
            },
            'guides/delegation/check-delegation-state',
          ],
        },
        {
          type: 'category',
          label: 'ERC-7715',
          collapsed: true,
          items: [
            'guides/erc7715/execute-on-metamask-users-behalf',
            {
              type: 'category',
              label: 'Use permissions',
              collapsed: true,
              items: [
                'guides/erc7715/use-permissions/erc20-token',
                'guides/erc7715/use-permissions/native-token',
              ],
            },
          ],
        },
      ],
    },
    // {
    //   type: 'category',
    //   label: 'Experimental',
    //   collapsed: false,
    //   items: [
    //     'experimental/erc-7715-request-permissions',
    //     'experimental/erc-7710-redeem-delegations',
    //   ],
    // },
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
        {
          type: "link",
          label: "Create a social invite link",
          href: "/tutorials/create-invite-link"
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'reference/smart-account',
        {
          type: 'category',
          label: 'Delegation',
          collapsed: true,
          link: { type: "doc", id: "reference/delegation/index" },
          items: [
            'reference/delegation/delegation-scopes',
            'reference/delegation/caveats',
            'reference/delegation/caveat-enforcer-client',
          ],
        },
        {
          type: 'category',
          label: 'ERC-7715',
          collapsed: true,
          items: [
            'reference/erc7715/permissions',
            'reference/erc7715/wallet-client',
            'reference/erc7715/bundler-client',
          ],
        },
      ],
    },
  ],
}

module.exports = sidebar;
