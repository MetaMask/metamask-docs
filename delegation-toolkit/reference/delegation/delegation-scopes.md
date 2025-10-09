---
description: Delegation scopes reference.
sidebar_label: Delegation scopes
keywords: [delegation scopes, configuration, reference]
---

# Delegation scopes

When [creating a delegation](../../guides/delegation/execute-on-smart-accounts-behalf.md), you can configure the following scopes to define the delegation's initial authority.
Learn [how to use delegation scopes](../../guides/delegation/use-delegation-scopes/index.md).

## Spending limit scopes

### ERC-20 periodic scope

Ensures a per-period limit for ERC-20 token transfers.
At the start of each new period, the allowance resets.

#### Parameters

| Name             | Type      | Required | Description                                                      |
| ---------------- | --------- | -------- | ---------------------------------------------------------------- |
| `tokenAddress`   | `Address` | Yes      | The ERC-20 token contract address as a hex string.               |
| `periodAmount`   | `bigint`  | Yes      | The maximum amount of tokens that can be transferred per period. |
| `periodDuration` | `number`  | Yes      | The duration of each period in seconds.                          |
| `startDate`      | `number`  | Yes      | The timestamp when the first period begins in seconds.           |

#### Example

```typescript
import { createDelegation, getDelegatorEnvironment } from "@metamask/delegation-toolkit";
import { sepolia } from "viem/chains";

const delegation = createDelegation({
  scope: {
    type: "erc20PeriodTransfer",
    tokenAddress: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
    periodAmount: 1000000000000000000n,
    periodDuration: 86400,
    startDate: 1743763600,
  },
  // Address that is granting the delegation
  from: "0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1",
  // Address to which the delegation is being granted
  to: "0x2B2dBd1D5fbeB77C4613B66e9F35dBfE12cB0488",
  // Alternatively you can use environment property of MetaMask smart account.
  environment: getDelegatorEnvironment(sepolia.id);
});
```

### ERC-20 streaming scope

Ensures a linear streaming transfer limit for ERC-20 tokens.
Token transfers are blocked until the defined start timestamp.
At the start, a specified initial amount is released, after which tokens accrue linearly at the configured rate, up to the maximum allowed amount.

#### Parameters

| Name              | Type      | Required | Description                                               |
| ----------------- | --------- | -------- | --------------------------------------------------------- |
| `tokenAddress`    | `Address` | Yes      | The ERC-20 token contract address.                        |
| `initialAmount`   | `bigint`  | Yes      | The initial amount that can be transferred at start time. |
| `maxAmount`       | `bigint`  | Yes      | The maximum total amount that can be unlocked.            |
| `amountPerSecond` | `bigint`  | Yes      | The rate at which tokens accrue per second.               |
| `startTime`       | `number`  | Yes      | The start timestamp in seconds.                           |

#### Example

```typescript
import { createDelegation, getDelegatorEnvironment } from "@metamask/delegation-toolkit";
import { sepolia } from "viem/chains";

const delegation = createDelegation({
  scope: {
    type: "erc20Streaming",
    tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
    amountPerSecond: 100n,
    initialAmount: 1000000n,
    maxAmount: 10000000n,
    startTime: 1703980800,
  },
  // Address that is granting the delegation
  from: "0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1",
  // Address to which the delegation is being granted
  to: "0x2B2dBd1D5fbeB77C4613B66e9F35dBfE12cB0488",
  // Alternatively you can use environment property of MetaMask smart account.
  environment: getDelegatorEnvironment(sepolia.id);
});
```

### ERC-20 transfer scope

Ensures that ERC-20 token transfers are limited to a predefined maximum amount. 
This scope is useful for setting simple, fixed transfer limits without any time-based or streaming conditions.

#### Parameters

| Name           | Type      | Required | Description                                                       |
| -------------- | --------- | -------- | ----------------------------------------------------------------- |
| `tokenAddress` | `Address` | Yes      | The ERC-20 token contract address.                                |
| `maxAmount`    | `bigint`  | Yes      | The maximum amount of tokens that can be transferred by delegate. |

#### Example

```typescript
import { createDelegation, getDelegatorEnvironment } from "@metamask/delegation-toolkit";
import { sepolia } from "viem/chains";

const delegation = createDelegation({
  scope: {
    type: "erc20TransferAmount",
    tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
    maxAmount: 10000n,
  },
  // Address that is granting the delegation
  from: "0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1",
  // Address to which the delegation is being granted
  to: "0x2B2dBd1D5fbeB77C4613B66e9F35dBfE12cB0488",
  // Alternatively you can use environment property of MetaMask smart account.
  environment: getDelegatorEnvironment(sepolia.id);
});
```

### ERC-721 scope

Limits the delegation to ERC-721 token (NFT) transfers only.

#### Parameters

| Name           | Type      | Required | Description                                                                  |
| -------------- | --------- | -------- | ---------------------------------------------------------------------------- |
| `tokenAddress` | `Address` | Yes      | The ERC-721 token contract address.                                          |
| `tokenId`      | `bigint`  | Yes      | The ID of the ERC-721 token that can be transferred by delegate. |

#### Example

```typescript
import { createDelegation, getDelegatorEnvironment } from "@metamask/delegation-toolkit";
import { sepolia } from "viem/chains";

const delegation = createDelegation({
  scope: {
    type: "erc721Transfer",
    tokenAddress: "0x3fF528De37cd95b67845C1c55303e7685c72F319",
    tokenId: 1n,
  },
  // Address that is granting the delegation
  from: "0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1",
  // Address to which the delegation is being granted
  to: "0x2B2dBd1D5fbeB77C4613B66e9F35dBfE12cB0488",
  // Alternatively you can use environment property of MetaMask smart account.
  environment: getDelegatorEnvironment(sepolia.id);
});
```

### Native token periodic scope

Ensures a per-period limit for native token transfers.
At the start of each new period, the allowance resets.

#### Parameters

| Name             | Type      | Required | Description                                                      |
| ---------------- | --------- | -------- | ---------------------------------------------------------------- |
| `periodAmount`   | `bigint`  | Yes      | The maximum amount of tokens that can be transferred per period. |
| `periodDuration` | `number`  | Yes      | The duration of each period in seconds.                          |
| `startDate`      | `number`  | Yes      | The timestamp when the first period begins in seconds.           |
| `allowedCalldata` | `AllowedCalldataBuilderConfig[]` | No  | The list of calldata that the delegate is allowed to call. Cannot be used together with `exactCalldata`. |
| `exactCalldata`   | `ExactCalldataBuilderConfig`     | No  | The calldata that the delegate is allowed to call. The default is `0x` to disallow ERC-20 and ERC-721 token transfers. Cannot be used together with `allowedCalldata`. |

#### Example

```typescript
import { createDelegation, getDelegatorEnvironment } from "@metamask/delegation-toolkit";
import { sepolia } from "viem/chains";

const delegation = createDelegation({
  scope: {
    type: "nativeTokenPeriodTransfer",
    periodAmount: 1000000000000000000n,
    periodDuration: 86400,
    startDate: 1743763600,
    // allowedCalldata can only be used WITHOUT exactCalldata.
    allowedCalldata: [
      {
        startIndex: 4, // The index in the calldata byte array (including the 4-byte method selector) where the expected calldata starts.
        value: "0x1234567890abcdef", // The expected calldata.
      }
    ],
    // exactCalldata can only be used WITHOUT allowedCalldata.
    exactCalldata: {
      calldata: "0x1234567890abcdef",
    },
  },
  // Address that is granting the delegation.
  from: "0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1",
  // Address to which the delegation is being granted.
  to: "0x2B2dBd1D5fbeB77C4613B66e9F35dBfE12cB0488",
  // Alternatively you can use environment property of MetaMask smart account.
  environment: getDelegatorEnvironment(sepolia.id);
});
```

### Native token streaming scope

Ensures a linear streaming transfer limit for native tokens.
Token transfers are blocked until the defined start timestamp.
At the start, a specified initial amount is released, after which tokens accrue linearly at the configured rate, up to the maximum allowed amount.

#### Parameters

| Name              | Type      | Required | Description                                               |
| ----------------- | --------- | -------- | --------------------------------------------------------- |
| `initialAmount`   | `bigint`  | Yes      | The initial amount that can be transferred at start time. |
| `maxAmount`       | `bigint`  | Yes      | The maximum total amount that can be unlocked.            |
| `amountPerSecond` | `bigint`  | Yes      | The rate at which tokens accrue per second.               |
| `startTime`       | `number`  | Yes      | The start timestamp in seconds.                           |
| `allowedCalldata` | `AllowedCalldataBuilderConfig[]` | No  | The list of calldata that the delegate is allowed to call. Cannot be used together with `exactCalldata`. |
| `exactCalldata`   | `ExactCalldataBuilderConfig`     | No  | The calldata that the delegate is allowed to call. The default is `0x` to disallow ERC-20 and ERC-721 token transfers. Cannot be used together with `allowedCalldata`. |

#### Example

```typescript
import { createDelegation, getDelegatorEnvironment } from "@metamask/delegation-toolkit";
import { sepolia } from "viem/chains";

const delegation = createDelegation({
  scope: {
    type: "nativeTokenStreaming",
    amountPerSecond: 100n,
    initialAmount: 1000000n,
    maxAmount: 10000000n,
    startTime: 1703980800,
    // allowedCalldata can only be used WITHOUT exactCalldata.
    allowedCalldata: [
      {
        startIndex: 4, // The index in the calldata byte array (including the 4-byte method selector) where the expected calldata starts.
        value: "0x1234567890abcdef", // The expected calldata.
      }
    ],
    // exactCalldata can only be used WITHOUT allowedCalldata.
    exactCalldata: {
      calldata: "0x1234567890abcdef",
    },
  },
  // Address that is granting the delegation.
  from: "0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1",
  // Address to which the delegation is being granted.
  to: "0x2B2dBd1D5fbeB77C4613B66e9F35dBfE12cB0488",
  // Alternatively you can use environment property of MetaMask smart account.
  environment: getDelegatorEnvironment(sepolia.id);
});
```

### Native token transfer scope

Ensures that native token transfers are limited to a predefined maximum amount. 
This scope is useful for setting simple, fixed transfer limits without any time based or streaming conditions.

#### Parameters

| Name              | Type      | Required | Description                                                       |
| ----------------- | --------- | -------- | ----------------------------------------------------------------- |
| `maxAmount`       | `bigint`  | Yes      | The maximum amount of tokens that can be transferred by delegate. |
| `allowedCalldata` | `AllowedCalldataBuilderConfig[]` | No  | The list of calldata that the delegate is allowed to call. Cannot be used together with `exactCalldata`. |
| `exactCalldata`   | `ExactCalldataBuilderConfig`     | No  | The calldata that the delegate is allowed to call. The default is `0x` to disallow ERC-20 and ERC-721 token transfers. Cannot be used together with `allowedCalldata`. |

#### Example

```typescript
import { createDelegation, getDelegatorEnvironment } from "@metamask/delegation-toolkit";
import { sepolia } from "viem/chains";

const delegation = createDelegation({
  scope: {
    type: "nativeTokenTransferAmount",
    // 0.001 ETH in wei format.
    maxAmount: 1000000000000000n,
    // allowedCalldata can only be used WITHOUT exactCalldata.
    allowedCalldata: [
      {
        startIndex: 4, // The index in the calldata byte array (including the 4-byte method selector) where the expected calldata starts.
        value: "0x1234567890abcdef", // The expected calldata.
      }
    ],
    // exactCalldata can only be used WITHOUT allowedCalldata.
    exactCalldata: {
      calldata: "0x1234567890abcdef",
    },
  },
  // Address that is granting the delegation.
  from: "0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1",
  // Address to which the delegation is being granted.
  to: "0x2B2dBd1D5fbeB77C4613B66e9F35dBfE12cB0488",
  // Alternatively you can use environment property of MetaMask smart account.
  environment: getDelegatorEnvironment(sepolia.id);
});
```

## Function call scope

Defines the specific methods, contract addresses, and calldata that are allowed for the delegation.

#### Parameters

| Name              | Type                             | Required | Description                                                                                                                                                     |
| ----------------- | -------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `targets`         | `Address[]`                      | Yes      | The list of addresses that the delegate is allowed to call.                                                                                                     |
| `selectors`       | `MethodSelector[]`               | Yes      | The list of method selectors that the delegate is allowed to call. The selector value can be 4-byte hex string, ABI function signature, or ABI function object. |
| `allowedCalldata` | `AllowedCalldataBuilderConfig[]` | No       | The list of calldata that the delegate is allowed to call. Cannot be used together with `exactCalldata`. |
| `exactCalldata`   | `ExactCalldataBuilderConfig`     | No       | The calldata that the delegate is allowed to call. Cannot be used together with `allowedCalldata`. |

#### Example

This example sets the delegation scope to allow the delegate to call the `approve` function on the USDC token contract.

```typescript
import { createDelegation, getDelegatorEnvironment } from "@metamask/delegation-toolkit";
import { sepolia } from "viem/chains";

const delegation = createDelegation({
  scope: {
    type: "functionCall",
    targets: ["0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"], // USDC address on Sepolia.
    selectors: ["approve(address, uint256)"]
    // allowedCalldata can only be used WITHOUT exactCalldata.
    allowedCalldata: [
      {
        startIndex: 4, // The index in the calldata byte array (including the 4-byte method selector) where the expected calldata starts.
        value: "0x1234567890abcdef", // The expected calldata.
      }
    ],
    // exactCalldata can only be used WITHOUT allowedCalldata.
    exactCalldata: {
      calldata: "0x1234567890abcdef",
    },
  },
  // Address that is granting the delegation.
  from: "0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1",
  // Address to which the delegation is being granted.
  to: "0x2B2dBd1D5fbeB77C4613B66e9F35dBfE12cB0488",
  // Alternatively you can use environment property of MetaMask smart account.
  environment: getDelegatorEnvironment(sepolia.id);
});
```

## Ownership transfer scope

Restricts a delegation to ownership transfer calls only.

#### Parameters

| Name              | Type      | Required | Description                                                            |
| ----------------- | --------- | -------- | -----------------------------------------------------------------------|
| `contractAddress` | `Address` | Yes      | The target contract address for which ownership transfers are allowed. |

#### Example

```typescript
import { createDelegation, getDelegatorEnvironment } from "@metamask/delegation-toolkit";
import { sepolia } from "viem/chains";

const contractAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"

const delegation = createDelegation({
  scope: {
    type: "ownershipTransfer",
    contractAddress,
  },
  // Address that is granting the delegation.
  from: "0x7E48cA6b7fe6F3d57fdd0448B03b839958416fC1",
  // Address to which the delegation is being granted.
  to: "0x2B2dBd1D5fbeB77C4613B66e9F35dBfE12cB0488",
  // Alternatively you can use environment property of MetaMask smart account.
  environment: getDelegatorEnvironment(sepolia.id);
});
```
