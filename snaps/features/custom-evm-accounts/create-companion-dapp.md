---
description: Call Keyring API methods from your companion dapp.
sidebar_label: Create a companion dapp
tags:
  - Keyring API
---

# Create an account management companion dapp

Create a companion dapp to provide a user interface for your account management Snap.
Use the [`KeyringSnapRpcClient`](../../reference/keyring-api/classes/KeyringSnapRpcClient.md) to
call Keyring API methods from your companion dapp, enabling users to create and interact with custom
EVM accounts.

:::tip see also
- [About custom EVM accounts](index.md)
- [Create an account management Snap](create-account-snap.md)
- [Keyring API reference](../../reference/keyring-api/index.md)
:::

## Prerequisites

An [account management Snap](create-account-snap.md) set up.

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
to invoke Keyring API methods on your Snap.

For example, to call [`keyring_listAccounts`](../../reference/keyring-api/classes/KeyringSnapRpcClient.md#listaccounts):

```typescript
const accounts = await client.listAccounts();
```

## Example

See the [example companion dapp source code](https://github.com/MetaMask/snap-simple-keyring/tree/main/packages/site)
for more information.
