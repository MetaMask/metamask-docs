---
description: Learn about the anatomy of a Snap project.
sidebar_position: 1
---

# Snaps anatomy

If you look at the directory structure of the Snaps monorepo project generated in the
[Snaps quickstart](../get-started/quickstart.mdx), it looks something like this:

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

Source files other than `index.ts` are located through its imports.
The defaults can be overwritten in the [configuration file](#configuration-file).

This page examines the major components of a Snap:

- [The source code](#source-code) contains the primary code of the Snap.
- [The manifest file](#manifest-file) tells MetaMask important information about the Snap.
- [The configuration file](#configuration-file) specifies configuration options for the Snap.
- [The bundle file](#bundle-file) is the output file of the published Snap.

## Source code

If you're familiar with JavaScript or TypeScript development, developing a Snap might feel familiar
to you.
Consider this simple Snap, `Hello World`:

```typescript title="index.ts"
module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {
    // Expose a "hello" RPC method to dapps
    case "hello":
      return "world!";

    default:
      throw new Error("Method not found.");
  }
};
```

To communicate with the outside world, the Snap must implement its own JSON-RPC API by exposing
the exported function [`onRpcRequest`](../reference/exports.md#onrpcrequest).
Whenever the Snap receives a JSON-RPC request from a dapp or another Snap, this handler function is
called with the specified parameters.

In addition to being able to expose a JSON-RPC API, Snaps can access the global object `snap`.
You can use this object to make Snaps-specific JSON-RPC requests.

If a dapp wants to use `Hello World`, assuming the Snap is published to npm using the package name `hello-snap`, the dapp can implement something like this:

```javascript
// Connect to the Snap, enabling its usage inside the dapp
// If the Snap is not already installed, the MetaMask user 
// will be prompted to install it
await window.ethereum.request({
  method: "wallet_requestSnaps",
  params: {
    "npm:hello-snap": {},
  },
});

// Invoke the "hello" RPC method exposed by the Snap
const response = await window.ethereum.request({
  method: "wallet_invokeSnap",
  params: { snapId: "npm:hello-snap", request: { method: "hello" } },
});

console.log(response); // 'world!'
```

The Snap's RPC API is completely up to you, as long as it's a valid
[JSON-RPC](https://www.jsonrpc.org/specification) API.

:::tip Does my Snap need to have an RPC API?
No, that's also up to you!
If your Snap can do something useful without receiving and responding to JSON-RPC requests, such as
providing [transaction insights](../reference/exports.md#ontransaction), then you can skip exporting
`onRpcRequest`.
However, if you want to do something such as manage the user's keys for a particular protocol and
create a dapp that, for example, sends transactions for that protocol using your Snap, you must
specify an RPC API.
:::

## Manifest file

To get MetaMask to execute your Snap, you must have a valid manifest file named `snap.manifest.json`,
located in your package root directory.
The manifest file of `Hello World` would look something like this:

```json
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
(using `source.location`) and how to verify the integrity of the Snap source code (by attempting to
reproduce the `source.shasum` value).

:::note
Currently, Snaps can only be
[published to the official npm registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry),
and the manifest must also match the corresponding fields of the `package.json` file.
In the future, developers will be able to distribute Snaps in different ways, and the manifest will
expand to support different publishing solutions.

The [Snaps publishing specification](https://github.com/MetaMask/SIPs/blob/main/SIPS/sip-9.md)
details the requirements of both `snap.manifest.json` and its relationship to `package.json`.
:::

You might need to modify some manifest fields manually.
For example, if you change the location of the icon SVG file, you must update
`source.location.npm.iconPath` to match.
You can also use the [Snaps CLI](../reference/cli/subcommands.md) to update some fields for you.
For example, running [`yarn run mm-snap build`](../reference/cli/subcommands.md#b-build) or
[`yarn run mm-snap manifest --fix`](../reference/cli/subcommands.md#m-manifest) updates `source.shasum`.

## Configuration file

The Snap configuration file, `snap.config.ts`, should be placed in the project root directory.
You can override the default values of the [Snaps CLI options](../reference/cli/options.md) by specifying
them in the `config` object of the configuration file.
For example:

```ts
import { resolve } from 'path';
import type { SnapConfig } from '@metamask/snaps-cli';

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.ts'),
  server: {
    port: 8080,
  },
  polyfills: {
    buffer: true,
  },
};

export default config;
```

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

You can also run [`yarn run mm-snap build`](../reference/cli/subcommands.md#b-build) to bundle your
Snap using [webpack](https://webpack.js.org/) or [Browserify](https://browserify.org).
This command finds all dependencies using your specified main entry point and outputs a bundle
file to your specified output path.
