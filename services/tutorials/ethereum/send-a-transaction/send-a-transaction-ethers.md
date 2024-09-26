---
description: Send a transaction using Ethers.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Use ethers.js

In this tutorial, you'll send a transaction of 0.001 ETH from one account to another using the [`ethers.js`](https://docs.ethers.io/v5/) JavaScript library.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- An Ethereum account

:::info

Use [MetaMask](https://metamask.io) or similar to create an Ethereum account for testing.

:::

## Steps

### 1. Select your network and verify funds

<Tabs>
  <TabItem value="Sepolia" label="Sepolia" default>

To use the Sepolia testnet, ensure that your account has Sepolia ETH.
You can use the [Infura faucet](https://www.infura.io/faucet) to add more funds.

</TabItem>
<TabItem value="Alternative network" label="Alternative network" default>

To use an alternative network, ensure that your account has testnet ETH for that network.

:::info note
When using an alternative network, you'll update your `.env` file in
[Step 4](#4-create-a-env-file) with the alternative network name.
:::

</TabItem>
</Tabs>

### 2. Create a project directory

Create a new directory for your project using the command line:

```bash
mkdir infura
```

Change into the new directory:

```bash
cd infura
```

### 3. Install required packages

Install the `ethers` and `dotenv` packages in the project directory.

:::info

The [`dotenv`](../../../how-to/javascript-dotenv.md) package allows you to use a `.env` file to securely store private environment variables on your local machine.

:::

Install the `ethers` package:


```bash
npm install --save ethers
```

Install the `dotenv` package:

```
npm install dotenv --save
```

### 4. Create a `.env` file

Create a `.env` file in your project directory to store the project and Ethereum account details:

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

### 5. Create an `eip1559_tx.js` file

In the project directory, create an `eip1559_tx.js` file, which configures and sends the transaction. For example:

:::warning Important

To send test ETH to an account of your choice, update line 15 with your selected account.

:::

```javascript title="eip1559_tx.js" showLineNumbers {15}
const { ethers, parseUnits } = require("ethers");

  async function main() {
    // Configuring the connection to an Ethereum node
    const network = process.env.ETHEREUM_NETWORK;
    const provider = new ethers.InfuraProvider(
      network,
      process.env.INFURA_API_KEY
    );
    // Creating a signing account from a private key
    const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY).connect(provider);

    // Creating and sending the transaction object
    const tx = await signer.sendTransaction({
      to: "0x618917c657e9F5b346c0141CB14F5D3CED65D449", // Replace with your selected account
      value: parseUnits("0.001", "ether"),
    });
    console.log("Mining transaction...");
    console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
    // Waiting for the transaction to be mined
    const receipt = await tx.wait();
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);
  }
```

### 6. Execute the transaction

To execute the transaction, run:

```bash
node eip1559_tx.js
```

Example output:

```bash
Mining transaction...
https://sepolia.etherscan.io/tx/0x7c5c0061fbda9e01c1bb1269ffc7323107e2116d8f7327ee945aecc7c33d21c8
Mined in block 7587728
```

You can search for the transaction on a block explorer such as [Sepolia Etherscan](https://www.infura.io/faucet).

### (Optional) Fine tune the transaction details

To change default values, update the `signer.sendTransaction` method to include an `estimateGas` result:

```javascript title="eip1559_tx.js"
const limit = provider.estimateGas({
  from: signer.address,
  to: "<to_address_goes_here>",
  value: ethers.utils.parseUnits("0.001", "ether"),
});

// Creating and sending the transaction object
const tx = await signer.sendTransaction({
  to: "<to_address_goes_here>",
  value: ethers.utils.parseUnits("0.001", "ether"),
  gasLimit: limit,
  nonce: signer.getTransactionCount(),
  maxPriorityFeePerGas: ethers.utils.parseUnits("2", "gwei"),
  chainId: 3,
});
```
