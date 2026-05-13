---
description: Advanced Permissions (ERC-7715) rules reference.
sidebar_label: Rules
keywords: [ERC-7715, advanced permissions, rules, expiry, redeemer, payee, reference]
toc_max_heading_level: 2
---

# Advanced Permissions rules reference

When [executing on a MetaMask user's behalf](../../guides/advanced-permissions/execute-on-metamask-users-behalf.md), you can add the
following rule types for the supported permission types.

Use [`getSupportedExecutionPermissions`](./wallet-client.md#getsupportedexecutionpermissions) to
check which rule types are available for each permission type on each chain.

## Expiry

Sets an expiration timestamp for the permission.

### Parameters

| Name        | Type     | Required | Description                           |
| ----------- | -------- | -------- | ------------------------------------- |
| `timestamp` | `number` | Yes      | Expiration timestamp in Unix seconds. |

### Example

```ts
const currentTime = Math.floor(Date.now() / 1000)

const rules = [
  {
    type: 'expiry',
    data: {
      timestamp: currentTime + 604800,
    },
  },
]
```

## Redeemer

Restricts permission redemption to specific addresses.

### Parameters

| Name        | Type        | Required | Description                                          |
| ----------- | ----------- | -------- | ---------------------------------------------------- |
| `addresses` | `Address[]` | Yes      | Addresses that are allowed to redeem the permission. |

### Example

```ts
const rules = [
  {
    type: 'redeemer',
    data: {
      addresses: ['0x...', '0x...'],
    },
  },
]
```

## Payee

Restricts payments to specific receiver addresses.

### Parameters

| Name        | Type        | Required | Description                                       |
| ----------- | ----------- | -------- | ------------------------------------------------- |
| `addresses` | `Address[]` | Yes      | Addresses that are allowed as payment recipients. |

### Example

```ts
const rules = [
  {
    type: 'payee',
    data: {
      addresses: ['0x...'],
    },
  },
]
```
