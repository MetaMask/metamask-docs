---
description: See the Multichain API reference.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Multichain API

:::tip Experimental
The Multichain API is an experimental feature and currently only available on the extension (not on mobile).
:::

Dapps can call Multichain API [methods](#methods) to create and manage
[CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) multichain connections with MetaMask.
The API also provides [events](#events) that wallets can send to dapps to notify them of onchain or connection changes.

:::note See also
- [About the Multichain API](../concepts/multichain-api.md)
- [Interact with multiple networks](../how-to/manage-networks/use-multichain.md)
:::

## Methods

### `wallet_createSession`

Creates a multichain connection with a wallet, authorizing that wallet with the specified set of scopes
and properties.
This method is defined in [CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md).

#### Parameters

- `optionalScopes`: `object` - (Optional) [CAIP-217](https://chainagnostic.org/CAIPs/caip-217) authorization scopes the wallet can support in order to be used with this dapp.
  If scopes are specified, only the following properties are supported:
  - `references`: `array` - (Optional) A list of references to specific blockchains for the namespace of this scope.
    This property can only be used if the scope namespace does not already specify the blockchain.
    For example, you can use this property for an `"eip155"` scope, but not an `"eip155:10"` scope.
    
    References are mainly used when there would otherwise be duplicate scopes.
  - `methods`: `array` - A list of JSON-RPC methods the wallet must support to be compatible with the dapp.
  - `notifications`: `array` - A list of JSON-RPC notifications the wallet must support to be compatible with the dapp.
  - `accounts`: `array` - (Optional) A list of [CAIP-10](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-10.md)
    account IDs valid within this scope.
    Dapps should include this only if they know which accounts they want the user to permit.
    When supplied, these accounts are preselected by default in the account selection process.
    Dapps typically omit this property for the user to select their own accounts.
- `sessionProperties`: `object` - (Optional) Properties that the wallet can use to determine if the connection is valid.
- `requiredScopes`: `object` - (Optional) [CAIP-217](https://chainagnostic.org/CAIPs/caip-217) authorization scopes the wallet must support to be compatible with the dapp.
  We don't recommend using `requiredScopes` with MetaMask.
  MetaMask treats all `requiredScopes` as `optionalScopes`.

#### Returns

The scopes and properties of the created connection.

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "wallet_createSession",
  "params": {
    "optionalScopes": {
      "eip155": {
        "references": ["1", "137"],
        "methods": ["eth_sendTransaction", "eth_signTransaction", "eth_sign", "eth_subscribe", "get_balance", "personal_sign"],
        "notifications": ["eth_subscription"]
      },
      "eip155:10": {
        "methods": ["get_balance"],
        "notifications": []
      },
      "eip155:42161": {
        "methods": ["eth_sendTransaction", "eth_signTransaction", "get_balance", "personal_sign"],
        "notifications": []
      }
    }
  }
}
```

</TabItem>
<TabItem value="Result">

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "sessionScopes": {
      "eip155": {
        "references": ["1", "137"],
        "methods": ["eth_sendTransaction", "eth_signTransaction", "eth_subscribe", "get_balance", "eth_sign", "personal_sign"],
        "notifications": ["eth_subscription"],
        "accounts": ["eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb", "eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"]
      },
      "eip155:10": {
        "methods": ["get_balance"],
        "notifications": [],
        "accounts": []
      },
      "eip155:42161": {
        "methods": ["personal_sign"],
        "notifications": [],
        "accounts": ["eip155:42161:0x0910e12C68d02B561a34569E1367c9AAb42bd810"]
      }
    },
    "sessionProperties": {
      "expiry": "2022-11-31T17:07:31+00:00",
      "globalConfig": {
        "foo": "bar"
      }
    }
  }
}
```

</TabItem>
</Tabs>

### `wallet_getSession`

Gets the scopes and properties within the active connection.
This method is defined in [CAIP-312](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-312.md).

:::note
MetaMask doesn't support session IDs.
:::

#### Parameters

None.

#### Returns

The scopes and properties of the connection.

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "wallet_getSession",
  "params": {}
}
```

</TabItem>
<TabItem value="Result">

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "sessionScopes": {
      "eip155:1": {
        "methods": ["eth_signTransaction"],
        "notifications": [],
        "accounts": ["eip155:1:0xabc123"]
      },
      "eip155:137": {
        "methods": ["eth_sendTransaction"],
        "notifications": [],
        "accounts": ["eip155:137:0xdef456"]
      },
      "solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ": {
        "methods": ["getBalance", "getAccountInfo", "sendTransaction", "getBlock"],
        "notifications": [],
        "accounts": ["solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ:4Nd1mS8AUwK3kU3gdiAM6QCvqhA7Do8rKtMXsGyqrJxy"]
      }
    }
  }
}
```

</TabItem>
</Tabs>

### `wallet_invokeMethod`

Invokes the specified [JSON-RPC API](json-rpc-methods/index.md) method on the specified network
previously authorized to the dapp within a connection.
This method is defined in [CAIP-27](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-27.md).

:::note
MetaMask doesn't support session IDs.
:::

#### Parameters

- `scope`: `string` - A [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md)
  chain ID previously authorized to the dapp within a connection.
- `request`: `object` - A request object containing:
  - `method`: `string` - The [JSON-RPC API](json-rpc-methods/index.md) method to invoke,
    previously authorized to the dapp within a connection.
  - `params`: `object` - The RPC method parameters (can be empty).

#### Returns

The response from the JSON-RPC method call.

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "wallet_invokeMethod",
  "params": {
    "scope": "eip155:1",
    "request": {
      "method": "eth_sendTransaction",
      "params": [
        {
          "to": "0x4B0897b0513FdBeEc7C469D9aF4fA6C0752aBea7",
          "from": "0xDeaDbeefdEAdbeefdEadbEEFdeadbeefDEADbEEF",
          "gas": "0x76c0",
          "value": "0x8ac7230489e80000",
          "data": "0x",
          "gasPrice": "0x4a817c800"
        }
      ]
    }
  }
}
```

</TabItem>
<TabItem value="Result">

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": {
    "scope": "eip155:1",
    "result": {
      "method": "eth_sendTransaction",
      "result": "0x4e306b5a5a37532e1734503f7d2427a86f2c992fbe471f5be403b9f734e667c8"
    }
  }
}
```

</TabItem>
</Tabs>

### `wallet_revokeSession`

Revokes the active connection.
This method is defined in [CAIP-285](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-285.md).

:::note
MetaMask doesn't support session IDs.
:::

#### Parameters

None.

#### Returns

`true` if the revocation was successful.

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "method": "wallet_revokeSession",
  "params": {}
}
```

</TabItem>
<TabItem value="Result">

```json
{
  "id": 1,
  "jsonrpc": "2.0",
  "result": true
}
```

</TabItem>
</Tabs>

## Events

The Multichain API provides the following events that wallets can send to dapps to notify them of
changes to a session.

### `wallet_notify`

Notifies the dapp of events or state changes related to a specific, previously authorized network.
This event is defined in [CAIP-319](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-319.md).

:::note
MetaMask doesn't support session IDs.
:::

#### Parameters

- `scope`: `string` - A [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md)
  chain ID previously authorized to the dapp within a connection.
- `notification`: `object` - A notification object containing:
  - `method`: `string` - A [JSON-RPC API](json-rpc-methods/index.md) notification method name
    previously authorized to the dapp within a connection.
  - `params`: `object` - The RPC notification method parameters.

#### Example

```json
{
  "jsonrpc": "2.0",
  "method": "wallet_notify",
  "params": {
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

### `wallet_sessionChanged`

Notifies the dapp of updates to the active connection's authorization scopes.
This method is defined in [CAIP-311](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-311.md).

:::note
MetaMask doesn't support session IDs.
:::

#### Parameters

`sessionScopes`: `object` - An object containing the full updated authorization scopes, each formatted
according to [CAIP-217](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-217.md).

#### Example

```json
{
  "jsonrpc": "2.0",
  "method": "wallet_sessionChanged",
  "params": {
    "sessionScopes": {
      "eip155:1": {
        "methods": ["eth_signTransaction", "eth_sendTransaction"],
        "notifications": [],
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

## Error codes

The Multichain API can return the following JSON-RPC error codes:

| Code | Description | Related methods |
| ---- | ----------- | --------------- |
| 5000 | Unknown error with request | `wallet_revokeSession`, `wallet_createSession` | 
| 5100 | Requested networks are not supported | `wallet_createSession` |
| 5302 | Invalid `sessionProperties` requested | `wallet_createSession` |
