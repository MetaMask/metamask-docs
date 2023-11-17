---
description: Develop, test, and publish a Snap.
sidebar_position: 1
---

# Develop a Snap

A Snap can extend the dapp-facing [MetaMask JSON-RPC API](/wallet/reference/rpc-api) in
arbitrary ways, or integrate with and extend the functionality of MetaMask using the
[Snaps Exports](../reference/exports.md), [Snaps JSON-RPC API](../reference/rpc-api.md), and
[permissions](request-permissions.md).

Before developing a Snap, it's important to understand:

- [The Snap anatomy](../concepts/anatomy.md).
- [The Snap lifecycle](../concepts/lifecycle.md).
- [The Snap user interface](../concepts/user-interface.md).
- [The MetaMask Snaps execution environment](../concepts/execution-environment.md).

You can [get started quickly using the Snaps template](../get-started/quickstart.md) or follow a
[tutorial](/snaps/category/tutorials).

This page describes additional important steps when developing a Snap.

## Detect the user's MetaMask version

When developing a website that depends on [MetaMask Flask](../get-started/install-flask.md#install-metamask-flask),
you first need to know whether the user has it installed.

The following example uses the
[`@metamask/detect-provider`](https://npmjs.com/package/@metamask/detect-provider) package to get
the provider object from MetaMask first:

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

## Test your Snap

Test your Snap by hosting it locally using `mm-snap serve`, installing it in Flask, and calling its
API methods from a web page.

:::note
If you use the template Snap monorepo, running `yarn start` will serve the Snap at 
[`http://localhost:8080`](http://localhost:8080/)
:::

For end-to-end Snap testing, [use the `@metamask/snaps-jest` package](test-a-snap.md).

## Debug your Snap

To debug your Snap, use `console.log` and inspect the MetaMask background process.
You can add your log statements in your source code and build your Snap, or add them directly
to your Snap bundle and use `mm-snap manifest --fix` to update the `shasum` in your Snap manifest file.
The manifest `shasum` must match the contents of your bundle at the time MetaMask fetches your Snap.

:::note
Because adding logs modifies the Snap source code, you must re-install the Snap whenever you add a
log statement.
:::

The Snap log output is only visible in the extension background process console.
If you're using a Chromium browser, use the following steps to inspect the background process and
view its console:

1. Go to `chrome://extensions`.
2. Toggle **Developer mode** on in the top right corner.
3. Find MetaMask Flask, and select **Details**.
4. Under **Inspect views**, select `background.html`.

The log output displays in the console that pops up.

## Publish your Snap

Snaps are npm packages, so publishing a Snap is as simple as publishing an npm package.
Refer to the [npm CLI documentation](https://docs.npmjs.com/cli/v8/commands/npm-publish) for details
on publishing to the public registry.
The following details are specific to Snaps:

- The version in `package.json` and `snap.manifest.json` should match.
- The `repository.url` field in `package.json` should match the correct repository for your Snap.
- The `source.location.npm.packageName` in `snap.manifest.json` should match the name in `package.json`.
- The `proposedName` in `snap.manifest.json` should be a human-readable name and should not include
  the words "MetaMask" or "Snap." 
- The image specified in `iconPath` in the manifest file is used as the icon displayed when
  installing the Snap, in custom dialogs, and in the settings menu.
  - This icon should be a valid SVG.
  - The icon will be cropped in a circle when displayed in MetaMask; you do not need to make the icon circular.

After publishing the Snap, any dapp can connect to the Snap by using the Snap ID `npm:[packageName]`.

:::caution
If you are using the Snap template, make sure to only publish the Snap package in `/packages/snap`. 
You can use the [Snaps Simulator](https://metamask.github.io/snaps/snaps-simulator/staging/#/manifest) to verify 
that your Snap was published correctly &mdash; just select **localhost** in the top right corner and change the 
Snap location to **npm** and the ID of your Snap. 

Also, make sure to update the manifest file, icon file, and README to differentiate your Snap from the template.
:::

## Distribute your Snap

You should deploy a dapp where users can learn about your Snap and install it, or integrate with your existing dapp.

If your Snap is designed to communicate with dapps, you can encourage other dapp developers to [integrate your Snap](work-with-existing-snaps.md).

## Resources and tools

You can review the growing number of [example Snaps](https://github.com/MetaMask/snaps/tree/main/packages/examples) maintained by MetaMask, as well as the following fully functional and open source Snaps: 

- [Dogecoin](https://github.com/ziad-saab/dogecoin-snap)
- [StarkNet](https://github.com/Consensys/starknet-snap)
- [MobyMask Phishing Warning](https://github.com/Montoya/mobymask-snap)
- [Transaction Simulation with Ganache](https://github.com/Montoya/tx-simulation-with-ganache-snap)

MetaMask also maintains tools to help developers build, debug, and maintain Snaps:

- [Template Snap](https://github.com/MetaMask/template-snap-monorepo) - A template that includes
  TypeScript/React and vanilla JavaScript options and a CLI for building, packaging, and deploying
  your Snap and a companion dapp.
- [Snaps Simulator](https://metamask.github.io/snaps/snaps-simulator/latest) - A developer tool built for simulating Snaps in the browser, streamlining the development process.
- [Snaps Truffle Box](https://trufflesuite.com/boxes/metamask-snap-box/) - A template that combines
  the TypeScript template Snap and Truffle so you can easily test Snaps that use smart contracts
  with Ganache.
- [Test Snaps](https://github.com/MetaMask/test-snaps) - A collection of test Snaps and a dapp for
  evaluating them.

If you have any questions, ask them on
[GitHub discussions](https://github.com/MetaMask/snaps-monorepo/discussions), and if you encounter
any issues, please [open a GitHub issue](https://github.com/MetaMask/snaps-monorepo/issues).
