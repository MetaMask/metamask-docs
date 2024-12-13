---
description: Notify users directly in MetaMask, or natively in their OS.
sidebar_position: 10
---

# Notifications

You can display notifications directly in MetaMask or natively in a user's operating system (OS)
using the [`snap_notify`](../reference/snaps-api.md#snap_notify) API method.

## Steps

### 1. Request permission to notify users

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
Specify `type: "inApp"` to display the notification in the MetaMask UI, or `type: "native"` to
display the notification in the user's OS.

:::note
We recommend using `type: "inApp"` because there's no guarantee that native notifications are
displayed to the user.
You can also call `snap_notify` twice, with each notification type, to trigger both an in-app and
native notification.
:::

The following example displays a notification in MetaMask, with the message "Hello, world!":

```javascript title="index.js"
await snap.request({
  method: "snap_notify",
  params: {
    type: "inApp",
    message: "Hello, world!",
  },
})
```

<div class="row">
    <div class="column">
        <img src={require("../assets/notifications-1.png").default} width="225px" alt="Notification alert" style={{border: '1px solid #DCDCDC'}} />
    </div>
    <div class="column">
        <img src={require("../assets/notifications-2.png").default} width="356px" alt="Notification message" style={{border: '1px solid #DCDCDC'}} />
    </div>
</div>

:::info Notification rate limits
Each Snap can trigger up to:

- Five in-app notifications per minute.
- Two native notifications per five minutes.
  :::

### Expanded view

In-app notifications can include an optional expanded view that will be displayed when the user clicks on the notification. The expanded view includes a title, content, and an optional footer link. 

The following example displays a notification in MetaMask, with the message "Hello, world!" When the user clicks on the notification, the expanded view displays a page with a title, a paragraph, and a link to the MetaMask Snaps Directory:

```javascript title="index.js"
await snap.request({
  method: "snap_notify",
  params: {
    type: "inApp",
    message: "Hello, world!",
    title: "Hello",
    content: ( 
      <Box>
        <Text>Did you know you can find more Snaps in the MetaMask Snaps Directory?</Text>
      </Box>
    ),
    footerLink: {
      text: "Visit the directory",
      href: "https://snaps.metamask.io"
    }
  },
})
```

## Example

See the
[`@metamask/notifications-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/notifications)
package for a full example of implementing notifications using
[`snap_notify`](../reference/snaps-api.md#snap_notify).
This example exposes a [custom JSON-RPC API](../learn/about-snaps/apis.md#custom-json-rpc-apis) for
dapps to display in-app and native notifications.
