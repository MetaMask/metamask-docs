---
description: Integrate MetaMask SDK with Web3-Onboard in your JavaScript dapp.
sidebar_position: 2
sidebar_label: Web3-Onboard
---

# Use Web3-Onboard with MetaMask SDK

[Web3-Onboard](https://onboard.blocknative.com/) is a JavaScript library that simplifies the process
of onboarding users into dapps.
It provides a smooth user interface, a variety of wallet integrations, and is highly customizable to
meet the needs of your dapp.

You can integrate [MetaMask SDK](../../../concepts/sdk/index.md) into your dapp alongside Web3-Onboard,
using the Web3-Onboard MetaMask module, to enable your users to seamlessly and securely connect to
the MetaMask browser extension and MetaMask Mobile.

## Prerequisites

Set up a project with [Web3-Onboard](https://onboard.blocknative.com/docs/getting-started/installation).

## Steps

### 1. Install the module

Install the Web3-Onboard MetaMask module into your dapp:

```bash
npm i @web3-onboard/metamask
```

### 2. Import the module

In your project script, add the following to import the module:

```javascript
import metamaskSDK from "@web3-onboard/metamask"
```

### 3. Instantiate the module

Instantiate the module using any [JavaScript SDK options](../../../reference/sdk-js-options.md), for
example, [`dappMetadata`](../../../reference/sdk-js-options.md#dappmetadata):

```javascript
const metamaskSDKWallet = metamaskSDK({
  options: {
    extensionOnly: false,
    dappMetadata: {
      name: "Example Web3-Onboard Dapp",
    },
  },
})
```

### 4. Use the module

Use the module as follows:

```javascript
const onboard = Onboard({
  // Other Onboard options.
  wallets: [
    metamaskSDKWallet,
    // Other wallets.
  ],
})

const connectedWallets = await onboard.connectWallet()
console.log(connectedWallets)
```

## Example

For an example of using Web3-Onboard with MetaMask SDK, see the
[example dapp](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/with-web3onboard)
in the JavaScript SDK GitHub repository.
See the [`App.tsx`](https://github.com/MetaMask/metamask-sdk/blob/main/packages/examples/with-web3onboard/src/App.tsx)
file for more details on implementing the integration in a React dapp.
