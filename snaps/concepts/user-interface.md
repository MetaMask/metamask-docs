---
description: Learn about the user interface of a Snap.
sidebar_position: 3
---

# Snaps user interface

Any Snap must represent itself and what it does to the end user.
Using the MetaMask settings page, the user can see their installed Snaps.
For each Snap, the user can:

- See most of its manifest data.
- See its execution status (running, stopped, or crashed).
- Enable and disable the Snap.

Other than the settings page, a Snap can modify the MetaMask UI using
[custom UI](../how-to/use-custom-ui.md) in only two ways:

- By opening a dialog using the [`snap_dialog`](../reference/rpc-api.md#snap_dialog) RPC method.
- By returning transaction insights from the [`onTransaction`](../reference/entry-points.md#ontransaction)
  entry point.

This means that most Snaps must rely on dapps/websites and their own RPC methods to present their
data to the user.

Providing more ways for Snaps to modify the MetaMask UI is an important goal of the Snaps system,
and over time more and more Snaps will be able to contain their user interfaces entirely within
MetaMask itself.
