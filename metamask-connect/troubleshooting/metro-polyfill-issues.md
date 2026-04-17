---
title: React Native Metro Polyfill Issues - MetaMask Connect
description: Resolve Metro bundler polyfills, import order, and React Native issues such as deeplinks when using MetaMask Connect.
sidebar_label: React Native Metro polyfill issues
keywords:
  [
    MetaMask,
    Connect,
    polyfill,
    React Native,
    Metro,
    Expo,
    bundler,
    troubleshooting,
    Buffer,
    Event,
    CustomEvent,
    crypto,
    deeplink,
    preferredOpenLink,
  ]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# React Native Metro polyfill issues

React Native uses the Metro bundler, which cannot resolve Node.js built-in modules.
MetaMask Connect packages and their dependencies reference modules like `stream`, `crypto`, `buffer`, and `http`.
Some code paths expect a browser-like `window` object, which React Native does not provide.
MetaMask Connect uses `eventemitter3` internally and does not require DOM `Event` or `CustomEvent` globals; if you use **wagmi**, you may need to polyfill those separately.

This guide walks through the required polyfills, Metro configuration, and related React Native setup (including deeplinks to MetaMask Mobile).

:::info Expo-managed workflow
Polyfilling is not supported with the "Expo Go" app.
It is compatible only with Custom Dev Client and [Expo Application Services (EAS)](https://docs.expo.dev/eas/) builds.
[Prebuild your Expo app](https://docs.expo.dev/workflow/continuous-native-generation/#usage) to generate native code before proceeding.
:::

## Steps

### 1. Install required packages

```bash npm2yarn
npm install react-native-get-random-values buffer readable-stream @react-native-async-storage/async-storage
```

`react-native-get-random-values` provides `crypto.getRandomValues`, which MetaMask Connect requires.
`readable-stream` provides a `stream` shim for Metro.
`buffer` provides the `Buffer` global.
`@react-native-async-storage/async-storage` is needed for session persistence.

### 2. Configure Metro

Map Node.js built-in modules to React Native-compatible shims or an empty module stub.
Create an empty module file first:

```javascript title="src/empty-module.js"
module.exports = {}
```

Then update your Metro config:

<Tabs>
  <TabItem value="Bare React Native">

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

### 3. Create the polyfills file

Create `polyfills.ts` at the project root (or `src/polyfills.ts`) with the following global shims.

#### Base polyfills (MetaMask Connect)

These cover `Buffer`, `crypto.getRandomValues` (via your entry import), and a minimal `window` shim:

```typescript title="polyfills.ts"
import { Buffer } from 'buffer'

global.Buffer = Buffer

// Polyfill window — React Native doesn't have a browser window object
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
```

#### Optional wagmi polyfills for Event and CustomEvent

If you use **wagmi**, add the following to `polyfills.ts` after the `window` shim (React Native does not provide DOM `Event` or `CustomEvent`, which wagmi-related code may expect):

```typescript
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

## Step 4: Set up the entry file import order

The import order is **critical**.
`react-native-get-random-values` must be the very first import, followed by the polyfills file, before any SDK or application code:

<Tabs>
  <TabItem value="Bare React Native">

```javascript title="index.js"
import 'react-native-get-random-values' // Must be first
import './polyfills' // Must be second

import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

AppRegistry.registerComponent(appName, () => App)
```

  </TabItem>
  <TabItem value="Expo Router">

```javascript title="app/_layout.tsx"
import 'react-native-get-random-values' // Must be first
import '../polyfills' // Must be second

// ... rest of layout
```

  </TabItem>
</Tabs>

## Deeplinks not opening MetaMask app

If MetaMask Mobile does not open when your dapp initiates a connection, the `mobile.preferredOpenLink` callback is probably not set. Pass a function that calls `Linking.openURL`:

```typescript
import { Linking } from 'react-native'

const client = await createEVMClient({
  dapp: { name: 'My Dapp', url: 'https://mydapp.com' },
  mobile: {
    preferredOpenLink: deeplink => Linking.openURL(deeplink),
  },
})
```

Use the same `mobile.preferredOpenLink` pattern with [`createMultichainClient`](../multichain/reference/methods.md) or [`createSolanaClient`](../solana/reference/methods.md) when you initialize those clients in React Native.

## Common errors and solutions

### `crypto.getRandomValues is not a function`

**Cause**: `react-native-get-random-values` was not imported before MetaMask Connect.

**Fix**: Ensure `import 'react-native-get-random-values'` is the very first import in your entry file, before any MetaMask Connect imports or polyfills.

### `Buffer is not defined`

**Cause**: The `Buffer` polyfill was not loaded before something in the bundle accessed `Buffer`, or a peer dependency (for example `eciesjs`) ran before MetaMask Connect’s React Native entry could apply its own `Buffer` shim.

**Fix**: Set `global.Buffer = Buffer` in your polyfills file, and import that file immediately after `react-native-get-random-values` so the global is defined before other imports run.

### `Cannot resolve module 'stream'` (or `crypto`, `http`, etc.)

**Cause**: Metro does not know how to resolve Node.js built-in modules.

**Fix**: Add `extraNodeModules` to your `metro.config.js` as shown in [Step 2](#2-configure-metro). Map `stream` to `readable-stream` and stub the rest with the empty module.

### `Event is not defined` or `CustomEvent is not defined`

**Cause**: React Native does not provide browser `Event` or `CustomEvent` classes. This typically appears when using **wagmi** (or another dependency that expects DOM events). MetaMask Connect uses `eventemitter3` internally and does not require these globals.

**Fix**: If you use wagmi, append the `Event` and `CustomEvent` polyfills from [Optional wagmi polyfills for Event and CustomEvent](#optional-wagmi-polyfills-for-event-and-customevent) to your `polyfills.ts` after the base `window` shim.

### Expo Go not working

**Cause**: Polyfilling native modules is not supported with Expo Go.

**Fix**: Use a [Custom Dev Client](https://docs.expo.dev/develop/development-builds/introduction/) or [EAS builds](https://docs.expo.dev/eas/). Run `npx expo prebuild` before building.

## Next steps

- See the [troubleshooting overview](index.md).
- Follow the [EVM React Native quickstart](../evm/quickstart/react-native.md).
- Follow the [Solana React Native quickstart](../solana/quickstart/react-native.md).
