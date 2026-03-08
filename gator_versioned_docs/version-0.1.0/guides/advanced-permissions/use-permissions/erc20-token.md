---
description: Learn how to use the ERC-20 token permissions with Advanced Permissions (ERC-7715).
keywords: [permissions, spending limit, restrict, 7715, erc-7715, erc20-permissions]
---

import Tabs from "@theme/Tabs"; 
import TabItem from "@theme/TabItem";

# Use ERC-20 token permissions
 
[Advanced Permissions (ERC-7715)](../../../concepts/advanced-permissions.md) supports ERC-20 token permission types that allow you to request fine-grained
permissions for ERC-20 token transfers with time-based (periodic) or streaming conditions, depending on your use case.

## Prerequisites

- [Install and set up the Smart Accounts Kit](../../../get-started/install.md)
- [Configure the Smart Accounts Kit](../../configure-toolkit.md)
- [Create a session account](../execute-on-metamask-users-behalf.md#3-set-up-a-session-account)

## ERC-20 periodic permission

This permission type ensures a per-period limit for ERC-20 token transfers. At the start of each new period, the allowance resets.

For example, a user signs an ERC-7715 permission that lets a dapp spend up to 10 USDC on their behalf each day. The dapp can transfer a total of
10 USDC per day; the limit resets at the beginning of the next day.

See the [ERC-20 periodic permission API reference](../../../reference/advanced-permissions/permissions.md#erc-20-periodic-permission) for more information.

<Tabs>
<TabItem value="example.ts">

```typescript
import { sepolia as chain } from "viem/chains";
import { parseUnits } from "viem";
import { walletClient } from "./client.ts"

// Since current time is in seconds, convert milliseconds to seconds.
const currentTime = Math.floor(Date.now() / 1000);
// 1 week from now.
const expiry = currentTime + 604800;

// USDC address on Ethereum Sepolia.
const tokenAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const grantedPermissions = await walletClient.requestExecutionPermissions([{
  chainId: chain.id,
  expiry,
  signer: {
    type: "account",
    data: {
      // Session account created as a prerequisite.
      //
      // The requested permissions will granted to the
      // session account.
      address: sessionAccountAddress,
    },
  },
  permission: {
    type: "erc20-token-periodic",
    data: {
      tokenAddress,
      // 10 USDC in WEI format. Since USDC has 6 decimals, 10 * 10^6.
      periodAmount: parseUnits("10", 6),
      // 1 day in seconds.
      periodDuration: 86400,
      justification?: "Permission to transfer 1 USDC every day",
    },
  },
  isAdjustmentAllowed: true,
}]);
```

</TabItem>
<TabItem value="client.ts">

```typescript
import { createWalletClient, custom } from "viem";
import { erc7715ProviderActions } from "@metamask/smart-accounts-kit/actions";

export const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions());
```

</TabItem>
</Tabs>

## ERC-20 stream permission

This permission type ensures a linear streaming transfer limit for ERC-20 tokens. Token transfers are blocked until the 
defined start timestamp. At the start, a specified initial amount is released, after which tokens accrue linearly at the
configured rate, up to the maximum allowed amount.

For example, a user signs an ERC-7715 permission that allows a dapp to spend 0.1 USDC per second, starting with an initial amount
of 1 USDC, up to a maximum of 2 USDC.

See the [ERC-20 stream permission API reference](../../../reference/advanced-permissions/permissions.md#erc-20-stream-permission) for more information.

<Tabs>
<TabItem value="example.ts">

```typescript
import { sepolia as chain } from "viem/chains";
import { parseUnits } from "viem";
import { walletClient } from "./client.ts"

// Since current time is in seconds, convert milliseconds to seconds.
const currentTime = Math.floor(Date.now() / 1000);
// 1 week from now.
const expiry = currentTime + 604800;

// USDC address on Ethereum Sepolia.
const tokenAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238";

const grantedPermissions = await walletClient.requestExecutionPermissions([{
  chainId: chain.id,
  expiry,
  signer: {
    type: "account",
    data: {
      // Session account created as a prerequisite.
      //
      // The requested permissions will granted to the
      // session account.
      address: sessionAccountAddress,
    },
  },
  permission: {
    type: "erc20-token-stream",
    data: {
      tokenAddress,
      // 0.1 USDC in WEI format. Since USDC has 6 decimals, 0.1 * 10^6.
      amountPerSecond: parseUnits("0.1", 6),
      // 1 USDC in WEI format. Since USDC has 6 decimals, 1 * 10^6.
      initialAmount: parseUnits("1", 6),
      // 2 USDC in WEI format. Since USDC has 6 decimals, 2 * 10^6.
      maxAmount: parseUnits("2", 6),
      startTime: currentTime,
      justification: "Permission to use 0.1 USDC per second",
    },
  },
  isAdjustmentAllowed: true,
}]);
```

</TabItem>
<TabItem value="client.ts">

```typescript
import { createWalletClient, custom } from "viem";
import { erc7715ProviderActions } from "@metamask/smart-accounts-kit/actions";

export const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions());
```

</TabItem>
</Tabs>