---
description: Authorize specific websites to automatically connect to a Snap.
sidebar_position: 5
---

# Allow automatic connections

You can authorize specific dapps or Snaps to automatically connect to your Snap, skipping the need
for users to manually confirm a connection when the dapp or Snap calls
[`wallet_requestSnaps`](../reference/wallet-api-for-snaps.md#wallet_requestsnaps).

To do so, add an `initialConnections` field in the Snap
[manifest file](../learn/about-snaps/files.md#manifest-file), specifying each website you want to
allow to automatically connect.
For example:

```json title="snap.manifest.json"
"initialConnections": {
  "https://my-secure-site.com": {},
  "https://www.other-allowed-site.com": {}
}
```

When a user visits a website specified in `initialConnections`, and the website calls
`wallet_requestSnaps`, if the Snap is already installed, the website connects immediately and can
make further calls to the Snap.
If the Snap is not installed, the user sees a confirmation to install the Snap.

When testing, you can specify the local site.
For example:

```json title="snap.manifest.json" 
"initialConnections": {
  "http://localhost:8000": {}
}
```

We recommend removing local sites before deploying your Snap to production.

:::caution important
`initialConnections` is not a replacement for [`endowment:rpc`](../reference/permissions.md#endowmentrpc).
`endowment:rpc` is still required to allow dapps or Snaps to call RPC methods of your Snap.
:::
