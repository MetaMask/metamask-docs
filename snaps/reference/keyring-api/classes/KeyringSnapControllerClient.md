# Class: KeyringSnapControllerClient

A `KeyringClient` that allows the communication with a snap through the
`SnapController`.

## Extends

- [`KeyringClient`](KeyringClient.md)

## Constructors

### new KeyringSnapControllerClient(args)

```ts
new KeyringSnapControllerClient(args): KeyringSnapControllerClient
```

Create a new instance of `KeyringSnapControllerClient`.

The `handlerType` argument has a hard-coded default `string` value instead
of a `HandlerType` value to prevent the `@metamask/snaps-utils` module
from being required at runtime.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `args` | \{   `controller`: `SnapController`;   `handler`: `HandlerType`;   `origin`: `string`;   `snapId`: `string`;   } | Constructor arguments. |
| `args.controller` | `SnapController` | The `SnapController` instance to use. |
| `args.handler`? | `HandlerType` | The handler type (default: `'onRpcRequest'`). |
| `args.origin`? | `string` | The sender's origin (default: `'metamask'`). |
| `args.snapId`? | `string` | The ID of the snap to use (default: `'undefined'`). |

#### Overrides

[`KeyringClient`](KeyringClient.md).[`constructor`](KeyringClient.md#constructors)

#### Source

[external/keyring-api/src/keyring-snap-controller-client.ts:84](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-snap-controller-client.ts#L84)

## Properties

### #controller

```ts
private #controller: SnapController;
```

#### Source

[external/keyring-api/src/keyring-snap-controller-client.ts:69](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-snap-controller-client.ts#L69)

***

### #sender

```ts
private #sender: Sender;
```

#### Inherited from

[`KeyringClient`](KeyringClient.md).[`#sender`](KeyringClient.md#sender)

#### Source

[external/keyring-api/src/keyring-client.ts:33](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-client.ts#L33)

## Methods

### #send()

```ts
private #send(partial): Promise<
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
| `partial` |    \| `Omit`<\{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_listAccounts"`;   }, `"id"` \| `"jsonrpc"`\>   \| `Omit`<\{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_getAccount"`;   `params`: \{ id: string; };   }, `"id"` \| `"jsonrpc"`\>   \| `Omit`<\{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_createAccount"`;   `params`: \{ name: string; options: Record<string, Json\> \| null; };   }, `"id"` \| `"jsonrpc"`\>   \| `Omit`<\{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_filterAccountChains"`;   `params`: \{ id: string; chains: string[]; };   }, `"id"` \| `"jsonrpc"`\>   \| `Omit`<\{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_updateAccount"`;   `params`: \{ account: \{ id: string; name: string; address: string; options: Record<string, Json\> \| null; supportedMethods: ("personal\_sign" \| "eth\_sendTransaction" \| "eth\_sign" \| "eth\_signTransaction" \| "eth\_signTypedData" \| "eth\_signTypedData\_v1" \| "eth\_signTypedData\_v2" \| "eth\_signTypedData\_v3" \| "eth\_signTypedData\_v4")[]; type: "eip155:eoa" \| "eip155:erc4337"; }; };   }, `"id"` \| `"jsonrpc"`\>   \| `Omit`<\{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_deleteAccount"`;   `params`: \{ id: string; };   }, `"id"` \| `"jsonrpc"`\>   \| `Omit`<\{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_listRequests"`;   }, `"id"` \| `"jsonrpc"`\>   \| `Omit`<\{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_getRequest"`;   `params`: \{ id: string; };   }, `"id"` \| `"jsonrpc"`\>   \| `Omit`<\{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_submitRequest"`;   `params`: \{ account: string; scope: string; request: \{ id: string; jsonrpc: "2.0"; method: string; } \| \{ id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json\> \| Json[]; }; };   }, `"id"` \| `"jsonrpc"`\>   \| `Omit`<\{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_approveRequest"`;   `params`: \{ id: string; };   }, `"id"` \| `"jsonrpc"`\>   \| `Omit`<\{   `id`: `string`;   `jsonrpc`: `"2.0"`;   `method`: `"keyring_rejectRequest"`;   `params`: \{ id: string; };   }, `"id"` \| `"jsonrpc"`\> | Partial internal request (method and params). |

#### Returns

A promise that resolves to the response to the request.

#### Inherited from

[`KeyringClient`](KeyringClient.md).[`#send`](KeyringClient.md#send)

#### Source

[external/keyring-api/src/keyring-client.ts:50](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-client.ts#L50)

***

### approveRequest()

```ts
approveRequest(id): Promise<void>
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `id` | `string` |

#### Inherited from

[`KeyringClient`](KeyringClient.md).[`approveRequest`](KeyringClient.md#approverequest)

#### Source

[external/keyring-api/src/keyring-client.ts:151](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-client.ts#L151)

***

### createAccount()

```ts
createAccount(name, options): Promise<{
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
}>
```

#### Parameters

| Parameter | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `undefined` |
| `options` | `null` \| `Record`<`string`, `Json`\> | `null` |

#### Inherited from

[`KeyringClient`](KeyringClient.md).[`createAccount`](KeyringClient.md#createaccount)

#### Source

[external/keyring-api/src/keyring-client.ts:79](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-client.ts#L79)

***

### deleteAccount()

```ts
deleteAccount(id): Promise<void>
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `id` | `string` |

#### Inherited from

[`KeyringClient`](KeyringClient.md).[`deleteAccount`](KeyringClient.md#deleteaccount)

#### Source

[external/keyring-api/src/keyring-client.ts:112](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-client.ts#L112)

***

### filterAccountChains()

```ts
filterAccountChains(id, chains): Promise<string[]>
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `id` | `string` |
| `chains` | `string`[] |

#### Inherited from

[`KeyringClient`](KeyringClient.md).[`filterAccountChains`](KeyringClient.md#filteraccountchains)

#### Source

[external/keyring-api/src/keyring-client.ts:92](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-client.ts#L92)

***

### getAccount()

```ts
getAccount(id): Promise<{
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
}>
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `id` | `string` |

#### Inherited from

[`KeyringClient`](KeyringClient.md).[`getAccount`](KeyringClient.md#getaccount)

#### Source

[external/keyring-api/src/keyring-client.ts:69](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-client.ts#L69)

***

### getRequest()

```ts
getRequest(id): Promise<{
  account: string;
  request: { id: string; jsonrpc: "2.0"; method: string; } | { id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json> | Json[]; };
  scope: string;
}>
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `id` | `string` |

#### Inherited from

[`KeyringClient`](KeyringClient.md).[`getRequest`](KeyringClient.md#getrequest)

#### Source

[external/keyring-api/src/keyring-client.ts:131](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-client.ts#L131)

***

### listAccounts()

```ts
listAccounts(): Promise<{
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
}[]>
```

#### Inherited from

[`KeyringClient`](KeyringClient.md).[`listAccounts`](KeyringClient.md#listaccounts)

#### Source

[external/keyring-api/src/keyring-client.ts:60](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-client.ts#L60)

***

### listRequests()

```ts
listRequests(): Promise<{
  account: string;
  request: { id: string; jsonrpc: "2.0"; method: string; } | { id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json> | Json[]; };
  scope: string;
}[]>
```

#### Inherited from

[`KeyringClient`](KeyringClient.md).[`listRequests`](KeyringClient.md#listrequests)

#### Source

[external/keyring-api/src/keyring-client.ts:122](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-client.ts#L122)

***

### rejectRequest()

```ts
rejectRequest(id): Promise<void>
```

#### Parameters

| Parameter | Type |
| :------ | :------ |
| `id` | `string` |

#### Inherited from

[`KeyringClient`](KeyringClient.md).[`rejectRequest`](KeyringClient.md#rejectrequest)

#### Source

[external/keyring-api/src/keyring-client.ts:161](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-client.ts#L161)

***

### submitRequest()

```ts
submitRequest(request): Promise<{
  pending: true;
  } | {
  pending: false;
  result: Json;
}>
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `request` | \{   `account`: `string`;   `request`: \{ id: string; jsonrpc: "2.0"; method: string; } \| \{ id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json\> \| Json[]; };   `scope`: `string`;   } | - |
| `request.account` | `string` | Account ID (UUIDv4). |
| `request.request` | \{ id: string; jsonrpc: "2.0"; method: string; } \| \{ id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json\> \| Json[]; } | JSON-RPC request sent by the client application.<br /><br />Note: The request ID must be a string. |
| `request.scope` | `string` | Request's scope (CAIP-2 chain ID). |

#### Inherited from

[`KeyringClient`](KeyringClient.md).[`submitRequest`](KeyringClient.md#submitrequest)

#### Source

[external/keyring-api/src/keyring-client.ts:141](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-client.ts#L141)

***

### updateAccount()

```ts
updateAccount(account): Promise<void>
```

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `account` | \{   `address`: `string`;   `id`: `string`;   `name`: `string`;   `options`: `null` \| `Record`<`string`, `Json`\>;   `supportedMethods`: (      \| `"personal_sign"`      \| `"eth_sendTransaction"`      \| `"eth_sign"`      \| `"eth_signTransaction"`      \| `"eth_signTypedData"`      \| `"eth_signTypedData_v1"`      \| `"eth_signTypedData_v2"`      \| `"eth_signTypedData_v3"`      \| `"eth_signTypedData_v4"`)[];   `type`: `"eip155:eoa"` \| `"eip155:erc4337"`;   } | - |
| `account.address` | `string` | Account address or next receive address (UTXO). |
| `account.id` | `string` | Account ID (UUIDv4). |
| `account.name` | `string` | User-chosen account name. |
| `account.options` | `null` \| `Record`<`string`, `Json`\> | Keyring-dependent account options. |
| `account.supportedMethods` | (   \| `"personal_sign"`   \| `"eth_sendTransaction"`   \| `"eth_sign"`   \| `"eth_signTransaction"`   \| `"eth_signTypedData"`   \| `"eth_signTypedData_v1"`   \| `"eth_signTypedData_v2"`   \| `"eth_signTypedData_v3"`   \| `"eth_signTypedData_v4"`)[] | Account supported methods. |
| `account.type` | `"eip155:eoa"` \| `"eip155:erc4337"` | Account type. |

#### Inherited from

[`KeyringClient`](KeyringClient.md).[`updateAccount`](KeyringClient.md#updateaccount)

#### Source

[external/keyring-api/src/keyring-client.ts:102](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-client.ts#L102)

***

### withSnapId()

```ts
withSnapId(snapId): KeyringSnapControllerClient
```

Create a new instance of `KeyringSnapControllerClient` with the specified
`snapId`.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `snapId` | `string` | The ID of the snap to use in the new instance. |

#### Returns

A new instance of `KeyringSnapControllerClient` with the
specified snap ID.

#### Source

[external/keyring-api/src/keyring-snap-controller-client.ts:107](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-snap-controller-client.ts#L107)
