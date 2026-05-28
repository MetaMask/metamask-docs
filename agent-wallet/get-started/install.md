---
description: Install the MetaMask Agent Wallet CLI (`mm`) and verify your environment.
keywords: [MetaMask, Agent Wallet, mm, CLI, install]
---

# Install the CLI

Install the MetaMask Agent Wallet command-line interface and confirm it runs on your machine.

## Prerequisites

- **Node.js** 22.x or later
- **npm** 10.x or later
- Access to the [Early Access Program](https://metamask.io/agent-wallet)

## Install globally

```bash npm2yarn
npm install -g @metamask/agentic-cli
```

## Verify the installation

```bash
mm --help
```

You should see the top-level command groups (`auth`, `init`, `wallet`, `transfer`, `swap`, and others).

## Next steps

- [Quickstart](quickstart.md) — sign in, initialize a server-wallet, and send a transfer
- [Choose your wallet mode](choose-wallet-mode.md) — compare server-wallet and BYOK
