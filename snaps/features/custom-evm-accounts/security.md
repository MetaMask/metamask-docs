---
description: Follow these security guidelines when creating an account management Snap.
sidebar_label: Security guidelines
sidebar_position: 3
tags:
  - Keyring API
---

# Account management Snap security guidelines

Refer to the following security guidelines when [creating an account management Snap](create-account-snap.md).

:::tip see also

- [Custom EVM accounts](index.md)
- [Create an account management Snap](create-account-snap.md)
- [Create an account management companion dapp](create-companion-dapp.md)
- [Keyring API reference](../../reference/keyring-api/index.md)
  :::

## Do not add secret information to account objects

Ensure that you do not store any secret information in
[account objects](../../reference/keyring-api/account-management/objects.md#keyringaccount), since they are
exposed to dapps and MetaMask.
For example:

- ❌ **Do NOT do this:**

  ```ts
  const account: KeyringAccount = {
    id: uuid(),
    options: {
      privateKey: "0x01234...78", // !!! DO NOT DO THIS !!!
    },
    address,
    methods: [
      EthMethod.PersonalSign,
      EthMethod.Sign,
      EthMethod.SignTransaction,
      EthMethod.SignTypedDataV1,
      EthMethod.SignTypedDataV3,
      EthMethod.SignTypedDataV4,
    ],
    type: EthAccountType.Eoa,
  }
  ```

- ✅ **Do this instead:**

  _Store any secret information that you need in the Snap's state:_

  ```ts
  await snap.request({
    method: "snap_manageState",
    params: {
      operation: "update",
      newState: {
        // Your Snap's state here.
        privateKey: "0x01234...78",
      },
    },
  })
  ```

## Limit the methods exposed to dapps

By default, MetaMask enforces the following restrictions on calling
[Account Management API](../../reference/keyring-api/account-management/index.md) methods on your Snap based on
the caller origin:

| Method                                                                                                               |  MetaMask origin   |    Dapp origin     |
| :------------------------------------------------------------------------------------------------------------------- | :----------------: | :----------------: |
| [`keyring_listAccounts`](../../reference/keyring-api/account-management/index.md#keyring_listaccounts)               | :white_check_mark: | :white_check_mark: |
| [`keyring_getAccount`](../../reference/keyring-api/account-management/index.md#keyring_getaccount)                   | :white_check_mark: | :white_check_mark: |
| [`keyring_createAccount`](../../reference/keyring-api/account-management/index.md#keyring_createaccount)             |        :x:         | :white_check_mark: |
| [`keyring_filterAccountChains`](../../reference/keyring-api/account-management/index.md#keyring_filteraccountchains) | :white_check_mark: | :white_check_mark: |
| [`keyring_updateAccount`](../../reference/keyring-api/account-management/index.md#keyring_updateaccount)             |        :x:         | :white_check_mark: |
| [`keyring_deleteAccount`](../../reference/keyring-api/account-management/index.md#keyring_deleteaccount)             | :white_check_mark: | :white_check_mark: |
| [`keyring_exportAccount`](../../reference/keyring-api/account-management/index.md#keyring_exportaccount)             |        :x:         | :white_check_mark: |
| [`keyring_listRequests`](../../reference/keyring-api/account-management/index.md#keyring_listrequests)               | :white_check_mark: | :white_check_mark: |
| [`keyring_getRequest`](../../reference/keyring-api/account-management/index.md#keyring_getrequest)                   | :white_check_mark: | :white_check_mark: |
| [`keyring_submitRequest`](../../reference/keyring-api/account-management/index.md#keyring_submitrequest)             | :white_check_mark: |        :x:         |
| [`keyring_approveRequest`](../../reference/keyring-api/account-management/index.md#keyring_approverequest)           |        :x:         | :white_check_mark: |
| [`keyring_rejectRequest`](../../reference/keyring-api/account-management/index.md#keyring_rejectrequest)             | :white_check_mark: | :white_check_mark: |

For example, a dapp is not allowed to call the `keyring_submitRequest` method of your Snap, and
MetaMask is not allowed to call the `keyring_createAccount` method of your Snap.

MetaMask also enforces that only dapps allowlisted in the Snap's manifest file using the
[`endowment:keyring`](../../reference/permissions.md#endowmentkeyring) permission can call these methods.

:::caution important
We recommend further restricting the methods exposed to dapps according to your Snap's functionality.
For example, if your Snap does not support account deletion via dapps, your Snap should reject
calls to the `keyring_deleteAccount` method originating from dapps.
:::

Your Snap can also impose varying restrictions depending on the calling dapp.
For example, Dapp 1 may have access to a different set of methods than Dapp 2.
The following is an example of implementing such logic:

```ts
const permissions: Record<string, string[]> = {
  "https://<Dapp 1 domain>": [
    // List of allowed methods for Dapp 1.
  ],
  "https://<Dapp 2 domain>": [
    // List of allowed methods for Dapp 2.
  ],
}

if (origin !== "metamask" && !permissions[origin]?.includes(request.method)) {
  // Reject the request.
}
```

Both dapps must be allowlisted in the Snap's manifest file.

## Ensure the redirect URL cannot be manipulated

If your Snap implements an [asynchronous transaction flow](index.md#asynchronous-transaction-flow),
ensure that the redirect URL is valid and cannot be manipulated, otherwise the user can be
redirected to a malicious website.

```ts
async submitRequest(request: KeyringRequest): Promise<SubmitRequestResponse> {
  // Your Snap's custom logic.
  return {
    pending: true,
    redirect: {
      message: "Please continue in the dapp.",
      url: "https://<dapp domain>/sign?tx=1234", // !!! ENSURE THIS IS A SAFE URL !!!
    },
  };
}
```

:::caution important
Only HTTPS URLs are allowed in the `url` field, and the provided URL is checked against a
[list of blocked domains](https://github.com/MetaMask/eth-phishing-detect).
However, for development purposes, HTTP URLs are allowed on Flask.
MetaMask also requires the redirect URL to be within a site allowlisted in the Snap's manifest file.
:::

## Remove all debug code from your production Snap

Ensure that all debug code is removed from your production Snap.
Exposing debug code can lead to multiple security vulnerabilities.
For example, secret information can be logged to the console, or a malicious dapp can bypass a
security check.

## Remove sensitive information from errors

Ensure that all error messages returned by your Snap are sanitized.
Failing to sanitize error messages can lead to exposing secrets or other sensitive information to
dapps or to MetaMask.

For example:

- ❌ **Do NOT do this:**

  ```ts
  // If inputSecretValue contains invalid hexadecimal characters, its value
  // will be added to the error thrown by toBuffer.
  const privateKey = toBuffer(inputSecretValue)
  // Use privateKey here.
  ```

- ✅ **Do this instead:**

  ```ts
  try {
    const privateKey = toBuffer(inputSecretValue)
    // Use privateKey here.
  } catch (error) {
    throw new Error("Invalid private key")
  }
  ```

## Expose Account Management API methods using the `onKeyringRequest` entry point

The [`onRpcRequest`](../../reference/entry-points.md#onrpcrequest) entry point is a general-purpose
entry point and has no restrictions on the methods that can be called.
Ensure that you only expose Account Management API methods using the
[`onKeyringRequest`](../../reference/entry-points.md#onkeyringrequest) entry point, which has extra
security checks.

For example:

- ❌ **Do NOT do this:**

  ```ts
  export const onRpcRequest: OnRpcRequestHandler = async ({
    //           ~~~           ~~~
    origin,
    request,
  }) => {
    return handleKeyringRequest(keyring, request)
  }
  ```

- ✅ **Do this instead:**

  ```ts
  export const onKeyringRequest: OnKeyringRequestHandler = async ({
    //           ~~~~~~~           ~~~~~~~
    origin,
    request,
  }) => {
    // Any custom logic or extra security checks here.
    return handleKeyringRequest(keyring, request)
  }
  ```

## Do not fetch remote code from inside your Snap

Ensure that your Snap is self-contained and does not fetch code from external sources.
Otherwise, a compromised server can use this mechanism to inject malicious code into your Snap.
