---
description: Use a custom user interface.
sidebar_position: 4
---

# Use custom UI

The [`snap_dialog`](../reference/rpc-api.md#snap_dialog) RPC method and
[`onTransaction`](../reference/exports.md#ontransaction) exported method use the
`@metamask/snaps-ui` module to display custom user interface (UI) components.

To use custom UI, first install `@metamask/snaps-ui` using the following command:

```bash
yarn add @metamask/snaps-ui
```

Then, whenever you're required to return a custom UI component, import the components from the
package and build your UI with them.
For example:

```javascript
import { panel, heading, text } from '@metamask/snaps-ui';

// ...

const content = panel([
  heading('Alert heading'),
  text('Something happened in the system.'),
]);

return content;
```

## Components

The `NodeType` enum exported by `@metamask/snaps-ui` details the available components.

### copyable

Outputs a read-only text field with a copy-to-clipboard shortcut.

```javascript
import { copyable } from '@metamask/snaps-ui';

// ...

const content = copyable('Text to be copied');
```

### divider

Outputs a horizontal divider.

```javascript
import { panel, divider, text } from '@metamask/snaps-ui';

// ...

const content = panel([
  text('Text before the divider'),
  divider(),
  text('Text after the divider'),
]);
```

### heading

Outputs a heading.
This is useful for [panel](#panel) titles.

```javascript
import { panel, heading, text } from '@metamask/snaps-ui';

// ...

const content = panel([
  heading('Title of the panel'),
  text('Text of the panel'),
]);
```

### image

Outputs an image. 
This component takes an inline SVG. 
It does not support remote URLs. 
You can embed JPG or PNG in SVG using data URIs. 
The SVG is rendered within an \<img\> tag, which prevents JavaScript or interaction events from being supported.

```javascript
import { image } from '@metamask/snaps-ui';

// ...

const content = image('<svg width="400" height="400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m2.514 17.874 9 5c.021.011.043.016.064.026s.051.021.078.031a.892.892 0 0 0 .688 0c.027-.01.052-.019.078-.031s.043-.015.064-.026l9-5A1 1 0 0 0 22 16.9L21 7V2a1 1 0 0 0-1.625-.781L14.649 5h-5.3L4.625 1.219A1 1 0 0 0 3 2v4.9l-1 10a1 1 0 0 0 .514.974ZM5 7V4.081l3.375 2.7A1 1 0 0 0 9 7h6a1 1 0 0 0 .625-.219L19 4.079V7.1l.934 9.345L13 20.3v-2.967l1.42-.946A1.3 1.3 0 0 0 15 15.3a1.3 1.3 0 0 0-1.3-1.3h-3.4A1.3 1.3 0 0 0 9 15.3a1.3 1.3 0 0 0 .58 1.084l1.42.946v2.97l-6.94-3.855Zm3.5 6a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm5-2a2 2 0 1 1 2 2 2 2 0 0 1-2-2Z"/></svg>');
```

### panel

Outputs a panel, which can be used as a container for other components.

```javascript
import { panel, heading, text } from '@metamask/snaps-ui';

// ...

const insights = [
  /*...*/
];
const content = panel([
  heading('Here are the transaction insights'),
  ...insights.map((insight) => text(insight.description)),
]);
```

### spinner

Outputs a loading indicator.

```javascript
import { panel, heading, spinner } from '@metamask/snaps-ui';

// ...

const content = panel([heading('Please wait...'), spinner()]);
```

### text

Outputs text.

```javascript
import { text } from '@metamask/snaps-ui';

// ...

const content = text('This is a simple text UI');
```

## Markdown

Text-based components accept a very small subset of inline Markdown: `**bold**` and `_italic_`.
This subset will be increased in the future.

## Emoji

Text-based components accept emoji.
