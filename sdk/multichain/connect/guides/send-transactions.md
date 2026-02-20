---
sidebar_label: Send transactions
description: Send EVM and Solana transactions from a single multichain session.
keywords: [multichain, evm, solana, transaction, send, invokeMethod]
---

# Send EVM and Solana transactions

This guide shows you how to send transactions on both EVM networks and Solana from a single multichain session — no network switching required.

## Prerequisites

- A multichain client initialized and connected as shown in the [Connect to EVM and Solana](connect-to-multichain.md) guide.
- For Solana balance queries, install `@solana/kit`:

```bash npm2yarn
npm install @solana/kit
```

## Initialize and connect

Set up the multichain client and connect to both ecosystems:

```typescript
import { createMultichainClient } from '@metamask/connect-multichain'

const client = createMultichainClient({
  dapp: {
    name: 'Multichain Demo',
    url: window.location.href,
    iconUrl: 'https://mydapp.com/icon.png',
  },
  api: {
    supportedNetworks: {
      'eip155:1': 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
      'eip155:137': 'https://polygon-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
      'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'https://api.mainnet-beta.solana.com',
    },
  },
})

await client.connect(['eip155:1', 'eip155:137', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'], [])

const session = await client.getSession()
```

## Send an EVM transaction

Use `invokeMethod` to send a transaction on any EVM chain in the session:

```typescript
const ethAccounts = session.sessionScopes['eip155:1']?.accounts || []

if (ethAccounts.length > 0) {
  const fromAddress = ethAccounts[0].split(':')[2] // Extract address from CAIP-10

  const txHash = await client.invokeMethod({
    scope: 'eip155:1',
    request: {
      method: 'eth_sendTransaction',
      params: [
        {
          from: fromAddress,
          to: '0x4B0897b0513FdBeEc7C469D9aF4fA6C0752aBea7',
          value: '0x29a2241af62c0000', // 3 ETH in wei
        },
      ],
    },
  })
  console.log('ETH tx hash:', txHash)
}
```

Target a different chain by changing the `scope` — for example, `eip155:137` for Polygon:

```typescript
const polAccounts = session.sessionScopes['eip155:137']?.accounts || []

if (polAccounts.length > 0) {
  const fromAddress = polAccounts[0].split(':')[2]

  const txHash = await client.invokeMethod({
    scope: 'eip155:137',
    request: {
      method: 'eth_sendTransaction',
      params: [
        {
          from: fromAddress,
          to: '0x4B0897b0513FdBeEc7C469D9aF4fA6C0752aBea7',
          value: '0x2386F26FC10000', // 0.01 POL in wei
        },
      ],
    },
  })
  console.log('POL tx hash:', txHash)
}
```

## Send a Solana transaction

Use `invokeMethod` with the `solana_signAndSendTransaction` method:

```typescript
const solAccounts = session.sessionScopes['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp']?.accounts || []

if (solAccounts.length > 0) {
  const result = await client.invokeMethod({
    scope: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
    request: {
      method: 'solana_signAndSendTransaction',
      params: {
        transaction: '<base64-encoded-transaction>',
      },
    },
  })
  console.log('SOL tx signature:', result)
}
```

## Next steps

- [Multichain API reference](../reference/api.md) for all available methods and events
