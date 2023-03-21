---
description: Snaps exports reference
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Snaps exports

A snap can export the following methods.

## onRpcRequest

To communicate with dapps and other snaps, a snap must implement its own JSON-RPC API by exporting
`onRpcRequest`.
Whenever the snap receives a JSON-RPC request, the `onRpcRequest` handler method is called.

:::caution important
If your snap can do something useful without receiving and responding to JSON-RPC requests, such as
providing [transaction insights](#ontransaction), you can skip exporting `onRpcRequest`.
However, if you want to do something such as manage the user's keys for a particular protocol and
create a dapp that sends transactions for that protocol via your snap, for example, you must
specify an RPC API.
:::

### Parameters

An object containing:

- `origin` - The origin as a string.
- `request` - The JSON-RPC request.

### Returns

A promise containing the return of the implemented method.

### Example

<Tabs>
<TabItem value="typescript" label="TypeScript">

```typescript
import { OnRpcRequestHandler } from '@metamask/snaps-types';

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

</TabItem>
<TabItem value="javascript" label="JavaScript">

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

</TabItem>
</Tabs>

## onTransaction

To provide transaction insights before a user signs a transaction, a snap must export `onTransaction`.
Whenever there's a contract interaction, and a transaction is submitted using the MetaMask
extension, MetaMask calls this method.
MetaMask passes the raw unsigned transaction payload to the `onTransaction` handler method.

:::note
For MetaMask to call the snap's `onTransaction` method, you must request the
[`endowment:transaction-insight`](permissions.md#endowment--transaction-insight) permission.
:::

### Parameters

An object containing:

- `transaction` - The raw transaction payload.
- `chainId` - The [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md)
  chain ID.
- `transactionOrigin` - The transaction origin if
  [`allowTransactionOrigin`](permissions.md#endowment--transaction-insight) is set to `true`.

### Returns

A content object displayed using [custom UI](../how-to/use-custom-ui.md), alongside the confirmation
for the transaction that `onTransaction` was called with.

### Example

<Tabs>
<TabItem value="typescript" label="TypeScript">

```typescript
import { OnTransactionHandler } from '@metamask/snap-types';
import { panel, heading, text } from '@metamask/snaps-ui';

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin,
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

</TabItem>
<TabItem value="JavaScript">

```js
import { panel, heading, text } from '@metamask/snaps-ui';

module.exports.onTransaction = async ({
  transaction,
  chainId,
  transactionOrigin,
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

</TabItem>
</Tabs>

## onCronjob

To run periodic actions for the user (cron jobs), a snap must export `onCronjob`.
This method is called at the specified times with the specified payloads defined in the
[`endowment:cronjob`](permissions.md#endowment--cronjob) permission.

:::note
For MetaMask to call the snap's `onCronjob` method, you must request the
[`endowment:cronjob`](permissions.md#endowment--cronjob) permission.
:::

### Parameters

An object containing an RPC request specified in the `endowment:cronjob` permission.

### Example

<Tabs>
<TabItem value="TypeScript">

```typescript
import { OnCronjobHandler } from '@metamask/snaps-types';

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

</TabItem>
<TabItem value="JavaScript">

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

</TabItem>
</Tabs>
