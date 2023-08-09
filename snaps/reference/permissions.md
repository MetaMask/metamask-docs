---
description: Snaps permissions reference
sidebar_position: 4
---

# Snaps permissions

You can [request the following permissions](../how-to/request-permissions.md) in your snap manifest
file.

## endowment:cronjob

To run periodic actions for the user (cron jobs), a snap must request the `endowment:cronjob` permission.
This permission allows the snap to specify cron jobs that trigger the exported
[`onCronjob`](../reference/exports.md#oncronjob) method.

Specify this permission in the manifest file as follows:

```json
{
  "initialPermissions": {
    "endowment:cronjob": {
      "jobs": [
        {
          "expression": {
            "minute": "*",
            "hour": "*",
            "dayOfMonth": "*",
            "month": "*",
            "dayOfWeek": "*"
          },
          "request": {
            "method": "exampleMethodOne",
            "params": {
              "param1": "foo"
            }
          }
        },
        {
          "expression": "* * * * *",
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
}
```

## endowment:ethereum-provider

To communicate with a node using MetaMask, a snap must request the `endowment:ethereum-provider` permission.
This permission exposes the global API `ethereum` to the snap execution environment.
This global is an EIP-1193 provider.

Specify this permission in the manifest file as follows:

```json
"initialPermissions": {
  "endowment:ethereum-provider": {}
},
```

## endowment:long-running

A snap that is computationally heavy and can't finish execution within the
[snap lifecycle requirements](../concepts/lifecycle.md) must request the `endowment:long-running` permission.
This permission allows the snap to run indefinitely while processing RPC requests.

Specify this permission in the manifest file as follows:

```json
"initialPermissions": {
  "endowment:long-running": {}
},
```

## endowment:network-access

To access the internet, a snap must request the `endowment:network-access` permission.
This permission exposes the global `fetch` API to the Snaps execution environment.

:::caution
`XMLHttpRequest` isn't available in Snaps, and you should replace it with `fetch`.
If your dependencies use `XMLHttpRequest`, you can
[patch it away](../how-to/troubleshoot.md#patch-the-use-of-xmlhttprequest).
:::

Specify this permission in the manifest file as follows:

```json
"initialPermissions": {
  "endowment:network-access": {}
},
```

### Same-origin policy and CORS

`fetch()` requests in a snap are bound by browsers' [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#cross-origin_network_access). Since snap code is executed in an iframe with the `sandbox` property, the browser sends an `Origin` header with the value `null` with outgoing requests. For the snap to be able to read the response, the server must send an [`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) CORS header with the value `*` or `null` in the response.

## endowment:rpc

To handle arbitrary JSON-RPC requests, a snap must request the `endowment:rpc` permission.
This permission grants a snap access to JSON-RPC requests sent to the snap, using the exported
[`onRpcRequest`](exports.md#onrpcrequest) method.

This permission requires an object with a `snaps` or `dapps` property (or both), to signal if the
snap can receive JSON-RPC requests from other snaps, or dapps, respectively.
The default for both properties is `false`.

Specify this permission in the manifest file as follows:

```json
{
  "initialPermissions": {
    "endowment:rpc": {
      "dapps": true,
      "snaps": false
    }
  }
}
```

## endowment:transaction-insight

To provide transaction insights, a snap must request the `endowment:transaction-insight` permission.
This permission grants a snap read-only access to raw transaction payloads, before they're accepted
for signing by the user, by exporting the [`onTransaction`](../reference/exports.md#ontransaction) method.

This permission requires an object with an `allowTransactionOrigin` property to signal if the snap
should pass the `transactionOrigin` property as part of the `onTransaction` parameters.
This property represents the transaction initiator origin.
The default is `false`.

Specify this permission in the manifest file as follows:

```json
"initialPermissions": {
  "endowment:transaction-insight": {
    "allowTransactionOrigin": true
  }
},
```

## endowment:webassembly

To use WebAssembly, a snap must request the `endowment:webassembly` permission.
This permission exposes the global `WebAssembly` API to the snap execution environment.

Specify this permission in the manifest file as follows:

```json
"initialPermissions": {
  "endowment:webassembly": {}
},
```

## snap_notify 
To display a notification in MetaMask or natively in the browser, a snap must request `snap_notify` permission.
Specify this permission in the manifest file as follows:

```json
"initialPermissions": {
  "snap_notify": {},
},
```
## snap_dialog
To display a dialog in the MetaMask UI, a snap must request `snap_dialog` permission.
Specify this permission in the manifest file as follows:

```json
"initialPermissions": {
  "snap_dialog": {},
},
```
