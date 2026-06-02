---
title: 'React Native Quickstart - MetaMask Connect Multichain'
description: Set up MetaMask Connect Multichain in a React Native or Expo app to connect to EVM and Solana simultaneously with polyfills, metro configuration, and mobile deeplink support.
sidebar_label: React Native
keywords:
  [
    connect,
    MetaMask,
    React,
    Native,
    multichain,
    SDK,
    dapp,
    mobile dapp,
    EVM,
    Solana,
    polyfills,
    metro config,
    CAIP-25,
    invokeMethod,
  ]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Multichain React Native quickstart

Get started with MetaMask Connect Multichain in your React Native or Expo dapp.
Connect to EVM and Solana networks simultaneously through a single session.

## Steps

### 1. Create a new project

Create a new React Native or Expo project:

<Tabs>
  <TabItem value="React Native">

```bash
npx react-native@latest init MyMultichainProject
```

  </TabItem>
  <TabItem value="Expo">

```bash
npx create-expo-app MyMultichainProject --template
```

  </TabItem>
</Tabs>

### 2. Install dependencies

Install MetaMask Connect Multichain and required polyfill packages:

```bash
npm install @metamask/connect-multichain react-native-get-random-values buffer @react-native-async-storage/async-storage readable-stream
```

For Solana transaction building (optional):

```bash
npm install @solana/web3.js
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

### 6. Use MetaMask Connect Multichain

Initialize the multichain client using [`createMultichainClient`](../reference/methods.md#createmultichainclient).
`mobile.preferredOpenLink` is required; it tells MetaMask Connect how to open deeplinks to the MetaMask
Mobile app.
Connect to both EVM and Solana networks in a single session using [`connect`](../reference/methods.md#connect):

```tsx
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Alert, Linking, ScrollView } from 'react-native'
import { createMultichainClient, getInfuraRpcUrls } from '@metamask/connect-multichain'

const ETH_MAINNET = 'eip155:1'
const POLYGON = 'eip155:137'
const SOLANA_MAINNET = 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'

let clientPromise = null

function getClient() {
  if (!clientPromise) {
    clientPromise = createMultichainClient({
      dapp: {
        name: 'My Multichain RN Dapp',
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
  const [session, setSession] = useState(null)
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    let mounted = true

    async function init() {
      const client = await getClient()
      if (!mounted) return
      clientRef.current = client

      client.on('wallet_sessionChanged', newSession => {
        if (mounted) setSession(newSession)
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
      await client.connect([ETH_MAINNET, POLYGON, SOLANA_MAINNET], [])
      const newSession = await client.provider.getSession()
      setSession(newSession)
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

  const handleGetBalance = useCallback(async () => {
    const client = clientRef.current
    if (!client || !session) return

    const ethAccounts = session.sessionScopes?.[ETH_MAINNET]?.accounts ?? []
    if (ethAccounts.length === 0) return

    try {
      const address = ethAccounts[0].split(':').pop()
      const balance = await client.invokeMethod({
        scope: ETH_MAINNET,
        request: {
          method: 'eth_getBalance',
          params: [address, 'latest'],
        },
      })
      const ethBalance = (parseInt(balance, 16) / 1e18).toFixed(6)
      Alert.alert('ETH Balance', `${ethBalance} ETH`)
    } catch (err) {
      Alert.alert('Error', err.message)
    }
  }, [session])

  const handleSignSolana = useCallback(async () => {
    const client = clientRef.current
    if (!client || !session) return

    const solAccounts = session.sessionScopes?.[SOLANA_MAINNET]?.accounts ?? []
    if (solAccounts.length === 0) return

    try {
      const pubkey = solAccounts[0].split(':').pop()
      const message = Buffer.from('Hello from Multichain RN!').toString('base64')
      const result = await client.invokeMethod({
        scope: SOLANA_MAINNET,
        request: {
          method: 'solana_signMessage',
          params: { message, pubkey },
        },
      })
      Alert.alert('Signed', result.signature.slice(0, 40) + '...')
    } catch (err) {
      Alert.alert('Sign failed', err.message)
    }
  }, [session])

  const handleDisconnect = useCallback(async () => {
    const client = clientRef.current
    if (!client) return
    await client.disconnect()
    setSession(null)
  }, [])

  const scopes = Object.keys(session?.sessionScopes ?? {})
  const isConnected = scopes.length > 0

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!isConnected ? (
        <TouchableOpacity style={styles.button} onPress={handleConnect} disabled={connecting}>
          <Text style={styles.buttonText}>
            {connecting ? 'Connecting...' : 'Connect (EVM + Solana)'}
          </Text>
        </TouchableOpacity>
      ) : (
        <View>
          <Text style={styles.heading}>Connected Scopes</Text>
          {scopes.map(scope => {
            const accs = session.sessionScopes[scope]?.accounts ?? []
            return (
              <View key={scope} style={styles.scopeCard}>
                <Text style={styles.scopeLabel}>{scope}</Text>
                {accs.map(acc => (
                  <Text key={acc} style={styles.label}>
                    {acc.split(':').pop()}
                  </Text>
                ))}
              </View>
            )
          })}
          <TouchableOpacity style={styles.button} onPress={handleGetBalance}>
            <Text style={styles.buttonText}>Get ETH Balance</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignSolana}>
            <Text style={styles.buttonText}>Sign Solana Message</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDisconnect}>
            <Text style={styles.buttonText}>Disconnect All</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  scopeCard: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    width: '100%',
  },
  scopeLabel: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  button: {
    backgroundColor: '#037DD6',
    padding: 14,
    borderRadius: 8,
    marginVertical: 8,
    width: '100%',
  },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  label: { fontSize: 12, color: '#555' },
})
```

### 7. iOS configuration

Add the `metamask` URL scheme to your `Info.plist` so the app can open the MetaMask mobile app:

```xml title="ios/MyMultichainProject/Info.plist"
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

## Multichain client methods at a glance

| Method                                                                     | Description                                                           |
| -------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| [`connect(scopes, caipAccountIds)`](../reference/methods.md#connect)       | Connects to MetaMask with multichain [scopes](../concepts/scopes.md). |
| [`getSession`](../reference/methods.md#getsession)                         | Returns the current session with approved accounts.                   |
| [`invokeMethod({ scope, request })`](../reference/methods.md#invokemethod) | Calls an RPC method on a specific chain.                              |
| [`disconnect`](../reference/methods.md#disconnect)                         | Disconnects all scopes and ends the session.                          |
| [`disconnect(scopes)`](../reference/methods.md#disconnect)                 | Disconnects specific scopes without ending the session.               |
| [`on(event, handler)`](../reference/methods.md#on)                         | Registers an event handler.                                           |

## Next steps

- Understand [scopes](../concepts/scopes.md), [accounts](../concepts/accounts.md), and [sessions](../concepts/sessions.md).
- [Sign multichain transactions.](../guides/sign-transactions.md)
- [Send multichain transactions.](../guides/send-transactions.md)
- Follow the [Create a multichain dapp tutorial](../tutorials/create-multichain-dapp.md).
- [Troubleshoot bundler polyfill issues.](../../troubleshooting/metro-polyfill-issues.md)
