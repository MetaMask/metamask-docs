---
sidebar_label: React Native
sidebar_position: 3
description: Set up the SDK in your React Native dapp.
tags:
  - JavaScript SDK
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Use MetaMask SDK with React Native

Import MetaMask SDK into your React Native or Expo dapp to
enable your users to easily connect to the MetaMask browser extension and MetaMask Mobile.

## Prerequisites

- [MetaMask Mobile](https://github.com/MetaMask/metamask-mobile) version 5.8.1 or later
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Steps

### 1. Create a new project

Create a new React Native or Expo project using the following commands:

<Tabs>
  <TabItem value="React Native">

```bash
npx react-native@latest init MyProject
```

  </TabItem>
  <TabItem value="Expo">

```bash
npx create-expo-app devexpo --template
```

  </TabItem>
</Tabs>

### 2. Install the SDK

Install the SDK and its dependencies using the following commands:

<Tabs>
  <TabItem value="React Native">

```bash
npm install eciesjs @metamask/sdk-react ethers@5.7.2 @react-native-async-storage/async-storage node-libs-react-native react-native-background-timer react-native-randombytes react-native-url-polyfill react-native-get-random-values
```

  </TabItem>
  <TabItem value="Expo">

```bash
npx expo install expo-crypto @metamask/sdk-react ethers@5.7.2 @react-native-async-storage/async-storage node-libs-expo react-native-background-timer react-native-randombytes react-native-url-polyfill react-native-get-random-values@1.8.0
```

  </TabItem>
</Tabs>

### 3. Update the configuration file

If you're using Expo, run the following command to create a default Metro configuration file:

```bash
npx expo customize metro.config.js
```

In React Native or Expo, update the default Metro configuration file to the following:

<Tabs>
  <TabItem value="React Native">

```javascript title="metro.config.js"
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config")

const defaultConfig = getDefaultConfig(__dirname)

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
}

module.exports = mergeConfig(defaultConfig, config)
```

  </TabItem>
  <TabItem value="Expo">

```javascript title="metro.config.js"
const config = getDefaultConfig(__dirname)

config.resolver.extraNodeModules = {
  ...require("node-libs-expo"),
}

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: false,
    inlineRequires: true,
  },
})

module.exports = config
```

  </TabItem>
</Tabs>

### 4. Add import statements

Add the following import statements to the React Native or Expo entry file:

<Tabs>
  <TabItem value="React Native">

```javascript title="index.js or App.tsx"
import "node-libs-react-native/globals"
import "react-native-url-polyfill/auto"
import "react-native-get-random-values"
```

  </TabItem>
  <TabItem value="Expo">

```javascript title="App.tsx"
import "node-libs-expo/globals"
import "react-native-url-polyfill/auto"
import "react-native-get-random-values"
```

  </TabItem>
</Tabs>

### 5. Prebuild the project

If you're using Expo, prebuild the project using the following command:

```bash
npx expo prebuild
```

React Native doesn't require prebuilding.

### 6. Run the project

Run the React Native or Expo project on Android or iOS using the following commands:

<Tabs>
  <TabItem value="React Native">

```bash
npx react-native run-android
npx react-native run-ios
```

  </TabItem>
  <TabItem value="Expo">

```bash
npx expo run:android
npx expo run:ios
```

  </TabItem>
</Tabs>

### 7. Use the SDK

Initialize and use the SDK in your React Native or Expo project using the `useSDK` hook.
The following code snippets demonstrate how to use the hook.

Import the hook:

```javascript
import { useSDK } from "@metamask/sdk-react"
```

Initialize the SDK in your main component:

```javascript
const { connect, disconnect, account, chainId, ethereum } = useSDK()
```

Connect to MetaMask:

```javascript
const connectWallet = async () => {
  try {
    await connect()
  } catch (error) {
    console.error("Failed to connect wallet:", error)
  }
}
```

Handle your dapp's state:

```javascript
useEffect(() => {
  // Use the account and chainId returned by useSDK.
  if (account && chainId) {
    // Handle account and network changes.
  }
}, [account, chainId])
```

Disconnect from MetaMask:

```javascript
const disconnectWallet = async () => {
  await disconnect()
}
```

## Examples

See the [example React Native dapp](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/reactNativeDemo)
and the [example Expo dapp](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/expo-demo)
in the JavaScript SDK GitHub repository for more detailed implementations.
