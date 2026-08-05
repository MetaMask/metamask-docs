---
description: Supported EVM chains for MetaMask Agent Wallet.
keywords: [MetaMask, Agent Wallet, chains, networks, EVM]
---

# Supported chains

MetaMask Agent Wallet supports EVM chains configured in the Accounts API.
The authoritative list for your CLI version is the output of `mm chains list`.

## List supported chains

```bash
mm chains list
```

For machine-readable output:

```bash
mm chains list --json
```

The JSON output includes per-network fields such as `shieldSupported` and `guardSupported`.
`shieldSupported` indicates whether [Transaction Shield](https://support.metamask.io/manage-crypto/transactions/transaction-shield/)
coverage applies on that network.
All networks listed below support Guard Mode (`guardSupported: true`).

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

| Network         | Chain ID      | Transaction Shield |
| --------------- | ------------- | ------------------ |
| Ethereum        | `1`           | Yes                |
| Optimism        | `10`          | Yes                |
| BNB Smart Chain | `56`          | Yes                |
| Unichain        | `130`         | No                 |
| Polygon         | `137`         | Yes                |
| Monad           | `143`         | Yes                |
| opBNB           | `204`         | No                 |
| ZKsync Era      | `324`         | No                 |
| HyperEVM        | `999`         | Yes                |
| Sei             | `1329`        | Yes                |
| MegaETH         | `4326`        | Yes                |
| Robinhood Chain | `4663`        | Yes                |
| Mantle          | `5000`        | No                 |
| Base            | `8453`        | Yes                |
| Arbitrum        | `42161`       | Yes                |
| Celo            | `42220`       | No                 |
| Hemi            | `43111`       | No                 |
| Avalanche       | `43114`       | Yes                |
| Linea           | `59144`       | Yes                |
| Blast           | `81457`       | No                 |
| Scroll          | `534352`      | No                 |
| Palm            | `11297108109` | No                 |

### Testnets

| Network                 | Chain ID    | Transaction Shield |
| ----------------------- | ----------- | ------------------ |
| BNB Smart Chain Testnet | `97`        | No                 |
| ZKsync Sepolia          | `300`       | No                 |
| HyperEVM Testnet        | `998`       | No                 |
| Unichain Sepolia        | `1301`      | No                 |
| Sei Testnet             | `1328`      | No                 |
| Robinhood Chain Testnet | `46630`     | Yes                |
| Mantle Sepolia          | `5003`      | No                 |
| opBNB Testnet           | `5611`      | No                 |
| MegaETH Testnet         | `6343`      | No                 |
| Monad Testnet           | `10143`     | No                 |
| Avalanche Fuji          | `43113`     | No                 |
| Linea Sepolia           | `59141`     | No                 |
| Polygon Amoy            | `80002`     | No                 |
| Base Sepolia            | `84532`     | Yes                |
| Arbitrum Sepolia        | `421614`    | No                 |
| Scroll Sepolia          | `534351`    | No                 |
| Ethereum Hoodi          | `560048`    | No                 |
| Hemi Testnet            | `743111`    | No                 |
| Celo Sepolia            | `11142220`  | No                 |
| Ethereum Sepolia        | `11155111`  | Yes                |
| Optimism Sepolia        | `11155420`  | No                 |
| Blast Sepolia           | `168587773` | No                 |

For chains not covered by the Accounts API, `mm wallet balance` falls back to direct RPC queries
via Multicall3.

## Per-chain balances

Wallet balances and transfers are scoped to the chain you specify with `--chain-id`.
Fund each chain separately, or bridge with `mm swap execute` before transferring.

## Related commands

- [`mm chains list`](commands.md#mm-chains-list)
- [Send tokens](../guides/send-tokens.md)
