---
description: See the Snaps permissions reference.
sidebar_position: 5
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

To run [cron jobs](../features/cron-jobs.md) for the user, a Snap must request the `endowment:cronjob` permission.
This permission allows the Snap to specify cron jobs that trigger the
[`onCronjob`](../reference/entry-points.md#oncronjob) entry point.

This permission takes an object with an array of `jobs`, each containing two parameters:

- `expression` - A [cron expression](https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm)
  that defines the schedule of the job.
- `request` - A JSON-RPC request object that will be sent to the Snap's `onCronjob` entry point when
  the job is executed.

:::tip
You can modify the cron job's execution limit using [Snap-defined timeouts](#snap-defined-timeouts).
:::

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

To display a [home page](../features/custom-ui/home-pages.md) within MetaMask, a Snap must request
the `endowment:page-home` permission.
This permission allows the Snap to present a dedicated UI by exposing the
[`onHomePage`](../reference/entry-points.md#onhomepage) entry point.

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:page-home": {}
}
```

### `endowment:keyring`

For a dapp to call [Account Management API](keyring-api/account-management/index.md) methods on an
account management Snap to integrate [custom EVM accounts](../features/custom-evm-accounts/index.md),
the Snap must configure a list of allowed dapp URLs using the `allowedOrigins` field of the `endowment:keyring` permission.
This permission grants a Snap access to Account Management API requests sent to the Snap, using the
[`onKeyringRequest`](entry-points.md#onkeyringrequest) entry point.

If a dapp hosted on a domain not listed in the `allowedOrigins` attempts to call a Keyring API method,
MetaMask rejects the request.

:::tip
You can modify the Account Management API's execution limit using [Snap-defined timeouts](#snap-defined-timeouts).
:::

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:keyring": {
    "allowedOrigins": ["https://<dapp domain>"]
  }
}
```

### `endowment:lifecycle-hooks`

To implement a [lifecycle hook](../features/lifecycle-hooks.md) that runs an action when a user
installs or updates a Snap, the Snap must request the `endowment:lifecycle-hooks` permission.
This permission allows the Snap to expose the
[`onInstall`](../reference/entry-points.md#oninstall) and
[`onUpdate`](../reference/entry-points.md#onupdate)
entry points, which MetaMask calls after a successful installation or update, respectively.

:::tip
You can modify the lifecycle hooks' execution limit using [Snap-defined timeouts](#snap-defined-timeouts).
:::

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:lifecycle-hooks": {}
}
```

### `endowment:name-lookup`

:::flaskOnly
:::

To provide [custom name resolution](../features/custom-name-resolution.md), a Snap must request the
`endowment:name-lookup` permission.
This permission grants the Snap read-only access to user input or an address by exporting the
[`onNameLookup`](../reference/entry-points.md#onnamelookup) entry point.

This permission takes an object with two optional properties:

- `chains` - An array of [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md)
  chain IDs for which the Snap can resolve names and addresses.
  Pass this array to reduce overhead on your Snap by making sure it only receives requests for
  chains it can resolve.
- `matchers` - An object that helps reduce overhead by filtering the domains passed to your Snap.
  This must contain at least one of the following properties:
  - `tlds` - An array of strings for top-level domains that the Snap supports.
  - `schemes` - An array of strings for schemes that the Snap supports.

:::tip
You can modify the name lookup logic's execution limit using [Snap-defined timeouts](#snap-defined-timeouts).
:::

Specify this permission in the manifest file as follows:

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

In this example, the Snap's [`onNameLookup`](./entry-points.md#onnamelookup) entry point would be
called for domains such as `someuser.crypto` or schemes such as `farcaster:someuser`, as long as the
domain resolution is happening on Ethereum Mainnet.

### `endowment:network-access`

To access the internet, a Snap must request the `endowment:network-access` permission.
This permission exposes the global `fetch` API to the Snaps execution environment.

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:network-access": {}
}
```

### `endowment:rpc`

To handle arbitrary JSON-RPC requests, a Snap must request the `endowment:rpc` permission.
This permission grants a Snap access to JSON-RPC requests sent to the Snap, using the
[`onRpcRequest`](entry-points.md#onrpcrequest) entry point.

This permission requires an object with a `snaps` or `dapps` property (or both), to signal if the
Snap can receive JSON-RPC requests from other Snaps, or dapps, respectively.
The default for both properties is `false`.

:::tip
You can modify the RPC API's execution limit using [Snap-defined timeouts](#snap-defined-timeouts).
:::

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:rpc": {
    "dapps": true,
    "snaps": false
  }
}
```

#### Allowed origins

Alternatively, you can specify the caveat `allowedOrigins` to restrict all requests to specific domains or Snap IDs.
Calls from any other origins are rejected.

Specify this caveat in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:rpc": {
    "allowedOrigins": [
      "https://metamask.io",
      "https://consensys.io",
      "npm:@metamask/example-snap"
    ]
  }
}
```

:::note
If you specify `allowedOrigins`, you should not specify `dapps` or `snaps`.
:::

If you want to grant a dapp or Snap an automatic connection to your Snap, skipping the need for
users to confirm a connection, you can use [`initialConnections`](#initial-connections).

### `endowment:transaction-insight`

To provide [transaction insights](../features/transaction-insights.md) before a user signs a
transaction, a Snap must request the `endowment:transaction-insight` permission.
This permission grants a Snap read-only access to raw transaction payloads, before they're accepted
for signing by the user, by exposing the [`onTransaction`](../reference/entry-points.md#ontransaction)
entry point.

This permission requires an object with an `allowTransactionOrigin` property to signal if the Snap
should pass the `transactionOrigin` property as part of the `onTransaction` parameters.
This property represents the transaction initiator origin.
The default is `false`.

:::tip
You can modify the transaction insight logic's execution limit using [Snap-defined timeouts](#snap-defined-timeouts).
:::

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:transaction-insight": {
    "allowTransactionOrigin": true
  }
}
```

### `endowment:signature-insight`

:::flaskOnly
:::

To provide [signature insights](../features/signature-insights.md), a Snap must request the
`endowment:signature-insight` permission.
This permission grants a Snap read-only access to raw signature payloads, before they're accepted
for signing by the user, by exposing the [`onSignature`](./entry-points.md#onsignature) entry point.

This permission requires an object with an `allowSignatureOrigin` property to signal if the Snap
should pass the `signatureOrigin` property as part of the `onSignature` parameters.
This property represents the signature initiator origin.
The default is `false`.

Specify this permission in the manifest file as follows:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:signature-insight": {
    "allowSignatureOrigin": true
  }
},
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

### Snap-defined timeouts

Many endowments entail having MetaMask run arbitrary code defined in the Snap.
The default execution timeout is 60000 milliseconds, or one minute.

You can modify this execution timeout by adding a caveat `maxRequestTime` to the permission.
It can take values from `5000` (5 seconds) to `180000` (3 minutes).
For example:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:transaction-insight": {
    "maxRequestTime": 10000
  }
}
```

The following endowments accept this caveat:

- [`endowment:cronjob`](#endowmentcronjob)
- [`endowment:keyring`](#endowmentkeyring)
- [`endowment:lifecycle-hooks`](#endowmentlifecycle-hooks)
- [`endowment:name-lookup`](#endowmentname-lookup)
- [`endowment:page-home`](#endowmentpage-home)
- [`endowment:rpc`](#endowmentrpc)
- [`endowment:transaction-insight`](#endowmenttransaction-insight)

## Dynamic permissions

### `eth_accounts`

A Snap can request permission to call the [`eth_accounts`](/wallet/reference/eth_accounts) MetaMask
JSON-RPC API method by calling [`eth_requestAccounts`](/wallet/reference/eth_requestaccounts).
Calling `eth_requestAccounts` requires the
[`endowment:ethereum-provider`](#endowmentethereum-provider) permission:

<Tabs>
<TabItem value="Manifest file">

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:ethereum-provider": {}
}
```

</TabItem>
<TabItem value="JavaScript">

```js title="index.js"
await ethereum.request({ method: "eth_requestAccounts" })
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
  "id": "47vm2UUi1pccNAeYKGmwF",
  "parentCapability": "eth_accounts",
  "invoker": "npm:SNAP_ID",
  "caveats": [
    {
      "type": "restrictReturnedAccounts",
      "value": ["0xc403b37bf1e700cb214ea1be9de066824b420de6"]
    }
  ],
  "date": 1692616452846
}
```

The user can revoke this permission by going to the Snap's settings under **Snap permissions**.

## Initial connections

A Snap can authorize specific dapps or Snaps to automatically connect,
skipping the need for users to manually confirm a connection when the dapp or Snap calls
[`wallet_requestSnaps`](../reference/wallet-api-for-snaps.md#wallet_requestsnaps).

The following is an example of specifying `initialConnections` for a dapp:

```json title="snap.manifest.json"
"initialConnections": {
  "https://voyager-snap.linea.build": {}
}
```

When a user visits the dapp and the dapp calls `wallet_requestSnaps`, if the Snap is already
installed, the dapp connects immediately and can make further calls to the Snap.
If the Snap is not installed, the user sees a confirmation to install the Snap.

Learn more about [allowing automatic connections](../how-to/allow-automatic-connections.md).

:::caution important
`initialConnections` is not a replacement for [`endowment:rpc`](#endowmentrpc).
`endowment:rpc` is still required to allow dapps or Snaps to call RPC methods of your Snap.
:::
