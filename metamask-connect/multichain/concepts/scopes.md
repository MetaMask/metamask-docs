---
sidebar_label: Scopes
description: Understand scopes, account IDs, and sessions in MetaMask Connect Multichain.
keywords: [multichain, caip, scope, caip-2, caip-10, caip-25, session, chain id]
---

# Scopes, accounts, and sessions

MetaMask Connect Multichain uses [CAIP](https://github.com/ChainAgnostic/CAIPs) (Chain Agnostic
Improvement Proposals) standards to identify chains, accounts, and sessions across ecosystems.
Understanding these concepts helps you work with the multichain client.

## Scopes (CAIP-2)

A scope is a chain identifier in `namespace:reference` format, as defined by
[CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md). It uniquely identifies
a blockchain across any ecosystem.

- The **namespace** identifies the ecosystem or standard (for example, `eip155` for EVM, `solana`
  for Solana).
- The **reference** identifies a specific chain within that namespace.

You use scopes when connecting and when calling
[`invokeMethod`](../reference/methods.md#invokemethod) to target a specific chain.

### Supported scopes

| Ecosystem | Format                 | Examples                                                                     |
| --------- | ---------------------- | ---------------------------------------------------------------------------- |
| EVM       | `eip155:<chainId>`     | `eip155:1` (Ethereum), `eip155:59144` (Linea), `eip155:137` (Polygon)        |
| Solana    | `solana:<genesisHash>` | `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` (Mainnet), `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1` (Devnet) |

### Common EVM scopes

| Network          | Scope            |
| ---------------- | ---------------- |
| Ethereum Mainnet | `eip155:1`       |
| Linea Mainnet    | `eip155:59144`   |
| Base Mainnet     | `eip155:8453`    |
| Polygon Mainnet  | `eip155:137`     |
| Arbitrum One     | `eip155:42161`   |
| Optimism         | `eip155:10`      |
| Sepolia testnet  | `eip155:11155111`|

## Account IDs (CAIP-10)

An account ID extends a scope with an address, in `namespace:reference:address` format, as defined
by [CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md). It uniquely
identifies an account on a specific chain.

| Ecosystem | Example                                           |
| --------- | ------------------------------------------------- |
| EVM       | `eip155:1:0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb` |
| Solana    | `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp:7S3P4HxJpyyigGzodYwHtCxZyUQe9JiBMHyRWXArAaKv` |

To extract the address from a CAIP-10 account ID:

```javascript
const accountId = 'eip155:1:0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb'
const address = accountId.split(':')[2]
```

## Sessions (CAIP-25)

A session is an authorized connection between your dapp and MetaMask that spans multiple scopes, as
defined by [CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md). When a user
approves a connection, MetaMask creates a session containing the approved scopes and accounts.

A session includes:

- **`sessionScopes`**: The chains the user approved, each with its associated accounts.
- **Persistence**: Sessions survive page reloads and new tabs.
- **Lifecycle methods**: Use [`getSession`](../reference/methods.md#getsession) to retrieve session
  data and [`disconnect`](../reference/methods.md#disconnect) to end or modify the session.

```javascript
const session = await client.getSession()

const ethAccounts = session.sessionScopes['eip155:1']?.accounts || []
const solAccounts = session.sessionScopes['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp']?.accounts || []
```

## Next steps

- [Quickstart](../quickstart.md): Set up MetaMask Connect Multichain.
- [Send transactions](../guides/send-transactions.md): Send transactions on EVM and Solana.
- [API reference](../reference/api.md): Full Multichain API reference.