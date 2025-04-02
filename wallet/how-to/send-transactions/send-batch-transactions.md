---
description: Send atomic batch transactions using wallet_sendCalls.
---

# Send atomic batch transactions

You can send and manage atomic batch transactions in MetaMask, using the methods specified by
[EIP-5792](https://eips.ethereum.org/EIPS/eip-5792):

- `wallet_getCapabilities` - Query whether support for atomic batch transactions is available.
- `wallet_sendCalls` - Submit multiple transactions to be processed atomically as one by the wallet.
- `wallet_getCallsStatus` - Track the status of your transaction batch.

The key benefits of atomic batch transactions include:

- **Fewer clicks and less friction** - Users only need to review and approve a single wallet confirmation, instead of multiple confirmations.
- **Faster completion times** - Only a single atomic batch transaction must be confirmed onchain, instead of multiple individual transactions.

## Steps

### 1. Query whether the wallet supports atomic batch

:::warning Important
If atomic batch is not supported, fall back to [`eth_sendTransaction`](index.md) instead of `wallet_sendCalls`,
and [`eth_getTransactionReceipt`](/wallet/reference/json-rpc-methods/eth_gettransactionreceipt)
instead of `wallet_getCallsStatus`.
:::

### 2. Submit a batch of transactions

### 3. Track the status of the batch of transactions