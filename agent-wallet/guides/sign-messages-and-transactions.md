---
description: Sign messages, typed data, and submit raw EVM transactions with mm wallet commands.
keywords: [MetaMask, Agent Wallet, sign, EIP-712, transaction, mm]
---

# Sign messages and transactions

Sign plaintext messages, EIP-712 typed data, or submit raw EVM transactions.

## Ask your agent

```text
You (to your agent): "Sign this message on Ethereum: Hello, world"
```

```text
You (to your agent): "Sign this EIP-712 typed data on Base: <paste JSON payload>"
```

Your agent shows the exact payload and asks you to confirm before signing.

## Prerequisites

- [Quickstart](../quickstart.md) completed
- Understanding of what you are signing. Review payloads before confirming.

## Sign a plaintext message

```bash
mm wallet sign-message --message "<TEXT>" --chain-id <CHAIN_ID> [--wait]
```

## Sign EIP-712 typed data

```bash
mm wallet sign-typed-data --chain-id <CHAIN_ID> --payload '<JSON>' [--wait]
```

The payload must be valid JSON with `domain`, `types`, `primaryType`, and `message` fields.

## Send a raw transaction

If the calldata is unfamiliar, decode it first:

```bash
mm decode --payload <0x-calldata>
```

Then submit the transaction:

```bash
mm wallet send-transaction --chain-id <CHAIN_ID> --payload '<JSON>' [--wait]
```

The payload must include at least a `to` address. See the commands reference for the full schema.
If `mm decode` returns `Call unknown function`, treat the transaction as higher risk and confirm
the payload before signing.

## Server-wallet polling

In server-wallet mode, signing commands may return a `pollingId` when `--wait` is omitted. Track
pending requests:

```bash
mm wallet requests list
mm wallet requests watch --polling-id <POLLING_ID>
```

In bring your own wallet mode, results return immediately when the mnemonic is unlocked.

## Related commands

See [`mm wallet`](../reference/commands.md#mm-wallet) and [`mm decode`](../reference/commands.md#mm-decode)
in the commands reference.
