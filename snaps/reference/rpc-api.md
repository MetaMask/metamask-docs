import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Snaps JSON-RPC API

Snaps communicate with MetaMask using the Snaps JSON-RPC API.
These API methods allow snaps to modify the functionality of MetaMask, and websites to install and
communicate with individual snaps.

## Unrestricted methods

### `wallet_enable`

:::note
This method is only callable by websites.
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

`WalletEnableResult` - An object containing the requester's permitted Ethereum accounts, snaps, and
granted permissions.

#### Description

This is a convenience method for requesting the user's accounts and connecting to and installing snaps.
You can think of it as a combination of
[`eth_requestAccounts`](../../wallet/reference/rpc-api#eth_requestaccounts),
[`wallet_installSnaps`](#wallet_installsnaps), and
[`wallet_requestPermissions`](../../wallet/reference/rpc-api#wallet_requestpermissions).

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

:::note
This method is only callable by websites.
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

:::note
This method is only callable by websites.
:::

:::tip
This method only installs the requested snaps if the caller is permitted to do so.
You might want to use [`wallet_enable`](#wallet_enable) instead, which both requests the
permissions for the snaps _and_ installs them.
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

`WalletInstallSnapsResult` - An object mapping the IDs of installed snaps to their metadata, or an
error if installation fails.

#### Description

This method attempts to install the requested snaps, if they're permitted.
If the installation of any snap fails, its object value on the result contains an `error`
property with the error that caused the installation to fail.

Optionally, you can specify a [SemVer range](https://www.npmjs.com/package/semver) for any snap to
be installed.
If you do so, MetaMask attempts to install a version of the snap that satisfies the requested range.
If a compatible version of a snap is already installed, the request to install that snap
automatically succeeds.
If an incompatible version is installed, MetaMask attempts to update the snap to the latest
version that satisfies the requested range.
The request succeeds if the snap is successfully updated, and fails if the update can't be completed.

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

:::note
This method is only callable by websites.
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

  0. `string` - The ID of the snap to invoke.
  1. `SnapRequest` - The JSON-RPC request object to send to the invoked snap.

#### Returns

`unknown` - The result of the snap method call.

#### Description

Invokes the specified JSON-RPC method of the specified snap.
The snap must be installed and the caller must have the permission to communicate with the snap, or
the request is rejected.

Snaps are fully responsible for implementing their JSON-RPC API.
Consult the snap's documentation for available methods, their parameters, and return values.

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

## Restricted methods

If a method is _restricted_, you must [request permission](../how-to/request-permissions.md) before
you can call it.
Both snaps and dapps/websites can have permissions.
Some permissions are only available to snaps, and some are only available to websites.

### `wallet_snap_*`

:::note
This method is only callable by websites.
:::

:::tip
[`wallet_invokeSnap`](#wallet_invokesnap) provides a more convenient way of calling this method.
:::

:::tip
This is a namespaced restricted method.
The `*` in the name is always substituted for a string, in this case a snap ID.
:::

#### Parameters

- `Array`

  0. `SnapRequest` - The JSON-RPC request object to send to the invoked snap.

#### Returns

`unknown` - The result of the snap method call.

#### Description

Invokes the specified JSON-RPC method of the snap corresponding to the specified permission name.
The snap must be installed and the caller must have the permission to communicate with the snap, or
the request is rejected.

Snaps are fully responsible for implementing their JSON-RPC API.
Consult the snap's documentation for available methods, their parameters, and return values.

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

:::note
This method is only callable by snaps.
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
The contents of the confirmation depend on the parameters.
The user can either approve or reject the confirmation, which is indicated by the method's return value.

Use this method to show a MetaMask popup with custom text and buttons to approve or reject an action.
You can use this to create requests, confirmations, and opt-in flows for a snap.

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

### `snap_dialog`

:::note
This method is only callable by snaps.
:::

#### Description

Calling this method causes a dialog to be displayed in the MetaMask UI.
There are three types of dialogs: [alert](#alert-dialog), [confirmation](#confirmation-dialog), and
[prompt](#prompt-dialog).
Each of these dialog types has different parameters and return types.

##### Alert dialog

Displays an alert that can only be acknowledged.

###### Parameters

```typescript
interface SnapAlertDialogParam {
  /**
   * The alert title, no greater than 40 characters long.
   */
  title: string;

  /**
   * A description, displayed with the title, no greater
   * than 140 characters long.
   */
  description?: string;

  /**
   * Free-from text content, no greater than 1800
   * characters long.
   */
  textAreaContent?: string;
}
```

- `Array`

  0. `SnapAlertDialogParam` - An object containing the contents of the alert dialog.

###### Returns

`null`

###### Example

```javascript
await wallet.request({
  method: 'snap_dialog',
  params: [
    {
      type: DialogType.Alert,
      title: 'Something happened in the system',
      description: 'The thing that happened is...',
      textAreaContent: 'Very detailed information about the thing that happened...',
    },
  ],
});

// Code that should execute after the alert has been acknowledged
```

##### Confirmation dialog

Displays a confirmation dialog that can be accepted or rejected.

###### Parameters

```typescript
interface SnapConfirmationDialogParam {
  /**
   * The confirmation title, no greater than 40 characters long.
   */
  title: string;

  /**
   * A description, displayed with the title, no greater
   * than 140 characters long.
   */
  description?: string;

  /**
   * Free-from text content, no greater than 1800
   * characters long.
   */
  textAreaContent?: string;
}
```

- `Array`

  0. `SnapConfirmationDialogParam` - An object containing the contents of the confirmation dialog.

###### Returns

`boolean` - `true` if the confirmation was accepted, `false` otherwise.

###### Example

```javascript
const result = await wallet.request({
  method: 'snap_dialog',
  params: [
    {
      type: DialogType.Confirmation,
      title: 'Would you like to take the action?',
      description: 'The action is...',
      textAreaContent: 'Very detailed information about the action...',
    },
  ],
});

if (result === true) {
  // Replace the batteries
} else {
  // Don't replace the batteries
}
```

##### Prompt Dialog

Displays a prompt where the user can enter a text response.

###### Parameters

```typescript
interface SnapPromptDialogParam {
  /**
   * The prompt title, no greater than 40 characters long.
   */
  title: string;

  /**
   * A description, displayed with the title, no greater
   * than 140 characters long.
   */
  description?: string;
}
```

- `Array`

  0. `SnapPromptDialogParam` - An object containing the contents of the prompt dialog.

###### Returns

`string` - The text entered by the user.

###### Example

```javascript
const walletAddress = await wallet.request({
  method: 'snap_dialog',
  params: [
    {
      type: DialogType.Prompt,
      title: 'What is the wallet address?',
      description: 'Please enter the wallet address to be monitored...',
    },
  ],
});

// `walletAddress` will be a string containing the address entered by the user
```

### `snap_getBip32Entropy`

:::danger
If you call this method, you receive the user's parent key for the derivation path they requested.
You're then managing a person's keys, and whatever assets they control, on their behalf.
Their safety is your responsibility.
:::

:::note
This method is only callable by snaps.
:::

#### Parameters

- `Object`
  - `path` - An array, starting with `m`, containing the BIP-32 derivation path to the key to
    retrieve, for example, `["m", "44'", "60'"]`.
  - `curve` - The curve to use for the key derivation, must be `'ed25519'` or `'secp256k1'`.

#### Returns

```typescript
interface SLIP10Node {
  /**
   * The 0-indexed path depth of this node.
   */
  readonly depth: number;

  /**
   * The fingerprint of the parent key, or 0 if this is a master node.
   */
  readonly parentFingerprint: number;

  /**
   * The index of the node, or 0 if this is a master node.
   */
  readonly index: number;

  /**
   * The private key of this node.
   */
  readonly privateKey: string;

  /**
   * The public key of this node.
   */
  readonly publicKey: string;

  /**
   * The chain code of this node.
   */
  readonly chainCode: string;

  /**
   * The name of the curve used by the node.
   */
  readonly curve: 'ed25519' | 'secp256k1';
}
```

`SLIP10Node` - An object representing the
[SLIP-10](https://github.com/satoshilabs/slips/blob/master/slip-0010.md) HD tree node and containing
its corresponding key material.

#### Description

Gets the [SLIP-10](https://github.com/satoshilabs/slips/blob/master/slip-0010.md) key for the `path`
and `curve` specified by the method name.
This is the "key management" permission of Snaps; use it with the utmost care.

This restricted method is both implemented and designed to be used with
[`@metamask/key-tree`](https://npmjs.com/package/@metamask/key-tree).
See the `@metamask/key-tree` documentation and below example for more information.

Note that `@metamask/key-tree` can help you get the
[extended private keys](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#extended-keys)
for user addresses, but it is your responsibility to know how to use those keys to, for example,
derive an address for the relevant protocol or sign a transaction for the user.

#### Example

<Tabs>
<TabItem value="manifest" label="Manifest">

```json
{
  "initialPermissions": {
    "snap_getBip32Entropy": [
      {
        "path": ["m", "44'", "3'"],
        "curve": "secp256k1" // Or "ed25519"
      }
    ]
  }
}
```

</TabItem>
<TabItem value="code" label="Code">

```javascript
import { SLIP10Node } from '@metamask/key-tree';

// By way of example, we will use Dogecoin, which has a derivation path starting
// with `m/44'/3'`.
const dogecoinNode = await wallet.request({
  method: 'snap_getBip32Entropy',
  params: {
    // Must be specified exactly in the manifest
    path: ['m', "44'", "3'"],
    curve: 'secp256k1',
  },
});

// Next, we'll create an instance of a SLIP-10 node for the Dogecoin node.
const dogecoinSlip10Node = await SLIP10Node.fromJson(dogecoinNode);

// m / 44' / 3' / 0'
const accountKey0 = await dogecoinSlip10Node.derive(["bip32:0'"]);

// m / 44' / 3' / 1'
const accountKey1 = await dogecoinSlip10Node.derive(["bip32:1'"]);

// Now, you can ask the user to e.g. sign transactions!
```

</TabItem>
</Tabs>

### `snap_getBip44Entropy`

:::danger
If you call this method, you receive the user's parent key for the protocol they requested.
You're then managing a person's keys, and whatever assets they control, on their behalf.
Their safety is your responsibility.
:::

:::note
This method is only callable by snaps.
:::

#### Parameters

- `Object`
  - `coinType` (`number`) - The BIP-44 coin type to get the entropy for.

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

`BIP44CoinTypeNode` - An object representing the
[BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) `coin_type` HD tree node
and containing its corresponding key material.

#### Description

Gets the [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) `coin_type` key
for the `coin_type` number specified by the method name.
This is the "key management" permission of Snaps; use it with the utmost care.
For the authoritative list of available protocols and their `coin_type` values, see
[SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md).

This restricted method is both implemented and designed to be used with
[`@metamask/key-tree`](https://npmjs.com/package/@metamask/key-tree).
See the `@metamask/key-tree` documentation and below example for more information.

Note that `@metamask/key-tree` can help you get the
[extended private keys](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#extended-keys)
for user addresses, but it is your responsibility to know how to use those keys to, for example,
derive an address for the relevant protocol or sign a transaction for the user.

#### Example

<Tabs>
<TabItem value="manifest" label="Manifest">

```json
{
  "initialPermissions": {
    "snap_getBip44Entropy": [
      {
        "coinType": 3
      }
    ]
  }
}
```

</TabItem>
<TabItem value="code" label="Code">

```javascript
import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';

// By way of example, we will use Dogecoin, which has `coin_type` 3.
const dogecoinNode = await wallet.request({
  method: 'snap_getBip44Entropy',
  params: {
    coinType: 3,
  },
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

</TabItem>
</Tabs>

### `snap_getBip32PublicKey`

:::note
This method is only callable by snaps.
:::

#### Parameters

- `Object`
  - `path` - An array, starting with `m`, containing the BIP-32 derivation path to the public key to
    retrieve, for example, `["m", "44'", "60'"]`.
  - `curve` - The curve to use for the key derivation, must be `'ed25519'` or `'secp256k1'`.
  - `compressed` - Indicates whether the public key should be compressed.
    The default is `false`.

#### Returns

The public key as hexadecimal `string`.

#### Description

Gets the [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) public key for the
derivation path specified by the `path` parameter.

Note that this returns the public key, not the extended public key (`xpub`), or Ethereum address.

#### Example

<Tabs>
<TabItem value="manifest" label="Manifest">

```json
{
  "initialPermissions": {
    "snap_getBip32PublicKey": [
      {
        "path": ["m", "44'", "3'", "0'", "0", "0"],
        "curve": "secp256k1" // Or "ed25519"
      }
    ]
  }
}
```

</TabItem>
<TabItem value="code" label="Code">

```javascript
// By way of example, we will use Dogecoin, which has a derivation path starting
// with `m/44'/3'`.
const dogecoinPublicKey = await wallet.request({
  method: 'snap_getBip32PublicKey',
  params: {
    // The path and curve must be specified in the initial permissions.
    path: ['m', "44'", "3'", "0'", '0', '0'],
    curve: 'secp256k1',
    compressed: false,
  },
});

// `0x...`
console.log(dogecoinPublicKey);
```

</TabItem>
</Tabs>

### `snap_manageState`

:::note
This method is only callable by snaps.
:::

:::note
Snaps can currently use this method to store up to 100 MB of data.
:::

#### Parameters

- `Array`

  0. `'clear' | 'get' | 'update'` - The state operation to perform.
  1. `Record<string, unknown> | void` - The value to update state with if the operation is `update`,
     and nothing otherwise.

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

:::note
This method is only callable by snaps.
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

#### Notification type

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

This generic notifications interface can be used by any snap with the notifications permission.
A short notification text can be triggered by a snap for actionable or time sensitive information.

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
