# Integrate with MetaMask (API & SDK)

Integrate with MetaMask using the [MetaMask API](#metamask-api) directly,
[MetaMask SDK](#metamask-sdk), or a [convenience library](#convenience-libraries).

## MetaMask API

MetaMask injects a global API into websites visited by its users at `window.ethereum`.
This API allows websites to request users' Ethereum accounts, read data from blockchains the user is
connected to, and suggest that the user sign messages and transactions.
The presence of the provider object indicates an Ethereum user.

The Ethereum JavaScript provider API is specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193).

## MetaMask SDK

MetaMask SDK provides an easy-to-use library for reliable, secure, seamless connection for your dapp
to MetaMask extension and mobile.

Dapps commonly access the MetaMask Extension from a desktop browser, or MetaMask Mobile from the
in-app browser.
However, up till now, native mobile and desktop apps, games, and web apps on mobile browsers have
struggled to connect to a MetaMask wallet.

Our goal is to enable delightful user experiences for your apps that are built for diverse
communities of users and use-cases, and compatible with various platforms (mobile apps, desktop
apps, web-apps).

The MetaMask SDK is a library that can be installed by developers in their projects and will
automatically guide their users to easily connect with a MetaMask wallet client.

:::tip
The MetaMask SDK instance returns the [`ethereum` web3 provider](/ethereum-provider.html) that
developers are already used to, so existing dapps should work out of the box with the SDK!
:::

### Example use cases

- Dapps running on a desktop browser: MetaMask SDK checks if the MetaMask wallet browser extension
  is available and, if not, it prompts the user to install it or to connect via QR code with their
  MetaMask Mobile wallet.
- Native mobile applications: MetaMask SDK automatically deeplinks to the user's MetaMask Mobile
  wallet to make the connection.

## Convenience libraries

Convenience libraries exist for a variety of reasons.

Some of them simplify the creation of specific user interface elements, some entirely manage the
user account onboarding, and others give you a variety of methods of interacting with smart
contracts, for a variety of API preferences, from promises, to callbacks, to strong types, and so on.

The provider API itself is very simple, and wraps
[Ethereum JSON-RPC](https://eth.wiki/json-rpc/API#json-rpc-methods) formatted messages, which is why
developers usually use a convenience library for interacting with the provider, such as
[ethers](https://www.npmjs.com/package/ethers), [web3.js](https://www.npmjs.com/package/web3),
[truffle](https://www.trufflesuite.com/), [Embark](https://framework.embarklabs.io/), or others.
From those tools, you can generally find sufficient documentation to interact with the provider,
without reading the lower-level API.
