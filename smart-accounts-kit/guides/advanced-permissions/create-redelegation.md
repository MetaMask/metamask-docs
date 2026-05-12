---
description: Learn how to create a redelegation for Advanced Permissions.
sidebar_label: Create a redelegation
keywords: [advanced permissions, caveat, delegation scope, redelegation, delegation]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import GlossaryTerm from '@theme/GlossaryTerm';

# Create a redelegation

Redelegation is a core feature that sets <GlossaryTerm term="Advanced Permissions" /> apart from other permission sharing frameworks.
It allows a session account (<GlossaryTerm term="Delegate account">delegate</GlossaryTerm>) to create a delegation chain, passing on the same or reduced level of authority
from the MetaMask account (<GlossaryTerm term="Delegator account">delegator</GlossaryTerm>).

For example, if a dapp is granted permission to spend 10 USDC on a user's behalf, it can
further delegate that permission to specific agents, such as allowing a Swap agent to spend
up to 5 USDC. This creates a permission sharing chain in which the root permissions are
shared with additional parties.

## Prerequisites

- [Install and set up the Smart Accounts Kit.](../../get-started/install.md)
- [Learn about Advanced Permissions.](../../concepts/advanced-permissions.md)
- [Learn how to request Advanced Permissions.](execute-on-metamask-users-behalf.md)

## Request Advanced Permissions

Request Advanced Permissions from the user with the Wallet Client's [`requestExecutionPermissions`](../../reference/advanced-permissions/wallet-client.md#requestexecutionpermissions) action.

This example uses the [ERC-20 periodic permission](./use-permissions/erc20-token.md#erc-20-periodic-permission), allowing the
user to grant dapp the ability to spend 10 USDC on their behalf.

<Tabs>
<TabItem value="example.ts">

```typescript
import { sepolia as chain } from 'viem/chains'
import { sessionAccount, walletClient, tokenAddress } from './config.ts'
import { parseUnits } from 'viem'

// Since current time is in seconds, we need to convert milliseconds to seconds.
const currentTime = Math.floor(Date.now() / 1000)
// 1 week from now.
const expiry = currentTime + 604800

const grantedPermissions = await walletClient.requestExecutionPermissions([
  {
    chainId: chain.id,
    expiry,
    // The requested permissions will granted to the
    // session account.
    to: sessionAccount.address,
    permission: {
      type: 'erc20-token-periodic',
      data: {
        tokenAddress,
        // 10 USDC in wei format. Since USDC has 6 decimals, 10 * 10^6
        periodAmount: parseUnits('10', 6),
        // 1 day in seconds
        periodDuration: 86400,
        justification: 'Permission to transfer 10 USDC every day',
      },
      isAdjustmentAllowed: true,
    },
  },
])
```

</TabItem>

<TabItem value="config.ts">

```ts
import { createWalletClient, custom, createPublicClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { toMetaMaskSmartAccount, Implementation } from '@metamask/smart-accounts-kit'
import { erc7715ProviderActions, erc7710WalletActions } from '@metamask/smart-accounts-kit/actions'
import { sepolia as chain } from 'viem/chains'

// USDC address on Ethereum Sepolia.
export const tokenAddress = '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238'

const publicClient = createPublicClient({
  chain,
  transport: http(),
})

const privateKey = '0x...'
const account = privateKeyToAccount(privateKey)

export const sessionAccount = createWalletClient({
  account,
  chain,
  transport: http(),
}).extend(erc7710WalletActions())

export const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions())
```

</TabItem>
</Tabs>

## Create a redelegation

Create a [redelegation](../../concepts/delegation/overview.md#redelegation) from dapp to a Swap agent.

To create a redelegation, provide the granted permission context as the `permissionContext` argument when calling [`redelegatePermissionContext`](../../reference/erc7710/wallet-client.md#redelegatepermissioncontext).
In the previous step, `sessionAccount` was extended with `erc7710WalletActions`.

When you create a redelegation, apply the toolkit's [caveats](../../reference/delegation/caveats.md)
to narrow the Swap agent's authority. In this example, we'll use [`erc20TransferAmount`](../../reference/delegation/caveats.md#erc20transferamount)
enforcer, allowing your dapp to delegate the Swap agent only the ability to spend 5 USDC on the user's behalf.

:::note
When creating a redelegation, you can only narrow the scope of the original authority, not expand it.
:::

<Tabs>
<TabItem value="redelegation.ts">

```typescript
import { sessionAccount, agentAccount, tokenAddress } from './config.ts'
import {
  createDelegation,
  ScopeType,
  getSmartAccountsEnvironment,
  Caveats,
  CaveatType,
} from '@metamask/smart-accounts-kit'
import { parseUnits } from 'viem'
import { sepolia as chain } from 'viem/chains'

const caveats: Caveats = [
  {
    type: CaveatType.Erc20TransferAmount,
    tokenAddress,
    // USDC has 6 decimal places.
    maxAmount: parseUnits('5', 6),
  },
]

const environment = getSmartAccountsEnvironment(chain.id)

const { permissionContext: signedPermissionContext } =
  await sessionAccount.redelegatePermissionContext({
    to: agentAccount.address,
    environment,
    permissionContext: grantedPermissions[0].context,
    caveats,
  })
```

</TabItem>
<TabItem value="config.ts">

```typescript
// Update the existing config to create a smart account for a Swap agent.

const agentPrivateKey = '0x...'
export const agentAccount = privateKeyToAccount(agentPrivateKey)
```

</TabItem>
</Tabs>
