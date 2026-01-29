---
description: Quickstart guide for using MetaMask Connect with a JavaScript dapp.
sidebar_label: JavaScript
keywords: [connect, MetaMask, JavaScript, SDK, dapp, Wallet SDK]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Connect to MetaMask using JavaScript

Get started with MetaMask Connect in your JavaScript dapp.
You can [download the quickstart template](#set-up-using-a-template) or [manually set up MetaMask Connect](#set-up-manually) in an existing dapp.

<p align="center">
  <a href="https://metamask-javascript-demo.vercel.app/" target="_blank">
    <img src={require("../_assets/quickstart-javascript.png").default} alt="JavaScript SDK Quickstart" width="600px" class="appScreen" />
  </a>
</p>

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.
- An [Infura API key](/developer-tools/dashboard/get-started/create-api) from the MetaMask Developer dashboard.

## Set up using a template

1. Download the [MetaMask Connect JavaScript template](https://github.com/MetaMask/metamask-sdk-examples/tree/main/quickstarts/javascript):

   ```bash
   npx degit MetaMask/metamask-sdk-examples/quickstarts/javascript metamask-javascript
   ```

2. Navigate into the repository:

   ```bash
   cd metamask-javascript
   ```

    <details>
    <summary>Degit vs. Git clone</summary>
    <div>

   `degit` is a tool that enables cloning only the directory structure from a GitHub repository, without retrieving the entire repository.

   Alternatively, you can use `git clone`, which will download the entire repository.
   To do so, clone the MetaMask Connect examples repository and navigate into the `quickstarts/javascript` directory:

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

You've successfully set up MetaMask Connect.

## Set up manually

### 1. Install MetaMask Connect

Install MetaMask Connect in an existing JavaScript project:

```bash npm2yarn
npm install @metamask/connect-evm
```

### 2. Initialize MetaMask Connect

The following is an example of using MetaMask Connect for an EVM dapp in a JavaScript project:

```javascript
import { createEVMClient } from '@metamask/connect-evm'

const evmClient = createEVMClient({
  dapp: {
    name: 'Metamask Connect EVM Example',
    url: window.location.href,
    iconUrl: 'https://mydapp.com/icon.png', // Optional
  },
  api: {
    supportedNetworks: {
      'eip155:1': 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
      'eip155:11155111': 'https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY',
    },
  },
})
```

These examples configure MetaMask Connect with the following options:

- `dapp` - Ensures trust by showing your dapp's `name`, `url`, and `iconUrl` during connection.
- `api.supportedNetworks` - A map of caipChainIds -> RPC URLs for all networks supported by the app.

### 3. Connect and use provider

Connect to MetaMask and get the provider for RPC requests:

```javascript
const provider = evmClient.getProvider()

const accounts = await evmClient.connect()
console.log('Connected account:', accounts[0])

const result = await provider.request({
  method: 'eth_accounts',
  params: [],
})
console.log('eth_accounts result:', result)
```

`evmClient.connect()` handles cross-platform connection (desktop and mobile), including deeplinking.

Use `provider.request()` for arbitrary [JSON-RPC requests](../reference/json-rpc-api/index.md) like `eth_chainId` or `eth_getBalance`, or for [batching requests](../guides/metamask-exclusive/batch-requests.md) via `metamask_batch`.

## Common MetaMask Connect methods at a glance

| Method                                                                         | Description                                              |
| ------------------------------------------------------------------------------ | -------------------------------------------------------- |
| [`connect()`](../reference/methods.md#connect)                                 | Triggers wallet connection flow                          |
| [`connectAndSign({ msg: "..." })`](../reference/methods.md#connectandsign)     | Connects and prompts user to sign a message              |
| [`getProvider()`](../reference/methods.md#getprovider)                         | Returns the provider object for RPC requests             |
| [`provider.request({ method, params })`](../reference/provider-api.md#request) | Calls any Ethereum JSON‑RPC method                       |
| [Batched RPC](../guides/metamask-exclusive/batch-requests.md)                  | Use `metamask_batch` to group multiple JSON-RPC requests |

## Usage example

```javascript
// 1. Connect and get accounts
const accounts = await evmClient.connect()

// 2. Connect and sign in one step
const signResult = await evmClient.connectAndSign({
  msg: 'Sign in to the dapp',
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

## Live example

<iframe className="mt-6" width="100%" height="600px" frameBorder="0" src="https://stackblitz.com/github/MetaMask/metamask-sdk-examples/tree/main/quickstarts/javascript?ctl=1&embed=1&file=src%2Fmain.js&hideNavigation=1"></iframe>
