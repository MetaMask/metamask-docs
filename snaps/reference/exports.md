---
description: Snaps exports reference
toc_max_heading_level: 2
sidebar_position: 2
---

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

To provide transaction insights before a user signs a transaction, a snap must export `onTransaction`.
Whenever there's a contract interaction, and a transaction is submitted using the MetaMask
extension, MetaMask calls this method.
MetaMask passes the raw unsigned transaction payload to the `onTransaction` handler method.

:::note
For MetaMask to call the snap's `onTransaction` method, you must request the
[`endowment:transaction-insight`](permissions.md#endowmenttransaction-insight) permission.
:::

### Parameters

An object containing:

- `transaction` - The raw transaction payload.
- `chainId` - The [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md)
  chain ID.
- `transactionOrigin` - The transaction origin if
  [`allowTransactionOrigin`](permissions.md#endowmenttransaction-insight) is set to `true`.

### Returns

A content object displayed using [custom UI](../how-to/use-custom-ui.md), alongside the confirmation
for the transaction that `onTransaction` was called with.

### Example

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

## onCronjob

To run periodic actions for the user (cron jobs), a snap must export `onCronjob`.
This method is called at the specified times with the specified payloads defined in the
[`endowment:cronjob`](permissions.md#endowmentcronjob) permission.

:::note
For MetaMask to call the snap's `onCronjob` method, you must request the
[`endowment:cronjob`](permissions.md#endowmentcronjob) permission.
:::

### Parameters

An object containing an RPC request specified in the `endowment:cronjob` permission.

### Example

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

## onNameLookup

To resolve names to addresses and vice versa, a Snap must export `onNameLookup`.
Whenever the user is typing in the send field, MetaMask calls this method.
MetaMask passes the user input to the `onNameLookup` handler method.

:::note
For MetaMask to call the snap's `onNameLookup` method, you must request the
[`endowment:name-lookup`](permissions.md#endowmentname-lookup) permission.
:::


### Parameters

An object containing:

- `chainId` - The [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md)
  chain ID.
- `address` or `domain` - Either of these parameters will be defined, while the other will be undefined. 

### Example

<!--tabs-->

# TypeScript

```typescript
import type { OnNameLookupHandler } from '@metamask/snaps-types';
import { numberToHex } from '@metamask/utils';

export const onNameLookup: OnNameLookupHandler = async (request) => {
  const { chainId, address, domain } = request;

  if (address) {
    const shortAddress = `0x${address.substring(2, 5)}`;
    const chainIdDecimal = parseInt(chainId.split(':')[1], 10);
    const chainIdHex = numberToHex(chainIdDecimal);
    const resolvedDomain = `example.domain - ${shortAddress} / ${chainIdHex}`;
    return { resolvedDomain };
  }

  if (domain) {
    const resolvedAddress = '0xc0ffee254729296a45a3885639AC7E10F9d54979';
    return { resolvedAddress };
  }

  return null;
};
```

# JavaScript

```js
module.exports.onNameLookup = async ({ request }) => {
  const { chainId, address, domain } = request;

  if (address) {
    const shortAddress = `0x${address.substring(2, 5)}`;
    const chainIdDecimal = parseInt(chainId.split(':')[1], 10);
    const chainIdHex = numberToHex(chainIdDecimal);
    const resolvedDomain = `example.domain - ${shortAddress} / ${chainIdHex}`;
    return { resolvedDomain };
  }

  if (domain) {
    const resolvedAddress = '0xc0ffee254729296a45a3885639AC7E10F9d54979';
    return { resolvedAddress };
  }

  return null;
};
```

<!--/tabs-->
