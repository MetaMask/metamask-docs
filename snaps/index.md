---
title: Introduction
---

# Extend the functionality of MetaMask using Snaps

:::note
Snaps is pre-release software.
:::

Snaps is an open source system that allows anyone to safely extend the functionality of MetaMask,
creating new web3 end user experiences.

Get started by [installing Snaps](get-started/install-snaps.md).

## What is a snap?

A snap is a JavaScript program run in an isolated environment that customizes the wallet experience.
Snaps have access to a limited set of capabilities, determined by the
[permissions](how-to/request-permissions.md) the user granted them during installation.

## What can you do with a snap?

A snap can add new API methods to MetaMask, add support for different blockchain protocols, or
modify existing functionalities using the [Snaps JSON-RPC API](reference/rpc-api.md).

For example, you can:

- Display a custom confirmation screen in MetaMask using [`snap_confirm`](reference/rpc-api.md#snap_confirm).
- Notify users in MetaMask using [`snap_notify`](reference/rpc-api.md#snap_notify).
- Securely store and manage data on your device using [`snap_mangeState`](reference/rpc-api.md#snap_managestate).
- Control non-EVM accounts and assets in MetaMask using [`snaps_getBip44Entropy`](reference/rpc-api.md#snap_getbip44entropy).
- Populate MetaMask's pre-transaction window with custom transaction insights using [`onTransaction`](reference/exports.md#ontransaction).
- Schedule periodic actions using [`onCronjob`](reference/exports.md#oncronjob).

## Questions?

If you have questions or want to propose a new feature, you can interact with the Snaps team and
community on [GitHub discussions](https://github.com/MetaMask/snaps-skunkworks/discussions).
