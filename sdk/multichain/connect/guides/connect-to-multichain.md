---
sidebar_label: Connect to EVM and Solana
description: Connect to EVM networks and Solana simultaneously using MetaMask Connect.
keywords: [multichain, evm, solana, connect, caip-25, scope]
---

# Connect to EVM and Solana in MetaMask

This guide walks you through setting up MetaMask Connect in a multichain JavaScript dapp.
By the end, your dapp will be able to connect to EVM networks and Solana at the same time, and make requests to each one without switching between them.

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.

## Steps

### 1. Install MetaMask Connect

Install the multichain client in an existing JavaScript project:

```bash npm2yarn
npm install @metamask/connect-multichain
```

### 2. Initialize the client

Initialize the multichain client with configuration options:

```typescript
import { createMultichainClient } from '@metamask/connect-multichain'

const client = createMultichainClient({
  dapp: {
    name: 'My Multichain Dapp',
    url: window.location.href,
    iconUrl: 'https://mydapp.com/icon.png',
  },
  api: {
    supportedNetworks: {
      'eip155:1': 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
      'eip155:137': 'https://polygon-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
      'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'https://api.mainnet-beta.solana.com',
      'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ': 'https://api.devnet.solana.com',
    },
  },
})
```

This example configures MetaMask Connect with:

- `dapp` — Ensures trust by showing your dapp's `name`, `url`, and `iconUrl` during connection.
- `api.supportedNetworks` — A map of [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md) chain IDs to RPC URLs for all networks supported by the dapp.

### 3. Connect with scopes

Connect to MetaMask and request access to multiple chains across ecosystems:

```typescript
// Connect with scopes across ecosystems - one approval for all chains
await client.connect(
  [
    'eip155:1', // Ethereum Mainnet
    'eip155:137', // Polygon
    'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp', // Solana Mainnet
  ],
  [] // Account preferences (optional)
)
```

The user sees a single approval prompt for all requested chains.
This is a key advantage of the multichain approach — no separate connection flows per ecosystem.

### 4. Get session and accounts

After connecting, retrieve the session to see which chains and accounts the user authorized:

```typescript
const session = await client.getSession()

// Accounts are in CAIP-10 format (e.g. "eip155:1:0x..." or "solana:5eykt...:83ast...")
const ethAccounts = session.sessionScopes['eip155:1']?.accounts || []
const polAccounts = session.sessionScopes['eip155:137']?.accounts || []
const solAccounts = session.sessionScopes['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp']?.accounts || []

console.log('ETH accounts:', ethAccounts)
console.log('POL accounts:', polAccounts)
console.log('SOL accounts:', solAccounts)
```

### 5. Invoke methods on any scope

Use `invokeMethod` to call RPC methods on any chain in the session.
Extract the address from the CAIP-10 account string to use in your requests:

```typescript
// Get ETH balance on Ethereum Mainnet
if (ethAccounts.length > 0) {
  const ethAddress = ethAccounts[0].split(':')[2]
  const ethBalance = await client.invokeMethod({
    scope: 'eip155:1',
    request: {
      method: 'eth_getBalance',
      params: [ethAddress, 'latest'],
    },
  })
  console.log('ETH balance:', ethBalance)
}

// Get POL balance on Polygon
if (polAccounts.length > 0) {
  const polAddress = polAccounts[0].split(':')[2]
  const polBalance = await client.invokeMethod({
    scope: 'eip155:137',
    request: {
      method: 'eth_getBalance',
      params: [polAddress, 'latest'],
    },
  })
  console.log('POL balance:', polBalance)
}
```

### 6. Get SOL balance using Solana RPC

:::note
`getBalance` is not currently supported via `invokeMethod`.
If this is something you'd like to see, [raise a feature request](https://builder.metamask.io/c/feature-request/10) on the MetaMask Builder Hub.
:::

To read Solana account balances, use `@solana/kit` to query the RPC directly:

```bash npm2yarn
npm install @solana/kit
```

```typescript
import { address, createSolanaRpc } from '@solana/kit'

if (solAccounts.length > 0) {
  const solAddress = solAccounts[0].split(':')[2]
  const rpc = createSolanaRpc('https://api.mainnet-beta.solana.com')
  const balance = await rpc.getBalance(address(solAddress)).send()
  console.log('SOL balance:', balance)
}
```

## Understanding scopes

Scopes are [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md) chain identifiers that specify which blockchain you're targeting.

| Ecosystem | Format                 | Example                                                                                                 |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| EVM       | `eip155:<chainId>`     | `eip155:1` (Ethereum), `eip155:42161` (Linea), `eip155:137` (Polygon)                                   |
| Solana    | `solana:<genesisHash>` | `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` (Mainnet), `solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ` (Devnet) |

## Full example

```typescript
import { createMultichainClient } from '@metamask/connect-multichain'
import { address, createSolanaRpc } from '@solana/kit'

async function main() {
  // 1. Initialize client
  const client = createMultichainClient({
    dapp: {
      name: 'Multichain Demo',
      url: window.location.href,
    },
    api: {
      supportedNetworks: {
        'eip155:1': 'https://mainnet.infura.io/v3/YOUR_API_KEY',
        'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'https://api.mainnet-beta.solana.com',
      },
    },
  })

  // 2. Connect to both Ethereum Mainnet and Solana Mainnet
  await client.connect(['eip155:1', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'], [])

  // 3. Get accounts from session
  const session = await client.getSession()
  const ethAccounts = session.sessionScopes['eip155:1']?.accounts || []
  const solAccounts =
    session.sessionScopes['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp']?.accounts || []

  console.log('ETH accounts:', ethAccounts)
  console.log('SOL accounts:', solAccounts)

  // 4. Get ETH balance
  if (ethAccounts.length > 0) {
    const ethAddress = ethAccounts[0].split(':')[2]
    const ethBalance = await client.invokeMethod({
      scope: 'eip155:1',
      request: {
        method: 'eth_getBalance',
        params: [ethAddress, 'latest'],
      },
    })
    console.log('ETH balance:', ethBalance)
  }

  // 5. Get SOL balance using @solana/kit (getBalance is not supported via invokeMethod)
  if (solAccounts.length > 0) {
    const solAddress = solAccounts[0].split(':')[2]
    const rpc = createSolanaRpc('https://api.mainnet-beta.solana.com')
    const balance = await rpc.getBalance(address(solAddress)).send()
    console.log('SOL balance:', balance)
  }

  // 6. Send an ETH transaction
  if (ethAccounts.length > 0) {
    const ethAddress = ethAccounts[0].split(':')[2]
    const txHash = await client.invokeMethod({
      scope: 'eip155:1',
      request: {
        method: 'eth_sendTransaction',
        params: [
          {
            from: ethAddress,
            to: '0x4B0897b0513FdBeEc7C469D9aF4fA6C0752aBea7',
            value: '0x29a2241af62c0000', // 3 ETH in wei
          },
        ],
      },
    })
    console.log('ETH tx hash:', txHash)
  }

  //  TODO: Send a SOL transaction
}

main()
```

## Next steps

- [Send EVM and Solana transactions](send-transactions.md)
- [Multichain API reference](../reference/api.md)
