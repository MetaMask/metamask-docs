---
description: Learn about interacting with smart contracts.
sidebar_position: 8
---

# Smart contracts

This is a high-level overview of interacting with smart contracts.
You can also see how to
[interact with smart contracts from your Unity game](../how-to/use-sdk/gaming/unity/smart-contracts/index.md).

To interact with a smart contract, your dapp needs the following information:

- [Contract network](#contract-network)
- [Contract address](#contract-address)
- [Contract ABI](#contract-abi)
- [Contract bytecode](#contract-bytecode)
- [Contract source code](#contract-source-code)

## Contract network

If you're not connected to the right network, you can't send transactions to your contract.
Many dapp developers deploy their contract to a testnet first, in order to avoid potentially
disastrous fees if something goes wrong during development and testing on Mainnet.

Regardless of which network you deploy your final dapp on, your users must be able to access it.
Use the [`wallet_switchEthereumChain`](/wallet/reference/wallet_switchethereumchain) and
[`wallet_addEthereumChain`](/wallet/reference/wallet_addethereumchain) RPC methods to prompt
the user to add a chain that you suggest, and switch to it using a confirmation dialogue.

## Contract address

Every account in Ethereum has an address, whether it's an external key-pair account or a smart contract.
For any smart contract library to communicate with your contracts, a smart contract must know the exact address.

Read about
[how to find a token contact address](https://metamask.zendesk.com/hc/en-us/articles/360059683451-How-to-view-or-add-custom-token-contract-address).

## Contract ABI

In Ethereum, the [ABI specification](https://solidity.readthedocs.io/en/develop/abi-spec.html) is a
way to encode the interface of a smart contract that's comprehensible to your user interface.
The ABI is an array of method-describing objects, and when you feed this and the address into a
contract-abstraction library, the ABI tells those libraries about what methods to provide, and
how to compose transactions to call those methods.

Example libraries include the following:

- [Ethers](https://www.npmjs.com/package/ethers)
- [web3.js](https://www.npmjs.com/package/web3)
- [Embark](https://framework.embarklabs.io/)
- [ethjs](https://www.npmjs.com/package/ethjs)
- [Hardhat](https://hardhat.org/)

## Contract bytecode

If your dapp publishes a new pre-compiled smart contract, it might need to include some bytecode.
You don't know the contract address in advance; you must publish the contract, watch for the
transaction to be processed, and then extract the final contract's address from the completed transaction.

If you publish a contract from bytecode, you still need an [ABI](#contract-abi) to interact with it.
The bytecode doesn't describe how to interact with the final contract.

## Contract source code

If your dapp allows users to edit smart contract source code and compile it, similar to
[Remix](https://remix.ethereum.org/), you can import a whole compiler.
You derive your bytecode and ABI from that source code, and eventually derive the contract's address
from the completed transaction, where that bytecode is published.
