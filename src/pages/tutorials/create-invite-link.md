---
title: Create a social invite link
image: 'img/tutorials/tutorials-banners/create-invite-link.png'
description: Allow users to refer their friends to your dapp using an invite link.
tags: [delegation toolkit, social, invite, referral, link]
date: Sep 8, 2025
author: MetaMask Developer Relations
---

This tutorial walks you through creating an invite link to enable users to refer their friends to your dapp with minimal friction.

For example, Alice (the inviter) wants Bob (the invitee) to try out your dapp.
She sends him a link that allows him to claim 0.001 ETH from her wallet within a time limit.
Bob can start using your dapp right away, without installing a wallet or paying gas fees.

You'll enable this by creating a [MetaMask smart account](/delegation-toolkit/concepts/smart-accounts) to represent the inviter, using a paymaster to abstract gas fees, and creating an [open delegation](/delegation-toolkit/concepts/delegation) to represent an invitation.
This tutorial uses Pimlico's paymaster, but you can use any paymaster of your choice.

## Prerequisites

- Get an [Infura API key](/developer-tools/dashboard/get-started/create-api) from the MetaMask Developer dashboard.
- [Create a Pimlico API key](https://docs.pimlico.io/guides/create-api-key#create-api-key).

## Steps

### 1. Install the Delegation Toolkit

Install the [MetaMask Delegation Toolkit](https://www.npmjs.com/package/@metamask/delegation-toolkit) in your project:

```bash npm2yarn
npm install @metamask/delegation-toolkit
```

### 2. Create a Public Client

Create a [Viem Public Client](https://viem.sh/docs/clients/public) using Viem's `createPublicClient` function.
You will configure a smart account and Bundler Client with the Public Client, which you can use to query the signer's account state and interact with the blockchain network.

```typescript
import { createPublicClient, http } from 'viem';
import { sepolia as chain } from 'viem/chains';

const publicClient = createPublicClient({
  chain,
  transport: http(),
});
```

### 3. Create a Paymaster Client

Create a [Viem Paymaster Client](https://viem.sh/account-abstraction/clients/paymaster) using Viem's `createPaymasterClient` function.
This client interacts with the paymaster service.

Replace `<YOUR-API-KEY>` with your Pimlico API key:

```typescript
import { createPaymasterClient } from 'viem/account-abstraction';

const paymasterClient = createPaymasterClient({
  transport: http('https://api.pimlico.io/v2/11155111/rpc?apikey=<YOUR-API-KEY>'),
});
```

### 4. Create a Bundler Client

Create a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler) using Viem's `createBundlerClient` function.
Pass the `paymasterClient` to the `paymaster` property.
You can use the bundler service to estimate gas for user operations and submit transactions to the network.

```typescript
import { createBundlerClient } from 'viem/account-abstraction';

const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http('https://your-bundler-rpc.com'),
  paymaster: paymasterClient,
});
```

### 5. Create and deploy an inviter account

Create an account to represent the inviter.
This account will be creating a delegation, and must be a [MetaMask smart account](/delegation-toolkit/concepts/smart-accounts).
This example uses a [Hybrid smart account](/delegation-toolkit/development/guides/smart-accounts/create-smart-account/#create-a-hybrid-smart-account), which is a flexible smart account implementation that supports both an externally owned account (EOA) owner and any number of passkey (WebAuthn) signers.

```typescript
import { Implementation, toMetaMaskSmartAccount } from '@metamask/delegation-toolkit';
import { privateKeyToAccount } from 'viem/accounts';

const account = privateKeyToAccount('0x...');

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [account.address, [], [], []],
  deploySalt: '0x',
  signatory: { account },
});
```

Deploy the smart account by sending a user operation:

```ts
import { zeroAddress } from 'viem';

// Appropriate fee per gas must be determined for the specific bundler being used.
const maxFeePerGas = 1n;
const maxPriorityFeePerGas = 1n;

const userOperationHash = await bundlerClient.sendUserOperation({
  account: smartAccount,
  calls: [{ to: zeroAddress }],
  maxFeePerGas,
  maxPriorityFeePerGas,
});
```

Fund the deployed smart account with some Sepolia ETH to sponsor gas fees for the invitee.

:::note
You can use the [MetaMask faucet](/developer-tools/faucet) to get Sepolia ETH.
:::

### 6. Create and sign an invitation

Create an [open root delegation](/delegation-toolkit/concepts/delegation) to represent an invitiation.
A root delegation is the first delegation in a chain of delegations, and an open root delegation grants permission to any account.
In this example, the inviter creates an invitation that can be redeemed by any invitee, allowing the invitee to spend up to 0.001 ETH.

```ts
import { createOpenDelegation, getDelegatorEnvironment } from '@metamask/delegation-toolkit';

const delegation = createOpenDelegation({
  from: smartAccount.address,
  environment: getDelegatorEnvironment(chain.id);
  scope: {
    type: 'nativeTokenTransferAmount',
    // 0.001 ETH in wei format.
    maxAmount: 1000000000000000n,
  },
});
```

Sign the delegation to enable the invitee to redeem it in the future:

```typescript
const signature = await smartAccount.signDelegation({
  delegation,
})

const signedDelegation = {
  ...delegation,
  signature,
}
```

### 7. Create an invitee account

Create an account to represent the invitee.
This account will be redeeming the delegation and can be a smart account or an externally owned account (EOA).
This example uses an EOA:

```ts
import { privateKeyToAccount } from 'viem/accounts';
import { sepolia as chain } from 'viem/chains';
import { createWalletClient, http } from 'viem';

const delegateAccount = privateKeyToAccount('0x...');

export const delegateWalletClient = createWalletClient({
  account: delegateAccount,
  chain,
  transport: http(),
})
```

### 8. Redeem the invitation

The invitee can redeem the invitation by submitting a transaction to the `DelegationManager` contract, which validates the delegation and executes delegated actions.
In this case, the invitee can spend up to 0.001 ETH from the inviter when using your dapp.

```ts
import { createExecution, getDeleGatorEnvironment } from '@metamask/delegation-toolkit'
import { DelegationManager } from '@metamask/delegation-toolkit/contracts'
import { SINGLE_DEFAULT_MODE } from '@metamask/delegation-toolkit/utils'
import { zeroAddress } from 'viem'

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

## Next steps

- Learn more about [smart account implementations](/delegation-toolkit/development/guides/smart-accounts/create-smart-account).
- Learn more about [delegation types](/delegation-toolkit/development/concepts/delegation/#delegation-types).
- Learn more about [using delegation scopes](/delegation-toolkit/development/guides/delegation/use-delegation-scopes).
