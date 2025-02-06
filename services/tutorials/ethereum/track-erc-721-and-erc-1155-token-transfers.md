---
description: Track ERC-721 and ERC-1155 token transfers.
sidebar_position: 10
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Track ERC-721 and ERC-1155 token transfers

In this tutorial, you'll track ERC-721 and ERC-1155 token transfers and mints from a specific address using the Web3 JavaScript library.

## Prerequisites

- An [Ethereum project](../../get-started/infura.md) on Infura
- [Node.js installed](https://nodejs.org/en/download/)

## Steps

### 1. Create a project directory

Create a new directory for your project. This can be done from the command line:

```javascript
mkdir trackERC721
```

Change into the new directory:

```javascript
cd trackERC721
```

### 2. Install required packages

Install the `web3` package in the project directory:

```javascript
npm install web3
```

:::info

This example has been written for web3js v4.x. It may not work for earlier versions.

:::

### 3. Set up the script

Create a file called `trackERC721.js`. At the top of file, add the following lines to import the web3.js library and connect to the Infura WebSocket endpoint:

```javascript
const { Web3 } = require("web3");

async function main(){
  const web3 = new Web3("wss://mainnet.infura.io/ws/v3/<YOUR-API-KEY>");
  ...
}
main();
```

Make sure to replace `<YOUR-API-KEY>` with your Infura API key.

### 4. Subscribe to contract events

You can subscribe to the events that token contracts emit, allowing you to track every new token transfer as it occurs.

Add the following filter to the script, which tells the `web3.eth.subscribe` function in web3.js which events to track:

```javascript
let options721 = {
  topics: [web3.utils.sha3("Transfer(address,address,uint256)")],
}

let options1155 = {
  topics: [
    web3.utils.sha3("TransferSingle(address,address,address,uint256,uint256)"),
  ],
}
```

Then, initiate the subscription by passing along the filter:

```javascript
let subscription721 = await web3.eth.subscribe("logs", options721)
let subscription1155 = await web3.eth.subscribe("logs", options1155)
```

:::info

In [step 3](#3-set-up-the-script), you wrap the whole script in an async function `main()`, because top level await is not allowed except in recent JavaScript versions.

:::

You can also add the following lines to the script to see whether the subscription started successfully or if any errors occurred:

```javascript
subscription721.on("error", (err) => {
  throw err
})
subscription1155.on("error", (err) => {
  throw err
})

subscription721.on("connected", (nr) =>
  console.log("Subscription on ERC-721 started with ID %s", nr)
)
subscription1155.on("connected", (nr) =>
  console.log("Subscription on ERC-1155 started with ID %s", nr)
)
```

### 5. Read ERC-721 transfers

Set the listener for the `subscription721` created in [step 4](#4-subscribe-to-contract-events) by adding the following lines to the script:

```javascript
subscription721.on("data", (event) => {
  if (event.topics.length == 4) {
    // ...
  }
});
```

:::info

To verify that the `Transfer` event you catch is an ERC-721 transfer, these lines check to see whether the length of the `topics` array equals 4. This is because ERC-20 events also emit a `Transfer` event but contain three items instead.

:::

Because you can't read the event topics on their own, you must decode them using the ERC-721 ABI. Edit the listener as follows:

```javascript
let transaction = web3.eth.abi.decodeLog(
  [
    {
      type: "address",
      name: "from",
      indexed: true,
    },
    {
      type: "address",
      name: "to",
      indexed: true,
    },
    {
      type: "uint256",
      name: "tokenId",
      indexed: true,
    },
  ],
  event.data,
  [event.topics[1], event.topics[2], event.topics[3]]
)
```

In order to directly call `from`, `to`, and `tokenId` on `transaction`, add the following:

```javascript
console.log(
  `\n` +
    `New ERC-721 transaction found in block ${event.blockNumber} with hash ${event.transactionHash}\n` +
    `From: ${
      transaction.from === "0x0000000000000000000000000000000000000000"
        ? "New mint!"
        : transaction.from
    }\n` +
    `To: ${transaction.to}\n` +
    `Token contract: ${event.address}\n` +
    `Token ID: ${transaction.tokenId}`
)
```

### 6. Read ERC-1155 transfers

You can set the listener for the `subscription1155` created in [step 4](#4-subscribe-to-contract-events) by adding the following lines to the script:

```javascript
subscription1155.on("data", event => {
  // ...
})
```

As with ERC-721 in [Step 5](#5-read-erc-721-transfers), add the ERC-1155 ABI to the listener:

```javascript
let transaction = web3.eth.abi.decodeLog(
  [
    {
      type: "address",
      name: "operator",
      indexed: true,
    },
    {
      type: "address",
      name: "from",
      indexed: true,
    },
    {
      type: "address",
      name: "to",
      indexed: true,
    },
    {
      type: "uint256",
      name: "id",
    },
    {
      type: "uint256",
      name: "value",
    },
  ],
  event.data,
  [event.topics[1], event.topics[2], event.topics[3]]
)
```

In order to directly call `from`, `to`, and `tokenId` on `transaction`, add the following:

```javascript
console.log(
  `\n` +
    `New ERC-1155 transaction found in block ${event.blockNumber} with hash ${event.transactionHash}\n` +
    `Operator: ${transaction.operator}\n` +
    `From: ${
      transaction.from === "0x0000000000000000000000000000000000000000"
        ? "New mint!"
        : transaction.from
    }\n` +
    `To: ${transaction.to}\n` +
    `id: ${transaction.id}\n` +
    `value: ${transaction.value}`
)
```

### 7. Track a specific address

You can track a specific sender address by reading the `from` value of the decoded `transaction` object. For each of the listeners, add the following line, replacing `<SENDER_ADDRESS>` with the Ethereum address to track:

```javascript
if (transaction.from == "<SENDER_ADDRESS>") {
  console.log("Specified address sent an NFT!")
}
```

You can also track a specific recipient address receiving any tokens by tracking the `transaction.to` value:

```javascript
if (transaction.to == "<RECIPIENT_ADDRESS>") {
  console.log("Specified address received an NFT")
}
```

### 8. Track a specific token

You can track a specific address sending a specific token, by checking for both `event.address` and `transaction.tokenID`. For each of the listeners, add the following line, replacing `<CONTRACT_ADDRESS>` with the smart contract address to track and `<TOKEN_ID>` with specific transaction token ID:

<Tabs>
  <TabItem value="ERC-721" label="ERC-721" default>

```javascript
if (event.address == "<CONTRACT_ADDRESS>" && transaction.tokenId == <TOKEN_ID>) { console.log("Specified ERC-721 NFT was transferred!"); }
```

  </TabItem>
  <TabItem value="ERC-1155" label="ERC-1155" >

```javascript
if (event.address == "<CONTRACT_ADDRESS>") {
  console.log("Specified ERC-1155 NFT was transferred!")
}
```

  </TabItem>
</Tabs>

### 9. Run the script

Run the script using the following command:

<Tabs>
  <TabItem value="Command" label="Command" default>

```javascript
node trackERC721.js
```

  </TabItem>
  <TabItem value="Example ERC-721 output" label="Example ERC-721 output" >

```javascript
New ERC-721 transaction found in block 15102209 with hash 0x3b133c1ad2d138bee9a596d94da25892e12a2c95efd1f0916d6708a9b86745b0
From: 0xDd3c42eb2660c0C7745E48f25864ff743Fef9f33
To: 0x4c5Ca726584d9b171AE9D6ce67Ab8AFb706259CB
Token contract: 0x35f3b8f37e9341F289398b70Fa2c576Dd102DF75
Token ID: 950
```

  </TabItem>
  <TabItem value="Example ERC-1155 output" label="Example ERC-1155 output" >

```javascript
New ERC-1155 transaction found in block 15102209 with hash 0xa08afd7696ec7424f8b403ca3733ebbb916faf68442757e2e9349c2d1b90aa9a
Operator: 0x20251a0505Ead51fb2C6ce5c1f399924ea068322
From: New mint!
To: 0x20251a0505Ead51fb2C6ce5c1f399924ea068322
id: 2
value: 1
```

  </TabItem>
</Tabs>

### Complete code overview

```javascript
const { Web3 } = require("web3")

async function main() {
  const web3 = new Web3("wss://mainnet.infura.io/ws/v3/<YOUR-API-KEY>")

  let options721 = {
    topics: [web3.utils.sha3("Transfer(address,address,uint256)")],
  }

  let options1155 = {
    topics: [
      web3.utils.sha3(
        "TransferSingle(address,address,address,uint256,uint256)"
      ),
    ],
  }

  let subscription721 = await web3.eth.subscribe("logs", options721)
  let subscription1155 = await web3.eth.subscribe("logs", options1155)

  subscription721.on("data", (event) => {
    if (event.topics.length == 4) {
      let transaction = web3.eth.abi.decodeLog(
        [
          {
            type: "address",
            name: "from",
            indexed: true,
          },
          {
            type: "address",
            name: "to",
            indexed: true,
          },
          {
            type: "uint256",
            name: "tokenId",
            indexed: true,
          },
        ],
        event.data,
        [event.topics[1], event.topics[2], event.topics[3]]
      )

      if (transaction.from == "0x495f947276749ce646f68ac8c248420045cb7b5e") {
        console.log("Specified address sent an NFT!")
      }
      if (transaction.to == "0x495f947276749ce646f68ac8c248420045cb7b5e") {
        console.log("Specified address received an NFT!")
      }
      if (
        event.address == "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" &&
        transaction.tokenId == 2500
      ) {
        console.log("Specified NFT was transferred!")
      }

      console.log(
        `\n` +
          `New ERC-712 transaction found in block ${event.blockNumber} with hash ${event.transactionHash}\n` +
          `From: ${
            transaction.from === "0x0000000000000000000000000000000000000000"
              ? "New mint!"
              : transaction.from
          }\n` +
          `To: ${transaction.to}\n` +
          `Token contract: ${event.address}\n` +
          `Token ID: ${transaction.tokenId}`
      )
    }
  })

  subscription1155.on("data", (event) => {
    let transaction = web3.eth.abi.decodeLog(
      [
        {
          type: "address",
          name: "operator",
          indexed: true,
        },
        {
          type: "address",
          name: "from",
          indexed: true,
        },
        {
          type: "address",
          name: "to",
          indexed: true,
        },
        {
          type: "uint256",
          name: "id",
        },
        {
          type: "uint256",
          name: "value",
        },
      ],
      event.data,
      [event.topics[1], event.topics[2], event.topics[3]]
    )

    console.log(
      `\n` +
        `New ERC-1155 transaction found in block ${event.blockNumber} with hash ${event.transactionHash}\n` +
        `Operator: ${transaction.operator}\n` +
        `From: ${
          transaction.from === "0x0000000000000000000000000000000000000000"
            ? "New mint!"
            : transaction.from
        }\n` +
        `To: ${transaction.to}\n` +
        `id: ${transaction.id}\n` +
        `value: ${transaction.value}`
    )
  })

  subscription721.on("error", (err) => {
    throw err
  })
  subscription1155.on("error", (err) => {
    throw err
  })

  subscription721.on("connected", (nr) =>
    console.log("Subscription on ERC-721 started with ID %s", nr)
  )
  subscription1155.on("connected", (nr) =>
    console.log("Subscription on ERC-1155 started with ID %s", nr)
  )
}

main()
```
