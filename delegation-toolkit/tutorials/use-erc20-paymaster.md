---
description: Follow this tutorial to use ERC-20 paymaster.
sidebar_position: 1
---

# Use an ERC-20 paymaster

This tutorial walks you through using an ERC-20 paymaster with [MetaMask smart account](../concepts/smart-accounts), 
enabling users to pay gas fees in USDC. This tutorial focus on Pimlico’s paymaster, but you can use any paymaster of your choice.

## About ERC-20 paymaster

The paymaster is an important component in the [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) standard, responsible for abstracting gas for the end user. 
There are different types of paymasters, such as gasless paymasters, ERC-20 paymasters, and more. While a gasless 
paymaster covers the transaction on behalf of the user, an ERC-20 paymaster allows users to pay gas fees using a 
supported ERC-20 token.

This removes the need for users to hold native tokens and enables a seamless experience, allowing them to perform on 
chain actions using only stablecoins.

## Prerequisites

- [Install and set up the Delegation Toolkit](../get-started/install) in your project.
- [Configure the Delegation Toolkit](../guides/configure).
- [Create a Hybrid smart account,](../guides/smart-accounts/create-smart-account).
- [Create Pimlico API key](https://docs.pimlico.io/guides/create-api-key#create-api-key).
- Have some USDC in smart account to pay gas fees.
  :::note
  You can use [Circle's Faucet](https://faucet.circle.com/) to get Sepolia USDC.
  :::

## Steps

### 1. Create a Public Client

Create a [Viem Public Client](https://viem.sh/docs/clients/public) using Viem's `createPublicClient` function.
You will configure a smart account and Bundler Client with the Public Client, which you can use to query the signer's account state and interact with the blockchain network.

```typescript
import { createPublicClient, http } from "viem";
import { sepolia as chain } from "viem/chains";

const publicClient = createPublicClient({
  chain,
  transport: http(),
});
```

### 2. Create a Paymaster Client

Create a [Viem Paymaster Client](https://viem.sh/account-abstraction/clients/paymaster)
using Viem’s `createPaymasterClient` function. This client interacts with the paymaster service, enabling users to pay gas fees in USDC.

Replace `<YOUR-API-KEY>` with your Pimlico API key.

```typescript
import { createPaymasterClient } from "viem/account-abstraction";

const bundlerClient = createBundlerClient({
  transport: http("https://api.pimlico.io/v2/11155111/rpc?apikey=<YOUR-API-KEY>"),
});
```

### 3. Create a Bundler Client

Create a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler) using Viem's `createBundlerClient` function. You can use the bundler service to estimate gas for user operations and submit transactions to the network.

To use an ERC-20 Paymaster, you need to configure the `paymasterContext` which allows you to specify the ERC-20 token that will be used to pay for the gas fees. For this tutorial, you'll use the USDC token. 

```typescript
import { createBundlerClient } from "viem/account-abstraction";

// USDC address on Ethereum Sepolia
const token = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http("https://your-bundler-rpc.com"),
  paymasterContext: {
    token,
  }
});
```


### 4. Create a Hybrid smart account

Configures a [Hybrid smart account](../guides/smart-accounts/create-smart-account.md#create-a-hybrid-smart-account), which is a flexible smart account implementation 
that supports both an externally owned account (EOA) owner and any number of passkey (WebAuthn) signers.

See [Create a MetaMask smart account](../guides/smart-accounts/create-smart-account) to learn more about smart account implementations.

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

ERC-20 paymaster works by transfering the token from the smart account, and reimbursing itself for paying the gas fees 
on the user's behalf. To send a user operation using ERC-20 paymaster, you'll first need to approve ERC-20 token to be 
used by the paymaster. 

To modify the token allowance for the paymaster, you’ll perform a write operation on the USDC contract. In this tutorial, you set an allowance of 10 USDC tokens. However, in a production dApp, you should first check the existing token allowance and only approve the amount required by the paymaster. 

Now, send a user operation using Viem's [`sendUserOperation`](https://viem.sh/account-abstraction/actions/bundler/sendUserOperation) method from Bundler Client. Make sure to batch the approve call with other on chain interactions you want to perform.

```typescript
// Appropriate fee per gas must be determined for the specific bundler being used.
const maxFeePerGas = 1n;
const maxPriorityFeePerGas = 1n;

const pimlicoPaymasterAddress = "0x777777777777AeC03fd955926DbF81597e66834C";

// 10 USDC in wei format. Since USDC has 6 decimals, the wei value is 10 * 10^6
const approvalAmount = 10000000n;

const userOperationHash = await bundlerClient.sendUserOperation({
  account: smartAccount,
  calls: [
    // USDC approve call
    {
      // USDC token address
      to: token,
      abi: parseAbi(["function approve(address,uint)"]),
      functionName: "approve",
      args: [pimlicoPaymasterAddress, approvalAmount],
    }
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

- See [Send a gasless transaction](../guides/smart-accounts/send-gasless-transaction.md) to learn how to use gasless paymaster.