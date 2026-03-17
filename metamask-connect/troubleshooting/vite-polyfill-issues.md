---
title: Vite Polyfill Issues - MetaMask Connect
description: Resolve bundler polyfill issues when using MetaMask Connect packages with Vite.
sidebar_label: Vite polyfill issues
keywords: [MetaMask, Connect, polyfill, Vite, bundler, troubleshooting, global, Buffer, process]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Vite polyfill issues

MetaMask Connect packages generally work out of the box with Vite.
However, some transitive dependencies may reference Node.js globals (`global`, `Buffer`, `process`) that Vite does not provide by default.

## Step 1: Install polyfill packages

```bash npm2yarn
npm install --save-dev buffer process
```

## Step 2: Add polyfills to `index.html`

Add a `<script>` tag in the `<head>` of your `index.html` to make `Buffer` and `process` available globally:

```html
<!doctype html>
<html lang="en">
  <head>
    <script type="module">
      import { Buffer } from "buffer";
      import process from "process";
      window.Buffer = Buffer;
      window.process = process;
    </script>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## Step 3: Update `vite.config.js`

Define `global` as `globalThis` so libraries that reference `global` work in the browser:

<Tabs>
  <TabItem value="React">

```javascript title="vite.config.js"
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  define: {
    global: "globalThis",
  },
});
```

  </TabItem>
  <TabItem value="Vue">

```javascript title="vite.config.js"
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [vue()],
  define: {
    global: "globalThis",
  },
});
```

  </TabItem>
</Tabs>

:::warning
If you use additional blockchain libraries alongside MetaMask Connect, you might need to add `resolve.alias` entries for modules like `crypto-browserify`, `stream-browserify`, `assert`, `http`, `https`, `os`, `url`, or `zlib`.
Only add these if you encounter specific build errors referencing those modules.
:::

## Next steps

- [Troubleshooting overview](index.md)
- [Get started with EVM](../evm/index.md)
- [Get started with Solana](../solana/index.md)
