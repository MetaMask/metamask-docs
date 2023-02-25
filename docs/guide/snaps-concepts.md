# Concepts

[[toc]]

## Accounts and Key Management

The Snaps API contains functionality that allows you to manage users' private keys, with their approval. This capability comes with great responsibility on part of the developer: Misplaced or stolen private keys may lead to a complete loss of funds for users of the snap. Below are some guidelines to help snap developers assess the feasibility and sanity of their snaps.

### Key Management Guidelines

The general guideline for responsible key management is:

> Don't create a situation where your user can lose assets

In practice, here are some examples that would break this:

1. Allowing extraction of private keys outside the snap in any way, especially through RPC or network connections
2. Execution of arbitrary/untrusted code with access to private keys.
3. Not getting properly informed consent before doing a irreversible operation (for example submission of a signature or transaction).
4. Asking for consent but ignoring the decision.
5. Exposing key material in clear-text.
6. A bug that leads to any of the above.

And here are some examples of abiding by the above policy:

1. Manipulation of the private keys, their storage in snaps' persistent storage, without them ever leaving the Snaps Secure EcmaScript sandbox.
2. Arbitrary code execution without access to destructive operations nor private keys.
3. Doing destructive operations -- for example transactions --, one, multiple, or even creating an allowance without further confirmations, with prior informing the user of what's going to happen in an a way that a layman can understand and asking for consent.

### How to derive keys

To derive a user's private keys, you need to:

1. Figure out whether you'll be using the BIP-32 or BIP-44 specifications to derive the user's private keys. BIP-44 is more strict in the structure and shape of the derivation paths, while BIP-32 allows for more flexibility.
2. Find out the derivation path that you need to use. For example, if you're trying to derive keys for Dogecoin, the path is of the form `m/44'/3'/0'/0/{address_index}`.
3. Add the required permission to your manifest file.
4. Write code in your snap to derive the keys. This will typically be done using the `@metamask/key-tree` package. Any further code to e.g. derive addresses from keys will be application-specific.

### Figuring out whether to use BIP-32 or BIP-44

If the keys you are trying to derive conform to the BIP-44 structure, that is:

```
m / purpose' / coin_type' / account' / change / address_index
```

Then you should use [`snap_getBip44Entropy`](./snaps-rpc-api.html#snap-getbip44entropy) to derive your keys. Its permissions are simpler, since it requires only a coin type.

If the key you are trying to derive do not conform to the BIP-44 structure, then you should use [`snap_getBip32Entropy`](./snaps-rpc-api.html#snap-getbip32entropy).

### Finding out the derivation path

The derivation path is completely dependent on the application you're building. As an example, if you're trying to reproduce the Dogecoin derivation path, that would be:

```
m/44'/3'/0'/0/{address_index}
```

This means that you'd be using [`snap_getBip44Entropy`](./snaps-rpc-api.html#snap-getbip44entropy) with the permission `coinType` having a value of `3`.

### Adding permissions to the manifest file

For `snap_getBip44Entropy`, you only need to specify the `coinType`, like this:

```json
{
  "initialPermissions": {
    "snap_getBip44Entropy": [
      {
        "coinType": 3 // 3 is Dogecoin
      }
    ]
  }
}
```

The authoritative list of coin types is defined in [`SLIP-44`](https://github.com/satoshilabs/slips/blob/master/slip-0044.md).

### Example of private key derivation

As an example, to derive Dogecoin keys:

1. Dogecoin uses the BIP-44 scheme so we'll be using [`snap_getBip44Entropy`].
2. Dogecoin has coin type `3`, so our manifest file will have the following:

   ```json
   {
     "initialPermissions": {
       "snap_getBip44Entropy": [
         {
           "coinType": 3
         }
       ]
     }
     // Other values
   }
   ```

3. Dogecoin uses the following derivation path:

   ```
   m/44'/3'/0'/0/{address_index}
   ```

   To get the second Dogecoin account, we would write the following code:

   ```javascript
   import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';

   // Get the Dogecoin node, corresponding to the path m/44'/3'
   const dogecoinNode = await snap.request({
     method: 'snap_getBip44Entropy',
     params: {
       coinType: 3,
     },
   });

   /**
    * Creates a function that takes an index and returns an extended private key for m/44'/3'/0'/0/address_index
    * The second parameter to getBIP44AddressKeyDeriver is not passed. This sets account and change to 0
    */
   const deriveDogecoinAddress = await getBIP44AddressKeyDeriver(dogecoinNode);

   // Derive the second Dogecoin address, which has index 1
   const secondAccount = deriveDogecoinAddress(1);
   ```

## Custom UI

### Introduction

Custom UI is a UI definition system used by various Snaps features. It enables Snaps to describe a rich UI to be displayed in some contexts.

Custom UI is used to describe custom user interfaces in [`snap_dialog`](./snaps-rpc-api.html#snap-dialog), and in the [`onTransaction` export](./snaps-exports.html#ontransaction).

### How to use it

To use Custom UI, you must first install the `@metamask/snaps-ui` NPM package:

```sh
yarn add @metamask/snaps-ui
```

Then, whenever you're required to return a Custom UI, import the components you need from the package, and build your UI with them. For example:

```javascript
import { panel, heading, text } from '@metamask/snaps-ui';

// ...

const content = panel([
  heading('Alert heading'),
  text('Something happened in the system.'),
]);

return content;
```

### Components

The `NodeType` enum exported by `@metamask/snaps-ui` details the available components.

#### `Copyable`

##### Description

Outputs a read-only text field with a copy-to-clipboard shortcut.

##### Usage

```javascript
import { copyable } from '@metamask/snaps-ui';

// ...

const content = copyable('Text to be copied');
```

#### `Divider`

##### Description

Outputs a horizontal divider.

##### Usage

```javascript
import { panel, divider, text } from '@metamask/snaps-ui';

// ...

const content = panel([
  text('Text before the divider'),
  divider(),
  text('Text after the divider'),
]);
```

#### `Heading`

##### Description

Outputs a heading. Useful for panel titles.

##### Usage

```javascript
import { panel, heading, text } from '@metamask/snaps-ui';

// ...

const content = panel([
  heading('Title of the panel'),
  text('Text of the panel'),
]);
```

#### `Panel`

##### Description

Outputs a panel, which can be used as a container for other components.

##### Usage

```javascript
import { panel, heading, text } from '@metamask/snaps-ui';

// ...

const insights = [
  /*...*/
];
const content = panel([
  heading('Here are the transaction insights'),
  ...insights.map((insight) => text(insight.description)),
]);
```

#### `Spinner`

##### Description

Outputs a loading indicator.

##### Usage

```javascript
import { panel, heading, spinner } from '@metamask/snaps-ui';

// ...

const content = panel([heading('Please wait...'), spinner()]);
```

#### `Text`

##### Description

Outputs text.

##### Usage

```javascript
import { text } from '@metamask/snaps-ui';

// ...

const content = text('This is a simple text UI');
```

### Markdown

Text-based components accept a very small subset of Markdown, that is, `**bold**` and `_italic_`. There are plans to increase this subset in the future.
