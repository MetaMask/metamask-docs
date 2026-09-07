---
description: Complete reference for all mm CLI commands and global flags.
keywords: [MetaMask, Agent Wallet, CLI, reference, mm]
---

# Commands reference

All `mm` commands accept global flags unless noted.

## Global flags

| Flag        | Short | Description                                                                               |
| ----------- | ----- | ----------------------------------------------------------------------------------------- |
| `--format`  | `-f`  | Output format: `text`, `json`, or `toon` (defaults to `text` in a TTY, `json` when piped) |
| `--json`    |       | Shorthand for `--format=json`                                                             |
| `--toon`    |       | Shorthand for `--format=toon`                                                             |
| `--verbose` | `-v`  | Show debug logs on standard error                                                         |

Many signing and transfer commands also accept `--password` (environment variable: `MM_PASSWORD`) in
bring your own wallet mode to unlock an encrypted mnemonic.

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

| Flag         | Required | Description                                                                  |
| ------------ | -------- | ---------------------------------------------------------------------------- |
| `--wallet`   | No       | `server-wallet` or `byok`                                                    |
| `--mode`     | No       | `guard` (recommended) or `beast` (server-wallet only)                        |
| `--mnemonic` | No       | Bring your own wallet only. Prefer the `MM_MNEMONIC` environment variable    |
| `--password` | No       | Encrypts the mnemonic at rest. Prefer the `MM_PASSWORD` environment variable |

Environment variables: `MM_MNEMONIC`, `MM_PASSWORD` (bring your own wallet encryption).

Use `mm wallet policy get` to view wallet policy YAML.
Policy is not included in `mm init show` output.

## `mm login`

Sign in to MetaMask Agent Wallet.

```bash
mm login [qr | browser] [--token <token>] [--no-wait] [--otp-pair]
mm login browser [--no-wait] [--otp-pair]
mm login qr
```

On a TTY, bare `mm login` shows a method picker (**MetaMask Mobile QR** or **Dashboard (browser)**).
Choosing **Dashboard (browser)** is equivalent to `mm login browser`.

### Browser sign-in (`mm login browser`)

Use for Google or email sign-in through the MetaMask dashboard at
`https://developer.metamask.io/agentic/login`.

1. Opens the dashboard in your browser.
2. Completes Google or email authentication (email sign-in includes a browser email verification
   OTP step).
3. Prompts you to click **Authorize**.
4. Displays a CLI token (`cliToken:cliRefreshToken`) to copy and paste into the waiting terminal.

Google sign-in skips the email verification OTP step.

For non-interactive or CI flows, use `mm login browser --no-wait` to print the sign-in URL, then
complete login with `mm login --token "<cliToken:cliRefreshToken>"` after the user authorizes in the
browser.

Use `--otp-pair` for the legacy 6-digit pairing-code flow instead of the default CLI token paste.

### MetaMask Mobile QR (`mm login qr`)

Displays a QR code in the terminal. Scan it with **MetaMask Mobile** and approve the connection in
the app. The CLI waits for the scan and does not support `--no-wait`.

Available in production. QR sign-in is the recommended path when you already use MetaMask Mobile and
want transaction approvals as Mobile push notifications.

:::caution Three sign-in methods, three wallet addresses

**Google**, **email passwordless**, and **MetaMask Mobile QR** each load a different server-wallet
address.
Using the same email for all three does not link them to one wallet.
After sign-in, run `mm wallet address` to confirm the expected address.
See [Troubleshooting](../troubleshooting.md) for sign-in errors and wallet recovery.

:::

| Flag         | Required | Description                                                                                                                                            |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--token`    | No       | Pre-minted token as `cliToken:cliRefreshToken`. Environment variable: `MM_CLI_TOKEN`                                                                   |
| `--timeout`  | No       | Seconds to wait for the QR or browser callback                                                                                                         |
| `--no-wait`  | No       | Print sign-in URL and exit. Use with `browser` in headless mode. Not supported with QR                                                                 |
| `--otp-pair` | No       | Use legacy 6-digit OTP pairing instead of the default CLI token paste flow. Browser sign-in only, and cannot be combined with `--no-wait` or `--token` |

Common sign-in errors: `PAIRING_EXPIRED`, `INVALID_OTP`, `MWP_TIMEOUT`, and `MWP_CANCELLED`.
Re-run `mm login browser` or `mm login qr` and complete the flow before the session expires.

After you sign in successfully in server-wallet mode, the CLI syncs existing remote wallets for the
developer project tied to your sign-in method.
Run `mm wallet list` and `mm wallet address` to verify the active wallet.

## `mm auth status`

Check authentication status. No additional flags beyond global flags.

## `mm logout`

Sign out and revoke the CLI session.
When no CLI auth session is stored, returns `reason: ALREADY_LOGGED_OUT` with a hint to run
`mm login` instead of the same success payload as a real sign-out. Still exits with code 0.

```bash
mm logout [--yes]
```

## `mm reset`

Clear local session and wallet state files.

```bash
mm reset [--yes]
```

## `mm chains list`

List supported EVM networks. No auth required.
The output includes a `features` field per chain (for example, `swap`, `predict`, `perps`) and a
`relaySupported` flag indicating gasless relay availability.

## `mm wallet`

Wallet lifecycle and signing commands.

### `mm wallet create`

```bash
mm wallet create [--chain-namespace <namespace>] [--name <name>]
```

Returns `policyYaml: string | null` in structured output.

### `mm wallet list`

```bash
mm wallet list [--chain-namespace <namespace>]
```

### `mm wallet select`

```bash
mm wallet select [<address>] [--chain-namespace <namespace>]
```

Pass the wallet address as a positional argument, such as `mm wallet select 0x1234…`.
In an interactive terminal, run `mm wallet select` with no address to choose from your wallets.
Headless runs require the address; omitting it returns `MISSING_WALLET_REF`.

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
mm wallet balance [--currency <code>] [--chain-ids <chains>] [--token <token>] [--address <address>] [--testnet] [--testnet-chain-ids <ids>] [--token-contracts <addresses>]
```

| Flag                  | Required | Description                                                                                             |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `--currency`          | No       | Fiat currency code for price conversion, such as `usd` or `eur`                                         |
| `--chain-ids`         | No       | Comma-separated chain filters, such as `1,137` or `eip155:1`                                            |
| `--token`             | No       | Filter by token symbol, contract address, or CAIP-19 asset ID                                           |
| `--address`           | No       | Wallet address to query instead of the active wallet                                                    |
| `--testnet`           | No       | Read balances over RPC on Arbitrum Sepolia, Amoy, and Sepolia                                           |
| `--testnet-chain-ids` | No       | Comma-separated testnet chain IDs for onchain RPC balance reads, such as `421614`                       |
| `--token-contracts`   | No       | Comma-separated ERC-20 contract addresses to read on testnet RPC chains. Use with `--testnet-chain-ids` |

Balances are returned even when the Price API cannot price every asset.
Assets without a price are listed under `unpricedAssetIds` in structured output and shown as
`unpriced` in the terminal, instead of failing the whole command.

### `mm wallet trading-mode get`

Show the current trading mode and active server-wallet address.
Server-wallet mode only.

```bash
mm wallet trading-mode get [--chain-namespace <namespace>] [--address <address>]
```

### `mm wallet trading-mode set`

Set the trading mode for the active server wallet.
Prompts for confirmation when switching to Beast mode.
This command blocks until the mode change is approved via MetaMask Mobile or email (2FA).
Use `--no-wait` to return immediately after the approval is requested.

```bash
mm wallet trading-mode set <guard|beast> [--chain-namespace <namespace>] [--address <address>] [--no-wait]
```

### `mm wallet policy get`

Show the policy YAML for the active server wallet.
Server-wallet mode only.

```bash
mm wallet policy get
```

This command always reads the policy of the active server wallet and takes no target flags.
To read another wallet's policy, switch to it with `mm wallet select` first.

### `mm wallet policy set`

Set the policy for the active server wallet.
Server-wallet mode only.
This command blocks until the policy change is approved via MetaMask Mobile or email (2FA).
Use `--no-wait` to return immediately after the approval is requested.

```bash
mm wallet policy set --policy <yaml> [--no-wait]
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
mm wallet sign-typed-data --chain-id <id> --payload '<JSON>' [--wait] [--intent <text>]
```

### `mm wallet send-transaction`

```bash
mm wallet send-transaction --chain-id <id> --payload '<JSON>' [--wait] [--intent <text>]
```

The payload requires at least a `to` address.
Optional fields are `gas`, `nonce`, `maxFeePerGas`, and `maxPriorityFeePerGas`.
The `value` field must be 0x-prefixed hex, not a decimal wei string.

`--intent` attaches a human-readable summary to the wallet request, so you see what you are
approving during 2FA and in `mm wallet requests list`.

### `mm wallet requests list`

List pending server-wallet requests. Server-wallet mode only.

```bash
mm wallet requests list [--sync]
```

Requests are synced from the server before listing. Pass `--no-sync` to skip the refresh.

### `mm wallet requests watch`

```bash
mm wallet requests watch <polling-id> [--wallet-timeout <seconds>]
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
mm transfer --to <address> --amount <value> --chain-id <id> --token <symbol-or-address> [--wait]
```

| Flag         | Required | Description                              |
| ------------ | -------- | ---------------------------------------- |
| `--to`       | Yes      | Recipient hex address. ENS not supported |
| `--amount`   | Yes      | Human-readable amount                    |
| `--chain-id` | Yes      | EVM chain ID                             |
| `--token`    | Yes      | `native`, symbol, or ERC-20 address      |
| `--wait`     | No       | Block until complete (server-wallet)     |

When the wallet's native balance cannot cover gas, the CLI uses gasless relay and chooses relay fees
automatically.
Gasless relay applies to ERC-20 transfers only, not native token sends, and only on chains that
support it. Unsupported chains return `GASLESS_UNSUPPORTED`.

## `mm swap`

### `mm swap quote`

```bash
mm swap quote --from <token> --to <token> --amount <amount> --from-chain-id <chain-id> [--to-chain-id <chain-id>] [--to-address <address>] [--slippage <percent>] [--refuel] [--all-quotes] [--strategy <strategies>] [--yes]
```

| Flag            | Required | Description                                                                                                 |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| `--to-chain-id` | No       | Destination chain ID. The default is `--from-chain-id` for same-chain swaps                                 |
| `--to-address`  | No       | Recipient for bridged output tokens. Cross-chain only. The default is signer                                |
| `--slippage`    | No       | Maximum slippage as a percentage, 0–100 (default 0.5)                                                       |
| `--refuel`      | No       | Bundle destination native-gas top-up into a cross-chain quote. Cross-chain only                             |
| `--all-quotes`  | No       | Show all ranked candidate quotes with the recommended quote marked (★)                                      |
| `--strategy`    | No       | Comma-separated ranking strategy: `cost`, `speed`, `impact`, `output` (default: `cost,speed`)               |
| `--yes`         | No       | Skip interactive confirmation and execute immediately after quoting. Cannot be combined with `--all-quotes` |

`--refuel` is opt-in and cross-chain only.
Do not use it when the destination token is the destination chain's native gas asset; the backend
returns `NO_QUOTES`.

The CLI streams quotes via SSE for faster response times.
Use `--all-quotes` to compare routes, then execute a specific one with `--quote-id`.
Old quote artifacts are automatically pruned after 24 hours.

Quote output includes `tierName` and `vipTier` when a VIP fee tier applies.
When a tier is present, `quoteBpsFee` reflects the discounted rate rather than `baseBpsFee`.

When the bridge returns zero routes for actionable reasons, `mm swap quote` returns a soft
unavailable result (exit 0) with `kind: "unavailable"`, a `reason` (such as `AMOUNT_TOO_LOW`,
`SLIPPAGE_TOO_HIGH`, or `NO_QUOTES`), a `message`, and a `hint`. Only the transient `QUOTE_RETRY`
signal produces a hard error (exit 1).

### `mm swap execute`

```bash
mm swap execute --quote-id <id> [--wallet-timeout <seconds>]
mm swap execute --from <token> --to <token> --amount <amount> --from-chain-id <chain-id> [--to-chain-id <chain-id>] [--to-address <address>] [--slippage <percent>] [--refuel] [--strategy <strategies>] [--wallet-timeout <seconds>]
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

MFA poll timeouts on gasless relay and sequential server-wallet legs surface `RELAY_TIMEOUT` or
`JOB_TIMEOUT` errors with a recovery hint to run `mm wallet requests watch <id>` and
a warning not to re-run execute while the job may still complete. Gasless relay polling honors
`--wallet-timeout` and the CLI's 10-minute default.

### `mm swap status`

```bash
mm swap status --quote-id <id> [--tx-hash <hash>]
```

## `mm perps`

<!-- vale off -->

Hyperliquid perpetuals commands.

`--venue` is optional on every command and defaults to `hyperliquid`.
Run `mm perps list-venues` for the current list.
`--network` is optional and defaults to `mainnet`; pass `--network testnet` to trade on the
venue's testnet.
Balance, positions, and orders default to the main Hyperliquid DEX.
Use `--dex <name>` to scope a HIP-3 DEX, or `--all-dexes` (balance and positions only) to
aggregate across DEXs.

Perps commands do not use `--wait`.
`--yes` skips the confirmation prompt on `open`, `close`, `modify`, and `cancel`.
Deposit, withdraw, and transfer accept `--yes` but do not prompt, so it has no effect there.

| Command                | Usage summary                                                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mm perps list-venues` | List supported venues                                                                                                                                          |
| `mm perps dexs`        | `[--venue <venue>] [--network <network>]`: list HIP-3 DEX identifiers                                                                                          |
| `mm perps markets`     | `[--venue <venue>] [--symbol <symbol>] [--symbols <list>] [--dex <dex>] [--network <network>]`                                                                 |
| `mm perps balance`     | `[--venue <venue>] [--dex <dex>] [--all-dexes] [--network <network>]`                                                                                          |
| `mm perps positions`   | `[--venue <venue>] [--dex <dex>] [--all-dexes] [--network <network>]`                                                                                          |
| `mm perps orders`      | `[--venue <venue>] [--dex <dex>] [--network <network>]`                                                                                                        |
| `mm perps quote`       | `--symbol <symbol> --side long\|short --size <size> --leverage <n> [--type market\|limit] [--limit-px <price>]`                                                |
| `mm perps open`        | `--symbol <symbol> --side long\|short --size <size> --leverage <n> [--type market\|limit] [--limit-px <price>] [--max-slippage-bps <bps>] [--dry-run] [--yes]` |
| `mm perps close`       | `[--symbol <symbol>] [--size <size>] [--all] [--max-slippage-bps <bps>] [--dry-run] [--yes]`                                                                   |
| `mm perps modify`      | `--symbol <symbol> [--leverage <n>] [--tp <price>] [--sl <price>] [--dry-run] [--yes]`                                                                         |
| `mm perps cancel`      | `--order-id <id> [--symbol <symbol>] [--dry-run] [--yes]`                                                                                                      |
| `mm perps deposit`     | `--amount <amount> [--asset <asset>] [--source-chain-id <chain>] [--dry-run] [--yes]`                                                                          |
| `mm perps withdraw`    | `--amount <amount> [--asset <asset>] [--destination <address>] [--include-spot] [--dry-run] [--yes]`                                                           |
| `mm perps transfer`    | `--amount <amount> --direction spot-to-perp\|perp-to-spot [--asset <asset>] [--dry-run]`                                                                       |

Notes on individual flags:

- `--limit-px` is required when `--type` is `limit`.
- `mm perps close` requires `--symbol` unless you pass `--all`. `--size` performs a partial close
  and cannot be combined with `--all`.
- `mm perps modify` requires at least one of `--leverage`, `--tp`, or `--sl`.
- `mm perps cancel --symbol` is optional and skips an open-order lookup.
- `--source-chain-id` accepts a decimal chain ID or CAIP-2 ID. It defaults to Arbitrum
  (`eip155:42161` on mainnet, `eip155:421614` on testnet).
- `--asset` defaults to `USDC` on deposit, withdraw, and transfer.
- `--dry-run` validates and previews without signing or submitting.

<!-- vale on -->

## `mm predict`

<!-- vale off -->

Polymarket prediction market commands.

| Command                     | Description                                                                          |
| --------------------------- | ------------------------------------------------------------------------------------ |
| `mm predict setup`          | One-time predict setup                                                               |
| `mm predict deposit`        | Fund predict deposit wallet                                                          |
| `mm predict balance`        | Check predict balance                                                                |
| `mm predict mode`           | Set `mainnet` or `testnet`                                                           |
| `mm predict auth`           | Refresh predict credentials                                                          |
| `mm predict approve`        | Repair approvals                                                                     |
| `mm predict status`         | Backend status                                                                       |
| `mm predict portfolio`      | Snapshot of pUSD balance, positions, redeemable winnings                             |
| `mm predict redeem list`    | List redeemable winning positions                                                    |
| `mm predict redeem`         | Redeem one or all winning positions                                                  |
| `mm predict markets search` | Search markets                                                                       |
| `mm predict markets list`   | List markets with filters                                                            |
| `mm predict markets get`    | Inspect a market (slug, ID, or condition ID)                                         |
| `mm predict events list`    | List Polymarket events with filters                                                  |
| `mm predict events get`     | Retrieve a single event by ID or slug                                                |
| `mm predict series list`    | List event series                                                                    |
| `mm predict series get`     | Retrieve a single event series                                                       |
| `mm predict tags list`      | List Polymarket tags                                                                 |
| `mm predict tags get`       | Retrieve a tag by ID or slug                                                         |
| `mm predict quote`          | Preview order cost (supports `--tick-size`)                                          |
| `mm predict place`          | Place an order (supports `--tick-size`)                                              |
| `mm predict cancel`         | Cancel orders                                                                        |
| `mm predict orders`         | List open orders                                                                     |
| `mm predict positions`      | View positions                                                                       |
| `mm predict withdraw`       | Withdraw pUSD from deposit wallet                                                    |
| `mm predict book`           | Order book for a token                                                               |
| `mm predict watch`          | Watch a predict job                                                                  |
| `mm predict geoblock`       | Check Polymarket geoblock for your IP                                                |
| `mm predict history`        | List closed positions by default; use `--type trade` or `--type redeem` for activity |
| `mm predict history get`    | Inspect activity for a specific market condition                                     |

`mm predict quote` and `mm predict place` accept an optional `--tick-size` flag to override the
market's default tick size. Valid values: `0.1`, `0.01`, `0.005`, `0.0025`, `0.001`, `0.0001`.
Defaults to the CLOB tick size for the token. An unsupported value returns `INVALID_TICK_SIZE`.

`mm predict place` also accepts `--order-type` (`GTC` by default, or `GTD`, `FOK`, `FAK`),
`--post-only` to reject an order that would cross the book, and `--expiration <unix>`, which is
required for `GTD` orders. `--post-only` is not supported with `FOK` or `FAK`.

### `mm predict history`

List deposit-wallet history. Defaults to **closed positions** with signed `pnl`.
Use `--type trade` for fill activity or `--type redeem` for past claims.
Open holdings remain on `mm predict positions`.
`--start` and `--end` apply only when `--type` is `trade` or `redeem`.

```bash
mm predict history [--type closed|trade|redeem] [--limit <n>] [--offset <n>] [--start <unix>] [--end <unix>] [--sort-by realizedpnl|title|price|avgprice|timestamp|tokens|cash] [--sort-direction asc|desc] [--side buy|sell]
```

| Flag               | Required | Description                                                                |
| ------------------ | -------- | -------------------------------------------------------------------------- |
| `--type`           | No       | `closed` (default), `trade`, or `redeem`                                   |
| `--limit`          | No       | Page size, 1–500. `closed` caps at 50; `trade` and `redeem` default to 100 |
| `--offset`         | No       | Skip the first N results (pagination, zero-based)                          |
| `--start`          | No       | Start timestamp in unix seconds (`trade` or `redeem` only)                 |
| `--end`            | No       | End timestamp in unix seconds (`trade` or `redeem` only)                   |
| `--sort-by`        | No       | Sort field. Depends on `--type`, see the following table                   |
| `--sort-direction` | No       | Sort direction: `asc` or `desc`. The default is `desc`                     |
| `--side`           | No       | Filter by side: `buy` or `sell` (`trade` only)                             |

Valid `--sort-by` values depend on `--type`.
Passing a value from the wrong set returns `PREDICT_HISTORY_INVALID_SORT_BY`.

| `--type`           | Valid `--sort-by` values                                 |
| ------------------ | -------------------------------------------------------- |
| `closed` (default) | `realizedpnl`, `title`, `price`, `avgprice`, `timestamp` |
| `trade`, `redeem`  | `timestamp` (default), `tokens`, `cash`                  |

### `mm predict history get`

Inspect deposit-wallet activity for a specific market condition.

```bash
mm predict history get <condition-id> [--type closed|trade|redeem]
```

| Flag     | Required | Description                              |
| -------- | -------- | ---------------------------------------- |
| `--type` | No       | `closed` (default), `trade`, or `redeem` |

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

| Command               | Usage                                                                                                                         |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `mm price spot`       | `--asset-ids <ids> [--vs <currency>] [--market-data]`                                                                         |
| `mm price history`    | `--chain-id <caip2> [--asset-type <type>] [--time-period <period>] [--interval <interval>] [--from] [--to] [--vs <currency>]` |
| `mm price currencies` | Supported quote currencies                                                                                                    |
| `mm price networks`   | Supported price networks                                                                                                      |

### `mm price spot`

```bash
mm price spot --asset-ids <ids> [--vs <currency>] [--market-data]
```

`--asset-ids` accepts comma-separated CAIP-19 asset IDs, such as `eip155:1/slip44:60`.
A bare CAIP-2 chain ID auto-completes to that chain's native asset, so `eip155:1` resolves to
`eip155:1/slip44:60`:

```bash
mm price spot --asset-ids eip155:1,eip155:137
```

A malformed ID returns `INVALID_ASSET_ID` with a hint, and passing no IDs returns
`MISSING_ASSET_IDS`. `mm token assets` does not auto-complete chain IDs and requires full CAIP-19
asset IDs.

### `mm price history`

```bash
mm price history --chain-id <caip2-chain-id> [--asset-type <asset-type>] [--time-period <period>] [--interval <interval>] [--from <unix>] [--to <unix>] [--vs <currency>]
```

`--asset-type` is optional and defaults to the chain's native asset, so `--chain-id eip155:1`
resolves to `slip44:60`. An invalid asset type fails fast with `INVALID_ASSET_ID`.

Use `--from` and `--to` for a custom range instead of `--time-period`.
`--time-period` accepts Price API values such as `1d`, `7d`, `30d`, `2M`, `1y`, and `3y`.
Supported `--interval` values include `5m`, `15m`, `30m`, `hourly`, and `daily`.
The Price API accepts `5m`, `hourly`, and `daily` directly; `15m` and `30m` are downsampled from
5m data client-side.

When the Price API returns an empty or malformed response, the command returns `INVALID_DATA` with a
hint to retry or verify the asset and chain with `mm price spot`.

## `mm token`

| Command                    | Usage                                                                                                                                                                                        |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mm token assets`          | `--asset-ids <ids> [--include-market-data] [--include-token-security-data] [--include-labels] [--include-aggregators] [--include-coingecko-id] [--include-occurrences] [--include-rwa-data]` |
| `mm token networks`        | List token networks                                                                                                                                                                          |
| `mm token list popular`    | `[--chain-id <chain>]`                                                                                                                                                                       |
| `mm token list trending`   | `[--chain-id <chain>]`                                                                                                                                                                       |
| `mm token list search`     | `<query> [--chain-ids <chains>] [--limit <n>] [--after <cursor>]`                                                                                                                            |
| `mm token list top-gainer` | `[--chain-id <chain>]`                                                                                                                                                                       |

`mm token list search` takes the search term as a positional argument:

```bash
mm token list search USDC --chain-ids 1,137
```

The `--query` flag still works for backward compatibility.
Passing neither returns `MISSING_QUERY`.

`--chain-id` and `--chain-ids` accept a chain ID, a CAIP-2 ID, or a configured chain key.
They default to the active wallet's chain, or `eip155:1` when no wallet is selected.
On `mm token list search`, `--limit` defaults to 10 and accepts 1–500.

## `mm earn`

Yield vault operations. Supply and withdraw from vaults across supported chains and protocols.

| Command             | Usage summary                                                                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `mm earn markets`   | `[--chain-id <chain-id>] [--token <symbol\|address>] [--protocol <protocol>] [--min-tvl <usd>] [--sort apy\|tvl] [--limit <n>]`                                                      |
| `mm earn positions` | `[--chain-id <chain-id>] [--address <address>] [--token <symbol\|address>] [--protocol <name>] [--vault <address>] [--min-usd <n>] [--sort usd] [--limit <n>]`                       |
| `mm earn supply`    | `--token <token> --amount <amount> --chain-id <chain-id> [--vault <address>] [--protocol <name>] [--min-tvl <usd>] [--from-chain-id <id>] [--from-token <symbol\|address>] [--wait]` |
| `mm earn withdraw`  | `--token <token> --chain-id <chain-id> [--amount <amount>] [--vault <address>] [--protocol <name>] [--all]`                                                                          |

### `mm earn markets`

List available yield vaults with APY and TVL data.

```bash
mm earn markets [--chain-id <chain-id>] [--token <symbol|address>] [--protocol <protocol>] [--min-tvl <amount>] [--sort apy|tvl] [--limit <n>]
```

### `mm earn positions`

View your current yield vault positions.

```bash
mm earn positions [--chain-id <chain-id>] [--address <address>] [--token <symbol|address>] [--protocol <name>] [--vault <address>] [--min-usd <n>] [--sort usd] [--limit <n>]
```

### `mm earn supply`

Supply tokens to a yield vault. The CLI handles ERC-20 approval automatically when the vault's
allowance is insufficient.

```bash
mm earn supply --token <token> --amount <amount> --chain-id <chain-id> [--vault <address>] [--protocol <name>] [--min-tvl <usd>] [--from-chain-id <chain-id>] [--from-token <symbol|address>] [--wait]
```

Use `--from-chain-id` for cross-chain supply operations that bridge and supply in one step.
Use `--wait` to poll until the position reflects in the portfolio (up to ~45 seconds) and display
an inline balance confirmation. Without `--wait`, the CLI prints a hint that positions may lag
15–30 seconds.

### `mm earn withdraw`

Withdraw tokens from a yield vault.

```bash
mm earn withdraw --token <token> --chain-id <chain-id> [--amount <amount>] [--vault <address>] [--protocol <name>] [--all]
```

Use `--all` to withdraw your full position.
The CLI automatically retries failed withdrawals (up to 3 attempts with backoff).

## `mm config`

Get or set CLI configuration values persisted in `~/.metamask/config.json`.

```bash
mm config get <key>
mm config set <key> <value>
```

| Key                                   | Accepted values        | Description                                                               |
| ------------------------------------- | ---------------------- | ------------------------------------------------------------------------- |
| `env`                                 | `prod`, `dev`, `uat`   | Backend environment                                                       |
| `verbose`                             | `true`, `false`        | Default for the global `--verbose` flag                                   |
| `format`                              | `text`, `json`, `toon` | Default for the global `--format` flag                                    |
| `walletTimeoutSeconds`                | Integer (max 600)      | Default for `--wallet-timeout` on server-wallet signing and swap commands |
| `experimentalPlugins`                 | `true`, `false`        | Enable the [plugin system](#mm-plugins). Beta, off by default             |
| `experimentalAllowUnverifiedInstalls` | `true`, `false`        | Allow installing plugins from local or git sources. Development only      |

Run `mm config get` with no key to show all values.
Persisted `format` and `verbose` apply when you do not pass the corresponding global flags.
Override `env` for a single invocation with the `MM_ENV` environment variable.
Non-prod sessions are stored in environment-scoped files under `~/.metamask/`, such as
`session.dev.json`; prod uses `session.json`.
`walletTimeoutSeconds` is the stored default for `--wallet-timeout` (see [Troubleshooting](../troubleshooting.md)).

## `mm plugins`

Manage plugins, npm packages that add custom commands to Agent Wallet.
Plugins are a beta feature and are off by default.
Enable them with `mm config set experimentalPlugins true`.
See the [plugins overview](../plugins/index.md).

```bash
mm plugins                                   # list installed plugins
mm plugins install <package>                 # interactive consent per package
mm plugins install <package> --accept-permissions   # non-interactive / CI
mm plugins inspect <package>
mm plugins update                            # re-consents changed manifests
mm plugins uninstall <package>
```

Installs from npm are consent-gated.
Agent Wallet shows the plugin's commands, data access, and requested capabilities before
installing, and fails closed if the package can't be verified.
Plugin lifecycle scripts such as `postinstall` never run.
Local `file:` and git sources are refused unless you opt in with
`mm config set experimentalAllowUnverifiedInstalls true`, which is intended for development only.

## `mm tx`

### `mm tx history`

List recent transactions for the active wallet or specific addresses.
Each row includes chain name, chain ID, explorer link, and protocol when indexer metadata is
available. When a pending wallet job matches an indexed transaction hash, the local CLI intent is
preserved on that row. Pending jobs that never reached the chain are excluded;
use `mm wallet requests list` to see stranded or expired requests.

```bash
mm tx history [--addresses <addrs>] [--chain-ids <chains>] [--type <filter>] [--limit <n>] [--after <cursor>]
```

| Flag          | Required | Description                                                                |
| ------------- | -------- | -------------------------------------------------------------------------- |
| `--addresses` | No       | Comma-separated EVM addresses. Defaults to all EVM wallets on your account |
| `--chain-ids` | No       | Comma-separated chain filters, such as `1,137` or `eip155:1`               |
| `--type`      | No       | Filter by direction (`in`, `out`, or `self`) or by transaction category    |
| `--limit`     | No       | Number of transactions to return, 1–50. The default is 50                  |
| `--after`     | No       | Pagination cursor from a previous response (`endCursor` value)             |

When more results are available, JSON and toon output include `hasNextPage: true` and an `endCursor`
value. Pass that cursor as `--after <endCursor>` to fetch the next page. The REPL also displays a
ready-to-run next-page command in a footer when `hasNextPage` is true.

### `mm tx`

Look up a specific transaction by hash.

```bash
mm tx --hash <tx-hash> [--chain-id <chain-id-or-caip2>]
```

| Flag         | Required | Description                                                                                         |
| ------------ | -------- | --------------------------------------------------------------------------------------------------- |
| `--hash`     | Yes      | Transaction hash (0x-prefixed)                                                                      |
| `--chain-id` | No       | Chain ID or CAIP-2 (for example, `1` or `eip155:1`). When omitted, the CLI probes common EVM chains |

Returns `TX_NOT_FOUND` for unknown hashes and `INVALID_TX_HASH` for malformed input.

## Help

Every command supports `--help`:

```bash
mm transfer --help
mm perps open --help
```
