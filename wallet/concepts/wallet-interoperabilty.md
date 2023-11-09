---
description: Learn about wallet interoperability.
sidebar_position: 6
---

# Wallet interoperability

A web dapp can integrate with multiple wallets simultaneously by adding support for
[EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), which improves the user experience when the
user has multiple wallet browser extensions installed.
EIP-6963 introduces an alternative discovery mechanism for the [injected provider](apis.md#ethereum-provider-api),
enabling dapps to discover multiple injected wallet providers in a web page.

<p align="center">
  <video width="950" controls>
    <source src="/eip-6963/eip-6963.mov" />
  </video>
</p>

You can add support for EIP-6963 in one of the following ways:

- [Set up MetaMask SDK](../how-to/connect/set-up-sdk/javascript/index.md) in your dapp.
  The SDK supports EIP-6963 by default, and we recommend using this method.
- [Directly update your dapp code](../how-to/discover-multiple-wallets.md) to support EIP-6963.
- Use third-party libraries that support EIP-6963.

Alternatively, you can use [convenience libraries](convenience-libraries.md) that support wallet
interoperability.
We recommend using the SDK for the best MetaMask user experience.

## Community support

The alternative discovery mechanism works for wallets that have implemented support for EIP-6963.
This includes MetaMask, Coinbase, Trust Wallet, OKX, and other major wallets.
See the [list of wallets that support EIP-6963](https://github.com/WalletConnect/EIP6963/blob/master/src/utils/constants.ts).

## Backwards compatibility

Dapps that do not support EIP-6963 can still detect MetaMask through the `window.ethereum` provider.
However, we recommend adding support (or simply using the SDK) to improve the user experience for
multiple installed wallets.

Read more about [EIP-6963 backwards compatibility](https://eips.ethereum.org/EIPS/eip-6963#backwards-compatibility).
