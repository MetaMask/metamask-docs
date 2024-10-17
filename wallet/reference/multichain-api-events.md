---
description: See the Multichain API events reference.
toc_max_heading_level: 2
---

# Multichain API events

:::warning Developer preview
This is a developer preview of the Multichain API.
It is only available in [MetaMask Flask](/snaps/get-started/install-flask).
:::

The Multichain API provides events that wallets can send to dapps to notify them of changes to a
[CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) session.
Learn more [about the Multichain API](../concepts/multichain-api.md).

## `wallet_notify`

Notifies the dapp of events or state changes related to a specific, previously-authorized network.
Specified by [CAIP-319](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-319.md).

### Parameters

- `sessionId`: `string` - (Optional) - The session identifier.
- `scope`: `string` - A valid [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md)
  chain ID previously authorized to the dapp within a session.
- `notification`: `object` - A notification object containing:
  - `method`: `string` - A [JSON-RPC API](/wallet/reference/json-rpc-api) notification method name
    previously authorized to the dapp within a session.
  - `params`: `object` - The RPC notification method parameters.

### Example

```json
{
  "jsonrpc": "2.0",
  "method": "wallet_notify",
  "params": {
    "sessionId": "0xdeadbeef",
    "scope": "eip155:1",
    "notification": {
      "method": "eth_subscription",
      "params": {
        "subscription": "0x12345678",
        "result": {
          "blockNumber": "0x1234",
          "transactionHash": "0x5678",
          "logIndex": "0x9abc"
        }
      }
    }
  }
}
```

## `wallet_sessionChanged`

Notifies the dapp of updates to a shared session's authorization scopes.
Specified by [CAIP-311](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-311.md).

### Parameters

- `sessionId`: `string` - (Optional) The session identifier.
- `sessionScopes`: `object` - An object containing the full updated session scopes, each formatted
  according to [CAIP-217](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-217.md).

### Example

```json
{
  "jsonrpc": "2.0",
  "method": "wallet_sessionChanged",
  "params": {
    "sessionScopes": {
      "eip155:1": {
        "methods": ["eth_signTransaction", "eth_sendTransaction"],
        "notifications": ["accountsChanged"],
        "accounts": ["eip155:1:0xabc123"]
      },
      "eip155:137": {
        "methods": ["eth_sendTransaction"],
        "notifications": [],
        "accounts": ["eip155:137:0xdef456"]
      }
    }
  }
}
```