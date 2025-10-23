---
sidebar_label: Introduction
---

# Connect to Solana

[Solana](https://solana.com/) is a high-performance network that provides fast transaction speeds and low fees.
You can interact with users' Solana accounts in MetaMask using the [Wallet Standard](#wallet-standard) or [third-party libraries](#third-party-libraries) for Solana dapps.

:::note Supported Solana networks
MetaMask supports Solana Mainnet.
Solana Devnet is only supported on [MetaMask Flask](/snaps/get-started/install-flask).
After adding Solana to MetaMask Flask, [show test networks](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/) to view Solana Devnet.
:::

## Wallet Standard

MetaMask implements the [Wallet Standard](https://github.com/wallet-standard/wallet-standard), so MetaMask is supported out-of-the-box for Solana dapps that use the Wallet Standard or that integrate Solana's [Wallet Adapter](https://github.com/anza-xyz/wallet-adapter/blob/master/APP.md).

Learn more in Solana's [Interact With Wallets](https://solana.com/developers/courses/intro-to-solana/interact-with-wallets) documentation.

:::note
With the Wallet Standard, MetaMask does not appear as a connection option for users that don't already have MetaMask installed.
Ask the MetaMask team on [Discord](https://discord.gg/consensys) if you need support for a custom integration.
:::

## Third-party libraries

Several third-party libraries for Solana dapps detect and handle MetaMask out-of-the-box, including:

- [Dynamic](https://docs.dynamic.xyz/introduction/welcome)
- [Privy](https://docs.privy.io/welcome)
- [Reown](https://docs.reown.com/overview)
- [Web3Auth](https://web3auth.io/docs)
