---
description: Set up recurring x402 API payments using Advanced Permissions.
sidebar_label: Recurring payments
keywords:
  [
    x402,
    ERC-7715,
    ERC-7710,
    advanced permissions,
    recurring payments,
    periodic permission,
    session account,
    buyer,
  ]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GlossaryTerm from '@theme/GlossaryTerm';

# Recurring x402 payments

In this guide, you set up recurring x402 payments by requesting an ERC-20 periodic
<GlossaryTerm term="Advanced Permissions" /> permission from a user.

For example, a user gives your agent permission to spend up to 10 USDC per week.
Later, when the agent needs access to an x402 endpoint, it checks the price, uses the permission the user
already gave it, and pays.

## Prerequisites

- [Install and set up the Smart Accounts Kit.](../../../get-started/install.md)

## Steps

### 1. Set up a Wallet Client

Set up a Wallet Client using Viem's [`createWalletClient`](https://viem.sh/docs/clients/wallet) function.
This client will help you interact with MetaMask.

Then, extend the Wallet Client functionality using `erc7715ProviderActions`.
These actions enable you to request <GlossaryTerm term="Advanced Permissions" /> from the user.

```typescript
import { createWalletClient, custom } from 'viem'
import { erc7715ProviderActions } from '@metamask/smart-accounts-kit/actions'

const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions())
```

### 2. Set up an agent account

Set up an agent account. The requested permissions are granted to this account, which allows the agent
to make x402 API calls on behalf of the user.

The agent account can be either a smart account or an EOA. This example uses an EOA as an agent account.

```typescript
import { privateKeyToAccount } from 'viem/accounts'

const sessionAccount = privateKeyToAccount('0x...')
```

### 3. Request Advanced Permissions

Request Advanced Permissions from the user with the Wallet Client's `requestExecutionPermissions` action.

In this example, you request an [ERC-20 periodic permission](../../advanced-permissions/use-permissions/erc20-token.md#erc-20-periodic-permission) with a weekly allowance of 10 USDC. This creates
a recurring payment budget that your agent can store and reuse for making an x402 API call.

See the [`requestExecutionPermissions`](../../../reference/advanced-permissions/wallet-client.md#requestexecutionpermissions) API reference for more information.

```ts
import { base as chain } from 'viem/chains'
import { parseUnits } from 'viem'

// USDC address on Base.
const tokenAddress = '0x...'

const currentTime = Math.floor(Date.now() / 1000)
const expiry = currentTime + 60 * 60 * 24 * 30 // Permission expires in 30 days.

const grantedPermissions = await walletClient.requestExecutionPermissions([
  {
    chainId: chain.id,
    expiry,
    to: sessionAccount.address,
    permission: {
      type: 'erc20-token-periodic',
      data: {
        tokenAddress: accepted.asset,
        periodAmount: parseUnits('10', 6),
        periodDuration: 604800,
        startTime: currentTime,
        justification:
          'Permission for agent to spend up to 10 USDC every week for making x402 API calls',
      },
      isAdjustmentAllowed: false,
    },
  },
])
```

### 4. Get payment requirements

Once your agent has been granted permission, when it wants to access an x402-protected endpoint, it
calls the endpoint without a payment header to request payment terms.

The server returns `402` with the payment terms (`PAYMENT-REQUIRED`) in the response, which agent can use to
build the payment payload.

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

if (accepted.asset.toLowerCase() !== tokenAddress.toLowerCase()) {
  console.error('Requested payment asset does not match recurring payment token')
  // Handle error
}
```

### 5. Create a redelegation

The granted advanced permission is delegated to the agent account.
For each protected API call, create a redelegation from the agent account so facilitator addresses
can redeem the permission context for x402 settlement.

This example uses the [`erc20TransferAmount`](../../../guides/delegation/use-delegation-scopes/spending-limit.md#erc-20-transfer-scope)
scope while creating redelegation to allow USDC transfers up to the amount requested in payment terms. It also uses
the [`redeemer`](../../../reference/delegation/caveats.md#redeemer) enforcer to restrict
redemption to facilitator addresses provided by the server.

Use the Wallet Client's [`redelegatePermissionContext`](../../../reference/erc7710/wallet-client.md#redelegatepermissioncontextopen) action to create a redelegated permission
context.

<Tabs>
<TabItem value="example.ts">

```ts
import { environment, sessionAccountWalletClient } from './config.ts'
import { ScopeType, CaveatType } from '@metamask/smart-accounts-kit'

const permission = grantedPermissions[0]
if (!permission) {
  console.error('No permission response returned by requestExecutionPermissions')
  // Handle error
}

const facilitators = accepted.extra.facilitators
if (!facilitators || facilitators.length === 0) {
  console.error('No facilitators found in payment terms')
  // Handle error
}

const { permissionContext: redelegatedPermissionContext } =
  await sessionAccountWalletClient.redelegatePermissionContext({
    environment,
    permissionContext: permission.context,
    scope: {
      type: ScopeType.Erc20TransferAmount,
      tokenAddress: accepted.asset,
      maxAmount: BigInt(accepted.amount),
    },
    caveats: [
      {
        type: CaveatType.Redeemer,
        redeemers: facilitators,
      },
    ],
  })
```

</TabItem>
<TabItem value="config.ts">

```ts
import { createWalletClient, http } from 'viem'
import { base as chain } from 'viem/chains'
import { getSmartAccountsEnvironment } from '@metamask/smart-accounts-kit'
import { erc7710WalletActions } from '@metamask/smart-accounts-kit/actions'

export const environment = getSmartAccountsEnvironment(chain.id)

// Use sessionAccount from previous step
export const sessionAccountWalletClient = createWalletClient({
  account: sessionAccount,
  chain,
  transport: http(),
}).extend(erc7710WalletActions())
```

</TabItem>
</Tabs>

### 6. Make the payment payload

For each protected API call, create a payment payload with the redelegated permission context.

For ERC-7710 (Smart Contract Delegation), x402 requires the payload fields `delegationManager`,
`permissionContext`, and `delegator`. The facilitator uses `permissionContext` to simulate
during verification and then settle the payment.

Encode the full payment payload as base64, then send it in the payment signature header.

```ts
import { PaymentPayload } from './types'

const permission = grantedPermissions[0]

const paymentPayload: PaymentPayload = {
  x402Version: 2,
  accepted,
  payload: {
    delegationManager: permission.delegationManager,
    permissionContext: redelegatedPermissionContext,
    delegator: permission.from,
  },
}

const encodedPayment = Buffer.from(JSON.stringify(paymentPayload)).toString('base64')
```

### 7. Make the paid request

Send the base64 encoded payload in the payment signature header.

```ts
const apiResponse = await fetch('https://api.example.com/paid-endpoint', {
  headers: {
    'payment-signature': encodedPayment,
  },
})

if (!apiResponse.ok) {
  const errorBody = await apiResponse.json()
  console.error(errorBody.error ?? 'API request failed')
  // Handle error
}

const data = await apiResponse.json()
console.log('Protected API response:', data)
```

Reuse the same weekly granted permission for additional protected routes and providers in your agent flow.
Your agent can continue paying until the weekly cap is reached, then continue after the next weekly
period starts.
