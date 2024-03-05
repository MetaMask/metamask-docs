# Class: SnapRpcSender

Implementation of the `Sender` interface that can be used to send requests
to a snap through the snap JSON-RPC API.

## Implements

- [`Sender`](../type-aliases/Sender.md)

## Constructors

### new SnapRpcSender(origin, provider)

```ts
new SnapRpcSender(origin, provider): SnapRpcSender
```

Create a new instance of `SnapRpcSender`.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `origin` | `string` | The caller's origin. |
| `provider` | `MetaMaskInpageProvider` | The `MetaMaskInpageProvider` instance to use. |

#### Source

[external/keyring-api/src/keyring-snap-rpc-client.ts:26](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-snap-rpc-client.ts#L26)

## Properties

### #origin

```ts
private #origin: string;
```

#### Source

[external/keyring-api/src/keyring-snap-rpc-client.ts:16](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-snap-rpc-client.ts#L16)

***

### #provider

```ts
private #provider: MetaMaskInpageProvider;
```

#### Source

[external/keyring-api/src/keyring-snap-rpc-client.ts:18](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-snap-rpc-client.ts#L18)

## Methods

### send()

```ts
send(request): Promise<
  | null
  | string[]
  | {
  address: string;
  id: string;
  name: string;
  options: null | Record<string, Json>;
  supportedMethods: (
     | "personal_sign"
     | "eth_sendTransaction"
     | "eth_sign"
     | "eth_signTransaction"
     | "eth_signTypedData"
     | "eth_signTypedData_v1"
     | "eth_signTypedData_v2"
     | "eth_signTypedData_v3"
     | "eth_signTypedData_v4")[];
  type: "eip155:eoa" | "eip155:erc4337";
  }
  | {
  account: string;
  request: { id: string; jsonrpc: "2.0"; method: string; } | { id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json> | Json[]; };
  scope: string;
  }
  | {
  pending: true;
  }
  | {
  pending: false;
  result: Json;
  }
  | {
  address: string;
  id: string;
  name: string;
  options: null | Record<string, Json>;
  supportedMethods: (
     | "personal_sign"
     | "eth_sendTransaction"
     | "eth_sign"
     | "eth_signTransaction"
     | "eth_signTypedData"
     | "eth_signTypedData_v1"
     | "eth_signTypedData_v2"
     | "eth_signTypedData_v3"
     | "eth_signTypedData_v4")[];
  type: "eip155:eoa" | "eip155:erc4337";
  }[]
  | {
  account: string;
  request: { id: string; jsonrpc: "2.0"; method: string; } | { id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json> | Json[]; };
  scope: string;
}[]>
```

Send a request to the snap and return the response.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `request` |    \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_listAccounts"`;   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_getAccount"`;   `params`: \{ id: string; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_createAccount"`;   `params`: \{ name: string; options: Record<string, Json\> \| null; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_filterAccountChains"`;   `params`: \{ id: string; chains: string[]; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_updateAccount"`;   `params`: \{ account: \{ id: string; name: string; address: string; options: Record<string, Json\> \| null; supportedMethods: ("personal\_sign" \| "eth\_sendTransaction" \| "eth\_sign" \| "eth\_signTransaction" \| "eth\_signTypedData" \| "eth\_signTypedData\_v1" \| "eth\_signTypedData\_v2" \| "eth\_signTypedData\_v3" \| "eth\_signTypedData\_v4")[]; type: "eip155:eoa" \| "eip155:erc4337"; }; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_deleteAccount"`;   `params`: \{ id: string; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_listRequests"`;   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_getRequest"`;   `params`: \{ id: string; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_submitRequest"`;   `params`: \{ account: string; scope: string; request: \{ id: string; jsonrpc: "2.0"; method: string; } \| \{ id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json\> \| Json[]; }; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_approveRequest"`;   `params`: \{ id: string; };   }   \| \{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_rejectRequest"`;   `params`: \{ id: string; };   } | The JSON-RPC request to send to the snap. |

#### Returns

A promise that resolves to the response of the request.

#### Implementation of

Sender.send

#### Source

[external/keyring-api/src/keyring-snap-rpc-client.ts:37](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-snap-rpc-client.ts#L37)
