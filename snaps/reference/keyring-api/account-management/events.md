---
sidebar_position: 2
sidebar_label: Events
tags:
  - Keyring API
---

# Account Management API events

[Account management Snaps](../../../features/custom-evm-accounts/index.md) can notify MetaMask of the
following [Account Management API](index.md) events.

### `AccountCreated`

An account is created.
MetaMask returns an error if the account already exists or the account object is invalid.

#### Example

```typescript
try {
  emitSnapKeyringEvent(snap, KeyringEvent.AccountCreated, { account })
  // Update your Snap's state.
} catch (error) {
  // Handle the error.
}
```

### `AccountUpdated`

An account is updated.
MetaMask returns an error if one of the following is true:

- The account does not exist.
- The account object is invalid.
- The account address is updated.

#### Example

```typescript
try {
  emitSnapKeyringEvent(snap, KeyringEvent.AccountUpdated, { account })
  // Update your Snap's state.
} catch (error) {
  // Handle the error.
}
```

### `AccountDeleted`

An account is deleted.
The delete event is idempotent, so it is safe to emit even if the account does not exist.

#### Example

```typescript
try {
  emitSnapKeyringEvent(snap, KeyringEvent.AccountDeleted, {
    id: account.id,
  })
  // Update your Snap's state.
} catch (error) {
  // Handle the error.
}
```

### `RequestApproved`

A request is approved.
MetaMask returns an error if the request does not exist.
This event only applies to Snaps that
[handle requests asynchronously](../../../features/custom-evm-accounts/index.md#asynchronous-transaction-flow).

#### Example

```typescript
try {
  emitSnapKeyringEvent(snap, KeyringEvent.RequestApproved, {
    id: request.id,
    result,
  })
  // Update your Snap's state.
} catch (error) {
  // Handle the error.
}
```

### `RequestRejected`

A request is rejected.
MetaMask returns an error if the request does not exist.
This event only applies to Snaps that
[handle requests asynchronously](../../../features/custom-evm-accounts/index.md#asynchronous-transaction-flow).

#### Example

```typescript
try {
  emitSnapKeyringEvent(snap, KeyringEvent.RequestRejected, {
    id: request.id,
  })
  // Update your Snap's state.
} catch (error) {
  // Handle the error.
}
```
