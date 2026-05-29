---
description: Pay for x402-protected API access using delegation.
sidebar_label: Delegations
keywords: [x402, ERC-7710, delegation, smart account, facilitator, buyer, API]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GlossaryTerm from '@theme/GlossaryTerm';

# Pay for an x402 API with delegation

In this guide, you use a buyer account to access API data from an x402 server by creating
a <GlossaryTerm term="Delegation">delegation</GlossaryTerm> that authorizes token transfers
on your behalf.

You use [`createx402DelegationProvider`](../../../reference/x402.md#createx402delegationprovider)
to set up an `x402Erc7710Client` with a delegation provider, register it with the x402 client,
and use `wrapFetchWithPayment` to automatically handle payment when calling a protected API route.

## Prerequisites

- [Install and set up the Smart Accounts Kit.](../../../get-started/install.md)

## Steps

### 1. Install the dependencies

```bash npm2yarn
npm install @x402/core @x402/fetch @metamask/x402
```

### 2. Create a buyer account

Create an account to represent the buyer, the
<GlossaryTerm term="Delegator account">delegator</GlossaryTerm> who creates a delegation.

The delegator must be a <GlossaryTerm term="MetaMask smart account" />.
Use the toolkit's
[`toMetaMaskSmartAccount`](../../../reference/smart-account.md#tometamasksmartaccount) method to
create the buyer account.

:::note Important
Fund the smart account with USDC for the requested payment.
:::

<Tabs>
<TabItem value="example.ts">

```ts
import { Implementation, toMetaMaskSmartAccount } from '@metamask/smart-accounts-kit'
import { publicClient, buyerAccount } from './config'

export const buyerSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [buyerAccount.address, [], [], []],
  deploySalt: '0x',
  signer: { account: buyerAccount },
})
```

</TabItem>
<TabItem value="config.ts">

```ts
import { createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { base as chain } from 'viem/chains'

export const publicClient = createPublicClient({
  chain,
  transport: http(),
})

export const buyerAccount = privateKeyToAccount('0x<BUYER_PRIVATE_KEY>')
```

</TabItem>
</Tabs>

### 3. Create an x402 ERC-7710 client

Create an `x402Erc7710Client` using
[`createx402DelegationProvider`](../../../reference/x402.md#createx402delegationprovider).
The provider creates an <GlossaryTerm term="Open delegation">open</GlossaryTerm>
<GlossaryTerm term="Root delegation">root delegation</GlossaryTerm>, signs it, and returns an ABI-encoded delegation chain
when the x402 client needs to pay for a request.

The provider appends [`redeemer`](../../../reference/delegation/caveats.md#redeemer),
[`allowedTargets`](../../../reference/delegation/caveats.md#allowedtargets), and
[`timestamp`](../../../reference/delegation/caveats.md#timestamp)
<GlossaryTerm term="Caveat">caveats</GlossaryTerm> if not already present.

```ts
import { createx402DelegationProvider } from '@metamask/smart-accounts-kit/experimental'
import { x402Erc7710Client } from '@metamask/x402'

const erc7710Client = new x402Erc7710Client({
  delegationProvider: createx402DelegationProvider({
    account: buyerSmartAccount,
  }),
})
```

### 4. Register the client

Register the ERC-7710 client with the x402 core client for all EVM networks.
Create an HTTP client and a payment-aware `fetch` function using `wrapFetchWithPayment`.

```ts
import { x402Client, x402HTTPClient } from '@x402/core/client'
import { wrapFetchWithPayment } from '@x402/fetch'

const coreClient = new x402Client().register('eip155:*', erc7710Client)
const httpClient = new x402HTTPClient(coreClient)

const fetchWithPayment = wrapFetchWithPayment(fetch, httpClient)
```

### 5. Make the paid request

Call the protected endpoint using `fetchWithPayment`.
It handles the x402 payment flow, calling your delegation provider
to create an <GlossaryTerm term="Open delegation">open delegation</GlossaryTerm> when the server returns a `402` response.

```ts
const paidResponse = await fetchWithPayment('https://api.example.com/paid-endpoint', {
  method: 'GET',
})
```
