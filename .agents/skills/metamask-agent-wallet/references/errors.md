# Error Codes

This reference lists raw CLI and SDK error codes. Workflows for diagnosing failures live in `../workflows/troubleshooting.md`.

## Auth Errors

| Code                       | Meaning                                            |
| -------------------------- | -------------------------------------------------- |
| `AUTH_FAILED`              | Authentication failed                              |
| `AUTH_ERROR`               | Generic authentication error                       |
| `TOKEN_INVALID`            | Invalid CLI token                                  |
| `TOKEN_REFRESH_FAILED`     | Failed to refresh token                            |
| `PAIRING_ABORTED`          | Login pairing was aborted                          |
| `PAIRING_TIMEOUT`          | Login pairing timed out                            |
| `PAIRING_EXPIRED`          | Pairing session expired                            |
| `INVALID_CLI_TOKENS`       | CLI token pair is invalid                          |
| `INVALID_CLI_TOKEN`        | CLI token is invalid                               |
| `MISSING_REFRESH_TOKEN`    | Refresh token is missing                           |
| `REFRESH_CLI_TOKEN_FAILED` | CLI token refresh failed                           |
| `MISSING_TOKEN`            | Required auth token is missing                     |
| `REVOKE_CLI_TOKEN_FAILED`  | CLI token revoke failed                            |
| `INVALID_PROJECT_ID`       | Project ID is invalid for the selected environment |
| `MISSING_PROJECT_ID`       | Project ID is not configured                       |
| `INVALID_OTP`              | Invalid one-time password                          |
| `MWP_TIMEOUT`              | Mobile Wallet Protocol timeout                     |
| `MWP_CANCELLED`            | Mobile Wallet Protocol cancelled                   |
| `LOGOUT_FAILED`            | Logout operation failed                            |

## Validation Errors

| Code                          | Meaning                                              |
| ----------------------------- | ---------------------------------------------------- |
| `MISSING_FLAG`                | Required flag is missing in headless mode            |
| `MISSING_INPUT`               | Required input is missing                            |
| `MISSING_CHAIN`               | Chain value is missing                               |
| `MISSING_CHAIN_ID`            | Chain ID is missing                                  |
| `INVALID_CHAIN`               | Chain value is invalid                               |
| `MISSING_TO`                  | Recipient address is missing                         |
| `INVALID_TO`                  | Recipient address is invalid                         |
| `INVALID_DATA`                | Transaction data is invalid                          |
| `INVALID_INPUT`               | Invalid user input                                   |
| `INVALID_QUANTITY`            | EVM quantity is invalid                              |
| `INVALID_LIMIT`               | Invalid limit value                                  |
| `INVALID_INTERVAL`            | Invalid time interval                                |
| `INVALID_TIMESTAMP`           | Invalid timestamp                                    |
| `INVALID_ASSET_ID`            | Invalid asset identifier                             |
| `MISSING_ASSET_IDS`           | Missing asset IDs                                    |
| `MISSING_ASSET_TYPE`          | Missing asset type                                   |
| `MISSING_QUERY`               | Missing search query                                 |
| `MISSING_WALLET_REF`          | Missing wallet reference                             |
| `MISSING_TRANSACTION_PAYLOAD` | Transaction payload is missing                       |
| `INVALID_TRANSACTION_PAYLOAD` | Transaction payload is invalid                       |
| `MISSING_TYPED_DATA`          | EIP-712 typed data payload is missing                |
| `INVALID_TYPED_DATA`          | EIP-712 typed data payload is invalid                |
| `CHAIN_ID_MISMATCH`           | Typed-data domain chain ID differs from `--chain-id` |
| `INVALID_MNEMONIC`            | BYOK mnemonic is invalid                             |

## Wallet Errors

| Code                    | Meaning                                                                       |
| ----------------------- | ----------------------------------------------------------------------------- |
| `MISSING_MNEMONIC`      | BYOK wallet mode is missing a mnemonic                                        |
| `MNEMONIC_LOCKED`       | Mnemonic unlock failed after maximum attempts                                 |
| `WRONG_PASSWORD`        | Current password is incorrect                                                 |
| `ALREADY_ENCRYPTED`     | Mnemonic is already password-encrypted (use `wallet password change` instead) |
| `NOT_ENCRYPTED`         | Mnemonic is not encrypted (use `wallet password set` instead)                 |
| `PASSWORD_MISMATCH`     | Password confirmation does not match                                          |
| `EMPTY_PASSWORD`        | Empty password provided                                                       |
| `WALLET_NOT_FOUND`      | Wallet not found                                                              |
| `WALLET_ERROR`          | Wallet provider or wallet operation error                                     |
| `WALLET_METADATA`       | Wallet metadata error                                                         |
| `WRONG_NAMESPACE`       | Wrong namespace for wallet                                                    |
| `UNSUPPORTED_NAMESPACE` | Unsupported wallet namespace                                                  |
| `NO_AUTH_TOKEN`         | Missing authentication token for wallet operations                            |
| `NO_PROJECT_ID`         | Project ID not configured for wallet                                          |

## Command Errors

| Code                  | Meaning                                     |
| --------------------- | ------------------------------------------- |
| `ABORTED`             | Operation aborted by user                   |
| `NOT_INITIALIZED`     | Project not initialized — run `mm-dev init` |
| `NO_MNEMONIC`         | Mnemonic not stored                         |
| `NO_TTY`              | No TTY available for interactive prompts    |
| `MISSING_ID`          | Missing ID parameter                        |
| `MISSING_QUOTE_ID`    | Missing quote ID                            |
| `MISSING_SWAP_PARAMS` | Missing swap parameters                     |

## Swap & Bridge Errors

| Code                       | Meaning                                        |
| -------------------------- | ---------------------------------------------- |
| `NO_QUOTES`                | No swap or bridge quotes available             |
| `BRIDGE_API_ERROR`         | Bridge API error                               |
| `TOKEN_NOT_FOUND`          | Token not found                                |
| `INVALID_SWAP_PARAMS`      | Invalid swap parameters                        |
| `NATIVE_ASSET_UNSUPPORTED` | Native asset not supported for this swap route |
| `QUOTE_PERSIST_FAILED`     | Failed to persist quote                        |
| `QUOTE_NOT_FOUND`          | Quote not found                                |
| `EXECUTE_FAILED`           | Swap execution failed                          |
| `NO_TRADE_DATA`            | No trade data available                        |
| `STATUS_UNAVAILABLE`       | Swap status unavailable                        |
| `SWAP_ERROR`               | Generic swap error                             |

## Perps Errors

| Code                       | Meaning                               |
| -------------------------- | ------------------------------------- |
| `UNSUPPORTED_VENUE`        | Unsupported perpetual venue           |
| `UNSUPPORTED_NETWORK`      | Unsupported network for perps         |
| `UNSUPPORTED_ROUTE`        | Unsupported deposit or withdraw route |
| `UNSUPPORTED_ASSET`        | Unsupported asset                     |
| `UNSUPPORTED_SOURCE_CHAIN` | Unsupported source chain              |
| `INVALID_SYMBOL`           | Unknown perpetual market symbol       |
| `INVALID_AMOUNT`           | Invalid amount                        |
| `INVALID_SIZE`             | Invalid position size                 |
| `INVALID_LEVERAGE`         | Invalid leverage value                |
| `INVALID_PRICE`            | Invalid price                         |
| `INVALID_SLIPPAGE`         | Invalid slippage value                |
| `INVALID_ADDRESS`          | Invalid address                       |
| `INSUFFICIENT_BALANCE`     | Insufficient balance                  |
| `POSITION_NOT_FOUND`       | Position not found                    |
| `QUOTE_FAILED`             | Quote generation failed               |
| `ORDER_REJECTED`           | Order rejected                        |
| `CANCEL_FAILED`            | Order cancellation failed             |
| `SIGNING_FAILED`           | Signing operation failed              |
| `WITHDRAW_FAILED`          | Withdrawal failed                     |
| `DEPOSIT_FAILED`           | Deposit failed                        |
| `HYPERLIQUID_ERROR`        | Hyperliquid protocol error            |
| `PERPS_ERROR`              | Generic perpetuals error              |

## Predict Errors

| Code                                | Meaning                                   |
| ----------------------------------- | ----------------------------------------- |
| `PREDICT_SETUP_REQUIRED`            | Predict setup required before operation   |
| `PREDICT_AUTH_REQUIRED`             | Predict authentication required           |
| `PREDICT_AUTH_INVALID`              | Predict credentials invalid or incomplete |
| `PREDICT_RELAYER_CONFIG_REQUIRED`   | Relayer configuration required            |
| `PREDICT_INVALID_DEPOSIT_AMOUNT`    | Invalid deposit amount                    |
| `PREDICT_FUNDING_CHAIN_UNSUPPORTED` | Funding chain not supported               |
| `PREDICT_INSUFFICIENT_BALANCE`      | Insufficient Predict balance              |
| `PREDICT_INSUFFICIENT_ALLOWANCE`    | Insufficient Predict allowance            |
| `PREDICT_CANCEL_TARGET_REQUIRED`    | Cancel target not specified               |
| `PREDICT_WALLET_STATE_REQUIRED`     | Wallet state required for Predict         |
| `PREDICT_METHOD_UNAVAILABLE`        | Predict method not available              |

## Network & Filesystem Errors

| Code                    | Meaning                       |
| ----------------------- | ----------------------------- |
| `NETWORK_UNREACHABLE`   | Network unreachable           |
| `NETWORK_TIMEOUT`       | Network timeout               |
| `NETWORK_ERROR`         | Generic network error         |
| `RESET_FAILED`          | Failed to reset CLI session   |
| `MNEMONIC_STORE_FAILED` | Failed to store mnemonic      |
| `FILESYSTEM_ERROR`      | Generic filesystem error      |
| `TX_REVERTED`           | Transaction reverted on-chain |
