---
description: See the Wallet API for Snaps reference.
sidebar_position: 2
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Wallet API for Snaps

Dapps can install and communicate with Snaps using a subset of the
[Wallet JSON-RPC API](/wallet/concepts/wallet-api/#json-rpc-api).
This page is a reference for those Snaps-specific methods.

:::note
See the [Wallet JSON-RPC API interactive reference](/wallet/reference/json-rpc-methods) for the other
methods dapps can call.
:::

## `wallet_getSnaps`

Returns the IDs of the dapp's permitted Snaps and some relevant metadata.

### Returns

An object mapping the IDs of permitted Snaps to their metadata:

- `id`: `string` - The ID of the Snap.
- `initialPermissions`: `string` - The initial permissions of the Snap, which will be requested when
  the Snap is installed.
- `version`: `string` - The version of the Snap.
- `enabled`: `boolean` - Indicates whether the Snap is enabled.
- `blocked`: `boolean` - Indicates whether the Snap is blocked.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
  method: "wallet_getSnaps",
  params: [],
})
```

</TabItem>
<TabItem value="Result">

```json
{
  "npm:@metamask/example-snap": {
    "version": "1.0.0",
    "id": "npm:@metamask/example-snap",
    "enabled": true,
    "blocked": false
  }
}
```

</TabItem>
</Tabs>

## `wallet_requestSnaps`

[Requests permission](../how-to/request-permissions.md#request-permissions-from-a-dapp) for a dapp
to communicate with the specified Snaps and attempts to install them if they're not already installed.

If the Snap version range is specified, MetaMask attempts to install a version of the Snap that
satisfies the range.
If a compatible version of the Snap is already installed, the request succeeds.
If an incompatible version is installed, MetaMask attempts to update the Snap to the latest version
that satisfies the range.
The request succeeds if the Snap is successfully installed.

If the installation of any Snap fails, this method returns the error that caused the failure.

:::note
A dapp must call this method on Snap before calling [`wallet_snap`](#wallet_snap) or
[`wallet_invokeSnap`](#wallet_invokesnap) on the Snap.
:::

### Parameters

An object mapping the IDs of the requested Snaps to optional SemVer version ranges.
The SemVer version ranges use the same semantics as npm `package.json` ranges.

### Returns

An object mapping the IDs of permitted Snaps to their metadata:

- `id`: `string` - The ID of the Snap.
- `initialPermissions`: `string` - The initial permissions of the Snap, which will be requested when
  the Snap is installed.
- `version`: `string` - The version of the Snap.
- `enabled`: `boolean` - Indicates whether the Snap is enabled.
- `blocked`: `boolean` - Indicates whether the Snap is blocked.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
  method: "wallet_requestSnaps",
  params: {
    "npm:@metamask/example-snap": {},
    "npm:foo-snap": {
      version: "^1.0.2",
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
{
  "npm:@metamask/example-snap": {
    "version": "1.0.0",
    "id": "npm:@metamask/example-snap",
    "enabled": true,
    "blocked": false
  },
  "npm:foo-snap": {
    "version": "1.0.5",
    "id": "npm:foo-snap",
    "enabled": true,
    "blocked": false
  }
}
```

</TabItem>
</Tabs>

## `wallet_snap`

Calls the specified JSON-RPC API method of the specified Snap.
The Snap must be installed and the dapp must have permission to communicate with the Snap, or the
request is rejected.
The dapp can install the Snap and request permission to communicate with it using
[`wallet_requestSnaps`](#wallet_requestsnaps).

This method is synonymous to [`wallet_invokeSnap`](#wallet_invokesnap).

### Parameters

An object containing:

- `snapId`: `string` - The ID of the Snap to invoke.
- `request`: `object` - The JSON-RPC request object to send to the invoked Snap.

### Returns

The result of the Snap method call.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
  method: "wallet_snap",
  params: {
    snapId: "npm:@metamask/example-snap",
    request: {
      method: "hello",
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
{}
```

</TabItem>
</Tabs>

## `wallet_invokeSnap`

Calls the specified JSON-RPC API method of the specified Snap.
The Snap must be installed and the dapp must have permission to communicate with the Snap, or the
request is rejected.
The dapp can install the Snap and request permission to communicate with it using
[`wallet_requestSnaps`](#wallet_requestsnaps).

This method is synonymous to [`wallet_snap`](#wallet_snap).

### Parameters

An object containing:

- `snapId`: `string` - The ID of the Snap to invoke.
- `request`: `object` - The JSON-RPC request object to send to the invoked Snap.

### Returns

The result of the Snap method call.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@metamask/example-snap",
    request: {
      method: "hello",
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
{}
```

</TabItem>
</Tabs>
