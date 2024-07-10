---
sidebar_label: Options
sidebar_position: 1
toc_max_heading_level: 4
description: See the Snaps CLI options reference.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Snaps configuration options

This reference describes the syntax of the Snaps command line interface (CLI) configuration options.
You can specify these options in the
[configuration file](../../learn/about-snaps/files.md#configuration-file).

### `bundler`

<Tabs>
<TabItem value="Syntax">

```javascript
bundler: <BUNDLER>,
```

</TabItem>
<TabItem value="Example">

```javascript
bundler: "webpack",
```

</TabItem>
</Tabs>

The bundler to use.
The options are `"webpack"` and `"browserify"`.
The default is `"webpack"`.

:::caution important
We recommend using the Webpack bundler.
The Browserify-based configuration is deprecated and will be removed in the future.
This reference describes the configuration options for Webpack.
For Browserify, see the
[legacy options](https://github.com/MetaMask/snaps/tree/455366f19281801ed4220431100e45237dd5cf1e/packages/snaps-cli#legacy-options).
:::

### `customizeWebpackConfig`

<Tabs>
<TabItem value="Syntax">

```typescript
customizeWebpackConfig: <FUNCTION>,
```

</TabItem>
<TabItem value="Example">

```typescript
customizeWebpackConfig: (config) =>
  merge(config, {
    plugins: [
      // Add a plugin.
    ],
    module: {
      rules: [
        // Add a loader.
      ],
    },
  }),
```

</TabItem>
</Tabs>

A function that customizes the Webpack configuration.
For example, you can use this option to add a Webpack plugin, provide a polyfill, or add a loader.

The function should receive the Webpack configuration object and return the modified configuration object.
For convenience, the Snaps CLI exports a `merge` function that you can use to merge the
configuration object with the
[default Webpack configuration](https://github.com/MetaMask/snaps/blob/main/packages/snaps-cli/src/webpack/config.ts).

### `environment`

<Tabs>
<TabItem value="Syntax">

```javascript
environment: <ENVIRONMENT>,
```

</TabItem>
<TabItem value="Example">

```javascript
environment: {
  SNAP_ENV: process.env.SNAP_ENV,
  PUBLIC_KEY: process.env.PUBLIC_KEY,
},
```

</TabItem>
</Tabs>

The environment configuration.
You can use this to [set environment variables for the Snap](../../how-to/use-environment-variables.md),
which can be accessed using `process.env`.

### `evaluate`

<Tabs>
<TabItem value="Syntax">

```javascript
evaluate: <BOOLEAN>,
```

</TabItem>
<TabItem value="Example">

```javascript
evaluate: true,
```

</TabItem>
</Tabs>

Enables or disables evaluating the bundle.
When set to `true`, the bundle is checked for compatibility issues with the Snaps runtime.
If there are any issues, the CLI exits with an error.

### `experimental`

Experimental features.

:::caution
These features are not stable, and might change in the future.
:::

#### `experimental.wasm`

<Tabs>
<TabItem value="Syntax">

```javascript
experimental: {
  wasm: <BOOLEAN>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
experimental: {
  wasm: true,
},
```

</TabItem>
</Tabs>

Enables or disables WebAssembly support.
When set to `true`, WebAssembly files can be imported in the Snap.
For example:

```typescript
import program from "./program.wasm"

// Program is initialized synchronously.
// ...
```

### `features`

#### `features.images`

<Tabs>
<TabItem value="Syntax">

```javascript
features: {
  images: <BOOLEAN>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
features: {
  images: false,
},
```

</TabItem>
</Tabs>

Enables or disables [image support](../../features/custom-ui/index.md#image).
The default is `true`.

### `input`

<Tabs>
<TabItem value="Syntax">

```javascript
input: <FILE>,
```

</TabItem>
<TabItem value="Example">

```javascript
input: "src/index.js",
```

</TabItem>
</Tabs>

The entry point of the Snap.
This is the file that will be bundled.
The default is `"src/index.js"`.

### `manifest`

The Snap [manifest file](../../learn/about-snaps/files.md#manifest-file) configuration.

#### `manifest.path`

<Tabs>
<TabItem value="Syntax">

```javascript
manifest: {
  path: <FILE>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
manifest: {
  path: "snap.manifest.json",
},
```

</TabItem>
</Tabs>

Path to the Snap manifest file.
The default is `"snap.manifest.json"`.

#### `manifest.update`

<Tabs>
<TabItem value="Syntax">

```javascript
manifest: {
  update: <BOOLEAN>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
manifest: {
  update: false,
},
```

</TabItem>
</Tabs>

Enables or disables updating the manifest file with the bundle shasum, and making any other possible updates.
If set to `false`, the manifest is not updated, and an error is thrown if the manifest is not up-to-date.
The default is `true`.

### `output`

The output configuration.

#### `output.clean`

<Tabs>
<TabItem value="Syntax">

```javascript
output: {
  clean: <BOOLEAN>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
output: {
  clean: true,
},
```

</TabItem>
</Tabs>

Enables or disables cleaning the output directory before building.
The default is `false`.

#### `output.filename`

<Tabs>
<TabItem value="Syntax">

```javascript
output: {
  filename: <FILE>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
output: {
  filename: "bundle.js",
},
```

</TabItem>
</Tabs>

The output filename.
The default is `"bundle.js"`.

#### `output.minimize`

<Tabs>
<TabItem value="Syntax">

```javascript
output: {
  minimize: <BOOLEAN>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
output: {
  minimize: false,
},
```

</TabItem>
</Tabs>

Enables or disables minimizing the bundle.
Minimizing the bundle removes comments and whitespace, mangles variable names, and performs other optimizations.
The default is `true`.

#### `output.path`

<Tabs>
<TabItem value="Syntax">

```javascript
output: {
  path: <DIRECTORY>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
output: {
  path: "dist",
},
```

</TabItem>
</Tabs>

Path to the output directory.
The default is `"dist"`.

### `polyfills`

<Tabs>
<TabItem value="Syntax">

```javascript
polyfills: <BOOLEAN|OBJECT>
```

</TabItem>
<TabItem value="Example">

```javascript
polyfills: {
  buffer: true,
  crypto: true,
  path: true,
}
```

</TabItem>
</Tabs>

Enables or disables providing polyfills for Node.js built-in modules.
If set to `true`, all available polyfills are provided.
The default is `false`.

You can also set this option to an object with specific polyfills set to `true`.
See [the list of available polyfills](https://github.com/MetaMask/snaps/blob/51a1d04ea50c5c286262df1959ef0b1ced84b6e2/packages/snaps-cli/src/config.ts#L383-L416).

### `server`

The development server configuration.
The development server is used to test the Snap during development, using the
[`watch`](subcommands.md#w-watch) and [`serve`](subcommands.md#s-serve) subcommands.

#### `server.enabled`

<Tabs>
<TabItem value="Syntax">

```javascript
server: {
  enabled: <BOOLEAN>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
server: {
  enabled: false,
},
```

</TabItem>
</Tabs>

Enables or disables the development server.

#### `server.port`

<Tabs>
<TabItem value="Syntax">

```javascript
server: {
  port: <PORT>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
server: {
  port: 9000,
},
```

</TabItem>
</Tabs>

The port to run the development server on.
If set to `0`, a random port is used.
The default is `8081`.

#### `server.root`

<Tabs>
<TabItem value="Syntax">

```javascript
server: {
  root: <DIRECTORY>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
server: {
  root: "snap",
},
```

</TabItem>
</Tabs>

The root directory of the development server.
This is the directory that is served by the development server.
The default is the current working directory.

### `sourceMap`

<Tabs>
<TabItem value="Syntax">

```javascript
sourceMap: <BOOLEAN|"inline">,
```

</TabItem>
<TabItem value="Example">

```javascript
sourceMap: "inline",
```

</TabItem>
</Tabs>

Enables or disables generating a source map.
If set to `"inline"`, the source map is inlined in the bundle.
If set to `true` or not specified, it is written to a separate file.
The default is `true`.

### `stats`

The stats configuration, which controls the log output of the CLI.

#### `stats.buffer`

<Tabs>
<TabItem value="Syntax">

```javascript
stats: {
  buffer: <BOOLEAN>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
stats: {
  buffer: false,
},
```

</TabItem>
</Tabs>

Enables or disables showing a warning if the `Buffer` global is used but not provided.
The `Buffer` global is not available in the Snaps runtime by default.
To use `Buffer`, set [`polyfills`](#polyfills) to `true`.

The default is `true`.

#### `stats.builtIns`

<Tabs>
<TabItem value="Syntax">

```javascript
stats: {
  builtIns: <false|IGNORE_LIST>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
stats: {
  builtIns: {
    ignore: [
      // Built-in modules to ignore.
    ],
  },
},
```

</TabItem>
</Tabs>

Enables or disables checking for missing built-in modules.

Not specifying this option, or specifying an ignore list, enables checking for missing built-in modules.
When enabled, the CLI shows a warning if a built-in is used but not provided.
The Snaps CLI does not support Node.js built-ins out of the box.
To use built-ins, set [`polyfills`](#polyfills) to `true`.

You can specify a list of built-ins to ignore when checking for missing built-ins.
This is useful if the built-in is not actually used in the Snap, but is added by a dependency.

The default is an empty ignore list.

#### `stats.verbose`

<Tabs>
<TabItem value="Syntax">

```javascript
stats: {
  verbose: <BOOLEAN>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
stats: {
  verbose: true,
},
```

</TabItem>
</Tabs>

Enables or disables verbose logging.
If set to `true`, the CLI logs more information.
The default is `false`.
