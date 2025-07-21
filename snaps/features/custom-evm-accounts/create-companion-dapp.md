---
description: Call Keyring API methods from your companion dapp.
sidebar_position: 2
sidebar_label: Create a companion dapp
---

# Create an account management companion dapp

Create a companion dapp to provide a user interface for your account management Snap.
Call Keyring API methods from your companion dapp, enabling users to create and interact with custom
EVM accounts.

:::tip see also

- [Custom EVM accounts](index.md)
- [Create an account management Snap](create-account-snap.md)
- [Keyring API reference](../../reference/keyring-api/index.md)
  :::

## Prerequisites

An [account management Snap](create-account-snap.md) set up.

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

### 2. Create a KeyringSnapRpcClient

Create a `KeyringSnapRpcClient`:

```ts
import { KeyringSnapRpcClient } from "@metamask/keyring-api"
import { defaultSnapOrigin as snapId } from "../config"

let client = new KeyringSnapRpcClient(snapId, window.ethereum)
```

### 3. Call Account Management API methods

You can now use the `KeyringSnapRpcClient` to invoke
[Account Management API](../../reference/keyring-api/account-management/index.md) methods on your Snap.

For example, to call [`keyring_listAccounts`](../../reference/keyring-api/account-management/index.md#keyring_listaccounts):

```typescript
const accounts = await client.listAccounts()
```

## Example

See the [example companion dapp source code](https://github.com/MetaMask/snap-simple-keyring/tree/main/packages/site)
for more information.
