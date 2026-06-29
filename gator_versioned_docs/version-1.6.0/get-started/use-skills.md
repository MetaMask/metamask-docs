---
sidebar_label: Use skills
description: Use MetaMask Smart Accounts Kit skills with agent frameworks to build dapps
toc_max_heading_level: 2
keywords:
  [skill, delegation, smart accounts, ai, metamask smart accounts kit, agent framework, x402]
---

import GlossaryTerm from '@theme/GlossaryTerm';

# Use skills

Use skills to give your agent framework context on the MetaMask Smart Accounts Kit.
Skills guide your agent through <GlossaryTerm term="MetaMask smart account">smart account</GlossaryTerm> creation, <GlossaryTerm term="Delegation">delegations</GlossaryTerm>, <GlossaryTerm term="Advanced Permissions" /> (ERC-7715), and [x402](../guides/x402/overview.md)
payments.

Skills are available through the open-source [`MetaMask/skills`](https://github.com/MetaMask/skills)
repository.

## Smart Accounts Kit

This skill gives your agent context on the Smart Accounts Kit and how to integrate its
capabilities into your dapp, including smart account creation, delegations, and Advanced
Permissions.

```bash
npx skills add MetaMask/smart-accounts-kit
```

### Key capabilities

| Capability           | Description                                                                                                                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Smart accounts       | Integrate MetaMask Smart Accounts to support batch transactions, <GlossaryTerm term="Multisig smart account">multi-sig signatures</GlossaryTerm>, and <GlossaryTerm term="Paymaster">gas sponsorship</GlossaryTerm>. |
| Delegation           | Integrate delegations to execute transactions on behalf of a smart account.                                                                                                                                          |
| Advanced Permissions | Integrate Advanced Permissions to execute transactions on behalf of a MetaMask user.                                                                                                                                 |

## x402 Payments

This skill helps your agent implement [x402 HTTP-based payments](../guides/x402/overview.md) using
the Smart Accounts Kit, enabling both buyer and seller flows with delegations and Advanced
Permissions.

```bash
npx skills add MetaMask/skills/domains/web3-tools/skills/x402-payments
```

### Key capabilities

| Capability | Description                                                                 |
| ---------- | --------------------------------------------------------------------------- |
| Seller     | Set up x402 payment endpoints that accept HTTP 402-based payments.          |
| Buyer      | Pay for x402-protected resources using delegations or Advanced Permissions. |

## Next steps

- [Install the Smart Accounts Kit](./install.md)
- [Create your first smart account](./smart-account-quickstart/index.md)
- [Learn about x402 payments](../guides/x402/overview.md)
