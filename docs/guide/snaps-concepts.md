# Concepts

[[toc]]

## Custom UI

### Introduction

Custom UI is a UI definition system used by various Snaps features. It enables Snaps to describe a rich UI to be displayed in some contexts.

Custom UI is used to describe custom user interfaces in [`snap_dialog`](./snaps-rpc-api.html#snap-dialog), and in the [`onTransaction` export](./snaps-exports.html#ontransaction).

### How to use it

To use Custom UI, you must first install the `@metamask/snaps-ui` NPM package:

```sh
yarn add @metamask/snaps-ui
```

Then, whenever you're required to return a Custom UI, import the components you need from the package, and build your UI with them. For example:

```javascript
import { panel, heading, text } from '@metamask/snaps-ui';

// ...

const content = panel([
  heading('Alert heading'),
  text('Something happened in the system.'),
]);

return content;
```

### Components

The `NodeType` enum exported by `@metamask/snaps-ui` details the available components.

#### `Copyable`

##### Description

Outputs a read-only text field with a copy-to-clipboard shortcut.

##### Usage

```javascript
import { copyable } from '@metamask/snaps-ui';

// ...

const content = copyable('Text to be copied');
```

#### `Divider`

##### Description

Outputs a horizontal divider.

##### Usage

```javascript
import { panel, divider, text } from '@metamask/snaps-ui';

// ...

const content = panel([
  text('Text before the divider'),
  divider(),
  text('Text after the divider'),
]);
```

#### `Heading`

##### Description

Outputs a heading. Useful for panel titles.

##### Usage

```javascript
import { panel, heading, text } from '@metamask/snaps-ui';

// ...

const content = panel([
  heading('Title of the panel'),
  text('Text of the panel'),
]);
```

#### `Panel`

##### Description

Outputs a panel, which can be used as a container for other components.

##### Usage

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

#### `Spinner`

##### Description

Outputs a loading indicator.

##### Usage

```javascript
import { panel, heading, spinner } from '@metamask/snaps-ui';

// ...

const content = panel([heading('Please wait...'), spinner()]);
```

#### `Text`

##### Description

Outputs text.

##### Usage

```javascript
import { text } from '@metamask/snaps-ui';

// ...

const content = text('This is a simple text UI');
```
