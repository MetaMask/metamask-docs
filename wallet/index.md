---
slug: /
description: Welcome to the MetaMask Wallet API documentation
---

# Integrate your dapp with the MetaMask wallet

:::tip Building a cross-platform or mobile dapp?
For cross-platform development, mobile integration, or advanced features like QR codes and 
deeplinking, see the [**MetaMask SDK** documentation](/sdk).
:::

The Wallet API is MetaMask's core interface for web dapps to interact with the MetaMask browser extension.
With the Wallet API, you can:

- Interact with users' Ethereum accounts.
- Send transactions and sign messages.
- Listen to account and network changes.

The Wallet API uses standardized [JSON-RPC calls](reference/json-rpc-methods/index.md) to 
interact with users' EVM accounts, and implements standard interfaces like
[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) for Ethereum provider methods and
[EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) for wallet detection.

[Get started by connecting to MetaMask.](how-to/connect.md)

## Wallet API vs. SDK

The **Wallet API** is designed for web dapps that connect to the MetaMask browser extension.
If you're building a desktop web-only dapp, the Wallet API provides everything you need.

[**MetaMask SDK**](/sdk) builds on top of the Wallet API, adding cross-platform support and features like mobile deeplinking and QR code connections.
We recommend the SDK if you want to build a cross-platform onchain dapp.
