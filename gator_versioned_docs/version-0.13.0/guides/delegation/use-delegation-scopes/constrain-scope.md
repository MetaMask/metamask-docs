---
description: Learn how to constrain a delegation scope using caveat enforcers.
sidebar_label: Constrain a scope
toc_max_heading_level: 3
keywords: [constrain, restrict, scope, caveat, caveat enforcer]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Constrain a delegation scope

[Delegation scopes](index.md) define the delegation's initial authority and help prevent delegation misuse.
You can further constrain these scopes and limit the delegation's authority by applying [caveat enforcers](../../../concepts/delegation/caveat-enforcers.md). 

## Prerequisites

[Configure a delegation scope](index.md)

## Apply a caveat enforcer

For example, Alice creates a delegation with an [ERC-20 transfer scope](spending-limit.md#erc-20-transfer-scope) that allows Bob to spend up to 10 USDC.
If Alice wants to further restrict the scope to limit Bob's delegation to be valid for only seven days,
she can apply the [`timestamp`](../../../reference/delegation/caveats.md#timestamp) caveat enforcer.

The following example creates a delegation using [`createDelegation`](../../../reference/delegation/index.md#createdelegation), applies the ERC-20 transfer scope with a spending limit of 10 USDC, and applies the `timestamp` caveat enforcer to restrict the delegation's validity to a seven-day period:

```typescript
import { createDelegation } from "@metamask/delegation-toolkit";

// Convert milliseconds to seconds.
const currentTime = Math.floor(Date.now() / 1000);

// Seven days after current time.
const beforeThreshold = currentTime + 604800;

const caveats = [{
  type: "timestamp",
  afterThreshold: currentTime,
  beforeThreshold, 
}];

const delegation = createDelegation({
  scope: {
    type: "erc20TransferAmount",
    tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
    maxAmount: 10000n,
  },
  // Apply caveats to the delegation.
  caveats,
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

## Next steps

- See the [caveats reference](../../../reference/delegation/caveats.md) for the full list of caveat types and their parameters.
- For more specific or custom control, you can also [create custom caveat enforcers](/tutorials/create-custom-caveat-enforcer)
and apply them to delegations.  
