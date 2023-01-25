# Snaps exports

A snap can export the following functions.

## `onRpcRequest`

To communicate with dapps and other snaps, the snap must implement its own JSON-RPC API by exposing
an exported function called `onRpcRequest`.
Whenever the snap receives a JSON-RPC request, the `onRpcRequest` handler function is called with
the following parameters.

:::tip Does my snap need to have an RPC API?
No, that's up to you!
If your snap can do something useful without receiving and responding to JSON-RPC requests, then you
can skip exporting `onRpcRequest`.
However, if you want to do something such as manage the user's keys for a particular protocol and
create a dapp that sends transactions for that protocol via your snap, for example, you must
specify an RPC API.
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

`RpcHandlerReturn` - A promise containing the return of the implemented method.

### Examples

#### TypeScript

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

#### JavaScript

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

If the snap wants to provide transaction insights before a user signs a transaction, the snap must
export a function called `onTransaction`.
Whenever there's a contract interaction, and a transaction is submitted via the extension, this
function is called.
The raw unsigned transaction payload is passed to the `onTransaction` handler function.

:::note
For the extension to call the `onTransaction` method of the snap, you must request the
[`endowment:transaction-insight`](../how-to/request-permissions.md#endowmenttransaction-insight)
permission.
:::

### Parameters

- `onTransactionArgs` - The raw transaction payload and the
  [CAIP-2 chain ID](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md).
  For more details on the transaction object see
  [SIP-3](https://metamask.github.io/SIPs/SIPS/sip-3#appendix-i-ethereum-transaction-objects).

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

- `onTransactionResponse` - The `insights` object returned by the snap is displayed alongside the
  confirmation for the transaction that `onTransaction` was called with.
  Keys and values are displayed in the order received, with each key rendered as a title and each
  value rendered as a string.

### Examples

#### TypeScript

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

#### JavaScript

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

If a snap wants to run periodic actions for the user, the snap must export a function called `onCronjob`.
This function is called at the specified times with the specified payloads defined in the
[`endowment:cronjob`](../how-to/request-permissions.md#endowmentcronjob) permission.

:::note
For the extension to call the `onCronjob` method of the snap, you must request the
[`endowment:cronjob`](../how-to/request-permissions.md#endowmentcronjob) permission.
:::

### Parameters

- `onCronjobArgs` - Exclusively containing an RPC request specified in the `endowment:cronjob` permission.

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
