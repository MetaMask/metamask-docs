---
description: Learn how to constrain a delegation scope using caveat enforcers.
sidebar_label: Constrain a scope
toc_max_heading_level: 3
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Constrain a delegation scope

[Delegation scopes](./index.md) helps you define the delegation's initial authority and help prevent delegation misuse. You can further
constrain these scopes, and limit the delegation's authority by applying [caveat enfrocers](../../concepts/delegation/caveat-enforcers.md). 

For example, Alice creates a delegation with an ERC-20 transfer scope that allows Bob to spend up to 10 USDC. If Alice 
wants to further restrict the authority, so that Bob can only spend a maximum of 10 USDC and use the delegation only 
once, she can apply the [`limitedCalls`](../../../reference/caveats#limitedcalls) caveat enforcer. This caveat enforces a one time use of the delegation, adding an 
additional layer of constraint beyond the initial authority.

Apply [caveat enforcers](../../concepts/delegation/caveat-enforcers.md) to a delegation to refine the initial authority defined by its [delegation scope](index.md).
Caveat enforcers ensure delegated executions are only performed under specific, predefined circumstances.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../../get-started/install.md)
- [Configure the Delegation Toolkit.](../../configure.md)
- [Create a delegator account.](../execute-on-smart-accounts-behalf.md#3-create-a-delegator-account)
- [Create a delegate account.](../execute-on-smart-accounts-behalf.md#4-create-a-delegate-account)
- [Configure a delegation scope.](../use-delegation-scopes/index.md)

## Apply a caveat enforcer

In this example, you'll build on Alice's use case described above. Use the [`limitedCall`](../../../reference/caveats#limitedcalls) caveat enforcer to 
limit the scope of the delegation. 

See [caveat enforcers references](../../../reference/caveats.md) for details on each type.

```typescript
import { createDelegation } from "@metamask/delegation-toolkit";

// Constrains the delegation to one time use.
const caveats = [{
  type: "limitedCalls",
  limit: 1,
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

- For more specific or custom control, you can also [create custom caveat enforcers](/tutorials/create-custom-caveat-enforcer)
and apply them to delegations.  
