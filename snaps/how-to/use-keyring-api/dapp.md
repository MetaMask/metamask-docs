---
description: Call Keyring API methods from your dapp.
sidebar_position: 2
---

# Use the Keyring API from a dapp

Use the Keyring API from your dapp to create and interact with custom EVM accounts.
Use the [`KeyringSnapRpcClient`](../../reference/keyring-api/classes/KeyringSnapRpcClient.md) to
invoke Keyring API methods on your Keyring Snap.

:::flaskOnly
:::

:::tip see also
- [Create a Keyring Snap](snap/index.md)
- [About the Keyring API](../../concepts/keyring-api.md)
- [Keyring API reference](../../reference/keyring-api/index.md)
:::

## Prerequisites

- A [Keyring Snap](snap/index.md) set up.
- A dapp from which to use to the Keyring API.

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

### 2. Create the KeyringSnapRpcClient

Create the [`KeyringSnapRpcClient`](../../reference/keyring-api/classes/KeyringSnapRpcClient.md):

```ts
import { KeyringSnapRpcClient } from "@metamask/keyring-api";
import { defaultSnapOrigin as snapId } from '../config';

let client = new KeyringSnapRpcClient(snapId, window.ethereum);
```

### 3. Call Keyring API methods

You can now use the [`KeyringSnapRpcClient`](../../reference/keyring-api/classes/KeyringSnapRpcClient.md)
to invoke the following Keyring API methods on your Snap.

Invoke the Keyring API methods on your Keyring Snap from your dapp.
For example:

```typescript
const client = new KeyringSnapRpcClient(snapId, window.ethereum);
const accounts = await client.listAccounts();
```

### createAccount

Creates a Keyring account.

```ts
let keyringAccount = await client.createAccount("KeyringAccount1");
```

### getAccount

Gets a Keyring account.

```ts
// accountId is returned when the account is created using createAccount.
let keyringAccount = await client.getAccount(accountId);
```

### listAccounts

Lists all Keyring accounts created by the Snap.

```ts
let keyringAccounts = await client.listAccounts();
```

### updateAccount

Updates a Keyring account.

```ts
let updatedAccount = await client.updateAccount(modifiedKeyringAccount);
```

### deleteAccount

Deletes a Keyring account.

```ts
let snapResponse = await client.deleteAccount(accountId);
```

### submitRequest

Submits a Keyring request.

```ts
import { v4 as uuid } from "uuid";

// Example submitting an eth_sendTransaction request
let submitRequestResponse = await client.submitRequest({
    // ID of the account to which you want to submit this request
    account: accountId,
    scope: "eip155:1", // Ethereum Mainnet
    request: {
        jsonrpc: "2.0",
        // Unique ID to identify every request
        id: uuid(),
        // The method and parameter structure is subjective to the Keyring API implementation in the Snap code.
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

### getRequest

Gets a Keyring request.

```ts
// requestId is returned during request submission.
let keyringRequest = await client.getRequest(requestId);
```

### listRequests

Lists all requests submitted to the Snap.

```ts
let requests = await client.listRequests();
```

### approveRequest

Approves a request.

```ts
// requestId is returned during request submission.
await client.approveRequest(requestId);
```

### rejectRequest

Rejects a request.

```ts
// requestId is returned during request submission.
await client.rejectRequest(requestId);
```

### filterAccountChains

Returns a filtered list of CAIP-2 IDs representing the supported chains.

```ts
// accountId - ID of the account to be checked
// chains - List of chains (CAIP-2) to be checked
let supportedChains = await client.filterAccountChains(accountId, chains);
```
