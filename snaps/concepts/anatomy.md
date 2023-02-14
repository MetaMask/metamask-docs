# Snap anatomy

If you look at the directory structure of the
[Snaps template repository](https://github.com/MetaMask/template-snap-monorepo) used in the
[Snaps quickstart](../get-started/quickstart.md), it looks something like this:

```text
template-snap-monorepo/
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
|  |  |- ... (snap content)
├─ package.json
├─ ... (other stuff)
```

Source files other than `index.js` are located through its imports.
The defaults can be overwritten in the [configuration file](#configuration-file).

:::tip Create a snap project
When you create a new snap project using `mm-snap init`, it has all these files.
Still, we recommend
[cloning the template snap repository to get started](../get-started/quickstart.md).
:::

This page examines the major components of a snap:

- [The source code](#source-code)
- [The manifest file](#manifest-file)
- [The configuration file](#configuration-file)
- [The bundle file](#bundle-file)

## Source code

If you're familiar with JavaScript or TypeScript development, developing a snap might feel familiar
to you.
Consider this simple snap, `hello-snap`:

```javascript
module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      return 'world!';

    default:
      throw new Error('Method not found.');
  }
};
```

To communicate with the outside world, the snap must implement its own JSON-RPC API by exposing
the exported function [`onRpcRequest`](../reference/exports.md#onrpcrequest).
Whenever the snap receives a JSON-RPC request from a dapp or another snap, this handler function is
called with the specified parameters.

In addition to being able to expose a JSON-RPC API, snaps can access the global object `wallet`.
This object exposes a very similar API using `window.ethereum`.
MetaMask receives and processes any message sent using `wallet.request()`.

If a dapp wants to use `hello-snap`, it can implement something like this:

```javascript
await ethereum.request({
  method: 'wallet_enable',
  params: [
    {
      wallet_snap: {
        'npm:hello-snap': {
          version: '^1.0.0',
        },
      },
    },
  ],
});

const hello = await ethereum.request({
  method: 'wallet_invokeSnap',
  params: ['npm:hello-snap', { method: 'hello' }],
});

console.log(hello); // 'world!'
```

The snap's RPC API is completely up to you, as long as it's a valid
[JSON-RPC](https://www.jsonrpc.org/specification) API.

:::tip Does my snap need to have an RPC API?
No, that's also up to you!
If your snap can do something useful without receiving and responding to JSON-RPC requests, then you
can skip exporting `onRpcRequest`.
However, if you want to do something such as manage the user's keys for a particular protocol and
create a dapp that, for example, sends transactions for that protocol using your snap, you must
specify an RPC API.
:::

## Manifest file

To get MetaMask to execute your snap, you must have a valid manifest file named `snap.manifest.json`,
located in your package root directory.
The manifest file of `hello-snap` would look something like this:

```json
{
  "version": "1.0.0",
  "proposedName": "hello-snap",
  "description": "A snap that says hello!",
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

The manifest tells MetaMask important information about your snap, such as where it's published
(using `source.location`) and how to verify the integrity of the snap source code (by attempting to
reproduce the `source.shasum` value).

:::note
Currently, snaps can only be
[published to the official npm registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry),
and the manifest must also match the corresponding fields of the `package.json` file.
In the future, developers will be able to distribute snaps in different ways, and the manifest will
expand to support different publishing solutions.

The [snaps publishing specification](https://github.com/MetaMask/specifications/blob/main/snaps/publishing.md)
details the requirements of both `snap.manifest.json` and its relationship to `package.json`.
:::

You might need to modify some manifest fields manually.
For example, if you change the location of the (optional) icon SVG file, you must update
`source.location.npm.iconPath` to match.
You can also use the [command line](../reference/cli/index.md) to update some fields for you.
For example, `mm-snap build` or `mm-snap manifest --fix` updates `source.shasum`.

## Configuration file

The snap configuration file, `snap.config.js`, should be placed in the project root directory.
You can override the default values of the [Snaps CLI options](../reference/cli/options.md) by specifying
them in the `cliOptions` property of the configuration file.
For example:

```javascript
module.exports = {
  cliOptions: {
    src: 'lib/index.js',
    dist: 'out',
    port: 9000,
  },
};
```

If you want to customize the Browserify build process, you can provide the `bundlerCustomizer` property.
It's a function that takes one argument, the
[browserify object](https://github.com/browserify/browserify#api-example) which MetaMask uses
internally to bundle the snap.
You can transform it in any way you want, for example, adding plugins.
The `bundleCustomizer` function looks something like this:

```javascript
const brfs = require('brfs');

module.exports = {
  cliOptions: {
    /* ... */
  },
  bundlerCustomizer: (bundler) => {
    bundler.transform(brfs);
  },
};
```

:::caution
You should **not** publish the configuration file.
:::

## Bundle file

Because of the way snaps are executed, they must be published as a single `.js` file containing the
entire source code and all dependencies.
Moreover, the [Snaps execution environment](execution-environment.md) has no DOM, no Node.js
APIs, and no filesystem access, so anything that relies on the DOM doesn't work, and any Node
built-ins must be bundled along with the snap.

Use the command `mm-snap build` to bundle your snap using [Browserify](https://browserify.org).
This command finds all dependencies using your specified main entry point and outputs a bundle
file to your specified output path.
