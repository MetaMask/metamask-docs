---
description: Learn how to use ERC-7715 to request permissions.
sidebar_position: 5
sidebar_label: ERC-7715 quickstart
---

# ERC-7715 quickstart

This page demonstrates how to use [ERC-7715](https://eips.ethereum.org/EIPS/eip-7715) to request permissions 
from a wallet, and execute transactions on a user's behalf. 

## Prerequisites

- [Install and set up the Delegation Toolkit.](install.md)
- [Install MetaMask Flask 12.14.2 or later](/snaps/get-started/install-flask).

## Steps

### 1. Set up a Wallet Client

Set up a [Viem Wallet Client](https://viem.sh/docs/clients/wallet) using Viem's `createWalletClient` function. This client will help you interact with MetaMask Flask. 

Then, extend the Wallet Client functionality 
using `erc7715ProviderActions`. These actions enable you to request ERC-7715 
permissions from the user.

```typescript
import { createWalletClient, custom } from "viem";
import { erc7715ProviderActions } from "@metamask/delegation-toolkit/experimental";

const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions());
```

### 2. Set up a Public Client

Set up a [Viem Public Client](https://viem.sh/docs/clients/public) using Viem's `createPublicClient` function. 
This client will help you query the account state and interact with blockchain networks.

```typescript
import { createPublicClient, http } from "viem";
import { sepolia as chain } from "viem/chains";
 
const publicClient = createPublicClient({
  chain,
  transport: http(),
});
```

### 3. Set up a session account

Set up a session account which can either be a smart account or an externally owned 
account (EOA) to request ERC-7715 permissions. This account is responsible 
for executing transactions on behalf of the user. 

This example uses [MetaMask Smart Accounts](../concepts/smart-accounts.md) as a session account.

```typescript
import { privateKeyToAccount } from "viem/accounts";
import { 
  toMetaMaskSmartAccount, 
  Implementation 
} from "@metamask/delegation-toolkit";

const privateKey = "0x...";
const account = privateKeyToAccount(privateKey);

const sessionAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account },
});
```

### 4. Request ERC-7715 permissions

Request ERC-7715 permissions from the user. Currently, only the 
`native-token-stream` permission type is supported, which allows the dapp to stream 
native tokens from the user's wallet.

```typescript
const expiry = Math.floor(Date.now() / 1000 + 604_800); // 1 week from now.
const currentTime = Math.floor(Date.now() / 1000); // now

const grantedPermissions = await walletClient.grantPermissions([{
  chainId: chain.id,
  expiry,
  signer: {
    type: "account",
    data: {
      address: sessionAccount.address,
    },
  },
  permission: {
    type: "native-token-stream",
    data: {
      initialAmount: 1n, // 1 wei
      amountPerSecond: 1n, // 1 wei per second
      maxAmount: 10n, // 10 wei
      startTime: currentTime,
      justification: "Payment for a week long subscription",
    },
  },
}]);
```

### 5. Set up a Bundler Client

Set up a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler) 
using Viem's `createBundlerClient` function. This lets you use the bundler service 
to estimate gas for user operations and submit transactions to the network.

Then, extend the Bundler Client 
functionality using `erc7710BundlerActions`. These actions enable you to redeem ERC-7715 permissions, and execute transactions on a user's behalf. 

```typescript
import { createBundlerClient } from "viem/account-abstraction";
import { erc7710BundlerActions } from "@metamask/delegation-toolkit/experimental";

const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http("https://your-bundler-rpc.com"),
  // Allows you to use the same Bundler Client as paymaster.
  paymaster: true
}).extend(erc7710BundlerActions());
```

### 6. Redeem ERC-7715 permissions

The session account can now [redeem the delegation](../guides/redeem-delegation.md). The redeem transaction is sent to the `DelegationManager` contract, which validates the delegation and executes actions on the user's behalf.

To redeem the permissions, you can use the `sendUserOperationWithDelegation` bundler client action.

```typescript
// These properties must be extracted from the permission response.
const permissionsContext = grantedPermissions[0].context;
const delegationManager = grantedPermissions[0].signerMeta.delegationManager;
const accountMetadata = grantedPermissions[0].accountMeta;

// Calls without permissionsContext and delegationManager will be executed 
// as a normal user operation.
const userOperationHash = await bundlerClient.sendUserOperationWithDelegation({
  publicClient,
  account: sessionAccount,
  calls: [
    {
      to: sessionAccount.address,
      data: "0x",
      value: 1n,
      permissionsContext,
      delegationManager,
    },
  ],
  // Appropriate values must be used for fee-per-gas. 
  maxFeePerGas: 1n,
  maxPriorityFeePerGas: 1n
  accountMetadata,
});
```
