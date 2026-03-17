---
title: Webpack 5 Polyfill Issues - MetaMask Connect
description: Resolve bundler polyfill issues when using MetaMask Connect packages with Webpack 5.
sidebar_label: Webpack 5 polyfill issues
keywords: [MetaMask, Connect, polyfill, Webpack, bundler, troubleshooting, CRA, Angular, Vue, Buffer, process]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Webpack 5 polyfill issues

Webpack 5 removed automatic Node.js polyfill inclusion.
MetaMask Connect packages and their transitive dependencies may reference Node.js built-in modules (`buffer`, `stream`, `crypto`, etc.) that must be explicitly polyfilled or stubbed.

:::warning
React's development team has officially [deprecated Create React App (CRA)](https://github.com/reactjs/react.dev/pull/5487).
We recommend using [Vite](vite-polyfill-issues.md) for new React projects.
:::

## React (Create React App)

### 1. Install packages

```bash npm2yarn
npm install --save-dev react-app-rewired buffer process
```

### 2. Create `config-overrides.js`

Create `config-overrides.js` in the root of your project:

```javascript title="config-overrides.js"
const webpack = require("webpack");

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: false,
    stream: false,
    assert: false,
    http: false,
    https: false,
    os: false,
    url: false,
    zlib: false,
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ]);
  config.ignoreWarnings = [/Failed to parse source map/];
  return config;
};
```

### 3. Update `package.json` scripts

Replace `react-scripts` with `react-app-rewired`:

<Tabs>
  <TabItem value="Before">

```json
"scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test"
}
```

  </TabItem>
  <TabItem value="After">

```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test"
}
```

  </TabItem>
</Tabs>

:::warning
If you use additional blockchain libraries alongside MetaMask Connect, you might need to polyfill more modules.
Common ones include `crypto-browserify`, `stream-browserify`, `browserify-zlib`, `stream-http`, `https-browserify`, `os-browserify`, and `url`.
Only add these if you encounter specific build errors.
:::

## Angular

### 1. Install packages

```bash npm2yarn
npm install --save-dev buffer process empty-module
```

### 2. Update `tsconfig.json`

Add `paths` to `compilerOptions` so Webpack can resolve the stubbed dependencies:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "paths": {
      "crypto": ["./node_modules/empty-module"],
      "stream": ["./node_modules/empty-module"],
      "assert": ["./node_modules/empty-module"],
      "http": ["./node_modules/empty-module"],
      "https": ["./node_modules/empty-module"],
      "os": ["./node_modules/empty-module"],
      "url": ["./node_modules/empty-module"],
      "zlib": ["./node_modules/empty-module"],
      "process": ["./node_modules/process"]
    }
  }
}
```

### 3. Update `polyfills.ts`

Add the following to your Angular `polyfills.ts` file:

```typescript title="src/polyfills.ts"
(window as any).global = window;
global.Buffer = global.Buffer || require("buffer").Buffer;
global.process = global.process || require("process");
```

## Vue.js (Vue CLI)

### 1. Install packages

```bash npm2yarn
npm install --save-dev buffer process
```

### 2. Update `vue.config.js`

```javascript title="vue.config.js"
const { defineConfig } = require("@vue/cli-service");
const { ProvidePlugin } = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    config.resolve.fallback = {
      crypto: false,
      stream: false,
      assert: false,
      os: false,
      https: false,
      http: false,
      url: false,
      zlib: false,
    };
    config.plugins.push(
      new ProvidePlugin({ Buffer: ["buffer", "Buffer"] })
    );
    config.plugins.push(
      new ProvidePlugin({ process: ["process/browser"] })
    );
  },
});
```

## Next steps

- [Troubleshooting overview](index.md)
- [Get started with EVM](../evm/index.md)
- [Get started with Solana](../solana/index.md)
