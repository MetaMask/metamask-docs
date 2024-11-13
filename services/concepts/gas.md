---
description: Conceptual information about Gas.
sidebar_position: 6
---

# Gas

Gas is a unit used to measure the computational effort required to perform an action on a blockchain network, such as
executing a smart contract or sending a transaction. To perform an action, users must pay in units of gas, which is
calculated based on the computational resources required for the action, and to compensate the miners who execute the
request.

The amount paid is the units of gas consumed multiplied by the gas price. For Ethereum, this is the
amount of Ether a user is willing to pay for each unit of gas. The gas price is set by the user and is a key factor in
determining the priority of their transaction relative to other transactions on the network.

Users can also set a gas limit, which is the maximum amount of gas that the user is willing to spend on a transaction or
smart contract. It acts as a safety mechanism to prevent users from accidentally overspending on a single transaction.

## EIP-1559 gas prices

The Ethereum London hard fork update changed the blockchain’s transaction fee model by implementing
[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559). This update changed the way users pay gas fees on the Ethereum
network and other EVM chains.

Before EIP-1559, users specified a gas price, which was the amount they were willing to pay for a transaction to be mined.
The auction-style system meant gas prices fluctuated often. After EIP-1559, this has been replaced by two new values:

- **Base fee**: The minimum transaction fee for every transaction to be included in a block. This is calculated by the network
  and is affected by the number of transactions included in the previous block. The base fee gets burned, meaning
  Ethereum is deflationary.
- **Max priority fee**: The optional transaction fee to prioritize your transactions over others. This is the tip that goes
  to miners.

## Gas API

The [Gas API](../reference/gas-api/index.md) allows you to get current and historical gas price information.
The APIs provide recommended gas prices to get your transactions included in a block, based on your priority requirements.

This allows you to optimize your transactions for speed and cost-effectiveness. By using the Gas API, developers
can get real-time insights into the gas market and make informed decisions about how much to pay for transaction fees.
