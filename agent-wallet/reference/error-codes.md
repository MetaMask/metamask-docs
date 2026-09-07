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
| `PAIRING_TIMEOUT`       | Sign-in pairing timed out                                       |
| `PAIRING_EXPIRED`       | Pairing session expired                                         |
| `INVALID_OTP`           | Invalid one-time password                                       |
| `MWP_TIMEOUT`           | Mobile Wallet Protocol timeout                                  |
| `MWP_CANCELLED`         | Mobile Wallet Protocol cancelled (pairing aborted)              |
| `LOGOUT_FAILED`         | Sign-out operation failed (includes token revoke failures)      |
| `ALREADY_LOGGED_OUT`    | No active session to sign out of. `mm logout` still exits 0     |

## Validation errors (`ValidationError`)

| Code                          | Meaning                                                                                                                                                  |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MISSING_FLAG`                | Required flag missing in headless mode                                                                                                                   |
| `MISSING_INPUT`               | Required input is missing                                                                                                                                |
| `MISSING_CHAIN`               | Chain value is missing                                                                                                                                   |
| `MISSING_CHAIN_ID`            | `--chain-id` is missing                                                                                                                                  |
| `INVALID_CHAIN`               | Chain value is invalid                                                                                                                                   |
| `INVALID_INPUT`               | Invalid user input                                                                                                                                       |
| `INVALID_TO`                  | Recipient address is invalid                                                                                                                             |
| `INVALID_TYPED_DATA`          | EIP-712 payload is invalid                                                                                                                               |
| `INVALID_TRANSACTION_PAYLOAD` | Transaction payload is invalid                                                                                                                           |
| `CHAIN_ID_MISMATCH`           | Typed-data domain chain ID differs from `--chain-id`                                                                                                     |
| `INVALID_MNEMONIC`            | Bring your own wallet mnemonic is invalid                                                                                                                |
| `NOT_INITIALIZED`             | Project not initialized; run `mm init`                                                                                                                   |
| `INVALID_LIMIT`               | Invalid `--limit` value; `mm tx history` accepts 1–50 and `mm token list search` accepts 1–500                                                           |
| `INVALID_DATA`                | The Price API returned an empty or malformed response for `mm price history`; retry, or verify the asset and chain with `mm price spot`                  |
| `MISSING_ASSET_IDS`           | No asset IDs passed to `mm price spot` or `mm token assets`; pass `--asset-ids` as comma-separated CAIP-19 IDs                                           |
| `MISSING_ASSET_TYPE`          | `--asset-type` is missing on `mm price history` and the chain has no native asset to fall back to                                                        |
| `INVALID_ASSET_ID`            | Malformed CAIP-19 asset ID or `--asset-type`. `mm price spot` also accepts a bare CAIP-2 chain ID and resolves it to that chain's native asset           |
| `MISSING_QUERY`               | No search term passed to `mm token list search`; pass it as a positional argument                                                                        |
| `INVALID_POLICY_YAML`         | Policy YAML passed to `mm wallet policy set` is not a valid policy object; use `mm wallet policy get` or `mm wallet policy template` as a starting point |
| `INVALID_CONFIG_KEY`          | Unknown CLI config key                                                                                                                                   |
| `INVALID_NETWORK`             | Unsupported or unknown network                                                                                                                           |
| `UNKNOWN_FLAG`                | Unrecognized CLI flag                                                                                                                                    |
| `MISSING_WALLET_REF`          | Missing wallet address for `mm wallet select` in a non-interactive run; pass the address as a positional argument                                        |
| `INVALID_EVM_ADDRESS`         | Malformed EVM address input                                                                                                                              |
| `INVALID_SORT_BY`             | Invalid `--sort-by` field                                                                                                                                |
| `INVALID_SORT_DIRECTION`      | Invalid `--sort-direction` value; use `asc` or `desc`                                                                                                    |
| `INVALID_HISTORY_TYPE`        | Invalid `--type`; use `closed`, `trade`, or `redeem`                                                                                                     |

## Wallet errors (`WalletError`)

| Code                    | Meaning                                           |
| ----------------------- | ------------------------------------------------- |
| `MISSING_MNEMONIC`      | Bring your own wallet mode is missing a mnemonic  |
| `MNEMONIC_LOCKED`       | Mnemonic unlock failed after the maximum attempts |
| `WRONG_PASSWORD`        | Mnemonic password is incorrect                    |
| `WALLET_NOT_FOUND`      | Wallet not found                                  |
| `WALLET_NOT_REGISTERED` | BYOK wallet registration failed during `mm init`  |
| `WALLET_ERROR`          | Wallet operation failed                           |
| `NO_AUTH_TOKEN`         | Missing authentication token                      |
| `NO_PROJECT_ID`         | Project ID not configured                         |
| `NO_HISTORY_WALLETS`    | No EVM wallets found for `mm tx history`          |
| `TX_NOT_FOUND`          | Transaction hash not found onchain                |
| `INVALID_TX_HASH`       | Malformed transaction hash                        |
| `UNSUPPORTED_CHAIN`     | Chain not supported for this operation            |
| `INVALID_AMOUNT`        | Non-positive amount; value must be positive       |
| `TX_REVERTED`           | Transaction reverted onchain                      |
| `TX_DENIED`             | Transaction was rejected during 2FA approval      |
| `TX_EXPIRED`            | 2FA approval for the transaction expired          |
| `TX_FAILED`             | Transaction failed after submission               |

## Swap errors (`SwapCommandError`)

| Code                   | Meaning                                                 |
| ---------------------- | ------------------------------------------------------- |
| `NO_QUOTES`            | No swap quotes returned for the request                 |
| `INVALID_SWAP_PARAMS`  | Missing or invalid swap parameters                      |
| `TOKEN_NOT_FOUND`      | Token not found for the selected chain                  |
| `QUOTE_NOT_FOUND`      | Quote ID not found                                      |
| `QUOTE_PERSIST_FAILED` | Quote could not be written to `~/.metamask/swap-quotes` |
| `GASLESS_UNSUPPORTED`  | Gasless relay unavailable on this chain                 |
| `NO_TRADE_DATA`        | Selected quote has no trade transaction                 |
| `EXECUTE_FAILED`       | Swap execution failed                                   |
| `STATUS_UNAVAILABLE`   | Swap status unavailable                                 |
| `INSUFFICIENT_FUNDS`   | Source token balance insufficient                       |
| `INSUFFICIENT_GAS`     | Native balance cannot cover gas fees                    |
| `AMOUNT_TOO_LOW`       | Swap amount below minimum threshold                     |
| `SLIPPAGE_TOO_HIGH`    | Slippage exceeds acceptable range                       |
| `QUOTE_RETRY`          | Transient bridge quote-stream retry signal (retryable)  |
| `FEES_LOOKUP_FAILED`   | Wallet fee lookup failed unexpectedly                   |
| `SWAP_ERROR`           | Generic swap error                                      |

## Perpetuals errors

<!-- vale off -->

| Code                   | Meaning                                                |
| ---------------------- | ------------------------------------------------------ |
| `ORDER_REJECTED`       | Order rejected by Hyperliquid                          |
| `DEPOSIT_FAILED`       | Deposit to venue failed                                |
| `INSUFFICIENT_BALANCE` | Venue sub-account has insufficient balance             |
| `HYPERLIQUID_ERROR`    | Generic Hyperliquid error (often unfunded sub-account) |
| `RATE_LIMITED`         | Hyperliquid HTTP 429 rate limit; retry after a delay   |
| `POSITION_NOT_FOUND`   | Perpetuals position not found for the given symbol     |

The CLI provides actionable hints for common failures — for example, minimum amounts for deposits
and withdrawals, the $10 notional floor for orders, funding shortfalls (deposit or
`mm perps transfer --direction spot-to-perp`), and source-chain mismatches. Operational errors
surface a retry hint instead of raw provider text.

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
| `PREDICT_GEOBLOCKED`                    | Polymarket is unavailable in this region, per the geoblock API            |
| `PREDICT_UNAVAILABLE_FOR_LEGAL_REASONS` | Polymarket returned HTTP 451 for a legal restriction in this region       |
| `PREDICT_WITHDRAW_ZERO`                 | Withdraw amount must be greater than zero                                 |
| `PREDICT_WITHDRAW_INSUFFICIENT_BALANCE` | Insufficient balance for withdrawal                                       |
| `PREDICT_REDEEM_NONE`                   | No redeemable positions found                                             |
| `PREDICT_REDEEM_NOT_FOUND`              | Redeem target not found; check `mm predict redeem list`                   |
| `PREDICT_CANCEL_TARGET_REQUIRED`        | Cancel requires an order ID, market, or `--all`                           |
| `INVALID_TICK_SIZE`                     | Invalid `--tick-size` value for `mm predict quote`/`place`                |
| `PREDICT_HISTORY_INVALID_SORT_BY`       | Invalid `--sort-by` value for `mm predict history`                        |
| `PREDICT_ERROR`                         | Generic predict error                                                     |

## Earn errors

| Code                      | Meaning                                                         |
| ------------------------- | --------------------------------------------------------------- |
| `VAULT_NOT_FOUND`         | Yield vault not found for the specified token and chain         |
| `AMBIGUOUS_VAULT`         | Multiple vaults match `--token`; pass `--vault` or `--protocol` |
| `POSITION_NOT_FOUND`      | No earn position matches `--token` for `mm earn withdraw`       |
| `NO_POSITION`             | No yield positions found for the active wallet                  |
| `NOT_REDEEMABLE`          | The vault does not support withdrawals                          |
| `INSUFFICIENT_LP_BALANCE` | Insufficient LP balance for the requested withdraw amount       |
| `EARN_API_ERROR`          | LiFi API error or rate limit                                    |
| `EARN_ERROR`              | Generic earn error                                              |

## Server-wallet errors

| Code                | Meaning                                                                                                                    |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `JOB_TIMEOUT`       | Wallet job timed out (default 10 minutes, max 600s)                                                                        |
| `RELAY_TIMEOUT`     | Gasless relay timed out; run `mm wallet requests watch <id>`                                                               |
| `RELAY_FAILED`      | Gasless relay failed, usually because the wallet cannot cover the amount plus the relay fee. Retry with a lower `--amount` |
| `RELAY_ABORTED`     | Gasless relay aborted                                                                                                      |
| `REQUEST_NOT_FOUND` | Server-wallet request not found                                                                                            |

## Runtime errors

| Code               | Meaning                                                                                                              |
| ------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `UNSUPPORTED_NODE` | Node.js version is below the minimum required (22.18). Upgrade Node.js from https://nodejs.org/ or use nvm/fnm/volta |

## Network errors

| Code                  | Meaning             |
| --------------------- | ------------------- |
| `NETWORK_UNREACHABLE` | Network unreachable |

## Plugin errors

Returned by `mm plugins` and installed plugin commands.
See the [plugins overview](../plugins/index.md).

| Code                           | Meaning                                                                                        |
| ------------------------------ | ---------------------------------------------------------------------------------------------- |
| `PLUGIN_BETA_DISABLED`         | Plugins are disabled. Run `mm config set experimentalPlugins true`                             |
| `PLUGIN_UNVERIFIED_SOURCE`     | Local or git source refused. Enable `experimentalAllowUnverifiedInstalls` for development      |
| `PLUGIN_NOT_FOUND`             | npm package could not be resolved                                                              |
| `PLUGIN_METADATA_UNAVAILABLE`  | npm metadata could not be fetched. The install fails closed                                    |
| `PLUGIN_MANIFEST_INVALID`      | The package's `package.json#mm` manifest is missing or invalid                                 |
| `PLUGIN_MANIFEST_FILE_MISSING` | The package did not ship a prebuilt `oclif.manifest.json`. It was not approved and was removed |
| `PLUGIN_CLI_VERSION`           | The plugin requires a newer Agent Wallet version than the one running                          |
| `PLUGIN_ID_COLLISION`          | A plugin command ID collides with a built-in command                                           |
| `PLUGIN_HOOKS_FORBIDDEN`       | The package declares `oclif.hooks` or `oclif.plugins`, which are not allowed                   |
| `PLUGIN_INVALID_BASE`          | A plugin command does not extend `PluginCommand`                                               |
| `PLUGIN_SEALED_OVERRIDE`       | A plugin command overrides a sealed lifecycle member                                           |
| `PERMISSION_DENIED`            | Install consent was declined, or a command used a capability it was not granted                |

## Related pages

- [Troubleshooting](../troubleshooting.md)
- [Commands reference](commands.md)
