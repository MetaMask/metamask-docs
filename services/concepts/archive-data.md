---
description: Learn about archive data.
sidebar_position: 2
---

# Archive data

Archive data is data on the blockchain that is older than 128 blocks.

:::caution important
For users on [Infura's credit pricing plan](../get-started/pricing/index.md), requests for
archive data currently cost the same as non-archive data, but this might change in the future.
:::

## Infura-supported archive data

Access to archive data is automatically enabled on the following supported networks:

 |Mainnet |Testnet|
 |--------|-------|
 |Ethereum|Sepolia|
 |Optimism|Sepolia|
 |Polygon |Amo    |
 |Arbitrum|       |
 |Celo    |       |

Infura provides access to [full nodes](#full-nodes)
and [archive nodes](#archive-nodes). 

## Full nodes

Full nodes maintain the current state of the blockchain and are responsible for providing data on request and executing smart contract transactions.

Full nodes store enough data to recalculate the chain in the event of a chain reorg. Beyond that, full nodes prune their data; only storing the data required for verifying transactions older than 128 blocks.

Pruning conserves disk space and helps with node sync time, thus reducing storage and computation costs. However, a pruned node cannot serve API requests for certain RPC methods older than 128 blocks.

## Archive nodes

Data older than 128 blocks are stored on archive nodes on the blockchain. These are full nodes running in archive mode.

Only an archive node can serve API requests for certain RPC methods older than 128 blocks. The Ethereum JSON-RPC and Websocket APIs include several methods which require access to an archive node.

## Methods requiring archive data

Requests for data older than the most recent 128 blocks require access to archive nodes.

The following methods include a parameter for specifying a block number for the request.

- `eth_getBalance`
- `eth_getCode`
- `eth_getTransactionCount`
- `eth_getStorageAt`
- `eth_call`
