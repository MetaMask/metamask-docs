---
description: How to resolve the InvalidDelegator error.
sidebar_label: Invalid delegator
toc_max_heading_level: 2
keywords: [InvalidDelegator, error code, delegation, troubleshooting]
---

import GlossaryTerm from '@theme/GlossaryTerm';

# Invalid delegator

The <GlossaryTerm term="Delegation Manager" /> reverts with `InvalidDelegator()` when the caller is not the <GlossaryTerm term="Delegator account">delegator</GlossaryTerm>
specified in the delegation.

This error is thrown by the `disableDelegation` and `enableDelegation` contract functions. Only the
account that created the delegation can [disable](../guides/delegation/disable-delegation.md)
or enable it.

## Solution

Verify that you're sending the transaction from the delegator's account. If the delegator is a smart account, submit a <GlossaryTerm term="User operation">user operation</GlossaryTerm> through the smart account.

```typescript
import { DelegationManager } from '@metamask/smart-accounts-kit/contracts'

// Generate calldata to disable the delegation.
const disableCalldata = DelegationManager.encode.disableDelegation({
  delegation: signedDelegation, // Signed by delegatorSmartAccount
})

const userOpHash = await bundlerClient.sendUserOperation({
  account: delegatorSmartAccount,
  calls: [
    {
      to: delegatorSmartAccount.environment.DelegationManager,
      data: disableCalldata,
    },
  ],
})
```
