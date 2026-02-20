---
sidebar_label: Connect to EVM and Solana
description: Connect to EVM networks and Solana simultaneously using MetaMask Connect.
keywords: [multichain, evm, solana, connect, caip-25, scope]
---

# Connect to EVM and Solana in MetaMask

Get started with MetaMask Connect in your multichain JavaScript dapp.
You can connect to EVM networks and Solana in MetaMask at the same time, and make requests to each network without having to switch between them.

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
import { createMultichainClient } from "@metamask/connect-multichain";

const client = createMultichainClient({
  dapp: {
    name: "My Multichain Dapp",
    url: window.location.href,
    iconUrl: "https://mydapp.com/icon.png",
  },
  api: {
    supportedNetworks: {
      'eip155:1': 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
      'eip155:137': 'https://polygon-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
      'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'https://api.mainnet-beta.solana.com',
      'solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ': 'https://api.devnet.solana.com',
    },
  },
});
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
    'eip155:1',                                    // Ethereum Mainnet
    'eip155:137',                                  // Polygon
    'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',    // Solana Mainnet
  ],
  [],  // Account preferences (optional)
);
```

The user sees a single approval prompt for all requested chains.
This is a key advantage of the multichain approach — no separate connection flows per ecosystem.

### 4. Invoke methods on any scope

Use `invokeMethod` to call RPC methods on any chain in the session:

```typescript
// Get ETH balance on Ethereum Mainnet
const ethBalance = await client.invokeMethod({
  scope: 'eip155:1',
  request: {
    method: 'eth_getBalance',
    params: ['0x742d35Cc6634C0532925a3b844Bc9e7595f2bD73', 'latest'],
  },
});
console.log('ETH balance:', ethBalance);

// Get MATIC balance on Polygon
const maticBalance = await client.invokeMethod({
  scope: 'eip155:137',
  request: {
    method: 'eth_getBalance',
    params: ['0x742d35Cc6634C0532925a3b844Bc9e7595f2bD73', 'latest'],
  },
});
console.log('MATIC balance:', maticBalance);

// Get SOL balance on Solana Mainnet
const solBalance = await client.invokeMethod({
  scope: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  request: {
    method: 'getBalance',
    params: ['4Nd1mS8AUwK3kU3gdiAM6QCvqhA7Do8rKtMXsGyqrJxy'],
  },
});
console.log('SOL balance:', solBalance);
```

### 5. Get session information

Retrieve the current session to see which chains and accounts are authorized:

```typescript
const session = await client.getSession();
console.log('Session scopes:', session.sessionScopes);
```

## Understanding scopes

Scopes are [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md) chain identifiers that specify which blockchain you're targeting.

| Ecosystem | Format | Example |
|-----------|--------|---------|
| EVM | `eip155:<chainId>` | `eip155:1` (Ethereum), `eip155:137` (Polygon) |
| Solana | `solana:<genesisHash>` | `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` (Mainnet) |

Common Solana genesis hashes:
- **Mainnet**: `5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`
- **Devnet**: `4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ`
- **Testnet**: `4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z`

## Full example

```typescript
import { createMultichainClient } from "@metamask/connect-multichain";

async function main() {
  // Initialize client
  const client = createMultichainClient({
    dapp: {
      name: "Multichain Demo",
      url: window.location.href,
    },
    api: {
      supportedNetworks: {
        'eip155:1': 'https://mainnet.infura.io/v3/YOUR_API_KEY',
        'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'https://api.mainnet-beta.solana.com',
      },
    },
  });

  // Connect to both EVM and Solana
  await client.connect(
    ['eip155:1', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'],
    [],
  );

  // Get accounts from session
  const session = await client.getSession();
  const ethAccounts = session.sessionScopes['eip155:1']?.accounts || [];
  const solAccounts = session.sessionScopes['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp']?.accounts || [];

  console.log('ETH accounts:', ethAccounts);
  console.log('SOL accounts:', solAccounts);

  // Send an ETH transaction
  if (ethAccounts.length > 0) {
    const txHash = await client.invokeMethod({
      scope: 'eip155:1',
      request: {
        method: 'eth_sendTransaction',
        params: [{
          from: ethAccounts[0].split(':')[2],  // Extract address from CAIP-10
          to: '0x...',
          value: '0x0',
        }],
      },
    });
    console.log('ETH tx hash:', txHash);
  }
}

main();
```

## Next steps

- [Send EVM and Solana transactions](send-transactions.md)
- [Multichain API reference](../reference/api.md)
