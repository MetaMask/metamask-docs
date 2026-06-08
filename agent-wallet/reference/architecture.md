---
description: How the mm CLI, wallet modes, security stack, and server-wallet async model work together.
keywords:
  [
    MetaMask,
    Agent Wallet,
    architecture,
    security,
    server-wallet,
    polling,
    Transaction Protection,
    Transaction Shield,
    Smart Transactions,
    2FA,
  ]
---

# Architecture

MetaMask Agent Wallet exposes wallet operations through the `mm` CLI, backed by the
`@metamask/agentic-sdk` package.
Security is applied by default on every signing and transaction path, backed by Transaction
Protection.

Transactions through Agent Wallet deemed safe are guaranteed against loss up to $10,000.\*
See [Transaction Shield](https://support.metamask.io/manage-crypto/transactions/transaction-shield/)
for eligibility, coverage limits, and terms.

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

Keys are managed and secured server-side in a trusted execution environment (TEE), so agents can't access your main wallet. You retain self-custody.

Signing and transaction operations use an asynchronous model.
Long-running operations return a `pollingId` unless you pass `--wait`.

### Bring your own wallet

You supply a BIP-39 mnemonic.
Useful when you need local key control or an existing seed phrase.
Operation results return immediately.

Never pass `--mnemonic` on the command line.
Set the `MM_MNEMONIC` environment variable instead.
Optionally encrypt the mnemonic at rest with `MM_PASSWORD` or `mm wallet password set`.

## Transaction simulation

Before a transaction executes, the CLI simulates it to surface reverts, unexpected state changes,
and other failures early.

## Transaction Shield

[Transaction Shield](https://support.metamask.io/manage-crypto/transactions/transaction-shield/)
runs automated security checks on each transaction, including malicious contracts and scams.
When a transaction is flagged, it requires your approval before it executes.
You receive details in the CLI output and through the approval flow.

## Smart Transactions

[Smart Transactions](https://support.metamask.io/manage-crypto/transactions/smart-transactions/)
optimize how your trades land onchain with fewer fails, better gas, and built-in MEV protection
where supported on the target chain.

## Trading modes

Trading modes apply to server-wallet only.
During `mm init`, you set outflow limits and allowlists, then choose a trading mode that defines how
those policies are enforced.
Choose during `mm init` with `--mode` or at the interactive prompt.

| Mode                     | CLI flag       | Summary                                                                                                               |
| ------------------------ | -------------- | --------------------------------------------------------------------------------------------------------------------- |
| Guard Mode (Recommended) | `--mode guard` | Designed for everyday traders. Transactions outside your policy limits require 2-factor authentication approval.      |
| Beast Mode               | `--mode beast` | Designed for power users. Malicious transactions are still blocked and surfaced for 2-factor authentication approval. |

### Guard Mode (Recommended)

Designed for everyday traders.
Transactions outside your policy limits require 2-factor authentication approval.

**Guardrails**

- Security check
- Network allowlist
- Token recipient allowlist
- Address allowlist
- Outflow limit (rolling 24h)

**Approval required for**

- Malicious transactions
- Addresses or contracts not in allowlist
- Networks not in allowlist
- Recipients not in allowlist
- Raising outflow limit

### Beast Mode

Designed for power users.
Malicious transactions are still blocked and surfaced for 2-factor authentication approval.

**Guardrails**

- Security check

**Approval required for**

- Malicious transactions
- Risky contracts

When 2-factor authentication is required, the CLI pauses the job until you approve or reject it.
Your sign-in method during `mm login` determines which channel the CLI uses:

| Sign-in method  | Approval channel                    |
| --------------- | ----------------------------------- |
| QR code         | MetaMask Mobile push notification   |
| Google or email | Email link with transaction details |

The agent cannot proceed without your approval on flagged or policy-violating transactions.

Switch modes by re-running `mm init` with a different `--mode` value.
Confirm the active configuration with `mm init show`.
See [Trading modes](../use-the-cli-directly.md#trading-modes-server-wallet-only).

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

- **REPL**: Run `mm` with no arguments on a TTY for an interactive shell.
- **Headless**: Pass flags explicitly or use `--format json` for machine-readable output in scripts
  and agents.

## Next steps

- [Quickstart](../quickstart.md)
- [CLI commands](commands.md)
