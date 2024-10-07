---
description: Create a simple dapp using `get-starknet` and React TypeScript.
sidebar_position: 6
---

# Create a simple Starknet dapp

In this tutorial, you'll learn how to set up a React TypeScript dapp that uses the [`get-starknet`](https://github.com/starknet-io/get-starknet) library to connect to MetaMask and display the user's wallet address.
You'll also display the balance of an ERC-20 token and perform a token transfer.

## Prerequisites

- [MetaMask installed](https://metamask.io/download/)
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 20.11 or later
- [Yarn](https://yarnpkg.com/)

## 1. Set up the project

Use [Create React App](https://create-react-app.dev/) to set up a new React project with TypeScript.
Create a new project named `get-starknet-tutorial`:

```bash
yarn create react-app get-starknet-tutorial --template typescript
```
    
Change into the project directory:
 
```bash
cd get-starknet-tutorial
```

## 2. Add `get-starknet` and `starknet.js`

Add [`get-starknet`](https://github.com/starknet-io/get-starknet) version `3.3.0` and `starknet.js`
version `6.11.0` to your project's dependencies:

```bash
yarn add get-starknet@3.3.0 starknet@6.11.0
```

Your file structure should look similar to the following:

```text
get-starknet-tutorial/
├── public/
│   └── index.html
└── src/
    ├── components/
    │   ├── WalletConnect.tsx
    ├── App.tsx
    ├── index.tsx
    └── App.css
```

## 2. Configure the wallet connection

### 2.1. Connect to MetaMask

The `connect` function from `get-starknet` is the primary way to connect your dapp to a user's MetaMask wallet. 
It opens a connection to MetaMask and returns an object containing important details about the wallet, including:

- `name`: The name of the wallet.
- `icon`: The wallet's icon, which displays the wallet's logo.
- `account`: The account object from `starknet.js`, which contains the wallet's address and provides access to account-specific operations.

To import the necessary functions and connect to a wallet, add the following code to `src/App.tsx`:

```typescript title="App.tsx"
import { connect, type ConnectOptions } from "get-starknet";

async function handleConnect(options?: ConnectOptions) {
  const res = await connect(options);
  // Access wallet details such as name, address, and icon
  console.log(res?.name, res?.account?.address, res?.icon);
}
```

### 2.2. Configure connection options

`connect` accepts an optional `ConnectOptions` object. 
This object can control the connection process, including:

- `modalMode`: Determines how the connection modal behaves. The options are:
  - `"alwaysAsk"`: Prompts the user every time a connection is initiated.
  - `"neverAsk"`: Attempts to connect without showing the modal.
- `modalTheme`: Sets the visual theme of the connection modal. The options are `"dark"` and `"light"`.

You can configure these options as follows:

```typescript
handleConnect({ modalMode: "alwaysAsk", modalTheme: "dark" });
```

### 2.3. Create an `AccountInterface`

After connecting to MetaMask, create a new `AccountInterface` instance using the `starknet.js` library.
This allows interaction with the Starknet network using the connected wallet.

```typescript title="App.tsx"
import { AccountInterface } from "starknet"; 

async function handleConnect(options?: ConnectOptions) {
  const res = await connect(options);
  const myFrontendProviderUrl = "https://free-rpc.nethermind.io/sepolia-juno/v0_7";
  const newAccountInterface = new AccountInterface({ nodeUrl: myFrontendProviderUrl }, res);
}
```

### 2.4. Display wallet information

You can display the wallet's name, address, and icon in your dapp. 
This provides visual feedback to the user, confirming which wallet they are using.

The following code is an example of how to update the interface with the connected wallet's details:

```typescript title="App.tsx"
import { useState } from "react";

function App() {
  const [walletName, setWalletName] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletIcon, setWalletIcon] = useState("");

  async function handleConnect(options?: ConnectOptions) {
    const res = await connect(options);
    setWalletName(res?.name || "");
    setWalletAddress(res?.account?.address || "");
    setWalletIcon(res?.icon || "");
  }

  return (
    <div>
      <h2>Selected Wallet: {walletName}</h2>
      <p>Address: {walletAddress}</p>
      <img src={walletIcon} alt="Wallet icon" />
    </div>
  );
}
```

### 2.5. Full example

The following is a full example of configuring the wallet connection:

```typescript title="App.tsx"
import "./App.css"
import {
  type ConnectOptions,
  type DisconnectOptions,
  connect,
  disconnect,
} from "get-starknet"
import { AccountInterface } from "starknet";
import { useState } from "react"

function App() {
  const [walletName, setWalletName] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [walletIcon, setWalletIcon] = useState("")
  const [AccountInterface, setAccountInterface] = useState<AccountInterface | null>(null)

  async function handleConnect(options?: ConnectOptions) {
    const res = await connect(options)
    setWalletName(res?.name || "")
    setWalletAddress(res?.account?.address || "")
    setWalletIcon(res?.icon || "")
    if (res) {
      const myFrontendProviderUrl = "https://free-rpc.nethermind.io/sepolia-juno/v0_7";
      const newAccountInterface = new AccountInterface({ nodeUrl: myFrontendProviderUrl }, res)
      setAccountInterface(newAccountInterface)
    }
  }

  async function handleDisconnect(options?: DisconnectOptions) {
    await disconnect(options)
    setWalletName("")
    setWalletAddress("")
    setAccountInterface(null)
  }

  return (
    <div className="App">
      <h1>get-starknet</h1>
      <div className="card">
        <button onClick={() => handleConnect()}>Default</button>
        <button onClick={() => handleConnect({ modalMode: "alwaysAsk" })}>
          Always ask
        </button>
        <button onClick={() => handleConnect({ modalMode: "neverAsk" })}>
          Never ask
        </button>
        <button
          onClick={() =>
            handleConnect({
              modalMode: "alwaysAsk",
              modalTheme: "dark",
            })
          }
        >
          Always ask with dark theme
        </button>
        <button
          onClick={() =>
            handleConnect({
              modalMode: "alwaysAsk",
              modalTheme: "light",
            })
          }
        >
          Always ask with light theme
        </button>
        <button onClick={() => handleDisconnect()}>Disconnect</button>
        <button onClick={() => handleDisconnect({ clearLastWallet: true })}>
          Disconnect and reset
        </button>
      </div>
      {walletName && (
        <div>
          <h2>
            Selected Wallet: <pre>{walletName}</pre>
            <img src={walletIcon} alt="Wallet icon"/>
          </h2>
          <ul>
            <li>Wallet address: <pre>{walletAddress}</pre></li>
          </ul>
        </div>
      )}
    </div>
  )
};

export default App
```

## 3. Display the balance of and transfer an ERC-20 token

Now that you have set up the basic interaction, you can display the balance of a specific ERC-20 token, such as STRK, and perform a transfer using the `AccountInterface` instance.

### 3.1. Set up the contract

To interact with an ERC-20 contract, create a contract instance from the `starknet.js` library using the `AccountInterface` instance.
The following example assumes the ABI (application binary interface) is loaded from a JSON file:

```typescript
import { Contract } from "starknet";
import erc20Abi from "./erc20Abi.json";

const tokenAddress = "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7";

const erc20 = new Contract(erc20Abi, tokenAddress, AccountInterface);
```

:::note ABI and contract address
You can find the ABI of the ERC-20 contract on [Voyager](https://voyager.online/).

The contract address for STRK (an ERC-20 token) on Sepolia testnet is `0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7`.
:::

### 3.2. Fetch the token balance

Call the `balanceOf` method to fetch the balance of the connected account:

```typescript
const balance = await erc20.balanceOf(walletAddress);
const formattedBalance = balance / Math.pow(10, 18);
```

### 3.3. Transfer tokens

To transfer tokens, fill out the `transfer` method call and execute the transaction using the `AccountInterface`.
For example:

```typescript
import { Call } from "starknet";

// Define the transfer parameters.
const recipientAddress = "0x78662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1";
const amountToTransfer = 1n * 10n ** 18n; // 1 token (assuming 18 decimals).

const transferCall: Call = erc20.populate("transfer", {
  recipient: recipientAddress,
  amount: amountToTransfer,
});

// Execute the transfer.
const { transaction_hash: transferTxHash } = await AccountInterface.execute(transferCall);

// Wait for the transaction to be accepted on Starknet.
await AccountInterface.waitForTransaction(transferTxHash);
```

### 3.4. Full example

The following a full example of displaying the balance of an ERC-20 token and performing a transfer:

```typescript
import { useEffect, useState } from "react";
import { Contract } from "starknet";
import erc20Abi from "./erc20Abi.json";

function TokenBalanceAndTransfer({ AccountInterface, tokenAddress }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (AccountInterface) {
      const erc20 = new Contract(erc20Abi, tokenAddress, AccountInterface);
      // Fetch balance
      erc20.balanceOf(AccountInterface.address)
        .then((result) => {
          const formattedBalance = result / Math.pow(10, 18); // Adjust for decimals
          setBalance(formattedBalance);
        })
        .catch(console.error);
    }
  }, [AccountInterface, tokenAddress]);

  async function handleTransfer() {
    if (AccountInterface) {
      const erc20 = new Contract(erc20Abi, tokenAddress, AccountInterface);
      const recipientAddress = "0x78662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1";
      const amountToTransfer = 1n * 10n ** 18n; // 1 token

      // Fill out and execute transfer
      const transferCall: Call = erc20.populate("transfer", {
        recipient: recipientAddress,
        amount: amountToTransfer,
      });
      const { transaction_hash: transferTxHash } = await AccountInterface.execute(transferCall);

      // Wait for the transaction to be accepted
      await AccountInterface.provider.waitForTransaction(transferTxHash);

      // Refresh balance
      const newBalance = await erc20.balanceOf(AccountInterface.address);
      setBalance(newBalance / Math.pow(10, 18)); // Adjust for decimals
    }
  }

  return (
    <div>
      <h3>Token Balance: {balance !== null ? `${balance} STRK` : "Loading..."}</h3>
      <button onClick={handleTransfer}>Transfer 1 STRK</button>
    </div>
  );
}
```

## Next steps

You've set up a simple React dapp that connects to MetaMask, displays an ERC-20 token balance, and performs token transfers. Creating a contract instance using `AccountInterface` allows you to interact with smart contracts, retrieve token balances, and execute transactions, enabling more advanced functionality in your dapp.

You can follow these next steps:

- [Manage Starknet accounts](manage-starknet-accounts.md).
- [Manage Starknet networks](manage-starknet-networks.md).
- Explore the [Starknet Snap API reference](../../../reference/non-evm-apis/starknet-snap-api.md).
