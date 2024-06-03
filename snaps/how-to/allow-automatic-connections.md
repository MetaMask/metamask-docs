---
description: Authorize specific websites to automatically connect to a Snap.
sidebar_position: 5
---

# Allow automatic connections

## Step 1: Add authorized dapps in the Snap manifest's `initialConnections`
You can authorize specific dapps or Snaps to automatically connect to your Snap, skipping the need
for users to manually confirm a connection when the dapp or Snap calls
[`wallet_requestSnaps`](../reference/wallet-api-for-snaps.md#wallet_requestsnaps).

To do so, add an [`initialConnections`](../reference/permissions.md#initial-connections) field in
the Snap manifest file, specifying each website you want to
allow to automatically connect.
For example:

```json title="snap.manifest.json"
"initialConnections": {
  "https://voyager-snap.linea.build": {}
}
```

:::caution important
`initialConnections` is not a replacement for [`endowment:rpc`](../reference/permissions.md#endowmentrpc).
`endowment:rpc` is still required to allow dapps or Snaps to call RPC methods of your Snap.
:::

## Step 2: Connect to the Snap from an authorized dapp
When a user visits a website specified in `initialConnections`, and the website calls
`wallet_requestSnaps`, if the Snap is already installed, the website connects immediately and can
make further calls to the Snap.
If the Snap is not installed, the user sees a confirmation to install the Snap.

Additionally, since the connection between the Snap and a dapp listed in `initialConnections`
is automatic, calling `wallet_getSnaps` from an authorized dapp will return the Snap even
if `wallet_requestSnaps` was never called from the authorized dapp. This makes the flow of
using the Snap from an authorized dapp completely seamless.

### Sample code
This sample code, adapted from the [Linea Voyager Snap](https://github.com/Consensys/linea-voyager-snap)
companion dapp, shows the flow of connecting to a Snap from a dapp authorized with `initialConnections`.

While the code is exactly the same as without `initialConnections`, the comments show how the flow is
different from the perspective of the user.

The key is that calling [`wallet_getSnaps`](../reference/wallet-api-for-snaps.md#wallet_getsnaps) from
an authorized dapp when the Snap is already installed will show that Snap even if the Dapp never explicitly
connected to it by calling [`wallet_requestSnaps`](../reference/wallet-api-for-snaps.md#wallet_requestsnaps)

```js
const snapId = 'npm:@myorg/mysnap';

// This function will be called when the EIP-6963 process of finding MetaMask is successful
// Learn more about EIP-6963 at https://docs.metamask.io/wallet/concepts/wallet-interoperability/
const MetaMaskFound = async (providerDetail) => {
  const { provider } = providerDetail;

  // This call will return the tar
  const snaps = await provider.request({
    method: 'wallet_getSnaps',
  });

  if (Object.keys(snaps).includes(snapId)) {
    // If we're here, the Snap is installed. We're good to go.
    return;
  }

  // If we're here, the Snap is not installed. Let's install it.
  // Since the Snap is not installed, the user will still see a pop-up
  // confirming that they want to install the Snap.
  try {
    const result = await provider.request({
      method: 'wallet_requestSnaps',
      params: {
        [snapId]: {},
      },
    });

    // If we're here, then the Snap is installed, and the dapp
    // is successfully connected to it.
  } catch (err) {
    // If we're here, something went wrong. For example, the user
    // might have declined the Snap install confirmation.
  }
};
```



## Step 3 (Optional): Testing locally
When testing, you can specify the local site.
For example:

```json title="snap.manifest.json" 
"initialConnections": {
  "http://localhost:8000": {}
}
```

We recommend removing local sites before deploying your Snap to production.

## When is this most useful?

The following scenarios showcase `initialConnection`'s usefulness, in order from most to least useful:

### Snap used by multiple dapps
* You built a Snap that can be used by multiple dapps, for example a protocol Snap.
* A user installs your Snap while interacting with a dapp that uses it.
* The user eventually lands on the companion dapp for your Snap.
* Your companion dapp is listed in `initialConnections`.
* **The user can interact with your companion dapp without having to manually connect the Snap.**

For even greater benefit, consider including some of the known dapps that interact with your Snap
under `initialConnections`.

### Snap installed from the Snaps Directory
* You built a Snap that is only really useful for one dapp, its companion dapp.
* A user finds your Snap through the [Snaps Directory](https://snaps.metamask.io) and installs it.
* The user lands on your companion dapp.
* Your companion dapp is listed under `initialConnections`.
* **The user can immediately interact with your dapp without having to manually connect the Snap.**

### Snap installed from your companion dapp
* You built a Snap, and added your companion dapp to `initialConnections`.
* A user discovers your Snap through your companion dapp.
* The user will need to install the Snap, going through the normal flow.
* **In this specific case, having added `initialConnections` will not have been useful.**

## Example

See the [Linea Voyager Snap](https://github.com/Consensys/linea-voyager-snap) for a full example of
allowing an automatic connection.
