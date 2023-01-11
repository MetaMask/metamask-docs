# Use MetaMask SDK

MetaMask SDK currently supports JavaScript-based dapps.
It enables these dapps to easily connect with a MetaMask wallet client.

The following instructions work for dapps based on standard JavaScript, React, NodeJS, Electron, and
other web frameworks.
MetaMask SDK also supports [React Native](react-native.md) and [pure JavaScript](pure-js.md) dapps.

## Prerequisites

- MetaMask Mobile v5.8.1 or above. Developers need access to a MetaMask Mobile build that is
  compatible with the SDK.
- yarn or npm.

## 1. Install the SDK

Install the SDK using yarn or npm.

```bash
yarn add @metamask/sdk
or
npm i @metamask/sdk
```

## 2. Import the SDK

```javascript
import MetaMaskSDK from '@metamask/sdk';
```

## 3. Instantiate the SDK

For all Javascript-based apps, instantiate the SDK like this:

```javascript
const MMSDK = new MetaMaskSDK(options);

const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
```

For a list of possible `options` check [here](/metamask-sdk-js/metamask-sdk-js-options.html)

## 4. Use the SDK

```javascript
ethereum.request({ method: 'eth_requestAccounts', params: [] });
```

You should always call `eth_requestAccounts` first!

For possible methods, check [the Ethereum Provider API](/ethereum-provider.html)
