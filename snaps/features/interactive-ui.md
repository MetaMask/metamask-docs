---
description: Display and update interactive user interfaces.
---

# Interactive UI

:::flaskOnly
:::

Interactive UI is an extension of [Custom UI](./custom-ui.md). It allows interfaces returned from [`snap_dialog`](../reference/snaps-api.md#snap_dialog), [`onTransaction`](../reference/entry-points.md#ontransaction), and [`onHomePage`](../reference/entry-points.md#onhomepage) to respond to user input.

## Create an interactive interface

The first step to use interactive UI is to create an interface. This is accomplished with the [`snap_createInterface`](../reference/snaps-api.md#snap_createinterface) method. This method will return the ID of the created interface. This ID can be passed to [`snap_dialog`](../reference/snaps-api.md#snap_dialog), returned from [`onTransaction`](../reference/entry-points.md#ontransaction), or from [`onHomePage`](../reference/entry-points.md#onhomepage).

If you need to [update the interface](#update-an-interactive-interface) or [get its state](#get-an-interactive-interfaces-state) at a future time, you should store its ID in the Snap's storage.

## Update an interactive interface

To update an interactive interface that is still active, use the [`snap_updateInterface`](../reference/snaps-api.md#snap_updateinterface) method. Pass it the ID of the interface to be updated, and the new UI.

Updating an interface can be done either as part of [`onUserInput`](../reference/entry-points.md#onuserinput), or as part of an asynchronous process.

An example flow:

1. User activates an interactive interface to send Bitcoin funds to an address. The initial interface contains an address input, an amount input, and a "Send funds" button.
2. User fills the fields, and presses the "Send funds" button.
3. `onUserInput` is called, and the logic detects that the "Send funds" button was pressed.
4. `snap_updateInterface` is called, replacing the "Send funds" button with a [`spinner`](./custom-ui.md#spinner).
5. Custom logic does the sending of funds.
6. `snap_updateInterface` is called again, replacing the whole UI with a success message.

## Get an interactive interface's state

At any point you can retrieve an interactive interface's state. To do this, call the [`snap_getInterfaceState`](../reference/snaps-api.md#snap_getinterfacestate) method with the ID of the interface.