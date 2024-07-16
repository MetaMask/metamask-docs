---
description: Restrict your Snap's RPC API methods.
sidebar_label: Restrict RPC API methods
sidebar_position: 4
---

# Restrict a Snap's RPC API methods

If the `dapps` caveat of the [`endowment:rpc`](../reference/permissions.md#endowmentrpc) permission
is set to `true`, any dapp can call the Snap's RPC API by default.
You can [restrict the whole API](#restrict-the-whole-api) to specific dapp origins or
[restrict the API by method and origin](#restrict-by-method-and-origin).

## Restrict the whole API

The `endowment:rpc` permission has an optional
[`allowedOrigins`](../reference/permissions.md#allowed-origins) caveat.
You can use this to restrict the domains that are allowed to make calls to the Snap's RPC API.

## Restrict by method and origin

Sometimes a more granular control is required, such as filtering by method _and_ caller origin.

You can restrict by method and origin using the `origin` parameter of the
[`onRpcRequest`](../reference/entry-points.md#onrpcrequest) entry point.
For example:

```typescript title="index.ts"
import type { OnRpcRequestHandler, UnauthorizedError } from "@metamask/snaps-sdk";

type MethodPermission = "*" | string[];

const RPC_PERMISSIONS: Record<string, MethodPermission> = {
  hello: "*",
  secureMethod: [
    "https://metamask.io",
    "https://www.mydomain.com",
  ]
};

const isAllowed = (method: string, origin: string) => {
  return RPC_PERMISSIONS[method] === "*" || RPC_PERMISSIONS[method].includes(origin);
};

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  // Check permissions.
  if (!isAllowed(request.method, origin)) {
    throw new UnauthorizedError(`Method ${request.method} not authorized for origin ${origin}.`);
  }

  switch (request.method) {
    case "hello":
      return "world!";

    case "secureMethod":
      return "The secret is: 42";

    default:
      throw new Error("Method not found.");
  }
};
```

You can construct more powerful filtering methods using regular expressions or any other logic of
your choice.
