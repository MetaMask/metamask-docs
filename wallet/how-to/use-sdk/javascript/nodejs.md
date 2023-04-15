---
title: Node.js
---

# Use MetaMask SDK with Node.js

You can import MetaMask SDK into your Node.js dapp to enable your users to easily connect with their
MetaMask Mobile wallet.
The SDK for Node.js has the [same prerequisites](index.md#prerequisites) as for standard JavaScript.

## How it works

When a user accesses your Node.js dapp, the SDK renders a QR code on the console which users can
scan with their MetaMask Mobile app.

<p align="center">

![SDK Node.js example](../../../assets/sdk-nodejs.gif)

</p>

You can download the
[Node.js example](https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/downloads/nodejs_v0.0.1_beta5.zip).
Install the example using `yarn` and run it using `node .`.

## Steps

### 1. Install the SDK

In your project directory, install the SDK using Yarn or npm:

```bash
yarn add @metamask/sdk
or
npm i @metamask/sdk
```

### 2. Import the SDK

In your project script, add the following to import the SDK:

```javascript
import MetaMaskSDK from '@metamask/sdk';
```

### 3. Instantiate the SDK

Instantiate the SDK using any [options](../../../reference/sdk-js-options.md):

```javascript
const MMSDK = new MetaMaskSDK(options);

const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
```

### 4. Use the SDK

Use the SDK by calling any [provider API methods](../../../reference/provider-api.md).
Always call [`eth_requestAccounts`](../../../reference/rpc-api.md#eth_requestaccounts) using
[`ethereum.request()`](../../../reference/provider-api.md#ethereumrequestargs) first, since it
prompts the installation or connection popup to appear.

```javascript
ethereum.request({ method: 'eth_requestAccounts', params: [] });
```
