# Initializing Dapps

Once you have your basic dev environment [set up](./Getting-Started), you are ready to start interacting with some smart contracts. There are some basic things you'll need, regardless of what convenience library you're using, when communicating with a smart contract:

## The Contract Network

If you aren't connected to the right network, you aren't going to have any luck sending transactions to your contract, so make sure you have this right! Many dapp developers choose to deploy their contract to a testnet first, in order to avoid potentially disastrous fees if something goes wrong during development and testing on mainnet.

No matter which network you deploy your final dapp on, your user will need to be able to access it. MetaMask makes available [wallet_switchEthereumChain](https://docs.metamask.io/guide/rpc-api.html#other-rpc-methods), as well as [wallet_addEthereumChain](https://docs.metamask.io/guide/rpc-api.html#wallet-addethereumchain), which allows you to prompt the user to add a chain that you suggest, and switch to it using a confirmation dialogue.

## The Contract Address

Every account in Ethereum has an address, whether it's an external key-pair account, or a smart contract. In order for any smart contract library to communicate with your contracts, they'll need to know its exact address. If you deployed a contract, you probably know how to find the address, but if you're just getting started, check out our Knowledgebase [explainer on finding contract addresses.](https://metamask.zendesk.com/hc/en-us/articles/360059683451-How-to-view-or-add-custom-token-contract-address)

## The Contract ABI

In Ethereum, [The ABI Specification](https://solidity.readthedocs.io/en/develop/abi-spec.html) is a way to encode the interface of a smart contract in a way that is comprehensible to your user interface.
It is an array of method-describing objects, and when you feed this and the address into a contract-abstraction library, this `ABI` tells those libraries about what methods to provide, and how to compose transactions to call those methods.

Example libraries include:

- [ethers](https://www.npmjs.com/package/ethers)
- [web3.js](https://www.npmjs.com/package/web3)
- [Embark](https://framework.embarklabs.io/)
- [ethjs](https://www.npmjs.com/package/ethjs)
- [truffle](https://www.trufflesuite.com/)

## The Contract Bytecode

If your web app is going to publish a new smart contract that is pre-compiled, it may need to include some `bytecode`. In this case, you will not know the contract address in advance, but instead will have to publish, watch for the transaction to be processed, and then extract the final contract's address from the completed transaction.

If publishing a contract from bytecode, you will still want an `ABI` if you want to interact with it! The bytecode does not describe how to interact with the final contract.

## The Contract Source Code

If your website is going to allow users to edit smart contract source code and compile it, like [Remix](http://remix.ethereum.org/), you may import a whole compiler. In this case you're going to derive your bytecode and ABI from that source code, and eventually you will derive the contract's address from the completed transaction, where that bytecode is published.
