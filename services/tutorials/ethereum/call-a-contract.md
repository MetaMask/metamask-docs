---
description: Use Web3.js to execute a smart contract function.
sidebar_position: 3
---

# Call a contract

This tutorial uses Web3.js to execute a function in a smart contract. Calling the contract function is a type of transaction that requires paying gas.

## Prerequisites

Before attempting this tutorial, ensure you completed the tutorial to [deploy a contract](deploy-a-contract-using-web3.js.md) and [updated the `.env` file with the smart contract address](deploy-a-contract-using-web3.js.md#10-update-the-env-file).

## Steps

### 1. Create a script to execute the contract

In the `deployContract` folder created [earlier](deploy-a-contract-using-web3.js.md#2-create-a-project-directory), create the JavaScript file that executes a contract function and signs the transaction.

In this example we'll create the `call.js` file with the following contents:

```javascript
const { Web3 } = require("web3")

// Loading the contract ABI
// (the results of a previous compilation step)
const fs = require("fs")
const { abi } = JSON.parse(fs.readFileSync("Demo.json"))

async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
    )
  )
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    "0x" + process.env.SIGNER_PRIVATE_KEY
  )
  web3.eth.accounts.wallet.add(signer)
  // Creating a Contract instance
  const contract = new web3.eth.Contract(
    abi,
    // Replace this with the address of your deployed contract
    process.env.DEMO_CONTRACT
  )
  // Issuing a transaction that calls the `echo` method
  const method_abi = contract.methods.echo("Hello, world!").encodeABI()
  const tx = {
    from: signer.address,
    to: contract.options.address,
    data: method_abi,
    value: "0",
    gasPrice: "100000000000",
  }
  const gas_estimate = await web3.eth.estimateGas(tx)
  tx.gas = gas_estimate
  const signedTx = await web3.eth.accounts.signTransaction(
    tx,
    signer.privateKey
  )
  console.log("Raw transaction data: " + signedTx.rawTransaction)
  // Sending the transaction to the network
  const receipt = await web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`)
      console.log(`https://${network}.etherscan.io/tx/${txhash}`)
    })
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`)
}

require("dotenv").config()
main()
```

### 2. Call the contract

Run the script to call the smart contract:

```
node call.js
```

:::info

If you receive an `insufficient funds for gas` error, then you may need to top up your signer account with some testnet ETH.

:::

The script will display the details of the transaction in the output. View the transaction in a block explorer such as Etherscan.
