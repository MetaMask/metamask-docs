---
description: Get up to speed with MetaMask SDK using Wagmi to connect to MetaMask Extension and MetaMask Mobile.
sidebar_position: 4
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Create a React dapp with the SDK and Wagmi

This tutorial walks you through creating and integrating a simple React dapp with MetaMask SDK.
You'll configure the SDK using [Wagmi](https://wagmi.sh/), a popular third-party library.

Wagmi offers React hooks that simplify wallet connections, transactions, and network interactions
for Ethereum developers.
With the integrated MetaMask SDK, the setup is streamlined, eliminating extra dependencies.
The Metamask SDK connector in Wagmi allows developers to quickly build dapps that connect to
MetaMask in React with minimal friction.

## Scaffolding tools

You can start with either [Create Wagmi](https://wagmi.sh/cli/create-wagmi) (the path used in this
tutorial) or the Consensys [Create Web3 CLI](https://github.com/Consensys/create-web3-template?tab=readme-ov-file#create-web3-template-cli)
to scaffold out a basic ViteJS with React application, both of which will ensure that Viem and Wagmi
are adequately configured.

In this tutorial, you'll use Create Wagmi to configure a front-end app.
You can practice setting up MetaMask SDK and work out how it fits into the picture.

:::note Consensys Create Web3 CLI
The Consensys Create Web3 CLI might be useful for future web3 greenfield development, as it not only
generates a nearly identical front-end as Create Wagmi, but it also creates a monorepo (single
repository containing both a blockchain and a React web client) with MetaMask SDK already wired up
with a custom connect button.
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

This command will prompt you for a project name, you can use something simple like: `mmsdk-wagmi-tutorial`.
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

#### Review the Viem, Wagmi and MetaMask SDK configuration

In `src/main.tsx`, you can find the following `<WagmiProvider >` which takes a `config` and
`<QueryClientProvider >`, which even web2 developers will be familiar with.

`QueryClientProvider` comes from the `@tanstack/react-query` package, and wraps the application to
manage server-side data fetching, caching, and synchronization.
It helps you handle async data by providing a consistent way to fetch, cache, and update your data
across the app.
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

Focusing on the `WagmiProvider`, you get its config from the following import statement:

```typescript title="main.tsx"
import { config } from "./wagmi.ts"
```

`wagmi.ts` looks like the following:

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

declare module 'wagmi' {
  interface Register {
    config: typeof config
 }
}
```

Wagmi's default uses `mainnet` and `sepolia`, which are defined in the `chains` array.
Out of the box, they have also set up the `injected` wallet provider, `coinbaseWallet`, and `walletConnect`.

You'll replace these with the MetaMask connector for the purpose of this tutorial and testing MetaMask SDK.

### 2. Update the Wagmi configuration

Modify this configuration to focus on the Linea testnet and use the Metamask connector, which is
their built-in support for MetaMask SDK:

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
      `https://linea-sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_PROJECT_ID}`
    ),
  },
});
```

This configuration sets up the Wagmi library to connect to the Linea Sepolia testnet.

- `multiInjectedProviderDiscovery: false` disables automatic discovery of multiple injected wallets,
  streamlining the wallet selection process.
- `chains:` specifies that the dapp will connect to the Linea Sepolia network.
- `connectors:` uses MetaMask as the primary wallet, and includes some dapp metadata (name, URL, and
  icon) for a branded user experience.
- `dappMetadata: { name: }` ensures that when connecting to MetaMask Mobile, the managed connection
  will have a recognizable name.
- `transports:` configures HTTP transport to connect to the Linea Sepolia network using an Infura
  API key for reliable access to blockchain data.

This setup simplifies wallet integration and focuses on providing a smooth user experience while
working with Linea Sepolia.

You'll use an `InfuraAPIKey` to use the Infura network for this tutorial.
You can [create an API key](/developer-tools/dashboard/get-started/create-api) if you don't already have one.

### 3. Connect to MetaMask extension or Mobile

At this point, your dapp should run and both connect and disconnect from MetaMask.
Your connection experience will be similar to that of using the injected provider, as most web3
users are experienced with.

<p align="center">
  <video width="100%" controls>
    <source src="/sdk-connect-extension.mp4" />
  </video>
</p>

:::note
Currently, MetaMask SDK automatically connects to the MetaMask browser extension if it exists.
It does not show a QR code for linking to Metamask Mobile unless the MetaMask browser extension is
disabled or does not exist.

This functionality ensures the user is in control and can connect to either if they have both a
MetaMask Mobile and the MetaMask browser extension.
:::

To test the functionality for connecting to MetaMask Mobile, disconnect from the MetaMask browser
extension and disable MetaMask in your browser.
Simulate a new session with a hard refresh.
You'll see the QR code that can be used to connect to MetaMask Mobile when calling the `connect()`
method from the button.

<p align="center">
  <video width="100%" controls>
    <source src="/sdk-connect-mobile.mp4" />
  </video>
</p>

### 3. Configure the SDK

You can configure any [MetaMask JavaScript SDK options](../reference/sdk-js-options.md) within the
Wagmi configuration.

In `wagmi.ts`, create a variable named `sdkOptions`:

```typescript title="wagmi.ts"
const metaMaskSDKOptions = {
  infuraAPIKey: import.meta.env.VITE_INFURA_PROJECT_ID,
};
```

Pass that variable into the `metaMask()` function in `connectors` and spread its values using the `...` operator:

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

You can use the [`infuraAPIKey`](../reference/sdk-js-options.md#infuraapikey) option with MetaMask
SDK installed to [make direct, read-only JSON-RPC requests](../how-to/make-read-only-requests.md).

### 4. Use additional SDK options

You can configure any number of [SDK options](../reference/sdk-js-options.md) in the
`metaMaskSDKOptions` object to customize the behavior of the SDK.
In this section, you'll plug in options one by one to see how it affects the SDK.

<!-- #### Prefer the MetaMask Extension Over MetaMask Mobile

Since the default value is `false`, let's set this value to `true` and rerun our application.

```typescript
const metaMaskSDKOptions = {
 preferDesktop: true
};
```

By enabling this feature with a `true` value, when the MetaMask SDK displays a modal for connecting to MetaMask Mobile this option would prioritize installing MetaMask Extension while still having the option for connecting via QR code to Mobile. It is set to `false` as the default. If the user does not have a MetaMask extension, we want to give them the option to connect via Metamask Mobile with the least amount of clicks.

#### Enable or Disable Automatic use of MetaMask Extension if Detected

The default value is ``

```typescript
const metaMaskSDKOptions = {
 extensionOnly: true
};
```

By enabling this feature with a `true` value, there appears to be no change in how the MetaMask SDK behaves.............  -->

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

#### Use deeplinks to connect to MetaMask Mobile

Use [`useDeeplink`](../reference/sdk-js-options.md#usedeeplink) to enable or disable using deeplinks
to connect to MetaMask Mobile.
The default value is `false`.
Set this to `true` to use universal links instead:

```typescript
const metaMaskSDKOptions = {
  useDeeplink: true
};
```

Test your dapp on a mobile device using its native browser.

#### Map RPC URLs for read-only requests

Use [`readonlyRPCMap`](../reference/sdk-js-options.md#readonlyrpcmap) to map RPC URLS for
[read-only RPC requests](../how-to/make-read-only-requests.md).
This option should be used in conjunction with `infuraAPIKey` and `defaultReadOnlyChainId`.
Imagine that you want to make read-only requests to Mainnet (chain ID `0x1`) using the Infura API,
and read-only requests to the local testnet (chain ID 0x539) use a custom node.

`infuraAPIKey` provides access to various networks supported by Infura.
`readonlyRPCMap` allows access to custom nodes and overrides Infura networks in case of a conflict.

You can configure your dapp to make read-only requests using the Infura API, custom nodes, or both.
You've already seen an example of configuring your dapp to use the `infuraAPIKey`.

You can use both the Infura API and custom nodes to make read-only requests by specifying both
`infuraAPIKey` and `readonlyRPCMap` when instantiating the SDK in your dapp:

```typescript
const metaMaskSDKOptions = {
  infuraAPIKey: import.meta.env.VITE_INFURA_PROJECT_ID,
  readonlyRPCMap: {
    "0x539": "http://localhost:8545",
 }
};
```

### Conclusion

This tutorial walked you through generating a dapp using Create Wagmi, and configuring MetaMask SDK.
You explored how the SDK works within a React application with Viem and Wagmi, how it behaves out of
the box, and how to use various options to customize its behavior.
