---
description: Provide transaction insights in MetaMask's transaction confirmation window.
toc_max_heading_level: 4
sidebar_position: 13
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Transaction insights

You can provide transaction insights in MetaMask's transaction confirmation window before a user
signs a transaction.
For example, you can show the user the percentage of gas fees they would pay for their transaction.

## Steps

### 1. Request permission to display transaction insights

Request the [`endowment:transaction-insight`](../reference/permissions.md#endowmenttransaction-insight)
permission by adding the following to your Snap's manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:transaction-insight": {}
}
```

If you need to receive the origin of the transaction request, add `allowTransactionOrigin` to the
permission object, and set it to `true`:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:transaction-insight": {
    "allowTransactionOrigin": true
  }
}
```

### 2. Implement the `onTransaction` entry point

Expose an [`onTransaction`](../reference/entry-points.md#ontransaction) entry point, which receives
a raw unsigned transaction payload, the chain ID, and the optional transaction origin.
When a user submits a transaction using the MetaMask extension, MetaMask calls the `onTransaction`
handler method.

The following is an example implementation of `onTransaction`:

<Tabs>
<TabItem value="JSX">

```tsx title="index.tsx"
import type { OnTransactionHandler } from "@metamask/snaps-sdk";
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin,
}) => {
  const insights = /* Get insights */;
  return {
    content: (
      <Box>
        <Heading>My Transaction Insights</Heading>
        <Text>Here are the insights:</Text>
        {insights.map((insight) => (
          <Text>{insight.value}</Text>
        ))}
      </Box>
    ),
  };
};
```

</TabItem>
<TabItem value="Functions" deprecated>

```typescript title="index.ts"
import type { OnTransactionHandler } from "@metamask/snaps-sdk";
import { panel, heading, text } from "@metamask/snaps-sdk";

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin,
}) => {
  const insights = /* Get insights */;
  return {
    content: panel([
      heading("My Transaction Insights"),
      text("Here are the insights:"),
      ...(insights.map((insight) => text(insight.value))),
    ]),
  };
};
```

</TabItem>
</Tabs>


The Snap tab in the transaction confirmation window displays the transaction insights:

<p align="center">
<img src={require("../assets/transaction-insights-window.png").default} alt="Transaction insights" width="360px" style={{border: "1px solid #DCDCDC"}} />
</p>

#### Transaction severity level

:::flaskOnly
:::

A Snap providing transaction insights can return an optional severity level of `"critical"`.
MetaMask shows a modal with the warning before the user can confirm the transaction.

<Tabs>
<TabItem value="JSX">

```tsx title="index.tsx"
import type { OnTransactionHandler } from "@metamask/snaps-sdk";
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin,
}) => {
  const insights = /* Get insights */;
  return {
    content: (
      <Box>
        <Heading>My Transaction Insights</Heading>
        <Text>Here are the insights:</Text>
        {insights.map((insight) => (
          <Text>{insight.value}</Text>
        ))}
      </Box>
    ),
    // highlight-next-line
    severity: "critical",
  };
};
```

</TabItem>
<TabItem value="Functions" deprecated>

```typescript title="index.ts"
import type { OnTransactionHandler } from "@metamask/snaps-sdk";
import { panel, heading, text } from "@metamask/snaps-sdk";

export const onTransaction: OnTransactionHandler = async ({
  transaction,
  chainId,
  transactionOrigin,
}) => {
  const insights = /* Get insights */;
  return {
    content: panel([
      heading("My Transaction Insights"),
      text("Here are the insights:"),
      ...(insights.map((insight) => text(insight.value))),
    ]),
    // highlight-next-line
    severity: "critical",
  };
};
```

</TabItem>
</Tabs>

<p align="center">
<img src={require("../assets/transaction-insights-warning.png").default} alt="Transaction insights warning" width="360px" />
</p>

## Example

For a full end-to-end tutorial that walks you through creating a transaction insights Snap, see
[Create a Snap to calculate gas fee percentages](../learn/tutorials/transaction-insights.md).
You can also see the
[`@metamask/transaction-insights-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/transaction-insights)
package for a full example of implementing transaction insights.
