---
description: Connect your Starknet account to MetaMask
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Connect your Starknet account to MetaMask

To connect your dapp to the Starknet network in MetaMask, you can use the `get-starknet` library.
This library simplifies the process of connecting to the Starknet Snap, allowing you to interact with users' Starknet accounts in MetaMask.
`get-starknet` also enables dapps to interact with other wallets in the Starknet ecosystem.

## Prerequisites

 - [MetaMask installed](https://metamask.io/download/)
 - A text editor (for example, [VS Code](https://code.visualstudio.com/))
 - [Node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 20.11 or later
 - [Yarn](https://yarnpkg.com/)
 - A JavaScript or TypeScript React project set up 

## Connect using `get-starknet`

### 1. Add `get-starknet` to your project

Add the [`get-starknet`](https://github.com/starknet-io/get-starknet) `version 3.3.0` library and the version `6.11.0` of the `starknet.js` library to your project's dependencies:

<Tabs>
  <TabItem value="yarn" label="Yarn" default>

  ```bash
  yarn add get-starknet@3.3.0 starknet@6.11.0
  ```

  </TabItem>

  <TabItem value="npm" label="npm">

  ```bash
  npm install get-starknet@3.3.0 starknet@6.11.0
  ```

  </TabItem> 
</Tabs>

### 2. Connect to the Snap

Create a new file named `WalletConnectButton.js` in your project's `src/components` folder. Create this folder if it doesn't exist. Add the following code to the file:.

```javascript
import React, { useState } from 'react';
import { connect, disconnect } from 'get-starknet';
import { encode } from "starknet";
function WalletConnectButton() {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletName, setWalletName] = useState("");
  const [wallet, setWallet] = useState("");
  const handleDisconnect = async () => {
    await disconnect({clearLastWallet: true});
    setWallet("");
    setWalletAddress("");
    setWalletName("")
  }
  const handleConnect = async () => {
    try{
      const getWallet = await connect({ modalMode: "alwaysAsk", modalTheme: "light" });
      await getWallet?.enable({ starknetVersion: "v5" });
      setWallet(getWallet);
      const addr = encode.addHexPrefix(encode.removeHexPrefix(getWallet?.selectedAddress ?? "0x").padStart(64, "0"));
      setWalletAddress(addr);
      setWalletName(getWallet?.name || "")
    }
    catch(e){
      // handle user rejection to install metamask / snaps here.
      console.log(e)
    }
  };
  return (
    <div>
      {!walletAddress && (
      <button onClick={handleConnect}>
        Connect Wallet
      </button>
      )}
      {walletAddress && (
        <div>
        <button onClick={handleDisconnect}>
            Disconnect Wallet
        </button>
        <div>
          <p>Wallet Name: {walletName}</p>
          <p>Wallet Address: {walletAddress}</p>
        </div>
        </div>
      )}
    </div>
  );
}
export default WalletConnectButton;
```

This code handles the connection to Starknet Snap using the `get-starknet` library and includes a button for users to initiate the wallet connection.

:::note

To connect to Starknet, the dapp user must ensure the [Starknet Snap](https://snaps.metamask.io/snap/npm/consensys/starknet-snap/) is added to MetaMask.

:::

### 3. Start the dapp

Start the dapp, which allow users to click **Connect Wallet** and interact with the Starknet network using MetaMask:

<Tabs>
  <TabItem value="yarn" label="Yarn" default>

  ```bash
  yarn start
  ```

  </TabItem>

  <TabItem value="npm" label="npm">

  ```bash
  npm start
  ```

  </TabItem> 
</Tabs>

## Connect using `wallet_invokeSnap`

### 1. Connect to the Snap

Alternatively, you can manage the Snap invocation manually. Use the `wallet_invokeSnap` method to directly interact with the Starknet Snap. This method does not requires additional dependencies.

:::note

 To connect to Starknet, the dapp user must ensure the [Starknet Snap](https://snaps.metamask.io/snap/npm/consensys/starknet-snap/) is added to MetaMask.

 :::

In the `src/utils/snapHelper.js` file add the `connect` function and the `callSnap` helper function. This file handles the interactions with the Starknet Snap.

```javascript title="src/utils/snapHelper.js"
const snapId = 'npm:starknet-snap';

export async function connect() {
  await ethereum.request({
    method: 'wallet_requestSnaps',
    params: {
      [snapId]: {},
    },
  });
}

export async function callSnap(method, params) {
  try {
    const response = await ethereum.request({
      method: 'wallet_invokeSnap',
      params: {
        snapId,
        request: {
          method,
          params,
        },
      },
    });
    console.log(`${method} response:`, response);
    return response;
  } catch (err) {
    console.error(`${method} error:`, err);
    alert(`${method} error: ${err.message || err}`);
    throw err;
  }
}
```

### 2. Call a specific Snap method

To call a specific Snap method, for example `createAccount` use the following:

```javascript
const deploy = false; // Set to true to deploy the actual account
const addressIndex = 0; // Specify which address to derive
const chainId = "0x534e5f5345504f4c4941"; // Specify which chain to use (Sepolia testnet)
// For mainnet, use: "0x534e5f4d41494e"

const accountInfo = await callSnap('starkNet_createAccount', { addressIndex, deploy, chainId });
```

#### Example in HTML and JavaScript (Vanilla JS)

```html
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Connect Starknet Snap</title>
</head>
<body>
  <button id="connectButton">Connect Starknet Wallet</button>
  <p id="accountInfo"></p>
  <script>
    async function connect(snapId) {
        await ethereum.request({
            method: 'wallet_requestSnaps',
            params: {
            [snapId]: {},
            },
        });
    }
    async function callSnap(snapId, method, params) {
      try {
        const response = await ethereum.request({
          method: 'wallet_invokeSnap',
          params: {
            snapId,
            request: {
              method,
              params,
            },
          },
        });
        return response;
      } catch (err) {
        console.error(`${method} problem happened:`, err);
        alert(`${method} problem happened: ${err.message || err}`);
      }
    }
    document.getElementById('connectButton').addEventListener('click', async () => {
      try {
        const snapId = 'npm:@consensys/starknet-snap';  // Snap ID
        await connect(snapId);
        const deploy = false; // whether to deploy the actual account
        const addressIndex = 0; // which address to derive
        const chainId = "0x534e5f5345504f4c4941"; // which chain to use  mainnet id  "0x534e5f4d41494e", sepolia id "0x534e5f5345504f4c4941"
        const account = await callSnap(snapId, 'starkNet_createAccount', { addressIndex, deploy, chainId });
        console.log(account)
        document.getElementById('accountInfo').innerText = `Connected Starknet Account: ${account.address}`;
      } catch (error) {
        console.error('Error connecting to Starknet Snap:', error);
      }
    });
  </script>
</body>
</html>
```

#### Example in a React component

```javascript
import React, { useState } from 'react';
const ConnectWallet = () => {
  const [accountInfo, setAccountInfo] = useState('');
  const connect = async (snapId) => {
    try {
      await window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          [snapId]: {},
        },
      });
    } catch (err) {
      console.error('Snap connection error:', err);
      alert(`Error connecting to Snap: ${err.message || err}`);
    }
  };
  const callSnap = async (snapId, method, params) => {
    try {
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId,
          request: {
            method,
            params,
          },
        },
      });
      return response;
    } catch (err) {
      console.error(`${method} problem happened:`, err);
      alert(`${method} problem happened: ${err.message || err}`);
    }
  };
  const handleConnectClick = async () => {
    try {
      const snapId = 'npm:@consensys/starknet-snap'; // Snap ID
      await connect(snapId);
      const deploy = false; // whether to deploy the actual account
      const addressIndex = 0; // which address to derive
      const chainId = '0x534e5f5345504f4c4941'; // chain (sepolia)
      const account = await callSnap(snapId, 'starkNet_createAccount', { addressIndex, deploy, chainId });
      setAccountInfo(`Connected Starknet Account: ${account.address}`);
    } catch (error) {
      console.error('Error connecting to Starknet Snap:', error);
    }
  };
  return (
    <div>
      <button onClick={handleConnectClick}>Connect Starknet Wallet</button>
      <p>{accountInfo}</p>
    </div>
  );
};
export default ConnectWallet;
```
