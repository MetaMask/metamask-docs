---
description: Get up to speed with MetaMask SDK using Wagmi to connect to MetaMask Extension and MetaMask Mobile.
sidebar_position: 4
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Create a React dapp with SDK and Wagmi

This tutorial walks you through creating a simple JavaScript dapp and integrating it with our MetaMask SDK.

This tutorial focuses on the happy path of utilizing the MetaMask SDK which is the most widely way that developers are adopting use of the MetaMask SDK. So why [Wagmi](https://wagmi.sh/cli/why)?

Wagmi provides simple React hooks for Ethereum developers, making it easier to manage wallet connections, transactions, and network interactions. By using Wagmi in conjunction with the MetaMask SDK, developers can enjoy a streamlined setup without needing to manage additional dependencies, since our SDK is already integrated. This setup accelerates your ability to start building web3 applications with React, letting you focus on writing code quickly and efficiently with minimal friction.

## Scaffolding out a ViteJS plus React Application

You can start with either [Create Wagmi](https://wagmi.sh/cli/create-wagmi) (the path we will take in this tutorial) or use our Consensys [Create Web3 CLI](https://github.com/Consensys/create-web3-template?tab=readme-ov-file#create-web3-template-cli) to scaffold out a basic ViteJS with React application, both of which will ensure that Viem and Wagmi are configured properly allowing you to start previewing your web application immediately.

Create Wagmi is just going to configure a frontend app for you, which is great for us because then we can practice setting up the MetaMask SDK and starting to work out how it fits into the picture.

:::note
Using the Consensys Create Web3 CLI is an option that I would suggest for future web3 greenfield development as it not only generates a nearly identical frontend as Create Wagmi, but it creates a mono repo (single repository containing both a blockchain and a React web client) with the MetaMask SDK already wired up with a custom connect button.
:::

## Prerequisites

- [Node.js](https://nodejs.org/en/) version 20+
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) version 9+
- A text editor of your choice, such as [VS Code](https://code.visualstudio.com/).
- [MetaMask](https://metamask.io/) installed in the browser of your choice on your development machine.
- [React](https://react.dev/) Experience is suggested as we will be working with React with ViteJS.

## Steps

### 1. Set up the project

<Tabs>
  <TabItem value="pnpm" label="pnpm" default>

```bash
pnpm create wagmi --template vite-react
```

  </TabItem>
  <TabItem value="npm" label="npm" >

```bash
npm create wagmi@latest  --template vite-react
```

  </TabItem>
</Tabs>

This command will prompt you for a project name, we can use something simple to describe our demo: `mmsdk-wagmi-tutorial`. Once the CLI is finished, we can change directories into that project and install the node module dependencies:

<Tabs>
  <TabItem value="pnpm" label="pnpm" default>

```bash
cd mmsdk-wagmi-tutorial && pnpm install
```

  </TabItem>
  <TabItem value="npm" label="npm" >

```bash
cd mmsdk-wagmi-tutorial && npm install
```

  </TabItem>
</Tabs>

Launch the development server:

```bash
npm run dev
```

This displays a localhost URL in your terminal for easy access to launch in your browser:

```bash
> mmsdk-wagmi--create-wagmi--vite-react@0.0.0 dev
> vite


  VITE v5.4.9  ready in 1066 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

#### Reviewing the Viem, Wagmi and MetaMask SDK Configuration

If we dive into the `src/main.tsx` we can find the following `<WagmiProvider >` which takes a `config` and `<QueryClientProvider >` which even web2 developers will be familiar with.

`QueryClientProvider` comes from the `@tanstack/react-query` package and wraps your application to manage server-side data fetching, caching, and synchronization. It helps you handle async data by providing a consistent way to fetch, cache, and update your data across the app. For web3 developers, this means your dapp can smoothly manage blockchain data or API calls without needing to write custom state management logic.

A look at `main.tsx`:

```typescript
import { Buffer } from 'buffer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'

import App from './App.tsx'
import { config } from './wagmi.ts'

import './index.css'

globalThis.Buffer = Buffer

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

Focusing on the `WagmiProvider`, we get it's config from:

```typescript
import { config } from './wagmi.ts'
```

A look at `wgmi.ts`:

```typescript
import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
```

As we can see Wagmi's default uses `mainnet` and `sepolia` defined in the `chain`'s array. As well out of the box they have set up the `injected` wallet provider, `coinbaseWallet`, and `walletConnect`. 

The MetaMask SDK is our suggested alternative to using `walletConnect` and although we support builders deploying dapps that connect to a multitude of wallets

### 2. Update the Wagmi Config

Let's modify this configuration to focus on the Linea testnet and use the Metamask Connector which is their built-in support for the MetaMask SDK:

```typescript
import { http, createConfig } from "wagmi";
import { lineaSepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";

export const config = createConfig({
  multiInjectedProviderDiscovery: false,
  chains: [lineaSepolia],
  connectors: [
    metaMask({
      dappMetadata: {
        name: "MetaMask SDK + Wagmi Tutorial",
        url: "https://wagmi.io",
        iconUrl: "https://wagmi.io/favicon.ico",
      },
    }),
  ],
  transports: {
    [lineaSepolia.id]: http(
      `https://linea-sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_PROJECT_ID}`
    ),
  },
});
```

This configuration sets up the wagmi library to connect to the Linea Sepolia testnet.

- `multiInjectedProviderDiscovery: false` disables automatic discovery of multiple injected wallets, streamlining the wallet selection process.
- `chains:` specifies that the app will connect to the Linea Sepolia network.
- `connectors:` uses MetaMask as the primary wallet, and we include some dapp metadata in(name, URL, and icon) for a branded user experience.
- `dappMetadata: { name: }` ensures that when connecting to MetaMask Mobile that our managed connection will have a name that we recognize.
- `transports:` configures HTTP transport to connect to the Linea Sepolia network using an Infura project ID for reliable access to blockchain data.

This setup simplifies wallet integration and focuses on providing a smooth user experience while working with Linea Sepolia.

We do however need to get an Infura ID if we plan on utilizing the Infura network. While it is possible to develop without an Infura account, you would need to use a different provider or test with local networks like hardhat which is beyond the scope and this solution is used so that we can hit a real testnet and considering the ease of setting up an Infura account and getting an API key from your project dashboard.

### 3. Connecting to MetaMask Extension or Mobile

With this code in place our application should run and both connect and disconnect from MetaMask. Let's try it out and assume that you have [MetaMask](https://metamask.io/download/) or [MetaMask Flask](https://docs.metamask.io/snaps/get-started/install-flask/) installed as a browser extension. Your experience will be similar to using the injected provider as most web3 users are experienced with.

<p align="center">
  <video width="100%" controls>
    <source src="/sdk-connect-extension.mp4" />
  </video>
</p>

:::note
Currently the MetaMask SDK automatically connects to the MetaMask browser extension if it exists and does not show a QR code for connecting to Metamask Mobile unless the MetaMask browser extension is disabled or simply does not exist. In future versions of the SDK the user will get a modal that can be enabled that in one screen and one click can either connect to their browser extension if found or the MetaMask Mobile wallet if desired.

This functionality ensures the user is in control and has the option of connecting to either if they have both a MetaMask Mobile wallet and a browser extension version of MetaMask.
:::

To test the functionality for connecting to MetaMask Mobile, we need to disconnect from our browser extension and disable our MetaMask wallet in the browser. We will also simulate a new session with a hard refresh. Then we will see the QR code that can be used to connect to MetaMask Mobile when calling the `connect()` method from our button.

<p align="center">
  <video width="100%" controls>
    <source src="/sdk-connect-mobile.mp4" />
  </video>
</p>