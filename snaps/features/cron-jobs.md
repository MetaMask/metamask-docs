---
description: Schedule periodic actions for your users.
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Cron jobs

You can schedule actions to run periodically at fixed times or intervals, also known as "cron jobs."
For example, you can display a dialog or notification in MetaMask at a specific time each day.

## Steps

### 1. Configure a cron job

To configure a cron job, request the [`endowment:cronjob`](../reference/permissions.md#endowmentcronjob)
permission, specifying one or more cron jobs in the `jobs` array.
Define each job with a [cron expression](https://docs.oracle.com/cd/E12058_01/doc/doc.1014/e12030/cron_expressions.htm)
and a request object, which MetaMask sends to the Snap's cron job handler when the job is executed.

For example, to configure a job that executes every minute, add the following to your Snap's manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:cronjob": {
    "jobs": [
      {
        "expression": "* * * * *",
        "request": {
          "method": "execute"
        }
      }
    ]
  }
}
```

### 2. Implement a cron job handler

Expose an [`onCronjob`](../reference/entry-points.md#oncronjob) entry point, which is triggered at
the specified schedule with the requests defined in the `endowment:cronjob` permission.
The following example handles the `execute` method specified in the previous example:

<Tabs>

<TabItem value="JSX">

```tsx title="index.tsx"
import type { OnCronjobHandler } from "@metamask/snaps-sdk";
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  switch (request.method) {
    case "execute":
      // Cron jobs can execute any method that is available to the Snap.
      return snap.request({
        method: "snap_dialog",
        params: {
          type: "alert",
          content: (
            <Box>
              <Heading>Cron job</Heading>
              <Text>This dialog was triggered by a cron job.</Text>
            </Box>
          ),
        },
      });

    default:
      throw new Error("Method not found.");
  }
};
```

</TabItem>
<TabItem value="Functions" deprecated>

```typescript title="index.ts"
import type { OnCronjobHandler } from "@metamask/snaps-sdk";
import { panel, heading, text } from "@metamask/snaps-sdk";

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  switch (request.method) {
    case "execute":
      // Cron jobs can execute any method that is available to the Snap.
      return snap.request({
        method: "snap_dialog",
        params: {
          type: "alert",
          content: panel([
            heading("Cron job"),
            text("This dialog was triggered by a cron job."),
          ]),
        },
      })

    default:
      throw new Error("Method not found.")
  }
}
```

</TabItem>
</Tabs>

:::tip Access data from cron jobs
When accessing [encrypted data](data-storage.md#use-encrypted-storage) from cron jobs, MetaMask
requires the user to enter their password if the wallet is locked.
This interaction can be confusing to the user, since the Snap accesses the data in the background
without the user being aware.

If the cron job requires access to the encrypted state, use
[`snap_getClientStatus`](../reference/snaps-api.md#snap_getclientstatus) to ensure that MetaMask is
unlocked before accessing state.
This will prevent an unexpected password request, improving the user's experience.

If the cron job does not require access to sensitive data, store that data in
[unencrypted state](data-storage.md#use-unencrypted-storage).
:::

## Example

See the [`@metamask/cronjob-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/cronjobs)
package for a full example of implementing cron jobs.
