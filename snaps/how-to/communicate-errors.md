---
description: Communicate errors from your Snap without crashing it
sidebar_position: 9
---

# Communicate errors

The Snaps SDK exposes a set of known errors that can be thrown from your Snap code without crashing the Snap.

## Import and throw errors

To throw these known errors, you have to import them from the `@metamask/snaps-sdk` package, then throw them where needed. Here's an example:

```typescript
import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { MethodNotFoundError } from '@metamask/snaps-sdk';

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'hello':
      return 'Hello World!';
    default:
      // Throw a known error to avoid crashing the Snap
      throw new MethodNotFoundError();
  }
};
```

### Pass data along with the error

The error class constructors exported by `@metamask/snaps-sdk` have the following signature:

```typescript
class SnapJsonRpcError extends SnapError {
  new (message?: string, data?: Record<string, Json>)
}
```

Both parameters are optional. If you don't pass `message`, then a pre-determined message is used. If you don't pass `data`, then an empty object is passed.

`data` can be any JSON-serializable object.

## Detect known errors in Dapps

Known errors are thrown back to the caller as JSON-RPC errors. They have a numeric `code`, a `message` string, and a `data` object.

The [Snaps known errors reference](../reference/known-errors.md) lists all the known errors with their codes and intended usage.