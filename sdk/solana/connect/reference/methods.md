---
description: Methods reference for MetaMask Connect Solana.
keywords: [solana, connect, method, methods, dapp]
toc_max_heading_level: 2
sidebar_label: Solana SDK methods
---

# MetaMask Connect Solana SDK methods

MetaMask Connect Solana (`@metamask/connect-solana`) provides a wallet-standard integration for
connecting to MetaMask as a Solana wallet.
It wraps `@metamask/connect-multichain` and handles wallet discovery and session management
automatically.

## `createSolanaClient`

Creates a new Solana client instance.
By default, the wallet is automatically registered with the wallet-standard registry on creation,
making MetaMask discoverable by Solana dapps and wallet adapters.

### Parameters

| Name                        | Type                      | Required | Description                                                                |
| --------------------------- | ------------------------- | -------- | -------------------------------------------------------------------------- |
| `dapp.name`                 | `string`                  | Yes      | Name of your dApp.                                                         |
| `dapp.url`                  | `string`                  | No       | URL of your dApp.                                                          |
| `dapp.iconUrl`              | `string`                  | No       | Icon URL for your dApp.                                                    |
| `api.supportedNetworks`     | `SolanaSupportedNetworks` | No       | Map of network names (`mainnet`, `devnet`, `testnet`) to RPC URLs.         |
| `debug`                     | `boolean`                 | No       | Reserved for future use; not currently forwarded to the underlying client. |
| `skipAutoRegister`          | `boolean`                 | No       | Skip auto-registering the wallet during creation (defaults to `false`).    |

### Returns

A promise that resolves to a [`SolanaClient`](#solanaclient) instance.

### Example

```javascript
import { createSolanaClient } from '@metamask/connect-solana'

const client = await createSolanaClient({
  dapp: {
    name: 'My Solana DApp',
    url: 'https://mydapp.com',
  },
  api: {
    supportedNetworks: {
      mainnet: 'https://api.mainnet-beta.solana.com',
      devnet: 'https://api.devnet.solana.com',
    },
  },
})
```

## `getWallet`

Returns a wallet-standard compatible MetaMask wallet instance.
Use this to access wallet features directly outside of the Solana wallet adapter.

### Returns

A wallet-standard `Wallet` object.

### Example

```javascript
const wallet = client.getWallet()
console.log('Wallet name:', wallet.name)
```

## `registerWallet`

Registers the MetaMask wallet with the wallet-standard registry, making it automatically
discoverable by Solana dapps.
This is a no-op if the wallet was already auto-registered during creation (that is,
`skipAutoRegister` was not set to `true`).

### Returns

A promise that resolves when registration is complete.

### Example

```javascript
const client = await createSolanaClient({
  dapp: { name: 'My Solana DApp', url: 'https://mydapp.com' },
  skipAutoRegister: true,
})

// Register manually when ready
await client.registerWallet()
```

## `disconnect`

Disconnects all Solana scopes from MetaMask.
This only revokes the Solana-specific scopes (`solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp`,
`solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1`, `solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z`);
it does not terminate the broader multichain session if non-Solana scopes (such as EVM) are also
active.

### Returns

A promise that resolves when the disconnect is complete.

### Example

```javascript
await client.disconnect()
```

## Properties

| Property | Type             | Description                            |
| -------- | ---------------- | -------------------------------------- |
| `core`   | `MultichainCore` | The underlying MultichainCore instance. |

The `core` property exposes the full multichain client, giving access to lower-level methods such as
[`connect`](/sdk/multichain/connect/reference/methods#connect),
[`getSession`](/sdk/multichain/connect/reference/methods#getsession),
[`invokeMethod`](/sdk/multichain/connect/reference/methods#invokemethod),
[`on`](/sdk/multichain/connect/reference/methods#on), and
[`off`](/sdk/multichain/connect/reference/methods#off).

### Example

```javascript
const session = await client.core.getSession()
const solAccounts =
  session.sessionScopes['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp']?.accounts || []
console.log('Solana accounts:', solAccounts)
```

## Types

### `SolanaNetwork`

```javascript
type SolanaNetwork = 'mainnet' | 'devnet' | 'testnet'
```

### `SolanaSupportedNetworks`

A partial record mapping [`SolanaNetwork`](#solananetwork) names to RPC URL strings.

```javascript
type SolanaSupportedNetworks = Partial<Record<SolanaNetwork, string>>
```

### `SolanaConnectOptions`

Configuration options passed to [`createSolanaClient`](#createsolanaclient).

| Field                       | Type                      | Required | Description                                                                |
| --------------------------- | ------------------------- | -------- | -------------------------------------------------------------------------- |
| `dapp`                      | `object`                  | Yes      | Dapp identification and branding settings.                                 |
| `dapp.name`                 | `string`                  | Yes      | Name of your dApp.                                                         |
| `dapp.url`                  | `string`                  | No       | URL of your dApp.                                                          |
| `dapp.iconUrl`              | `string`                  | No       | Icon URL for your dApp.                                                    |
| `api`                       | `object`                  | No       | Optional API configuration.                                               |
| `api.supportedNetworks`     | `SolanaSupportedNetworks` | No       | Map of network names (`mainnet`, `devnet`, `testnet`) to RPC URLs.         |
| `debug`                     | `boolean`                 | No       | Reserved for future use; not currently forwarded to the underlying client. |
| `skipAutoRegister`          | `boolean`                 | No       | Skip auto-registering the wallet during creation (defaults to `false`).    |

### `SolanaClient`

The object returned by [`createSolanaClient`](#createsolanaclient).

| Property / Method    | Type                    | Description                                                                 |
| -------------------- | ----------------------- | --------------------------------------------------------------------------- |
| `core`               | `MultichainCore`        | The underlying MultichainCore instance.                                     |
| `getWallet()`        | `() => Wallet`          | Returns a wallet-standard compatible MetaMask wallet instance.              |
| `registerWallet()`   | `() => Promise<void>`   | Registers MetaMask with the wallet-standard registry.                       |
| `disconnect()`       | `() => Promise<void>`   | Disconnects all Solana scopes from MetaMask.                                |
