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

In order to communicate with Dapps and other snaps, the snap must implement its own JSON-RPC API by exposing an exported function called `onRpcRequest`. Whenever the snap receives a JSON-RPC request, the `onRpcRequest` handler function will be called with the below parameters.

::: tip Does my snap need to have an RPC API?
Well, no, that's also up to you! If your snap can do something useful without receiving and responding to JSON-RPC requests, e.g. providing [transaction insights](#ontransaction), then you can skip exporting onRpcRequest. However, if you want to do something like manage the user's keys for a particular protocol and create a Dapp that sends transactions for that protocol via your snap, for example, you need to specify an RPC API.
:::

::: warning Requesting the JSON-RPC permission
In order for the extension to call the `onRpcRequest` method of the snap, the `endowment:rpc` permission must be requested. See [Permissions](./snaps-permissions.html#endowment-rpc)
:::

### Parameters

- `RpcHandlerArgs` - The origin and the JSON-RPC request.

```typescript
import { JsonRpcRequest } from '@metamask/types';

interface RpcHandlerArgs {
  origin: string;
  request: JsonRpcRequest<unknown[] | { [key: string]: unknown }>;
}
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

::: warning Requesting the transaction insight permission
In order for the extension to call the `onTransaction` method of the snap, the `endowment:transaction-insight` permission must be requested. See [Permissions](./snaps-permissions.html#endowment-transaction-insight) for more information.
:::

### Parameters

- `onTransactionArgs` - the raw transaction payload, the [CAIP-2 chain ID](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md) and the transaction origin if [allowTransactionOrigin](./snaps-permissions.html#endowment-transaction-insight) is set to `true`. For more details on the transaction object see [SIP-3](https://metamask.github.io/SIPs/SIPS/sip-3#appendix-i-ethereum-transaction-objects).

```typescript
interface OnTransactionArgs {
  transaction: Record<string, unknown>;
  chainId: string;
  transactionOrigin?: string;
}
```

::: warning Getting the `transactionOrigin` parameter
The `transactionOrigin` property is only passed to `onTransaction` if `allowTransactionOrigin` is set to `true` in the `endowment:transaction-insight` permission object. See [Permissions](./snaps-permissions.html#endowment-transaction-insight) for more information.
:::

### Returns

```typescript
import { Component } from '@metamask/snaps-ui';

type OnTransactionHandlerReturn = Promise<OnTransactionResponse>;

interface OnTransactionResponse {
  content: Component | null;
}
```

- `onTransactionResponse` - The `content` object returned by the snap will be displayed using [Custom UI](./snaps-concepts.html#custom-ui) alongside the confirmation for the transaction that `onTransaction` was called with.

### Examples

#### Typescript

```typescript
import { OnTransactionHandler } from '@metamask/snap-types';
import { panel, heading, text } from '@metamask/snaps-ui';

export const onTransaction: OnTransactionHandler = async ({
  transactionOrigin
  transaction,
  chainId,
}) => {
  const insights = /* Get insights */;
  return {
    content: panel([
      heading('My Transaction Insights'),
      text('Here are the insights:'),
      ...(insights.map((insight) => text(insight.value)))
    ])
  };
};
```

#### Javascript

```js
import { panel, heading, text } from '@metamask/snaps-ui';

module.exports.onTransaction = async ({
  transactionOrigin
  transaction,
  chainId,
}) => {
  const insights = /* Get insights */;
  return {
    content: panel([
      heading('My Transaction Insights'),
      text('Here are the insights:'),
      ...(insights.map((insight) => text(insight.value)))
    ])
  };
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
      return snap.request({
        method: 'snap_notify',
        params: {
          type: 'inApp',
          message: `Hello, world!`,
        },
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
      return snap.request({
        method: 'snap_notify',
        params: {
          type: 'inApp',
          message: `Hello, world!`,
        },
      });

    default:
      throw new Error('Method not found.');
  }
};
```
