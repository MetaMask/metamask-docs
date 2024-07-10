---
sidebar_label: Node.js
sidebar_position: 5
description: Set up the SDK in your Node.js dapp.
tags:
  - JavaScript SDK
---

# Use MetaMask SDK with Node.js

Import [MetaMask SDK](../../../concepts/sdk/index.md) into your Node.js dapp to enable your users
to easily connect to the MetaMask browser extension and MetaMask Mobile.
The SDK for Node.js has the [same prerequisites](index.md#prerequisites) as for standard JavaScript.

## Steps

### 1. Install the SDK

In your project directory, install the SDK using Yarn or npm:

```bash
yarn add @metamask/sdk
```

or

```bash
npm i @metamask/sdk
```

### 2. Import the SDK

In your project script, add the following to import the SDK:

```javascript title="index.js"
import { MetaMaskSDK } from "@metamask/sdk"
```

### 3. Instantiate the SDK

Instantiate the SDK using any [options](../../../reference/sdk-js-options.md):

```javascript title="index.js"
const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Example Node.js Dapp",
    url: window.location.href,
  },
  infuraAPIKey: process.env.INFURA_API_KEY,
  // Other options.
})

// You can also access via window.ethereum
const ethereum = MMSDK.getProvider()
```

- Use [`dappMetadata`](../../../reference/sdk-js-options.md#dappmetadata) to display information
  about your dapp in the MetaMask connection modal.
- Use [`infuraAPIKey`](../../../reference/sdk-js-options.md#infuraapikey) to
  [make read-only RPC requests](make-read-only-requests.md) from your dapp.
- Use [`modals`](../../../reference/sdk-js-options.md#modals) to [customize the logic and UI of
  the displayed modals](display-custom-modals.md).

### 4. Use the SDK

Use the SDK by calling any [provider API methods](../../../reference/provider-api.md).
Always call [`eth_requestAccounts`](/wallet/reference/eth_requestaccounts) using
[`request()`](../../../reference/provider-api.md#request) first, since it
prompts the installation or connection popup to appear.

```javascript
ethereum.request({ method: "eth_requestAccounts", params: [] })
```

You can also call the SDK's [`connectAndSign`](connect-and-sign.md) method, and
[batch multiple JSON-RPC requests](batch-json-rpc-requests.md) using the `metamask_batch` method.

## Example

You can copy the full Node.js example to get started:

```javascript title="index.js"
import { MetaMaskSDK } from "@metamask/sdk"

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Example Node.js Dapp",
    url: window.location.href,
  },
  infuraAPIKey: process.env.INFURA_API_KEY,
  // Other options.
})

// You can also access via window.ethereum
const ethereum = MMSDK.getProvider()

ethereum.request({ method: "eth_requestAccounts", params: [] })
```

See the [example Node.js dapp](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/nodejs)
in the JavaScript SDK GitHub repository for advanced use cases.
