---
title: 'MetaMask Connect Solana methods'
description: Complete methods reference for MetaMask Connect Solana, including createSolanaClient, getInfuraRpcUrls, and Wallet Standard features.
keywords:
  [
    solana,
    connect,
    method,
    methods,
    dapp,
    createSolanaClient,
    getInfuraRpcUrls,
    Wallet Standard features,
    signTransaction,
    signMessage,
    API reference,
  ]
toc_max_heading_level: 2
---

# MetaMask Connect Solana methods

MetaMask Connect Solana (`@metamask/connect-solana`) exposes several methods, including:

- [`createSolanaClient`](#createsolanaclient) to initialize the client and automatically register the wallet for compatibility with the Solana Wallet Adapter ecosystem.
- [`getInfuraRpcUrls`](#getinfurarpcurls) to generate Infura RPC endpoints for Solana networks.
- [`getWallet`](#getwallet) to access [Wallet Standard features](#supported-wallet-standard-features) (`signTransaction`, `signAndSendTransaction`, `signMessage`).

The client wraps `@metamask/connect-multichain` and handles wallet discovery and session management automatically.

## `createSolanaClient`

Creates a new Solana client instance.
By default, the wallet is automatically registered with the Wallet Standard registry on creation,
making MetaMask discoverable by Solana dapps and wallet adapters.

Under the hood, `createSolanaClient` delegates to [`createMultichainClient`](../../multichain/reference/methods.md#createmultichainclient), which is a singleton.
Calling `createSolanaClient` multiple times returns the same underlying multichain core and session.

### Parameters

See [`SolanaConnectOptions`](#solanaconnectoptions).

### Returns

A promise that resolves to a [`SolanaClient`](#solanaclient) instance.
The client is a singleton; calling `createSolanaClient` again returns the same instance.

### Example

```javascript
import { createSolanaClient, getInfuraRpcUrls } from '@metamask/connect-solana'

const client = await createSolanaClient({
  dapp: {
    name: 'My Solana Dapp',
    url: 'https://mydapp.com',
  },
  api: {
    supportedNetworks: getInfuraRpcUrls({
      infuraApiKey: 'YOUR_INFURA_API_KEY',
      networks: ['mainnet', 'devnet'],
    }),
  },
})
```

## `getInfuraRpcUrls`

Generates Solana Infura RPC URLs keyed by network name.
The returned map can be passed directly to `createSolanaClient({ api: { supportedNetworks } })`.

Under the hood, this delegates to the [multichain `getInfuraRpcUrls`](/metamask-connect/multichain/reference/methods#getinfurarpcurls), which maps CAIP-2 chain IDs to Infura endpoints, then translates the result back to Solana network names.

:::note
Each chain must be activated in your [Infura dashboard](https://developer.metamask.io/) before `getInfuraRpcUrls` can generate working URLs for it.
:::

### Parameters

| Name           | Type              | Required | Description                                                        |
| -------------- | ----------------- | -------- | ------------------------------------------------------------------ |
| `infuraApiKey` | `string`          | Yes      | Your Infura API key.                                               |
| `networks`     | `SolanaNetwork[]` | Yes      | Solana networks to include (for example, `['mainnet', 'devnet']`). |

### Returns

[`SolanaSupportedNetworks`](#solanasupportednetworks), a map of network names to Infura RPC URLs.

### Example

```javascript
import { createSolanaClient, getInfuraRpcUrls } from '@metamask/connect-solana'

// Each chain must be active in your Infura dashboard
const supportedNetworks = getInfuraRpcUrls({
  infuraApiKey: 'YOUR_INFURA_API_KEY',
  networks: ['mainnet', 'devnet'],
})
// {
//   mainnet: 'https://solana-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
//   devnet: 'https://solana-devnet.infura.io/v3/YOUR_INFURA_API_KEY',
// }

const client = await createSolanaClient({
  dapp: { name: 'My Solana Dapp', url: 'https://mydapp.com' },
  api: { supportedNetworks },
})
```

## `getWallet`

Returns a Wallet Standard compatible MetaMask wallet instance.
Use this to access wallet features directly outside of the Solana Wallet Adapter.

### Returns

A Wallet Standard `Wallet` object.

### Example

```javascript
const wallet = client.getWallet()
console.log('Wallet name:', wallet.name)
```

## `registerWallet`

Registers the MetaMask wallet with the Wallet Standard registry, making it automatically
discoverable by Solana dapps.
This is a no-op if the wallet was already auto-registered during creation (that is,
`skipAutoRegister` was not set to `true`).

### Returns

A promise that resolves when registration is complete.

### Example

```javascript
const client = await createSolanaClient({
  dapp: { name: 'My Solana Dapp', url: 'https://mydapp.com' },
  skipAutoRegister: true,
})

// Register manually when ready
await client.registerWallet()
```

## `disconnect`

Disconnects all Solana scopes from MetaMask.
This only revokes the Solana-specific scopes:

- `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` (mainnet)
- `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1` (devnet)
- `solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z` (testnet)

It does not terminate the broader multichain session if non-Solana scopes (such as EVM) are also
active.

### Returns

A promise that resolves when the disconnect is complete.

### Example

```javascript
await client.disconnect()
```

## Properties

| Property | Type             | Description                             |
| -------- | ---------------- | --------------------------------------- |
| `core`   | `MultichainCore` | The underlying MultichainCore instance. |

The `core` property exposes the full multichain client, giving access to lower-level methods such as
[`connect`](../../multichain/reference/methods.md#connect),
[`getSession`](../../multichain/reference/methods.md#getsession),
[`invokeMethod`](../../multichain/reference/methods.md#invokemethod),
[`on`](../../multichain/reference/methods.md#on), and
[`off`](../../multichain/reference/methods.md#off).

### Example

```javascript
const session = await client.core.getSession()
const solAccounts = session.sessionScopes['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp']?.accounts || []
console.log('Solana accounts:', solAccounts)
```

## Supported Wallet Standard features

The wallet returned by [`getWallet`](#getwallet) implements the following
[Wallet Standard](https://github.com/wallet-standard/wallet-standard) features.
Access them via `wallet.features['<feature>']`.

| Feature                         | Description                                            |
| ------------------------------- | ------------------------------------------------------ |
| `standard:connect`              | Connect to the wallet and receive the user's accounts. |
| `standard:disconnect`           | Disconnect from the wallet.                            |
| `standard:events`               | Subscribe to account and chain change events.          |
| `solana:signMessage`            | Sign an arbitrary message (returns a signature).       |
| `solana:signTransaction`        | Sign a transaction without broadcasting it.            |
| `solana:signAndSendTransaction` | Sign a transaction and broadcast it to the network.    |

### Example

```javascript
const wallet = client.getWallet()

const { accounts } = await wallet.features['standard:connect'].connect()

const message = new TextEncoder().encode('Hello Solana')
const [{ signature }] = await wallet.features['solana:signMessage'].signMessage({
  account: accounts[0],
  message,
})
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

| Field                   | Type                      | Required | Description                                                                |
| ----------------------- | ------------------------- | -------- | -------------------------------------------------------------------------- |
| `dapp`                  | `object`                  | Yes      | Dapp identification and branding settings.                                 |
| `dapp.name`             | `string`                  | Yes      | Name of your dapp.                                                         |
| `dapp.url`              | `string`                  | No       | URL of your dapp.                                                          |
| `dapp.iconUrl`          | `string`                  | No       | URL of your dapp icon.                                                     |
| `api`                   | `object`                  | No       | Optional API configuration.                                                |
| `api.supportedNetworks` | `SolanaSupportedNetworks` | No       | Map of network names (`mainnet`, `devnet`, `testnet`) to RPC URLs.         |
| `debug`                 | `boolean`                 | No       | Reserved for future use; not currently forwarded to the underlying client. |
| `skipAutoRegister`      | `boolean`                 | No       | Skips auto-registering the wallet during creation. The default is `false`. |

:::note
`createSolanaClient` does not accept `eventHandlers`.
To listen for lower-level multichain events (such as session changes), use `client.core.on` after
creating the client. See the [multichain event methods](../../multichain/reference/methods.md#on).
:::

### `SolanaClient`

The object returned by [`createSolanaClient`](#createsolanaclient).

| Property / Method | Type                  | Description                                                    |
| ----------------- | --------------------- | -------------------------------------------------------------- |
| `core`            | `MultichainCore`      | The underlying `MultichainCore` instance.                      |
| `getWallet`       | `() => Wallet`        | Returns a Wallet Standard compatible MetaMask wallet instance. |
| `registerWallet`  | `() => Promise<void>` | Registers MetaMask with the Wallet Standard registry.          |
| `disconnect`      | `() => Promise<void>` | Disconnects all Solana scopes from MetaMask.                   |

## Next steps

- Follow the [JavaScript quickstart](../quickstart/javascript.md) to set up MetaMask Connect Solana in a dapp.
- [Send a legacy transaction](../guides/send-transactions/legacy.md) using the `signAndSendTransaction` Wallet Standard feature.
- [Sign messages](../guides/sign-data/sign-message.md) using the `signMessage` Wallet Standard feature.
- See the [multichain methods](../../multichain/reference/methods.md) for the lower-level multichain client API.
