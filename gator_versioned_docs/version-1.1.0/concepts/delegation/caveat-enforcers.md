---
description: Learn about caveat enforcers and how they restrict delegations.
keywords: [caveats, caveat enforcers, delegation]
---

# Caveat enforcers

The Smart Accounts Kit provides caveat enforcers, which are smart contracts that implement rules and restrictions
on delegations. They serve as the underlying mechanism that enables conditional execution within the [Delegation Framework](./overview.md#delegation-framework).
See the [delegation flow](overview.md#delegation-flow) for how caveat enforcer hooks are called during delegation redemption.

A caveat enforcer acts as a gate that validates whether a delegation can be used for a particular execution. 
When a delegate attempts to execute an action on behalf of a delegator, each caveat enforcer specified in 
the delegation evaluates whether the execution meets its defined criteria.

:::warning Important
- Without caveat enforcers, a delegation has infinite and unbounded authority to make any execution the original account can make.
  We strongly recommend using caveat enforcers.
- Caveat enforcers safeguard the execution process but do not guarantee a final state post-redemption.
  Always consider the full impact of combined caveat enforcers.
:::

## Hooks

The interface consists of four key hook functions that are called at different stages of the delegation redemption process.
Each of these hooks receives comprehensive information about the execution context, including:
- The caveat terms specified by the delegator.
- Optional arguments provided by the redeemer.
- The execution mode and calldata.
- The delegation hash.
- The delegator and redeemer addresses.

| Hook | Description |
|---|---|
| `beforeAllHook` | Called before any actions in a batch redemption process begin. Verifies conditions that must be true for the entire batch execution. |
| `beforeHook` | Called before the execution tied to a specific delegation. Allows for pre-execution validation of conditions specific to that delegation. |
| `afterHook` | Called after the execution tied to a specific delegation completes. Verifies post-execution state changes or effects specific to that delegation. |
| `afterAllHook` | Called after all actions in a batch redemption process have completed. Verifies final conditions after the entire batch has executed. |

The most important safety feature of these hooks is their ability to block executions:
- If any hook determines its conditions aren't met, it will **revert** (throw an exception).
- When a reversion occurs, the entire delegation redemption process is canceled.
- This prevents partial or invalid executions from occurring.
- No state changes from the attempted execution will be committed to the blockchain.

This "all-or-nothing" approach ensures that delegations only execute exactly as intended by their caveats.

## Available caveat enforcers

The Smart Accounts Kit provides [out-of-the-box caveat enforcers](../../reference/delegation/caveats.md)
for common restriction patterns, including:

- Limiting target addresses and methods.
- Setting time or block number constraints.
- Restricting token transfers and approvals.
- Limiting execution frequency.

For other restriction patterns, you can also [create custom caveat enforcers](/tutorials/create-custom-caveat-enforcer) by implementing the `ICaveatEnforcer` interface.
