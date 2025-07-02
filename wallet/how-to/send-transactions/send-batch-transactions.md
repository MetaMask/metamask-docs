---
description: Send atomic batch transactions using `wallet_sendCalls`.
---

# Send batch transactions

You can send and manage batch transactions in MetaMask, using the methods specified by
[EIP-5792](https://eips.ethereum.org/EIPS/eip-5792):

- [`wallet_getCapabilities`](/wallet/reference/json-rpc-methods/wallet_getcapabilities) - Query whether support for atomic batch transactions is available.
- [`wallet_sendCalls`](/wallet/reference/json-rpc-methods/wallet_sendcalls) - Submit multiple transactions to be processed atomically by MetaMask.
- [`wallet_getCallsStatus`](/wallet/reference/json-rpc-methods/wallet_getcallsstatus) - Track the status of your transaction batch.

## About atomic batch transactions

An atomic batch transaction is a group of transactions that are executed together as a single unit.
When a dapp requests to submit a batch of transactions atomically, MetaMask may prompt users to upgrade their externally owned account (EOA) to a [MetaMask Smart Account](/delegation-toolkit/concepts/smart-accounts).
If the user accepts, MetaMask proceeds to upgrade the account and process the request as a single atomic transaction as specified by [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702).

:::note Smart Accounts
MetaMask Smart Accounts are [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) smart contract accounts that support programmable account behavior and advanced features such as multi-signature approvals, transaction batching, and custom security policies.

See the [Delegation Toolkit documentation](/delegation-toolkit) for more information about Smart Accounts and their capabilities.
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
- [Viem](https://viem.sh/docs/actions/wallet/getCapabilities)
- [thirdweb](https://portal.thirdweb.com/references/typescript/v5/hooks#eip5792)

## Send batch transactions

### 1. Query whether atomic batch is supported

Use [`wallet_getCapabilities`](/wallet/reference/json-rpc-methods/wallet_getcapabilities) to query 
whether MetaMask supports atomic batch transactions for a specific address and specific chain IDs.
For example:

```js title="index.js"
const capabilities = await provider // Or window.ethereum if you don't support EIP-6963.
  .request({
    "method": "wallet_getCapabilities",
    "params": [
      "0xd46e8dd67c5d32be8058bb8eb970870f07244567", // The user's wallet address.
      ["0x1", "0xaa36a7"] // (Optional) A list of chain IDs to query for.
    ],
  });
```

This method returns the status of the `atomic` capability for each chain ID.
For example:

```json
{
  "0x1": {
    "atomic": {
      "status": "ready"
    }
  },
  "0xaa36a7": {
    "atomic": {
      "status": "supported"
    }
  }
}
```

The `atomic` capability can have a `status` of `supported` or `ready`:

- `supported` means MetaMask supports atomic batch transactions for the account and chain ID.
- `ready` means MetaMask will prompt the user to upgrade their account to a MetaMask Smart Account.
  If the user approves, the `status` will upgrade to `supported`.

If the `atomic` capability is not `supported` or `ready` for a specified chain ID, MetaMask will not return anything for that chain ID.
If you don't specify any chain IDs in `wallet_getCapabilities`, MetaMask will return all chains in the wallet where the `atomic` capability is `supported` or `ready`.

<details>
<summary>Supported networks</summary>
<div>
MetaMask currently supports atomic batch transactions on the following networks:

- Ethereum Mainnet and Sepolia
- Gnosis Mainnet and Chiado
- BNB Smart Chain Mainnet and Testnet
- OP Mainnet
- Base Mainnet and Sepolia

MetaMask will support this feature on more networks as they adopt EIP-7702.
</div>
</details>

:::note Atomic batch unsupported
- If the user has already upgraded their account to a third-party smart contract account, MetaMask does not currently support atomic batch transactions for that account.
- If atomic batch is not supported, fall back to [`eth_sendTransaction`](index.md) instead of 
  [`wallet_sendCalls`](/wallet/reference/json-rpc-methods/wallet_sendcalls),
  and [`eth_getTransactionReceipt`](/wallet/reference/json-rpc-methods/eth_gettransactionreceipt)
  instead of [`wallet_getCallsStatus`](/wallet/reference/json-rpc-methods/wallet_getcallsstatus).
:::

### 2. Submit a batch of transactions

Use [`wallet_sendCalls`](/wallet/reference/json-rpc-methods/wallet_sendcalls) to submit a batch of transactions.
For example:

```js title="index.js"
const result = await provider. // Or window.ethereum if you don't support EIP-6963.
  request({
    "method": "wallet_sendCalls",
    "params": [
      {
        version: "2.0.0", // The version of the API format. This must be 2.0.0.
        from: "0xd46e8dd67c5d32be8058bb8eb970870f07244567", // The sender's address.
        chainId: "0xaa36a7", // The chain ID, which must match the currently selected network.
        atomicRequired: true, // Whether or not atomicity is required.
        calls: [ // The list of calls to send as a batch.
          {
            to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
            value: "0x0"
          },
          {
            to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
            value: "0x0"
          }
        ]
      }
    ],
  });
```

:::note Atomic required parameter
MetaMask only supports using `wallet_sendCalls` to send atomic batch transactions (not sequential batch transactions),
so `atomicRequired` can be set to either `true` or `false`.
If the `atomic` capability is not supported, `wallet_sendCalls` will return an error.
:::

This method returns a batch ID that you can use to track the status of the batch.
For example:

```json
{
  "id": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### 3. Track the status of the batch of transactions

Use [`wallet_getCallsStatus`](/wallet/reference/json-rpc-methods/wallet_getcallsstatus) to track 
the status of the submitted batch of transactions, using the batch ID returned by `wallet_sendCalls`.
For example:

```js title="index.js"
const status = await provider // Or window.ethereum if you don't support EIP-6963.
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
  Currently, this will always be `true` if the execution was successful.
- A list of transaction receipts.

For example:

```json
{
  "version": "2.0.0",
  "chainId": "0xaa36a7",
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

## Resources

- See the [MetaMask 7702/5792 Readiness dapp](https://7702playground.metamask.io/) to quickly test sending batch transactions.
- See the [MetaMask Delegation Toolkit documentation](/delegation-toolkit) for more information about Smart Accounts and their capabilities.
- See the following topics in the MetaMask end user documentation:
  - [What is a smart account?](https://support.metamask.io/configure/accounts/what-is-a-smart-account/)
  - [How to switch to or revert from a smart account](https://support.metamask.io/configure/accounts/switch-to-or-revert-from-a-smart-account/)
