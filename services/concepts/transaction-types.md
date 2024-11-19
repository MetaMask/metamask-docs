---
description: Learn about different types of Ethereum transactions.
sidebar_position: 4
---

# Ethereum transaction types

You can interact with the [Ethereum JSON-RPC API](../reference/ethereum/json-rpc-methods/index.md) using different transaction types (specified by the `type` parameter).

The following methods use a unique format depending on the transaction type:

- [`eth_call`](../reference/ethereum/json-rpc-methods/eth_call.mdx)
- [`eth_estimateGas`](../reference/ethereum/json-rpc-methods/eth_estimategas.mdx)
- [`eth_getTransactionByBlockHashAndIndex` ](../reference/ethereum/json-rpc-methods/eth_gettransactionbyblockhashandindex.mdx)
- [`eth_getTransactionByBlockNumberAndIndex` ](../reference/ethereum/json-rpc-methods/eth_gettransactionbyblocknumberandindex.mdx)
- [`eth_getTransactionByHash` ](../reference/ethereum/json-rpc-methods/eth_gettransactionbyhash.mdx)
- [`eth_getTransactionReceipt` ](../reference/ethereum/json-rpc-methods/eth_gettransactionreceipt.mdx)

## Legacy transactions

Transactions with type `0x0` are legacy transactions that use the transaction format existing before typed transactions were introduced in [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718). They contain the parameters `nonce`, `gasPrice`, `gasLimit`, `to`, `value`, `data`, `v`, `r`, and `s`. Legacy transactions don’t use [access lists](../reference/ethereum/json-rpc-methods/eth_createaccesslist.mdx) or incorporate [EIP-1559 fee market changes](#eip-1559-transactions).

## Access list transactions

Transactions with type `0x1` are transactions introduced in [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930). They contain, along with the [legacy parameters](#legacy-transactions), an `accessList` parameter, which specifies an array of addresses and storage keys that the transaction plans to access (an _access list_). Access list transactions must specify an access list, and they don’t incorporate [EIP-1559 fee market changes](#eip-1559-transactions).

Also, access list transactions contain the `yParity` parameter. The returned values for this parameter can either be `0x0` or `0x1`. This is the parity (0 for even, 1 for odd) of the y-value of a [`secp256k1`](https://eips.ethereum.org/EIPS/eip-2098#:~:text=A%20secp256k1%20signature%20is%20made%20up%20of%203%20parameters%2C%20r%2C%20s%20and%20yParity.) signature.

Use the [`eth_createAccessList`](../reference/ethereum/json-rpc-methods/eth_createaccesslist.mdx) API to simulate a transaction which returns the addresses and storage keys that may be used to send the real transaction, and the approximate gas cost.

:::info

View the [Infura article](https://blog.infura.io/post/optimizing-ethereum-transactions-with-eth_createaccesslist) that describes how `eth_createAccessList` can help optimize gas costs, reduce out-of-gas errors, and verify clients for infrastructure access.

:::

## EIP-1559 transactions

Transactions with type `0x2` are transactions introduced in [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md), included in Ethereum's [London fork](https://ethereum.org/en/history/#london). EIP-1559 addresses the network congestion and overpricing of transaction fees caused by the historical fee market, in which users send transactions specifying a gas price bid using the `gasPrice` parameter, and miners choose transactions with the highest bids.

EIP-1559 transactions don’t specify `gasPrice`, and instead use an in-protocol, dynamically changing _base fee_ per gas. At each block, the base fee per gas is adjusted to address network congestion as measured by a gas target.

EIP-1559 transactions contain the [`accessList` and `yParity` parameters](transaction-types.md#access-list-transactions) and [legacy parameters](transaction-types.md#legacy-transactions) (except for `gasPrice`).

They also contain a `maxPriorityFeePerGas` parameter, which specifies the maximum fee the sender is willing to pay per gas above the base fee (the maximum _priority fee_ per gas), and a `maxFeePerGas` parameter, which specifies the maximum total fee (base fee + priority fee) the sender is willing to pay per gas.

An EIP-1559 transaction always pays the base fee of the block it’s included in, and it pays a priority fee as priced by `maxPriorityFeePerGas` or, if the base fee per gas + `maxPriorityFeePerGas` exceeds `maxFeePerGas`, it pays a priority fee as priced by `maxFeePerGas` minus the base fee per gas. The base fee is burned, and the priority fee is paid to the miner that included the transaction. A transaction’s priority fee per gas incentivizes miners to include the transaction over other transactions with lower priority fees per gas.

Read the [Consensys EIP-1559 primer](https://consensys.net/blog/quorum/what-is-eip-1559-how-will-it-change-ethereum/) for more information on how EIP-1559 changes Ethereum.
