---
description: Starknet integration tutorial
sidebar_position: 6
---

# Create a basic dapp with `get-starknet` and React TypeScript

In this tutorial, you'll learn how to set up a basic dapp that uses get-starknet to connect to MetaMask and display the user's wallet address.

## 1. Project Setup

Create a new React project with TypeScript and add the necessary dependencies

```bash
# Create a new React project with TypeScript
yarn create react-app get-starknet-tutorial --template typescript

# Change into the project directory
cd get-starknet-tutorial

# Add get-starknet and the latest starknet.js version
yarn add get-starknet starknet@next
```

## 2. 

### 2.1. Connecting to a wallet

The `connect` function from `get-starknet` is the primary way to connect your dapp to a user's wallet. When called, it opens a connection to the MetaMask wallet and returns an object containing important details about the wallet, such as following:

- `name`: The name of the wallet.
- `icon`: The wallet's icon, which can be used to display the wallet's logo.
- `account`: The account object from `starknet.js`, which contains the wallet's address and provides access to account-specific operations.

To import the necessary functions and connect to a wallet, add the following code:

```typescript
import { connect, type ConnectOptions } from "get-starknet";

async function handleConnect(options?: ConnectOptions) {
  const res = await connect(options);
  // Access wallet details such as name, address, and icon
  console.log(res?.name, res?.account?.address, res?.icon);
}
```

### 2.2. Configure connection options

`connect` accepts an optional `ConnectOptions` object. This object can control how the connection process behaves, including:

- `modalMode`: Determines how the connection modal behaves. The options include "always ask" or "never ask".
- `modalTheme`: Allows setting the theme of the connection modal. The options includes dark or light theme.

The following code is an example of how to set these options:

```typescript
handleConnect({ modalMode: "alwaysAsk", modalTheme: "dark" });
```

### 2.3. Create a `WalletAccount`

After it is connected, you can create a new `WalletAccount` instance using the `starknet.js` library. This allows interaction with the Starknet network using the connected wallet.

```typescript
import { WalletAccount } from 'starknet'; 

async function handleConnect(options?: ConnectOptions) {
  const res = await connect(options);
  const myFrontendProviderUrl = 'https://free-rpc.nethermind.io/sepolia-juno/v0_7';
  const newWalletAccount = new WalletAccount({ nodeUrl: myFrontendProviderUrl }, res);
  // You can now use newWalletAccount to interact with StarkNet
}
```

### 2.4. Display wallet information

The wallet's name, address, and icon can be displayed in your dapp. This provides visual feedback to the user, confirming which wallet they are using.

Here's a basic example of how to update the UI with the connected wallet's details:

```typescript
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

### 2.5. Example implementation

Now that you understand the key elements and have seen snippets of the most important parts, here's the full implementation in `App.tsx`:

```typescript
import "./App.css"
import {
  type ConnectOptions,
  type DisconnectOptions,
  connect,
  disconnect,
} from "get-starknet"
import { WalletAccount } from 'starknet'; // v6.10.0 min
import { useState } from "react"

function App() {
  const [walletName, setWalletName] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [walletIcon, setWalletIcon] = useState("")
  const [walletAccount, setWalletAccount] = useState<WalletAccount | null>(null)

  async function handleConnect(options?: ConnectOptions) {
    const res = await connect(options)
    setWalletName(res?.name || "")
    setWalletAddress(res?.account?.address || "")
    setWalletIcon(res?.icon || "")
    if (res) {
      const myFrontendProviderUrl = 'https://free-rpc.nethermind.io/sepolia-juno/v0_7';
      const newWalletAccount = new WalletAccount({ nodeUrl: myFrontendProviderUrl }, res)
      setWalletAccount(newWalletAccount)
    }
  }

  async function handleDisconnect(options?: DisconnectOptions) {
    await disconnect(options)
    setWalletName("")
    setWalletAddress("")
    setWalletAccount(null)
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
}

export default App
```

## 3. Display the balance and transfer an ERC-20 token

Now that you have set up the basics, let's go a step further and show how to display the balance of a specific ERC-20 token, such as STRK, and perform a transfer using the `WalletAccount` instance.

### 3.1. Setting Up the Contract

To interact with an ERC-20 contract, you'll need to create a Contract instance from starknet.js using the WalletAccount instance. Assuming the ABI is loaded from a JSON file, here's how you would do it:

```typescript
import { Contract } from "starknet";
import erc20Abi from './erc20Abi.json'; // Assuming ABI is stored in this JSON file

// Assuming you have already created `walletAccount`
const tokenAddress = "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7"; // STRK contract address

const erc20 = new Contract(erc20Abi, tokenAddress, walletAccount);
```

### 3.2. Fetch the token balance

Once the contract is set up, you can call the `balanceOf` method to fetch the balance of the connected account:

```typescript
const balance = await erc20.balanceOf(walletAddress);
const formattedBalance = balance / Math.pow(10, 18); // Adjust for decimals
```

### 3.3. Transfer tokens

To transfer tokens, you will populate the `transfer` method call and then execute the transaction using the `WalletAccount`. Here's how you can do that:

```typescript
import { Call } from "starknet";

// Define the transfer parameters
const recipientAddress = '0x78662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1';
const amountToTransfer = 1n * 10n ** 18n; // 1 token (assuming 18 decimals)

// Populate the transfer call
const transferCall: Call = erc20.populate('transfer', {
  recipient: recipientAddress,
  amount: amountToTransfer,
});

// Execute the transfer
const { transaction_hash: transferTxHash } = await walletAccount.execute(transferCall);

// Wait for the transaction to be accepted on StarkNet
await walletAccount.waitForTransaction(transferTxHash);
```

### 3.4. Full implementation

Here's how you can integrate both balance checking and transferring into your component:

```typescript
import { useEffect, useState } from 'react';
import { Contract } from "starknet";
import erc20Abi from './erc20Abi.json'; // Assuming ABI is stored in this JSON file

function TokenBalanceAndTransfer({ walletAccount, tokenAddress }) {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    if (walletAccount) {
      const erc20 = new Contract(erc20Abi, tokenAddress, walletAccount);
      // Fetch balance
      erc20.balanceOf(walletAccount.address)
        .then((result) => {
          const formattedBalance = result / Math.pow(10, 18); // Adjust for decimals
          setBalance(formattedBalance);
        })
        .catch(console.error);
    }
  }, [walletAccount, tokenAddress]);

  async function handleTransfer() {
    if (walletAccount) {
      const erc20 = new Contract(erc20Abi, tokenAddress, walletAccount);
      const recipientAddress = '0x78662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1';
      const amountToTransfer = 1n * 10n ** 18n; // 1 token

      // Populate and execute transfer
      const transferCall: Call = erc20.populate('transfer', {
        recipient: recipientAddress,
        amount: amountToTransfer,
      });
      const { transaction_hash: transferTxHash } = await walletAccount.execute(transferCall);

      // Wait for the transaction to be accepted
      await walletAccount.provider.waitForTransaction(transferTxHash);

      // Refresh balance
      const newBalance = await erc20.balanceOf(walletAccount.address);
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

### 3.5. ABI and contract address

The ABI (Application Binary Interface) for the ERC-20 contract can be found on the Voyager Explorer.

The contract address for STRK (an ERC-20 token) on Sepolia testnet is `0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7`.

## Next steps

In this section, we've shown how to extend your dapp by displaying the balance of an ERC-20 token like ETH and performing a token transfer. By creating a Contract instance with the WalletAccount, you can easily interact with smart contracts, fetch token balances, and execute transactions, enabling more complex functionality in your dapp.

## Additional resources

- [Use get-starknet to connect to a wallet and create an account instance](https://starknetjs.com/docs/guides/walletAccount)
- [Use account instance to show ERC20 balance and transfer](https://starknetjs.com/docs/guides/use_ERC20)
- [get-starknet official GitHub](https://github.com/starknet-io/get-starknet)