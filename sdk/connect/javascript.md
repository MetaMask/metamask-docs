---
description: Quickstart guide for using the SDK with a JavaScript dapp.
sidebar_label: JavaScript
keywords: [connect, MetaMask, JavaScript, SDK, dapp]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Connect to MetaMask using JavaScript

Get started with MetaMask SDK in your JavaScript dapp.

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation) or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.


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
    name: "Example JavaScript dapp",
    url: window.location.href,
    // iconUrl: "https://mydapp.com/icon.png" // Optional
  },
  infuraAPIKey: process.env.INFURA_API_KEY,
})
```

- [`dappMetadata`](../reference/sdk-options.md#dappmetadata) - Ensures trust by showing your dapp's `name`, `url`, and `iconUrl` during connection.

- [`infuraAPIKey`](../reference/sdk-options.md#infuraapikey) - Enables read-only RPC and load‑balancing.

</TabItem>
<TabItem value="Pure JavaScript (CDN)">

```html
<head>
  <script src="https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/cdn/metamask-sdk.js"></script>
  <script>
    const MMSDK = new MetaMaskSDK.MetaMaskSDK({
      dappMetadata: {
        name: "Example JavaScript dapp",
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

`MMSDK.connect()` handles cross-platform connection (desktop and mobile), including deeplinking.

Use `provider.request()` for arbitrary [JSON-RPC requests](/wallet/reference/json-rpc-methods) like `eth_chainId` or `eth_getBalance`, or for [batching requests](../guides/batch-requests.md) via `metamask_batch`.

## Common SDK methods at a glance

| Method                                 | Description                                  |
| -------------------------------------- | -------------------------------------------- |
| [`connect()`](../reference/sdk-methods.md#connect)                            | Triggers wallet connection flow              |
| [`connectAndSign({ msg: '...' })`](../reference/sdk-methods.md#connectandsign)       | Connects and prompts user to sign a message  |
| [`getProvider()`](../reference/sdk-methods.md#getprovider)                        | Returns the provider object for RPC requests |
| [`provider.request({ method, params })`](/wallet/reference/provider-api/#request) | Calls any Ethereum JSON‑RPC method                   |
| [Batched RPC](../guides/batch-requests.md)                            | Use `metamask_batch` to group multiple JSON-RPC requests |

## Usage example

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
