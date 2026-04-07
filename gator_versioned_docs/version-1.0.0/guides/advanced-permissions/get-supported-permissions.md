---
description: Learn how to get supported Advanced Permissions for a wallet.
sidebar_label: Get supported permissions
keywords: [advanced permissions, supported execution permissions, erc-7715, 7715]
---

import Tabs from "@theme/Tabs"; 
import TabItem from "@theme/TabItem";

# Get supported permissions

[ERC-7715](https://eip.tools/eip/7715) defines an RPC method that returns the execution permissions
a wallet supports. Use the method to verify the available Advanced Permissions types and 
rules before sending requests.


## Prerequisites

- [Install and set up the Smart Accounts Kit](../../get-started/install.md)
- [Learn about Advanced Permissions](../../concepts/advanced-permissions.md)


## Request supported permissions

Request the supported Advanced Permissions types for a wallet with the 
Wallet Client's [`getSupportedExecutionPermissions`](../../reference/advanced-permissions/wallet-client.md#getsupportedexecutionpermissions) action.

<Tabs>
<TabItem value="response.ts">

```ts
{
  "native-token-stream": {
    "chainIds": [
      1,
      10,
    ],
    "ruleTypes": [
      "expiry"
    ]
  },
  // ...
}
```

</TabItem>
<TabItem value="example.ts" default>

```typescript
import { walletClient } from "./config.ts";

const supportedPermissions = await walletClient.getSupportedExecutionPermissions();
```

</TabItem>
<TabItem value="config.ts">

```ts
import { createWalletClient, custom } from "viem";;
import { erc7715ProviderActions } from "@metamask/smart-accounts-kit/actions";

export const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions());
```

</TabItem>
</Tabs>

See the full list of [supported Advanced Permissions](../../get-started/supported-advanced-permissions.md).
