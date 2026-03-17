---
description: How to resolve the InvalidDelegator error.
sidebar_label: Invalid delegator
keywords: [InvalidDelegator, error code, delegation, troubleshooting]
---

# Invalid delegator

The Delegation Manager reverts with `InvalidDelegator()` when the caller is not the delegator 
specified in the delegation. 

This error is thrown by the the `disableDelegation` and `enableDelegation` contract functions. Only the 
account that created the delegation can [disable](../guides/delegation/disable-delegation.md) 
or enable it.

## Solution

Verify that the transaction is sent from the delegator’s account. If the delegator is a smart account, submit an user operation through the smart account.

```typescript
import { DelegationManager } from "@metamask/smart-accounts-kit/contracts";

const disableCalldata = DelegationManager.encode.disableDelegation({
  // Signed delegation from delegatorSmartAccount.
  delegation: signedDelegation,
});

const userOpHash = await bundlerClient.sendUserOperation({
  account: delegatorSmartAccount,
  calls: [{ 
    to: delegatorSmartAccount.environment.DelegationManager, 
    data: disableCalldata,
  }],
});
```
