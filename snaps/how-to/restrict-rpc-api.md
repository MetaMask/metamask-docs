---
description: Restrict a Snap's RPC API methods
sidebar_position: 7
---

# Restrict a Snap's RPC API methods

## All dapps are allowed by default

By default, a Snap's RPC API is callable by any dapp if the [`dapps` caveat to `endowment:rpc`](../reference/permissions.md#endowmentrpc) is set to `true` in the Snap's manifest.

## Restrict the whole API

The `endowment:rpc` permission has an optional [`allowedOrigins`](../reference/permissions.md#allowed-origins) caveat. It lets a developer restrict the domains that are allowed to make calls to the Snap's RPC API.

## Restrict by method and URL

Sometimes a more granular control is required, such as filtering by method AND URL.

To help with this, the [`onRpcRequest`](../reference/entry-points.md#onrpcrequest) entry point receives an `origin` parameter. The example code below uses `origin` to filter the Snap's RPC API by method + origin:

```typescript
import type { OnRpcRequestHandler, UnauthorizedError } from '@metamask/snaps-sdk';

type MethodPermission = '*' | string[];

const RPC_PERMISSIONS: Record<string, MethodPermission> = {
  hello: '*',
  secureMethod: [
    'https://metamask.io',
    'https://www.mydomain.com'
  ]
};

const isAllowed = (method: string, origin: string) => {
  return RPC_PERMISSIONS[method] === '*' || RPC_PERMISSIONS[method].includes(origin);
};

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  // Check permissions
  if (!isAllowed(request.method, origin)) {
    throw new UnauthorizedError(`Method ${request.method} not authorized for origin ${origin}.`);
  }

  switch (request.method) {
    case 'hello':
      return 'world!';
    
    case 'secureMethod':
      return 'The secret is: 42';

    default:
      throw new Error('Method not found.');
  }
};
```

More powerful filtering methods can be constructed using regular expressions or any other logic of your choice.
