---
description: Create a Keyring Snap to connect to custom EVM accounts in MetaMask.
sidebar_custom_props:
  flask_only: true
---

# Create a Snap to connect to custom EVM accounts

This tutorial walks you through creating a Snap that uses the [Keyring API](../concepts/keyring-api.md)
to integrate custom EVM accounts in MetaMask.

:::flaskOnly
:::

## Prerequisites

- A Snap set up using the [Snaps quickstart](../get-started/quickstart.md)
- Business logic written for your custom EVM account type

## Steps

### 1. Add the snap_manageAccounts permission

Request permission to call [`snap_manageAccounts`](../reference/rpc-api.md#snap_manageaccounts) by
editing the `snap.manifest.json` file in your Snap:

```json title="snap.manifest.json"
{
  // ...other settings
  "initialPermissions": {
    // ...other permissions
    "snap_manageAccounts": {}
  }
}
```

### 2. Expose the Keyring interface as a JSON-RPC API

Export the [`onRpcRequest`](../reference/exports.md#onrpcrequest) function from the Snap to expose
the [`Keyring`](../reference/keyring-api/type-aliases/Keyring.md)
interface as a JSON-RPC API.

The Keyring API provides a helper called
[`handleKeyringRequest`](../reference/keyring-api/functions/handleKeyringRequest.md).
This helper takes an instance of your `Keyring` interface and a request object.
It responds to requests where the `method` is of type `keyring_*`, and throws a
[`MethodNotSupportedError`](../reference/keyring-api/classes/MethodNotSupportedError.md)
if it doesn't recognize the request method.

Since your Snap most likely wants to answer other JSON-RPC requests in addition to the `keyring_*` ones,
another helper called [`buildHandlersChain`](../reference/keyring-api/functions/buildHandlersChain.md)
lets you chain multiple RPC handlers together.
As each handler in the chain throws a
[`MethodNotSupportedError`](../reference/keyring-api/classes/MethodNotSupportedError.md),
the next handler in the chain is called.
The return value of `buildHandlersChain` is a function that can be used as the `onRpcRequest` export.

The following is an example of composing two handlers: the keyring handler and a custom handler.
This code goes in the `packages/snap/src/index.ts` file:

```typescript title="index.ts"
import {
  MethodNotSupportedError,
  buildHandlersChain,
  handleKeyringRequest,
} from '@metamask/keyring-api';
import type { OnRpcRequestHandler } from '@metamask/snaps-types';

// This is your custom EVM account implementation
import { MyKeyring } from './keyring';

let keyring: MyKeyring;

/**
 * Handle keyring requests.
 *
 * @param args - Request arguments.
 * @param args.request - Request to execute.
 * @returns The execution result.
 */
const keyringHandler: OnRpcRequestHandler = async ({ request }) => {
  if (!keyring) {
    const state = await snap.request({
      method: 'snap_manageState',
      params: { operation: 'get' },
    });
    if (!keyring) {
      keyring = new MyKeyring(state);
    }
  }
  return await handleKeyringRequest(keyring, request);
};

/**
 * Execute a custom Snap request.
 *
 * @param args - Request arguments.
 * @param args.request - Request to execute.
 * @returns The execution result.
 */
const customHandler: OnRpcRequestHandler = async ({
  request,
}): Promise<any> => {
  switch (request.method) {
    // internal methods
    case 'mysnap_hello': {
      return 'Hello World!';
    }

    default: {
      throw new MethodNotSupportedError(request.method);
    }
  }
};

/**
 * Compose both handlers
 */
export const onRpcRequest: OnRpcRequestHandler = buildHandlersChain(
  keyringHandler,
  customHandler,
);
```

### 3. Use the Keyring API from a dapp

As you build a companion dapp to provide a user interface for your Keyring Snap, you'll need to
interact with your Snap's JSON-RPC API.
While you could do this by making regular RPC calls using
[`wallet_invokeSnap`](../reference/rpc-api.md#wallet_invokesnap), we recommend
[using the Keyring API from your dapp](../how-to/use-keyring-api.md):

```typescript
import { KeyringSnapRpcClient } from '@metamask/keyring-api';
import { defaultSnapOrigin as snapId } from '../config';

const keyringClient = new KeyringSnapRpcClient(snapId, window.ethereum);

// Example usage, after the user fills the steps to create an account...
keyringClient.createAccount(name, options);

// The above call is equivalent to
window.ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
      snapId,
      request: {
        method: 'keyring_createAccount',
        params: { name, options }
      }
  },
});
```
