---
description: See the Snaps entry points reference.
---

# Snaps entry points

Snaps can expose the following entry points.

## onRpcRequest

To implement a [custom JSON-RPC API](../concepts/apis.md#custom-json-rpc-apis) to communicate with
dapps and other Snaps, a Snap must expose the `onRpcRequest` entry point.
Whenever the Snap receives a JSON-RPC request, MetaMask calls the `onRpcRequest` handler method.

:::note
For MetaMask to call the Snap's `onRpcRequest` method, you must request the
[`endowment:rpc`](permissions.md#endowmentrpc) permission.
:::

#### Parameters

An object containing:

- `origin` - The origin as a string.
- `request` - The JSON-RPC request.

#### Returns

A promise containing the return of the implemented method.

#### Example

<!--tabs-->

# TypeScript

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

# JavaScript

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

<!--/tabs-->

## onTransaction

To provide transaction insights before a user signs a transaction, a Snap must expose the
`onTransaction` entry point.
Whenever there's a contract interaction, and a transaction is submitted using the MetaMask
extension, MetaMask calls the `onTransaction` handler method.
MetaMask passes the raw unsigned transaction payload to `onTransaction`.

:::note
For MetaMask to call the Snap's `onTransaction` method, you must request the
[`endowment:transaction-insight`](permissions.md#endowmenttransaction-insight) permission.
:::

#### Parameters

An object containing:

- `transaction` - The raw transaction payload.
- `chainId` - The [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md)
  chain ID.
- `transactionOrigin` - The transaction origin if
  [`allowTransactionOrigin`](permissions.md#endowmenttransaction-insight) is set to `true`.

#### Returns

A content object displayed using [custom UI](../how-to/use-custom-ui.md), alongside the confirmation
for the transaction that `onTransaction` was called with.

#### Example

<!--tabs-->

# TypeScript

```typescript
import { OnTransactionHandler } from '@metamask/snaps-types';
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

# JavaScript

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

<!--/tabs-->

### Transaction severity level

:::flaskOnly
:::

This feature enables transaction insight Snaps to return an optional severity level of `critical`.
MetaMask shows a modal with the warning before the user can confirm the transaction.
Using the previous example for `onTransaction`, the following code adds a single line to return an
insight with the severity level `critical`: 

<!--tabs-->

# TypeScript

```typescript
import { OnTransactionHandler } from '@metamask/snaps-types';
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
    ]),
    // highlight-next-line
    severity: 'critical'
  };
};
```

# JavaScript

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
    ]),
    // highlight-next-line
    severity: 'critical'
  };
};
```

<!--/tabs-->

## onCronjob

To run periodic actions for the user (cron jobs), a Snap must expose the `onCronjob` entry point.
MetaMask calls the `onCronjob` handler method at the specified times with the specified payloads
defined in the [`endowment:cronjob`](permissions.md#endowmentcronjob) permission.

:::note
For MetaMask to call the Snap's `onCronjob` method, you must request the
[`endowment:cronjob`](permissions.md#endowmentcronjob) permission.
:::

#### Parameters

An object containing an RPC request specified in the `endowment:cronjob` permission.

#### Example

<!--tabs-->

# TypeScript

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

# JavaScript

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

<!--/tabs-->

## onInstall

To run an action on installation, a Snap must expose the `onInstall` entry point.
MetaMask calls the `onInstall` handler method after the Snap is installed successfully. 

:::note
For MetaMask to call the Snap's `onInstall` method, you must request the
[`endowment:lifecycle-hooks`](permissions.md#endowmentlifecycle-hooks) permission.
:::

#### Parameters

None.


#### Example

<!--tabs-->

# TypeScript

```typescript
import type { OnInstallHandler } from '@metamask/snaps-sdk';
import { heading, panel, text } from '@metamask/snaps-sdk';

export const onInstall: OnInstallHandler = async () => {
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([
        heading('Thank you for installing my Snap'),
        text(
          'To use this Snap, visit the companion dapp at [metamask.io](https://metamask.io).',
        ),
      ]),
    },
  });
};
```

# JavaScript

```js
import { heading, panel, text } from '@metamask/snaps-sdk';

module.exports.onInstall = async () => {
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([
        heading('Thank you for installing my Snap'),
        text(
          'To use this Snap, visit the companion dapp at [metamask.io](https://metamask.io).',
        ),
      ]),
    },
  });
};
```

<!--/tabs-->

## onUpdate

To run an action on update, a Snap must expose the `onUpdate` entry point.
MetaMask calls the `onUpdate` handler method after the Snap is updated successfully. 

:::note
For MetaMask to call the Snap's `onUpdate` method, you must request the
[`endowment:lifecycle-hooks`](permissions.md#endowmentlifecycle-hooks) permission.
:::

#### Parameters

None.


#### Example

<!--tabs-->

# TypeScript

```typescript
import type { OnUpdateHandler } from '@metamask/snaps-sdk';
import { heading, panel, text } from '@metamask/snaps-sdk';

export const onUpdate: OnUpdateHandler = async () => {
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([
        heading('Thank you for updating my Snap'),
        text(
          'New features added in this version:',
        ),
        text(
          'Added a dialog that appears when updating'
        ), 
      ]),
    },
  });
};
```

# JavaScript

```js
import { heading, panel, text } from '@metamask/snaps-sdk';

module.exports.onUpdate = async () => {
  await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: panel([
        heading('Thank you for updating my Snap'),
        text(
          'New features added in this version:',
        ),
        text(
          'Added a dialog that appears when updating'
        ), 
      ]),
    },
  });
};
```

<!--/tabs-->

## onHomePage

:::flaskOnly
:::

To build an embedded UI in MetaMask that any user can access through the Snaps menu, a Snap must
expose the `onHomePage` entry point. 
MetaMask calls the `onHomePage` handler method when the user selects the Snap name in the Snaps menu.

:::note
For MetaMask to call the Snap's `onHomePage` method, you must request the
[`endowment:page-home`](permissions.md#endowmentpage-home) permission.
:::

#### Parameters

None.

#### Returns

A content object displayed using [custom UI](../how-to/use-custom-ui.md).

#### Example

<!--tabs-->

# TypeScript

```typescript
import type { OnHomePageHandler } from '@metamask/snaps-sdk';
import { panel, text, heading } from '@metamask/snaps-sdk';

export const onHomePage: OnHomePageHandler = async () => {
  return {
    content: panel([
      heading('Hello world!'),
      text('Welcome to my Snap home page!'),
    ]),
  };
};
```

# JavaScript

```js
import { panel, text, heading } from '@metamask/snaps-sdk';

module.exports.onHomePage = async () => {
  return {
    content: panel([
      heading('Hello world!'),
      text('Welcome to my Snap home page!'),
    ]),
  };
};
```

<!--/tabs-->
