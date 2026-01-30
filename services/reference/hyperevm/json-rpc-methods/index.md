---
title: HyperEVM JSON-RPC API
description: Supported standard Ethereum methods on HyperEVM.
sidebar_label: JSON-RPC API
sidebar_key: hyperevm-json-rpc-api
---

Infura supports a subset of standard EVM-compatible JSON-RPC methods on HyperEVM.

::::info

- WebSockets are supported on HyperEVM mainnet and can be used to set up bidirectional
  stateful [subscriptions](subscription-methods/index.md).

::::

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

## Subscription methods

- [Subscription methods](subscription-methods/index.md)
