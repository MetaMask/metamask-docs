# Type alias: Keyring

```ts
type Keyring: {
  approveRequest: Promise<void>;
  createAccount: Promise<{
     address: string;
     id: string;
     name: string;
     options: null | Record<string, Json>;
     supportedMethods: (
        | "personal_sign"
        | "eth_sendTransaction"
        | "eth_sign"
        | "eth_signTransaction"
        | "eth_signTypedData"
        | "eth_signTypedData_v1"
        | "eth_signTypedData_v2"
        | "eth_signTypedData_v3"
        | "eth_signTypedData_v4")[];
     type: "eip155:eoa" | "eip155:erc4337";
  }>;
  deleteAccount: Promise<void>;
  filterAccountChains: Promise<string[]>;
  getAccount: Promise<undefined | {
     address: string;
     id: string;
     name: string;
     options: null | Record<string, Json>;
     supportedMethods: (
        | "personal_sign"
        | "eth_sendTransaction"
        | "eth_sign"
        | "eth_signTransaction"
        | "eth_signTypedData"
        | "eth_signTypedData_v1"
        | "eth_signTypedData_v2"
        | "eth_signTypedData_v3"
        | "eth_signTypedData_v4")[];
     type: "eip155:eoa" | "eip155:erc4337";
  }>;
  getRequest: Promise<undefined | {
     account: string;
     request: { id: string; jsonrpc: "2.0"; method: string; } | { id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json> | Json[]; };
     scope: string;
  }>;
  listAccounts: Promise<{
     address: string;
     id: string;
     name: string;
     options: null | Record<string, Json>;
     supportedMethods: (
        | "personal_sign"
        | "eth_sendTransaction"
        | "eth_sign"
        | "eth_signTransaction"
        | "eth_signTypedData"
        | "eth_signTypedData_v1"
        | "eth_signTypedData_v2"
        | "eth_signTypedData_v3"
        | "eth_signTypedData_v4")[];
     type: "eip155:eoa" | "eip155:erc4337";
  }[]>;
  listRequests: Promise<{
     account: string;
     request: { id: string; jsonrpc: "2.0"; method: string; } | { id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json> | Json[]; };
     scope: string;
  }[]>;
  rejectRequest: Promise<void>;
  submitRequest: Promise<{
     pending: true;
     } | {
     pending: false;
     result: Json;
  }>;
  updateAccount: Promise<void>;
};
```

Keyring interface.

Represents the functionality and operations related to managing accounts and
handling requests.

## Type declaration

### approveRequest()

Approve a request.

Approves the request with the given ID and sets the response if provided.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the request to approve. |
| `result`? | `Json` | The response to the request (optional). |

#### Returns

A promise that resolves when the request is successfully
approved.

### createAccount()

Create an account.

Creates a new account with the given name, supported chains, and optional
account options.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the account. |
| `options`? | `null` \| `Record`<`string`, `Json`\> | Keyring-defined options for the account (optional). |

#### Returns

A promise that resolves to the newly created KeyringAccount
object without any private information.

### deleteAccount()

Delete an account from the keyring.

Deletes the account with the given ID from the keyring.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the account to delete. |

#### Returns

A promise that resolves when the account is successfully deleted.

### filterAccountChains()

Filter supported chains for a given account.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | ID of the account to be checked. |
| `chains` | `string`[] | List of chains (CAIP-2) to be checked. |

#### Returns

A Promise that resolves to a filtered list of CAIP-2 IDs
representing the supported chains.

### getAccount()

Get an account.

Retrieves the KeyringAccount object for the given account ID.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the account to retrieve. |

#### Returns

A promise that resolves to the KeyringAccount object if found, or
undefined otherwise.

### getRequest()

Get a request.

Retrieves the KeyringRequest object for the given request ID.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the request to retrieve. |

#### Returns

A promise that resolves to the KeyringRequest object if found, or
undefined otherwise.

### listAccounts()

List accounts.

Retrieves an array of KeyringAccount objects representing the available
accounts.

#### Returns

A promise that resolves to an array of KeyringAccount objects.

### listRequests()

List all submitted requests.

Retrieves an array of KeyringRequest objects representing the submitted
requests.

#### Returns

A promise that resolves to an array of KeyringRequest objects.

### rejectRequest()

Reject a request.

Rejects the request with the given ID.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the request to reject. |

#### Returns

A promise that resolves when the request is successfully
rejected.

### submitRequest()

Submit a request.

Submits the given KeyringRequest object.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `request` | \{   `account`: `string`;   `request`: \{ id: string; jsonrpc: "2.0"; method: string; } \| \{ id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json\> \| Json[]; };   `scope`: `string`;   } | The KeyringRequest object to submit. |
| `request.account` | `string` | Account ID (UUIDv4). |
| `request.request` | \{ id: string; jsonrpc: "2.0"; method: string; } \| \{ id: string; jsonrpc: "2.0"; method: string; params: Record<string, Json\> \| Json[]; } | JSON-RPC request sent by the client application.<br /><br />Note: The request ID must be a string. |
| `request.scope` | `string` | Request's scope (CAIP-2 chain ID). |

#### Returns

A promise that resolves to the request response.

### updateAccount()

Update an account.

Updates the account with the given account object. Does nothing if the
account does not exist.

#### Parameters

| Parameter | Type | Description |
| :------ | :------ | :------ |
| `account` | \{   `address`: `string`;   `id`: `string`;   `name`: `string`;   `options`: `null` \| `Record`<`string`, `Json`\>;   `supportedMethods`: (      \| `"personal_sign"`      \| `"eth_sendTransaction"`      \| `"eth_sign"`      \| `"eth_signTransaction"`      \| `"eth_signTypedData"`      \| `"eth_signTypedData_v1"`      \| `"eth_signTypedData_v2"`      \| `"eth_signTypedData_v3"`      \| `"eth_signTypedData_v4"`)[];   `type`: `"eip155:eoa"` \| `"eip155:erc4337"`;   } | The updated account object. |
| `account.address` | `string` | Account address or next receive address (UTXO). |
| `account.id` | `string` | Account ID (UUIDv4). |
| `account.name` | `string` | User-chosen account name. |
| `account.options` | `null` \| `Record`<`string`, `Json`\> | Keyring-dependent account options. |
| `account.supportedMethods` | (   \| `"personal_sign"`   \| `"eth_sendTransaction"`   \| `"eth_sign"`   \| `"eth_signTransaction"`   \| `"eth_signTypedData"`   \| `"eth_signTypedData_v1"`   \| `"eth_signTypedData_v2"`   \| `"eth_signTypedData_v3"`   \| `"eth_signTypedData_v4"`)[] | Account supported methods. |
| `account.type` | `"eip155:eoa"` \| `"eip155:erc4337"` | Account type. |

#### Returns

A promise that resolves when the account is successfully updated.

## Source

[external/keyring-api/src/keyring-api.ts:136](https://github.com/MetaMask/keyring-api/blob/1c8eeb9/src/keyring-api.ts#L136)
