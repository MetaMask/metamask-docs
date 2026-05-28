# Predict Trading Workflow

Use this workflow when the user wants to set up prediction market trading, fund the deposit wallet, quote/place orders, or manage Predict orders and positions.

Reference command syntax in `../references/predict.md`.

## One-Time Setup

Choose the Predict mode, run setup, and check backend status:

```bash
mm-dev predict mode mainnet
mm-dev predict setup --wait
mm-dev predict status
```

`predict setup --wait` blocks until credential, deposit-wallet, and approval jobs complete. Without `--wait`, watch returned jobs with `mm-dev predict watch`.

If setup or approvals look stale later:

```bash
mm-dev predict auth --refresh
mm-dev predict approve --wait
mm-dev predict balance --sync
```

`predict setup` and `predict deposit` use `--wait`; do not add `--yes` to those commands.

## Fund the Deposit Wallet

Check deposit wallet status:

```bash
mm-dev predict balance --sync
```

Fund pUSD:

```bash
mm-dev predict deposit --amount 100 --wait --json
```

`--amount` is in pUSD. The owner EOA needs enough Polygon USDC and POL for gas to complete the deposit transaction.

## Find the Right Market

Search can return loosely related markets, so inspect the selected market before quoting:

```bash
mm-dev predict markets --query "Knicks NBA Finals" --limit 5 --active --json
mm-dev predict market --market will-the-new-york-knicks-win-the-2026-nba-finals --json
```

The market detail prints outcome token IDs. Outcome token IDs are not market IDs; use the token ID for `quote`, `place`, `book`, and `balance --token-id`.

If search is noisy, list active markets and filter manually:

```bash
mm-dev predict markets --active --limit 50 --json
```

## Quote, Then Place

Preview the order cost and fill before placing:

```bash
mm-dev predict quote \
  --token-id <outcomeTokenId> \
  --side buy --size 100 --limit-price 0.55
```

After the user confirms token ID, outcome, side, size, price, and order type:

```bash
mm-dev predict place \
  --token-id <outcomeTokenId> \
  --side buy --size 100 --price 0.55 \
  --order-type GTC
```

`--order-type` is one of `GTC`, `GTD`, `FOK`, or `FAK`. `--post-only` only applies to GTC/GTD. `--expiration` is unix seconds for GTD.

## Manage Orders and Positions

```bash
mm-dev predict orders
mm-dev predict orders --market <condition-id>
mm-dev predict positions
mm-dev predict positions --market <condition-id>
mm-dev predict cancel --order-id <order-id>
mm-dev predict cancel --market <condition-id>
mm-dev predict cancel --asset <outcomeTokenId>
mm-dev predict cancel --all
```

`predict cancel --all` cancels every open order. Require explicit confirmation.

## Watch Async Jobs

```bash
mm-dev predict watch --id <job-id> --wait
```

Use this for setup, approve, deposit, and order jobs that have not reached a terminal state.

## Safety Notes

- Prices are 0-1 floats. Treat `--price 1` as suspicious unless the user explicitly confirms.
- Trades are signed by the deposit wallet address shown by `mm-dev predict balance`, not necessarily the connected owner EOA.
- Always inspect the market to map the user's intended outcome to the correct token ID.
