---
description: Use when an mm command pauses for 2FA approval or prints AWAITING_MFA. Where the approval request appears for each sign-in method, how to track it, and how to recover.
keywords:
  [
    MetaMask,
    Agent Wallet,
    approve,
    approval,
    2FA,
    AWAITING_MFA,
    pending_approval,
    MetaMask Mobile,
    notifications,
    email,
  ]
---

# Approve requests

Some Agent Wallet requests pause until you approve or reject them with 2-factor authentication (2FA).
The CLI waits, and your agent can't continue until you respond.

A request needs your approval when it is one of the following:

- A transaction that is flagged as malicious or risky, or that falls outside your Guard Mode policy.
  See [Trading modes](reference/trading-modes.md) for the full list.
- A trading mode change from Guard Mode to Beast Mode.
  See [Switch modes and wallets](switch-modes-and-wallets.md).
- A wallet policy change that loosens your limits, such as raising your outflow limit.
  See [Outflow policy](reference/outflow-policy.md).

## Where the approval appears

Your sign-in method decides where the approval request is sent.
If you don't remember how you signed in, read the message the CLI prints when the request pauses.
The message is different for each sign-in method.

| Sign-in method            | Where to approve                                                                                  | What the CLI prints                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| MetaMask Mobile QR        | MetaMask Mobile. Open the **notifications menu** in the app. A push notification may also appear. | `Approval required: please approve this <request> in MetaMask Mobile.`                    |
| Google or email (browser) | The email address registered to your Agent Wallet dashboard. Open the link in the email.          | `Approval required: check the email registered to your dashboard and confirm to proceed.` |

The CLI also prints `Request ID: <polling-id>`.
Use that ID to [track the request](#track-a-pending-request).

## If you can't find the approval

### MetaMask Mobile

1. Open MetaMask Mobile and go to the **notifications menu**.
   The request is listed there even if no push notification arrived.
2. To get push notifications for future requests, turn on notifications in MetaMask Mobile under
   **Settings > Notifications**.
   Also check your phone's system settings.
   If you declined the notification permission during MetaMask onboarding, turn it on in the
   iOS or Android settings for MetaMask.

### Email

1. Check your spam and promotions folders.
2. Look for the approval email, not the sign-in verification code.
   The verification code is only used to sign in to the browser dashboard.
3. Approve before the request expires.
   If it expires, run the original command again and approve the new request.

## Recognize a pending approval

This section is for agents and scripts that read `mm` output.

When a request is waiting for approval, the CLI prints the literal token `AWAITING_MFA`.
From CLI v6.1.5, every output mode prints it:

| Output mode              | What to look for                                                                                                              |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `--json` or piped output | An NDJSON line containing `"_notice":{"kind":"AWAITING_MFA",...}`, with `pollingId`, `expiresAt`, `authMethod`, and `message` |
| Terminal (TTY) or REPL   | A line containing `[AWAITING_MFA]`, followed by the approval message                                                          |

`mm wallet trading-mode set` and `mm wallet policy set` also return `status: pending_approval` with a
`requestId` when you pass `--no-wait`, or when the wait ends before you respond.
They return `status: confirmed` after the change is applied.

`AWAITING_MFA` and `pending_approval` mean the request is waiting for you.
They don't mean the command failed, stopped responding, or completed.

## Track a pending request

List pending requests:

```bash
mm wallet requests list
```

Wait for one request to finish:

```bash
mm wallet requests watch <polling-id>
```

`--wallet-timeout <seconds>` sets how long to wait, up to `600`.

Don't run the original command again while its request is still pending.
That creates a second request.

To confirm a trading mode change was applied, run `mm wallet trading-mode get`.

## If the approval is rejected or expires

| Error code                           | Meaning                                               | What to do                                                           |
| ------------------------------------ | ----------------------------------------------------- | -------------------------------------------------------------------- |
| `TX_DENIED`                          | You rejected the transaction                          | Run the command again only if you want to retry                      |
| `TX_EXPIRED`                         | The transaction approval expired                      | Run the command again and approve before it expires                  |
| `TRADING_MODE_APPROVAL_REJECTED`     | You rejected the trading mode change                  | Run `mm wallet trading-mode set` again to retry                      |
| `TRADING_MODE_APPROVAL_EXPIRED`      | The trading mode approval expired                     | Run `mm wallet trading-mode set` again and approve before it expires |
| `WALLET_POLICY_APPROVAL_REJECTED`    | You rejected the policy change                        | Run `mm wallet policy set` again to retry                            |
| `WALLET_POLICY_APPROVAL_EXPIRED`     | The policy approval expired                           | Run `mm wallet policy set` again and approve before it expires       |
| `WALLET_MODE_APPROVAL_IN_PROGRESS`   | A trading mode change is already waiting for approval | Approve or reject the pending request, or wait for it to expire      |
| `WALLET_POLICY_APPROVAL_IN_PROGRESS` | A policy change is already waiting for approval       | Approve or reject the pending request, or wait for it to expire      |
| `JOB_TIMEOUT`                        | The CLI stopped waiting before you responded          | Run `mm wallet requests list`. The request may still be pending      |

See [Error codes](reference/error-codes.md) for all codes.

## Guidance for AI agents that hit a 2FA pause

- Treat `AWAITING_MFA` and `pending_approval` as waiting for the user.
  Don't report them as a failure, and don't retry the command.
- Tell the user exactly where to approve, based on their sign-in method in the
  [table above](#where-the-approval-appears).
  Don't say "MetaMask will probably ask you."
- Show the user the `message` from the notice and the request ID.
- After the user approves, confirm the result with `mm wallet requests watch <polling-id>`, or
  with `mm wallet trading-mode get` for a trading mode change.

See [Rules for AI agents](agent-rules.md) for the rest of the rules.
