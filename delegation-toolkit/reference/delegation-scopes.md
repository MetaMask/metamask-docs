---
description: Delegation scopes reference.
---

# Delegation scopes

When [creating a delegation](../guides/delegation/execute-on-smart-accounts-behalf.md), you can configure the following scopes to define the delegation's initial authority.
Learn [how to use delegation scopes](../guides/delegation/use-delegation-scopes/index.md).

## Spending limit scopes

### ERC-20 periodic scope

Ensures that ERC-20 token transfers remain within a predefined limit during a specified time window.
At the start of each new period, the transfer allowance resets.
For example, Alice creates a delegation that allows Bob to spend 10 USDC on her behalf each day, week, or month.

When this scope is applied, the toolkit automatically disables native token transfers (sets the native token transfer limit to `0`). 

Internally, this scope uses the [`erc20PeriodTransfer`](../../../reference/caveats.md#erc20periodtransfer) and [`valueLte`](../../../reference/caveats.md#valuelte) caveat enforcers.

#### Example

```typescript
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
});
```

### ERC-20 streaming scope

Ensures a linear streaming transfer limit for ERC-20 tokens.
Token transfers are blocked until the defined start timestamp.
At the start, a specified initial amount is released, after which tokens accrue linearly at the configured rate, up to the maximum allowed amount.
For example, Alice creates a delegation that allows Bob to spend 0.1 USDC per second, starting with an initial amount of 10 USDC, up to a maximum of 100 USDC.

When this scope is applied, the toolkit automatically disables native token transfers (sets the native token transfer limit to `0`).

Internally, this scope uses the [`erc20Streaming`](../../../reference/caveats.md#erc20streaming) and [`valueLte`](../../../reference/caveats.md#valuelte) caveat enforcers.

#### Example

```typescript
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
});
```

### ERC-20 transfer scope

Ensures that ERC-20 token transfers are limited to a predefined maximum amount. 
This scope is useful for setting simple, fixed transfer limits without any time-based or streaming conditions.
For example, Alice creates a delegation that allows Bob to spend up to 10 USDC without any conditions.
Bob may use the 10 USDC in a single transaction or make multiple transactions, as long as the total does not exceed 10 USDC.

When this scope is applied, the toolkit automatically disables native token transfers (sets the native token transfer limit to `0`).

Internally, this scope uses the [`erc20TransferAmount`](../../../reference/caveats.md#erc20transferamount) and [`valueLte`](../../../reference/caveats.md#valuelte) caveat enforcers.

#### Example

```typescript
const delegation = createDelegation({
  scope: {
    type: "erc20TransferAmount",
    tokenAddress: "0xc11F3a8E5C7D16b75c9E2F60d26f5321C6Af5E92",
    maxAmount: 10000n,
  },
  to: delegateAccount,
  from: delegatorAccount,
});
```

### ERC-721 scope

Limits the delegation to ERC-721 token transfers only.
For example, Alice creates a delegation that allows Bob to transfer an NFT she owns on her behalf.

Internally, this scope uses the [`erc721Transfer`](../../../reference/caveats.md#erc721transfer) caveat enforcer.

#### Example

```typescript
const delegation = createDelegation({
  scope: {
    type: "erc721Transfer",
    tokenAddress: "0x3fF528De37cd95b67845C1c55303e7685c72F319",
    tokenId: 1n,
  },
  to: delegateAccount,
  from: delegatorAccount,
});
```

### Native token periodic scope

Ensures that native token transfers remain within a predefined limit during a specified time window.
At the start of each new period, the transfer allowance resets.
For example, Alice creates a delegation that allows Bob to spend 0.01 ETH on her behalf each day, week, or month.

When this scope is applied, the toolkit automatically disables ERC-20 and ERC-721 token transfers (sets the allowed calldata to `0x`).

Internally, this scope uses the [`exactCalldata`](../../../reference/caveats.md#exactcalldata) and [`nativeTokenPeriodTransfer`](../../../reference/caveats.md#nativetokenperiodtransfer) caveat enforcers.

#### Example

```typescript
const delegation = createDelegation({
  scope: {
    type: "nativeTokenPeriodTransfer",
    periodAmount: 1000000000000000000n,
    periodDuration: 86400,
    startDate: 1743763600,
  },
  to: delegateAccount,
  from: delegatorAccount,
});
```

### Native token streaming scope

Ensures a linear streaming transfer limit for native tokens.
Token transfers are blocked until the defined start timestamp.
At the start, a specified initial amount is released, after which tokens accrue linearly at the configured rate, up to the maximum allowed amount.
For example, Alice creates delegation that allows Bob to spend 0.001 ETH per second, starting with an initial amount of 0.01 ETH, up to a maximum of 0.1 ETH.

When this scope is applied, the toolkit automatically disables ERC-20 and ERC-721 token transfers (sets the allowed calldata to `0x`).

Internally, this scope uses the [`exactCalldata`](../../../reference/caveats.md#exactcalldata) and [`nativeTokenStreaming`](../../../reference/caveats.md#nativetokenstreaming) caveat enforcers.

#### Example

```typescript
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
});
```

### Native token transfer scope

Ensures that native token transfers are limited to a predefined maximum amount. 
This scope is useful for setting simple, fixed transfer limits without any time based or streaming conditions.
For example, Alice creates a delegation that allows Bob to spend up to 0.1 ETH without any conditions.
Bob may use the 0.1 ETH in a single transaction or make multiple transactions, as long as the total does not exceed 0.1 ETH.

When this scope is applied, the toolkit automatically disables ERC-20 and ERC-721 token transfers (sets the allowed calldata to `0x`).

Internally, this scope uses the [`exactCalldata`](../../../reference/caveats.md#exactcalldata) and [`nativeTokenTransferAmount`](../../../reference/caveats.md#nativetokentransferamount) caveat enforcers.

#### Example

```typescript
const delegation = createDelegation({
  scope: {
    type: "nativeTokenTransferAmount",
    maxAmount: 1000000n,
  },
  to: delegateAccount,
  from: delegatorAccount,
});
```

## Function call scope

Defines the specific methods, contract addresses, and calldata that are allowed for the delegation.
For example, Alice delegates to Bob the ability to call the approve function on the USDC contract, with the approval amount set to `0`.

Internally, this scope uses the [`allowedTargets`](../../../reference/caveats.md#allowedtargets) and [`allowedMethods`](../../../reference/caveats.md#allowedmethods) caveat enforcers, and 
optionally uses the [`allowedCalldata`](../../../reference/caveats.md#allowedcalldata) or [`exactCalldata`](../../../reference/caveats.md#exactcalldata) caveat enforcers when those parameters are specified.

This scope requires `targets` and `selectors` as mandatory parameters for the configuration.
You can specify the allowed methods in `selectors` and the permitted contract addresses in `targets`. 

#### Example

This example sets the delegation scope to allow the delegate to call the `approve` function on the USDC token contract.

```typescript
const delegation = createDelegation({
  scope: {
    type: "functionCall",
    targets: ["0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"], // USDC address on Sepolia.
    selectors: ["approve(address, uint256)"]
  },
  to: delegateAccount,
  from: delegatorAccount,
});
```

## Ownership transfer scope

Restricts a delegation to ownership transfer calls only.
For example, Alice has deployed a smart contract, and she delegates to Bob the ability to transfer ownership of that contract.

Internally, this scope uses the [`ownershipTransfer`](../../../reference/caveats.md#ownershiptransfer) caveat enfrocer.

This scope requires a `contractAddress`, which represents the address of the deployed contract.

#### Example

```typescript
const contractAddress = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238"

const delegation = createDelegation({
  scope: {
    type: "ownershipTransfer",
    contractAddress,
  },
  to: delegateAccount,
  from: delegatorAccount,
});
```
