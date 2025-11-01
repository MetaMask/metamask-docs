---
description: Learn how to use the spending limit scopes for a delegation.
keywords: [delegation scope, spending limit, restrict, delegation]
---

# Use spending limit scopes
 
Spending limit scopes define how much a delegate can spend in native, ERC-20, or ERC-721 tokens.
You can set transfer limits with or without time-based (periodic) or streaming conditions, depending on your use case.

## Prerequisites

- [Install and set up the Smart Accounts Kit.](../../../get-started/install.md)
- [Configure the Smart Accounts Kit.](../../configure-toolkit.md)
- [Create a delegator account.](../execute-on-smart-accounts-behalf.md#3-create-a-delegator-account)
- [Create a delegate account.](../execute-on-smart-accounts-behalf.md#4-create-a-delegate-account)

## ERC-20 periodic scope

This scope ensures a per-period limit for ERC-20 token transfers.
You set the amount, period, and start data.
At the start of each new period, the allowance resets.
For example, Alice creates a delegation that lets Bob spend up to 10 USDC on her behalf each day.
Bob can transfer a total of 10 USDC per day; the limit resets at the beginning of the next day.

When this scope is applied, the toolkit automatically disallows native token transfers (sets the native token transfer limit to `0`). 

Internally, this scope uses the [`erc20PeriodTransfer`](../../../reference/delegation/caveats.md#erc20periodtransfer) and [`valueLte`](../../../reference/delegation/caveats.md#valuelte) caveat enforcers.
See the [ERC-20 periodic scope reference](../../../reference/delegation/delegation-scopes.md#erc-20-periodic-scope) for more details.

```typescript
import { createDelegation } from "@metamask/smart-accounts-kit";
import { parseUnits } from "viem";

// startDate should be in seconds.
const startDate = Math.floor(Date.now() / 1000);

const delegation = createDelegation({
  scope: {
    type: "erc20PeriodTransfer",
    tokenAddress: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
    // USDC has 6 decimal places.
    periodAmount: parseUnits("10", 6),
    periodDuration: 86400,
    startDate,
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

## ERC-20 streaming scope

This scopes ensures a linear streaming transfer limit for ERC-20 tokens.
Token transfers are blocked until the defined start timestamp.
At the start, a specified initial amount is released, after which tokens accrue linearly at the configured rate, up to the maximum allowed amount.
For example, Alice creates a delegation that allows Bob to spend 0.1 USDC per second, starting with an initial amount of 10 USDC, up to a maximum of 100 USDC.

When this scope is applied, the toolkit automatically disallows native token transfers (sets the native token transfer limit to `0`).

Internally, this scope uses the [`erc20Streaming`](../../../reference/delegation/caveats.md#erc20streaming) and [`valueLte`](../../../reference/delegation/caveats.md#valuelte) caveat enforcers.
See the [ERC-20 streaming scope reference](../../../reference/delegation/delegation-scopes.md#erc-20-streaming-scope) for more details.

```typescript
import { createDelegation } from "@metamask/smart-accounts-kit";
import { parseUnits } from "viem";

// startTime should be in seconds.
const startTime = Math.floor(Date.now() / 1000);

const delegation = createDelegation({
  scope: {
    type: "erc20Streaming",
    tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
    // USDC has 6 decimal places.
    amountPerSecond: parseUnits("0.1", 6),
    initialAmount: parseUnits("10", 6),
    maxAmount: parseUnits("100", 6),
    startTime,
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

## ERC-20 transfer scope

This scope ensures that ERC-20 token transfers are limited to a predefined maximum amount. 
This scope is useful for setting simple, fixed transfer limits without any time-based or streaming conditions.
For example, Alice creates a delegation that allows Bob to spend up to 10 USDC without any conditions.
Bob may use the 10 USDC in a single transaction or make multiple transactions, as long as the total does not exceed 10 USDC.

When this scope is applied, the toolkit automatically disallows native token transfers (sets the native token transfer limit to `0`).

Internally, this scope uses the [`erc20TransferAmount`](../../../reference/delegation/caveats.md#erc20transferamount) and [`valueLte`](../../../reference/delegation/caveats.md#valuelte) caveat enforcers.
See the [ERC-20 transfer scope reference](../../../reference/delegation/delegation-scopes.md#erc-20-transfer-scope) for more details.

```typescript
import { createDelegation } from "@metamask/smart-accounts-kit";
import { parseUnits } from "viem";

const delegation = createDelegation({
  scope: {
    type: "erc20TransferAmount",
    tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
    // USDC has 6 decimal places.
    maxAmount: parseUnits("10", 6),
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

## ERC-721 scope

This scope limits the delegation to ERC-721 token transfers only.
For example, Alice creates a delegation that allows Bob to transfer an NFT she owns on her behalf.

Internally, this scope uses the [`erc721Transfer`](../../../reference/delegation/caveats.md#erc721transfer) caveat enforcer. 
See the [ERC-721 scope reference](../../../reference/delegation/delegation-scopes.md#erc-721-scope) for more details.

```typescript
import { createDelegation } from "@metamask/smart-accounts-kit";

const delegation = createDelegation({
  scope: {
    type: "erc721Transfer",
    tokenAddress: "0x3fF528De37cd95b67845C1c55303e7685c72F319",
    tokenId: 1n,
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

## Native token periodic scope

This scope ensures a per-period limit for native token transfers.
You set the amount, period, and start date.
At the start of each new period, the allowance resets.
For example, Alice creates a delegation that lets Bob spend up to 0.01 ETH on her behalf each day.
Bob can transfer a total of 0.01 ETH per day; the limit resets at the beginning of the next day.

When this scope is applied, the toolkit disallows ERC-20 and ERC-721 token transfers by default (sets `exactCalldata` to `0x`).
You can optionally configure `exactCalldata` to restrict transactions to a specific operation, or configure
`allowedCalldata` to allow transactions that match certain patterns or ranges.

Internally, this scope uses the [`nativeTokenPeriodTransfer`](../../../reference/delegation/caveats.md#nativetokenperiodtransfer) caveat enforcer, and 
optionally uses the [`allowedCalldata`](../../../reference/delegation/caveats.md#allowedcalldata) or [`exactCalldata`](../../../reference/delegation/caveats.md#exactcalldata) caveat enforcers when those parameters are specified.
See the [native token periodic scope reference](../../../reference/delegation/delegation-scopes.md#native-token-periodic-scope) for more details.

```typescript
import { createDelegation } from "@metamask/smart-accounts-kit";
import { parseEther } from "viem";

// startDate should be in seconds.
const startDate = Math.floor(Date.now() / 1000);

const delegation = createDelegation({
  scope: {
    type: "nativeTokenPeriodTransfer",
    periodAmount: parseEther("0.01"),
    periodDuration: 86400,
    startDate,
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

## Native token streaming scope

This scopes ensures a linear streaming transfer limit for native tokens.
Token transfers are blocked until the defined start timestamp.
At the start, a specified initial amount is released, after which tokens accrue linearly at the configured rate, up to the maximum allowed amount.
For example, Alice creates delegation that allows Bob to spend 0.001 ETH per second, starting with an initial amount of 0.01 ETH, up to a maximum of 0.1 ETH.

When this scope is applied, the toolkit disallows ERC-20 and ERC-721 token transfers by default (sets `exactCalldata` to `0x`).
You can optionally configure `exactCalldata` to restrict transactions to a specific operation, or configure
`allowedCalldata` to allow transactions that match certain patterns or ranges.

Internally, this scope uses the [`nativeTokenStreaming`](../../../reference/delegation/caveats.md#nativetokenstreaming) caveat enforcer, and
optionally uses the [`allowedCalldata`](../../../reference/delegation/caveats.md#allowedcalldata) or [`exactCalldata`](../../../reference/delegation/caveats.md#exactcalldata) caveat enforcers when those parameters are specified.
See the [native token streaming scope reference](../../../reference/delegation/delegation-scopes.md#native-token-streaming-scope) for more details.

```typescript
import { createDelegation } from "@metamask/smart-accounts-kit";
import { parseEther } from "viem";

// startTime should be in seconds.
const startTime = Math.floor(Date.now() / 1000);

const delegation = createDelegation({
  scope: {
    type: "nativeTokenStreaming",
    amountPerSecond: parseEther("0.001"),
    initialAmount: parseEther("0.01"),
    maxAmount: parseEther("0.1"),
    startTime,
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

## Native token transfer scope

This scope ensures that native token transfers are limited to a predefined maximum amount. 
This scope is useful for setting simple, fixed transfer limits without any time-based or streaming conditions.
For example, Alice creates a delegation that allows Bob to spend up to 0.1 ETH without any conditions.
Bob may use the 0.1 ETH in a single transaction or make multiple transactions, as long as the total does not exceed 0.1 ETH.

When this scope is applied, the toolkit disallows ERC-20 and ERC-721 token transfers by default (sets `exactCalldata` to `0x`).
You can optionally configure `exactCalldata` to restrict transactions to a specific operation, or configure
`allowedCalldata` to allow transactions that match certain patterns or ranges.

Internally, this scope uses the [`nativeTokenTransferAmount`](../../../reference/delegation/caveats.md#nativetokentransferamount) caveat enforcer, and
optionally uses the [`allowedCalldata`](../../../reference/delegation/caveats.md#allowedcalldata) or [`exactCalldata`](../../../reference/delegation/caveats.md#exactcalldata) caveat enforcers when those parameters are specified.
See the [native token transfer scope reference](../../../reference/delegation/delegation-scopes.md#native-token-transfer-scope) for more details.

```typescript
import { createDelegation } from "@metamask/smart-accounts-kit";
import { parseEther } from "viem";

const delegation = createDelegation({
  scope: {
    type: "nativeTokenTransferAmount",
    maxAmount: parseEther("0.001"),
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

## Next steps

See [how to further constrain the authority of a delegation](constrain-scope.md) using caveat enforcers.
