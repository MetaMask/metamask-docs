# Function: handleKeyringRequest()

```ts
handleKeyringRequest(keyring, request): Promise<Json | void>
```

Handles a keyring JSON-RPC request.

## Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `keyring` | [`Keyring`](../type-aliases/Keyring.md) | Keyring instance. |
| `request` | `JsonRpcRequest`<`undefined` \| `Record`<`string`, `Json`\> \| `Json`[]\> | Keyring JSON-RPC request. |

## Returns

A promise that resolves to the keyring response.

## Source

[external/keyring-api/src/keyring-rpc-dispatcher.ts:71](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-rpc-dispatcher.ts#L71)
