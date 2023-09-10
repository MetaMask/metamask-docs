---
description: Learn about convenience libraries.
sidebar_position: 4
---

# Convenience libraries

Various convenience libraries exist for dapp developers.
Some of them simplify the creation of specific user interface elements, some entirely manage the
user account onboarding, and others give you a variety of methods for interacting with smart
contracts, for a variety of API preferences (for example, promises, callbacks, and strong types).

The [MetaMask Ethereum provider API](../reference/provider-api.md) is very simple, and wraps
[Ethereum JSON-RPC](../reference/rpc-api.md) formatted messages, which is why
some developers use a convenience library for interacting with the provider, such as
[Ethers](https://www.npmjs.com/package/ethers), [web3.js](https://www.npmjs.com/package/web3), and
[Embark](https://framework.embarklabs.io/).
You can refer to those tools' documentation to use them.

:::tip Use MetaMask SDK
We recommend using [MetaMask SDK](sdk.md), which provides a reliable, secure, and seamless
connection from your dapp to the MetaMask wallet.
It onboards users smoothly from multiple dapp platforms using the MetaMask browser extension or
MetaMask Mobile, and your dapp can call any [provider API method](../reference/provider-api.md)
with the SDK installed.

Get started by [setting up the SDK](../how-to/connect/set-up-sdk/index.md).
:::
