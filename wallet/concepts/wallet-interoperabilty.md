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
    <source src="/eip-6963.mov" />
  </video>
</p>

## What Developers Need to Know

As a developer implementing [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), one simply needs to understand the initial motive, the value that this new approach brings users, and more importantly the types and interfaces needed in your application.

- [Provider Info](https://eips.ethereum.org/EIPS/eip-6963#provider-info)
- [Provider Detail](https://eips.ethereum.org/EIPS/eip-6963#provider-detail)
- [Announce and Request Events](https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events)

As well, we will need an interface to represent the [EIP-1193 Provider](https://eips.ethereum.org/EIPS/eip-1193)

The `EIP1193Provider` interface serves as the foundational structure for Ethereum wallet providers, outlining essential properties and methods for interaction with dapps. It includes attributes such as `isStatus`, `host`, and `path`, providing details about the provider's status and connection information. 

Also, it defines functions like `sendAsync`, `send`, and `request` for handling asynchronous communication and making requests to the Ethereum blockchain. This interface, defined by the previous [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193), lays the groundwork for wallet interoperability and seamless integration with the Ethereum ecosystem. Developers can leverage this interface to implement and interact with Ethereum wallet providers in a standardized manner.

If you decide to implement EIP-6963 from scratch in your applications you will need all of these interfaces and types that can be found here in the source code: [EIP-6963 ViteJS React + TypeScript Demo](https://github.com/MetaMask/vite-react-ts-eip-6963/blob/main/src/vite-env.d.ts).

## Third Party Library Support

You can add support for connecting to the MetaMask browser extension via EIP-6963 in the following ways:

- [Directly update your dapp code](../how-to/discover-multiple-wallets.md) to support EIP-6963.
- Use third-party libraries that support EIP-6963.

### The MetaMask SDK

:::note
MetaMask SDK does not support connecting to non-MetaMask wallets via EIP-6963.
If you intend to support discovery of other wallets, we recommend using other methods of adding
EIP-6963 support.
:::

The MetaMask SDK not only supports EIP-6963 on its own for detecting MetaMask, but is also being integrated into [WAGMI]() which supports EIP-6963. If you only want to connect to MetaMask extension and MetaMask mobile:

- [Set up MetaMask SDK](../how-to/connect/set-up-sdk/javascript/index.md) in your dapp.

The SDKs integration of EIP-6963 is for the efficient discovery and connection with the MetaMask Extension only. This enhancement is pivotal in streamlining the user experience and promoting seamless interactions with the Ethereum blockchain. 

#### MetaMask SDK Automatic Detection

The MetaMask JS SDK now automatically checks for the presence of the MetaMask Extension that supports EIP-6963. This eliminates the need for manual configuration or detection methods, thereby simplifying the initial setup process for developers and users alike. 
Conflict Resolution: By adhering to the standards set by EIP-6963, the SDK unambiguously identifies and connects to the MetaMask Extension. This approach effectively resolves potential conflicts that might arise with other wallet extensions, ensuring a more stable and reliable interaction for users. 

## Community support

The alternative discovery mechanism works for wallets that have implemented support for EIP-6963.
This includes MetaMask, Coinbase, Trust Wallet, OKX, and other major wallets.
See the [list of wallets that support EIP-6963](https://github.com/WalletConnect/EIP6963/blob/master/src/utils/constants.ts).

## Backwards compatibility

Dapps that do not support EIP-6963 can still detect MetaMask using the `window.ethereum` provider.
However, we recommend adding support to improve the user experience for multiple installed wallets.
Read more about [EIP-6963 backwards compatibility](https://eips.ethereum.org/EIPS/eip-6963#backwards-compatibility).
