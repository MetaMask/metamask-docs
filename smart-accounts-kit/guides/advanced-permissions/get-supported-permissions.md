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
<TabItem value="example.ts">

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
<TabItem value="Example response">

```JSON
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
</Tabs>

## Supported permissions table

The following table displays the Advanced Permissions types supported by the 
Smart Accounts Kit, [MetaMask Flask](/snaps/get-started/install-flask), and MetaMask production, and the minimum version required for each.

If you don't see the Advanced Permissions type you're looking for, you can request it by 
emailing [hellogators@consensys.net](mailto:hellogators@consensys.net).

| Permission type                                                                            | Smart Accounts Kit | MetaMask Flask | MetaMask |
| ------------------------------------------------------------------------------------------ | ------------------ | -------------- | -------- |
| [ERC-20 periodic](use-permissions/erc20-token.md#erc-20-periodic-permission)         | >= v0.1.0          | >= v13.5.0     | N/A        |
| [ERC-20 stream](use-permissions/erc20-token.md#erc-20-stream-permission)             | >= v0.1.0          | >= v13.5.0     | N/A        |
| [ERC-20 revocation](use-permissions/erc20-token.md#erc-20-revocation-permission)     | >= v0.3.0          | >= v13.14.0    | >= 13.18.1 |
| [Native token periodic](use-permissions/native-token.md#native-token-periodic-permission) | >= v0.1.0          | >= v13.5.0     | N/A        |
| [Native token stream](use-permissions/native-token.md#native-token-stream-permission)     | >= v0.1.0          | >= v13.5.0     | N/A        |
