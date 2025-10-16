---
description: Use ERC-7715 permissions to perform executions on a MetaMask user's behalf.
sidebar_label: Execute on a MetaMask user's behalf
keywords: [execution, smart account, create, redeem, delegation, erc 7715, 7715, session account]
---

import Tabs from "@theme/Tabs"; 
import TabItem from "@theme/TabItem";

# Perform executions on a MetaMask user's behalf

[ERC-7715 permissions](../../concepts/erc7715.md) are fine-grained permissions that your dapp can request from a MetaMask user to execute transactions on their 
behalf. For example, a user can grant your dapp permission to spend 10 USDC per day to buy ETH over the course 
of a month. Once the permission is granted, your dapp can use the allocated 10 USDC each day to 
purchase ETH directly from the MetaMask user's account.

In this guide, you'll request an ERC-20 periodic transfer permission from a MetaMask user to transfer 1 USDC every day on their behalf.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../get-started/install.md)
- [Install MetaMask Flask 12.14.2 or later.](/snaps/get-started/install-flask)

### 1. Set up a Wallet Client

Set up a [Viem Wallet Client](https://viem.sh/docs/clients/wallet) using Viem's `createWalletClient` function. This client will
help you interact with MetaMask Flask. 

Then, extend the Wallet Client functionality using `erc7715ProviderActions`. These actions enable you to request ERC-7715
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
This client will help you query the account state and interact with the blockchain network.

```typescript
import { createPublicClient, http } from "viem";
import { sepolia as chain } from "viem/chains";
 
const publicClient = createPublicClient({
  chain,
  transport: http(),
});
```

### 3. Set up a session account

Set up a session account which can either be a smart account or an externally owned account (EOA)
to request ERC-7715 permissions. This account is responsible for executing transactions
on behalf of the user. 

<Tabs>
<TabItem value="Smart account">

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
  signer: { account },
});
```

</TabItem>
<TabItem value="EOA">

```typescript
import { privateKeyToAccount } from "viem/accounts";
import { sepolia as chain } from "viem/chains";
import { createWalletClient, http } from "viem";

const sessionAccount = privateKeyToAccount("0x...");
```

</TabItem>
</Tabs>

### 4. Request ERC-7715 permissions

Request ERC-7715 permissions from the user. In this example, you'll request an
[ERC-20 periodic permission](use-permissions/erc20-token.md#erc-20-periodic-permission) using the Wallet Client's 
[`requestExecutionPermissions`](../../reference/erc7715/wallet-client.md#requestexecutionpermissions) action.

```typescript
import { sepolia as chain } from "viem/chains";
import { parseUnits } from "viem";

// Since current time is in seconds, we need to convert milliseconds to seconds.
const currentTime = Math.floor(Date.now() / 1000);
// 1 week from now.
const expiry = currentTime + 604800;

// USDC address on Ethereum Sepolia.
const tokenAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const grantedPermissions = await walletClient.requestExecutionPermissions([{
  chainId: chain.id,
  expiry,
  signer: {
    type: "account",
    data: {
      address: sessionAccount.address,
    },
  },
  permission: {
    type: "erc20-token-periodic",
    data: {
      tokenAddress,
      // 1 USDC in WEI format. Since USDC has 6 decimals, 10 * 10^6
      periodAmount: parseUnits("10", 6),
      // 1 day in seconds
      periodDuration: 86400,
      justification?: "Permission to transfer 1 USDC every day",
    },
  },
  isAdjustmentAllowed: true,
}]);
```

### 5. Set up a Viem client

Set up a Viem client depending on your session account type.

For a smart account, set up a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler) 
using Viem's `createBundlerClient` function. This lets you use the bundler service 
to estimate gas for user operations and submit transactions to the network.

For an EOA, set up a [Viem Wallet Client](https://viem.sh/docs/clients/wallet) 
using Viem's `createWalletClient` function. This lets you send transactions directly to the network.

The toolkit provides public actions for both of the clients which can be used to redeem ERC-7715 permissions, and execute transactions on a user's behalf. 

<Tabs>
<TabItem value="Smart account">

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

</TabItem>
<TabItem value="EOA">

```typescript
import { createWalletClient, http } from "viem";
import { erc7710WalletActions } from "@metamask/delegation-toolkit/experimental";
import { sepolia as chain } from "viem/chains";

const sessionAccountWalletClient = createWalletClient({
  account: sessionAccount,
  chain,
  transport: http(),
}).extend(erc7710WalletActions());
```

</TabItem>
</Tabs>


### 6. Redeem ERC-7715 permissions

The session account can now redeem the permissions. The redeem transaction is sent to the `DelegationManager` contract, which validates the delegation and executes actions on the user's behalf.

To redeem the permissions, use the client action based on your session account type.
A smart account uses the Bundler Client's [`sendUserOperationWithDelegation`](../../reference/erc7715/bundler-client.md#senduseroperationwithdelegation) action,
and an EOA uses the Wallet Client's [`sendTransactionWithDelegation`](../../reference/erc7715/wallet-client.md#sendtransactionwithdelegation) action:

<Tabs>
<TabItem value="Smart account">

```typescript
import { calldata } from "./config.ts";

// These properties must be extracted from the permission response.
const permissionsContext = grantedPermissions[0].context;
const delegationManager = grantedPermissions[0].signerMeta.delegationManager;
const accountMetadata = grantedPermissions[0].accountMeta;

// USDC address on Ethereum Sepolia.
const tokenAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

// Calls without permissionsContext and delegationManager will be executed 
// as a normal user operation.
const userOperationHash = await bundlerClient.sendUserOperationWithDelegation({
  publicClient,
  account: sessionAccount,
  calls: [
    {
      to: tokenAddress,
      data: calldata,
      permissionsContext,
      delegationManager,
    },
  ],
  // Appropriate values must be used for fee-per-gas. 
  maxFeePerGas: 1n,
  maxPriorityFeePerGas: 1n,
  accountMetadata,
});
```

</TabItem>
<TabItem value="EOA">

```typescript
import { calldata } from "./config.ts";

// These properties must be extracted from the permission response.
const permissionsContext = grantedPermissions[0].context;
const delegationManager = grantedPermissions[0].signerMeta.delegationManager;

// USDC address on Ethereum Sepolia.
const tokenAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const transactionHash = await sessionAccountWalletClient.sendTransactionWithDelegation({
  to: tokenAddress,
  data: calldata,
  permissionsContext,
  delegationManager,
});
```

</TabItem>

<TabItem value="config.ts">

```typescript
import { encodeFunctionData, erc20Abi, parseUnits } from "viem";

export const calldata = encodeFunctionData({
  abi: erc20Abi,
  args: [ sessionAccount.address, parseUnits("1", 6) ],
  functionName: 'transfer',
});
```

</TabItem>
</Tabs>

## Next steps

See how to configure different [ERC-20 token permissions](use-permissions/erc20-token.md) and
[native token permissions](use-permissions/native-token.md).
