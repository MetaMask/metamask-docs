---
description: Snaps permissions reference
sidebar_position: 4
---

# Snaps permissions

Your snap can [request the following permissions](../how-to/request-permissions.md).

## RPC API permissions

You must request permission to use any
[restricted JSON-RPC API methods](rpc-api.md#restricted-methods).

For example, to request to use [`snap_dialog`](rpc-api.md#snap_dialog), add the following to the
manifest file:

```json
"initialPermissions": {
  "snap_dialog": {}
},
```

## Endowments

### endowment:cronjob

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

### endowment:ethereum-provider

To communicate with a node using MetaMask, a snap must request the `endowment:ethereum-provider` permission.
This permission exposes the global API `ethereum` to the snap execution environment.
This global is an EIP-1193 provider.

Specify this permission in the manifest file as follows:

```json
"initialPermissions": {
  "endowment:ethereum-provider": {}
},
```

:::note 
The global `ethereum` API in Snaps has fewer capabilities than `window.ethereum` for dapps. 
You can only use it to make read requests from the RPC provider, not to write to the blockchain or initiate transactions. 
You can also use it to connect to Ethereum accounts with `eth_requestAccounts` and then use `personal_sign` with 
those connected accounts.
:::

### endowment:name-lookup

To provide name resolution, a snap must request the `endowment:name-lookup` permission.
This permission grants a snap read-only access to user input or an address by exporting the [`onNameLookup`](../reference/exports.md#onnamelookup) method.

This permission takes an optional array of [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md) chain IDs for which the Snap can resolve names and addresses.

Specify this permission in the manifest file as follows:

```json
"initialPermissions": {
  "endowment:name-lookup": [
    "eip155:1"
  ]
},
```

### endowment:network-access

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

#### Same-origin policy and CORS

`fetch()` requests in a snap are bound by the browser's [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#cross-origin_network_access).
Since snap code is executed in an iframe with the `sandbox` property, the browser sends an `Origin`
header with the value `null` with outgoing requests.
For the snap to be able to read the response, the server must send an
[`Access-Control-Allow-Origin`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) CORS header
with the value `*` or `null` in the response.

### endowment:rpc

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

### endowment:transaction-insight

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

### endowment:webassembly

To use WebAssembly, a snap must request the `endowment:webassembly` permission.
This permission exposes the global `WebAssembly` API to the snap execution environment.

Specify this permission in the manifest file as follows:

```json
"initialPermissions": {
  "endowment:webassembly": {}
},
```

## Dynamic permissions

Dynamic permissions are not requested in the manifest file.
Instead, your snap can acquire dynamic permissions during its lifecycle.

### eth_accounts

A snap can request permission to call the Ethereum provider's [`eth_accounts`](/wallet/reference/eth_accounts)
RPC method by calling the provider's [`eth_requestAccounts`](/wallet/reference/eth_requestaccounts) RPC method.
Calling `eth_requestAccounts` requires the [`ethereum-provider`](#endowmentethereum-provider) endowment.

You can check the presence of the permission by calling [`wallet_getPermissions`](/wallet/reference/wallet_getpermissions).
If the permission is present, the result contains a permission with a `parentCapability` of `eth_accounts`.
It comes with a caveat of `restrictReturnedAccounts`, an array of all the accounts the user allows for this snap.
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

The user can revoke this permission by going to the snap's settings under **Snap permissions**.