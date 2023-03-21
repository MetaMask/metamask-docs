---
description: Learn about the user interface of a snap.
---

# Snap user interface

Any snap must represent itself and what it does to the end user.
Using the MetaMask settings page, the user can see their installed snaps.
For each snap, the user can:

- See most of its manifest data.
- See its execution status (running, stopped, or crashed).
- Enable and disable the snap.

Other than the settings page, a snap can modify the MetaMask UI using
[custom UI](../how-to/use-custom-ui.md) in only two ways:

- By opening a dialog using the [`snap_dialog`](../reference/rpc-api.md#snapdialog) RPC method.
- By returning transaction insights from the [`onTransaction`](../reference/exports.md#ontransaction)
  export.

This means that most snaps must rely on dapps/websites and their own RPC methods to present their
data to the user.

Providing more ways for snaps to modify the MetaMask UI is an important goal of the Snaps system,
and over time more and more snaps will be able to contain their user interfaces entirely within
MetaMask itself.
