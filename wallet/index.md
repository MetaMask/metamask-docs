---
title: Introduction
---

# Integrate with the MetaMask wallet

Integrate your dapp with the MetaMask wallet using the
[MetaMask Ethereum provider API](reference/provider-api.md), which enables your dapp to interact
with its users' Ethereum accounts.
We recommend using [MetaMask SDK](how-to/use-sdk) to easily enable your users to connect to their
MetaMask wallet client from any platform.

Get started by [setting up your development environment](get-started/set-up-dev-environment.md).

:::note
- This documentation assumes intermediate knowledge of JavaScript, HTML, and CSS.
- To learn how to extend the functionality of MetaMask, visit the
  [MetaMask Snaps developer documentation](../snaps).
:::

## What is the MetaMask Ethereum provider API?

The [MetaMask Ethereum provider API](reference/provider-api.md) is a JavaScript API that MetaMask
injects into websites visited by MetaMask users.
Your dapp can use this API to request users' Ethereum accounts, read data from blockchains the user
is connected to, and suggest that the user sign messages and transactions.

## What is MetaMask SDK?

[MetaMask SDK](how-to/use-sdk/index.md) is a library that provides a reliable, secure, and seamless
[connection](concepts/sdk-connections.md) from your dapp to the MetaMask browser extension and
MetaMask Mobile.
You can install the SDK into your dapp to enable your users to easily connect to a MetaMask wallet
client from multiple platforms (web, desktop, and mobile).

For example, for dapps running on a desktop browser, MetaMask SDK checks if the MetaMask extension
is installed.
If MetaMask isn't installed, the SDK prompts the user to install it or connect to their MetaMask
Mobile wallet using a QR code.
For dapps running on a mobile browser, MetaMask SDK automatically deeplinks to the user's MetaMask
Mobile wallet to make the connection.

## Questions?

If you have questions about integrating your dapp with MetaMask, you can interact with the MetaMask
team and community on the MetaMask channels on [ConsenSys Discord](https://discord.gg/consensys).
