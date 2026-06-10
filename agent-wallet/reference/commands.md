---
description: Complete reference for all mm CLI commands and global flags.
keywords: [MetaMask, Agent Wallet, CLI, reference, mm]
---

# Commands reference

All `mm` commands accept global flags unless noted.

## Global flags

| Flag        | Short | Description                                              |
| ----------- | ----- | -------------------------------------------------------- |
| `--format`  | `-f`  | Output format: `text`, `json`, `yaml`, `toml`, or `toon` |
| `--json`    |       | Shorthand for `--format=json`                            |
| `--toon`    |       | Shorthand for `--format=toon`                            |
| `--verbose` | `-v`  | Show debug logs on standard error                        |

## `mm init`

Initialize wallet mode and trading mode.

```bash
mm init [--wallet server-wallet|byok] [--mode guard|beast]
mm init show
```

| Flag         | Required | Description                                                               |
| ------------ | -------- | ------------------------------------------------------------------------- |
| `--wallet`   | No       | `server-wallet` or `byok`                                                 |
| `--mode`     | No       | `guard` (recommended) or `beast` (server-wallet only)                     |
| `--mnemonic` | No       | Bring your own wallet only. Prefer the `MM_MNEMONIC` environment variable |

Environment variables: `MM_MNEMONIC`, `MM_PASSWORD` (bring your own wallet encryption).

## `mm login`

Sign in to MetaMask Agent Wallet.

```bash
mm login [google | email] [--token <token>] [--no-wait]
mm login google [--no-wait]
mm login email [--no-wait]
```

QR code sign-in (`mm login qr`) is coming soon.

| Flag        | Required | Description                                                                          |
| ----------- | -------- | ------------------------------------------------------------------------------------ |
| `--token`   | No       | Pre-minted token as `cliToken:cliRefreshToken`. Environment variable: `MM_CLI_TOKEN` |
| `--no-wait` | No       | Print sign-in URL and exit                                                           |

## `mm auth status`

Check authentication status. No additional flags beyond global flags.

## `mm logout`

Sign out and revoke the CLI session.

## `mm reset`

Clear local session and wallet state files.

## `mm chains list`

List supported EVM networks. No auth required.

## `mm wallet`

Wallet lifecycle and signing commands.

### `mm wallet create`

```bash
mm wallet create [--chain-namespace <namespace>] [--name <name>]
```

### `mm wallet list`

```bash
mm wallet list [--chain-namespace <namespace>]
```

### `mm wallet select`

```bash
mm wallet select [--chain-namespace <namespace>] [--id <id>] [--address <address>] [--name <name>]
```

### `mm wallet show`

```bash
mm wallet show [--chain-namespace <namespace>] [--id <id>] [--address <address>] [--name <name>]
```

### `mm wallet address`

```bash
mm wallet address [--chain-namespace <namespace>]
```

### `mm wallet balance`

```bash
mm wallet balance [--currency <code>] [--chain <chains>] [--token <token>] [--address <address>]
```

### `mm wallet sign-message`

```bash
mm wallet sign-message --message <text> --chain-id <id> [--wait]
```

### `mm wallet sign-typed-data`

```bash
mm wallet sign-typed-data --chain-id <id> --payload '<JSON>' [--wait]
```

### `mm wallet send-transaction`

```bash
mm wallet send-transaction --chain-id <id> --payload '<JSON>' [--wait]
```

### `mm wallet requests list`

List pending server-wallet requests. Server-wallet mode only.

### `mm wallet requests watch`

```bash
mm wallet requests watch --polling-id <id>
```

### `mm wallet password`

```bash
mm wallet password set --new=<password>
mm wallet password change --current=<old> --new=<new>
mm wallet password remove --current=<password>
```

## `mm transfer`

Send native currency or ERC-20 tokens on one EVM chain.

```bash
mm transfer --to <address> --amount <value> --chain-id <id> --token <symbol-or-address> [--wait]
```

| Flag         | Required | Description                              |
| ------------ | -------- | ---------------------------------------- |
| `--to`       | Yes      | Recipient hex address. ENS not supported |
| `--amount`   | Yes      | Human-readable amount                    |
| `--chain-id` | Yes      | EVM chain ID                             |
| `--token`    | Yes      | `native`, symbol, or ERC-20 address      |
| `--wait`     | No       | Block until complete (server-wallet)     |

## `mm swap`

### `mm swap quote`

```bash
mm swap quote --from <token> --to <token> --amount <amount> --from-chain <chain-id> [--to-chain <chain-id>] [--slippage <percent>]
```

### `mm swap execute`

```bash
mm swap execute --quote-id <id>
mm swap execute --from <token> --to <token> --amount <amount> --from-chain <chain-id> [--to-chain <chain-id>] [--slippage <percent>]
```

### `mm swap status`

```bash
mm swap status --quote-id <id> [--tx-hash <hash>]
```

## `mm perps`

<!-- vale off -->

Hyperliquid perpetuals commands. Most commands require `--venue hyperliquid`.

| Command                | Usage summary                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------- |
| `mm perps list-venues` | List supported venues                                                               |
| `mm perps dexs`        | `--venue <venue>`: list HIP-3 DEX identifiers (Hyperliquid)                         |
| `mm perps markets`     | `--venue <venue> [--symbol <symbol>]`                                               |
| `mm perps balance`     | `--venue <venue>`                                                                   |
| `mm perps positions`   | `--venue <venue>`                                                                   |
| `mm perps orders`      | `--venue <venue>`                                                                   |
| `mm perps quote`       | Quote before open                                                                   |
| `mm perps open`        | `--venue <venue> --symbol <symbol> --side long\|short --size <size> --leverage <n>` |
| `mm perps close`       | Close a position                                                                    |
| `mm perps modify`      | Modify leverage or TP/SL                                                            |
| `mm perps cancel`      | `--venue <venue> --order-id <id>`                                                   |
| `mm perps deposit`     | `--venue <venue> --amount <amount>`                                                 |
| `mm perps withdraw`    | Withdraw from venue                                                                 |
| `mm perps transfer`    | Transfer between spot and perpetual accounts                                        |

<!-- vale on -->

## `mm predict`

<!-- vale off -->

Polymarket prediction market commands.

| Command                     | Description                                  |
| --------------------------- | -------------------------------------------- |
| `mm predict setup`          | One-time predict setup                       |
| `mm predict deposit`        | Fund predict deposit wallet                  |
| `mm predict balance`        | Check predict balance                        |
| `mm predict mode`           | Set `mainnet` or `testnet`                   |
| `mm predict auth`           | Refresh predict credentials                  |
| `mm predict approve`        | Repair approvals                             |
| `mm predict status`         | Backend status                               |
| `mm predict markets search` | Search markets                               |
| `mm predict markets list`   | List markets with filters                    |
| `mm predict markets get`    | Inspect a market (slug, ID, or condition ID) |
| `mm predict quote`          | Preview order cost                           |
| `mm predict place`          | Place an order                               |
| `mm predict cancel`         | Cancel orders                                |
| `mm predict orders`         | List open orders                             |
| `mm predict positions`      | View positions                               |
| `mm predict withdraw`       | Withdraw pUSD from deposit wallet            |
| `mm predict book`           | Order book for a token                       |
| `mm predict watch`          | Watch a predict job                          |
| `mm predict geoblock`       | Check Polymarket geoblock for your IP        |

<!-- vale on -->

Run `mm predict <command> --help` for command-specific flags.

## `mm decode`

Decode hex-encoded EVM calldata into a function name, parameters, and a plain-language summary.
Use before signing unfamiliar raw transactions.

```bash
mm decode --payload <0x-calldata>
mm decode <0x-calldata>
```

| Flag        | Required | Description                            |
| ----------- | -------- | -------------------------------------- |
| `--payload` | Yes      | Hex-encoded calldata (also positional) |

## `mm price`

| Command               | Usage                                                 |
| --------------------- | ----------------------------------------------------- |
| `mm price spot`       | `--asset-ids <ids> [--vs <currency>] [--market-data]` |
| `mm price history`    | Historical prices                                     |
| `mm price currencies` | Supported quote currencies                            |
| `mm price networks`   | Supported price networks                              |

## `mm token`

| Command                    | Usage                                |
| -------------------------- | ------------------------------------ |
| `mm token assets`          | `--asset-ids <ids>`                  |
| `mm token networks`        | List token networks                  |
| `mm token list popular`    | `--chain <chain>`                    |
| `mm token list trending`   | `--chain <chain>`                    |
| `mm token list search`     | `--query <query> [--chain <chains>]` |
| `mm token list top-gainer` | `--chain <chain>`                    |

## Help

Every command supports `--help`:

```bash
mm transfer --help
mm perps open --help
```
