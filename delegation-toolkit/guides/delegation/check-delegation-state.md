---
description: Learn how to check the delegation state.
sidebar_label: Check the delegation state
toc_max_heading_level: 3
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Check the delegation state

When using [spending limit delegation scopes](./use-delegation-scopes/spending-limit.md) or relevant [caveat enforcers](../../reference/caveats.md), there 
may be scenarios where you need to check the remaining amount available for transfer. You can use `CaveatEnforcerClient` to check the available balances for specific scopes or caveats.

In this guide, you will learn how to check the remaining transferable amount in a delegation. For example, if a 
delegation allows a user to spend 10 USDC per week and they have already spent 10 - n USDC in the current period, you 
can determine how much of the allowance is still available for transfer.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../get-started/install.md)
- [Configure the Delegation Toolkit.](../../configure.md)
- [Create a delegator account.](execute-on-smart-accounts-behalf.md#3-create-a-delegator-account)
- [Create a delegate account.](execute-on-smart-accounts-behalf.mdexecute-on-smart-accounts-behalf.md#4-create-a-delegate-account)
- [Create a delegation with ERC-20 periodic scope.](./use-delegation-scopes/spending-limit.md#erc-20-periodic-scope)

## Create a CaveatEnfocerClient

To check the delegation states, create a `CaveatEnforcerClient`. This client allows you to interact with the caveat enforcers contract used while creating a delegation and read the required state.

<Tabs>
<TabItem value="example.ts">

```typescript
import { environment, publicClient as client } from './config.ts'
import { createCaveatEnforcerClient } from '@metamask/delegation-toolkit'

const caveatEnforcerClient = createCaveatEnforcerClient({
  environment,
  client,
})
```

</TabItem>
<TabItem value="config.ts">

```typescript
import { sepolia as chain } from 'viem/chains'
import { createPublicClient, http } from 'viem'
import { getDeleGatorEnvironment } from '@metamask/delegation-toolkit'

export const environment = getDeleGatorEnvironment(chain.id)

export const publicClient = createPublicClient({
  chain,
  transport: http(),
})
```

</TabItem>
</Tabs>

## Read the caveat enforcer state

This example uses the `getErc20PeriodTransferEnforcerAvailableAmount` method to read the state and retrieve the remaining amount for the current transfer period. 

<Tabs>
<TabItem value="example.ts">

```typescript
import { delegation } './config.ts'

// Returns the available amount for current period. 
const { availableAmount } = await caveatEnforcerClient.getErc20PeriodTransferEnforcerAvailableAmount({
  delegation,
})
```

</TabItem>
<TabItem value="config.ts">

```typescript
import { createDelegation } from '@metamask/delegation-toolkit'

export const delegation = createDelegation({
  scope: {
    type: 'erc20PeriodTransfer',
    tokenAddress: '0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da',
    periodAmount: 1000000000000000000n,
    periodDuration: 86400,
    startDate: 1743763600,
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
})
```

</TabItem>
</Tabs>