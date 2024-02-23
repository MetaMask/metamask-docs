---
sidebar_label: Options
sidebar_position: 1
description: See the Snaps CLI options reference.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Snaps command line options

This reference describes the syntax of the Snaps command line interface (CLI) options.

## Specify options

You can specify options:

- In the [configuration file](../../learn/about-snaps/files.md#configuration-file).

- On the command line using the `yarn mm-snap` command.

  ```bash
  yarn mm-snap [SUBCOMMAND] [OPTIONS]
  ```

## Options

### b, bundle

<Tabs>
<TabItem value="Syntax">

```bash
--bundle <file>
```

</TabItem>
<TabItem value="Example">

```bash
-b out/bundle.js
```

</TabItem>
<TabItem value="Configuration file">

```js
bundle: 'out/bundle.js' 
```

</TabItem>
</Tabs>

Path to the Snap [bundle file](../../learn/about-snaps/files.md#bundle-file).
The default is `dist/bundle.js`.

You can use this option with the [`eval`](subcommands.md#e-eval) subcommand.

`-b` is an alias for `--bundle`.

### d, dist

<Tabs>
<TabItem value="Syntax">

```bash
--dist <directory>
```

</TabItem>
<TabItem value="Example">

```bash
-d out
```

</TabItem>
<TabItem value="Configuration file">

```js
dist: 'out'
```

</TabItem>
</Tabs>

Path to the output directory.
The default is `dist`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

`-d` is an alias for `--dist`.

### depsToTranspile

<Tabs>
<TabItem value="Syntax">

```bash
--depsToTranspile <array>
```

</TabItem>
<TabItem value="Example">

```bash
--depsToTranspile dep1,dep2
```

</TabItem>
<TabItem value="Configuration file">

```js
depsToTranspile: ['dep1','dep2']
```

</TabItem>
</Tabs>

List of dependencies to transpile, if [`--transpilationMode`](#transpilationmode) is set to
`localAndDeps`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

### e, eval

<Tabs>
<TabItem value="Syntax">

```bash
--eval <boolean>
```

</TabItem>
<TabItem value="Example">

```bash
-e false
```

</TabItem>
<TabItem value="Configuration file">

```js
eval: false
```

</TabItem>
</Tabs>

Indicates whether to attempt to evaluate the Snap bundle in SES.
The default is `true`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

`-e` is an alias for `--eval`.

### fix, writeManifest

<Tabs>
<TabItem value="Syntax">

```bash
--fix <boolean>
```

</TabItem>
<TabItem value="Example">

```bash
--fix false
```

</TabItem>
<TabItem value="Configuration file">

```js
fix: false
```

</TabItem>
</Tabs>

When validating the Snap [manifest file](../../learn/about-snaps/files.md#manifest-file) using the
[`manifest`](subcommands.md#m-manifest) subcommand, indicates whether to make necessary changes to
the manifest file.
The default is `true`.

`--fix` is an alias for `--writeManifest`.

### h, help

```bash
-h, --help
```

Displays the help message and exits.
You can use this option with `mm-snap` or any [subcommand](subcommands.md).

`-h` is an alias for `--help`.

### m, manifest

<Tabs>
<TabItem value="Syntax">

```bash
--manifest <boolean>
```

</TabItem>
<TabItem value="Example">

```bash
-m false
```

</TabItem>
<TabItem value="Configuration file">

```js
manifest: false
```

</TabItem>
</Tabs>

Indicates whether to validate the Snap [manifest file](../../learn/about-snaps/files.md#manifest-file).
The default is `true`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

`-m` is an alias for `--manifest`.

### n, outfileName

<Tabs>
<TabItem value="Syntax">

```bash
--outfileName <string>
```

</TabItem>
<TabItem value="Example">

```bash
-n snap.js
```

</TabItem>
<TabItem value="Configuration file">

```js
outfileName: 'snap.js'
```

</TabItem>
</Tabs>

Output file name when building a Snap from source.
The default is `bundle.js`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

`-n` is an alias for `--outfileName`.

### p, port

<Tabs>
<TabItem value="Syntax">

```bash
--port <number>
```

</TabItem>
<TabItem value="Example">

```bash
-p 9000
```

</TabItem>
<TabItem value="Configuration file">

```js
port: 9000
```

</TabItem>
</Tabs>

Local server port for testing.
The default is `8081`.

You can use this option with the [`serve`](subcommands.md#s-serve) and
[`watch`](subcommands.md#w-watch) subcommands.

`-p` is an alias for `--port`.

### r, root

<Tabs>
<TabItem value="Syntax">

```bash
--root <directory>
```

</TabItem>
<TabItem value="Example">

```bash
-r out
```

</TabItem>
<TabItem value="Configuration file">

```js
root: 'out'
```

</TabItem>
</Tabs>

Server root directory.
The default is the current working directory (`.`).

You can use this option with the [`serve`](subcommands.md#s-serve) and
[`watch`](subcommands.md#w-watch) subcommands.

`-r` is an alias for `--root`.

### s, src

<Tabs>
<TabItem value="Syntax">

```bash
--src <file>
```

</TabItem>
<TabItem value="Example">

```bash
-s lib/index.js
```

</TabItem>
<TabItem value="Configuration file">

```js
src: 'lib/index.js'
```

</TabItem>
</Tabs>

Path to the Snap source file.
The default is `src/index.js`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

`-s` is an alias for `--src`.

### sourceMaps

<Tabs>
<TabItem value="Syntax">

```bash
--sourceMaps <boolean>
```

</TabItem>
<TabItem value="Example">

```bash
--sourceMaps true
```

</TabItem>
<TabItem value="Configuration file">

```js
sourceMaps: true
```

</TabItem>
</Tabs>

Indicates whether builds should include source maps.
The default is `false`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

### strip, stripComments

<Tabs>
<TabItem value="Syntax">

```bash
--strip <boolean>
```

</TabItem>
<TabItem value="Example">

```bash
--strip false
```

</TabItem>
<TabItem value="Configuration file">

```js
strip: false
```

</TabItem>
</Tabs>

Indicates whether to remove code comments from the build output.
The default is `true`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

`--strip` is an alias for `--stripComments`.

### suppressWarnings

<Tabs>
<TabItem value="Syntax">

```bash
--suppressWarnings <boolean>
```

</TabItem>
<TabItem value="Example">

```bash
--suppressWarnings true
```

</TabItem>
<TabItem value="Configuration file">

```js
suppressWarnings: true
```

</TabItem>
</Tabs>

Indicates whether to suppress warnings.
The default is `false`.

You can use this option with any [subcommand](subcommands.md).

### transpilationMode

<Tabs>
<TabItem value="Syntax">

```bash
--transpilationMode <string>
```

</TabItem>
<TabItem value="Example">

```bash
--transpilationMode localAndDeps
```

</TabItem>
<TabItem value="Configuration file">

```js
transpilationMode: 'localAndDeps'
```

</TabItem>
</Tabs>

[Babel](https://babeljs.io/) transpilation mode.
Specify `localAndDeps` to transpile all source code including dependencies, `localOnly` to transpile
local source code only, and `none` to transpile nothing.

The default is `localOnly`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

:::note
For TypeScript Snaps, `--transpilationMode` must be set to either `localOnly` or `localAndDeps`.
:::

### verboseErrors

<Tabs>
<TabItem value="Syntax">

```bash
--verboseErrors <boolean>
```

</TabItem>
<TabItem value="Example">

```bash
--verboseErrors false
```

</TabItem>
<TabItem value="Configuration file">

```js
verboseErrors: false
```

</TabItem>
</Tabs>

Indicates whether to display original errors.
The default is `true`.

You can use this option with any [subcommand](subcommands.md). 

### version

```bash
--version
```

Displays the version number and exits.
