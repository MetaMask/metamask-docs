---
sidebar_position: 1
tags:
  - Keyring API
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Account Management API

Dapps can communicate with [account management Snaps](../../../features/custom-evm-accounts/index.md)
using the Account Management API.
The dapp must be [allowed to call each
method](../../../features/custom-evm-accounts/security.md#limit-the-methods-exposed-to-dapps).

## Account methods

The following methods are exposed by the Snap for account management.

### `keyring_createAccount`

Creates a new account.

#### Parameters

An object containing:

- `options`: `Record<string, Json>` - Snap-defined account options.

#### Returns

[An account object.](objects.md#keyringaccount)

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "keyring_createAccount",
  "params": {
    "options": {
      "signerCount": 5,
      "threshold": 3
    }
  }
}
```

</TabItem>
<TabItem value="Response">

```json
{
  "address": "0xd1f5279be4b4dd94133a23dee1b23f5bfc0db1d0",
  "id": "091bbc2e-6625-44d0-ac5c-658670ca649a",
  "methods": [
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData_v4",
    "personal_sign"
  ],
  "options": {
    "signerCount": 5,
    "threshold": 3
  },
  "type": "eip155:eoa"
}
```

</TabItem>
</Tabs>

### `keyring_deleteAccount`

Deletes an existing account.

#### Parameters

An object containing:

- `id`: `string` - ID of the account to be deleted (UUIDv4).

#### Returns

`null`

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "keyring_deleteAccount",
  "params": {
    "id": "091bbc2e-6625-44d0-ac5c-658670ca649a"
  }
}
```

</TabItem>
<TabItem value="Response">

```json
null
```

</TabItem>
</Tabs>

### `keyring_exportAccount`

Exports account data managed by the Snap.
This might include the public key, address, or derivation path.
The exact data exported depends on the Snap's implementation and security considerations.
A Snap might choose to not support this method or limit the data it exports.

:::warning
This method can export private keys or any other sensitive data.
:::

#### Parameters

An object containing:

- `id`: `string` - ID of the account to be exported (UUIDv4).

#### Returns

An object containing the account data.

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "keyring_exportAccount",
  "params": {
    "id": "091bbc2e-6625-44d0-ac5c-658670ca649a"
  }
}
```

</TabItem>
<TabItem value="Response">

```json
{
  "privateKey": "66a41d66be6483f1fdfd01fdb66173d449594bbd286149b019504dd72b58bc51"
}
```

</TabItem>
</Tabs>

### `keyring_filterAccountChains`

Filters for blockchain networks that an account can be used on.

#### Parameters

An object containing:

- `id`: `string` - Account ID (UUIDv4).
- `chains`: `string[]` - List of [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md)
  chain IDs of blockchain networks to filter.

#### Returns

An object containing:

- `chains`: `string[]` - List of [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md)
  chain IDs of blockchain networks that the account can be used on.

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "keyring_filterAccountChains",
  "params": {
    "id": "091bbc2e-6625-44d0-ac5c-658670ca649a",
    "chains": ["eip155:W", "eip155:X", "eip155:Y", "eip155:Z"]
  }
}
```

</TabItem>
<TabItem value="Response">

```json
{
  "chains": ["eip155:X", "eip155:Y"]
}
```

</TabItem>
</Tabs>

### `keyring_getAccount`

Gets an account from an ID.

#### Parameters

An object containing:

- `id`: `string` - Account ID (UUIDv4).

#### Returns

[An account object.](objects.md#keyringaccount)

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "keyring_getAccount",
  "params": {
    "id": "091bbc2e-6625-44d0-ac5c-658670ca649a"
  }
}
```

</TabItem>
<TabItem value="Response">

```json
{
  "address": "0xd1f5279be4b4dd94133a23dee1b23f5bfc0db1d0",
  "id": "091bbc2e-6625-44d0-ac5c-658670ca649a",
  "methods": [
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData_v4",
    "personal_sign"
  ],
  "options": {
    "signerCount": 5,
    "threshold": 3
  },
  "type": "eip155:eoa"
}
```

</TabItem>
</Tabs>

### `keyring_listAccounts`

Lists all accounts handled by the Snap.

#### Parameters

None

#### Returns

An array of [account objects](objects.md#keyringaccount) handled by the Snap.

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "keyring_listAccounts"
}
```

</TabItem>
<TabItem value="Response">

```json
[
  {
    "address": "0xd1f5279be4b4dd94133a23dee1b23f5bfc0db1d0",
    "id": "091bbc2e-6625-44d0-ac5c-658670ca649a",
    "methods": [
      "eth_sign",
      "eth_signTransaction",
      "eth_signTypedData_v4",
      "personal_sign"
    ],
    "options": {
      "signerCount": 5,
      "threshold": 3
    },
    "type": "eip155:eoa"
  },
  {
    "address": "0x84674cffb6146d19b986fc88ec70a441b570a45b",
    "id": "17a87b4a-286c-444d-aebb-1fed89021419",
    "methods": [
      "eth_prepareUserOperation",
      "eth_patchUserOperation",
      "eth_signUserOperation"
    ],
    "type": "eip155:erc4337"
  }
]
```

</TabItem>
</Tabs>

### `keyring_updateAccount`

Updates an account.

#### Parameters

[An account object.](objects.md#keyringaccount)

#### Returns

`null`

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "keyring_updateAccount",
  "params": {
    "address": "0xd1f5279be4b4dd94133a23dee1b23f5bfc0db1d0",
    "id": "091bbc2e-6625-44d0-ac5c-658670ca649a",
    "methods": [
      "eth_sign",
      "eth_signTransaction",
      "eth_signTypedData_v4",
      "personal_sign"
    ],
    "options": {
      "signerCount": 7,
      "threshold": 4
    },
    "type": "eip155:eoa"
  }
}
```

</TabItem>
<TabItem value="Response">

```json
null
```

</TabItem>
</Tabs>

## Request methods

The following methods are exposed by the Snap for managing signature requests.

### `keyring_approveRequest`

Approves a pending request.

#### Parameters

An object containing:

- `id`: `string` - Request ID.
- `data`: `Record<string, Json>` - Optional Snap-defined arguments.

#### Returns

`null`

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "keyring_approveRequest",
  "params": {
    "id": "f84d3a97-b6e1-47ea-8b0c-fd8609efaad4"
  }
}
```

</TabItem>
<TabItem value="Response">

```json
null
```

</TabItem>
</Tabs>

### `keyring_getRequest`

Gets a request from an ID.

#### Parameters

An object containing:

- `id`: `string` - Request ID.

#### Returns

[A request object.](objects.md#keyringrequest)

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "keyring_getRequest",
  "params": {
    "id": "f84d3a97-b6e1-47ea-8b0c-fd8609efaad4"
  }
}
```

</TabItem>
<TabItem value="Response">

```json
{
  "address": "0xd1f5279be4b4dd94133a23dee1b23f5bfc0db1d0",
  "id": "f84d3a97-b6e1-47ea-8b0c-fd8609efaad4",
  "request": {
    "method": "personal_sign",
    "params": [
      "0x4578616d706c652060706572736f6e616c5f7369676e60206d657373616765",
      "0xe887f3b50232722e6eb4c1d3a03b34c9b345acd1"
    ]
  },
  "scope": "eip155:1"
}
```

</TabItem>
</Tabs>

### `keyring_listRequests`

Lists all pending requests.

#### Parameters

None

#### Returns

An array of pending [request objects](objects.md#keyringrequest).

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "keyring_listRequests"
}
```

</TabItem>
<TabItem value="Response">

```json
[
  {
    "account": "0xd1f5279be4b4dd94133a23dee1b23f5bfc0db1d0",
    "id": "f84d3a97-b6e1-47ea-8b0c-fd8609efaad4",
    "request": {
      "method": "personal_sign",
      "params": [
        "0x4578616d706c652060706572736f6e616c5f7369676e60206d657373616765",
        "0xe887f3b50232722e6eb4c1d3a03b34c9b345acd1"
      ]
    },
    "scope": "eip155:1"
  },
  {
    "account": "0xe887f3b50232722e6eb4c1d3a03b34c9b345acd1",
    "id": "f6f302ae-38d7-4b95-ae88-bf2fb7fbee87",
    "request": {
      "method": "eth_sendTransaction",
      "params": [
        {
          "from": "0xe887f3b50232722e6eb4c1d3a03b34c9b345acd1",
          "nonce": "0x1",
          "gasPrice": "0x10",
          "gasLimit": "0x5208",
          "to": "0x84674cffb6146d19b986fc88ec70a441b570a45b",
          "value": "0x10000",
          "data": "0x"
        }
      ]
    },
    "scope": "eip155:1"
  }
]
```

</TabItem>
</Tabs>

### `keyring_rejectRequest`

Rejects a pending request and removes it from the list of pending requests.

#### Parameters

An object containing:

- `id`: `string` - Request ID.

#### Returns

`null`

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "keyring_rejectRequest",
  "params": {
    "id": "f84d3a97-b6e1-47ea-8b0c-fd8609efaad4"
  }
}
```

</TabItem>
<TabItem value="Response">

```json
null
```

</TabItem>
</Tabs>

### `keyring_submitRequest`

Submits a new request.

#### Parameters

[A request object.](objects.md#keyringrequest)

#### Returns

If the request is [synchronous](../../../features/custom-evm-accounts/index.md#synchronous-transaction-flow),
`keyring_submitRequest` returns an object containing:

- `pending` - `false` to indicate a synchronous request.
- `result`: `Json` - Request result.

If the request is [asynchronous](../../../features/custom-evm-accounts/index.md#asynchronous-transaction-flow),
`keyring_submitRequest` returns an object containing:

- `pending` - `true` to indicate that the request will be handled asynchronously.
- `redirect` - An optional redirect object containing:
  - `message`: `string` - Redirect message.
  - `url`: `string` - Redirect URL.

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "keyring_submitRequest",
  "params": {
    "address": "0xd1f5279be4b4dd94133a23dee1b23f5bfc0db1d0",
    "id": "f84d3a97-b6e1-47ea-8b0c-fd8609efaad4",
    "request": {
      "method": "personal_sign",
      "params": [
        "0x4578616d706c652060706572736f6e616c5f7369676e60206d657373616765",
        "0xe887f3b50232722e6eb4c1d3a03b34c9b345acd1"
      ]
    },
    "scope": "eip155:1"
  }
}
```

</TabItem>
<TabItem value="Response">

```json
{
  "pending": false,
  "result": "0x9aef363b17bc18dfbdcb9ed3ce5f9f96788ce84b353d262099e90c4fa0b513a4e21ee47bafa04c0630750e901b62bd4839b45219c191ec6076d6549637cb1beb4c"
}
```

</TabItem>
</Tabs>
