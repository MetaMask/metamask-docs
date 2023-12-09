---
description: Snaps JSON-RPC API reference
sidebar_position: 1
---

# Snaps JSON-RPC API

Snaps communicate with MetaMask using the Snaps JSON-RPC API.
These API methods allow Snaps to modify the functionality of MetaMask, and websites (dapps) to
install and communicate with individual Snaps.
Some methods are only callable by Snaps, and some are only callable by websites.

## Unrestricted methods

You can call unrestricted methods without requesting permission to do so.

### wallet_getSnaps

Returns the IDs of the caller's permitted Snaps and some relevant metadata.

This method is only callable by websites.

#### Returns

An object containing the requester's permitted Snaps.
Each Snap is an object containing:

- `id` - The ID of the Snap.
- `initialPermissions` - The initial permissions of the Snap, which will be requested when the Snap
  is installed.
- `version` - The version of the Snap.
- `enabled` - `true` if the Snap is enabled, `false` otherwise.
- `blocked` - `true` if the Snap is blocked, `false` otherwise.

#### Example

<!--tabs-->

# JavaScript

```javascript
const result = await window.ethereum.request({ method: 'wallet_getSnaps' });

console.log(result);
```

# Result

```javascript
// Example result if any Snaps are permitted
{
  'npm:@metamask/example-snap': {
    version: '1.0.0',
    id: 'npm:@metamask/example-snap',
    enabled: true,
    blocked: false,
  },
}
```

<!--/tabs-->

### wallet_requestSnaps

Requests permission for a website to communicate with the specified Snaps and attempts to install
them if they're not already installed.
If the installation of any Snap fails, returns the error that caused the failure.

You can optionally specify a [SemVer range](https://www.npmjs.com/package/semver) for a Snap.
MetaMask attempts to install a version of the Snap that satisfies the requested range.
If a compatible version of a Snap is already installed, the request succeeds.
If an incompatible version is installed, MetaMask attempts to update the Snap to the latest version
that satisfies the requested range.
The request succeeds if the Snap is successfully updated.

This method is only callable by websites.

#### Parameters

An object containing the Snaps to request permission to communicate with.

#### Returns

An object mapping the IDs of installed Snaps to either their metadata or an error if installation fails.

#### Example

<!--tabs-->

# JavaScript

```javascript
try {
  const result = await window.ethereum.request({
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

} catch (error) {
  console.log(error);
}
```

# Result

```javascript
{
  'npm:@metamask/example-snap': {
    version: '1.0.0',
    id: 'npm:@metamask/example-snap',
    enabled: true,
    blocked: false,
  },
  'npm:fooSnap': {
    version: '1.0.5',
    id: 'npm:fooSnap',
    enabled: true,
    blocked: false,
  },
}
```

<!--/tabs-->

## Restricted methods

For restricted methods callable by Snaps, a Snap must request permission to call the method in the
[snap manifest file](../how-to/request-permissions.md).
For restricted methods callable by websites, a website must request permission to call the method using
[`wallet_requestPermissions`](/wallet/reference/rpc-api/#wallet_requestpermissions).

### snap_dialog

Displays a dialog in the MetaMask UI.
There are three types of dialogs with different parameters and return types:

- [Alert](#alert-dialog)
- [Confirmation](#confirmation-dialog)
- [Prompt](#prompt-dialog)

This method is only callable by Snaps.

#### Alert dialog

Displays an alert that can only be acknowledged.

##### Parameters

An object containing the contents of the alert dialog:

- `type` - The type of dialog (`'Alert'`).
- `content` - The content of the alert, as a [custom UI](../how-to/use-custom-ui.md) component.

##### Example

```javascript
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

#### Confirmation dialog

Displays a confirmation that can be accepted or rejected.

##### Parameters

An object containing the contents of the confirmation dialog:

- `type` - The type of dialog (`'Confirmation'`).
- `content` - The content of the confirmation, as a [custom UI](../how-to/use-custom-ui.md) component.

##### Returns

`true` if the confirmation was accepted, `false` otherwise.

##### Example

```javascript
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

#### Prompt dialog

Displays a prompt where the user can enter a text response.

##### Parameters

An object containing the contents of the prompt dialog:

- `type` - The type of dialog (`'Prompt'`).
- `content` - The content of the prompt, as a [custom UI](../how-to/use-custom-ui.md) component.
- `placeholder` - Text that will be in the input field when nothing is typed.

##### Returns

The text entered by the user if the prompt was submitted or `null` if the prompt was rejected or closed. If the user does not enter any text and submits the prompt, the value is an empty string.

##### Example

```javascript
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

### snap_getBip32Entropy

:::danger important
If you call this method, you receive the user's parent key for the derivation path they request.
You're managing the user's keys and assets on their behalf.
Their safety is your responsibility.
:::

Gets the [SLIP-10](https://github.com/satoshilabs/slips/blob/master/slip-0010.md) key for the `path`
and `curve` specified by the method name.

This method is designed to be used with the
[`@metamask/key-tree`](https://npmjs.com/package/@metamask/key-tree) module.
`@metamask/key-tree` can help you get the
[extended private keys](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#extended-keys)
for user addresses, but it's your responsibility to know how to use those keys to, for example,
derive an address for the relevant protocol or sign a transaction for the user.

This method is only callable by Snaps.

#### Parameters

An object containing:

- `path` - An array, starting with `m`, containing the BIP-32 derivation path to the key to
  retrieve.
  For example, `["m", "44'", "60'"]`.
- `curve` - The curve to use for the key derivation.
  Must be `'ed25519'` or `'secp256k1'`.

#### Returns

An object representing the
[SLIP-10](https://github.com/satoshilabs/slips/blob/master/slip-0010.md) HD tree node and containing
its corresponding key material:

- `depth` - The 0-indexed path depth of the node.
- `parentFingerprint` - The fingerprint of the parent key, or 0 if this is a master node.
- `index` - The index of the node, or 0 if this is a master node.
- `privateKey` - The private key of the node.
- `publicKey` - The public key of the node.
- `chainCode` - The chain code of the node.
- `curve` - The name of the curve used by the node: `'ed25519'` or `'secp256k1'`.

#### Example

<!--tabs-->

# Manifest file

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

# JavaScript

```javascript
import { SLIP10Node } from '@metamask/key-tree';

// This example uses Dogecoin, which has a derivation path starting with `m/44'/3'`.
const dogecoinNode = await snap.request({
  method: 'snap_getBip32Entropy',
  params: {
    // Must be specified exactly in the manifest
    path: ['m', "44'", "3'"],
    curve: 'secp256k1',
  },
});

// Next, create an instance of a SLIP-10 node for the Dogecoin node.
const dogecoinSlip10Node = await SLIP10Node.fromJSON(dogecoinNode);

// m / 44' / 3' / 0'
const accountKey0 = await dogecoinSlip10Node.derive(["bip32:0'"]);

// m / 44' / 3' / 1'
const accountKey1 = await dogecoinSlip10Node.derive(["bip32:1'"]);

// Now, you can ask the user to sign transactions, etc.
```

<!--/tabs-->

### snap_getBip32PublicKey

Gets the [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) public key for the
derivation path specified by the `path` parameter.
Note that this returns the public key, not the extended public key (`xpub`), or Ethereum address.

This method is only callable by Snaps.

#### Parameters

An object containing:

- `path` - An array, starting with `m`, containing the BIP-32 derivation path to the public key to
  retrieve.
  For example, `["m", "44'", "60'"]`.
- `curve` - The curve to use for the key derivation.
  Must be `'ed25519'` or `'secp256k1'`.
- `compressed` - Indicates whether the public key should be compressed.
  The default is `false`.

#### Returns

The public key as hexadecimal string.

#### Example

<!--tabs-->

# Manifest file

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

# JavaScript

```javascript
// This example uses Dogecoin, which has a derivation path starting with `m/44'/3'`.
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

<!--/tabs-->

### snap_getBip44Entropy

:::danger important
If you call this method, you receive the user's parent key for the protocol they request.
You're managing the user's keys and assets on their behalf.
Their safety is your responsibility.
:::

Gets the [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) `coin_type` key
for the `coin_type` number specified by the method name.
See [SLIP-44](https://github.com/satoshilabs/slips/blob/master/slip-0044.md) for the list of
available protocols and their `coin_type` values.

This method is designed to be used with the
[`@metamask/key-tree`](https://npmjs.com/package/@metamask/key-tree) module.
`@metamask/key-tree` can help you get the
[extended private keys](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki#extended-keys)
for user addresses, but it's your responsibility to know how to use those keys to, for example,
derive an address for the relevant protocol or sign a transaction for the user.

This method is only callable by Snaps.

#### Parameters

An object containing `coinType`, the BIP-44 coin type to get the entropy for.

:::caution
Coin type 60 is reserved for MetaMask externally owned accounts and blocked for Snaps.
If you wish to connect to MetaMask accounts in a Snap, use
[`endowment:ethereum-provider`](../reference/permissions.md/#endowmentethereum-provider) and
[`eth_requestAccounts`](/wallet/reference/eth_requestAccounts).
:::

#### Returns

An object representing the
[BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) `coin_type` HD tree node
and containing its corresponding key material:

- `coin_type` - The BIP-44 [coin type](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)
  value of the node.
- `depth` - The 0-indexed BIP-44 path depth of the node.
  Since this is a `coin_type` node, the depth is `2`.
- `privateKey` - The hexadecimal-encoded string representation of the private key for the node.
- `publicKey` - The hexadecimal-encoded string representation of the public key for the node.
- `chainCode` - The hexadecimal-encoded string representation of the chain code for the node.
- `path` - A human-readable representation of the BIP-44 HD tree path of the node.
  Since this is a `coin_type` node, the path is of the form `m / 44' / coin_type'`.

#### Example

<!--tabs-->

# Manifest file

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

# JavaScript

```javascript
import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';

// This example uses Dogecoin, which has `coin_type` 3.
const dogecoinNode = await snap.request({
  method: 'snap_getBip44Entropy',
  params: {
    coinType: 3,
  },
});

// Next, create an address key deriver function for the Dogecoin coin_type node.
// In this case, its path is: m / 44' / 3' / 0' / 0 / address_index
const deriveDogecoinAddress = await getBIP44AddressKeyDeriver(dogecoinNode);

// These are BIP-44 nodes containing the extended private keys for
// the respective derivation paths.

// m / 44' / 3' / 0' / 0 / 0
const addressKey0 = await deriveDogecoinAddress(0);

// m / 44' / 3' / 0' / 0 / 1
const addressKey1 = await deriveDogecoinAddress(1);

// Now, you can ask the user to sign transactions, etc.
```

<!--/tabs-->

### snap_getEntropy

Gets a deterministic 256-bit entropy value, specific to the Snap and the user's account.
You can use this entropy to generate a private key, or any other value that requires a high level of
randomness.
Other Snaps can't access this entropy, and it changes if the user's secret recovery phrase changes.

You can optionally specify a salt to generate different entropy for different purposes.
Using a salt results in entropy unrelated to the entropy generated without a salt.

This value is deterministic: it's always the same for the same Snap, user account, and salt.

This method is only callable by Snaps.

#### Parameters

An object containing:

- `version` - The number `1`.
  This is reserved for future use.
- `salt` (optional) - An arbitrary string to be used as a salt for the entropy.
  This can be used to generate different entropy for different purposes.

#### Returns

The entropy as a hexadecimal string.

#### Example

<!--tabs-->

# Manifest file

```json
{
  "initialPermissions": {
    "snap_getEntropy": {}
  }
}
```

# JavaScript

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

<!--/tabs-->

### snap_getLocale

:::flaskOnly
:::

Gets the user's locale setting. You can use this method to localize text in your snap.

#### Returns

The user's locale setting as a [language code](https://github.com/MetaMask/metamask-extension/blob/develop/app/_locales/index.json).

#### Example

```javascript
import { panel, text } from '@metamask/snaps-ui';

const locale = await snap.request({ method: 'snap_getLocale' });

let greeting = 'Hello';
if(locale === 'es') {
  greeting = 'Hola';
}

await snap.request({
  method: 'snap_dialog',
  params: {
    type: 'Alert',
    content: panel([
      text(greeting),
    ]),
  },
});
```

### snap_manageAccounts

:::flaskOnly
:::

Manages [Keyring Snap](../concepts/keyring-api.md) accounts.
This method is organized into multiple sub-methods which each take their own parameters:

- [`createAccount`](#createaccount)
- [`updateAccount`](#updateaccount)
- [`deleteAccount`](#deleteaccount)
- [`listAccounts`](#listaccounts)
- [`submitResponse`](#submitresponse)

This method is only callable by Snaps.

#### `createAccount`

Creates a new Snap account.

:::note
The Snap is responsible for maintaining its own record of accounts.
This can be done using [`snap_manageState`](#snap_managestate).
:::

##### Parameters

`account` - A [`KeyringAccount`](./keyring-api/variables/KeyringAccountStruct.md) object.

##### Returns

`null`

##### Example

```typescript
import { Keyring, KeyringAccount } from '@metamask/keyring-api';

class MyKeyring implements Keyring {
  // ... other methods

  async createAccount(
    name: string,
    options: Record<string, Json> | null = null,
  ): Promise<KeyringAccount> {

    const account: KeyringAccount = {
      id: uuid(),
      name,
      options,
      address,
      supportedMethods: [
        'eth_sendTransaction',
        'eth_sign',
        'eth_signTransaction',
        'eth_signTypedData_v1',
        'eth_signTypedData_v2',
        'eth_signTypedData_v3',
        'eth_signTypedData_v4',
        'eth_signTypedData',
        'personal_sign',
      ],
      type: 'eip155:eoa',
    };

    // Store the account in state

    await snap.request({
      method: 'snap_manageAccounts',
      params: {
        method: 'createAccount',
        params: { account },
      },
    });

    return account;
  }
}
```

#### `updateAccount`

Updates an existing Snap account.

:::note
The Snap is responsible for maintaining its own record of accounts.
This can be done using [`snap_manageState`](#snap_managestate).
:::

##### Parameters

`account` - A [`KeyringAccount`](./keyring-api/variables/KeyringAccountStruct.md) object.

##### Returns

`null`

##### Example

```typescript
import { Keyring, KeyringAccount } from '@metamask/keyring-api';

class MyKeyring implements Keyring {
  // ... other methods

  async updateAccount(account: KeyringAccount): Promise<void> {
    // Store the new account details in state

    await snap.request({
      method: 'snap_manageAccounts',
      params: {
        method: 'updateAccount',
        params: { account },
      },
    });
  }
}
```

#### `deleteAccount`

Deletes a Snap account.

:::note
The Snap is responsible for maintaining its own record of accounts.
This can be done using [`snap_manageState`](#snap_managestate).
:::

##### Parameters

`id` - The ID of the account to be deleted.

##### Returns

`null`

##### Example

```typescript
import { Keyring } from '@metamask/keyring-api';

class MyKeyring implements Keyring {
  // ... other methods

  async deleteAccount(id: string): Promise<void> {
    // Delete the account from state

    await snap.request({
      method: 'snap_manageAccounts',
      params: {
        method: 'deleteAccount',
        params: { id },
      },
    });
  }
}
```

#### `listAccounts`

Lists the calling Snap's accounts that are known to MetaMask.
This method does not call back to the Snap.
Instead, the Snap can use it to check whether there's a discrepancy between the Snap's internal
state of accounts and the state known to MetaMask.

##### Returns

An array of [keyring accounts](./keyring-api/variables/KeyringAccountStruct.md).

##### Example

```typescript
import { Keyring, KeyringAccount } from '@metamask/keyring-api';

class MyKeyring implements Keyring {
  // ... other methods

  async checkIfAccountsInSync(): Promise<boolean> {

    const knownAccounts: KeyringAccount[] = /* grab accounts from Snap state */;

    const listedAccounts: KeyringAccount[] = await snap.request({
      method: 'snap_manageAccounts',
      params: {
        method: 'listAccounts'
      },
    });

    // compare the arrays and return the response
  }
}
```

#### `submitResponse`

Finalizes a signing request.
This is usually called as part of the `approveRequest` method of the
[`Keyring`](keyring-api/type-aliases/Keyring.md) interface.

##### Parameters

- `id` - The ID of the request to finalize.
- `result` - The result that should be returned to the original JSON-RPC caller.

##### Returns

`null`

##### Example

```typescript
import { Keyring } from '@metamask/keyring-api';
import { Json } from '@metamask/utils';

class MyKeyring implements Keyring {
  // ... other methods

  async approveRequest(id: string, result?: Json): Promise<void> {
    // Do any Snap-side logic to finish approving the request

    await snap.request({
      method: 'snap_manageAccounts',
      params: {
        method: 'submitResponse',
        params: { id, result}
      },
    });
  }
}
```

### snap_manageState

Allows the Snap to persist up to 100 MB of data to disk and retrieve it at will.
The data is automatically encrypted using a Snap-specific key and automatically decrypted when retrieved.

This method is only callable by Snaps.

#### Parameters

An object containing:

- `operation` - The state operation to perform (`'clear'`, `'get'`, or `'update'`).
- `newState` - The value to update state with if the operation is `update`, and nothing otherwise.

#### Returns

The value stored in state if the operation is `get`, and `null` otherwise.

#### Example

```javascript
// Persist some data.
await snap.request({
  method: 'snap_manageState',
  params: { operation: 'update', newState: { hello: 'world' } },
});

// At a later time, get the data stored.
const persistedData = await snap.request({
  method: 'snap_manageState',
  params: { operation: 'get' },
});

console.log(persistedData);
// { hello: 'world' }

// If there's no need to store data anymore, clear it out.
await snap.request({
  method: 'snap_manageState',
  params: { operation: 'clear' },
});
```

### snap_notify

Displays a notification in MetaMask or natively in the browser.
Snaps can trigger a short notification text for actionable or time sensitive information.

This method is only callable by Snaps.

#### Parameters

An object containing the contents of the notification:

- `type` - The notification type.
  Specify `inApp` to display the notification in the MetaMask UI, and `native` to display the
  notification in the browser.
  We recommend using `inApp` because there's no guarantee that native notifications are displayed to
  the user.
- `message` - A message to show in the notification.

#### Example

```javascript
await snap.request({
  method: 'snap_notify',
  params: {
    type: 'inApp',
    message: 'Hello, world!',
  },
});
```

### wallet_snap

A website must request the `wallet_snap` permission using
[`wallet_requestPermissions`](/wallet/reference/rpc-api/#wallet_requestpermissions) to
interact with the specified Snaps.

A website can also call this method to invoke the specified JSON-RPC method of the specified Snap.

This method is synonymous to [`wallet_invokeSnap`](#wallet_invokesnap).

:::note
Most websites only make one call to `wallet_requestPermissions`.
Consecutive calls to `wallet_requestPermissions` for the `wallet_snap` permission overwrites a
website's existing permissions to interact with Snaps.
To deal with this, you must write custom logic to merge existing Snap IDs with new ones you're requesting.
Use [`wallet_getSnaps`](#wallet_getsnaps) to get a list of a website's permitted Snaps.
:::

#### Parameters

When requesting this permission, specify a caveat of type `snapIds`.
Specify each Snap to request permission to interact with as an entry in the `value` field of the caveat.
Each Snap entry can include a `version` to install.
The default is the latest version.

When calling this method, specify an object containing:

- `snapId` - The ID of the Snap to invoke.
- `request` - The JSON-RPC request object to send to the invoked Snap.

#### Returns

Result of the Snap method call.

#### Example

<!--tabs-->

# wallet_requestPermissions

The following is an example of calling `wallet_requestPermissions` to request the `wallet_snap`
permission:

```javascript
const result = await ethereum.request({
  method: 'wallet_requestPermissions',
  params: [{
    wallet_snap: {
      caveats: [
        {
          type: 'snapIds',
          value: {
            'npm:@metamask/example-snap': { version: '1.0.0' },
            'npm:@metamask/foo-bar-snap': { version: '1.2.1' },
          }
        }
      ]
    }
  }],
});
```

# wallet_snap

The following is an example of calling `wallet_snap`:

```javascript
const result = await ethereum.request({
  method: 'wallet_snap',
  params: {
    snapId: 'npm:@metamask/example-snap',
    request: {
      method: 'hello',
    },
  },
});

console.log(result); // In this example, the result is a boolean.
```

<!--/tabs-->

### wallet_invokeSnap

:::caution
This method is deprecated.
Use [`wallet_requestSnaps`](#wallet_requestsnaps) instead.
:::

Invokes the specified JSON-RPC method of the specified Snap.
The Snap must be installed and the caller must have the permission to communicate with the Snap, or
the request is rejected.

Snaps are fully responsible for implementing their JSON-RPC API.
Consult the Snap's documentation for available methods, their parameters, and return values.

#### Parameters

An object containing:

- `snapId` - The ID of the Snap to invoke.
- `request` - The JSON-RPC request object to send to the invoked Snap.

#### Returns

Result of the Snap method call.

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

console.log(result); // In this example, the result is a boolean.
```
