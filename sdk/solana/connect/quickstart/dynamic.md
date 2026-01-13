---
sidebar_label: Dynamic SDK
description: Quickstart guide for using MM Connect and Dynamic SDK.
toc_max_heading_level: 3
keywords: [connect, MetaMask, Dynamic, SDK, dapp, Wallet SDK]
---

# Connect to Solana using Dynamic SDK

Get started with MM Connect and [Dynamic SDK](https://docs.dynamic.xyz/introduction/welcome).
You can use MM Connect features directly within Dynamic SDK.
You can [download the quickstart template](#set-up-using-a-template) or [manually set up MM Connects](#set-up-manually) in an existing dapp.

<!-- <p align="center">
  <a href="https://metamask-dynamic-demo.vercel.app/" target="_blank">
    <img src={require("../_assets/quickstart-dynamic.png").default} alt="Dynamic SDK Quickstart" width="600px" class="appScreen" />
  </a>
</p> -->

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.
- A [Dynamic Environment ID](https://app.dynamic.xyz/).

## Set up using a template

1. Download the [MM Connect + Dynamic SDK template](https://github.com/MetaMask/metamask-sdk-examples/tree/main/partners/dynamic):

   ```bash
   npx degit MetaMask/metamask-sdk-examples/partners/dynamic metamask-dynamic
   ```

2. Navigate into the repository:

   ```bash
   cd metamask-dynamic
   ```

    <details>
    <summary>Degit vs. Git clone</summary>
    <div>

   `degit` is a tool that enables cloning only the directory structure from a GitHub repository, without retrieving the entire repository.

   Alternatively, you can use `git clone`, which will download the entire repository.
   To do so, clone the MM Connect examples repository and navigate into the `partners/dynamic` directory:

   ```bash
   git clone https://github.com/MetaMask/metamask-sdk-examples
   cd metamask-sdk-examples/partners/dynamic
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

5. In `.env.local`, add a `NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID` environment variable, replacing `<YOUR-ENVIRONMENT-ID>` with your Dynamic Environment ID:

   ```text title=".env.local"
   NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=<YOUR-ENVIRONMENT-ID>
   ```

6. Run the project:

   ```bash
   pnpm dev
   ```

You've successfully set up MM Connect and Dynamic SDK.
See how to [use the combined SDKs](#usage).

## Set up manually

### 1. Install dependencies

Install MM Connect and the required dependencies to an existing project:

```bash npm2yarn
npm install @dynamic-labs/sdk-react-core @dynamic-labs/ethereum @dynamic-labs/wagmi-connector wagmi viem @tanstack/react-query
```

### 2. Configure providers

Set up your providers in `app/providers.tsx`:

```typescript title="providers.tsx"
"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { WagmiProvider } from "wagmi";
import { config } from "@/wagmi.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }: { children: React.ReactNode }) {

  const queryClient = new QueryClient();

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

Create a `.env.local` file.
In `.env.local`, add a `NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID` environment variable, replacing `<YOUR-ENVIRONMENT-ID>` with your Dynamic Environment ID:

```text title=".env.local"
NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=<YOUR-ENVIRONMENT-ID>
```

You can now test your dapp by running `pnpm run dev`.

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
4. Ensure MM Connect is properly initialized.

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
  - Check MetaMask mobile app installation.

## Live example

<iframe className="mt-6" width="100%" height="600px" frameBorder="0" src="https://stackblitz.com/github/MetaMask/metamask-sdk-examples/tree/main/partners/dynamic?ctl=1&embed=1&file=app%2Fproviders.tsx&hideNavigation=1"></iframe>
