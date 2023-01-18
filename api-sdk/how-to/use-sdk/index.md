# Use MetaMask SDK

[MetaMask SDK](../../concepts/sdk.md) currently supports JavaScript-based dapps.
It enables these dapps to easily connect with a MetaMask wallet client.

The following instructions work for dapps based on standard JavaScript, React, NodeJS, Electron, and
other web frameworks.
MetaMask SDK also supports [React Native](react-native.md) and [pure JavaScript](pure-js.md) dapps.

## Prerequisites

- MetaMask Mobile v5.8.1 or above
- [Yarn](https://yarnpkg.com/getting-started/install) or
  [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## 1. Install the SDK

Install the SDK using Yarn or npm:

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

```javascript
const MMSDK = new MetaMaskSDK(options);

const ethereum = MMSDK.getProvider(); // You can also access via window.ethereum
```

See the [list of options](../../reference/sdk-js-options.md).

## 4. Use the SDK

```javascript
ethereum.request({ method: 'eth_requestAccounts', params: [] });
```

Always call `eth_requestAccounts` first, since it prompts the installation or connection popup to appear.

See the [Ethereum provider API](../../reference/provider-api.md) for all methods.
