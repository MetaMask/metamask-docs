---
description: How the mm CLI, server-wallet, and BYOK modes work together.
keywords: [MetaMask, Agent Wallet, architecture, server-wallet, polling]
---

# Architecture

MetaMask Agent Wallet exposes wallet operations through the `mm` CLI, backed by the
`@metamask/agentic-sdk` package.

## CLI and session

- Install `@metamask/agentic-cli` to get the `mm` binary.
- Session data is stored at `~/.metamask/session.json` with restricted file permissions.
- Wallet metadata is stored at `~/.metamask/wallets.json`. Predict state is stored at
  `~/.metamask/predict.json`.
- Run `mm reset` to clear local session state.

## Wallet modes

Choose a wallet mode during `mm init`.
The CLI prompts interactively when you omit `--wallet`.

### Server-wallet

Your private key is held securely in a TEE-backed environment.
MetaMask manages key material; you retain self-custody and can export your secret recovery phrase
when supported by your account.

Signing and transaction operations use an asynchronous model.
Long-running operations return a `pollingId` unless you pass `--wait`.

### BYOK (bring your own key)

You supply a BIP-39 mnemonic.
Useful when you need local key control or an existing seed phrase.
Operation results return immediately.

Never pass `--mnemonic` on the command line.
Set the `MM_MNEMONIC` environment variable instead.
Optionally encrypt the mnemonic at rest with `MM_PASSWORD` or `mm wallet password set`.

## Trading modes

Trading modes apply to server-wallet only.
During `mm init`, you set daily spend limits and protocol allowlists, then choose how strictly the
CLI enforces them.
Choose during `mm init` with `--mode` or at the interactive prompt.

| Mode                     | CLI flag       | Behavior                                                                                                                                                                           |
| ------------------------ | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Guard Mode (Recommended) | `--mode guard` | Enforces spend limits and allowlists. 2-factor authentication is required when a transaction exceeds those limits, targets a non-allowlisted protocol, or is flagged as high risk. |
| Beast Mode               | `--mode beast` | Skips routine policy checks for scripted workflows. 2-factor authentication still applies to malicious or flagged transactions.                                                    |

Switch modes by re-running `mm init` with a different `--mode` value.
Confirm the active configuration with `mm init show`.

## Server-wallet async model

When you submit a signing or transaction request in server-wallet mode:

1. The CLI submits the request to the wallet service.
2. The service may simulate the transaction, run Transaction Shield, and evaluate policies.
3. If policy requires 2-factor authentication or Transaction Shield flags the transaction, the job
   enters an `AWAITING_MFA` state until you approve via MetaMask Mobile or email.
4. The CLI returns a `pollingId` unless you pass `--wait`.

Track pending work:

```bash
mm wallet requests list
mm wallet requests watch --polling-id <POLLING_ID>
```

## REPL vs headless

- **REPL** — Run `mm` with no arguments on a TTY for an interactive shell.
- **Headless** — Pass flags explicitly or use `--format json` for machine-readable output in scripts
  and agents.

## Next steps

- [Security](security.md)
- [Quickstart](../quickstart.md)
