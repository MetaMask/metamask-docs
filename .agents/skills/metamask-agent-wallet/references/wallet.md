# Wallet Commands

Use the `wallet` commands to create, list, select, inspect wallets, and check balances.

## `wallet create` Command

Create a new wallet under the authenticated account.

### Syntax

```bash
mm-dev wallet create [--chain-namespace <namespace>] [--name <name>] [--trading-mode <mode>] [--password <password>]
```

### Supported Flags

| Name                | Required | Description                                                                                                                                                                     |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--chain-namespace` | No       | Wallet chain namespace: `evm` (EIP-155) or `solana` (allowed: `evm`, `solana`)                                                                                                  |
| `--name`            | No       | Display name for the wallet                                                                                                                                                     |
| `--trading-mode`    | No       | Trading mode for server wallets: `guard` (enforces outflow/whitelist policies) or `beast` (skips policy checks). Only applies to server-wallet mode (allowed: `guard`, `beast`) |
| `--password`        | No       | Password to unlock the BYOK mnemonic (BYOK mode only) [env: `MM_PASSWORD`]                                                                                                      |

### Example

```bash
mm-dev wallet create --chain-namespace evm
mm-dev wallet create --chain-namespace evm --name "Trading"
mm-dev wallet create --chain-namespace evm --name "Fast Trading" --trading-mode beast
```

## `wallet list` Command

List all wallets associated with the authenticated account.

### Syntax

```bash
mm-dev wallet list [--chain-namespace <namespace>] [--toon]
```

### Supported Flags

| Name                | Required | Description                                                                 |
| ------------------- | -------- | --------------------------------------------------------------------------- |
| `--chain-namespace` | No       | Filter by namespace: `evm` (EIP-155) or `solana` (allowed: `evm`, `solana`) |

### Example

```bash
mm-dev wallet list
mm-dev wallet list --chain-namespace solana --toon
```

## `wallet select` Command

Switch the active wallet used for subsequent commands.

### Syntax

```bash
mm-dev wallet select [--chain-namespace <namespace>] [--id <id>] [--address <address>] [--name <name>]
```

### Supported Flags

| Name                | Required | Description                                                                 |
| ------------------- | -------- | --------------------------------------------------------------------------- |
| `--chain-namespace` | No       | Filter by namespace: `evm` (EIP-155) or `solana` (allowed: `evm`, `solana`) |
| `--id`              | No       | Wallet ID                                                                   |
| `--address`         | No       | Wallet address (0x-prefixed hex)                                            |
| `--name`            | No       | Wallet display name                                                         |

### Example

```bash
mm-dev wallet select --address 0x742d...f2bD18
mm-dev wallet select --name "Trading"
```

## `wallet show` Command

Display details for a specific wallet or the currently active wallet.

### Syntax

```bash
mm-dev wallet show [--chain-namespace <namespace>] [--id <id>] [--address <address>] [--name <name>]
```

### Supported Flags

| Name                | Required | Description                                                                 |
| ------------------- | -------- | --------------------------------------------------------------------------- |
| `--chain-namespace` | No       | Filter by namespace: `evm` (EIP-155) or `solana` (allowed: `evm`, `solana`) |
| `--id`              | No       | Wallet ID                                                                   |
| `--address`         | No       | Wallet address (0x-prefixed hex)                                            |
| `--name`            | No       | Wallet display name                                                         |

### Example

```bash
mm-dev wallet show
mm-dev wallet show --address 0x742d...f2bD18
```

## `wallet address` Command

Print the address of the currently active wallet.

### Syntax

```bash
mm-dev wallet address [--chain-namespace <namespace>]
```

### Supported Flags

| Name                | Required | Description                                                                    |
| ------------------- | -------- | ------------------------------------------------------------------------------ |
| `--chain-namespace` | No       | Wallet chain namespace: `evm` (EIP-155) or `solana` (allowed: `evm`, `solana`) |

### Example

```bash
mm-dev wallet address
mm-dev wallet address --chain-namespace eip155
```

## `wallet balance` Command

Show native and token balances for the active wallet.

### Syntax

```bash
mm-dev wallet balance [--currency <code>] [--chain <chains>] [--token <token>] [--address <address>] [--testnet] [--testnet-chain-id <ids>] [--token-contracts <addresses>]
```

### Supported Flags

| Name                 | Required | Description                                                                                                                                                   |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--currency`         | No       | Fiat currency code for price conversion (e.g. usd, eur)                                                                                                       |
| `--chain`            | No       | Comma-separated chain filters (e.g. `1,137` or `eip155:1`). Run `mm-dev chains list` to see options                                                           |
| `--token`            | No       | Filter by token symbol, contract address, or CAIP-19 asset ID (e.g. USDC, 0xa0b8...)                                                                          |
| `--address`          | No       | Wallet address (0x-prefixed hex)                                                                                                                              |
| `--testnet`          | No       | Read balances via RPC on Arbitrum Sepolia, Amoy, and Sepolia testnets                                                                                         |
| `--testnet-chain-id` | No       | Comma-separated EVM testnet chain IDs for on-chain RPC balance reads (e.g. `421614,80002`)                                                                    |
| `--token-contracts`  | No       | Comma-separated ERC-20 contract addresses for testnet RPC chains (0x-prefixed hex). Use with `--testnet-chain-id` to read specific token balances on testnets |

### Example

```bash
mm-dev wallet balance
mm-dev wallet balance --chain 8453
mm-dev wallet balance --token USDC
mm-dev wallet balance --currency eur
mm-dev wallet balance --testnet
mm-dev wallet balance --testnet-chain-id 421614 --token-contracts 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
```
