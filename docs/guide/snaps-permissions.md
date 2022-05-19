# Permissions

::: tip Developer Preview Software
Snaps is pre-release software. To try Snaps, install [MetaMask Flask](https://metamask.io/flask).
:::

::: tip Feature Requests
Do you have feature requests? Other ideas? We'd love to hear about them! [Click here](https://github.com/MetaMask/snaps-skunkworks/discussions) to join the discussion.
:::

To access certain powerful JavaScript globals or JSON-RPC methods, your snap may need to request permission from the user. Snaps follow the [EIP-2255 wallet permissions specification](https://eips.ethereum.org/EIPS/eip-2255), and your snap's required permissions must be specified in the `initialPermissions` field of your `snap.manifest.json` file.

## Table of Contents

[[toc]]

## Endowments

### `endowment:network-access`

For snaps that need to access the internet, the snap can request the `endowment:network-access` permission. This permission will expose the global networking APIs `fetch` and `WebSocket` to the snap execution environment. Without this permission, these globals will not be available.

### `endowment:long-running`

For snaps that are computationally heavy and can't finish execution within the current snap lifecycle requirements, the snap can request the `endowment:long-running` permission. This long-running permission will effectively allow snaps to run indefinitely.

## RPC Permissions

To use any restricted RPC method, a snap will need to request permissions to access that method. For a list of available RPC methods and thus valid RPC permissions see [JSON-RPC API](./snaps-rpc-api.html)
