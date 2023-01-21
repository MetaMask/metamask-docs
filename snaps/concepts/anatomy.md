# Anatomy of a snap

This section describes the anatomy of a snap based on the template used in the connect to a snap
tutorial.

So, you have installed [MetaMask Flask](https://metamask.io/flask), cloned the
[@metamask/template-snap-monorepo](https://github.com/MetaMask/template-snap-monorepo) repository,
and have served the "Hello, World!" snap locally.
It's time to develop your own snap.

A snap is a JavaScript program that, conceptually, runs in a sandboxed environment inside MetaMask.
At the moment, snaps must be distributed as npm packages on the official npm registry
(`https://registry.npmjs.org/`), but different distribution mechanisms will be supported in the future.
If you look at the directory structure of the template snap repository, you'll see that it looks
something like this:

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
The defaults can be overwritten using the `snap.config.json` [config file](#the-snap-configuration-file).

:::tip Creating a snap project
When you create a new snap project using `mm-snap init`, you'll notice that it will have all of
these files.
Nevertheless, cloning the [template snap repository](https://github.com/MetaMask/template-snap-monorepo)
is probably the best way to get started.
:::

In this section, we'll review the major components of a snap: the source code, the manifest
(and `package.json`), and the bundle file.

## The snap source code

If you're familiar with JavaScript or TypeScript development of any kind, developing a snap should
feel quite familiar to you.
Consider this trivial snap, which we'll call `hello-snap`:

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

In order to communicate with the outside world, the snap must implement its own JSON-RPC API by
exposing an exported function called `onRpcRequest`.
Whenever the snap receives a JSON-RPC request from an external entity (a dapp or even another snap),
this handler function will be called with the above parameters.

In addition to being able to expose a JSON-RPC API, snaps can access the global object `wallet`.
This object exposes a very similar API to the one exposed to dapps via `window.ethereum`.
Any message sent via `wallet.request()` will be received and processed by MetaMask.

If a dapp wanted to use `hello-snap`, it would do something like this:

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

The snap's RPC API is completely up to you, so long as it's a valid
[JSON-RPC](https://www.jsonrpc.org/specification) API.

:::tip Does my snap need to have an RPC API?
Well, no, that's also up to you! If your snap can do something useful without receiving and responding to JSON-RPC requests, then you can skip exporting `onRpcRequest`.
However, if you want to do something like manage the user's keys for a particular protocol and create a dapp that e.g. sends transactions for that protocol via your snap, you need to specify an RPC API.
:::

### The snap manifest

In order to get MetaMask to execute your snap, you need to have a valid manifest file, located in
your package root directory under the name `snap.manifest.json`.
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

The manifest tells MetaMask important information about your snap, most especially where it's
published (via `source.location`) and how to verify the integrity of the snap source code (by
attempting to reproduce the `source.shasum` value).
For the time being, snaps can only be
[published to the official npm registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry),
and the manifest must also match the corresponding fields of the `package.json` file.
Over time, developers will be able to distribute snaps in a variety of different ways, and the
manifest will expand to support different publishing solutions.

:::tip The snaps publishing specification
The [snaps publishing specification](https://github.com/MetaMask/specifications/blob/main/snaps/publishing.md) details the requirements of both `snap.manifest.json` and its relationship to `package.json`.
:::

In the course of developing your snap, you will have to modify some of the manifest fields manually.
For example, if you change the location of the (optional) icon SVG file,
`source.location.npm.iconPath` must be updated to match.
Meanwhile, the CLI will update some of the fields for you, e.g. `source.shasum` whenever you run
`mm-snap build` (by default) or `mm-snap manifest --fix`.

### The snap configuration file

`snap.config.js` should be placed in the project root directory.
It can override cli options - the property `cliOptions` should have string keys matching command arguments.
Values become argument defaults, which can still be overridden on the command line.
It would look something like this:

```javascript
module.exports = {
  cliOptions: {
    src: 'lib/index.js',
    dist: 'out',
    port: 9000,
  },
};
```

If you want to customize the Browserify build process, you can provide `bundlerCustomizer` property.
It's a function that takes one argument, the
[browserify object](https://github.com/browserify/browserify#api-example) which we use internally to
bundle the snap.
You can transform it in any way you want, for example adding plugins.
The `bundleCustomizer` function would look something like this:

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

The configuration file should not be published.

### The snap bundle file

Because of the way snaps are executed, they must be published as a single `.js` file containing the
entire source code and all dependencies.
Moreover, the [snaps execution environment](#the-snap-execution-environment) has no DOM, no Node.js
APIs, and (needless to say) no filesystem access, so anything that relies on the DOM won't work, and
any Node builtins have to be bundled along with the snap as well.
If this sounds like a lot to worry about, `mm-snap build` is your friend, because it will bundle
your snap for you using [Browserify](https://browserify.org).

`mm-snap build` will find all dependencies via your specified main entry point and output a bundle
file to your specified output path.
