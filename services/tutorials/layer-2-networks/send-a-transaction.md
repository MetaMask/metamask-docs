---
description: Send a transaction of the Polygon network.
---

# Send a transaction with Polygon

As with Ethereum, [transactions](https://ethereum.org/en/developers/docs/transactions/) are state-changing actions on the Polygon PoS blockchain. Examples of transactions are:

- Regular transactions from one account to another.
- Contract deployment transactions, or calling a function in a smart contract.

This tutorial uses the Ethereum Web3 JavaScript library to send a transaction between two accounts on the Polygon-Mumbai testnet.

## Prerequisites

- An Infura [API key](../../../../developer-tools/dashboard/get-started/create-api/)
- [Node.js installed](https://nodejs.org/en/download/)
- [MetaMask installed](https://metamask.io) and an account for testing purposes

:::info

You can use [MetaMask](https://metamask.io) or a similar Ethereum wallet to create an account for testing purposes on the Polygon blockchain.

:::

## Steps

### 1. Add Polygon network to MetaMask

Refer to the Polygon instructions to [add the Polygon networks to MetaMask](https://polygon.technology/blog/getting-started-with-metamask-on-polygon). This tutorial uses the Polygon Mumbai network.

### 2. Fund your account

[Use the Polygon faucet](https://faucet.polygon.technology) to load testnet MATIC on your account for the Mumbai network.

### 3. Create a project directory

Create a new directory for your project. This can be done from the command line:

```bash
mkdir sendTransaction
```

Change into the new directory:

```bash
cd sendTransaction
```

### 4. Install required packages

Install the `web3` and `dotenv` packages in the project directory.

:::info

The `dotenv` package allows you to use a `.env` file to securely store private environment variables on your local machine.

:::

Install the `web3` package:

```
npm install web3
```

Install the `dotenv` package:

```
npm install dotenv --save
```

### 5. Create the `.env` file

Create a `.env` file in your project directory to store the project and account details.

```
POLYGON_NETWORK = "polygon-amoy"
INFURA_API_KEY = "<YOUR-API-KEY>"
SIGNER_PRIVATE_KEY = "<Private-Key>"
```

Ensure you replace the following values in the `.env` file:

- `<YOUR-API-KEY>` with the API key from your [MetaMask Developer dashboard](https://developer.metamask.io/).
- `<Private-Key>` with the [private key of your account](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

:::danger

Never disclose your private key. Anyone with your private keys can steal any assets held in your account.

:::

### 6. Create `send.js` file

In this example we'll create a JavaScript file (`send.js`) in the project directory which configures and sends the transaction.

```javascript title="send.js"
const { Web3 } = require("web3")

async function main() {
  // Configuring the connection to the Polygon node
  const network = process.env.POLYGON_NETWORK
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`
    )
  )
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY
  )
  web3.eth.accounts.wallet.add(signer)
  // Creating the transaction object
  const tx = {
    from: signer.address,
    to: "0xAED01C776d98303eE080D25A21f0a42D94a86D9c",
    value: web3.utils.toWei("0.001", "ether"),
  }
  // Assigning the right amount of gas
  tx.gas = await web3.eth.estimateGas(tx)

  // Sending the transaction to the network
  const receipt = await web3.eth
    .sendTransaction(tx)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`)
      console.log(`Transaction hash: ${txhash}`)
    })
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`)
}

require("dotenv").config()
main()
```

### 7. Execute the transaction

To execute the transaction, run:

```bash
node send.js
```

The command line will display the block number containing the transaction details.

### 8. View the transaction details

Copy transaction hash and view the transaction in the [Polygon Mumbai block explorer](https://amoy.polygonscan.com/).
