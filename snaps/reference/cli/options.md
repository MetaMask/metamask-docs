---
sidebar_label: Options
sidebar_position: 1
description: See the Snaps CLI options reference.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Snaps configuration options

This reference describes the syntax of the Snaps command line interface (CLI) configuration options.
You can specify these options in the
[configuration file](../../learn/about-snaps/files.md#configuration-file).

## `bundler`

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
The options are `"browserify"` and `"webpack"`.

For backwards compatibility, the default is `"browserify"`, but we recommend using `"webpack"`.
This reference describes the options for the Webpack bundler.
For Browserify, see the [legacy options](https://github.com/MetaMask/snaps/tree/main/packages/snaps-cli#legacy-options).

## `customizeWebpackConfig`

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

## `environment`

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

## `evaluate`

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

Whether to evaluate the bundle.
When set to `true`, the bundle is checked for compatibility issues with the Snaps runtime.
If there are any issues, the CLI exits with an error.

## `experimental`

Experimental features.

:::caution
These features are not stable, and may change in the future.
:::

### `experimental.wasm`

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
import program from './program.wasm';

// Program is initialized synchronously.
// ...
```

## `input`

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

## `manifest`

The Snap manifest configuration.

### `manifest.path`

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

Path to the Snap [manifest file](../../learn/about-snaps/files.md#manifest-file).
The default is `"snap.manifest.json`.

### `manifest.update`

<Tabs>
<TabItem value="Syntax">

```javascript
manifest: {
    update: <FILE>,
},
```

</TabItem>
<TabItem value="Example">

```javascript
manifest: {
    update: "snap.manifest.json",
},
```

</TabItem>
</Tabs>

## `output`

### `output.clean`

### `output.filename`

### `output.minimize`

### `output.path`

## `server`

### `server.enabled`

### `server.root`

### `server.port`

## `sourceMap`

## `stats`

### `stats.buffer`

### `stats.builtIns`

#### `stats.builtIns.ignore`

### `stats.verbose`

## Legacy options