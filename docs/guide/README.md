# Introduction

Welcome to MetaMask’s Developer Documentation. MetaMask is the trailblazing tool enabling user interactions and experience on Web3. It is currently available as a browser extension and as a mobile app on both Android and iOS devices. The purpose of this documentation is to illustrate how to build a dapp with MetaMask.

- You can find the latest version of MetaMask on our [official website](https://metamask.io/).
- For help using MetaMask, visit our [User Support Site](https://metamask.zendesk.com/).
- For up to the minute news, follow our [Twitter](https://twitter.com/MetaMask) or [Medium](https://medium.com/metamask) pages.
- To learn how to contribute to the MetaMask project itself, visit our [Internal Docs](https://github.com/MetaMask/metamask-extension/tree/develop/docs).

::: tip Recent Breaking Provider Changes
If you are an Ethereum application developer and are looking for information about our January 2021 provider API changes,
please see our [Migration Guide](./provider-migration.html) for more details.
:::

## Why MetaMask

MetaMask was created to meet the needs of secure and usable Ethereum-based web sites. In particular, it handles account management and connecting the user to the blockchain.

- [Get started here](./getting-started.md)
- [Learn more about our JavaScript Provider API](./ethereum-provider.md)
- [Learn more about our RPC API](./rpc-api.md)

## Account Management

MetaMask allows users to manage accounts and their keys in a variety of ways, including hardware wallets, while isolating them from the site context. This is a great security improvement over storing the user keys on a single central server, or even in local storage, which can allow for [mass account thefts](https://www.ccn.com/cryptocurrency-exchange-etherdelta-hacked-in-dns-hijacking-scheme/).

This security feature also comes with developer convenience: For developers, you simply interact with the globally available `ethereum` API that identifies the users of web3-compatible browsers (like MetaMask users), and whenever you request a transaction signature (like `eth_sendTransaction`, `eth_signTypedData`, or others), MetaMask will prompt the user in as comprehensible a way as possible. This keeps users informed, and leaves attackers only the option of trying to phish individual users, rather than performing mass hacks (although [DNS hacks can still be used for phishing en masse](https://medium.com/metamask/new-phishing-strategy-becoming-common-1b1123837168)).

## Blockchain Connection

MetaMask comes pre-loaded with fast connections to the Ethereum blockchain and several test networks via our friends at [Infura](https://infura.io/). This allows you to get started without synchronizing a full node, while still providing the option to upgrade your security and use the blockchain provider of your choice.

Today, MetaMask is compatible with any blockchain that exposes an [Ethereum-compatible JSON RPC API](https://eth.wiki/json-rpc/API), including custom and private blockchains. For development, we recommend running a test blockchain like [Ganache](https://www.trufflesuite.com/ganache).

We are aware that there are constantly new private blockchains being created. If you are interested in integrating MetaMask with your own custom network, [we have an API that has already enabled a number of networks to do the same.](https://medium.com/metamask/connect-users-to-layer-2-networks-with-the-metamask-custom-networks-api-d0873fac51e5).

## New Dapp Developers

- [Learning Solidity](https://karl.tech/learning-solidity-part-1-deploy-a-contract/) by karl Floersch
- [CryptoZombies](https://cryptozombies.io/)
- [Getting Started with Truffle](https://www.trufflesuite.com/docs/truffle/quickstart)
- [Keeping up with Blockchain Development (from ConsenSys Academy)](https://github.com/ConsenSys-Academy/Blockchain-Developer-Bootcamp/blob/main/docs/S00-intro/L6-keeping-up/index.md)
- Launch into the Web3 space with [ConsenSys Academy's Blockchain Developer Bootcamp](https://consensys.net/academy/bootcamp/)
- Explore everything ConsenSys at the [ConsenSys Developer Portal](https://consensys.net/developers/)
