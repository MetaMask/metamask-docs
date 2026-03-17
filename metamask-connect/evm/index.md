---
title: 'MetaMask Connect EVM - Ethereum Dapp Integration'
sidebar_label: Introduction
description: Connect your dapp to Ethereum and EVM-compatible networks using MetaMask Connect EVM. Get an EIP-1193 provider compatible with viem, ethers.js, and web3.js.
keywords:
  [
    evm,
    ethereum,
    connect,
    eip-1193,
    provider,
    ethers,
    viem,
    web3js,
    metamask connect evm,
    ethereum dapp,
    createEVMClient,
    web3 provider,
    metamask integration,
  ]
---

import CardList from '@site/src/components/CardList'

# Connect to EVM networks

`@metamask/connect-evm` is the modern replacement for `@metamask/sdk`.
Use it to connect your dapp to Ethereum and other EVM networks in the MetaMask mobile app
or browser extension.

The EVM client provides an [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)-compatible
provider with the same shape as `window.ethereum`, meaning existing `viem`, `ethers.js`, or `web3.js`
code works without changes.
It also includes automatic platform detection, relay-based connections, session persistence, and
convenience methods like [`connectAndSign`](reference/methods.md#connectandsign) and
[`connectWith`](reference/methods.md#connectwith).

:::tip Coming from `@metamask/sdk`?
See the [migration guide](migrate-from-sdk.md) for a step-by-step upgrade path covering
package changes, API differences, and new capabilities.
:::

:::info Going multichain?
If your dapp supports (or plans to support) both EVM and Solana, you can use the
[multichain client](../multichain/index.md) instead.
The EVM and Solana clients share the same underlying multichain session, meaning the user only
approves once. See the [multichain quickstart](../multichain/quickstart/javascript.md) to get started.
:::

## Supported platforms and libraries

MetaMask Connect EVM supports multiple integration paths. You can install it from npm, use it through
developer libraries such as Wagmi, or integrate it through supported third-party libraries.

Choose a quickstart based on your stack.

<CardList
items={[
{
href: '/metamask-connect/evm/quickstart/javascript',
title: 'JavaScript',
description: 'Set up MetaMask Connect EVM in a JavaScript dapp.',
},
{
href: '/metamask-connect/evm/quickstart/react-native',
title: 'React Native',
description: 'Set up MetaMask Connect EVM in a React Native or Expo dapp.',
}
]}
/>

## Library compatibility

The EVM client works seamlessly with popular Ethereum libraries:

| Library                               | Compatibility                                     |
| ------------------------------------- | ------------------------------------------------- |
| [viem](https://viem.sh/)              | Use with `custom()` transport                     |
| [ethers.js](https://docs.ethers.org/) | Pass `client.getProvider()` to `BrowserProvider`  |
| [web3.js](https://web3js.org/)        | Pass `client.getProvider()` to `Web3` constructor |

### Frequently asked questions

#### What libraries does MetaMask Connect EVM work with?

MetaMask Connect EVM provides an EIP-1193 compatible provider that works with viem (via `custom()` transport), ethers.js (via `BrowserProvider`), web3.js (via `Web3` constructor), and wagmi (via the `metamask()` connector). It also supports wallet connector libraries like RainbowKit, ConnectKit, Dynamic, Privy, Web3Auth, and more.

#### Do I need an Infura API key for MetaMask Connect EVM?

An Infura API key is **recommended** for production dapps. MetaMask Connect EVM uses RPC URLs to route read requests and relay connections. Use the `getInfuraRpcUrls` helper to generate URLs for all Infura-supported chains automatically, or provide your own RPC endpoints in the `api.supportedNetworks` configuration.

#### How do I migrate from @metamask/sdk to @metamask/connect-evm?

Replace `@metamask/sdk` with `@metamask/connect-evm` in your dependencies, update imports from `MetaMaskSDK` to `createEVMClient`, switch from synchronous to async initialization, and update your provider access pattern. The [migration guide](migrate-from-sdk.md) provides a complete step-by-step walkthrough with code examples for each change.
