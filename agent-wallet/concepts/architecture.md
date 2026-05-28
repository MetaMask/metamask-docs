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
- Run `mm reset` to clear local session state.

## Wallet modes

| Mode          | Keys                                          | Signing model                         |
| ------------- | --------------------------------------------- | ------------------------------------- |
| server-wallet | Cubist TEE-backed custody                     | Async jobs with optional MFA approval |
| BYOK          | User-supplied mnemonic (optionally encrypted) | Local signing; immediate results      |

See [Choose your wallet mode](../get-started/choose-wallet-mode.md).

## Server-wallet async model

When you submit a signing or transaction request in server-wallet mode:

1. The CLI submits the request to the wallet service.
2. The service may simulate the transaction, run Transaction Shield, and evaluate policies.
3. If policy requires human approval, the job enters an `AWAITING_MFA` state until you approve via
   MetaMask Mobile or email.
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
- [Skills for agents](skills-for-agents.md)
