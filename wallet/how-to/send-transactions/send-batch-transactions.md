---
description: Send atomic batch transactions using wallet_sendCalls.
---

# Send atomic batch transactions

[EIP-5792](https://eips.ethereum.org/EIPS/eip-5792) introduces three new methods that enables you to send and manage batch transactions in MetaMask:

- `wallet_sendCalls` - Allows you to submit multiple transactions to be processed as one by the wallet.
- `wallet_getCallsStatus` - Allows you to track the status of your batch transactions.
- `wallet_getCapabilities` - Allows you to query whether support for atomic batch transactions is available.

The key user benefits of atomic batch transactions include:

- Fewer clicks and friction due to users needing to review and approve a single wallet confirmation instead of multiple.
- Faster completion times due to only requiring a single atomic batch transaction to be confirmed on-chain instead of multiple individual transactions.

## Steps

### 1. Query whether the wallet supports atomic batch



### 2. Submit a batch of transactions

### 3. Track the status of the batch of transactions
