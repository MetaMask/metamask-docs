---
title: "JavaScript Quickstart - MetaMask Connect EVM"
description: Set up MetaMask Connect EVM in a vanilla JavaScript dapp with createEVMClient, connect to wallets, and handle accounts and chain switching.
sidebar_label: JavaScript
keywords: [connect, MetaMask, JavaScript, SDK, dapp, Wallet SDK, vanilla javascript, createEVMClient, eth_requestAccounts, browser dapp, metamask integration tutorial]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Connect to MetaMask using JavaScript

Install `@metamask/connect-evm`, initialize a client with `createEVMClient`, and connect to the MetaMask wallet in under 5 minutes. MetaMask Connect EVM provides an EIP-1193 provider that works with viem, ethers.js, and web3.js, handles cross-platform connections (desktop extension, mobile QR code, and deeplinks), and persists sessions across page reloads.

[Download the quickstart template](#set-up-using-a-template) or [manually set up MetaMask Connect EVM](#set-up-manually) in an existing dapp.

<!-- <p align="center">
  <a href="https://metamask-javascript-demo.vercel.app/" target="_blank">
    <img src={require("../_assets/quickstart-javascript.png").default} alt="MetaMask Connect EVM JavaScript quickstart dapp interface" width="600px" class="appScreen" />
  </a>
</p> -->

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.
- An [Infura API key](/developer-tools/dashboard/get-started/create-api) from the MetaMask Developer dashboard.

## Set up using a template

1. Download the [MetaMask Connect JavaScript template](https://github.com/MetaMask/metamask-sdk-examples/tree/main/quickstarts/javascript):

   ```bash
   npx degit MetaMask/metamask-sdk-examples/quickstarts/javascript metamask-connect-javascript
   ```

2. Navigate into the repository:

   ```bash
   cd metamask-connect-javascript
   ```

    <details>
    <summary>Degit vs. Git clone</summary>
    <div>

   `degit` is a tool that enables cloning only the directory structure from a GitHub repository, without retrieving the entire repository.

   Alternatively, use `git clone` to download the entire repository.
   Clone the MetaMask Connect examples repository and navigate into the `quickstarts/javascript` directory:

   ```bash
   git clone https://github.com/MetaMask/metamask-sdk-examples
   cd metamask-sdk-examples/quickstarts/javascript
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

5. In `.env.local`, add a `VITE_INFURA_API_KEY` environment variable, replacing `<YOUR-API-KEY>` with your Infura API key:

   ```text title=".env.local"
   VITE_INFURA_API_KEY=<YOUR-API-KEY>
   ```

6. Run the project:

   ```bash
   pnpm dev
   ```

You've successfully set up MetaMask Connect EVM.

## Set up manually

### 1. Install MetaMask Connect EVM

Install MetaMask Connect EVM in an existing JavaScript project:

```bash npm2yarn
npm install @metamask/connect-evm
```

:::tip Bundler polyfill issues?
Some bundlers (Vite, Webpack 5) may need extra configuration for Node.js globals used by
transitive dependencies. See [Vite polyfill issues](../../troubleshooting/vite-polyfill-issues.md)
or [Webpack 5 polyfill issues](../../troubleshooting/webpack-polyfill-issues.md) if you run into
errors like `Buffer is not defined` or `process is not defined`.
:::

### 2. Initialize MetaMask Connect EVM

The following is an example of using MetaMask Connect EVM for an EVM dapp in a JavaScript project:

```javascript
import { createEVMClient, getInfuraRpcUrls } from '@metamask/connect-evm'

const evmClient = await createEVMClient({
  dapp: {
    name: 'MetaMask Connect EVM Example',
    url: window.location.href,
    iconUrl: 'https://mydapp.com/icon.png', // Optional
  },
  api: {
    supportedNetworks: {
      ...getInfuraRpcUrls('YOUR_INFURA_API_KEY'),
      '0x1': 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
      '0xaa36a7': 'https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY',
    },
  },
})
```

These examples configure MetaMask Connect EVM with the following options:

- `dapp` - Ensures trust by showing your dapp's `name`, `url`, and `iconUrl` during connection.
- `api.supportedNetworks` - A map of hex chain IDs to RPC URLs for all networks supported by the app.
  Use the `getInfuraRpcUrls` helper to generate URLs for all Infura-supported chains, or specify your own.

:::info `createEVMClient` is async
`createEVMClient` returns a promise. Always `await` it before using the client.
The client is a **singleton** -- calling `createEVMClient` again returns the same instance.
:::

### 3. Connect and use provider

Connect to MetaMask and get the provider for RPC requests:

```javascript
const provider = evmClient.getProvider()

try {
  const { accounts, chainId } = await evmClient.connect({
    chainIds: ['0x1', '0xaa36a7'],
  })
  console.log('Connected account:', accounts[0])
  console.log('Active chain:', chainId)
} catch (error) {
  if (error.code === 4001) {
    console.log('User rejected the connection request')
  } else if (error.code === -32002) {
    console.log('Connection request already pending')
  } else {
    console.error('Connection failed:', error)
  }
}

const balance = await provider.request({
  method: 'eth_getBalance',
  params: [accounts[0], 'latest'],
})
console.log('Balance:', balance)
```

`evmClient.connect()` handles cross-platform connection (desktop and mobile), including deeplinking.
Pass `chainIds` to request permission for specific chains (hex strings). Ethereum Mainnet (`0x1`)
is always included regardless of what you pass.

Use `provider.request()` for arbitrary [JSON-RPC requests](../reference/json-rpc-api/index.md) like `eth_chainId` or `eth_getBalance`, or for [batching requests](../guides/metamask-exclusive/batch-requests.md) via `metamask_batch`.

## Common MetaMask Connect EVM methods at a glance

| Method                                                                         | Description                                              |
| ------------------------------------------------------------------------------ | -------------------------------------------------------- |
| [`connect()`](../reference/methods.md#connect)                                 | Triggers wallet connection flow                          |
| [`connectAndSign({ message: "..." })`](../reference/methods.md#connectandsign) | Connects and prompts the user to sign a message          |
| [`getProvider()`](../reference/methods.md#getprovider)                         | Returns the provider object for RPC requests             |
| [`provider.request({ method, params })`](../reference/provider-api.md#request) | Calls any Ethereum JSON‑RPC method                       |
| [Batched RPC](../guides/metamask-exclusive/batch-requests.md)                  | Use `metamask_batch` to group multiple JSON-RPC requests |

## Usage example

```javascript
// 1. Connect and get accounts
const { accounts, chainId } = await evmClient.connect()

// 2. Connect and sign in one step
const signature = await evmClient.connectAndSign({
  message: 'Sign in to the dapp',
})

// 3. Get provider for RPC requests
const provider = evmClient.getProvider()

// 4. Make an RPC request
const result = await provider.request({
  method: 'eth_accounts',
  params: [],
})

// 5. Batch multiple RPC requests
const batchResults = await provider.request({
  method: 'metamask_batch',
  params: [{ method: 'eth_accounts' }, { method: 'eth_chainId' }],
})
```

<!-- ## Live example

<iframe className="mt-6" width="100%" height="600px" frameBorder="0" src="https://stackblitz.com/github/MetaMask/metamask-sdk-examples/tree/main/quickstarts/javascript?ctl=1&embed=1&file=src%2Fmain.js&hideNavigation=1"></iframe> -->

## Next steps

- [Manage user accounts](../guides/manage-user-accounts.md)
- [Send transactions](../guides/send-transactions/index.md)
- [Sign data](../guides/sign-data/index.md)
- [Use the Multichain SDK](../../multichain/quickstart/javascript.md) to connect to both EVM and Solana from a single session
- [Troubleshoot bundler polyfill issues](../../troubleshooting/index.md)
