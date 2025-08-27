---
description: Publish a Snap to npm.
sidebar_position: 8
---

# Publish a Snap

Snaps are npm packages, so publishing a Snap is as simple as publishing an npm package. Refer to the [npm CLI documentation](https://docs.npmjs.com/cli/v8/commands/npm-publish) for details on publishing to the public registry. The following details are specific to Snaps:

- The version in `package.json` and `snap.manifest.json` should match.
- The `repository.url` field in `package.json` should match the correct repository for your Snap.
- The `source.location.npm.packageName` in `snap.manifest.json` should match the name in `package.json`.
- The `proposedName` in `snap.manifest.json` should be a human-readable name and should not include the words "MetaMask" or "Snap."
- The image specified in `iconPath` in the manifest file is used as the icon displayed when installing the Snap, in custom dialogs, and in the settings menu.
  - This icon should be a valid SVG.
  - The icon will be cropped in a circle when displayed in MetaMask; you do not need to make the icon circular.
  - The icon should only have a transparent background if the icon is clearly visible on both light and dark backgrounds.

After publishing the Snap, any dapp can connect to the Snap by using the Snap ID `npm:[packageName]`. You can use the [Snap Install Tester](https://montoya.github.io/snap-install-tester/) with [MetaMask Flask](../get-started/install-flask.md) to verify that your Snap package was published correctly.

:::caution If you are using the Snap monorepo project generated in the [quickstart](../get-started/quickstart.md), make sure to only publish the Snap package in `/packages/snap`.

Also, make sure to update the manifest file, icon file, and README to differentiate your Snap from the template. :::

## Make a Snap available to users

After publishing a Snap, you can make it available to MetaMask users by [getting your Snap allowlisted](get-allowlisted.md). Once allowlisted, anyone can install your Snap in the MetaMask extension.
