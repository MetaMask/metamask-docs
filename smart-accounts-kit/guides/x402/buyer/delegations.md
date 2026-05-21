---
description: Pay for an x402-protected API data using delegation.
sidebar_label: Delegations
keywords: [x402, ERC-7710, delegation, smart account, facilitator, buyer, API]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GlossaryTerm from '@theme/GlossaryTerm';

# Pay for an x402 API with delegation

In this guide, you use a buyer account to access API data from an x402 server by creating
an <GlossaryTerm term="Open root delegation">open delegation</GlossaryTerm> that authorizes
token transfers on your behalf.

You set up an `x402Erc7710Client` with a delegation provider, register it with the x402 client,
and use `wrapFetchWithPayment` to automatically handle payment when calling a protected API route.

## Prerequisites

- [Install and set up the Smart Accounts Kit.](../../../get-started/install.md)

## Steps

### 1. Install the dependencies

```bash npm2yarn
npm install @x402/core @x402/fetch @metamask/x402
```

### 2. Create a buyer account

Create an account to represent the buyer, the <GlossaryTerm term="Delegator account">delegator</GlossaryTerm> who will create a delegation.

The delegator must be a <GlossaryTerm term="MetaMask smart account" />; use the toolkit's [`toMetaMaskSmartAccount`](../../../reference/smart-account.md#tometamasksmartaccount) method to create the buyer account.

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

Create an `x402Erc7710Client` with a `delegationProvider` callback.
The x402 client calls this function automatically when it needs to pay for a request, passing
in the payment requirements from the server.

Inside the provider, create an [open delegation](../../../concepts/delegation/overview.md#open-root-delegation)
using [`createOpenDelegation`](../../../reference/delegation/index.md#createopendelegation).
This example uses the [`erc20TransferAmount`](../../../guides/delegation/use-delegation-scopes/spending-limit.md#erc-20-transfer-scope)
scope to allow USDC transfers up to the requested amount, and the
[`timestamp`](../../../reference/delegation/caveats.md#timestamp) caveat to set a short expiry.

For ERC-7710, x402 requires the payload fields `delegationManager`, `permissionContext`, and `delegator`.
Use [`encodeDelegations`](../../../reference/delegation/index.md#encodedelegations) to encode the delegation chain.

```ts
import { CaveatType, createOpenDelegation, ScopeType } from '@metamask/smart-accounts-kit'
import { encodeDelegations } from '@metamask/smart-accounts-kit/utils'
import { x402Erc7710Client } from '@metamask/x402'
import { getAddress } from 'viem'

const erc7710Client = new x402Erc7710Client({
  delegationProvider: async requirements => {
    // Expires in 1 minute.
    const expiry = Math.floor(Date.now() / 1000) + 60

    const delegation = createOpenDelegation({
      environment: buyerSmartAccount.environment,
      from: buyerSmartAccount.address,
      scope: {
        type: ScopeType.Erc20TransferAmount,
        tokenAddress: getAddress(requirements.asset),
        maxAmount: BigInt(requirements.amount),
      },
      caveats: [
        {
          type: CaveatType.Timestamp,
          afterThreshold: 0,
          beforeThreshold: expiry,
        },
      ],
    })

    const signature = await buyerSmartAccount.signDelegation({
      delegation,
    })

    const signedDelegation = {
      ...delegation,
      signature,
    }

    return {
      delegationManager: buyerSmartAccount.environment.DelegationManager,
      permissionContext: encodeDelegations([signedDelegation]),
      delegator: buyerSmartAccount.address,
    }
  },
})
```

### 4. Register the client

Register the ERC-7710 client from the previous step with the x402 core client for all the EVM networks,
then create an HTTP client and a payment-aware `fetch` function using `wrapFetchWithPayment`.

```ts
import { x402Client, x402HTTPClient } from '@x402/core/client'
import { wrapFetchWithPayment } from '@x402/fetch'

const coreClient = new x402Client().register('eip155:*', erc7710Client)
const httpClient = new x402HTTPClient(coreClient)

const fetchWithPayment = wrapFetchWithPayment(fetch, httpClient)
```

### 5. Make the paid request

Call the protected endpoint using `fetchWithPayment`.

```ts
const paidResponse = await fetchWithPayment('https://api.example.com/paid-endpoint', {
  method: 'GET',
})
```
