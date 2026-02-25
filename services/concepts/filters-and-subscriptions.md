---
description: Learn about filter and subscription methods.
sidebar_position: 3
---

# Filters and subscriptions

An event that generates a log in Ethereum is searchable with a bloom filter.

[Bloom filters](https://en.wikipedia.org/wiki/Bloom_filter) are space-efficient probabilistic mechanisms for identifying whether an element is likely to be within a set.

Ethereum methods use this underlying implementation to search for and retrieve specific data from the Ethereum blockchain by polling with filter methods via HTTP or listening with subscription methods via WebSocket.

:::info

Infura is even faster at this than regular Ethereum nodes as we make use of custom off-chain indexing and data storage strategies.

:::

### Filters

Check out the documented [HTTP filter method specifications](../reference/ethereum/json-rpc-methods/filter-methods/index.md).

### Subscriptions

Check out the documented [WebSocket subscription specifications](../reference/ethereum/json-rpc-methods/subscription-methods/index.md).
