---
title: 'React Native Quickstart - MetaMask Connect Solana'
description: Set up MetaMask Connect Solana in a React Native or Expo app using the multichain client with polyfills, metro configuration, and mobile deeplink support.
sidebar_label: React Native
keywords:
  [
    connect,
    MetaMask,
    React,
    Native,
    Solana,
    SDK,
    dapp,
    mobile dapp,
    polyfills,
    metro config,
    mobile deeplinks,
    invokeMethod,
  ]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Connect to Solana - React Native quickstart

Get started with MetaMask Connect Solana in your React Native or Expo dapp.

:::info
`@solana/wallet-adapter-react` does not support React Native.
This guide uses `createMultichainClient` from `@metamask/connect-multichain` with `invokeMethod`
to call Solana RPC methods directly.
:::

## Steps

### 1. Create a new project

Create a new React Native or Expo project:

<Tabs>
  <TabItem value="React Native">

```bash
npx react-native@latest init MySolanaProject
```

  </TabItem>
  <TabItem value="Expo">

```bash
npx create-expo-app MySolanaProject --template
```

  </TabItem>
</Tabs>

### 2. Install dependencies

Install MetaMask Connect Multichain, Solana web3.js, and required polyfill packages:

```bash
npm install @metamask/connect-multichain @solana/web3.js react-native-get-random-values buffer @react-native-async-storage/async-storage readable-stream
```

### 3. Create polyfills

Create `polyfills.ts` (at the project root or in `src/`) with all required global shims.
This file must be imported before any SDK code:

```typescript title="polyfills.ts"
import { Buffer } from 'buffer'

global.Buffer = Buffer

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

Create the empty module stub used by the Metro config:

```javascript title="src/empty-module.js"
module.exports = {}
```

:::tip
For detailed troubleshooting of polyfill issues, see [React Native Metro polyfill issues](../../troubleshooting/metro-polyfill-issues.md).
:::

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
If you import anything from `@metamask/connect-multichain` before `react-native-get-random-values`,
you will get `crypto.getRandomValues is not a function`.
:::

### 6. Use MetaMask Connect with Solana

Initialize the multichain client using [`createMultichainClient`](../../multichain/reference/methods.md#createmultichainclient), and interact with Solana using [`invokeMethod`](../../multichain/reference/methods.md#invokemethod).
`mobile.preferredOpenLink` is required; it tells MetaMask Connect how to open deeplinks to the MetaMask
mobile app:

```tsx
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking } from 'react-native'
import { createMultichainClient, getInfuraRpcUrls } from '@metamask/connect-multichain'
import { Buffer } from 'buffer'

const SOLANA_MAINNET = 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'

let clientPromise = null

function getClient() {
  if (!clientPromise) {
    clientPromise = createMultichainClient({
      dapp: {
        name: 'My Solana RN Dapp',
        url: 'https://mydapp.com',
      },
      api: {
        supportedNetworks: getInfuraRpcUrls({
          infuraApiKey: 'YOUR_INFURA_API_KEY',
        }),
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
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    let mounted = true

    async function init() {
      const client = await getClient()
      if (!mounted) return
      clientRef.current = client

      client.on('wallet_sessionChanged', session => {
        if (!mounted) return
        const scopeData = session?.sessionScopes?.[SOLANA_MAINNET]
        const accs = scopeData?.accounts?.map(a => a.split(':').pop()) ?? []
        setAccounts(accs)
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
      await client.connect([SOLANA_MAINNET], [])
      const session = await client.provider.getSession()
      const scopeData = session?.sessionScopes?.[SOLANA_MAINNET]
      const accs = scopeData?.accounts?.map(a => a.split(':').pop()) ?? []
      setAccounts(accs)
    } catch (err) {
      if (err.code === 4001) {
        Alert.alert('Rejected', 'Connection was rejected.')
        return
      }
      Alert.alert('Error', err.message ?? 'Connection failed')
    } finally {
      setConnecting(false)
    }
  }, [])

  const handleSignMessage = useCallback(async () => {
    const client = clientRef.current
    if (!client || accounts.length === 0) return

    try {
      const message = Buffer.from('Hello from React Native!').toString('base64')
      const result = await client.invokeMethod({
        scope: SOLANA_MAINNET,
        request: {
          method: 'solana_signMessage',
          params: {
            message,
            pubkey: accounts[0],
          },
        },
      })
      Alert.alert('Signed', result.signature.slice(0, 40) + '...')
    } catch (err) {
      Alert.alert('Sign failed', err.message)
    }
  }, [accounts])

  const handleDisconnect = useCallback(async () => {
    const client = clientRef.current
    if (!client) return
    await client.disconnect([SOLANA_MAINNET])
    setAccounts([])
  }, [])

  const isConnected = accounts.length > 0

  return (
    <View style={styles.container}>
      {!isConnected ? (
        <TouchableOpacity style={styles.button} onPress={handleConnect} disabled={connecting}>
          <Text style={styles.buttonText}>
            {connecting ? 'Connecting...' : 'Connect MetaMask (Solana)'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Text style={styles.label}>Address: {accounts[0]}</Text>
          <TouchableOpacity style={styles.button} onPress={handleSignMessage}>
            <Text style={styles.buttonText}>Sign Message</Text>
          </TouchableOpacity>
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

```xml title="ios/MySolanaProject/Info.plist"
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

## Solana CAIP-2 scope reference

| Network | CAIP-2 scope                              |
| ------- | ----------------------------------------- |
| Mainnet | `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` |
| Devnet  | `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1` |

:::note
Devnet and testnet require [MetaMask Flask](https://metamask.io/flask/). Production MetaMask only supports Solana mainnet.
:::

## Next steps

- [Send a legacy Solana transaction.](../guides/send-transactions/legacy.md)
- [Send a versioned Solana transaction.](../guides/send-transactions/versioned.md)
- [Sign a Solana message.](../guides/sign-data/sign-message.md)
- [Troubleshoot bundler polyfill issues.](../../troubleshooting/metro-polyfill-issues.md)
