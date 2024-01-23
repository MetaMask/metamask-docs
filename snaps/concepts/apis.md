---
description: Learn about the Snaps APIs.
sidebar_position: 2
---

# About the Snaps APIs

## Snaps API

Snaps can access the global object `snap`.
You can use this object to make Snaps-specific JSON-RPC requests.

## MetaMask JSON-RPC API

Dapps can interact with Snaps using the following MetaMask JSON-RPC API methods:

- `wallet_getSnap`
- `wallet_requestSnaps`
- `wallet_snap`
- `wallet_invokeSnap`

Snaps can also call some MetaMask JSON-RPC API methods using the `ethereum` global.
To expose `ethereum` to the Snap execution environment, a Snap must first request the
[`endowment:ethereum-provider`](../reference/permissions.md#endowmentethereum-provider) permission.

The global `ethereum` API in Snaps has fewer capabilities than `window.ethereum` for dapps.
You can only use it to make read requests from the RPC provider, not to write to the blockchain or
initiate transactions.

Snaps cannot call the following MetaMask API methods:

- `wallet_requestSnaps`
- `wallet_requestPermissions`
- `wallet_revokePermissions`
- `wallet_addEthereumChain`
- `wallet_switchEthereumChain`
- `wallet_watchAsset`
- `wallet_registerOnboarding`
- `wallet_scanQRCode`
- `eth_sendRawTransaction`
- `eth_sendTransaction`
- `eth_signTypedData_v4`
- `eth_decrypt`
- `eth_getEncryptionPublicKey`

## Custom JSON-RPC APIs

To communicate with the outside world, the Snap must implement its own JSON-RPC API by exposing
the exported function [`onRpcRequest`](../reference/exports.md#onrpcrequest).
Whenever the Snap receives a JSON-RPC request from a dapp or another Snap, this handler function is
called with the specified parameters.

The Snap's RPC API is completely up to you, as long as it's a valid
[JSON-RPC](https://www.jsonrpc.org/specification) API.

For example, consider this simple Snap, `Hello World`:

```typescript title="index.ts"
module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {
    // Expose a "hello" RPC method to dapps
    case "hello":
      return "world!";

    default:
      throw new Error("Method not found.");
  }
};
```

If a dapp wants to use `Hello World`, assuming the Snap is published to npm using the
package name `hello-snap`, the dapp can implement something like this:

```javascript
// Connect to the Snap, enabling its usage inside the dapp
// If the Snap is not already installed, the MetaMask user 
// will be prompted to install it
await window.ethereum.request({
  method: "wallet_requestSnaps",
  params: {
    "npm:hello-snap": {},
  },
});

// Invoke the "hello" RPC method exposed by the Snap
const response = await window.ethereum.request({
  method: "wallet_invokeSnap",
  params: { snapId: "npm:hello-snap", request: { method: "hello" } },
});

console.log(response); // 'world!'
```

:::note
Your Snap doesn't need to have an RPC API.
If your Snap can do something useful without receiving and responding to JSON-RPC requests, such as
providing [transaction insights](../reference/exports.md#ontransaction), then you can skip exporting
`onRpcRequest`.
However, if you want to do something such as manage the user's keys for a particular protocol and
create a dapp that, for example, sends transactions for that protocol using your Snap, you must
specify an RPC API.
:::
