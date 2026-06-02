---
description: How to resolve allowance exceeded errors when redeeming delegations.
sidebar_label: Allowance exceeded
toc_max_heading_level: 2
keywords:
  [allowance, allowance exceeded, erc20 transfer amount exceeded, spending limit, troubleshooting]
---

# Allowance exceeded

Spending limit [caveat enforcers](../concepts/delegation/caveat-enforcers.md) revert with an
`allowance-exceeded` error in the following cases.

## Spending limit exceeded

The delegation's spending limit has been fully or partially used up by previous redemptions.
Enforcers track cumulative spending on-chain using the delegation hash as a key, and revert when
the next transfer exceeds the allowed limit.

### Solution

Use the [`CaveatEnforcerClient`](../reference/delegation/caveat-enforcer-client.md) to check the
available amount before redeeming the delegation.

If the available amount is insufficient, you must wait for the next period (for periodic
enforcers) or for more tokens to accrue (for streaming enforcers). For fixed-limit enforcers,
create a new delegation with a higher limit.

## Delegation hash collision

If you create a new delegation with the same parameters as a previous delegation, both produce
the same delegation hash.

Enforcers track spent amounts using the delegation hash as a key. When two delegations share the
same hash, they also share the same spent balance. This means the new delegation can immediately
revert with `allowance-exceeded`, even if you haven't redeemed it before.

### Solution

Use a unique `salt` when creating the delegation. This produces a different delegation hash,
giving the new delegation a fresh spending allowance.

```typescript
import { createDelegation, ScopeType } from '@metamask/smart-accounts-kit'
import { parseUnits } from 'viem'

const delegation = createDelegation({
  scope: {
    type: ScopeType.Erc20TransferAmount,
    tokenAddress: '0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92',
    // USDC has 6 decimal places.
    maxAmount: parseUnits('10', 6),
  },
  salt: '0x00131412',
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
})
```
