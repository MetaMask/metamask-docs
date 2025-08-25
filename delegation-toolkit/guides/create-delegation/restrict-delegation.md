---
description: Learn how to restrict a delegation using caveat enforcers, and the available caveat types.
sidebar_position: 1
toc_max_heading_level: 3
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Restrict a delegation

Use [caveat enforcers](../../concepts/caveat-enforcers.md) to apply specific rules and restrictions
to a delegation, ensuring that delegated executions are only performed under predefined circumstances.

A delegation has a `caveats` property, which is an array of `Caveat` objects.
Each caveat is specified as follows:

```typescript
export type Caveat = {
  enforcer: Hex; // The address of the caveat enforcer contract.
  terms: Hex;    // Data passed to the caveat enforcer, describing how the redemption should be validated.
  args: Hex;     // Data that may be specified by the redeemer when redeeming the delegation (only used in limited cases).
};
```

The MetaMask Delegation Toolkit provides a `CaveatBuilder` interface, which offers an intuitive way to define the `caveats` array.
Use the `CaveatBuilder` to easily ensure that your delegations grant only the necessary authority.

## Create the caveat builder

To create the caveat builder, call the [`createCaveatBuilder`](../../reference/api/delegation.md#createcaveatbuilder) function, passing an instance of `DeleGatorEnvironment`.
The environment can be accessed from the `MetaMaskSmartAccount`, as in this example:

```typescript
const environment = delegatorSmartAccount.environment;

const caveatBuilder = createCaveatBuilder(environment);
```

:::note
By default, the `CaveatBuilder` does not allow empty caveats. To allow the `CaveatBuilder` to build an empty caveats array, provide the following configuration:

```typescript
const caveatBuilder = createCaveatBuilder(environment, { allowEmptyCaveats: true });
```
:::

## Add caveats to the builder

Add caveats to the builder using the `addCaveat` method, specifying the [caveat type](../../reference/caveats.md) and its parameters. You can chain multiple calls to `addCaveat` as in the following example:

```typescript
const caveats = caveatBuilder
  // allowedTargets accepts an array of addresses.
  // This caveat restricts the caller to only use the delegation to interact with the specified address.
  .addCaveat("allowedTargets", ["0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92"]) 
  // allowedMethods accepts an array of methods.
  // This caveat restricts the caller to only use the delegation to invoke the specified methods.
  .addCaveat("allowedMethods", [
    "approve(address,uint256)",
    "transfer(address,uint256)"
  ])
  // limitedCalls accepts a number.
  // This caveat restricts the caller to only use the delegation once.
  .addCaveat("limitedCalls", 1)
  .build();
```

<details>
  <summary>Important considerations when using caveat enforcers</summary>
  <div>

  - Delegations without caveats are entirely permissive.
    It is crucial to add appropriate caveats to restrict the delegated authority sufficiently.
    Failing to do so could result in unintended access or actions.
  - Caveat enforcers safeguard the execution process but do not guarantee a final state post-redemption.
    Always combine caveat enforcers thoughtfully to create comprehensive protection.
  - When using multiple caveat enforcers that modify external contract states, the order matters.
    For example, if you include both [`NativeBalanceChangeEnforcer`](../../reference/caveats.md#nativebalancechange) to ensure a balance has increased and
    [`NativeTokenPaymentEnforcer`](../../reference/caveats.md#nativetokenpayment) to deduct from that balance,
    executing `NativeTokenPaymentEnforcer` first might cause `NativeBalanceChangeEnforcer` to fail validation.
    Consider the sequence of enforcers carefully when creating delegations with interdependent caveats.

  </div>
</details>

For convenience, you can also pass the `CaveatBuilder` directly to the various helper methods for creating a delegation. For example:

```typescript
const caveats = caveatBuilder
  // allowedTargets accepts an array of addresses.
  .addCaveat("allowedTargets", ["0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92"]) 
  // allowedMethods accepts an array of methods.
  .addCaveat("allowedMethods", [
    "approve(address,uint256)",
    "transfer(address,uint256)"
  ])
  // limitedCalls accepts a number.
  .addCaveat("limitedCalls", 1);

const delegation = createDelegation({
  to: delegate,
  from: delegator,
  caveats
});
```

For more granular or custom control, you can also [create custom caveat enforcers](create-custom-caveat-enforcer.md)
and add them to the caveat builder.
