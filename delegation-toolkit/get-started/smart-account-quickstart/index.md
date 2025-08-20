---
description: Get started quickly with the MetaMask Smart Accounts
sidebar_position: 2
sidebar_label: Smart account quickstart
---

# MetaMask Smart Accounts quickstart

You can get started quickly with [MetaMask Smart Accounts](../../concepts/smart-accounts.md) by creating your first smart account and sending a user operation.

## Prerequisites

[Install and set up the Delegation Toolkit.](../install.md)

## Steps

### 1. Set up a Public Client

Set up a [Viem Public Client](https://viem.sh/docs/clients/public) using Viem's `createPublicClient` function. This client will let the smart account query the signer's account state and interact with blockchain network.

```typescript
import { createPublicClient, http } from "viem";
import { sepolia as chain } from "viem/chains";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});
```

### 2. Set up a Bundler Client

Set up a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler) using Viem's `createBundlerClient` function. This lets you use the bundler service to estimate gas for user operations and submit transactions to the network.

```typescript
import { createBundlerClient } from "viem/account-abstraction";

const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http("https://your-bundler-rpc.com"),
});
```

### 3. Create a MetaMask smart account

[Create a MetaMask smart account](../../how-to/create-smart-account.md) to send the first user operation.

This example configures a Hybrid smart account,
which is a flexible smart account implementation that supports both an externally owned account (EOA) owner and any number of P256 (passkey) signers:

```typescript
import { Implementation, toMetaMaskSmartAccount } from "@metamask/delegation-toolkit";
import { privateKeyToAccount } from "viem/accounts";

const account = privateKeyToAccount("0x...");

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signatory: { account },
});
```

### 4. Send a user operation

Send a user operation using Viem's [`sendUserOperation`](https://viem.sh/account-abstraction/actions/bundler/sendUserOperation) method.

See [Send a user operation](../../how-to/send-user-operation.md) to learn how to estimate fee per gas, and wait for the transaction receipt.

The smart account will remain counterfactual until the first user operation. If the smart account is not 
deployed, it will be automatically deployed upon the sending first user operation.

```ts
import { parseEther } from "viem";

// Appropriate fee per gas must be determined for the specific bundler being used.
const maxFeePerGas = 1n;
const maxPriorityFeePerGas = 1n;

const userOperationHash = await bundlerClient.sendUserOperation({
  account: smartAccount,
  calls: [
    {
      to: "0x1234567890123456789012345678901234567890",
      value: parseEther("1"),
    },
  ],
  maxFeePerGas,
  maxPriorityFeePerGas,
});
```

## Next steps

- With a MetaMask smart account, you can [create delegations](../../how-to/create-delegation/index.md) that can be used to grant specific rights and permissions to other accounts.
- This quickstart example uses a Hybrid smart account.
  You can also [configure other smart account types](../../how-to/create-smart-account/configure-accounts-signers.md).
- To upgrade an EOA to a smart account, see the [EIP-7702 quickstart](eip7702-quickstart.md).
- To quickly bootstrap a MetaMask Smart Accounts project, you can [use the CLI](../use-the-cli.md).
