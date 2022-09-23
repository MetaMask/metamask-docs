# Exports

::: tip Developer Preview Software
Snaps is pre-release software. To try Snaps, install [MetaMask Flask](https://metamask.io/flask).
:::

::: tip Feature Requests
Do you have feature requests? Other ideas? We'd love to hear about them! [Click here](https://github.com/MetaMask/snaps-skunkworks/discussions) to join the discussion.
:::

## Table of Contents

[[toc]]

## `onRpcRequest`

In order to communicate with dApps and other snaps, the snap must implement its own JSON-RPC API by exposing an exported function called `onRpcRequest`. Whenever the snap receives a JSON-RPC request, the `onRpcRequest` handler function will be called with the below parameters.

::: tip Does my snap need to have an RPC API?
Well, no, that's also up to you! If your snap can do something useful without receiving and responding to JSON-RPC requests, then you can skip exporting onRpcRequest. However, if you want to do something like manage the user's keys for a particular protocol and create a dapp that e.g. sends transactions for that protocol via your snap, you need to specify an RPC API.
:::

### Parameters

- `RpcHandlerArgs` - The origin and the JSON-RPC request.

```typescript
interface RpcHandlerArgs = {
  origin: string;
  request: JsonRpcRequest<unknown[] | { [key: string]: unknown }>;
};
```

### Returns

```typescript
type RpcHandlerReturn = Promise<unknown>;
```

`RpcHandlerReturn` - A promise containing the return of the implemented RPC Method.

## `onTransaction`

If the snap wants to provide transaction insights before a user signs a transaction, the snap must export a function called `onTransaction`. Whenever there is a contract interaction and a transaction is submitted via the extension, this function will be called. The raw unsigned transaction payload will be passed to the `onTransaction` handler function.

::: tip Requesting the transaction insight permission
In order for the extension to call the `onTransaction` method of the snap, the `endowment:transaction-insight` permission must be requested. see [Permissions](./snaps-permissions.html#endowment-transaction-insight)
:::

### Parameters

- `onTransactionArgs` - the raw transaction payload and the [CAIP2](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md) chain ID.

```typescript
interface OnTransactionArgs {
  transaction: Record<string, unknown>;
  chainId: string;
}
```

### Returns

```typescript
type onTransactionHandlerReturn = Promise<onTransactionResponse>;
```

```typescript
interface OnTransactionResponse {
  insights: { [key: string]: unknown };
}
```

- `onTransactionResponse` - The `insights` object returned by the snap will be displayed alongside the confirmation for the transaction that `onTransaction` was called with. Keys and values will be displayed in the order received, with each key rendered as a title and each value rendered as a string.
