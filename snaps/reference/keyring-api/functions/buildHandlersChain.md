# Function: buildHandlersChain()

```ts
buildHandlersChain(...handlers): OnRpcRequestHandler
```

Build a chain of handlers for a JSON-RPC request.

If a handler throws a MethodNotSupportedError, the next handler in the chain
is called. If all handlers throw a MethodNotSupportedError, the error is re-
thrown.

Any other error thrown by a handler is re-thrown.

## Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| ...`handlers` | `OnRpcRequestHandler`<`undefined` \| `Record`<`string`, `Json`\> \| `Json`[]\>[] | Handlers to chain. |

## Returns

A handler that chains the given handlers.

## Source

[external/keyring-api/src/keyring-rpc-dispatcher.ts:45](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-rpc-dispatcher.ts#L45)
