---
description: React Native
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# React Native

This guide covers setting up MetaMask SDK in your React Native or Expo application. With MetaMask SDK, you can enable your users to easily connect to the MetaMask browser extension and MetaMask Mobile.

### Prerequisites

- MetaMask Mobile v5.8.1+
- npm installed

### Create Project

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

### Install Dependencies

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

### Configure Metro

For Expo, first generate the config:
```bash
npx expo customize metro.config.js
```

Update your Metro configuration:

<Tabs>
  <TabItem value="React Native">

```javascript
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

```javascript
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

### Add Required Imports

<Tabs>
  <TabItem value="React Native">

```javascript
// index.js or App.tsx
import "node-libs-react-native/globals"
import "react-native-url-polyfill/auto"
import "react-native-get-random-values"
```

  </TabItem>
  <TabItem value="Expo">

```javascript
// App.tsx
import "node-libs-expo/globals"
import "react-native-url-polyfill/auto"
import "react-native-get-random-values"
```

  </TabItem>
</Tabs>

### Build & Run

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

### Using the SDK

Here's how to integrate MetaMask SDK in your app:

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

### Example Projects

- [React Native Demo](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/reactNativeDemo)
- [Expo Demo](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/expo-demo)