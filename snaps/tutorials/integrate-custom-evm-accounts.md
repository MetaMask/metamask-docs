---
description: Learn how to integrate custom EVM accounts in MetaMask
---

# Integrate custom EVM accounts in MetaMask

## Adding the `snap_manageAccounts` permission

Since your snap will make use of the `snap_manageAccounts` function, it needs to request permission for it in the manifest. Edit `snap.manifest.json` as follows:

```json
{
  // ...other settings
  "initialPermissions": {
    // ...other permissions
    "snap_manageAccounts": {}
  }
}
```

## Exposing the `Keyring` class as JSON-RPC endpoints

Once you've written all the business logic for your custom EVM account type, the next step is to expose it as a JSON-RPC API. Exposing a JSON-RPC API in Snaps is done by [exporting an `onRpcRequest` function](../reference/exports.md#onrpcrequest) from the snap package.

The `@metamask/keyring-api` package provides a helper called [`handleKeyringRequest`](../reference/keyring-api/modules.md#handlekeyringrequest). This helper takes an instance of your `Keyring` class and a request object. It responds to requests where the `method` is of type `keyring_*`, and throws a [`MethodNotSupportedError`](../reference/keyring-api/classes/MethodNotSupportedError.md) if it doesn't recognize the request method.

Since your snap will most likely want to answer other JSON-RPC requests than the `keyring_*` ones, another helper called [`buildHandlersChain`](../reference/keyring-api/modules.md#buildhandlerschain) lets you chain multiple RPC handlers together. As each handler in the chain throws a [`MethodNotSupportedError`](../reference/keyring-api/classes/MethodNotSupportedError.md), the next handler in the chain will be called. The return value of `buildHandlersChain` is a function that can be used as the `onRpcRequest` export.

Here's an example of composing two handlers: the keyring handler and a custom handler. This code would go in `packages/snap/src/index.ts`:

```typescript
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
 * Execute a custom snap request.
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

## Using the keyring API from a Dapp

As you're building a companion Dapp to provide a user interface for your Keyring snap, you'll need to interact with your snap's JSON-RPC API. While you could do this by making regular RPC calls using [`wallet_invokeSnap`](../reference/rpc-api.md#wallet_invokesnap), we provide a more elegant solution.

From your Dapp, you can use the [`KeyringSnapRpcClient`](../reference/keyring-api/classes/KeyringSnapRpcClient.md) from the `@metamask/keyring-api` package, like so:

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
