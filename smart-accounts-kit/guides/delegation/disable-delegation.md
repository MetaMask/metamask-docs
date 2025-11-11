---
description: Learn how to disable the delegation.
sidebar_label: Disable a delegation
toc_max_heading_level: 3
keywords: [delegation, disable, revoke]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Disable a delegation

Delegations are created off-chain and can be stored anywhere, but you can disable a delegation on-chain using the
toolkit. When a delegation is disabled, any attempt to redeem it will revert, effectively revoking the permissions 
that were previously granted.

For example, if Alice has given permission to Bob to spend 10 USDC on her behalf, and after a week she wants to 
revoke that permission, Alice can disable the delegation she created for Bob. If Bob tries to redeem the disabled 
delegation, the transaction will revert, preventing him from spending Alice's USDC.

## Prerequisites

- [Install and set up the Smart Accounts Kit.](../../get-started/install.md)
- [Create a delegator account.](execute-on-smart-accounts-behalf.md#3-create-a-delegator-account)
- [Create a delegate account.](execute-on-smart-accounts-behalf.md#4-create-a-delegate-account)


## Disable a delegation

To disable a delegation, you can use the [`disableDelegation`](../../reference/delegation/index.md#disabledelegation) utility function from the 
toolkit to generate calldata. Once the calldata is prepared, you can send it to the
Delegation Manager to disable the delegation. 

<Tabs>
<TabItem value="example.ts">

```typescript
import { DelegationManager } from '@metamask/smart-accounts-kit/contracts';
import { environment, delegation, bundlerClient } from "./config.ts";

const disableDelegationData = DelegationManager.encode.disableDelegation({
  delegation,
});

// Appropriate fee per gas must be determined for the specific bundler being used.
const maxFeePerGas = 1n;
const maxPriorityFeePerGas = 1n;

const userOperationHash = await bundlerClient.sendUserOperation({
  account: delegatorAccount,
  calls: [
    {
      to: environment.DelegationManager,
      data: disableDelegationData
    }
  ],
  maxFeePerGas,
  maxPriorityFeePerGas
});
```

</TabItem>
<TabItem value="config.ts">

```typescript
import { sepolia as chain } from 'viem/chains'
import { createPublicClient, http, parseEther } from 'viem'
import { createBundlerClient } from 'viem/account-abstraction'
import { getSmartAccountsEnvironment, createDelegation } from '@metamask/smart-accounts-kit'

export const environment = getSmartAccountsEnvironment(chain.id)

const currentTime = Math.floor(Date.now() / 1000)

export const delegation = createDelegation({
  scope: {
    type: 'nativeTokenPeriodTransfer',
    periodAmount: parseEther('0.01'),
    periodDuration: 86400,
    startDate: currentTime,
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
})

const publicClient = createPublicClient({
  chain,
  transport: http()
})

export const bundlerClient = createBundlerClient({
  client: publicClient,
  transport: http('https://api.pimlico.io/v2/11155111/rpc?apikey=<YOUR-API-KEY>')
});
```

</TabItem>
</Tabs>