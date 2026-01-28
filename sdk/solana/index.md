---
sidebar_label: Introduction
---

# Connect to Solana

[Solana](https://solana.com/) is a high-performance network that provides fast transaction speeds and low fees.
You can interact with users' Solana accounts in MetaMask using the [Wallet Standard](#wallet-standard) or [third-party libraries](#third-party-libraries) for Solana dapps.

## MetaMask Connect

MetaMask Connect is the easiest way to connect to Solana in MetaMask.

:::note
See the [Use MetaMask Connect Guide for JavaScript](./connect/quickstart/javascript.md) for more information.
:::

## Framework Kit

Framework-kit supports MetaMask out-of-the-box for Solana dapps, handling RPC connections, wallet adapters, and state management for you:

- **One provider, many hooks** — Wrap your app once with `SolanaProvider`, then use hooks anywhere.
- **Wallet connection built-in** — `useWalletConnection` handles discovery, connection, and disconnection.
- **Automatic data refresh** — Balances and account data stay in sync without manual refetching.
- **Common operations simplified** — `useSolTransfer`, `useSplToken`, and `useTransactionPool` for transfers and custom transactions.
- **TypeScript-first** — Full type inference out of the box.

:::note
See the [Use Framework Kit Guide](./connect/guides/use-framework-kit.md) for more information.
:::

## Wallet Standard

MetaMask implements the [Wallet Standard](https://github.com/wallet-standard/wallet-standard), so MetaMask is supported out-of-the-box for Solana dapps that use the Wallet Standard or that integrate Solana's [Wallet Adapter](https://github.com/anza-xyz/wallet-adapter).

:::note
With the Wallet Standard, MetaMask does not appear as a connection option for users that don't already have MetaMask installed.
Check out [How to use the Wallet Adapter Guide](./connect/guides/use-wallet-adapter.md).
:::

## Third-party libraries

Several third-party libraries for Solana dapps detect and handle MetaMask out-of-the-box, including:

- [Dynamic](https://docs.dynamic.xyz/introduction/welcome)
- [Privy](https://docs.privy.io/welcome)
- [Reown](https://docs.reown.com/overview)
- [Embedded Wallets](/embedded-wallets)
