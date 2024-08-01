---
description: Display a dedicated UI page in MetaMask for your Snap.
sidebar_position: 3
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Home pages

You can display a dedicated UI, or "home page," for your Snap within MetaMask.
This is useful for introducing your Snap to end users.
Users can access your home page through the Snaps menu in MetaMask.
Snap home pages can contain [custom UI](index.md) and [interactive UI](interactive-ui.md)
components.

## Steps

### 1. Request permission to display a home page

Request the [`endowment:page-home`](../../reference/permissions.md#endowmentpage-home) permission.
Add the following to your Snap's manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:page-home": {}
}
```

### 2. Create a home page

Expose an [`onHomePage`](../../reference/entry-points.md#onhomepage) entry point, which returns the
custom or interactive UI to be shown.
MetaMask calls this method when a user selects your Snap name in the Snaps menu.

The following example displays custom UI that welcomes the user to the Snap's home page:

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

```typescript title="index.ts"
import type { OnHomePageHandler } from "@metamask/snaps-sdk"
import { panel, text, heading } from "@metamask/snaps-sdk"

export const onHomePage: OnHomePageHandler = async () => {
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

<p align="center">
<img src={require("../../assets/home-page.png").default} alt="Home page example" width="360px" style={{border: "1px solid #DCDCDC"}} />
</p>

## Example

See the [`@metamask/home-page-example-snap`](https://github.com/MetaMask/snaps/tree/main/packages/examples/packages/home-page)
package for a full example of implementing a Snap home page.
