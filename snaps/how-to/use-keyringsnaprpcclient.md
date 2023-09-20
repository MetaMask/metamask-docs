---
description: Use KeyringSnapRpcClient.
sidebar_position: 4
---

# Use KeyringSnapRpcClient

[`KeyringSnapRpcClient`](../reference/keyring-api/classes/KeyringSnapRpcClient.md) is to be used on the client side to invoke `keyring_*` rpc methods on the snap.

Keyring RPC methods can be invoked directly like so:

```ts
// Creating Keyring Account
window.ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: snapId,
    request: {
      method: 'keyring_createAccount',
      params:
        {
          name: "KeyringAccount1",
          options
        },
      ,
    },
  },
});
```

But to make it easier for developers we abstracted much of the logic into the [`KeyringSnapRpcClient`](../reference/keyring-api/classes/KeyringSnapRpcClient.md) available in [`@metamask/keyring-api`](../reference/keyring-api/modules.md) package.

To use [`KeyringSnapRpcClient`](../reference/keyring-api/classes/KeyringSnapRpcClient.md), first install [`@metamask/keyring-api`](../reference/keyring-api/modules.md) using the following command:

```bash
yarn add @metamask/keyring-api
```

Create the `client` as follows:

```ts
import { KeyringSnapRpcClient } from "@metamask/keyring-api";

let client = new KeyringSnapRpcClient(snapId, window.ethereum);
```

You can now use the client to invoke the following [`Keyring API`](../reference/keyring-api/index.md) methods on your snap:

- [`keyring_createAccount`](#create-account)
- [`keyring_getAccount`](#get-account)
- [`keyring_listAccounts`](#list-accounts)
- [`keyring_updateAccount`](#update-account)
- [`keyring_deleteAccount`](#delete-account)
- [`keyring_submitRequest`](#submit-request)
- [`keyring_getRequest`](#get-request)
- [`keyring_listRequests`](#list-requests)
- [`keyring_approveRequest`](#approve-request)
- [`keyring_rejectRequest`](#reject-request)
- [`keyring_filterAccountChains`](#filter-account-chains)

## Create Account

Creates a Keyring Snap Account.

```ts
let keyringAccount = await client.createAccount("KeyringAccount1");
```

## Get Account

Gets a Keyring Snap Account.

```ts
// Account Id is returned when account is created using `createAccount`.
let keyringAccount = await client.getAccount(accountId);
```

## List Accounts

Lists all Keyring Snap Account created by the Snap with snapId = `snapId` used during `client` creation.

```ts
let keyringAccounts = await client.listAccounts();
```

## Update Account

Updates a Keyring Account.

```ts
let updatedAccount = await client.updateAccount(modifiedKeyringAccount);
```

## Delete Account

Deletes a Keyring Account.

```ts
let snapResponse = await client.deleteAccount(accountId);
```

## Submit Request

Submits a Keyring Request.

```ts
import { v4 as uuid } from "uuid";

// Example submitting a eth_sendTransaction request.
let submitRequestResponse = await client.submitRequest({
    // Id of the account to which you want to submit this request.
    account: accountId,
    scope: "eip155:1", // Ethereum Mainnet
    request: {
        jsonrpc: "2.0",
        // Unique Id to identify every request.
        id: uuid(),
        // The method and params structure is subjective to the KeyringAPI implementation in the snap code.
        method: "eth_sendTransaction",
        params:
            {
                from: "",
                to: "0xcEF0f7f7ee1650b4A8151f605d9258bA65D733F5",
                data,
                chainId: "1",
            },
        ,
    },
});
```

## Get Request

Gets a Keyring Request.

```ts
// `requestId` is returned during request submission.
let keyringRequest = await client.getRequest(requestId);
```

## List Requests

Lists all Request submitted submitted to the Snap with snapId = `snapId` used during `client` creation.

```ts
let requests = await client.listRequests();
```

## Approve Request

Approves a request.

```ts
// `requestId` is returned during request submission.
await client.approveRequest(requestId);
```

## Reject Request

Rejects a request.

```ts
// `requestId` is returned during request submission.
await client.rejectRequest(requestId);
```

## Filter Account Chains

Returns a filtered list of CAIP-2 IDs representing the supported chains.

```ts
// accountId - ID of the account to be checked.
// chains - List of chains (CAIP-2) to be checked.
let supportedChains = await client.filterAccountChains(accountId, chains);
```
