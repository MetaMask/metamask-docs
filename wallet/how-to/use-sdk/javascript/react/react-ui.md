---
sidebar_label: React UI
sidebar_position: 1
description: Set up the SDK in your React dapp using the React UI package.
tags:
  - JavaScript SDK
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Use MetaMask SDK with React UI

Import [MetaMask SDK](../../../../concepts/sdk/index.md) into your React dapp to enable your
users to easily connect to the MetaMask browser extension and MetaMask Mobile.
The `@metamask/sdk-react-ui` package not only exports hooks from [`@metamask/sdk-react`](index.md),
but also provides wrappers around [wagmi](https://wagmi.sh/) hooks and a basic UI button component
for connecting to MetaMask.

By combining the functions of `@metamask/sdk-react` and `@metamask/sdk-react-ui`, you can use both
the core functionality and the pre-styled UI components to streamline the integration of MetaMask
into your React dapp.

The SDK for React has the [same prerequisites](../index.md#prerequisites) as for standard JavaScript.

## Steps

### 1. Install the SDK

In your project directory, install the SDK using Yarn or npm:

```bash
yarn add @metamask/sdk-react-ui
```

or

```bash
npm i @metamask/sdk-react-ui
```

### 2. Import the SDK

In your project script, add the following to import the SDK:

```javascript title="index.js"
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui"
```

### 3. Wrap your project with `MetaMaskUIProvider`

Wrap your root component in a `MetaMaskUIProvider`.
For example:

```js title="index.js"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MetaMaskUIProvider
      sdkOptions={{
        dappMetadata: {
          name: "Example React UI Dapp",
          url: window.location.href,
        },
        infuraAPIKey: process.env.INFURA_API_KEY,
        // Other options.
      }}
    >
      <App />
    </MetaMaskUIProvider>
  </React.StrictMode>
);
```

For the full list of options you can set for `sdkOptions`, see the
[JavaScript SDK options reference](../../../../reference/sdk-js-options.md).
Important options include:

- [`dappMetadata`](../../../../reference/sdk-js-options.md#dappmetadata) - Use this to display information
  about your dapp in the MetaMask connection modal.
- [`infuraAPIKey`](../../../../reference/sdk-js-options.md#infuraapikey) - Use this to
  [make read-only RPC requests](../make-read-only-requests.md) from your dapp.
- [`modals`](../../../../reference/sdk-js-options.md#modals) - Use this to [customize the logic and UI of
  the displayed modals](../display-custom-modals.md).

### 4. Use the SDK

Use the SDK by using the `useSDK` hook in your React components.
See the [instructions for `@metamask/sdk-react`](index.md#4-use-the-sdk).

### 5. Use the `MetaMaskButton` component

The `@metamask/sdk-react-ui` package provides a pre-styled button, `MetaMaskButton`, to initiate a
connection to MetaMask.
You can use it as follows:

```js title="App.js"
import { MetaMaskButton } from "@metamask/sdk-react-ui"
import React, { useState } from "react"

export const App = () => {
  return (
    <div className="App">
      <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
    </div>
  )
}
```

<details>
<summary>MetaMaskButton properties</summary>
<p>

- `theme`: Set to `light` or `dark` to adapt to your dapp's theme.
- `color`: The color of the button. Accepts any valid CSS color string.

</p>
</details>

## Example

You can copy the full React UI example to get started:

<Tabs>
<TabItem value="Root component">

```javascript title="index.js"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MetaMaskUIProvider
      sdkOptions={{
        dappMetadata: {
          name: "Example React UI Dapp",
          url: window.location.href,
        },
        infuraAPIKey: process.env.INFURA_API_KEY,
        // Other options
      }}
    >
      <App />
    </MetaMaskUIProvider>
  </React.StrictMode>
);
```

</TabItem>
<TabItem value="React component">

```javascript title="App.js"
import {
  MetaMaskButton,
  useAccount,
  useSDK,
  useSignMessage,
} from "@metamask/sdk-react-ui"
import "./App.css"

function AppReady() {
  const {
    data: signData,
    isError: isSignError,
    isLoading: isSignLoading,
    isSuccess: isSignSuccess,
    signMessage,
  } = useSignMessage({
    message: "gm wagmi frens",
  })

  const { isConnected } = useAccount()

  return (
    <div className="App">
      <header className="App-header">
        <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
        {isConnected && (
          <>
            <div style={{ marginTop: 20 }}>
              <button disabled={isSignLoading} onClick={() => signMessage()}>
                Sign message
              </button>
              {isSignSuccess && <div>Signature: {signData}</div>}
              {isSignError && <div>Error signing message</div>}
            </div>
          </>
        )}
      </header>
    </div>
  )
}

function App() {
  const { ready } = useSDK()

  if (!ready) {
    return <div>Loading...</div>
  }

  return <AppReady />
}

export default App
```

</TabItem>
</Tabs>

See the [example React UI dapp](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/react-metamask-button)
in the JavaScript SDK GitHub repository for more information.
