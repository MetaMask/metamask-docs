---
description: Use x402 and ERC-7710 delegations to enable programmatic payments from MetaMask smart accounts.
sidebar_label: Overview
keywords: [x402, HTTP 402, ERC-7710, delegation, facilitator, payments, smart account]
---

import GlossaryTerm from '@theme/GlossaryTerm'
import CardList from '@site/src/components/CardList'

# x402 Payments

[x402](https://www.x402.org/) is an open payment protocol that uses the HTTP `402` status code to enable programmatic, machine-to-machine payments over HTTP. It allows servers to charge for API access without requiring buyer accounts, API keys, or traditional payment infrastructure.

For example, an AI agent can pay 0.01 USDC per request to access a weather API, or a
dapp can charge users a micropayment to retrieve premium onchain analytics data.

## ERC-7710 payments

The standard x402 protocol supports direct token transfers (using ERC-20 Permit2 or EIP-3009).
[ERC-7710](https://eips.ethereum.org/EIPS/eip-7710) extends this by enabling <GlossaryTerm term="Delegation">delegation</GlossaryTerm>-based
payments from <GlossaryTerm term="MetaMask smart account">MetaMask smart accounts</GlossaryTerm>.

With ERC-7710, a buyer's smart account creates a delegation that authorizes the facilitator
to transfer tokens on their behalf. The buyer doesn't sign a direct token approval.
Instead, they sign a delegation that the facilitator redeems during settlement.

This approach enables buyers to pay from MetaMask wallet.
Buyers can restrict delegations to specific facilitator addresses, amounts, and time windows
using <GlossaryTerm term="Delegation scope">delegation scopes</GlossaryTerm>.
They can also create long lived delegations that allow recurring payments without re-signing
for each request.

Learn more [ERC-7710 delegations](../../concepts/delegation/overview.md).

## Guides

Get started with x402 payments using MetaMask Smart Accounts Kit.
These guides walk you through creating delegations, requesting permissions, and setting up recurring payments.

<CardList
items={[
{
href: '/smart-accounts-kit/development/guides/x402/buyer/delegations',
title: 'Pay using a delegation',
description: 'Create an ERC-7710 delegation and use it as the x402 payment payload.',
},
{
href: '/smart-accounts-kit/development/guides/x402/buyer/advanced-permissions',
title: 'Pay using Advanced Permissions',
description:
'Request ERC-7715 Advanced Permissions for x402 payments with a fixed allowance.',
},
{
href: '/smart-accounts-kit/development/guides/x402/buyer/recurring-payments',
title: 'Set up recurring payments',
description:
'Grant a periodic budget permission for recurring x402 payments.',
},
]}
/>
