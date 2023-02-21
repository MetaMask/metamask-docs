# Develop a snap

A snap can extend the dapp-facing [MetaMask JSON-RPC API](../../wallet/reference/rpc-api) in
arbitrary ways, or integrate with and extend the functionality of MetaMask using the
[Snaps JSON-RPC API](../reference/rpc-api.md) and [permissions](request-permissions.md).

Before developing a snap, it's important to understand:

- [The snap anatomy](../concepts/anatomy.md).
- [The snap lifecycle](../concepts/lifecycle.md).
- [The snap user interface](../concepts/user-interface.md).
- [The Snaps execution environment](../concepts/execution-environment.md).

You can [get started quickly using the Snaps template](../get-started/quickstart.md) or follow a
[tutorial](../tutorials).

This page describes additional important steps when developing a snap.

## Detect the user's MetaMask version

When developing a website that depends on Snaps, you need to know whether the user has MetaMask
Flask installed.

Use the [`@metamask/detect-provider`](https://npmjs.com/package/@metamask/detect-provider) package's
[`web3_clientVersion`](https://metamask.github.io/api-playground/api-documentation/#web3_clientVersion)
API method as follows:

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

## Test your snap

Test your snap by hosting it locally using `mm-snap serve`, installing it in Flask, and calling its
API methods from a web page.

## Debug your snap

To debug your snap, use `console.log` and inspect the MetaMask background process.
You can add your log statements in your source coder and build your snap, or add them directly
to your snap bundle and use `mm-snap manifest --fix` to update the `shasum` in your snap manifest file.
The manifest `shasum` must match the contents of your bundle at the time MetaMask fetches your snap.

:::note
Because adding logs modifies the snap source code, you must re-install the snap whenever you add a
log statement.
:::

The log output is only visible in the extension background process console.
If you're using a Chromium browser, use the following steps to inspect the background process and
view its console:

1. Go to `chrome://extensions`
1. Find the MetaMask extension
1. Select **Details**
1. Under **Inspect Views**, select `background.html`

## Publish your snap

Snaps are npm packages, so publishing a snap is as simple as publishing an npm package.
Refer to the [npm CLI documentation](https://docs.npmjs.com/cli/v8/commands/npm-publish) for details
on publishing to the public registry.
The following details are specific to Snaps:

- The version in `package.json` and `snap.manifest.json` must match.
- The image specified in `iconPath` in the manifest file is used as the icon displayed when
  installing and displaying confirmations from the snap.

After publishing the snap, any dapp can connect to the snap by using the snap ID `npm:[packageName]`.

## Distribute your snap

Since snaps are currently intended for a developer audience, MetaMask doesn't currently facilitate
distributing snaps to a wide audience.
If you have a website that expects the user to install a snap, ask the user to install MetaMask
Flask, and then ask the user to install the snap using the
[`wallet_enable`](../reference/rpc-api.md#wallet_enable) API method.

In the future, MetaMask will create some way for users to more easily discover snaps, but everyone
can always build, publish, and use snaps without MetaMask's permission.
(Although we may try to make it difficult to use known scams.)

## Resources and tools

You can review the growing number of
[example snaps](https://github.com/MetaMask/snaps-monorepo/tree/main/packages/examples) maintained
by MetaMask, as well as the following fully functional and open source snaps:

- [StarkNet](https://github.com/ConsenSys/starknet-snap)
- [FilSnap for Filecoin](https://github.com/Chainsafe/filsnap/)
- [Password Manager Snap](https://github.com/ritave/snap-passwordManager)
- [Transaction Simulation with Ganache](https://github.com/Montoya/tx-simulation-with-ganache-snap)
  (uses Truffle for local testing)

MetaMask also maintains tools to help developers build, debug, and maintain snaps:

- [Template snap](https://github.com/MetaMask/template-snap-monorepo) - A template that includes
  TypeScript/React and vanilla JavaScript options and a CLI for building, packaging, and deploying
  your snap and a companion dapp.
- [Snaps Truffle Box](https://trufflesuite.com/boxes/metamask-snap-box/) - A template that combines
  the TypeScript template snap and Truffle so you can easily test snaps that use smart contracts
  with Ganache.
- [Test snaps](https://github.com/MetaMask/test-snaps) - A collection of test snaps and a dapp for
  evaluating them.

If you have any questions, ask them on
[GitHub discussions](https://github.com/MetaMask/snaps-monorepo/discussions), and if you encounter
any issues, please [open a GitHub issue](https://github.com/MetaMask/snaps-monorepo/issues).
