---
description: Learn about the Snaps APIs.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# About the Snaps APIs

Snaps, dapps, and MetaMask can communicate with each other using the [Snaps API](#snaps-api),
[MetaMask JSON-RPC API](#metamask-json-rpc-api), and [custom JSON-RPC APIs](#custom-json-rpc-apis).

## Snaps API

Snaps can access the global object `snap`, which has one method: `request`.
You can use this object to make [Snaps API](../reference/snaps-api.md) requests.
These API methods allow Snaps to extend or modify the functionality of MetaMask.
To call each method, you must first [request permission](../how-to/request-permissions.md) in the
Snap manifest file.

For example, to call [`snap_notify`](../reference/snaps-api.md#snap_notify):

<Tabs>
<TabItem value="Request permission">

```json title="snap.manifest.json"
"initialPermissions": {
  "snap_notify": {}
}
```

</TabItem>
<TabItem value="Call method">

```typescript title="index.ts"
await snap.request({
  method: 'snap_notify',
  params: {
    type: 'inApp',
    message: 'Hello, world!',
  },
});
```

</TabItem>
</Tabs>

## MetaMask JSON-RPC API

### Dapp requests

Dapps can install and communicate with Snaps using the following
[MetaMask JSON-RPC API](/wallet/reference/json-rpc-api) methods:

- `wallet_getSnap` - Gets the dapp's permitted Snaps.
- `wallet_requestSnaps` - Requests permission to communicate with the specified Snaps.
- `wallet_snap` - (Restricted) Calls the specified custom JSON-RPC API method of the specified Snap.
- `wallet_invokeSnap` - (Restricted) Synonymous with `wallet_snap`.

To call restricted methods, a dapp must first request permission using
[`wallet_requestPermissions`](/wallet/reference/wallet_requestpermissions).
For example, to call `wallet_snap`:

<Tabs>
<TabItem value="Request permission">

```js title="index.js"
await window.ethereum.request({
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

</TabItem>
<TabItem value="Call method">

```js title="index.js"
await window.ethereum.request({
  'method': 'wallet_snap',
  'params': [
    {
      'snapId': 'npm:@metamask/example-snap',
      'request': {
        'method': 'hello'
      }
    }
  ]
});
```

</TabItem>
</Tabs>

### Snap requests

Snaps can also call some MetaMask JSON-RPC API methods using the `ethereum` global, which is an
[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) provider.
To expose `ethereum` to the Snap execution environment, a Snap must first request the
[`endowment:ethereum-provider`](../reference/permissions.md#endowmentethereum-provider) permission.

For example, to call [`eth_requestAccounts`](/wallet/refernce/eth_requestaccounts):

<Tabs>
<TabItem value="Request permission">

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:ethereum-provider": {}
}
```

</TabItem>
<TabItem value="Call method">

```typescript title="index.ts"
await ethereum.request({
  "method": "eth_requestAccounts"
});
```

</TabItem>
</Tabs>

The `ethereum` global available to Snaps has fewer capabilities than `window.ethereum` for dapps.
Snaps can only use it to make read requests, not to write to the blockchain or initiate transactions.
Snaps can call all MetaMask API methods **except** the following:

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

Snaps can implement their own custom JSON-RPC APIs to communicate with dapps and other Snaps.
To do so, a Snap must export the [`onRpcRequest`](../reference/exports.md#onrpcrequest) function and
request the [`endowment:rpc`](../reference/permissions.md#endowmentrpc) permission.

The Snap's custom API is entirely up to you, as long as it's a valid
[JSON-RPC](https://www.jsonrpc.org/specification) API.

:::note Does my Snap need a custom API?
If your Snap can do something useful without receiving and responding to JSON-RPC requests, such as
providing [transaction insights](../reference/exports.md#ontransaction), you do not need to
implement a custom API.
However, if you want to do something such as manage the user's keys for a particular protocol and
create a dapp that sends transactions for that protocol via your Snap, you must implement a custom API.
:::

For example, to create a simple Snap, `Hello World`, and invoke its JSON-RPC method `hello` from a dapp:

<Tabs>
<TabItem value="Request permission">

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:rpc": {
    "dapps": true // Enable dapps to make JSON-RPC requests.
  }
}
```

</TabItem>
<TabItem value="Expose method from a Snap">

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

</TabItem>
<TabItem value="Call method from a dapp">

```javascript title="index.js"
// Connect to the Snap, enabling its usage inside the dapp.
// If the Snap is not already installed, the MetaMask user will be prompted to
// install it.
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

</TabItem>
</Tabs>
