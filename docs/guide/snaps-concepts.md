# Concepts

[[toc]]

## Accounts and Key Management

The Snaps API contains functionality that allows you to manage users' private keys, with their approval. This capability comes with great responsiblity on the part of the developer: misplaced or stolen private keys will lead to a complete loss of funds for the users of the snap. Our team has developed some guidelines to help you assess the feasibility and sanity of your snap.

### Key Management Guidelines

The general guideline for responsible key management is:

> Don't create a situation where your user can lose money

In practice, here are some examples that would break the above policy:

1. Allowing extraction of private keys outside the snap in any way, especially through RPC or network connections
2. Arbitrary code execution with access to private keys.
3. Not informing the user properly or not getting informed consent before doing a destructive operation, for example a transaction.
4. Asking for consent but ignoring the decision.
5. A bug that leads to any of the above.

And here are some examples of abiding by the above policy:

1. Manipulation of the private keys, their storage in snaps' persistent storage, without them ever leaving the Snaps Secure EcmaScript sandbox
2. Arbitrary code execution without access to destructive operations nor private keys
3. Doing destructive operations -- for example transactions --, one, multiple, or even creating an allowance without further confirmations, with prior informing the user of what's going to happen in an a way that a layman can understand and asking for consent

### How to derive keys

To derive a user's private keys, you need to:

1. Figure out whether you'll be using the BIP-32 or BIP-44 specifications to derive the user's private keys. BIP-44 is more strict in the structure and shape of the derivation paths, while BIP-32 allows for more flexibility.
2. Find out the derivation path that you need to use. For example, if you're trying to derive keys for Dogecoin, the path is of the form `m/44'/3'/0'/0/{account_index}`.
3. Add the required permission to your manifest file
4. Write code in your snap to derive the keys. This will usually be done using the `@metamask/key-tree` NPM package. Any further code to e.g. derive addresses from the keys will be custom code that depends on your application.

### Figuring out whether to use BIP-32 or BIP-44

If the keys you are trying to derive conform to the BIP-44 structure, that is:

```
m / purpose' / coin_type' / account' / change / address_index
```

Then you should use [`snap_getBip44Entropy`](./snaps-rpc-api.html#snap-getbip44entropy) to derive your keys. Its permissions are simpler, since it requires only a coin type.

If the key ayou are trying to derive do not conform to the BIP-44 structure, then you should use [`snap_getBip32Entropy`].

### Finding out the derivation path

The derivation path is completely dependent on the application you're building. As an example, if you're trying to reproduce the Dogecoin derivation path, that would be:

```
m/44'/3'/0'/0/{account_index}
```

This means that you'd be using [`snap_getBip44Entropy`](./snaps-rpc-api.html#snap-getbip44entropy) with the permission `coinType` having a value of `60`.

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

The authoritative list of coin types is defined in [`SLIP-44`](https://github.com/satoshilabs/slips/blob/master/slip-0044.md)

### Example of private key derivation

As an example, if you're trying to derive Dogecoin keys:

1. Dogecoin uses the BIP-44 scheme so we'll be using [`snap_getBip44Entropy`]
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
     // other values
   }
   ```

3. Dogecoin uses the following derivation path:

   ```
   m/44'/3'/0'/0/{account_index}
   ```

   To get the second Dogecoin account, we would write the following code:

   ```javascript
   import { getBIP44AddressKeyDeriver } from '@metamask/key-tree';

   // Get the Dogecoin node, corresponding to the path m/44'/3'
   const dogecoinNode = await wallet.request({
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
