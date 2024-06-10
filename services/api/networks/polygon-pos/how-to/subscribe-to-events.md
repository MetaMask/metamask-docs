---
description: Use WebSockets to subscribe to events.
---

# Subscribe to events

Use [WebSockets](../../../learn/websockets.md) to [subscribe](../json-rpc-methods/subscription-methods/index.md) to events
on the blockchain. For example, monitor an NFT smart contract to alert you when a new NFT is minted.

Stateless HTTP WebSockets are supported, however, we recommend using the WSS protocol to set up bidirectional stateful
subscriptions.

You need to be aware of the following when sending HTTP RPC requests:

- Silent failures - [Users need to manage client-side silent failures](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#pings_and_pongs_the_heartbeat_of_websockets).
- Load balancing - Unlike HTTP requests, WSS requests are not load-balanced to the fastest possible server.
- Retries - Retrying failed WebSocket requests typically requires custom JSON-RPC ID-based tracking, whereas support for
  retrying failed HTTP requests often is automatic, or easily configured.
- Status codes - WebSockets use its own set of [status codes](https://pkg.go.dev/github.com/gorilla/websocket#pkg-constants)
  to provide users with a disconnection reason. The service will respond with the standard
  [EVM response codes](../../ethereum/json-rpc-methods/index.md#error-codes) for each JSON-RPC request.

Refer to the [WebSockets](../../../learn/websockets.md) topic for more information about WebSockets, including pricing
and use case information.

### Example event subscription

:::info

You can use the [WebSocket cat (wscat)](https://github.com/websockets/wscat) tool to make WebSocket calls.

:::

The following WebSocket subscription example fires a notification each time a new header is appended to the chain:

```bash
$ wscat -c wss://polygon-mainnet.infura.io/ws/v3/YOUR-API-KEY
> {"jsonrpc":  "2.0",  "id":  1,  "method":  "eth_subscribe",  "params":  ["newHeads"]}
```
