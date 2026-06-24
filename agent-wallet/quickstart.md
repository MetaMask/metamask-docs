---
description: Install the mm CLI, add agent skills, and complete one-time setup through the interactive CLI or your AI agent.
keywords: [MetaMask, Agent Wallet, quickstart, mm, skills, server-wallet]
---

# Quickstart

Install the `mm` CLI and agent skills, then complete one-time setup through the interactive CLI or
by prompting your agent.
After setup, use natural language for day-to-day wallet operations.

## Prerequisites

- **Node.js** 22.x or later
- **npm** 10.x or later
- Access to the [Early Access Program](https://metamask.io/agent-wallet)
- An AI agent that supports skills (Claude Code, Codex, Cursor, OpenClaw, Hermes Agent, or similar)

## 1. Install the CLI

```bash npm2yarn
npm install -g @metamask/agentic-cli@3
```

Run `mm doctor` after install to confirm the CLI version and skill compatibility.

## 2. Add skills to your agent

Skills teach your agent how to route natural-language requests to `mm` commands and follow safety
patterns (confirm before transfers, quote before swaps, and similar rules).

```bash
npx skills add MetaMask/agent-skills
```

When prompted, install `metamask-agent-wallet` for full command routing.
Add `metamask-agent-workflows` if you want multi-step workflow templates for swaps, bridges,
perpetuals, prediction markets, and Aave V3 lending.

Reinstall skills if you previously installed an older version (for example, v2.x).
The current skills target CLI v3.0.0.

## 3. Complete setup

Use the interactive CLI or ask your agent to walk you through onboarding.

**Interactive CLI**: run `mm` with no arguments for the REPL, or step through setup:

```bash
mm doctor
mm login
mm init
mm doctor
```

**Through your agent**: prompt in natural language:

```text
Set up MetaMask Agent Wallet: sign me in, help me pick a wallet mode and trading mode, and show my address.
```

Your agent asks which sign-in method, wallet mode, and trading mode you want before running
commands.

### Verify readiness

Run `mm doctor` before your first wallet operation.
Do not send transactions until the output shows `authenticated: true` and `initialized: true`.

If either flag is false, follow the hints in the output (sign in, run `mm init`, or reinstall
skills), then run `mm doctor` again.

### Sign in

During `mm login`, choose **Dashboard (browser)** or **QR code (MetaMask Mobile)**.

- **Browser** (`mm login browser`): sign in through the MetaMask dashboard with Google or email.
  Use this method in production.
- **QR code** (`mm login qr`): scan the QR code with MetaMask Mobile.
  QR sign-in is not available in production; the CLI returns `COMING_SOON` and you should use browser
  sign-in instead.

Your sign-in method also determines how you receive 2-factor authentication approvals when a
transaction needs your confirmation.

| Sign-in method            | 2FA delivery                        |
| ------------------------- | ----------------------------------- |
| Browser (Google or email) | Email link with transaction details |
| QR code (MetaMask Mobile) | MetaMask Mobile push notification   |

:::note QR code sign-in

When you sign in with MetaMask Mobile, the CLI and your agent can access only the dedicated Agent
Wallet created for this setup, not your main MetaMask wallet or its accounts.
When a transaction needs approval, you receive a 2-factor authentication prompt in MetaMask Mobile.

:::

After a successful sign-in in server-wallet mode, the CLI syncs existing remote wallets from the
server.
Run `mm wallet list` to see synced wallets.
You may not need to run `mm init` if you already have a remote wallet.

### Initialize wallet

If `mm doctor` reports `initialized: false`, run `mm init` and choose a wallet mode and, for
server-wallet, a trading mode.

#### Wallet mode (choose one)

- **Server wallet**: keys are managed and secured server-side in a TEE, so agents can't access your
  main wallet. Signing uses an asynchronous model; long-running operations return a `pollingId` unless
  you pass `--wait`.
- **Bring your own wallet**: you supply a BIP-39 mnemonic. Keys stay under your local control and
  operations return immediately.

#### Trading mode (server wallet only):

- **Guard Mode (Recommended)**: designed for everyday traders. Enforces threat scanning, network
  and recipient allowlists, address allowlists, and a rolling 24-hour outflow limit. Transactions
  outside your policy limits require 2-factor authentication before they execute.
- **Beast Mode**: designed for power users. Keeps the threat scanning guardrail only. Malicious
  transactions and risky contracts are blocked and surfaced for 2-factor authentication approval.

See [Trading modes](reference/trading-modes.md) for guardrails and approval conditions.

Confirm your choices with `mm init show`.
View wallet policy YAML with `mm wallet policy get`.

For headless or CI environments, see [Use the CLI directly](use-the-cli-directly.md).

## 4. Transfer funds and verify

Fund the address shown by your agent, by `mm wallet address`, or with `mm wallet add-fund` to display
a QR code and address.

Verify with a natural-language prompt:

```text
What's my wallet address and balance?
```

Your agent runs `mm doctor` and queries balances before you send transactions.

## Next steps

- [Send tokens](guides/send-tokens.md)
- [Architecture](reference/architecture.md)
