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
npm install -g @metamask/agentic-cli
```

## 2. Add skills to your agent

Skills teach your agent how to route natural-language requests to `mm` commands and follow safety
patterns (confirm before transfers, quote before swaps, and similar rules).

```bash
npx skills add metaMask/agent-skills
```

When prompted, install `metamask-agent-wallet` for full command routing.
Add `metamask-agent-workflows` if you want multistep workflow templates.

## 3. Complete setup

Use the interactive CLI or ask your agent to walk you through onboarding.

**Interactive CLI** — run `mm` with no arguments for the REPL, or step through setup:

```bash
mm login
mm init
mm auth status
```

**Through your agent** — prompt in natural language:

```text
Set up MetaMask Agent Wallet: sign me in, help me pick a wallet mode and trading mode, and show my address.
```

Your agent asks which sign-in method, wallet mode, and trading mode you want before running
commands.

### Sign in

During `mm login`, choose QR code, Google, or email.
Your sign-in method also determines how you receive 2FA approvals when a transaction needs your
confirmation:

| Sign-in method  | 2FA delivery                        |
| --------------- | ----------------------------------- |
| QR code         | MetaMask Mobile push notification   |
| Google or email | Email link with transaction details |

### Initialize wallet

During `mm init`, choose a wallet mode and trading mode.
The CLI prompts for each when you omit flags.
See [Use the CLI directly](use-the-cli-directly.md#3-initialize-wallet) for what each wallet and
trading mode means.

Confirm your choices with `mm init show`.

For headless or CI environments, see [Use the CLI directly](use-the-cli-directly.md).

## 4. Fund and verify

Fund the address shown by your agent or by `mm wallet address`.

Verify with a natural-language prompt:

```text
What's my wallet address and balance on Base?
```

Your agent checks auth and queries balances before you send transactions.

## Next steps

- [Send tokens](guides/send-tokens.md)
- [Architecture](concepts/architecture.md)
