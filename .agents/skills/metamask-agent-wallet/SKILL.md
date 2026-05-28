---
name: metamask-agent-wallet
description: Use when the user asks anything about blockchain wallets, transactions, signing, token transfers, supported chains, wallet balances, perpetual futures trading, prediction markets, token swaps, cross-chain bridges, market data, token discovery, or authentication via the MetaMask Agentic CLI. Single entry point for all mm-dev CLI operations.
license: MIT
metadata:
  author: metamask
  version: '1.0.0'
---

# MetaMask Agentic CLI Skill

This skill documents the `mm-dev` CLI surface for MetaMask Agent Wallet authentication, wallet lifecycle, balance queries, token transfers, message and typed-data signing, raw transactions, chain discovery, market data, token discovery, perpetual futures trading, prediction market trading, token swaps, and cross-chain bridges.

Use the routing table to select the relevant reference file. CLI behavior lives in `references/`. Repeatable operational patterns live in `workflows/`.

## Command Routing

Match the user's intent to a command and reference file, then read the reference before constructing a command. If intent spans multiple domains, load them sequentially in dependency order.

| User Intent                                        | Command                                        | Reference                                   |
| -------------------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| Check authentication status                        | `mm-dev auth status`                           | [auth.md](references/auth.md)               |
| Login in MetaMask Agentic CLI                      | `mm-dev login`                                 | [auth.md](references/auth.md)               |
| Choose a wallet mode and set up policies           | `mm-dev init`                                  | [auth.md](references/auth.md)               |
| Show current init settings                         | `mm-dev init show`                             | [auth.md](references/auth.md)               |
| Sign in via QR code                                | `mm-dev login qr`                              | [auth.md](references/auth.md)               |
| Sign in via Google                                 | `mm-dev login google`                          | [auth.md](references/auth.md)               |
| Sign in via email OTP                              | `mm-dev login email`                           | [auth.md](references/auth.md)               |
| Sign out                                           | `mm-dev logout`                                | [auth.md](references/auth.md)               |
| Reset CLI session                                  | `mm-dev reset`                                 | [auth.md](references/auth.md)               |
| Set BYOK mnemonic encryption password              | `mm-dev wallet password set`                   | [auth.md](references/auth.md)               |
| Change BYOK mnemonic encryption password           | `mm-dev wallet password change`                | [auth.md](references/auth.md)               |
| Remove BYOK mnemonic encryption password           | `mm-dev wallet password remove`                | [auth.md](references/auth.md)               |
| Interpret raw CLI error codes                      | `AuthError`, `ValidationError`, `WALLET_ERROR` | [errors.md](references/errors.md)           |
| Create a wallet                                    | `mm-dev wallet create`                         | [wallet.md](references/wallet.md)           |
| List all wallets                                   | `mm-dev wallet list`                           | [wallet.md](references/wallet.md)           |
| Switch active wallet                               | `mm-dev wallet select`                         | [wallet.md](references/wallet.md)           |
| Show active wallet details                         | `mm-dev wallet show`                           | [wallet.md](references/wallet.md)           |
| Show active wallet address                         | `mm-dev wallet address`                        | [wallet.md](references/wallet.md)           |
| Check the active wallet balance                    | `mm-dev wallet balance`                        | [wallet.md](references/wallet.md)           |
| Sign a plaintext message                           | `mm-dev wallet sign-message`                   | [signing.md](references/signing.md)         |
| Sign EIP-712 typed data                            | `mm-dev wallet sign-typed-data`                | [signing.md](references/signing.md)         |
| Send a raw EVM transaction                         | `mm-dev wallet send-transaction`               | [transaction.md](references/transaction.md) |
| Transfer native tokens or ERC-20 tokens            | `mm-dev transfer`                              | [transfer.md](references/transfer.md)       |
| List supported chains by the CLI                   | `mm-dev chains list`                           | [chain.md](references/chain.md)             |
| List pending wallet requests                       | `mm-dev wallet requests list`                  | [polling.md](references/polling.md)         |
| Watch a wallet polling id                          | `mm-dev wallet requests watch`                 | [polling.md](references/polling.md)         |
| Query spot or historical prices                    | `mm-dev price ...`                             | [market-data.md](references/market-data.md) |
| Discover tokens, token networks, or token metadata | `mm-dev token ...`                             | [market-data.md](references/market-data.md) |
| List perpetual markets                             | `mm-dev perps markets`                         | [perps.md](references/perps.md)             |
| Check perps account balance                        | `mm-dev perps balance`                         | [perps.md](references/perps.md)             |
| List open perpetual positions                      | `mm-dev perps positions`                       | [perps.md](references/perps.md)             |
| Get a quote for a perpetual order                  | `mm-dev perps quote`                           | [perps.md](references/perps.md)             |
| List resting perpetual orders                      | `mm-dev perps orders`                          | [perps.md](references/perps.md)             |
| Open a perpetual position                          | `mm-dev perps open`                            | [perps.md](references/perps.md)             |
| Close a perpetual position                         | `mm-dev perps close`                           | [perps.md](references/perps.md)             |
| Modify leverage, take-profit, or stop-loss         | `mm-dev perps modify`                          | [perps.md](references/perps.md)             |
| Cancel a resting perps order                       | `mm-dev perps cancel`                          | [perps.md](references/perps.md)             |
| Deposit USDC into a perps venue                    | `mm-dev perps deposit`                         | [perps.md](references/perps.md)             |
| Withdraw USDC from a perps venue                   | `mm-dev perps withdraw`                        | [perps.md](references/perps.md)             |
| Transfer USDC between spot and perp accounts       | `mm-dev perps transfer`                        | [perps.md](references/perps.md)             |
| List perpetual futures venues                      | `mm-dev perps list-venues`                     | [perps.md](references/perps.md)             |
| List available DEXs for a venue                    | `mm-dev perps dexs`                            | [perps.md](references/perps.md)             |
| Set Predict trading mode                           | `mm-dev predict mode`                          | [predict.md](references/predict.md)         |
| One-time Predict setup                             | `mm-dev predict setup`                         | [predict.md](references/predict.md)         |
| Create or refresh Predict credentials              | `mm-dev predict auth`                          | [predict.md](references/predict.md)         |
| Repair Predict approvals                           | `mm-dev predict approve`                       | [predict.md](references/predict.md)         |
| Check Predict back-end status                      | `mm-dev predict status`                        | [predict.md](references/predict.md)         |
| Search prediction markets                          | `mm-dev predict markets`                       | [predict.md](references/predict.md)         |
| Inspect a prediction market                        | `mm-dev predict market`                        | [predict.md](references/predict.md)         |
| Preview a prediction order cost                    | `mm-dev predict quote`                         | [predict.md](references/predict.md)         |
| Place a prediction market order                    | `mm-dev predict place`                         | [predict.md](references/predict.md)         |
| Cancel prediction orders                           | `mm-dev predict cancel`                        | [predict.md](references/predict.md)         |
| View prediction market positions                   | `mm-dev predict positions`                     | [predict.md](references/predict.md)         |
| View open prediction orders                        | `mm-dev predict orders`                        | [predict.md](references/predict.md)         |
| Check Predict deposit wallet balance               | `mm-dev predict balance`                       | [predict.md](references/predict.md)         |
| Fund Predict deposit wallet                        | `mm-dev predict deposit`                       | [predict.md](references/predict.md)         |
| Fetch prediction order book                        | `mm-dev predict book`                          | [predict.md](references/predict.md)         |
| Watch a Predict job                                | `mm-dev predict watch`                         | [predict.md](references/predict.md)         |
| Get a swap or bridge quote                         | `mm-dev swap quote`                            | [swap.md](references/swap.md)               |
| Execute a token swap or bridge                     | `mm-dev swap execute`                          | [swap.md](references/swap.md)               |
| Check swap or bridge status                        | `mm-dev swap status`                           | [swap.md](references/swap.md)               |
| Bridge tokens to another chain                     | `mm-dev swap execute`                          | [swap.md](references/swap.md)               |

## Workflows

CLI behavior lives in `references/`. Repeatable patterns live in `workflows/`. Load a workflow file when the user's request is a pattern, not a single command.

| Pattern                                  | Workflow                                                       |
| ---------------------------------------- | -------------------------------------------------------------- |
| First time setup and onboarding          | [onboarding.md](workflows/onboarding.md)                       |
| Login flow                               | [login.md](workflows/login.md)                                 |
| Troubleshooting decision tree            | [troubleshooting.md](workflows/troubleshooting.md)             |
| Swap quote-review-execute flow           | [swap.md](workflows/swap.md)                                   |
| Bridge quote-review-execute flow         | [bridge.md](workflows/bridge.md)                               |
| Open a perpetual position flow           | [perps-open-position.md](workflows/perps-open-position.md)     |
| Close a perpetual position flow          | [perps-close-position.md](workflows/perps-close-position.md)   |
| Modify a perpetual position flow         | [perps-modify-position.md](workflows/perps-modify-position.md) |
| Predict setup-fund-quote-place flow      | [predict-trading.md](workflows/predict-trading.md)             |
| Token discovery, prices, and market data | [market-data.md](workflows/market-data.md)                     |

## Global Flags

Every `mm-dev` command accepts these flags:

| Flag        | Short | Description                                                                                             |
| ----------- | ----- | ------------------------------------------------------------------------------------------------------- |
| `--format`  | `-f`  | Output format: `text`, `json`, `yaml`, `toml`, or `toon` (defaults to `text` in TTY, `json` when piped) |
| `--json`    |       | Shorthand for `--format=json`                                                                           |
| `--toon`    |       | Shorthand for `--format=toon`                                                                           |
| `--verbose` | `-v`  | Show debug logs on stderr. Use for troubleshooting                                                      |

Always use `--toon` for command output unless the user explicitly requests a different format.

## Preflight

Always run preflight before any CLI operation.

```bash
mm-dev auth status
```

If the user is not authenticated, follow `workflows/onboarding.md` for first time setup, or `workflows/login.md` for login.

## Safety Rules

These rules apply to every operation, regardless of which reference or workflow is active.

### Input Validation

Before constructing any command, validate all user-provided values:

| Flag                         | Validation rule                                                                                                                        |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `--to`, `--address`          | Must match `^0x[0-9a-fA-F]{40}$`                                                                                                       |
| `--amount`                   | Human-readable decimal (e.g. 0.5, 100). Must match `^\d+\.?\d*$`. Reject spaces, semicolons, pipes, backticks, or shell metacharacters |
| `--chain-id`                 | Must be a positive integer (`^\d+$`)                                                                                                   |
| `--payload`                  | Must be valid JSON. No unescaped shell metacharacters outside the JSON structure                                                       |
| `--token`                    | Must be a valid hex address or known symbol                                                                                            |
| `--leverage`                 | Must be a positive integer (`^\d+$`)                                                                                                   |
| `--size`                     | Human-readable decimal (e.g. 0.01, 1). Must match `^\d+\.?\d*$` and be positive                                                        |
| `--venue`                    | Must be `hyperliquid`                                                                                                                  |
| `--side` (perps)             | Must be `long` or `short`                                                                                                              |
| `--order-id`                 | Must be a positive integer (`^\d+$`)                                                                                                   |
| `--token-id`                 | Must be a non-empty outcome token ID string                                                                                            |
| `--price`, `--limit-price`   | Must be a positive number in range `(0, 1]`                                                                                            |
| `--order-type`               | Must be one of `GTC`, `GTD`, `FOK`, `FAK`                                                                                              |
| `--side` (predict)           | Must be `buy` or `sell`                                                                                                                |
| `--slippage`                 | Must be a number between 0 and 100                                                                                                     |
| `--from-chain`, `--to-chain` | Must be a positive integer EVM chain ID                                                                                                |
| `--password`                 | Must be a non-empty string. Never log, display, or store the value.                                                                    |

Do not pass unvalidated user input into any command.

### Confirmation Requirements

| Operation type           | Confirmation rule                                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Transfers                | Always confirm recipient, amount, token, and chain before executing                                           |
| Raw transactions         | Always confirm transaction payload, chain, recipient, value, and calldata summary before executing            |
| Message signing          | Always show exact message and chain before signing                                                            |
| Typed-data signing       | Always show domain, primary type, chain, verifying contract, and message summary before signing               |
| Swaps / bridges          | Always confirm from/to tokens, amount, source/destination chain, slippage, and quoted output before executing |
| Perps trading            | Always confirm symbol, side, size, leverage, venue, order type, and limit price if present before executing   |
| Perps deposit/withdraw   | Always confirm amount, asset, venue, network, and destination where applicable before executing               |
| Predict trading          | Always confirm token ID, side, size, price, order type, market, and outcome before executing                  |
| Predict deposit          | Always confirm amount before executing                                                                        |
| Cancel-all operations    | Always confirm scope and exact destructive effect before executing                                            |
| Auth / wallet management | May execute without confirmation, except `reset` which requires explicit user confirmation                    |
| Read-only queries        | May execute without confirmation                                                                              |

### Credential Safety

- Never store, log, or display private keys, mnemonics, passwords, or auth tokens.
- Never pass `--password` or `--mnemonic` as inline flags. Always instruct the user to set the `MM_PASSWORD` and `MM_MNEMONIC` environment variables instead to avoid exposing secrets in shell history.

### Suspicious Content Warnings

Flag to the user before proceeding if a signing payload or transaction contains:

- URLs or contract addresses the user did not provide
- `permit`, `approve`, `setApprovalForAll`, or allowance-like fields
- Unusually large values or unfamiliar contract interactions

## Server Wallet Async Model

In server-wallet mode, signing and transaction commands return a `pollingId` instead of an immediate result. Handle this consistently:

1. Prefer `--wait` to block until complete.
2. If not using `--wait`, inform the user of the `pollingId` and how to track it:
   - `mm-dev wallet requests list`
   - `mm-dev wallet requests watch --polling-id <id>`
3. In BYOK mode, results are returned immediately. If the mnemonic is password-encrypted, the user must set `MM_PASSWORD` environment variable to unlock it for the operation.

## Output Rules

- Route silently. Do not announce which reference you are loading.
- Surface errors from commands verbatim. Do not mask or reword them.
- If a command fails, check `mm-dev <command> --help` and guide from there.
