# Initializing Dapps
::: warning
You must have your basic dev environment [set up](/guide/getting-started.html). Once this is setup you are ready to start interacting with some smart contracts.
:::

There are some basic things you’ll need regardless of what convenience library you’re using, when communicating with a smart contract:

### The Contract Network 
If you aren’t connected to the right network, you aren’t going to have any luck sending transactions to your contract, so make sure you have this right!

Many clever dapps will recognize the user’s current network, and actually adapt to it! For example, if you detect a test network, you could deliberately connect to a test-network version of your smart contract, which makes it easy for users to “try out” your system without using real money!

### The Contract Address 
Every account in Ethereum has an address, whether it’s an external key-pair account, or a smart contract. In order for any smart contract library to communicate with your contracts, they’ll need to know its exact address.

### The Contract ABI
In Ethereum, [The ABI Specification](https://solidity.readthedocs.io/en/develop/abi-spec.html) is a way to encode the interface of a smart contract in a way that your user interface can make sense of. It is an array of method-describing objects, and when you feed this and the address into a contract-abstraction library like: 
* [web3](https://www.npmjs.com/package/web3) 
* [truffle](https://www.trufflesuite.com/) 
* [ethjs](https://www.npmjs.com/package/ethjs)
* [Embark](https://embark.status.im/) 

or others, this `ABI` tells those libraries about what methods to provide, and how to compose transactions to call those methods.

### The Contract Bytecode
If your web app is going to publish a new smart contract that is pre-compiled, it may need to include some `bytecode`. In this case, you will not know the contract address in advance, but instead will have to publish, watch for the transaction to be processed, and then extract the final contract’s address from the completed transaction.

If publishing a contract from bytecode, you will still want an `ABI` if you want to interact with it! The bytecode does not describe how to interact with the final contract.

### The Contract Source Code 
If your website is going to allow users to edit smart contract source code and compile it, like [Remix](https://remix.ethereum.org/), you may import a whole compiler, in which case you’re going to derive your bytecode and ABI from that source code, and eventually you will derive the contract’s address from the completed transaction publishing that bytecode.