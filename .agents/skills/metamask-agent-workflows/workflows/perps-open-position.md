# Perps Open Position Workflow

Use this workflow when the user wants to open a new perpetual position.

Reference command syntax in `references/perps.md`.

## Flow

1. Check balance and deposit if needed.
2. Quote the position.
3. Dry run.
4. Confirm with the user and open.

## Confirm Symbol

If the user does not mention a token symbol, list available markets and confirm with the user:

```bash
mm-dev perps markets
```

## Check Balance

`--venue` defaults to `hyperliquid`. It can be omitted.

```bash
mm-dev perps balance
```

If available margin is zero or insufficient, deposit USDC before proceeding. Hyperliquid only supports deposits from Arbitrum mainnet (`eip155:42161`).

```bash
mm-dev perps deposit --amount <amount> --asset USDC
```

To confirm a deposit, wait briefly and poll `mm-dev perps balance`.

## Quote

Always quote before opening:

```bash
mm-dev perps quote --symbol BTC --side long --size 0.01 --leverage 5
```

Show the user estimated entry, notional, fees, liquidation price, side, size, leverage, and venue before proceeding.

## Dry Run

Preview the order before signing:

```bash
mm-dev perps open --symbol BTC --side long --size 0.01 --leverage 5 --dry-run
```

For limit orders, include `--type limit --limit-px <price>`.

`--max-slippage-bps` is the slippage cap in basis points for IOC market pricing.

## Open

Remove `--dry-run` only after explicit user confirmation:

```bash
mm-dev perps open --symbol BTC --side long --size 0.01 --leverage 5
```

Do not add `--yes` unless the user explicitly asked for unattended execution.
