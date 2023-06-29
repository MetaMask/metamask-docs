---
sidebar_label: JavaScript
sidebar_position: 1
---

# Use MetaMask SDK with JavaScript

You can import [MetaMask SDK](../../../../concepts/sdk.md) into your JavaScript dapp to enable your
users to easily connect to the MetaMask browser extension and MetaMask Mobile.
The following instructions work for web dapps based on standard JavaScript.
You can also see instructions for the following JavaScript-based platforms:

- [React](react.md)
- [Pure JavaScript](pure-js.md)
- [Other web frameworks](other-web-frameworks.md)
- [React Native](react-native.md)
- [Node.js](nodejs.md)
- [Electron](electron.md)

## Prerequisites

- An existing or [new project](../../../get-started-building/set-up-dev-environment.md) set up.
- [MetaMask Mobile](https://github.com/MetaMask/metamask-mobile) v5.8.1 or above.
- [Yarn](https://yarnpkg.com/getting-started/install) or
  [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

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
import { MetaMaskSDK } from '@metamask/sdk';
```

### 3. Instantiate the SDK

Instantiate the SDK using any [options](../../../../reference/sdk-js-options.md):

```javascript
const MMSDK = new MetaMaskSDK(options);

const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
```

### 4. Use the SDK

Use the SDK by calling any [provider API methods](../../../../reference/provider-api.md).
Always call [`eth_requestAccounts`](../../../../reference/rpc-api.md#eth_requestaccounts) using
[`ethereum.request()`](../../../../reference/provider-api.md#ethereumrequestargs) first, since it
prompts the installation or connection popup to appear.

```javascript
ethereum.request({ method: 'eth_requestAccounts', params: [] });
```
