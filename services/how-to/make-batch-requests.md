---
description: Make batch requests
sidebar_position: 4
---

# Make batch requests

Multiple requests can be sent at the same time in an array. This is called a [batch](https://www.jsonrpc.org/specification#batch)
request, and conforms to the [JSON-RPC 2.0 specification](https://www.jsonrpc.org/specification). Batch is also commonly
referred to as "multi-call."

:::info

All requests in the array are counted as individual requests against the [daily credit limit](../get-started/pricing/index.md)
and batch itself is counted as a request.

For example, if the array contains 30 requests, then those 30 requests count against the
daily credit request limit, as well as the batch of requests, so this would be 31 total requests.

:::

Each request in the array is processed before all the requests are returned. Therefore, when
requests are sent in a batch, they will be returned only after each request is processed.

Example batch request (containing 30 requests plus the batch request itself):

```json
curl --request POST \
  --url https://mainnet.infura.io/v3/<API-KEY> \
  --header "Content-Type: application/json" \
  --data '[
    {"jsonrpc": "2.0", "id": 1, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 2, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 3, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 4, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 5, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 6, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 7, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 8, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 9, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 10, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 11, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 12, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 13, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 14, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 15, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 16, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 17, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 18, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 19, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 20, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 21, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 22, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 23, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 24, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 25, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 26, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 27, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 28, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 29, "method": "eth_blockNumber", "params": []},
    {"jsonrpc": "2.0", "id": 30, "method": "eth_accounts", "params": []}
  ]'
```
