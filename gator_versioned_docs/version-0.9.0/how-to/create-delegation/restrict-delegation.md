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

To create the caveat builder, call the `createCaveatBuilder()` function, passing an instance of `DeleGatorEnvironment`.
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

Add caveats to the builder using the `addCaveat` method, specifying the [caveat type](#caveat-types) and its parameters. You can chain multiple calls to `addCaveat` as in the following example:

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
  // This caveat restricts the caller to only use the delegation one time.
  .addCaveat("limitedCalls", 1)
  .build();
```

<details>
<summary><b>Important considerations when using caveat enforcers</b></summary>
<p>

- Delegations without caveats are entirely permissive.
  It is crucial to add appropriate caveats to restrict the delegated authority sufficiently.
  Failing to do so could result in unintended access or actions.
- Caveat enforcers safeguard the execution process but do not guarantee a final state post-redemption.
  Always combine caveat enforcers thoughtfully to create comprehensive protection.
- When using multiple caveat enforcers that modify external contract states, the order matters.
  For example, if you include both [`NativeBalanceGteEnforcer`](#nativebalancegte) to ensure a balance has increased and
  [`NativeTokenPaymentEnforcer`](#nativetokenpayment) to deduct from that balance,
  executing `NativeTokenPaymentEnforcer` first might cause `NativeBalanceGteEnforcer` to fail validation.
  Consider the sequence of enforcers carefully when creating delegations with interdependent caveats.

</p>
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

## Caveat types

The `CaveatBuilder` supports various caveat types, each serving a specific purpose.
These caveat types correspond to the out-of-the-box caveat enforcers
that the MetaMask Delegation Toolkit provides.

Fore more granular or custom control, you can also [create custom caveat enforcers](create-custom-caveat-enforcer.md)
and add them to the caveat builder.

### `allowedCalldata`

Limits the calldata that is executed.

You can use this caveat to enforce function parameters.
We strongly recommend using this caveat to validate static types and not dynamic types.
You can validate dynamic types through a series of `allowedCalldata` terms, but this is tedious and error-prone.

**Caveat enforcer contract:** [`AllowedCalldataEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/AllowedCalldataEnforcer.sol)

#### Parameters

1. Index in the calldata byte array (including the 4-byte method selector) where the expected calldata starts
2. Expected calldata as a hex string

#### Example

```typescript
caveatBuilder.addCaveat("allowedCalldata",
  4,
  encodeAbiParameters([
    { type: "string" },
    { type: "uint256" }
  ], [
    "Hello Gator",
    12345n
  ])
);
```

:::note
This example uses Viem's [`encodeAbiParameters`](https://viem.sh/docs/abi/encodeAbiParameters) utility to encode the parameters as ABI-encoded hex strings.
:::

### `allowedMethods`

Limits what methods the delegate can call.

**Caveat enforcer contract:** [`AllowedMethodsEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/AllowedMethodsEnforcer.sol)

#### Parameters

1. An array of methods as 4-byte hex strings, ABI function signatures, or `ABIFunction` objects

#### Example

```typescript
caveatBuilder.addCaveat("allowedMethods", [
  "0xa9059cbb",
  "transfer(address,uint256)",
  {
    name: 'transfer',
    type: 'function',
    inputs: [
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  }
]);
```

:::note
This example adds the `transfer` function to the allowed methods in three different ways - as the 4-byte function selector, the ABI function signature, and the `ABIFunction` object.
:::

### `allowedTargets`

Limits what addresses the delegate can call.

**Caveat enforcer contract:** [`AllowedTargetsEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/AllowedTargetsEnforcer.sol)

#### Parameters

1. An array of addresses as hex strings

#### Example

```typescript
caveatBuilder.addCaveat("allowedTargets", [
  "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  "0xB2880E3862f1024cAC05E66095148C0a9251718b"
]);
```

### `argsEqualityCheck`

Ensures that the `args` provided when redeeming the delegation are equal to the terms specified on the caveat.

**Caveat enforcer contract:** [`ArgsEqualityCheckEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ArgsEqualityCheckEnforcer.sol)

#### Parameters

1. The expected `args` as a hex string

#### Example

```typescript
caveatBuilder.addCaveat("argsEqualityCheck",
  "0xf2bef872456302645b7c0bb59dcd96ffe6d4a844f311ebf95e7cf439c9393de2"
);
```

### `blockNumber`

Specifies a range of blocks through which the delegation will be valid.

**Caveat enforcer contract:** [`BlockNumberEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/BlockNumberEnforcer.sol)

#### Parameters

1. After threshold block number as a `bigint`
2. Before threshold block number as a `bigint`

You can specify `0n` to indicate that there is no limitation on a threshold.

#### Example

```typescript
caveatBuilder.addCaveat("blocknumber",
  19426587n,
  0n
);
```

### `deployed`

Ensures a contract is deployed, and if not, deploys the contract.

**Caveat enforcer contract:** [`DeployedEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/DeployedEnforcer.sol)

#### Parameters

1. A contract address as a hex string
2. The salt to use with the contract, as a hex string
3. The bytecode of the contract as a hex string

#### Example

```typescript
caveatBuilder.addCaveat("deployed",
  "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  "0x0e3e8e2381fde0e8515ed47ec9caec8ba2bc12603bc2b36133fa3e3fa4d88587",
  "0x..." // The deploy bytecode for the contract at 0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92
);
```

### `erc1155BalanceGte`

Ensures the ERC-1155 balance of a specified address has increased by at least a specified amount after the execution has been performed, regardless of what the execution is.

**Caveat enforcer contract:** [`ERC1155BalanceGteEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ERC1155BalanceGteEnforcer.sol)

#### Parameters

1. An ERC-1155 contract address as a hex string
2. The recipient's address as a hex string
3. The ID of the ERC-1155 token as a bigint
4. The amount by which the balance must have increased as a bigint

#### Example

```typescript
caveatBuilder.addCaveat("erc1155BalanceGte",
  "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  "0x3fF528De37cd95b67845C1c55303e7685c72F319",
  1n,
  1_000_000n
);
```

### `erc20BalanceGte`

Ensures the delegator's ERC-20 balance increases by at least the specified amount after execution, regardless of the execution.

**Caveat enforcer contract:** [`ERC20BalanceGteEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ERC20BalanceGteEnforcer.sol)

#### Parameters

1. An ERC-20 contract address as a hex string
2. Amount as a `bigint`

#### Example

```typescript
caveatBuilder.addCaveat("erc20BalanceGte",
  "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  1_000_000n
);
```

### `erc20PeriodTransfer`

Ensures that ERC-20 token transfers remain within a predefined limit during a 
specified time window. At the start of each new period, the allowed transfer
amount resets. Any unused transfer allowance from the previous period does not
carry over and is forfeited.

**Caveat enforcer contract:** [`ERC20PeriodTransferEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ERC20PeriodTransferEnforcer.sol)

#### Parameters

1. The address of the ERC-20 token contract.
2. The maximum amount of tokens that can be transferred per period, in wei.
3. The duration of each period in seconds.
4. The timestamp when the first period begins.

#### Example

```typescript
caveatBuilder.addCaveat("erc20PeriodTransfer",
  "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da", // Address of the ERC-20 token
  1000000000000000000n, // 1 ERC-20 token - 18 decimals, in wei
  86400, // 1 day in seconds
  1743763600, // April 4th, 2025, at 00:00:00 UTC
);
```

### `erc20Streaming`

Enforces a linear streaming transfer limit for ERC-20 tokens. Block token access until the specified start timestamp. At the start timestamp, immediately release the specified initial amount. Afterward, accrue tokens linearly at the specified rate, up to the specified maximum.

**Caveat enforcer contract:** [`ERC20StreamingEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ERC20StreamingEnforcer.sol)

#### Parameters

1. An ERC-20 contract address as a hex string
2. Initial amount available at start time as a `bigint`
3. Maximum total amount that can be unlocked as a `bigint`
4. Rate at which tokens accrue per second as a `bigint`
5. Start timestamp as a number

#### Example

```typescript
caveatBuilder.addCaveat("erc20Streaming",
  "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  1_000_000n,
  10_000_000n,
  100n,
  1703980800
);
```

### `erc20TransferAmount`

Limits the transfer of ERC-20 tokens.

**Caveat enforcer contract:** [`ERC20TransferAmountEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ERC20TransferAmountEnforcer.sol)

#### Parameters

1. An ERC-20 contract address as a hex string
2. Amount as a `bigint`

#### Example

```typescript
caveatBuilder.addCaveat("erc20TransferAmount",
  "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  1_000_000n
);
```

### `erc721BalanceGte`

Ensures the ERC-721 balance of the specified recipient address increases by at least the specified amount after execution, regardless of execution type.

**Caveat enforcer contract:** [`ERC721BalanceGteEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ERC721BalanceGteEnforcer.sol)

#### Parameters

1. An ERC-721 contract address as a hex string
2. The recipient's address as a hex string
3. The amount by which the balance must have increased as a `bigint`

#### Example

```typescript
caveatBuilder.addCaveat("erc721BalanceGte",
  "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  "0x3fF528De37cd95b67845C1c55303e7685c72F319",
  1_000_000n
);
```

### `erc721Transfer`

Restricts the execution to only allow ERC-721 token transfers, specifically the `transferFrom(from, to, tokenId)` function, for a specified token ID and contract.

**Caveat enforcer contract:** [`ERC721TransferEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ERC721TransferEnforcer.sol)

#### Parameters

1. The permitted ERC-721 contract address as a hex string
2. The permitted ID of the ERC-721 token as a `bigint`

#### Example

```typescript
caveatBuilder.addCaveat("erc721Transfer",
  "0x3fF528De37cd95b67845C1c55303e7685c72F319",
  1n
);
```

### `exactCalldata`

Verifies that the transaction calldata matches the expected calldata. For batch transactions,
see [`exactCalldataBatch`](#exactcalldatabatch).

**Caveat enforcer contract:** [`ExactCalldataEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ExactCalldataEnforcer.sol)

#### Parameters

1. A hex value for calldata. 

#### Example

```typescript
caveatBuilder.addCaveat("exactCalldata", 
  "0x1234567890abcdef" // Calldata to be matched
);
```

### `exactCalldataBatch`

Verifies that the provided batch execution calldata matches
the expected calldata for each individual execution in the batch.

**Caveat enforcer contract:** [`ExactCalldataBatchEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ExactCalldataBatchEnforcer.sol)

#### Parameters

1. Array of expected `ExecutionStruct`, each containing target address, value, and calldata.

#### Example

```typescript
const executions = [
  {
    target: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
    value: 1000000000000000000n, // 1 ETH
    callData: "0x",
  },
  {
    target: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
    value: 0n,
    callData: "0x",
  },
];

caveatBuilder.addCaveat("exactCalldataBatch",
  executions
);
```

### `exactExecution`

Verifies that the provided execution matches the expected execution. For batch transactions,
see [`exactExecutionBatch`](#exactexecutionbatch).

**Caveat enforcer contract:** [`ExactExecutionEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ExactExecutionEnforcer.sol)

#### Parameters

1. `ExecutionStruct` to be expected.

#### Example

```typescript
caveatBuilder.addCaveat("exactExecution", {
  target: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
  value: 1000000000000000000n, // 1 ETH
  callData: "0x",
})
```

### `exactExecutionBatch`

Verifies that each execution in the batch matches the expected
execution parameters - including target, value, and calldata.

**Caveat enforcer contract:** [`ExactExecutionBatchEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ExactExecutionBatchEnforcer.sol)

#### Parameters

1. Array of expected `ExecutionStruct`, each containing target address, value, and calldata.

#### Example

```typescript
const executions = [
  {
    target: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
    value: 1000000000000000000n, // 1 ETH
    callData: "0x",
  },
  {
    target: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
    value: 0n,
    callData: "0x",
  },
];

caveatBuilder.addCaveat("exactExecutionBatch",
  executions
);
```

### `id`

Specifies an ID for multiple delegations. Once one of them is redeemed, the other delegations with the same ID are revoked.

**Caveat enforcer contract:** [`IdEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/IdEnforcer.sol)

#### Parameters

1. An ID as a number

#### Example

```typescript
caveatBuilder.addCaveat("id",
  123456
);
```

### `limitedCalls`

Limits the number of times the delegate can perform executions on the delegator's behalf.

**Caveat enforcer contract:** [`LimitedCallsEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/LimitedCallsEnforcer.sol)

#### Parameters

1. A count as a number

#### Example

```typescript
caveatBuilder.addCaveat("limitedCalls",
  1
);
```

### `nativeBalanceGte`

Ensures that the recipient's native token balance has increased by at least the specified amount.

**Caveat enforcer contract:** [`NativeBalanceGteEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/NativeBalanceGteEnforcer.sol)

#### Parameters

1. The recipient's address as a hex string
2. The amount by which the balance must have increased as a `bigint`

#### Example

```typescript
caveatBuilder.addCaveat("nativeBalanceGte",
  "0x3fF528De37cd95b67845C1c55303e7685c72F319",
    1_000_000n
);
```

### `nativeTokenPayment`

Enforces payment in native token (for example, ETH) for the right to use the delegation.
A permissions context allowing payment must be provided as the `args` when
redeeming the delegation.

**Caveat enforcer contract:** [`NativeTokenPaymentEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/NativeTokenPaymentEnforcer.sol)

#### Parameters

1. The recipient's address as a hex string
2. The amount that must be paid as a `bigint`

#### Example

```typescript
caveatBuilder.addCaveat("nativeTokenPayment",
  "0x3fF528De37cd95b67845C1c55303e7685c72F319",
    1_000_000n
);
```

### `nativeTokenPeriodTransfer`

Ensures that native token transfers remain within a predefined limit during a 
specified time window. At the start of each new period, the allowed transfer
amount resets. Any unused transfer allowance from the previous period does not
carry over and is forfeited.

**Caveat enforcer contract:** [`NativeTokenPeriodTransferEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/NativeTokenPeriodTransferEnforcer.sol)

#### Parameters

1. The maximum amount of tokens that can be transferred per period, in wei.
2. The duration of each period in seconds.
3. The timestamp when the first period begins.

#### Example

```typescript
caveatBuilder.addCaveat("nativeTokenPeriodTransfer",
  1000000000000000000n, // 1 ETH in wei
  86400, // 1 day in seconds
  1743763600, // April 4th, 2025, at 00:00:00 UTC
)
```

### `nativeTokenStreaming`

Enforces a linear streaming limit for native tokens (for example, ETH). Nothing is available before the specified start timestamp. At the start timestamp, the specified initial amount becomes immediately available. After that, tokens accrue linearly at the specified rate, capped by the specified maximum.

**Caveat enforcer contract:** [`NativeTokenStreamingEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/NativeTokenStreamingEnforcer.sol)

#### Parameters

1. Initial amount available at start time as a `bigint`
2. Maximum total amount that can be unlocked as a `bigint`
3. Rate at which tokens accrue per second as a `bigint`
4. Start timestamp as a number

#### Example

```typescript
caveatBuilder.addCaveat("nativeTokenStreaming",
  1_000_000n,
  10_000_000n,
  100n,
  1703980800
);
```

### `nativeTokenTransferAmount`

Enforces an allowance of native currency (for example, ETH).

**Caveat enforcer contract:** [`NativeTokenTransferAmountEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/NativeTokenTransferAmountEnforcer.sol)

#### Parameters

1. The allowance as a `bigint`

#### Example

```typescript
caveatBuilder.addCaveat("nativeTokenTransferAmount",
  1_000_000n
);
```

### `nonce`

Adds a nonce to a delegation, and revokes previous delegations by incrementing the current nonce by calling `incrementNonce(address _delegationManager)`.

**Caveat enforcer contract:** [`NonceEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/NonceEnforcer.sol)

#### Parameters

1. A nonce as a hex string

#### Example

```typescript
caveatBuilder.addCaveat("nonce",
  "0x1"
);
```

### `ownershipTransfer`

Restricts the execution to only allow ownership transfers, specifically the `transferOwnership(address _newOwner)` function, for a specified contract.

**Caveat enforcer contract:** [`OwnershipTransferEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/OwnershipTransferEnforcer.sol)

#### Parameters

1. The target contract address as a hex string

#### Example

```typescript
caveatBuilder.addCaveat("ownershipTransfer",
  "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92"
);
```

### `redeemer`

Limits the addresses that can redeem the delegation.
This caveat is designed for restricting smart contracts or EOAs lacking delegation support,
and can be placed anywhere in the delegation chain to restrict the redeemer.

:::note
Delegator accounts with delegation functionalities can bypass these restrictions by delegating to
other addresses.
For example, Alice makes Bob the redeemer.
This condition is enforced, but if Bob is a delegator he can create a separate delegation to Carol
that allows her to redeem Alice's delegation through Bob.
:::

**Caveat enforcer contract:** [`RedeemerEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/RedeemerEnforcer.sol)

#### Parameters

1. An array of addresses as hex strings

#### Example

```typescript
caveatBuilder.addCaveat("redeemer",
  [
    "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
    "0x6be97c23596ECed7170fdFb28e8dA1Ca5cdc54C5"
  ]
);
```

### `specificActionERC20TransferBatch`

Ensures validation of a batch consisting of exactly two transactions:
1. The first transaction must call a specific target contract with predefined calldata.
2. The second transaction must be an ERC-20 token transfer that matches specified
parameters—including the ERC-20 token contract address, amount, and recipient.

**Caveat enforcer contract:** [`SpecificActionERC20TransferBatchEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/SpecificActionERC20TransferBatchEnforcer.sol)

#### Parameters

1. The address of the ERC-20 token contract.
2. The address that will receive the tokens.
3. The amount of tokens to transfer, in wei.
4. The target address for the first transaction.
5. The calldata for the first transaction.

#### Example

```typescript
caveatBuilder.addCaveat("specificActionERC20TransferBatch",
  "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da" // Address of ERC-20 token contract
  "0x027aeAFF3E5C33c4018FDD302c20a1B83aDCD96C", // Address that will receive the tokens
  1000000000000000000n, // 1 ERC-20 token - 18 decimals, in wei
  "0xb49830091403f1Aa990859832767B39c25a8006B", // Target address for first transaction
  "0x1234567890abcdef" // Calldata to be matched for first transaction
)
```

### `timestamp`

Specifies a range of timestamps through which the delegation will be valid.

**Caveat enforcer contract:** [`TimestampEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/TimestampEnforcer.sol)

#### Parameters

1. After threshold timestamp as a number
2. Before threshold timestamp as a number

You can specify `0` to indicate that there is no limitation on a threshold.

#### Example

```typescript
caveatBuilder.addCaveat("timestamp",
   499165200,
  1445412480
);
```

### `valueLte`

Limits the value of native tokens that the delegate can spend.

**Caveat enforcer contract:** [`ValueLteEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ValueLteEnforcer.sol)

#### Parameters

1. A value as a `bigint`

#### Example

```typescript
caveatBuilder.addCaveat("valueLte",
  1_000_000_000_000_000_000n // 1 ETH in wei
);
```
