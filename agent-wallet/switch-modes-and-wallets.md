---
description: Use when the user asks to switch between Guard Mode and Beast Mode, change the active wallet, change sign-in method or wallet mode, or asks why their wallet address changed.
keywords:
  [
    MetaMask,
    Agent Wallet,
    switch,
    trading mode,
    Guard Mode,
    Beast Mode,
    wallet select,
    sign-in method,
    wallet address,
    mm init,
  ]
---

# Switch modes and wallets

You can switch four things after setup.
Two of them change which wallet address your agent uses.

| What you switch                               | Command                                     | Changes your wallet address?           | Needs 2FA approval?                                         |
| --------------------------------------------- | ------------------------------------------- | -------------------------------------- | ----------------------------------------------------------- |
| [Trading mode](#switch-trading-mode)          | `mm wallet trading-mode set <guard\|beast>` | No                                     | Guard Mode to Beast Mode: yes. Beast Mode to Guard Mode: no |
| [Active wallet](#switch-the-active-wallet)    | `mm wallet select <address>`                | Yes, to another wallet you already own | No                                                          |
| [Sign-in method](#change-your-sign-in-method) | `mm logout`, then `mm login`                | **Yes, always**                        | No                                                          |
| [Wallet mode](#change-wallet-mode)            | `mm init --wallet <server-wallet\|byok>`    | Yes                                    | No                                                          |

## Switch trading mode

Each wallet has its own trading mode.
Switching changes the mode of the active wallet only.

Check the current mode:

```bash
mm wallet trading-mode get
```

Switch to Beast Mode or Guard Mode:

```bash
mm wallet trading-mode set beast
mm wallet trading-mode set guard
```

- **Guard Mode to Beast Mode** loosens your guardrails, so it needs your 2FA approval.
  The command waits until you approve or reject.
  See [Approve requests](approve-requests.md) for where the approval appears.
- **Beast Mode to Guard Mode** tightens your guardrails, so it applies immediately.

The 2FA approval is the only confirmation. The terminal shows no separate prompt.

The command returns `status: confirmed` when the change is applied.
With `--no-wait`, or if the wait ends before you respond, it returns `status: pending_approval` and
a `requestId`.
Run `mm wallet trading-mode get` to check whether the change was applied.

| Error code                         | Meaning                                               |
| ---------------------------------- | ----------------------------------------------------- |
| `ALREADY_SET_TRADING_MODE`         | The wallet is already in that mode                    |
| `INVALID_TRADING_MODE`             | The mode is not `guard` or `beast`                    |
| `WALLET_MODE_APPROVAL_IN_PROGRESS` | A trading mode change is already waiting for approval |
| `TRADING_MODE_APPROVAL_REJECTED`   | You rejected the change                               |
| `TRADING_MODE_APPROVAL_EXPIRED`    | The approval expired before you responded             |

:::caution

In CLI v7.2.0, the usage line in `mm wallet trading-mode set --help` and the hint after `mm init`
show `mm mode set`.
That command doesn't exist.
Use `mm wallet trading-mode set`.

:::

See [Trading modes](reference/trading-modes.md) to compare the guardrails in each mode.

## Switch the active wallet

One account can hold more than one wallet.
Commands always use the active wallet.

List your wallets, then select one by address:

```bash
mm wallet list
mm wallet select 0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18
mm wallet address
```

Always pass the address.
Without an address, `mm wallet select` opens an interactive picker, which needs a terminal (TTY).
In a non-interactive session, it returns `MISSING_WALLET_REF`.

| Error code            | Meaning                                                     |
| --------------------- | ----------------------------------------------------------- |
| `MISSING_WALLET_REF`  | No address was passed in a non-interactive session          |
| `INVALID_EVM_ADDRESS` | The address is malformed                                    |
| `WALLET_NOT_FOUND`    | The address isn't one of your wallets. Run `mm wallet list` |
| `WRONG_NAMESPACE`     | The wallet belongs to a different chain namespace           |

To add another wallet to the same account, run `mm wallet create`.
Pass `--name` to label it and `--trading-mode <guard|beast>` to set its trading mode.

## Change your sign-in method

**Google**, **email passwordless**, and **MetaMask Mobile QR** are three separate sign-in methods.
Each one signs you in to a separate account with its own wallets.
Switching methods always loads a different wallet address, even when you use the same email for
more than one method.

Funds stay onchain at the original address.
They don't appear in the CLI until you sign in with the method you used to fund that wallet.

If your wallet address changed after you signed in again:

1. Sign out:

   ```bash
   mm logout
   ```

2. Sign in with the method you used when you funded the wallet.
3. Confirm the address:

   ```bash
   mm wallet list
   mm wallet address
   ```

Steps inside one sign-in method, such as entering the email verification code or pasting the CLI
token, don't change your wallet.

## What `mm init` does after you sign in

`mm init` behaves differently depending on whether the account already has a wallet.
This is why signing in with a new method can create a new wallet.

| Account state                                  | What `mm init` does                                                                                                                                                                |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Has server wallets                             | Syncs the existing wallets and loads each wallet's trading mode from the server. `--mode` is ignored. In a non-interactive session with several wallets, it selects the first one. |
| Has no server wallet                           | Creates a new wallet and asks for a trading mode.                                                                                                                                  |
| No trading mode given, non-interactive session | Sets Guard Mode. Pass `--mode` to choose explicitly.                                                                                                                               |

Before you run `mm init` on an account you have used before, run `mm wallet list` to see which
wallets it already has.

For bring your own wallet, `mm init` registers your wallet with the server and loads its existing
trading mode.
If the wallet has no trading mode yet, it asks for one.
The CLI labels policy-based 2FA for bring your own wallet as coming soon.

## Change wallet mode

Re-run `mm init` with the other wallet mode:

```bash
mm init --wallet server-wallet --mode guard
```

```bash
export MM_MNEMONIC="word1 word2 ..."
mm init --wallet byok --mode guard
```

Server wallets and bring your own wallet have different addresses.
Your server wallets stay on your account.
When you switch back to server-wallet, `mm init` syncs them again.

## Guidance for AI agents that switch modes or wallets

- Never choose a sign-in method, wallet mode, or trading mode for the user.
  Ask, explain the difference, then pass the user's choice explicitly with `--wallet` and `--mode`.
- Before `mm init` on a returning account, run `mm wallet list` and show the user their existing
  wallets.
- Before switching sign-in method, warn the user that their wallet address will change.
- After any switch, report the active wallet address and trading mode back to the user.
- When a switch needs approval, tell the user exactly where to approve.
  See [Approve requests](approve-requests.md#where-the-approval-appears).

See [Rules for AI agents](agent-rules.md) for the rest of the rules.
