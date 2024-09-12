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
 - A JavaScript or TypeScript project set up 

## Connect using `get-starknet`

### 1. Add `get-starknet` to your project

Add the [`get-starknet`](https://github.com/MetaMask/snaps/tree/main/packages/create-snap) library and the latest version of the `starknet.js` library to your project's dependencies:

<Tabs>
  <TabItem value="yarn" label="Yarn" default>

  ```bash
  yarn add get-starknet starknet@next
  ```

  </TabItem>

  <TabItem value="npm" label="npm">

  ```bash
  npm install get-starknet starknet@next
  ```

  </TabItem> 
</Tabs>

### 2. Start the Snap

From the root of the created project, install the project dependencies:

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

### 3. Connect to the Snap

On the dapp, select **Connect**. The MetaMask extension displays and prompts you to approve the Snap's permissions.

After it is connected, select **Send message** to display a custom message within a confirmation
dialog in MetaMask.

## Connect using `wallet_invokeSnap`

### 1. Install dependencies

Alternatively, you can manage the Snap invocation manually.
If you are developing for the Starknet network, you'll use the `Starknet.js` library in your project. 
Navigate to your project directory and run the following command:

<Tabs>
  <TabItem value="yarn" label="Yarn" default>

  ```bash
  yarn add get starknet@next
  ```

  </TabItem>

  <TabItem value="npm" label="npm">

  ```bash
  npm install starknet@next
  ```

  </TabItem> 
</Tabs>

### 2. Install the Starknet Snap

To connect to Starknet, ensure the Starknet Snap is installed in MetaMask.

### 3. Connect to Starknet using `wallet_invokeSnap`

Allow users to interact with MetaMask using the `wallet_invokeSnap` method. Add the following code to your project:

```javascript title="index.js"
// Function to request Starknet account
const connectStarknetSnap = async () => {
  try {
    const snapId = 'npm:starknet-snap';
    
    const requestParams = {
      method: 'wallet_invokeSnap',
      params: {
        snapId: snapId,
        request: {
          method: 'starknet_getAccount',  // Method to get the Starknet account
          params: {}
        }
      }
    };

    // Request the Starknet account from MetaMask using Snap
    const account = await ethereum.request(requestParams);
    console.log('Starknet Account:', account);
    
    return account;
  } catch (error) {
    console.error('Error connecting to Starknet Snap:', error);
  }
};
```

### 4. Trigger the connection from the dapp

To allow users to connect their Starknet accounts to MetaMask, assign the `connectStarknetSnap` function to a button or event. 
Create a button that, when clicked, connects the Starknet Snap.

#### Example HTML and JavaScript (Vanilla JS)

```html
<!DOCTYPE html>
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
    document.getElementById('connectButton').addEventListener('click', async () => {
      try {
        const snapId = 'npm:starknet-snap';  // Snap ID
        const requestParams = {
          method: 'wallet_invokeSnap',
          params: {
            snapId: snapId,
            request: {
              method: 'starknet_getAccount',
              params: {}
            }
          }
        };
        
        const account = await ethereum.request(requestParams);
        document.getElementById('accountInfo').innerText = `Connected Account: ${account}`;
      } catch (error) {
        console.error('Error connecting to Starknet Snap:', error);
      }
    });
  </script>
</body>
</html>
```

#### Example React component

```javascript
import React, { useState } from 'react';

const ConnectWallet = () => {
  const [account, setAccount] = useState(null);

  const connectStarknetSnap = async () => {
    try {
      const snapId = 'npm:starknet-snap';  // Snap ID
      const requestParams = {
        method: 'wallet_invokeSnap',
        params: {
          snapId: snapId,
          request: {
            method: 'starknet_getAccount',
            params: {}
          }
        }
      };
      
      const account = await window.ethereum.request(requestParams);
      setAccount(account);
    } catch (error) {
      console.error('Error connecting to Starknet Snap:', error);
    }
  };

  return (
    <div>
      <button onClick={connectStarknetSnap}>Connect Starknet Wallet</button>
      {account && <p>Connected Account: {account}</p>}
    </div>
  );
};

export default ConnectWallet;
```