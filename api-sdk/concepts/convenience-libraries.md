# Convenience libraries

Convenience libraries exist for a variety of reasons.

Some of them simplify the creation of specific user interface elements, some entirely manage the
user account onboarding, and others give you a variety of methods for interacting with smart
contracts, for a variety of API preferences (for example, promises, callbacks, and strong types).

The [provider API](../reference/provider-api.md) is very simple, and wraps
[Ethereum JSON-RPC](https://eth.wiki/json-rpc/API#json-rpc-methods) formatted messages, which is why
some developers use a convenience library for interacting with the provider, such as
[Ethers](https://www.npmjs.com/package/ethers), [web3.js](https://www.npmjs.com/package/web3),
[Truffle](https://www.trufflesuite.com/), [Embark](https://framework.embarklabs.io/), and
[WalletConnect](https://walletconnect.com/).
You can refer to those tools' documentation to interact with the provider.

The provider API is all you need to create a full-featured web3 application, but if you need
higher-level abstractions than those provided by the API, we recommend using a convenience library.

## MetaMask SDK and WalletConnect

