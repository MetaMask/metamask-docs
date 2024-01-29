---
description: Learn about wallet interoperability.
sidebar_position: 6
---

# Wallet interoperability

A web dapp can integrate with multiple wallets simultaneously by adding support for
[EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), which improves the user experience when the
user has multiple wallet browser extensions installed.
EIP-6963 introduces an alternative discovery mechanism to the [`window.ethereum` injected provider](apis.md#ethereum-provider-api),
enabling dapps to discover multiple injected wallet providers in a user's browser.
We recommend using this new mechanism for provider discovery.

<p align="center">
  <video width="100%" controls>
    <source src="/eip-6963.mov" />
  </video>
</p>

You can add support for connecting to the MetaMask browser extension via EIP-6963 in the following ways:

- [Set up MetaMask SDK](../how-to/use-sdk/javascript/index.md) in your dapp.
  The SDK connects to the MetaMask extension via EIP-6963 by default, and we recommend using this method.
- [Directly update your dapp code](../how-to/discover-multiple-wallets.md) to support EIP-6963.
- Use third-party libraries that support EIP-6963.

Alternatively, you can use [convenience libraries](convenience-libraries.md) that support wallet
interoperability.
We recommend using the SDK for the best MetaMask user experience.

:::note
MetaMask SDK doesn't support connecting to non-MetaMask wallets via EIP-6963.
If you intend to support discovery of other wallets, we recommend using other methods of adding
EIP-6963 support.
:::

## Community support

The alternative discovery mechanism works for wallets that have implemented support for EIP-6963.
This includes MetaMask, Coinbase, Trust Wallet, OKX, and other major wallets.
See the [list of wallets that support EIP-6963](https://github.com/WalletConnect/EIP6963/blob/master/src/utils/constants.ts).

## Backwards compatibility

Dapps that do not support EIP-6963 can still detect MetaMask using the `window.ethereum` provider.
However, we recommend adding support to improve the user experience for multiple installed wallets.
Read more about [EIP-6963 backwards compatibility](https://eips.ethereum.org/EIPS/eip-6963#backwards-compatibility).
