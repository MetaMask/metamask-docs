---
description: Manage users' non-EVM accounts and assets.
sidebar_position: 9
---

# Non-EVM networks

You can manage users' non-EVM accounts and assets with their approval, using
[Snaps API](../reference/snaps-api.md) methods.

:::caution important
Managing users' keys comes with great responsibility: Misplaced or stolen
private keys can lead to a complete loss of funds for users of your Snap.
:::

## Responsible key management

It's critical to practice responsible key management.
The general rule is: **Don't create a situation where your users can lose assets.**

:::tip examples of responsible key management:

- Deriving private keys and/or storing them in Snaps persistent storage, without ever moving them
  out of the [Snaps execution environment](../learn/about-snaps/execution-environment.md).
- Ensuring arbitrary code execution can't access irreversible operations or private keys.
- Asking the user for consent and informing them of what's going to happen before performing
  irreversible operations.

:::

:::danger examples of irresponsible key management:

- Allowing extraction of private keys outside the Snap in any way, especially through RPC or
  network connections.
- Executing arbitrary or untrusted code with access to private keys.
- Not getting properly informed consent before performing irreversible operations.
- Asking for consent but ignoring the decision.
- Exposing key material in clear-text.
- Producing a bug that leads to any of the above.

:::

## Derive keys

To derive a user's private keys:

1. Choose between the BIP-32 or BIP-44 specifications to derive the user's private keys.
   If the keys you want to derive conform to the
   [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki) structure, use
   [`snap_getBip44Entropy`](../reference/snaps-api.md#snap_getbip44entropy) to derive them.
   Otherwise, use [`snap_getBip32Entropy`](../reference/snaps-api.md#snap_getbip32entropy).
2. Add the required permission to your manifest file.
3. Find out the derivation path to use.
   This is dependent on the application you're building.
4. Use the [`@metamask/key-tree`](https://github.com/MetaMask/key-tree) module to derive the keys.
   Any additional code, for example, to derive addresses from keys, is application-specific.

### Dogecoin example

For example, to derive Dogecoin keys:

1. Dogecoin uses the BIP-44 scheme, so you'll use
   [`snap_getBip44Entropy`](../reference/snaps-api.md#snap_getbip44entropy).
2. Dogecoin has coin type `3`, so add the following to the manifest file:

   ```json title="snap.manifest.json"
   "initialPermissions": {
     "snap_getBip44Entropy": [
       {
         "coinType": 3
       }
     ]
   }
   ```

3. Dogecoin uses the following derivation path:

   ```
   m/44'/3'/0'/0/{address_index}
   ```

   To get the second Dogecoin account, add the following code to your Snap:

   ```javascript title="index.js"
   import { getBIP44AddressKeyDeriver } from "@metamask/key-tree"

   // Get the Dogecoin node, corresponding to the path m/44'/3'.
   const dogecoinNode = await snap.request({
     method: "snap_getBip44Entropy",
     params: {
       coinType: 3,
     },
   })

   /**
    * Create a function that takes an index and returns an extended private key for m/44'/3'/0'/0/address_index.
    * The second parameter to getBIP44AddressKeyDeriver isn't passed. This sets account and changes to 0.
    */
   const deriveDogecoinAddress = await getBIP44AddressKeyDeriver(dogecoinNode)

   // Derive the second Dogecoin address, which has index 1.
   const secondAccount = deriveDogecoinAddress(1)
   ```

## Examples

The following are examples of existing Snaps that manage accounts and keys:

- [Dogecoin Snap tutorial](https://github.com/ziad-saab/dogecoin-snap)
- [Consensys Starknet Snap](https://github.com/Consensys/starknet-snap)
- [Account Labs Bitcoin Snap](https://github.com/snapdao/btcsnap)
- [`@metamask/bip32-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/bip32)
- [`@metamask/bip44-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/bip44)
