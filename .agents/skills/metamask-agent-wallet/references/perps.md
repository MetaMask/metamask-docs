# Perpetual Trading Commands

Use `perps` commands to trade perpetual futures on supported venues. Currently supported venue: `hyperliquid`.

## Common Flags

All `perps` commands accept these flags:

| Name        | Required | Description                                                    |
| ----------- | -------- | -------------------------------------------------------------- |
| `--venue`   | Yes      | Perpetual venue (defaults to `hyperliquid`)                    |
| `--network` | No       | Target network: `mainnet` or `testnet` (defaults to `mainnet`) |

State-changing perps commands accept `--yes` to skip interactive confirmation. Perps commands do not use `--wait`. In BYOK mode with an encrypted mnemonic, state-changing commands also accept `--password` to unlock the mnemonic [env: `MM_PASSWORD`].

## `perps markets` Command

List perpetual markets for a venue.

### Syntax

```bash
mm-dev perps markets --venue <venue> [--network <network>] [--symbol <symbol>] [--symbols <list>] [--dex <name>]
```

### Supported Flags

| Name        | Required | Description                                                                                                         |
| ----------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `--venue`   | Yes      | Perpetual venue (defaults to `hyperliquid`). Run `mm-dev perps list-venues` to see options (allowed: `hyperliquid`) |
| `--network` | No       | Target network: `mainnet` or `testnet` (defaults to `mainnet`) (allowed: `mainnet`, `testnet`)                      |
| `--symbol`  | No       | Filter to a single market symbol (e.g. BTC)                                                                         |
| `--symbols` | No       | Comma-separated market symbols to filter (e.g. BTC,ETH,SOL)                                                         |
| `--dex`     | No       | HIP-3 DEX name; omit for the main Hyperliquid DEX. Run `mm-dev perps dexs` to see options                           |

### Example

```bash
mm-dev perps markets --venue hyperliquid
mm-dev perps markets --venue hyperliquid --symbol BTC
mm-dev perps markets --venue hyperliquid --symbols BTC,ETH,SOL --network testnet
mm-dev perps markets --venue hyperliquid --dex myDex
```

## `perps balance` Command

Show the connected wallet's perpetual account balances for a venue.

### Syntax

```bash
mm-dev perps balance --venue <venue> [--network <network>]
```

### Example

```bash
mm-dev perps balance --venue hyperliquid
mm-dev perps balance --venue hyperliquid --network testnet
```

## `perps positions` Command

List open positions for the connected wallet on a venue.

### Syntax

```bash
mm-dev perps positions --venue <venue> [--network <network>]
```

### Example

```bash
mm-dev perps positions --venue hyperliquid
mm-dev perps positions --venue hyperliquid --network testnet
```

## `perps quote` Command

Estimate entry price, notional, fees, and liquidation price without placing an order.

### Syntax

```bash
mm-dev perps quote --venue <venue> --symbol <symbol> --side <side> --size <size> --leverage <leverage> [--type <type>] [--limit-px <price>] [--network <network>]
```

### Supported Flags

| Name         | Required          | Description                                                    |
| ------------ | ----------------- | -------------------------------------------------------------- |
| `--venue`    | Yes               | Perpetual venue (defaults to `hyperliquid`)                    |
| `--symbol`   | Yes               | Market symbol (e.g. BTC, ETH, SOL)                             |
| `--side`     | Yes               | Position direction: `long` or `short`                          |
| `--size`     | Yes               | Size in base asset, human-readable (e.g. 0.01, 1)              |
| `--leverage` | Yes               | Desired leverage                                               |
| `--type`     | No                | Order type: `market` or `limit`. Default is `market`           |
| `--limit-px` | If `--type limit` | Limit price, human-readable (e.g. 60000 for BTC)               |
| `--network`  | No                | Target network: `mainnet` or `testnet` (defaults to `mainnet`) |

### Example

```bash
mm-dev perps quote --venue hyperliquid --symbol BTC --side long --size 0.01 --leverage 5
mm-dev perps quote --venue hyperliquid --symbol ETH --side short --size 1 --leverage 10 --type limit --limit-px 2500
```

## `perps open` Command

Open a new perpetual position by placing an order.

### Syntax

```bash
mm-dev perps open --venue <venue> --symbol <symbol> --side <side> --size <size> --leverage <leverage> [--type <type>] [--limit-px <price>] [--max-slippage-bps <bps>] [--network <network>] [--dry-run] [--yes] [--password <password>]
```

### Supported Flags

| Name                 | Required          | Description                                                                |
| -------------------- | ----------------- | -------------------------------------------------------------------------- |
| `--venue`            | Yes               | Perpetual venue (defaults to `hyperliquid`)                                |
| `--symbol`           | Yes               | Market symbol (e.g. BTC, ETH, SOL)                                         |
| `--side`             | Yes               | Position direction: `long` or `short`                                      |
| `--size`             | Yes               | Size in base asset, human-readable (e.g. 0.01, 1)                          |
| `--leverage`         | Yes               | Leverage multiplier as a positive integer (e.g. 5, 10)                     |
| `--type`             | No                | Order type: `market` or `limit` (defaults to `market`)                     |
| `--limit-px`         | If `--type limit` | Limit price; required when `--type` is `limit` (e.g. 60000 for BTC)        |
| `--max-slippage-bps` | No                | Slippage cap in basis points for IOC market pricing (e.g. 50)              |
| `--network`          | No                | Target network: `mainnet` or `testnet` (defaults to `mainnet`)             |
| `--dry-run`          | No                | Validate and preview the order without signing or submitting               |
| `--yes`              | No                | Skip interactive confirmation                                              |
| `--password`         | No                | Password to unlock the BYOK mnemonic (BYOK mode only) [env: `MM_PASSWORD`] |

### Example

```bash
mm-dev perps open --venue hyperliquid --symbol BTC --side long --size 0.01 --leverage 5
mm-dev perps open --venue hyperliquid --symbol ETH --side short --size 1 --leverage 10 --type limit --limit-px 2500
mm-dev perps open --venue hyperliquid --symbol BTC --side long --size 0.05 --leverage 3 --dry-run
```

## `perps orders` Command

List resting orders for the connected wallet on a venue.

### Syntax

```bash
mm-dev perps orders --venue <venue> [--network <network>]
```

### Example

```bash
mm-dev perps orders --venue hyperliquid
mm-dev perps orders --venue hyperliquid --network testnet
```

## `perps close` Command

Close one position, part of a position, or all open positions.

### Syntax

```bash
mm-dev perps close --venue <venue> [--symbol <symbol>] [--size <size>] [--all] [--max-slippage-bps <bps>] [--network <network>] [--dry-run] [--yes] [--password <password>]
```

### Supported Flags

| Name                 | Required            | Description                                                                |
| -------------------- | ------------------- | -------------------------------------------------------------------------- |
| `--venue`            | Yes                 | Perpetual venue (defaults to `hyperliquid`)                                |
| `--symbol`           | Yes, unless `--all` | Market symbol to close (e.g. BTC, ETH)                                     |
| `--size`             | No                  | Partial close size, human-readable (e.g. 0.005); omit for full close       |
| `--all`              | No                  | Close all open positions; mutually exclusive with `--symbol`               |
| `--max-slippage-bps` | No                  | Slippage cap in basis points for IOC pricing (e.g. 50)                     |
| `--network`          | No                  | Target network: `mainnet` or `testnet` (defaults to `mainnet`)             |
| `--dry-run`          | No                  | Preview the close action without signing or submitting                     |
| `--yes`              | No                  | Skip interactive confirmation                                              |
| `--password`         | No                  | Password to unlock the BYOK mnemonic (BYOK mode only) [env: `MM_PASSWORD`] |

### Example

```bash
mm-dev perps close --venue hyperliquid --symbol BTC
mm-dev perps close --venue hyperliquid --symbol ETH --size 0.5
mm-dev perps close --venue hyperliquid --all
mm-dev perps close --venue hyperliquid --symbol BTC --dry-run
```

## `perps modify` Command

Modify leverage, take-profit, or stop-loss for an existing position.

### Syntax

```bash
mm-dev perps modify --venue <venue> --symbol <symbol> [--leverage <leverage>] [--tp <price>] [--sl <price>] [--network <network>] [--dry-run] [--yes] [--password <password>]
```

### Supported Flags

| Name         | Required | Description                                                                |
| ------------ | -------- | -------------------------------------------------------------------------- |
| `--venue`    | Yes      | Perpetual venue (defaults to `hyperliquid`)                                |
| `--symbol`   | Yes      | Market symbol (e.g. BTC, ETH, SOL)                                         |
| `--leverage` | No       | New leverage multiplier as a positive integer (e.g. 5, 10)                 |
| `--tp`       | No       | Take-profit trigger price, human-readable (e.g. 3000, 2500.50)             |
| `--sl`       | No       | Stop-loss trigger price, human-readable (e.g. 2000, 1800.75)               |
| `--network`  | No       | Target network: `mainnet` or `testnet` (defaults to `mainnet`)             |
| `--dry-run`  | No       | Preview the modify action without signing or submitting                    |
| `--yes`      | No       | Skip interactive confirmation                                              |
| `--password` | No       | Password to unlock the BYOK mnemonic (BYOK mode only) [env: `MM_PASSWORD`] |

### Validation Rules

- At least one of `--leverage`, `--tp`, or `--sl` must be provided.

### Example

```bash
mm-dev perps modify --venue hyperliquid --symbol BTC --leverage 10
mm-dev perps modify --venue hyperliquid --symbol ETH --tp 3000 --sl 2000
mm-dev perps modify --venue hyperliquid --symbol BTC --leverage 3 --dry-run
```

## `perps cancel` Command

Cancel a resting perps order.

### Syntax

```bash
mm-dev perps cancel --venue <venue> --order-id <id> [--symbol <symbol>] [--network <network>] [--dry-run] [--yes] [--password <password>]
```

### Supported Flags

| Name         | Required | Description                                                                                                         |
| ------------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `--venue`    | Yes      | Perpetual venue (defaults to `hyperliquid`). Run `mm-dev perps list-venues` to see options (allowed: `hyperliquid`) |
| `--order-id` | Yes      | Venue order ID to cancel (positive integer)                                                                         |
| `--symbol`   | No       | Market symbol; speeds up cancel by avoiding an open-order lookup (e.g. BTC, ETH)                                    |
| `--network`  | No       | Target network: `mainnet` or `testnet` (defaults to `mainnet`) (allowed: `mainnet`, `testnet`)                      |
| `--dry-run`  | No       | Preview the cancel action without signing or submitting                                                             |
| `--yes`      | No       | Skip interactive confirmation                                                                                       |
| `--password` | No       | Password to unlock the BYOK mnemonic (BYOK mode only) [env: `MM_PASSWORD`]                                          |

### Example

```bash
mm-dev perps cancel --venue hyperliquid --order-id 12345
mm-dev perps cancel --venue hyperliquid --order-id 12345 --symbol BTC
mm-dev perps cancel --venue hyperliquid --order-id 12345 --dry-run
mm-dev perps cancel --venue hyperliquid --order-id 12345 --yes
```

## `perps deposit` Command

Deposit USDC into a perpetual venue.

### Syntax

```bash
mm-dev perps deposit --venue <venue> --amount <amount> [--asset <asset>] [--source-chain <chain>] [--network <network>] [--dry-run] [--yes] [--password <password>]
```

### Supported Flags

| Name             | Required | Description                                                                                                         |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `--venue`        | Yes      | Perpetual venue (defaults to `hyperliquid`). Run `mm-dev perps list-venues` to see options (allowed: `hyperliquid`) |
| `--amount`       | Yes      | Human-readable USDC amount to deposit (e.g. 100, 50.5)                                                              |
| `--asset`        | No       | Deposit asset (defaults to `USDC`) (allowed: `USDC`)                                                                |
| `--source-chain` | No       | Source chain as a CAIP-2 ID. Hyperliquid only supports Arbitrum (defaults to `eip155:42161` on mainnet)             |
| `--network`      | No       | Target network: `mainnet` or `testnet` (defaults to `mainnet`) (allowed: `mainnet`, `testnet`)                      |
| `--dry-run`      | No       | Preview the transaction without signing or submitting                                                               |
| `--yes`          | No       | Skip interactive confirmation                                                                                       |
| `--password`     | No       | Password to unlock the BYOK mnemonic (BYOK mode only) [env: `MM_PASSWORD`]                                          |

### Example

```bash
mm-dev perps deposit --venue hyperliquid --amount 100 --asset USDC
mm-dev perps deposit --venue hyperliquid --amount 100 --asset USDC --dry-run
mm-dev perps deposit --venue hyperliquid --amount 100 --asset USDC --yes
```

## `perps withdraw` Command

Withdraw USDC from a perpetual venue.

### Syntax

```bash
mm-dev perps withdraw --venue <venue> --amount <amount> [--asset <asset>] [--destination <address>] [--network <network>] [--dry-run] [--include-spot] [--yes] [--password <password>]
```

### Supported Flags

| Name             | Required | Description                                                                                                         |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `--venue`        | Yes      | Perpetual venue (defaults to `hyperliquid`). Run `mm-dev perps list-venues` to see options (allowed: `hyperliquid`) |
| `--amount`       | Yes      | Human-readable USDC amount to withdraw (e.g. 50, 25.5)                                                              |
| `--asset`        | No       | Withdrawal asset (defaults to `USDC`) (allowed: `USDC`)                                                             |
| `--destination`  | No       | EVM destination address (defaults to your connected wallet)                                                         |
| `--network`      | No       | Target network: `mainnet` or `testnet` (defaults to `mainnet`) (allowed: `mainnet`, `testnet`)                      |
| `--dry-run`      | No       | Preview the withdrawal without signing or submitting                                                                |
| `--include-spot` | No       | Move free spot USDC to perp account before withdrawing if the perp balance alone is insufficient                    |
| `--yes`          | No       | Skip interactive confirmation                                                                                       |
| `--password`     | No       | Password to unlock the BYOK mnemonic (BYOK mode only) [env: `MM_PASSWORD`]                                          |

### Example

```bash
mm-dev perps withdraw --venue hyperliquid --amount 50 --asset USDC
mm-dev perps withdraw --venue hyperliquid --amount 50 --asset USDC --include-spot
mm-dev perps withdraw --venue hyperliquid --amount 50 --asset USDC --destination 0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18 --yes
```

## `perps transfer` Command

Transfer USDC between spot and perp accounts on a perpetual venue.

### Syntax

```bash
mm-dev perps transfer --venue <venue> --amount <amount> --direction <direction> [--asset <asset>] [--network <network>] [--dry-run] [--yes] [--password <password>]
```

### Supported Flags

| Name          | Required | Description                                                                |
| ------------- | -------- | -------------------------------------------------------------------------- |
| `--venue`     | Yes      | Perpetual venue (defaults to `hyperliquid`)                                |
| `--amount`    | Yes      | Human-readable USDC amount to transfer (e.g. 100, 50.5)                    |
| `--direction` | Yes      | Transfer direction: `spot-to-perp` or `perp-to-spot`                       |
| `--asset`     | No       | Transfer asset (defaults to USDC)                                          |
| `--network`   | No       | Target network: `mainnet` or `testnet` (defaults to `mainnet`)             |
| `--dry-run`   | No       | Preview the transfer without signing or submitting                         |
| `--yes`       | No       | Skip interactive confirmation                                              |
| `--password`  | No       | Password to unlock the BYOK mnemonic (BYOK mode only) [env: `MM_PASSWORD`] |

### Example

```bash
mm-dev perps transfer --venue hyperliquid --amount 100 --direction spot-to-perp --asset USDC
mm-dev perps transfer --venue hyperliquid --amount 50 --direction perp-to-spot --asset USDC
```

## `perps list-venues` Command

List available perpetual futures venues.

### Syntax

```bash
mm-dev perps list-venues
```

### Supported Flags

This command does not support additional flags beyond output format options.

### Example

```bash
mm-dev perps list-venues
```

## `perps dexs` Command

List available DEX identifiers a venue exposes. For Hyperliquid, this includes the main DEX and any HIP-3 builder-deployed DEXs.

### Syntax

```bash
mm-dev perps dexs --venue <venue> [--network <network>]
```

### Supported Flags

| Name        | Required | Description                                                    |
| ----------- | -------- | -------------------------------------------------------------- |
| `--venue`   | Yes      | Perpetual venue (defaults to `hyperliquid`)                    |
| `--network` | No       | Target network: `mainnet` or `testnet` (defaults to `mainnet`) |

### Example

```bash
mm-dev perps dexs --venue hyperliquid
```

## Notes

- If the user does not mention a token symbol, use `mm-dev perps markets` to list available markets and confirm the symbol with the user before proceeding.
