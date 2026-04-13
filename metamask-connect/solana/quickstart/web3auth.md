---
title: 'Web3Auth Embedded Wallets - MetaMask Connect Solana'
sidebar_label: Embedded Wallets SDK
description: Integrate MetaMask with Web3Auth Embedded Wallets SDK for Solana, enabling email and social login alongside MetaMask wallet support.
toc_max_heading_level: 3
keywords:
  [
    connect,
    MetaMask,
    Embedded Wallets,
    SDK,
    dapp,
    Wallet SDK,
    web3auth solana,
    embedded wallet,
    seedless,
    social login,
  ]
---

:::info Heads up
You've landed on a guide that still uses the MetaMask legacy SDK (`@metamask/sdk`).
The MetaMask Connect integration for this library is coming soon. Once ready, it will be linked
from the sidebar navigation. In the meantime, this guide is still valid if you're using
MetaMask SDK.
:::

# Connect to Solana using Embedded Wallets SDK

This quickstart gets you up and running with MetaMask SDK inside [Embedded Wallets SDK (previously Web3Auth)](/embedded-wallets), enabling users to sign in with an email or social media account.
[Download the template](#set-up-using-a-template) to start quickly, or [set up the SDKs manually](#set-up-manually) in an existing project.

<!-- <p align="center">
  <a href="https://metamask-web3auth-demo.vercel.app/" target="_blank">
    <img src={require("../_assets/quickstart-web3auth.png").default} alt="MetaMask Connect Solana with Web3Auth embedded wallet login interface" width="600px" class="appScreen" />
  </a>
</p> -->

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.
- A [Web3Auth Client ID](/embedded-wallets/dashboard/#get-the-client-id).

## Set up using a template

1. Download the [MetaMask SDK + Web3Auth SDK template](https://github.com/MetaMask/metamask-sdk-examples/tree/main/partners/web3auth):

   ```bash
   npx degit MetaMask/metamask-sdk-examples/partners/web3auth metamask-web3auth
   ```

2. Navigate into the repository:

   ```bash
   cd metamask-web3auth
   ```

    <details>
    <summary>Degit vs. Git clone</summary>
    <div>

   `degit` is a tool that enables cloning only the directory structure from a GitHub repository, without retrieving the entire repository.

   Alternatively, use `git clone` to download the entire repository.
   Clone the MetaMask SDK examples repository and navigate into the `partners/web3auth` directory:

   ```bash
   git clone https://github.com/MetaMask/metamask-sdk-examples
   cd metamask-sdk-examples/partners/web3auth
   ```

    </div>
    </details>

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Create a `.env.local` file:

   ```bash
   touch .env.local
   ```

5. In `.env.local`, add a `NEXT_PUBLIC_WEB3AUTH_CLIENT_ID` environment variable, replacing `<YOUR-CLIENT-ID>` with your Web3Auth Client ID:

   ```text title=".env.local"
   NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=<YOUR-CLIENT-ID>
   ```

6. Run the project:

   ```bash
   pnpm dev
   ```

You've successfully set up MetaMask SDK and MetaMask Embedded Wallets.
See how to [use Embedded Wallets](#usage).

## Set up manually

### 1. Install dependencies

Install Embedded Wallets SDK and Solana web3.js:

```bash npm2yarn
npm install @web3auth/modal@10 @solana/web3.js
```

### 2. Configure providers

Set up your providers in `app/providers.tsx` with Solana chain configuration:

```typescript title="providers.tsx"
"use client";

import { type ReactNode } from "react";
import { Web3AuthProvider } from "@web3auth/modal/react";

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  return (
    <Web3AuthProvider
      config={{
        web3AuthOptions: {
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
          web3AuthNetwork: "sapphire_devnet",
          chainConfig: {
            chainNamespace: "SOLANA",
            chainId: "0x3",
            rpcTarget: "https://api.devnet.solana.com",
            displayName: "Solana Devnet",
            blockExplorerUrl: "https://explorer.solana.com/?cluster=devnet",
            ticker: "SOL",
            tickerName: "Solana",
            logo: "https://images.toruswallet.io/solana.svg",
          },
        },
      }}
    >
      <div className="container">{children}</div>
    </Web3AuthProvider>
  );
}
```

### 3. Set up environment variables

Create a `.env.local` file.
In `.env.local`, add a `NEXT_PUBLIC_WEB3AUTH_CLIENT_ID` environment variable, replacing `<YOUR-CLIENT-ID>` with your Web3Auth Client ID:

```text title=".env.local"
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=<YOUR-CLIENT-ID>
```

Test your dapp by running `pnpm run dev`.

## Usage

### Connect or sign in

Use the `useWeb3AuthConnect` hook to enable users to connect or sign in to their wallet:

```typescript
"use client";

import { useWeb3AuthConnect } from "@web3auth/modal/react";

export const Navbar = () => {
  const { connect } = useWeb3AuthConnect();

  return (
    <nav>
      <button onClick={() => connect()}>Connect or Sign in</button>
    </nav>
  );
};
```

### Check wallet status

Use the `useSolanaWallet` hook to access the Solana wallet state:

```typescript
"use client";

import { useSolanaWallet } from "@web3auth/modal/react/solana";

export const WalletStatus = () => {
  const { address, connected } = useSolanaWallet();

  return (
    <div>
      {connected ? <p>Connected: {address}</p> : <p>Not connected</p>}
    </div>
  );
};
```

### Sign a message

Use the `useSignMessage` hook to request a signed message:

```typescript
"use client";

import { useSignMessage } from "@web3auth/modal/react/solana";

export const SignMessage = () => {
  const { signMessage, isPending } = useSignMessage();

  const handleSign = async () => {
    try {
      const message = new TextEncoder().encode("Hello from Solana!");
      const signature = await signMessage(message);
      console.log("Signature:", signature);
    } catch (err) {
      console.error("Error signing message:", err);
    }
  };

  return (
    <button onClick={handleSign} disabled={isPending}>
      {isPending ? "Signing..." : "Sign message"}
    </button>
  );
};
```

### Send a transaction

Use the `useSignAndSendTransaction` hook to sign and send a Solana transaction:

```typescript
"use client";

import { useSignAndSendTransaction } from "@web3auth/modal/react/solana";
import { Transaction, SystemProgram, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

export const SendTransaction = () => {
  const { signAndSendTransaction, isPending } = useSignAndSendTransaction();

  const handleSend = async () => {
    try {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey("YOUR_PUBLIC_KEY"),
          toPubkey: new PublicKey("DESTINATION_PUBLIC_KEY"),
          lamports: 0.01 * LAMPORTS_PER_SOL,
        })
      );

      const signature = await signAndSendTransaction(transaction);
      console.log("Transaction signature:", signature);
    } catch (err) {
      console.error("Error sending transaction:", err);
    }
  };

  return (
    <button onClick={handleSend} disabled={isPending}>
      {isPending ? "Sending..." : "Send 0.01 SOL"}
    </button>
  );
};
```

## Live example

<iframe className="mt-6" width="100%" height="600px" frameBorder="0" src="https://stackblitz.com/github/MetaMask/metamask-sdk-examples/tree/main/partners/web3auth?ctl=1&embed=1&file=app%2Fproviders.tsx&hideNavigation=1"></iframe>

## Next steps

- [Send a legacy transaction](../guides/send-legacy-transaction.md) to transfer SOL using MetaMask Connect.
- [Sign in with Solana (SIWS)](../guides/sign-data/siws.md) to authenticate users with their wallet instead of a username and password.
- [MetaMask Connect Solana methods](../reference/methods.md) for the full API reference.
