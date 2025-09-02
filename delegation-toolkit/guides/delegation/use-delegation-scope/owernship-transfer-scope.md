---
description: Learn how to use the ownership transfer scope for a delegation
sidebar_position: 3
sidebar_label: Ownership transfer scope
---

# Ownership transfer scope
 
Ownership Transfer Scope restricts a delegation to ownership transfer calls only. For example, if Alice has deployed a 
smart contract, she can delegate to Bob the ability to transfer ownership of that contract.

The scope internally uses the [`ownershipTransfer`](../../../reference/caveats#ownershiptransfer) caveat enfrocer.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../get-started/install)
- [Configure the Delegation Toolkit](../../configure).
- [Create a MetaMask smart account](../execute-on-smart-accounts-behalf#3-create-a-delegator-account) to create delegations.
- [Create a delegate account](../execute-on-smart-accounts-behalf#4-create-a-delegate-account)

## Use ownership transfer scope

The scope requires a `contractAddress`, which represents address of the deployed contract.

```typescript
import { createDelegation } from "@metamask/delegatino-toolkit";

const contractAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"

const delegation = createDelegation({
  scope: {
    type: "ownershipTransfer",
    contractAddress,
  },
  to: delegateaAccount,
  from: delegatorAccount,
});
```

## Next steps

- See [Restrict a delegation](../restrict-delegation) to learn how to further limit the authority of a delegation.