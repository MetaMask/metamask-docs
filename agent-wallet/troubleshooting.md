---
description: Diagnose and fix common mm CLI issues.
keywords: [MetaMask, Agent Wallet, troubleshooting, mm]
---

# Troubleshooting

Symptom-first fixes for common `mm` CLI issues.

## Authentication and access

### `AUTH_FAILED`, `TOKEN_INVALID`, or `TOKEN_REFRESH_FAILED`

Sign in again:

```bash
mm login
mm auth status
```

For CI or headless agents, use `mm login --token "<cliToken:cliRefreshToken>"`.

### Early Access required

If commands fail with authorization errors after sign-in, confirm your account has Early Access at
[metamask.io/agent-wallet](https://metamask.io/agent-wallet).

### Reset local session

```bash
mm reset
mm login
mm init --wallet server-wallet --mode guard
```

## Perpetuals

### `HYPERLIQUID_ERROR` or `ORDER_REJECTED` on first perps trade

Deposit USDC from Arbitrum before opening a position:

```bash
mm perps deposit --venue hyperliquid --amount <AMOUNT>
mm perps balance --venue hyperliquid
```

See [Trade perpetuals](guides/trade-perpetuals.md).

## Prediction markets

### `JsonRpcError: execution reverted` on predict deposit

Run setup and fund the predict wallet with Polygon USDC.e:

```bash
mm predict setup --wait
mm predict deposit --amount <AMOUNT> --wait
```

See [Trade prediction markets](guides/trade-prediction-markets.md).

## Swaps

### `NO_QUOTES` or no quote ID from `mm swap quote`

Liquidity may be unavailable for the token pair or chain. Do not call `mm swap execute` without a
valid `quoteId` from a successful quote step.

### Swap execute fails after a quote

Re-run `mm swap quote` and execute immediately. Quotes can expire.

## Transfers

### Insufficient balance on the target chain

`mm transfer` only spends balances on the chain specified by `--chain-id`. Bridge tokens with
`mm swap execute` first.

### ENS names not resolving

ENS is not supported for `--to`. Use a hex address.

## Server-wallet polling

### Command returned a `pollingId` but no hash

Use `--wait` on signing and transfer commands, or watch the job:

```bash
mm wallet requests watch --polling-id <POLLING_ID>
```

See [Architecture](concepts/architecture.md).

## 2FA approval pending

If a job status is `AWAITING_MFA`, approve or reject the transaction in MetaMask Mobile or through
the email approval link.

## Related pages

- [Error codes](reference/error-codes.md)
- [Commands reference](reference/commands.md)
