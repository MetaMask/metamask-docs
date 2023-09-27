---
sidebar_label: React
sidebar_position: 1
---

# Use MetaMask SDK with React

You can import [MetaMask SDK](../../../../../concepts/sdk/index.md) into your React dapp to enable your users to
easily connect to the MetaMask browser extension and MetaMask Mobile.
The SDK for React has the [same prerequisites](../index.md#prerequisites) as for standard JavaScript.

:::info React UI
This page provides instructions for using the standard `@metamask/sdk-react` package.
Alternatively, you can use the [`@metamask/sdk-react-ui`](react-ui.md) package to easily use
[wagmi](https://wagmi.sh/) hooks and a pre-styled UI button component for connecting to MetaMask.
:::

:::tip Examples
See the [MetaMask JavaScript SDK examples](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples)
for advanced use cases.
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
      logging:{
          developerMode: false,
        },
        communicationServerUrl: process.env.REACT_APP_COMM_SERVER_URL,
        checkInstallationImmediately: false, // This will automatically connect to MetaMask on page load
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

When initializing `MetaMaskProvider`, setting `debug` to `true` activates debug mode.
For the full list of options you can set for `sdkOptions`, see the
[JavaScript SDK options reference](../../../../../reference/sdk-js-options.md).

### 4. Use the SDK

Use the SDK by using the `useSDK` hook in your React components.
For example:

```js
import { useSDK } from '@metamask/sdk-react';
import React, { useState } from 'react';

export const App = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch(err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <div className="App">
      <button style={{ padding: 10, margin: 10 }} onClick={connect}>
        Connect
      </button>
      {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )}
    </div>
  );
};
```

<details>
<summary>useSDK return values</summary>
<p>

- `sdk`: Main SDK object that facilitates connection and actions related to MetaMask.
- `connected`: Boolean value indicating if the dapp is connected to MetaMask.
- `connecting`: Boolean value indicating if a connection is in process.
- `provider`: The provider object which can be used for lower-level interactions with the Ethereum blockchain.
- `chainId`: Currently connected blockchain's chain ID.

</p>
</details>

The `sdk.connect()` method initiates a connection to MetaMask and returns an array of connected accounts:

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
