---
description: CLI error codes returned by mm and MetaMask Agent Wallet.
keywords: [MetaMask, Agent Wallet, errors, mm]
---

# Error codes

The `mm` CLI surfaces errors with stable `code` values. Use these codes in scripts and agent
workflows to branch on failures.

Run `mm <command> --help` for command-specific validation rules.

## Authentication errors (`AuthError`)

| Code                    | Meaning                                                         |
| ----------------------- | --------------------------------------------------------------- |
| `AUTH_FAILED`           | Authentication failed (includes missing refresh token)          |
| `AUTH_ERROR`            | Generic authentication error                                    |
| `ALREADY_AUTHENTICATED` | Valid session already exists; run `mm logout` before signing in |
| `COMING_SOON`           | Feature not yet available                                       |
| `TOKEN_INVALID`         | Invalid CLI token, token pair, or project ID                    |
| `TOKEN_REFRESH_FAILED`  | Failed to refresh token                                         |
| `PAIRING_EXPIRED`       | Pairing session expired                                         |
| `INVALID_OTP`           | Invalid one-time password                                       |
| `MWP_TIMEOUT`           | Mobile Wallet Protocol timeout                                  |
| `MWP_CANCELLED`         | Mobile Wallet Protocol cancelled (pairing aborted)              |
| `PAIRING_CANCELLED`     | Browser pairing cancelled by the user                           |
| `ALREADY_LOGGED_OUT`    | No CLI auth session stored; run `mm login`                      |
| `LOGOUT_FAILED`         | Sign-out operation failed (includes token revoke failures)      |

## Validation errors (`ValidationError`)

| Code                          | Meaning                                                     |
| ----------------------------- | ----------------------------------------------------------- |
| `MISSING_FLAG`                | Required flag missing in headless mode                      |
| `MISSING_INPUT`               | Required input is missing                                   |
| `MISSING_CHAIN`               | Chain value is missing                                      |
| `MISSING_CHAIN_ID`            | `--chain-id` is missing                                     |
| `INVALID_CHAIN`               | Chain value is invalid                                      |
| `INVALID_INPUT`               | Invalid user input                                          |
| `INVALID_TO`                  | Recipient address is invalid                                |
| `INVALID_TYPED_DATA`          | EIP-712 payload is invalid                                  |
| `INVALID_TRANSACTION_PAYLOAD` | Transaction payload is invalid                              |
| `CHAIN_ID_MISMATCH`           | Typed-data domain chain ID differs from `--chain-id`        |
| `INVALID_MNEMONIC`            | Bring your own wallet mnemonic is invalid                   |
| `NOT_INITIALIZED`             | Project not initialized; run `mm init`                      |
| `INVALID_LIMIT`               | Invalid `--limit` value for `mm tx history` (must be 1–500) |
| `INVALID_CONFIG_KEY`          | Unknown CLI config key                                      |
| `INVALID_NETWORK`             | Unsupported or unknown network                              |
| `UNKNOWN_FLAG`                | Unrecognized CLI flag                                       |

## Wallet errors (`WalletError`)

| Code                    | Meaning                                          |
| ----------------------- | ------------------------------------------------ |
| `MISSING_MNEMONIC`      | Bring your own wallet mode is missing a mnemonic |
| `MNEMONIC_LOCKED`       | Mnemonic is password-protected                   |
| `WRONG_PASSWORD`        | Mnemonic password is incorrect                   |
| `WALLET_NOT_FOUND`      | Wallet not found                                 |
| `WALLET_NOT_REGISTERED` | BYOK wallet registration failed during `mm init` |
| `WALLET_ERROR`          | Wallet operation failed                          |
| `NO_AUTH_TOKEN`         | Missing authentication token                     |
| `NO_PROJECT_ID`         | Project ID not configured                        |
| `NO_HISTORY_WALLETS`    | No EVM wallets found for `mm tx history`         |
| `TX_NOT_FOUND`          | Transaction hash not found onchain               |
| `INVALID_TX_HASH`       | Malformed transaction hash                       |
| `INVALID_EVM_ADDRESS`   | Malformed EVM address input                      |
| `UNSUPPORTED_CHAIN`     | Chain not supported for this operation           |
| `INVALID_AMOUNT`        | Non-positive amount; value must be positive      |
| `TX_REVERTED`           | Transaction reverted onchain                     |

## Swap errors (`SwapCommandError`)

| Code                  | Meaning                                                |
| --------------------- | ------------------------------------------------------ |
| `NO_QUOTES`           | No swap quotes returned for the request                |
| `INVALID_SWAP_PARAMS` | Missing or invalid swap parameters                     |
| `TOKEN_NOT_FOUND`     | Token not found for the selected chain                 |
| `QUOTE_NOT_FOUND`     | Quote ID not found                                     |
| `NO_TRADE_DATA`       | Selected quote has no trade transaction                |
| `EXECUTE_FAILED`      | Swap execution failed                                  |
| `STATUS_UNAVAILABLE`  | Swap status unavailable                                |
| `INSUFFICIENT_FUNDS`  | Source token balance insufficient                      |
| `INSUFFICIENT_GAS`    | Native balance cannot cover gas fees                   |
| `AMOUNT_TOO_LOW`      | Swap amount below minimum threshold                    |
| `SLIPPAGE_TOO_HIGH`   | Slippage exceeds acceptable range                      |
| `QUOTE_RETRY`         | Transient bridge quote-stream retry signal (retryable) |
| `SWAP_ERROR`          | Generic swap error                                     |

## Perpetuals errors

<!-- vale off -->

| Code                      | Meaning                                                |
| ------------------------- | ------------------------------------------------------ |
| `ORDER_REJECTED`          | Order rejected by Hyperliquid                          |
| `DEPOSIT_FAILED`          | Deposit to venue failed                                |
| `INSUFFICIENT_BALANCE`    | Venue sub-account has insufficient balance             |
| `MINIMUM_DEPOSIT_AMOUNT`  | Deposit below Hyperliquid minimum                      |
| `MINIMUM_WITHDRAW_AMOUNT` | Withdrawal below Hyperliquid minimum                   |
| `MINIMUM_ORDER_NOTIONAL`  | Order notional below $10 floor                         |
| `HYPERLIQUID_ERROR`       | Generic Hyperliquid error (often unfunded sub-account) |
| `RATE_LIMITED`            | Hyperliquid HTTP 429 rate limit; retry after a delay   |

The CLI provides actionable hints for common failures — for example, minimum amounts for deposits
and withdrawals, the $10 notional floor for orders, funding shortfalls (including `--include-spot`),
and source-chain mismatches. Operational errors surface a retry hint instead of raw provider text.

See [Trade perpetuals](../guides/trade-perpetuals.md).

<!-- vale on -->

## Predict errors

All expected predict failures return actionable per-code hints. Inspect the `hint` field to determine the next action.

| Code                                    | Meaning                                                                   |
| --------------------------------------- | ------------------------------------------------------------------------- |
| `PREDICT_SETUP_REQUIRED`                | Run `mm predict setup` before this operation                              |
| `PREDICT_AUTH_REQUIRED`                 | Predict credentials missing or expired                                    |
| `PREDICT_AUTH_INVALID`                  | Predict credentials invalid; run `mm predict auth --refresh`              |
| `PREDICT_INSUFFICIENT_BALANCE`          | Insufficient pUSD in the deposit wallet                                   |
| `PREDICT_INSUFFICIENT_FUNDING_BALANCE`  | Insufficient USDC.e for `mm predict deposit`                              |
| `PREDICT_INSUFFICIENT_GAS`              | Insufficient native POL for gas on predict deposit                        |
| `PREDICT_INSUFFICIENT_ALLOWANCE`        | Insufficient allowance; run `mm predict approve`                          |
| `PREDICT_ORDER_SIZE_TOO_SMALL`          | Order size below exchange minimum; raise `--size`                         |
| `PREDICT_ORDER_NOT_FILLED`              | FOK order could not be fully filled; adjust `--size`/`--price` or use GTC |
| `PREDICT_GEOBLOCKED`                    | Polymarket is unavailable in this region                                  |
| `PREDICT_WITHDRAW_ZERO`                 | Withdraw amount must be greater than zero                                 |
| `PREDICT_WITHDRAW_INSUFFICIENT_BALANCE` | Insufficient balance for withdrawal                                       |
| `PREDICT_REDEEM_NONE`                   | No redeemable positions found                                             |
| `PREDICT_REDEEM_NOT_FOUND`              | Redeem target not found; check `mm predict redeem list`                   |
| `PREDICT_CANCEL_TARGET_REQUIRED`        | Cancel requires an order ID, market, or `--all`                           |
| `INVALID_TICK_SIZE`                     | Invalid `--tick-size` value for `mm predict quote`/`place`                |
| `PREDICT_ERROR`                         | Generic predict error                                                     |

## Earn errors

| Code                        | Meaning                                               |
| --------------------------- | ----------------------------------------------------- |
| `EARN_VAULT_NOT_FOUND`      | Yield vault not found for the specified token/chain   |
| `EARN_INSUFFICIENT_BALANCE` | Insufficient balance for earn supply                  |
| `EARN_WITHDRAW_REVERTED`    | Withdraw transaction reverted (retried automatically) |
| `EARN_ERROR`                | Generic earn error                                    |

## Server-wallet errors

| Code                | Meaning                                                                   |
| ------------------- | ------------------------------------------------------------------------- |
| `JOB_TIMEOUT`       | Wallet job timed out (default 10 minutes, max 600s)                       |
| `RELAY_TIMEOUT`     | Gasless relay timed out; run `mm wallet requests watch --polling-id <id>` |
| `RELAY_FAILED`      | Gasless relay failed                                                      |
| `RELAY_ABORTED`     | Gasless relay aborted                                                     |
| `REQUEST_NOT_FOUND` | Server-wallet request not found                                           |

## Network errors

| Code                  | Meaning             |
| --------------------- | ------------------- |
| `NETWORK_UNREACHABLE` | Network unreachable |

## Related pages

- [Troubleshooting](../troubleshooting.md)
- [Commands reference](commands.md)
