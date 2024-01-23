---
description: Use an alternative discovery mechanism for multiple wallets.
sidebar_position: 11
---

# Discover multiple wallets

If a user has multiple wallet browser extensions installed, your web dapp can support
[wallet interoperability](../concepts/wallet-interoperabilty.md) by adding support for
[EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), which enables your dapp to discover and connect to multiple installed wallets.

To implement EIP-6963 in a React dapp, check out our [EIP-6963 ViteJS React + TypeScript Demo](https://github.com/MetaMask/vite-react-ts-eip-6963/blob/main/src/vite-env.d.ts)

## What Developers Need to Know

As a developer implementing [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), one simply needs to understand the initial motive, the value that this new approach brings users, and more importantly the types and interfaces needed in your application.

- [Provider Info](https://eips.ethereum.org/EIPS/eip-6963#provider-info)
- [Provider Detail](https://eips.ethereum.org/EIPS/eip-6963#provider-detail)
- [Announce and Request Events](https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events)

You will also need an interface to represent the [EIP-1193 Provider](https://eips.ethereum.org/EIPS/eip-1193)

The `EIP1193Provider` interface serves as the foundational structure for Ethereum wallet providers, outlining essential properties and methods for interaction with dapps. It includes attributes such as `isStatus`, `host`, and `path`, providing details about the provider's status and connection information. 

It also defines functions like `sendAsync`, `send`, and `request` for handling asynchronous communication and making requests to the Ethereum blockchain. This interface, defined by the previous [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193), lays the groundwork for wallet interoperability and seamless integration with the Ethereum ecosystem. Developers can leverage this interface to implement and interact with Ethereum wallet providers in a standardized manner.

### The MetaMask SDK

:::note
MetaMask SDK does not support connecting to non-MetaMask wallets via EIP-6963.
If you intend to support discovery of other wallets, we recommend using other methods of adding
EIP-6963 support.
:::

The MetaMask SDK not only supports EIP-6963 on its own for detecting MetaMask, but is also being integrated into [WAGMI 2.0+](https://wagmi.sh/) which supports EIP-6963. If you only want to connect to MetaMask extension and MetaMask mobile:

- [Set up MetaMask SDK](../how-to/connect/set-up-sdk/javascript/index.md) in your dapp.

The SDKs integration of EIP-6963 is for the efficient discovery and connection with the MetaMask Extension only. This enhancement is pivotal in streamlining the user experience and promoting seamless interactions with the Ethereum blockchain. 

#### MetaMask SDK Automatic Detection

The MetaMask JS SDK now automatically checks for the presence of the MetaMask Extension that supports EIP-6963. This eliminates the need for manual configuration or detection methods, thereby simplifying the initial setup process for developers and users alike.  

Conflict Resolution: By adhering to the standards set by EIP-6963, the SDK unambiguously identifies and connects to the MetaMask Extension. This approach effectively resolves potential conflicts that might arise with other wallet extensions, ensuring a more stable and reliable interaction for users. 