# Getting Started

To develop for MetaMask, you're first going to want to get MetaMask installed on your development machine. [Download here](https://metamask.io/).

Once you have it running, you should find that new browser tabs have a `window.ethereum` object available in the console. This is the way MetaMask provides for you to interact with it.

You can review the full API for that object [here](./API_Reference).

## Basic Considerations

### Web3 Browser Detection

The first thing your app will want to do is verify whether the user is using MetaMask or not, which is simple using a check like `if (typeof window.ethereum !== 'undefined') { /* deal with it */ }`.

### Detecting MetaMask

If you want to differentiate MetaMask from other ethereum-compatible browsers, you can detect MetaMask using `ethereum.isMetaMask`.

### User State

Currently there are a few stateful things you want to consider when interacting with this API:

- What is the current network?
- What is the current account?

Both of these are available synchronously as `ethereum.networkVersion` and `ethereum.selectedAddress`. You can listen for changes using events, too ([see the API reference](./API_Reference)).

## Choosing a Convenience Library

Convenience libraries exist for a variety of reasons.

Some of them simplify the creation of specific user interface elements, some entirely manage the user account onboarding, and others give you a variety of methods of interacting with smart contracts, for a variety of API preferences, from promises, to callbacks, to strong types, and on.

The provider API itself is very simple, and wraps [Ethereum JSON-RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC#json-rpc-methods) formatted messages, which is why developers usually use a convenience library for interacting with the provider, like [web3](https://www.npmjs.com/package/web3), [truffle](https://truffleframework.com/), [ethjs](https://www.npmjs.com/package/ethjs), [Embark](https://embark.status.im/), or others. From those tools, you can generally find sufficient documentation to interact with the provider, without reading this lower-level API.

