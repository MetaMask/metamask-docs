---
description: Create and deploy a smart contract.
sidebar_position: 2
---

# Deploy a contract using web3.js

In this tutorial, you'll create a simple smart contract and use the Web3 JavaScript library to compile and then deploy the smart contract.

## Prerequisites

- An [Ethereum project](../../get-started/infura.md) on Infura
- [Node.js installed](https://nodejs.org/en/download/)
- An Ethereum account for testing purposes

:::info

You can use [MetaMask](https://metamask.io) or similar to create an Ethereum account for testing purposes.

:::

## Steps

### 1. Fund your Ethereum account

[Use the Infura faucet to load testnet ETH](https://www.infura.io/faucet) on your Ethereum account for the Sepolia network.

If using a network other than Sepolia, ensure you [update your environment file](deploy-a-contract-using-web3.js.md#10-update-the-env-file) with the network name.

### 2. Create a project directory

Create a new directory for your project. You can do this from the command line:

```bash
mkdir deployContract
```

Change into the new directory:

```bash
cd deployContract
```

### 3. Install required packages

Install the `web3`, `solc`, and `dotenv` packages in the project directory.

:::info

The [`dotenv`](../../how-to/javascript-dotenv.md) package allows you to use a `.env` file to securely store private environment variables on your local machine.

:::

Install the `web3` package:

```
npm install web3
```

:::info

This example has been written for web3js v4.x. It may not work for earlier versions.

:::

Install the solidity compiler (`solc` package):

```
npm install solc
```

Install the `dotenv` package:

```
npm install dotenv
```

### 4. Create the `.env` file

Create a `.env` file in your project directory to store the project and Ethereum account details.

```
ETHEREUM_NETWORK = "sepolia"
INFURA_API_KEY = "<<YOUR-API-KEY>>"
SIGNER_PRIVATE_KEY = "<Your-Private-Key>"
```

Ensure you replace the following values in the `.env` file:

- `<<YOUR-API-KEY>>` with the API key of the Ethereum project.
- `<Private-Key>` with the [private key of your Ethereum account](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
- If using a network other than Sepolia, ensure you update `ETHEREUM_NETWORK` with the network name.

:::danger

Never disclose your private key. Anyone with your private keys can steal any assets held in your account.

:::

### 5. Create a smart contract

Using an editor, create a smart contract. In this example, we'll create a basic contract called `Demo.sol`.

```javascript
pragma solidity >=0.5.8;

contract Demo {
    event Echo(string message);

    function echo(string calldata message) external {
        emit Echo(message);
    }
}
```

### 6. Create the compile script

We need to compile the contract to ensure the code is correct.

:::info

You can compile the smart contract using the [`solc` command line options](https://docs.soliditylang.org/en/develop/using-the-compiler.html). In this example, we'll create a compile script using JavaScript.

:::

Create a file called `compile.js` with the following content:

```javascript
const fs = require("fs").promises
const solc = require("solc")

async function main() {
  // Load the contract source code
  const sourceCode = await fs.readFile("Demo.sol", "utf8")
  // Compile the source code and retrieve the ABI and Bytecode
  const { abi, bytecode } = compile(sourceCode, "Demo")
  // Store the ABI and Bytecode into a JSON file
  const artifact = JSON.stringify({ abi, bytecode }, null, 2)
  await fs.writeFile("Demo.json", artifact)
}

function compile(sourceCode, contractName) {
  // Create the Solidity Compiler Standard Input and Output JSON
  const input = {
    language: "Solidity",
    sources: { main: { content: sourceCode } },
    settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } },
  }
  // Parse the compiler output to retrieve the ABI and Bytecode
  const output = solc.compile(JSON.stringify(input))
  const artifact = JSON.parse(output).contracts.main[contractName]
  return {
    abi: artifact.abi,
    bytecode: artifact.evm.bytecode.object,
  }
}

main()
```

### 7. Run the compile script

In the [compile script](deploy-a-contract-using-web3.js.md#6-create-the-compile-script) we'll also copy the generated [Application Binary Interface (ABI)](https://docs.soliditylang.org/en/develop/abi-spec.html) and binary to a file called `Demo.json`.

To compile the contract run the following command:

```
node compile.js
```

A file called `Demo.json` should be created in the directory.

### 8. Create the deployment script

Next, we'll create a deployment script called `deploy.js`. The script uses the Web3 methods to sign the transaction and deploy the smart contract to the network.

```javascript
const { Web3 } = require("web3")

// Loading the contract ABI and Bytecode
// (the results of a previous compilation step)
const fs = require("fs")
const { abi, bytecode } = JSON.parse(fs.readFileSync("Demo.json"))

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

  // Using the signing account to deploy the contract
  const contract = new web3.eth.Contract(abi)
  contract.options.data = bytecode
  const deployTx = contract.deploy()
  const deployedContract = await deployTx
    .send({
      from: signer.address,
      gas: await deployTx.estimateGas(),
    })
    .once("transactionHash", (txhash) => {
      console.log(`Mining deployment transaction ...`)
      console.log(`https://${network}.etherscan.io/tx/${txhash}`)
    })
  // The contract is now deployed on chain!
  console.log(`Contract deployed at ${deployedContract.options.address}`)
  console.log(
    `Add DEMO_CONTRACT to the.env file to store the contract address: ${deployedContract.options.address}`
  )
}

require("dotenv").config()
main()
```

### 9. Deploy the contract

Run the deployment script to deploy the contract to the blockchain:

```
node deploy.js
```

The contract deploys to the blockchain and the script displays the contract address.

To make calls to the contract in the future we'll need the contract address. Next we'll update the `.env` file to store the contract address.

### 10. Update the .env file

Update the .`env` file in the working directory to include the contract address. In this example, we'll add the `DEMO_CONTRACT` variable:

```
ETHEREUM_NETWORK = "sepolia"
INFURA_API_KEY = "<<YOUR-API-KEY>>"
SIGNER_PRIVATE_KEY = "<Your-Private-Key>"
DEMO_CONTRACT = "<Contract_Address>"
```

## Next steps

You can now make [calls to the deployed contract](call-a-contract.md). A contract call is a transaction that will consume gas on the public Ethereum network.
