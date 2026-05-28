---
description: Get a MetaMask Agent Wallet running in five steps with the mm CLI.
keywords: [MetaMask, Agent Wallet, quickstart, mm, server-wallet]
---

# Quickstart

Agents reading this page should follow the steps in order, then load agent skills for richer
command routing.

This quickstart uses a **server-wallet** with **Guard Mode** — the recommended default.

## Prerequisites

- [Install the CLI](install.md)
- An Early Access invite from [metamask.io/agent-wallet](https://metamask.io/agent-wallet)

## 1. Install the CLI

```bash npm2yarn
npm install -g @metamask/agentic-cli
```

## 2. Sign in

```bash
mm login
```

Choose QR code, Google, or email sign-in. Confirm your session:

```bash
mm auth status
```

For non-interactive environments, use `mm login google --no-wait` or `mm login email --no-wait`,
then complete sign-in with `mm login --token "<cliToken:cliRefreshToken>"`.

## 3. Initialize a server-wallet

```bash
mm init --wallet server-wallet --mode guard
```

This creates a Cubist TEE-backed server-wallet and enables Guard Mode policies. See
[Choose your wallet mode](choose-wallet-mode.md) for BYOK and Beast Mode.

View current settings:

```bash
mm init show
```

## 4. Show your address

```bash
mm wallet address
```

Fund this address on the chain you plan to use before sending transactions.

## 5. Send your first transfer

```bash
mm transfer --to <ADDRESS> --amount 0.001 --token native --chain-id 8453
```

Each transaction is simulated, scanned by Transaction Shield, and routed through Servo MEV
protection before it executes.

:::note Server-wallet polling
In server-wallet mode, signing commands may return a `pollingId` instead of an immediate result.
Use `--wait` to block until complete, or track the request with
`mm wallet requests watch --polling-id <id>`. See [Architecture](../concepts/architecture.md).
:::

## Next steps

- [Send tokens](../guides/send-tokens.md)
- [Trade perpetuals](../guides/trade-perpetuals.md)
- [Commands reference](../reference/commands.md)
