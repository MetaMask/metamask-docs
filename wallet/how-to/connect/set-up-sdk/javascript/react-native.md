---
sidebar_label: Expo and React Native
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Use MetaMask SDK with Expo and React Native

Import [MetaMask SDK](../../../../concepts/sdk/index.md) into your Expo or React Native dapp to
enable your users to easily connect to the MetaMask browser extension and MetaMask Mobile.

## Prerequisites

- [MetaMask Mobile](https://github.com/MetaMask/metamask-mobile) version 5.8.1 or above
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Steps

### 1. Create a new Expo or React project

<Tabs>
  <TabItem value="Expo">

  ```bash
  npx create-expo-app devexpo --template
  ```

  </TabItem>
  <TabItem value="React Native">

  ```bash
  npx react-native@latest init MyProject
  ```

  </TabItem>
</Tabs>

### 2. Install the SDK and its dependencies

<Tabs>
  <TabItem value="Expo">

  ```bash
  npx expo install expo-crypto @metamask/sdk-react ethers@5.7.2 @react-native-async-storage/async-storage node-libs-expo react-native-background-timer react-native-randombytes react-native-url-polyfill react-native-get-random-values@1.8.0
  ```

  </TabItem>
  <TabItem value="React Native">

  ```bash
  npm install eciesjs @metamask/sdk-react ethers@5.7.2 @react-native-async-storage/async-storage node-libs-react-native react-native-background-timer react-native-randombytes react-native-url-polyfill react-native-get-random-values
  ```

  </TabItem>
</Tabs>

### 3. Update the Metro configuration file

In Expo, run the following command to create a default Metro configuration file:

```bash
npx expo customize metro.config.js
```

In Expo and React Native, update the default Metro configuration file to the following:

<Tabs>
  <TabItem value="Expo">

  ```javascript title="metro.config.js"
  const config = getDefaultConfig(__dirname);

  config.resolver.extraNodeModules = {
    ...require("node-libs-expo"),
  };

  config.transformer.getTransformOptions = async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  });

  module.exports = config;
  ```

  </TabItem>
  <TabItem value="React Native">

  ```javascript title="metro.config.js"
  const {
    getDefaultConfig,
    mergeConfig,
  } = require("@react-native/metro-config");

  const defaultConfig = getDefaultConfig(__dirname);

  const config = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: true,
        },
      }),
    },
    resolver: {
      extraNodeModules: {
        ...require("node-libs-react-native"),
      },
    },
  };

  module.exports = mergeConfig(defaultConfig, config);
  ```

  </TabItem>
</Tabs>

### 4. Add import statements to the entry file

<Tabs>
  <TabItem value="Expo">

  ```javascript title="App.tsx"
  import "node-libs-expo/globals";
  import "react-native-url-polyfill/auto";
  import "react-native-get-random-values";
  ```

  </TabItem>
  <TabItem value="React Native">

  ```javascript title="index.js or App.tsx"
  import "node-libs-react-native/globals";
  import "react-native-url-polyfill/auto";
  import "react-native-get-random-values";
  ```

  </TabItem>
</Tabs>

### 5. (Expo only) Prebuild the project

```bash
npx expo prebuild
```

### 6. Run the project

<Tabs>
  <TabItem value="Expo">

  ```bash
  npx expo run:android
  npx expo run:ios
  ```

  </TabItem>
  <TabItem value="React Native">

  ```bash
  npx react-native run-android
  npx react-native run-ios
  ```

  </TabItem>
</Tabs>

### 7. Use the SDK

Initialize and use the SDK in your Expo or React Native project using the `useSDK` hook.
The following code snippets demonstrate how to use the hook.

Import the hook:

```javascript
import { useSDK } from "@metamask/sdk-react";
```

Initialize the SDK in your main component:

```javascript
const { connect, disconnect, account, chainId, ethereum } = useSDK();
```

Connect to MetaMask:

```javascript
const connectWallet = async () => {
  try {
    await connect();
  } catch (error) {
    console.error("Failed to connect wallet:", error);
  }
};
```

Handle your dapp's state:

```javascript
useEffect(() => {
  // Use the 'account' and 'chainId' returned by 'useSDK'
  if (account && chainId) {
    // Handle account and network changes
  }
}, [account, chainId]);
```

Disconnect from MetaMask:

```javascript
const disconnectWallet = async () => {
  await disconnect();
};
```

## Examples

See the [example Expo dapp](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/expo-demo)
and the [example React Native dapp](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/reactNativeDemo)
in the JavaScript SDK GitHub repository for more detailed implementations.
