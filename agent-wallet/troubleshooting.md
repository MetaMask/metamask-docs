---
description: Start with mm doctor, then fix authentication, initialization, and common mm CLI errors.
keywords: [MetaMask, Agent Wallet, troubleshooting, mm doctor, mm]
---

# Troubleshooting

Symptom-first fixes for common `mm` CLI issues.

## `UNSUPPORTED_NODE` at startup

The CLI checks the Node.js version before loading. If the active runtime is below Node.js 22.18, it
exits immediately:

```
Error: Node.js <current> is not supported. MetaMask Agent Wallet (mm) requires Node.js 22.18 or later.
Upgrade Node.js from https://nodejs.org/ or use a version manager (nvm, fnm, volta).
```

With `--json`, the exit payload is:

```json
{ "ok": false, "error": { "code": "UNSUPPORTED_NODE", "message": "...", "hint": "..." } }
```

Upgrade Node.js to 22.18 or later, then verify:

```bash
node --version
mm doctor
```

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

### `MWP_TIMEOUT` or `MWP_CANCELLED` during QR sign-in

QR sign-in (`mm login qr`) timed out or was cancelled in MetaMask Mobile.

1. Run `mm login qr` again.
2. Scan the new QR code with MetaMask Mobile and approve promptly.

### `PAIRING_EXPIRED`, `INVALID_OTP`, or terminal timed out during browser sign-in

Browser sign-in opens the dashboard, then expects a CLI token pasted into the terminal.
If you take too long, the terminal may time out or return `PAIRING_EXPIRED` or `INVALID_OTP`.

1. Run `mm login browser` again.
2. Complete Google or email sign-in in the browser and click **Authorize**.
3. Copy the CLI token from the browser immediately and paste it into the waiting terminal.

Do not paste the email verification OTP (used only during email sign-in in the browser) into the
terminal.
The terminal expects the CLI token shown after **Authorize**.

See [Commands reference](reference/commands.md#mm-login) for flags and alternate flows.

### Codes during sign-in

| Code or link                 | When it appears                                                                     | What to do                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Email verification OTP       | During email passwordless sign-in in the browser, before **Authorize**              | Enter the OTP in the browser dashboard                       |
| CLI token                    | After **Authorize** in browser sign-in, to link the browser session to the terminal | Copy from the browser and paste into the waiting terminal    |
| MetaMask Mobile QR scan      | During `mm login qr`                                                                | Scan with MetaMask Mobile and approve in the app             |
| Transaction 2FA email link   | Later, when a flagged transaction needs your approval (browser sign-in)             | Open the link and approve or reject the transaction          |
| MetaMask Mobile notification | Later, when a flagged transaction needs your approval (QR sign-in)                  | Open MetaMask Mobile and approve from the notifications menu |

Entering an email OTP or pasting a CLI token does not switch you to a different wallet.
Only changing your sign-in method (Google, email passwordless, or MetaMask Mobile QR) can do that.
Each of those three methods always resolves to a different address, even when the same email is
used.

### Email verification OTP not received during browser sign-in

The email verification OTP is sent only during email sign-in in the browser, before you click
**Authorize**.
It is not the CLI token and not the transaction 2FA email link.

1. Check spam or promotions folders.
2. Wait a minute and request a new code from the dashboard.
3. If sign-in still fails, try a different sign-in method only if you have not funded a wallet yet.
   Google, email passwordless, and MetaMask Mobile QR each bind you to a different wallet address,
   even if you use the same email for more than one method.

### Wallet address changed after re-login

Your **sign-in method** determines which server-wallet address the CLI loads.
**Google**, **email passwordless**, and **MetaMask Mobile QR** are three separate methods.
Each one always resolves to a different wallet address, even if:

- You use the same email for Google and email passwordless sign-in
- That email is also the email on your MetaMask Mobile account
- You sign in again on the same machine

Switching between methods binds you to a different developer project and wallet address.
Funds stay on-chain at the original address but may not appear in the new CLI session.

Flow steps within one method (email verification OTP or CLI token paste) do not change the wallet.
If you always sign in the same way (for example, always Google), you get the same wallet address
every time.

1. Run `mm wallet list` and `mm wallet address` and compare with the address you funded.
2. Sign out with `mm logout`.
3. Sign in again with the same method you used when you first set up and funded the wallet:
   - Google → `mm login browser`, then **Continue with Google**
   - Email → `mm login browser`, then **Continue with email**
   - MetaMask Mobile → `mm login qr`
4. Re-run `mm wallet address` and confirm the expected address before sending transactions.

Pick one sign-in method and use it every time.
Verify the address after every sign-in.

### `NOT_INITIALIZED`

Run setup before wallet commands:

```bash
mm init
mm doctor
```

### `INVALID_POLICY_YAML` on `mm wallet policy set`

The YAML you passed is not a valid policy object (for example, it is an empty document, a plain
string, or a list). Start from a known-good baseline:

```bash
# Start from your current live policy:
mm wallet policy get

# Or start from the project template:
mm wallet policy template
```

Edit the output, then pass it back:

```bash
mm wallet policy set --policy "$(mm wallet policy get)"
```

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

### Minimum deposit, withdraw, or order notional errors

The CLI provides actionable hints for Hyperliquid minimum-amount failures under `INVALID_AMOUNT`:

- **Deposits and withdrawals below the venue minimum**: the error shows the required minimum and your
  actual amount. Increase the amount and retry.
- **Orders below $10 notional**: increase your position size or leverage.
- **Funding shortfall**: if your venue balance can't cover the order, run `mm perps deposit` or
  `mm perps transfer --venue hyperliquid --amount <N> --direction spot-to-perp`.

## Prediction markets

### `JsonRpcError: execution reverted` on predict deposit

Run setup and fund the predict wallet with Polygon USDC.e:

```bash
mm predict setup --wait
mm predict deposit --amount <AMOUNT> --wait
```

See [Trade prediction markets](guides/trade-prediction-markets.md).

### `PREDICT_INSUFFICIENT_GAS` on predict deposit

You need native POL on Polygon to cover gas for the predict deposit transaction. The CLI detects
native POL shortfalls from both SDK preflight checks and RPC errors, and surfaces this code with a
POL-specific hint instead of a generic `PREDICT_ERROR`. Fund your wallet with POL, verify with
`mm wallet balance`, then retry.

### `PREDICT_ORDER_SIZE_TOO_SMALL` on predict place

The order size is below the exchange minimum. Raise `--size` to at least the minimum stated in the
error hint, and inspect liquidity with `mm predict book` before retrying.

### `PREDICT_ORDER_NOT_FILLED` on predict place

A fill-or-kill (FOK) order could not be fully filled at the requested price. Adjust `--size` or
`--price`, check liquidity with `mm predict book`, or use a GTC (good-till-cancelled) order type
instead of FOK.

### `PREDICT_UNAVAILABLE_FOR_LEGAL_REASONS` or `PREDICT_GEOBLOCKED`

Polymarket is unavailable from your location. The two codes come from different signals:

- `PREDICT_GEOBLOCKED` comes from the dedicated geoblock API.
- `PREDICT_UNAVAILABLE_FOR_LEGAL_REASONS` comes from an HTTP 451 response on a Polymarket
  request, which indicates a legal restriction.

Neither is a bug. Confirm the restriction with `mm predict geoblock`, and
retry from an allowed location.

## Swaps

### `NO_QUOTES` or unavailable quote from `mm swap quote`

When the bridge returns zero routes for actionable reasons, `mm swap quote` returns a soft
unavailable result (exit 0) with a `reason`, `message`, and `hint`. Common reasons include
`AMOUNT_TOO_LOW`, `SLIPPAGE_TOO_HIGH`, and `NO_QUOTES`. Adjust the amount, slippage, or token and
retry. Do not call `mm swap execute` without a valid `quoteId` from a successful quote step.

When bridging with `--refuel`, do not use the flag if the destination token is the destination
chain's native gas asset (for example, bridging ETH to Arbitrum ETH).
The backend returns no quotes in that case.

### `INSUFFICIENT_FUNDS` or `INSUFFICIENT_GAS` on swap execute

The CLI runs a preflight check before execution. If you don't have enough of the source token, you
receive `INSUFFICIENT_FUNDS` with guidance on the required amount. If native gas balance is too low,
the CLI returns `INSUFFICIENT_GAS`. Bridge or transfer the needed tokens before retrying.

For gas-insufficient swaps, the CLI may offer a gasless route via the EIP-7702 relay when the quote
is gas-included.

### Swap execute fails after a quote

Re-run `mm swap quote` and execute immediately. Quotes expire and are auto-pruned after 24 hours.

### `QUOTE_PERSIST_FAILED` on the first swap quote

The CLI could not create `~/.metamask/swap-quotes` to store the quote. It retries once, then returns
this code. Create the directory yourself and re-run the quote:

```bash
mkdir -p ~/.metamask/swap-quotes && chmod 700 ~/.metamask/swap-quotes
mm swap quote --from <TOKEN> --to <TOKEN> --amount <AMOUNT> --from-chain-id <CHAIN_ID>
```

## Earn

### Withdraw reverts on full withdrawal

For rebasing tokens (like Aave aTokens), interest accrues between the balance query and transaction
execution. The CLI applies a small dust buffer for `--all` withdrawals, but if the transaction still
reverts, it automatically retries up to 3 times. If retries fail, try withdrawing a slightly smaller
amount.

### Position not showing after supply

Earn positions can lag 15–30 seconds after deposit. Use `--wait` on `mm earn supply` to
poll until the position reflects (up to ~45 seconds), or check manually:

```bash
mm earn positions --chain-id <CHAIN_ID>
```

### Approval required for supply

When supplying for the first time, the CLI sends an ERC-20 approval transaction before the supply.
In server-wallet mode with Guard Mode, this may require 2FA approval.

## Transfers

### Insufficient balance on the target chain

`mm transfer` only spends balances on the chain specified by `--chain-id`. Bridge tokens with
`mm swap execute` first.

### ENS names not resolving

ENS is not supported for `--to`. Use a hex address.

### `UNSUPPORTED_CHAIN` on a chain that `mm chains list` shows

Transfers on Monad (`143`), HyperEVM (`999`), Sei (`1329`), and MegaETH (`4326`) failed on CLI
versions before 6.1.2, even though the chains appeared in `mm chains list`. Upgrade and retry:

```bash
npm install -g @metamask/agent-wallet@latest
mm doctor
```

If the code persists on an up-to-date CLI, the chain isn't supported for that operation. Confirm with
`mm chains list --json` and check the `features` field for the chain.

## Balances and prices

### `mm wallet balance` shows 0 for a funded wallet

Bring your own wallet balances returned empty on CLI versions before 6.1.3 even when funds were
onchain. Upgrade with `npm install -g @metamask/agent-wallet@latest`, then re-run
`mm wallet balance --chain-ids <CHAIN_ID>`.

### Assets listed as `unpriced` in `mm wallet balance`

The Price API rejected or had no price for those assets. Balances are still accurate; only the fiat
value is missing. The affected asset IDs appear under `unpricedAssetIds` in `--json` output. This is
not an error and the command exits 0.

### `INVALID_DATA` on `mm price history`

The Price API returned an empty or malformed response. Retry, and verify the asset and chain are
supported:

```bash
mm price spot --asset-ids <CAIP19_ASSET_ID>
mm price networks
```

## Server-wallet polling

### Command returned a `pollingId` but no hash

Use `--wait` on signing and transfer commands, or watch the job:

```bash
mm wallet requests watch <POLLING_ID>
```

The default wallet job poll timeout is 10 minutes. You can override it with `--wallet-timeout`
(max 600 seconds).

See [Architecture](reference/architecture.md).

## 2FA approval pending

If a job status is `AWAITING_MFA`, approve or reject the transaction through the channel for your
sign-in method: MetaMask Mobile push (QR sign-in) or the email approval link (browser sign-in).

## x402 payments

Symptom-first fixes for the `x402_pay.py` helper bundled with the `metamask-agent-wallet` skill.
See [Pay for paywalled APIs (x402)](guides/pay-for-apis-x402.md).

### No eligible payment option

The script returns an error that no eligible option was found.
The server offered no `exact`-scheme payment on a network that `mm chains list` supports.
Inspect the `402` response and show the offered options to the user.

### Multiple eligible payment options

The script returns an error about multiple eligible options.
The server offered the same scheme on several networks or assets (for example, Base and Polygon).
Rerun `pay` with `--network` or `--asset` to choose one.

### Permit2-only offer

The error mentions Permit2.
The server offered only Permit2 asset transfer methods, which the helper does not sign.
It supports EIP-3009 only.
Tell the user the offer is unsupported.

### Non-standard 402 challenge

The error states the response is not a standard x402 challenge.
The endpoint returned `402` in a different payment scheme (for example, pay first, then send a
transaction hash).
The helper supports the standard x402 `exact` scheme only.

### Payment not accepted

The script returns a payment-not-accepted error after signing.
Do not rerun blindly.
Each `pay` run makes a new payment.
Inspect the settlement output and confirm the authorization window has not expired before retrying.

## Related pages

- [Error codes](reference/error-codes.md)
- [Commands reference](reference/commands.md)
