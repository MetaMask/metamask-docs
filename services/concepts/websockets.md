---
description: WebSockets conceptual information.
sidebar_position: 7
---

# WebSockets

The WebSockets (WSS) communication protocol enables two-way communication between a client and a server over a single TCP
connection. The communication protocol maintains a network connection between the two parties, allowing for real-time, low-latency
communication. WebSockets allow for ongoing, bidirectional communication unlike HTTP, which is a request-response protocol.

## Subscriptions over WebSockets

WebSockets allow you to create stateful subscriptions, which is a type of subscription where the server maintains a record
of the client's subscription state. This means that the server remembers what data the client has requested and sent
previously, and only sends new data that has changed or meets the client's subscription criteria.

:::info

Stateless HTTP WebSocket calls are also supported.

:::

You can create stateful subscriptions over WebSockets to subscribe to specific events on the blockchain. The following
subscription types are available using the [`eth_subscribe`](../reference/ethereum/json-rpc-methods/subscription-methods/eth_subscribe.mdx) JSON-RPC API:

- The `newHeads` subscription type emits an event when a new header (block) is added to the chain, including during a
  chain reorganization.
- The `logs` subscription type emits logs that match a specified topic filter and are included in newly added blocks.
  We **strongly** recommend specifying a filter when subscribing to the `logs` subscription type.
- The `newPendingTransactions` subscription type subscribes to all pending transactions via
  WebSockets (regardless if you sent them or not), and returns their transaction hashes.

:::info

The `newPendingTransactions` subscription type is not available for all networks.

For information about how to use the available subscription methods to subscribe to events, see the `eth_subscribe`
JSON-RPC method for the relevant network. You can also see the following tutorials for more information:

- [Track ERC-20 token transfers](../tutorials/ethereum/track-erc-20-token-transfers.md)
- [Subscribe to pending transactions on Ethereum](../tutorials/ethereum/subscribe-to-pending-transactions.md)

:::

## Supported networks

Infura support subscriptions over WebSockets for the following networks:

- [Arbitrum](../reference/arbitrum/index.md)
- [Avalanche (C-Chain)](../reference/avalanche-c-chain/index.md)
- [Base](../reference/base/index.md)
- [Binance Smart Chain](../reference/bnb-smart-chain/index.md)
- [Blast](../reference/blast/index.md)
- [Celo](../reference/celo/index.md)
- [Ethereum](../reference/ethereum/index.md)
- [Linea](../reference/linea/index.md)
- [Mantle](../reference/mantle/index.md)
- [opBNB](../reference/opbnb/index.md)
- [Optimism](../reference/optimism/index.md)
- [Polygon](../reference/polygon-pos/index.md)
- [Scroll](../reference/scroll/index.md)
- [ZKsync Era](../reference/zksync/index.md)

:::info

WebSocket support is currently in public beta for Arbitrum, Avalanche (C-Chain), BNB, opBNB, and Optimism.

:::

## WebSockets use cases

Create stateful subscriptions over WebSockets to listen to specific events. Example use cases include:

- Listen when a new NFT is minted by an NFT minting smart contract, this enables your application to update its count of minted NFTs.
- Listen to a smart contract for the latest token price so that price can be reflected immediately on the application to end users.
- Receive updates for cryptocurrency market trades, orders, and Best Bid Offers (BBO).
- Receive the latest token transfers for an address.
- Receive notifications about each new block added to the blockchain.

## Pricing

For users on [Infura's credit pricing plan](../get-started/pricing/index.md), subscribing and unsubscribing to
events using the `eth_subscribe` and `eth_unsubscribe` methods consume credits from your daily quota.
Credits are consumed for these actions to prevent spamming, even if no valuable data is sent.

:::tip

Refer to the [credit cost table](../get-started/pricing/credit-cost.md) for more information about the
credit costs associated with the relevant method calls.

For users on the existing request-based billing system, WebSocket activity is counted toward your daily request
limits. View the [Infura pricing website](https://www.infura.io/pricing) for more information about your
request limits.

:::

Additional credit-based charges are applied for the events returned:

- `newHeads`: Each new block event consumes 50 credits from your daily quota. This event is triggered
    once per announced block.
- `logs`: Depending on the filters applied, this event can consume 300 credits per block from your
    daily quota. At most, one event per announced block is charged, or none if filter constraints are not met.
- `newPendingTransaction`: An event is generated every 700-800ms, aggregating the total amount of
    pending transactions collected during that period. Each event consumes 200 credits from your daily quota.
