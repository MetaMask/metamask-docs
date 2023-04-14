---
description: Use a custom user interface.
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

Text-based components accept a very small subset of Markdown: `**bold**` and `_italic_`.
This subset will be increased in the future.
