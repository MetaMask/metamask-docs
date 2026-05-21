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
Later, when the agent calls an x402 endpoint, it checks the price, uses the granted permission,
and pays.

## Prerequisites

- [Install and set up the Smart Accounts Kit.](../../../get-started/install.md)

## Steps

### 1. Install the dependencies

```bash npm2yarn
npm install @x402/core @x402/fetch @metamask/x402
```

### 2. Set up a Wallet Client

Set up a Wallet Client using Viem's
[`createWalletClient`](https://viem.sh/docs/clients/wallet) function.
Use this client to interact with MetaMask.

Extend the Wallet Client with `erc7715ProviderActions` to enable
<GlossaryTerm term="Advanced Permissions" /> requests.

```typescript
import { createWalletClient, custom } from 'viem'
import { erc7715ProviderActions } from '@metamask/smart-accounts-kit/actions'

const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions())
```

### 3. Set up an agent account

The session account can be either a
<GlossaryTerm term="MetaMask smart account">smart account</GlossaryTerm> or an
<GlossaryTerm term="Externally owned account (EOA)">EOA</GlossaryTerm>.
This example uses an EOA as the session account.

```typescript
import { privateKeyToAccount } from 'viem/accounts'

const sessionAccount = privateKeyToAccount('0x...')
```

### 4. Request Advanced Permissions

Request Advanced Permissions from the user with the Wallet Client's
`requestExecutionPermissions` action.

In this example, you request an
[ERC-20 periodic permission](../../advanced-permissions/use-permissions/erc20-token.md#erc-20-periodic-permission)
with a weekly allowance of 10 USDC.
This creates a recurring payment budget that your agent can store and reuse for x402 API calls.

See the
[`requestExecutionPermissions`](../../../reference/advanced-permissions/wallet-client.md#requestexecutionpermissions)
API reference for more information.

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
        tokenAddress,
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

### 5. Create an x402 ERC-7710 client

Create an `x402Erc7710Client` with a `delegationProvider` callback.
The x402 client calls this function automatically when it needs to pay for a request, passing
in the payment requirements from the server.

Inside the provider, create an <GlossaryTerm term="Open redelegation">open redelegation</GlossaryTerm>
from the agent account so the facilitator can redeem the permission context for x402 settlement.
This example uses the
[`erc20TransferAmount`](../../../guides/delegation/use-delegation-scopes/spending-limit.md#erc-20-transfer-scope)
scope to allow USDC transfers up to the amount requested in payment terms.

Use the Wallet Client's
[`redelegatePermissionContextOpen`](../../../reference/erc7710/wallet-client.md#redelegatepermissioncontextopen)
action to create a redelegated permission context.

<Tabs>
<TabItem value="example.ts">

```ts
import { ScopeType, CaveatType } from '@metamask/smart-accounts-kit'
import { x402Erc7710Client } from '@metamask/x402'
import { getAddress } from 'viem'
import { environment, sessionAccountWalletClient } from './config'

const permission = grantedPermissions[0]

const erc7710Client = new x402Erc7710Client({
  delegationProvider: async requirements => {
    const { permissionContext: redelegatedPermissionContext } =
      await sessionAccountWalletClient.redelegatePermissionContextOpen({
        environment,
        permissionContext: permission.context,
        scope: {
          type: ScopeType.Erc20TransferAmount,
          tokenAddress: getAddress(requirements.asset),
          maxAmount: BigInt(requirements.amount),
        },
      })

    return {
      delegationManager: permission.delegationManager,
      permissionContext: redelegatedPermissionContext,
      delegator: permission.from,
    }
  },
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

// Use sessionAccount from previous step.
export const sessionAccountWalletClient = createWalletClient({
  account: sessionAccount,
  chain,
  transport: http(),
}).extend(erc7710WalletActions())
```

</TabItem>
</Tabs>

### 6. Register the client

Register the ERC-7710 client with the x402 core client for all EVM networks,
then create an HTTP client and a payment-aware `fetch` function using `wrapFetchWithPayment`.

```ts
import { x402Client, x402HTTPClient } from '@x402/core/client'
import { wrapFetchWithPayment } from '@x402/fetch'

const coreClient = new x402Client().register('eip155:*', erc7710Client)
const httpClient = new x402HTTPClient(coreClient)

const fetchWithPayment = wrapFetchWithPayment(fetch, httpClient)
```

### 7. Make the paid request

Call the protected endpoint using `fetchWithPayment`.
It handles the x402 payment flow, calling your `delegationProvider`
to create an open redelegation when the server returns a `402` response.

```ts
const paidResponse = await fetchWithPayment('https://api.example.com/paid-endpoint', {
  method: 'GET',
})
```

Reuse the same weekly granted permission for additional protected routes and providers in your
agent flow.
Your agent can continue paying until the weekly cap is reached, then continue after the next
weekly period starts.
