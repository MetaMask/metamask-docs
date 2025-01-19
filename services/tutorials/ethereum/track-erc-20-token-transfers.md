---
description: Track ERC-20 token transfers.
sidebar_position: 9
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Track ERC-20 token transfers

In this tutorial, you'll track [ERC-20 token](../../how-to/interact-with-erc-20-tokens.md) transfers from a specific address using the Web3 JavaScript library.

## Prerequisites

- An [Ethereum project](../../get-started/infura.md) on Infura
- [Node.js installed](https://nodejs.org/en/download/)

## Steps

### 1. Create a project directory

Create a new directory for your project. This can be done from the command line:

```bash
mkdir trackERC20
```

Change into the new directory:

```bash
cd trackERC20
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

Create a file called `trackERC20.js`. At the top of file, add the following lines to import the web3.js library and connect to the Infura WebSocket endpoint:

```javascript
const { Web3 } = require("web3");

async function main(){
  const web3 = new Web3("wss://mainnet.infura.io/ws/v3/<YOUR-API-KEY>");
  ...
}
main();
```

Make sure to replace `<YOUR-API-KEY>` with your Infura API key.

### 4. Set the ABI

Define the ERC-20 ABI by adding the following to the script:

```json
const abi = [
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
```

### 5. Subscribe to contract events

You can subscribe to the events that token contracts emit, allowing you to track every new token transfer as it occurs.

Add the following filter to the script, which tells the `web3.eth.subscribe` function in web3.js which events to track:

```javascript
let options = {
  topics: [web3.utils.sha3("Transfer(address,address,uint256)")],
}
```

Then, initiate the subscription by passing along the filter:

```javascript
let subscription = await web3.eth.subscribe("logs", options)
```

:::info

In [step 3](#3-set-up-the-script), you wrap the whole script in an async function `main()`, because top level await is not allowed except in recent JavaScript versions.

:::

You can also add the following lines to the script to see whether the subscription started successfully or if any errors occurred:

```javascript
subscription.on("error", (err) => {
  throw err
})
subscription.on("connected", (nr) =>
  console.log("Subscription on ERC-20 started with ID %s", nr)
)
```

### 6. Read ERC-20 transfers

You can set the listener for the `subscription` created in [step 5](track-erc-20-token-transfers.md#5-subscribe-to-contract-events) by adding the following lines to the script:

```javascript
subscription.on("data", (event) => {
  if (event.topics.length == 3) {
    // ...
  }
});
```

:::info

To verify that the `Transfer` event you catch is an ERC-20 transfer, these lines check to see whether the length of the `topics` array equals 3. This is because ERC-721 events also emit a `Transfer` event but contain four items instead.

:::

Because you can't read the event topics on their own, you must decode them using the ERC-20 ABI. Edit the listener as follows:

```javascript
subscription.on("data", (event) => {
  if (event.topics.length == 3) {
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
          name: "value",
          indexed: false,
        },
      ],
      event.data,
      [event.topics[0], event.topics[1], event.topics[2]],
    );
  }
});
```

You can now retrieve the sender address (`from`), receiving address (`to`), and the number of tokens transferred (`value`, though yet to be converted, see [step 7](track-erc-20-token-transfers.md#7-read-contract-data)) from the `transaction` object.

### 7. Read contract data

Even though you retrieve a `value` from the contract, this isn't the actual number of tokens transferred. ERC-20 tokens contain a `decimal` value, which indicates the number of decimals a token should have. You can directly call the `decimals` method of the smart contract to retrieve the decimal value, after which you can calculate the correct number of tokens sent.

:::note
It is optional for ERC-20 contracts to implement these methods (see [EIP-20: ERC-20 Token Standard](https://eips.ethereum.org/EIPS/eip-20#methods)), so you check for errors and fall back to default values.
:::

Outside the `subscription.on()` listener created in [step 6](track-erc-20-token-transfers.md#6-read-erc-20-transfers), define a new method that allows you to collect more information from the smart contract:

```javascript
async function collectData(contract) {
  try {
    var decimals = await contract.methods.decimals().call()
  } catch {
    decimals = 18n
  }
  try {
    var symbol = await contract.methods.symbol().call()
  } catch {
    symbol = "???"
  }
  return { decimals, symbol }
}
```

:::info

Since you’re already requesting the `decimals` value from the contract, you can also request the `symbol` value to display the ticker of the token.

:::

Inside the listener, call the `collectData` function every time a new ERC-20 transaction is found. You can also calculate the correct decimal value:

```javascript
subscription.on("data", (event) => {
  if (event.topics.length == 3) {
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
          name: "value",
          indexed: false,
        },
      ],
      event.data,
      [event.topics[0], event.topics[1], event.topics[2]],
    );

    const contract = new web3.eth.Contract(abi, event.address);
    collectData(contract).then((contractData) => {
      var unit = Object.keys(web3.utils.ethUnitMap).find(
        (key) => web3.utils.ethUnitMap[key] == (BigInt(10) ** contractData.decimals)
      );
      if (!unit) {
        // Simplification for contracts that use "non-standard" units, e.g. REDDIT contract returns decimals==8
        unit = "wei";
      }
      const value = web3.utils.fromWei(transaction.value, unit);
      console.log(
        `Transfer of ${value + " ".repeat(Math.max(0, 30 - value.length))} ${
          contractData.symbol + " ".repeat(Math.max(0, 10 - contractData.symbol.length))
        } from ${transaction.from} to ${transaction.to}`
      );
    });
  }
});
```

### 8. Track a specific address

You can track a specific sender address by reading the `from` value of the decoded `transaction` object. Add the following line to the listener created in [step 6](track-erc-20-token-transfers.md#6-read-erc-20-transfers), replacing `<SENDER_ADDRESS>` with the Ethereum address to track:

```javascript
if (transaction.from == "<SENDER_ADDRESS>") {
  console.log("Specified address sent an ERC-20 token!")
}
```

You can also track a specific recipient address receiving any tokens by tracking the `transaction.to` value:

```javascript
if (transaction.to == "<RECEIVING_ADDRESS>") {
  console.log("Specified address received an ERC-20 token!")
}
```

### 9. Track a specific token

You can track a specific address sending a specific ERC-20 token, by checking for both `transaction.from` (the token sender) and `event.address` (the ERC-20 smart contract). Add the following line to the listener created in [step 6](track-erc-20-token-transfers.md#6-read-erc-20-transfers), replacing `<SENDER_ADDRESS>` with the Ethereum address to track, and `<CONTRACT_ADDRESS>` with the smart contract address to track:

```javascript
if (
  transaction.from == "<SENDER_ADDRESS>" &&
  event.address == "<CONTRACT_ADDRESS>"
) {
  console.log("Specified address transferred specified token!")
}
```

You can also track any transactions for a specific ERC-20 token, regardless of the sender or recipient:

```javascript
if (event.address == "<CONTRACT_ADDRESS>") {
  console.log("Specified ERC-20 transfer!")
}
```

### 10. Run the script

Run the script using the following command:

<Tabs>
  <TabItem value="Command" label="Command" default>

```bash
node trackERC20.js
```

  </TabItem>
  <TabItem value="Example output" label="Example output" >

```bash
Transfer of 9417.663694821564607555        RIO        from 0x6b75d8AF000000e20B7a7DDf000Ba900b4009A80 to 0x5b7E3E37a1aa6369386e5939053779abd3597508
Transfer of 1.554276118336708787           WETH       from 0x60594a405d53811d3BC4766596EFD80fd545A270 to 0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD
Transfer of 2685                           DAI        from 0x008CE5dcC3d66e6FD7D657Ea81B54d1afFFAba4b to 0x60594a405d53811d3BC4766596EFD80fd545A270
Specified ERC-20 transfer!
Transfer of 9964.083347473883463154        RIO        from 0x5b7E3E37a1aa6369386e5939053779abd3597508 to 0x008CE5dcC3d66e6FD7D657Ea81B54d1afFFAba4b
```

  </TabItem>
</Tabs>

### Complete code overview

```javascript
const { Web3 } = require("web3")

async function main() {
  const web3 = new Web3("wss://mainnet.infura.io/ws/v3/<YOUR-API-KEY>")

  let options = {
    topics: [web3.utils.sha3("Transfer(address,address,uint256)")],
  }

  const abi = [
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
    {
      constant: true,
      inputs: [],
      name: "decimals",
      outputs: [
        {
          name: "",
          type: "uint8",
        },
      ],
      payable: false,
      stateMutability: "view",
      type: "function",
    },
  ]

  let subscription = await web3.eth.subscribe("logs", options)

  async function collectData(contract) {
    try {
      var decimals = await contract.methods.decimals().call()
    } catch {
      decimals = 18n
    }
    try {
      var symbol = await contract.methods.symbol().call()
    } catch {
      symbol = "???"
    }
    return { decimals, symbol }
  }

  subscription.on("data", (event) => {
    if (event.topics.length == 3) {
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
            name: "value",
            indexed: false,
          },
        ],
        event.data,
        [event.topics[0], event.topics[1], event.topics[2]]
      )

      const contract = new web3.eth.Contract(abi, event.address)
      collectData(contract).then((contractData) => {
        var unit = Object.keys(web3.utils.ethUnitMap).find(
          (key) =>
            web3.utils.ethUnitMap[key] == BigInt(10) ** contractData.decimals
        )
        if (!unit) {
          // Simplification for contracts that use "non-standard" units, e.g. REDDIT contract returns decimals==8
          unit = "wei"
        }
        // This is logging each transfer event found:
        const value = web3.utils.fromWei(transaction.value, unit)
        console.log(
          `Transfer of ${value + " ".repeat(Math.max(0, 30 - value.length))} ${
            contractData.symbol +
            " ".repeat(Math.max(0, 10 - contractData.symbol.length))
          } from ${transaction.from} to ${transaction.to}`
        )

        // Below are examples of testing for transactions involving particular EOA or contract addresses
        if (transaction.from == "0x495f947276749ce646f68ac8c248420045cb7b5e") {
          console.log("Specified address sent an ERC-20 token!")
        }
        if (transaction.to == "0x495f947276749ce646f68ac8c248420045cb7b5e") {
          console.log("Specified address received an ERC-20 token!")
        }
        if (
          transaction.from == "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D" &&
          event.address == "0x6b175474e89094c44da98b954eedeac495271d0f"
        ) {
          console.log("Specified address transferred specified token!")
        } // event.address contains the contract address
        if (event.address == "0x6b175474e89094c44da98b954eedeac495271d0f") {
          console.log("Specified ERC-20 transfer!")
        }
      })
    }
  })

  subscription.on("error", (err) => {
    throw err
  })
  subscription.on("connected", (nr) =>
    console.log("Subscription on ERC-20 started with ID %s", nr)
  )
}
main()
```
