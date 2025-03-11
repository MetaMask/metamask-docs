---
description: Send a transaction using Viem.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Use Viem

In this tutorial, you'll send a transaction of 0.001 ETH from one account to another using the [Viem](https://viem.sh/)
TypeScript library.

Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Install TypeScript](https://www.typescriptlang.org/download/)
- [Install `ts-node`](https://www.npmjs.com/package/ts-node)
- An Ethereum account

:::info
Use [MetaMask](https://metamask.io/) or similar to create an Ethereum account for testing.
:::

## Steps

### 1. Select your network and verify funds

- **Sepolia** -  To use the Sepolia testnet, ensure that your account has Sepolia ETH.
    You can use the [MetaMask faucet](/developer-tools/faucet) to add more funds.
- **Alternative network** - To use an alternative network, ensure that your account has testnet ETH
    for that network.

    :::note
    When using an alternative network, update the chain name in the script (in Step 5) with the
    alternative network name from the [Viem supported chains list](https://github.com/wevm/viem/blob/main/src/chains/index.ts).
    :::

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

Install the `viem` package in the project directory.

```bash
npm i viem
```

### 4. Create a `config.ts` file

Create a `config.ts` file in your project directory to store the private key of the sending account:

<Tabs>
  <TabItem value="Syntax" label="Syntax" default>

```tsx title="config.ts"
import { privateKeyToAccount } from 'viem/accounts'
export const account = privateKeyToAccount('<PRIVATE-KEY>')
```
  </TabItem>
  <TabItem value="Example" label="Example" default>

```tsx title="config.ts"
import { privateKeyToAccount } from 'viem/accounts'
export const account = privateKeyToAccount('0x561...x...61df')
```

  </TabItem>
</Tabs>

In the `config.ts` file, replace `<PRIVATE-KEY>` with the [private key of your Ethereum account](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/).
A transaction must be signed with the sender's private key. Make sure that you prefix the private key
value with `0x`. The private key you export from MetaMask isn't prefixed with `0x`.

:::danger
Never disclose your private key. Anyone with your private keys can steal the assets controlled by those keys.
:::

### 5. Create a `sendTransaction.ts` file

In the project directory, create a `sendTransaction.ts` file, which configures and sends the transaction. For example:

```tsx
import { http, createWalletClient, parseEther } from 'viem'
import { sepolia } from 'viem/chains'
import { account } from './config'

//create a wallet client to interact with Ethereum accounts
const walletClient = createWalletClient({
    chain: sepolia,
    transport: http("https://sepolia.infura.io/v3/API-KEY")
  })

 async function sendTx () {
//create and send the transaction object
    const hash = await walletClient.sendTransaction({
        account,
        to: '0xc2CB3fb3924b8DE3A63C1da570a8dBaf2a533eA7',
        value : parseEther ('0.001')
        })

    console.log("Mining transcation... ")
    console.log(`Tx mined in https://sepolia.etherscan.io/tx/${hash}`)
  }

sendTx()
```

In the `sendTransaction.ts` file:

- Replace `API-KEY` with your Infura API key.
- Update the `to` account in the code if you wish to send test ETH to an account of your choice.

### 6. Execute the transaction

To execute the transaction, run:

```bash
ts-node sendTransaction.ts
```

:::note
`ts-node` is a TypeScript execution engine for Node.js. It allows you to run TypeScript files without
needing to manually compile them into JavaScript first.
:::

An alternative way to execute your transaction using node.js is to compile your `sendTransaction.ts`  file to JavaScript
first, and then run the compiled JavaScript file:

```jsx
tsc sendTransaction.ts
node sendTransaction.js
```

Running the typescript file, `sendTransaction.ts`, directly from your code development environment, like
Visual Studio Code, works equally well, without the need to use `ts-node` or pre-compiling first to JavaScript.
Example output:

`Mining transcation...
Tx mined https://sepolia.etherscan.io/tx/0x310588719e733118f50c0a1608e13b4e8bd5eb5891d546d89795c2041833abb6`

You can search for the transaction on a block explorer such as [Sepolia Etherscan](https://sepolia.etherscan.io/).

### 7. (Optional) Fine tune the transaction details

Viem automatically determines the gas limit and fees. If you want to change the default values, update
the `sendTransaction` method to include an `estimateGas` result (`gasLimit`) and the `maxFeePerGas` and
`maxPriorityFeePerGas` parameters.

To do this you will also need to declare an `httpClient` to interface with JSON-RPC methods like `eth_estimateGas`.

Full code overview below:

```tsx
import { http, createWalletClient, createPublicClient, parseEther, parseGwei } from 'viem'
import { sepolia } from 'viem/chains'
import { account } from './config'

//create a wallet client to interact with Ethereum accounts
const walletClient = createWalletClient({
    chain: sepolia,
    transport: http("https://sepolia.infura.io/v3/API-KEY")
  })

//create a public client to interact with JSON-RPC API methods
const httpClient = createPublicClient({
    chain: sepolia,
    transport: http("https://sepolia.infura.io/v3/API-KEY"),
  })

 async function sendTx () {
//estimate gas limit
    const limit = await httpClient.estimateGas({
      account,
      to: '0xc2CB3fb3924b8DE3A63C1da570a8dBaf2a533eA7',
      value: parseEther('0.001')
    })

//create and send the transaction object
    const hash = await walletClient.sendTransaction({
        account,
        to: '0xc2CB3fb3924b8DE3A63C1da570a8dBaf2a533eA7',
        value : parseEther ('0.001'),
        maxFeePerGas: parseGwei('20'),
        maxPriorityFeePerGas: parseGwei ('2'),
        gas: limit,
        })

    console.log("Mining transcation... ")
    console.log(`Tx: https://sepolia.etherscan.io/tx/${hash}`)

  }

sendTx()

```