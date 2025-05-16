---
description: Quickstart guide for using the SDK with a JavaScript dapp.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# JavaScript

Get started with MetaMask SDK in your JavaScript dapp.

## Steps

### 1. Install the SDK

Install the SDK in an existing JavaScript project using npm or Yarn:

```bash
npm install @metamask/sdk
```

or

```
yarn add @metamask/sdk
```

### 2.  Use the SDK

The following are examples of using the SDK in various JavaScript environments:

<Tabs>
<TabItem value="Web dapps">

```javascript
import { MetaMaskSDK } from "@metamask/sdk"

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Example JavaScript Dapp",
    url: window.location.href,
  },
  infuraAPIKey: process.env.INFURA_API_KEY,
})

const ethereum = MMSDK.getProvider()

// Connect to MetaMask
const accounts = await MMSDK.connect()

// Make requests
const result = await ethereum.request({ 
  method: "eth_accounts", 
  params: [] 
})
```

</TabItem>
<TabItem value="Pure JavaScript (CDN)">

```html
<head>
  <script src="https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/cdn/metamask-sdk.js"></script>
  <script>
    const MMSDK = new MetaMaskSDK.MetaMaskSDK({
      dappMetadata: {
        name: "Example Pure JS Dapp",
      },
      infuraAPIKey: process.env.INFURA_API_KEY,
    });
    
    MMSDK.connect()
  </script>
</head>
```

</TabItem>
<TabItem value="Node.js">

```javascript
import { MetaMaskSDK } from "@metamask/sdk"

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Node.js dapp",
  },
  infuraAPIKey: process.env.INFURA_API_KEY,
})

// Connect and get accounts
const accounts = await MMSDK.connect()
console.log("Connected accounts:", accounts)

// Access provider
const provider = MMSDK.getProvider()
```

</TabItem>
</Tabs>

### 3. Configure the SDK

The SDK accepts several [configuration options](../reference/sdk-options.md) when initializing.
For example:

```javascript
const MMSDK = new MetaMaskSDK({
  // Required - Your dapp's info
  dappMetadata: {
    name: "Your Dapp Name",
    url: window.location.href,
  },
  
  // Optional - Infura API key for read-only RPC calls
  infuraAPIKey: process.env.INFURA_API_KEY,
  
  // Optional - Customize modal display
  headless: false,
})
```

### 4. Call common methods

The following are common methods you can call with the SDK:

```javascript
// Connect and get accounts
const accounts = await MMSDK.connect()

// Get provider for RPC requests
const provider = MMSDK.getProvider()

// Make an RPC request
const result = await provider.request({ 
  method: "eth_accounts",
  params: [] 
})

// Connect and sign in one step
const signResult = await MMSDK.connectAndSign({ 
  msg: "Sign in to Dapp" 
})

// Batch multiple RPC requests
const batchResults = await provider.request({
  method: "metamask_batch",
  params: [
    { method: "eth_accounts" },
    { method: "eth_chainId" }
  ]
})
```
