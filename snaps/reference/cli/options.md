---
title: Options
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Snaps command line options

## b, bundle

<!--tabs-->

# Syntax

```bash
--bundle <file>
```

# Example

```bash
-b out/bundle.js
```

# Configuration file

```js
bundle: 'out/bundle.js' 
```

<!--/tabs-->

Path to the snap [bundle file](../../concepts/anatomy.md#bundle-file).
The default is `dist/bundle.js`.

You can use this option with the [`eval`](subcommands.md#e-eval) subcommand.

`-b` is an alias for `--bundle`.

## d, dist

<!--tabs-->

# Syntax

```bash
--dist <directory>
```

# Example

```bash
-d out
```

# Configuration file

```js
dist: 'out'
```

<!--/tabs-->

Path to the output directory.
The default is `dist`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

`-d` is an alias for `--dist`.

## depsToTranspile

<!--tabs-->

# Syntax

```bash
--depsToTranspile <array>
```

# Example

```bash
--depsToTranspile dep1,dep2
```

# Configuration file

```js
depsToTranspile: ['dep1','dep2']
```

<!--/tabs-->

List of dependencies to transpile, if [`--transpilationMode`](#transpilationmode) is set to
`localAndDeps`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

## e, eval

<!--tabs-->

# Syntax

```bash
--eval <boolean>
```

# Example

```bash
-e false
```

# Configuration file

```js
eval: false
```

<!--/tabs-->

Indicates whether to attempt to evaluate the snap bundle in SES.
The default is `true`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

`-e` is an alias for `--eval`.

## fix, writeManifest

<!--tabs-->

# Syntax

```bash
--fix <boolean>
```

# Example

```bash
--fix false
```

# Configuration file

```js
fix: false
```

<!--/tabs-->

When validating the snap [manifest file](../../concepts/anatomy.md#manifest-file) using the
[`manifest`](subcommands.md#m-manifest) subcommand, indicates whether to make necessary changes to
the manifest file.
The default is `true`.

`--fix` is an alias for `--writeManifest`.

## h, help

```bash
-h, --help
```

Displays the help message and exits.
You can use this option with `mm-snap` or any [subcommand](subcommands.md).

`-h` is an alias for `--help`.

## m, manifest

<!--tabs-->

# Syntax

```bash
--manifest <boolean>
```

# Example

```bash
-m false
```

# Configuration file

```js
manifest: false
```

<!--/tabs-->

Indicates whether to validate the snap [manifest file](../../concepts/anatomy.md#manifest-file).
The default is `true`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

`-m` is an alias for `--manifest`.

## n, outfileName

<!--tabs-->

# Syntax

```bash
--outfileName <string>
```

# Example

```bash
-n snap.js
```

# Configuration file

```js
outfileName: 'snap.js'
```

<!--/tabs-->

Output file name when building a snap from source.
The default is `bundle.js`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

`-n` is an alias for `--outfileName`.

## p, port

<!--tabs-->

# Syntax

```bash
--port <number>
```

# Example

```bash
-p 9000
```

# Configuration file

```js
port: 9000
```

<!--/tabs-->

Local server port for testing.
The default is `8081`.

You can use this option with the [`serve`](subcommands.md#s-serve) and
[`watch`](subcommands.md#w-watch) subcommands.

`-p` is an alias for `--port`.

## r, root

<!--tabs-->

# Syntax

```bash
--root <directory>
```

# Example

```bash
-r out
```

# Configuration file

```js
root: 'out'
```

<!--/tabs-->

Server root directory.
The default is the current working directory (`.`).

You can use this option with the [`serve`](subcommands.md#s-serve) and
[`watch`](subcommands.md#w-watch) subcommands.

`-r` is an alias for `--root`.

## s, src

<!--tabs-->

# Syntax

```bash
--src <file>
```

# Example

```bash
-s lib/index.js
```

# Configuration file

```js
src: 'lib/index.js'
```

<!--/tabs-->

Path to the snap source file.
The default is `src/index.js`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

`-s` is an alias for `--src`.

## sourceMaps

<!--tabs-->

# Syntax

```bash
--sourceMaps <boolean>
```

# Example

```bash
--sourceMaps true
```

# Configuration file

```js
sourceMaps: true
```

<!--/tabs-->

Indicates whether builds should include source maps.
The default is `false`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

## strip, stripComments

<!--tabs-->

# Syntax

```bash
--strip <boolean>
```

# Example

```bash
--strip false
```

# Configuration file

```js
strip: false
```

<!--/tabs-->

Indicates whether to remove code comments from the build output.
The default is `true`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

`--strip` is an alias for `--stripComments`.

## suppressWarnings

<!--tabs-->

# Syntax

```bash
--suppressWarnings <boolean>
```

# Example

```bash
--suppressWarnings true
```

# Configuration file

```js
suppressWarnings: true
```

<!--/tabs-->

Indicates whether to suppress warnings.
The default is `false`.

You can use this option with any [subcommand](subcommands.md).

## transpilationMode

<!--tabs-->

# Syntax

```bash
--transpilationMode <string>
```

# Example

```bash
--transpilationMode localAndDeps
```

# Configuration file

```js
transpilationMode: 'localAndDeps'
```

<!--/tabs-->

[Babel](https://babeljs.io/) transpilation mode.
Specify `localAndDeps` to transpile all source code including dependencies, `localOnly` to transpile
local source code only, and `none` to transpile nothing.

The default is `localOnly`.

You can use this option with the [`build`](subcommands.md#b-build) and
[`watch`](subcommands.md#w-watch) subcommands.

:::note
For TypeScript snaps, `--transpilationMode` must be set to either `localOnly` or `localAndDeps`.
:::

## verboseErrors

<!--tabs-->

# Syntax

```bash
--verboseErrors <boolean>
```

# Example

```bash
--verboseErrors false
```

# Configuration file

```js
verboseErrors: false
```

<!--/tabs-->

Indicates whether to display original errors.
The default is `true`.

You can use this option with any [subcommand](subcommands.md). 

## version

```bash
--version
```

Displays the version number and exits.
