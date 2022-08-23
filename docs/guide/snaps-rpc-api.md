# JSON-RPC API

::: tip Developer Preview Software
Snaps is pre-release software. To try Snaps, install [MetaMask Flask](https://metamask.io/flask).
:::

::: tip Feature Requests
Do you have feature requests? Other ideas? We'd love to hear about them! [Click here](https://github.com/MetaMask/snaps-skunkworks/discussions) to join the discussion.
:::

## Table of Contents

[[toc]]

## Unrestricted Methods

### `wallet_enable`

::: warning Only Callable By

- Websites
  :::

#### Parameters

- `Array`

  0. `RequestedPermissions` - The requested permissions.

```typescript
interface WalletEnableParam {
  wallet_snap: {
    [snapId: string]: {
      version?: string;
    };
  };
  [permissionName: string]: {};
}
```

#### Returns

```typescript
interface WalletEnableResult {
  // The user's Ethereum accounts, if the eth_accounts permission has been
  // granted.
  accounts: string[];
  // The permissions granted to the requester.
  permissions: Web3WalletPermission[];
  // The user's installed snaps that the requester is permitted to access.
  snaps: WalletInstallSnapsResult;
  errors?: Error[]; // Any errors encountered during processing.
}
```

`WalletEnableResult` - An object containing the requester's permitted Ethereum accounts, snaps, and granted permissions.

#### Description

This is a convenience method for requesting the user's accounts and connecting to / installing snaps.
You can think of it as a combination of [`eth_requestAccounts`](./rpc-api.html#eth-requestaccounts), [`wallet_installSnaps`](#wallet-installsnaps), and [`wallet_requestPermissions`](./rpc-api.html#wallet-requestpermissions).

See the examples for details.

#### Example

```javascript
let result;
try {
  result = await ethereum.request({
    method: 'wallet_enable',
    // This entire object is ultimately just a list of requested permissions.
    // Every snap has an associated permission or permissions, given the prefix `wallet_snap_`
    // and its ID. Here, the `wallet_snap` property exists so that callers don't
    // have to specify the full permission permission name for each snap.
    params: [
      {
        wallet_snap: {
          'npm:@metamask/example-snap': {},
          'npm:fooSnap': {
            // The optional version argument allows requesting
            // SemVer version range, with semantics same as in
            // package.json ranges.
            version: '^1.0.2',
          },
        },
        eth_accounts: {},
      },
    ],
  });
} catch (error) {
  // The `wallet_enable` call will throw if the requested permissions are
  // rejected.
  if (error.code === 4001) {
    console.log('The user rejected the request.');
  } else {
    console.log('Unexpected error:', error);
  }
}

// If the installation of all snaps fails, the associated error(s) will be
// returned in the `result.errors` array.
if (result.errors) {
  console.log('Snap installation failure :(', result.errors);
} else {
  console.log('Success!', result);
  // Could print something of the form:
  // {
  //   accounts: ['0xa...', '0xb...'],
  //   permissions: {
  //     eth_accounts: {},
  //     'wallet_snap_npm:@metamask/example-snap': {},
  //   },
  //   snaps: {
  //     'npm:@metamask/example-snap': {
  //       version: '1.0.0',
  //       permissionName: 'wallet_snap_npm:@metamask/example-snap',
  //       ...
  //     },
  //     'npm:fooSnap': {
  //       error: { message: 'The snap does not exist.' },
  //     },
  //   }
  // }
}
```

### `wallet_getSnaps`

::: warning Only Callable By

- Websites
  :::

#### Returns

```typescript
interface WalletGetSnapsResult {
  [snapId: string]: {
    /**
     * The ID of the Snap.
     */
    id: SnapId;

    /**
     * The initial permissions of the Snap, which will be requested when it is
     * installed.
     */
    initialPermissions: RequestedSnapPermissions;

    /**
     * The name of the permission used to invoke the Snap.
     */
    permissionName: string;

    /**
     * The version of the Snap.
     */
    version: string;
  };
}
```

`WalletGetSnapsResult` - An object containing the requester's permitted snaps.

#### Description

This method returns the IDs of the caller's permitted snaps and some relevant metadata.

#### Example

```javascript
const result = await ethereum.request({ method: 'wallet_getSnaps' });

console.log(result);
// If any snaps are permitted, will print e.g.:
// {
//   accountRPC methods?s: ['0xa...', '0xb...'],
//   permissions: {
//     eth_accounts: {},
//     'wallet_snap_npm:@metamask/example-snap': {},
//   },
//   snaps: {
//     'npm:@metamask/example-snap': {
//       version: '1.0.0',
//       permissionName: 'wallet_snap_npm:@metamask/example-snap',
//       ...
//     }
//   }
// }
```

### `wallet_installSnaps`

::: warning Only Callable By

- Websites
  :::

::: warning Is this the method you're looking for?
This method only installs the requested snaps if the caller is permitted to do so.
You probably want to use [`wallet_enable`](#wallet-enable) instead, which both requests the permissions for the snaps _and_ installs them.
:::

#### Parameters

```typescript
interface InstallSnapsParam {
  [snapId: string]: {
    version?: string;
  };
}
```

- `Array`

  0. `InstallSnapsParam` - The snaps to install.

#### Returns

```typescript
interface WalletInstallSnapsResult {
  [snapId: string]:
    | WalletGetSnapsResult[string]
    | {
        error: Error;
      };
}
```

`WalletInstallSnapsResult` - An object mapping the IDs of installed snaps to their metadata or an error if installation failed.

#### Description

This method attempts to install the requested snaps, if they are permitted.
If the installation of any snap fails, its object value on the result will contain an `error` property with the error that caused the installation to fail.

Optionally, you can specify a [SemVer range](https://www.npmjs.com/package/semver) for any snap to be installed.
If you do so, MetaMask will try to install a version of the snap that satisfies the requested range.
If a compatible version of a snap is already installed, the request to install that snap will automatically succeed.
If an incompatible version is installed, MetaMask will attempt to update the snap to the latest version that satisfies the requested range.
The request will succeed if the snap is successfully updated, and fail if the update could not be completed.

#### Example

```javascript
const result = await ethereum.request({
  method: 'wallet_installSnaps',
  params: [
    {
      'npm:@metamask/example-snap': {},
      'npm:fooSnap': {
        // The optional version argument allows requesting a SemVer version
        // range, with the same semantics as npm package.json ranges.
        version: '^1.0.2',
      },
    },
  ],
});

console.log(result);
// Could print something of the form:
// {
//   'npm:@metamask/example-snap': {
//     version: '1.0.0',
//     permissionName: 'wallet_snap_npm:@metamask/example-snap',
//     ...
//   },
//   'npm:fooSnap': {
//     error: { message: 'The snap does not exist.' },
//   },
// }
```

### `wallet_invokeSnap`

::: warning Only Callable By

- Websites
  :::

#### Parameters

```typescript
/**
 * This is a less stringent version of the JSON-RPC 2.0 request object
 * interface. Keep in mind that snaps specify and implement their own JSON-RPC
 * APIs, and may require the `id` and `jsonrpc` fields if they wish.
 */
interface SnapRequest {
  method: string;
  params?: unknown[] | Record<string, unknown>;
  id?: string | number;
  jsonrpc?: '2.0';
}
```

- `Array`

  0. `string` - The id of the snap to invoke.
  1. `SnapRequest` - The JSON-RPC request object to send to the invoked snap.

#### Returns

`unknown` - The result of the snap method call.

#### Description

Invokes the specified JSON-RPC method of the specified snap.
The snap must be installed and the caller must have the permission to communicate with the snap, or the request will be rejected.

Snaps are fully responsible for implementing their JSON-RPC API; consult the snap's documentation for available methods, their parameters, and return values.

#### Example

```javascript
const result = await ethereum.request({
  method: 'wallet_invokeSnap',
  params: [
    'npm:@metamask/example-snap',
    {
      method: 'hello',
    },
  ],
});

console.log(result); // We happen to know that this will be `true` or `false`
```

## Restricted Methods

If a method is _restricted_, it means that you need the requisite permission before you can call it.
Both snaps and dapps / websites can have permissions.
Some permissions are only available to snaps, and some are only available to websites.
See [here](./rpc-api.html#restricted-methods) for more information about the permission system.

### `wallet_snap_*`

::: warning Only Callable By

- Websites
  :::

::: warning Is this the method you're looking for?
[`wallet_invokeSnap`](#wallet-invokesnap) provides a more convenient way of calling this method.
:::

::: tip Namespaced Method
This is a namespaced restricted method.
The `*` in the name will always be substituted for a string, in this case a snap ID.
:::

#### Parameters

- `Array`

  0. `SnapRequest` - The JSON-RPC request object to send to the invoked snap.

#### Returns

`unknown` - The result of the snap method call.

#### Description

Invokes the specified JSON-RPC method of the snap corresponding to the specified permission name.
The snap must be installed and the caller must have the permission to communicate with the snap, or the request will be rejected.

Snaps are fully responsible for implementing their JSON-RPC API; consult the snap's documentation for available methods, their parameters, and return values.

#### Example

```javascript
const result = await ethereum.request({
  method: 'wallet_snap_npm:@metamask/example-snap',
  params: [
    {
      method: 'hello',
    },
  ],
});

console.log(result); // We happen to know that this will be `true` or `false`
```

### `snap_confirm`

::: warning Only Callable By

- Snaps
  :::

#### Parameters

```typescript
interface SnapConfirmParam {
  /**
   * A prompt, phrased as a question, no greater than 40 characters long.
   */
  prompt: string;

  /**
   * A description, displayed with the prompt, no greater than 140 characters
   * long.
   */
  description?: string;

  /**
   * Free-from text content, no greater than 1800 characters long.
   * It will be displayed in monospace font in a scrollable text area.
   */
  textAreaContent?: string;
}
```

- `Array`

  0. `SnapConfirmParam` - An object containing the contents of the confirmation.

#### Returns

`boolean` - `true` if the user accepted the confirmation, and `false` otherwise.

#### Description

Calling this method causes a confirmation to be displayed in the MetaMask UI.
The contents of the confirmation depend on the parameters, see above for their meaning and format.
The user can either approve or reject the confirmation, which will be indicated by the method's return value.

#### Example

```javascript
const result = await wallet.request({
  method: 'snap_confirm',
  params: [
    {
      prompt: 'Would you like to take the action?',
      description: 'The action is...',
      textAreaContent: 'Very detailed information about the action...',
    },
  ],
});

if (result === true) {
  // Take the action
} else {
  // Do not take the action
}
```

### `snap_getBip44Entropy_*`

::: danger Powerful Method
If you call this method, you will receive the user's parent key for the protocol that they requested.
When that happens, you are now managing a person's keys, and whatever assets they control, on their behalf.
Their safety is your responsibility.
:::

::: warning Only Callable By

- Snaps
  :::

::: tip Namespaced Method
This is a namespaced restricted method.
The `*` in the name will always be substituted for a string, in this case a BIP-44 `coin_type` number.
:::

#### Returns

```typescript
interface BIP44CoinTypeNode {
  /**
   * The BIP-44 `coin_type` value of this node.
   */
  readonly coin_type: number;

  /**
   * The 0-indexed BIP-44 path depth of this node.
   *
   * Since this is a `coin_type` node, it will be the number `2`.
   */
  readonly depth: 2;

  /**
   * The hexadecimal-encoded string representation of the private key for this node.
   */
  readonly privateKey: string;

  /**
   * The hexadecimal-encoded string representation of the public key for this node.
   */
  readonly publicKey: string;

  /**
   * The hexadecimal-encoded string representation of the chain code for this node.
   */
  readonly chainCode: string;

  /**
   * A human-readable representation of the BIP-44 HD tree path of this node.
   *
   * Since this is a `coin_type` node, it will be of the form:
   *
   * `m / 44' / coin_type'`
   *
   * Recall that a complete BIP-44 HD tree path consists of the following nodes:
   *
   * `m / 44' / coin_type' / account' / change / address_index`
   *
   * With the following depths:
   *
   * `0 / 1 / 2 / 3 / 4 / 5`
   */
  readonly path: string;
}
```

`BIP44CoinTypeNode` - An object representing the [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) `coin_type` HD Tree node and containing its corresponding key material.

#### Description

Gets the [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) `coin_type` key for the `coin_type` number specified by the method name.
This is the "key management" permission of Snaps; use it with the utmost care.
For the authoritative list of available protocols and their `coin_type` values, see [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md).

This restricted method is both implemented and designed to be used with [`@metamask/key-tree`](https://npmjs.com/package/@metamask/key-tree).
See the `@metamask/key-tree` documentation and below example for more information.

Note that `@metamask/key-tree` can help you get the [extended private keys](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#extended-keys) for user addresses, but it is your responsibility to know how to use those keys to e.g. derive an address for the relevant protocol or sign a transaction for the user.

#### Example

```javascript
import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';

// By way of example, we will use Dogecoin, which has `coin_type` 3.
const dogecoinNode = await wallet.request({
  method: 'snap_getBip44Entropy_3',
});

// Next, we'll create an address key deriver function for the Dogecoin coin_type node.
// In this case, its path will be: m / 44' / 3' / 0' / 0 / address_index
const deriveDogecoinAddress = await getBIP44AddressKeyDeriver(dogecoinNode);

// These are BIP-44 nodes containing the extended private keys for
// the respective derivation paths.

// m / 44' / 3' / 0' / 0 / 0
const addressKey0 = await deriveDogecoinAddress(0);

// m / 44' / 3' / 0' / 0 / 1
const addressKey1 = await deriveDogecoinAddress(1);

// Now, you can ask the user to e.g. sign transactions!
```

### `snap_manageState`

::: warning Only Callable By

- Snaps
  :::

#### Parameters

- `Array`

  0. `'clear' | 'get' | 'update'` - The state operation to perform.
  1. `Record<string, unknown> | void` - The value to update state with if the operation is `update`, and nothing otherwise.

#### Returns

`null | Record<string, unknown>` - The value stored in state of the operation is `get`, and `null` otherwise.

#### Description

This method allows the snap to persist some data to disk and retrieve it at will.
The data is automatically encrypted using a snap-specific key and automatically decrypted when retrieved.

#### Example

```javascript
// First, let's persist some data
await wallet.request({
  method: 'snap_manageState',
  params: ['update', { hello: 'world' }],
});

// Then, at some later time, let's get the data we stored
const persistedData = await wallet.request({
  method: 'snap_manageState',
  params: ['get'],
});

console.log(persistedData);
// { hello: 'world' }

// Finally, if there's no need to store data anymore, we can clear it out
await wallet.request({
  method: 'snap_manageState',
  params: ['clear'],
});
```

### `snap_notify`

::: warning Only Callable By

- Snaps
  :::

#### Parameters

```typescript
interface SnapNotifyParams {
  /**
   * Enum determining the notification type.
   */
  type: NotificationType;

  /**
   * A message to show in the notification.
   */
  message: string;
}
```

- `Array`

  0. `SnapNotifyParams` - An object containing the contents of the notification.

#### Notification Type

```typescript
enum NotificationType {
  /**
   * A notification displayed in the MetaMask UI.
   */
  inApp = 'inApp',

  /**
   * A notification displayed in and by the browser. There is no guarantee that
   * these will be displayed to the user, and we recommend using `inApp`
   * notifications unless you have a compelling reason not to.
   */
  native = 'native',
}
```

#### Returns

`null` - This method doesn't return any data.

#### Description

Calling this method displays a notification in MetaMask or natively in the browser.
The notification type and content are determined by the method's parameters.
See above for their meaning and format.

#### Example

```javascript
await wallet.request({
  method: 'snap_notify',
  params: [
    {
      type: 'inApp',
      message: `Hello, world!`,
    },
  ],
});
```
