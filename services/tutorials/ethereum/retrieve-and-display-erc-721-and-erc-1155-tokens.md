---
description: Retrieve and display ERC-721 and ERC-1155 tokens.
sidebar_position: 5
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Retrieve and display ERC-721 and ERC-1155 tokens

In this tutorial, you'll retrieve and display ERC-721 and ERC-1155 tokens using the Web3 JavaScript library.

## Prerequisites

- An [Ethereum project](../../get-started/infura.md) on Infura
- [Node.js installed](https://nodejs.org/en/download/)

## Steps

### 1. Create a project directory

Create a new directory for your project. This can be done from the command line:

```bash
mkdir retrieveBalance
```

Change into the new directory:

```bash
cd retrieveBalance
```

### 2. Install required packages

Install the `web3` package in the project directory:

```bash
npm install web3
```

:::info

This example has been written for web3js v4.x. It may not work for earlier versions.

:::

### 3. Set up the script

Create a file called `retrieveBalance.js`. At the top of file, add the following lines to import the web3.js library and connect to the Infura HTTPS endpoint:

```javascript
const { Web3 } = require("web3")

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/<YOUR_API_KEY>")
)
```

Replace `<YOUR_API_KEY>` with your Infura API key.

### 4. Set the ABI

For ERC-721 NFTs, use the `tokenURI` function, which is part of the ERC-721 standard. This function retrieves a token’s metadata so you can view it. For ERC-1155, use the `uri` method.

Note the `tokenURI` and `uri` methods are optional for contracts. However, these methods are the only standardized on-chain way of seeing NFT metadata without using a third-party API.

Define the ABI for the respective method by adding the following to the script:

<Tabs>
  <TabItem value="ERC-721" label="ERC-721" default>

```javascript
const tokenURIABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]
```

  </TabItem>
  <TabItem value="ERC-1155" label="ERC-1155" >

```javascript
const uriABI = [
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]
```

  </TabItem>
</Tabs>

### 5. Request the metadata

Define the ABI for the respective method by adding the following to the script:

<Tabs>
  <TabItem value="ERC-721" label="ERC-721" default>

```javascript
const tokenContract = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
const tokenId = 101
```

  </TabItem>
  <TabItem value="ERC-1155" label="ERC-1155" >

```javascript
const tokenContract = "0x76be3b62873462d2142405439777e971754e8e77"
const tokenId = 10570
```

  </TabItem>
</Tabs>

`tokenContract` is the address of the token contract, and `tokenId` is the ID of the specific token to display.

Define the contract using `web3.eth.Contract()`, passing the ABI and contract address as parameters:

<Tabs>
  <TabItem value="ERC-721" label="ERC-721" default>

```javascript
const contract = new web3.eth.Contract(tokenURIABI, tokenContract)
```

  </TabItem>
  <TabItem value="ERC-1155" label="ERC-1155" >

```javascript
const contract = new web3.eth.Contract(uriABI, tokenContract)
```

  </TabItem>
</Tabs>

Next, create an `async` function that interacts with the smart contract.

This calls the ABI function defined in [step 4](retrieve-and-display-erc-721-and-erc-1155-tokens.md#4-set-the-abi).

<Tabs>
  <TabItem value="ERC-721" label="ERC-721" default>

```javascript
async function getNFTMetadata() {
  const result = await contract.methods.tokenURI(tokenId).call()

  console.log(result) // ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/101
}

getNFTMetadata()
```

  </TabItem>
  <TabItem value="ERC-1155" label="ERC-1155" >

```javascript
async function getNFTMetadata() {
  const result = await contract.methods.uri(tokenId).call()

  console.log(result) // https://nftdata.parallelnft.com/api/parallel-alpha/ipfs/QmSwnqTmpwvZH51Uv47opPUxGYx2nknYmGoKoRJQRMDcLL
}

getNFTMetadata()
```

  </TabItem>
</Tabs>

### 6. Display the token

The ERC-1155 contract returns an HTTP URL , which you can directly enter into a browser. The ERC-721 contract returns an IPFS hash you can access using Infura.

#### Access IPFS

In your Infura account, create a new IPFS project. [Enable your dedicated gateways](../../how-to/use-ipfs/access-ipfs-content/dedicated-gateways.md), and you can access IPFS using your unique subdomain.

In the script, add a function to combine the IPFS hash and your Infura subdomain endpoint:

<Tabs>
  <TabItem value="ERC-721" label="ERC-721" default>

```javascript
function addIPFSProxy(ipfsHash) {
  const URL = "https://<YOUR_SUBDOMAIN>.infura-ipfs.io/ipfs/"
  const hash = ipfsHash.replace(/^ipfs?:\/\//, "")
  const ipfsURL = URL + hash

  console.log(ipfsURL) // https://<subdomain>.infura-ipfs.io/ipfs/<ipfsHash>
  return ipfsURL
}
```

  </TabItem>
</Tabs>

Replace `<YOUR_SUBDOMAIN>` with your Infura IPFS subdomain.

#### Update request for metadata

Update the request for metadata to allow access to the IPFS hash through your Infura endpoint. In the `getNFTMetadata` function defined in [step 5](retrieve-and-display-erc-721-and-erc-1155-tokens.md#5-request-the-metadata), add the following:

```javascript
const ipfsURL = addIPFSProxy(result)

const response = await fetch(ipfsURL)
const metadata = await response.json()
console.log(metadata) // Metadata in JSON

const image = addIPFSProxy(metadata.image)
```

Also add this line to the top of the file:

```JavaScript
const fetch = require("node-fetch");
```

This returns the IPFS hash combined with our Infura endpoint, you can directly access in your browser to view the NFT.

### 7. Run the script

Run the script using the following command:

```bash
node retrieveBalance.js
```

### Complete code overview

Note some ERC-721 contracts return a regular HTTP URL, while some ERC-1155 contracts return an IPFS hash. You can add the IPFS code from [step 6](retrieve-and-display-erc-721-and-erc-1155-tokens.md#6-display-the-token) to an ERC-1155 contract that returns an IPFS hash.

<Tabs>
  <TabItem value="ERC-721 with IPFS" label="ERC-721 with IPFS" default>

```js
const fetch = require("node-fetch")
const { Web3 } = require("web3")

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/<YOUR_API_KEY>")
)

const tokenURIABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]

const tokenContract = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d" // BAYC contract address
const tokenId = 101 // A token we'd like to retrieve its metadata of

const contract = new web3.eth.Contract(tokenURIABI, tokenContract)

async function getNFTMetadata() {
  const result = await contract.methods.tokenURI(tokenId).call()

  console.log(result) // ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/101

  const ipfsURL = addIPFSProxy(result)

  const response = await fetch(ipfsURL)
  const metadata = await response.json()
  console.log(metadata) // Metadata in JSON

  const image = addIPFSProxy(metadata.image)
}

getNFTMetadata()

function addIPFSProxy(ipfsHash) {
  const URL = "https://<YOUR_SUBDOMAIN>.infura-ipfs.io/ipfs/"
  const hash = ipfsHash.replace(/^ipfs?:\/\//, "")
  const ipfsURL = URL + hash

  console.log(ipfsURL) // https://<subdomain>.infura-ipfs.io/ipfs/<ipfsHash>
  return ipfsURL
}
```

  </TabItem>
  <TabItem value="ERC-1155 without IPFS" label="ERC-1155 without IPFS" >

```javascript
const { Web3 } = require("web3")

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/<YOUR_API_KEY>")
)

const uriABI = [
  {
    constant: true,
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
]

const tokenContract = "0x76be3b62873462d2142405439777e971754e8e77" // Parallel contract address
const tokenId = 10570 // A token we'd like to retrieve its metadata of

const contract = new web3.eth.Contract(uriABI, tokenContract)

async function getNFTMetadata() {
  const result = await contract.methods.uri(tokenId).call()

  console.log(result) // https://nftdata.parallelnft.com/api/parallel-alpha/ipfs/QmSwnqTmpwvZH51Uv47opPUxGYx2nknYmGoKoRJQRMDcLL
}

getNFTMetadata()
```

  </TabItem>
</Tabs>
