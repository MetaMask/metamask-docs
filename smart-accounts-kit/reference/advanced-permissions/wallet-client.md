---
description: Wallet Client actions reference.
sidebar_label: Wallet Client actions
toc_max_heading_level: 2
keywords: [ERC-7715, Viem, wallet client, actions, reference, advanced permissions]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Wallet Client actions reference

The following actions are related to the [Viem Wallet Client](https://viem.sh/docs/clients/wallet) used to [execute on a MetaMask user's behalf](../../guides/advanced-permissions/execute-on-metamask-users-behalf.md).

## `requestExecutionPermissions`

Requests Advanced Permissions from the MetaMask extension account according to the [ERC-7715](https://eips.ethereum.org/EIPS/eip-7715) specifications.

:::info
To use `requestExecutionPermissions`, the Viem Wallet Client must be extended with `erc7715ProviderActions`.
:::

### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `chainId` | `number` | Yes | The chain ID on which the permission is being requested. |
| `from` | `Address` | No | Address of the wallet to which the permission is being requested. |
| `expiry` | `number` | Yes | The timestamp (in seconds) by which the permission must expire. |
| `permission` | `SupportedPermissionParams` | Yes | The permission to be requested. The toolkit supports multiple [Advanced Permissions types](permissions.md). |
| `to` | `Address` | Yes | The account to which the permission will be assigned. |
| `isAdjustmentAllowed` | `boolean` | Yes | Defines whether the user is allowed to modify the requested permission. |

### Example

<Tabs>
<TabItem value ="example.ts">

```ts
import { sepolia as chain } from "viem/chains";
import { parseUnits } from "viem";
import { walletClient } from "./client.ts";

const currentTime = Math.floor(Date.now() / 1000);
const expiry = currentTime + 604800;

const grantedPermissions = await walletClient.requestExecutionPermissions([{
  chainId: chain.id,
  expiry,
  // The requested permissions will granted to the
  // session account.
  to: sessionAccount.address,
  permission: {
    type: "erc20-token-periodic",
    data: {
      tokenAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
      periodAmount: parseUnits("10", 6),
      periodDuration: 86400,
      justification: "Permission to transfer 10 USDC every day",
    },
  },
  isAdjustmentAllowed: true,
}]);
```

</TabItem>
<TabItem value ="client.ts">

```ts
import { createWalletClient, custom } from "viem";
import { erc7715ProviderActions } from "@metamask/smart-accounts-kit/actions";

export const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions());
```

</TabItem>
</Tabs>