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
        {
          type: 'category',
          label: 'Use Scaffold-ETH 2',
          collapsed: true,
          items: [
            'get-started/use-scaffold-eth/smart-accounts',
            'get-started/use-scaffold-eth/advanced-permissions',
          ],
        },
        {
          type: "link",
          label: "LLM context",
          href: "https://docs.metamask.io/llms-smart-accounts-kit-full.txt"
        },
        'get-started/supported-networks',
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
            {
              type: 'category',
              label: 'Configure signers',
              link: { type: "doc", id: "guides/smart-accounts/signers/index" },
              collapsed: true,
              items: [
                'guides/smart-accounts/signers/dynamic',
                'guides/smart-accounts/signers/embedded-wallets',
                'guides/smart-accounts/signers/eoa-wallets',
                'guides/smart-accounts/signers/passkey',
                'guides/smart-accounts/signers/privy',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Delegation',
          collapsed: true,
          key: 'delegation-guides',
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
            'guides/delegation/create-redelegation',
            'guides/delegation/check-delegation-state',
            'guides/delegation/disable-delegation',
          ],
        },
        {
          type: 'category',
          label: 'Advanced Permissions (ERC-7715)',
          collapsed: true,
          key: 'advanced-permissions-guides',
          items: [
            'guides/advanced-permissions/execute-on-metamask-users-behalf',
            {
              type: 'category',
              label: 'Use permissions',
              collapsed: true,
              items: [
                'guides/advanced-permissions/use-permissions/erc20-token',
                'guides/advanced-permissions/use-permissions/native-token',
              ],
            },
            'guides/advanced-permissions/create-redelegation',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      collapsed: true,
      items: [
        'concepts/smart-accounts',
        {
          type: 'category',
          label: 'Delegation',
          collapsed: true,
          key: 'delegation-concepts',
          link: { type: "doc", id: "concepts/delegation/index" },
          items: [
            'concepts/delegation/caveat-enforcers',
          ],
        },
        'concepts/advanced-permissions',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      collapsed: true,
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
      collapsed: true,
      items: [
        'reference/smart-account',
        {
          type: 'category',
          label: 'Delegation',
          collapsed: true,
          link: { type: "doc", id: "reference/delegation/index" },
          key: 'delegation-reference',
          items: [
            'reference/delegation/delegation-scopes',
            'reference/delegation/caveats',
            'reference/delegation/caveat-enforcer-client',
          ],
        },
        {
          type: 'category',
          label: 'Advanced Permissions (ERC-7715)',
          collapsed: true,
          key: 'advanced-permissions-reference',
          items: [
            'reference/advanced-permissions/permissions',
            'reference/advanced-permissions/wallet-client',
          ],
        },
        {
          type: 'category',
          label: 'ERC-7710',
          collapsed: true,
          key: 'erc-7710-reference',
          items: [
            'reference/erc7710/bundler-client',
            'reference/erc7710/wallet-client',
          ],
        },
      ],
    },
  ],
}

module.exports = sidebar;
