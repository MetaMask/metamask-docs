---
description: Use an alternative discovery mechanism for multiple wallets.
sidebar_position: 11
---

# Discover multiple wallets

If a user has multiple wallet browser extensions installed, your web dapp can support
[wallet interoperability](../concepts/wallet-interoperabilty.md) by adding support for
[EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), which enables your dapp to discover and connect
to multiple installed wallets.

We recommend [setting up MetaMask SDK](use-sdk/javascript/index.md) in your dapp, which
connects to the MetaMask extension via EIP-6963 by default.

You can also directly update your dapp code to connect to non-MetaMask wallets via EIP-6963.
See the [test dapp source code](https://github.com/MetaMask/test-dapp) for an example of how to
implement this.
