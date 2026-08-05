---
description: Complete MetaMask Agent Wallet setup with the mm CLI — step-by-step for terminal use, CI, and agents without skills.
keywords: [MetaMask, Agent Wallet, mm, CLI, setup, headless]
---

# CLI setup

Complete Agent Wallet setup with the `mm` CLI command by command.

Use this page if you are running setup in a terminal, automating in CI, or if your agent does not
have MetaMask skills installed and needs a full setup reference.
For the fastest path with skills, see [Quickstart](quickstart.md).

## Prerequisites

- **Node.js** 22.x or later
- Access to the [Early Access Program](https://metamask.io/agent-wallet)

## 1. Install the CLI

```bash npm2yarn
npm install -g @metamask/agentic-cli@latest
```

Run `mm doctor` after install to confirm the CLI version and skill compatibility.

:::note Node.js requirement
The CLI requires **Node.js 22.18** or later.
:::

## 2. Complete setup

Step through sign-in and wallet initialization:

```bash
mm doctor
mm login
mm init
mm doctor
```

Or run `mm` with no arguments for the interactive REPL.

### Verify readiness

Run `mm doctor` before your first wallet operation.
Do not send transactions until the output shows `authenticated: true` and `initialized: true`.

If either flag is false, follow the hints in the output (sign in, run `mm init`, or reinstall
skills), then run `mm doctor` again.

## 3. Sign in

Run `mm login` and choose a method, or pass it explicitly:

```bash
mm login browser   # Google or email in the browser
mm login qr        # Scan with MetaMask Mobile
```

:::caution Three sign-in methods, three wallet addresses

**Google**, **email passwordless**, and **MetaMask Mobile QR** each load a different server-wallet
address.
Using the same email for all three does not link them to one wallet.
After every sign-in, run `mm wallet address` and confirm the expected address before you fund it.

See [Troubleshooting](troubleshooting.md) for sign-in errors and wallet recovery.

:::

### Browser (Google or email)

1. Your browser opens the Agent Wallet dashboard.
2. Sign in with **Continue with Google** or **Continue with email**.
3. Click **Authorize**.
4. Copy the CLI token from the browser and paste it into the waiting terminal.

| Step     | Google                                            | Email passwordless                                      |
| -------- | ------------------------------------------------- | ------------------------------------------------------- |
| Sign in  | **Continue with Google**                          | Enter email, then the verification code from your inbox |
| Link CLI | Copy the CLI token and paste it into the terminal | Same                                                    |

### MetaMask Mobile QR

1. The terminal displays a QR code.
2. Open **MetaMask Mobile** and scan the code.
3. Approve the connection in the app.

The CLI waits for the scan and approval. QR sign-in does not support `--no-wait`.

Confirm sign-in succeeded:

```bash
mm auth status
mm wallet list
mm wallet address
```

Your sign-in method determines how you receive 2FA approvals when a transaction needs your
confirmation:

| Sign-in method            | 2FA delivery                        |
| ------------------------- | ----------------------------------- |
| Browser (Google or email) | Email link with transaction details |
| MetaMask Mobile QR        | MetaMask Mobile push notification   |

## 4. Initialize wallet

If `mm doctor` reports `initialized: false`, run `mm init` and choose a wallet mode and, for
server-wallet, a trading mode.

In server-wallet mode, a successful sign-in may sync existing remote wallets.
Run `mm wallet list` before `mm init` if you are returning to an existing account.

### Wallet mode (choose one)

- **Server wallet**: keys are managed and secured server-side in a TEE, so agents can't access your
  main wallet. Signing uses an asynchronous model; long-running operations return a `pollingId` unless
  you pass `--wait`.

  ```bash
  mm init --wallet server-wallet --mode guard
  ```

- **Bring your own wallet**: you supply a BIP-39 mnemonic. Keys stay under your local control and
  operations return immediately.

  ```bash
  export MM_MNEMONIC="word1 word2 ..."
  mm init --wallet byok
  ```

  Optionally encrypt the mnemonic at rest with `mm wallet password set`.

### Trading mode (server wallet only)

| Mode                     | CLI flag       | Summary                                                                                           |
| ------------------------ | -------------- | ------------------------------------------------------------------------------------------------- |
| Guard Mode (Recommended) | `--mode guard` | Designed for everyday traders. Transactions outside your policy limits require 2FA approval.      |
| Beast Mode               | `--mode beast` | Designed for power users. Malicious transactions are still blocked and surfaced for 2FA approval. |

Guard Mode enforces threat scanning, network and recipient allowlists, address allowlists, and a
rolling 24-hour outflow limit.
Beast Mode keeps only the threat scanning guardrail.

See [Trading modes](reference/trading-modes.md) for guardrails and approval conditions.

Switch modes after setup:

```bash
mm wallet trading-mode set guard
mm wallet trading-mode set beast
```

Confirm your choices:

```bash
mm init show
mm wallet trading-mode get
mm wallet policy get
```

## 5. Fund and verify

Get your Agent Wallet address:

```bash
mm wallet address
mm wallet add-fund
```

Transfer funds to this address on the chain you plan to use (from another wallet or exchange).

Verify the deposit:

```bash
mm wallet balance --chain <chain-id>
```

Confirm your balance before you send transactions from this wallet.

## 6. Send your first transfer

```bash
mm transfer --to <ADDRESS> --amount 0.001 --token native --chain-id 8453 --wait
```

## Headless and CI environments

```bash
mm login browser --no-wait
mm login --token "<cliToken:cliRefreshToken>"
```

Bare `mm login --no-wait` fails without a TTY because no sign-in method is selected.
Use `mm login browser --no-wait` to print a dashboard sign-in URL.
After you authorize in the browser, paste the CLI token into a separate
`mm login --token` invocation.

## Machine-readable output

Pass `--format json` or `--json` for scripts and automation:

```bash
mm wallet balance --chain 8453 --json
mm auth status --json
mm doctor --json
```

## Next steps

- [Commands reference](reference/commands.md)
- [Quickstart](quickstart.md) — set up through your agent with skills
- [Troubleshooting](troubleshooting.md)
