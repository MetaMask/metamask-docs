# MetaMask Developer Documentation

![MetaMask Logo](https://metamask.io/img/ethereum-metamask-chrome.png)

Welcome to MetaMask's Developer Documentation. This documentation is for learning to develop applications for MetaMask.

- You can find the latest version of MetaMask on [our official website](https://metamask.io/).
- For help using MetaMask, visit our [User Support Site](https://metamask.zendesk.com/hc/en-us).
- For up to the minute news, follow our [Twitter](https://twitter.com/metamask_io) or [Medium](https://medium.com/metamask) pages.
- To learn how to contribute to the MetaMask project itself, visit our [Internal Docs](https://github.com/MetaMask/metamask-extension/tree/develop/docs).

## Why MetaMask?

MetaMask was created out of the needs of creating more secure and usable Ethereum-based web sites. In particular, it handles account management and connecting the user to the blockchain.

- [Read the full docs of our injected provider](./API_Reference/Ethereum_Provider)
- [Read the full docs of the JSON RPC API](./API_Reference/JSON_RPC_API)
- [Read about other supported APIs](./API_Reference/04_Experimental_APIs)

### Account Management

MetaMask allows users to manage accounts and their keys in a variety of ways, including hardware wallets, while isolating them from the site context. This is a great security improvement over storing the user keys on a single central server, or even in local storage, which can allow for [mass account thefts](https://www.ccn.com/cryptocurrency-exchange-etherdelta-hacked-in-dns-hijacking-scheme/).

This security feature also comes with developer convenience: For developers, you simply interact with the globally available `ethereum` API that identifies the users of web3-compatible browsers (like MetaMask users), and whenever you request a transaction signature (like `eth_sendTransaction`, `eth_signTypedData`, or others), MetaMask will prompt the user in as comprehensible a way as possible, allowing them to be informed, you to have a simple API, and attackers left trying to phish individual users rather than performing mass hacks, although [DNS hacks can still be used for phishing en masse](https://medium.com/metamask/new-phishing-strategy-becoming-common-1b1123837168).

### Blockchain Connection

MetaMask comes pre-loaded with nice and fast connections to the Ethereum blockchain and several test networks via our friend at [Infura](https://infura.io/). This allows users to get started without synchronizing a full node, while still providing the option to upgrade their security the blockchain provider of their choice over time.

Today, MetaMask is compatible with any blockchain that exposes an [Ethereum Compatible JSON RPC API](https://github.com/ethereum/wiki/wiki/JSON-RPC), including custom and private blockchains. For development, we recommend running a test blockchain like [Ganache](https://truffleframework.com/ganache).

We're aware that there are constantly more and more private blockchains that people are interested in connecting MetaMask to, and [we are continuously building towards easier and easier integration with these many options](https://medium.com/metamask/metamasks-vision-for-multiple-network-support-4ffbee9ec64d).

## Blockchain Applications

MetaMask makes it easy to write user interfaces to blockchain-based smart contract systems. You can accept payments without knowing how to write smart contracts, but you'll be able to do much more interesting things if you do.

### New Dapp Developers

- We recommend this [Learning Solidity](https://karl.tech/learning-solidity-part-1-deploy-a-contract/) tutorial series by Karl Floersch.

