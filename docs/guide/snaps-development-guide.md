# Development Guide

::: tip Only Available in MetaMask Flask
Snaps is only available in [MetaMask Flask](https://metamask.io/flask).
:::

::: tip Feature Requests
Do you have feature requests? Other ideas? We'd love to hear about them! [Click here](https://community.metamask.io/c/metamask-flask) to join the discussion.
:::

Developing Snaps is much like developing any JavaScript project, but there are some things that may be new even to a seasoned developer.
Read on to learn more!

## Table of Contents

[[toc]]

## The Snaps CLI

Before continuing, you should know that [`@metamask/snaps-cli`](https://www.npmjs.com/package/@metamask/snaps-cli) exists, and will be one of your most important tools as you get started with snap development.
The CLI is can be installed globally using `npm` or `yarn`, and provides commands for initiating a snap project and building, executing, and serving your snap for local development.
Executing `mm-snap --help` will provide detailed usage instructions.

## The Anatomy of a Snap

::: warning Prerequisite Reading
This guide assumes that you've completed the ["Getting Started" tutorial](./snaps.html#getting-started).
:::

So, you have installed [MetaMask Flask](https://metamask.io/flask), cloned the [@metamask/template-snap](https://github.com/MetaMask/template-snap) repository, and have served the "Hello, World!" snap locally. It's time to develop your own snap.

A snap is a JavaScript program that, conceptually, runs in a sandboxed environment inside MetaMask.
At the moment, snaps must be distributed as npm packages on the official npm registry (`https://registry.npmjs.org/`), but different distribution mechanisms will be supported in the future.
If you look at the directory structure of the template snap repository, you'll see that it looks something like this:

```text
template-snap/
├─ dist/
│  ├─ bundle.js
├─ package.json
├─ snap.manifest.json
├─ src/
│  ├─ index.js
├─ ... (other stuff)
```

::: tip Creating a Snap Project
When you create a new snap project using `mm-snap init`, you'll notice that it will have all of these files.
Nevertheless, cloning the [template snap repository](https://github.com/MetaMask/template-snap) is probably the best way to get started.
:::

In this section, we'll review the major components of the snap: the source code, the manifest (and `package.json`), and the bundle file.

### The Snap Source Code

If you're familiar with JavaScript or TypeScript development of any kind, developing a snap should feel quite familiar to you.
Consider this trivial snap, which we'll call `hello-snap`:

```javascript
wallet.registerRpcMessageHandler(async (originString, requestObject) => {
  switch (requestObject.method) {
    case 'hello':
      return 'world!';

    default:
      throw new Error('Method not found.');
  }
});
```

`wallet` is a global object that exposes the MetaMask Snap API, much like `window.ethereum` exposes our API to dapps.
Any message sent via `wallet.request()` will be received and processed by MetaMask.
In order to communicate with the outside world, the snap must implement its own RPC API by passing a handler function to `registerRpcMessageHandler`.
Whenever the snap receives a JSON-RPC request from an external entity (a dapp or even another snap), the handler function will be called with the above parameters.

If a dapp wanted to use `hello-snap`, it would do something like this:

```javascript
await ethereum.request({
  method: 'wallet_enable',
  params: [
    {
      wallet_snap: {
        'npm:hello-snap': {},
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

The snap's RPC API is completely up to you, so long as it's a valid [JSON-RPC](https://www.jsonrpc.org/specification) API.

::: tip Does my snap need to have an RPC API?
Well, no, that's also up to you! If your snap can do something useful without receiving and responding to JSON-RPC requests, then you can skip calling `registerRpcMessageHandler`.
However, if you want to do something like manage the user's keys for a particular protocol and create a dapp that e.g. send transactions for that protocol via your snap, you need to specify an RPC API.
:::

### The Snap Manifest

In order to get MetaMask to execute your snap, you need to have a valid manifest file, located in your package root directory under the name `snap.manifest.json`.
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

The manifest tells MetaMask important information about your snap, most especially where it's published (via `source.location`) and how to verify the integrity of the snap source code (by attempting to reproduce the `source.shasum` value).
For the time being, snaps can only be published to the official npm registry, and the manifest must also match the corresponding fields of the `package.json` file.
Over time, developers will be able to distribute snaps in a variety of different ways, and the manifest will expand to support different publishing solutions.

::: tip The Snaps Publishing Specification
The [snaps publishing specification](https://github.com/MetaMask/specifications/blob/main/snaps/publishing.md) details the requirements of both `snap.manifest.json` and its relationship to `package.json`.
:::

In the course of developing your snap, you will have to modify some of the manifest fields manually.
For example, if you change the location of the (optional) icon SVG file, `source.location.npm.iconPath` must be updated to match.
Meanwhile, the CLI will update some of the fields for you, e.g. `source.shasum` whenever you run `mm-snap build` (by default) or `mm-snap manifest --fix`.

## Resources

To get started with Snaps, you first have to download [MetaMask Flask](https://metamask.io/flask).

While this guide is under construction, we **highly recommend** consulting the [readme of `@metamask/snaps-cli`](https://www.npmjs.com/package/@metamask/snaps-cli), the command line utility we created to help with snap development.

In addition, you can review the growing number of [example snaps](https://github.com/MetaMask/snaps-skunkworks/tree/main/packages/snap-examples) maintained by MetaMask.

Finally, you may wish to check out the first functional key management snap ever made, [the Filecoin Snap, or `filsnap`](https://github.com/Chainsafe/filsnap/).

## Gotchas

### Accessing the Internet in a Snap

Snaps do not get access to any sensitive APIs or features by default, and Internet access is no exception to that rule.
To access the Internet, you must be specify the permission `endowment:network-access` in the `initialPermissions` of your `snap.manifest.json` file.
This will grant you access to the global `fetch` API.
Other global network APIs may be made available in the future.

### Writing SES-Compatible JavaScript

Snaps is implemented using Secure EcmaScript, or [SES](https://github.com/endojs/endo/tree/master/packages/ses), effectively a subset of the JavaScript language designed to enable mutually suspicious programs to execute in the same JavaScript process (or more accurately, the same [realm](https://tc39.es/ecma262/#realm)).

For present purposes, the important thing to understand is that, because SES is effectively a subset of JavaScript, you may write - or more likely, import - code that does not execute under SES.
[`@metamask/snaps-cli`](https://www.npmjs.com/package/@metamask/snaps-cli) will attempt to fix some such issues for you via the `mm-snap build` command, but it can't fix them all.

When `mm-snap build` fails during the `eval` step (you can also directly execute a built snap using `mm-snap eval`), you have to attempt to fix the issue manually.
If the problem is in a dependency, you can try a different version or make use of tools such as [`patch-package`](https://npmjs.com/package/patch-package) to fix the issue locally yourself.

If you're still stuck, you can ask for help [here](https://community.metamask.io/c/metamask-flask).
