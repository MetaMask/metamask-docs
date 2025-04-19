---
description: Send atomic batch transactions using `wallet_sendCalls`.
---

# Send batch transactions

You can send and manage batch transactions in MetaMask, using the methods specified by
[EIP-5792](https://eips.ethereum.org/EIPS/eip-5792):

- `wallet_getCapabilities` - Query whether support for atomic batch transactions is available.
- `wallet_sendCalls` - Submit multiple transactions to be processed atomically by MetaMask.
- `wallet_getCallsStatus` - Track the status of your transaction batch.

## About atomic batch transactions

When a dapp requests to submit a batch of transactions atomically, MetaMask may prompt users to upgrade their externally owned account (EOA) to a [MetaMask delegator account](https://docs.gator.metamask.io/concepts/delegator-accounts).
If the user accepts, MetaMask proceeds to upgrade the account and process the request as a single atomic transaction as specified by [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702).

:::note Delegator accounts
MetaMask delegator accounts are [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) smart contract accounts (SCAs) that support programmable account behavior and advanced features such as multi-signature approvals, transaction batching, and custom security policies.

See the [MetaMask Delegation Toolkit documentation](https://docs.gator.metamask.io/) for more information about delegator accounts and their capabilities.
:::

The key benefits of atomic batch transactions include:

- **Fewer clicks and less friction** - Users only need to review and approve a single wallet confirmation, instead of multiple confirmations.
  For example, users can confirm a spending cap and swap in one step instead of two.
- **Faster completion times** - Only a single atomic transaction is confirmed onchain, instead of multiple individual transactions.
- **Reduced gas fees** - When multiple transactions are executed atomically, users only need to pay a single gas fee.

You can send batch transactions using [third-party libraries](#use-third-party-libraries)
or [directly in your dapp](#send-batch-transactions-1).

## Use third-party libraries

You can send batch transactions using the following third-party libraries that support EIP-5792:

- [Wagmi](https://wagmi.sh/react/api/hooks/useCapabilities)
- [Viem](https://viem.sh/experimental/eip5792/client)
- [thirdweb](https://portal.thirdweb.com/references/typescript/v5/hooks#eip5792)

## Send batch transactions

### 1. Query whether atomic batch is supported

Use `wallet_getCapabilities` to query whether MetaMask supports atomic batch transactions for a specific address and specific chain IDs.
For example:

```js title="index.js"
const result = await provider // Or window.ethereum if you don't support EIP-6963.
  .request({
    "method": "wallet_getCapabilities",
    "params": [
      "0xd46e8dd67c5d32be8058bb8eb970870f07244567", // The user's wallet address.
      ["0x2105", "0x14A34"] // (Optional) A list of chain IDs to query for.
    ],
  });
```

This method returns whether the `atomic` capability is supported for each chain ID:

```json
{
  "0x2105": {
    "atomic": {
      "status": "supported"
    }
  },
  "0x14A34": {
    "atomic": {
      "status": "unsupported"
    }
  }
}
```

The `atomic` capability can have a `status` of `supported`, `ready`, or `unsupported`:

- `supported` means MetaMask supports atomic batch transactions for the account and chain ID.
- `ready` means MetaMask will prompt the user to upgrade their account to a MetaMask delegator account.
  If the user approves, the `status` will upgrade to `supported`.
- `unsupported` means MetaMask does not support atomic batch transactions for the account and chain ID, and will not
  suggest an upgrade to the user.

:::note
- If the user has already upgraded their account to a third-party smart contract account, MetaMask does not currently support atomic batch transactions for that account.
- If atomic batch is not supported, fall back to [`eth_sendTransaction`](index.md) instead of `wallet_sendCalls`,
and [`eth_getTransactionReceipt`](/wallet/reference/json-rpc-methods/eth_gettransactionreceipt)
instead of `wallet_getCallsStatus`.
:::

### 2. Submit a batch of transactions

Use `wallet_sendCalls` to submit a batch of transactions.
Set `atomicRequired` to `true` to require MetaMask to execute the calls atomically.

For example:

```js title="index.js"
const result = await provider.
  request({
    "method": "wallet_sendCalls", // Or window.ethereum if you don't support EIP-6963.
    "params": [
      {
        version: "1.0",
        from: "0xd46e8dd67c5d32be8058bb8eb970870f07244567", // The sender's address.
        chainId: "0x2105", // The chain ID, which must match the currently selected network.
        atomicRequired: true, // Whether or not atomicity is required.
        calls: [ // The list of calls to send as a batch.
          {
            to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
            value: "0x9184e72a",
            data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
          },
          {
            to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
            value: "0x182183",
            data: "0xfbadbaf01"
          }
        ]
      }
    ],
  });
```

This method returns a batch ID that you can use to track the status of the batch:

```json
{
  "id": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### 3. Track the status of the batch of transactions

Use `wallet_getCallsStatus` to track the status of the submitted batch of transactions,
using the batch ID returned by `wallet_sendCalls`.
For example:

```js title="index.js"
const result = await provider // Or window.ethereum if you don't support EIP-6963.
  .request({
    "method": "wallet_getCallsStatus",
    "params": [
      "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331" // Batch ID.
    ],
  });
```

This method returns status information about the batch of transactions, including:

- The status code of the batch.
- Whether the batch was executed atomically.
- A list of transaction receipts.

```json
{
  "version": "1.0",
  "chainId": "0x2105",
  "id": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331",
  "status": 200, // Status code. 200 means confirmed.
  "atomic": true, // Whether the calls were executed atomically.
  "receipts": [ // List of transaction receipts.
    {
      "logs": [
        {
          "address": "0xa922b54716264130634d6ff183747a8ead91a40b",
          "topics": [
            "0x5a2a90727cc9d000dd060b1132a5c977c9702bb3a52afe360c9c22f0e9451a68"
          ],
          "data": "0xabcd"
        }
      ],
      "status": "0x1",
      "blockHash": "0xf19bbafd9fd0124ec110b848e8de4ab4f62bf60c189524e54213285e7f540d4a",
      "blockNumber": "0xabcd",
      "gasUsed": "0xdef",
      "transactionHash": "0x9b7bb827c2e5e3c1a0a44dc53e573aa0b3af3bd1f9f5ed03071b100bb039eaff"
    }
  ]
}
```

:::note
If the calls were executed atomically in a single transaction, a single receipt is returned.

In some cases, calls can be executed atomically but in multiple transactions (for example, using
`eth_bundle` on an L2 network resistant to reorgs).
In these cases, `atomic` is `true` but multiple receipts are returned.
:::
