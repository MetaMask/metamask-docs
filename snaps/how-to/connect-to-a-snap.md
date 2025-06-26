---
description: Connect your dapp to existing, third-party Snaps.
sidebar_position: 10
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Connect to a Snap

Dapps can connect to Snaps designed to communicate with dapps.
Dapps can use these Snaps to take advantage of new features enabled by Snaps.
This is possible because Snaps can expose a [custom JSON-RPC API](../learn/about-snaps/apis.md#custom-json-rpc-apis).

## Detect wallet

To connect to a Snap, dapps must first detect MetaMask in the user's browser.
See the Wallet API documentation on [how to connect to the MetaMask extension](/wallet/how-to/connect-extension).

### Detect MetaMask Flask

When developing your Snap, you might need to require
[MetaMask Flask](../get-started/install-flask.md) in your dapp.
We recommend detecting MetaMask Flask using the
[multi-wallet detection mechanism](/wallet/concepts/wallet-interoperability) specified by EIP-6963.
Alternatively, you can use the `window.ethereum` injected provider, but this might fail if the user
is running multiple wallet extensions simultaneously.

To detect MetaMask Flask, you can add the following to `window.onload`:

<Tabs>
<TabItem value="EIP-6963 example">

```js title="index.js"
window.addEventListener("eip6963:announceProvider", (event) => {
  /* event.detail contains the discovered provider interface. */
  const providerDetail = event.detail

  /* providerDetail.info.rdns is the best way to distinguish a wallet extension. */
  if (providerDetail.info.rdns === "io.metamask.flask") {
    console.log("MetaMask Flask successfully detected!")
    // Now you can use Snaps!
  } else {
    console.error("Please install MetaMask Flask!")
  }
})

window.dispatchEvent(new Event("eip6963:requestProvider"))
```

</TabItem>
<TabItem value="Injected provider example">

```js title="index.js"
const provider = window.ethereum

const isFlask = (
  await provider?.request({ method: "web3_clientVersion" })
)?.includes("flask")

if (provider && isFlask) {
  console.log("MetaMask Flask successfully detected!")
  // Now you can use Snaps!
} else {
  console.error("Please install MetaMask Flask!", error)
}
```

</TabItem>
</Tabs>

## Connect to a Snap

Connect to a Snap by calling the [`wallet_requestSnaps`](../reference/wallet-api-for-snaps.md#wallet_requestsnaps)
method from your dapp.
If a user doesn't have the Snap installed in their MetaMask wallet, MetaMask prompts the user to
install the Snap.

:::note
A Snap can grant a dapp an [automatic connection](../how-to/allow-automatic-connections.md),
skipping the need for users to confirm a connection.
:::

The following are different possible outcomes from calling `wallet_requestSnaps`.

### User rejects the installation request

If the user rejects the installation request, the call to `wallet_requestSnaps` throws the following error:

```json
{ "code": 4001, "message": "User rejected the request." }
```

### User approves the installation request

If the user approves the installation request, the call to `wallet_requestSnaps` returns an object
with the following shape:

```json
{
  "SNAP_ID": {
    "blocked": false,
    "enabled": true,
    "id": "SNAP_ID",
    "initialPermissions": {
      // The permissions in the Snap's manifest file.
    },
    "version": "SNAP_VERSION"
  }
}
```

### Snap is already installed

If the Snap is already installed, the call to `wallet_requestSnaps` returns the same object as for a
new installation of the Snap, but the user won't see a confirmation pop-up asking them to install the Snap.

## Determine whether a Snap is installed

Determine whether a Snap is installed by calling the
[`wallet_getSnaps`](../reference/wallet-api-for-snaps.md#wallet_getsnaps) method from your dapp.
This method returns a list of only those Snaps that are connected to your current dapp.

The response is in the form of an object keyed by the ID of the Snap.
Each value is a nested object with additional information, such as the version of the Snap that is installed.

:::note
`wallet_getSnaps` only returns the Snaps that are connected to your dapp.
The user may have other Snaps installed that your dapp is not aware of.
:::

The following example verifies whether a Snap with ID `npm:super-snap` is installed:

```ts title="index.ts"
const snaps = await ethereum.request({
  method: "wallet_getSnaps",
})

const isMySnapInstalled = Object.keys(snaps).includes("npm:super-snap")
```

If you need to work with a specific version of a Snap, you can instead iterate over
`Object.values(snaps)`, and use the `id` and `version` properties inside each object to determine
whether the Snap is installed with the required version.

:::note
A user cannot install multiple versions of a Snap into a single MetaMask instance.
You should avoid requiring a specific version of a Snap unless you absolutely need to.
In most cases, you should request the latest version of the Snap and architect your dapp to be able
to work with that version.
:::

## Reconnect to a Snap

At any time, a user can open their MetaMask Snaps settings menu and see all the dapps connected to a Snap.
From that menu they can revoke a dapp connection.
If your dapp loses the connection to a Snap, you can reconnect by calling
[`wallet_requestSnaps`](../reference/wallet-api-for-snaps.md#wallet_requestsnaps).
Since the Snap is already installed, this returns a success response without MetaMask showing a pop-up.
However, if the user has disabled the Snap, the response has `enabled` set to `false` for your `SNAP_ID`:

```json
{
  "SNAP_ID": {
    "blocked": false,
    "enabled": false,
    "id": "SNAP_ID",
    "initialPermissions": {
      // The permissions in the Snap's manifest file.
    },
    "version": "SNAP_VERSION"
  }
}
```
