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
to invoke Keyring API methods on your Snap.

For example, to call [`keyring_listAccounts`](../../reference/keyring-api/classes/KeyringSnapRpcClient.md#listaccounts):

```typescript
const client = new KeyringSnapRpcClient(snapId, window.ethereum);
const accounts = await client.listAccounts();
```
