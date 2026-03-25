---
title: HyperEVM JSON-RPC API
<<<<<<< HEAD
description: Supported standard Ethereum methods on HyperEVM.
=======
description: Supported standard Ethereum methods on HyperEVM mainnet.
>>>>>>> 98a45ed997 (Merge.)
sidebar_label: JSON-RPC API
sidebar_key: hyperevm-json-rpc-api
---

<<<<<<< HEAD
Infura supports a subset of standard EVM-compatible JSON-RPC methods on HyperEVM.

::::info

- WebSockets are supported on HyperEVM mainnet and can be used to set up bidirectional
  stateful [subscriptions](subscription-methods/index.md).

::::
=======
# HyperEVM JSON-RPC API

Infura supports a subset of standard EVM-compatible JSON-RPC methods on HyperEVM **mainnet**.

## Limitations

- **Latest-only state**: HyperEVM only supports the latest block view. Requests that require historical state are not supported. In practice, data must be available from the latest block (for example, a transaction hash must exist in the latest block).
- **`eth_getLogs` constraints**:
  - Up to **4** topics.
  - A maximum of **50** blocks in the query range.
>>>>>>> 98a45ed997 (Merge.)

## Standard methods

- [`eth_blockNumber`](eth_blocknumber.mdx)
- [`eth_call`](eth_call.mdx)
- [`eth_chainId`](eth_chainid.mdx)
- [`eth_estimateGas`](eth_estimategas.mdx)
- [`eth_feeHistory`](eth_feehistory.mdx)
- [`eth_gasPrice`](eth_gasprice.mdx)
- [`eth_getBalance`](eth_getbalance.mdx)
- [`eth_getBlockByHash`](eth_getblockbyhash.mdx)
- [`eth_getBlockByNumber`](eth_getblockbynumber.mdx)
- [`eth_getBlockReceipts`](eth_getblockreceipts.mdx)
- [`eth_getBlockTransactionCountByHash`](eth_getblocktransactioncountbyhash.mdx)
- [`eth_getBlockTransactionCountByNumber`](eth_getblocktransactioncountbynumber.mdx)
- [`eth_getCode`](eth_getcode.mdx)
- [`eth_getLogs`](eth_getlogs.mdx)
- [`eth_getStorageAt`](eth_getstorageat.mdx)
- [`eth_getTransactionByBlockHashAndIndex`](eth_gettransactionbyblockhashandindex.mdx)
- [`eth_getTransactionByBlockNumberAndIndex`](eth_gettransactionbyblocknumberandindex.mdx)
- [`eth_getTransactionByHash`](eth_gettransactionbyhash.mdx)
- [`eth_getTransactionCount`](eth_gettransactioncount.mdx)
- [`eth_getTransactionReceipt`](eth_gettransactionreceipt.mdx)
- [`eth_maxPriorityFeePerGas`](eth_maxpriorityfeepergas.mdx)
- [`eth_syncing`](eth_syncing.mdx)
- [`net_version`](net_version.mdx)
- [`web3_clientVersion`](web3_clientversion.mdx)

<<<<<<< HEAD
## HyperEVM-specific methods

- [`eth_bigBlockGasPrice`](eth_bigblockgasprice.mdx)
- [`eth_usingBigBlocks`](eth_usingbigblocks.mdx)
- [`eth_getSystemTxsByBlockNumber`](eth_getsystemtxsbyblocknumber.mdx)
- [`eth_getSystemTxsByBlockHash`](eth_getsystemtxsbyblockhash.mdx)

## Subscription methods

- [Subscription methods](subscription-methods/index.md)
=======
## Trace and debug methods

- [Trace methods](trace-methods/index.md)
- [Debug methods](debug/index.md)
>>>>>>> 98a45ed997 (Merge.)
