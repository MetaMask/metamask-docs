---
description: Learn how to use the spending limit scopes for a delegation.
---

# Use spending limit scopes
 
Spending limit scopes define how much a delegate can spend in native, ERC-20, or ERC-721 tokens.
You can set transfer limits with or without time-based (periodic) or streaming conditions, depending on your use case.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../../get-started/install.md)
- [Configure the Delegation Toolkit.](../../configure.md)
- [Create a delegator account.](../execute-on-smart-accounts-behalf.md#3-create-a-delegator-account)
- [Create a delegate account.](../execute-on-smart-accounts-behalf.md#4-create-a-delegate-account)

## ERC-20 periodic scope

This scope ensures a per-period limit for ERC-20 token transfers.
You set the amount and the time window.
At the start of each new period, the allowance resets.
For example, Alice creates a delegation that lets Bob spend up to 10 USDC on her behalf each day.
Bob can transfer a total of 10 USDC per day; the limit resets at the beginning of the next day.

When this scope is applied, the toolkit automatically disables native token transfers (sets the native token transfer limit to `0`). 

Internally, this scope uses the [`erc20PeriodTransfer`](../../../reference/caveats.md#erc20periodtransfer) and [`valueLte`](../../../reference/caveats.md#valuelte) caveat enforcers.

```typescript
import { createDelegation } from "@metamask/delegation-toolkit";

const delegation = createDelegation({
  scope: {
    type: "erc20PeriodTransfer",
    tokenAddress: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
    periodAmount: 1000000000000000000n,
    periodDuration: 86400,
    startDate: 1743763600,
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

When this scope is applied, the toolkit automatically disables native token transfers (sets the native token transfer limit to `0`).

Internally, this scope uses the [`erc20Streaming`](../../../reference/caveats.md#erc20streaming) and [`valueLte`](../../../reference/caveats.md#valuelte) caveat enforcers.

```typescript
import { createDelegation } from "@metamask/delegation-toolkit";

const delegation = createDelegation({
  scope: {
    type: "erc20Streaming",
    tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
    amountPerSecond: 100n,
    initialAmount: 1000000n,
    maxAmount: 10000000n,
    startTime: 1703980800,
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

## ERC-20 transfer scope

This scope ensures that ERC-20 token transfers are limited to a predefined maximum amount. 
This scope is useful for setting simple, fixed transfer limits without any time based or streaming conditions.
For example, Alice creates a delegation that allows Bob to spend up to 10 USDC without any conditions.
Bob may use the 10 USDC in a single transaction or make multiple transactions, as long as the total does not exceed 10 USDC.

When this scope is applied, the toolkit automatically disables native token transfers (sets the native token transfer limit to `0`).

Internally, this scope uses the [`erc20TransferAmount`](../../../reference/caveats.md#erc20transferamount) and [`valueLte`](../../../reference/caveats.md#valuelte) caveat enforcers.

```typescript
import { createDelegation } from "@metamask/delegation-toolkit";

const delegation = createDelegation({
  scope: {
    type: "erc20TransferAmount",
    tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
    maxAmount: 10000n,
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

## ERC-721 scope

This scope limits the delegation to ERC-721 token transfers only.
For example, Alice creates a delegation that allows Bob to transfer an NFT she owns on her behalf.

Internally, this scope uses the [`erc721Transfer`](../../../reference/caveats.md#erc721transfer) caveat enforcer. 

```typescript
import { createDelegation } from "@metamask/delegation-toolkit";

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
You set the amount and the time window.
At the start of each new period, the allowance resets.
For example, Alice creates a delegation that lets Bob spend up to 0.01 ETH on her behalf each day.
Bob can transfer a total of 0.01 ETH per day; the limit resets at the beginning of the next day.

When this scope is applied, the toolkit automatically disables ERC-20 and ERC-721 token transfers (sets the allowed calldata to `0x`).

Internally, this scope uses the [`exactCalldata`](../../../reference/caveats.md#exactcalldata) and [`nativeTokenPeriodTransfer`](../../../reference/caveats.md#nativetokenperiodtransfer) caveat enforcers.

```typescript
import { createDelegation } from "@metamask/delegation-toolkit";

const delegation = createDelegation({
  scope: {
    type: "nativeTokenPeriodTransfer",
    periodAmount: 1000000000000000000n,
    periodDuration: 86400,
    startDate: 1743763600,
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

When this scope is applied, the toolkit automatically disables ERC-20 and ERC-721 token transfers (sets the allowed calldata to `0x`).

Internally, this scope uses the [`exactCalldata`](../../../reference/caveats.md#exactcalldata) and [`nativeTokenStreaming`](../../../reference/caveats.md#nativetokenstreaming) caveat enforcers.

```typescript
import { createDelegation } from "@metamask/delegation-toolkit";

const delegation = createDelegation({
  scope: {
    type: "nativeTokenStreaming",
    amountPerSecond: 100n,
    initialAmount: 1000000n,
    maxAmount: 10000000n,
    startTime: 1703980800,
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

## Native token transfer scope

This scope ensures that native token transfers are limited to a predefined maximum amount. 
This scope is useful for setting simple, fixed transfer limits without any time based or streaming conditions.
For example, Alice creates a delegation that allows Bob to spend up to 0.1 ETH without any conditions.
Bob may use the 0.1 ETH in a single transaction or make multiple transactions, as long as the total does not exceed 0.1 ETH.

When this scope is applied, the toolkit automatically disables ERC-20 and ERC-721 token transfers (sets the allowed calldata to `0x`).

Internally, this scope uses the [`exactCalldata`](../../../reference/caveats.md#exactcalldata) and [`nativeTokenTransferAmount`](../../../reference/caveats.md#nativetokentransferamount) caveat enforcers.

```typescript
import { createDelegation } from "@metamask/delegation-toolkit";

const delegation = createDelegation({
  scope: {
    type: "nativeTokenTransferAmount",
    // 0.001 ETH in wei format.
    maxAmount: 1000000000000000n,
  },
  to: delegateAccount,
  from: delegatorAccount,
  environment: delegatorAccount.environment,
});
```

## Next steps

See [how to further constrain the authority of a delegation](constrain-scope.md) using caveat enforcers.
