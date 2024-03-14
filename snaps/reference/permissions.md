---
description: See the Snaps permissions reference.
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Snaps permissions

Snaps can [request the following permissions](../how-to/request-permissions.md).

## RPC API permissions

You must request permission to call [Snaps API methods](snaps-api.md).
For example, to request to call [`snap_dialog`](snaps-api.md#snap_dialog), add the following to the
manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "snap_dialog": {}
}
```

## Endowments

### `endowment:cronjob`

To run periodic actions for the user (cron jobs), a Snap must request the `endowment:cronjob` permission.
This permission allows the Snap to specify cron jobs that trigger the
[`onCronjob`](../reference/entry-points.md#oncronjob) entry point.

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:cronjob": {
    "jobs": [
      {
        "expression": "* * * * *",
        "request": {
          "method": "exampleMethodOne",
          "params": {
            "param1": "foo"
          }
        }
      },
      {
        "expression": "*/2 * * * *",
        "request": {
          "method": "exampleMethodTwo",
          "params": {
            "param1": "bar"
          }
        }
      }
    ]
  }
}

```

### `endowment:ethereum-provider`

To communicate with a node using MetaMask, a Snap must request the `endowment:ethereum-provider` permission.
This permission exposes the `ethereum` global to the Snap execution environment, allowing Snaps to
call some [MetaMask JSON-RPC API](/wallet/reference/json-rpc-api) methods.
This global is an [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) provider.

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:ethereum-provider": {}
}
```

:::note 
The `ethereum` global available to Snaps has fewer capabilities than `window.ethereum` for dapps. 
See the [list of methods](../learn/about-snaps/apis.md#metamask-json-rpc-api) not available to Snaps.
:::

### `endowment:page-home`

To present a dedicated UI within MetaMask, a Snap must request the `endowment:page-home` permission. 
This permission allows the Snap to specify a "home page" by exposing the
[`onHomePage`](../reference/entry-points.md#onhomepage) entry point. 
You can use any [custom UI components](../features/custom-ui.md) to build an embedded home page accessible through the Snaps menu.

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:page-home": {}
}
```

### `endowment:keyring`

For a dapp to call [Keyring API](../features/custom-evm-accounts/index.md) methods on an account management Snap,
the Snap must configure a list of allowed dapp URLs using the `endowment:keyring` permission.
If a dapp hosted on a domain not listed in the `allowedOrigins` attempts to call a Keyring API method,
MetaMask rejects the request.

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:keyring": {
    "allowedOrigins": ["https://<dapp domain>"]
  }
}
```

### `endowment:lifecycle-hooks`

To run an action when the user installs or updates the Snap, a Snap must request the `endowment:lifecycle-hooks` permission.
This permission allows the Snap to expose the 
[`onInstall`](../reference/entry-points.md#oninstall) and 
[`onUpdate`](../reference/entry-points.md#onupdate) 
entry points, which MetaMask calls after a successful installation or update, respectively.

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:lifecycle-hooks": {}
}
```

### `endowment:name-lookup`

To provide name resolution, a snap must request the `endowment:name-lookup` permission.
This permission grants the snap read-only access to user input or an address by exporting the
[`onNameLookup`](../reference/entry-points.md#onnamelookup) method.

This permission takes an object with two optional properties:

- `chains` - an array of [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md) chain IDs for which the Snap can resolve names and addresses. Pass this array to reduce overhead on your Snap by making sure it only receives requests for chains it can resolve.
- `matchers` - an object that helps reduce overhead by further filtering the domains that are passed to your Snap. It must contain at least one of the following properties:

  - `tlds` - an array of strings for top-level domains that the Snap supports.
  - `schemes` - an array of strings for schemes that the Snap supports.

Specify this permission in the manifest file as in the example below:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:name-lookup": {
    "chains": ["eip155:1"],
    "matchers": {
      "tlds": ["crypto"],
      "schemes": ["farcaster"]
    }
  }
},
```

With the previous example, the Snap's [`onNameLookup` entry point](./entry-points.md#onnamelookup) would be called for domains such as `someuser.crypto` or `farcaster:someuser`, as long as the domain resolution is happening on Ethereum Mainnet.

### `endowment:network-access`

To access the internet, a Snap must request the `endowment:network-access` permission.
This permission exposes the global `fetch` API to the Snaps execution environment.

:::caution
`XMLHttpRequest` isn't available in Snaps, and you should replace it with `fetch`.
If your dependencies use `XMLHttpRequest`, you can
[patch it away](../how-to/debug-a-snap/common-issues.md#patch-the-use-of-xmlhttprequest).
:::

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:network-access": {}
}
```

#### Same-origin policy and CORS

`fetch()` requests in a Snap are bound by the browser's [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#cross-origin_network_access).
Since Snap code is executed in an iframe with the `sandbox` property, the browser sends an `Origin`
header with the value `null` with outgoing requests.
For the Snap to be able to read the response, the server must send an
[`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) CORS header
with the value `*` or `null` in the response.

### `endowment:rpc`

To handle arbitrary JSON-RPC requests, a Snap must request the `endowment:rpc` permission.
This permission grants a Snap access to JSON-RPC requests sent to the Snap, using the
[`onRpcRequest`](entry-points.md#onrpcrequest) entry point.

This permission requires an object with a `snaps` or `dapps` property (or both), to signal if the
Snap can receive JSON-RPC requests from other Snaps, or dapps, respectively.
The default for both properties is `false`.

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:rpc": {
    "dapps": true,
    "snaps": false
  }
}
```

Alternatively, you can specify the caveat `allowedOrigins` to restrict requests to specific domains or Snap IDs. 
Calls from any other origins are rejected. 

Specify this caveat in the manifest file as follows: 

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:rpc": { 
    "allowedOrigins": [
      "metamask.io", 
      "consensys.io",
      "npm:@metamask/example-snap"
    ] 
  }
}
```

:::note
If you specify `allowedOrigins`, you should not specify `dapps` or `snaps`. 
:::

### `endowment:transaction-insight`

To provide transaction insights, a Snap must request the `endowment:transaction-insight` permission.
This permission grants a Snap read-only access to raw transaction payloads, before they're accepted
for signing by the user, by exposing the [`onTransaction`](../reference/entry-points.md#ontransaction)
entry point.

This permission requires an object with an `allowTransactionOrigin` property to signal if the Snap
should pass the `transactionOrigin` property as part of the `onTransaction` parameters.
This property represents the transaction initiator origin.
The default is `false`.

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:transaction-insight": {
    "allowTransactionOrigin": true
  }
}
```

### `endowment:webassembly`

To use WebAssembly, a Snap must request the `endowment:webassembly` permission.
This permission exposes the global `WebAssembly` API to the Snap execution environment.

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:webassembly": {}
}
```

## Dynamic permissions

### `eth_accounts`

A Snap can request permission to call the [`eth_accounts`](/wallet/reference/eth_accounts) MetaMask
JSON-RPC API method by calling [`eth_requestAccounts`](/wallet/reference/eth_requestaccounts).
Calling `eth_requestAccounts` requires the
[`endowment:ethereum-provider`](#endowmentethereum-provider) permission:

<Tabs>
<TabItem value="Manifest file">

```json
"initialPermissions": {
  "endowment:ethereum-provider": {}
}
```

</TabItem>
<TabItem value="JavaScript">

```js
await ethereum.request({
  "method": "eth_requestAccounts"
});
```

</TabItem>
</Tabs>

You can check the presence of the permission by calling
[`wallet_getPermissions`](/wallet/reference/wallet_getpermissions).
If the permission is present, the result contains a permission with a `parentCapability` of `eth_accounts`.
The permission contains a `restrictReturnedAccounts` caveat, an array of all the accounts the user
allows for this Snap.
The following is an example `eth_accounts` permission:

```json
{
  "id": "47vm2UUi1pccNAeYKGmwF", // example
  "parentCapability": "eth_accounts",
  "invoker": "npm:SNAP_ID",
  "caveats": [
    {
      "type": "restrictReturnedAccounts",
      "value": [
        "0xc403b37bf1e700cb214ea1be9de066824b420de6" // example connected account #1
      ]
    }
  ],
  "date": 1692616452846
}
```

The user can revoke this permission by going to the Snap's settings under **Snap permissions**.