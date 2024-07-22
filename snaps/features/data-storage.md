---
description: Store encrypted and unencrypted data within a Snap.
sidebar_position: 5
---

# Data storage

You can store and manage sensitive information within a Snap using encrypted storage, or
non-sensitive information using unencrypted storage.
Use the [`snap_manageState`](../reference/snaps-api.md#snap_managestate) API method to persist up to
100 MB of data to the user's disk and retrieve it at will.
We recommend using this method for storing data in a Snap long term.

:::caution important
Snaps are installed in each user's MetaMask instance.
If a Snap stores data, that data is specific to that user's MetaMask instance.
However, this data can be shared across multiple dapps.
Do not assume that the data a Snap stores is unique to a single dapp unless it is specifically designed to be that way.
:::

## Request permission to store data

To store data within a Snap, first request the
[`snap_manageState`](../reference/snaps-api.md#snap_managestate) permission.
Add the following to your Snap's manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "snap_manageState": {}
}
```

## Use encrypted storage

By default, [`snap_manageState`](../reference/snaps-api.md#snap_managestate) automatically encrypts
data using a Snap-specific key before storing it on the user's disk, and automatically decrypts it
when retrieved.
This is useful to store sensitive information, such as passwords.

The following example uses `snap_manageState` to store some data using the `update` operation, and
retrieves the data at a later time using the `get` operation.
When the data is no longer required, the Snap's state is cleared using the `clear` operation.

```javascript title="index.js"
// Persist some data.
await snap.request({
  method: "snap_manageState",
  params: {
    operation: "update",
    newState: { hello: "world" },
  },
})

// At a later time, get the stored data.
const persistedData = await snap.request({
  method: "snap_manageState",
  params: { operation: "get" },
})

console.log(persistedData)
// { hello: "world" }

// If data storage is no longer necessary, clear it.
await snap.request({
  method: "snap_manageState",
  params: {
    operation: "clear",
  },
})
```

:::tip
Accessing encrypted state requires MetaMask to be unlocked.
If you need to access encrypted state in a background task such as a [cron job](cron-jobs.md), use
[`snap_getClientStatus`](../reference/snaps-api.md#snap_getclientstatus) to ensure that MetaMask is
unlocked before accessing state, preventing an unexpected password request.
:::

## Use unencrypted storage

To use unencrypted storage, set `encrypted` to `false` when storing, retrieving, or clearing data
using [`snap_manageState`](../reference/snaps-api.md#snap_managestate).
The Snap will use a storage section separate from the encrypted storage, and will not encrypt the data.
This is useful to access non-sensitive data from background operations such as
[cron jobs](cron-jobs.md), without requiring the user to enter their password in the case that
MetaMask is locked.

```javascript title="index.js"
// Persist some data.
await snap.request({
  method: "snap_manageState",
  params: {
    operation: "update",
    newState: { hello: "world" },
    encrypted: false,
  },
})

// At a later time, get the stored data.
const persistedData = await snap.request({
  method: "snap_manageState",
  params: {
    operation: "get",
    encrypted: false,
  },
})

console.log(persistedData)
// { hello: "world" }

// If data storage is no longer necessary, clear it.
await snap.request({
  method: "snap_manageState",
  params: {
    operation: "clear",
    encrypted: false,
  },
})
```

## Example

See the [`@metamask/manage-state-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/manage-state)
package for a full example of storing data using [`snap_manageState`](../reference/snaps-api.md#snap_managestate).
This example exposes a [custom JSON-RPC API](../learn/about-snaps/apis.md#custom-json-rpc-apis) for
dapps to store, retrieve, and clear data.
