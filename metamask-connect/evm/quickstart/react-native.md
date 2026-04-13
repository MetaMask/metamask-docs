---
title: 'React Native Quickstart - MetaMask Connect EVM'
description: Set up MetaMask Connect EVM in a React Native or Expo app with required polyfills, metro configuration, and mobile deeplink support.
sidebar_label: React Native
keywords:
  [
    connect,
    MetaMask,
    React,
    Native,
    SDK,
    dapp,
    react native wallet,
    mobile dapp,
    polyfills,
    metro config,
    mobile deeplinks,
    iOS,
    Android,
  ]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Connect to EVM - React Native quickstart

Get started with MetaMask Connect EVM in your React Native or Expo dapp.

## Steps

### 1. Create a new project

Create a new React Native or Expo project:

<Tabs>
  <TabItem value="React Native">

```bash
npx react-native@latest init MyProject
```

  </TabItem>
  <TabItem value="Expo">

```bash
npx create-expo-app MyProject --template
```

  </TabItem>
</Tabs>

### 2. Install dependencies

Install MetaMask Connect EVM and its required polyfill packages:

```bash
npm install @metamask/connect-evm react-native-get-random-values buffer @react-native-async-storage/async-storage readable-stream
```

### 3. Create polyfills

Create `polyfills.ts` (at the project root or in `src/`) with all required global shims.
This file must be imported before any SDK code:

```typescript title="polyfills.ts"
import { Buffer } from 'buffer'

global.Buffer = Buffer

// Polyfill window object — React Native doesn't have one
let windowObj: any
if (typeof global !== 'undefined' && global.window) {
  windowObj = global.window
} else if (typeof window !== 'undefined') {
  windowObj = window
} else {
  windowObj = {}
}

if (!windowObj.location) {
  windowObj.location = {
    hostname: 'mydapp.com',
    href: 'https://mydapp.com',
  }
}
if (typeof windowObj.addEventListener !== 'function') {
  windowObj.addEventListener = () => {}
}
if (typeof windowObj.removeEventListener !== 'function') {
  windowObj.removeEventListener = () => {}
}
if (typeof windowObj.dispatchEvent !== 'function') {
  windowObj.dispatchEvent = () => true
}

if (typeof global !== 'undefined') {
  global.window = windowObj
}

// Polyfill Event if missing
if (typeof global.Event === 'undefined') {
  class EventPolyfill {
    type: string
    bubbles: boolean
    cancelable: boolean
    defaultPrevented = false
    constructor(type: string, options?: EventInit) {
      this.type = type
      this.bubbles = options?.bubbles ?? false
      this.cancelable = options?.cancelable ?? false
    }
    preventDefault() {
      this.defaultPrevented = true
    }
    stopPropagation() {}
    stopImmediatePropagation() {}
  }
  global.Event = EventPolyfill as any
  windowObj.Event = EventPolyfill as any
}

// Polyfill CustomEvent if missing
if (typeof global.CustomEvent === 'undefined') {
  const EventClass =
    global.Event ||
    class {
      type: string
      constructor(type: string) {
        this.type = type
      }
    }
  class CustomEventPolyfill extends (EventClass as any) {
    detail: any
    constructor(type: string, options?: CustomEventInit) {
      super(type, options)
      this.detail = options?.detail ?? null
    }
  }
  global.CustomEvent = CustomEventPolyfill as any
  windowObj.CustomEvent = CustomEventPolyfill as any
}
```

:::tip
For detailed troubleshooting of polyfill issues, see [React Native Metro polyfill issues](../../troubleshooting/metro-polyfill-issues.md).
:::

Create the empty module stub used by the Metro config:

```javascript title="src/empty-module.js"
module.exports = {}
```

### 4. Configure Metro

Metro cannot resolve Node.js built-in modules.
Map them to React Native-compatible shims or the empty module stub:

<Tabs>
  <TabItem value="React Native">

```javascript title="metro.config.js"
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config')
const path = require('path')

const emptyModule = path.resolve(__dirname, 'src/empty-module.js')

const config = {
  resolver: {
    extraNodeModules: {
      stream: require.resolve('readable-stream'),
      crypto: emptyModule,
      http: emptyModule,
      https: emptyModule,
      net: emptyModule,
      tls: emptyModule,
      zlib: emptyModule,
      os: emptyModule,
      dns: emptyModule,
      assert: emptyModule,
      url: emptyModule,
      path: emptyModule,
      fs: emptyModule,
    },
  },
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config)
```

  </TabItem>
  <TabItem value="Expo">

Run `npx expo customize metro.config.js` to create a default config, then update it:

```javascript title="metro.config.js"
const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

const config = getDefaultConfig(__dirname)
const emptyModule = path.resolve(__dirname, 'src/empty-module.js')

config.resolver.extraNodeModules = {
  stream: require.resolve('readable-stream'),
  crypto: emptyModule,
  http: emptyModule,
  https: emptyModule,
  net: emptyModule,
  tls: emptyModule,
  zlib: emptyModule,
  os: emptyModule,
  dns: emptyModule,
  assert: emptyModule,
  url: emptyModule,
  path: emptyModule,
  fs: emptyModule,
}

module.exports = config
```

  </TabItem>
</Tabs>

### 5. Set up the entry file

The import order is critical.
`react-native-get-random-values` **must** be the very first import, followed by the polyfills file,
before any other code:

```javascript title="index.js or App.tsx (Bare RN) / app/_layout.tsx (Expo Router)"
import 'react-native-get-random-values'
import './polyfills'
```

:::caution
If you import anything from `@metamask/connect-evm` before `react-native-get-random-values`,
you will get `crypto.getRandomValues is not a function`.
:::

### 6. Use MetaMask Connect EVM

Initialize the EVM client and use it to connect, sign, and send transactions.
`mobile.preferredOpenLink` is **required**; it tells MetaMask Connect how to open deeplinks to the MetaMask
Mobile app:

```tsx
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native'
import { createEVMClient } from '@metamask/connect-evm'

let clientPromise = null

function getClient() {
  if (!clientPromise) {
    clientPromise = createEVMClient({
      dapp: {
        name: 'My RN DApp',
        url: 'https://mydapp.com',
      },
      api: {
        supportedNetworks: {
          '0x1': 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
          '0xaa36a7': 'https://sepolia.infura.io/v3/YOUR_INFURA_API_KEY',
        },
      },
      ui: {
        preferExtension: false,
      },
      mobile: {
        preferredOpenLink: deeplink => Linking.openURL(deeplink),
      },
    })
  }
  return clientPromise
}

export default function App() {
  const clientRef = useRef(null)
  const [accounts, setAccounts] = useState([])
  const [chainId, setChainId] = useState(null)
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    let mounted = true

    async function init() {
      const client = await getClient()
      if (!mounted) return
      clientRef.current = client

      const provider = client.getProvider()
      provider.on('accountsChanged', accs => {
        if (mounted) setAccounts(accs)
      })
      provider.on('chainChanged', id => {
        if (mounted) setChainId(id)
      })
      provider.on('disconnect', () => {
        if (mounted) {
          setAccounts([])
          setChainId(null)
        }
      })
    }

    init()
    return () => {
      mounted = false
    }
  }, [])

  const handleConnect = useCallback(async () => {
    const client = clientRef.current
    if (!client) return

    setConnecting(true)
    try {
      const result = await client.connect({ chainIds: ['0x1'] })
      setAccounts(result.accounts)
      setChainId(result.chainId)
    } catch (err) {
      if (err.code === 4001) {
        Alert.alert('Rejected', 'Connection was rejected.')
        return
      }
      if (err.code === -32002) {
        Alert.alert('Pending', 'Check MetaMask to approve the request.')
        return
      }
      Alert.alert('Error', err.message ?? 'Connection failed')
    } finally {
      setConnecting(false)
    }
  }, [])

  const handleDisconnect = useCallback(async () => {
    const client = clientRef.current
    if (!client) return
    await client.disconnect()
    setAccounts([])
    setChainId(null)
  }, [])

  const isConnected = accounts.length > 0

  return (
    <View style={styles.container}>
      {!isConnected ? (
        <TouchableOpacity style={styles.button} onPress={handleConnect} disabled={connecting}>
          <Text style={styles.buttonText}>{connecting ? 'Connecting...' : 'Connect MetaMask'}</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Text style={styles.label}>Account: {accounts[0]}</Text>
          <Text style={styles.label}>Chain: {chainId}</Text>
          <TouchableOpacity style={styles.button} onPress={handleDisconnect}>
            <Text style={styles.buttonText}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  button: { backgroundColor: '#037DD6', padding: 14, borderRadius: 8, marginVertical: 8 },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  label: { fontSize: 14, marginVertical: 4 },
})
```

### 7. iOS configuration

Add the `metamask` URL scheme to your `Info.plist` so the app can open the MetaMask mobile app:

```xml title="ios/MyProject/Info.plist"
<key>LSApplicationQueriesSchemes</key>
<array>
  <string>metamask</string>
</array>
```

### 8. Build and run

<Tabs>
  <TabItem value="React Native">

```bash
npx react-native run-android
npx react-native run-ios
```

  </TabItem>
  <TabItem value="Expo">

```bash
npx expo prebuild
npx expo run:android
npx expo run:ios
```

  </TabItem>
</Tabs>

## Next steps

- [Manage user accounts](../guides/manage-user-accounts.md)
- [Send transactions](../guides/send-transactions/index.md)
- [Sign data](../guides/sign-data/index.md)
- [Production readiness checklist](../guides/best-practices/production-readiness.md)
- [Troubleshoot bundler polyfill issues](../../troubleshooting/metro-polyfill-issues.md)
