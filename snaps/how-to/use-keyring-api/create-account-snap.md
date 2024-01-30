---
description: Get started by creating an account management Snap.
sidebar_position: 1
tags:
  - Keyring API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create an account management Snap

Create an account management Snap to connect to custom EVM accounts.

:::flaskOnly
:::

:::tip see also
- [Create an account management companion dapp](create-companion-dapp.md)
- [Account management Snap security guidelines](security.md)
- [About the Keyring API](../../concepts/keyring-api.md)
- [Keyring API reference](../../reference/keyring-api/index.md)
:::

## Prerequisites

- Set up a Snap.
  See the [Snaps quickstart](../../get-started/quickstart.mdx) and [how to develop a Snap](../develop-a-snap.md).
- Read the [account management Snap security guidelines](security.md).

## Steps

### 1. Install the Keyring API

Install `@metamask/keyring-api` in your project directory using Yarn or npm:

```bash
yarn add @metamask/keyring-api
```

or

```bash
npm install @metamask/keyring-api
```

### 2. Add permissions

Specify the following [permissions](../request-permissions.md) in your Snap manifest file:

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

### 3. Implement the Keyring API

Implement the [required Keyring API methods](security.md#limit-the-methods-exposed-to-dapps) in your Snap:

```typescript
class MySnapKeyring implements Keyring {
  // Implement the required methods here...
}
```

### 4. Handle requests submitted by MetaMask

MetaMask submits Ethereum sign requests from dapps using the
[`submitRequest`](../../reference/keyring-api/type-aliases/Keyring.md#submitrequest) method of the
Keyring API.
See the [supported signing methods](../../concepts/keyring-api.md#supported-signing-methods).

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
return { pending: false, result };
```

</TabItem>
<TabItem value="Asynchronous">

```typescript
return { pending: true, redirect: { message, url } };
```

The redirect message and URL is displayed to the user to help them continue the transaction flow.

</TabItem>
</Tabs>

### 5. Notify MetaMask about events

Notify MetaMask when the following events take place, using the `emitSnapKeyringEvent()` helper function:

- An account is created:

   ```typescript
   try {
     emitSnapKeyringEvent(snap, KeyringEvent.AccountCreated, { account });
     // Update your Snap's state...
   } catch (error) {
     // Handle the error...
   }
   ```

   MetaMask returns an error if the account already exists or the account object is invalid.

- An account is updated:

   ```typescript
   try {
     emitSnapKeyringEvent(snap, KeyringEvent.AccountUpdated, { account });
     // Update your Snap's state...
   } catch (error) {
     // Handle the error...
   }
   ```
  
   MetaMask returns an error if the account does not exist, the account object is invalid, or the
   account address changes.

- An account is deleted:

   ```typescript
   try {
     emitSnapKeyringEvent(snap, KeyringEvent.AccountDeleted, {
       id: account.id,
     });
     // Update your Snap's state...
   } catch (error) {
     // Handle the error...
   }
   ```
  
   The delete event is idempotent, so it is safe to emit even if the account does not exist.

- A request is approved:

   ```typescript
   try {
     emitSnapKeyringEvent(snap, KeyringEvent.RequestApproved, {
       id: request.id,
       result,
     });
     // Update your Snap's state...
   } catch (error) {
     // Handle the error...
   }
   ```
  
   MetaMask returns an error if the request does not exist.
   This event only applies to Snaps that implement the
   [asynchronous transaction flow](../../concepts/keyring-api.md#asynchronous-transaction-flow).

- A request is rejected:

   ```typescript
   try {
     emitSnapKeyringEvent(snap, KeyringEvent.RequestRejected, {
       id: request.id,
     });
     // Update your snap's state...
   } catch (error) {
     // Handle the error...
   }
   ```
  
   MetaMask returns an error if the request does not exist.
   This event only applies to Snaps that implement the
   [asynchronous transaction flow](../../concepts/keyring-api.md#asynchronous-transaction-flow).

### 6. Expose the Keyring API

Create an `onKeyringRequest` entry point handler method to expose the Keyring API methods
to MetaMask and your dapp:

```typescript
export const onKeyringRequest: OnKeyringRequestHandler = async ({
  origin,
  request,
}) => {
  // Your custom logic here...
  return handleKeyringRequest(keyring, request);
};
```

### 7. Create a companion dapp

[Create a companion dapp](create-companion-dapp.md) to provide a user interface for your account
management Snap, enabling them to create and interact with custom EVM accounts.

## Example

See the [example account management Snap source code](https://github.com/MetaMask/snap-simple-keyring/tree/main/packages/snap)
for more information.
