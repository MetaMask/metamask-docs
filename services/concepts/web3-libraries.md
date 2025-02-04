---
description: Learn about various Web3 libraries.
showLastUpdateTime: true
sidebar_position: 8
---

# Web3 libraries

Web3 libraries provide access to helper methods that allow you to interact with the blockchain via a Web3 provider such
as Infura (or your own node).

The Web3 libraries enable you to build frontends that can communicate with the blockchain (including smart contracts deployed on the blockchain).

Web3 libraries are available for various blockchains, for example, [Matic.js](https://docs.polygon.technology/tools/matic-js/get-started/)
for the Polygon network. This topic focuses on the Ethereum network, but the fundamentals are the same for other blockchains.

The following image shows how a Web3 library can connect to your node (in this example Infura) to communicate with the blockchain.

<div class="left-align-container">
  <div class="img-large">
    <img
      src={require('../images/Web3.png').default}
    />
  </div>
</div>

Some popular Ethereum-compatible Web3 libraries include (but are not limited to) the following.

| Language   | Library                                                                                             |
| :--------- | :-------------------------------------------------------------------------------------------------- |
| JavaScript | [Web3.js](https://web3js.readthedocs.io/), [Ethers.js](https://docs.ethers.org/)                    |
| Python     | [Web3.py](https://web3py.readthedocs.io/en/stable/)                                                 |
| Rust       | [ethers-rs](https://github.com/gakonst/ethers-rs) (recommended), [Rust-web3](https://docs.rs/web3/) |
| C++        | [Aleth](https://github.com/ethereum/aleth)                                                          |
| PHP        | [Web3.php](https://github.com/web3p/web3.php)                                                       |
| Java       | [Web3j](https://docs.web3j.io/)                                                                     |
| Ruby       | [Ethereum Ruby library](https://github.com/EthWorks/ethereum.rb)                                    |

:::info How to access the blockchain

Refer to the [Ethereum instructions](../reference/ethereum/quickstart.md) for information on how to access the
blockchain using some of these libraries.

:::

### Web3.js vs. Ethers.js

Web3.js and Ethers.js are two popular JavaScript Web3 libraries that enable frontend apps to interact with the Ethereum
blockchain. They have similar functionality, with Web3.js currently being the most popular.

Refer to this [Web3.js vs. Ethers.js article](https://blog.infura.io/post/ethereum-javascript-libraries-web3js-ethersjs-nov2021)
which highlights the differences between the libraries to help you decide which library to use.
