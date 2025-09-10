---
title: Create a social invite link
image: 'img/tutorials/tutorials-banners/create-invite-link.png'
description: Allow users to refer their friends to your dapp using an invite link.
tags: [delegation toolkit, embedded wallets, social, invite, referral, link]
date: Sep 8, 2025
author: MetaMask Developer Relations
---

This tutorial walks you through creating an invite link to enable users to refer their friends to your dapp with minimal friction.

For example, Alice (the inviter) wants Bob (the invitee) to try out your dapp.
She sends him a link that allows him to claim 0.001 ETH from her wallet within a time limit.
Bob can start using your dapp right away, without installing a wallet or paying gas fees.

You'll enable this by adding an [embedded wallet](/embedded-wallets) for instant onboarding, creating a [MetaMask smart account](/delegation-toolkit/concepts/smart-accounts) to create and redeem an invitation, and creating an [open delegation](/delegation-toolkit/concepts/delegation) to represent an invitation.

## Prerequisites

- Install [Node.js](https://nodejs.org/en/blog/release/v18.18.0) v18 or later.
- Install [Yarn](https://yarnpkg.com/),
    [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), or another package manager.
- Get a [Client ID](/embedded-wallets/dashboard) from the Embedded Wallets (Web3Auth) dashboard.
- [Create a Pimlico API key](https://docs.pimlico.io/guides/create-api-key#create-api-key).
  :::note
  This tutorial uses Pimlico's paymaster, but you can use any paymaster of your choice.
  :::
 
## Steps

### 1. Install the Delegation Toolkit

Install the [MetaMask Delegation Toolkit](https://www.npmjs.com/package/@metamask/delegation-toolkit) and [Embedded Wallets (Web3Auth)](/embedded-wallets/) in your project:

```bash npm2yarn
npm install @metamask/delegation-toolkit @web3auth/modal
```

### 2. Set up Embedded Wallets (Web3Auth)

Configure Embedded Wallets (Web3Auth) to enable users to instantly connect to your dapp using familiar login methods, like social accounts or email.

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

### 3. Create Viem clients

1. Create a [Viem Public Client](https://viem.sh/docs/clients/public) using Viem's `createPublicClient` function.
   You will configure a smart account and Bundler Client with the Public Client, which you can use to query the signer's account state and interact with the blockchain network.

    ```tsx
    import { createPublicClient, http } from 'viem';
    import { sepolia as chain } from 'viem/chains';

    const publicClient = createPublicClient({
      chain,
      transport: http(),
    });
    ```

2. Create a [Viem Paymaster Client](https://viem.sh/account-abstraction/clients/paymaster) using Viem's `createPaymasterClient` function.
    This client interacts with the paymaster service.
    Replace `<YOUR-API-KEY>` with your Pimlico API key:

    ```tsx
    import { createPaymasterClient } from 'viem/account-abstraction';

    const paymasterClient = createPaymasterClient({
      transport: http('https://api.pimlico.io/v2/11155111/rpc?apikey=<YOUR-API-KEY>'),
    });
    ```

3. Create a [Viem Bundler Client](https://viem.sh/account-abstraction/clients/bundler) using Viem's `createBundlerClient` function.
   Pass the `paymasterClient` to the `paymaster` property.
   You can use the bundler service to estimate gas for user operations and submit transactions to the network.

    ```tsx
    import { createBundlerClient } from 'viem/account-abstraction';

    const bundlerClient = createBundlerClient({
      client: publicClient,
      transport: http('https://your-bundler-rpc.com'),
      paymaster: paymasterClient,
    });
    ```

### 4. Create a smart account

1. Create an account in order to create and redeem an invitation.
   This account will create a delegation, and must be a [MetaMask smart account](/delegation-toolkit/concepts/smart-accounts).
   This example uses a [Hybrid smart account](/delegation-toolkit/development/guides/smart-accounts/create-smart-account/#create-a-hybrid-smart-account), which is a flexible smart account implementation that supports both an externally owned account (EOA) owner and any number of passkey (WebAuthn) signers.

    ```tsx
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

2. Deploy the smart account by sending a user operation:

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

3. Fund the deployed smart account with some Sepolia ETH to enable the invitee to spend funds when they redeem the invitation.

    :::note
    You can use the [MetaMask faucet](/developer-tools/faucet) to get Sepolia ETH.
    :::

### 5. Create an invitation

1. Create an [open root delegation](/delegation-toolkit/concepts/delegation) to represent an invitation.
   A root delegation is the first delegation in a chain of delegations, and an open root delegation grants permission to any account.
   In this example, the inviter creates an invitation that can be redeemed by any invitee, allowing the invitee to spend up to 0.001 ETH.

    ```ts
    import { createOpenDelegation, getDelegatorEnvironment } from '@metamask/delegation-toolkit';
    import { sepolia as chain } from 'viem/chains';

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

2. Sign the delegation to enable the invitee to redeem it in the future:

    ```tsx
    const signature = await smartAccount.signDelegation({
      delegation,
    })

    const signedDelegation = {
      ...delegation,
      signature,
    }
    ```

3. Encode the delegation into a shareable URL:

    ```tsx
    export function encodeDelegation(delegation: Delegation): string {
      const delegationJson = JSON.stringify(delegation);
      return Buffer.from(delegationJson, 'utf-8').toString('base64');
    }

    const encoded = encodeDelegation(signedDelegation);

    const url = new URL(window.location.href);
    url.searchParams.set("delegation", encoded);
    const shareableUrl = url.toString();
    ```

The inviter can now share the URL with anyone.

### 6. Redeem the invitation

1. When the invitee opens the shared URL, decode the delegation:

    ```tsx
    const urlParams = new URLSearchParams(window.location.search);
    const encodedDelegation = urlParams.get('delegation');

    export function decodeDelegation(encodedDelegation: string): Delegation {
      const decodedDelegationJson = Buffer.from(encodedDelegation, 'base64').toString('utf-8');
      return JSON.parse(decodedDelegationJson) as Delegation;
    }

    const decodedDelegation = decodeDelegation(encodedDelegation);
    ```

2. [Redeem the delegation](/delegation-toolkit/development/guides/delegation/execute-on-smart-accounts-behalf/#7-redeem-the-delegation) by submitting a user operation from the smart account created in [Step 4](#4-create-a-smart-account) to the `DelegationManager` contract.
   The delegation manager validates the delegation and executes delegated actions.
   In this case, the invitee can spend up to 0.001 ETH when using your dapp.

    ```ts
    import { createExecution, getDeleGatorEnvironment, ExecutionMode } from '@metamask/delegation-toolkit';
    import { DelegationManager } from '@metamask/delegation-toolkit/contracts';
    import { zeroAddress } from 'viem';

    const delegations = [decodedDelegation];

    const executions = createExecution({ target: zeroAddress });

    const redeemDelegationCalldata = DelegationManager.encode.redeemDelegations({
      delegations: [delegations],
      modes: [ExecutionMode.SingleDefault],
      executions: [executions]
    });

    const userOperationHash = await bundlerClient.sendUserOperation({
      account: smartAccount,
      calls: [
        {
          to: smartAccount.address,
          data: redeemDelegationCalldata,
        },
      ],
      maxFeePerGas: 1n,
      maxPriorityFeePerGas: 1n,
    });
    ```

## Next steps

- When creating an invitation, you can add more rules and restrictions using [delegation scopes](/delegation-toolkit/development/guides/delegation/use-delegation-scopes) and [caveat enforcers](/delegation-toolkit/development/guides/delegation/use-delegation-scopes/refine-scope).
- Learn more about [smart account implementations](/delegation-toolkit/development/guides/smart-accounts/create-smart-account).
- Learn more about [delegation types](/delegation-toolkit/development/concepts/delegation/#delegation-types).
