---
description: How to resolve the InvalidDelegate error when redeeming delegations.
sidebar_label: Invalid delegate
keywords: [InvalidDelegate, error code, delegation, troubleshooting]
---

# Invalid delegate

The Delegation Manager reverts with `InvalidDelegate()` in the following two cases.


## Account is not the delegate

The account redeeming the delegation is not the delegate specified in the delegation. The Delegation Manager checks that `msg.sender` matches the `delegate` field of the delegation, unless it's an [open delegation](../reference/delegation/index.md#createopendelegation).

### Solution 

Ensure the account redeeming the delegation is the same address specified as the `to` field when the delegation was created. If you are using a smart account as the delegate, the user operation must be sent from that smart account.

## Broken redelegation chain

When validating a redelegation chain, each child delegation's `delegator` must match the parent delegation's `delegate`. If a delegation in the chain was created by an account that was not the delegate of the next delegation in the chain, the authority is invalid.

### Solution

Verify that the redelegation chain is consistent. For each pair of adjacent delegations, the child's `delegator` must be the parent's `delegate`.

This error can also occur if the delegations are not passed in the correct order. The delegation array order should be from leaf to root. 

For example, if the delegation chain is Alice to Bob to Carol. The order should be following

```ts
const rootDelegation = createDelegation({
  from: "0xAlice", 
  to: "0xBob", 
  //.. 
})
  
const leafDelegation = createDelegation({
  from: "OxBob",
  to: "0xCarol",
  parentDelegation: rootDelegation,
  // ...
})

const data = DelegationManager.encode.redeemDelegations({
  // Make sure the order is from leaf to root. 
  // Passing them in the wrong order causes the authority validation to fail.
  delegations: [[ leafDelegation, rootDelegation ]],
  modes: [ ExecutionMode.SingleDefault ],
  executions: [[ execution ]],
});
```  
