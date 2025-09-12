---
description: Learn how to use the ownership transfer scope for a delegation.
---

# Use the ownership transfer scope
 
The ownership transfer scope restricts a delegation to ownership transfer calls only.
For example, Alice has deployed a smart contract, and she delegates to Bob the ability to transfer ownership of that contract.

Internally, this scope uses the [`ownershipTransfer`](../../../reference/delegation/caveats.md#ownershiptransfer) caveat enforcer.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../../get-started/install.md)
- [Configure the Delegation Toolkit.](../../configure.md)
- [Create a delegator account.](../execute-on-smart-accounts-behalf.md#3-create-a-delegator-account)
- [Create a delegate account.](../execute-on-smart-accounts-behalf.md#4-create-a-delegate-account)

## Ownership transfer scope

This scope requires a `contractAddress`, which represents the address of the deployed contract.

```typescript
import { createDelegation } from "@metamask/delegation-toolkit";

const contractAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"

const delegation = createDelegation({
  scope: {
    type: "ownershipTransfer",
    contractAddress,
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

## Next steps

See [how to further constrain the authority of a delegation](constrain-scope.md) using caveat enforcers.
