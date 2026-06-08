---
description: CLI error codes returned by mm and the MetaMask Agentic SDK.
keywords: [MetaMask, Agent Wallet, errors, mm]
---

# Error codes

The `mm` CLI surfaces errors with stable `code` values. Use these codes in scripts and agent
workflows to branch on failures.

Run `mm <command> --help` for command-specific validation rules.

## Authentication errors (`AuthError`)

| Code                   | Meaning                                                  |
| ---------------------- | -------------------------------------------------------- |
| `AUTH_FAILED`          | Authentication failed (includes missing refresh token)   |
| `AUTH_ERROR`           | Generic authentication error                             |
| `TOKEN_INVALID`        | Invalid CLI token, token pair, or project ID             |
| `TOKEN_REFRESH_FAILED` | Failed to refresh token                                  |
| `PAIRING_EXPIRED`      | Pairing session expired                                  |
| `INVALID_OTP`          | Invalid one-time password                                |
| `MWP_TIMEOUT`          | Mobile Wallet Protocol timeout                           |
| `MWP_CANCELLED`        | Mobile Wallet Protocol cancelled (pairing aborted)       |
| `LOGOUT_FAILED`        | Logout operation failed (includes token revoke failures) |

## Validation errors (`ValidationError`)

| Code                          | Meaning                                              |
| ----------------------------- | ---------------------------------------------------- |
| `MISSING_FLAG`                | Required flag missing in headless mode               |
| `MISSING_INPUT`               | Required input is missing                            |
| `MISSING_CHAIN`               | Chain value is missing                               |
| `MISSING_CHAIN_ID`            | `--chain-id` is missing                              |
| `INVALID_CHAIN`               | Chain value is invalid                               |
| `INVALID_INPUT`               | Invalid user input                                   |
| `INVALID_TO`                  | Recipient address is invalid                         |
| `INVALID_TYPED_DATA`          | EIP-712 payload is invalid                           |
| `INVALID_TRANSACTION_PAYLOAD` | Transaction payload is invalid                       |
| `CHAIN_ID_MISMATCH`           | Typed-data domain chain ID differs from `--chain-id` |
| `INVALID_MNEMONIC`            | BYOK mnemonic is invalid                             |

## Wallet errors (`WalletError`)

| Code               | Meaning                         |
| ------------------ | ------------------------------- |
| `MISSING_MNEMONIC` | BYOK mode is missing a mnemonic |
| `MNEMONIC_LOCKED`  | Mnemonic is password-protected  |
| `WRONG_PASSWORD`   | Mnemonic password is incorrect  |
| `WALLET_NOT_FOUND` | Wallet not found                |
| `WALLET_ERROR`     | Wallet operation failed         |
| `NO_AUTH_TOKEN`    | Missing authentication token    |
| `NO_PROJECT_ID`    | Project ID not configured       |

## Swap errors (`SwapCommandError`)

| Code                  | Meaning                                 |
| --------------------- | --------------------------------------- |
| `NO_QUOTES`           | No swap quotes returned for the request |
| `INVALID_SWAP_PARAMS` | Missing or invalid swap parameters      |
| `TOKEN_NOT_FOUND`     | Token not found for the selected chain  |
| `QUOTE_NOT_FOUND`     | Quote ID not found                      |
| `NO_TRADE_DATA`       | Selected quote has no trade transaction |
| `EXECUTE_FAILED`      | Swap execution failed                   |
| `STATUS_UNAVAILABLE`  | Swap status unavailable                 |
| `SWAP_ERROR`          | Generic swap error                      |

## Perpetuals errors

Common Hyperliquid failures include `ORDER_REJECTED`, `DEPOSIT_FAILED`, `INSUFFICIENT_BALANCE`, and
`HYPERLIQUID_ERROR` when the venue sub-account has not been funded. See
[Trade perpetuals](../guides/trade-perpetuals.md).

## Predict errors

| Code                                   | Meaning                                      |
| -------------------------------------- | -------------------------------------------- |
| `PREDICT_SETUP_REQUIRED`               | Run `mm predict setup` before this operation |
| `PREDICT_AUTH_REQUIRED`                | Predict credentials missing or expired       |
| `PREDICT_INSUFFICIENT_BALANCE`         | Insufficient pUSD in the deposit wallet      |
| `PREDICT_INSUFFICIENT_FUNDING_BALANCE` | Insufficient USDC.e for `mm predict deposit` |
| `PREDICT_ERROR`                        | Generic predict error                        |

## Network errors

| Code                  | Meaning             |
| --------------------- | ------------------- |
| `NETWORK_UNREACHABLE` | Network unreachable |

## Related pages

- [Troubleshooting](../troubleshooting.md)
- [Commands reference](commands.md)
