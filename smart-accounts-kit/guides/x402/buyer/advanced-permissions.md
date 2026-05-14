---
description: Pay for an x402-protected API data using Advanced Permissions with a fixed allowance.
sidebar_label: Advanced Permissions
keywords:
  [x402, ERC-7715, ERC-7710, advanced permissions, redeemers, allowance, session account, buyer]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import GlossaryTerm from '@theme/GlossaryTerm';

# Pay for an x402 API with Advanced Permissions

In this guide, you request <GlossaryTerm term="Advanced Permissions" /> with a fixed ERC-20 allowance
to pay for a specific x402-protected resource.

## Prerequisites

- [Install and set up the Smart Accounts Kit.](../../../get-started/install.md)

## Steps

### 1. Set up a Wallet Client

Set up a Wallet Client using Viem's [`createWalletClient`](https://viem.sh/docs/clients/wallet) function. Use this client to interact with MetaMask.

Extend the Wallet Client with `erc7715ProviderActions` to enable <GlossaryTerm term="Advanced Permissions" /> requests.

```typescript
import { createWalletClient, custom } from 'viem'
import { erc7715ProviderActions } from '@metamask/smart-accounts-kit/actions'

const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions())
```

### 2. Set up a session account

Set up a session account. The requested permissions are granted to the session account, which is responsible for making x402 API calls.

The session account can be either a <GlossaryTerm term="MetaMask smart account">smart account</GlossaryTerm> or an <GlossaryTerm term="Externally owned account (EOA)">EOA</GlossaryTerm>.
This example uses an EOA as the session account.

```typescript
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia as chain } from 'viem/chains'
import { createWalletClient, http } from 'viem'

const sessionAccount = privateKeyToAccount('0x...')
```

### 3. Get payment requirements

Call the protected API route once without a payment header.

The server returns `402` with the payment terms (`PAYMENT-REQUIRED`) in the response, which you use
to build the payment payload.

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
import { Address } from 'viem'

export type PaymentRequirements = {
  scheme: string
  network: string
  amount: string
  asset: Address
  payTo: Address
  maxTimeoutSeconds: number
  extra: {
    assetTransferMethod: string
    facilitators?: Address[]
  }
}
```

</TabItem>
</Tabs>

### 4. Request Advanced Permissions

Request Advanced Permissions from the user with the Wallet Client's `requestExecutionPermissions` action.

In this example, you request an ERC-20 allowance permission with a fixed allowance equal to the
resource cost. Use the [`redeemer`](../../../reference/advanced-permissions/rules.md#redeemer) rule
to restrict redemption to facilitator addresses from the payment requirements.

See the [`requestExecutionPermissions`](../../../reference/advanced-permissions/wallet-client.md#requestexecutionpermissions) API reference for more information.

```ts
import { base as chain } from 'viem/chains'

const facilitators = accepted.extra.facilitators
if (!facilitators || facilitators.length === 0) {
  console.error('No facilitators found in PAYMENT-REQUIRED')
  // Handle error
}

const currentTime = Math.floor(Date.now() / 1000)
const expiry = currentTime + 3600

const grantedPermissions = await walletClient.requestExecutionPermissions([
  {
    chainId: chain.id,
    expiry,
    to: sessionAccount.address,
    permission: {
      type: 'erc20-token-allowance',
      data: {
        tokenAddress: accepted.asset,
        // Fixed allowance for this resource.
        allowanceAmount: BigInt(accepted.amount),
        justification: 'Permission to pay for a specific x402-protected API resource',
      },
      isAdjustmentAllowed: false,
    },
    rules: [
      {
        type: 'redeemer',
        data: {
          addresses: facilitators!,
        },
      },
    ],
  },
])
```

### 5. Create a redelegation

The granted advanced permission is delegated to the session account. To let facilitator addresses
redeem this permission context for x402 settlement, create an <GlossaryTerm term="Open redelegation">open redelegation</GlossaryTerm> from the session account.

Use the Wallet Client's [`redelegatePermissionContextOpen`](../../../reference/erc7710/wallet-client.md#redelegatepermissioncontextopen)
action to create a redelegated permission context. The granted permission already includes
a [redeemer enforcer](../../../reference/delegation/caveats.md#redeemer), so you do not add extra caveats here.

<Tabs>
<TabItem value="example.ts">

```ts
import { environment, sessionAccountWalletClient } from './config.ts'

const permission = grantedPermissions[0]
if (!permission) {
  console.error('No permission response returned by requestExecutionPermissions')
  // Handle error
}

const { permissionContext: redelegatedPermissionContext } =
  await sessionAccountWalletClient.redelegatePermissionContextOpen({
    environment,
    permissionContext: permission!.context,
  })
```

</TabItem>
<TabItem value="config.ts">

```ts
import { createWalletClient, http } from 'viem'
import { base as chain } from 'viem/chains'
import { getSmartAccountsEnvironment } from '@metamask/smart-accounts-kit'
import { erc7710WalletActions } from '@metamask/smart-accounts-kit/actions'
import { sessionAccount } from './session-account.ts'

export const environment = getSmartAccountsEnvironment(chain.id)

export const sessionAccountWalletClient = createWalletClient({
  account: sessionAccount,
  chain,
  transport: http(),
}).extend(erc7710WalletActions())
```

</TabItem>
</Tabs>

### 6. Create the payment payload

Create a payment payload using the redelegated permission context and accepted requirements.
For ERC-7710 (Smart Contract Delegation), x402 requires the payload fields `delegationManager`,
`permissionContext`, and `delegator`. The facilitator uses `permissionContext` to simulate
during verification and then settle the payment.

Encode the full x402 payment payload as base64, then send it in the `payment-signature` header.

<Tabs>
<TabItem value="example.ts">

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

</TabItem>
<TabItem value="types.ts">

```ts
import { Address, Hex } from 'viem'

export type PaymentPayload = {
  x402Version: 2
  accepted: PaymentRequirements
  payload: {
    delegationManager: Address
    permissionContext: Hex
    delegator: Address
  }
}
```

</TabItem>
</Tabs>

### 7. Make the paid request

Send the base64-encoded x402 payment payload in the `payment-signature` header.
If verification succeeds, the server returns the protected data.

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
