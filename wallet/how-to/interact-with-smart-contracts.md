# Interact with smart contracts

Once you have your [development environment set up](../get-started/set-up-dev-environment.md), you
can start interacting with some smart contracts.
There are some basic things you'll need, regardless of what convenience library you're using, when
communicating with a smart contract.

## The contract network

If you're not connected to the right network, you can't send transactions to your contract.
Many dapp developers deploy their contract to a testnet first, in order to avoid potentially
disastrous fees if something goes wrong during development and testing on mainnet.

Regardless of which network you deploy your final dapp on, your users must be able to access it.
Use the [`wallet_switchEthereumChain`](../reference/rpc-api.md#wallet_switchethereumchain) and
[`wallet_addEthereumChain`](../reference/rpc-api.md#wallet_addethereumchain) RPC API methods to
prompt the user to add a chain that you suggest, and switch to it using a confirmation dialogue.

## The contract address

Every account in Ethereum has an address, whether it's an external key-pair account or a smart contract.
In order for any smart contract library to communicate with your contracts, it must know the exact address.

Read about
[how to find a token contact address](https://metamask.zendesk.com/hc/en-us/articles/360059683451-How-to-view-or-add-custom-token-contract-address).

## The contract ABI

In Ethereum, the [ABI specification](https://solidity.readthedocs.io/en/develop/abi-spec.html) is a
way to encode the interface of a smart contract that is comprehensible to your user interface.
It is an array of method-describing objects, and when you feed this and the address into a
contract-abstraction library, the ABI tells those libraries about what methods to provide, and
how to compose transactions to call those methods.

Example libraries include:

- [Ethers](https://www.npmjs.com/package/ethers).
- [web3.js](https://www.npmjs.com/package/web3).
- [Embark](https://framework.embarklabs.io/).
- [ethjs](https://www.npmjs.com/package/ethjs).
- [Truffle](https://www.trufflesuite.com/).

## The contract bytecode

If your dapp publishes a new pre-compiled smart contract, it may need to include some bytecode.
You don't know the contract address in advance, but instead must publish,
watch for the transaction to be processed, and then extract the final contract's address from the
completed transaction.

If publishing a contract from bytecode, you still need an ABI to interact with it.
The bytecode doesn't describe how to interact with the final contract.

## The contract source code

If your dapp allows users to edit smart contract source code and compile it, similar to
[Remix](http://remix.ethereum.org/), you may import a whole compiler.
You derive your bytecode and ABI from that source code, and eventually you derive the contract's
address from the completed transaction, where that bytecode is published.
