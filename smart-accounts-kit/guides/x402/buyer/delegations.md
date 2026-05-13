---
description: Access x402-protected API data using delegation.
sidebar_label: Delegations
keywords: [x402, ERC-7710, delegation, smart account, facilitator, buyer, API]
---

import Tabs from '@theme/Tabs'
import TabItem from '@theme/TabItem'
import GlossaryTerm from '@theme/GlossaryTerm'

# Pay for x402 API with delegations

In this guide, you use a buyer <GlossaryTerm term="MetaMask smart account">smart account</GlossaryTerm>
to access API data from an x402 server.

You create an open delegation, restrict redemption to the facilitator, encode the delegation chain,
and send it as the payment payload when calling a protected API route.

## Prerequisites

- [Install and set up the Smart Accounts Kit.](../../../get-started/install.md)
- Fund smart account with USDC for the requested payment.

## Steps

### 1. Create a buyer account

Create an account to represent buyer, the <GlossaryTerm term="Delegator account">delegator</GlossaryTerm> who will create a delegation.

The delegator must be a <GlossaryTerm term="MetaMask smart account" />; use the toolkit's [`toMetaMaskSmartAccount`](../../../reference/smart-account.md#tometamasksmartaccount) method to create the buyer account.

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

### 2. Get payment requirements

Call the protected API route once without a payment header.

The server returns `402` and includes `PAYMENT-REQUIRED`, which gives you the payment terms needed
to create an appropriate payment payload.

<Tabs>
<TabItem value="example.ts">

```ts
import { PaymentRequirements } from './types'

// Update the URL
const challengeResponse = await fetch('https://api.example.com/paid-endpoint')
if (challengeResponse.status !== 402) {
  console.error('Expected 402 challenge from protected route')
  // Handle error
}

const paymentRequiredHeader = challengeResponse.headers.get('PAYMENT-REQUIRED')
if (!paymentRequiredHeader) {
  console.error('PAYMENT-REQUIRED header is missing')
  // Handle error
}

const decodedPaymentRequired = Buffer.from(paymentRequiredHeader, 'base64').toString('utf-8')
const paymentRequired = JSON.parse(decodedPaymentRequired) as {
  accepts: PaymentRequirements[]
}

const accepted = paymentRequired.accepts[0]
if (!accepted) {
  console.error('Server did not provide accepted payment requirements')
  // Handle error
}

if (accepted.extra.assetTransferMethod !== 'erc7710') {
  console.error('Server does not support ERC-7710 delegation payments')
  // Handle error
}
```

</TabItem>
<TabItem value="types.ts">

```ts
export type PaymentRequirements = {
  scheme: string
  network: string
  amount: string
  asset: `0x${string}`
  payTo: `0x${string}`
  maxTimeoutSeconds: number
  extra: {
    assetTransferMethod: string
    facilitators?: `0x${string}`[]
  }
}
```

</TabItem>
</Tabs>

### 3. Create a delegation

Create an [open root delegation](../../../concepts/delegation/overview.md#open-root-delegation)
from the buyer's smart account. With an open root delegation, the buyer delegates authority without
setting a specific delegate. Use [`createOpenDelegation`](../../../reference/delegation/index.md#createopendelegation) to create the open root delegation.

This example uses the [`erc20TransferAmount`](../../../guides/delegation/use-delegation-scopes/spending-limit.md#erc-20-transfer-scope)
scope to allow USDC transfers up to the amount requested in `PAYMENT-REQUIRED`.
It also uses the [`redeemer`](../../../reference/delegation/caveats.md#redeemer) caveat enforcer to restrict
redemption to facilitator addresses provided by the server.

Before creating the delegation, make sure your buyer smart account is deployed. If it is not
deployed, delegation redemption will fail.

```ts
import { CaveatType, createOpenDelegation, ScopeType } from '@metamask/smart-accounts-kit'

const facilitators = accepted.extra.facilitators
if (!facilitators || facilitators.length === 0) {
  console.log('No facilitators found in PAYMENT-REQUIRED')
  // Handle the error
}

// Use the amount requested by the seller.
const maxAmount = BigInt(accepted.amount)

const caveats = [
  {
    type: CaveatType.Redeemer,
    redeemers: facilitators,
  },
]

const delegation = createOpenDelegation({
  from: buyerSmartAccount.address,
  environment: buyerSmartAccount.environment,
  scope: {
    type: ScopeType.Erc20TransferAmount,
    tokenAddress: accepted.asset,
    maxAmount,
  },
  caveats,
})

const signature = await buyerSmartAccount.signDelegation({
  delegation,
})

const signedDelegation = {
  ...delegation,
  signature,
}
```

### 4. Create the payment payload

Create a payment payload using the signed delegation and accepted requirements.
For ERC-7710, x402 requires the payload fields `delegationManager`, `permissionContext`, and `delegator`.
The facilitator uses `permissionContext` to simulate during verification and then settle the payment.

Use `encodeDelegations` to encode the delegation chain. Then base64 encode the full payment payload before sending it in the `payment-signature` header.

<Tabs>
<TabItem value="example.ts">

```ts
import { encodeDelegations } from '@metamask/smart-accounts-kit/utils'
import { PaymentPayload } from './types'

const permissionContext = encodeDelegations([signedDelegation])

const paymentPayload: PaymentPayload = {
  x402Version: 2,
  accepted,
  payload: {
    delegationManager: buyerSmartAccount.environment.DelegationManager,
    permissionContext,
    delegator: buyerSmartAccount.address,
  },
}

const encodedPayment = Buffer.from(JSON.stringify(paymentPayload)).toString('base64')
```

</TabItem>
<TabItem value="types.ts">

```ts
export type PaymentPayload = {
  x402Version: 2
  accepted: PaymentRequirements
  payload: {
    delegationManager: `0x${string}`
    permissionContext: `0x${string}`
    delegator: `0x${string}`
  }
}
```

</TabItem>
</Tabs>

### 5. Make paid request

Send the encoded payment payload in the `payment-signature` header. If verification succeeds, the server returns the protected data.

```ts
const apiResponse = await fetch('https://api.example.com/paid-endpoint', {
  headers: {
    'payment-signature': encodedPayment,
  },
})

if (!apiResponse.ok) {
  const errorBody = await apiResponse.json()
  throw new Error(errorBody.error ?? 'API request failed')
}

const data = await apiResponse.json()
console.log('Protected API response:', data)
```
