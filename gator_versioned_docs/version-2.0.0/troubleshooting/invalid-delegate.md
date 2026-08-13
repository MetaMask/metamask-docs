---
description: How to resolve the InvalidDelegate error when redeeming delegations.
sidebar_label: Invalid delegate
toc_max_heading_level: 2
keywords: [InvalidDelegate, error code, delegation, troubleshooting]
---

import GlossaryTerm from '@theme/GlossaryTerm';

# Invalid delegate

The <GlossaryTerm term="Delegation Manager" /> reverts with `InvalidDelegate()` in the following two cases.

## Account is not the delegate

The account redeeming the delegation is not the <GlossaryTerm term="Delegate account">delegate</GlossaryTerm> specified in the delegation.
The Delegation Manager checks that `msg.sender` matches the `delegate` field of
the delegation, unless it's an [open delegation](../reference/delegation/index.md#createopendelegation).

### Solution

Verify that the account redeeming the delegation matches the address in the
delegation's `to` field. If the delegate is a smart account, send the <GlossaryTerm term="User operation">user operation</GlossaryTerm>
from that smart account.

## Broken redelegation chain

When Delegation Manager validates a [redelegation chain](../guides/delegation/create-redelegation.md), each child delegation's <GlossaryTerm term="Delegator account">`delegator`</GlossaryTerm>
must match the parent delegation's <GlossaryTerm term="Delegate account">`delegate`</GlossaryTerm>. If any link in the chain fails this check, the
authority is invalid.

### Solution

Verify that the redelegation chain is consistent. For each pair of adjacent
delegations, the child's `delegator` must be the parent's `delegate`.

This error can also occur if the delegations are not passed in the correct order. The
delegation array order should be from leaf to root.

For example, if the delegation chain is Alice to Bob to Carol, the order should be following:

```ts
const rootDelegation = createDelegation({
  from: '0xAlice',
  to: '0xBob',
  //..
})

const leafDelegation = createDelegation({
  from: 'OxBob',
  to: '0xCarol',
  parentDelegation: rootDelegation,
  // ...
})

const data = DelegationManager.encode.redeemDelegations({
  // Make sure the order is from leaf to root.
  // Passing them in the wrong order causes the authority validation to fail.
  delegations: [[leafDelegation, rootDelegation]],
  modes: [ExecutionMode.SingleDefault],
  executions: [[execution]],
})
```
