---
title: Introduction
---

# Extend the functionality of MetaMask using Snaps

Snaps is an open source system that allows anyone to safely extend the functionality of MetaMask,
creating new web3 end user experiences.

Get started by [installing Snaps](get-started/install-snaps.md).

:::note
- Snaps is pre-release software.
- To learn how to integrate your dapp with MetaMask, visit the
  [MetaMask wallet developer documentation](../wallet).
:::

## What is a snap?

A snap is a JavaScript program run in an isolated environment that customizes the wallet experience.
Snaps have access to a limited set of capabilities, determined by the
[permissions](how-to/request-permissions.md) the user granted them during installation.

## What can you do with a snap?

A snap can add new API methods to MetaMask, add support for different blockchain protocols, or
modify existing functionalities using the [Snaps JSON-RPC API](reference/rpc-api.md).

For example, you can:

- [Display a custom confirmation screen](reference/rpc-api.md#snapdialog) in MetaMask.
- [Notify users](reference/rpc-api.md#snapnotify) in MetaMask.
- [Securely store and manage data](reference/rpc-api.md#snapmanagestate) on your device.
- [Control non-EVM accounts and assets](reference/rpc-api.md#snapgetbip44entropy) in MetaMask.
- [Provide transaction insights](reference/exports.md#ontransaction) in MetaMask's pre-transaction window.
- [Schedule periodic actions](reference/exports.md#oncronjob) for your users.
- [Display custom UI](how-to/use-custom-ui.md) in MetaMask using a set of pre-defined components,
  including inline Markdown.

## Questions?

If you have questions about using Snaps or want to propose a new feature, you can interact with the
Snaps team and community on [GitHub discussions](https://github.com/MetaMask/snaps-monorepo/discussions)
and the Snaps channel on [ConsenSys Discord](https://discord.gg/consensys).
