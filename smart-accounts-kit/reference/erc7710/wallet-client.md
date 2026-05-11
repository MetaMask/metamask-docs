---
description: Wallet Client actions reference.
sidebar_label: Wallet Client actions
toc_max_heading_level: 2
keywords:
  [
    ERC-7710,
    Viem,
    wallet client,
    actions,
    reference,
    advanced permissions,
    redeem delegation,
    redelegate permission context,
  ]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import GlossaryTerm from '@theme/GlossaryTerm';

# Wallet Client actions reference

These actions extend the [Viem Wallet Client](https://viem.sh/docs/clients/wallet) to support [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710) utilities.

## `sendTransactionWithDelegation`

Sends a transaction to redeem delegated permissions according to the [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710) specifications.

:::info
To use `sendTransactionWithDelegation`, the Viem Wallet Client must be
extended with `erc7710WalletActions`.
:::

### Parameters

See the [Viem `sendTransaction` parameters](https://viem.sh/docs/actions/wallet/sendTransaction#parameters).
This function has the same parameters, and it also requires the following parameters:

| Name                | Type                | Required | Description                                                                                                   |
| ------------------- | ------------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| `delegationManager` | `Address`           | Yes      | The address of the <GlossaryTerm term="Delegation Manager" />.                                                |
| `permissionContext` | `PermissionContext` | Yes      | An encoded delegation chain (`Hex`) or a decoded delegation chain (`Delegation[]`) for redeeming delegations. |

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { walletClient, publicClient } from './client.ts'

// These properties must be extracted from the permission response. See
// `grantPermissions` action to learn how to request permissions.
const permissionContext = permissionsResponse[0].context
const delegationManager = permissionsResponse[0].signerMeta.delegationManager

const hash = walletClient.sendTransactionWithDelegation({
  chain,
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1n,
  permissionContext,
  delegationManager,
})
```

</TabItem>
<TabItem value ="client.ts">

```ts
import { http, createPublicClient, createWalletClient } from 'viem'
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
import { sepolia as chain } from 'viem/chains'
import { erc7710WalletActions } from '@metamask/smart-accounts-kit/actions'

export const publicClient = createPublicClient({
  chain,
  transport: http(),
})

// Your session account for requesting and redeeming should be the same.
const privateKey = '0x...'
const account = privateKeyToAccount(privateKey)

const walletClient = createWalletClient({
  account,
  transport: http(),
  chain,
}).extend(erc7710WalletActions())
```

</TabItem>
</Tabs>

## `redelegatePermissionContext`

Creates a <GlossaryTerm term="Redelegation">redelegation</GlossaryTerm> to a specific <GlossaryTerm term="Delegate account">delegate</GlossaryTerm> from a delegation chain encoded as `Hex` or decoded as [`Delegation`](../types.md#delegation)`[]`.

The action returns [`RedelegatePermissionContextReturnType`](../types.md#redelegatepermissioncontextreturntype).

### Parameters

| Name                | Type                                                               | Required | Description                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `environment`       | [`SmartAccountsEnvironment`](../types.md#smartaccountsenvironment) | Yes      | Contract addresses for the <GlossaryTerm term="Delegation Framework" /> on the target chain.                                                                    |
| `permissionContext` | `PermissionContext`                                                | Yes      | Encoded delegation chain (`Hex`) or decoded chain ([`Delegation`](../types.md#delegation)`[]`), leaf first.                                                     |
| `chainId`           | `number`                                                           | No       | Chain ID used when signing the delegation.                                                                                                                      |
| `account`           | `Account` \| `Address`                                             | No       | Account that signs the redelegation. The default is the Wallet Client's configured account.                                                                     |
| `scope`             | `ScopeConfig`                                                      | No       | <GlossaryTerm term="Delegation scope">Delegation scope</GlossaryTerm> to restrict the authority of the redelegation.                                            |
| `caveats`           | `Caveats`                                                          | No       | Additional <GlossaryTerm term="Caveat">caveats</GlossaryTerm> to restrict the authority of the redelegation. See [caveats reference](../delegation/caveats.md). |
| `salt`              | `Hex`                                                              | No       | Salt for redelegation.                                                                                                                                          |
| `to`                | `Address`                                                          | Yes      | Address of the delegate for the redelegation.                                                                                                                   |

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { walletClient, publicClient, environment } from './client.ts'

// These properties must be extracted from the permission response. See
// `grantPermissions` action to learn how to request permissions.
const permissionContext = permissionsResponse[0].context

const { permissionContext: redelegatedPermissionContext } =
  walletClient.redelegatePermissionContext({
    to: 'DELEGATE_ADDRESS',
    environment,
    permissionContext: permissionContext,
  })
```

</TabItem>
<TabItem value ="client.ts">

```ts
import { http, createWalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia as chain } from 'viem/chains'
import { getSmartAccountsEnvironment } from '@metamask/smart-accounts-kit'
import { redelegatePermissionContextActions } from '@metamask/smart-accounts-kit/actions'

// Your session account for requesting and redelegating should be the same.
const privateKey = '0x...'
const account = privateKeyToAccount(privateKey)

export const environment = getSmartAccountsEnvironment(chain.id)

const walletClient = createWalletClient({
  account,
  transport: http(),
  chain,
}).extend(redelegatePermissionContextActions())
```

</TabItem>
</Tabs>

## `redelegatePermissionContextOpen`

Creates an <GlossaryTerm term="Open redelegation">open redelegation</GlossaryTerm> from a delegation chain encoded as `Hex` or decoded as [`Delegation`](../types.md#delegation)`[]`. This allows any account to redeem the inherited permissions.

The action returns [`RedelegatePermissionContextReturnType`](../types.md#redelegatepermissioncontextreturntype).

### Parameters

| Name                | Type                                                               | Required | Description                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `environment`       | [`SmartAccountsEnvironment`](../types.md#smartaccountsenvironment) | Yes      | Contract addresses for the <GlossaryTerm term="Delegation Framework" /> on the target chain.                                                                    |
| `permissionContext` | `PermissionContext`                                                | Yes      | Encoded delegation chain (`Hex`) or decoded chain ([`Delegation`](../types.md#delegation)`[]`), leaf first.                                                     |
| `chainId`           | `number`                                                           | No       | Chain ID used when signing the delegation.                                                                                                                      |
| `account`           | `Account` \| `Address`                                             | No       | Account that signs the redelegation. The default is the Wallet Client's configured account.                                                                     |
| `scope`             | `ScopeConfig`                                                      | No       | <GlossaryTerm term="Delegation scope">Delegation scope</GlossaryTerm> to restrict the authority of the redelegation.                                            |
| `caveats`           | `Caveats`                                                          | No       | Additional <GlossaryTerm term="Caveat">caveats</GlossaryTerm> to restrict the authority of the redelegation. See [caveats reference](../delegation/caveats.md). |
| `salt`              | `Hex`                                                              | No       | Salt for redelegation.                                                                                                                                          |

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { walletClient, publicClient, environment } from './client.ts'

// These properties must be extracted from the permission response. See
// `grantPermissions` action to learn how to request permissions.
const permissionContext = permissionsResponse[0].context

const { permissionContext: redelegatedPermissionContext } =
  walletClient.redelegatePermissionContextOpen({
    environment,
    permissionContext: permissionContext,
  })
```

</TabItem>
<TabItem value ="client.ts">

```ts
import { http, createWalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { sepolia as chain } from 'viem/chains'
import { getSmartAccountsEnvironment } from '@metamask/smart-accounts-kit'
import { redelegatePermissionContextActions } from '@metamask/smart-accounts-kit/actions'

// Your session account for requesting and redelegating should be the same.
const privateKey = '0x...'
const account = privateKeyToAccount(privateKey)

export const environment = getSmartAccountsEnvironment(chain.id)

const walletClient = createWalletClient({
  account,
  transport: http(),
  chain,
}).extend(redelegatePermissionContextActions())
```

</TabItem>
</Tabs>
