---
description: Guard Mode and Beast Mode trading policies for server-wallet, including guardrails and 2FA approval.
keywords:
  [
    MetaMask,
    Agent Wallet,
    trading modes,
    Guard Mode,
    Beast Mode,
    server-wallet,
    2FA,
    allowlist,
    outflow limit,
  ]
---

# Trading modes

Trading modes apply to server-wallet only.
During `mm init`, you are prompted to choose a trading mode.

## Guard Mode vs Beast Mode

Guard Mode enforces all of your policies and asks for approval on anything outside them.

Beast Mode is for power users who want fewer interruptions.
It still blocks and surfaces dangerous transactions.

:::info

We recommend **Guard Mode** for most users.

:::

## Comparison

### Guardrails

Policies enforced automatically before a transaction can proceed.

| Guardrail                       | Guard Mode | Beast Mode |
| ------------------------------- | ---------- | ---------- |
| Threat scanning                 | ✓          | ✓          |
| Network allowlist               | ✓          | —          |
| Address allowlist               | ✓          | —          |
| Token recipient allowlist       | ✓          | —          |
| Rolling 24-hour outflow limit\* | ✓          | —          |

In Guard Mode, untrusted contracts, networks, and recipients are caught by your allowlists.
In Beast Mode there are no allowlists.

### Requires 2FA approval

Transactions that pause the job until you approve or reject them.

| Condition                        | Guard Mode | Beast Mode |
| -------------------------------- | ---------- | ---------- |
| Malicious transactions           | ✓          | ✓          |
| Risky contracts                  | ✓          | ✓          |
| Anything outside your allowlists | ✓          | —          |
| Raising your outflow limit       | ✓          | —          |

In Beast Mode, only malicious and risky transactions trigger approval.

:::note

See [Outflow policy](outflow-policy.md) for how outflows are tracked.

:::

## Set your trading mode

Set the mode with the `--mode` flag during `mm init`, or pick it at the interactive prompt:

```bash
mm init --mode guard   # or --mode beast
```

## How 2FA approval works

When a transaction needs approval, the CLI pauses the job until you approve or reject it.
The agent cannot proceed on a flagged or policy-violating transaction without your response.

Your sign-in method during `mm login` determines where the approval request is sent:

| Sign-in method            | Approval channel                  |
| ------------------------- | --------------------------------- |
| QR code (MetaMask Mobile) | MetaMask Mobile push notification |
| Browser (Google or email) | Email link                        |

## Switch modes

Change the active trading mode without re-running `mm init`:

```bash
mm wallet trading-mode set guard
mm wallet trading-mode set beast
```

Switching to Beast Mode prompts for confirmation.
View the current mode with:

```bash
mm wallet trading-mode get
```

## Wallet policy

Guard Mode allowlists and outflow limits are stored as policy YAML on the server wallet.
View, update, or inspect the template with:

```bash
mm wallet policy get
mm wallet policy set --policy "<yaml>"
mm wallet policy template
```

## Outflow policy

Guard Mode enforces a rolling 24-hour outflow limit on server-wallet outgoing transfers.
You're prompted to set the limit on your first transaction, or when a transaction would exceed your
current limit.
If a transaction would exceed the limit, or you request a higher limit, the CLI requires
2-factor authentication approval before the transaction proceeds.

See [Outflow policy](outflow-policy.md) for how outflows are calculated, what counts toward the
limit, and known limitations.
