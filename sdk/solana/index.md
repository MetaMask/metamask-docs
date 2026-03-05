---
sidebar_label: Introduction
description: Connect to Solana using MetaMask Connect.
keywords: [solana, connect, wallet-standard, wallet-adapter]
---

import CardList from '@site/src/components/CardList'

# Connect to Solana

[Solana](https://solana.com/) is a high-performance network that provides fast transaction speeds and low fees.
Connect to Solana in MetaMask using `@metamask/connect-solana`.

The Solana client implements the [Wallet Standard](https://github.com/wallet-standard/wallet-standard),
so it works with Solana's [Wallet Adapter](./connect/guides/use-wallet-adapter.md), and integrates
with [Framework Kit](./connect/guides/use-framework-kit.md) for a hooks-based React workflow.

MetaMask Connect handles platform detection, relay connections, and session persistence automatically.
You interact with the wallet through the client APIs.

:::tip
If your dapp supports both EVM and Solana, use both the EVM and Solana clients.
They share the same underlying [multichain session](../multichain/index.md), meaning the user only approves once.
:::

## Get started

<CardList
items={[
{
href: '/sdk/solana/connect/quickstart/javascript',
title: 'JavaScript',
description: 'Set up MetaMask Connect for Solana in a JavaScript dapp.',
},
{
href: '/sdk/solana/connect/quickstart/dynamic',
title: 'Dynamic SDK',
description: 'Set up Dynamic SDK for Solana in a Next.js dapp.',
},
{
href: '/sdk/solana/connect/quickstart/web3auth',
title: 'Web3Auth',
description: 'Set up Web3Auth SDK for Solana in a Next.js dapp.',
}
]}
/>

## Third-party libraries

Several third-party libraries for Solana dapps detect and handle MetaMask out-of-the-box, including:

- [Dynamic](https://docs.dynamic.xyz/introduction/welcome)
- [Privy](https://docs.privy.io/welcome)
- [Reown](https://docs.reown.com/appkit/overview)
- [Embedded Wallets](/embedded-wallets)
