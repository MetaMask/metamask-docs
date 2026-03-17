---
title: React Native Metro Polyfill Issues - MetaMask Connect
description: Resolve bundler polyfill issues when using MetaMask Connect packages with React Native Metro.
sidebar_label: React Native Metro polyfill issues
keywords: [MetaMask, Connect, polyfill, React Native, Metro, Expo, bundler, troubleshooting, Buffer, Event, CustomEvent, crypto]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# React Native Metro polyfill issues

React Native uses the Metro bundler, which cannot resolve Node.js built-in modules.
MetaMask Connect packages and their dependencies reference modules like `stream`, `crypto`, `buffer`, and `http`, and also rely on browser globals (`window`, `Event`, `CustomEvent`) that do not exist in React Native.

This guide walks through the required polyfills and Metro configuration.

:::info Expo-managed workflow
Polyfilling is not supported with the "Expo Go" app.
It is compatible only with Custom Dev Client and [Expo Application Services (EAS)](https://docs.expo.dev/eas/) builds.
[Prebuild your Expo app](https://docs.expo.dev/workflow/continuous-native-generation/#usage) to generate native code before proceeding.
:::

## Step 1: Install required packages

```bash npm2yarn
npm install react-native-get-random-values buffer readable-stream @react-native-async-storage/async-storage
```

`react-native-get-random-values` provides `crypto.getRandomValues`, which MetaMask Connect requires.
`readable-stream` provides a `stream` shim for Metro.
`buffer` provides the `Buffer` global.
`@react-native-async-storage/async-storage` is needed for session persistence.

## Step 2: Configure Metro

Map Node.js built-in modules to React Native-compatible shims or an empty module stub.
Create an empty module file first:

```javascript title="src/empty-module.js"
module.exports = {};
```

Then update your Metro config:

<Tabs>
  <TabItem value="Bare React Native">

```javascript title="metro.config.js"
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("path");

const emptyModule = path.resolve(__dirname, "src/empty-module.js");

const config = {
  resolver: {
    extraNodeModules: {
      stream: require.resolve("readable-stream"),
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
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

  </TabItem>
  <TabItem value="Expo">

```javascript title="metro.config.js"
const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);
const emptyModule = path.resolve(__dirname, "src/empty-module.js");

config.resolver.extraNodeModules = {
  stream: require.resolve("readable-stream"),
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
};

module.exports = config;
```

  </TabItem>
</Tabs>

## Step 3: Create the polyfills file

Create `polyfills.ts` at the project root (or `src/polyfills.ts`) with all required global shims:

```typescript title="polyfills.ts"
import { Buffer } from "buffer";

global.Buffer = Buffer;

// Polyfill window — React Native doesn't have a browser window object
let windowObj: any;
if (typeof global !== "undefined" && global.window) {
  windowObj = global.window;
} else if (typeof window !== "undefined") {
  windowObj = window;
} else {
  windowObj = {};
}

if (!windowObj.location) {
  windowObj.location = {
    hostname: "mydapp.com",
    href: "https://mydapp.com",
  };
}
if (typeof windowObj.addEventListener !== "function") {
  windowObj.addEventListener = () => {};
}
if (typeof windowObj.removeEventListener !== "function") {
  windowObj.removeEventListener = () => {};
}
if (typeof windowObj.dispatchEvent !== "function") {
  windowObj.dispatchEvent = () => true;
}

if (typeof global !== "undefined") {
  global.window = windowObj;
}

// Polyfill Event if missing
if (typeof global.Event === "undefined") {
  class EventPolyfill {
    type: string;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented = false;
    constructor(type: string, options?: EventInit) {
      this.type = type;
      this.bubbles = options?.bubbles ?? false;
      this.cancelable = options?.cancelable ?? false;
    }
    preventDefault() {
      this.defaultPrevented = true;
    }
    stopPropagation() {}
    stopImmediatePropagation() {}
  }
  global.Event = EventPolyfill as any;
  windowObj.Event = EventPolyfill as any;
}

// Polyfill CustomEvent if missing
if (typeof global.CustomEvent === "undefined") {
  const EventClass =
    global.Event ||
    class {
      type: string;
      constructor(type: string) {
        this.type = type;
      }
    };
  class CustomEventPolyfill extends (EventClass as any) {
    detail: any;
    constructor(type: string, options?: CustomEventInit) {
      super(type, options);
      this.detail = options?.detail ?? null;
    }
  }
  global.CustomEvent = CustomEventPolyfill as any;
  windowObj.CustomEvent = CustomEventPolyfill as any;
}
```

## Step 4: Set up the entry file import order

The import order is **critical**.
`react-native-get-random-values` must be the very first import, followed by the polyfills file, before any SDK or application code:

<Tabs>
  <TabItem value="Bare React Native">

```javascript title="index.js"
import "react-native-get-random-values"; // Must be first
import "./polyfills"; // Must be second

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);
```

  </TabItem>
  <TabItem value="Expo Router">

```javascript title="app/_layout.tsx"
import "react-native-get-random-values"; // Must be first
import "../polyfills"; // Must be second

// ... rest of layout
```

  </TabItem>
</Tabs>

## Common errors and solutions

### `crypto.getRandomValues is not a function`

**Cause**: `react-native-get-random-values` was not imported before MetaMask Connect.

**Fix**: Ensure `import 'react-native-get-random-values'` is the very first import in your entry file, before any MetaMask Connect imports or polyfills.

### `Buffer is not defined`

**Cause**: The `Buffer` polyfill was not loaded before MetaMask Connect accessed it.

**Fix**: Ensure `global.Buffer = Buffer` is set in your polyfills file, and the polyfills file is imported immediately after `react-native-get-random-values`.

### `Cannot resolve module 'stream'` (or `crypto`, `http`, etc.)

**Cause**: Metro does not know how to resolve Node.js built-in modules.

**Fix**: Add `extraNodeModules` to your `metro.config.js` as shown in [Step 2](#step-2-configure-metro). Map `stream` to `readable-stream` and stub the rest with the empty module.

### `Event is not defined` or `CustomEvent is not defined`

**Cause**: React Native does not provide browser `Event`/`CustomEvent` classes that MetaMask Connect's internal event system requires.

**Fix**: Ensure the `Event` and `CustomEvent` polyfills are included in your polyfills file as shown in [Step 3](#step-3-create-the-polyfills-file).

### Expo Go not working

**Cause**: Polyfilling native modules is not supported with Expo Go.

**Fix**: Use a [Custom Dev Client](https://docs.expo.dev/develop/development-builds/introduction/) or [EAS builds](https://docs.expo.dev/eas/). Run `npx expo prebuild` before building.

## Next steps

- [Troubleshooting overview](index.md)
- [EVM React Native quickstart](../evm/quickstart/react-native.md)
- [Solana React Native quickstart](../solana/quickstart/react-native.md)
