---
description: Learn about caveat enforcers and how they restrict delegations.
keywords: [caveats, caveat enforcers, delegation]
---

# Caveat enforcers

The MetaMask Delegation Toolkit provides *caveat enforcers*, which are smart contracts that implement rules and restrictions (*caveats*) on delegations.
They serve as the underlying mechanism that enables conditional execution within the [Delegation Framework](./index.md#delegation-framework).

A caveat enforcer acts as a gate that validates whether a delegation can be used for a particular execution. When a delegate attempts to execute an action on behalf of a delegator, each caveat enforcer specified in the delegation evaluates whether the execution meets its defined criteria.

:::warning Important
- Without caveat enforcers, a delegation has infinite and unbounded authority to make any execution the original account can make.
  We strongly recommend using caveat enforcers.
- Caveat enforcers safeguard the execution process but do not guarantee a final state post-redemption.
  Always consider the full impact of combined caveat enforcers.
:::

## Smart contract interface

Caveat enforcers are Solidity contracts that implement the [`ICaveatEnforcer`](https://github.com/MetaMask/delegation-framework/blob/main/src/interfaces/ICaveatEnforcer.sol) interface:

```solidity
// SPDX-License-Identifier: MIT AND Apache-2.0
pragma solidity 0.8.23;

import { ModeCode } from "../utils/Types.sol";

/**
 * This is an abstract contract that exposes pre and post Execution hooks during delegation redemption.
 */
interface ICaveatEnforcer {
  /**
   * Enforces conditions before any actions in a batch redemption process begin.
   */
  function beforeAllHook(
    bytes calldata _terms, // The terms to enforce set by the delegator.
    bytes calldata _args, // An optional input parameter set by the redeemer at time of invocation.
    ModeCode _mode, // The mode of execution for the executionCalldata.
    bytes calldata _executionCalldata, // The data representing the execution.
    bytes32 _delegationHash, // The hash of the delegation.
    address _delegator, // The address of the delegator.
    address _redeemer // The address that is redeeming the delegation.
)
    external;

  /**
   * Enforces conditions before the execution tied to a specific delegation in the redemption process.
   */
  function beforeHook(
    bytes calldata _terms,
    bytes calldata _args,
    ModeCode _mode,
    bytes calldata _executionCalldata,
    bytes32 _delegationHash,
    address _delegator,
    address _redeemer
  )
    external;

  /**
   * Enforces conditions after the execution tied to a specific delegation in the redemption process.
   */
  function afterHook(
    bytes calldata _terms,
    bytes calldata _args,
    ModeCode _mode,
    bytes calldata _executionCalldata,
    bytes32 _delegationHash,
    address _delegator,
    address _redeemer
  )
    external;

  /**
   * Enforces conditions after all actions in a batch redemption process have been executed.
   */
  function afterAllHook(
    bytes calldata _terms,
    bytes calldata _args,
    ModeCode _mode,
    bytes calldata _executionCalldata,
    bytes32 _delegationHash,
    address _delegator,
    address _redeemer
  )
    external;
}
```

The interface consists of four key hook functions that are called at different stages of the delegation redemption process:

1. **`beforeAllHook`**: Called before any actions in a batch redemption process begin. This can be used to verify conditions that must be true for the entire batch execution.

2. **`beforeHook`**: Called before the execution tied to a specific delegation. This allows for pre-execution validation of conditions specific to that delegation.

3. **`afterHook`**: Called after the execution tied to a specific delegation completes. This can verify post-execution state changes or effects specific to that delegation.

4. **`afterAllHook`**: Called after all actions in a batch redemption process have completed. This enables verification of final conditions after the entire batch has executed.

Each of these hooks receives comprehensive information about the execution context, including:
- The caveat terms specified by the delegator.
- Optional arguments provided by the redeemer.
- The execution mode and calldata.
- The delegation hash.
- The delegator and redeemer addresses.

### Caveat enforcer rejection

The most important safety feature of these hooks is their ability to block executions:

- If any hook determines its conditions aren't met, it will **revert** (throw an exception).
- When a reversion occurs, the entire delegation redemption process is canceled.
- This prevents partial or invalid executions from occurring.
- No state changes from the attempted execution will be committed to the blockchain.

This "all-or-nothing" approach ensures that delegations only execute exactly as intended by their caveats.

## Caveat builder

While caveat enforcers operate at the smart contract level, most developers interact with them through the `CaveatBuilder` interface in the MetaMask Delegation Toolkit.

The `CaveatBuilder` provides a developer-friendly TypeScript API that:

- Abstracts away the complexity of correctly formatting and encoding caveat terms.
- Provides type-checking and validation for caveat parameters.
- Handles the creation of the `caveats` array needed when creating a delegation.

Each [caveat type](../../reference/delegation/caveats.md) in the `CaveatBuilder`
corresponds to a specific caveat enforcer contract. For example, when you use:

```typescript
caveatBuilder.addCaveat("allowedTargets", ["0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92"]);
```

The builder is creating a caveat that references the
[`AllowedTargetsEnforcer`](../../reference/delegation/caveats.md#allowedtargets) contract address and
properly encodes the provided addresses as terms for that enforcer.

## Caveat enforcer best practices

When designing delegations with caveats, consider these best practices:

- **Combine caveat enforcers appropriately** - Use multiple caveat enforcers to create comprehensive restrictions.
   
- **Consider caveat enforcer order** - When using caveat enforcers that modify external contract states, the order matters.
  For example, using [`NativeTokenPaymentEnforcer`](../../reference/delegation/caveats.md#nativetokenpayment) before
  [`NativeBalanceChangeEnforcer`](../../reference/delegation/caveats.md#nativebalancechange) might cause validation failures.

- **Be careful with unbounded delegations** - Always include appropriate caveat enforcers to limit what a delegate can do.

## Available caveat enforcers

The Delegation Toolkit provides [out-of-the-box caveat enforcers](../../reference/delegation/caveats.md)
for common restriction patterns, including:

- Limiting target addresses and methods.
- Setting time or block number constraints.
- Restricting token transfers and approvals.
- Limiting execution frequency.

For other restriction patterns, you can also [create custom caveat enforcers](/tutorials/create-custom-caveat-enforcer) by implementing the `ICaveatEnforcer` interface.

## Attenuating authority with redelegations

When creating chains of delegations via [redelegations](./index.md#delegation-types), it's important to understand how authority flows and can be restricted.

Caveats applied to a chain of delegations are *accumulative*—they stack on top of each other:

- Each delegation in the chain inherits all restrictions from its parent delegation.
- New caveats can add further restrictions, but can't remove existing ones.

This means that a delegate can only redelegate with equal or lesser authority than they received.

### Example: Narrowing permissions

Imagine a simple financial delegation scenario:

1. **Alice delegates to Bob**, allowing him to withdraw up to 100 USDC on her behalf.
2. **Bob re-delegates to Carol**, but limits the permission to:
   - Only 50 USDC (reducing the amount).
   - Only before the end of the week (adding a time constraint).

Carol now has a more restricted version of Alice's original delegation. Bob couldn't give Carol more authority than he had (such as allowing her to withdraw 200 USDC), but he could narrow the permission.
