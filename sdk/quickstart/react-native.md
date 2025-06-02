---
description: Quickstart guide for using the SDK with a React Native dapp.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# React Native

Get started with MetaMask SDK in your React Native or Expo dapp.

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

### 2. Install dependencies

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

### 3. Configure Metro

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

### 4. Add required imports

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

### 5. Build and run

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
# Prebuild first
npx expo prebuild

# Then run
npx expo run:android
npx expo run:ios
```

  </TabItem>
</Tabs>

### 6. Use the SDK

Initialize and use the SDK in your React Native or Expo project using the `useSDK` hook.
For example:

```javascript
import { useSDK } from "@metamask/sdk-react"

function App() {
  const { connect, disconnect, account, chainId, ethereum } = useSDK()

  // Connect to MetaMask
  const connectWallet = async () => {
    try {
      await connect()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  // Handle state changes
  useEffect(() => {
    if (account && chainId) {
      // Handle account and network changes
    }
  }, [account, chainId])

  // Disconnect wallet
  const disconnectWallet = async () => {
    await disconnect()
  }

  return (
    // Your app UI
  )
}
```

## Examples

See the [React Native demo](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/reactNativeDemo) on GitHub for more information.
- Expo Demo is currently unavailable. 
