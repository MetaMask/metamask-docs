---
description: Learn about wallet interoperability.
sidebar_position: 6
---

# Wallet interoperability

With [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), web dapps can easily discover multiple wallets installed in the users browser and connect to them. 

The primary implication for developers is the shift from relying solely on `window.ethereum` for wallet detection giving developers an alternative discovery mechanism to the [`window.ethereum` injected provider](apis.md#ethereum-provider-api). We recommend using this new mechanism for provider discovery by using the standardized events and interfaces provided by EIP-6963.

Below is a visual demo of that user experience showing the data provided from each installed wallet.

<p align="center">
  <video width="100%" controls>
    <source src="/eip-6963-demo.mp4" />
  </video>
</p>

To implement EIP-6963 in a dapp, check out our [EIP-6963 ViteJS React + TypeScript Demo](https://github.com/MetaMask/vite-react-ts-eip-6963/blob/main/src/vite-env.d.ts) or visit our ["Discover Multiple Wallets Page"](../how-to/discover-multiple-wallets.md).

## Third Party Library Support

You can add support for connecting to the MetaMask browser extension via EIP-6963 in the following ways:

- Use third-party libraries that support EIP-6963
- [WAGMI 2+](https://wagmi.sh)
- [Web3Modal 3+](https://docs.walletconnect.com/web3modal/about)
- [MetaMask SDK](../how-to/connect/set-up-sdk/javascript/index.md)

:::note
MetaMask SDK does not support connecting to non-MetaMask wallets via EIP-6963.
If you intend to support discovery of other wallets, we recommend using other methods of adding
EIP-6963 support like using WAGMI (v2.0+).
:::

## Community support

The alternative discovery mechanism works for wallets that have implemented support for EIP-6963.
This includes MetaMask, Coinbase, Trust Wallet, OKX, and other major wallets.
See the [list of wallets that support EIP-6963](https://github.com/WalletConnect/EIP6963/blob/master/src/utils/constants.ts).

## Backwards compatibility

Dapps that do not support EIP-6963 can still detect MetaMask using the `window.ethereum` provider.
However, we recommend adding support to improve the user experience for multiple installed wallets.
Read more about [EIP-6963 backwards compatibility](https://eips.ethereum.org/EIPS/eip-6963#backwards-compatibility).
