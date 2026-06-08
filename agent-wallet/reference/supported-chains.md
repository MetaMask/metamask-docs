---
description: Supported EVM chains for MetaMask Agent Wallet.
keywords: [MetaMask, Agent Wallet, chains, networks, EVM]
---

# Supported chains

MetaMask Agent Wallet supports multiple EVM chains. The authoritative list is the output of
`mm chains list`.

## List supported chains

```bash
mm chains list
```

For machine-readable output:

```bash
mm chains list --json
```

## Product coverage

The CLI commonly includes Ethereum, Linea, Arbitrum, Avalanche, Optimism, Base, and Polygon.
Availability varies by CLI version. Always confirm with `mm chains list` before scripting against a
specific network.

| Network   | Typical chain ID |
| --------- | ---------------- |
| Ethereum  | `1`              |
| Linea     | `59144`          |
| Arbitrum  | `42161`          |
| Avalanche | `43114`          |
| Optimism  | `10`             |
| Base      | `8453`           |
| Polygon   | `137`            |

## Per-chain balances

Wallet balances and transfers are scoped to the chain you specify with `--chain-id`.
Fund each chain separately, or bridge with `mm swap execute` before transferring.

## Related commands

- [`mm chains list`](commands.md#mm-chains-list)
- [Send tokens](../guides/send-tokens.md)
