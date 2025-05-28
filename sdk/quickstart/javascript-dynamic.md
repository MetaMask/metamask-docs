---
sidebar_label: Dynamic SDK integration
description: Quickstart guide for using MetaMask SDK and Dynamic SDK.
toc_max_heading_level: 2
---

# MetaMask SDK + Dynamic SDK integration

Get started with MetaMask SDK and [Dynamic SDK](https://docs.dynamic.xyz/introduction/welcome).
You can set up the SDKs in the following ways:

- [SDK CLI](#set-up-using-the-cli) - Use the CLI to scaffold a Next.js and Wagmi dapp with both SDKs.
- [Quickstart template](#set-up-using-a-template) - Clone the template to set up a Next.js and Wagmi dapp with both SDKs.
- [Manual setup](#set-up-manually) - Set up both SDKs in an existing dapp.

<p align="center">
  <img src={require("../_assets/quickstart-dynamic.png").default} alt="Dynamic SDK Quickstart" width="450px" />
</p>

Features include:

- **MetaMask SDK built into Dynamic** - Use MetaMask SDK features directly within the Dynamic SDK.
- **Wallet connection** - Connect to MetaMask wallet with enhanced features.
- **Mobile experience** - Optimized for both desktop and mobile users.
- **TypeScript support** - Full type safety and modern development experience.
- **Next.js integration** - Built with Next.js 14 and App Router.

:::note Project structure
The project you will set up has the following structure:

```text
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
:::

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed.
  The examples in this quickstart use [pnpm](https://pnpm.io/installation).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.
- A [Dynamic Environment ID](https://app.dynamic.xyz/).

## Set up using the CLI

1. Run the CLI command, replacing `<project-name>` with your project name:

    ```bash
    npx @consensys/create-web3-app <project-name>
    ```

2. Select the Dynamic Quickstart template:

    ```bash
    ? Please select the template you want to use: 
      Next.js Quickstart (MetaMask SDK Example) (Recommended) 
    ❯ MetaMask <-> Dynamic Quickstart
    ```

3. Select your preferred blockchain tooling if your project requires it:

    ```bash
    ? Would you like to include blockchain tooling? (Use arrow keys)
    ❯ HardHat 
      Foundry 
      None 
    ```

4. Select your preferred package manager.
    We recommend pnpm for speed and efficiency:

    ```bash
    ? Please select the package manager you want to use: 
      Yarn 
      NPM 
    ❯ pnpm 
    ```

5. Select to enter your Dynamic Environment ID in the command prompt:

    ```bash
    ? The selected template uses Dynamic.xyz. You'll need a Dynamic Environment ID 
    added to a .env file. Would you like to add it now? You can get one from 
    https://app.dynamic.xyz/dashboard/developer/api Yes
    ? Please paste your Dynamic Environment ID: 
    ```

5. The CLI will take a few minutes to set up your project.
    Once complete, you can run the project using the following command in `<project-name>/packages/site`:

    ```bash
    pnpm run dev
    ```

You've successfully set up MetaMask SDK and Dynamic SDK.
See how to [use the combined SDKs](#usage).

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

4. Create a `.env.local` file:

    ```bash
    touch .env.local
    ```

5. In `.env.local`, add a `NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID` environment variable, replacing `<YOUR-ENVIRONMENT-ID>` with your Dynamic Environment ID:

    ```text title=".env.local"
    NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID=<YOUR-ENVIRONMENT-ID>
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
