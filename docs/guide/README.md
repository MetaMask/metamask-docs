# Introduction

Welcome to MetaMask’s Developer Documentation. This documentation is for learning to develop applications for MetaMask.

- You can find the latest version of MetaMask on our [official website](https://metamask.io/).
- For help using MetaMask, visit our [User Support Site](https://metamask.zendesk.com/).
- For up to the minute news, follow our [Peepeth](https://peepeth.com/MetaMask/), [Twitter](https://twitter.com/metamask_io) or [Medium](https://medium.com/metamask) pages.
- To learn how to contribute to the MetaMask project itself, visit our [Internal Docs](https://github.com/MetaMask/metamask-extension/tree/develop/docs).

::: danger Breaking Changes Imminent
We are in the process of shipping changes that will break certain Ethereum web applications.
These changes may ship at any time, and all future major versions of MetaMask on all platforms will be affected.
Please read our [Migration Guide](./provider-migration.html) for more details.

Action is required for Ethereum application developers only.
MetaMask users do not need to do anything.
:::

## Why MetaMask

MetaMask was created to meet the needs of secure and usable Ethereum-based web sites. In particular, it handles account management and connecting the user to the blockchain.

- [Get started here](/guide/getting-started.html)
- [Learn more about our JavaScript Provider API](/guide/ethereum-provider.html)
- [Learn more about our RPC API](/guide/rpc-api.html)

## Account Management

MetaMask allows users to manage accounts and their keys in a variety of ways, including hardware wallets, while isolating them from the site context. This is a great security improvement over storing the user keys on a single central server, or even in local storage, which can allow for [mass account thefts](https://www.ccn.com/cryptocurrency-exchange-etherdelta-hacked-in-dns-hijacking-scheme/).

This security feature also comes with developer convenience: For developers, you simply interact with the globally available `ethereum` API that identifies the users of web3-compatible browsers (like MetaMask users), and whenever you request a transaction signature (like `eth_sendTransaction`, `eth_signTypedData`, or others), MetaMask will prompt the user in as comprehensible a way as possible. This keeps users informed, and leaves attackers left trying to phish individual users rather than performing mass hacks (although [DNS hacks can still be used for phishing en masse](https://medium.com/metamask/new-phishing-strategy-becoming-common-1b1123837168)).

## Blockchain Connection

MetaMask comes pre-loaded with fast connections to the Ethereum blockchain and several test networks via our friends at [Infura](https://infura.io/). This allows you to get started without synchronizing a full node, while still providing the option to upgrade your security and use the blockchain provider of your choice.

Today, MetaMask is compatible with any blockchain that exposes an [Ethereum-compatible JSON RPC API](https://eth.wiki/json-rpc/API), including custom and private blockchains. For development, we recommend running a test blockchain like [Ganache](https://www.trufflesuite.com/ganache).

We’re aware that there are constantly new private blockchains that people are interested in connecting MetaMask to, and [we are building towards easier integration with these many options](https://medium.com/metamask/metamasks-vision-for-multiple-network-support-4ffbee9ec64d).

## New Dapp Developers

- [Learning Solidity](https://karl.tech/learning-solidity-part-1-deploy-a-contract/) by karl Floersch
- [CryptoZombies](https://cryptozombies.io/)
