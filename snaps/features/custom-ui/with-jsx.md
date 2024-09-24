---
description: Display custom user interface components using JSX.
sidebar_position: 4
---

# Custom UI with JSX

You can display custom user interface (UI) JSX components using the
[`@metamask/snaps-sdk`](https://github.com/MetaMask/snaps/tree/main/packages/snaps-sdk) module when
implementing the following features:

- [Dialogs](dialogs.md)
- [Home pages](home-pages.md)
- [Transaction insights](../transaction-insights.md)
- [Signature insights](../signature-insights.md)

:::note
JSX is supported in MetaMask Extension and Flask version 12+. New UI components will be added as JSX components. The previous function-based library is deprecated.
:::

To use custom UI with JSX, first install [`@metamask/snaps-sdk`](https://github.com/MetaMask/snaps/tree/main/packages/snaps-sdk)
using the following command:

```bash
yarn add @metamask/snaps-sdk
```

Then, whenever you're required to return a custom UI JSX component, import the components from the
SDK at `@metamask/snaps-sdk/jsx` and build your UI with them.
For example, to display a [`Box`](#box) (the [`panel`](./index.md#panel) function equivalent) using [`snap_dialog`](../../reference/snaps-api.md#snap_dialog):

```javascript title="index.jsx"
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

await snap.request({
  method: "snap_dialog",
  params: {
    type: "alert",
    content: (
      <Box>
        <Heading>Alert heading</Heading>
        <Text>Something happened in the system.</Text>
      </Box>
    ),
  },
});
```

:::note
Note that JSX can only be used in `.jsx` or `.tsx` files.
:::

## Upgrade an existing Snap to use JSX

Follow these steps to upgrade an existing Snap to use JSX:

1. Upgrade dependencies in `packages/snap/package.json`:

    - Upgrade `@metamask/snaps-sdk` to `^6.1.1` or later.
    - Upgrade `@metamask/snaps-cli` to `^6.2.1` or later.
    - Upgrade `@metamask/snaps-jest` to `^8.2.0` or later.
   
   Run `yarn install` to install the new versions.

2. Update `packages/snap/.eslintrc.js`:

    - Add a new section in `overrides` with the following configuration:
      ```json
      {
        "files": ["**/*.ts", "**/*.tsx"],
        "extends": ["@metamask/eslint-config-typescript"],
        "rules": {
          // This allows importing the `Text` JSX component.
          "@typescript-eslint/no-shadow": [
            "error",
            {
              "allow": ["Text"],
            },
          ],
        },
      }
      ```
    - Replace `["*.test.ts"]` with `["*.test.ts", "*.test.tsx"]`.

3. Update `packages/snap/src/index.ts`, if it will have JSX:

    - Rename the file to `index.tsx`.
    - Modify the `input` field in `packages/snap/snap.config.ts` to `src/index.tsx`.

4. Update `packages/snap/tsconfig.json`:

    - Under `compilerOptions`, add:
      ```json
      "jsx": "react-jsx",
      "jsxImportSource": "@metamask/snaps-sdk"
      ```
    - Change the `include` property from `["**/*.ts"]` to `["**/*.ts", "**/*.tsx"]`.

5. Replace all Custom UI in your code with JSX components, renaming the target files with the `.tsx` extension.

## Components

The following custom UI JSX components are available:

### `Address`

Outputs a formatted text field for an Ethereum address. 
The address is automatically displayed with a jazzicon and truncated value. 
Hovering the address shows the full value in a tooltip.

#### Example

```javascript title="index.jsx"
import { Box, Heading, Address } from "@metamask/snaps-sdk/jsx";

await snap.request({
  method: "snap_dialog",
  params: {
    type: "alert",
    content: (
      <Box>
        <Heading>Are you sure you want to send tokens to this address?</Heading>
        <Address address="0x000000000000000000000000000000000000dEaD" />
      </Box>
    ),
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

### `Bold`

Outputs bold text.

#### Example

```javascript title="index.jsx"
import { Box, Heading, Text, Bold } from "@metamask/snaps-sdk/jsx";

await snap.request({
  method: "snap_dialog",
  params: {
    type: "alert",
    content: (
      <Box>
        <Heading>Hello world!</Heading>
        <Text>
          This is <Bold>bold</Bold>.
        </Text>
      </Box>
    ),
  },
});
```

### `Box`

Outputs a box, which can be used as a container for other components.

#### Props

- `direction` - (Optional) The direction in which elements flow inside the box.
  Possible values are `"horizontal"` or `"vertical"`.
  The default is `"vertical"`. 
- `alignment` - (Optional) The alignment of the elements inside the box.
  Possible values are `"start"`, `"center"`, `"end"`, `"space-between"`, or `"space-around"`.
  The default is `"start"`.

#### Example

```javascript title="index.jsx"
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

module.exports.onHomePage = async () => {
  return {
    content: (
      <Box>
        <Heading>Features</Heading>
        <Box
          direction="horizontal"
          alignment="space-around"
        >
          <Text>Feature 1</Text>
          <Text>Feature 2</Text>
          <Text>Feature 3</Text>
        </Box>
      </Box>
    ),
  };
};
```

<p align="center">
<img src={require("../../assets/custom-ui-box.png").default} alt="Box UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `Button`

Outputs a button that the user can select.
For use in [interactive UI](interactive-ui.md).

#### Props

- `children`: `string | Image | Icon` - The contents of the button.
- `type` - (Optional) The type of button.
  Possible values are `"button"` or `"submit"`.
  The default is `"button"`.
- `name`: `string` - (Optional) The name that will be sent to [`onUserInput`](../../reference/entry-points.md#onuserinput)
  when a user selects the button.
- `variant` - (Optional) Determines the appearance of the button.
  Possible values are `"primary"` or `"destructive"`.
  The default is `"primary"`.

#### Example

```javascript
import { Box, Heading, Button } from "@metamask/snaps-sdk/jsx";

const interfaceId = await snap.request({
  method: "snap_createInterface",
  params: {
    ui: (
      <Box>
        <Heading>Interactive interface</Heading>
        <Button name="interactive-button">Click me</Button>
      </Box>
    ),
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

### `Checkbox`

Outputs a checkbox for use in [interactive UI](interactive-ui.md).

#### Props

- `name`: `string` - The name sent to [`onUserInput`](../../reference/entry-points.md#onuserinput).
- `checked`: `boolean` - (Optional) Whether the checkbox is checked.
- `label`: `string` - (Optional) The label for the checkbox.
- `variant`: `"default" | "toggle"` - (Optional) The variant of the checkbox.

#### Example

```js
import { Checkbox } from "@metamask/snaps-sdk/jsx";

const interfaceId = await snap.request({
  method: "snap_createInterface",
  params: {
    ui: (
      <Box>
        <Checkbox name="accept-terms" label="I understand the terms" />
        <Checkbox name="dark-mode" label="Dark mode" variant="toggle" />
      </Box>
    ),
  },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-checkbox.png").default} alt="Checkbox UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `Copyable`

Outputs a read-only text field with a copy-to-clipboard shortcut.

#### Props

- `value`: `string` - The value to copy when the user clicks on the copyable element.
- `sensitive`: `boolean` - (Optional) Indicates whether the value is sensitive. If `true`, the value will be hidden when the user is not interacting with the copyable element.

#### Example

```javascript title="index.jsx"
import { Box, Text, Copyable } from "@metamask/snaps-sdk/jsx";

await snap.request({
  method: "snap_dialog",
  params: {
    type: "alert",
    content: (
      <Box>
        <Text>Your address:</Text>
        <Copyable value="0x000000000000000000000000000000000000dEaD" />
      </Box>
    ),
  },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-copyable.png").default} alt="Copyable UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `Divider`

Outputs a horizontal divider.

#### Example

```javascript title="index.jsx"
import { Box, Heading, Divider, Text } from "@metamask/snaps-sdk/jsx";

module.exports.onHomePage = async () => {
  return {
    content: (
      <Box>
        <Heading>Hello world!</Heading>
        <Divider />
        <Text>Welcome to my Snap home page!</Text>
      </Box>
    ),
  };
};
```

<p align="center">
<img src={require("../../assets/custom-ui-divider.png").default} alt="Divider UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `Dropdown`

Outputs a dropdown for use in [interactive UI](interactive-ui.md).

#### Props

- `name`: `string` - The name sent to [`onUserInput`](../../reference/entry-points.md#onuserinput).
- `children`: `Option[]` - One or more `Option` components with the following props:
  - `value`: `string` - The value sent to [`onUserInput`](../../reference/entry-points.md#onuserinput).
  - `children`: `string` - The text displayed in the dropdown for that option.

#### Example

```js
import { Box, Text, Dropdown } from "@metamask/snaps-sdk/jsx";

const interfaceId = await snap.request({
  method: "snap_createInterface",
  params: {
    ui: (
      <Box>
        <Text>Pick a currency</Text>
        <Dropdown name="currency">
          <Option value="ETH">ETH</Option>
          <Option value="USD">USD</Option>
        </Dropdown>
      </Box>
    ),
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

<div class="row">
    <div class="column">
        <img src={require("../../assets/custom-ui-dropdown.png").default} alt="Dropdown UI example" width="450px" style={{border: '1px solid #DCDCDC'}} />
    </div>
    <div class="column">
        <img src={require("../../assets/custom-ui-dropdown-active.png").default} alt="Active dropdown UI example" width="450px" style={{border: '1px solid #DCDCDC'}} />
    </div>
</div>

### `Field`

Outputs a form field, wrapping a [`Dropdown`](#dropdown), [`Input`](#input), [`Selector`](#selector), or [`RadioGroup`](#radiogroup) to give it a label and optional error.

#### Props

- `label`: `string` - The label for the wrapped element.
- `error`: `string` - (Optional) Any error for the wrapped element. Setting this changes the styling of the wrapped element to show that there is an error.
- `children` - The input element to be wrapped.

#### Example

```js
import { Field, Form, Input, Button } from "@metamask/snaps-sdk/jsx";

const interfaceId = await snap.request({
  method: "snap_createInterface",
  params: {
    ui: (
      <Form name="form-to-fill">
        <Field label="First Name">
          <Input name="firstName" placeholder="Enter your first name" />
        </Field>
        <Button type="submit">Submit</Button>
      </Form>
    ),
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
<img src={require("../../assets/custom-ui-field.png").default} alt="Field example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `Form`

Outputs a form for use in [interactive UI](interactive-ui.md).

#### Props

- `name`: `string` - The name that will be sent to [`onUserInput`](../../reference/entry-points.md#onuserinput)
  when a user interacts with the form.
- `children`: `array` - An array of [`Input`](#input) or [`Button`](#button) components.

#### Example

```js
import { Form, Input, Button } from "@metamask/snaps-sdk/jsx";

const interfaceId = await snap.request({
  method: "snap_createInterface",
  params: {
    ui: (
      <Form name="form-to-fill">
        <Field label="First Name">
          <Input name="firstName" placeholder="Enter your first name" />
        </Field>
        <Button type="submit">Submit</Button>
      </Form>
    ),
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

### `Heading`

Outputs a heading.
This is useful for [`Box`](#box) titles.

#### Example

```javascript title="index.jsx"
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

module.exports.onHomePage = async () => {
  return {
    content: (
      <Box>
        <Heading>Hello world!</Heading>
        <Text>Welcome to my Snap home page!</Text>
      </Box>
    ),
  };
};
```

<p align="center">
<img src={require("../../assets/custom-ui-heading.png").default} alt="Divider UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `Icon`

Outputs an icon.

#### Props

- `name`: `"confirmation" | "search" | "bold" | "link" | "data" | "menu" | "filter" | "key" | "warning" | "add-square" | "add" | "arrow-2-down" | "arrow-2-left" | "arrow-2-right" | "arrow-2-up" | "arrow-2-up-right" | "arrow-double-left" | "arrow-double-right" | "arrow-down" | "arrow-left" | "arrow-right" | "arrow-up" | "bank-token" | "bank" | "book" | "bookmark" | "bridge" | "calculator" | "card-pos" | "card-token" | "card" | "category" | "chart" | "check-bold" | "check" | "clock" | "close" | "code-circle" | "coin" | "connect" | "copy-success" | "copy" | "customize" | "danger" | "dark" | "diagram" | "document-code" | "drag-drop" | "dragging-animation" | "pinning-animation" | "edit" | "eraser" | "ethereum" | "expand" | "explore" | "export" | "eye-slash" | "eye" | "flag" | "flash-slash" | "flash" | "full-circle" | "gas" | "global-search" | "global" | "graph" | "hardware" | "heart" | "hierarchy" | "home" | "import" | "info" | "light" | "loading" | "lock-circle" | "lock-slash" | "lock" | "login" | "logout" | "message-question" | "messages" | "minus-bold" | "minus-square" | "minus" | "mobile" | "money" | "monitor" | "more-horizontal" | "more-vertical" | "notification-circle" | "notification" | "password-check" | "people" | "pin" | "programming-arrows" | "custody" | "question" | "received" | "refresh" | "save" | "scan-barcode" | "scan-focus" | "scan" | "scroll" | "security-card" | "security-cross" | "security-key" | "security-search" | "security-slash" | "security-tick" | "security-time" | "security-user" | "security" | "send-1" | "send-2" | "setting" | "slash" | "snaps-mobile" | "snaps-plus" | "snaps" | "speedometer" | "star" | "stake" | "student" | "swap-horizontal" | "swap-vertical" | "tag" | "tilde" | "timer" | "trash" | "trend-down" | "trend-up" | "user-circle-add" | "user-circle-link" | "user-circle-remove" | "user-circle" | "user" | "wallet-card" | "wallet-money" | "wallet" | "warning" | "twitter" | "qr-code" | "user-check" | "unpin" | "ban" | "bold" | "circle-x" | "download" | "file" | "flask" | "plug" | "share" | "square" | "tint" | "upload" | "usb" | "wifi" | "plus-minus"` - The name of the icon.
- `color`: `'default' | 'primary' | 'muted'` - (Optional) The color of the icon.
- `size`: `'md' | 'inherit'` - (Optional) The size of the icon.

#### Example

```javascript title="index.jsx"
import { Icon } from "@metamask/snaps-sdk/jsx";

await snap.request({
  method: "snap_dialog",
  params: {
    type: "alert",
    content: (
      <Box direction="horizontal">
        <Icon name="warning" size="md" />
        <Text>Double-check the "to" address before proceeding.</Text>
      </Box>
    ),
  },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-icon.png").default} alt="Icon UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `Image`

Outputs an image. 
This component takes an inline SVG.
It does not support remote URLs.

You can import SVG, PNG, and JPEG files using an import statement.
These files are automatically imported as SVG strings, so you can pass them directly to the `Image` component.

The SVG is rendered within an `<img>` tag, which prevents JavaScript or interaction events from
being supported.

:::note
To disable image support, set the [`features.images`](../../reference/cli/options.md#featuresimages)
configuration option to `false`.
The default is `true`.
:::

#### Props

- `src`: `string` - An inline SVG.
- `alt`: `string` - An optional alternative text for the image.

#### Example

```javascript title="index.jsx"
import { Box, Heading, Text, Image } from "@metamask/snaps-sdk/jsx";
import svgIcon from "./path/to/icon.svg";

module.exports.onHomePage = async () => {
  return {
    content: (
      <Box>
        <Heading>Hello world!</Heading>
        <Text>Welcome to my Snap home page!</Text>
        <Image src={svgIcon} />
      </Box>
    ),
  };
};
```

<p align="center">
<img src={require("../../assets/custom-ui-image.png").default} alt="Divider UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

:::note
See the [`@metamask/images-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/images)
package for a full example of implementing images.
:::

### `Input`

Outputs an input component for use in [interactive UI](interactive-ui.md).

#### Props

- `name`: `string` - The name that will be used as a key to the event sent to
  [`onUserInput`](../../reference/entry-points.md#onuserinput) when the containing form is submitted.
- `type` - (Optional) The type of input.
  Possible values are `"text"`, `"number"`, or `"password"`.
  The default is `"text"`.
- `placeholder`: `string` - (Optional) The text displayed when the input is empty.
- `label`: `string` - (Optional) The text displayed alongside the input to label it.
- `value`: `string` - (Optional) The default value of the input.

#### Example

```js
import { Form, Input, Button } from "@metamask/snaps-sdk/jsx";

const interfaceId = await snap.request({
  method: "snap_createInterface",
  params: {
    ui: (
      <Form name="form-to-fill">
        <Field label="First Name">
          <Input name="firstName" placeholder="Enter your first name" />
        </Field>
        <Button type="submit">Submit</Button>
      </Form>
    ),
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

### `Italic`

Outputs italic text.

#### Example

```javascript title="index.jsx"
import { Box, Heading, Text, Italic } from "@metamask/snaps-sdk/jsx";

await snap.request({
  method: "snap_dialog",
  params: {
    type: "alert",
    content: (
      <Box>
        <Heading>Hello world!</Heading>
        <Text>
          This is <Italic>italic</Italic>.
        </Text>
      </Box>
    ),
  },
});
```

### `Link`

Outputs a clickable link.

#### Props

- `href`: `string` - The URL to point to. This must be an HTTPS URL.
- `children`: `Array<string | Bold | Italic>` - The link text.

#### Example

```javascript title="index.jsx"
import { Box, Heading, Link, Text } from "@metamask/snaps-sdk/jsx";

module.exports.onHomePage = async () => {
  return {
    content: (
      <Box>
        <Heading>Hello world!</Heading>
        <Text>
          Download <Link href="https://metamask.io">MetaMask</Link>.
        </Text>
        <Text>
          Read the MetaMask docs at <Link href="https://docs.metamask.io">MetaMask docs</Link>.
        </Text>
      </Box>
    ),
  };
};
```

<p align="center">
<img src={require("../../assets/custom-ui-links.png").default} alt="Links UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `RadioGroup`

Outputs a radio group component for use in [interactive UI](interactive-ui.md).

#### Props

- `name`: `string` - The name that will be used as a key to the event sent to
  [`onUserInput`](../../reference/entry-points.md#onuserinput) when the containing form is submitted.
- `children`: `Radio[]` - One or more `Radio` components, each with a `value` and text child (see example).

#### Example

```js
import { RadioGroup, Radio } from "@metamask/snaps-sdk/jsx";

const interfaceId = await snap.request({
  method: "snap_createInterface",
  params: {
    ui: (
      <Form name="form-example">
        <Field label="Select an option">
          <RadioGroup name="radio-group-example">
            <Radio value="option-1">Option 1</Radio>
            <Radio value="option-2">Option 2</Radio>
          </RadioGroup>
        </Field>
      </Form>
    ),
  },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-radio-group.png").default} alt="RadioGroup UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `Row`

Outputs a row with a label and value, which can be used for key-value data.

#### Props

- `label`: `string` - The label of the row.
- `variant` - (Optional) The variant of the label.
  Possible values are `"default"`, `"error"`, or `"warning"`.
- `children` - The value of the row, which can be a [`Text`](#text), [`Image`](#image), or
  [`Address`](#address) component.

#### Example

```javascript title="index.jsx"
import { Box, Row, Text, Address } from "@metamask/snaps-sdk/jsx";

await snap.request({
  method: "snap_dialog",
  params: {
    type: "alert",
    content: (
      <Box>
        <Row label="Address">
          <Address address="0x000000000000000000000000000000000000dEaD" />
        </Row>
        <Row label="Balance">
          <Text>1.78 ETH</Text>
        </Row>
      </Box>
    ),
  },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-row.png").default} alt="Row UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `Selector`

Outputs a selector component for use in [interactive UI](interactive-ui.md).

#### Props

- `name`: `string` - The name that will be used as a key to the event sent to 
  [`onUserInput`](../../reference/entry-points.md#onuserinput) when the containing form is submitted.
- `title`: `string` - The title of the selector, displayed when the selector is opened.
- `children`: `SelectorOption[]` - One or more `SelectorOption` components, each with a `Card` child (see example).

#### Example

```js
import { Selector, SelectorOption, Card } from "@metamask/snaps-sdk/jsx";

const interfaceId = await snap.request({
  method: "snap_createInterface",
  params: {
    ui: (
      <Selector name="selector-example" title="Select an option">
        <SelectorOption value="option-1">
          <Card title="Option 1" value="First option" />
        </SelectorOption>
        <SelectorOption value="option-2">
          <Card title="Option 2" value="Second option" />
        </SelectorOption>
      </Selector>
    ),
  },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-selector.png").default} alt="Selector UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `Spinner`

Outputs a loading indicator.

#### Example

```javascript title="index.jsx"
import { Box, Heading, Spinner } from "@metamask/snaps-sdk/jsx";

await snap.request({
  method: "snap_dialog",
  params: {
    type: "alert",
    content: (
      <Box>
        <Heading>Please wait...</Heading>
        <Spinner />
      </Box>
    ),
  },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-spinner.gif").default} alt="Spinner UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### `Text`

Outputs text.

#### Props

- `color`:  `'default' | 'alternative' | 'muted' | 'error' | 'success' | 'warning'` - (Optional) The color of the text.
- `alignment`: `'start' | 'center' | 'end'` - (Optional) The alignment of the text.


#### Example

```javascript title="index.jsx"
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

module.exports.onHomePage = async () => {
  return {
    content: (
      <Box>
        <Heading>Hello world!</Heading>
        <Text>Welcome to my Snap home page!</Text>
      </Box>
    ),
  };
};
```

<p align="center">
<img src={require("../../assets/custom-ui-heading.png").default} alt="Text UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

<<<<<<< HEAD
### `Tooltip`

Outputs a tooltip when the wrapped child is hovered over.

#### Props

- `content`: - The content of the tooltip.
- `children`: - The child element to wrap.

#### Example

```javascript title="index.jsx"
import { Tooltip, Text } from "@metamask/snaps-sdk/jsx";

await snap.request({
  method: "snap_dialog",
  params: {
    type: "alert",
    content: (
      <Box>
        <Tooltip
          content={
            <Text>
              Tooltip <Bold>text</Bold>
            </Text>
          }
        >
          <Text>Hello world!</Text>
        </Tooltip>
      </Box>
    ),
  },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-tooltip.png").default} alt="Tooltip UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

### Emojis

Text-based components (such as [`Heading`](#heading) and [`Text`](#text)) accept emojis.

#### Example

```javascript title="index.jsx"
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

await snap.request({
  method: "snap_dialog",
  params: {
    type: "alert",
    content: (
      <Box>
        <Heading>Hello world!</Heading>
        <Text>This is an apple 🍎 and this is an orange 🍊.</Text>
      </Box>
    ),
  },
});
```

<p align="center">
<img src={require("../../assets/custom-ui-emojis.png").default} alt="Emojis UI example" width="450px" style={{border: "1px solid #DCDCDC"}} />
</p>

## User-defined components

In addition to the components provided by the SDK, you can [define your own components](user-defined-components.md).
