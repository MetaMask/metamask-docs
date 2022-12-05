# Exports

::: tip Developer Preview Software
Snaps is pre-release software. To try Snaps, install [MetaMask Flask](https://metamask.io/flask).
:::

::: tip Feature Requests
Do you have feature requests? Other ideas? We'd love to hear about them! [Click here](https://github.com/MetaMask/snaps-monorepo/discussions) to join the discussion.
:::

## Table of Contents

[[toc]]

## `onRpcRequest`

In order to communicate with dapps and other snaps, the snap must implement its own JSON-RPC API by exposing an exported function called `onRpcRequest`. Whenever the snap receives a JSON-RPC request, the `onRpcRequest` handler function will be called with the below parameters.

::: tip Does my snap need to have an RPC API?
Well, no, that's also up to you! If your snap can do something useful without receiving and responding to JSON-RPC requests, then you can skip exporting onRpcRequest. However, if you want to do something like manage the user's keys for a particular protocol and create a dapp that sends transactions for that protocol via your snap, for example, you need to specify an RPC API.
:::

### Parameters

- `RpcHandlerArgs` - The origin and the JSON-RPC request.

```typescript
import { JsonRpcRequest } from '@metamask/types';

interface RpcHandlerArgs = {
  origin: string;
  request: JsonRpcRequest<unknown[] | { [key: string]: unknown }>;
};
```

### Returns

```typescript
type RpcHandlerReturn = Promise<unknown> | unknown;
```

`RpcHandlerReturn` - A promise containing the return of the implemented RPC Method.

### Examples

#### Typescript

```typescript
import { OnRpcRequestHandler } from '@metamask/snap-types';

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello':
      return 'world!';

    default:
      throw new Error('Method not found.');
  }
};
```

#### Javascript

```js
module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return 'world!';

    default:
      throw new Error('Method not found.');
  }
};
```

## `onTransaction`

If the snap wants to provide transaction insights before a user signs a transaction, the snap must export a function called `onTransaction`. Whenever there is a contract interaction and a transaction is submitted via the extension, this function will be called. The raw unsigned transaction payload will be passed to the `onTransaction` handler function.

::: tip Requesting the transaction insight permission
In order for the extension to call the `onTransaction` method of the snap, the `endowment:transaction-insight` permission must be requested. see [Permissions](./snaps-permissions.html#endowment-transaction-insight)
:::

### Parameters

- `onTransactionArgs` - the raw transaction payload and the [CAIP-2 chain ID](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md). For more details on the transaction object see [SIP-3](https://metamask.github.io/SIPs/SIPS/sip-3#appendix-i-ethereum-transaction-objects).

```typescript
interface OnTransactionArgs {
  transaction: Record<string, unknown>;
  chainId: string;
}
```

### Returns

```typescript
type OnTransactionHandlerReturn = Promise<OnTransactionResponse>;

interface OnTransactionResponse {
  insights: { [key: string]: unknown };
}
```

- `onTransactionResponse` - The `insights` object returned by the snap will be displayed alongside the confirmation for the transaction that `onTransaction` was called with. Keys and values will be displayed in the order received, with each key rendered as a title and each value rendered as a string.

### Examples

#### Typescript

```typescript
import { OnTransactionHandler } from "@metamask/snap-types";

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
}) => {
  const insights = /* Get insights */;
  return { insights };
};
```

#### Javascript

```js
module.exports.onTransaction = async ({
  transaction,
  chainId,
}) => {
  const insights = /* Get insights */;
  return { insights };
};
```

## `onCronjob`

If a snap wants to to run periodic actions for the user, the snap must export a function called `onCronjob`. This function will be called at the specified times with the specified payloads defined in the `endowment:cronjob` permission.

::: tip Requesting the cronjob permission
In order for the extension to call the `onCronjob` method of the snap, the `endowment:cronjob` permission must be requested. See [Permissions](./snaps-permissions.html#endowment-cronjob)
:::

### Parameters

- `onCronjobArgs` - exclusively containing an RPC request specified in the `endowment:cronjob` permission.

```typescript
interface onCronjobArgs {
  request: JsonRpcRequest<unknown[] | { [key: string]: unknown }>;
}
```

### Examples

#### Typescript

```typescript
import { OnCronjobHandler } from '@metamask/snap-types';

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  switch (request.method) {
    case 'exampleMethodOne':
      return wallet.request({
        method: 'snap_notify',
        params: [
          {
            type: 'inApp',
            message: `Hello, world!`,
          },
        ],
      });

    default:
      throw new Error('Method not found.');
  }
};
```

#### Javascript

```js
module.exports.onCronjob = async ({ request }) => {
  switch (request.method) {
    case 'exampleMethodOne':
      return wallet.request({
        method: 'snap_notify',
        params: [
          {
            type: 'inApp',
            message: `Hello, world!`,
          },
        ],
      });

    default:
      throw new Error('Method not found.');
  }
};
```
