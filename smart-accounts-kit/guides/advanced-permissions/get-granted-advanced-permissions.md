---
description: Learn how to get the granted Advanced Permissions for a wallet.
sidebar_label: Get granted permisisons
keywords: [advanced permissions, granted execution permissions, erc-7715, 7715]
---

import Tabs from "@theme/Tabs"; 
import TabItem from "@theme/TabItem";

# Get granted permissions

[ERC-7715](https://eip.tools/eip/7715) defines an RPC method that returns the granted execution permissions
for a wallet. Use the method to get the granted Advanced Permissions for a wallet. 


## Prerequisites

- [Install and set up the Smart Accounts Kit](../../get-started/install.md)
- [Learn about Advanced Permissions](../../concepts/advanced-permissions.md)


## Request granted permissions

Request the granted Advanced Permissions for a wallet with the 
Wallet Client's `getGrantedExecutionPermissions` action.

<Tabs>
<TabItem value="example.ts">

```typescript
import { walletClient } from "./config.ts";

const grantedExecutionPermissions = await walletClient.getGrantedExecutionPermissions();

// Example response:
// [
//   {
//     chainId: "0x14a34",
//     context: "0x0000...0000",
//     delegationManager: "0xdb9B1e94B5b69Df7e401DDbedE43491141047dB3",
//     dependencies: [],
//     from: "0x993fC0d346A8AfA40Da014bA8834A56cE8B17f31",
//     permission: {
//       type: "erc20-token-periodic",
//       isAdjustmentAllowed: false,
//       data: { ... },
//     },
//     rules: [
//       { type: "expiry", data: { ... } },
//     ],
//     to: "0xAB57cfCDaF510594eA68D47ffBEF04Ebf73e7F1f",
//   },
//   // ...
// ]
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