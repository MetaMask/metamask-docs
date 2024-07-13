---
description: Get started by creating an account management Snap.
sidebar_position: 1
tags:
  - Keyring API
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Create an account management Snap

Create an account management Snap to connect to custom EVM accounts.

:::tip see also

- [Custom EVM accounts](index.md)
- [Create an account management companion dapp](create-companion-dapp.md)
- [Account management Snap security guidelines](security.md)
- [Keyring API reference](../../reference/keyring-api/index.md)
  :::

## Prerequisites

- Set up a Snap.
  See the [Snaps quickstart](../../get-started/quickstart.md) and [how to develop a Snap](../../how-to/publish-a-snap.md).
- Read the [account management Snap security guidelines](security.md).

## Steps

### 1. Install the Keyring API

Install the [`@metamask/keyring-api`](https://github.com/MetaMask/keyring-api) module in your
project directory using Yarn or npm:

```bash
yarn add @metamask/keyring-api
```

or

```bash
npm install @metamask/keyring-api
```

### 2. Add permissions

Specify the following [permissions](../../how-to/request-permissions.md) in your Snap manifest file:

```json title="snap.manifest.json"
"initialPermissions": {
  "endowment:keyring": {
    "allowedOrigins": [
      "https://<dapp domain>"
    ]
  },
  "endowment:rpc": {
    "dapps": true
  },
  "snap_manageAccounts": {},
  "snap_manageState": {}
},
```

Add a list of dapp URLs allowed to call Keyring API methods on your Snap using the
[`endowment:keyring`](../../reference/permissions.md#endowmentkeyring) permission.

### 3. Implement the Account Management API

Implement the [Account Management API](../../reference/keyring-api/account-management/index.md) in your Snap.
Make sure to [limit the methods exposed to dapps](security.md#limit-the-methods-exposed-to-dapps).

```typescript
class MySnapKeyring implements Keyring {
  // Implement the required methods here.
}
```

### 4. Handle requests submitted by MetaMask

MetaMask submits EVM requests from dapps using the
[`keyring_submitRequest`](../../reference/keyring-api/account-management/index.md#keyring_submitrequest)
method of the Keyring API.
See the EVM methods for [externally owned accounts](../../reference/keyring-api/chain-methods.md#eoa-methods)
and [ERC-4337 accounts](../../reference/keyring-api/chain-methods.md#erc-4337-methods).

The following is an example of a `personal_sign` request:

```json
{
  "id": "d6e23af6-4bea-48dd-aeb0-7d3c30ea67f9",
  "scope": "",
  "account": "69438371-bef3-4957-9f91-c3f22c1d75f3",
  "request": {
    "method": "personal_sign",
    "params": [
      "0x4578616d706c652060706572736f6e616c5f7369676e60206d657373616765",
      "0x5874174dcf1ab6F7Efd8496f4f09404CD1c5bA84"
    ]
  }
}
```

The request includes:

- `id` - The unique identifier for the request.
- `scope` - The CAIP-2 chain ID of the selected chain.
  Currently, this property is always an empty string.
  Your Snap should use the chain ID present in the request object instead.
- `account` - The ID of the account that should handle the request.
- `request` - The request object.

Your Snap must respond with either a synchronous or asynchronous result:

<Tabs>
<TabItem value="Synchronous">

```typescript
return { pending: false, result }
```

</TabItem>
<TabItem value="Asynchronous">

```typescript
return { pending: true, redirect: { message, url } }
```

The redirect message and URL are displayed to the user to help them continue the transaction flow.

</TabItem>
</Tabs>

### 5. Notify MetaMask about events

Notify MetaMask when [Account Management API events](../../reference/keyring-api/account-management/events.md)
take place, using the `emitSnapKeyringEvent()` helper function.

For example, when an account is created:

```typescript
try {
  emitSnapKeyringEvent(snap, KeyringEvent.AccountCreated, { account })
  // Update your Snap's state.
} catch (error) {
  // Handle the error.
}
```

MetaMask returns an error if the account already exists or the account object is invalid.

### 6. Expose the Account Management API

Create an [`onKeyringRequest`](../../reference/entry-points.md#onkeyringrequest) entry point handler
method to expose the Account Management API methods to MetaMask and your dapp:

```typescript
export const onKeyringRequest: OnKeyringRequestHandler = async ({
  origin,
  request,
}) => {
  // Add custom logic here.
  return handleKeyringRequest(keyring, request)
}
```

### 7. Create a companion dapp

[Create a companion dapp](create-companion-dapp.md) to provide a user interface for your account
management Snap, enabling them to create and interact with custom EVM accounts.

## Example

See the [example account management Snap source code](https://github.com/MetaMask/snap-simple-keyring/tree/main/packages/snap)
for more information.
