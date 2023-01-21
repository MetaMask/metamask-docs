# Request permissions

To access certain powerful JavaScript globals or JSON-RPC methods, your snap must ask the user for permission.
Snaps follow the [EIP-2255 wallet permissions specification](https://eips.ethereum.org/EIPS/eip-2255),
and your snap's required permissions must be specified in the `initialPermissions` field of your
[`snap.manifest.json` file](./snaps-development-guide.md#the-snap-manifest).

## Endowments

### `endowment:long-running`

For snaps that are computationally heavy and can't finish execution within
[the snap lifecycle requirements](./snaps-development-guide.md#the-snap-lifecycle), the snap can
request the `endowment:long-running` permission.
This permission will effectively allow snaps to run indefinitely while processing RPC requests.

### `endowment:network-access`

For snaps that need to access the internet, the snap can request the `endowment:network-access` permission.
This permission exposes the global networking APIs `fetch` and `WebSocket` to the snap execution environment.
Without this permission, these globals will not be available.

::: warning Avoid XMLHttpRequest
`XMLHttpRequest` is never available in snaps, and you should replace it with `fetch`.
If your dependencies are using `XMLHttpRequest`, you can learn how to patch it away
[here](./snaps-patching-dependencies.md#patching-the-use-of-xmlhttprequest).
:::

## RPC permissions

To use any restricted RPC method, a snap must request permissions to access that method.
For a list of available RPC methods and thus valid RPC permissions see
[JSON-RPC API](./snaps-rpc-api.html#restricted-methods).
