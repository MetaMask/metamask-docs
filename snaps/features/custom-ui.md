---
description: Display custom user interface components.
---

# Custom UI

You can display custom user interface (UI) components using the 
`@metamask/snaps-sdk` module with the 
[`snap_dialog`](../reference/snaps-api.md#snap_dialog) method or the 
[`onTransaction`](../reference/entry-points.md#ontransaction) and 
[`onHomePage`](../reference/entry-points.md#onhomepage) entry points.

To use custom UI, first install `@metamask/snaps-sdk` using the following command:

```bash
yarn add @metamask/snaps-sdk
```

Then, whenever you're required to return a custom UI component, import the components from the
SDK and build your UI with them.
For example:

```javascript
import { panel, heading, text } from '@metamask/snaps-sdk';

// ...

const content = panel([
  heading('Alert heading'),
  text('Something happened in the system.'),
]);

return content;
```

## Components

The `NodeType` enum exported by `@metamask/snaps-sdk` details the available components.

### `address`

Outputs a formatted text field for an Ethereum address. 
The address is automatically displayed with a jazzicon and truncated value. 
Hovering the address shows the full value in a tooltip. 

```javascript
import { panel, heading, address } from '@metamask/snaps-sdk';

// ...

const content = panel([
  heading('Are you sure you want to send tokens to this address?'),
  address('0x000000000000000000000000000000000000dEaD'),
]);

return content;
```

### `button`

Outputs a clickable button for use in [interactive UI](./interactive-ui.md).

#### Parameters

An object with:

- `value`: A string containing the text of the button
- `buttonType`: Optional, `button` or `submit`. Defaults to `button`.
- `name`: Optional, a string that will be sent to [`onUserInput`](../reference/entry-points.md#onuserinput) when the button is clicked.
- `variant`: Optional, `primary` or `secondary`. Defaults to `primary`. Determines the appearance of the button.

#### Example

```javascript
import { button, panel, heading } from '@metamask/snaps-sdk';

const interfaceId = await snap.request({
  method: 'snap_createInterface',
  params: {
    ui: panel([
      heading('Interactive interface'),
      button({
        value: 'Click me',
        name: 'interactive-button',
      }),
    ])
  },
});
```

### `copyable`

Outputs a read-only text field with a copy-to-clipboard shortcut.

```javascript
import { copyable } from '@metamask/snaps-sdk';

// ...

const content = copyable('Text to be copied');
```

### `divider`

Outputs a horizontal divider.

```javascript
import { panel, divider, text } from '@metamask/snaps-sdk';

// ...

const content = panel([
  text('Text before the divider'),
  divider(),
  text('Text after the divider'),
]);
```

### `form`

Outputs a form for use in [interactive UI](./interactive-ui.md).

#### Parameters

An object with:

- `name`: A string that will be sent to [`onUserInput`](../reference/entry-points.md#onuserinput) when the form is interacted with.
- `children`: An array of [`input`](#input) or [`button`](#button) components.

#### Example

```js
import { input, button, form } from '@metamask/snaps-sdk';

const form = form({
  name: 'form-to-fill',
  children: [
    input({
      name: 'user-name',
      placeholder: 'Your name',
    }),
    button({
      value: 'Submit!',
      type: 'submit'
    }),
  ]
});
```

### `heading`

Outputs a heading.
This is useful for [panel](#panel) titles.

```javascript
import { panel, heading, text } from '@metamask/snaps-sdk';

// ...

const content = panel([
  heading('Title of the panel'),
  text('Text of the panel'),
]);
```

### `image`

Outputs an image. 
This component takes an inline SVG. 
It does not support remote URLs. 
You can embed JPG or PNG in SVG using data URIs. 
The SVG is rendered within an \<img\> tag, which prevents JavaScript or interaction events from being supported.

```javascript
import { image } from '@metamask/snaps-sdk';

// ...

const content = image('<svg width="400" height="400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.514 17.874 9 5c.021.011.043.016.064.026s.051.021.078.031a.892.892 0 0 0 .688 0c.027-.01.052-.019.078-.031s.043-.015.064-.026l9-5A1 1 0 0 0 22 16.9L21 7V2a1 1 0 0 0-1.625-.781L14.649 5h-5.3L4.625 1.219A1 1 0 0 0 3 2v4.9l-1 10a1 1 0 0 0 .514.974ZM5 7V4.081l3.375 2.7A1 1 0 0 0 9 7h6a1 1 0 0 0 .625-.219L19 4.079V7.1l.934 9.345L13 20.3v-2.967l1.42-.946A1.3 1.3 0 0 0 15 15.3a1.3 1.3 0 0 0-1.3-1.3h-3.4A1.3 1.3 0 0 0 9 15.3a1.3 1.3 0 0 0 .58 1.084l1.42.946v2.97l-6.94-3.855Zm3.5 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm5-2a2 2 0 1 1 2 2 2 2 0 0 1-2-2Z"/></svg>');
```

### `input`

Outputs an input component for use in [interactive UI](./interactive-ui.md).

#### Parameters

An object with:

- `name`: A string that will be used as a key to the event sent to [`onUserInput`](../reference/entry-points.md#onuserinput) when the containing form is submitted.
- `inputType`: Optional. `text`, `number`, or `password`. Defaults to `text`.
- `placeholder`: Optional, a string that is displayed when the input is empty.
- `label`: Optional, a string that is displayed alongside the input to label it.
- `value`: Optional, the default value of the input.

#### Example

```js
import { input } from '@metamask/snaps-sdk';

const amountInput = input({
  type: 'number',
  name: 'amount-to-send',
  placeholder: 'Amount to send'
});
```

### `panel`

Outputs a panel, which can be used as a container for other components. 
This component takes an array of custom UI components.

```javascript
import { panel, heading, text } from '@metamask/snaps-sdk';

// ...

const insights = [
  /*...*/
];
const content = panel([
  heading('Here are the transaction insights'),
  ...insights.map((insight) => text(insight.description)),
]);
```

### `row`

Outputs a row with a label and value, which can be used for key-value data. 
The label must be a string. The value can be a child component of type 
`text` or `address`. 

```javascript 
import { panel, row, text, address } from '@metamask/snaps-sdk'; 

// ...
const content = panel([
  row("Address",address("0x000000000000000000000000000000000000dEaD")),
  row("Balance",text("1.78 ETH")),
]);
```

### `spinner`

Outputs a loading indicator.

```javascript
import { panel, heading, spinner } from '@metamask/snaps-sdk';

// ...

const content = panel([
  heading('Please wait...'),
  spinner()
]);
```

### `text`

Outputs text. 

```javascript
import { text } from '@metamask/snaps-sdk';

// ...

const content = text('This is a simple text UI');
```

## Markdown

Text-based components accept a very small subset of inline Markdown: `**bold**` and `_italic_`.

## Links

`text()` components accept inline links. 
To make a link, use the following Markdown: 

```javascript
import { text } from '@metamask/snaps-sdk';

// ...

const contentWithLink = text('Download [MetaMask](https://metamask.io)');
```

You can also make a link with just the URL with the following Markdown: 

```javascript
import { text } from '@metamask/snaps-sdk';

// ...

const contentWithLink = text('Visit our site: [](https://metamask.io)');
```

## Emoji

Text-based components accept emoji.
