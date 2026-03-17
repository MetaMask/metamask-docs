---
title: "MetaMask Connect Solana - Solana Dapp Integration"
sidebar_label: Introduction
description: Connect your dapp to Solana using MetaMask Connect Solana. Use wallet-standard features, Wallet Adapter, or Framework Kit for React and vanilla JS apps.
keywords: [solana, connect, wallet-standard, wallet-adapter, metamask connect solana, createSolanaClient, solana dapp, SPL token, solana wallet]
---

import CardList from '@site/src/components/CardList'

# Connect to Solana

[Solana](https://solana.com/) is a high-performance network that provides fast transaction speeds and low fees.
Connect to Solana in MetaMask using `@metamask/connect-solana`.

The Solana client implements the [Wallet Standard](https://github.com/wallet-standard/wallet-standard),
so it works with Solana's [Wallet Adapter](./guides/use-wallet-adapter.md), and integrates
with [Framework Kit](./guides/use-framework-kit.md) for a hooks-based React workflow.

MetaMask Connect Solana handles platform detection, relay connections, and session persistence automatically.
You interact with the wallet through the client APIs.

:::tip Ready to code?
Jump to the [Wallet Adapter guide](./guides/use-wallet-adapter.md) for a React dapp, or
the [JavaScript quickstart](./quickstart/javascript.md) to use wallet-standard features
directly.
:::

:::info Going multichain?
If your dapp targets both EVM and Solana from a single codebase, consider using
[`@metamask/connect-multichain`](../multichain/index.md) directly.
The multichain client provides a unified `invokeMethod` interface for both ecosystems and manages
scopes, sessions, and selective disconnect in one place.
See the [multichain quickstart](../multichain/quickstart/javascript.md) to get started.
:::

## Get started

<CardList
items={[
{
href: '/metamask-connect/solana/guides/use-wallet-adapter',
title: 'Wallet Adapter',
description: 'Use Solana\'s Wallet Adapter to connect a React dapp to MetaMask.',
},
{
href: '/metamask-connect/solana/quickstart/javascript',
title: 'JavaScript',
description: 'Use wallet-standard features directly in a JavaScript dapp.',
},
{
href: '/metamask-connect/solana/guides/use-framework-kit',
title: 'Framework Kit',
description: 'Use Framework Kit for a hooks-based React workflow with MetaMask.',
},
{
href: '/metamask-connect/solana/reference/methods',
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

### Frequently asked questions

#### What is wallet-standard and why does MetaMask Connect Solana use it?

[Wallet Standard](https://github.com/wallet-standard/wallet-standard) is a cross-wallet interface specification for the Solana ecosystem. `@metamask/connect-solana` implements this standard so that MetaMask is automatically discoverable by any Solana dapp or library that supports wallet-standard, including Solana Wallet Adapter. This means you get consistent connect, sign, and send APIs without writing MetaMask-specific code.

#### Can I use Solana Wallet Adapter with MetaMask Connect?

Yes. When you call `createSolanaClient`, MetaMask is automatically registered with the wallet-standard registry, so Solana Wallet Adapter detects it alongside other installed wallets. No extra configuration is needed. See the [Wallet Adapter guide](./guides/use-wallet-adapter.md) for a full React setup walkthrough.

#### Which Solana networks does MetaMask Connect support?

MetaMask Connect Solana supports mainnet, devnet, and testnet. You can configure custom RPC URLs for each network using the `api.supportedNetworks` option in `createSolanaClient`. If your dapp also targets EVM networks, consider using [`@metamask/connect-multichain`](../multichain/index.md) to manage both ecosystems in a single session.
