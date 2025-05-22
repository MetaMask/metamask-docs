---
sidebar_label: JSON-RPC API
---

# Polygon PoS JSON-RPC API

Polygon's Bor node API is based on Go Ethereum (Geth).

The API supports the standard Ethereum JSON-RPC APIs, plus the Polygon Bor methods. Infura also provides access to
[archive data](../../../concepts/archive-data.md) for API calls that require access to data older than 128 blocks.

:::info

We recommend you use the WSS protocol to set up bidirectional stateful [subscriptions](subscription-methods/index.md). Stateless
HTTP WebSockets are also supported.

:::
