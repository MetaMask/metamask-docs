---
sidebar_label: Dynamic SDK integration
description: MetaMask + Dynamic SDK Integration
toc_max_heading_level: 2
---

# MetaMask SDK + Dynamic SDK integration

Get started with MetaMask SDK and [Dynamic SDK](https://docs.dynamic.xyz/introduction/welcome).
You can [use the quickstart template](#set-up-using-a-template), which automatically sets up both SDKs with a [Next.js](https://nextjs.org/docs) and [Wagmi](https://wagmi.sh/) dapp.
You can also [manually set up the SDK](#set-up-manually) in an existing dapp.

Features include:

- **Dual SDK integration** - Seamlessly combine MetaMask and Dynamic SDKs.
- **Wallet connection** - Connect to MetaMask wallet with enhanced features.
- **Mobile experience** - Optimized for both desktop and mobile users.
- **TypeScript support** - Full type safety and modern development experience.
- **Next.js integration** - Built with Next.js 14 and App Router.

## Project structure

The project you will set up has the following structure:

```
├── app/
│   ├── providers.tsx # Main providers configuration
│   └── layout.tsx    # Root layout with providers
├── components/
│   ├── Navbar.tsx    # Navigation with wallet connection
│   └── Hero.tsx      # Hero section with wallet status
├── wagmi.config.ts   # Wagmi configuration
├── next.config.ts    # Next.js configuration
└── package.json      # Project dependencies
```

## Set up using a template

1. Download the [MetaMask SDK + Dynamic SDK template](https://github.com/MetaMask/metamask-dynamic):

    ```bash
    git clone https://github.com/MetaMask/metamask-dynamic
    ```

2. Navigate into the repository:

    ```bash
    cd metamask-dynamic
    ```

3. Install dependencies:

    ```bash
    pnpm install
    ```

4. Run the project:

    ```bash
    pnpm dev
    ```

You've successfully set up MetaMask SDK and Dynamic SDK.
See how to [use the combined SDKs](#usage).

## Set up manually

### 1. Install dependencies

Install the SDK and the required dependencies to an existing project:

```bash
pnpm i @dynamic-labs/sdk-react-core @dynamic-labs/ethereum @dynamic-labs/wagmi-connector wagmi viem @tanstack/react-query
```

### 2. Configure providers

Set up your providers in `app/providers.tsx`:

```typescript title="providers.tsx"
"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors, IEthereum } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { MetaMaskSDK } from "@metamask/sdk";
import { WagmiProvider } from "wagmi";
import { config } from "@/wagmi.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {

  const queryClient = new QueryClient();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const MMSDK = new MetaMaskSDK({
      dappMetadata: {
        name: "MetaMask Dynamic Integration",
        url: window.location.href,
      },
    });

    const ethereum = MMSDK.getProvider();
    if (ethereum) {
      window.ethereum = ethereum as unknown as IEthereum;
    }
  }, []);

  return (
    <DynamicContextProvider
      settings={{
        mobileExperience: "redirect",
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID!,
        walletConnectors: [EthereumWalletConnectors],
        appName: "MetaMask Dynamic Integration",
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
```

### 3. Set up environment variables

Create a `.env.local` file:

```text title=".env.local"
NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=your_dynamic_environment_id
```

## Usage

### Connect wallet

Use the Dynamic Widget in your components:

```typescript
"use client";

import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export const Navbar = () => {
  return (
    <nav>
      <DynamicWidget />
    </nav>
  );
};
```

### Check wallet status

Use the `useAccount` hook from Wagmi:

```typescript
"use client";

import { useAccount } from "wagmi";

export const Hero = () => {
  const { address, isConnected } = useAccount();

  return (
    <div>
      {isConnected ? (
        <p>Connected: {address}</p>
      ) : (
        <p>Not connected</p>
      )}
    </div>
  );
};
```

## Production readiness

Before deploying your project to production:

1. Update your `next.config.ts` with production domains.
2. Set up proper environment variables.
3. Configure your Dynamic SDK environment ID.
4. Ensure MetaMask SDK is properly initialized.

## Troubleshoot

Common issues and solutions include:

- **SDK initialization error:**
  - Ensure MetaMask is installed.
  - Check environment variables.
  - Verify network connectivity.
- **TypeScript errors:**
  - Update type definitions.
  - Check SDK versions compatibility.
- **Mobile experience issues:**
  - Test on actual mobile devices.
  - Verify redirect URLs.
  - Check MetaMask Mobile installation.
