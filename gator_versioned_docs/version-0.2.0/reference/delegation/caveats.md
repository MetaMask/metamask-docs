---
description: Caveat enforcers reference.
sidebar_label: Caveats
toc_max_heading_level: 2
keywords: [caveats, caveat enforcers, configuration, smart contracts, reference]
---

# Caveats reference

When [constraining a delegation scope](../../guides/delegation/use-delegation-scopes/constrain-scope.md), you can specify the following caveat types.

## `allowedCalldata`

Limits the calldata that is executed.

You can use this caveat to enforce function parameters.
We strongly recommend using this caveat to validate static types and not dynamic types.
You can validate dynamic types through a series of `allowedCalldata` terms, but this is tedious and error-prone.

Caveat enforcer contract: [`AllowedCalldataEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/AllowedCalldataEnforcer.sol)

### Parameters

| Name         | Type     | Required | Description                                                                                                          |
| ------------ | -------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `startIndex` | `number` | Yes      | The index in the calldata byte array (including the 4-byte method selector) where the expected calldata starts.  |
| `value`      | `Hex`    | Yes      | The expected calldata that must match at the specified index.                                                      |

### Example

```typescript
const value = encodeAbiParameters(
  [
    { type: "string" },
    { type: "uint256" }
  ], 
  [
    "Hello Gator",
    12345n
  ]
);

const caveats = [{
  type: "allowedCalldata",
  startIndex: 4,
  value,
}];
```

:::note
This example uses Viem's [`encodeAbiParameters`](https://viem.sh/docs/abi/encodeAbiParameters) utility to encode the parameters as ABI-encoded hex strings.
:::

## `allowedMethods`

Limits what methods the delegate can call.

Caveat enforcer contract: [`AllowedMethodsEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/AllowedMethodsEnforcer.sol)

### Parameters

| Name        | Type               | Required |Description |
| ----------- | ------------------ | -------- | ---------- |
| `selectors` | `MethodSelector[]` | Yes      | The list of method selectors that the delegate is allowed to call. The selector value can be 4-byte hex string, ABI function signature, or ABI function object. |

### Example

```typescript
const caveats = [{
  type: "allowedMethods",
  selectors: [
    // 4-byte Hex string.
    "0xa9059cbb",
    // ABI function signature.
    "transfer(address,uint256)",
    // ABI function object.
    {
      name: 'transfer',
      type: 'function',
      inputs: [
        { name: 'recipient', type: 'address' },
        { name: 'amount', type: 'uint256' }
      ],
      outputs: [],
      stateMutability: 'nonpayable',
    },
  ]
}];
```

:::note
This example adds the `transfer` function to the allowed methods in three different ways—as the 4-byte function selector, the ABI function signature, and the `ABIFunction` object.
:::

## `allowedTargets`

Limits what addresses the delegate can call.

Caveat enforcer contract: [`AllowedTargetsEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/AllowedTargetsEnforcer.sol)

### Parameters

| Name      | Type        | Required | Description                                                 |
| --------- | ----------- | -------- | ----------------------------------------------------------- |
| `targets` | `Address[]` | Yes      | The list of addresses that the delegate is allowed to call. |

### Example

```typescript
const caveats = [{
  type: "allowedTargets",
  targets: [
    "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
    "0xB2880E3862f1024cAC05E66095148C0a9251718b",
  ]
}];
```

## `argsEqualityCheck`

Ensures that the `args` provided when redeeming the delegation are equal to the terms specified on the caveat.

Caveat enforcer contract: [`ArgsEqualityCheckEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ArgsEqualityCheckEnforcer.sol)

### Parameters

| Name   | Type  | Required | Description                                                              |
| ------ | ----- | -------- | ------------------------------------------------------------------------ |
| `args` | `Hex` | Yes      | The expected args that must match exactly when redeeming the delegation. |

### Example

```typescript
const caveats = [{
  type: "argsEqualityCheck",
  args: "0xf2bef872456302645b7c0bb59dcd96ffe6d4a844f311ebf95e7cf439c9393de2",
}];
```

## `blockNumber`

Specifies a range of blocks through which the delegation will be valid.

Caveat enforcer contract: [`BlockNumberEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/BlockNumberEnforcer.sol)

### Parameters

| Name              | Type     | Required | Description                                                                                             |
| ----------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `afterThreshold`  | `bigint` | Yes      | The block number after which the delegation is valid. Set the value to `0n` to disable this threshold.  |
| `beforeThreshold` | `bigint` | Yes      | The block number before which the delegation is valid. Set the value to `0n` to disable this threshold. |

### Example

```typescript
const caveats = [{
  type: "blockNumber",
  afterThreshold: 19426587n,
  beforeThreshold: 0n,
}];
```

## `deployed`

Ensures a contract is deployed, and if not, deploys the contract.

Caveat enforcer contract: [`DeployedEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/DeployedEnforcer.sol)

### Parameters

| Name              | Type      | Required | Description                          |
| ----------------- | --------- | -------- | ------------------------------------ |
| `contractAddress` | `Address` | Yes      | The contract address.                |
| `salt`            | `Hex`     | Yes      | The salt to use with the deployment. |
| `bytecode`        | `Hex`     | Yes      | The bytecode of the contract.        |

### Example

```typescript
const caveats = [{
  type: "deployed",
  contractAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  salt: "0x0e3e8e2381fde0e8515ed47ec9caec8ba2bc12603bc2b36133fa3e3fa4d88587",
  bytecode: "0x..." // The deploy bytecode for the contract at 0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92
}];
```

## `erc1155BalanceChange`

Ensures that the recipient's ERC-1155 token balance has changed within the allowed bounds—either increased by a minimum or decreased by a maximum specified amount.

Caveat enforcer contract: [`ERC1155BalanceChangeEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ERC1155BalanceChangeEnforcer.sol)

### Parameters

| Name | Type | Required | Description   |
| ---- | ---- | -------- | ------------- |
| `tokenAddress` | `Address`           | Yes      | The ERC-1155 token contract address. |
| `recipient`    | `Address`           | Yes      | The address on which the checks will be applied. |
| `tokenId`      | `bigint`            | Yes      | The ID of the ERC-1155 token. |
| `balance`      | `bigint`            | Yes      | The amount by which the balance must be changed. |
| `changeType`   | `BalanceChangeType` | Yes      | The balance change type for the ERC-1155 token. Specifies whether the balance should have increased or decreased. Valid parameters are `BalanceChangeType.Increase` and `BalanceChangeType.Decrease`. |

### Example

```typescript
const caveats = [{
  type: "erc1155BalanceChange",
  tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  recipient: "0x3fF528De37cd95b67845C1c55303e7685c72F319",
  tokenId: 1n,
  balance: 1000000n,
  changeType: BalanceChangeType.Increase,
}];
```

## `erc20BalanceChange`

Ensures that the recipient's ERC-20 token balance has changed within the allowed bounds—either increased by a minimum or decreased by a maximum specified amount.

Caveat enforcer contract: [`ERC20BalanceChangeEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ERC20BalanceChangeEnforcer.sol)

### Parameters

| Name | Type | Required | Description   |
| ---- | ---- | -------- | ------------- |
| `tokenAddress` | `Address`           | Yes      | The ERC-20 token contract addres. |
| `recipient`    | `Address`           | Yes      | The address on which the checks will be applied. |
| `balance`      | `bigint`            | Yes      | The amount by which the balance must be changed. |
| `changeType`   | `BalanceChangeType` | Yes      | The balance change type for the ERC-20 token. Specifies whether the balance should have increased or decreased. Valid parameters are `BalanceChangeType.Increase` and `BalanceChangeType.Decrease`. |

### Example

```typescript
const caveats = [{
  type: "erc20BalanceChange",
  tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  recipient: "0x3fF528De37cd95b67845C1c55303e7685c72F319",
  balance: 1000000n,
  changeType: BalanceChangeType.Increase,
}];
```

## `erc20PeriodTransfer`

Ensures that ERC-20 token transfers remain within a predefined limit during a
specified time window. At the start of each new period, the allowed transfer
amount resets. Any unused transfer allowance from the previous period does not
carry over and is forfeited.

Caveat enforcer contract: [`ERC20PeriodTransferEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ERC20PeriodTransferEnforcer.sol)

### Parameters

| Name             | Type      | Required | Description                                                      |
| ---------------- | --------- | -------- | ---------------------------------------------------------------- |
| `tokenAddress`   | `Address` | Yes      | The ERC-20 token contract address as a hex string.               |
| `periodAmount`   | `bigint`  | Yes      | The maximum amount of tokens that can be transferred per period. |
| `periodDuration` | `number`  | Yes      | The duration of each period in seconds.                          |
| `startDate`      | `number`  | Yes      | The timestamp when the first period begins in seconds.           |

### Example

```typescript
// Current time as start date. 
// Since startDate is in seconds, we need to convert milliseconds to seconds.
const startDate = Math.floor(Date.now() / 1000);

const caveats = [{
  type: "erc20PeriodTransfer",
  // Address of the ERC-20 token.
  tokenAddress: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
  // 1 ERC-20 token - 18 decimals, in wei.
  periodAmount: 1000000000000000000n,
  // 1 day in seconds.
  periodDuration: 86400,
  startDate,
}];
```

## `erc20Streaming`

Enforces a linear streaming transfer limit for ERC-20 tokens. Block token access until the specified start timestamp. At the start timestamp, immediately release the specified initial amount. Afterward, accrue tokens linearly at the specified rate, up to the specified maximum.

Caveat enforcer contract: [`ERC20StreamingEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ERC20StreamingEnforcer.sol)

### Parameters

| Name              | Type      | Required | Description                                               |
| ----------------- | --------- | -------- | --------------------------------------------------------- |
| `tokenAddress`    | `Address` | Yes      | The ERC-20 token contract address.                        |
| `initialAmount`   | `bigint`  | Yes      | The initial amount that can be transferred at start time. |
| `maxAmount`       | `bigint`  | Yes      | The maximum total amount that can be unlocked.            |
| `amountPerSecond` | `bigint`  | Yes      | The rate at which tokens accrue per second.               |
| `startTime`       | `number`  | Yes      | The start timestamp in seconds.                           |

### Example

```typescript
// Current time as start date. 
// Since startDate is in seconds, we need to convert milliseconds to seconds.
const startDate = Math.floor(Date.now() / 1000);

const caveats = [{
  type: "erc20Streaming",
  // Address of the ERC-20 token.
  tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  // 1 ERC-20 token - 18 decimals, in wei.
  initialAmount: 1000000000000000000n,
  // 10 ERC-20 token - 18 decimals, in wei.
  maxAmount: 10000000000000000000n
  // 0.00001 ERC-20 token - 18 decimals, in wei.
  amountPerSecond: 10000000000000n,
  startDate,
}];
```

## `erc20TransferAmount`

Limits the transfer of ERC-20 tokens.

Caveat enforcer contract: [`ERC20TransferAmountEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ERC20TransferAmountEnforcer.sol)

### Parameters

| Name           | Type      | Required | Description                                                       |
| -------------- | --------- | -------- | ----------------------------------------------------------------- |
| `tokenAddress` | `Address` | Yes      | The ERC-20 token contract address.                                |
| `maxAmount`    | `bigint`  | Yes      | The maximum amount of tokens that can be transferred by delegate. |

### Example

```typescript
const caveats = [{
  type: "erc20TransferAmount",
  tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  // 1 ERC-20 token - 18 decimals, in wei.
  maxAmount: 1000000000000000000n
}];
```

## `erc721BalanceChange`

Ensures that the recipient's ERC-721 token balance has changed within the allowed bounds—either increased by a minimum or decreased by a maximum specified amount.

Caveat enforcer contract: [`ERC721BalanceChangeEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ERC721BalanceChangeEnforcer.sol)

### Parameters

| Name | Type | Required | Description   |
| ---- | ---- | -------- | ------------- |
| `tokenAddress` | `Address`           | Yes      | The ERC-721 token contract addres. |
| `recipient`    | `Address`           | Yes      | The address on which the checks will be applied. |
| `balance`      | `bigint`            | Yes      | The amount by which the balance must be changed. |
| `changeType`   | `BalanceChangeType` | Yes      | The balance change type for the ERC-721 token. Specifies whether the balance should have increased or decreased. Valid parameters are `BalanceChangeType.Increase` and `BalanceChangeType.Decrease`. |

### Example

```typescript
const caveats = [{
  type: "erc721BalanceChange",
  tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  recipient: "0x3fF528De37cd95b67845C1c55303e7685c72F319",
  balance: 1000000n,
  changeType: BalanceChangeType.Increase,
}];
```

## `erc721Transfer`

Restricts the execution to only allow ERC-721 token transfers, specifically the `transferFrom(from, to, tokenId)` function, for a specified token ID and contract.

Caveat enforcer contract: [`ERC721TransferEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ERC721TransferEnforcer.sol)

### Parameters

| Name           | Type      | Required | Description                                                                  |
| -------------- | --------- | -------- | ---------------------------------------------------------------------------- |
| `tokenAddress` | `Address` | Yes      | The ERC-721 token contract address.                                          |
| `tokenId`      | `bigint`  | Yes      | The ID of the ERC-721 token that can be transferred by delegate.             |

### Example

```typescript
const caveats = [{
  type: "erc721Transfer",
  tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
  tokenId: 1n
}];
```

## `exactCalldata`

Verifies that the transaction calldata matches the expected calldata. For batch transactions,
see [`exactCalldataBatch`](#exactcalldatabatch).

Caveat enforcer contract: [`ExactCalldataEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ExactCalldataEnforcer.sol)

### Parameters

| Name              | Type                             | Required | Description                                           |
| ----------------- | -------------------------------- | -------- | ----------------------------------------------------- |
| `calldata`        | `Hex`                            | Yes      | The calldata that the delegate is allowed to call.  |

### Example

```typescript
const caveats = [{
  type: "exactCalldata",
  calldata: "0x1234567890abcdef",
}];
```

## `exactCalldataBatch`

Verifies that the provided batch execution calldata matches
the expected calldata for each individual execution in the batch.

Caveat enforcer contract: [`ExactCalldataBatchEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ExactCalldataBatchEnforcer.sol)

### Parameters

| Name              | Type                    | Required | Description                                           |
| ----------------- | ------------------------| -------- | ----------------------------------------------------- |
| `executions`      | `ExecutionStruct[]`     | Yes      | The list of executions that must be matched exactly in the batch. Each execution specifies a target address, value, and calldata.  |

### Example

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

const caveats = [{
  type: "exactCalldataBatch",
  executions,
}];
```

## `exactExecution`

Verifies that the provided execution matches the expected execution. For batch transactions,
see [`exactExecutionBatch`](#exactexecutionbatch).

Caveat enforcer contract: [`ExactExecutionEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ExactExecutionEnforcer.sol)

### Parameters

| Name              | Type              | Required | Description                                           |
| ----------------- | ------------------| -------- | ----------------------------------------------------- |
| `execution`       | `ExecutionStruct` | Yes      | The execution that must be matched exactly. Specifies the target address, value, and calldata. |

### Example

```typescript
const caveats = [{
  type: "exactExecution",
  target: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
  value: 1000000000000000000n,
  callData: "0x",
}];
```

## `exactExecutionBatch`

Verifies that each execution in the batch matches the expected
execution parameters—including target, value, and calldata.

Caveat enforcer contract: [`ExactExecutionBatchEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ExactExecutionBatchEnforcer.sol)

### Parameters

| Name              | Type                    | Required | Description                                           |
| ----------------- | ------------------------| -------- | ----------------------------------------------------- |
| `executions`      | `ExecutionStruct[]`     | Yes      | The list of executions that must be matched exactly in the batch. Each execution specifies a target address, value, and calldata.  |

### Example

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

const caveats = [{
  type: "exactExecutionBatch",
  executions,
}];
```

## `id`

Specifies an ID for multiple delegations. Once one of them is redeemed, the other delegations with the same ID are revoked.

Caveat enforcer contract: [`IdEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/IdEnforcer.sol)

### Parameters

| Name      | Type                    | Required | Description                                                                      |
| ----------| ------------------------| -------- | -------------------------------------------------------------------------------- |
| `id`      | `bigint` | `number`     | Yes      | An ID for the delegation. Only one delegation may be redeemed with any given ID. |

### Example

```typescript
const caveats = [{
  type: "id",
  id: 123456,
}];
```

## `limitedCalls`

Limits the number of times the delegate can perform executions on the delegator's behalf.

Caveat enforcer contract: [`LimitedCallsEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/LimitedCallsEnforcer.sol)

### Parameters

| Name      | Type                    | Required | Description                                                  |
| ----------| ------------------------| -------- | ------------------------------------------------------------ |
| `limit`   | `number`                | Yes      | The maximum number of times this delegation may be redeemed. |

### Example

```typescript
const caveats = [{
  type: "limitedCalls",
  limit: 1,
}];
```

## `multiTokenPeriod`

Ensures that token transfers for multiple tokens stay within the specified limits for the defined periods.
At the start of each new period, the allowed transfer amount for each token resets. Any unused transfer allowance from the previous period expires and does not carry over.

When redeeming the delegation, the index of the relevant token configuration must be specified
as the `args` of this caveat (encoded as `uint256` hex value).

Caveat enforcer contract: [`MultiTokenPeriodEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/MultiTokenPeriodEnforcer.sol)

### Parameters

The list of `TokenPeriodConfig` objects, where each object contains:

| Name             | Type      | Required | Description                                                      |
| ---------------- | --------- | -------- | ---------------------------------------------------------------- |
| `token`          | `Address` | Yes      | The ERC-20 token contract address as a hex string.               |
| `periodAmount`   | `bigint`  | Yes      | The maximum amount of tokens that can be transferred per period. |
| `periodDuration` | `number`  | Yes      | The duration of each period in seconds.                          |
| `startDate`      | `number`  | Yes      | The timestamp when the first period begins in seconds.           |

### Example

```typescript
import { zeroAddress } from 'viem';

// Current time as start date. 
// Since startDate is in seconds, we need to convert milliseconds to seconds.
const startDate = Math.floor(Date.now() / 1000);

const tokenPeriodConfigs = [
  {
    token: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
    // 1 token with 18 decimals.
    periodAmount: 1000000000000000000n,
     // 1 day in seconds.
    periodDuration: 86400,
    startDate
  },
  {
    // For native token use zeroAddress
    token: zeroAddress,
    // 0.01 ETH in wei.
    periodAmount: 10000000000000000n,
    // 1 hour in seconds.
    periodDuration: 3600,
    startDate
  }
]

const caveats = [{
  type: "multiTokenPeriod",
  tokenPeriodConfigs,
}];
```

## `nativeBalanceChange`

Ensures that the recipient's native token balance has changed within the allowed bounds—either increased by a minimum or decreased by a maximum specified amount.

Caveat enforcer contract: [`NativeBalanceChangeEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/NativeBalanceChangeEnforcer.sol)

### Parameters

| Name | Type | Required | Description   |
| ---- | ---- | -------- | ------------- |
| `recipient`    | `Address`           | Yes      | The address on which the checks will be applied. |
| `balance`      | `bigint`            | Yes      | The amount by which the balance must be changed. |
| `changeType`   | `BalanceChangeType` | Yes      | The balance change type for the native token. Specifies whether the balance should have increased or decreased. Valid parameters are `BalanceChangeType.Increase` and `BalanceChangeType.Decrease`. |

### Example

```typescript
const caveats = [{
  type: "nativeBalanceChange",
  recipient: "0x3fF528De37cd95b67845C1c55303e7685c72F319",
  balance: 1000000n,
  changeType: BalanceChangeType.Increase,
}];
```

## `nativeTokenPayment`

Enforces payment in native token (for example, ETH) for the right to use the delegation.
A permissions context allowing payment must be provided as the `args` when
redeeming the delegation.

Caveat enforcer contract: [`NativeTokenPaymentEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/NativeTokenPaymentEnforcer.sol)

### Parameters

| Name | Type | Required | Description   |
| ---- | ---- | -------- | ------------- |
| `recipient`    | `Address`           | Yes      | The recipient address who receives the payment.  |
| `amount`       | `bigint`            | Yes      | The amount that must be paid.                    |

### Example

```typescript
const caveats = [{
  type: "nativeTokenPayment",
  recipient: "0x3fF528De37cd95b67845C1c55303e7685c72F319",
  amount: 1000000n,
}];
```

## `nativeTokenPeriodTransfer`

Ensures that native token transfers remain within a predefined limit during a
specified time window. At the start of each new period, the allowed transfer
amount resets. Any unused transfer allowance from the previous period does not
carry over and is forfeited.

Caveat enforcer contract: [`NativeTokenPeriodTransferEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/NativeTokenPeriodTransferEnforcer.sol)

### Parameters

| Name             | Type      | Required | Description                                                      |
| ---------------- | --------- | -------- | ---------------------------------------------------------------- |
| `periodAmount`   | `bigint`  | Yes      | The maximum amount of tokens that can be transferred per period. |
| `periodDuration` | `number`  | Yes      | The duration of each period in seconds.                          |
| `startDate`      | `number`  | Yes      | The timestamp when the first period begins in seconds.           |

### Example

```typescript
// Current time as start date. 
// Since startDate is in seconds, we need to convert milliseconds to seconds.
const startDate = Math.floor(Date.now() / 1000);

const caveats = [{
  type: "nativeTokenPeriodTransfer",
  // 1 ETH in wei.
  periodAmount: 1000000000000000000n,
  // 1 day in seconds.
  periodDuration: 86400,
  startDate,
}];
```

## `nativeTokenStreaming`

Enforces a linear streaming limit for native tokens (for example, ETH). Nothing is available before the specified start timestamp. At the start timestamp, the specified initial amount becomes immediately available. After that, tokens accrue linearly at the specified rate, capped by the specified maximum.

Caveat enforcer contract: [`NativeTokenStreamingEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/NativeTokenStreamingEnforcer.sol)

### Parameters

| Name              | Type      | Required | Description                                               |
| ----------------- | --------- | -------- | --------------------------------------------------------- |
| `initialAmount`   | `bigint`  | Yes      | The initial amount that can be transferred at start time. |
| `maxAmount`       | `bigint`  | Yes      | The maximum total amount that can be unlocked.            |
| `amountPerSecond` | `bigint`  | Yes      | The rate at which tokens accrue per second.               |
| `startTime`       | `number`  | Yes      | The start timestamp in seconds.                           |

### Example

```typescript
// Current time as start date. 
// Since startDate is in seconds, we need to convert milliseconds to seconds.
const startDate = Math.floor(Date.now() / 1000);

const caveats = [{
  type: "nativeTokenStreaming",
  // 0.01 ETH in wei.
  initialAmount: 10000000000000000,
  // 0.5 ETH in wei.
  maxAmount: 500000000000000000n
  // 0.00001 ETH in wei.
  amountPerSecond: 10000000000000n,
  startDate,
}];
```

## `nativeTokenTransferAmount`

Enforces an allowance of native currency (for example, ETH).

Caveat enforcer contract: [`NativeTokenTransferAmountEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/NativeTokenTransferAmountEnforcer.sol)

### Parameters

| Name           | Type      | Required | Description                                                       |
| -------------- | --------- | -------- | ----------------------------------------------------------------- |
| `maxAmount`    | `bigint`  | Yes      | The maximum amount of tokens that can be transferred by delegate. |

### Example

```typescript
const caveats = [{
  type: "nativeTokenTransferAmount",
  // 0.00001 ETH in wei.
  maxAmount: 10000000000000000n
}];
```

## `nonce`

Adds a nonce to a delegation, and revokes previous delegations by incrementing the current nonce by calling `incrementNonce(address _delegationManager)`.

Caveat enforcer contract: [`NonceEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/NonceEnforcer.sol)

### Parameters

| Name           | Type      | Required | Description                                                       |
| -------------- | --------- | -------- | ----------------------------------------------------------------- |
| `nonce`        | `Hex`     | Yes      | The nonce to allow bulk revocation of delegations.                |


### Example

```typescript
const caveats = [{
  type: "nonce",
  nonce: "0x1"
}];
```

## `ownershipTransfer`

Restricts the execution to only allow ownership transfers, specifically the `transferOwnership(address _newOwner)` function, for a specified contract.

Caveat enforcer contract: [`OwnershipTransferEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/OwnershipTransferEnforcer.sol)

### Parameters

| Name              | Type      | Required | Description                                                            |
| ----------------- | --------- | -------- | -----------------------------------------------------------------------|
| `contractAddress` | `Address` | Yes      | The target contract address for which ownership transfers are allowed. |

### Example

```typescript
const caveats = [{
  type: "ownershipTransfer",
  contractAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92"
}];
```

## `redeemer`

Limits the addresses that can redeem the delegation.
This caveat is designed to restrict smart contracts or EOAs lacking delegation support,
and can be placed anywhere in the delegation chain to restrict the redeemer.

:::note
Delegator accounts with delegation functionalities can bypass these restrictions by delegating to
other addresses.
For example, Alice makes Bob the redeemer.
This condition is enforced, but if Bob is a delegator he can create a separate delegation to Carol
that allows her to redeem Alice's delegation through Bob.
:::

Caveat enforcer contract: [`RedeemerEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/RedeemerEnforcer.sol)

### Parameters

| Name              | Type        | Required | Description                                                            |
| ----------------- | ----------- | -------- | -----------------------------------------------------------------------|
| `redeemers`       | `Address[]` | Yes      | The list of addresses that are allowed to redeem the delegation.       |

### Example

```typescript
const caveats = [{
  type: "redeemer",
  redeemers: [
    "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
    "0x6be97c23596ECed7170fdFb28e8dA1Ca5cdc54C5"
  ],
}];
```

## `specificActionERC20TransferBatch`

Ensures validation of a batch consisting of exactly two transactions:
1. The first transaction must call a specific target contract with predefined calldata.
2. The second transaction must be an ERC-20 token transfer that matches specified
   parameters—including the ERC-20 token contract address, amount, and recipient.

Caveat enforcer contract: [`SpecificActionERC20TransferBatchEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/SpecificActionERC20TransferBatchEnforcer.sol)

### Parameters

| Name           | Type      | Required | Description                                   |
| -------------- | --------- | -------- | --------------------------------------------- |
| `tokenAddress` | `Address` | Yes      | The ERC-20 token contract address.            |
| `recipient`    | `Address` | Yes      | The address that will receive the tokens.     |
| `amount`       | `bigint`  | Yes      | The amount of tokens to transfer.             |
| `target`       | `Address` | Yes      | The target address for the first transaction. |
| `calldata`     | `Hex`     | Yes      | The `calldata` for the first transaction.     |

### Example

```typescript
const caveats = [{
  type: "specificActionERC20TransferBatch",
  tokenAddress: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
  recipient: "0x027aeAFF3E5C33c4018FDD302c20a1B83aDCD96C",
  // 1 ERC-20 token - 18 decimals, in wei
  amount: 1000000000000000000n,
  target: "0xb49830091403f1Aa990859832767B39c25a8006B",
  calldata: "0x1234567890abcdef"
}];
```

## `timestamp`

Specifies a range of timestamps through which the delegation will be valid.

Caveat enforcer contract: [`TimestampEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/TimestampEnforcer.sol)

### Parameters

| Name              | Type     | Required | Description                                                                                                    |
| ----------------- | -------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `afterThreshold`  | `number` | Yes      | The timestamp after which the delegation is valid in seconds. Set the value to `0` to disable this threshold.  |
| `beforeThreshold` | `number` | Yes      | The timestamp before which the delegation is valid in seconds. Set the value to `0` to disable this threshold. |

### Example

```typescript
// We need to convert milliseconds to seconds.
const currentTime = Math.floor(Date.now() / 1000);
// 1 hour after current time.
const afterThreshold = currentTime + 3600;
// 1 day after afterThreshold
const beforeThreshold = afterThreshold + 86400;

const caveats = [{
  type: "timestamp",
  afterThreshold,
  beforeThreshold,
}];
```

## `valueLte`

Limits the value of native tokens that the delegate can spend.

Caveat enforcer contract: [`ValueLteEnforcer.sol`](https://github.com/MetaMask/delegation-framework/blob/main/src/enforcers/ValueLteEnforcer.sol)

### Parameters

| Name              | Type        | Required | Description                                                            |
| ----------------- | ----------- | -------- | -----------------------------------------------------------------------|
| `maxValue`        | `bigint`    | Yes      | The maximum value that may be specified when redeeming this delegation.|

### Example

```typescript
const caveats = [{
  type: "valueLte",
  // 0.01 ETH in wei.
  maxValue: 10000000000000000n
}];
```
