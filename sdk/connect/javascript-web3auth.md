---
sidebar_label: Embedded Wallets SDK
description: Quickstart guide for using MetaMask SDK and Embedded Wallets SDK.
toc_max_heading_level: 3
keywords: [connect, MetaMask, Embedded Wallets, SDK, dapp, Wallet SDK]
---

# Connect to MetaMask using Embedded Wallets SDK

Get started with MetaMask SDK and [Embedded Wallets SDK (previously Web3Auth)](/embedded-wallets),
enabling users to sign in with an email or social media account.
You can use MetaMask SDK features directly within Embedded Wallets SDK.
You can [download the quickstart template](#set-up-using-a-template) or [manually set up the SDKs](#set-up-manually) in an existing dapp.

<p align="center">
  <a href="https://metamask-web3auth-demo.vercel.app/" target="_blank">
    <img src={require("../_assets/quickstart-web3auth.png").default} alt="Web3Auth SDK Quickstart" width="600px" class="appScreen" />
  </a>
</p>

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

   Alternatively, you can use `git clone`, which will download the entire repository.
   To do so, clone the MetaMask SDK examples repository and navigate into the `partners/web3auth` directory:

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

Install the SDK and the required dependencies to an existing project:

```bash npm2yarn
npm install viem wagmi @tanstack/react-query @web3auth/modal@10
```

### 2. Configure providers

Set up your providers in `app/providers.tsx`:

```typescript title="providers.tsx"
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState } from "react";
import { Web3AuthProvider } from "@web3auth/modal/react";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Web3AuthProvider
      config={{
        web3AuthOptions: {
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
          web3AuthNetwork: "sapphire_devnet"
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider>
          <div className="container">{children}</div>
        </WagmiProvider>
      </QueryClientProvider>
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

You can now test your dapp by running `pnpm run dev`.

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
      <button onClick={() => connect()}>Connect or Sign in</button>;
    </nav>
  );
};
```

### Check wallet status

Use the `useAccount` hook from Wagmi to check the wallet status:

```typescript
"use client";

import { useAccount } from "wagmi";

export const Hero = () => {
  const { address, isConnected } = useAccount();

  return (
    <div>
      {isConnected ? <p>Connected: {address}</p> : <p>Not connected</p>}
    </div>
  );
};
```

### Send a transaction

Use the `useSendTransaction` hook from Wagmi to send a transaction:

```typescript
"use client";

import { useSendTransaction } from "wagmi";
import { parseEther } from "viem";

export const SendTransaction = () => {
  const { sendTransaction } = useSendTransaction();

  return (
    <button
      onClick={() =>
        sendTransaction({
          to: "0xd2135CfB216b74109775236E36d4b433F1DF507B",
          value: parseEther("0.001"),
        })
      }
    >
      Send transaction
    </button>
  );
};
```

## Live example

<iframe className="mt-6" width="100%" height="600px" frameBorder="0" src="https://stackblitz.com/github/MetaMask/metamask-sdk-examples/tree/main/partners/web3auth?ctl=1&embed=1&file=app%2Fproviders.tsx&hideNavigation=1"></iframe>
