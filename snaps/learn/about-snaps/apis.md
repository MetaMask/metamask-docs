---
description: Learn about the Snaps APIs.
sidebar_position: 1
sidebar_label: Snaps APIs
---

# About the Snaps APIs

Snaps, dapps, and MetaMask can communicate with each other using the [Snaps API](#snaps-api),
[MetaMask JSON-RPC API](#metamask-json-rpc-api), and [custom JSON-RPC APIs](#custom-json-rpc-apis).

## Snaps API

Snaps can access the global object `snap`, which has one method: `request`.
You can use this object to make [Snaps API](../../reference/snaps-api.md) requests.
These API methods allow Snaps to extend or modify the functionality of MetaMask.

To call each method, you must first [request permission](../../how-to/request-permissions.md) in the Snap
manifest file.
For example, to call [`snap_notify`](../../reference/snaps-api.md#snap_notify), first request the
`snap_notify` permission:

```json title="snap.manifest.json"
"initialPermissions": {
  "snap_notify": {}
}
```

Your Snap can then call `snap_notify` in its source code:

```typescript title="index.ts"
await snap.request({
  method: 'snap_notify',
  params: {
    type: 'inApp',
    message: 'Hello, world!',
  },
});
```

## MetaMask JSON-RPC API

### Dapp requests

Dapps can install and communicate with Snaps using the following
[MetaMask JSON-RPC API](/wallet/reference/json-rpc-api) methods:

- [`wallet_getSnaps`](/wallet/reference/wallet_getsnaps) - Gets the dapp's permitted Snaps.
- [`wallet_requestSnaps`](/wallet/reference/wallet_requestsnaps) - Requests permission to
  communicate with the specified Snaps.
- [`wallet_snap`](/wallet/reference/wallet_snap) - (Restricted) Calls the specified custom JSON-RPC
  API method of the specified Snap.
- [`wallet_invokeSnap`](/wallet/reference/wallet_invokesnap) - (Restricted) Synonymous with `wallet_snap`.

A dapp must first request permission to communicate with a Snap using `wallet_requestSnaps`.
The dapp can then call `wallet_snap` or `wallet_invokeSnap` on the permitted Snap.
For example, to call `wallet_snap`:

```js title="index.js"
// Request permission to connect to the Snap.
await window.ethereum.request({
  method: 'wallet_requestSnaps',
  params: {
    'npm:hello-snap': {},
  },
});

// Call the 'hello' method of the Snap using wallet_snap.
const response = await window.ethereum.request({
  method: 'wallet_snap',
  params: { snapId: 'npm:hello-snap', request: { method: 'hello' } },
});

console.log(response); // 'world!'
```

### Snap requests

Snaps can also call some MetaMask JSON-RPC API methods using the `ethereum` global, which is an
[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) provider.

To expose `ethereum` to the Snap execution environment, a Snap must first request the
[`endowment:ethereum-provider`](../../reference/permissions.md#endowmentethereum-provider) permission.
For example, to call [`eth_requestAccounts`](/wallet/reference/eth_requestaccounts), first request
the required permission:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:ethereum-provider": {}
}
```

Your Snap can then call `eth_requestAccounts` in its source code:

```typescript title="index.ts"
await ethereum.request({
  "method": "eth_requestAccounts"
});
```

The `ethereum` global available to Snaps has fewer capabilities than `window.ethereum` for dapps.
Snaps can only use it to make read requests, not to write to the blockchain or initiate transactions.
Snaps can call all MetaMask API methods **except** the following:

- [`wallet_requestSnaps`](/wallet/reference/wallet_requestSnaps)
- [`wallet_requestPermissions`](/wallet/reference/wallet_requestPermissions)
- [`wallet_revokePermissions`](/wallet/reference/wallet_revokePermissions)
- [`wallet_addEthereumChain`](/wallet/reference/wallet_addEthereumChain)
- [`wallet_switchEthereumChain`](/wallet/reference/wallet_switchEthereumChain)
- [`wallet_watchAsset`](/wallet/reference/wallet_watchAsset)
- [`wallet_registerOnboarding`](/wallet/reference/wallet_registerOnboarding)
- [`wallet_scanQRCode`](/wallet/reference/wallet_scanQRCode)
- [`eth_sendRawTransaction`](/wallet/reference/eth_sendRawTransaction)
- [`eth_sendTransaction`](/wallet/reference/eth_sendTransaction)
- [`eth_signTypedData_v4`](/wallet/reference/eth_signTypedData_v4)
- [`eth_decrypt`](/wallet/reference/eth_decrypt)
- [`eth_getEncryptionPublicKey`](/wallet/reference/eth_getEncryptionPublicKey)

## Custom JSON-RPC APIs

Snaps can implement their own custom JSON-RPC APIs to communicate with dapps and other Snaps.
To do so, a Snap must expose the [`onRpcRequest`](../../reference/entry-points.md#onrpcrequest) entry
point and request the [`endowment:rpc`](../../reference/permissions.md#endowmentrpc) permission.

The Snap's custom API is entirely up to you, as long as it's a valid
[JSON-RPC](https://www.jsonrpc.org/specification) API.

:::note Does my Snap need a custom API?
If your Snap can do something useful without receiving and responding to JSON-RPC requests, such as
providing [transaction insights](../../reference/entry-points.md#ontransaction), you do not need to
implement a custom API.
However, if you want to do something such as manage the user's keys for a particular protocol and
create a dapp that sends transactions for that protocol via your Snap, you must implement a custom API.
:::

For example, to create a simple Snap with a custom API, first request the `endowment:rpc` permission:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:rpc": {
    "dapps": true // Enable dapps to make JSON-RPC requests.
  }
}
```

Your Snap can then implement and expose a custom API using the `onRpcRequest` function:

```typescript title="index.ts"
module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {
    // Expose a 'hello' JSON-RPC method to dapps.
    case 'hello':
      return 'world!';

    default:
      throw new Error('Method not found.');
  }
};
```

A dapp can then install the Snap and call the exposed method:

```javascript title="index.js"
// Request permission to connect to the Snap.
// If the Snap is not already installed, the user will be prompted to install it.
await window.ethereum.request({
  method: 'wallet_requestSnaps',
  params: {
    // Assuming the Snap is published to npm using the package name 'hello-snap'.
    'npm:hello-snap': {},
  },
});

// Invoke the 'hello' JSON-RPC method exposed by the Snap.
const response = await window.ethereum.request({
  method: 'wallet_invokeSnap',
  params: { snapId: 'npm:hello-snap', request: { method: 'hello' } },
});

console.log(response); // 'world!'
```