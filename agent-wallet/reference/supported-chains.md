---
description: Supported EVM chains for MetaMask Agent Wallet.
keywords: [MetaMask, Agent Wallet, chains, networks, EVM]
---

# Supported chains

MetaMask Agent Wallet supports preconfigured EVM networks.
The authoritative list for your CLI version is the output of `mm chains list`.

## List supported chains

```bash
mm chains list
```

For machine-readable output:

```bash
mm chains list --json
```

The JSON output includes per-network fields such as `key`, `chainNamespace`, `caip2`, `chainId`,
`name`, `selected`, `relaySupported`, and `features` (for example, `swap`, `predict`, `perps`).
`relaySupported` indicates whether gasless relay is available on that network.

## Product coverage

Pass any supported chain ID to `--chain-id` for signing, transfers, balances, and other wallet
operations.
Availability varies by CLI version.
Always confirm with `mm chains list` before scripting against a specific network.

The tables below reflect the current preconfigured network list.
The `mm chains list` output also includes a `features` field per chain (for example, `swap`,
`predict`, `perps`).
Use `mm chains list --json` to inspect feature availability programmatically.

### Mainnets

| Network         | Chain ID      | [Transaction Shield](https://support.metamask.io/manage-crypto/transactions/transaction-shield/) |
| --------------- | ------------- | ------------------------------------------------------------------------------------------------ |
| Ethereum        | `1`           | Covered                                                                                          |
| BNB Smart Chain | `56`          | Covered                                                                                          |
| Base            | `8453`        | Covered                                                                                          |
| Arbitrum        | `42161`       | Covered                                                                                          |
| Optimism        | `10`          | Covered                                                                                          |
| Polygon         | `137`         | Covered                                                                                          |
| Avalanche       | `43114`       | Covered                                                                                          |
| Linea           | `59144`       | Covered                                                                                          |
| Unichain        | `130`         | No                                                                                               |
| ZKsync Era      | `324`         | No                                                                                               |
| Scroll          | `534352`      | No                                                                                               |
| Blast           | `81457`       | No                                                                                               |
| Mantle          | `5000`        | No                                                                                               |
| opBNB           | `204`         | No                                                                                               |
| Celo            | `42220`       | No                                                                                               |
| Monad           | `143`         | Covered                                                                                          |
| Sei             | `1329`        | Covered                                                                                          |
| HyperEVM        | `999`         | Covered                                                                                          |
| MegaETH         | `4326`        | Covered                                                                                          |
| Hemi            | `43111`       | No                                                                                               |
| Robinhood Chain | `4663`        | Covered                                                                                          |
| Palm            | `11297108109` | No                                                                                               |

:::caution Chains without Transaction Shield support

On chains marked **No**, threat scanning is unavailable, so Agent Wallet can't tell you whether a
recipient or contract is malicious, and Transaction Protection coverage doesn't apply.
In Guard Mode, transactions are still checked against your address allowlist, which blocks
recipients you haven't approved.
Treat that as a basic safeguard, not a replacement for threat scanning.

:::

### Testnets

| Network                 | Chain ID    |
| ----------------------- | ----------- |
| Ethereum Sepolia        | `11155111`  |
| Ethereum Hoodi          | `560048`    |
| Base Sepolia            | `84532`     |
| Arbitrum Sepolia        | `421614`    |
| Optimism Sepolia        | `11155420`  |
| Polygon Amoy            | `80002`     |
| Avalanche Fuji          | `43113`     |
| BNB Smart Chain Testnet | `97`        |
| Linea Sepolia           | `59141`     |
| ZKsync Sepolia          | `300`       |
| Scroll Sepolia          | `534351`    |
| Blast Sepolia           | `168587773` |
| Mantle Sepolia          | `5003`      |
| Unichain Sepolia        | `1301`      |
| opBNB Testnet           | `5611`      |
| Celo Sepolia            | `11142220`  |
| Monad Testnet           | `10143`     |
| Sei Testnet             | `1328`      |
| HyperEVM Testnet        | `998`       |
| MegaETH Testnet         | `6343`      |
| Hemi Testnet            | `743111`    |
| Robinhood Chain Testnet | `46630`     |

For chains not in the preconfigured list, `mm wallet balance` falls back to direct RPC queries via
Multicall3.

## Per-chain balances

Wallet balances and transfers are scoped to the chain you specify with `--chain-id`.
Fund each chain separately, or bridge with `mm swap execute` before transferring.

## Related commands

- [`mm chains list`](commands.md#mm-chains-list)
- [Send tokens](../guides/send-tokens.md)
