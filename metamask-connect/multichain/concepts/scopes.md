---
title: 'Multichain Scopes - MetaMask Connect'
sidebar_label: Scopes
description: Learn how CAIP-2 scopes work in MetaMask Connect Multichain to identify chains across ecosystems.
keywords:
  [
    multichain,
    caip,
    scope,
    caip-2,
    chain id,
    chain namespace,
    blockchain identifier,
    eip155,
    solana scope,
  ]
---

# Scopes (CAIP-2)

MetaMask Connect Multichain uses CAIP standards to identify chains, [accounts](./accounts.md),
and [sessions](./sessions.md).

Traditional single-chain dapps identify networks with a numeric chain ID (for example, `1` for
Ethereum Mainnet). That works within EVM ecosystems, but it does not generalize across ecosystems.
Solana does not use numeric chain IDs, and a raw value like `1` is ambiguous without an ecosystem
context.

Scopes solve this by providing a **universal chain identifier** for a chain or set of chains.
When you [`connect`](../reference/methods.md#connect) to MetaMask, you pass an array of scopes to
declare exactly which chains your dapp needs. When you call
[`invokeMethod`](../reference/methods.md#invokemethod), you pass a scope to target the correct chain
without switching networks.

## Format and examples

A scope is a chain identifier in `namespace:reference` format, as defined by
[CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md). It identifies
a specific blockchain across any ecosystem.

- The **namespace** identifies the ecosystem or standard (for example, `eip155` for EVM, `solana`
  for Solana).
- The **reference** identifies a specific chain within that namespace.

```javascript
// Connect to Ethereum, Polygon, and Solana in a single call
await client.connect(
  [
    'eip155:1', // Ethereum Mainnet
    'eip155:137', // Polygon Mainnet
    'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp', // Solana Mainnet
  ],
  []
)

// Send an RPC request to a specific chain using its scope
const balance = await client.invokeMethod({
  scope: 'eip155:1',
  request: { method: 'eth_getBalance', params: ['0xab1...', 'latest'] },
})
```

## Supported scopes

| Ecosystem | Format                 | Examples                                                                                                |
| --------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| EVM       | `eip155:<chainId>`     | `eip155:1` (Ethereum), `eip155:59144` (Linea), `eip155:137` (Polygon)                                   |
| Solana    | `solana:<genesisHash>` | `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` (Mainnet), `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1` (Devnet) |

## Common EVM scopes

| Network          | Scope             |
| ---------------- | ----------------- |
| Ethereum Mainnet | `eip155:1`        |
| Linea Mainnet    | `eip155:59144`    |
| Base Mainnet     | `eip155:8453`     |
| Polygon Mainnet  | `eip155:137`      |
| Arbitrum One     | `eip155:42161`    |
| Optimism         | `eip155:10`       |
| Sepolia testnet  | `eip155:11155111` |

## Next steps

- [Accounts](./accounts.md): Learn how CAIP-10 account IDs extend scopes with addresses.
- [Sessions](./sessions.md): Learn how scopes and accounts are grouped into authorized connections.
