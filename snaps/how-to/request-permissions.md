---
description: Request permissions in a manifest file.
sidebar_position: 1
---

# Request permissions

[Snaps must request permission](#request-permissions-from-a-snap) to access certain powerful
JavaScript globals or API methods.
[Dapps must also request permission](#request-permissions-from-a-dapp) to access certain API methods
to communicate with Snaps.

Snaps and dapps follow the [EIP-2255 wallet permissions specification](https://eips.ethereum.org/EIPS/eip-2255).

## Request permissions from a Snap

### Snaps API methods

Request permission to call [Snaps API methods](../reference/snaps-api.md) in the
`initialPermissions` field of the Snap [manifest file](../learn/about-snaps/files.md#manifest-file).
For example, to request to call [`snap_dialog`](../reference/snaps-api.md#snap_dialog), add the
following to the manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "snap_dialog": {}
}
```

:::note

All Snaps API methods except the following interactive UI methods require requesting permission in
the manifest file:

- [`snap_createInterface`](../reference/snaps-api.md#snap_createinterface)
- [`snap_getInterfaceState`](../reference/snaps-api.md#snap_getinterfacestate)
- [`snap_updateInterface`](../reference/snaps-api.md#snap_updateInterface)

:::

### Endowments

Endowments are a type of permission.
Request endowments in the `initialPermissions` field of the Snap
[manifest file](../learn/about-snaps/files.md#manifest-file).
See the [Snaps permissions reference](../reference/permissions.md) for the full list of endowments.

For example, to request the [`endowment:network-access`](../reference/permissions.md#endowmentnetwork-access)
permission, add the following to the manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:network-access": {}
}
```

### Dynamic permissions

Dynamic permissions aren't requested in the manifest file.
Instead, your Snap can acquire dynamic permissions during its lifecycle.

For example, request permission to call the [`eth_accounts`](/wallet/reference/json-rpc-methods/eth_accounts)
MetaMask JSON-RPC API method by calling [`eth_requestAccounts`](/wallet/reference/json-rpc-methods/eth_requestaccounts).
See the [`eth_accounts` dynamic permission](../reference/permissions.md#eth_accounts) for more information.

## Request permissions from a dapp

Dapps that communicate with Snaps using [`wallet_snap`](../reference/wallet-api-for-snaps.md#wallet_snap)
or [`wallet_invokeSnap`](../reference/wallet-api-for-snaps.md#wallet_invokesnap) must request
permission to do so by calling
[`wallet_requestSnaps`](../reference/wallet-api-for-snaps.md#wallet_requestsnaps) first.

The following example calls `wallet_requestSnaps` to request permission to connect to the
`hello-snap` Snap, then calls `wallet_invokeSnap` to invoke the `hello` JSON-RPC method exposed by the Snap:

```js title="index.js"
// If the Snap is not already installed, the user will be prompted to install it.
await window.ethereum.request({
  method: "wallet_requestSnaps",
  params: {
    // Assuming the Snap is published to npm using the package name "hello-snap".
    "npm:hello-snap": {},
  },
})

// Invoke the "hello" JSON-RPC method exposed by the Snap.
const response = await window.ethereum.request({
  method: "wallet_invokeSnap",
  params: { snapId: "npm:hello-snap", request: { method: "hello" } },
})

console.log(response) // "world!"
```

:::note
Learn more about implementing [custom JSON-RPC APIs](../learn/about-snaps/apis.md#custom-json-rpc-apis) in a Snap.
:::
