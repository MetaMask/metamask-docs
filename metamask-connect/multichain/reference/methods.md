---
title: 'MetaMask Connect Multichain methods'
description: Complete methods reference for MetaMask Connect Multichain, including connect, getSession, invokeMethod, disconnect, and session event handlers.
keywords:
  [
    multichain,
    evm,
    solana,
    connect,
    createMultichainClient,
    method,
    methods,
    dapp,
    getSession,
    invokeMethod,
    disconnect,
    session events,
    API reference,
  ]
toc_max_heading_level: 2
---

# MetaMask Connect Multichain methods

MetaMask Connect Multichain (`@metamask/connect-multichain`) exposes several methods, including:

- [`createMultichainClient`](#createmultichainclient) to initialize the client.
- [`connect`](#connect) to create a [CAIP-25](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) session across multiple chains.
- [`getSession`](#getsession) to retrieve authorized scopes and accounts.
- [`invokeMethod`](#invokemethod) to send RPC requests to any chain in the session.
- [`disconnect`](#disconnect) to end the session.

It also provides event handlers for session changes.
When building with MetaMask Connect Multichain, use these high-level methods to create and manage sessions.

:::note
These high-level methods wrap the standard [Multichain API](api.md) methods.
Use those standard methods if you're building your own client or need lower-level control.
:::

## `createMultichainClient`

Creates a new multichain client instance.

### Parameters

| Name                       | Type                         | Required | Description                                                                                                                                                                      |
| -------------------------- | ---------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dapp.name`                | `string`                     | Yes      | Name of your dapp.                                                                                                                                                               |
| `dapp.url`                 | `string`                     | No       | URL of your dapp. In browsers this is often set automatically; required in Node.js and React Native.                                                                             |
| `dapp.iconUrl`             | `string`                     | No       | URL of your dapp icon.                                                                                                                                                           |
| `dapp.base64Icon`          | `string`                     | No       | Base64-encoded icon when a hosted URL is unavailable (for example, some React Native setups).                                                                                    |
| `api.supportedNetworks`    | `Record<string, string>`     | No       | Map of [CAIP-2](https://chainagnostic.org/CAIPs/caip-2) chain IDs to RPC URLs. Use [`getInfuraRpcUrls`](#getinfurarpcurls) to generate Infura URLs, then merge custom endpoints. |
| `ui.headless`              | `boolean`                    | No       | Enables or disables [headless mode](../guides/headless-mode.md). The default is `false`.                                                                                         |
| `ui.preferExtension`       | `boolean`                    | No       | Directly connects through the MetaMask extension when it's installed. The default is `true`.                                                                                     |
| `mobile.preferredOpenLink` | `(deeplink: string) => void` | No       | A function that's called to open a deeplink to the MetaMask Mobile App. Required in React Native.                                                                                |
| `mobile.useDeeplink`       | `boolean`                    | No       | Controls use of deeplinks for mobile connection flows.                                                                                                                           |

### Returns

Returns a promise that resolves to a multichain client instance.
The client is a singleton; calling `createMultichainClient` again returns the same instance.

### Example

```javascript
import { createMultichainClient, getInfuraRpcUrls } from '@metamask/connect-multichain'

const client = await createMultichainClient({
  dapp: {
    name: 'My Multichain Dapp',
    url: window.location.href,
    iconUrl: 'https://mydapp.com/icon.png',
  },
  api: {
    supportedNetworks: {
      ...getInfuraRpcUrls({ infuraApiKey: process.env.INFURA_API_KEY }),
      'eip155:137': 'https://polygon-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
    },
  },
})
```

## `connect`

Connects to MetaMask with specified [CAIP-2](https://chainagnostic.org/CAIPs/caip-2) chain scopes.
The user sees a single approval prompt for all requested chains.

### Parameters

| Name                | Type                | Required | Description                                                                                                    |
| ------------------- | ------------------- | -------- | -------------------------------------------------------------------------------------------------------------- |
| `scopes`            | `Scope[]`           | Yes      | Array of [CAIP-2](https://chainagnostic.org/CAIPs/caip-2) chain identifiers to request permission for.         |
| `caipAccountIds`    | `CaipAccountId[]`   | Yes      | Array of [CAIP-10](https://chainagnostic.org/CAIPs/caip-10) account identifiers to request. Pass `[]` for any. |
| `sessionProperties` | `SessionProperties` | No       | Additional session properties.                                                                                 |
| `forceRequest`      | `boolean`           | No       | Force a new connection request even if already connected.                                                      |

### Returns

A promise that resolves when the connection is established.

### Example

```javascript
await client.connect(['eip155:1', 'eip155:137', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'], [])
```

## `getSession`

Returns the current multichain session, including the approved scopes and accounts.
Call this after [`connect`](#connect) to retrieve the accounts the user authorized.

Access `getSession` through the `provider` property on the multichain client
(`client.provider.getSession()`).

### Returns

A promise that resolves to the current `Session` object containing `sessionScopes`, a map of
CAIP-2 scope IDs to their approved accounts.

### Example

```javascript
await client.connect(['eip155:1', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'], [])

const session = await client.provider.getSession()
const ethAccounts = session.sessionScopes['eip155:1']?.accounts || []
const solAccounts = session.sessionScopes['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp']?.accounts || []
```

## `invokeMethod`

Calls the underlying [`wallet_invokeMethod`](api.md#wallet_invokemethod) Multichain API method to send an RPC request to a specific chain in the active session.
Use this to interact with any chain the user has approved, without switching connections.

### Parameters

| Name                     | Type        | Required | Description                                                                                    |
| ------------------------ | ----------- | -------- | ---------------------------------------------------------------------------------------------- |
| `options.scope`          | `Scope`     | Yes      | The [CAIP-2](https://chainagnostic.org/CAIPs/caip-2) chain identifier to invoke the method on. |
| `options.request.method` | `string`    | Yes      | The RPC method name.                                                                           |
| `options.request.params` | `unknown[]` | No       | The method parameters.                                                                         |

### Returns

A promise that resolves to the result of the RPC method call.

### Example

```javascript
const balance = await client.invokeMethod({
  scope: 'eip155:1',
  request: {
    method: 'eth_getBalance',
    params: ['0xYourAddress', 'latest'],
  },
})
console.log('ETH balance:', balance)
```

## `disconnect`

Disconnects from MetaMask.
The behavior depends on whether `scopes` are provided:

- **No arguments**: revokes all scopes and fully tears down the session.
- **With `scopes`**: revokes only the specified scopes. If other scopes remain, the session stays alive.

### Parameters

| Name     | Type      | Required | Description                                                                                                |
| -------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `scopes` | `Scope[]` | No       | Array of [CAIP-2](https://chainagnostic.org/CAIPs/caip-2) chain identifiers to revoke. Omit to revoke all. |

### Returns

A promise that resolves when the disconnect is complete.

### Example

```javascript
// Fully disconnect — revokes all scopes and ends the session
await client.disconnect()

// Selective disconnect — revokes only Solana, keeps EVM scopes active
await client.disconnect(['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'])
```

## `on`

Registers an event handler.
See [Events](#events) for available event names.

### Parameters

| Name      | Type       | Required | Description                                                |
| --------- | ---------- | -------- | ---------------------------------------------------------- |
| `event`   | `string`   | Yes      | The event name to listen for.                              |
| `handler` | `Function` | Yes      | The callback function to invoke when the event is emitted. |

### Example

```javascript
client.on('wallet_sessionChanged', session => {
  console.log('Session updated:', session)
})
```

## `off`

Removes a previously registered event handler.

### Parameters

| Name      | Type       | Required | Description                           |
| --------- | ---------- | -------- | ------------------------------------- |
| `event`   | `string`   | Yes      | The event name to stop listening for. |
| `handler` | `Function` | Yes      | The callback function to remove.      |

### Example

```javascript
const handler = session => {
  console.log('Session updated:', session)
}

client.on('wallet_sessionChanged', handler)

// Later, remove the handler
client.off('wallet_sessionChanged', handler)
```

## `getInfuraRpcUrls`

Generates a map of Infura RPC URLs keyed by [CAIP-2](https://chainagnostic.org/CAIPs/caip-2) chain ID.
When called without `caipChainIds`, the returned map includes all [supported chains](#supported-chains).
Use this utility to populate `api.supportedNetworks` when calling `createMultichainClient`.

:::tip Single-ecosystem dapps
If your dapp targets only EVM, use the
[`getInfuraRpcUrls`](../../evm/reference/methods.md#getinfurarpcurls) helper in `@metamask/connect-evm`
instead. It returns hex-chain-ID-keyed URLs that can be passed directly to `createEVMClient`.

If your dapp targets only Solana, use the
[`getInfuraRpcUrls`](../../solana/reference/methods.md#getinfurarpcurls) helper in `@metamask/connect-solana`
instead. It returns network-name-keyed URLs (`mainnet`, `devnet`) that can be passed directly to
`createSolanaClient`.
:::

### Parameters

| Name           | Type       | Required | Description                                                                                                                                         |
| -------------- | ---------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `infuraApiKey` | `string`   | Yes      | Your Infura API key.                                                                                                                                |
| `caipChainIds` | `string[]` | No       | Array of [CAIP-2](https://chainagnostic.org/CAIPs/caip-2) chain IDs to include. If omitted, all [supported chains](#supported-chains) are included. |

### Returns

A `Record<string, string>` mapping CAIP-2 chain IDs to Infura RPC URLs. When `caipChainIds` is provided, only matching chains are included.

### Supported chains

The following chains are included by default when `caipChainIds` is omitted.

| Ecosystem  | Network | CAIP-2 chain ID                           |
| ---------- | ------- | ----------------------------------------- |
| Ethereum   | Mainnet | `eip155:1`                                |
| Ethereum   | Sepolia | `eip155:11155111`                         |
| Ethereum   | Hoodi   | `eip155:560048`                           |
| Linea      | Mainnet | `eip155:59144`                            |
| Linea      | Sepolia | `eip155:59141`                            |
| Polygon    | Mainnet | `eip155:137`                              |
| Polygon    | Amoy    | `eip155:80002`                            |
| Optimism   | Mainnet | `eip155:10`                               |
| Optimism   | Sepolia | `eip155:11155420`                         |
| Arbitrum   | Mainnet | `eip155:42161`                            |
| Arbitrum   | Sepolia | `eip155:421614`                           |
| Base       | Mainnet | `eip155:8453`                             |
| Base       | Sepolia | `eip155:84532`                            |
| Blast      | Mainnet | `eip155:81457`                            |
| Blast      | Sepolia | `eip155:168587773`                        |
| ZKsync     | Mainnet | `eip155:324`                              |
| ZKsync     | Sepolia | `eip155:300`                              |
| BSC        | Mainnet | `eip155:56`                               |
| BSC        | Testnet | `eip155:97`                               |
| opBNB      | Mainnet | `eip155:204`                              |
| opBNB      | Testnet | `eip155:5611`                             |
| Scroll     | Mainnet | `eip155:534352`                           |
| Scroll     | Sepolia | `eip155:534351`                           |
| Mantle     | Mainnet | `eip155:5000`                             |
| Mantle     | Sepolia | `eip155:5003`                             |
| Sei        | Mainnet | `eip155:1329`                             |
| Sei        | Testnet | `eip155:713715`                           |
| Swellchain | Mainnet | `eip155:1923`                             |
| Swellchain | Testnet | `eip155:1924`                             |
| Unichain   | Mainnet | `eip155:130`                              |
| Unichain   | Sepolia | `eip155:1301`                             |
| Hemi       | Mainnet | `eip155:43111`                            |
| Hemi       | Testnet | `eip155:743111`                           |
| MegaETH    | Mainnet | `eip155:6342`                             |
| MegaETH    | Testnet | `eip155:6342001`                          |
| Monad      | Mainnet | `eip155:143`                              |
| Monad      | Testnet | `eip155:10143`                            |
| Palm       | Mainnet | `eip155:11297108109`                      |
| Avalanche  | Mainnet | `eip155:43114`                            |
| Avalanche  | Fuji    | `eip155:43113`                            |
| Celo       | Mainnet | `eip155:42220`                            |
| Celo       | Sepolia | `eip155:44787`                            |
| Solana     | Mainnet | `solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp` |
| Solana     | Devnet  | `solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1` |

:::note
Each chain must be activated in your [Infura dashboard](https://developer.metamask.io/) before `getInfuraRpcUrls` can generate working URLs for it.
:::

### Example

Include all supported chains:

```javascript
import { createMultichainClient, getInfuraRpcUrls } from '@metamask/connect-multichain'

const client = await createMultichainClient({
  dapp: { name: 'My Dapp', url: 'https://mydapp.com' },
  api: {
    supportedNetworks: {
      ...getInfuraRpcUrls({ infuraApiKey: 'YOUR_INFURA_API_KEY' }),
    },
  },
})
```

Include only specific chains using `caipChainIds`:

```javascript
import { createMultichainClient, getInfuraRpcUrls } from '@metamask/connect-multichain'

const client = await createMultichainClient({
  dapp: { name: 'My Dapp', url: 'https://mydapp.com' },
  api: {
    supportedNetworks: {
      // Each chain must be active in your Infura dashboard
      ...getInfuraRpcUrls({
        infuraApiKey: 'YOUR_INFURA_API_KEY',
        caipChainIds: ['eip155:1', 'eip155:137', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'],
      }),
    },
  },
})
```

## Properties

| Property    | Type                  | Description                                                                                     |
| ----------- | --------------------- | ----------------------------------------------------------------------------------------------- |
| `status`    | `ConnectionStatus`    | Connection status: `'loaded'`, `'pending'`, `'connecting'`, `'connected'`, or `'disconnected'`. |
| `provider`  | `MultichainApiClient` | The underlying Multichain API client.                                                           |
| `transport` | `ExtendedTransport`   | The active transport layer.                                                                     |

## Events

Register event handlers using [`on`](#on) and remove them with [`off`](#off).

| Event                   | Payload            | Description                                                          |
| ----------------------- | ------------------ | -------------------------------------------------------------------- |
| `wallet_sessionChanged` | `Session`          | Fired when session scopes or accounts change.                        |
| `display_uri`           | `string`           | Fired with a URI for custom QR code implementations (headless mode). |
| `stateChanged`          | `ConnectionStatus` | Fired when the connection status changes.                            |

### Example

```javascript
client.on('wallet_sessionChanged', session => {
  console.log('Session updated:', session)
})

client.on('display_uri', uri => {
  // Display a custom QR code with this URI
  displayMyCustomQRCode(uri)
})

client.on('stateChanged', status => {
  console.log('Connection status:', status)
})
```

## Error classes

`@metamask/connect-multichain` exports typed error classes for granular error handling:

| Class           | Description                                                   |
| --------------- | ------------------------------------------------------------- |
| `RpcError`      | JSON-RPC errors from the wallet (includes `code` and `data`). |
| `ProtocolError` | Connection protocol failures (transport, pairing, handshake). |
| `StorageError`  | Session persistence issues (read/write failures).             |

### Example

```javascript
import { ProtocolError, RpcError, StorageError } from '@metamask/connect-multichain'

try {
  await client.connect(['eip155:1'], [])
} catch (err) {
  if (err instanceof RpcError) {
    // Check err.code for specific RPC error codes (4001, -32002, etc.)
  } else if (err instanceof ProtocolError) {
    // Connection protocol failure
  } else if (err instanceof StorageError) {
    // Session persistence issue
  }
}
```

## Next steps

- Follow the [JavaScript quickstart](../quickstart/javascript.md) to set up MetaMask Connect Multichain in a dapp.
- [Send transactions on EVM and Solana](../guides/send-transactions.md) using `invokeMethod`.
- [Sign messages on EVM and Solana](../guides/sign-transactions.md) using `invokeMethod`.
- [Use headless mode](../guides/headless-mode.md) for custom QR code rendering.
- See the [Multichain API reference](api.md) for the underlying CAIP-25 protocol methods.
