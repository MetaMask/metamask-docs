---
sidebar_label: React
sidebar_position: 1
description: Get started with MetaMask SDK using React.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Get started using React

Import MetaMask SDK into your React dapp to enable your users to
easily connect to the MetaMask browser extension and MetaMask Mobile.
The SDK for React has the [same prerequisites](../index.md#prerequisites) as for standard JavaScript.

:::info React UI
This page provides instructions for using the standard `@metamask/sdk-react` package.
Alternatively, you can use the [`@metamask/sdk-react-ui`](react-ui.md) package to easily use
[wagmi](https://wagmi.sh/) hooks and a pre-styled UI button component for connecting to MetaMask.
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

```typescript title="index.tsx"
import { MetaMaskProvider } from "@metamask/sdk-react"
```

### 3. Wrap your project with `MetaMaskProvider`

Wrap your root component in a `MetaMaskProvider`.
For example:

```typescript title="index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MetaMaskProvider } from "@metamask/sdk-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Example React Dapp",
          url: window.location.href,
        },
        infuraAPIKey: process.env.INFURA_API_KEY,
        // Other options.
      }}
    >
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
```

When initializing `MetaMaskProvider`, set `debug` to `true` to activate debug mode.
For the full list of options you can set for `sdkOptions`, see the
[JavaScript SDK options reference](../../../reference/js-options.md).
Important options include:

- [`dappMetadata`](../../../reference/js-options.md#dappmetadata) - Use this to display information
  about your dapp in the MetaMask connection modal.
- [`infuraAPIKey`](../../../reference/js-options.md#infuraapikey) - Use this to
  [make read-only RPC requests](../../../how-to/javascript/make-read-only-requests.md) from your dapp.
- [`modals`](../../../reference/js-options.md#modals) - Use this to [customize the logic and UI of
  the displayed modals](../../../how-to/javascript/display-custom-modals.md).

### 4. Use the SDK

Use the SDK by using the `useSDK` hook in your React components.
For example:

```typescript title="App.tsx"
import { useSDK } from "@metamask/sdk-react";
import React, { useState } from "react";

export const App = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
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

The `connect` method initiates a connection to MetaMask and returns an array of connected accounts.

You can also [use the `connectAndSign` method](../../../how-to/javascript/connect-and-sign.md) to
connect to MetaMask and sign data in a single interaction:

```js
const connectAndSign = async () => {
  try {
    const signResult = await sdk?.connectAndSign({
      msg: "Connect + Sign message",
    })
    setResponse(signResult)
  } catch (err) {
    console.warn("failed to connect..", err)
  }
}
```

You can also [batch multiple JSON-RPC requests](../../../how-to/javascript/batch-json-rpc-requests.md) using the
`metamask_batch` method.

## Example

You can copy the full React example to get started:

<Tabs>
<TabItem value="Root component">

```javascript title="index.tsx"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MetaMaskProvider } from "@metamask/sdk-react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MetaMaskProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Example React Dapp",
          url: window.location.href,
        },
        infuraAPIKey: process.env.INFURA_API_KEY,
        // Other options
      }}
    >
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
```

</TabItem>
<TabItem value="React component">

```javascript title="App.tsx"
import { useSDK } from "@metamask/sdk-react";
import React from "react";

export const App = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("failed to connect..", err);
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
            {chainId && "Connected chain: ${chainId}"}
            <p></p>
            {account && "Connected account: ${account}"}
          </>
        </div>
      )}
    </div>
  );
};
```

</TabItem>
</Tabs>

See the [example React dapp](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/create-react-app)
in the JavaScript SDK GitHub repository for more information.
