---
description: Send a transaction using Ethers.
---

# Use ethers.js

Send a regular transaction from one account to another with the [`ethers.js`](https://docs.ethers.io/v5/) JavaScript library.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/).
- An Ethereum account containing some [Sepolia test ETH](https://www.infura.io/faucet).

:::info

Use [MetaMask](https://metamask.io) or similar to create an Ethereum account for testing.

:::

## Steps

### 1. Create a project directory

Create a new directory:

```bash
mkdir infura
```

`cd` into the directory:

```bash
cd infura
```

### 2. install the dependencies

```bash
npm install --save ethers
```

### 3. Create a .env file

Create a `.env` file in your project directory to store the project and Ethereum account details.

```bash
ETHEREUM_NETWORK = "sepolia"
INFURA_API_KEY = "<API-KEY>"
SIGNER_PRIVATE_KEY = "<PRIVATE-KEY>"
```

Ensure you replace the following values in the `.env` file:

- `<API-KEY>` with the API key of the Web3 project.
- `<PRIVATE-KEY>` with the [private key of your Ethereum account](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key). A transaction must be signed with the sender's private key.

If using a network other than Sepolia, ensure you update `ETHEREUM_NETWORK` with the network name.

:::danger

Never disclose your private key. Anyone with your private keys can steal any assets held in your account.

:::

### 4. Create `eip1559_tx.js` file

In this example, we'll create a JavaScript file (`eip1559_tx.js`) in the project directory which configures and sends the transaction.

:::info

Replace `to_account` with the relevant details.

:::

```go
const { ethers } = require("ethers");

async function main() {
  // Configuring the connection to an Ethereum node
  const network = process.env.ETHEREUM_NETWORK;
  const provider = new ethers.providers.InfuraProvider(
    network,
    process.env.INFURA_API_KEY
  );

  // Creating a signing account from a private key
  const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY, provider);

  // Creating and sending the transaction object
  const tx = await signer.sendTransaction({
    to: "<to_account>",
    value: ethers.utils.parseUnits("0.001", "ether"),
  });
  console.log("Mining transaction...");
  console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);

  // Waiting for the transaction to be mined
  const receipt = await tx.wait();
  // The transaction is now on chain!
  console.log(`Mined in block ${receipt.blockNumber}`);
}

require("dotenv").config();
main();
```

### 5. Execute the transaction

Run the script:

```bash
node eip1559_tx.js
```

Example output:

```bash
Mining transaction...
https://sepolia.etherscan.io/tx/0x7c5c0061fbda9e01c1bb1269ffc7323107e2116d8f7327ee945aecc7c33d21c8
Mined in block 7587728
```

You can search for the transaction on a block explorer like [Sepolia Etherscan](https://www.infura.io/faucet).

### 6. Fine tune the transaction details (optional)

To change default values, update the `signer.sendTransaction` method to include an `estimateGas` result.

```javascript
const limit = provider.estimateGas({
  from: signer.address,
  to: "<to_address_goes_here>",
  value: ethers.utils.parseUnits("0.001", "ether"),
})

// Creating and sending the transaction object
const tx = await signer.sendTransaction({
  to: "<to_address_goes_here>",
  value: ethers.utils.parseUnits("0.001", "ether"),
  gasLimit: limit,
  nonce: signer.getTransactionCount(),
  maxPriorityFeePerGas: ethers.utils.parseUnits("2", "gwei"),
  chainId: 3,
})
```
