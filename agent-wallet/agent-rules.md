---
description: Read first if you are an AI agent operating the mm CLI. Preflight checks, choices you must leave to the user, what to confirm before moving funds, credential safety, async jobs, 2FA pauses, and output rules.
keywords:
  [MetaMask, Agent Wallet, AI agent, rules, safety, confirmation, AWAITING_MFA, mm doctor, skills]
---

# Rules for AI agents

This page is for AI agents that run the `mm` CLI on a user's behalf.
Follow these rules whether or not you have the MetaMask Agent Wallet skill installed.

If you can load skills, install the skill and prefer it:

```bash
npx skills add MetaMask/agent-skills
```

The canonical rules live in the
[MetaMask Agent Wallet skill](https://github.com/MetaMask/agent-skills/blob/main/skills/metamask-agent-wallet/SKILL.md)
(`metamask-agent-wallet`).
This page mirrors them for agents that read the documentation instead.

## Before the first command

Run these checks once per session, in order.

1. **Check the CLI version.**

   ```bash
   mm --version
   npm view @metamask/agent-wallet version
   ```

   If the installed version is behind the latest release, tell the user once and continue.
   They can update with `npm install -g @metamask/agent-wallet@latest`.
   The CLI requires Node.js 22.18 or later.
   On older versions every command fails with `UNSUPPORTED_NODE`.

2. **Check readiness.**

   ```bash
   mm doctor
   ```

   Don't run any other command until `mm doctor` reports both `authenticated: true` and
   `initialized: true`.

   - `authenticated: false`: help the user sign in. See [Quickstart](quickstart.md).
   - `initialized: false`: help the user run `mm init`. See the next section.

   A server-wallet project counts as initialized only when both a wallet mode and a trading mode
   are set.

## Choices you must leave to the user

Never make these choices for the user.
Explain the options, ask, and pass the answer explicitly.

| Choice                                               | Why it matters                                                                              | How to pass it                           |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Sign-in method (Google, email, QR)                   | Each method loads a different wallet address. It also decides where 2FA approvals are sent. | `mm login browser` or `mm login qr`      |
| Wallet mode (server-wallet or bring your own wallet) | Decides who holds the keys.                                                                 | `mm init --wallet <server-wallet\|byok>` |
| Trading mode (Guard Mode or Beast Mode)              | Decides which guardrails apply and which transactions need 2FA approval.                    | `mm init --mode <guard\|beast>`          |

In a non-interactive session, `mm init` sets Guard Mode when you omit `--mode`.
Don't rely on that.
Ask the user and pass `--mode`.

Before `mm init` on a returning account, run `mm wallet list` and show the user their existing
wallets.
See [Switch modes and wallets](switch-modes-and-wallets.md).

## Confirm before you act

Show the user these details and get an explicit yes before running the command.

| Operation                           | Confirm                                                                                                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Transfers                           | Recipient, amount, token, and chain                                                                                                                        |
| Raw transactions                    | Payload, chain, recipient, value, and a calldata summary                                                                                                   |
| Message signing                     | The exact message and chain                                                                                                                                |
| Typed-data signing                  | Domain, primary type, chain, verifying contract, and a message summary                                                                                     |
| Swaps and bridges                   | From and to tokens, amount, source and destination chains, slippage, quoted output, `--to-address` if set, and `--refuel` if set                           |
| x402 payments                       | Asset, amount with correct decimals, network, `payTo`, and resource URL or MCP tool. Make one attempt per resource and never retry a payment automatically |
| Perpetuals trades                   | Symbol, side, size, leverage, venue, order type, and limit price if set                                                                                    |
| Perpetuals deposits and withdrawals | Amount, asset, venue, network, and destination                                                                                                             |
| Prediction market trades            | Token ID, side, size, price, order type, market, and outcome                                                                                               |
| Prediction market withdrawals       | Amount and recipient                                                                                                                                       |
| Prediction market redemptions       | The condition ID, or that `--all` redeems every winning position                                                                                           |
| Earn supply                         | Token, amount, chain, vault or protocol, and APY. For cross-chain supply, also the source chain and token                                                  |
| Earn withdraw                       | Token, amount or full balance, chain, and vault or protocol                                                                                                |
| Plugin install, update, or link     | Package name, version, command IDs, data access, and every requested capability. Never pass `--accept-permissions` for a manifest the user hasn't reviewed |
| Cancel-all and reset operations     | Scope and the exact destructive effect                                                                                                                     |
| Trading mode and wallet mode        | The user's explicit choice. See [Choices you must leave to the user](#choices-you-must-leave-to-the-user)                                                  |

Read-only queries, such as balances, prices, and `mm wallet list`, don't need confirmation.

## Validate input

Don't pass unvalidated user input into a command.

| Input                        | Rule                                                                                                  |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| `--to`, `--address`          | Matches `^0x[0-9a-fA-F]{40}$`                                                                         |
| `--amount`, `--size`         | A positive decimal, such as `0.5` or `100`. Reject spaces and shell control characters such as `;`, ` | `, and backticks |
| `--chain-id`                 | A positive integer                                                                                    |
| `--payload` for transactions | Valid JSON                                                                                            |
| `--slippage`                 | A number from 0 to 100                                                                                |
| `--wallet-timeout`           | An integer from 1 to 600                                                                              |

## Protect credentials

- Never store, log, or display private keys, seed phrases, passwords, or auth tokens.
- Never pass `--mnemonic` or `--password` inline.
  Ask the user to set the `MM_MNEMONIC` and `MM_PASSWORD` environment variables instead, so secrets
  stay out of shell history.

## Flag suspicious content

Warn the user before you continue if a signing payload or transaction contains any of the following:

- URLs or contract addresses the user didn't provide
- `permit`, `approve`, `setApprovalForAll`, or other allowance fields
- Unusually large values or unfamiliar contract calls

If you didn't build the calldata yourself, decode it first and confirm the intent with the user:

```bash
mm decode --payload <0x-calldata>
```

## Handle async jobs

Signing and transaction commands can return a `pollingId` in both server-wallet and bring your own
wallet mode.

- Pass `--wait` to block until the job finishes.
- Without `--wait`, give the user the `pollingId`.
  In server-wallet mode, track it with `mm wallet requests watch <polling-id>` or
  `mm wallet requests list`.
- When you show a pending request, show its `intent` summary so the user knows what they are
  approving.

## Handle 2FA pauses

When command output contains `AWAITING_MFA`, or a mode or policy change returns
`pending_approval`, the request is waiting for the user.

1. Don't report it as failed, stuck, or complete.
2. Tell the user exactly where to approve, based on their sign-in method.
   See [Approve requests](approve-requests.md#where-the-approval-appears).
3. Show the request ID.
4. Don't run the same command again while the request is pending.
5. After the user responds, check the result with `mm wallet requests watch <polling-id>`.

## Report output accurately

- Show CLI errors to the user verbatim.
  Don't reword or hide them.
  See [Error codes](reference/error-codes.md).
- If a command fails, run `mm <command> --help` and continue from there.
- After you change the trading mode, wallet, or sign-in method, report the active wallet address and
  trading mode.

## Related pages

- [Switch modes and wallets](switch-modes-and-wallets.md)
- [Approve requests](approve-requests.md)
- [Trading modes](reference/trading-modes.md)
- [Commands reference](reference/commands.md)
- [Troubleshooting](troubleshooting.md)
