---
description: Get started quickly with the MetaMask Smart Accounts
sidebar_position: 2
sidebar_label: Smart account quickstart
---

# MetaMask Smart Accounts quickstart

You can get started quickly with [MetaMask Smart Accounts](../concepts/smart-accounts.md) in the following ways:

- [CLI quickstart](#cli-quickstart) - Use the interactive CLI to bootstrap a smart account project in under two minutes.
- [Manual quickstart](#manual-quickstart) - Follow these steps to create your first smart account and send a user operation.

## CLI quickstart

Run the following command to install the CLI package:

```bash
npx @metamask/create-gator-app@latest
```

You'll be asked the following prompts:

```bash
? What is your project named? (my-gator-app)
? Pick a framework: (Use arrow keys) 
❯ nextjs
  vite-react
? Pick a template: (Use arrow keys)
❯ MetaMask Smart Accounts Starter
  MetaMask Smart Accounts & Delegation Starter
  Experimental: ERC7715 Permissions starter
? Pick a package manager: (Use arrow keys)
❯ npm 
  yarn 
  pnpm 
```

To use MetaMask Smart Accounts, you can choose one of the following templates:

- **MetaMask Smart Accounts Starter** - This template configures a
  [Hybrid smart account](../how-to/create-smart-account/configure-accounts-signers.md#configure-a-hybrid-smart-account)
  and provides an interface to [send user operations](../how-to/send-user-operation.md).
- **MetaMask Smart Accounts & Delegation Starter** - This template configures a
  [Hybrid smart account](../how-to/create-smart-account/configure-accounts-signers.md#configure-a-hybrid-smart-account)
  as the [delegator account](../concepts/smart-accounts.md#delegator-accounts)
  and provides an interface to complete the [delegation lifecycle](../concepts/delegation.md).

Both templates are available for Next.js and Vite React.
Once you've answered the prompts, the CLI will create the project using the specified configuration and install the required dependencies.

### Use Web3Auth

To create a project that uses [Web3Auth](https://web3auth.io/docs/) embedded wallet as the signer for your delegator 
account, use the `--add-web3auth` option when installing the CLI:

```bash
npx @metamask/create-gator-app --add-web3auth
```

You'll be prompted to provide additional Web3Auth configuration details:

```bash
? Which Web3Auth network do you want to use? (Use arrow keys)
❯ Sapphire Devnet 
  Sapphire Mainnet 
```

## Manual quickstart

### 1. Install the toolkit

[Install and set up the Delegation Toolkit.](install.md)

### 2. Set up a Public Client

Set up a [Viem Public Client](https://viem.sh/docs/clients/public) using Viem's `createPublicClient` function. This client will let the smart account query the signer's account state and interact with blockchain network.

```typescript
import { createPublicClient, http } from "viem";
import { sepolia as chain } from "viem/chains";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});
```

### 3. Set up a Bundler Client

Set up a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler) using Viem's `createBundlerClient` function. This lets you use the bundler service to estimate gas for user operations and submit transactions to the network.

```typescript
import { createBundlerClient } from "viem/account-abstraction";

const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http("https://your-bundler-rpc.com"),
});
```

### 4. Create a MetaMask smart account

[Create a MetaMask smart account](../how-to/create-smart-account/index.md) to send the first user operation.

This example configures a [Hybrid](../concepts/smart-accounts.md#hybrid-smart-account) smart account,
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

### 5. Send a user operation

Send a user operation using Viem's [`sendUserOperation`](https://viem.sh/account-abstraction/actions/bundler/sendUserOperation) method.

See [send user operation](./../how-to/send-user-operation.md) to learn how to estimate fee per gas, and wait for the transaction receipt.

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

With a MetaMask smart account, you can [create delegations](../how-to/create-delegation/index.md) that can be used to grant specific rights and permissions to other accounts.

The quickstart examples use Hybrid smart accounts.
You can also [configure other smart account types](../how-to/create-smart-account/configure-accounts-signers.md).
