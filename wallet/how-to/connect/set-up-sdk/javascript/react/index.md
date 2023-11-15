---
sidebar_label: React
sidebar_position: 1
---

# Use MetaMask SDK with React

Import [MetaMask SDK](../../../../../concepts/sdk/index.md) into your React dapp to enable your users to
easily connect to the MetaMask browser extension and MetaMask Mobile.
The SDK for React has the [same prerequisites](../index.md#prerequisites) as for standard JavaScript.

:::info React UI
This page provides instructions for using the standard `@metamask/sdk-react` package.
Alternatively, you can use the [`@metamask/sdk-react-ui`](react-ui.md) package to easily use
[wagmi](https://wagmi.sh/) hooks and a pre-styled UI button component for connecting to MetaMask.
:::

:::tip Examples
See the [example JavaScript dapps](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples)
in the JavaScript SDK GitHub repository for advanced use cases.
:::

## Steps

### 1. Install the SDK

In your project directory, install the SDK using Yarn or npm:

```bash
yarn add @metamask/sdk-react
```

or

```bash
npm i @metamask/sdk-react
```

### 2. Import the SDK

In your project script, add the following to import the SDK:

```javascript
import { MetaMaskProvider } from '@metamask/sdk-react';
```

### 3. Wrap your project with MetaMaskProvider

Wrap your root component in a `MetaMaskProvider`.
For example:

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MetaMaskProvider } from '@metamask/sdk-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MetaMaskProvider debug={false} sdkOptions={{
      checkInstallationImmediately: false,
      dappMetadata: {
        name: "Demo React App",
        url: window.location.host,
      }
    }}>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
```

When initializing `MetaMaskProvider`, set `debug` to `true` to activate debug mode.
For the full list of options you can set for `sdkOptions`, see the
[JavaScript SDK options reference](../../../../../reference/sdk-js-options.md).

:::note Important SDK options
- Use [`dappMetadata`](../../../../../reference/sdk-js-options.md#dappmetadata) to display information
  about your dapp in the MetaMask connection modal.
- Use [`modals`](../../../../../reference/sdk-js-options.md#modals) to [customize the logic and UI of
  the displayed modals](../../../../display/custom-modals.md).
- Use [`infuraAPIKey`](../../../../../reference/sdk-js-options.md#infuraapikey) to
  [make read-only RPC requests](../../../../use-3rd-party-integrations/js-infura-api.md) from your dapp.
:::

### 4. Use the SDK

Use the SDK by using the `useSDK` hook in your React components.
For example:

```js
import { useSDK } from '@metamask/sdk-react';
import React, { useState } from 'react';

export const App = () => {
  const { sdk } = useSDK();
  const [signedMessage, setSignedMessage] = useState("");

  const handleConnectAndSign = async () => {
    try {
      const message = "Your message here";
      const signature = await sdk.connectAndSign({ msg: message });
      setSignedMessage(signature);
    } catch (error) {
      console.error("Error in signing:", error);
    }
  };

  return (
    <div>
      <button onClick={handleConnectAndSign}>Connect and Sign</button>
      {signedMessage && <p>Signed Message: {signedMessage}</p>}
    </div>
  );
};
```

The [`connectAndSign` method](../../../../sign-data/connect-and-sign.md) initiates a connection to
MetaMask and requests the user to sign a message.
Alternatively, you can use the `connect` method to only initiate a connection to MetaMask and return
an array of connected accounts:

```javascript
const connect = async () => {
  try {
    const accounts = await sdk?.connect();
    setAccount(accounts?.[0]);
  } catch(err) {
    console.warn(`failed to connect..`, err);
  }
};
```

Refer to the [MetaMask JavaScript SDK examples](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples)
for advanced use cases.
