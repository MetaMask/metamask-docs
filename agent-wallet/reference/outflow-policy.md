---
description: How Agent Wallet enforces rolling 24-hour outflow limits on server-wallet transactions.
keywords: [MetaMask, Agent Wallet, outflow policy, outflow limit, server-wallet, Guard Mode, 2FA]
---

# Outflow policy

Your outflow limit caps the total value that can leave the server-wallet in a rolling 24-hour window.
MetaMask tracks outflows automatically and requests 2-factor authentication approval when a transaction
would exceed the limit.

Outflow limits apply in **Guard Mode (Recommended)** when using server-wallet.
See [Trading modes](trading-modes.md) for how Guard Mode enforces this policy alongside other
guardrails.

## Setting your outflow limit

You're prompted to set your outflow limit on your first transaction, or whenever a transaction would
exceed your current limit.
When you set your 24-hour outflow limit, it counts the transaction you're approving now plus all
transactions in the rolling window.

## How outflow is calculated

Before signing, MetaMask simulates the transaction value and adds that value to your 24-hour total once
the transaction is confirmed (submitted successfully).

For example, if you swap 10 USDC to ETH and later swap the ETH to DAI, this counts as a \$10 outflow for
USDC to ETH and another \$10 for ETH to DAI.

You'll receive a 2-factor authentication request when the transaction exceeds your 24-hour outflow
limit.

## What's included

Our transaction simulation engine analyzes token outflow from your account and estimates the volume in USD. This includes token transfers, swaps, and deposits (e.g., to Uniswap, Polymarket, or Hyperliquid).

## Limitations

Outflow tracking can be imprecise if transactions are not submitted through our backend.

When an outflow can't be tracked reliably, such as when a transaction can't be simulated, fall back on
your allowlists.

Signatures (for example, Permit2) are not included in the outflow calculation as of now.

## Related

- [Trading modes](trading-modes.md)
- [Architecture](architecture.md)
