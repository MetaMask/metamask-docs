---
description: Run mm CLI commands directly without an AI agent for testing, scripting, or CI.
keywords: [MetaMask, Agent Wallet, mm, CLI, headless]
---

# Use the CLI directly

Run `mm` commands yourself when you are testing, scripting, or operating in CI without an AI agent.
For day-to-day use, prefer [Quickstart](quickstart.md) and prompt your agent in natural language.

## Prerequisites

- [Quickstart](quickstart.md) completed (CLI installed and signed in)
- An Early Access invite from [metamask.io/agent-wallet](https://metamask.io/agent-wallet)

## 1. Install the CLI

```bash npm2yarn
npm install -g @metamask/agentic-cli
```

## 2. Sign in

```bash
mm login
mm auth status
```

During `mm login`, choose QR code, Google, or email.
Your sign-in method also determines how you receive 2FA approvals when a transaction needs your
confirmation:

| Sign-in method  | 2FA delivery                        |
| --------------- | ----------------------------------- |
| QR code         | MetaMask Mobile push notification   |
| Google or email | Email link with transaction details |

For headless or CI environments:

```bash
mm login google --no-wait
mm login --token "<cliToken:cliRefreshToken>"
```

## 3. Initialize wallet

Run `mm init` and follow the prompts to choose wallet mode and trading mode, or pass flags
explicitly.

### Wallet modes

#### Server-wallet

Your private key is held securely in a TEE-backed environment.
MetaMask manages key material; you retain self-custody and can export your secret recovery phrase
when supported by your account.

```bash
mm init --wallet server-wallet --mode guard
```

Server-wallet mode uses an asynchronous signing model.
Long-running operations return a `pollingId` unless you pass `--wait`.

#### BYOK (bring your own key)

You supply a BIP-39 mnemonic.
Useful when you need local key control or an existing seed phrase.

Never pass `--mnemonic` on the command line.
Set the `MM_MNEMONIC` environment variable instead:

```bash
export MM_MNEMONIC="word1 word2 ..."
mm init --wallet byok
```

Optionally encrypt the mnemonic at rest with `MM_PASSWORD` or `mm wallet password set`.

### Trading modes (server-wallet only)

| Mode       | CLI flag       | Behavior                                                                                                                                                       |
| ---------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Guard Mode | `--mode guard` | Enforces spend limits and allowlists. 2FA is required when a transaction exceeds those limits, targets a non-allowlisted protocol, or is flagged as high risk. |
| Beast Mode | `--mode beast` | Skips routine policy checks for scripted workflows. 2FA still applies to malicious or flagged transactions.                                                    |

Switch modes by re-running `mm init` with a different `--mode` value.

### View current settings

```bash
mm init show
```

## 4. Show your address

```bash
mm wallet address
```

Fund this address on the chain you plan to use.

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
