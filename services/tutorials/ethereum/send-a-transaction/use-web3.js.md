---
description: Send a transaction using Web3.js.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Use web3.js

In this tutorial, you'll send a regular transaction of 0.001 ETH from one account to another using the Web3 JavaScript library.

## Prerequisites

- A [Web3 project](../../../get-started/infura.md) on Infura
- [Node.js installed](https://nodejs.org/en/download/)
- An Ethereum account

:::info

Use [MetaMask](https://metamask.io) or similar to create an Ethereum account for testing.

:::

## Steps

### 1. Select your network and verify funds

<Tabs>
  <TabItem value="View" label="Sepolia" default>

To use the Sepolia testnet, ensure that your account has Sepolia ETH.
You can use the [Infura faucet](https://www.infura.io/faucet) to add more funds.

</TabItem>
<TabItem value="Retrieve" label="Alternative network" default>

To use an alternative network, ensure that your account has testnet ETH for that network.

:::info note
When using an alternative network, you'll:

- Update your `.env` file in [Step 4](#4-create-a-env-file) with the alternative network name.
- Update the `chaindId` in [Step 5](#5-create-a-sendjs-file) with the alternative network chain ID.
:::

</TabItem>
</Tabs>

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

### 4. Create a `.env` file

Create a `.env` file in your project directory to store the project and Ethereum account details.

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```text title=".env"
ETHEREUM_NETWORK = "<NETWORK>"
INFURA_API_KEY = "<YOUR-API-KEY>"
SIGNER_PRIVATE_KEY = "<PRIVATE-KEY>"
```

</TabItem>
<TabItem value="Example" label="Example" default>

```text title=".env"
ETHEREUM_NETWORK = "sepolia"
INFURA_API_KEY = "d23...x...6e"
SIGNER_PRIVATE_KEY = "0x561...x...61df"
```

</TabItem>
</Tabs>

Replace the following values in the `.env` file:

- `<NETWORK>` with `sepolia` or the alternative network you are using.
- `<YOUR-API-KEY>` with your API key of the web3 project.
- `<PRIVATE-KEY>` with the [private key of your Ethereum account](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key). A transaction must be signed with the sender's private key. Make sure that you prefix the `SIGNER_PRIVATE_KEY` value with `0x`. The private key you export from MetaMask isn't prefixed with `0x`.

:::danger

Never disclose your private key. Anyone with your private keys can steal the assets controlled by those keys.

:::

### 5. Create a `send.js` file

In the project directory, create a `send.js` file, which configures and sends the transaction.
For example:

:::warning Important

- To send test ETH to an account of your choice, update line 20 with your selected account.
- If you are using an alternative network to Sepolia, update the `chainId` in line 39 with your
  network chain ID.

:::

```javascript title="send.js" showLineNumbers {20,39}
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
        to: "0xAED01C776d98303eE080D25A21f0a42D94a86D9c", // Replace with your selected account
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
    maxFeePerGas: web3.utils.toWei("90", "gwei"),
    chainId: 11155111, // If you're not using Sepolia, replace with your network chain ID
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

The terminal displays a log similar to the following. Select the URL to view the transaction details.

```bash
Raw transaction data:
0x02f87383aa36a78084b2d05e0084b2d05e0082520894aed01c776d98303ee080d25a21f0a42d94a86d9c865af3107a400080c080a058b88e1e01517ecaab0349f838aa07cbc90297679b2bbf2f48fa6f53b02ae358a00564373fe50e923d87f1da8d7805533c71cf81af32d66b3b2f45e972e4896fde
Mining transaction ...
https://sepolia.etherscan.io/tx/0x31581c7ac2020de48d48363171fb3406f19fd14e67575695dafba51295959049
Mined in block 3773903
```
