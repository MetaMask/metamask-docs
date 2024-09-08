---
title: "Subscription methods"
---

# Subscription methods

Subscription methods are available for [WebSocket](../../../../learn/websockets.md) connections only, and allow you to wait for events instead of polling for them. For example, dapps can subscribe to logs and receive notifications when a specific event occurs.

The following subscription methods are available on mainnet:

- [`eth_subscribe`](./eth_subscribe.mdx) - Create a subscription to a particular event
- [`eth_unsubscribe`](./eth_unsubscribe.mdx) - Cancel an active subscription

:::info

We recommend you use the WSS protocol to set up bidirectional stateful subscriptions. Stateless HTTP WebSockets are also supported.

:::
