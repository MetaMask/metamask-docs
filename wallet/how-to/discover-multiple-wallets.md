---
description: Use an alternative discovery mechanism for multiple wallets.
sidebar_position: 10
---

# Discover multiple wallets

If a user has multiple wallet browser extensions installed, your web dapp can support
[wallet interoperability](../concepts/wallet-interoperabilty.md) by adding support for
[EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), which enables your dapp to discover and connect
to multiple installed wallets.
We recommend [setting up MetaMask SDK](connect/set-up-sdk/javascript/index.md) in your dapp, which supports
EIP-6963 by default.

If you don't have the SDK set up, you can directly update your dapp code to support EIP-6963.
See the [test dapp source code](https://github.com/MetaMask/test-dapp) for an example of how to
implement this.
