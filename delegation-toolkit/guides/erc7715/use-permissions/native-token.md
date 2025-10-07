---
description: Learn how to use the native token permissions with ERC-7715.
keywords: [permissions, spending limit, restrict, 7715, erc-7715, native-token-permissions]
---

import Tabs from "@theme/Tabs"; 
import TabItem from "@theme/TabItem";

# Use native token permissions
 
[ERC-7715](https://eips.ethereum.org/EIPS/eip-7715) supports native token permission types that allow you to request fine-grained
permissions for native token transfers with time-based (periodic) or streaming conditions, depending on your use case.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../../get-started/install.md)
- [Configure the Delegation Toolkit.](../../configure-toolkit.md)
- [Create a session account.](../execute-on-metamask-user-behalf.md#3-set-up-a-session-account)

## Native token periodic permission

This permission type ensures a per-period limit for native token transfers. At the start of each new period, the allowance resets.

For example, a user signs an ERC-7715 permission that lets a dapp spend up to 0.001 ETH on their behalf each day. The dapp can transfer a total of
0.001 USDC per day; the limit resets at the beginning of the next day.

<Tabs>
<TabItem value="example.ts">

```typescript
import { sepolia as chain } from "viem/chains";
import { parseEther } from "viem";
import { walletClient } from "./client.ts"

// Since current time is in seconds, convert milliseconds to seconds.
const currentTime = Math.floor(Date.now() / 1000);
// 1 week from now.
const expiry = currentTime + 604800;

const grantedPermissions = await walletClient.requestExecutionPermissions([{
  chainId: chain.id,
  expiry,
  signer: {
    type: "account",
    data: {
      // Session account created as a prerequisite.
      address: sessionAccountAddress,
    },
  },
  permission: {
    type: "native-token-periodic",
    data: {
      // 0.001 ETH in wei format.
      periodAmount: parseEther("0.001"),
      // 1 hour in seconds.
      periodDuration: 86400,
      startTime: currentTime,
      justification: "Permission to use 0.001 ETH every day",
    },
  },
}]);
```

</TabItem>
<TabItem value="client.ts">

```typescript
import { createWalletClient, custom } from "viem";
import { erc7715ProviderActions } from "@metamask/delegation-toolkit/experimental";

export const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions());
```

</TabItem>
</Tabs>

## Native token stream permission

This permission type ensures a linear streaming transfer limit for native tokens. Token transfers are blocked until the 
defined start timestamp. At the start, a specified initial amount is released, after which tokens accrue linearly at the
configured rate, up to the maximum allowed amount.

For example, a user signs an ERC-7715 permission that allows a dapp to spend 0.0001 ETH per second, starting with an initial amount
of 0.1 ETH, up to a maximum of 1 ETH.

<Tabs>
<TabItem value="example.ts">

```typescript
import { sepolia as chain } from "viem/chains";
import { parseEther } from "viem";
import { walletClient } from "./client.ts"

// Since current time is in seconds, convert milliseconds to seconds.
const currentTime = Math.floor(Date.now() / 1000);
// 1 week from now.
const expiry = currentTime + 604800;

const grantedPermissions = await walletClient.requestExecutionPermissions([{
  chainId: chain.id,
  expiry,
  signer: {
    type: "account",
    data: {
      // Session account created as a prerequisite.
      address: sessionAccountAddress,
    },
  },
   permission: {
      type: "native-token-stream",
      data: {
        // 0.0001 ETH in wei format.
        amountPerSecond: parseEther("0.0001"),
        // 0.1 ETH in wei format.
        initialAmount: parseEther("0.1"),
        // 1 ETH in wei format.
        maxAmount: parseEther("1"),
        // 1 hour in seconds.
        duration: 3600,
        startTime: currentTime,
        justification: "Permission to use 0.0001 ETH per second",
      },
    },
}]);
```

</TabItem>
<TabItem value="client.ts">

```typescript
import { createWalletClient, custom } from "viem";
import { erc7715ProviderActions } from "@metamask/delegation-toolkit/experimental";

export const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions());
```

</TabItem>
</Tabs>