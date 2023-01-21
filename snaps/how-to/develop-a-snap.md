# Develop a snap

Developing a snap is much like developing any JavaScript project, but there are some things that may
be new even to a seasoned developer.

Snaps exist in order to modify the functionality of MetaMask at runtime while only asking the user
for permission.
Snaps can:

1. Extend the dapp-facing MetaMask JSON-RPC API in arbitrary ways.
1. Integrate with and extend the functionality of MetaMask using the
   [snaps RPC methods and permissions](./snaps-rpc-api.html).

In this section, we'll go into detail about how to actually develop a snap and overcome common
issues encountered during development.

## The snap lifecycle

Before beginning the development of your snap, it's important to understand the snap lifecycle.
Just like [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) or
AWS lambda functions, snaps are designed to wake up in response to messages / events, and shut down
when they are idle.
We say that snaps have an "ephemeral" lifecycle: here one moment, gone the next.
In addition, if MetaMask detects that a snap becomes unresponsive, it will be shut down.
This does not mean that you can't create long-running snaps, but it does mean that your snaps must
handle being shut down, especially when they are not within the JSON-RPC request / response cycle.

A snap is considered "unresponsive" if:

1. It has not received a JSON-RPC request for 30 seconds.
1. It takes more than 60 seconds to process a JSON-RPC request.

Stopped snaps are started whenever they receive a JSON-RPC request, unless they have been disabled.
If a snap is disabled, the user must re-enable it before it can start again.

## Permissions

Just like dapps need to request the `eth_accounts` permission in order to access the user's Ethereum
accounts, snaps need to request access to the sensitive methods in the snaps RPC API.
Snaps can effectively expand the MetaMask RPC API by implementing their own and exposing it via
`onRpcRequest`, but in order to integrate deeply with MetaMask, you need to make use of the Snaps
RPC API's [restricted methods](./snaps-rpc-api.html#restricted-methods).
Access restriction is implemented using
[EIP-2255 wallet permissions](https://eips.ethereum.org/EIPS/eip-2255), and you must specify the
permissions required by your snap in the manifest's `initialPermissions` field.
You can find an example of how to do this in the
[template snap's manifest](https://github.com/MetaMask/template-snap-monorepo/blob/main/packages/snap/snap.manifest.json).

### Access the Internet

Snaps do not get access to any sensitive APIs or features by default, and Internet access is no
exception to that rule.
To access the Internet, you must specify the permission `endowment:network-access` in the
`initialPermissions` of your `snap.manifest.json` file.
This will grant you access to the global `fetch` and `WebSocket` APIs.
Other global network APIs may be made available in the future.

:::tip "Endowment"?
While most permission names correspond directly to JSON-RPC methods, permissions prefixed with `endowment:` are an exception.
In the language of the MetaMask permission system, an "endowment" is just a type of permission.
At the moment, we only use this permission type to enable snap internet access, but we may add other such permissions in the future.
:::

## The snap user interface

Any snap will need to represent itself and what it does to the end user.
Via the MetaMask settings page, the user can see their installed snaps.
For each snap, the user can:

- see most of its manifest data
- see its execution status (running, stopped, or crashed)
- enable and disable the snap

Other than the settings page, the only way a snap can modify the MetaMask UI is by creating a
confirmation using the [`snap_confirm`](./snaps-rpc-api.html#snap-confirm) RPC method.
This means that many snaps will have to rely on web pages (i.e., dapps) and their own RPC methods to
present their data to the user.

Providing more ways for snaps to modify the MetaMask UI is an important goal of the snaps system,
and over time more and more snaps will be able to contain their user interfaces entirely within
MetaMask itself.

### Detect the user's MetaMask version

When developing a website that depends on Snaps, it's important to know whether MetaMask Flask is installed.
For this purpose, we recommend using the [`@metamask/detect-provider`](https://npmjs.com/package/@metamask/detect-provider)
package [`web3_clientVersion`](https://metamask.github.io/api-playground/api-documentation/#web3_clientVersion)
RPC method as demonstrated in the following snippet:

```js
import detectEthereumProvider from '@metamask/detect-provider';

// This resolves to the value of window.ethereum or null
const provider = await detectEthereumProvider();

// web3_clientVersion returns the installed MetaMask version as a string
const isFlask = (
  await provider?.request({ method: 'web3_clientVersion' })
)?.includes('flask');

if (provider && isFlask) {
  console.log('MetaMask Flask successfully detected!');

  // Now you can use Snaps!
} else {
  console.error('Please install MetaMask Flask!', error);
}
```

## The snap execution environment

Snaps execute in a sandboxed environment that's running Secure EcmaScript (SES, see
[below](#secure-ecmascript-ses)).
There is no DOM, no Node.js builtins, and no platform-specific APIs other than MetaMask's `wallet`
global object.
Almost all standard JavaScript globals contained in
[this list](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) that
are also in Node.js are available as normal.
This includes things like `Promise`, `Error`, `Math`, `Set`, `Reflect` etc.

In addition, the following globals are available:

- `console`
- `crypto`
- `fetch` / `WebSocket` (with the [appropriate permission](#accessing-the-internet))
- `setTimeout` / `clearTimeout`
- `setInterval` / `clearInterval`
- `SubtleCrypto`
- `WebAssembly`
- `TextEncoder` / `TextDecoder`
- `atob` / `btoa`
- `URL`

The execution environment is instrumented in this way to:

1. Prevent snaps from influencing any other running code, including MetaMask itself.
   - In plain terms, to prevent all snaps from polluting the global environment and malicious snaps
     from stealing the user's stuff.
1. Prevent snaps from accessing sensitive JavaScript APIs (like `fetch`) without permission.
1. Ensure that the execution environment is "fully virtualizable", i.e. platform-independent.

This allows us to safely execute snaps anywhere, without the snap needing to worry about where and
how it is executed.

### Secure EcmaScript (SES)

Secure EcmaScript, or [SES](https://github.com/endojs/endo/tree/master/packages/ses), is a subset of
the JavaScript language designed to enable mutually suspicious programs to execute in the same
JavaScript process (or more accurately, the same [realm](https://tc39.es/ecma262/#realm)).
You can think of it as a more severe form of
[strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).

## Fix build and evaluation issues

Because SES adds additional restrictions on the JavaScript runtime on top of strict mode, code that
executes normally under strict mode may not do so under SES.
`mm-snap build` will by default attempt to execute your snap in a stubbed SES environment.
You can also disable this behavior and run the evaluation step separately using `mm-snap eval`.
If an error is thrown during this step, it is likely due to a SES incompatibility, and you have to
fix the issues manually.
In our experience, these incompatibilities tend to occur in dependencies.

While the errors you get from SES may seem scary, they're usually not that hard to fix.
The actual file, function, and variable names in the `mm-snap eval` error stack trace may not make a
lot of sense to you, but the line numbers should correspond to your snap bundle file.
In this way, you can identify if the error is due to your code or one of your dependencies.
If the problem is in a dependency, you can try a different version or to fix the issue locally by
using tools such as [`patch-package`](https://npmjs.com/package/patch-package) or by modifying the
snap bundle file directly.

:::tip Patching dependencies
You can read more about patching dependencies [here](./snaps-patching-dependencies.html)
:::

To give you an idea of a common error and how to fix it, "sloppily" declared variables (i.e.
assigning to a new variable without an explicit variable declaration) are forbidden in strict mode,
and therefore in SES as well.
If you get an error during the `eval` step that says something like `variableName is not defined`,
simply prepending `var variableName;` to your snap bundle may solve the problem.
(This actually happened so frequently with [Babel's](https://babeljs.io/) `regeneratorRuntime` that
`mm-snap build` automatically handles that one.)

:::caution Did you modify the snap bundle after building?
Don't forget to run `mm-snap manifest --fix` if you modified your snap bundle after building.
Otherwise your manifest `shasum` value won't be correct, and attempting to install your snap fails.
:::

If you run into a build or eval issue that you can't solve on your own, please create an issue on
the [MetaMask/snaps-monorepo](https://github.com/MetaMask/snaps-monorepo) repository.

### Use other build tools

If you prefer building your snap with a build system you are more comfortable with, we have released
several plugins for other build systems that you can use.
We currently support:

- [Webpack](https://www.npmjs.com/package/@metamask/snaps-webpack-plugin)
- [Rollup](https://www.npmjs.com/package/@metamask/rollup-plugin-snaps)
- [Browserify](https://www.npmjs.com/package/@metamask/snaps-browserify-plugin)

For examples on how to set up these build systems yourself, please visit our
[examples](https://github.com/MetaMask/snaps-monorepo/tree/main/packages/examples/examples).

We still recommend using our CLI `mm-snap` to make sure your manifest `shasum` value is correct by
running `mm-snap manifest --fix` after creating your bundle. You may also benefit from running
`mm-snap eval` to detect any SES issues up front.

## Test your snap

Test your snap by hosting it locally using `mm-snap serve`, installing it in Flask, and calling its
RPC methods from a web page.

## Debug your snap

To debug your snap, your best bet is to use `console.log` and inspecting the MetaMask background process.
You can add your log statements in your source coder and then build your snap, or add them directly
to your snap bundle and use `mm-snap manifest --fix` to update the shasum in your snap manifest file.
Recall that the manifest shasum must match the contents of your bundle at the time that MetaMask
fetches your snap.

:::tip Remember to reinstall your snap
Because adding logs modifies the snap source code, you have to reinstall the snap whenever you add a
log statement.
The process of reinstalling your snap during local development will improve in the next release of
MetaMask Flask, and soon be available in pre-release builds.
:::

The log output is only visible in the extension background process console.
Follow these instructions to inspect the background process and view its console:

- Chromium
  - Go to `chrome://extensions`
  - Find the MetaMask extension
  - Click on "Details"
  - Under "Inspect Views", click `background.html`

## Publish your snap

Snaps are npm packages, so publishing a Snap is as simple as publishing an npm package.
Refer to the [npm cli documentation](https://docs.npmjs.com/cli/v8/commands/npm-publish) for details
on publishing to the public registry.
Take note of the following details specific to Snaps:

- The version in `package.json` and `snap.manifest.json` must match.
- The image specified in `iconPath` in the manifest file will be used as the icon displayed when
  installing and displaying confirmations from the Snap.

After publishing the Snap, any dapp can connect to the Snap by using the snapId `npm:[packageName]`.

## Distribute your snap

Since snaps are currently intended for a developer audience, MetaMask does not currently facilitate
distributing snaps to a wide audience.
If you have a website that expects the user to install a snap, ask the user to install MetaMask
Flask, and then ask the user to install the snap using the
[`wallet_enable`](./snaps-rpc-api.html#wallet-enable) RPC method.

In the future, MetaMask will create some way for users to more easily discover snaps, but everyone
can always build, publish, and use snaps without MetaMask's permission.
(Although we may try to make it difficult to use known scams.)

## Resources and tools

You can review the growing number of
[example snaps](https://github.com/MetaMask/snaps-monorepo/tree/main/packages/examples) maintained
by MetaMask, as well as the following reference Snaps.
Each one is fully-functional and open-source:

- [StarkNet](https://github.com/ConsenSys/starknet-snap)
- [FilSnap for Filecoin](https://github.com/Chainsafe/filsnap/)
- [Password Manager Snap](https://github.com/ritave/snap-passwordManager)
- [Transaction Simulation with Ganache](https://github.com/Montoya/tx-simulation-with-ganache-snap)
  (uses Truffle for local testing)

You can also follow these tutorials which will walk you through the steps to develop and test a Snap:

- A 5-minute tutorial that uses the `network-access` permission:
  [Gas Fee Snap Tutorial](https://github.com/Montoya/gas-fee-snap#readme)
- A 30-minute tutorial that uses the `manageState` permission:
  [Address Book Snap Tutorial](https://github.com/Montoya/address-book-snap-tutorial#readme)
- A 45-minute tutorial that shows you how to build a transaction insights snap:
  [4byte API snap video](https://archive.devcon.org/archive/watch/6/getting-started-with-metamask-snaps/?tab=YouTube)
  and [text guide](https://hackmd.io/@rekmarks/devcon-vi)

MetaMask also maintains tools to help developers build, debug, and maintain snaps:

- [Template Snap](https://github.com/MetaMask/template-snap-monorepo) - A template that includes
  TypeScript/React and vanilla JS options and a CLI for building, packaging, and deploying your snap
  and a companion dapp
- [Snaps Truffle Box](https://trufflesuite.com/boxes/metamask-snap-box/) - A template that combines
  the TypeScript template snap and Truffle so you can easily test snaps that use smart contracts
  with Ganache
- [Test Snaps](https://github.com/MetaMask/test-snaps) - A collection of test snaps and a dapp for
  evaluating them

Finally, if you need help, you can ask for help on our
[discussion board](https://github.com/MetaMask/snaps-monorepo/discussions), and if you encounter any
issues, please open an issue in our [issue tracker](https://github.com/MetaMask/snaps-monorepo/issues).
