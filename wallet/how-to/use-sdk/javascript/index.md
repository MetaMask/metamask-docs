# Use MetaMask SDK with JavaScript

You can import MetaMask SDK into your JavaScript dapp to enable your users to easily connect
with a MetaMask wallet client.
The following instructions work for web dapps based on standard JavaScript.
You can also see instructions for the following JavaScript-based platforms:

- [React](react.md)
- [Pure JavaScript](pure-js.md)
- [Other web frameworks](other-web-frameworks.md)
- [React Native](react-native.md)
- [Node.js](nodejs.md)
- [Electron](electron.md)

## How it works

<!--tabs-->

# Desktop browser

When a user accesses your JavaScript web dapp on a desktop browser and doesn't have the MetaMask
extension installed, a popup appears that prompts the user to either install the MetaMask extension or connect
to MetaMask Mobile using a QR code.

![SDK desktop browser example](../../../assets/sdk-desktop-browser.gif)

# Mobile browser

When a user accesses your JavaScript web dapp on a mobile browser, the SDK automatically deeplinks
to MetaMask Mobile (or if the user doesn't already have it, prompts them to install it).
Once the user accepts the connection, they're automatically redirected back to your dapp.
This happens for all actions that need user approval.

<p align="center">

![SDK mobile browser example](../../../assets/sdk-mobile-browser.gif)

</p>

<!--/tabs-->

You can try the
[hosted test dapp with the SDK installed](https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/test-dapp-2/).
You can also download the
[React project example](https://github.com/MetaMask/examples/tree/main/metamask-with/metamask-sdk-create-react-app).
Install the example using `yarn` and run it using `yarn start`.

## Prerequisites

- An existing or [new project](../../../get-started/set-up-dev-environment.md) set up.
- [MetaMask Mobile](https://github.com/MetaMask/metamask-mobile) v5.8.1 or above.
- [Yarn](https://yarnpkg.com/getting-started/install) or
  [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

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
