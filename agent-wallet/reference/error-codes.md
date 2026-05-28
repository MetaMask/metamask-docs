---
description: CLI error codes returned by mm and the MetaMask Agentic SDK.
keywords: [MetaMask, Agent Wallet, errors, mm]
---

# Error codes

The `mm` CLI surfaces errors with stable `code` values. Use these codes in scripts and agent
workflows to branch on failures.

Run `mm <command> --help` for command-specific validation rules.

## Authentication errors (`AuthError`)

| Code                       | Meaning                                   |
| -------------------------- | ----------------------------------------- |
| `PAIRING_ABORTED`          | Sign-in pairing was aborted               |
| `PAIRING_TIMEOUT`          | Sign-in pairing timed out                 |
| `INVALID_CLI_TOKENS`       | CLI token pair is invalid                 |
| `INVALID_CLI_TOKEN`        | CLI token is invalid                      |
| `MISSING_REFRESH_TOKEN`    | Refresh token is missing — run `mm login` |
| `REFRESH_CLI_TOKEN_FAILED` | CLI token refresh failed                  |
| `MISSING_TOKEN`            | Required auth token is missing            |
| `REVOKE_CLI_TOKEN_FAILED`  | CLI token revoke failed                   |
| `INVALID_PROJECT_ID`       | Project ID is invalid                     |

## Validation errors

| Code                 | Meaning                                              |
| -------------------- | ---------------------------------------------------- |
| `MISSING_FLAG`       | Required flag missing in headless mode               |
| `MISSING_CHAIN`      | Chain value is missing                               |
| `MISSING_CHAIN_ID`   | `--chain-id` is missing                              |
| `INVALID_CHAIN`      | Chain value is invalid                               |
| `INVALID_MNEMONIC`   | BYOK mnemonic is invalid                             |
| `INVALID_TYPED_DATA` | EIP-712 payload is invalid                           |
| `CHAIN_ID_MISMATCH`  | Typed-data domain chain ID differs from `--chain-id` |

## Wallet errors

| Code               | Meaning                         |
| ------------------ | ------------------------------- |
| `MISSING_MNEMONIC` | BYOK mode is missing a mnemonic |
| `WRONG_PASSWORD`   | Mnemonic password is incorrect  |
| `WALLET_NOT_FOUND` | Wallet not found                |
| `WALLET_ERROR`     | Wallet operation failed         |
| `NO_AUTH_TOKEN`    | Missing authentication token    |
| `NO_PROJECT_ID`    | Project ID not configured       |

## Swap errors (`SwapError`)

| Code                  | Meaning                                 |
| --------------------- | --------------------------------------- |
| `NO_QUOTES`           | No swap quotes returned for the request |
| `INVALID_SWAP_PARAMS` | Missing or invalid swap parameters      |
| `NO_TRADE_DATA`       | Selected quote has no trade transaction |
| `EXECUTE_FAILED`      | Swap execution failed                   |

## Perpetuals errors (`PerpsRuntimeError`)

Common Hyperliquid failures include order rejection, deposit failure, and account-not-found errors
when the venue sub-account has not been funded. See [Trade perpetuals](../guides/trade-perpetuals.md).

## Related pages

- [Troubleshooting](../troubleshooting.md)
- [Commands reference](commands.md)
