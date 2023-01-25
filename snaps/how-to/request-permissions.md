# Request permissions

To access certain powerful JavaScript globals or API methods, a snap must ask the user for permission.
Snaps follow the [EIP-2255 wallet permissions specification](https://eips.ethereum.org/EIPS/eip-2255),
and you must specify a snap's required permissions in the `initialPermissions` field of the
[manifest file](../concepts/anatomy.md#manifest-file).

## API methods

You must request permission to use any
[restricted JSON-RPC API methods](../reference/rpc-api.md#restricted-methods).

For example, to request to use `snap_confirm`, add the following to the manifest file:

```json
...
"initialPermissions": {
  "snap_confirm": {}
},
...
```

## Endowments

You can specify the following endowments in the manifest file.

### `endowment:long-running`

A snap that is computationally heavy and can't finish execution within the
[snap lifecycle requirements](../concepts/lifecycle.md) can request the `endowment:long-running` permission.
This permission allows the snap to run indefinitely while processing RPC requests.

```json
...
"initialPermissions": {
  "endowment:long-running": {}
},
...
```

### `endowment:network-access`

A snap that must access the internet must request the `endowment:network-access` permission.
This permission exposes the global networking APIs `fetch` and `WebSocket` to the Snaps execution environment.

:::caution
`XMLHttpRequest` is never available in Snaps, and you should replace it with `fetch`.
If your dependencies are using `XMLHttpRequest`, you can
[patch it away](../how-to/troubleshoot.md#patch-the-use-of-xmlhttprequest).
:::

```json
...
"initialPermissions": {
  "endowment:network-access": {}
},
...
```
