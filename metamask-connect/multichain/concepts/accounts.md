---
sidebar_label: Account IDs
description: Learn how CAIP-10 account IDs work in MetaMask Connect Multichain to uniquely identify accounts across chains.
keywords:
  [
    multichain,
    caip,
    caip-10,
    account ID,
    chain address,
    eip155,
    solana account,
    cross-chain identity,
  ]
---

# Account IDs (CAIP-10)

A plain address like `0xab16...` does not identify which chain it belongs to. The same address can
exist on Ethereum, Polygon, and other EVM chains. In a multichain context, you need to know which
account on which chain the user authorized.

Account IDs solve this by combining a [scope](./scopes.md) with an address. After a user connects, the
[session](./sessions.md) returns account IDs, so you know which chain each address belongs to.

## Format and examples

An account ID uses `namespace:reference:address` format, as defined by
[CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md).

| Ecosystem | Example                                                                                |
| --------- | -------------------------------------------------------------------------------------- |
| EVM       | `eip155:1:0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb`                                  |
| Solana    | `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp:7S3P4HxJpyyigGzodYwHtCxZyUQe9JiBMHyRWXArAaKv` |

Account IDs appear in the [`sessionScopes`](./sessions.md) returned by
[`getSession`](../reference/methods.md#getsession). To extract the address from a CAIP-10
account ID:

```javascript
const accountId = 'eip155:1:0xab16a96D359eC26a11e2C2b3d8f8B8942d5Bfcdb'
const address = accountId.split(':')[2]
```

## Next steps

- [Scopes](./scopes.md): Understand CAIP-2 chain identifiers used in account IDs.
- [Sessions](./sessions.md): Learn how accounts are grouped into authorized sessions.
