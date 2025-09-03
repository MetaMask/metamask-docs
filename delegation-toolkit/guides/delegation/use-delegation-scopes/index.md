---
description: Learn how to use the delegation scopes.
---

# Use delegation scopes

When [creating a delegation](../execute-on-smart-accounts-behalf.md), you can configure a scope to define the delegation's initial authority and help prevent delegation misuse.
You can further refine this initial authority by [adding caveats to a delegation](refine-scope.md).

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../../get-started/install.md)
- [Configure the Delegation Toolkit.](../../configure.md)
- [Create a delegator account.](../execute-on-smart-accounts-behalf.md#3-create-a-delegator-account)
- [Create a delegate account.](../execute-on-smart-accounts-behalf.md#4-create-a-delegate-account)

## Use a delegation scope

The Delegation Toolkit currently supports three categories of scopes:

- [Spending limit scopes](../../../reference/delegation-scopes.md#spending-limit-scopes) - Restricts the spending of native, ERC-20, and ERC-721 tokens based on defined conditions.
- [Function call scope](../../../reference/delegation-scopes.md#function-call-scope) - Restricts the delegation to specific contract methods, contract addresses, or calldata.
- [Ownership transfer scope](../../../reference/delegation-scopes.md#ownership-transfer-scope) - Restricts the delegation to only allow ownership transfers, specifically the `transferOwnership` function for a specified contract.

When creating a delegation using the toolkit's [`createDelegation`](../../../reference/api/delegation.md#createdelegation) function, specify the delegation scope and its parameters using the `scope` property.

The following example specifies the [ERC-20 periodic scope](../../../reference/delegation-scopes.md#erc-20-periodic-scope), which ensures that ERC-20 token transfers remain within a predefined limit during a specified time window.
At the start of each new period, the transfer allowance resets.

The delegator (Alice) creates a delegation that allows the delegate (Bob) to spend 1 ERC-20 token on her behalf each day:

```typescript
import { createDelegation } from "@metamask/delegation-toolkit";

const delegation = createDelegation({
  scope: {
    type: "erc20PeriodTransfer",
    tokenAddress: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da", // Address of the ERC-20 token
    periodAmount: 1000000000000000000n, // 1 ERC-20 token - 18 decimals, in wei
    periodDuration: 86400, // 1 day in seconds
    startDate: 1743763600, // April 4, 2025 at 00:00:00 UTC
  },
  to: delegateAccount,
  from: delegatorAccount,
});
```

See the [delegation scopes reference](../../../reference/delegation-scopes.md) for a full list of supported scopes and example parameters.

## Next steps

See [how to further refine the authority of a delegation](refine-scope.md) using caveat enforcers.
