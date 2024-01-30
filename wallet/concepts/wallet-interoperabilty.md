---
description: Learn about wallet interoperability.
sidebar_position: 6
---

# Wallet interoperability

With [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), web dapps can easily discover multiple wallets installed in the users browser and connect to them. 

r discovery by using the standardized events and interfaces provided by EIP-6963.

Below is a visual demo of that user experience showing the data provided from each installed wallet.

<p align="center">
  <video width="100%" controls>
    <source src="/update-wallet-interop/eip-6963-demo.mp4" type="video/mp4" />
  </video>
</p>

To implement EIP-6963 in a dapp, check out our [EIP-6963 ViteJS React + TypeScript Demo](https://github.com/MetaMask/vite-react-ts-eip-6963/blob/main/src/vite-env.d.ts) or visit our ["Discover Multiple Wallets Page"](../how-to/connect/detect-metamask.md#discover-multiple-wallets-with-eip-6963).

## Third Party Library Support

You can add support for connecting to the MetaMask browser extension via EIP-6963 using third-party libraries that either support EIP-6963 or are tools built specifically to help manage the providers in a more custom way.

- [Wagmi 2+](https://wagmi.sh)
- [Web3Modal 3+](https://docs.walletconnect.com/web3modal/about)
- [MIPD Store](https://github.com/wevm/mipd)
- [MetaMask SDK](../how-to/connect/set-up-sdk/javascript/index.md)

:::note
MetaMask SDK does not support connecting to non-MetaMask wallets via EIP-6963.
If you intend to support discovery of other wallets, we recommend using other methods of adding
EIP-6963 support like using Wagmi (v2.0+).
:::

### MIPD Store

The [MIPD Store](https://github.com/wevm/mipd) stores the Providers that have been emitted by a Wallet (or other source), and provides a way to subscribe to the store and retrieve the Providers. Unlike Wagmi and Web3Onboard which are libraries that provide components and connectors for connections to multiple wallets and depend on the MetaMask SDK for integration. The MIPD store is a utility library that makes it easier to work with EIP-6963 and supports TypeScript types.

## Community support

The alternative discovery mechanism works for wallets that have implemented support for EIP-6963.
This includes MetaMask, Coinbase, Trust Wallet, OKX, and other major wallets.
See the [list of wallets that support EIP-6963](https://github.com/WalletConnect/EIP6963/blob/master/src/utils/constants.ts).

## Backwards compatibility

Dapps that do not support EIP-6963 can still detect MetaMask using the `window.ethereum` provider.
However, we recommend adding support to improve the user experience for multiple installed wallets.
Read more about [EIP-6963 backwards compatibility](https://eips.ethereum.org/EIPS/eip-6963#backwards-compatibility).
