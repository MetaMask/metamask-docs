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
    threat scanning,
    Smart Transactions,
    2FA,
  ]
---

# Architecture

MetaMask Agent Wallet exposes wallet operations through the `mm` CLI, backed by the
`@metamask/agentic-sdk` package.
Security is applied by default on every signing and transaction path, backed by Transaction
Protection.

Transactions through Agent Wallet deemed safe are guaranteed against loss up to $10,000/month.\*
See [Transaction Shield](https://support.metamask.io/manage-crypto/transactions/transaction-shield/)
for eligibility, coverage limits, and terms.

## CLI and session

- Install `@metamask/agentic-cli` to get the `mm` binary.
- Run `mm doctor` to verify CLI version, skill compatibility, authentication, and initialization
  before wallet operations.
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

## Threat scanning

<!-- vale off -->

Threat scanning is powered by Blockaid and production-tested across millions of MetaMask
transactions.
Malicious transactions get auto-bounced.
When a transaction is flagged, it requires your approval before it executes.
You receive details in the CLI output and through the approval flow.

<!-- vale on -->

## Transaction Protection

Eligible transactions deemed safe are backed by Transaction Protection coverage up to
$10,000/month.
[Transaction Shield](https://support.metamask.io/manage-crypto/transactions/transaction-shield/) is
MetaMask's subscription that pairs Transaction Protection with priority support.
See [Transaction Shield](https://support.metamask.io/manage-crypto/transactions/transaction-shield/)
for subscription details, eligibility, coverage limits, and terms.

## Smart Transactions

[Smart Transactions](https://support.metamask.io/manage-crypto/transactions/smart-transactions/)
optimize how your trades land onchain with fewer fails, better gas, and built-in MEV protection
where supported on the target chain.

## Trading modes

Trading modes apply to server-wallet only.
During `mm init`, you choose Guard Mode or Beast Mode to define how policies are enforced.
Guardrail tables, 2FA approval conditions, mode switching, and outflow limits moved to dedicated
reference pages.
See [Trading modes](trading-modes.md) for the full guardrail and approval comparison and
[Outflow policy](outflow-policy.md) for rolling 24-hour limit details.

## Server-wallet async model

When you submit a signing or transaction request in server-wallet mode:

1. The CLI submits the request to the wallet service.
2. The service may simulate the transaction, run threat scanning, and evaluate policies.
3. If policy requires 2-factor authentication or threat scanning flags the transaction, the job
   enters an `AWAITING_MFA` state until you approve via MetaMask Mobile (QR sign-in) or email
   (browser sign-in).
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
