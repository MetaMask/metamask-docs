# Concepts

[[toc]]

## Custom UI

### Introduction

Custom UI is a UI definition system used by various Snaps features. Rather than returning simply text strings, certain Snaps actions will have the ability to return a richer UI to express their output.

Custom UI is used to return custom user interfaces in [`snap_dialog`](./snaps-rpc-api.html#snap-dialog), and in the [`onTransaction` export](./snaps-exports.html#ontransaction).

### How to use it

To use Custom UI, you must first install the `@metamask/snaps-ui` NPM package:

```sh
yarn add @metamask/snaps-ui
```

Then, whenever you're required to return a custom UI, import the components you need from the package, and build your UI with them. For example:

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

Outputs a copyable text field.

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

Outputs a heading, useful e.g. for panel titles.

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

Outputs a panel, a container for other components.

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

Outputs a spinner.

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
