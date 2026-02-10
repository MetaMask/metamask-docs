---
description: Learn how to get supported execution permissions for a wallet.
sidebar_label: Get supported permisisons
keywords: [advanced permissions, supported execution permissions, erc-7715, 7715]
---

import Tabs from "@theme/Tabs"; 
import TabItem from "@theme/TabItem";

# Get supported permissions

[ERC-7715](https://eip.tools/eip/7715) defines an RPC method that returns the execution permissions
a wallet supports. Use the method to verify the available permission types and rules before sending requests.


## Prerequisites

- [Install and set up the Smart Accounts Kit](../../get-started/install.md)
- [Learn about Advanced Permissions](../../concepts/advanced-permissions.md)


## Request supported permissions

Request the supported execution permission types for a wallet with the 
Wallet Client's `getSupportedExecutionPermissions` action.

<Tabs>
<TabItem value="example.ts">

```typescript
import { walletClient } from "./config.ts";

const supportedPermissions = await walletClient.getSupportedExecutionPermissions();

// Example response:
// {
//     "native-token-stream": {
//         "chainIds": [
//             "0x1",
//             "0xa",
//         ],
//         "ruleTypes": [
//             "expiry"
//         ]
//     },
//     // ...
// }
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