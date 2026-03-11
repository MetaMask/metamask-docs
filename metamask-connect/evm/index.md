---
sidebar_label: Introduction
description: Connect to EVM networks using MetaMask Connect EVM.
keywords: [evm, ethereum, connect, eip-1193, provider, ethers, viem, web3js]
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
approves once. See the [multichain quickstart](../multichain/quickstart.md) to get started.
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
href: '/metamask-connect/evm/quickstart/wagmi',
title: 'Wagmi',
description: 'Set up MetaMask Connect EVM in a Next.js and Wagmi dapp.',
},
{
href: '/metamask-connect/evm/quickstart/rainbowkit',
title: 'RainbowKit',
description: 'Set up MetaMask Connect EVM in a JavaScript and RainbowKit dapp.',
},
{
href: '/metamask-connect/evm/quickstart/connectkit',
title: 'ConnectKit',
description: 'Set up MetaMask Connect EVM in a JavaScript and ConnectKit dapp.',
},
{
href: '/metamask-connect/evm/quickstart/react-native',
title: 'React Native',
description: 'Set up MetaMask Connect EVM in a React Native or Expo dapp.',
},
{
href: '/metamask-connect/evm/quickstart/dynamic',
title: 'Dynamic SDK',
description: 'Set up Dynamic SDK in a Next.js dapp. Use MetaMask Connect EVM features with Dynamic.',
},
{
href: '/metamask-connect/evm/quickstart/web3auth',
title: 'Embedded Wallet SDK (formerly Web3Auth)',
description: 'Set up Web3Auth SDK in a Next.js dapp. Use MetaMask Connect EVM features with Web3Auth.',
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
