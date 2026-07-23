---
description: Supported EVM chains for MetaMask Agent Wallet.
keywords: [MetaMask, Agent Wallet, chains, networks, EVM]
---

# Supported chains

MetaMask Agent Wallet supports all EVM chains.
The authoritative list of preconfigured networks is the output of `mm chains list`.

## List supported chains

```bash
mm chains list
```

For machine-readable output:

```bash
mm chains list --json
```

## Product coverage

Agent Wallet supports all EVM-compatible chains.
Pass any EIP-155 chain ID to `--chain-id` for signing, transfers, balances, and other wallet
operations.

The tables below list every network from `mm chains list`.
Availability varies by CLI version.
Always confirm with `mm chains list` before scripting against a specific network.

| Network         | Mainnet chain ID | Testnet          | Testnet chain ID |
| --------------- | ---------------- | ---------------- | ---------------- |
| Arbitrum One    | `42161`          | Arbitrum Sepolia | `421614`         |
| Avalanche       | `43114`          | Avalanche Fuji   | `43113`          |
| Base            | `8453`           | Base Sepolia     | `84532`          |
| BSC             | `56`             | BSC Testnet      | `97`             |
| Ethereum        | `1`              | Sepolia          | `11155111`       |
| HyperEVM        | `999`            |                  |                  |
| Linea           | `59144`          | Linea Sepolia    | `59141`          |
| MegaETH         | `4326`           |                  |                  |
| Monad           | `143`            |                  |                  |
| Optimism        | `10`             | Optimism Sepolia | `11155420`       |
| Polygon         | `137`            | Polygon Amoy     | `80002`          |
| Robinhood Chain | `4663`           |                  |                  |
| Celo            | `42220`          |                  |                  |

The `mm chains list` output includes a `features` field per chain indicating support for `swap`,
`predict`, `perps`, and other capabilities. Use `mm chains list --json` to inspect feature
availability programmatically.

For chains not covered by the Accounts API, `mm wallet balance` falls back to direct RPC queries
via Multicall3.

## Per-chain balances

Wallet balances and transfers are scoped to the chain you specify with `--chain-id`.
Fund each chain separately, or bridge with `mm swap execute` before transferring.

## Related commands

- [`mm chains list`](commands.md#mm-chains-list)
- [Send tokens](../guides/send-tokens.md)
