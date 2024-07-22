---
sidebar_position: 6
description: Call an action when your Snap is installed or updated.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Lifecycle hooks

You can implement lifecycle hooks to automatically run an action, such as displaying a dialog or
notification, when a user installs or updates your Snap.

## Steps

### 1. Request permission to implement lifecycle hooks

Request the [`endowment:lifecycle-hooks`](../reference/permissions.md#endowmentlifecycle-hooks)
permission.
Add the following to your Snap's manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:lifecycle-hooks": {}
}
```

### 2. Run an action on installation

To run an action when a user installs your Snap, expose the
[`onInstall`](../reference/entry-points.md#oninstall) entry point and implement the action.
For example, you can use `onInstall` to perform any initialization that is required upon installation.

The following example displays an [alert dialog](custom-ui/dialogs.md#display-an-alert-dialog) upon installation:

<Tabs>

<TabItem value="JSX">

```tsx title="index.tsx"
import type { OnInstallHandler } from "@metamask/snaps-sdk";
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

export const onInstall: OnInstallHandler = async () => {
  await snap.request({
    method: "snap_dialog",
    params: {
      type: "alert",
      content: (
        <Box>
          <Heading>Installation successful</Heading>
          <Text>
            To use this Snap, visit the companion dapp at <a href="https://metamask.io">metamask.io</a>.
          </Text>
        </Box>
      ),
    },
  });
};
```

</TabItem>
<TabItem value="Functions" deprecated>

```typescript title="index.ts"
import type { OnInstallHandler } from "@metamask/snaps-sdk"
import { heading, panel, text } from "@metamask/snaps-sdk"

export const onInstall: OnInstallHandler = async () => {
  await snap.request({
    method: "snap_dialog",
    params: {
      type: "alert",
      content: panel([
        heading("Installation successful"),
        text(
          "To use this Snap, visit the companion dapp at [metamask.io](https://metamask.io)."
        ),
      ]),
    },
  })
}
```

</TabItem>
</Tabs>

### 3. Run an action on update

To run an action when a user updates your Snap, expose the
[`onUpdate`](../reference/entry-points.md#onupdate) entry point and implement the action.
For example, you can use `onUpdate` to perform any migrations that are required upon update.

The following example displays an [alert dialog](custom-ui/dialogs.md#display-an-alert-dialog) upon update:

<Tabs>

<TabItem value="JSX">

```tsx title="index.tsx"
import type { OnUpdateHandler } from "@metamask/snaps-sdk";
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

export const onUpdate: OnUpdateHandler = async () => {
  await snap.request({
    method: "snap_dialog",
    params: {
      type: "alert",
      content: (
        <Box>
          <Heading>Update successful</Heading>
          <Text>New features added in this version:</Text>
          <Text>Added a dialog that appears when updating.</Text>
        </Box>
      ),
    },
  });
};
```

</TabItem>
<TabItem value="Functions" deprecated>

```typescript title="index.ts"
import type { OnUpdateHandler } from "@metamask/snaps-sdk"
import { heading, panel, text } from "@metamask/snaps-sdk"

export const onUpdate: OnUpdateHandler = async () => {
  await snap.request({
    method: "snap_dialog",
    params: {
      type: "alert",
      content: panel([
        heading("Update successful"),
        text("New features added in this version:"),
        text("Added a dialog that appears when updating."),
      ]),
    },
  })
}
```

</TabItem>
</Tabs>

## Example

See the [`@metamask/lifecycle-hooks-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/lifecycle-hooks)
package for a full example of implementing lifecycle hooks.
