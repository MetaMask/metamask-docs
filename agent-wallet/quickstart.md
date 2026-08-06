---
description: Install the mm CLI, add agent skills, and complete setup by prompting your agent in natural language.
keywords: [MetaMask, Agent Wallet, quickstart, mm, skills]
---

# Quickstart

Follow these steps in order.
Each step tells you what you are doing, why it matters, and what to do next.

## Before you start

- **Node.js** 22.x or later
- An AI agent that supports skills (Claude Code, Codex, Cursor, OpenClaw, Hermes Agent, or similar)

## Step 1: Install the CLI

The `mm` CLI is how your agent signs in, checks balances, and sends transactions.

```bash npm2yarn
npm install -g @metamask/agent-wallet@latest
```

## Step 2: Add skills to your agent

Skills teach your agent which `mm` commands to run and when to ask for your confirmation before
moving funds.

```bash
npx skills add MetaMask/agent-skills
```

When prompted, install `metamask-agent-wallet`.
See the [agent-skills changelog](https://github.com/MetaMask/agent-skills/blob/main/CHANGELOG.md)
for the latest skill version and the CLI version it targets.

## Step 3: Start setup with your agent

Open your agent and paste:

```text
Set up MetaMask Agent Wallet: help me pick a sign-in method, wallet mode, and trading mode, then show my address.
```

Your agent asks which sign-in method you want, then runs the setup commands.
The next steps walk through what happens on your screen.

## Step 4: Sign in

Pick one sign-in method and keep using it.
**Google**, **email passwordless**, and **MetaMask Mobile QR** are three separate methods.
Each one loads a **different wallet address**, even if you use the same email across them.

| Method                 | How you sign in                                   |
| ---------------------- | ------------------------------------------------- |
| **Google**             | **Continue with Google** in the browser dashboard |
| **Email passwordless** | **Continue with email** in the browser dashboard  |
| **MetaMask Mobile QR** | Scan a QR code with MetaMask Mobile               |

Using the same email for Google, email sign-in, and MetaMask Mobile does not give you the same
wallet. Every method has its own address.

### Google or email (browser)

Your agent opens the Agent Wallet dashboard in your browser.

1. Sign in with **Continue with Google** or **Continue with email** (pick one and keep using it).
2. Click **Authorize**.
3. Copy the CLI token from the browser and paste it into your terminal if prompted.

If you choose **email**, check your inbox for a verification code and enter it in the browser
before you click **Authorize**. That code is only for sign-in.

### MetaMask Mobile QR

Your agent shows a QR code in the terminal.

1. Open **MetaMask Mobile** on your phone.
2. Scan the QR code.
3. Approve the connection in the app.

You do not use a browser for this path.
Your terminal stays connected while you scan and approve.

## Step 5: Choose how your agent holds funds

Your agent asks you to pick a **wallet mode**:

| Mode                      | Best for                                                                                                         |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Server wallet**         | Most users. Keys stay secured server-side so your agent gets a dedicated wallet without access to your main one. |
| **Bring your own wallet** | You already have a seed phrase and want keys to stay on your machine.                                            |

## Step 6: Choose your safety settings

If you chose **server wallet**, your agent asks you to pick a **trading mode**:

| Mode                         | Best for                                                                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------- |
| **Guard Mode (Recommended)** | Everyday use. Allowlists, outflow limits, and your approval when a transaction falls outside your policy. |
| **Beast Mode**               | Power users who want fewer limits. Malicious transactions still need your approval.                       |

See [Trading modes](reference/trading-modes.md) if you want the full comparison before you choose.

## Step 7: Fund your wallet

Your agent shows your wallet address when setup finishes.
Confirm it, then send funds from another wallet or exchange.

Ask your agent anytime:

```text
Show my wallet address and balance.
```

## Step 8: Approve flagged transactions

After setup, your agent can send transactions on your behalf within the limits you chose.
When a transaction needs your OK:

- **Google or email sign-in** — you get an email link. Open it and approve or reject.
- **MetaMask Mobile QR** — you get a push notification in MetaMask Mobile. Open the app and check
  the notifications menu if you do not see a push.

## Next steps

- [Send tokens](guides/send-tokens.md)
- [Troubleshooting](troubleshooting.md)
- [CLI setup](cli-setup.md) — command-by-command setup for the terminal or agents without skills
