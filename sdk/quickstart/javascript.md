---
description: JavaScript
---

# JavaScript

This guide covers setting up MetaMask SDK in JavaScript applications. The SDK enables your users to easily connect to MetaMask extension and mobile app across different JavaScript environments.

### Prerequisites

- MetaMask Mobile v5.8.1+
- npm or yarn installed

### Installation

```bash
npm install @metamask/sdk
# or
yarn add @metamask/sdk
```

### Basic Usage

#### Web Applications

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

#### Pure JavaScript (CDN)

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

#### Node.js

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

### Configuration Options

The SDK accepts several options when initializing:

```javascript
const MMSDK = new MetaMaskSDK({
  // Required - your dapp's info
  dappMetadata: {
    name: "Your Dapp Name",
    url: window.location.href,
  },
  
  // Optional - Infura API key for read-only RPC calls
  infuraAPIKey: process.env.INFURA_API_KEY,
  
  // Optional - customize modal display
  headless: false,
})
```

### Common SDK Methods

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
