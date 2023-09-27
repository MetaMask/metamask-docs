---
description: Use the KeyringSnapRpcClient from a dapp.
sidebar_label: Use the Keyring API
sidebar_position: 5
sidebar_custom_props:
  flask_only: true
---

# Use the Keyring API from a dapp

:::flaskOnly
:::


Your dapp can use the [Keyring API](../concepts/keyring-api.md) to interact with custom EVM accounts.
Use the [`KeyringSnapRpcClient`](../reference/keyring-api/classes/KeyringSnapRpcClient.md)
of the Keyring API to invoke Keyring RPC methods on your [Keyring snap](../concepts/keyring-api.md#terminology).

:::tip tutorial
You can follow the end-to-end tutorial to [create a snap to connect to custom EVM accounts](../tutorials/custom-evm-accounts.md).
:::

:::info API documentation
See the [Keyring API reference](../reference/keyring-api/index.md) for all the Keyring API methods.
:::

## Create the KeyringSnapRpcClient

To use the `KeyringSnapRpcClient`, install `@metamask/keyring-api` in your project directory using
Yarn or npm:

```bash
yarn add @metamask/keyring-api
```

or

```bash
npm install @metamask/keyring-api
```

Create the client by adding the following to your project script:

```ts
import { KeyringSnapRpcClient } from "@metamask/keyring-api";

let client = new KeyringSnapRpcClient(snapId, window.ethereum);
```

## Call Keyring API methods

You can now use the `KeyringSnapRpcClient` to invoke the following
[`Keyring API`](../reference/keyring-api/index.md) methods on your snap.

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

Lists all Keyring accounts created by the snap.

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
        // The method and parameter structure is subjective to the Keyring API implementation in the snap code.
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

Lists all requests submitted to the snap.

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
