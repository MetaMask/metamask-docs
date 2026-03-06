---
description: Quickstart guide for using MetaMask Connect Solana with a JavaScript dapp.
sidebar_label: JavaScript
keywords: [connect, MetaMask, JavaScript, SDK, dapp, Wallet SDK]
---

# Connect to Solana using MetaMask Connect Solana

This quickstart gets you up and running with MetaMask Connect Solana in a JavaScript dapp.
[Download the template](#set-up-using-a-template) to start quickly, or [set up manually](#set-up-manually) in an existing project.

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

You've successfully set up MetaMask Connect Solana.

## Set up manually

### 1. Install MetaMask Connect Solana

Install MetaMask Connect Solana in an existing JavaScript project:

```bash npm2yarn
npm install @metamask/connect-solana
```

### 2. Initialize MetaMask Connect Solana

The following examples show how to use MetaMask Connect Solana in various JavaScript environments:

```javascript
import { createSolanaClient } from '@metamask/connect-solana'

const solanaClient = await createSolanaClient({
  dapp: {
    name: 'Example JavaScript Solana dapp',
    url: window.location.href,
    iconUrl: 'https://mydapp.com/icon.png', // Optional
  },
  api: {
    supportedNetworks: {
      devnet: 'https://solana-devnet.infura.io/v3/YOUR_INFURA_API_KEY',
    },
  },
})
```

:::info
`createSolanaClient` is async and uses a singleton multichain core under the hood.
Calling it multiple times returns the same underlying session, so you can safely call it during
initialization without worrying about duplicate connections.
:::

These examples configure MetaMask Connect Solana with the following options:

- `dapp` - Ensures trust by showing your dapp's `name`, `url`, and `iconUrl` during connection.
- `api.supportedNetworks` - A map of network names (`mainnet`, `devnet`, `testnet`) to RPC URLs for all networks supported by the app.

### 3. Connect and use the wallet

Get the [Wallet Standard](https://github.com/wallet-standard/wallet-standard) wallet instance and connect:

```javascript
const wallet = solanaClient.getWallet()

const { accounts } = await wallet.features['standard:connect'].connect()
console.log('Connected account:', accounts[0].address)
```

The client handles cross-platform connection (desktop and mobile), including deeplinking.

## `SolanaClient` methods at a glance

| Method             | Description                                                                          |
| ------------------ | ------------------------------------------------------------------------------------ |
| `getWallet()`      | Returns a [Wallet Standard](https://github.com/wallet-standard/wallet-standard) compatible wallet instance |
| `registerWallet()` | Registers MetaMask with the Wallet Standard registry (no-op if auto-registered)      |
| `disconnect()`     | Disconnects Solana scopes without terminating the broader multichain session          |

## Usage example

```javascript
const wallet = solanaClient.getWallet()

// 1. Connect and get accounts
try {
  const { accounts } = await wallet.features['standard:connect'].connect()
  console.log('Connected:', accounts[0].address)

  // 2. Sign a message
  const message = new TextEncoder().encode('Hello from my dapp')
  const [{ signature }] = await wallet.features['solana:signMessage'].signMessage({
    account: accounts[0],
    message,
  })
  console.log('Signature:', signature)
} catch (err) {
  if (err.code === 4001) {
    console.log('User rejected the request')
  } else if (err.code === -32002) {
    console.log('A request is already pending — check MetaMask')
  } else {
    console.error('Unexpected error:', err)
  }
}

// 3. Disconnect
await solanaClient.disconnect()
```

## Live example

<iframe className="mt-6" width="100%" height="600px" frameBorder="0" src="https://stackblitz.com/github/MetaMask/metamask-sdk-examples/tree/main/quickstarts/javascript?ctl=1&embed=1&file=src%2Fmain.js&hideNavigation=1"></iframe>
