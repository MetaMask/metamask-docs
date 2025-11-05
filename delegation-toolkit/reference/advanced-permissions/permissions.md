---
description: Advanced Permissions (ERC-7715) reference.
sidebar_label: Permissions
keywords: [ERC-7715, permissions, ERC-20 token, native token, reference, advanced permissions]
---

# Advanced Permissions (ERC-7715) reference

When [executing on a MetaMask user's behalf](../../guides/advanced-permissions/execute-on-metamask-users-behalf.md), you can request the following permission types for ERC-20 token and native token transfers.
Learn [how to use Advanced Permissions (ERC-7715)](../../guides/advanced-permissions/use-permissions/erc20-token.md).

## ERC-20 token permissions

### ERC-20 periodic permission

Ensures a per-period limit for ERC-20 token transfers.
At the start of each new period, the allowance resets.

#### Parameters

| Name             | Type      | Required | Description                                                            |
| ---------------- | --------- | -------- | ---------------------------------------------------------------------- |
| `tokenAddress`   | `Address` | Yes      | The ERC-20 token contract address as a hex string.                     |
| `periodAmount`   | `bigint`  | Yes      | The maximum amount of tokens that can be transferred per period.       |
| `periodDuration` | `number`  | Yes      | The duration of each period in seconds.                                |
| `startTime`      | `number`  | No       | The start timestamp in seconds. The default is the current time.       |
| `justification`  | `string`  | No       | A human-readable explanation of why the permission is being requested. |

#### Example

```typescript
import { parseUnits } from "viem";

const currentTime = Math.floor(Date.now() / 1000);
const expiry = currentTime + 604800;

const permission = {
  type: "erc20-token-periodic",
  data: {
    tokenAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    periodAmount: parseUnits("10", 6),
    periodDuration: 86400,
    justification?: "Permission to transfer 1 USDC every day",
  },
};
```

### ERC-20 stream permission

Ensures a linear streaming transfer limit for ERC-20 tokens.
Token transfers are blocked until the defined start timestamp.
At the start, a specified initial amount is released, after which tokens accrue linearly at the configured rate, up to the maximum allowed amount.

#### Parameters

| Name              | Type      | Required | Description                                                                   |
| ----------------- | --------- | -------- | ----------------------------------------------------------------------------- |
| `tokenAddress`    | `Address` | Yes      | The ERC-20 token contract address.                                            |
| `initialAmount`   | `bigint`  | No       | The initial amount that can be transferred at start time. The default is `0`. |
| `maxAmount`       | `bigint`  | No       | The maximum total amount that can be unlocked. The default is no limit.       |
| `amountPerSecond` | `bigint`  | Yes      | The rate at which tokens accrue per second.                                   |
| `startTime`       | `number`  | No       | The start timestamp in seconds. The default is the current time.              |
| `justification`   | `string`  | No       | A human-readable explanation of why the permission is being requested.        |

#### Example

```typescript
import { parseUnits } from "viem";

const currentTime = Math.floor(Date.now() / 1000);
const expiry = currentTime + 604800;

const permission = {
  type: "erc20-token-stream",
  data: {
    tokenAddress: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    amountPerSecond: parseUnits("0.1", 6),
    initialAmount: parseUnits("1", 6),
    maxAmount: parseUnits("2", 6),
    startTime: currentTime,
    justification: "Permission to use 0.1 USDC per second",
  },
};
```

## Native token permissions

### Native token periodic permission

Ensures a per-period limit for native token transfers.
At the start of each new period, the allowance resets.

#### Parameters

| Name             | Type      | Required | Description                                                            |
| ---------------- | --------- | -------- | ---------------------------------------------------------------------- |
| `periodAmount`   | `bigint`  | Yes      | The maximum amount of tokens that can be transferred per period.       |
| `periodDuration` | `number`  | Yes      | The duration of each period in seconds.                                |
| `startTime`      | `number`  | No       | The start timestamp in seconds. The default is the current time.       |
| `justification`  | `string`  | No       | A human-readable explanation of why the permission is being requested. |

#### Example

```typescript
import { parseEther } from "viem";

const currentTime = Math.floor(Date.now() / 1000);
const expiry = currentTime + 604800;

const permission = {
  type: "native-token-periodic",
  data: {
    periodAmount: parseEther("0.001"),
    periodDuration: 86400,
    startTime: currentTime,
    justification: "Permission to use 0.001 ETH every day",
  },
};
```

### Native token stream permission

Ensures a linear streaming transfer limit for native tokens.
Token transfers are blocked until the defined start timestamp.
At the start, a specified initial amount is released, after which tokens accrue linearly at the configured rate, up to the maximum allowed amount.

#### Parameters

| Name              | Type      | Required | Description                                                                   |
| ----------------- | --------- | -------- | ----------------------------------------------------------------------------- |
| `initialAmount`   | `bigint`  | No       | The initial amount that can be transferred at start time. The default is `0`. |
| `maxAmount`       | `bigint`  | No       | The maximum total amount that can be unlocked. The default is no limit.       |
| `amountPerSecond` | `bigint`  | Yes      | The rate at which tokens accrue per second.                                   |
| `startTime`       | `number`  | No       | The start timestamp in seconds. The default is the current time.              |
| `justification`   | `string`  | No       | A human-readable explanation of why the permission is being requested.        |

#### Example

```typescript
import { sepolia as chain } from "viem/chains";
import { parseEther } from "viem";
import { walletClient } from "./client.ts"

const currentTime = Math.floor(Date.now() / 1000);
const expiry = currentTime + 604800;

const permission = {
  type: "native-token-stream",
  data: {
    amountPerSecond: parseEther("0.0001"),
    initialAmount: parseEther("0.1"),
    maxAmount: parseEther("1"),
    startTime: currentTime,
    justification: "Permission to use 0.0001 ETH per second",
  },
};
```
