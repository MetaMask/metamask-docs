---
description: Request permissions in a manifest file.
sidebar_position: 2
---

# Request permissions

To access certain powerful JavaScript globals or API methods, a Snap must ask the user for permission.
Snaps follow the [EIP-2255 wallet permissions specification](https://eips.ethereum.org/EIPS/eip-2255),
and you must specify a Snap's required permissions (except for [dynamic permissions](#dynamic-permissions))
in the `initialPermissions` field of the [manifest file](../concepts/files.md#manifest-file).

## Request permissions from a Snap

### API methods

### Endowments

### Dynamic permissions

`eth_accounts`

## Request permissions from a dapp

`wallet_snap` and `wallet_invokeSnap`

## RPC API permissions

You must request permission to use any
[restricted JSON-RPC API methods](../reference/rpc-api.md#restricted-methods).

For example, to request to use [`snap_dialog`](../reference/rpc-api.md#snap_dialog), add the
following to the manifest file:

```json
"initialPermissions": {
  "snap_dialog": {}
},
```

## Endowments

Endowments are a type of permission.
See the [Snaps permissions reference](../reference/permissions.md) for the full list of endowments
you can specify in the manifest file.

For example, to request the [`endowment:network-access`](../reference/permissions.md#endowmentnetwork-access)
permission, add the following to the manifest file:

```json
"initialPermissions": {
  "endowment:network-access": {}
},
```

## Dynamic permissions

Dynamic permissions are not requested in the manifest file.
Instead, your Snap can acquire dynamic permissions during its lifecycle.

For example, your Snap can request permission to call the Ethereum provider's
[`eth_accounts`](../reference/permissions.md#eth_accounts) RPC method by calling the provider's
[`eth_requestAccounts`](/wallet/reference/eth_requestaccounts) RPC method.

See the [`eth_accounts` Dynamic Permission](../reference/permissions.md#eth_accounts)
for more information.
