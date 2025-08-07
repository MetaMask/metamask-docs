---
description: Get started quickly with the MetaMask Delegation Toolkit.
sidebar_position: 3
sidebar_label: Delegation quickstart
---

# Delegation quickstart

[Delegation](../concepts/delegation.md) is the ability for a [MetaMask smart account](../concepts/smart-accounts.md) to grant permission to another account to perform executions on its behalf.

In this quickstart, you will create a *delegator account* (the account that grants the permission) and *delegate account* (the account that receives the permission), and complete the delegation lifecycle (create, sign, and redeem a delegation).

This quickstart will refer to the delegator account as "Alice," who grants permission to "Bob," the delegate account, to perform executions on her behalf.

## Prerequisites

[Install and set up the Delegation Toolkit.](install.md)

## Steps

### 1. Set up a Public Client

Set up a [Viem Public Client](https://viem.sh/docs/clients/public) using Viem's `createPublicClient` function. This client will let the delegator account query the signer's account state and interact with smart contracts.

```typescript
import { createPublicClient, http } from 'viem'
import { sepolia as chain } from 'viem/chains'

const publicClient = createPublicClient({
  chain,
  transport: http(),
})
```

### 2. Set up a Bundler Client

Set up a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler) using Viem's `createBundlerClient` function. This lets you use the bundler service to estimate gas for user operations and submit transactions to the network.

```typescript
import { createBundlerClient } from 'viem/account-abstraction'

const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http('https://your-bundler-rpc.com'),
})
```

### 3. Create a delegator account

Create an account to represent Alice, the delegator who will create a delegation.
The delegator must be a [smart account](../concepts/smart-accounts.md).

This example configures a Hybrid smart account,
which is a flexible smart account implementation that supports both an externally owned account (EOA) owner and any number of P256 (passkey) signers:

```typescript
import { Implementation, toMetaMaskSmartAccount } from '@metamask/delegation-toolkit'
import { privateKeyToAccount } from 'viem/accounts'

const delegatorAccount = privateKeyToAccount('0x...')

const delegatorSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [delegatorAccount.address, [], [], []],
  deploySalt: '0x',
  signatory: { account: delegatorAccount },
})
```

:::note
See [how to configure other smart account types](../how-to/create-smart-account.md).
:::

### 4. Create a delegate account

Create an account to represent Bob, the delegate who will receive the delegation. The delegate can be a smart account or an externally owned account (EOA).

This example configures a Hybrid smart account:

```typescript
import { Implementation, toMetaMaskSmartAccount } from '@metamask/delegation-toolkit'
import { privateKeyToAccount } from 'viem/accounts'

const delegateAccount = privateKeyToAccount('0x...')

const delegateSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [delegateAccount.address, [], [], []],
  deploySalt: '0x',
  signatory: { account: delegateAccount },
})
```

### 5. Create a delegation

[Create a root delegation](../how-to/create-delegation/index.md#create-a-root-delegation) from Alice to Bob.
A root delegation is a delegation that doesn't derive its authority from another delegation.
Alice is delegating her own authority away, as opposed to *redelegating* permissions she received from a previous delegation.

This example passes an empty `caveats` array, which means Bob can perform any action on Alice's behalf. We recommend [restricting the delegation](../how-to/create-delegation/restrict-delegation.md) by adding caveat enforcers.
For example, Alice can delegate the ability to sepnd her USDC to Bob, limiting the amount to 100 USDC.

:::warning Important

Before creating a delegation, ensure that the delegator account (in this example, Alice's account) has been deployed. If the account is not deployed, redeeming the delegation will fail.

:::

```typescript
import { createDelegation } from '@metamask/delegation-toolkit'

const delegation = createDelegation({
  to: delegateSmartAccount.address,
  from: delegatorSmartAccount.address,
  caveats: [], // Empty caveats array - we recommend adding appropriate restrictions.
})
```

### 6. Sign the delegation

[Sign the delegation](../how-to/create-delegation/index.md#sign-a-delegation) with Alice's account, using the [`signDelegation`](../reference/api/smart-account.md#signdelegation) method from `MetaMaskSmartAccount`. Alternatively, you can use the Delegation Toolkit's [`signDelegation`](../reference/api/delegation.md#signdelegation) utility. Bob will later use the signed delegation to perform actions on Alice's behalf.

```typescript
const signature = await delegatorSmartAccount.signDelegation({
  delegation,
})

const signedDelegation = {
  ...delegation,
  signature,
}
```

### 7. Redeem the delegation

Bob can now [redeem the delegation](../how-to/redeem-delegation.md). The redeem transaction is sent to the `DelegationManager` contract, which validates the delegation and executes actions on Alice's behalf.

To prepare the calldata for the redeem transaction, use the [`redeemDelegation`](../reference/api/delegation.md#redeemdelegation) utility function from the Delegation Toolkit.

```typescript
import { createExecution } from '@metamask/delegation-toolkit'
import { DelegationManager } from '@metamask/delegation-toolkit/contracts'
import { SINGLE_DEFAULT_MODE } from '@metamask/delegation-toolkit/utils'
import { zeroAddress } from 'viem'

const delegations = [signedDelegation]

const executions = createExecution({ target: zeroAddress })

const redeemDelegationCalldata = DelegationManager.encode.redeemDelegations({
  delegations: [delegations],
  modes: [SINGLE_DEFAULT_MODE],
  executions: [executions],
})

const userOperationHash = await bundlerClient.sendUserOperation({
  account: delegateSmartAccount,
  calls: [
    {
      to: delegateSmartAccount.address,
      data: redeemDelegationCalldata,
    },
  ],
  maxFeePerGas: 1n,
  maxPriorityFeePerGas: 1n,
})
```

:::note
If Bob's account (the delegate account) is an externally owned account (EOA) instead of a smart account,
see [how to redeem the delegation with an EOA](../how-to/redeem-delegation.md#redeem-with-an-eoa).
:::
