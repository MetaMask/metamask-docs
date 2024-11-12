---
description: See the Multichain API reference.
sidebar_custom_props:
  flask_only: true
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Multichain API

:::flaskOnly
:::

Dapps can call Multichain API [methods](#methods) to create and manage
[CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) sessions with MetaMask.
The API also provides [events](#events) that wallets can send to dapps to notify them of changes to
a session.

:::note See also
- [About the Multichain API](../concepts/multichain-api.md)
- [Interact with multiple networks](../how-to/manage-networks/use-multichain.md)
:::

## Methods

### `wallet_createSession`

Creates a multichain session with a wallet, authorizing that wallet with the specified set of scopes
and properties.
This method is defined in [CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md).

#### Parameters

- `optionalScopes`: `object` - Scopes that the wallet can support in order to be used with this dapp.
- `sessionProperties`: `object` - Properties that the wallet can use to determine if the session is valid.
- `requiredScopes`: `object` - (Optional) Scopes that the wallet must support in order to be used
  with this dapp.
  We don't recommend using `requiredScopes` with MetaMask.

#### Returns

The scopes and properties of the created session.

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
        "methods": ["eth_sendTransaction", "eth_signTransaction", "eth_sign", "get_balance", "personal_sign"],
        "notifications": ["accountsChanged", "chainChanged"]
      },
      "eip155:10": {
        "methods": ["get_balance"],
        "notifications": ["accountsChanged", "chainChanged"]
      },
      "eip155:0": {
        "methods": ["wallet_getPermissions", "wallet_creds_store", "wallet_creds_verify", "wallet_creds_issue", "wallet_creds_present"],
        "notifications": []
      },
      "eip155:42161": {
        "methods": ["eth_sendTransaction", "eth_signTransaction", "get_balance", "personal_sign"],
        "notifications": ["accountsChanged", "chainChanged"]
      }
    },
    "sessionProperties": {
      "expiry": "2022-12-24T17:07:31+00:00",
      "caip154-mandatory": "true"
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
        "methods": ["eth_sendTransaction", "eth_signTransaction", "get_balance", "eth_sign", "personal_sign"],
        "notifications": ["accountsChanged", "chainChanged"],
        "accounts": ["eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb", "eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb"]
      },
      "eip155:10": {
        "methods": ["get_balance"],
        "notifications": ["accountsChanged", "chainChanged"],
        "accounts": []
      },
      "eip155:42161": {
        "methods": ["personal_sign"],
        "notifications": ["accountsChanged", "chainChanged"],
        "accounts": ["eip155:42161:0x0910e12C68d02B561a34569E1367c9AAb42bd810"],
        "rpcDocuments": "https://example.com/wallet_extension.json"
      },
      "eip155:0": {
        "methods": ["wallet_getPermissions", "wallet_creds_store", "wallet_creds_verify", "wallet_creds_issue", "wallet_creds_present"],
        "notifications": []
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

Gets the scopes and properties within the active session.
This method is defined in [CAIP-312](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-312.md).

:::note
MetaMask doesn't support session IDs.
:::

#### Parameters

None.

#### Returns

The scopes and properties of the session.

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
        "notifications": ["accountsChanged"],
        "accounts": ["eip155:1:0xabc123"]
      },
      "eip155:137": {
        "methods": ["eth_sendTransaction"],
        "notifications": ["chainChanged"],
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
previously authorized to the dapp within a session.
This method is defined in [CAIP-27](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-27.md).

:::note
MetaMask doesn't support session IDs.
:::

#### Parameters

- `scope`: `string` - A [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md)
  chain ID previously authorized to the dapp within a session.
- `request`: `object` - A request object containing:
  - `method`: `string` - The [JSON-RPC API](json-rpc-methods/index.md) method to invoke,
    previously authorized to the dapp within a session.
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

Revokes the active session.
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
  chain ID previously authorized to the dapp within a session.
- `notification`: `object` - A notification object containing:
  - `method`: `string` - A [JSON-RPC API](json-rpc-methods/index.md) notification method name
    previously authorized to the dapp within a session.
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

Notifies the dapp of updates to the active session's authorization scopes.
This method is defined in [CAIP-311](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-311.md).

:::note
MetaMask doesn't support session IDs.
:::

#### Parameters

`sessionScopes`: `object` - An object containing the full updated session scopes, each formatted
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
        "notifications": ["message"],
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