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

:::info
To use Advanced Permissions (ERC-7715) actions, the Viem Wallet Client must be extended with `erc7715ProviderActions`.
:::

## `requestExecutionPermissions`

Requests Advanced Permissions from the MetaMask extension account according to the [ERC-7715](https://eips.ethereum.org/EIPS/eip-7715) specification. Returns a [`RequestExecutionPermissionsReturnType`](../types.md#requestexecutionpermissionsreturntype).

### Parameters

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `chainId` | `number` | Yes | The chain ID on which the permission is being requested. |
| `from` | `Address` | No | The wallet address to request the permission from. |
| `expiry` | `number` | Yes | The timestamp (in seconds) by which the permission must expire. |
| `permission` | `SupportedPermissionParams` | Yes | The permission to request. The toolkit supports multiple [Advanced Permissions types](permissions.md). Set `isAdjustmentAllowed` to define whether the user can modify the requested permission. |
| `to` | `Address` | Yes | The account to which the permission will be assigned. |

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
  // The requested permissions will be granted to the
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
    isAdjustmentAllowed: true,
  },
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

## `getSupportedExecutionPermissions`

Returns the Advanced Permissions types that the wallet supports, according to the
[ERC-7715](https://eips.ethereum.org/EIPS/eip-7715) 
specification. Use this to verify the available permission types and supported
chains before requesting permissions.

This action takes no parameters and returns a [`GetSupportedExecutionPermissionsResult`](../types.md#getsupportedexecutionpermissionsresult).

### Example

<Tabs defaultValue="example.ts">
<TabItem value="response.ts">

```ts
{
  "native-token-stream": {
    "chainIds": [1, 10],
    "ruleTypes": ["expiry"]
  },
  "erc20-token-periodic": {
    "chainIds": [1, 137],
    "ruleTypes": ["expiry"]
  },
// ...
}
```

</TabItem>
<TabItem value="example.ts">

```ts
import { walletClient } from "./client.ts";

const supportedPermissions = await walletClient.getSupportedExecutionPermissions();
```

</TabItem>
<TabItem value="client.ts">

```ts
import { createWalletClient, custom } from "viem";
import { erc7715ProviderActions } from "@metamask/smart-accounts-kit/actions";

export const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions());
```

</TabItem>
</Tabs>

## `getGrantedExecutionPermissions`

Returns all previously granted permissions for the connected wallet, according to the
[ERC-7715](https://eips.ethereum.org/EIPS/eip-7715) specification.

This action takes no parameters and returns a [`GetGrantedExecutionPermissionsResult`](../types.md#getgrantedexecutionpermissionsresult).

### Example

<Tabs defaultValue="example.ts">
<TabItem value="response.ts">

```ts
[
  {
    chainId: 84532,
    context: "0x0000...0000",
    delegationManager: "0xdb9B...7dB3",
    dependencies: [],
    from: "0x993f...7f31",
    permission: {
      type: "erc20-token-periodic",
      isAdjustmentAllowed: false,
      data: { ... },
    },
    rules: [
      { type: "expiry", data: { ... } },
    ],
    to: "0xAB57...7F1f",
  },
// ...
]
```

</TabItem>

<TabItem value="example.ts">

```ts
import { walletClient } from "./client.ts";

const grantedPermissions = await walletClient.getGrantedExecutionPermissions();
```

</TabItem>
<TabItem value="client.ts">

```ts
import { createWalletClient, custom } from "viem";
import { erc7715ProviderActions } from "@metamask/smart-accounts-kit/actions";

export const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions());
```

</TabItem>
</Tabs>
