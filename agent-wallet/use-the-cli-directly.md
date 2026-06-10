---
description: Run mm CLI commands directly without an AI agent for testing, scripting, or CI.
keywords: [MetaMask, Agent Wallet, mm, CLI, headless]
---

# Use the CLI directly

Run `mm` commands yourself when you are testing, scripting, or operating in CI without an AI agent.
For day-to-day use, prefer [Quickstart](quickstart.md) and prompt your agent in natural language.

## Prerequisites

- [Quickstart](quickstart.md) completed (CLI installed and signed in)
- An Early Access invite from [MetaMask Agent Wallet Early Access](https://metamask.io/agent-wallet)

## 1. Install the CLI

```bash npm2yarn
npm install -g @metamask/agentic-cli
```

## 2. Sign in

```bash
mm login
mm auth status
```

During `mm login`, choose Google or email.
QR code sign-in with MetaMask Mobile is coming soon.
Your sign-in method also determines how you receive 2FA approvals when a transaction needs your
confirmation:

| Sign-in method        | 2FA delivery                        |
| --------------------- | ----------------------------------- |
| Google or email       | Email link with transaction details |
| QR code (coming soon) | MetaMask Mobile push notification   |

For headless or CI environments:

```bash
mm login google --no-wait
mm login --token "<cliToken:cliRefreshToken>"
```

## 3. Initialize wallet

Run `mm init` and follow the prompts to choose wallet mode and trading mode, or pass flags
explicitly.

### Wallet modes

#### Server wallet

Keys are managed and secured server-side in a trusted execution environment (TEE), so agents can't
access your main wallet.
You retain self-custody.

```bash
mm init --wallet server-wallet --mode guard
```

#### Bring your own wallet

You supply a BIP-39 mnemonic.
Useful when you need local key control or an existing seed phrase.

```bash
export MM_MNEMONIC="word1 word2 ..."
mm init --wallet byok
```

Optionally encrypt the mnemonic at rest with `mm wallet password set`.

### Trading modes (server wallet only)

| Mode                     | CLI flag       | Summary                                                                                           |
| ------------------------ | -------------- | ------------------------------------------------------------------------------------------------- |
| Guard Mode (Recommended) | `--mode guard` | Designed for everyday traders. Transactions outside your policy limits require 2FA approval.      |
| Beast Mode               | `--mode beast` | Designed for power users. Malicious transactions are still blocked and surfaced for 2FA approval. |

Guard Mode enforces threat scanning, network and recipient allowlists, address allowlists, and a
rolling 24-hour outflow limit.
2FA is required for malicious transactions, allowlist violations, and raising your outflow limit.

Beast Mode keeps only the threat scanning guardrail.
2FA is required for malicious transactions and risky contracts.

See [Trading modes](reference/trading-modes.md) for the full guardrail and approval lists.

Switch modes by re-running `mm init` with a different `--mode` value.

### View current settings

```bash
mm init show
```

## 4. Transfer funds and verify

Get your Agent Wallet address:

```bash
mm wallet address
```

Transfer funds to this address on the chain you plan to use (from another wallet or exchange).

Verify the deposit:

```bash
mm wallet balance --chain <chain-id>
```

Confirm your balance before you send transactions from this wallet.

## 5. Send your first transfer

```bash
mm transfer --to <ADDRESS> --amount 0.001 --token native --chain-id 8453 --wait
```

## Machine-readable output

Pass `--format json` or `--json` for scripts and automation:

```bash
mm wallet balance --chain 8453 --json
mm auth status --json
```

## Next steps

- [Commands reference](reference/commands.md)
- [Troubleshooting](troubleshooting.md)
