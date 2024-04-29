---
description: Notify users directly in MetaMask, or natively in their browser.
sidebar_position: 9
---

# Notifications

You can display notifications directly in MetaMask or natively in a user's browser using the
[`snap_notify`](../reference/snaps-api.md#snap_notify) API method.

## Steps

### 1. Get permission to notify users

Request the [`snap_notify`](../reference/snaps-api.md#snap_notify) permission.
Add the following to your Snap's manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "snap_notify": {}
}
```

### 2. Create a notification

Create a notification by calling [`snap_notify`](../reference/snaps-api.md#snap_notify), which takes
a notification `type` and `message`.
Specify `type: "inApp"` to display the notification in the MetaMask UI, and `type: "native"` to
display the notification in the user's browser.

:::note
We recommend using `type: "inApp"` because there's no guarantee that native notifications are
displayed to the user.
:::

The following example displays a notification in MetaMask, with the message "Hello, world!":

```javascript title="index.js"
await snap.request({
  method: "snap_notify",
  params: {
    type: "inApp",
    message: "Hello, world!",
  },
});
```

<div class="row">
    <div class="column">
        <img src={require("../assets/notifications-1.png").default} width="250px" alt="Notification alert" style={{border: '1px solid #DCDCDC'}} />
    </div>
    <div class="column">
        <img src={require("../assets/notifications-2.png").default} width="300px" alt="Notification message" style={{border: '1px solid #DCDCDC'}} />
    </div>
</div>

:::info Notification rate limits
Each Snap can trigger up to:

- Five in-app notifications per minute.
- Two native notifications per five minutes.
:::

## Example

See the
[`@metamask/notifications-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/notifications)
package for a full example of implementing notifications using
[`snap_notify`](../reference/snaps-api.md#snap_notify).
This example exposes a [custom JSON-RPC API](../learn/about-snaps/apis.md#custom-json-rpc-apis) for
dapps to display in-app and native notifications.
