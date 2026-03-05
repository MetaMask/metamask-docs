---
sidebar_label: Introduction
description: Connect to Solana using MetaMask Connect Solana.
keywords: [solana, connect, wallet-standard, wallet-adapter]
---

import CardList from '@site/src/components/CardList'

# Connect to Solana

[Solana](https://solana.com/) is a high-performance network that provides fast transaction speeds and low fees.
Connect to Solana in MetaMask using `@metamask/connect-solana`.

The Solana client implements the [Wallet Standard](https://github.com/wallet-standard/wallet-standard),
so it works with Solana's [Wallet Adapter](./connect/guides/use-wallet-adapter.md), and integrates
with [Framework Kit](./connect/guides/use-framework-kit.md) for a hooks-based React workflow.

MetaMask Connect Solana handles platform detection, relay connections, and session persistence automatically.
You interact with the wallet through the client APIs.

:::tip Ready to code?
Jump to the [Wallet Adapter guide](./connect/guides/use-wallet-adapter.md) for a React dapp, or
the [JavaScript quickstart](./connect/quickstart/javascript.md) to use wallet-standard features
directly.
:::

:::info Going multichain?
If your dapp targets both EVM and Solana from a single codebase, consider using
[`@metamask/connect-multichain`](../multichain/index.md) directly.
The multichain client provides a unified `invokeMethod` interface for both ecosystems and manages
scopes, sessions, and selective disconnect in one place.
See the [multichain quickstart](../multichain/connect/quickstart.md) to get started.
:::

## Get started

<CardList
items={[
{
href: '/sdk/solana/connect/guides/use-wallet-adapter',
title: 'Wallet Adapter',
description: 'Use Solana\'s Wallet Adapter to connect a React dapp to MetaMask.',
},
{
href: '/sdk/solana/connect/guides/use-framework-kit',
title: 'Framework Kit',
description: 'Use Framework Kit for a hooks-based React workflow with MetaMask.',
},
{
href: '/sdk/solana/connect/quickstart/javascript',
title: 'JavaScript',
description: 'Use wallet-standard features directly in a JavaScript dapp.',
},
{
href: '/sdk/solana/connect/quickstart/web3auth',
title: 'MetaMask Embedded Wallets',
description: 'Set up Embedded Wallets SDK (previously Web3Auth) for Solana.',
},
{
href: '/sdk/solana/connect/quickstart/dynamic',
title: 'Dynamic',
description: 'Set up Dynamic SDK for Solana in a Next.js dapp.',
},
{
href: '/sdk/solana/connect/reference/methods',
title: 'SDK methods',
description: 'Reference for all Solana SDK methods, properties, and types.',
}
]}
/>

## Third-party libraries

Several third-party libraries for Solana dapps detect and handle MetaMask out-of-the-box, including:

- [Dynamic](https://docs.dynamic.xyz/introduction/welcome)
- [Privy](https://docs.privy.io/welcome)
- [Reown](https://docs.reown.com/appkit/overview)
- [Embedded Wallets](/embedded-wallets)
