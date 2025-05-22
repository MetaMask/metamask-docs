---
sidebar_label: Web3Auth SDK integration
description: MetaMask + Web3Auth SDK Integration
toc_max_heading_level: 2
---

# MetaMask SDK + Web3Auth SDK integration

Get started with MetaMask SDK and [Web3Auth SDK](https://web3auth.io/docs/).
You can set up the SDKs in the following ways:

- [Quickstart template](#set-up-using-a-template) - Clone the template to set up a Next.js and Web3Auth dapp with both SDKs.
- [Manual setup](#set-up-manually) - Set up both SDKs in an existing dapp.

Features include:

- **Dual SDK integration** - Seamlessly combine MetaMask and Web3Auth SDKs.
- **Web3Auth social login** - Enable users to sign in with an email or social media account.
- **Wallet connection** - Connect to MetaMask wallet with enhanced features.
- **Mobile experience** - Optimized for both desktop and mobile users.
- **TypeScript support** - Full type safety and modern development experience.
- **Next.js integration** - Built with Next.js 15 and App Router.

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed.
  The examples in this quickstart use [pnpm](https://pnpm.io/installation).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.
- A [Web3Auth Client ID](https://web3auth.io/docs/dashboard-setup/projects-and-analytics#client-id).

## Set up using a template

1. Download the template from the
    <a href="https://github.com/metamask/metamask-sdk-examples" target="_blank">SDK examples repository</a>:

    ```bash
    git clone https://github.com/metamask/metamask-sdk-examples.git
    ```

2. Navigate into the Web3Auth example:

    ```bash
    cd metamask-sdk-examples/examples/metamask-web3auth
    ```

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

You've successfully set up MetaMask SDK and Web3Auth SDK.
See how to [use the combined SDKs](#usage).

## Set up manually

### 1. Install dependencies

Install the SDK and the required dependencies to an existing project:

```bash
pnpm i viem wagmi @tanstack/react-query @web3auth/modal@10
```

### 2. Configure providers

Set up your providers in `app/providers.tsx`:

```typescript title="providers.tsx"
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState, useEffect } from "react";
import { Web3AuthProvider } from "@web3auth/modal/react";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";
import { MetaMaskSDK } from "@metamask/sdk";

type Props = {
  children: ReactNode;
};

export function Providers({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const MMSDK = new MetaMaskSDK({
      dappMetadata: {
        name: "MetaMask Web3Auth Integration",
        url: window.location.href,
      },
    });

    const ethereum = MMSDK.getProvider();
    if (ethereum) {
      window.ethereum = ethereum as unknown as IEthereum;
    }
  }, []);

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
