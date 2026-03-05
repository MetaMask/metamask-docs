---
sidebar_label: Introduction
description: Connect to EVM networks using MetaMask Connect.
keywords: [evm, ethereum, connect, eip-1193, provider, ethers, viem, web3js]
---

import CardList from '@site/src/components/CardList'

# Connect to EVM networks

Use `@metamask/connect-evm` to connect your dapp to Ethereum and other EVM networks in the MetaMask mobile app
or browser extension.
The MetaMask Connect EVM client provides an [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)-compatible
provider with the same shape as `window.ethereum`, meaning existing `viem`, `ethers.js`, or `web3.js`
code works with minimal changes.

MetaMask Connect also includes automatic platform detection, relay-based connections, and session persistence.

:::info Multichain support
If your dapp supports both EVM and Solana, use both the EVM and Solana clients.
They share the same underlying [multichain session](../multichain/index.md), meaning the user only approves once.
:::

## Supported platforms and libraries

MetaMask Connect supports multiple integration paths. You can install it from npm, use it through
developer libraries such as Wagmi, or integrate it through supported third-party libraries.

Choose a quickstart based on your stack.

<CardList
items={[
{
href: '/sdk/evm/connect/quickstart/javascript',
title: 'JavaScript',
description: 'Set up MetaMask Connect in a JavaScript dapp.',
},
{
href: '/sdk/evm/connect/quickstart/wagmi',
title: 'Wagmi',
description: 'Set up MetaMask Connect in a Next.js and Wagmi dapp.',
},
{
href: '/sdk/evm/connect/quickstart/rainbowkit',
title: 'RainbowKit',
description: 'Set up MetaMask Connect in a JavaScript and RainbowKit dapp.',
},
{
href: '/sdk/evm/connect/quickstart/connectkit',
title: 'ConnectKit',
description: 'Set up MetaMask Connect in a JavaScript and ConnectKit dapp.',
},
{
href: '/sdk/evm/connect/quickstart/react-native',
title: 'React Native',
description: 'Set up MetaMask Connect in a React Native or Expo dapp.',
},
{
href: '/sdk/evm/connect/quickstart/dynamic',
title: 'Dynamic SDK',
description: 'Set up Dynamic SDK in a Next.js dapp. Use MetaMask Connect features with Dynamic.',
},
{
href: '/sdk/evm/connect/quickstart/web3auth',
title: 'Embedded Wallet SDK (formerly Web3Auth)',
description: 'Set up Web3Auth SDK in a Next.js dapp. Use MetaMask Connect features with Web3Auth.',
},
{
href: 'https://web3onboard.thirdweb.com/',
title: 'Web3-Onboard',
description: 'Use MetaMask Connect features with Web3-Onboard.',
buttonIcon: 'external-arrow',
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

