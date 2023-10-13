---
sidebar_label: React UI
sidebar_position: 1
---

# Use MetaMask SDK with React UI

You can import [MetaMask SDK](../../../../../concepts/sdk/index.md) into your React dapp to enable your
users to easily connect to the MetaMask browser extension and MetaMask Mobile.
The `@metamask/sdk-react-ui` package not only exports hooks from [`@metamask/sdk-react`](index.md),
but also provides wrappers around [wagmi](https://wagmi.sh/) hooks and a basic UI button component
for connecting to MetaMask.

By combining the functions of `@metamask/sdk-react` and `@metamask/sdk-react-ui`, you can use both
the core functionality and the pre-styled UI components to streamline the integration of MetaMask
into your React dapp.

The SDK for React has the [same prerequisites](../index.md#prerequisites) as for standard JavaScript.

:::tip Examples
See the [MetaMask JavaScript SDK examples](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples)
for advanced use cases.
:::

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

```javascript
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';
```

### 3. Wrap your project with MetaMaskUIProvider

Wrap your root component in a `MetaMaskUIProvider`.
For example:

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MetaMaskUIProvider sdkOptions={{
      dappMetadata: {
        name: "Demo UI React App",
      }
    }}>
      <App />
    </MetaMaskUIProvider>
  </React.StrictMode>
);
```

For the full list of options you can set for `sdkOptions`, see the
[JavaScript SDK options reference](../../../../../reference/sdk-js-options.md).

:::note Important SDK options
- Use [`dappMetadata`](../../../../reference/sdk-js-options.md#dappmetadata) to display information
  about your dapp in the MetaMask connection modal.
- Use [`modals`](../../../../reference/sdk-js-options.md#modals) to customize the logic and UI of
  the displayed modals.
- Use [`infuraAPIKey`](../../../../reference/sdk-js-options.md#infuraapikey) to
  [make read-only RPC requests](../../../use-3rd-party-integrations/js-infura-api.md) from your dapp.
:::

### 4. Use the SDK

Use the SDK by using the `useSDK` hook in your React components.
See the [instructions for `@metamask/sdk-react`](index.md#4-use-the-sdk).

### 5. Use the MetaMaskButton component

The `@metamask/sdk-react-ui` package provides a pre-styled button, `MetaMaskButton`, to initiate a
connection to MetaMask.
You can use it as follows:

```js
import { MetaMaskButton } from "@metamask/sdk-react-ui";
import React, { useState } from "react";

export const App = () => {
  return (
    <div className="App">
      <MetaMaskButton theme={"light"} color="white"></MetaMaskButton>
    </div>
  );
};
```

<details>
<summary>MetaMaskButton properties</summary>
<p>

- `theme`: Set to `light` or `dark` to adapt to your dapp's theme.
- `color`: The color of the button. Accepts any valid CSS color string.

</p>
</details>

Refer to the [MetaMask JavaScript SDK examples](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples)
for advanced use cases.
