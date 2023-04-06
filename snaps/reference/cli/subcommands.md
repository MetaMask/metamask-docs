---
title: Subcommands
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Snaps subcommands

## b, build

<!--tabs-->

# Syntax

```bash
mm-snap build [options]
```

# Example

```bash
mm-snap b -s lib/index.js -d out -n snap.js
```

<!--/tabs-->

Builds a snap from source.

`b` is an alias for `build`.

## e, eval

<!--tabs-->

# Syntax

```bash
mm-snap eval [options]
```

# Example

```bash
mm-snap e -b out/snap.js
```

<!--/tabs-->

Attempts to evaluate the snap bundle in SES.

`e` is an alias for `eval`.

## i, init

<!--tabs-->

# Syntax

```bash
mm-snap init [directory]
```

# Example

```bash
mm-snap i my-snap
```

<!--/tabs-->

Initializes a snap project in the specified directory.
If no directory is specified, the snap project is initialized in the current directory.

`i` is an alias for `init`.

## m, manifest

<!--tabs-->

# Syntax

```bash
mm-snap manifest [options]
```

# Example

```bash
mm-snap m --fix false
```

<!--/tabs-->

Validates the snap [manifest file](../../concepts/anatomy.md#manifest-file).

`m` is an alias for `manifest`.

## s, serve

<!--tabs-->

# Syntax

```bash
mm-snap serve [options]
```

# Example

```bash
mm-snap s -r out -p 9000
```

<!--/tabs-->

Locally serves snap files for testing.

`s` is an alias for `serve`.

## w, watch

<!--tabs-->

# Syntax

```bash
mm-snap watch [options]
```

# Example

```bash
mm-snap w -s lib/index.js -d out
```

<!--/tabs-->

Rebuilds a snap from source upon changes to the files in the parent and child directories of the
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
