---
description: Learn how to use the spending limit scopes for a delegation
sidebar_position: 1
sidebar_label: Spending limit scopes
---

# Spending limit scopes
 
Spending limit scopes let you define how much a delegate can spend in native, ERC-20, or ERC-721 tokens. 
The toolkit provides multiple types of spending limit scopes tailored for different use cases.

## Prerequisites

- [Install and set up the Delegation Toolkit.](../../get-started/install)
- [Configure the Delegation Toolkit](../../configure).
- [Create a MetaMask smart account](../execute-on-smart-accounts-behalf#3-create-a-delegator-account) to create delegations.
- [Create a delegate account](../execute-on-smart-accounts-behalf#4-create-a-delegate-account) 

## ERC-20 periodic scope

This scope ensures that ERC-20 token transfers remain within a predefined limit during a specified time 
window. At the start of each new period, the transfer allowance resets. For example, Alice can create a delegation 
that allows Bob to spend 10 USDC on her behalf each day, week, or month.

When this scope is applied, the toolkit automatically sets the native token transfer limit 
to `0`, meaning native token transfers are disabled. 

Internally, the scope uses combination of [`erc20PeriodTransfer`](../../../reference/caveats#erc20periodtransfer), and [`valueLte`](../../../reference/caveats#valuelte) caveat enforcers.

```typescript
import { createDelegation } from "@metamask/delegatino-toolkit";

const delegation = createDelegation({
  scope: {
      type: "erc20PeriodTransfer",
      tokenAddress: "0xb4aE654Aca577781Ca1c5DE8FbE60c2F423f37da",
      periodAmount: 1000000000000000000n,
      periodDuration: 86400,
      startDate: 1743763600,
  },
  to: delegateaAccount,
  from: delegatorAccount,
});
```

## ERC-20 streaming scope

This scopes ensures a linear streaming transfer limit for ERC-20 tokens. Token transfers are blocked until the defined 
start timestamp. At the start, a specified initial amount is released, after which tokens accrue linearly at the 
configured rate, up to the maximum allowed amount. For example, Alice can create delegation that allows Bob to spend 
0.1 USDC per second, starting with an initial amount of 10 USDC, up to a maximum of 100 USDC.

When this scope is applied, the toolkit automatically sets the native token transfer limit 
to `0`, meaning native token transfers are disabled.

Internally, the scope uses combination of [`erc20Streaming`](../../../reference/caveats#erc20streaming), and [`valueLte`](../../../reference/caveats#valuelte) caveat enforcers.

```typescript

import { createDelegation } from "@metamask/delegatino-toolkit";

const delegation = createDelegation({
  scope: {
    type: "erc20Streaming",
    tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
    amountPerSecond: 100n,
    initialAmount: 1000000n,
    maxAmount: 10000000n,
    startTime: 1703980800,
  },
  to: delegateaAccount,
  from: delegatorAccount,
});
```

## ERC-20 transfer scope

This scope ensures that ERC-20 token transfers are limited to a predefined maximum amount. This scope is useful for 
setting simple, fixed transfer limits without any time based or streaming conditions. For example, Alice can create 
a delegation that allows Bob to spend up to 10 USDC without any conditions. Bob may use the 10 USDC in a single 
transaction or make multiple transactions, as long as the total does not exceed 10 USDC.

When this scope is applied, the toolkit automatically sets the native token transfer limit 
to `0`, meaning native token transfers are disabled.

Internally, the scope uses combination of [`erc20TransferAmount`](../../../reference/caveats#erc20transferamount), and [`valueLte`](../../../reference/caveats#valuelte) caveat enforcers.

```typescript
import { createDelegation } from "@metamask/delegatino-toolkit";

const delegation = createDelegation({
  scope: {
    type: "erc20TransferAmount",
    tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
    maxAmount: 10000n,
  },
  to: delegateaAccount,
  from: delegatorAccount,
});
```

## ERC-721 scope

This scope limits the delegation to ERC-721 token transfers only. Internally, the scope uses [`erc721Transfer`](../../../reference/caveats#erc721transfer) caveat enforcer. 
For example, Alice can create a delegation that allows Bob to transfer an NFT she owns on her behalf.

```typescript
import { createDelegation } from "@metamask/delegatino-toolkit";

const delegation = createDelegation({
  scope: {
    type: "erc721Transfer",
    tokenAddress: "0x3fF528De37cd95b67845C1c55303e7685c72F319",
    tokenId: 1n,
  },
  to: delegateaAccount,
  from: delegatorAccount,
});
```

## Native token periodic scope

This scope ensures that native token transfers remain within a predefined limit during a specified time 
window. At the start of each new period, the transfer allowance resets. For example, Alice can create a delegation 
that allows Bob to spend 0.01 ETH on her behalf each day, week, or month.

When this scope is applied, the toolkit automatically sets the allowed calldata to `0x`, disabling 
the ERC-20 and ERC-721 token transfers.

Internally, the scope uses combination of [`exactCalldata`](../../../reference/caveats#exactcalldata), and [`nativeTokenPeriodTransfer`](../../../reference/caveats#nativetokenperiodtransfer) caveat enforcers.

```typescript
import { createDelegation } from "@metamask/delegatino-toolkit";

const delegation = createDelegation({
  scope: {
    type: "nativeTokenPeriodTransfer",
    periodAmount: 1000000000000000000n,
    periodDuration: 86400,
    startDate: 1743763600,
  },
  to: delegateaAccount,
  from: delegatorAccount,
});
```

## Native token streaming scope

This scopes ensures a linear streaming transfer limit for native tokens. Token transfers are blocked until the defined 
start timestamp. At the start, a specified initial amount is released, after which tokens accrue linearly at the 
configured rate, up to the maximum allowed amount. For example, Alice can create delegation that allows Bob to spend 
0.001 ETH per second, starting with an initial amount of 0.01 ETH, up to a maximum of 0.1 ETH.

When this scope is applied, the toolkit automatically sets the allowed calldata to `0x`, disabling 
the ERC-20 and ERC-721 token transfers.

Internally, the scope uses combination of [`exactCalldata`](../../../reference/caveats#exactcalldata), and [`nativeTokenStreaming`](../../../reference/caveats#nativetokenstreaming) caveat enforcers.

```typescript
import { createDelegation } from "@metamask/delegatino-toolkit";

const delegation = createDelegation({
  scope: {
    type: "nativeTokenStreaming",
    amountPerSecond: 100n,
    initialAmount: 1000000n,
    maxAmount: 10000000n,
    startTime: 1703980800,
  },
  to: delegateaAccount,
  from: delegatorAccount,
});
```

## Native token transfer scope

This scope ensures that native token transfers are limited to a predefined maximum amount. This scope is useful for setting 
simple, fixed transfer limits without any time based or streaming conditions. For example, Alice can create 
a delegation that allows Bob to spend up to 0.1 ETH without any conditions. Bob may use the 0.1 ETH in a single 
transaction or make multiple transactions, as long as the total does not exceed 0.1 ETH.

When this scope is applied, the toolkit automatically sets the allowed calldata to `0x`, disabling 
the ERC-20 and ERC-721 token transfers.

Internally, the scope uses combination of [`exactCalldata`](../../../reference/caveats#exactcalldata), and [`nativeTokenTransferAmount`](../../../reference/caveats#nativetokentransferamount) caveat enforcers.

```typescript
import { createDelegation } from "@metamask/delegatino-toolkit";

const delegation = createDelegation({
  scope: {
    type: "nativeTokenTransferAmount",
    maxAmount: 1000000n,
  },
  to: delegateaAccount,
  from: delegatorAccount,
});
```

## Next steps

- See [Restrict a delegation](../restrict-delegation) to learn how to further limit the authority of a delegation.