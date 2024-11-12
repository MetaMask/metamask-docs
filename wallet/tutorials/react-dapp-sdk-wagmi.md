---
description: Create a React dapp using Wagmi to connect to the MetaMask extension and MetaMask Mobile.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Create a React dapp with the SDK and Wagmi

This tutorial walks you through creating and integrating a simple React dapp with MetaMask SDK.
You'll configure the SDK using [Wagmi](https://wagmi.sh/), a popular third-party library.

Wagmi offers React hooks that simplify wallet connections, transactions, and network interactions
for Ethereum developers.
The MetaMask SDK connector in Wagmi streamlines the setup, eliminating extra dependencies and
allowing developers to quickly build dapps that connect to MetaMask with minimal friction.

## Scaffolding tools

You can use [Create Wagmi](https://wagmi.sh/cli/create-wagmi) or the Consensys [Create Web3 CLI](https://github.com/Consensys/create-web3-template?tab=readme-ov-file#create-web3-template-cli)
to scaffold out a basic ViteJS with React application, both of which will ensure that Viem and Wagmi
are adequately configured.
This tutorial uses Create Wagmi.

:::note Consensys Create Web3 CLI
The Consensys Create Web3 CLI might be useful for future web3 development, as it not only generates
a nearly identical front-end as Create Wagmi, but it also creates a monorepo (single repository
containing both a blockchain and a React web client) with MetaMask SDK already wired up with a
custom connect button.
:::

## Prerequisites

- [Node.js](https://nodejs.org/en/) version 20+
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) version 9+
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- The [MetaMask extension](https://metamask.io/) or
  [MetaMask Flask](/developer-tools/dashboard/get-started/create-api) installed
- Basic knowledge of [React](https://react.dev/)

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

This command prompts you for a project name.
For example, use `mmsdk-wagmi-tutorial`.
Once the CLI is complete, change directories into that project and install the node module dependencies:

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

#### 1.1. Review the Viem, Wagmi, and MetaMask SDK configuration

In `src/main.tsx`, you can find the following `WagmiProvider` which takes a `config` and `QueryClientProvider`.

`QueryClientProvider` comes from the `@tanstack/react-query` package, and wraps the application to
manage server-side data fetching, caching, and synchronization.
It helps you handle asynchronous data by providing a consistent way to fetch, cache, and update your
data across the app.
For web3 developers, this means your dapp can smoothly manage blockchain data or API calls without
needing to write custom state management logic.

```typescript title="main.tsx"
import { Buffer } from "buffer"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import { WagmiProvider } from "wagmi"

import App from "./App.tsx"
import { config } from "./wagmi.ts"

import "./index.css"

globalThis.Buffer = Buffer

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

You get `WagmiProvider` configuration from the following import statement:

```typescript title="main.tsx"
import { config } from "./wagmi.ts"
```

And `wagmi.ts` looks like the following:

```typescript title="wagmi.ts"
import { http, createConfig } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors"

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

declare module "wagmi" {
  interface Register {
    config: typeof config
 }
}
```

Wagmi's default uses `mainnet` and `sepolia`, which are defined in the `chains` array.
Out of the box, they have also set up the `injected` wallet provider, `coinbaseWallet`, and `walletConnect`.

You'll replace these with the MetaMask connector for the purpose of this tutorial and testing MetaMask SDK.

### 2. Update the Wagmi configuration

Modify this configuration to target the Linea testnet and use the MetaMask connector, which is
Wagmi's built-in support for MetaMask SDK:

```typescript title="wagmi.ts"
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
      `https://linea-sepolia.infura.io/v3/<YOUR-API-KEY>`
    ),
  },
});
```

This configures Wagmi with the following options:

- `multiInjectedProviderDiscovery` disables automatic discovery of multiple injected wallets,
  streamlining the wallet selection process.
- `chains` specifies that the dapp will connect to the Linea Sepolia network.
- `connectors` uses MetaMask as the primary wallet, and includes some dapp metadata (name, URL, and
  icon) for a branded user experience.
- `transports` configures HTTP transport to connect to the Linea Sepolia network using an Infura
  API key for reliable access to blockchain data.
  [Create an API key](/developer-tools/dashboard/get-started/create-api) if you don't already have one.

This setup simplifies wallet integration and provides a smooth user experience while working with Linea Sepolia.

### 3. Connect to MetaMask extension or Mobile

At this point, your dapp displays, and you can connect to and disconnect from MetaMask.
Your connection experience will be similar to that of using the injected provider, as most web3
users are experienced with.

<p align="center">
  <video width="100%" controls>
    <source src="/sdk-connect-extension.mp4" />
  </video>
</p>

:::note
By default, MetaMask SDK automatically connects to the MetaMask browser extension if it exists.
It does not show a QR code for linking to MetaMask Mobile unless the MetaMask browser extension is
disabled or does not exist.
You can change this behavior by setting
[`extensionOnly`](../reference/sdk-js-options.md#extensiononly) to `false`.
:::

To test connecting to MetaMask Mobile, disconnect from the MetaMask browser extension and disable
MetaMask in your browser.
Refresh your browser to simulate a new session.
Now, when you select **Connect Wallet**, you'll see the QR code that you can use to connect to
MetaMask Mobile.

<p align="center">
  <video width="100%" controls>
    <source src="/sdk-connect-mobile.mp4" />
  </video>
</p>

### 3. Configure the SDK

You can configure any [MetaMask JavaScript SDK options](../reference/sdk-js-options.md) within the
Wagmi configuration.

In `wagmi.ts`, create a variable named `metaMaskSDKOptions`:

```typescript title="wagmi.ts"
const metaMaskSDKOptions = {
  infuraAPIKey: "<YOUR-API-KEY>",
};
```

:::note
You can use the [`infuraAPIKey`](../reference/sdk-js-options.md#infuraapikey) option to
[make direct, read-only JSON-RPC requests](../how-to/make-read-only-requests.md).
:::

Pass `metaMaskSDKOptions` into the `metaMask()` function in `connectors` and spread its values using
the `...` operator:

```typescript title="wagmi.ts"
connectors: [
  metaMask({
    dappMetadata: {
      name: "MetaMask SDK + Wagmi Tutorial",
      url: "https://wagmi.io",
      iconUrl: "https://wagmi.io/favicon.ico",
    },
    ...metaMaskSDKOptions,
  }),
],
```

### 4. Use additional SDK options

You can configure any number of [SDK options](../reference/sdk-js-options.md) in the
`metaMaskSDKOptions` object to customize the behavior of the SDK.
In this section, you'll plug in options one by one to see how it affects the SDK.

#### Immediately check if MetaMask is installed

Use [`checkInstallationImmediately`](../reference/sdk-js-options.md#checkinstallationimmediately) to
enable or disable immediately checking if MetaMask is installed in the user's browser.
The default value is `false`.
Set this to `true`:

```typescript title="wagmi.ts"
const metaMaskSDKOptions = {
  checkInstallationImmediately: true,
};
```

Disable the MetaMask extension and re-load your dapp.
When this option is enabled, the SDK immediately checks and notifies the user with a modal that they
can either install the MetaMask extension or connect to MetaMask Mobile using a QR code.

#### Check if MetaMask is installed before RPC requests

Use [`checkInstallationOnAllCalls`](../reference/sdk-js-options.md#checkinstallationonallcalls) to
enable or disable checking if MetaMask is installed before each JSON-RPC request.
The default value is `false`.
Set this to `true`:

```typescript title="wagmi.ts"
const metaMaskSDKOptions = {
  checkInstallationOnAllCalls: true
};
```

Disable the MetaMask extension and re-load your dapp.
Make a read-only RPC request without the `InfuraAPIKey`.
You'll see a similar modal as in the previous test, but it will notify the user upon making the RPC request.

#### Send anonymous analytics to MetaMask

Use [`enableDebug`](../reference/sdk-js-options.md#enabledebug) to enable or disable sending
anonymous analytics to MetaMask to help improve the SDK.
The default value is `true`.

```typescript
const metaMaskSDKOptions = {
  enableDebug: true
};
```

This setting does not transmit any sensitive data.
It only sends information that allows MetaMask to analyze and improve the behavior and core
functionality of the SDK.

#### Map RPC URLs for read-only requests

Use [`readonlyRPCMap`](../reference/sdk-js-options.md#readonlyrpcmap) to map RPC URLS for
[read-only RPC requests](../how-to/make-read-only-requests.md).
You can use this option in conjunction with [`infuraAPIKey`](../reference/sdk-js-options.md#infuraapikey)
and [`defaultReadOnlyChainId`](../reference/sdk-js-options.md#defaultreadonlychainid).

For example, you want to make read-only requests to Mainnet (chain ID `0x1`) using the Infura API,
and read-only requests to the local testnet (chain ID `0x539`) use a custom node.

`infuraAPIKey` provides access to various networks supported by Infura.
`readonlyRPCMap` allows access to custom nodes and overrides Infura networks in case of a conflict.
You can use both the Infura API and custom nodes to make read-only requests by specifying both options:

```typescript
const metaMaskSDKOptions = {
  infuraAPIKey: "<YOUR-API-KEY>",
  readonlyRPCMap: {
    "0x539": "http://localhost:8545",
  }
};
```

### Conclusion

This tutorial walked you through generating a dapp using Create Wagmi, and configuring MetaMask SDK.
You explored how the SDK works within a React application with Viem and Wagmi, how it behaves out of
the box, and how to use a few key options to customize its behavior.