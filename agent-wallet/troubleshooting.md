---
description: Diagnose and fix common mm CLI issues.
keywords: [MetaMask, Agent Wallet, troubleshooting, mm]
---

# Troubleshooting

Symptom-first fixes for common `mm` CLI issues.

## Start with `mm doctor`

Run `mm doctor` first to inspect CLI version, skill compatibility, authentication, and
initialization:

```bash
mm doctor
```

The output includes `authenticated`, `initialized`, `compatible`, and actionable `hints`.
Fix each hint, then re-run `mm doctor` until both `authenticated` and `initialized` are `true`.

Authentication and initialization are independent.
A session can be authenticated but not initialized, which causes `NOT_INITIALIZED` on wallet
commands.

## Authentication and access

### `AUTH_FAILED`, `TOKEN_INVALID`, or `TOKEN_REFRESH_FAILED`

Sign in again:

```bash
mm login browser
mm auth status
```

For CI or headless agents:

```bash
mm login browser --no-wait
mm login --token "<cliToken:cliRefreshToken>"
```

### `ALREADY_AUTHENTICATED`

You already have a valid session.
Run `mm logout` before signing in again.

### `COMING_SOON` on `mm login qr`

QR sign-in is not available in production.
Use browser sign-in instead:

```bash
mm login browser
```

### `NOT_INITIALIZED`

Run setup before wallet commands:

```bash
mm init
mm doctor
```

### Early Access required

If commands fail with authorization errors after sign-in, confirm your account has Early Access at
[MetaMask Agent Wallet Early Access](https://metamask.io/agent-wallet).

### Reset local session

```bash
mm reset
mm login browser
mm init --wallet server-wallet --mode guard
mm doctor
```

## Perpetuals

### `HYPERLIQUID_ERROR` or `ORDER_REJECTED` on first perpetuals trade

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

When bridging with `--refuel`, do not use the flag if the destination token is the destination
chain's native gas asset (for example, bridging ETH to Arbitrum ETH).
The backend returns no quotes in that case.

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

See [Architecture](reference/architecture.md).

## 2FA approval pending

If a job status is `AWAITING_MFA`, approve or reject the transaction through the channel for your
sign-in method: MetaMask Mobile push (QR sign-in) or the email approval link (browser sign-in).

## Related pages

- [Error codes](reference/error-codes.md)
- [Commands reference](reference/commands.md)
