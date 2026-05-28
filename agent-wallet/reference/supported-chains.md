---
description: Supported EVM chains and Solana networks for MetaMask Agent Wallet.
keywords: [MetaMask, Agent Wallet, chains, networks, Solana]
---

# Supported chains

MetaMask Agent Wallet supports multiple EVM chains and Solana. The authoritative list is the output
of `mm chains list`.

## List supported chains

```bash
mm chains list
```

For machine-readable output:

```bash
mm chains list --json
```

## Product coverage

The product targets the following networks. Confirm availability with `mm chains list` because
the CLI registry may update between releases:

| Network         | Typical chain ID                  |
| --------------- | --------------------------------- |
| Ethereum        | `1`                               |
| Linea           | `59144`                           |
| Arbitrum        | `42161`                           |
| Avalanche       | `43114`                           |
| Optimism        | `10`                              |
| Base            | `8453`                            |
| Polygon         | `137`                             |
| BNB Smart Chain | `56`                              |
| Sei             | See `mm chains list`              |
| Solana          | Solana namespace (see CLI output) |

## Per-chain balances

Wallet balances and transfers are scoped to the chain you specify with `--chain-id` (EVM) or the
Solana namespace. Fund each chain separately, or bridge with `mm swap execute` before transferring.

## Related commands

- [`mm chains list`](commands.md#mm-chains-list)
- [Send tokens](../guides/send-tokens.md)
