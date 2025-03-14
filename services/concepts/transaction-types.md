---
description: Learn about different types of Ethereum transactions.
sidebar_position: 4
---

# Ethereum transaction types

You can interact with the [Ethereum JSON-RPC API](../reference/ethereum/json-rpc-methods/index.md) using different transaction types (specified by the
[`transactionType`](https://eips.ethereum.org/EIPS/eip-2718) parameter).

The following methods use a unique format depending on the transaction type:

- [`eth_call`](../reference/ethereum/json-rpc-methods/eth_call.mdx)
- [`eth_estimateGas`](../reference/ethereum/json-rpc-methods/eth_estimategas.mdx)
- [`eth_getTransactionByBlockHashAndIndex` ](../reference/ethereum/json-rpc-methods/eth_gettransactionbyblockhashandindex.mdx)
- [`eth_getTransactionByBlockNumberAndIndex` ](../reference/ethereum/json-rpc-methods/eth_gettransactionbyblocknumberandindex.mdx)
- [`eth_getTransactionByHash` ](../reference/ethereum/json-rpc-methods/eth_gettransactionbyhash.mdx)
- [`eth_getTransactionReceipt` ](../reference/ethereum/json-rpc-methods/eth_gettransactionreceipt.mdx)

## Legacy transactions

Transactions with type `0x0` are legacy transactions that use the transaction format existing before typed transactions were introduced in [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718). They contain the parameters `nonce`, `gasPrice`, `gasLimit`, `to`, `value`, `data`, `v`, `r`, and `s`. Legacy transactions don’t use [access lists](../reference/ethereum/json-rpc-methods/eth_createaccesslist.mdx) or incorporate [EIP-1559 fee market changes](#eip-1559-transactions).

```js title="Legacy transaction object example"
{
  nonce: "0x0", // Number of transactions made by the sender before this one.
  gasPrice: "0x09184e72a000", // Gas price, in wei, provided by the sender.
  gasLimit: "0x2710", // Maximum gas provided by the sender.
  to: "0x0000000000000000000000000000000000000000", // Address of the recipient. Not used in contract creation transactions.
  value: "0x0", // Value transferred, in wei.
  data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Used for defining contract creation and interaction.
  v: "0x1", // ECDSA recovery ID.
  r: "0xa07fd6c16e169f0e54b394235b3a8201101bb9d0eba9c8ae52dbdf556a363388", // ECDSA signature r.
  s: "0x36f5da9310b87fefbe9260c3c05ec6cbefc426f1ff3b3a41ea21b5533a787dfc", // ECDSA signature s.
}
```

## Access list transactions

Transactions with type `0x1` are transactions introduced in [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930). They contain, along with the [legacy parameters](#legacy-transactions), an `accessList` parameter, which specifies an array of addresses and storage keys that the transaction plans to access (an _access list_). Access list transactions must specify an access list, and they don’t incorporate [EIP-1559 fee market changes](#eip-1559-transactions).

Also, access list transactions contain the `yParity` parameter. The returned values for this parameter can either be `0x0` or `0x1`. This is the parity (0 for even, 1 for odd) of the y-value of a [`secp256k1`](https://eips.ethereum.org/EIPS/eip-2098) signature.

Use the [`eth_createAccessList`](../reference/ethereum/json-rpc-methods/eth_createaccesslist.mdx) API to simulate a transaction which returns the addresses and storage keys that may be used to send the real transaction, and the approximate gas cost.

```js title="Access list transaction object example"
{
  nonce: "0x0", // Number of transactions made by the sender before this one.
  gasPrice: "0x09184e72a000", // Gas price, in wei, provided by the sender.
  gasLimit: "0x2710", // Maximum gas provided by the sender.
  to: "0x0000000000000000000000000000000000000000", // Address of the recipient. Not used in contract creation transactions.
  value: "0x0", // Value transferred, in wei.
  data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Used for defining contract creation and interaction.
  v: "0x1", // ECDSA recovery ID.
  r: "0xa07fd6c16e169f0e54b394235b3a8201101bb9d0eba9c8ae52dbdf556a363388", // ECDSA signature r.
  s: "0x36f5da9310b87fefbe9260c3c05ec6cbefc426f1ff3b3a41ea21b5533a787dfc", // ECDSA signature s.
  chainId: "0x1", // Chain ID of the transaction.
  accessList: [ // List of addresses and storage keys the transaction plans to access.
    {
      "address": "0xa02457e5dfd32bda5fc7e1f1b008aa5979568150",
      "storageKeys": ["0x0000000000000000000000000000000000000000000000000000000000000081"]
    }
  ],
  yParity: "0x1" // Parity of the y-value of a secp256k1 signature.
}
```

:::info

View the [Infura article](https://blog.infura.io/post/optimizing-ethereum-transactions-with-eth_createaccesslist) that describes how `eth_createAccessList` can help optimize gas costs, reduce out-of-gas errors, and verify clients for infrastructure access.

:::

## EIP-1559 transactions

Transactions with type `0x2` are transactions introduced in [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md), included in Ethereum's [London fork](https://ethereum.org/en/history/#london). EIP-1559 addresses the network congestion and overpricing of transaction fees caused by the historical fee market, in which users send transactions specifying a gas price bid using the `gasPrice` parameter, and miners choose transactions with the highest bids.

EIP-1559 transactions don’t specify `gasPrice`, and instead use an in-protocol, dynamically changing _base fee_ per gas. At each block, the base fee per gas is adjusted to address network congestion as measured by a gas target.

EIP-1559 transactions contain the [`accessList` and `yParity` parameters](transaction-types.md#access-list-transactions) and [legacy parameters](transaction-types.md#legacy-transactions) (except for `gasPrice`).

They also contain a `maxPriorityFeePerGas` parameter, which specifies the maximum fee the sender is willing to pay per gas above the base fee, in order to get their transaction prioritized;
and a `maxFeePerGas` parameter, which specifies the maximum total fee (base fee + priority fee) the sender is willing to pay per gas.

An EIP-1559 transaction always pays the base fee of the block it’s included in, and it pays a priority fee as priced by `maxPriorityFeePerGas` or, if the base fee per gas + `maxPriorityFeePerGas` exceeds `maxFeePerGas`, it pays a priority fee as priced by `maxFeePerGas` minus the base fee per gas. The base fee is burned, and the priority fee is paid to the miner that included the transaction. A transaction’s priority fee per gas incentivizes miners to include the transaction over other transactions with lower priority fees per gas.

```js title="EIP-1559 transaction object example"
{
  nonce: "0x0", // Number of transactions made by the sender before this one.
  gasLimit: "0x2710", // Maximum gas provided by the sender.
  maxPriorityFeePerGas: "0x0", // Maximum fee, in wei, the sender is willing to pay per gas above the base fee.
  maxFeePerGas: "0x6f4d3132b", // Maximum total fee (base fee + priority fee), in wei, the sender is willing to pay per gas.
  to: "0x0000000000000000000000000000000000000000", // Address of the recipient. Not used in contract creation transactions.
  value: "0x0", // Value transferred, in wei.
  data: "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Used for defining contract creation and interaction.
  v: "0x1", // ECDSA recovery ID.
  r: "0xa07fd6c16e169f0e54b394235b3a8201101bb9d0eba9c8ae52dbdf556a363388", // ECDSA signature r.
  s: "0x36f5da9310b87fefbe9260c3c05ec6cbefc426f1ff3b3a41ea21b5533a787dfc", // ECDSA signature s.
  chainId: "0x1", // Chain ID of the transaction.
  accessList: [], // List of addresses and storage keys the transaction plans to access.
  yParity: "0x1" // Parity of the y-value of a secp256k1 signature.
}
```

:::info

Read the [Consensys EIP-1559 primer](https://consensys.net/blog/quorum/what-is-eip-1559-how-will-it-change-ethereum/) for more information on how EIP-1559 changes Ethereum.

:::
