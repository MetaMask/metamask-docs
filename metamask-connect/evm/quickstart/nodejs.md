---
title: "Node.js Quickstart - MetaMask Connect EVM"
description: Set up MetaMask Connect EVM in a Node.js application with createEVMClient, connect via QR code, and use the EIP-1193 provider for JSON-RPC requests.
sidebar_label: Node.js
keywords: [connect, MetaMask, Node.js, SDK, CLI, server-side, createEVMClient, EIP-1193, QR code, personal_sign, node quickstart]
---

# Connect to MetaMask using Node.js

Get started with MetaMask Connect EVM in a Node.js application.
The SDK displays a QR code in the terminal that you scan with MetaMask Mobile to establish a connection.

:::info No polyfills required
Node.js has native support for `Buffer`, `crypto`, `stream`, and other modules that require
polyfilling in browser or React Native environments.
:::

## Prerequisites

- [Node.js](https://nodejs.org/) version 20 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), or [pnpm](https://pnpm.io/installation).
- [MetaMask Mobile](https://metamask.io/download/) installed on your phone.
- An [Infura API key](/developer-tools/dashboard/get-started/create-api) from the MetaMask Developer dashboard.

## Steps

### 1. Install dependencies

```bash npm2yarn
npm install @metamask/connect-evm @metamask/connect-multichain
```

`@metamask/connect-multichain` provides the `getInfuraRpcUrls` helper for generating RPC URLs.

### 2. Initialize the EVM client

Create a file (for example, `index.mjs`) and initialize the client.
In Node.js, there is no `window.location`, so you must set `dapp.url` explicitly:

```javascript title="index.mjs"
import { createEVMClient } from '@metamask/connect-evm'
import { getInfuraRpcUrls } from '@metamask/connect-multichain'

const evmClient = await createEVMClient({
  dapp: {
    name: 'My Node.js App',
    url: 'https://myapp.com',
  },
  api: {
    supportedNetworks: getInfuraRpcUrls({
      infuraApiKey: 'YOUR_INFURA_API_KEY',
    }),
  },
})
```

:::info `createEVMClient` is async
`createEVMClient` returns a promise. Always `await` it before using the client.
The client is a **singleton** -- calling `createEVMClient` again returns the same instance.
:::

### 3. Connect to MetaMask

Call `connect()` to start the connection flow.
A QR code appears in the terminal -- scan it with MetaMask Mobile:

```javascript
try {
  const { accounts, chainId } = await evmClient.connect({
    chainIds: ['0x1'],
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
```

### 4. Use the provider

Get the EIP-1193 provider and make JSON-RPC requests:

```javascript
const provider = evmClient.getProvider()

const balance = await provider.request({
  method: 'eth_getBalance',
  params: [accounts[0], 'latest'],
})
console.log('Balance (wei):', balance)
```

### 5. Sign a message

Use `personal_sign` to request a signature from the connected wallet:

```javascript
const message = '0x' + Buffer.from('Hello from Node.js!', 'utf8').toString('hex')

const signature = await provider.request({
  method: 'personal_sign',
  params: [message, accounts[0]],
})
console.log('Signature:', signature)
```

### 6. Disconnect

```javascript
await evmClient.disconnect()
console.log('Disconnected')
```

## Listen for events

Use `eventHandlers` in the client configuration to react to connection state changes:

```javascript
const evmClient = await createEVMClient({
  dapp: {
    name: 'My Node.js App',
    url: 'https://myapp.com',
  },
  api: {
    supportedNetworks: getInfuraRpcUrls({
      infuraApiKey: 'YOUR_INFURA_API_KEY',
    }),
  },
  eventHandlers: {
    connect: ({ accounts, chainId }) => {
      console.log('Connected:', accounts, 'on chain', chainId)
    },
    disconnect: () => {
      console.log('Disconnected')
    },
    accountsChanged: (accounts) => {
      console.log('Accounts changed:', accounts)
    },
    chainChanged: (chainId) => {
      console.log('Chain changed:', chainId)
    },
  },
})
```

## Full example

```javascript title="index.mjs"
import { createEVMClient } from '@metamask/connect-evm'
import { getInfuraRpcUrls } from '@metamask/connect-multichain'

const evmClient = await createEVMClient({
  dapp: {
    name: 'My Node.js App',
    url: 'https://myapp.com',
  },
  api: {
    supportedNetworks: getInfuraRpcUrls({
      infuraApiKey: 'YOUR_INFURA_API_KEY',
    }),
  },
})

// Connect -- scan the QR code with MetaMask Mobile
const { accounts, chainId } = await evmClient.connect({ chainIds: ['0x1'] })
console.log('Connected:', accounts[0], 'on', chainId)

// Get balance
const provider = evmClient.getProvider()
const balance = await provider.request({
  method: 'eth_getBalance',
  params: [accounts[0], 'latest'],
})
console.log('Balance:', balance)

// Sign a message
const message = '0x' + Buffer.from('Hello from Node.js!', 'utf8').toString('hex')
const signature = await provider.request({
  method: 'personal_sign',
  params: [message, accounts[0]],
})
console.log('Signature:', signature)

// Disconnect
await evmClient.disconnect()
console.log('Disconnected')
```

Run it with:

```bash
node index.mjs
```

## Next steps

- [Manage user accounts](../guides/manage-user-accounts.md)
- [Send transactions](../guides/send-transactions/index.md)
- [Sign data](../guides/sign-data/index.md)
- [Use the Multichain SDK](../../multichain/quickstart/nodejs.md) to connect to both EVM and Solana from a single session
