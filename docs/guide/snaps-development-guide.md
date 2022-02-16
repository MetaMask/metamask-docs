# Development Guide

::: tip Only Available in MetaMask Flask
[Snaps](./snaps.html) is only available in [MetaMask Flask](https://metamask.io/flask).
:::

::: tip Feature Requests
Do you have feature requests? Other ideas? We'd love to hear about them! [Click here](https://community.metamask.io/c/metamask-flask) to join the discussion.
:::

Developing a snap is much like developing any JavaScript project, but there are some things that may be new even to a seasoned developer.
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

In this section, we'll review the major components of a snap: the source code, the manifest (and `package.json`), and the bundle file.

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
However, if you want to do something like manage the user's keys for a particular protocol and create a dapp that e.g. sends transactions for that protocol via your snap, you need to specify an RPC API.
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
For the time being, snaps can only be [published to the official npm registry](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry), and the manifest must also match the corresponding fields of the `package.json` file.
Over time, developers will be able to distribute snaps in a variety of different ways, and the manifest will expand to support different publishing solutions.

::: tip The Snaps Publishing Specification
The [snaps publishing specification](https://github.com/MetaMask/specifications/blob/main/snaps/publishing.md) details the requirements of both `snap.manifest.json` and its relationship to `package.json`.
:::

In the course of developing your snap, you will have to modify some of the manifest fields manually.
For example, if you change the location of the (optional) icon SVG file, `source.location.npm.iconPath` must be updated to match.
Meanwhile, the CLI will update some of the fields for you, e.g. `source.shasum` whenever you run `mm-snap build` (by default) or `mm-snap manifest --fix`.

### The Snap Bundle File

Because of the way snaps are executed, they must be published as a single `.js` file containing the entire source code and all dependencies.
Moreover, the [snaps execution environment](#the-snap-execution-environment) has no DOM, no Node.js APIs, and (needless to say) no filesystem access, so anything that relies on the DOM won't work, and any Node builtins have to be bundled along with the snap as well.
If this sounds like a lot to worry about, `mm-snap build` is your friend, because it will bundle your snap for you using [Browserify](https://browserify.org).

`mm-snap build` will find all dependencies via your specified main entry point and output a bundle file to your specified output path.

## Developing a Snap

Snaps exist in order to modify the functionality of MetaMask at runtime while only asking the user for permission.
As we have seen in the [introduction to snaps](./snaps.html) and this guide, snaps can:

1. Extend the dapp-facing MetaMask JSON-RPC API in arbitrary ways.
2. Integrate with and extend the functionality of MetaMask using the [snaps RPC methods and permissions](./snaps-rpc-api.html).

In this section, we'll go into detail about how to actually develop a snap and overcome common issues encountered during development.

### The Snap Lifecycle

Before beginning the development of your snap, it's important to understand the snap lifecycle.
Just like [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) or AWS lambda functions, snaps are designed to wake up in response to messages / events, and shut down when they are idle.
We say that snaps have an "ephemeral" lifecycle: here one moment, gone the next.
In addition, if MetaMask detects that a snap becomes unresponsive, it will be shut down.
This does not mean that you can't create long-running snaps, but it does mean that your snaps must handle being shut down, especially when they are not within the JSON-RPC request / response cycle.

A snap is considered "unresponsive" if:

1. It has not received a JSON-RPC request for 30 seconds.
2. It takes more than 60 seconds to process a JSON-RPC request.

Stopped snaps are started whenever they receive a JSON-RPC request, unless they have been disabled.
If a snap is disabled, the user must re-enable it before it can start again.

### Permissions

Just like dapps need to request the `eth_accounts` permission in order to access the user's Ethereum accounts, snaps need to request access to the sensitive methods in the snaps RPC API.
Snaps can effectively expand the MetaMask RPC API by implementing their own using `wallet.registerRpcMessageHandler()`, but in order to integrate deeply with MetaMask, you need to make use of the Snaps RPC API's [restricted methods](./snaps-rpc-api.html#restricted-methods).
Access restriction is implemented using [EIP-2255 wallet permissions](https://eips.ethereum.org/EIPS/eip-2255), and you must specify the permissions required by your snap in the manifest's `initialPermissions` field.
You can find an example of how to do this in the [template snap's manifest](https://github.com/MetaMask/template-snap/blob/main/snap.manifest.json).

#### Accessing the Internet

Snaps do not get access to any sensitive APIs or features by default, and Internet access is no exception to that rule.
To access the Internet, you must specify the permission `endowment:network-access` in the `initialPermissions` of your `snap.manifest.json` file.
This will grant you access to the global `fetch` API.
Other global network APIs may be made available in the future.

::: tip "Endowment"?
While most permission names correspond directly to JSON-RPC methods, permissions prefixed with `endowment:` are an exception.
In the language of the MetaMask permission system, an "endowment" is just a type of permission.
At the moment, we only use this permission type to enable snap internet access, but we may add other such permissions in the future.
:::

### The Snap User Interface

Any snap will need to represent itself and what it does to the end user.
Via the MetaMask settings page, the user can see their installed snaps. For each snap, the user can:

- see most of its manifest data
- see its execution status (running, stopped, or crashed)
- enable and disable the snap

Other than the settings page, the only way a snap can modify the MetaMask UI is by creating a confirmation using the [`snap_confirm`](./snaps-rpc.html#snap-confirm) RPC method.
This means that many snaps will have to rely on web pages (i.e., dapps) and their own RPC methods to present their data to the user.

Providing more ways for snaps to modify the MetaMask UI is an important goal of the snaps system, and over time more and more snaps will be able to contain their user interfaces entirely within MetaMask itself.

### The Snap Execution Environment

Snaps execute in a sandboxed environment that's running Secure EcmaScript (SES, see [below](#secure-ecmascript-ses)).
There is no DOM, no Node.js builtins, and no platform-specific APIs other than MetaMask's `wallet` global object.
Almost all standard JavaScript globals contained in [this list](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) that are also in Node.js are available as normal.
This includes things like `Promise`, `Error`, `Math`, `Set`, `Reflect` etc.

In addition, the following globals are available:

- `console`
- `crypto`
- `fetch` (with the [appropriate permission](#accessing-the-internet))
- `setTimeout` / `clearTimeout`
- `SubtleCrypto`

The execution environment is instrumented in this way to:

1. Prevent snaps from influencing any other running code, including MetaMask itself.
   - In plain terms, to prevent all snaps from polluting the global environment and malicious snaps from stealing the user's stuff.
2. Prevent snaps from accessing sensitive JavaScript APIs (like `fetch`) without permission.
3. Ensure that the execution environment is "fully virtualizable", i.e. platform-independent.

This allows us to safely execute snaps anywhere, without the snap needing to worry about where and how it is executed.

#### Secure EcmaScript (SES)

Secure EcmaScript, or [SES](https://github.com/endojs/endo/tree/master/packages/ses), is effectively a subset of the JavaScript language designed to enable mutually suspicious programs to execute in the same JavaScript process (or more accurately, the same [realm](https://tc39.es/ecma262/#realm)).
You can think of it as a more severe form of [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

### Fixing Build / Eval Issues

Because SES adds additional restrictions on the JavaScript runtime on top of strict mode, code that executes normally under strict mode may not do so under SES.
`mm-snap build` will by default attempt to execute your snap in a stubbed SES environment.
You can also disable this behavior and run the evaluation step separately using `mm-snap eval`.
If an error is thrown during this step, it is likely due to a SES incompatibility, and you have to fix the issues manually.
In our experience, these incompatibilities tend to occur in dependencies.

While the errors you get from SES may seem scary, they're usually not that hard to fix.
The actual file, function, and variable names in the `mm-snap eval` error stack trace may not make a lot of sense to you, but the line numbers should correspond to your snap bundle file.
In this way, you can identify if the error is due to your code or one of your dependencies.
If the problem is in a dependency, you can try a different version or to fix the issue locally by using tools such as [`patch-package`](https://npmjs.com/package/patch-package) or modifying the snap bundle file directly.

To give you an idea of a common error and how to fix it, "sloppily" declared variables (i.e. assigning to a new variable without an explicit variable declaration) are forbidden in strict mode, and therefore in SES as well.
If you get an error during the `eval` step that says something like `variableName is not defined`, simply prepending `var variableName;` to your snap bundle may solve the problem.
(This actually happened so frequently with [Babel's](https://babeljs.io/) `regeneratorRuntime` that `mm-snap build` automatically handles that one.)

::: warning Did you modify the snap bundle after building?
Don't forget to run `mm-snap manifest --fix` if you modified your snap bundle after building.
Otherwise your manifest `shasum` value won't be correct, and attempting to install your snap will fail.
:::

If you run into a build or eval issue that you can't solve on your own, please create an issue on the [MetaMask/snaps-skunkworks](https://github.com/MetaMask/snaps-skunkworks) repository.

#### Using Other Build Tools

If `mm-snap build` isn't enough to bundle your snap — if you are using TypeScript, for example — you will have to compose `mm-snap build` with the rest of your build process.
If you have to complete any build steps before running `mm-snap build`, simply put your intermediate build files in a temporary directory and use the main entry point there as your `--src` argument to `mm-snap build`.

If you have to run any build steps after `mm-snap build`, remember that the file you ship must be a single `.js` file, and that you must run `mm-snap manifest --fix` to ensure that the manifest `shasum` value is correct.

### Testing Your Snap

Test your snap by hosting it locally using `mm-snap serve`, installing it in Flask, and calling its RPC methods from a web page.

### Distributing Your Snap

Since snaps are currently intended for a developer audience, MetaMask does not currently facilitate distributing snaps to a wide audience.
If you have a website that expects the user to install a snap, ask the user to install MetaMask Flask, and then ask the user to install the snap using the [`wallet_enable`](./snaps-rpc-api.html#wallet-enable) RPC method.

In the future, MetaMask will create some way for users to more easily discover snaps, but everyone will always be able to build, publish, and use snaps without MetaMask's permission.
(Although we may try to make it difficult to use known scams.)

## Resources

You can review the growing number of [example snaps](https://github.com/MetaMask/snaps-skunkworks/tree/main/packages/snap-examples) maintained by MetaMask, and you may wish to check out the first functional key management snap ever made, [the Filecoin Snap, or `filsnap`](https://github.com/Chainsafe/filsnap).

Finally, if you need help, you can ask for help in the [MetaMask/snaps-skunkworks](https://github.com/MetaMask/snaps-skunkworks) repository.
