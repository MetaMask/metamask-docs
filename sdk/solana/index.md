---
sidebar_label: Introduction
description: Connect to Solana using MetaMask Connect.
keywords: [solana, connect, wallet-standard, wallet-adapter]
---

import CardList from '@site/src/components/CardList'

# Connect to Solana

[Solana](https://solana.com/) is a high-performance network that provides fast transaction speeds and low fees.
Connect to Solana in MetaMask using `@metamask/connect-solana`.

The Solana client is fully compatible with the [Wallet Standard](https://github.com/wallet-standard/wallet-standard), so MetaMask appears as a Solana wallet in any dapp using `@solana/wallet-adapter` — users connect the same way they would with Phantom or Solflare.

## Quick example

```typescript
import { createSolanaClient } from '@metamask/connect-solana';

const client = await createSolanaClient({
  dapp: { name: 'My DApp', url: 'https://mydapp.com' },
  api: {
    supportedNetworks: {
      mainnet: 'https://api.mainnet-beta.solana.com',
      devnet: 'https://api.devnet.solana.com',
    },
  },
});

// Register as a discoverable wallet
await client.registerWallet();

// Or get the wallet instance for direct use
const wallet = client.getWallet();
```

The SDK handles platform detection, relay connections, and session persistence automatically — you just work with the wallet.

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

## Framework Kit

Framework-kit supports MetaMask out-of-the-box for Solana dapps, handling RPC connections, wallet adapters, and state management for you:

- **One provider, many hooks** — Wrap your app once with `SolanaProvider`, then use hooks anywhere.
- **Wallet connection built-in** — `useWalletConnection` handles discovery, connection, and disconnection.
- **Automatic data refresh** — Balances and account data stay in sync without manual refetching.
- **Common operations simplified** — `useSolTransfer`, `useSplToken`, and `useTransactionPool` for transfers and custom transactions.
- **TypeScript-first** — Full type inference out of the box.

See the [Framework Kit guide](./connect/guides/use-framework-kit.md) for more information.

## Wallet Standard

MetaMask implements the [Wallet Standard](https://github.com/wallet-standard/wallet-standard), so MetaMask is supported out-of-the-box for Solana dapps that use the Wallet Standard or that integrate Solana's [Wallet Adapter](https://github.com/anza-xyz/wallet-adapter).

:::note
With the Wallet Standard alone, MetaMask does not appear as a connection option for users that don't already have MetaMask installed.
Using `@metamask/connect-solana` with `registerWallet()` ensures MetaMask is always available as an option.
:::

See the [Wallet Adapter guide](./connect/guides/use-wallet-adapter.md) for more information.

## Using with EVM together

If your dapp supports both EVM and Solana, you can use both the EVM and Solana clients.
They share the same underlying multichain session — the user only approves once.

See the [Multichain documentation](/sdk/multichain) for more details on cross-ecosystem connections.

## Third-party libraries

Several third-party libraries for Solana dapps detect and handle MetaMask out-of-the-box, including:

- [Dynamic](https://docs.dynamic.xyz/introduction/welcome)
- [Privy](https://docs.privy.io/welcome)
- [Reown](https://docs.reown.com/overview)
- [Embedded Wallets](/embedded-wallets)
