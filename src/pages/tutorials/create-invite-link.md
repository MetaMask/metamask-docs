---
title: Create a social invite link
image: 'img/tutorials/tutorials-banners/create-invite-link.png'
description: Allow users to refer their friends to your dapp using an invite link.
tags: [delegation toolkit, embedded wallets, social, invite, referral, link]
date: Sep 8, 2025
author: MetaMask Developer Relations
toc_max_heading_level: 4
---

This tutorial walks you through creating an invite link so users can refer their friends to your dapp with minimal friction.

For example, Alice (the inviter) wants Bob (the invitee) to try out your dapp.
She sends him a link that allows him to claim 0.001 ETH from her wallet within a time limit.
Bob can start using your dapp right away, without installing a wallet or paying gas fees.

You'll enable this by:

- Adding an [embedded wallet](/embedded-wallets) for instant onboarding.
- Creating a [MetaMask smart account](/delegation-toolkit/concepts/smart-accounts) to create and redeem an invitation.
- Creating an [open delegation](/delegation-toolkit/concepts/delegation) to represent an invitation.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/blog/release/v18.18.0) v18 or later.
- Install [Yarn](https://yarnpkg.com/),
    [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), or another package manager.
- Get a [Client ID](/embedded-wallets/dashboard) from the Embedded Wallets (Web3Auth) dashboard.
- [Create a Pimlico API key](https://docs.pimlico.io/guides/create-api-key#create-api-key).
  :::note
  This tutorial uses Pimlico's bundler and paymaster, but you can use any bundler and paymaster of your choice.
  :::
 
## Steps

### 1. Set up the project

#### 1.1. Install dependencies

Install the [MetaMask Delegation Toolkit](https://www.npmjs.com/package/@metamask/delegation-toolkit) and other dependencies in your project:

```bash npm2yarn
npm install @metamask/delegation-toolkit @web3auth/modal wagmi @tanstack/react-query
```

#### 1.2. Set up Embedded Wallets (Web3Auth)

Configure [MetaMask Embedded Wallets (Web3Auth)](/embedded-wallets/) to enable users to instantly connect to your dapp using familiar login methods, like social accounts or email.

1. Add a `WEB3AUTH_CLIENT_ID` environment variable, replacing `<YOUR-CLIENT-ID>` with your Web3Auth Client ID:

    ```txt title='.env.local'
    WEB3AUTH_CLIENT_ID=<YOUR-CLIENT-ID>
    ```

2. Configure Web3Auth options:

    ```tsx title='providers/AppProvider.tsx'
    import { WEB3AUTH_NETWORK, Web3AuthOptions } from '@web3auth/modal';

    const web3AuthOptions: Web3AuthOptions = {
      clientId: process.env.WEB3AUTH_CLIENT_ID as string,
      web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
    };

    const web3authConfig = {
      web3AuthOptions,
    };
    ```

3. Create a connect button:

    ```tsx title='components/ConnectButton.tsx'
    import { useWeb3AuthConnect } from '@web3auth/modal/react';
    import Button from '@/components/Button'; // You can add your own Button component

    export default function ConnectButton() {
      const { connect } = useWeb3AuthConnect();

      return (
        <div className='flex gap-2'>
          <Button onClick={() => connect()}>Connect with Web3Auth</Button>
        </div>
      );
    }
    ```

#### 1.3. Set up Wagmi

Wrap your dapp with the Wagmi, Web3Auth, and React Query providers.
Add Wagmi using the Web3Auth Wagmi adapter so wallet connections from Web3Auth are available to Wagmi hooks.

```tsx title='providers/AppProvider.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Web3AuthProvider } from '@web3auth/modal/react';
import { WagmiProvider } from '@web3auth/modal/react/wagmi';

const queryClient = new QueryClient();

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <Web3AuthProvider config={web3authConfig}>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>{children}</WagmiProvider>
      </QueryClientProvider>
    </Web3AuthProvider>
  );
}
```

### 2. Create a Bundler Client

Create a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler) using Viem's `createBundlerClient` function.
You can use the bundler service to estimate gas for user operations and submit transactions to the network.

Set `paymaster` to `true` to use the Pimlico paymaster with the Bundler Client, and replace `<YOUR-API-KEY>` with your Pimlico API key:

```tsx
import { createBundlerClient } from 'viem/account-abstraction';
import { usePublicClient } from "wagmi";

const publicClient = usePublicClient();

const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http('https://api.pimlico.io/v2/11155111/rpc?apikey=<YOUR-API-KEY>'),
  paymaster: true, // The same Pimlico URL will be used for bundler and paymaster.
});
```

### 3. Create a smart account

Create an account to create and redeem an invitation.
This account will create a delegation, and must be a [MetaMask smart account](/delegation-toolkit/concepts/smart-accounts).
This example uses a [Hybrid smart account](/delegation-toolkit/development/guides/smart-accounts/create-smart-account/#create-a-hybrid-smart-account), which is a flexible smart account implementation that supports both an externally owned account (EOA) owner and any number of passkey (WebAuthn) signers:

```tsx
import { Implementation, toMetaMaskSmartAccount } from '@metamask/delegation-toolkit';
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

const { address } = useAccount();
const publicClient = usePublicClient();
const { data: walletClient } = useWalletClient();

const smartAccount = await toMetaMaskSmartAccount({
  client: publicClient,
  implementation: Implementation.Hybrid,
  deployParams: [address, [], [], []],
  deploySalt: '0x',
  signer: { walletClient },
});
```

### 4. Create an invitation

#### 4.1. Deploy the account

To create an invitation, first deploy the smart account by sending a user operation:

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

#### 4.2. Fund the account

Fund the deployed smart account with some Sepolia ETH to enable the invitee to spend funds when they redeem the invitation.

:::note
You can use the [MetaMask faucet](/developer-tools/faucet) to get Sepolia ETH.
:::

#### 4.3. Create an open root delegation

Create an [open root delegation](/delegation-toolkit/concepts/delegation) to represent an invitation.
A root delegation is the first delegation in a chain of delegations, and an open root delegation grants permission to any account.
In this example, the inviter creates an invitation that can be redeemed by any invitee, allowing the invitee to spend up to 0.001 ETH.

```ts
import { createOpenDelegation } from '@metamask/delegation-toolkit';

const delegation = createOpenDelegation({
  from: smartAccount.address,
  environment: smartAccount.environment;
  scope: {
    type: 'nativeTokenTransferAmount',
    // 0.001 ETH in wei format.
    maxAmount: 1000000000000000n,
  },
});
```

#### 4.4. Sign the delegation

Sign the delegation to enable the invitee to redeem the invitation in the future:

```tsx
const signature = await smartAccount.signDelegation({
  delegation,
})

const signedDelegation = {
  ...delegation,
  signature,
}
```

#### 4.5. Share the invitation

Encode the delegation into a shareable invite link:

```tsx
import { Delegation } from '@metamask/delegation-toolkit';

export function encodeDelegation(delegation: Delegation): string {
  const delegationJson = JSON.stringify(delegation);
  return Buffer.from(delegationJson, 'utf-8').toString('base64');
}

const encoded = encodeDelegation(signedDelegation);

const url = new URL(window.location.href);
url.searchParams.set("delegation", encoded);
const shareableUrl = url.toString();
```

The inviter can now share the link with anyone.

### 5. Redeem the invitation

#### 5.1. Decode the shared invitation

When the invitee opens the shared invite link, decode the delegation:

```tsx
import { Delegation } from '@metamask/delegation-toolkit';

const urlParams = new URLSearchParams(window.location.search);
const encodedDelegation = urlParams.get('delegation');

export function decodeDelegation(encodedDelegation: string): Delegation {
  const decodedDelegationJson = Buffer.from(encodedDelegation, 'base64').toString('utf-8');
  return JSON.parse(decodedDelegationJson) as Delegation;
}

const decodedDelegation = decodeDelegation(encodedDelegation);
```

#### 5.2. Redeem the delegation

[Redeem the delegation](/delegation-toolkit/development/guides/delegation/execute-on-smart-accounts-behalf/#7-redeem-the-delegation) by submitting a user operation from the smart account to the `DelegationManager` contract.
Submitting the user operation deploys the account for first-time users.

The delegation manager validates the delegation and executes delegated actions.
In this case, the invitee can spend up to 0.001 ETH when using your dapp.

```ts
import { createExecution, getDeleGatorEnvironment, ExecutionMode } from '@metamask/delegation-toolkit';
import { DelegationManager } from '@metamask/delegation-toolkit/contracts';

const delegations = [decodedDelegation];

const executions = createExecution(smartAccount.address, 1000000000000000n);

const redeemDelegationCalldata = DelegationManager.encode.redeemDelegations({
  delegations: [delegations],
  modes: [ExecutionMode.SingleDefault],
  executions: [executions]
});

// Appropriate fee per gas must be determined for the specific bundler being used.
const maxFeePerGas = 1n;
const maxPriorityFeePerGas = 1n;

const userOperationHash = await bundlerClient.sendUserOperation({
  account: smartAccount,
  calls: [
    {
      to: smartAccount.address,
      data: redeemDelegationCalldata,
    },
  ],
  maxFeePerGas,
  maxPriorityFeePerGas,
});
```

## Next steps

- See [`invitation-link-example`](https://github.com/MetaMask/gator-examples/tree/feat/invitation-link-example/examples/invitation-link-example) on GitHub for a complete example dapp.
- When creating an invitation, you can add more rules and restrictions using [delegation scopes](/delegation-toolkit/development/guides/delegation/use-delegation-scopes) and [caveat enforcers](/delegation-toolkit/guides/delegation/use-delegation-scopes/constrain-scope.md).
- Learn more about [smart account implementations](/delegation-toolkit/development/guides/smart-accounts/create-smart-account).
- Learn more about [delegation types](/delegation-toolkit/development/concepts/delegation/#delegation-types).
