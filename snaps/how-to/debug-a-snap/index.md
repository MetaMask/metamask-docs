---
sidebar_position: 7
description: Debug a Snap by inspecting the background process.
---

# Debug a Snap

To debug your Snap, use `console.log` and inspect the MetaMask background process.

:::tip
You can also see the [common issues](common-issues.md) encountered by Snap developers.
:::

You can add your log statements in your source code and build your Snap, or add them directly
to your Snap bundle and use [`yarn mm-snap manifest --fix`](../../reference/cli/subcommands.md#m-manifest)
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
4. Under **Inspect views**, select `offscreen.html`.

The log output displays in the console that pops up.
