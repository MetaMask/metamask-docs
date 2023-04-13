---
description: Request permissions in a manifest file.
---

# Request permissions

To access certain powerful JavaScript globals or API methods, a snap must ask the user for permission.
Snaps follow the [EIP-2255 wallet permissions specification](https://eips.ethereum.org/EIPS/eip-2255),
and you must specify a snap's required permissions in the `initialPermissions` field of the
[manifest file](../concepts/anatomy.md#manifest-file).

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

For example, to request the [`endowment:long-running`](../reference/permissions.md#endowmentlong-running)
permission, add the following to the manifest file:

```json
"initialPermissions": {
  "endowment:long-running": {}
},
```
