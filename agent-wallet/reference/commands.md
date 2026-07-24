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

## `mm doctor`

Inspect CLI version, installed skills, environment, and session health.
Does not require authentication or initialization.

```bash
mm doctor
```

| Field               | Description                                                                |
| ------------------- | -------------------------------------------------------------------------- |
| `authenticated`     | Whether the CLI session is valid                                           |
| `initialized`       | Whether wallet mode and trading mode are set                               |
| `recommendedSkills` | Status of `metamask-agent-wallet`                                          |
| `compatible`        | Whether installed skills match the CLI version (`null` if no skills found) |
| `hints`             | Actionable guidance for missing skills, auth, init, or version mismatch    |

Run before the first wallet operation in a session.
Do not run wallet commands until both `authenticated` and `initialized` are `true`.

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

Use `mm wallet policy get` to view wallet policy YAML.
Policy is not included in `mm init show` output.

## `mm login`

Sign in to MetaMask Agent Wallet.

```bash
mm login [qr | browser] [--token <token>] [--timeout <seconds>] [--no-wait] [--otp-pair]
mm login browser [--no-wait]
mm login qr [--timeout <seconds>]
```

On a TTY, bare `mm login` shows a method picker (Dashboard and QR).
Use `mm login browser` for Google or email sign-in through the MetaMask dashboard.
The default browser flow opens the dashboard and prompts you to paste a CLI token back into the
terminal.
Use `--otp-pair` for the legacy 6-digit OTP pairing flow.
QR sign-in (`mm login qr`) is not available in production (`COMING_SOON`).

| Flag         | Required | Description                                                                            |
| ------------ | -------- | -------------------------------------------------------------------------------------- |
| `--token`    | No       | Pre-minted token as `cliToken:cliRefreshToken`. Environment variable: `MM_CLI_TOKEN`   |
| `--timeout`  | No       | Seconds to wait for QR or browser callback                                             |
| `--no-wait`  | No       | Print sign-in URL and exit. Use with `browser` in headless mode. Not supported with QR |
| `--otp-pair` | No       | Use legacy 6-digit OTP pairing instead of the default paste-token flow                 |

After you sign in successfully in server-wallet mode, the CLI syncs existing remote wallets from the
server.

## `mm auth status`

Check authentication status. No additional flags beyond global flags.

## `mm logout`

Sign out and revoke the CLI session.

## `mm reset`

Clear local session and wallet state files.

## `mm chains list`

List supported EVM networks. No auth required.
The output includes a `features` field per chain (for example, `swap`, `predict`, `perps`) and a
`relaySupported` flag indicating gasless relay availability.

## `mm wallet`

Wallet lifecycle and signing commands.

### `mm wallet create`

```bash
mm wallet create [--chain-namespace <namespace>] [--name <name>] [--trading-mode guard|beast]
```

Returns `policyYaml: string | null` in structured output.

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

Returns `policyYaml: string | null` in structured output.

### `mm wallet address`

```bash
mm wallet address [--chain-namespace <namespace>]
```

### `mm wallet add-fund`

Show a QR code and address to fund the active wallet.
In headless mode (`--json`), outputs the address only.

```bash
mm wallet add-fund [--chain-namespace <namespace>]
```

### `mm wallet balance`

```bash
mm wallet balance [--currency <code>] [--chain <chains>] [--token <token>] [--address <address>]
```

### `mm wallet trading-mode get`

Show the current trading mode and active server-wallet address.
Server-wallet mode only.

```bash
mm wallet trading-mode get
```

### `mm wallet trading-mode set`

Set the trading mode for the active server wallet.
Prompts for confirmation when switching to Beast mode.
This command blocks until the mode change is approved via MetaMask Mobile or email (2FA).
Use `--no-wait` to return immediately after the approval is requested.

```bash
mm wallet trading-mode set <guard|beast>
```

### `mm wallet policy get`

Show the policy YAML for the active server wallet.
Server-wallet mode only.

```bash
mm wallet policy get
```

### `mm wallet policy set`

Set the policy for the active server wallet.
Server-wallet mode only.
This command blocks until the policy change is approved via MetaMask Mobile or email (2FA).
Use `--no-wait` to return immediately after the approval is requested.

```bash
mm wallet policy set --policy <yaml>
```

### `mm wallet policy template`

Show the project policy template.
Server-wallet mode only.

```bash
mm wallet policy template
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
For ERC-20 transfers, the CLI automatically uses gasless relay when the wallet's native balance
cannot cover gas fees.

```bash
mm transfer --to <address> --amount <value> --chain-id <id> --token <symbol-or-address> [--gas-token <token>] [--wait]
```

| Flag          | Required | Description                                           |
| ------------- | -------- | ----------------------------------------------------- |
| `--to`        | Yes      | Recipient hex address. ENS not supported              |
| `--amount`    | Yes      | Human-readable amount                                 |
| `--chain-id`  | Yes      | EVM chain ID                                          |
| `--token`     | Yes      | `native`, symbol, or ERC-20 address                   |
| `--gas-token` | No       | Pay relay fees in an ERC-20 token (gasless transfers) |
| `--wait`      | No       | Block until complete (server-wallet)                  |

## `mm swap`

### `mm swap quote`

```bash
mm swap quote --from <token> --to <token> --amount <amount> --from-chain <chain-id> [--to-chain <chain-id>] [--to-address <address>] [--slippage <percent>] [--refuel] [--all-quotes] [--strategy <strategies>]
```

| Flag           | Required | Description                                                                                   |
| -------------- | -------- | --------------------------------------------------------------------------------------------- |
| `--to-chain`   | No       | Destination chain ID. The default is `--from-chain` for same-chain swaps                      |
| `--to-address` | No       | Recipient for bridged output tokens. Cross-chain only. The default is signer                  |
| `--slippage`   | No       | Maximum slippage as a percentage, 0–100 (default 0.5)                                         |
| `--refuel`     | No       | Bundle destination native-gas top-up into a cross-chain quote. Cross-chain only               |
| `--all-quotes` | No       | Show all ranked candidate quotes with the recommended quote marked (★)                        |
| `--strategy`   | No       | Comma-separated ranking strategy: `cost`, `speed`, `impact`, `output` (default: `cost,speed`) |

`--refuel` is opt-in and cross-chain only.
Do not use it when the destination token is the destination chain's native gas asset; the backend
returns `NO_QUOTES`.

The CLI streams quotes via SSE for faster response times.
Use `--all-quotes` to compare routes, then execute a specific one with `--quote-id`.
Old quote artifacts are automatically pruned after 24 hours.

### `mm swap execute`

```bash
mm swap execute --quote-id <id>
mm swap execute --from <token> --to <token> --amount <amount> --from-chain <chain-id> [--to-chain <chain-id>] [--to-address <address>] [--slippage <percent>] [--refuel]
```

When executing by `--quote-id`, the persisted quote retains `--to-address` and `--refuel` settings
from the quote step.

On eligible chains and accounts, the CLI uses **ERC-7821 batch execution** to atomically combine
approval and trade in a single `execute()` call. The result includes `route: "erc7821"` when
batching is used. If batching is not available, the CLI falls back to sequential submission.

When the wallet's native balance cannot cover gas, the CLI uses **gasless execution** via the
EIP-7702 relay for gas-included quotes.

The CLI runs an `INSUFFICIENT_FUNDS` preflight check before execution and returns actionable hints
if the source token balance is insufficient.

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

| Command                     | Description                                              |
| --------------------------- | -------------------------------------------------------- |
| `mm predict setup`          | One-time predict setup                                   |
| `mm predict deposit`        | Fund predict deposit wallet                              |
| `mm predict balance`        | Check predict balance                                    |
| `mm predict mode`           | Set `mainnet` or `testnet`                               |
| `mm predict auth`           | Refresh predict credentials                              |
| `mm predict approve`        | Repair approvals                                         |
| `mm predict status`         | Backend status                                           |
| `mm predict portfolio`      | Snapshot of pUSD balance, positions, redeemable winnings |
| `mm predict redeem list`    | List redeemable winning positions                        |
| `mm predict redeem`         | Redeem one or all winning positions                      |
| `mm predict markets search` | Search markets                                           |
| `mm predict markets list`   | List markets with filters                                |
| `mm predict markets get`    | Inspect a market (slug, ID, or condition ID)             |
| `mm predict events list`    | List Polymarket events with filters                      |
| `mm predict events get`     | Retrieve a single event by ID or slug                    |
| `mm predict series list`    | List event series                                        |
| `mm predict series get`     | Retrieve a single event series                           |
| `mm predict tags list`      | List Polymarket tags                                     |
| `mm predict tags get`       | Retrieve a tag by ID or slug                             |
| `mm predict quote`          | Preview order cost                                       |
| `mm predict place`          | Place an order                                           |
| `mm predict cancel`         | Cancel orders                                            |
| `mm predict orders`         | List open orders                                         |
| `mm predict positions`      | View positions                                           |
| `mm predict withdraw`       | Withdraw pUSD from deposit wallet                        |
| `mm predict book`           | Order book for a token                                   |
| `mm predict watch`          | Watch a predict job                                      |
| `mm predict geoblock`       | Check Polymarket geoblock for your IP                    |

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

## `mm earn`

Yield vault operations. Supply and withdraw from vaults across supported chains and protocols.

| Command             | Usage summary                                                                         |
| ------------------- | ------------------------------------------------------------------------------------- |
| `mm earn markets`   | `[--chain <chain>] [--protocol <protocol>] [--min-tvl <amount>]`                      |
| `mm earn positions` | View current yield positions                                                          |
| `mm earn supply`    | `--token <token> --amount <amount> [--chain <chain>] [--from-chain <chain>] [--wait]` |
| `mm earn withdraw`  | `--token <token> --amount <amount> [--chain <chain>]`                                 |

### `mm earn markets`

List available yield vaults with APY and TVL data.

```bash
mm earn markets [--chain <chain-id>] [--protocol <protocol>] [--min-tvl <amount>]
```

### `mm earn positions`

View your current yield vault positions.

```bash
mm earn positions
```

### `mm earn supply`

Supply tokens to a yield vault. The CLI handles ERC-20 approval automatically when the vault's
allowance is insufficient.

```bash
mm earn supply --token <token> --amount <amount> [--chain <chain-id>] [--from-chain <chain-id>] [--wait]
```

Use `--from-chain` for cross-chain supply operations that bridge and supply in one step.
Use `--wait` to poll until the position reflects in the portfolio (up to ~45 seconds) and display
an inline balance confirmation. Without `--wait`, the CLI prints a hint that positions may lag
15–30 seconds.

### `mm earn withdraw`

Withdraw tokens from a yield vault.

```bash
mm earn withdraw --token <token> --amount <amount> [--chain <chain-id>]
```

Use `--amount all` to withdraw your full position.
The CLI automatically retries failed withdrawals (up to 3 attempts with backoff).

## `mm config`

Get or set CLI configuration values.

```bash
mm config get <key>
mm config set <key> <value>
```

## `mm tx`

### `mm tx history`

List recent transactions for the active wallet or specific addresses.

```bash
mm tx history [--addresses <addrs>] [--chain <chains>] [--type <filter>] [--limit <n>]
```

### `mm tx get`

Look up a specific transaction by hash.

```bash
mm tx get <tx-hash>
```

Returns `TX_NOT_FOUND` for unknown hashes and `INVALID_TX_HASH` for malformed input.

## Help

Every command supports `--help`:

```bash
mm transfer --help
mm perps open --help
```
