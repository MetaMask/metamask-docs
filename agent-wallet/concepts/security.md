---
description: Mandatory security on every MetaMask Agent Wallet transaction — simulation, Transaction Shield, Servo, Cubist TEE, and 2FA.
keywords: [MetaMask, Agent Wallet, security, Transaction Shield, Blockaid, Servo, Cubist]
---

# Security

MetaMask Agent Wallet applies mandatory security on every transaction. Agents cannot opt out of the
security pipeline.

## Transaction simulation

Before a transaction executes, the CLI simulates it to surface reverts, unexpected state changes,
and other failures early.

## Transaction Shield (powered by Blockaid)

Transaction Shield scans transactions for known threats. Malicious transactions are blocked before
they execute. When a transaction is flagged, you receive details in the CLI output and through the
approval flow.

## Servo MEV protection

Servo helps protect transactions from sandwich attacks and related MEV extraction where supported
on the target chain.

## Cubist TEE-backed key custody

In server-wallet mode, private keys are held inside a Cubist trusted execution environment (TEE).
Keys are not exposed to the agent process. You retain self-custody and can export your secret
recovery phrase when supported by your account configuration.

## Two-factor approval (2FA)

When a transaction violates your policy or is flagged as high risk, the CLI pauses the job until you
approve or reject it. Approval is delivered through:

- MetaMask Mobile push notification, or
- Email link with transaction details

The agent cannot proceed without your approval.

## Guard Mode and Beast Mode

| Mode                 | Policy enforcement                         | 2FA                                                 |
| -------------------- | ------------------------------------------ | --------------------------------------------------- |
| Guard Mode (default) | Daily spend limits and protocol allowlists | On policy violations                                |
| Beast Mode (opt-in)  | Reduced policy interruptions               | Still required on malicious or flagged transactions |

Configure modes at initialization:

```bash
mm init --wallet server-wallet --mode guard
mm init --wallet server-wallet --mode beast
```

## Next steps

- [Choose your wallet mode](../get-started/choose-wallet-mode.md)
- [Architecture](architecture.md)
