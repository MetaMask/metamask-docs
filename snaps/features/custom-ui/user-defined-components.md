---
description: Create your own JSX components to improve readability.
sidebar_position: 5
---

# User-defined components

When using JSX, you can create your own components by composing [existing components](with-jsx.md), or
other user-defined components.

## Basic example

In this first, basic example, the user-defined component is static. It does not accept any props (parameters) and returns the contents of a static home page.

```jsx title="Home.jsx"
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

export const Home = () => {
  return (
    <Box>
      <Heading>Welcome to my Snap</Heading>
      <Text>Hello, world!</Text>
    </Box>
  );
};
```

Once the component is defined, it can be used anywhere in the Snap. For example, to display the home page, you can use the following code:

```jsx title="index.jsx"
import { Home } from "./Home";

export const onHomepage = () => {
  return <Home />;
};
```

## Example with props

Components can be parametrized by passing props. Props are passed to the component as an object and can be accessed using the first parameter of the component's definition function:

```jsx title="Insight.jsx"
export const Insight = (props) => {
  return (
    <Box>
      <Row label="From">
        <Address address={props.from} />
      </Row>
      <Row label="To">
        {to ? <Address address={props.to} /> : <Text>None</Text>}
      </Row>
    </Box>
  );
};
```

In the example above, we see two usages of props:

- The `Insight` component accepts a `props` parameter, which is an object containing the `from` and `to` addresses. The `from` address is accessed using `props.from`, and the `to` address is accessed using `props.to`, since `props` is just a regular JavaScript object.
- The `Insight` component then uses the built-in `Address` component to display addresses. The `Address` component accepts an `address` prop. When using the `Address` component, we pass props to it by using a notation similar to HTML attributes: `address={props.from}`.

To use the `Insight` component, you can pass the `from` and `to` addresses as props:

```jsx title="index.jsx"
import { Insight } from "./Insight";

export const onTransaction = ({ transaction }) => {
  return { content: <Insight from={transaction.from} to={transaction.to} /> };
};
```

Props can be accessed using destructuring as well. This is not specific to JSX, simply a feature of JavaScript:

```jsx title="Insight.jsx"
export const Insight = ({ from, to }) => {
  return (
    <Box>
      <Row label="From">
        <Address address={from} />
      </Row>
      <Row label="To">
        {to ? <Address address={to} /> : <Text>None</Text>}
      </Row>
    </Box>
  );
};
```

## Return multiple elements

A JSX expression can only contain a single root element. To return multiple elements, wrap them in a parent element,
like `Box`. In the example above, we wrap the two `Row` elements in a `Box` element. Trying to return multiple elements
without a parent element will result in a syntax error.

```jsx title="WRONG-Insight.jsx"
export const Insight = ({ from, to }) => {

  // This causes a syntax error
  return (
    <Row label="From">
      <Address address={from} />
    </Row>
    <Row label="To">
      {to ? <Address address={to} /> : <Text>None</Text>}
    </Row>
  );
};
```

## Return a list

To return a list of elements, you can use an array. In the example below, the `Accounts` components receives an
array of accounts as props, and uses the array to display a list of accounts using `Array.map`:

```jsx title="Accounts.jsx"
export const Accounts = ({ accounts }) => {
  return (
    <Box>
      <Heading>Accounts</Heading>
      {accounts.map((account) => (
        <Row label={account.name}>
          <Address address={account.address} />
        </Row>
      ))}
    </Box>
  );
};
```

To use the `Accounts` component, you can pass an array of accounts as props:

```jsx title="index.jsx"
import { Accounts } from "./Accounts";

export const onHomepage = () => {
  return <Accounts accounts={[{ name: "Account 1", address: "0x123" }, { name: "Account 2", address: "0x456" }]} />;
};
```

## Usage with TypeScript

The `@metamask/snaps-sdk/jsx` package exports a `SnapComponent` type that can be used to define components that are compatible with TypeScript. The `SnapComponent` type is generic: it accepts a `Props` type parameter that will define the shape of the props object. For example:

```tsx title="Insight.tsx"
import type { SnapComponent } from '@metamask/snaps-sdk/jsx';
import { Button, Box, Text, Row, Address } from '@metamask/snaps-sdk/jsx';

type InsightProps = {
  from: string;
  to?: string;
};

export const Insight: SnapComponent<InsightProps> = ({ from, to }) => {
  return (
    <Box>
      <Row label="From">
        <Address address={from as `0x${string}`} />
      </Row>
      <Row label="To">
        {to ? <Address address={to as `0x${string}`} /> : <Text>None</Text>}
      </Row>
    </Box>
  );
};
```

Here are the steps to create user-defined components with TypeScript:

1. Import the `SnapComponent` type:
   ```tsx
   import type { SnapComponent } from '@metamask/snaps-sdk/jsx';
   ```
2. Define a type for the props of your component:
   ```tsx
   type InsightProps = {
     from: string;
     to?: string;
   };
   ```
3. Annotate the type of your component:
   ```tsx
   export const Insight: SnapComponent<InsightProps> = ({ from, to }) => {
     // ...
   };
   ```

This will have two effects:

- It will allow TypeScript to infer the types of the props inside your component.
- It will make sure that the props passed to the component match the expected props. For example,
using the `Insight` component above without the `from` prop, or passing a `number` instead of a
`string` for the `from` prop will result in a type error.