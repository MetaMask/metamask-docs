---
sidebar_label: Subcommands
sidebar_position: 2
toc_max_heading_level: 4
description: See the Snaps CLI subcommands reference.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Snaps subcommands

This reference describes the syntax of the Snaps command line interface (CLI) subcommands and
subcommand options.

You can specify subcommands and their options using the `yarn mm-snap` command:

```bash
yarn mm-snap [SUBCOMMAND] [SUBCOMMAND OPTIONS]
```

### `b`, `build`

```bash
yarn mm-snap build
```

Builds a Snap from source.

`b` is an alias for `build`.

#### `c`, `config`

<Tabs>
<TabItem value="Syntax">

```bash
yarn mm-snap build --config <FILE>
```

</TabItem>
<TabItem value="Example">

```bash
yarn mm-snap build --config ./snap.config.build.ts
```

</TabItem>
</Tabs>

Path to the [configuration file](../../learn/about-snaps/files.md#configuration-file).

`-c` is an alias for `--config`.

### `e`, `eval`

```bash
yarn mm-snap eval
```

Attempts to evaluate the Snap bundle in
[Secure ECMAScript (SES)](../../learn/about-snaps/execution-environment.md#secure-ecmascript-ses).

`e` is an alias for `eval`.

### `m`, `manifest`

```bash
yarn mm-snap manifest
```

Validates the Snap [manifest file](../../learn/about-snaps/files.md#manifest-file).

`m` is an alias for `manifest`.

#### `fix`

<Tabs>
<TabItem value="Syntax">

```bash
yarn mm-snap manifest --fix <BOOLEAN>
```

</TabItem>
<TabItem value="Example">

```bash
yarn mm-snap manifest --fix false
```

</TabItem>
</Tabs>

Enables or disables making any changes to fix the manifest file.
The default is `true`.

### `s`, `serve`

```bash
yarn mm-snap serve
```

Locally serves Snap files for testing.

`s` is an alias for `serve`.

#### `p`, `port`

<Tabs>
<TabItem value="Syntax">

```bash
yarn mm-snap serve --port <PORT>
```

</TabItem>
<TabItem value="Example">

```bash
yarn mm-snap serve --port 9000
```

</TabItem>
</Tabs>

The local server port for testing.
The default is `8081`.

`-p` is an alias for `--port`.

### `w`, `watch`

```bash
yarn mm-snap watch
```

Rebuilds a Snap from source upon changes.

`w` is an alias for `watch`.

#### `p`, `port`

<Tabs>
<TabItem value="Syntax">

```bash
yarn mm-snap watch --port <PORT>
```

</TabItem>
<TabItem value="Example">

```bash
yarn mm-snap watch --port 9000
```

</TabItem>
</Tabs>

The local server port for testing.
The default is `8081`.

`-p` is an alias for `--port`.

## Global options

#### `h`, `help`

```bash
-h, --help
```

Displays the help message and exits.
You can use this option with `mm-snap` or any subcommand.

`-h` is an alias for `--help`.

#### `version`

```bash
--version
```

Displays the version number and exits.
