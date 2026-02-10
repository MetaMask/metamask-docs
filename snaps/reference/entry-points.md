---
description: See the Snaps entry points reference.
sidebar_position: 4
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Snaps entry points

Snaps can expose the following entry points.

## `onCronjob`

To run [cron jobs](../features/cron-jobs.md) for the user, a Snap must expose the `onCronjob` entry point.
MetaMask calls the `onCronjob` handler method at the specified schedule with the requests defined in
the [`endowment:cronjob`](permissions.md#endowmentcronjob) permission.

:::note
For MetaMask to call the Snap's `onCronjob` method, you must request the
[`endowment:cronjob`](permissions.md#endowmentcronjob) permission.
:::

#### Parameters

An object containing an RPC request specified in the `endowment:cronjob` permission.

#### Example

<Tabs>
<TabItem value="TypeScript">

```typescript title="index.ts"
import type { OnCronjobHandler } from "@metamask/snaps-sdk"

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  switch (request.method) {
    case "exampleMethodOne":
      return snap.request({
        method: "snap_notify",
        params: {
          type: "inApp",
          message: "Hello, world!",
        },
      })

    default:
      throw new Error("Method not found.")
  }
}
```

</TabItem>
<TabItem value="JavaScript">

```js title="index.js"
module.exports.onCronjob = async ({ request }) => {
  switch (request.method) {
    case "exampleMethodOne":
      return snap.request({
        method: "snap_notify",
        params: {
          type: "inApp",
          message: "Hello, world!",
        },
      })

    default:
      throw new Error("Method not found.")
  }
}
```

</TabItem>
</Tabs>

## `onHomePage`

To display a [home page](../features/custom-ui/home-pages.md) within MetaMask, a Snap must expose
the `onHomePage` entry point.
MetaMask calls the `onHomePage` handler method when the user selects the Snap name in the Snaps menu.

:::note
For MetaMask to call the Snap's `onHomePage` method, you must request the
[`endowment:page-home`](permissions.md#endowmentpage-home) permission.
:::

#### Parameters

None.

#### Returns

One of the following:

- A `content` object displayed using [custom UI](../features/custom-ui/index.md).
- An `id` returned by [`snap_createInterface`](./snaps-api.md#snap_createinterface) for
  [interactive UI](../features/custom-ui/interactive-ui.md).

#### Example

<Tabs>
<TabItem value="JSX">

```tsx title="index.tsx"
import type { OnHomePageHandler } from "@metamask/snaps-sdk";
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

export const onHomePage: OnHomePageHandler = async () => {
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

</TabItem>
<TabItem value="Functions" deprecated>

```js title="index.js"
import { panel, text, heading } from "@metamask/snaps-sdk"

module.exports.onHomePage = async () => {
  return {
    content: panel([
      heading("Hello world!"),
      text("Welcome to my Snap home page!"),
    ]),
  }
}
```

</TabItem>
</Tabs>

## `onInstall`

To implement a [lifecycle hook](../features/lifecycle-hooks.md) that runs an action upon
installation, a Snap must expose the `onInstall` entry point.
MetaMask calls the `onInstall` handler method after the Snap is installed successfully.

:::note
For MetaMask to call the Snap's `onInstall` method, you must request the
[`endowment:lifecycle-hooks`](permissions.md#endowmentlifecycle-hooks) permission.
:::

#### Parameters

None.

#### Example

<Tabs>
<TabItem value="JSX">

```tsx title="index.tsx"
import type { OnInstallHandler } from "@metamask/snaps-sdk";
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

export const onInstall: OnInstallHandler = async () => {
  await snap.request({
    method: "snap_dialog",
    params: {
      type: "alert",
      content: (
        <Box>
          <Heading>Thank you for installing my Snap</Heading>
          <Text>
            To use this Snap, visit the companion dapp at <a href="https://metamask.io">metamask.io</a>.
          </Text>
        </Box>
      ),
    },
  });
};
```

</TabItem>
<TabItem value="Functions" deprecated>

```js title="index.js"
import { heading, panel, text } from "@metamask/snaps-sdk"

module.exports.onInstall = async () => {
  await snap.request({
    method: "snap_dialog",
    params: {
      type: "alert",
      content: panel([
        heading("Thank you for installing my Snap"),
        text(
          "To use this Snap, visit the companion dapp at [metamask.io](https://metamask.io)."
        ),
      ]),
    },
  })
}
```

</TabItem>
</Tabs>


## `onKeyringRequest`

To implement the [Account Management API](keyring-api/account-management/index.md) to integrate
[custom EVM accounts](../features/custom-evm-accounts/index.md), an account management Snap must
expose the `onKeyringRequest` entry point.
Whenever the Snap receives an Account Management API request, MetaMask calls the `onKeyringRequest`
handler method.

:::note
For MetaMask to call the Snap's `onKeyringRequest` method, you must request the
[`endowment:keyring`](permissions.md#endowmentkeyring) permission.
:::

#### Parameters

An object containing:

- `origin` - The origin as a string.
- `request` - The JSON-RPC request.

#### Returns

A promise containing the return of the implemented method.

#### Example

<Tabs>
<TabItem value="TypeScript">

```typescript title="index.ts"
export const onKeyringRequest: OnKeyringRequestHandler = async ({
  origin,
  request,
}) => {
  // Any custom logic or extra security checks here.
  return handleKeyringRequest(keyring, request)
}
```

</TabItem>
<TabItem value="JavaScript">

```js title="index.js"
module.exports.onKeyringRequest = async ({ origin, request }) => {
  // Any custom logic or extra security checks here.
  return handleKeyringRequest(keyring, request)
}
```

</TabItem>
</Tabs>

## `onNameLookup`

To provide [custom name resolution](../features/custom-name-resolution.md), a Snap must export `onNameLookup`.
Whenever a user types in the send field, MetaMask calls this method.
MetaMask passes the user input to the `onNameLookup` handler method.

:::note
For MetaMask to call the Snap's `onNameLookup` method, you must request the
[`endowment:name-lookup`](permissions.md#endowmentname-lookup) permission.
:::

#### Parameters

An object containing:

- `chainId` - The [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md)
  chain ID.
- `address` or `domain` - One of these parameters is defined, and the other is undefined.

#### Example

<Tabs>
<TabItem value="TypeScript">

```typescript title="index.ts"
import type { OnNameLookupHandler } from "@metamask/snaps-sdk"

export const onNameLookup: OnNameLookupHandler = async (request) => {
  const { chainId, address, domain } = request

  if (address) {
    const shortAddress = address.substring(2, 5)
    const chainIdDecimal = parseInt(chainId.split(":")[1], 10)
    const resolvedDomain = `${shortAddress}.${chainIdDecimal}.test.domain`
    return { resolvedDomains: [{ resolvedDomain, protocol: "test protocol" }] }
  }

  if (domain) {
    const resolvedAddress = "0xc0ffee254729296a45a3885639AC7E10F9d54979"
    return {
      resolvedAddresses: [{ resolvedAddress, protocol: "test protocol", domainName: domain }],
    }
  }

  return null
}
```

</TabItem>
<TabItem value="JavaScript">

```js title="index.js"
module.exports.onNameLookup = async ({ request }) => {
  const { chainId, address, domain } = request

  if (address) {
    const shortAddress = address.substring(2, 5)
    const chainIdDecimal = parseInt(chainId.split(":")[1], 10)
    const resolvedDomain = `${shortAddress}.${chainIdDecimal}.test.domain`
    return { resolvedDomains: [{ resolvedDomain, protocol: "test protocol" }] }
  }

  if (domain) {
    const resolvedAddress = "0xc0ffee254729296a45a3885639AC7E10F9d54979"
    return {
      resolvedAddresses: [{ resolvedAddress, protocol: "test protocol", domainName: domain }],
    }
  }

  return null
}
```

</TabItem>
</Tabs>

## `onRpcRequest`

To implement a [custom JSON-RPC API](../learn/about-snaps/apis.md#custom-json-rpc-apis) to communicate with
dapps and other Snaps, a Snap must expose the `onRpcRequest` entry point.
Whenever the Snap receives a JSON-RPC request, MetaMask calls the `onRpcRequest` handler method.

:::note
For MetaMask to call the Snap's `onRpcRequest` method, you must request the
[`endowment:rpc`](permissions.md#endowmentrpc) permission.
:::

#### Parameters

An object containing:

- `origin` - The origin as a string.
- `request` - The JSON-RPC request.

#### Returns

A promise containing the return of the implemented method.

#### Example

<Tabs>
<TabItem value="TypeScript">

```typescript title="index.ts"
import type { OnRpcRequestHandler } from "@metamask/snaps-sdk"

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case "hello":
      return "world!"

    default:
      throw new Error("Method not found.")
  }
}
```

</TabItem>
<TabItem value="JavaScript">

```js title="index.js"
module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {
    case "hello":
      return "world!"

    default:
      throw new Error("Method not found.")
  }
}
```

</TabItem>
</Tabs>

## `onSignature`

To provide [signature insights](../features/signature-insights.md) before a user signs a message, a
Snap must expose the `onSignature` entry point.
Whenever a [signing method](/wallet/concepts/signing-methods) is called, such as `personal_sign` or
`eth_signTypedData_v4`, MetaMask passes the raw unsigned signature payload to the `onSignature`
handler method.

:::note
For MetaMask to call the Snap's `onSignature` method, you must request the
[`endowment:signature-insight`](permissions.md#endowmentsignature-insight) permission.
:::

#### Parameters

An object containing:

- `signature` - The raw signature payload.
- `signatureOrigin` - The signature origin if
  [`allowSignatureOrigin`](permissions.md#endowmentsignature-insight) is set to `true`.

#### Returns

- An optional `severity` property that, if present, must be set to `SeverityLevel.Critical`.
- A `content` object displayed using [custom UI](../features/custom-ui/index.md) after the user
  selects the **Sign** button.
  Due to current limitations of MetaMask's signature confirmation UI, the content will only be displayed if
  the `severity` property is present and set to `SeverityLevel.Critical`.

#### Example

<Tabs>
<TabItem value="JSX">

```tsx title="index.tsx"
import type { OnSignatureHandler, SeverityLevel } from "@metamask/snaps-sdk";
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

export const onSignature: OnSignatureHandler = async ({
  signature,
  signatureOrigin,
}) => {
  const insights = /* Get insights */;
  return {
    content: (
      <Box>
        <Heading>My Signature Insights</Heading>
        <Text>Here are the insights:</Text>
        {insights.map((insight) => (
          <Text>{insight.value}</Text>
        ))}
      </Box>
    ),
    severity: SeverityLevel.Critical,
  };
};
```

</TabItem>
<TabItem value="Functions" deprecated>

```typescript title="index.ts"
import type { OnSignatureHandler, SeverityLevel } from "@metamask/snaps-sdk";
import { panel, heading, text } from "@metamask/snaps-sdk";

export const onSignature: OnSignatureHandler = async ({
  signature,
  signatureOrigin,
}) => {
  const insights = /* Get insights */;
  return {
    content: panel([
      heading("My Signature Insights"),
      text("Here are the insights:"),
      ...(insights.map((insight) => text(insight.value))),
    ]),
    severity: SeverityLevel.Critical,
  };
};
```

</TabItem>
</Tabs>


## `onTransaction`

To provide [transaction insights](../features/transaction-insights.md) before a user signs a
transaction, a Snap must expose the `onTransaction` entry point.
When a user submits a transaction in the MetaMask extension, MetaMask calls the `onTransaction`
handler method.
MetaMask passes the raw unsigned transaction payload to `onTransaction`.

:::note
For MetaMask to call the Snap's `onTransaction` method, you must request the
[`endowment:transaction-insight`](permissions.md#endowmenttransaction-insight) permission.
:::

#### Parameters

An object containing:

- `transaction` - The raw transaction payload.
  Learn more about the [parameters of a submitted transaction](/wallet/how-to/send-transactions#transaction-parameters).
- `chainId` - The [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/master/CAIPs/caip-2.md)
  chain ID.
- `transactionOrigin` - The transaction origin if
  [`allowTransactionOrigin`](permissions.md#endowmenttransaction-insight) is set to `true`.

:::note
When interacting with EVM chain IDs, the provided chain ID uses the format `namespace:reference`, where the `reference` is a base 10 integer.
:::

#### Returns

- An optional `severity` property that, if present, must be set to `"critical"`.
  This feature is only available in Flask.
- One of the following:
  - A `content` object displayed using [custom UI](../features/custom-ui/index.md), alongside the confirmation
    for the transaction that `onTransaction` was called with.
  - An `id` returned by [`snap_createInterface`](./snaps-api.md#snap_createinterface) for
    [interactive UI](../features/custom-ui/interactive-ui.md).

#### Example

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

## `onUpdate`

To implement a [lifecycle hook](../features/lifecycle-hooks.md) that runs an action upon update, a
Snap must expose the `onUpdate` entry point.
MetaMask calls the `onUpdate` handler method after the Snap is updated successfully.

:::note
For MetaMask to call the Snap's `onUpdate` method, you must request the
[`endowment:lifecycle-hooks`](permissions.md#endowmentlifecycle-hooks) permission.
:::

#### Parameters

None.

#### Example

<Tabs>
<TabItem value="JSX">

```tsx title="index.tsx"
import type { OnUpdateHandler } from "@metamask/snaps-sdk";
import { Box, Heading, Text } from "@metamask/snaps-sdk/jsx";

export const onUpdate: OnUpdateHandler = async () => {
  await snap.request({
    method: "snap_dialog",
    params: {
      type: "alert",
      content: (
        <Box>
          <Heading>Thank you for updating my Snap</Heading>
          <Text>New features added in this version:</Text>
          <Text>Added a dialog that appears when updating.</Text>
        </Box>
      ),
    },
  })
}
```

</TabItem>
<TabItem value="Functions" deprecated>

```typescript title="index.ts"
import type { OnUpdateHandler } from "@metamask/snaps-sdk";
import { heading, panel, text } from "@metamask/snaps-sdk";

export const onUpdate: OnUpdateHandler = async () => {
  await snap.request({
    method: "snap_dialog",
    params: {
      type: "alert",
      content: panel([
        heading("Thank you for updating my Snap"),
        text("New features added in this version:"),
        text("Added a dialog that appears when updating."),
      ]),
    },
  })
}
```

</TabItem>
</Tabs>

## `onUserInput`

To respond to [interactive UI](../features/custom-ui/interactive-ui.md) events, a Snap must export `onUserInput`.

#### Parameters

- `id` - The ID of the interface being acted on.
- `event` - An event object containing:
  - `type` - The type of the event.
    Possible values are `ButtonClickEvent`, `FormSubmitEvent`, `InputChangeEvent`, and `FileInputEvent`.
    These enums are exported from the `@metamask/snaps-sdk` module.
  - `name` - The name of the component that fired the event.
    Optional when the event type is `ButtonClickEvent`.
  - `value` - When the event type is `FormSubmitEvent`, the values in the form as an object.
- `context` - The context object passed to the interface when calling [`snap_createInterface`](./snaps-api.md#snap_createinterface), or `null`.

#### Example

<Tabs>
<TabItem value="TypeScript">

```typescript title="index.ts"
import type { OnUserInputHandler } from "@metamask/snaps-sdk"
import { UserInputEventType } from "@metamask/snaps-sdk"

export const onUserInput: OnUserInputHandler = async ({ id, event }) => {
  if (event.type === UserInputEventType.FormSubmitEvent) {
    console.log("The submitted form values are", event.value)
  }
}
```

</TabItem>
<TabItem value="JavaScript">

```js title="index.js"
const { UserInputEventType } = require("@metamask/snaps-sdk")

module.exports.onUserInput = async ({ id, event }) => {
  if (event.type === UserInputEventType.FormSubmitEvent) {
    console.log("The submitted form values are", event.value)
  }
}
```

</TabItem>
</Tabs>
