---
title: 'Node.js Quickstart - MetaMask Connect Multichain'
description: Set up MetaMask Connect Multichain in a Node.js application to connect to EVM and Solana simultaneously using createMultichainClient, CAIP-25 scopes, and invokeMethod.
sidebar_label: Node.js
keywords:
  [
    multichain,
    evm,
    solana,
    connect,
    Node.js,
    caip-25,
    scope,
    createMultichainClient,
    invokeMethod,
    getInfuraRpcUrls,
    QR code,
    node quickstart,
  ]
---

# Multichain Node.js quickstart

Get started with MetaMask Connect Multichain in a Node.js application.
Connect to EVM and Solana networks simultaneously through a single session.
The SDK displays a QR code in the terminal that you scan with the MetaMask mobile app.

:::info No polyfills required
Node.js has native support for `Buffer`, `crypto`, `stream`, and other modules that require
polyfilling in browser or React Native environments.
:::

## Prerequisites

- [Node.js](https://nodejs.org/) version 20 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/installation).
- The [MetaMask mobile app](https://metamask.io/download/) installed on your phone.
- An [Infura API key](/developer-tools/dashboard/get-started/create-api) from the [MetaMask Developer dashboard](https://developer.metamask.io).

## Steps

### 1. Install MetaMask Connect Multichain

Install the multichain client in an existing Node.js project:

```bash npm2yarn
npm install @metamask/connect-multichain
```

### 2. Initialize MetaMask Connect Multichain

Create a file (`index.mjs`) and initialize the client using [`createMultichainClient`](../reference/methods.md#createmultichainclient).
In Node.js, there is no `window.location`, so you must set `dapp.url` explicitly.
Use [`getInfuraRpcUrls`](../reference/methods.md#getinfurarpcurls) to generate RPC URLs for all Infura-supported chains:

```javascript title="index.mjs"
import { createMultichainClient, getInfuraRpcUrls } from '@metamask/connect-multichain'

const client = await createMultichainClient({
  dapp: {
    name: 'My Node.js Multichain App',
    url: 'https://myapp.com',
  },
  api: {
    supportedNetworks: getInfuraRpcUrls({
      infuraApiKey: 'YOUR_INFURA_API_KEY',
    }),
  },
})
```

:::info Async client
`createMultichainClient` returns a promise. Always `await` it before using the client.
The client is a singleton; calling it again returns the same instance with merged options.
:::

### 3. Connect to MetaMask

Register a [`wallet_sessionChanged`](../reference/api.md#wallet_sessionchanged) listener using the [`on`](../reference/methods.md#on) method to capture session data, then connect with both EVM and Solana scopes in a single call.
A QR code appears in the terminal. Scan it with the MetaMask mobile app:

```javascript
let session
client.on('wallet_sessionChanged', s => {
  session = s
})

await client.connect(['eip155:1', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'], [])

const ethAddress = session?.sessionScopes?.['eip155:1']?.accounts?.[0]?.split(':').pop()
const solAddress = session?.sessionScopes?.[
  'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'
]?.accounts?.[0]
  ?.split(':')
  .pop()
console.log('ETH:', ethAddress)
console.log('SOL:', solAddress)
```

The user sees a single approval prompt for all requested chains.

### 4. Invoke EVM methods

Use [`invokeMethod`](../reference/methods.md#invokemethod) with an EVM scope to make JSON-RPC requests.
Read methods route through the RPC node; signing methods route through the wallet:

```javascript
// Read: get balance via RPC node
const balance = await client.invokeMethod({
  scope: 'eip155:1',
  request: {
    method: 'eth_getBalance',
    params: [ethAddress, 'latest'],
  },
})
console.log('ETH balance:', balance)

// Sign: personal_sign via wallet
const ethMsg = '0x' + Buffer.from('Hello Ethereum!', 'utf8').toString('hex')
const ethSig = await client.invokeMethod({
  scope: 'eip155:1',
  request: {
    method: 'personal_sign',
    params: [ethMsg, ethAddress],
  },
})
console.log('ETH signature:', ethSig)
```

### 5. Invoke Solana methods

Use [`invokeMethod`](../reference/methods.md#invokemethod) with a Solana scope. All Solana methods route through the wallet:

```javascript
const solMsg = Buffer.from('Hello Solana!', 'utf8').toString('base64')

const solSig = await client.invokeMethod({
  scope: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  request: {
    method: 'signMessage',
    params: {
      account: { address: solAddress },
      message: solMsg,
    },
  },
})
console.log('SOL signature:', solSig)
```

### 6. Disconnect

Use [`disconnect`](../reference/methods.md#disconnect) to disconnect all scopes and end the session.

```javascript
// Disconnect all scopes
await client.disconnect()
console.log('Disconnected')

// Or disconnect specific scopes only
// await client.disconnect(['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'])
```

## Listen for session events

[Step 3](#3-connect-to-metamask) captures the session with a minimal `wallet_sessionChanged` listener. For production use, expand the handler to track all scope and account changes throughout the session lifecycle:

```javascript
client.on('wallet_sessionChanged', session => {
  if (session?.sessionScopes) {
    const scopes = Object.keys(session.sessionScopes)
    console.log('Active scopes:', scopes)
    for (const [scope, data] of Object.entries(session.sessionScopes)) {
      console.log(`  ${scope}:`, data.accounts)
    }
  } else {
    console.log('Session ended')
  }
})
```

## Multichain client methods at a glance

| Method                                                                           | Description                                                                      |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`connect(scopes, caipAccountIds)`](../reference/methods.md#connect)             | Connects to MetaMask with multichain [scopes](../concepts/scopes.md).            |
| [`getSession`](../reference/methods.md#getsession)                               | Returns the current [session](../concepts/sessions.md) with approved accounts.   |
| [`invokeMethod({ scope, request })`](../reference/methods.md#invokemethod)       | Calls an RPC method on a specific chain using a [scope](../concepts/scopes.md).  |
| [`disconnect`](../reference/methods.md#disconnect)                               | Disconnects all [scopes](../concepts/scopes.md) and ends the session.            |
| [`disconnect(scopes)`](../reference/methods.md#disconnect)                       | Disconnects specific [scopes](../concepts/scopes.md) without ending the session. |
| [`on(event, handler)`](../reference/methods.md#on)                               | Registers an event handler.                                                      |
| [`getInfuraRpcUrls({ infuraApiKey })`](../reference/methods.md#getinfurarpcurls) | Generates Infura RPC URLs keyed by CAIP-2 chain ID.                              |

## Full example

```javascript title="index.mjs"
import { createMultichainClient, getInfuraRpcUrls } from '@metamask/connect-multichain'

const ETH_MAINNET = 'eip155:1'
const SOLANA_MAINNET = 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'

const client = await createMultichainClient({
  dapp: {
    name: 'My Node.js Multichain App',
    url: 'https://myapp.com',
  },
  api: {
    supportedNetworks: getInfuraRpcUrls({
      infuraApiKey: 'YOUR_INFURA_API_KEY',
    }),
  },
})

// Capture session data via event before connecting
let session
client.on('wallet_sessionChanged', s => {
  session = s
})

// Connect — scan the QR code with the MetaMask mobile app
await client.connect([ETH_MAINNET, SOLANA_MAINNET], [])

const ethAddress = session?.sessionScopes?.[ETH_MAINNET]?.accounts?.[0]?.split(':').pop()
const solAddress = session?.sessionScopes?.[SOLANA_MAINNET]?.accounts?.[0]?.split(':').pop()
console.log('ETH:', ethAddress)
console.log('SOL:', solAddress)

// Get ETH balance
const balance = await client.invokeMethod({
  scope: ETH_MAINNET,
  request: {
    method: 'eth_getBalance',
    params: [ethAddress, 'latest'],
  },
})
console.log('ETH balance:', balance)

// Sign an Ethereum message
const ethMsg = '0x' + Buffer.from('Hello Ethereum!', 'utf8').toString('hex')
const ethSig = await client.invokeMethod({
  scope: ETH_MAINNET,
  request: {
    method: 'personal_sign',
    params: [ethMsg, ethAddress],
  },
})
console.log('ETH signature:', ethSig)

// Sign a Solana message
const solMsg = Buffer.from('Hello Solana!', 'utf8').toString('base64')
const solSig = await client.invokeMethod({
  scope: SOLANA_MAINNET,
  request: {
    method: 'signMessage',
    params: {
      account: { address: solAddress },
      message: solMsg,
    },
  },
})
console.log('SOL signature:', solSig)

// Disconnect
await client.disconnect()
console.log('Disconnected')
```

Run it with:

```bash
node index.mjs
```

## Next steps

- Understand [scopes](../concepts/scopes.md), [accounts](../concepts/accounts.md), and [sessions](../concepts/sessions.md) for CAIP-2 chain identifiers, CAIP-10 account IDs, and CAIP-25 sessions.
- [Sign multichain transactions](../guides/sign-transactions.md) using `invokeMethod`.
- [Send multichain transactions](../guides/send-transactions.md) from a single session.
- See [Create a multichain dapp](../tutorials/create-multichain-dapp.md) for a full step-by-step tutorial with React.
