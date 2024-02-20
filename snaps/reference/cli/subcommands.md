---
sidebar_label: Subcommands
sidebar_position: 2
description: See the Snaps CLI subcommands reference.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Snaps subcommands

This reference describes the syntax of the Snaps command line interface (CLI) subcommands.

You can specify subcommands and options using the `yarn mm-snap` command:

```bash
yarn mm-snap [SUBCOMMAND] [OPTIONS]
```

## b, build

<Tabs>
<TabItem value="Syntax">

```bash
yarn mm-snap build [options]
```

</TabItem>
<TabItem value="Example">

```bash
yarn mm-snap b -s lib/index.js -d out -n snap.js
```

</TabItem>
</Tabs>

Builds a Snap from source.

`b` is an alias for `build`.

## e, eval

<Tabs>
<TabItem value="Syntax">

```bash
yarn mm-snap eval [options]
```

</TabItem>
<TabItem value="Example">

```bash
yarn mm-snap e -b out/snap.js
```

</TabItem>
</Tabs>

Attempts to evaluate the Snap bundle in SES.

`e` is an alias for `eval`.

## i, init

<Tabs>
<TabItem value="Syntax">

```bash
yarn mm-snap init [directory]
```

</TabItem>
<TabItem value="Example">

```bash
yarn mm-snap i my-snap
```

</TabItem>
</Tabs>

Initializes a Snap project in the specified directory.
If no directory is specified, the Snap project is initialized in the current directory.

`i` is an alias for `init`.

## m, manifest

<Tabs>
<TabItem value="Syntax">

```bash
yarn mm-snap manifest [options]
```

</TabItem>
<TabItem value="Example">

```bash
yarn mm-snap m --fix false
```

</TabItem>
</Tabs>

Validates the Snap [manifest file](../../learn/about-snaps/files.md#manifest-file).

`m` is an alias for `manifest`.

## s, serve

<Tabs>
<TabItem value="Syntax">

```bash
yarn mm-snap serve [options]
```

</TabItem>
<TabItem value="Example">

```bash
yarn mm-snap s -r out -p 9000
```

</TabItem>
</Tabs>

Locally serves Snap files for testing.

`s` is an alias for `serve`.

## w, watch

<Tabs>
<TabItem value="Syntax">

```bash
yarn mm-snap watch [options]
```

</TabItem>
<TabItem value="Example">

```bash
yarn mm-snap w -s lib/index.js -d out
```

</TabItem>
</Tabs>

Rebuilds a Snap from source upon changes to the files in the parent and child directories of the
source directory.

:::note
All files in the parent and child directories of sthe source directory are watched for changes, except:

- Files in the `node_modules` directory.
- Files in the `test` or `tests` directories.
- Any files named `test.js` or `test.ts`.
- Files in the `dist` directory, or the directory specified using [`--dist`](options.md#d-dist).
- Dotfiles.
:::
  
`w` is an alias for `watch`.
