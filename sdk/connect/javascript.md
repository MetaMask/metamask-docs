---
description: Quickstart guide for using the SDK with a JavaScript dapp.
sidebar_label: JavaScript
keywords: [connect, MetaMask, JavaScript, SDK, dapp]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Connect to MetaMask using JavaScript

Get started with MetaMask SDK in your JavaScript dapp.

## Steps

### 1. Install the SDK

Install the SDK in an existing JavaScript project:

```bash npm2yarn
npm install @metamask/sdk
```

### 2. Initialize the SDK

The following are examples of using the SDK in various JavaScript environments:

<Tabs>
<TabItem value="Web dapps">

```javascript
import { MetaMaskSDK } from "@metamask/sdk"

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Example JavaScript dApp",
    url: window.location.href,
    // iconUrl: 'https://mydapp.com/icon.png' // Optional
  },
  infuraAPIKey: process.env.INFURA_API_KEY,
})
```

- - `dappMetadata` ensures trust by showing your dapp’s `name`, `url`, and `iconUrl` during connection.

- - `infuraAPIKey` enables read-only RPC and load‑balancing.

</TabItem>
<TabItem value="Pure JavaScript (CDN)">

```html
<head>
  <script src="https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/cdn/metamask-sdk.js"></script>
  <script>
    const MMSDK = new MetaMaskSDK.MetaMaskSDK({
      dappMetadata: {
        name: "Example JavaScript dApp",
        url: window.location.href,
        // iconUrl: "https://mydapp.com/icon.png" // Optional
      },
      infuraAPIKey: process.env.INFURA_API_KEY,
    })
  </script>
</head>
```

</TabItem>
</Tabs>

### 3. Connect and use provider

Connect to MetaMask and get the provider for RPC requests:

```javascript
const provider = MMSDK.getProvider()

const accounts = await MMSDK.connect()
console.log("Connected account:", accounts[0])

const result = await provider.request({
  method: "eth_accounts",
  params: [],
})
console.log("eth_accounts result:", result)
```

Use the provider to make RPC request to get accounts, chainId, etc.

- `MMSDK.connect()` handles cross-platform connection (desktop and mobile), including deeplinking.
- Use `provider.request()` for arbitrary RPC calls like `eth_chainId`, `eth_getBalance`, or batching via `metamask_batch`.

### 4. Common SDK methods at a glance

| Method                                 | Description                                  |
| -------------------------------------- | -------------------------------------------- |
| `connect()`                            | Triggers wallet connection flow              |
| `connectAndSign({ msg: '...' })`       | Connects and prompts user to sign a message  |
| `getProvider()`                        | Returns the provider object for RPC requests |
| `provider.request({ method, params })` | Any Ethereum JSON‑RPC call                   |
| Batched RPC                            | Use `metamask_batch` to group multiple calls |

### 5. Usage example

```javascript
// 1. Connect and get accounts
const accounts = await MMSDK.connect()

// 2. Connect and sign in one step
const signResult = await MMSDK.connectAndSign({
  msg: "Sign in to Dapp",
})

// 3. Get provider for RPC requests
const provider = MMSDK.getProvider()

// 4. Make an RPC request
const result = await provider.request({
  method: "eth_accounts",
  params: [],
})

// 5. Batch multiple RPC requests
const batchResults = await provider.request({
  method: "metamask_batch",
  params: [
    { method: "eth_accounts" },
    { method: "eth_chainId" }
  ]
})
```
