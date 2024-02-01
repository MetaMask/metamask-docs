---
description: Learn about wallet interoperability.
sidebar_position: 6
---

# Wallet interoperability

With [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), dapps can easily detect multiple wallets
installed in the user's browser and connect to them.
This discovery is enabled by using the standardized events and interfaces provided by EIP-6963.

The following is a visual demo of the user experience, showing the data provided from each installed wallet:

<p align="center">
  <video width="100%" controls>
    <source src="/eip-6963-demo.mp4" type="video/mp4" />
  </video>
</p>

Learn [how to detect multiple wallets](../how-to/connect/detect-wallet/metamask.md#detect-multiple-wallets)
and see the
[EIP-6963 Vite React + TypeScript demo](https://github.com/MetaMask/vite-react-ts-eip-6963/tree/main)
for more information.

## Third-party library support

The following third-party libraries support EIP-6963:

- [MetaMask SDK](../how-to/connect/set-up-sdk/javascript/index.md)

  :::note
  MetaMask SDK does not support connecting to non-MetaMask wallets via EIP-6963.
  If you intend to support discovery of other wallets, we recommend using other methods of adding
  EIP-6963 support such as Wagmi 2+.
  :::

- [Wagmi 2+](https://wagmi.sh)

- [Web3Modal 3+](https://docs.walletconnect.com/web3modal/about)

- [MIPD Store](https://github.com/wevm/mipd)

### MetaMask SDK

The [MetaMask JavaScript SDK](../how-to/connect/set-up-sdk/javascript/index.md) automatically checks
for the presence of the MetaMask extension via EIP-6963.
This eliminates the need for manual configuration or detection methods, simplifying the initial
setup process for developers and users alike.

By adhering to the standards set by EIP-6963, the SDK unambiguously identifies and connects to
MetaMask, resolving potential conflicts that might arise with other wallet extensions, ensuring a
more stable and reliable interaction for users.

The SDK is also being integrated into [Wagmi 2+](https://wagmi.sh/), which supports EIP-6963.
The SDK on its own supports connecting only to MetaMask via EIP-6963, so if you intend to support
discovery of other wallets, we recommend using other methods of adding EIP-6963 support, such as
Wagmi 2+.

### MIPD Store

The [MIPD Store](https://github.com/wevm/mipd) stores the wallet providers and enables you to
subscribe to the store and retrieve the providers.
Unlike Wagmi and Web3-Onboard, which are libraries that provide components and connectors for
multiple wallets and depend on MetaMask SDK for integration, the MIPD Store is a utility library
that makes it easier to work with EIP-6963 and supports TypeScript types.

## Wallet support

The EIP-6963 alternative discovery mechanism works for wallets that have implemented support for EIP-6963.
This includes MetaMask, Coinbase, Trust Wallet, OKX, and other major wallets.
See the [list of wallets that support EIP-6963](https://github.com/WalletConnect/EIP6963/blob/master/src/utils/constants.ts).

## Backwards compatibility

Dapps that do not support EIP-6963 can still
[detect MetaMask using the `window.ethereum` provider](../how-to/connect/detect-wallet/metamask.md).
However, we recommend adding support to improve the user experience for multiple installed wallets.
Read more about [EIP-6963 backwards compatibility](https://eips.ethereum.org/EIPS/eip-6963#backwards-compatibility).
