---
description: Develop, test, and publish a Snap.
sidebar_position: 1
---

# Develop a Snap

A Snap can integrate with and extend the functionality of MetaMask using the
[Snaps entry points](../reference/entry-points.md), [Snaps API](../reference/snaps-api.md), and
[permissions](request-permissions.md).

:::caution important
Before developing a Snap, make sure you understand the following concepts and guidelines:

- [Snaps overview](../concepts/overview.md)
- [Snaps APIs](../concepts/apis.md)
- [Snaps files](../concepts/files.md)
- [Snaps design guidelines](../concepts/design-guidelines.md)
- [Snaps security guidelines](../concepts/security-guidelines.md)
:::

You can get started by [creating a new Snap project](../get-started/quickstart.mdx) or following a
[tutorial](/snaps/tutorials).
This page describes additional important steps when developing a Snap.

## Detect the user's MetaMask version

When developing a dapp that depends on [MetaMask Flask](../get-started/install-flask.md#install-metamask-flask),
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

Test your Snap by hosting it locally using `yarn start`, installing it in Flask, and calling its
API methods from a dapp.

For end-to-end Snap testing, [use the `@metamask/snaps-jest` package](test-a-snap.md).

## Debug your Snap

To debug your Snap, use `console.log` and inspect the MetaMask background process.
You can add your log statements in your source code and build your Snap, or add them directly
to your Snap bundle and use [`yarn mm-snap manifest --fix`](../reference/cli/subcommands.md#m-manifest)
to update the `shasum` in your Snap manifest file.
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
If you are using the Snap monorepo project generated in the [quickstart](../get-started/quickstart.mdx),
make sure to only publish the Snap package in `/packages/snap`. 
You can use the [Snaps Simulator](https://metamask.github.io/snaps/snaps-simulator/staging/#/manifest) to verify 
that your Snap was published correctly &mdash; just select **localhost** in the top right corner and change the 
Snap location to **npm** and the ID of your Snap. 

Also, make sure to update the manifest file, icon file, and README to differentiate your Snap from the template.
:::

## Distribute your Snap

You should deploy a dapp where users can learn about your Snap and install it, or integrate with your existing dapp.

If your Snap is designed to communicate with dapps, you can encourage other dapp developers to [integrate your Snap](use-3rd-party-snaps.md).

## Resources

See the full list of [Snaps resources](../reference/resources.md) for more information on developer
tools, example Snaps, and more.
