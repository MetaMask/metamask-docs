---
description: Learn how to redeem a delegation with a smart contract account (SCA) or an externally owned account (EOA).
sidebar_position: 7
toc_max_heading_level: 3
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Redeem a delegation

A delegate can redeem a delegation by submitting either a user operation or a regular transaction,
depending on whether the delegate is a smart account or externally owned account (EOA).

The redeem transaction is sent to the `DelegationManager` contract, which validates the delegation and executes actions on the delegator's behalf.
To prepare the calldata for the redeem transaction, use the `redeemDelegation` utility function.
The function supports batch redemption, allowing multiple delegations to be processed within a single transaction.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../get-started/install.md)
- [Configure the Delegation Toolkit.](configure.md)
- [Create a delegator smart account.](create-smart-account/index.md)
- [Create a delegation.](create-delegation/index.md)

## Redeem a delegation

Redeem a delegation with a [smart account](#redeem-with-a-smart-account) or an [externally owned account (EOA)](#redeem-with-an-eoa).

### Redeem with a smart account

The following example demonstrates how to submit a user operation to redeem a delegation.
It assumes you have a delegation signed by the delegator, and that the delegate is a smart account.

<Tabs>
<TabItem value="example.ts">

```typescript
import { ExecutionStruct } from "@metamask/delegation-toolkit";
import { DelegationManager } from "@metamask/delegation-toolkit/contracts";
import { SINGLE_DEFAULT_MODE } from "@metamask/delegation-toolkit/utils";
import { bundlerClient, pimlicoClient } from "./client.ts";
import { delegateSmartAccount } from "./account.ts";

const delegations: Delegation[] = [ signedDelegation ];

// SINGLE_DEFAULT_MODE is the default execution mode.
const mode: ExecutionMode = SINGLE_DEFAULT_MODE;

// For SINGLE execution modes, the executions array must be length 1.
const executions: ExecutionStruct[] = [{
  target: zeroAddress,  
  value: 0n, 
  callData: "0x"
}];

const redeemDelegationCalldata = DelegationManager.encode.redeemDelegations({
  delegations: [ delegations ],
  modes: [ mode ],
  executions: [ executions ]
});

const { fast: fee } = await pimlicoClient.getUserOperationGasPrice();

const userOperationHash = await bundlerClient.sendUserOperation({
  account: delegateSmartAccount,
  calls: [
    {
      to: "<DELEGATOR-SMART-ACCOUNT-ADDRESS>",
      data: redeemDelegationCalldata
    }
  ],
  ...fee
});
```

</TabItem>

<TabItem value="account.ts">

```typescript
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";
import { privateKeyToAccount } from "viem/accounts";
import { publicClient } from "./client.ts"

const delegateAccount = privateKeyToAccount("0x...");

export const delegateSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [delegateAccount.address, [], [], []],
  deploySalt: "0x",
  signatory: { account: delegateAccount },
});
```

</TabItem>

<TabItem value="client.ts">

```typescript
import { createPublicClient, http } from "viem";
import { lineaSepolia as chain } from "viem/chains";
import { createBundlerClient } from "viem/account-abstraction";
import { createPimlicoClient } from "permissionless/clients/pimlico";

// You can get the API Key from the Pimlico dashboard.
const pimlicoUrl = "https://api.pimlico.io/v2/59141/rpc";

export const publicClient = createPublicClient({
  chain,
  transport: http(),
});

export const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http(pimlicoUrl),
});

export const pimlicoClient = createPimlicoClient({
  transport: http(pimlicoUrl),
});
```

</TabItem>
</Tabs>

### Redeem with an EOA

The following example demonstrates how to submit a transaction to redeem a delegation. It assumes you have a delegation signed by the delegator, and that the delegate is an EOA.

<Tabs>
<TabItem value="example.ts">

```typescript
import { 
  ExecutionStruct,
  ExecutionMode
  Delegation,
  getDeleGatorEnvironment,
} from "@metamask/delegation-toolkit";
import { DelegationManager } from "@metamask/delegation-toolkit/contracts";
import { SINGLE_DEFAULT_MODE } from "@metamask/delegation-toolkit/utils";
import { lineaSepolia as chain } from "viem/chains";
import { delegateWalletClient } from "./account.ts";

const delegations: Delegation[] = [ signedDelegation ];

// SINGLE_DEFAULT_MODE is the default execution mode.
const mode: ExecutionMode = SINGLE_DEFAULT_MODE;

// For SINGLE execution modes, the executions array must be length 1.
// Modify the executions to fit your use case.
const executions: ExecutionStruct[] = [{
  target: zeroAddress,  
  value: 0n, 
  callData: "0x"
}];

const redeemDelegationCalldata = DelegationManager.encode.redeemDelegations({
  delegations: [ delegations ],
  modes: [ mode ],
  executions: [ executions ]
});

const transactionHash = await walletClient.sendTransaction({
  to: getDeleGatorEnvironment(chain.id).DelegationManager,
  data: redeemDelegationCalldata,
  chain,
});
```

</TabItem>

<TabItem value="account.ts">

```typescript
import { privateKeyToAccount } from "viem/accounts";
import { lineaSepolia as chain } from "viem/chains";
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

## Redeem multiple delegations

You can redeem multiple delegations in a single user operation, each delegation independent of the others.
Each element in the `delegationsArray` must have a corresponding element in the `executionsArray` and `modes`.

The following example assumes you already have multiple signed delegations and that the delegate is a smart account.
The preparation of the calldata is the same when [using an EOA as the delegate](#redeem-with-an-eoa);
the primary difference is that an EOA submits a regular transaction instead of a user operation.

<Tabs>
<TabItem value="example.ts">

```typescript
import { 
  ExecutionStruct,
  Delegation,
  ExecutionMode,
} from "@metamask/delegation-toolkit";
import { DelegationManager } from "@metamask/delegation-toolkit/contracts";
import { SINGLE_DEFAULT_MODE } from "@metamask/delegation-toolkit/utils";
import { bundlerClient, pimlicoClient } from "./client.ts";
import { delegateSmartAccount } from "./account.ts";

const delegationsArray: Delegation[][] = [
  [ signedDelegation1 ]
  [ signedDelegation2 ]
  [ signedDelegation3 ]
];

const modes: ExecutionMode = [
  SINGLE_DEFAULT_MODE,
  SINGLE_DEFAULT_MODE,
  SINGLE_DEFAULT_MODE
];

const execution: ExecutionStruct[] = [{
  target: zeroAddress,  
  value: 0n, 
  callData: "0x"
}];

// Modify the executions to fit your use case. For simplicity, we've 
// included a basic example. The execution array can contain
// multiple different executions.
const executionsArray: ExecutionStruct:[][] = [
 execution,
 execution,
 execution
];

const redeemDelegationCalldata = DelegationManager.encode.redeemDelegations({
  delegations: [ delegations ],
  modes: [ mode ],
  executions: [ executions ]
});

const { fast: fee } = await pimlicoClient.getUserOperationGasPrice();

const userOperationHash = await bundlerClient.sendUserOperation({
  account: delegateSmartAccount,
  calls: [
    {
      to: "<DELEGATOR-SMART-ACCOUNT-ADDRESS>",
      data: redeemDelegationCalldata
    }
  ],
  ...fee
});
```

</TabItem>

<TabItem value="account.ts">

```typescript
import {
  Implementation,
  toMetaMaskSmartAccount,
} from "@metamask/delegation-toolkit";
import { privateKeyToAccount } from "viem/accounts";
import { publicClient } from "./client.ts";

const delegateAccount = privateKeyToAccount("0x...");

export const delegateSmartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [delegateAccount.address, [], [], []],
  deploySalt: "0x",
  signatory: { account: delegateAccount },
});
```

</TabItem>

<TabItem value="client.ts">

```typescript
import { createPublicClient, http } from "viem";
import { lineaSepolia as chain } from "viem/chains";
import { createBundlerClient } from "viem/account-abstraction";
import { createPimlicoClient } from "permissionless/clients/pimlico";

// You can get the API Key from the Pimlico dashboard.
const pimlicoUrl = "https://api.pimlico.io/v2/59141/rpc";

export const publicClient = createPublicClient({
  chain,
  transport: http(),
});

export const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http(pimlicoUrl),
});

export const pimlicoClient = createPimlicoClient({
  transport: http(pimlicoUrl),
});
```

</TabItem>
</Tabs>

## Execution modes

The Delegation Toolkit supports several execution modes based on [ERC-7579](https://erc7579.com/).
See the [ERC implementation](https://github.com/erc7579/erc7579-implementation/blob/main/src/lib/ModeLib.sol) for more details about the execution modes.

The supported execution modes are `SINGLE_DEFAULT_MODE`, `SINGLE_TRY_MODE`, `BATCH_DEFAULT_MODE`, and `BATCH_TRY_MODE`.

### `SINGLE` execution modes

In `SINGLE` execution modes, only a single delegation chain and a single execution can be provided. This mode processes delegations sequentially:

1. For each delegation in the chain, all caveats' `before` hooks are called.
2. The single redeemed action is executed.
3. For each delegation in the chain, all caveats' `after` hooks are called.

### `BATCH` execution modes

In `BATCH` execution modes, multiple delegation chains and multiple executions can be provided. This mode executes delegations in an interleaved way:

1. For each chain in the batch, and each delegation in the chain, all caveats' `before` hooks are called.
2. Each redeemed action is executed.
3. For each chain in the batch, and each delegation in the chain, all caveats' `after` hooks are called.

`BATCH` mode allows for powerful use cases, but the Delegation Framework currently does not include any `BATCH` compatible caveat enforcers.

### `DEFAULT` modes

In `DEFAULT` modes, if a revert occurs during redemption, the entire user operation reverts at that point.

### `TRY` modes

In `TRY` modes, if a revert occurs during redemption, execution of the user operation continues.
