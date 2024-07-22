---
description: Display custom alert, confirmation, or prompt screens in MetaMask.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Dialogs

You can display a dialog in the MetaMask UI using the
[`snap_dialog`](../../reference/snaps-api.md#snap_dialog) API method.
Dialogs can contain [custom UI](index.md) and [interactive UI](interactive-ui.md) components.

There are three types of dialogs: [alerts](#display-an-alert-dialog),
[confirmations](#display-a-confirmation-dialog), and [prompts](#display-a-prompt-dialog).

:::caution
Dialogs do not work when MetaMask is locked.
To check if MetaMask is locked, use
[`snap_getClientStatus`](../../reference/snaps-api.md#snap_getclientstatus).
:::

## Request permission to display dialogs

To display dialogs, first request the [`snap_dialog`](../../reference/snaps-api.md#snap_dialog) permission.
Add the following to your Snap's manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "snap_dialog": {}
}
```

## Display an alert dialog

To display an alert that can only be acknowledged, call
[`snap_dialog`](../../reference/snaps-api.md#snap_dialog) with `type: "alert"`.
The following example displays custom UI that alerts the user when something happens in the system:

<Tabs>
<TabItem value="JSX">

```tsx title="index.tsx"
import { Box, Text, Heading } from '@metamask/snaps-sdk/jsx';

await snap.request({
  method: "snap_dialog",
  params: {
    type: "alert",
    content: (
      <Box>
        <Heading>Something happened in the system</Heading>
        <Text>The thing that happened is...</Text>
      </Box>
    ),
  },
});

// Code that should execute after the alert has been acknowledged.
```

</TabItem>
<TabItem value="Functions" deprecated>

```javascript title="index.js"
import { panel, text, heading } from "@metamask/snaps-sdk"

await snap.request({
  method: "snap_dialog",
  params: {
    type: "alert",
    content: panel([
      heading("Something happened in the system"),
      text("The thing that happened is..."),
    ]),
  },
})

// Code that should execute after the alert has been acknowledged.
```

</TabItem>
</Tabs>


<p align="center">
<img src={require("../../assets/alert-dialog.png").default} alt="Alert dialog example" width="360px" style={{border: "1px solid #DCDCDC"}} />
</p>

## Display a confirmation dialog

To display a confirmation that can be accepted or rejected, call
[`snap_dialog`](../../reference/snaps-api.md#snap_dialog) with `type: "confirmation"`.
The following example displays custom UI that asks the user to confirm whether they would like to
take an action:

<Tabs>
<TabItem value="JSX">

```tsx title="index.tsx"
import { Box, Text, Heading } from '@metamask/snaps-sdk/jsx';

const result = await snap.request({
  method: "snap_dialog",
  params: {
    type: "confirmation",
    content: (
      <Box>
        <Heading>Would you like to take the action?</Heading>
        <Text>The action is...</Text>
      </Box>
    ),
  },
});

if (result === true) {
  // Do the action.
}
```

</TabItem>
<TabItem value="Functions" deprecated>

```javascript title="index.js"
import { panel, text, heading } from "@metamask/snaps-sdk"

const result = await snap.request({
  method: "snap_dialog",
  params: {
    type: "confirmation",
    content: panel([
      heading("Would you like to take the action?"),
      text("The action is..."),
    ]),
  },
})

if (result === true) {
  // Do the action.
}
```

</TabItem>
</Tabs>

<p align="center">
<img src={require("../../assets/confirmation-dialog.png").default} alt="Confirmation dialog example" width="360px" style={{border: "1px solid #DCDCDC"}} />
</p>

## Display a prompt dialog

To display a prompt where the user can enter a text response, call
[`snap_dialog`](../../reference/snaps-api.md#snap_dialog) with `type: "prompt"`.
Prompt dialogs also accept a `placeholder` value that displays in the input field when no text is entered.

The following example displays custom UI that prompts the user to enter a wallet address:

<Tabs>
<TabItem value="JSX">

```tsx title="index.tsx"
import { Box, Text, Heading } from '@metamask/snaps-sdk/jsx';

const walletAddress = await snap.request({
  method: "snap_dialog",
  params: {
    type: "prompt",
    content: (
      <Box>
        <Heading>What is the wallet address?</Heading>
        <Text>Please enter the wallet address to be monitored</Text>
      </Box>
    ),
    placeholder: "0x123...",
  },
});

// walletAddress will be a string containing the address entered by the user.
```

</TabItem>
<TabItem value="Functions" deprecated>

```javascript title="index.js"
import { panel, text, heading } from "@metamask/snaps-sdk"

const walletAddress = await snap.request({
  method: "snap_dialog",
  params: {
    type: "prompt",
    content: panel([
      heading("What is the wallet address?"),
      text("Please enter the wallet address to be monitored"),
    ]),
    placeholder: "0x123...",
  },
})

// walletAddress will be a string containing the address entered by the user.
```

</TabItem>
</Tabs>

<p align="center">
<img src={require("../../assets/prompt-dialog.png").default} alt="Prompt dialog example" width="360px" style={{border: "1px solid #DCDCDC"}} />
</p>

## Example

See the [`@metamask/dialog-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/dialogs)
package for a full example of implementing dialogs.
This example exposes a [custom JSON-RPC API](../../learn/about-snaps/apis.md#custom-json-rpc-apis)
for dapps to display dialogs.
