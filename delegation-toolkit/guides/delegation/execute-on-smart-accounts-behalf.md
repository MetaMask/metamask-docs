---
description: Use delegations to perform executions on a smart account's behalf.
sidebar_position: 1
sidebar_label: Execute on a smart account's behalf
---

import Tabs from "@theme/Tabs"; 
import TabItem from "@theme/TabItem";

# Perform executions on a smart account's behalf

[Delegation](../../concepts/delegation/index.md) is the ability for a [MetaMask smart account](../../concepts/smart-accounts.md) to grant permission to another account to perform executions on its behalf.

In this guide, you'll create a delegator account (Alice) and a delegate account (Bob), and grant Bob permission to perform executions on Alice's behalf.
You'll complete the delegation lifecycle (create, sign, and redeem a delegation).

## Prerequisites

[Install and set up the Delegation Toolkit.](../../get-started/install.md)

## Steps

### 1. Create a Public Client

Create a [Viem Public Client](https://viem.sh/docs/clients/public) using Viem's `createPublicClient` function.
You will configure Alice's account (the delegator) and the Bundler Client with the Public Client, which you can use to query the signer's account state and interact with smart contracts.

```typescript
import { createPublicClient, http } from "viem"
import { sepolia as chain } from "viem/chains"

const publicClient = createPublicClient({
  chain,
  transport: http(),
})
```

### 2. Create a Bundler Client

Create a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler) using Viem's `createBundlerClient` function.
You can use the bundler service to estimate gas for user operations and submit transactions to the network.

```typescript
import { createBundlerClient } from "viem/account-abstraction"

const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http("https://your-bundler-rpc.com"),
})
```

### 3. Create a delegator account

Create an account to represent Alice, the delegator who will create a delegation.
The delegator must be a MetaMask smart account; use the toolkit's [`toMetaMaskSmartAccount`](../../reference/api/smart-account.md#tometamasksmartaccount) method to create the delegator account.

A Hybrid smart account is a flexible smart account implementation that supports both an externally owned account (EOA) owner and any number of P256 (passkey) signers.
This examples configures a [Hybrid smart account with an Account signatory](../smart-accounts/create-smart-account.md#create-a-hybrid-smart-account-with-an-account-signatory):

```typescript
import { Implementation, toMetaMaskSmartAccount } from "@metamask/delegation-toolkit"
import { privateKeyToAccount } from "viem/accounts"

const delegatorAccount = privateKeyToAccount("0x...")

const delegatorSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [delegatorAccount.address, [], [], []],
  deploySalt: "0x",
  signatory: { account: delegatorAccount },
})
```

:::note
See [how to configure other smart account types](../smart-accounts/create-smart-account.md).
:::

### 4. Create a delegate account

Create an account to represent Bob, the delegate who will receive the delegation. The delegate can be a smart account or an externally owned account (EOA):

<Tabs>
<TabItem value="Smart account">

```typescript
import { Implementation, toMetaMaskSmartAccount } from "@metamask/delegation-toolkit"
import { privateKeyToAccount } from "viem/accounts"

const delegateAccount = privateKeyToAccount("0x...")

const delegateSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid, // Hybrid smart account
  deployParams: [delegateAccount.address, [], [], []],
  deploySalt: "0x",
  signatory: { account: delegateAccount },
})
```

</TabItem>
<TabItem value="EOA">

```typescript
import { privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import { createWalletClient, http } from "viem";

const delegateAccount = privateKeyToAccount("0x...");

export const delegateWalletClient = createWalletClient({
  account: delegateAccount,
  chain,
  transport: http(),
})
```

</TabItem>
</Tabs>

### 5. Create a delegation

Create a [root delegation](../../concepts/delegation/index.md#delegation-types) from Alice to Bob.
With a root delegation, Alice is delegating her own authority away, as opposed to *redelegating* permissions she received from a previous delegation.

Use the toolkit's [`createDelegation`](../../reference/api/delegation.md#createdelegation) method to create a root delegation.
This example passes an empty `caveats` array, which means Bob can perform any action on Alice's behalf. We recommend [restricting the delegation](restrict-delegation.md) by adding caveat enforcers.
For example, Alice can delegate the ability to spend her USDC to Bob, limiting the amount to 100 USDC.

:::warning Important

Before creating a delegation, ensure that the delegator account (in this example, Alice's account) has been deployed. If the account is not deployed, redeeming the delegation will fail.

:::

```typescript
import { createDelegation } from "@metamask/delegation-toolkit"

const delegation = createDelegation({
  to: delegateSmartAccount.address, // This example uses a delegate smart account
  from: delegatorSmartAccount.address,
  caveats: [], // Empty caveats array - we recommend adding appropriate restrictions.
})
```

### 6. Sign the delegation

Sign the delegation with Alice's account, using the [`signDelegation`](../../reference/api/smart-account.md#signdelegation) method from `MetaMaskSmartAccount`. Alternatively, you can use the toolkit's [`signDelegation`](../../reference/api/delegation.md#signdelegation) utility method. Bob will later use the signed delegation to perform actions on Alice's behalf.

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

Bob can now redeem the delegation. The redeem transaction is sent to the `DelegationManager` contract, which validates the delegation and executes actions on Alice's behalf.

To prepare the calldata for the redeem transaction, use the [`redeemDelegations`](../../reference/api/delegation.md#redeemdelegations) method from `DelegationManager`.
Since Bob is redeeming a single delegation chain, use the [`SINGLE_DEFAULT_MODE`](../../concepts/delegation/index.md#execution-modes) execution mode.

Bob can redeem the delegation by submitting a user operation if his account is a smart account, or a regular transaction if his account is an EOA:

<Tabs>
<TabItem value="Redeem with a smart account">

```typescript
import { createExecution } from "@metamask/delegation-toolkit"
import { DelegationManager } from "@metamask/delegation-toolkit/contracts"
import { SINGLE_DEFAULT_MODE } from "@metamask/delegation-toolkit/utils"
import { zeroAddress } from "viem"

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

</TabItem>
<TabItem value="Redeem with an EOA">

```typescript
import { createExecution, getDeleGatorEnvironment } from "@metamask/delegation-toolkit"
import { DelegationManager } from "@metamask/delegation-toolkit/contracts"
import { SINGLE_DEFAULT_MODE } from "@metamask/delegation-toolkit/utils"
import { zeroAddress } from "viem"

const delegations = [signedDelegation]

const executions = createExecution({ target: zeroAddress })

const redeemDelegationCalldata = DelegationManager.encode.redeemDelegations({
  delegations: [delegations],
  modes: [SINGLE_DEFAULT_MODE],
  executions: [executions]
});

const transactionHash = await delegateWalletClient.sendTransaction({
  to: getDeleGatorEnvironment(chain.id).DelegationManager,
  data: redeemDelegationCalldata,
  chain,
})
```

</TabItem>
</Tabs>
