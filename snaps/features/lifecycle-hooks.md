---
sidebar_position: 5
description: Call an action when your Snap is installed or updated.
---

# Lifecycle hooks

You can implement lifecycle hooks to automatically run an action, such as displaying a dialog or
notification, when a user installs or updates your Snap.

## Steps

### 1. Request permission to run lifecycle hooks

Request the [`endowment:lifecycle-hooks`](../reference/permissions.md#endowmentlifecycle-hooks)
permission.
Add the following to your Snap's manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:lifecycle-hooks": {}
}
```

### 2. Run an action on installation

Implement the [`onInstall`](../reference/entry-points.md#oninstall) entry point to run an action
when a user installs your Snap.
For example, you can use `onInstall` to perform any initialization that is required.

The following example displays an [alert dialog](../reference/snaps-api.md#alert-dialog) on installation:

```typescript title="index.ts"
import type { OnInstallHandler } from "@metamask/snaps-sdk";
import { heading, panel, text } from "@metamask/snaps-sdk";

export const onInstall: OnInstallHandler = async () => {
  await snap.request({
    method: "snap_dialog",
    params: {
      type: "alert",
      content: panel([
        heading("Installation successful"),
        text(
          "To use this Snap, visit the companion dapp at [metamask.io](https://metamask.io).",
        ),
      ]),
    },
  });
};
```

### 3. Run an action on update

Implement the [`onUpdate`](../reference/entry-points.md#onupdate) entry point to run an action when
a user updates your Snap.
For example, you can use `onUpdate` to perform any migrations that are required.

The following example displays an [alert dialog](../reference/snaps-api.md#alert-dialog) on update:

```typescript title="index.ts"
import type { OnUpdateHandler } from "@metamask/snaps-sdk";
import { heading, panel, text } from "@metamask/snaps-sdk";

export const onUpdate: OnUpdateHandler = async () => {
  await snap.request({
    method: "snap_dialog",
    params: {
      type: "alert",
      content: panel([
        heading("Update successful"),
        text(
          "New features added in this version:",
        ),
        text(
          "Added a dialog that appears when updating."
        ), 
      ]),
    },
  });
};
```

## Example

See the [`@metamask/lifecycle-hooks-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/lifecycle-hooks)
package for a full example of implementing lifecycle hooks.
