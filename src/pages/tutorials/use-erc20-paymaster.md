---
title: Use an ERC-20 paymaster with a smart account
image: 'img/tutorials/tutorials-banners/use-erc20-paymaster.png'
description: Enable users to pay gas fees with an ERC-20 token using a smart account and paymaster.
tags: [delegation toolkit, ERC-20 paymaster, smart accounts]
date: Sep 2, 2025
author: MetaMask Developer Relations
---

This tutorial walks you through using an ERC-20 paymaster with [MetaMask Smart Accounts](/delegation-toolkit/concepts/smart-accounts), enabling users to pay gas fees in USDC.
This tutorial uses Pimlico's paymaster, but you can use any paymaster of your choice.

## About paymasters

A paymaster is an important component of the [account abstraction (ERC-4337)](/delegation-toolkit/concepts/smart-accounts) standard, responsible for abstracting gas fees for end users. 
There are different types of paymasters, such as gasless paymasters and ERC-20 paymasters. 
While a gasless paymaster covers the transaction on behalf of the user, an ERC-20 paymaster allows users to pay gas fees using a supported ERC-20 token.
This removes the need for users to hold native tokens, allowing them to perform onchain actions using only stablecoins.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/blog/release/v18.18.0) v18 or later.
- Install [Yarn](https://yarnpkg.com/),
    [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), or another package manager.
- [Create a Pimlico API key](https://docs.pimlico.io/guides/create-api-key#create-api-key).

## Steps

### 1. Install the toolkit

Install the [MetaMask Delegation Toolkit](https://www.npmjs.com/package/@metamask/delegation-toolkit) in your project:

```bash npm2yarn
npm install @metamask/delegation-toolkit
```

### 2. Create a Public Client

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

### 3. Create a Paymaster Client

Create a [Viem Paymaster Client](https://viem.sh/account-abstraction/clients/paymaster)
using Viem's `createPaymasterClient` function. This client interacts with the paymaster service, enabling users to pay gas fees in USDC.

Replace `<YOUR-API-KEY>` with your Pimlico API key:

```typescript
import { createPaymasterClient } from "viem/account-abstraction";

const paymasterClient = createPaymasterClient({
  transport: http("https://api.pimlico.io/v2/11155111/rpc?apikey=<YOUR-API-KEY>"),
});
```

### 4. Create a Bundler Client

Create a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler) using Viem's `createBundlerClient` function. You can use the bundler service to estimate gas for user operations and submit transactions to the network.

To use the ERC-20 paymaster, configure the `paymasterContext` with the ERC-20 token you wish to use to pay for gas fees.
For this tutorial, specify the Sepolia USDC token address.

```typescript
import { createBundlerClient } from "viem/account-abstraction";

// USDC address on Ethereum Sepolia.
const token = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http("https://your-bundler-rpc.com"),
  paymasterContext: {
    token,
  }
});
```

### 5. Create and fund a smart account

Create a [Hybrid smart account](/delegation-toolkit/development/guides/smart-accounts/create-smart-account/#create-a-hybrid-smart-account).
A Hybrid smart account is a flexible smart account implementation that supports both an externally owned account (EOA) owner and any number of passkey (WebAuthn) signers.

```typescript
import { Implementation, toMetaMaskSmartAccount } from "@metamask/delegation-toolkit";
import { privateKeyToAccount } from "viem/accounts";

const account = privateKeyToAccount("0x...");

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: "0x",
  signer: { account },
});
```

Fund the account with some Sepolia USDC to pay gas fees.

:::note
You can use [Circle's faucet](https://faucet.circle.com/) to get Sepolia USDC.
:::

### 6. Send a user operation

The ERC-20 paymaster works by transferring the token from the smart account, and reimbursing itself for paying the gas fees on the user's behalf.

To send a user operation with the ERC-20 paymaster, use the [`sendUserOperation`](https://viem.sh/account-abstraction/actions/bundler/sendUserOperation) method from the Bundler Client.
You must include a call approving the ERC-20 token to be used by the paymaster.
To modify the token allowance for the paymaster, perform a write operation on the USDC contract.
For this tutorial, set an allowance of 10 USDC tokens.

:::note
In a production dapp, you should first check the existing token allowance and only approve the amount required by the paymaster.
:::

Batch the approve call with other onchain actions you want to perform using the ERC-20 paymaster.
Pass the `paymasterClient` from [Step 2](#2-create-a-paymaster-client) to the `paymaster` property.

```typescript
// Appropriate fee per gas must be determined for the bundler being used.
const maxFeePerGas = 1n;
const maxPriorityFeePerGas = 1n;

const pimlicoPaymasterAddress = "0x777777777777AeC03fd955926DbF81597e66834C";

// 10 USDC in wei format. Since USDC has 6 decimals, the wei value is 10 * 10^6.
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
    // Batch the approve call with other onchain actions.
    {
      to: "0x1234567890123456789012345678901234567890",
      value: parseEther("1"),
    },
  ],
  maxFeePerGas,
  maxPriorityFeePerGas,
  paymaster: paymasterClient,
});
```

## Next steps

- Learn more about [smart account implementations](/delegation-toolkit/development/guides/smart-accounts/create-smart-account).
- To sponsor gas for end users, see how to [send a gasless transaction](/delegation-toolkit/development/guides/smart-accounts/send-gasless-transaction).
