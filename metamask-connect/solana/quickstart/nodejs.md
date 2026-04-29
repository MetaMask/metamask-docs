---
title: 'Node.js Quickstart - MetaMask Connect Solana'
description: Set up MetaMask Connect Solana in a Node.js application using createSolanaClient with the multichain core for connecting, signing, and sending Solana transactions.
sidebar_label: Node.js
keywords:
  [
    connect,
    MetaMask,
    Node.js,
    Solana,
    SDK,
    CLI,
    server-side,
    createSolanaClient,
    invokeMethod,
    signMessage,
    QR code,
    node quickstart,
  ]
---

# Connect to Solana - Node.js quickstart

Get started with MetaMask Connect Solana in a Node.js application.
The SDK displays a QR code in the terminal that you scan with the MetaMask mobile app to establish a connection.

:::info Wallet Standard is browser-only
[Wallet Standard](https://github.com/wallet-standard/wallet-standard) features (`getWallet`,
`wallet.features[...]`) are designed for browser environments.
In Node.js, use the multichain core directly via `client.core.connect` and
`client.core.invokeMethod` to interact with Solana.
:::

## Prerequisites

- [Node.js](https://nodejs.org/) version 20 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/installation).
- The [MetaMask mobile app](https://metamask.io/download/) installed on your phone.
- An [Infura API key](/developer-tools/dashboard/get-started/create-api) from the MetaMask Developer dashboard.

## Steps

### 1. Install MetaMask Connect Solana

Install the Solana client in an existing Node.js project:

```bash npm2yarn
npm install @metamask/connect-solana
```

### 2. Initialize MetaMask Connect Solana

Create a file (`index.mjs`) and initialize the client using [`createSolanaClient`](../reference/methods.md#createsolanaclient).
In Node.js, there is no `window.location`, so you must set `dapp.url` explicitly.
The `supportedNetworks` map uses network names (`mainnet`, `devnet`) as keys:

```javascript title="index.mjs"
import { createSolanaClient, getInfuraRpcUrls } from '@metamask/connect-solana'

const SOLANA_MAINNET = 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'

const solanaClient = await createSolanaClient({
  dapp: {
    name: 'My Node.js Solana App',
    url: 'https://myapp.com',
  },
  api: {
    supportedNetworks: getInfuraRpcUrls({
      infuraApiKey: 'YOUR_INFURA_API_KEY',
      networks: ['mainnet'],
    }),
  },
})
```

:::info Async client
`createSolanaClient` returns a promise. Always `await` it before using the client.
The client uses a singleton multichain core under the hood; calling it multiple times
returns the same underlying session.
:::

### 3. Connect to MetaMask

Register a [`wallet_sessionChanged`](../../multichain/reference/api.md#wallet_sessionchanged) listener to capture session data, then connect with a Solana scope.
A QR code appears in the terminal. Scan it with the MetaMask mobile app:

```javascript
let session
solanaClient.core.on('wallet_sessionChanged', s => {
  session = s
})

await solanaClient.core.connect([SOLANA_MAINNET], [])

const accounts = session?.sessionScopes?.[SOLANA_MAINNET]?.accounts ?? []
const address = accounts[0]?.split(':').pop()
console.log('Connected:', address)
```

### 4. Sign a message

Use [`invokeMethod`](../../multichain/reference/methods.md#invokemethod) to call the `signMessage` method on the Solana scope:

```javascript
const message = Buffer.from('Hello from Node.js!', 'utf8').toString('base64')

const result = await solanaClient.core.invokeMethod({
  scope: SOLANA_MAINNET,
  request: {
    method: 'signMessage',
    params: {
      account: { address },
      message,
    },
  },
})
console.log('Signature:', result)
```

### 5. Disconnect

Use [`disconnect`](../reference/methods.md#disconnect) to disconnect all scopes and end the session.

```javascript
await solanaClient.disconnect()
console.log('Disconnected')
```

## Listen for session events

[Step 3](#3-connect-to-metamask) captures the session with a minimal `wallet_sessionChanged` listener. For production use, expand the handler to track account changes throughout the session lifecycle:

```javascript
solanaClient.core.on('wallet_sessionChanged', session => {
  if (session?.sessionScopes) {
    const solanaAccounts = session.sessionScopes[SOLANA_MAINNET]?.accounts ?? []
    console.log('Solana accounts:', solanaAccounts)
  } else {
    console.log('Session ended')
  }
})
```

## Solana CAIP-2 scope reference

| Network | CAIP-2 scope                              |
| ------- | ----------------------------------------- |
| Mainnet | `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` |
| Devnet  | `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1` |

:::note
Devnet and testnet require [MetaMask Flask](https://metamask.io/flask/).
Production MetaMask only supports Solana mainnet.
:::

## Full example

```javascript title="index.mjs"
import { createSolanaClient, getInfuraRpcUrls } from '@metamask/connect-solana'

const SOLANA_MAINNET = 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'

const solanaClient = await createSolanaClient({
  dapp: {
    name: 'My Node.js Solana App',
    url: 'https://myapp.com',
  },
  api: {
    supportedNetworks: getInfuraRpcUrls({
      infuraApiKey: 'YOUR_INFURA_API_KEY',
      networks: ['mainnet'],
    }),
  },
})

// Capture session data via event before connecting
let session
solanaClient.core.on('wallet_sessionChanged', s => {
  session = s
})

// Connect — scan the QR code with the MetaMask mobile app
await solanaClient.core.connect([SOLANA_MAINNET], [])

const accounts = session?.sessionScopes?.[SOLANA_MAINNET]?.accounts ?? []
const address = accounts[0]?.split(':').pop()
console.log('Connected:', address)

// Sign a message
const message = Buffer.from('Hello from Node.js!', 'utf8').toString('base64')
const result = await solanaClient.core.invokeMethod({
  scope: SOLANA_MAINNET,
  request: {
    method: 'signMessage',
    params: {
      account: { address },
      message,
    },
  },
})
console.log('Signature:', result)

// Disconnect
await solanaClient.disconnect()
console.log('Disconnected')
```

Run it with:

```bash
node index.mjs
```

## Next steps

- [Send a legacy Solana transaction.](../guides/send-transactions/legacy.md)
- [Send a versioned Solana transaction.](../guides/send-transactions/versioned.md)
- [Sign a Solana message.](../guides/sign-data/sign-message.md)
- [Use the multichain client](../../multichain/quickstart/nodejs.md) to connect to both EVM and Solana from a single session.
