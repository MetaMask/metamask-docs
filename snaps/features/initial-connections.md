---
description: Authorize specific websites to automatically connect to a Snap.
sidebar_position: 5.5
---

# Initial Connections

You can authorize specific websites or Snaps to automatically connect, skipping the need for users to manually confirm a connection when the website or Snap calls `wallet_requestSnaps`.

To do so, add an [`initialConnections`](../reference/permissions.md#initial-connections) section at the top-level of `snap.manifest.json`. Include each website you want to allow to automatically connect:

```json title="snap.manifest.json"
"initialConnections": {
  "https://my-secure-site.com": {},
  "https://www.other-allowed-site.com": {}
}
```

## Relationship to `endowment:rpc`

`initialConnections` is not a replacement for `endowment:rpc`. The latter is still required to allow websites or Snaps to call RPC methods of your Snap.