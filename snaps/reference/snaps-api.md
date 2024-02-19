---
description: See the Snaps API reference.
toc_max_heading_level: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Snaps API

Snaps can communicate with and modify the functionality of MetaMask using the [Snaps API](../learn/about-snaps/apis.md#snaps-api).
To call each method, you must first [request permission](../how-to/request-permissions.md) in the Snap
manifest file.

## `snap_dialog`

Displays a dialog in the MetaMask UI.
There are three types of dialogs with different parameters and return types: [alert](#alert-dialog),
[confirmation](#confirmation-dialog), and [prompt](#prompt-dialog).

:::caution
Dialogs do not work when MetaMask is locked. To check if MetaMask is locked, use [`snap_getClientStatus`](#snap_getclientstatus).
:::

### Alert dialog

Displays an alert that can only be acknowledged.

#### Parameters

An object containing the contents of the alert dialog:

- `type` - The type of dialog (`'Alert'`).
- `content` - The content of the alert, as a [custom UI](../features/custom-ui.md) component.

#### Example

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

### Confirmation dialog

Displays a confirmation that can be accepted or rejected.

#### Parameters

An object containing the contents of the confirmation dialog:

- `type` - The type of dialog (`'Confirmation'`).
- `content` - The content of the confirmation, as a [custom UI](../features/custom-ui.md) component.

#### Returns

`true` if the confirmation was accepted, `false` otherwise.

#### Example

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

### Prompt dialog

Displays a prompt where the user can enter a text response.

#### Parameters

An object containing the contents of the prompt dialog:

- `type` - The type of dialog (`'Prompt'`).
- `content` - The content of the prompt, as a [custom UI](../features/custom-ui.md) component.
- `placeholder` - Text that will be in the input field when nothing is typed.

#### Returns

The text entered by the user if the prompt was submitted or `null` if the prompt was rejected or closed. If the user does not enter any text and submits the prompt, the value is an empty string.

#### Example

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

## `snap_getBip32Entropy`

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

### Parameters

An object containing:

- `path` - An array, starting with `m`, containing the BIP-32 derivation path to the key to
  retrieve.
  For example, `["m", "44'", "60'"]`.
- `curve` - The curve to use for the key derivation.
  Must be `'ed25519'` or `'secp256k1'`.

### Returns

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

### Example

<Tabs>
<TabItem value="Manifest file">

```json
"initialPermissions": {
  "snap_getBip32Entropy": [
    {
      "path": ["m", "44'", "3'"],
      "curve": "secp256k1" // Or "ed25519"
    }
  ]
}
```

</TabItem>
<TabItem value="JavaScript">

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

</TabItem>
</Tabs>

## `snap_getBip32PublicKey`

Gets the [BIP-32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) public key for the
derivation path specified by the `path` parameter.
Note that this returns the public key, not the extended public key (`xpub`), or Ethereum address.

### Parameters

An object containing:

- `path` - An array, starting with `m`, containing the BIP-32 derivation path to the public key to
  retrieve.
  For example, `["m", "44'", "60'"]`.
- `curve` - The curve to use for the key derivation.
  Must be `'ed25519'` or `'secp256k1'`.
- `compressed` - Indicates whether the public key should be compressed.
  The default is `false`.

### Returns

The public key as hexadecimal string.

### Example

<Tabs>
<TabItem value="Manifest file">

```json
"initialPermissions": {
  "snap_getBip32PublicKey": [
    {
      "path": ["m", "44'", "3'", "0'", "0", "0"],
      "curve": "secp256k1" // Or "ed25519"
    }
  ]
}
```

</TabItem>
<TabItem value="JavaScript">

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

</TabItem>
</Tabs>

## `snap_getBip44Entropy`

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

### Parameters

An object containing `coinType`, the BIP-44 coin type to get the entropy for.

:::caution
Coin type 60 is reserved for MetaMask externally owned accounts and blocked for Snaps.
If you wish to connect to MetaMask accounts in a Snap, use
[`endowment:ethereum-provider`](../reference/permissions.md/#endowmentethereum-provider) and
[`eth_requestAccounts`](/wallet/reference/eth_requestAccounts).
:::

### Returns

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

### Example

<Tabs>
<TabItem value="Manifest file">

```json
"initialPermissions": {
  "snap_getBip44Entropy": [
    {
      "coinType": 3
    }
  ]
}
```

</TabItem>
<TabItem value="JavaScript">

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

</TabItem>
</Tabs>

## `snap_getClientStatus`

Gets the locked status of the Snaps client.

It is useful to check if MetaMask is locked in the following situations:

- When running background operations that require MetaMask to be unlocked, for example, [accessing encrypted state](#snap_managestate). If MetaMask is locked, the user gets a popup asking them to enter their password, which might be unexpected or confusing.
- When [displaying a dialog](#snap_dialog). Dialogs do not work when MetaMask is locked.

### Returns

`true` if MetaMask is locked, `false` if MetaMask is unlocked.

### Example

```typescript
import type { OnCronjobHandler } from '@metamask/snaps-sdk';
import { MethodNotFoundError } from '@metamask/snaps-sdk';

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  switch (request.method) {
    case 'execute':
      // Find out if MetaMask is locked
      const { locked } = await snap.request({
        method: 'snap_getClientStatus'
      });

      if (!locked) {
        // Do something that requires MetaMask to be unlocked, like access encrypted state
      }

    default:
      throw new MethodNotFoundError();
  }
};
```

## `snap_getEntropy`

Gets a deterministic 256-bit entropy value, specific to the Snap and the user's account.
You can use this entropy to generate a private key, or any other value that requires a high level of
randomness.
Other Snaps can't access this entropy, and it changes if the user's secret recovery phrase changes.

You can optionally specify a salt to generate different entropy for different purposes.
Using a salt results in entropy unrelated to the entropy generated without a salt.

This value is deterministic: it's always the same for the same Snap, user account, and salt.

### Parameters

An object containing:

- `version` - The number `1`.
  This is reserved for future use.
- `salt` (optional) - An arbitrary string to be used as a salt for the entropy.
  This can be used to generate different entropy for different purposes.

### Returns

The entropy as a hexadecimal string.

### Example

<Tabs>
<TabItem value="Manifest file">

```json
"initialPermissions": {
  "snap_getEntropy": {}
}
```

</TabItem>
<TabItem value="JavaScript">

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

</TabItem>
</Tabs>

## `snap_getFile`

Gets a static file's content in UTF-8, Base64, or hexadecimal.
The file must be [specified in the Snap's manifest file](../features/static-files.md).

### Parameters

An object containing:

- `path` - The path to the file, relative to the Snap's package directory (that is, one level above `src`).
- `encoding` (optional) - One of `utf8`, `base64`, or `hex`. The default is `base64`.

### Returns

The file content as a string in the requested encoding.

### Example

<Tabs>
<TabItem value="Manifest file">

```json
"source": {
  "shasum": "xxx",
  "location": {
    // ...
  },
  "files": [
    "./files/myfile.bin"
  ]
}
```

</TabItem>
<TabItem value="JavaScript">

```javascript
const contents = await snap.request({
  method: 'snap_getFile',
  params: {
    path: './files/myfile.bin',
    encoding: 'hex',
  },
});

// `0x...`
console.log(contents);
```

</TabItem>
</Tabs>

## `snap_getLocale`

:::flaskOnly
:::

Gets the user's locale setting. You can use this method to localize text in your snap.

### Returns

The user's locale setting as a [language code](https://github.com/MetaMask/metamask-extension/blob/develop/app/_locales/index.json).

### Example

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

## `snap_manageAccounts`

:::flaskOnly
:::

Manages [account management Snap](../features/custom-evm-accounts/index.md) accounts.
This method is organized into multiple sub-methods which each take their own parameters:

- [`createAccount`](#createaccount)
- [`updateAccount`](#updateaccount)
- [`deleteAccount`](#deleteaccount)
- [`listAccounts`](#listaccounts)
- [`submitResponse`](#submitresponse)

### createAccount

Creates a new Snap account.

:::note
The Snap is responsible for maintaining its own record of accounts.
This can be done using [`snap_manageState`](#snap_managestate).
:::

#### Parameters

`account` - A [`KeyringAccount`](./keyring-api/variables/KeyringAccountStruct.md) object.

#### Returns

`null`

#### Example

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

### updateAccount

Updates an existing Snap account.

:::note
The Snap is responsible for maintaining its own record of accounts.
This can be done using [`snap_manageState`](#snap_managestate).
:::

#### Parameters

`account` - A [`KeyringAccount`](./keyring-api/variables/KeyringAccountStruct.md) object.

#### Returns

`null`

#### Example

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

### deleteAccount

Deletes a Snap account.

:::note
The Snap is responsible for maintaining its own record of accounts.
This can be done using [`snap_manageState`](#snap_managestate).
:::

#### Parameters

`id` - The ID of the account to be deleted.

#### Returns

`null`

#### Example

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

### listAccounts

Lists the calling Snap's accounts that are known to MetaMask.
This method does not call back to the Snap.
Instead, the Snap can use it to check whether there's a discrepancy between the Snap's internal
state of accounts and the state known to MetaMask.

#### Returns

An array of [keyring accounts](./keyring-api/variables/KeyringAccountStruct.md).

#### Example

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

### submitResponse

Finalizes a signing request.
This is usually called as part of the `approveRequest` method of the
[`Keyring`](keyring-api/type-aliases/Keyring.md) interface.

#### Parameters

- `id` - The ID of the request to finalize.
- `result` - The result that should be returned to the original JSON-RPC caller.

#### Returns

`null`

#### Example

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

## `snap_manageState`

Allows the Snap to persist up to 100 MB of data to disk and retrieve it at will.
By default, the data is automatically encrypted using a Snap-specific key and automatically
decrypted when retrieved.
You can set `encrypted` to `false` to use unencrypted storage.

:::note
Accessing encrypted state requires MetaMask to be unlocked.
If you need to access encrypted state in a background task such as a cron job, you can use
[`snap_getClientStatus`](#snap_getclientstatus) to ensure that MetaMask is unlocked, preventing an
unexpected password request popup.
:::

### Parameters

An object containing:

- `operation` - The state operation to perform (`'clear'`, `'get'`, or `'update'`).
- `newState` - The value to update state with if the operation is `update`, and nothing otherwise.
- `encrypted` (optional) - Indicates whether the Snap will encrypt the data.
  The default is `true`.
  If set to `false`, the Snap will use a separate storage section, and will not encrypt the data.
  This is useful to access the data from background operations without requiring the user to enter
  their password in the case that MetaMask is locked.

### Returns

The value stored in state if the operation is `get`, and `null` otherwise.

### Example

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

## `snap_notify`

Displays a notification in MetaMask or natively in the browser.
Snaps can trigger a short notification text for actionable or time sensitive information.

### Parameters

An object containing the contents of the notification:

- `type` - The notification type.
  Specify `inApp` to display the notification in the MetaMask UI, and `native` to display the
  notification in the browser.
  We recommend using `inApp` because there's no guarantee that native notifications are displayed to
  the user.
- `message` - A message to show in the notification.

### Example

```javascript
await snap.request({
  method: 'snap_notify',
  params: {
    type: 'inApp',
    message: 'Hello, world!',
  },
});
```
