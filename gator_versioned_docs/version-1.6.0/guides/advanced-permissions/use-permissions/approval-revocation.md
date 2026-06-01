---
description: Learn how to use the token approval revocation permission with Advanced Permissions (ERC-7715).
keywords: [permissions, revocation, approval, 7715, erc-7715, erc20, erc721, permit2]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Use approval revocation permission

[Advanced Permissions (ERC-7715)](../../../concepts/advanced-permissions.md) supports the token approval
revocation permission type that allows you to request permission to revoke existing token approvals
on behalf of the user.

## Prerequisites

- [Install and set up the Smart Accounts Kit.](../../../get-started/install.md)
- [Configure the Smart Accounts Kit.](../../configure-toolkit.md)
- [Create a session account.](../execute-on-metamask-users-behalf.md#3-set-up-a-session-account)

## Token approval revocation permission

This permission type enables revoking existing token approvals on behalf of the user.

For example, a user signs an ERC-7715 permission that lets a dapp revoke any ERC-20 token
allowances periodically, or during an ongoing exploit.

See the [token approval revocation permission API reference](../../../reference/advanced-permissions/permissions.md#token-approval-revocation-permission) for more information.

<Tabs>
<TabItem value="example.ts">

```typescript
import { sepolia as chain } from 'viem/chains'
import { walletClient } from './client.ts'

// Since current time is in seconds, convert milliseconds to seconds.
const currentTime = Math.floor(Date.now() / 1000)

// 30 days from now.
const expiry = currentTime + 60 * 60 * 24 * 30

const grantedPermissions = await walletClient.requestExecutionPermissions([
  {
    chainId: chain.id,
    expiry,
    // The requested permissions will be granted to the
    // session account.
    to: sessionAccount.address,
    permission: {
      type: 'token-approval-revocation',
      data: {
        erc20Approve: true,
        erc721Approve: false,
        erc721SetApprovalForAll: false,
        permit2Approve: true,
        permit2Lockdown: false,
        permit2InvalidateNonces: false,
        justification: 'Permission to revoke ERC-20 token approvals',
      },
      isAdjustmentAllowed: false,
    },
  },
])
```

</TabItem>
<TabItem value="client.ts">

```typescript
import { createWalletClient, custom } from 'viem'
import { erc7715ProviderActions } from '@metamask/smart-accounts-kit/actions'

export const walletClient = createWalletClient({
  transport: custom(window.ethereum),
}).extend(erc7715ProviderActions())
```

</TabItem>
</Tabs>
