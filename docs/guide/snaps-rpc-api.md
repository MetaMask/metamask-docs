# Snaps JSON-RPC API

::: tip Developer Preview Software
Snaps is pre-release software. To try Snaps, install [MetaMask Flask](https://metamask.io/flask).
:::

::: tip Feature Requests
Do you have feature requests? Other ideas? We'd love to hear about them! [Click here](https://github.com/MetaMask/snaps-monorepo/discussions) to join the discussion.
:::

## Table of Contents

[[toc]]

## Unrestricted Methods

### `wallet_requestSnaps`

::: warning Only Callable By

- Websites
  :::

#### Parameters

- `Object`

```typescript
interface RequestSnapsParams {
  [snapId: string]: {
    version?: string;
  };
}
```

#### Returns

```typescript
interface RequestSnapsResult {
  [snapId: string]: WalletGetSnapsResult[string];
}
```

`RequestSnapsResult` - An object mapping the IDs of installed snaps to their metadata or an error if installation failed.

#### Description

This method requests permission for a DApp to communicate with the given snaps and attempts to install them if they aren't already.
If the installation of any snap fails, `wallet_requestSnaps` will throw with the error that caused the installation to fail.

Optionally, you can specify a [SemVer range](https://www.npmjs.com/package/semver) for any snap to be installed.
If you do so, MetaMask will try to install a version of the snap that satisfies the requested range.
If a compatible version of a snap is already installed, the request to install that snap will automatically succeed.
If an incompatible version is installed, MetaMask will attempt to update the snap to the latest version that satisfies the requested range.
The request will succeed if the snap is successfully updated, and fail if the update could not be completed.

#### Example

```javascript
try {
  const result = await ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      'npm:@metamask/example-snap': {},
      'npm:fooSnap': {
        // The optional version argument allows requesting a SemVer version
        // range, with the same semantics as npm package.json ranges.
        version: '^1.0.2',
      },
    },
  });

  console.log(result);
  // Will print something of the form:
  // {
  //   'npm:@metamask/example-snap': {
  //     version: '1.0.0',
  //     permissionName: 'wallet_snap_npm:@metamask/example-snap',
  //     ...
  //   },
  //   'npm:fooSnap': {
  //     version: '1.0.5',
  //     permissionName: 'wallet_snap_npm:fooSnap',
  //     ...
  //   },
  // }
} catch (error) {
  console.log(error);
  // Will print something of the form:
  // {
  //    message: 'The snap does not exist.'
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

- `Object`
  - `snapId` - `string` - The id of the snap to invoke.
  - `request` - `SnapRequest` - The JSON-RPC request object to send to the invoked snap.

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
  params: {
    snapId: 'npm:@metamask/example-snap',
    request: {
      method: 'hello',
    },
  },
});

console.log(result); // We happen to know that this will be `true` or `false`
```

## Restricted Methods

If a method is _restricted_, it means that you need the requisite permission before you can call it.
Both snaps and Dapps / websites can have permissions.
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

- `Object` (`SnapRequest`)
  - The JSON-RPC request object to send to the invoked snap.

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
  params: {
    method: 'hello',
  },
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
const result = await snap.request({
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

::: warning Only Callable By

- Snaps
  :::

#### Description

Calling this method causes a dialog to be displayed in the MetaMask UI.
There are three types of dialogs: Alert, Confirmation, and Prompt.
Each of these dialog types has different parameters and return types, detailed below.

#### The `Component` type

The `Component` type, used as the `content` property for dialogs, is [defined in source code](https://github.com/MetaMask/snaps-monorepo/blob/main/packages/snaps-ui/src/nodes.ts#L171) as:

```typescript
type Component = Infer<typeof ComponentStruct>;
```

By itself this is opaque. A simple way to understand it is as the return type of the UI functions exported from the `@metamask/snaps-ui` package, i.e. `heading`, `panel`, `text`, and other UI functions.

#### Alert Dialog

Displays an alert that can only be acknowledged.

##### Parameters

```typescript
interface SnapAlertDialogParam {
  /**
   * The type of the dialog.
   */
  type: 'Alert';

  /**
   * The content of the alert, as a Custom UI component
   */
  content: Component;
}
```

##### Returns

`null`

##### Example

```typescript
import { panel, text, heading } from '@metamask/snaps-ui';

await snap.request({
  method: 'snap_dialog',
  params: {
    type: 'Alert',
    content: panel([
      heading('Something happened in the system'),
      text('The thing that happened is...'),
    ]),
  },
});

// Code that should execute after the alert has been acknowledged
```

#### Confirmation Dialog

Displays a confirmation dialog that can be accepted or rejected.

##### Parameters

```typescript
interface SnapConfirmationDialogParam {
  /**
   * The type of the dialog.
   */
  type: 'Confirmation';

  /**
   * The content of the confirmation, as a Custom UI component
   */
  content: Component;
}
```

##### Returns

`boolean` - `true` if the confirmation was accepted, `false` otherwise.

##### Example

```typescript
import { panel, text, heading } from '@metamask/snaps-ui';

const result = await snap.request({
  method: 'snap_dialog',
  params: {
    type: 'Confirmation',
    content: panel([
      heading('Would you like to take the action?'),
      text('The action is...'),
    ]),
  },
});

if (result === true) {
  // Do the action
}
```

#### Prompt Dialog

Displays a prompt where the user can enter a text response.

##### Parameters

```typescript
interface SnapPromptDialogParam {
  /**
   * The type of the dialog.
   */
  type: 'Prompt';

  /**
   * The content of the prompt, as a Custom UI component.
   */
  content: Component;

  /**
   * Text that will be in the input field when nothing is typed.
   */
  placeholder: string;
}
```

##### Returns

`string` - The text entered by the user.

##### Example

```typescript
import { panel, text, heading } from '@metamask/snaps-ui';

const walletAddress = await snap.request({
  method: 'snap_dialog',
  params: {
    type: 'Prompt',
    content: panel([
      heading('What is the wallet address?'),
      text('Please enter the wallet address to be monitored'),
    ]),
    placeholder: '0x123...',
  },
});

// `walletAddress` will be a string containing the address entered by the user
```

### `snap_getBip32Entropy`

::: danger Powerful Method
If you call this method, you will receive the user's parent key for the derivation path that they requested.
When that happens, you are now managing a person's keys, and whatever assets they control, on their behalf.
Their safety is your responsibility.
:::

::: warning Only Callable By

- Snaps
  :::

#### Parameters

- `Object`
  - `path` - An array, starting with `m`, containing the BIP-32 derivation path to the key to retrieve, e.g., `["m", "44'", "60'"]`.
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

`SLIP10Node` - An object representing the [SLIP-10](https://github.com/satoshilabs/slips/blob/master/slip-0010.md) HD Tree node and containing its corresponding key material.

#### Description

Gets the [SLIP-10](https://github.com/satoshilabs/slips/blob/master/slip-0010.md) key for the `path` and `curve` specified by the method name.
This is the "key management" permission of Snaps; use it with the utmost care.

This restricted method is both implemented and designed to be used with [`@metamask/key-tree`](https://npmjs.com/package/@metamask/key-tree).
See the `@metamask/key-tree` documentation and below example for more information.

Note that `@metamask/key-tree` can help you get the [extended private keys](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#extended-keys) for user addresses, but it is your responsibility to know how to use those keys to e.g. derive an address for the relevant protocol or sign a transaction for the user.

#### Example

:::: tabs :options="{ useUrlFragment: false }"

::: tab Manifest

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

:::

::: tab Code

```javascript
import { SLIP10Node } from '@metamask/key-tree';

// By way of example, we will use Dogecoin, which has a derivation path starting
// with `m/44'/3'`.
const dogecoinNode = await snap.request({
  method: 'snap_getBip32Entropy',
  params: {
    // Must be specified exactly in the manifest
    path: ['m', "44'", "3'"],
    curve: 'secp256k1',
  },
});

// Next, we'll create an instance of a SLIP-10 node for the Dogecoin node.
const dogecoinSlip10Node = await SLIP10Node.fromJSON(dogecoinNode);

// m / 44' / 3' / 0'
const accountKey0 = await dogecoinSlip10Node.derive(["bip32:0'"]);

// m / 44' / 3' / 1'
const accountKey1 = await dogecoinSlip10Node.derive(["bip32:1'"]);

// Now, you can ask the user to e.g. sign transactions!
```

:::

::::

### `snap_getBip44Entropy`

::: danger Powerful Method
If you call this method, you will receive the user's parent key for the protocol that they requested.
When that happens, you are now managing a person's keys, and whatever assets they control, on their behalf.
Their safety is your responsibility.
:::

::: warning Only Callable By

- Snaps
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

`BIP44CoinTypeNode` - An object representing the [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) `coin_type` HD Tree node and containing its corresponding key material.

#### Description

Gets the [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) `coin_type` key for the `coin_type` number specified by the method name.
This is the "key management" permission of Snaps; use it with the utmost care.
For the authoritative list of available protocols and their `coin_type` values, see [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md).

This restricted method is both implemented and designed to be used with [`@metamask/key-tree`](https://npmjs.com/package/@metamask/key-tree).
See the `@metamask/key-tree` documentation and below example for more information.

Note that `@metamask/key-tree` can help you get the [extended private keys](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#extended-keys) for user addresses, but it is your responsibility to know how to use those keys to e.g. derive an address for the relevant protocol or sign a transaction for the user.

#### Example

:::: tabs :options="{ useUrlFragment: false }"

::: tab Manifest

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

:::

::: tab Code

```javascript
import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';

// By way of example, we will use Dogecoin, which has `coin_type` 3.
const dogecoinNode = await snap.request({
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

:::

::::

### `snap_getBip32PublicKey`

::: warning Only Callable By

- Snaps
  :::

#### Parameters

- `Object`
  - `path` - An array, starting with `m`, containing the BIP-32 derivation path to the public key to retrieve, e.g., `["m", "44'", "60'"]`.
  - `curve` - The curve to use for the key derivation, must be `'ed25519'` or `'secp256k1'`.
  - `compressed` - Whether the public key should be compressed. Defaults to `false`.

#### Returns

The public key as hexadecimal `string`.

#### Description

Gets the [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) public key for the derivation path
specified by the `path` parameter.

Note that this returns the public key, not the extended public key (`xpub`), or (Ethereum) address.

#### Example

:::: tabs :options="{ useUrlFragment: false }"

::: tab Manifest

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

:::

::: tab Code

```javascript
// By way of example, we will use Dogecoin, which has a derivation path starting
// with `m/44'/3'`.
const dogecoinPublicKey = await snap.request({
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

:::

::::

### `snap_getEntropy`

::: warning Only Callable By

- Snaps
  :::

#### Parameters

- `Object`
  - `version` - The literal number `1`. This is reserved for future use.
  - `salt` - An arbitrary string to be used as a salt for the entropy. This can be used to generate different entropy
    for different purposes.

#### Returns

The entropy as hexadecimal `string`.

#### Description

Gets a deterministic 256-bit entropy value, which is specific to the Snap and the user's account. This entropy can be
used to generate a private key, or any other value that requires a high level of randomness. Other Snaps will not be
able to access this entropy, and it will change if the user's secret recovery phrase changes.

This value is deterministic, meaning that it will always be the same for the same Snap, user account, and salt.

You can optionally specify a salt to generate different entropy for different purposes. Using a salt will result in
completely different entropy, that is unrelated to the entropy generated without a salt.

#### Example

:::: tabs :options="{ useUrlFragment: false }"

::: tab Manifest

```json
{
  "initialPermissions": {
    "snap_getEntropy": {}
  }
}
```

:::

::: tab Code

```javascript
const entropy = await snap.request({
  method: 'snap_getEntropy',
  params: {
    version: 1,
    salt: 'foo', // Optional
  },
});

// `0x...`
console.log(entropy);
```

:::

::::

### `snap_manageState`

::: warning Only Callable By

- Snaps
  :::

::: tip Storage Limit
Snaps can currently use this RPC method to store up to 100MB of data.
:::

#### Parameters

- `Object`
  - `operation` - `'clear' | 'get' | 'update'` - The state operation to perform.
  - `newState` - `Record<string, unknown> | void` - The value to update state with if the operation is `update`, and nothing otherwise.

#### Returns

`null | Record<string, unknown>` - The value stored in state of the operation is `get`, and `null` otherwise.

#### Description

This method allows the snap to persist some data to disk and retrieve it at will.
The data is automatically encrypted using a snap-specific key and automatically decrypted when retrieved.

#### Example

```javascript
// First, let's persist some data
await snap.request({
  method: 'snap_manageState',
  params: { operation: 'update', newState: { hello: 'world' } },
});

// Then, at some later time, let's get the data we stored
const persistedData = await snap.request({
  method: 'snap_manageState',
  params: { operation: 'get' },
});

console.log(persistedData);
// { hello: 'world' }

// Finally, if there's no need to store data anymore, we can clear it out
await snap.request({
  method: 'snap_manageState',
  params: { operation: 'clear' },
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

- `Object` (`SnapNotifyParams`) - An object containing the contents of the notification.
  - `type` - `'native' | 'inApp'` - Notification type to be used.
  - `message` - Message to be displayed.

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
await snap.request({
  method: 'snap_notify',
  params: {
    type: 'inApp',
    message: `Hello, world!`,
  },
});
```
