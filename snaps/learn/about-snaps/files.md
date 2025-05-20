---
description: Learn about the Snap project files.
sidebar_position: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Snaps files

If you look at the directory structure of the Snaps monorepo project generated in the
[Snaps quickstart](../../get-started/quickstart.md), it looks something like this:

```text
your-snap-name/
├─ packages/
│  ├─ site/
|  |  |- src/
|  |  |  |- App.tsx
|  |  ├─ package.json
|  |  |- ...(react app content)
|  |
│  ├─ snap/
|  |  ├─ src/
|  |  |  |- index.ts
|  |  ├─ snap.manifest.json
|  |  ├─ package.json
|  |  |- ... (Snap content)
├─ package.json
├─ ... (other stuff)
```

The `snap` folder contains the Snap implementation, and the `site` folder contains the Snap
companion dapp implementation.

This page examines the following Snap project files:

- [The manifest file](#manifest-file) tells MetaMask important information about the Snap.
- [The configuration file](#configuration-file) specifies configuration options for the Snap.
- [The bundle file](#bundle-file) is the output file of the published Snap.

## Manifest file

To get MetaMask to execute your Snap, you must have a valid manifest file named `snap.manifest.json`,
located in your package root directory.
The manifest file of `Hello World` would look something like this:

```json title="snap.manifest.json"
{
  "version": "1.0.0",
  "proposedName": "Hello World",
  "description": "A Snap that says hello!",
  "repository": {
    "type": "git",
    "url": "https://github.com/Hello/hello-snap.git"
  },
  "source": {
    "shasum": "w3FltkDjKQZiPwM+AThnmypt0OFF7hj4ycg/kxxv+nU=",
    "location": {
      "npm": {
        "filePath": "dist/bundle.js",
        "iconPath": "images/icon.svg",
        "packageName": "hello-snap",
        "registry": "https://registry.npmjs.org/"
      }
    }
  },
  "initialPermissions": {},
  "manifestVersion": "0.1"
}
```

The manifest tells MetaMask important information about your Snap, such as where it's published
(using `source.location`), how to verify the integrity of the Snap source code (by attempting to
reproduce the `source.shasum` value), and what
[permissions the Snap requests](../../how-to/request-permissions.md) (using `initialPermissions`).

You might need to modify some manifest fields manually.
For example, if you change the location of the icon SVG file, you must update
`source.location.npm.iconPath` to match.
You can also use the [Snaps CLI](../../reference/cli.md) to update some fields for you.
For example, running [`yarn mm-snap build`](../../reference/cli.md#b-build) or
[`yarn mm-snap manifest --fix`](../../reference/cli.md#m-manifest) updates `source.shasum`.

:::caution important
Some manifest fields must match the corresponding fields of the `/snap/package.json` file.

When updating the `version` and `repository` fields, the Snap inherits the values from `package.json`
and overwrites them in `snap.manifest.json`.
We recommend updating `version` and `repository` in `package.json` first, then building the Snap project.

The [Snaps publishing specification](https://github.com/MetaMask/SIPs/blob/main/SIPS/sip-9.md)
details the requirements of both `snap.manifest.json` and its relationship to `package.json`.
:::

:::note
Currently, Snaps can only be
[published to the official npm registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry).
In the future, developers will be able to distribute Snaps in different ways, and the manifest will
expand to support different publishing solutions.
:::

## Configuration file

The Snap configuration file, `snap.config.js` or `snap.config.ts`, must be placed in the project
root directory.
You can override the default values of the
[Snaps configuration options](../../reference/config-options.md) by specifying them in the
configuration file.
For example:

<Tabs>
<TabItem value="JavaScript">

```javascript title="snap.config.js"
module.exports = {
  input: "src/index.js",
  output: {
    path: "dist",
  },
  server: {
    port: 9000,
  },
}
```

</TabItem>
<TabItem value="TypeScript">

```typescript title="snap.config.ts"
import type { SnapConfig } from "@metamask/snaps-cli"

const config: SnapConfig = {
  input: "src/index.js",
  output: {
    path: "dist",
  },
  server: {
    port: 9000,
  },
}

export default config
```

</TabItem>
</Tabs>

:::note
You should not publish the configuration file to npm, since it's only used for development and
building.
However, you can commit the file to GitHub to share the configuration with your team, since it
shouldn't contain any secrets.
:::

## Bundle file

Because of the way Snaps are executed, they must be published as a single `.js` file containing the
entire source code and all dependencies.
Moreover, the [Snaps execution environment](execution-environment.md) has no DOM, no Node.js
APIs, and no filesystem access, so anything that relies on the DOM doesn't work, and any Node
built-ins must be bundled along with the Snap.

Running `yarn start` bundles your Snap for you.

You can also run [`yarn mm-snap build`](../../reference/cli.md#b-build) to bundle your
Snap using [webpack](https://webpack.js.org/).
This command finds all dependencies using your specified main entry point and outputs a bundle
file to your specified output path.
