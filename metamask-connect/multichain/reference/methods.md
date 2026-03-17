---
title: 'MetaMask Connect Multichain Methods Reference'
description: Complete methods reference for MetaMask Connect Multichain, including connect, getSession, invokeMethod, disconnect, and session event handlers.
keywords:
  [
    multichain,
    evm,
    solana,
    connect,
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

# MetaMask Connect Multichain SDK methods

MetaMask Connect Multichain (`@metamask/connect-multichain`) exposes four primary methods: `connect()` to create a CAIP-25 session across multiple chains, `getSession()` to retrieve authorized scopes and accounts, `invokeMethod()` to send RPC requests to any chain in the session, and `disconnect()` to end the session. It also provides event handlers for session changes.

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

### Returns

A promise that resolves to the current `Session` object containing `sessionScopes` — a map of CAIP-2 scope IDs to their approved accounts.

### Example

```javascript
await client.connect(['eip155:1', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'], [])

const session = await client.getSession()
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

- **No arguments** -- revokes all scopes and fully tears down the session.
- **With `scopes`** -- revokes only the specified scopes. If other scopes remain, the session stays alive.

### Parameters

| Name     | Type      | Required | Description                                                                                                |
| -------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `scopes` | `Scope[]` | No       | Array of [CAIP-2](https://chainagnostic.org/CAIPs/caip-2) chain identifiers to revoke. Omit to revoke all. |

### Returns

A promise that resolves when the disconnect is complete.

### Example

```javascript
// Fully disconnect -- revokes all scopes and ends the session
await client.disconnect()

// Selective disconnect -- revokes only Solana, keeps EVM scopes active
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
Use this utility to populate `api.supportedNetworks` when calling `createMultichainClient`.

### Parameters

| Name           | Type     | Required | Description          |
| -------------- | -------- | -------- | -------------------- |
| `infuraApiKey` | `string` | Yes      | Your Infura API key. |

### Returns

A `Record<string, string>` mapping CAIP-2 chain IDs to Infura RPC URLs.

### Example

```javascript
import { createMultichainClient, getInfuraRpcUrls } from '@metamask/connect-multichain'

const client = await createMultichainClient({
  dapp: { name: 'My DApp', url: 'https://mydapp.com' },
  api: {
    supportedNetworks: {
      ...getInfuraRpcUrls('YOUR_INFURA_API_KEY'),
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

## Next steps

- [JavaScript quickstart](../quickstart/javascript.md) to set up MetaMask Connect Multichain in a dapp.
- [Send transactions on EVM and Solana](../guides/send-transactions.md) using `invokeMethod`.
- [Sign messages on EVM and Solana](../guides/sign-transactions.md) using `invokeMethod`.
- [Multichain API reference](api.md) for the underlying CAIP-25 protocol methods.
