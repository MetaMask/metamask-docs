---
sidebar_label: Other web frameworks
sidebar_position: 3
description: Set up the SDK in other web frameworks.
tags:
  - JavaScript SDK
---

# Use MetaMask SDK with other web frameworks

Import MetaMask SDK into your web dapp to enable your users to
easily connect to the MetaMask browser extension and MetaMask Mobile.
The SDK for other web frameworks has the [same prerequisites](index.md#prerequisites) as for
standard JavaScript.

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
    name: "Example JavaScript Dapp",
  },
  infuraAPIKey: process.env.INFURA_API_KEY,
  // Other options
});

```

- Use [`dappMetadata`](../../../reference/sdk-js-options.md#dappmetadata) to display information
  about your dapp in the MetaMask connection modal.
- Use [`infuraAPIKey`](../../../reference/sdk-js-options.md#infuraapikey) to
  [make read-only RPC requests](../../../how-to/make-read-only-requests.md) from your dapp.
- Use [`headless`](../../../reference/sdk-js-options.md#headless) to [customize the logic and UI of
  the displayed modals](../../../how-to/display/headless.md).

### 4. Use the SDK

We recommend calling `connect()` first. You can also call [`eth_requestAccounts`](/wallet/reference/json-rpc-methods/eth_requestaccounts) using
[`request()`](../../../reference/provider-api.md#request) first, which will prompt the installation or connection popup to appear.

```javascript
const accounts = await MMSDK.connect()
```

You can also call the SDK's [`connectAndSign`](../../../how-to/sign-data/connect-and-sign.md) method, and
[batch multiple JSON-RPC requests](../../../how-to/batch-json-rpc-requests.md) using the `metamask_batch` method.

## Example

You can copy the full JavaScript example to get started:

```javascript title="index.js"
import { MetaMaskSDK } from "@metamask/sdk";

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Example JavaScript Dapp",
    url: window.location.href,
  },
  infuraAPIKey: process.env.INFURA_API_KEY,
  // Other options
});

// You can also connect MMSDK.init() first to get access to the provider.
await MMSDK.connect();

const ethereum = MMSDK.getProvider();
ethereum.request({ method: "eth_accounts", params: [] });
```

See the [example JavaScript dapps](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples)
in the JavaScript SDK GitHub repository for more information.
