---
description: Send a transaction using Web3.js.
---

# Use web3.js

In this tutorial, you'll send a regular transaction from one account to another using the Web3 JavaScript library.

## Prerequisites

- A [Web3 project](../../../../../developer-tools/dashboard/get-started/create-api/) on Infura
- [Node.js installed](https://nodejs.org/en/download/)
- An Ethereum account for testing purposes

:::info

You can use [MetaMask](https://metamask.io) or similar to create an Ethereum account for testing purposes.

:::

## Steps

### 1. Fund your Ethereum account

[Use the Infura faucet to load testnet ETH](https://www.infura.io/faucet) on your Ethereum account for the Sepolia network.

If using a network other than Sepolia, ensure you [update your environment file](#4-create-the-env-file) with the network name.

### 2. Create a project directory

Create a new directory for your project. This can be done from the command line:

```bash
mkdir sendTransaction
```

Change into the new directory:

```bash
cd sendTransaction
```

### 3. Install required packages

Install the `web3` and `dotenv` packages in the project directory.

:::info

The [`dotenv`](../../../how-to/javascript-dotenv.md) package allows you to use a `.env` file to securely store private environment variables on your local machine.

:::

Install the `web3` package:

```
npm install web3
```

Install the `dotenv` package:

```
npm install dotenv --save
```

### 4. Create the `.env` file

Create a `.env` file in your project directory to store the project and Ethereum account details.

```text
ETHEREUM_NETWORK = "sepolia"
INFURA_API_KEY = "<Your-API-Key>"
SIGNER_PRIVATE_KEY = "<Your-Private-Key>"
```

Ensure you replace the following values in the `.env` file:

- `<Your-API-Key>` with the API key of the Web3 project.
- `<Your-Private-Key>` with the [private key of your Ethereum account](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key). A transaction must be signed with the sender's private key. Make sure that you prefix the `SIGNER_PRIVATE_KEY` value with `0x`. The private key you export from MetaMask will not be prefixed with `0x`.

If using a network other than Sepolia, ensure you update `ETHEREUM_NETWORK` with the network name.

:::danger

Never disclose your private key. Anyone with your private keys can steal any assets held in your account.

:::

Here is an example `.env` file showing the valid prefix `0x` for the `SIGNER_PRIVATE_KEY`:

```text
ETHEREUM_NETWORK = "sepolia"
INFURA_API_KEY = "d23...x...6e"
SIGNER_PRIVATE_KEY = "0x561...x...61df"
```

### 5. Create `send.js` file

In this example we'll create a JavaScript file (`send.js`) in the project directory which configures and sends the transaction.

```javascript showLineNumbers
const { Web3 } = require("web3");
const { ETH_DATA_FORMAT, DEFAULT_RETURN_FORMAT } = require("web3");
async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      `https://${network}.infura.io/v3/${process.env.INFURA_API_KEY}`,
    ),
  );
  // Creating a signing account from a private key
  const signer = web3.eth.accounts.privateKeyToAccount(
    process.env.SIGNER_PRIVATE_KEY,
  );
  web3.eth.accounts.wallet.add(signer);
  await web3.eth
    .estimateGas(
      {
        from: signer.address,
        to: "0xAED01C776d98303eE080D25A21f0a42D94a86D9c",
        value: web3.utils.toWei("0.0001", "ether"),
      },
      "latest",
      ETH_DATA_FORMAT,
    )
    .then((value) => {
      limit = value;
    });

  // Creating the transaction object
  const tx = {
    from: signer.address,
    to: "0xAED01C776d98303eE080D25A21f0a42D94a86D9c",
    value: web3.utils.toWei("0.0001", "ether"),
    gas: limit,
    nonce: await web3.eth.getTransactionCount(signer.address),
    maxPriorityFeePerGas: web3.utils.toWei("3", "gwei"),
    maxFeePerGas: web3.utils.toWei("3", "gwei"),
    chainId: 11155111,
    type: 0x2,
  };
  signedTx = await web3.eth.accounts.signTransaction(tx, signer.privateKey);
  console.log("Raw transaction data: " + signedTx.rawTransaction);
  // Sending the transaction to the network
  const receipt = await web3.eth
    .sendSignedTransaction(signedTx.rawTransaction)
    .once("transactionHash", (txhash) => {
      console.log(`Mining transaction ...`);
      console.log(`https://${network}.etherscan.io/tx/${txhash}`);
    });
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
}
require("dotenv").config();
main();
```

### 6. Execute the transaction

To execute the transaction, run:

```bash
node send.js
```

The terminal displays a log similar to the following. Click on the URL to view the transaction details.

```html
Raw transaction data:
0x02f87383aa36a78084b2d05e0084b2d05e0082520894aed01c776d98303ee080d25a21f0a42d94a86d9c865af3107a400080c080a058b88e1e01517ecaab0349f838aa07cbc90297679b2bbf2f48fa6f53b02ae358a00564373fe50e923d87f1da8d7805533c71cf81af32d66b3b2f45e972e4896fde
Mining transaction ...
https://sepolia.etherscan.io/tx/0x31581c7ac2020de48d48363171fb3406f19fd14e67575695dafba51295959049
Mined in block 3773903
```
