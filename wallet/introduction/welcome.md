---
slug: /
description: Welcome to the MetaMask Wallet API documentation
---

# Welcome

Welcome to the **MetaMask Wallet API** documentation!

:::tip Building a cross-platform or mobile app?
For cross-platform development, mobile integration, or advanced features like QR codes and deep linking, check out the [**MetaMask SDK** docs](https://docs.metamask.io/sdk/).
:::

## What is the Wallet API?

The Wallet API is MetaMask's core interface for web applications to interact with the MetaMask browser extension. It enables you to:

- Connect web dApps to MetaMask browser extension
- Interact with users' Ethereum accounts
- Send transactions and sign messages
- Listen to account and network changes
- Use the provider methods
- Use the JSON-RPC methods

The Wallet API uses standardized JSON-RPC calls to interact with users' EVM accounts and implements standard interfaces like [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) for Ethereum provider methods and [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) for wallet detection.

## Wallet API vs SDK

The **Wallet API** is designed for web applications that connect to the MetaMask browser extension. If you're building a desktop web-only dApp, the Wallet API provides everything you need.

The **MetaMask SDK** builds on top of the Wallet API, adding cross-platform support and features like mobile deep linking and QR code connections. SDK is recommended if you want to build a cross-platform on chain apps.

