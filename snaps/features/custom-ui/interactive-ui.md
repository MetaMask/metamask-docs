---
description: Display and update interactive user interfaces.
sidebar_position: 1
---

# Interactive UI

You can display interactive user interface (UI) components.
Interactive UI is an extension of [custom UI](index.md).
It allows interfaces returned from [dialogs](dialogs.md), [home pages](home-pages.md), and
[transaction insights](../../reference/entry-points.md#ontransaction) to respond to user input.

The following interactive UI components are available:

- [`Button`](index.md#button)
- [`Dropdown`](index.md#dropdown)
- [`Field`](index.md#field)
- [`Form`](index.md#form)
- [`Input`](index.md#input)

## Create an interactive interface

Create an interactive interface using the
[`snap_createInterface`](../../reference/snaps-api.md#snap_createinterface) method.
This method returns the ID of the created interface.
You can pass this ID to [`snap_dialog`](../../reference/snaps-api.md#snap_dialog), returned from
[`onTransaction`](../../reference/entry-points.md#ontransaction), or from
[`onHomePage`](../../reference/entry-points.md#onhomepage).

If you need to [update the interface](#update-an-interactive-interface) or
[get its state](#get-an-interactive-interfaces-state-and-context) at a future time, you should store its ID in
the Snap's storage.

### Add context to an interface

You can optionally add context to an interface by passing a `context` object to the
[`snap_createInterface`](../../reference/snaps-api.md#snap_createinterface) method.
This object can contain any data you want to pass to the interface.
This context will be passed to [`onUserInput`](../../reference/entry-points.md#onuserinput) when the user interacts with the interface.

## Update an interactive interface

To update an interactive interface that is still active, use the
[`snap_updateInterface`](../../reference/snaps-api.md#snap_updateinterface) method.
Pass the ID of the interface to be updated, and the new UI.

Updating an interface can be done as part of the
[`onUserInput`](../../reference/entry-points.md#onuserinput) entry point or as part of an
asynchronous process.

The following is an example flow:

1. The user activates an interactive interface to send Bitcoin funds to an address.
   The initial interface contains an address input, an amount input, and a **Send funds** button.
2. The user fills the fields, and selects the **Send funds** button.
3. `onUserInput` is called, and the logic detects that the **Send funds** button was selected.
4. `snap_updateInterface` is called, replacing the **Send funds** button with a [`spinner`](index.md#spinner).
5. Custom logic sends the funds.
6. `snap_updateInterface` is called again, replacing the whole UI with a success message.

## Get an interactive interface's state and context

At any point, you can retrieve an interactive interface's state and context.
To retrieve its state, call the [`snap_getInterfaceState`](../../reference/snaps-api.md#snap_getinterfacestate)
method with the interface ID.
To retrieve its context, call [`snap_getInterfaceContext`](../../reference/snaps-api.md#snap_getinterfacecontext)
with the interface ID.

## Example

See the [`@metamask/interactive-ui-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/interactive-ui)
package for a full example of implementing interactive UI.
