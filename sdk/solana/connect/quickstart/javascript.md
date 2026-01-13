---
description: Quickstart guide for using MM Connect with a JavaScript dapp.
sidebar_label: JavaScript
keywords: [connect, MetaMask, JavaScript, SDK, dapp, Wallet SDK]
---

# Connect to Solana using MM Connect

Get started with MM Connect in your JavaScript dapp.
You can [download the quickstart template](#set-up-using-a-template) or [manually set up MM Connect](#set-up-manually) in an existing dapp.

<!-- <p align="center">
  <a href="https://metamask-javascript-demo.vercel.app/" target="_blank">
    <img src={require("../_assets/quickstart-javascript.png").default} alt="JavaScript SDK Quickstart" width="600px" class="appScreen" />
  </a>
</p> -->

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.
- An [Infura API key](/developer-tools/dashboard/get-started/create-api) from the MetaMask Developer dashboard.

## Set up using a template

1. Download the [MM Connect JavaScript template](https://github.com/MetaMask/metamask-sdk-examples/tree/main/quickstarts/javascript):

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
   To do so, clone the MM Connect examples repository and navigate into the `quickstarts/javascript` directory:

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

You've successfully set up MM Connect.

## Set up manually

### 1. Install MM Connect

Install MM Connect in an existing JavaScript project:

```bash npm2yarn
npm install @metamask/connect/solana
```

### 2. Initialize MM Connect

The following are examples of using MM Connect in various JavaScript environments:

```javascript
import { createSolanaClient } from '@metamask/connect/solana'

const solanaClient = createSolanaClient({
  dapp: {
    name: 'Example JavaScript Solana dapp',
    url: window.location.href,
    iconUrl: 'https://mydapp.com/icon.png', // Optional
  },
  api: {
    supportedNetworks: {
      'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp:': 'https://api.devnet.solana.com',
    },
  },
})
```

These examples configure MM Connect with the following options:

- `dapp` - Ensures trust by showing your dapp's `name`, `url`, and `iconUrl` during connection.
- `api.supportedNetworks` - A map of caipChainIds -> RPC URLs for all networks supported by the app.

### 3. Connect and use provider

Connect to MetaMask and get the provider for RPC requests:

```javascript
const provider = solanaClient.getProvider()

const accounts = await solanaClient.connect()
console.log('Connected account:', accounts[0])

const result = await provider.request({
  method: 'solana_accounts',
  params: [],
})
console.log('solana_accounts result:', result)
```

`solanaClient.connect()` handles cross-platform connection (desktop and mobile), including deeplinking.

Use `provider.request()` for arbitrary [JSON-RPC requests](#) like `solana_chainId` or `solana_getBalance`, or for [batching requests](#) via `metamask_batch`.

## Common MM Connect methods at a glance

| Method                                      | Description                                              |
| ------------------------------------------- | -------------------------------------------------------- |
| [`connect()`](#)                            | Triggers wallet connection flow                          |
| [`connectAndSign({ msg: "..." })`](#)       | Connects and prompts user to sign a message              |
| [`getProvider()`](#)                        | Returns the provider object for RPC requests             |
| [`provider.request({ method, params })`](#) | Calls any Solana JSON‑RPC method                         |
| [Batched RPC](#)                            | Use `metamask_batch` to group multiple JSON-RPC requests |

## Usage example

```javascript
// 1. Connect and get accounts
const accounts = await solanaClient.connect()

// 2. Connect and sign in one step
const signResult = await solanaClient.connectAndSign({
  msg: 'Sign in to the dapp',
})

// 3. Get provider for RPC requests
const provider = solanaClient.getProvider()

// 4. Make an RPC request
const result = await provider.request({
  method: 'solana_accounts',
  params: [],
})
```

## Live example

<iframe className="mt-6" width="100%" height="600px" frameBorder="0" src="https://stackblitz.com/github/MetaMask/metamask-sdk-examples/tree/main/quickstarts/javascript?ctl=1&embed=1&file=src%2Fmain.js&hideNavigation=1"></iframe>
