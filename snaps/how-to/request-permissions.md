---
description: Request permissions in a manifest file.
sidebar_position: 2
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
`initialPermissions` field of the Snap [manifest file](../concepts/files.md#manifest-file).
For example, to request to call [`snap_dialog`](../reference/snaps-api.md#snap_dialog), add the
following to the manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "snap_dialog": {}
},
```

### Endowments

Endowments are a type of permission.
Request endowments in the `initialPermissions` field of the Snap
[manifest file](../concepts/files.md#manifest-file).
See the [Snaps permissions reference](../reference/permissions.md) for the full list of endowments.

For example, to request the [`endowment:network-access`](../reference/permissions.md#endowmentnetwork-access)
permission, add the following to the manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:network-access": {}
},
```

### Dynamic permissions

Dynamic permissions are not requested in the manifest file.
Instead, your Snap can acquire dynamic permissions during its lifecycle.

For example, request permission to call the [`eth_accounts`](/wallet/reference/eth_accounts)
MetaMask JSON-RPC API method by calling [`eth_requestAccounts`](/wallet/reference/eth_requestaccounts).
See the [`eth_accounts` dynamic permission](../reference/permissions.md#eth_accounts) for more information.

## Request permissions from a dapp

Dapps that communicate with Snaps must request permission to call the `wallet_snap` and
`wallet_invokeSnap` [MetaMask JSON-RPC API](/wallet/reference/json-rpc-api) methods.

Request permission to call these methods by calling
[`wallet_requestPermissions`](/wallet/reference/wallet_requestPermissions).
For example, to request permission to call `wallet_snap`:

```js
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
