---
title: Introduction
---

# Integrate with MetaMask using the API and SDK

You can integrate your dapp with MetaMask using the
[MetaMask Ethereum provider API](#metamask-ethereum-provider-api) directly,
[MetaMask SDK](#metamask-sdk), or a [convenience library](#convenience-libraries).

## MetaMask Ethereum provider API

MetaMask injects a global [Ethereum provider API](reference/provider-api.md) into websites visited
by its users at `window.ethereum`.
This API allows websites to request users' Ethereum accounts, read data from blockchains the user is
connected to, and suggest that the user sign messages and transactions.
The presence of the provider object indicates an Ethereum user.

The Ethereum provider API is specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193).

[Get started using the API.](get-started/set-up-dev-environment.md)

## MetaMask SDK

MetaMask SDK provides an easy-to-use library for a reliable, secure, and seamless connection for
your dapp to the MetaMask extension and MetaMask Mobile.

Our goal is to enable delightful user experiences for your apps that are built for diverse
communities of users and use cases, and compatible with various platforms (mobile apps, desktop
apps, and web apps).

MetaMask SDK is a library that can be installed by developers in their projects and will
automatically guide their users to easily connect with a MetaMask wallet client.

:::tip
The MetaMask SDK instance returns the [`ethereum` web3 provider](reference/provider-api.md) that
developers are already used to, so existing dapps work out of the box with the SDK!
:::

[Get started using MetaMask SDK.](how-to/use-sdk/index.md)

### Example use cases

- Dapps running on a desktop browser: MetaMask SDK checks if the MetaMask wallet browser extension
  is available and, if not, it prompts the user to install it or connect via QR code with their
  MetaMask Mobile wallet.
- Native mobile applications: MetaMask SDK automatically deeplinks to the user's MetaMask Mobile
  wallet to make the connection.

## Convenience libraries

Convenience libraries exist for a variety of reasons.

Some of them simplify the creation of specific user interface elements, some entirely manage the
user account onboarding, and others give you a variety of methods for interacting with smart
contracts, for a variety of API preferences (for example, promises, callbacks, and strong types).

The provider API itself is very simple, and wraps
[Ethereum JSON-RPC](https://eth.wiki/json-rpc/API#json-rpc-methods) formatted messages, which is why
developers usually use a convenience library for interacting with the provider, such as
[Ethers](https://www.npmjs.com/package/ethers), [web3.js](https://www.npmjs.com/package/web3),
[Truffle](https://www.trufflesuite.com/), and [Embark](https://framework.embarklabs.io/).
You can refer to those tools' documentation to interact with the provider.

The provider API is all you need to create a full-featured web3 application, but if you need
higher-level abstractions than those provided by the API, we recommend using a convenience library.
