---
description: Learn about delegation, the delegation lifecycle, and the Delegation Framework.
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs"; 
import TabItem from "@theme/TabItem";

# Delegation

*Delegation* is the ability for a [MetaMask smart account](../smart-accounts.md) to grant permission to another smart account
or externally owned account (EOA) to perform specific executions on its behalf.
The account that grants the permission is called the *delegator account*, while the account that receives the permission
is called the *delegate account*.

The MetaMask Delegation Toolkit follows the [ERC-7710](https://eips.ethereum.org/EIPS/eip-7710) standard for smart contract delegation.
In addition, users can use [caveat enforcers](caveat-enforcers.md) to apply rules and restrictions to delegations.
For example: Alice delegates the ability to spend her USDC to Bob, limiting the amount to 100 USDC.

## Delegation lifecycle

The delegation lifecycle is as follows:

1. **Create a delegation** - The delegator account creates a delegation, applying *caveats* which specify conditions under which the delegation can be redeemed.
  The delegator signs the delegation.

3. **Store the delegation** - A dapp can store the delegation, enabling retrieval for future redemption.

4. **Redeem the delegation** - The delegate (the account being granted the permission) redeems the delegation via the Delegation Manager,
   which verifies that the delegated authority is valid in order to perform the execution.

See [how to perform executions on a smart account's behalf](../../guides/delegation/execute-on-smart-accounts-behalf.md) to get started with the delegation lifecycle.

## Delegation types

You can create the following delegation types:

- **Root delegation** - A root delegation is when a delegator delegates their own authority away, as opposed to *redelegating* permissions they received from a previous delegation.
  In a chain of delegations, the first delegation is the root delegation.
  For example, Alice delegates the ability to spend her USDC to Bob, limiting the amount to 100 USDC.

  Use [`createDelegation`](../../reference/api/delegation.md#createdelegation) to create a root delegation.

- **Open root delegation** - An open root delegation is a root delegation that doesn't specify a delegate.
  This means that any account can redeem the delegation.
  For example, Alice delegates the ability to spend 100 of her USDC to anyone.

  You must create open root delegations carefully, to ensure that they are not misused.
  Use [`createOpenDelegation`](../../reference/api/delegation.md#createopendelegation) to create an open root delegation.

- **Redelegation** - A delegate can redelegate permissions that have been granted to them, creating a chain of delegations across trusted parties.
  For example, Alice delegates the ability to spend 100 of her USDC to Bob.
  Bob redelegates the ability to spend 50 of Alice's 100 USDC to Carol.

  Use [`createDelegation`](../../reference/api/delegation.md#createdelegation) to create a redelegation.

- **Open redelegation** - An open redelegation is a redelegation that doesn't specify a delegate.
  This means that any account can redeem the redelegation.
  For example, Alice delegates the ability to spend 100 of her USDC to Bob.
  Bob redelegates the ability to spend 50 of Alice's 100 USDC to anyone.

  As with open root delegations, you must create open redelegations carefully, to ensure that they are not misused.
  Use [`createOpenDelegation`](../../reference/api/delegation.md#createopendelegation) to create an open redelegation.

## Delegation Framework

The MetaMask Delegation Toolkit includes the Delegation Framework, which is a
[set of comprehensively audited smart contracts](https://github.com/MetaMask/delegation-framework) that
collectively handle delegator account creation, the delegation lifecycle,
and caveat enforcement.
It consists of the following components:

- **Delegator Core** - Delegator Core contains the logic for the ERC-4337 compliant delegator accounts.
  It defines the interface needed for the Delegation Manager to invoke executions on behalf of the accounts.

- **Delegator account implementations** - Delegator accounts are smart accounts, and there are [multiple smart account implementations](../smart-accounts.md#smart-account-implementation-types),
  with differing signature schemes used to manage the underlying account.

- **Delegation Manager** - The Delegation Manager validates delegations and triggers executions
  on behalf of the delegator, ensuring tasks are executed accurately and securely.

  When you redeem a delegation using [`redeemDelegations`](../../reference/api/delegation.md#redeemdelegations), the Delegation Manager performs the following steps.
  It processes a single step for all redemptions before proceeding to the next one:
  
  1. Validates the input data by ensuring the lengths of `delegations`, `modes`, and
     `executions` match.
  2. Decodes and validates the delegation, checking that the caller is the delegate
     and that there are no empty signatures.
  3. Verifies delegation signatures, ensuring validity using ECDSA (for EOAs) or
     `isValidSignature` (for contracts).
  4. Validates the delegation chain's authority and ensures delegations are not disabled.
  5. Executes the `beforeHook` for each [caveat](caveat-enforcers.md) in the delegation, passing relevant data (`terms`,
     `arguments`, `mode`, `execution` `calldata`, and `delegationHash`) to the caveat enforcer.
  6. Calls `executeFromExecutor` to perform the delegation's execution, either by the delegator or
     the caller for self-authorized executions.
  7. Executes the `afterHook` for each caveat, similar to the `beforeHook`, passing required data
     to enforce post-execution conditions.
  8. Emits `RedeemedDelegation` events for each delegation that was successfully redeemed.

- **Caveat enforcers** - [Caveat enforcers](caveat-enforcers.md) manage rules and restrictions for delegations,
  providing fine-tuned control over delegated executions.

## Delegation flow

This diagram shows how a delegation is created and redeemed with the Delegation Manager.
The Delegation Manager is responsible for validating the signature of the delegation and the caveat enforcers.
If everything is correct, it allows a delegate to execute an action on behalf of the delegator.

Learn more about the caveat enforcer hooks in the [Caveat enforcers](caveat-enforcers.md) section.

```mermaid
%%{
  init: {
    'sequence': {
      'actorMargin': 30,
      'width': 250
    }
  }
}%%

sequenceDiagram
    participant Delegator
    participant Delegate
    participant Manager as Delegation Manager
    participant Enforcer as Caveat enforcer

    Delegator->>Delegator: Create delegation with caveat enforcers
    Delegator->>Delegator: Sign delegation
    Delegator->>Delegate: Send signed delegation
    Note right of Delegate: Hold delegation until redemption

    Delegate->>Manager: redeemDelegations() with delegation & execution details
    Manager->>Delegator: isValidSignature()
    Delegator-->>Manager: Confirm valid (or not)

    Manager->>Enforcer: beforeAllHook()
    Note right of Manager: Expect no error
    Manager->>Enforcer: beforeHook()
    Note right of Manager: Expect no error

    Manager->>Delegator: executeFromExecutor() with execution details
    Delegator->>Delegator: Perform execution
    Note right of Manager: Expect no error

    Manager->>Enforcer: afterHook()
    Note right of Manager: Expect no error
    Manager->>Enforcer: afterAllHook()
    Note right of Manager: Expect no error
```

## Execution modes

When redeeming a delegation using [`redeemDelegations`](../../reference/api/delegation.md#redeemdelegations), you must pass an execution mode for each delegation chain you pass to the method.
The Delegation Toolkit supports the following execution modes, based on [ERC-7579](https://erc7579.com/):

| Execution mode | Number of delegation chains passed to `redeemDelegations` | Processing method | Does user operation continue execution if redemption reverts? |
|--|--|--|--|
| `SingleDefault` | One      | Sequential  | No  |
| `SingleTry`     | One      | Sequential  | Yes |
| `BatchDefault`  | Multiple | Interleaved | No  |
| `BatchTry`      | Multiple | Interleaved | Yes |

### Sequential processing

In `SINGLE` modes, processing is sequential:

1. For each delegation in the chain, all caveats' `before` hooks are called.
2. The single redeemed action is executed.
3. For each delegation in the chain, all caveats' `after` hooks are called.

### Interleaved processing

In `BATCH` modes, processing is interleaved:

1. For each chain in the batch, and each delegation in the chain, all caveats' `before` hooks are called.
2. Each redeemed action is executed.
3. For each chain in the batch, and each delegation in the chain, all caveats' `after` hooks are called.

`BATCH` mode allows for powerful use cases, but the Delegation Framework currently does not include any `BATCH` compatible caveat enforcers.
