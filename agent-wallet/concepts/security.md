---
description: Mandatory security on every MetaMask Agent Wallet transaction, including simulation, Transaction Shield, Smart Transactions, and TEE key custody.
keywords: [MetaMask, Agent Wallet, security, Transaction Shield, Smart Transactions, 2FA]
---

# Security

MetaMask Agent Wallet applies built-in security on every signing and transaction path.

## Transaction simulation

Before a transaction executes, the CLI simulates it to surface reverts, unexpected state changes,
and other failures early.

## Transaction Shield

Transaction Shield scans transactions for known threats, including malicious contracts and scams.
When a transaction is flagged, it requires your approval before it executes. You receive details in
the CLI output and through the approval flow.

## Smart Transactions

Smart Transactions helps protect transactions from sandwich attacks and related MEV extraction where
supported on the target chain.

## Server wallet

In server-wallet mode, your private key is held securely in a trusted execution environment (TEE).
Keys are not exposed to the agent process. You retain self-custody and can export your secret
recovery phrase when supported by your account configuration.

## Guard Mode and Beast Mode

Trading modes apply to server-wallet only.
During `mm init`, you set daily spend limits and protocol allowlists that define what your agent can
do without your approval.

| Mode                     | Policy enforcement                   | When 2FA is required                                                                                   |
| ------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Guard Mode (Recommended) | Enforces spend limits and allowlists | When a transaction exceeds your limits, targets a non-allowlisted protocol, or is flagged as high risk |
| Beast Mode               | Skips routine policy checks          | When a transaction is flagged as malicious or high risk                                                |

When 2-factor authentication is required, the CLI pauses the job until you approve or reject it.
Your sign-in method during `mm login` determines which channel the CLI uses:

| Sign-in method  | Approval channel                    |
| --------------- | ----------------------------------- |
| QR code         | MetaMask Mobile push notification   |
| Google or email | Email link with transaction details |

The agent cannot proceed without your approval on flagged or policy-violating transactions.

Configure modes during `mm init`.
See [Trading modes](../use-the-cli-directly.md#trading-modes-server-wallet-only).

## Next steps

- [Architecture](architecture.md)
- [Quickstart](../quickstart.md)
