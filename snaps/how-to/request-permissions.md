---
description: Request permissions in a manifest file.
sidebar_position: 2
---

# Request permissions

To access certain powerful JavaScript globals or API methods, a snap must ask the user for permission.
Snaps follow the [EIP-2255 wallet permissions specification](https://eips.ethereum.org/EIPS/eip-2255),
and you must specify a snap's required permissions (except for [dynamic permissions](#dynamic-permissions))
in the `initialPermissions` field of the [manifest file](../concepts/anatomy.md#manifest-file).

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
Instead, your snap can acquire dynamic permissions during its lifecycle.

For example, your snap can request permission to call the Ethereum provider's
[`eth_accounts`](../reference/permissions.md#eth_accounts) RPC method by calling the provider's
[`eth_requestAccounts`](/wallet/reference/eth_requestaccounts) RPC method.

See the [Ethereum JSON-RPC API restricted methods](/wallet/concepts/rpc-api#restricted-methods)
for more information.
