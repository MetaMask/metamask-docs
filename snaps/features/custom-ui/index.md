---
description: Display custom user interface components.
sidebar_position: 1
---

# Custom UI

You can display custom user interface (UI) components using the
[`@metamask/snaps-sdk`](https://github.com/MetaMask/snaps/tree/main/packages/snaps-sdk) module with
the following methods and entry points:

- [`snap_dialog`](../../reference/snaps-api.md#snap_dialog)
- [`onTransaction`](../../reference/entry-points.md#ontransaction) 
- [`onHomePage`](../../reference/entry-points.md#onhomepage)

To use custom UI, first install [`@metamask/snaps-sdk`](https://github.com/MetaMask/snaps/tree/main/packages/snaps-sdk)
using the following command:

```bash
yarn add @metamask/snaps-sdk
```

Then, whenever you're required to return a custom UI component, import the components from the
SDK and build your UI with them.
For example, to display a [`panel`](#panel) using [`snap_dialog`](../../reference/snaps-api.md#snap_dialog):

```javascript
import { panel, heading, text } from "@metamask/snaps-sdk";

await snap.request({
    method: "snap_dialog",
    params: {
        type: "alert",
        content: panel([
            heading("Alert heading"),
            text("Something happened in the system."),
        ]),
    },
});
```

## Components

The following custom UI components are available:

### `address`

Outputs a formatted text field for an Ethereum address. 
The address is automatically displayed with a jazzicon and truncated value. 
Hovering the address shows the full value in a tooltip.

#### Example

```javascript
import { panel, heading, address } from "@metamask/snaps-sdk";

await snap.request({
    method: "snap_dialog",
    params: {
        type: "alert",
        content: panel([
            heading("Are you sure you want to send tokens to this address?"),
            address("0x000000000000000000000000000000000000dEaD"),
        ]),
    },
});
```

<div class="row">
    <div class="column">
        <img src={require("../../assets/custom-ui-address.png").default} alt="Address UI example" width="450px" style={{border: '1px solid #DCDCDC'}} />
    </div>
    <div class="column">
        <img src={require("../../assets/custom-ui-address-tooltip.png").default} alt="Address tooltip UI example" width="450px" style={{border: '1px solid #DCDCDC'}} />
    </div>
</div>

### `button`

:::flaskOnly
:::

Outputs a button that the user can select.
For use in [interactive UI](interactive-ui.md).

#### Parameters

An object containing:

- `value`: `string` - The text of the button.
- `buttonType`: `string` - (Optional) Possible values are `button` or `submit`.
  The default is `button`.
- `name`: `string` - (Optional) The name that will be sent to [`onUserInput`](../../reference/entry-points.md#onuserinput)
  when a user selects the button.
- `variant` - (Optional) Determines the appearance of the button.
  Possible values are `primary` or `secondary`.
  The default is `primary`.

#### Example

```javascript
import { button, panel, heading } from "@metamask/snaps-sdk";

const interfaceId = await snap.request({
    method: "snap_createInterface",
    params: {
        ui: panel([
            heading("Interactive interface"),
            button({
                value: "Click me",
                name: "interactive-button",
            }),
        ]),
    },
});

await snap.request({
    method: "snap_dialog",
    params: {
        type: "Alert",
        id: interfaceId,
    },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-button.png").default} alt="Button UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `copyable`

Outputs a read-only text field with a copy-to-clipboard shortcut.

#### Example

```javascript
import { text, copyable } from "@metamask/snaps-sdk";

await snap.request({
    method: "snap_dialog",
    params: {
        type: "alert",
        content: panel([
            text("Your address:"),
            copyable("0x000000000000000000000000000000000000dEaD"),
        ]),
    },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-copyable.png").default} alt="Copyable UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `divider`

Outputs a horizontal divider.

#### Example

```javascript
import type { OnHomePageHandler } from "@metamask/snaps-sdk";
import { panel, divider, text } from "@metamask/snaps-sdk";

module.exports.onHomePage = async () => {
    return {
        content: panel([
            heading("Hello world!"),
            divider(),
            text("Welcome to my Snap home page!"),
        ]),
    };
};
```

<p align="center">
<img src={require("../../assets/custom-ui-divider.png").default} alt="Divider UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `form`

:::flaskOnly
:::

Outputs a form for use in [interactive UI](interactive-ui.md).

#### Parameters

An object containing:

- `name`: `string` - The name that will be sent to [`onUserInput`](../../reference/entry-points.md#onuserinput)
  when a user interacts with the form.
- `children`: `array` - An array of [`input`](#input) or [`button`](#button) components.

#### Example

```js
import { input, button, form } from "@metamask/snaps-sdk";

const interfaceId = await snap.request({
    method: "snap_createInterface",
    params: {
        ui: form({
            name: "form-to-fill",
            children: [
                input({
                    name: "user-name",
                    placeholder: "Your name",
                }),
                button({
                    value: "Submit",
                    type: "submit",
                }),
            ],
        }),
    },
});

await snap.request({
    method: "snap_dialog",
    params: {
        type: "Alert",
        id: interfaceId,
    },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-form.png").default} alt="Form UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `heading`

Outputs a heading.
This is useful for [`panel`](#panel) titles.

#### Example

```javascript
import type { OnHomePageHandler } from "@metamask/snaps-sdk";
import { panel, heading, text } from "@metamask/snaps-sdk";

module.exports.onHomePage = async () => {
    return {
        content: panel([
            heading("Hello world!"),
            text("Welcome to my Snap home page!"),
        ]),
    };
};
```

<p align="center">
<img src={require("../../assets/custom-ui-heading.png").default} alt="Divider UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `image`

Outputs an image. 
This component takes an inline SVG. 
It does not support remote URLs. 
You can embed JPG or PNG in SVG using data URIs. 
The SVG is rendered within an `<img>` tag, which prevents JavaScript or interaction events from being supported.

#### Example

```javascript
import type { OnHomePageHandler } from "@metamask/snaps-sdk";
import { panel, heading, text, image } from "@metamask/snaps-sdk";

module.exports.onHomePage = async () => {
    return {
        content: panel([
            heading("Hello world!"),
            text("Welcome to my Snap home page!"),
            image("<svg viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'><path d='m2.514 17.874 9 5c.021.011.043.016.064.026s.051.021.078.031a.892.892 0 0 0 .688 0c.027-.01.052-.019.078-.031s.043-.015.064-.026l9-5A1 1 0 0 0 22 16.9L21 7V2a1 1 0 0 0-1.625-.781L14.649 5h-5.3L4.625 1.219A1 1 0 0 0 3 2v4.9l-1 10a1 1 0 0 0 .514.974ZM5 7V4.081l3.375 2.7A1 1 0 0 0 9 7h6a1 1 0 0 0 .625-.219L19 4.079V7.1l.934 9.345L13 20.3v-2.967l1.42-.946A1.3 1.3 0 0 0 15 15.3a1.3 1.3 0 0 0-1.3-1.3h-3.4A1.3 1.3 0 0 0 9 15.3a1.3 1.3 0 0 0 .58 1.084l1.42.946v2.97l-6.94-3.855Zm3.5 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm5-2a2 2 0 1 1 2 2 2 2 0 0 1-2-2Z'/></svg>"),
        ]),
    };
};
```

<p align="center">
<img src={require("../../assets/custom-ui-image.png").default} alt="Divider UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `input`

:::flaskOnly
:::

Outputs an input component for use in [interactive UI](interactive-ui.md).

#### Parameters

An object containing:

- `name`: `string` - The name that will be used as a key to the event sent to
  [`onUserInput`](../../reference/entry-points.md#onuserinput) when the containing form is submitted.
- `inputType`: `string` - (Optional) Type of input.
  Possible values are `text`, `number`, or `password`.
  The default is `text`.
- `placeholder`: `string` - (Optional) The text displayed when the input is empty.
- `label`: `string` (Optional) The text displayed alongside the input to label it.
- `value`: `string` (Optional) The default value of the input.

#### Example

```js
import { input, form } from "@metamask/snaps-sdk";

const interfaceId = await snap.request({
    method: "snap_createInterface",
    params: {
        ui: form({
            name: "form-to-fill",
            children: [
                input({
                    name: "user-name",
                    placeholder: "Your name",
                }),
                button({
                    value: "Submit",
                    type: "submit",
                }),
            ],
        }),
    },
});

await snap.request({
    method: "snap_dialog",
    params: {
        type: "Alert",
        id: interfaceId,
    },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-form.png").default} alt="Form UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `panel`

Outputs a panel, which can be used as a container for other components. 
This component takes an array of custom UI components.

#### Example

```javascript
import type { OnTransactionHandler } from "@metamask/snaps-sdk";
import { panel, heading, text } from "@metamask/snaps-sdk";

module.exports.onTransaction = async ({ transaction }) => {
    const gasFeesPercentage = /* Calculate gas fees percentage */;
    return {
        content: panel([
            heading("Transaction insights"),
            text(
                `As set up, you are paying **${gasFeesPercentage.toFixed(
                    2,
                )}%** in gas fees for this transaction.`,
            ),
        ]),
    };
};
```

<p align="center">
<img src={require("../../assets/custom-ui-panel.png").default} alt="Panel UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `row`

Outputs a row with a label and value, which can be used for key-value data. 
The label must be a string. The value can be a child component of type 
[`text`](#text) or [`address`](#address).

#### Example

```javascript 
import { panel, row, text, address } from "@metamask/snaps-sdk";

await snap.request({
    method: "snap_dialog",
    params: {
        type: "alert",
        content: panel([
            row("Address", address("0x000000000000000000000000000000000000dEaD")),
            row("Balance", text("1.78 ETH")),
        ]),
    },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-row.png").default} alt="Row UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `spinner`

Outputs a loading indicator.

#### Example

```javascript
import { panel, heading, spinner } from "@metamask/snaps-sdk";

await snap.request({
    method: "snap_dialog",
    params: {
        type: "alert",
        content: panel([
            heading("Please wait..."),
            spinner(),
        ]),
    },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-spinner.gif").default} alt="Spinner UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `text`

Outputs text. 

#### Example

```javascript
import type { OnHomePageHandler } from "@metamask/snaps-sdk";
import { panel, heading, text } from "@metamask/snaps-sdk";

module.exports.onHomePage = async () => {
    return {
        content: panel([
            heading("Hello world!"),
            text("Welcome to my Snap home page!"),
        ]),
    };
};
```

<p align="center">
<img src={require("../../assets/custom-ui-heading.png").default} alt="Spinner UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

## Markdown

[`text`](#text) components accept bold and italic inline Markdown.

#### Example

```javascript
import { panel, heading, text } from "@metamask/snaps-sdk";

await snap.request({
    method: "snap_dialog",
    params: {
        type: "alert",
        content: panel([
            heading("Hello world!"),
            text("This is **bold** and this is _italic_."),
        ]),
    },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-markdown.png").default} alt="Markdown UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

## Links

[`text`](#text) components accept inline links.

#### Example

```javascript
import type { OnHomePageHandler } from "@metamask/snaps-sdk";
import { panel, text } from "@metamask/snaps-sdk";

module.exports.onHomePage = async () => {
    return {
        content: panel([
            heading("Hello world!"),
            text("Download [MetaMask](https://metamask.io)."),
            text("Read the MetaMask docs at [](https://docs.metamask.io)."),
        ]),
    };
};
```

<p align="center">
<img src={require("../../assets/custom-ui-links.png").default} alt="Spinner UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

## Emojis

Text-based components (such as [`heading`](#heading) and [`text`](#text)) accept emojis.

#### Example

```javascript
import { panel, heading, text } from "@metamask/snaps-sdk";

await snap.request({
    method: "snap_dialog",
    params: {
        type: "alert",
        content: panel([
            heading("Hello world!"),
            text("This is an apple 🍎 and this is an orange 🍊."),
        ]),
    },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-emojis.png").default} alt="Emojis UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

## Examples

See the [`@metamask/dialog-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/dialogs),
[`@metamask/transaction-insight-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/transaction-insights),
and
[`@metamask/home-page-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/home-page)
packages for full examples of implementing custom UI.
