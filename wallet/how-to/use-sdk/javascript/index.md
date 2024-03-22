---
sidebar_label: JavaScript
sidebar_position: 1
description: Set up the SDK in your JavaScript dapp.
tags:
  - JavaScript SDK
---

# Use MetaMask SDK with JavaScript

Import [MetaMask SDK](../../../concepts/sdk/index.md) into your JavaScript dapp to enable your
users to easily connect to the MetaMask browser extension and MetaMask Mobile.
The following instructions work for web dapps based on standard JavaScript.
You can also see instructions for the following JavaScript-based platforms:

- [React](react/index.md)
  - [React UI](react/react-ui.md)
- [Pure JavaScript](pure-js.md)
- [Other web frameworks](other-web-frameworks.md)
- [React Native](react-native.md)
- [Node.js](nodejs.md)
- [Electron](electron.md)

## Prerequisites

- A JavaScript project set up
- [MetaMask Mobile](https://github.com/MetaMask/metamask-mobile) version 5.8.1 or later
- [Yarn](https://yarnpkg.com/getting-started/install) or
  [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

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

```javascript
import { MetaMaskSDK } from "@metamask/sdk";
```

### 3. Instantiate the SDK

Instantiate the SDK using any [options](../../../reference/sdk-js-options.md):

```javascript
const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "JavaScript example dapp",
    url: window.location.href,
  },
  // Other options
});

// You can also access via window.ethereum
const ethereum = MMSDK.getProvider();
```

:::note Important SDK options
- Use [`dappMetadata`](../../../reference/sdk-js-options.md#dappmetadata) to display information
  about your dapp in the MetaMask connection modal.
- Use [`modals`](../../../reference/sdk-js-options.md#modals) to [customize the logic and UI of
  the displayed modals](../../display/custom-modals.md).
- Use [`infuraAPIKey`](../../../reference/sdk-js-options.md#infuraapikey) to
  [make read-only RPC requests](../../make-read-only-requests.md) from your dapp.
:::

### 4. Use the SDK

Use the SDK by calling any [provider API methods](../../../reference/provider-api.md).
Always call [`eth_requestAccounts`](/wallet/reference/eth_requestaccounts) using
[`request()`](../../../reference/provider-api.md#request) first, since it
prompts the installation or connection popup to appear.

```javascript
ethereum.request({ method: "eth_requestAccounts", params: [] });
```

## Example

You can copy the full JavaScript example to get started:

```javascript title="index.js"
import { MetaMaskSDK } from "@metamask/sdk";

const MMSDK = new MetaMaskSDK({
  dappMetadata: {
    name: "Example JavaScript Dapp",
    url: window.location.href,
  },
  // Other options
});

// You can also access via window.ethereum
const ethereum = MMSDK.getProvider();

ethereum.request({ method: 'eth_requestAccounts', params: [] });
```

See the [example JavaScript dapps](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples)
in the JavaScript SDK GitHub repository for more information.
