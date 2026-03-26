---
description: How to resolve user operation reverted errors with 0x revert data.
sidebar_label: User operation reverted
toc_max_heading_level: 2
keywords: [user operation, reverted, reason 0x, empty revert, execution, troubleshooting]
---

# User operation reverted

A user operation reverts with reason `0x` when validation succeeds, but execution fails without a
revert reason. This differs from AA-coded `EntryPoint` contract errors such as `AA23`, `AA25`,
or `AA21`.

When the `EntryPoint` contract calls the smart account's execution function, it performs a low-level
`call` internally. If that inner call reverts with empty data, the bundler reports
reason `0x` with no additional details.

The following sections describe common causes and how to troubleshoot them.

## Function doesn't exist

The `callData` encodes a call from the smart account to a target contract, but the function
selector doesn't match any function on that contract, and no fallback function exists. The EVM
reverts with empty data.

This commonly happens when:
- The function selector has a typo or doesn't match the target's ABI.
- The target address is wrong or points to a different contract.
- The target contract isn't deployed on the current chain.

### Solution

Decode `callData` and verify the inner call. Confirm that the target address has deployed code
and that the function selector matches the target's ABI.

```typescript
const code = await publicClient.getCode({
  address: targetAddress,
});

if (!code) {
  console.log("No contract deployed at this address");
}
```

## Bare revert without a message

The target contract uses `require(false)` or `revert` without a reason string. The revert
returns empty data. Contracts commonly use bare reverts in access control checks, reentrancy locks,
or guard functions.

### Solution

Look at the target contract's source code to identify which `require` or `revert` your call
parameters could trigger. 

Use [Tenderly](https://tenderly.co) to simulate the transaction and pinpoint the exact line. See the
[Tenderly debugger documentation](https://docs.tenderly.co/debugger) for details.

## Out of gas in the inner call

Smart accounts use a low-level `call` internally in their `execute` function. When the inner
call runs out of gas, the call returns `false` with empty return data.

This differs from the `AA95` error code, which applies when `handleOps` itself runs out of gas.
In this case, `callGasLimit` might be enough for the smart account's execution overhead but not
enough for the actual target contract call.

### Solution

Increase `callGasLimit`. If you estimate gas manually, try doubling the value. Target
contracts doing complex operations often need more gas than default estimates provide.

## Insufficient balance or allowance

The inner call performs an ERC-20 `transferFrom` but the smart account hasn't approved the
spender, or doesn't hold enough tokens. Some ERC-20 implementations use bare `require` statements
that revert without a reason string.

### Solution

Check that the smart account has sufficient token balance and approvals for the operation.

```typescript
import { erc20Abi } from "viem";

const balance = await publicClient.readContract({
  address: tokenAddress,
  abi: erc20Abi,
  functionName: "balanceOf",
  args: [smartAccount.address],
});

const allowance = await publicClient.readContract({
  address: tokenAddress,
  abi: erc20Abi,
  functionName: "allowance",
  args: [smartAccount.address, spenderAddress],
});
```

## Manual debugging

If the cause isn't immediately clear, follow these steps:

1. Decode the inner call: Extract the `(to, value, data)` tuple from your `callData` to
   confirm what the smart account executes.
2. Use Tenderly: Simulate the user operation in [Tenderly](https://tenderly.co) to get a full
   execution trace. The trace view shows the exact line where the inner call reverts.
2. Check the basics: Verify the target has deployed code, the smart account has enough
   ETH and tokens, and the function selector is correct.
