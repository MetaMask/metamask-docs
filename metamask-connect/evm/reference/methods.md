---
title: 'MetaMask Connect EVM methods'
description: Complete API reference for MetaMask Connect EVM methods including connect, connectAndSign, connectWith, getProvider, getInfuraRpcUrls, and disconnect.
keywords:
  [
    evm,
    connect,
    method,
    methods,
    dapp,
    connectAndSign,
    connectWith,
    getProvider,
    getInfuraRpcUrls,
    disconnect,
    EIP-1193,
    API reference,
  ]
toc_max_heading_level: 2
---

# MetaMask Connect EVM methods

MetaMask Connect EVM (`@metamask/connect-evm`) exposes five primary methods:

- `connect` to establish a wallet session.
- `connectAndSign` to connect and sign a message in one step.
- `connectWith` to connect and execute an RPC call atomically.
- `getProvider` to obtain the EIP-1193 provider for arbitrary JSON-RPC requests.
- `disconnect` to end the session.

## `connect`

Connects to MetaMask and requests account access.

### Parameters

| Name                   | Type      | Required | Description                                                                                                                                                                        |
| ---------------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options.chainIds`     | `Hex[]`   | No       | Array of hex chain IDs to request permission for (defaults to `['0x1']` if not provided). Ethereum Mainnet (`0x1`) is always included in the request regardless of what is passed. |
| `options.account`      | `string`  | No       | Specific account address to connect.                                                                                                                                               |
| `options.forceRequest` | `boolean` | No       | Force a new connection request even if already connected.                                                                                                                          |

### Returns

A promise that resolves to an object containing `accounts` (an array of account addresses) and `chainId`.

### Example

```javascript
const { accounts, chainId } = await evmClient.connect({
  chainIds: ['0x1', '0x89'],
})
console.log('Connected accounts:', accounts)
```

## `connectAndSign`

Connects to MetaMask and signs a `personal_sign` message in a single user approval.

### Parameters

| Name               | Type     | Required | Description                                                               |
| ------------------ | -------- | -------- | ------------------------------------------------------------------------- |
| `options.message`  | `string` | Yes      | The message to sign.                                                      |
| `options.chainIds` | `Hex[]`  | No       | Array of hex chain IDs to request permission for (defaults to `['0x1']`). |

### Returns

A promise that resolves to the signature as a hex string.

:::tip
To access the connected accounts and chain ID alongside the signature, use the `connectAndSign` event handler
when [initializing the client](../quickstart/javascript.md):

```javascript
eventHandlers: {
  connectAndSign: ({ accounts, chainId, signResponse }) => {
    console.log('Accounts:', accounts, 'Chain:', chainId, 'Signature:', signResponse)
  },
}
```

:::

### Example

```javascript
const signature = await evmClient.connectAndSign({
  message: 'Sign in to My DApp',
  chainIds: ['0x1'],
})
console.log('Signature:', signature)
```

## `connectWith`

Connects to MetaMask and executes a specific [JSON-RPC method](json-rpc-api/index.md) in a single user approval.

### Parameters

| Name                   | Type                                           | Required | Description                                                                                              |
| ---------------------- | ---------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `options.method`       | `string`                                       | Yes      | The JSON-RPC method name.                                                                                |
| `options.params`       | `unknown[] \| (account: Address) => unknown[]` | Yes      | The parameters for the method. Can be a function that receives the connected account and returns params. |
| `options.chainIds`     | `Hex[]`                                        | No       | Array of hex chain IDs to request permission for (defaults to `['0x1']`).                                |
| `options.account`      | `string`                                       | No       | Specific account address to connect.                                                                     |
| `options.forceRequest` | `boolean`                                      | No       | Force a new connection request even if already connected.                                                |

### Returns

A promise that resolves to the result of the RPC method invocation.

:::tip
To access the connected accounts and chain ID alongside the result, use the `connectWith` event handler
when [initializing the client](../quickstart/javascript.md):

```javascript
eventHandlers: {
  connectWith: ({ accounts, chainId, connectWithResponse }) => {
    console.log('Accounts:', accounts, 'Chain:', chainId, 'Result:', connectWithResponse)
  },
}
```

:::

### Example

```javascript
const txHash = await evmClient.connectWith({
  method: 'eth_sendTransaction',
  params: account => [
    {
      from: account,
      to: '0xRecipientAddress',
      value: '0x2386F26FC10000',
    },
  ],
  chainIds: ['0x1'],
})
console.log('Transaction hash:', txHash)
```

## `switchChain`

Switches the active chain on the EVM client.
If the chain is not already added to the user's MetaMask wallet, the optional `chainConfiguration`
parameter triggers a `wallet_addEthereumChain` request as a fallback.

### Parameters

| Name                                           | Type       | Required | Description                                                       |
| ---------------------------------------------- | ---------- | -------- | ----------------------------------------------------------------- |
| `options.chainId`                              | `Hex`      | Yes      | The hex chain ID to switch to.                                    |
| `options.chainConfiguration`                   | `object`   | No       | Fallback chain details if the chain is not yet added to MetaMask. |
| `options.chainConfiguration.chainName`         | `string`   | Yes      | Human-readable chain name.                                        |
| `options.chainConfiguration.nativeCurrency`    | `object`   | Yes      | `{ name, symbol, decimals }` for the native token.                |
| `options.chainConfiguration.rpcUrls`           | `string[]` | Yes      | Array of RPC endpoint URLs.                                       |
| `options.chainConfiguration.blockExplorerUrls` | `string[]` | No       | Array of block explorer URLs.                                     |

### Example

```javascript
await evmClient.switchChain({
  chainId: '0xa4b1',
  chainConfiguration: {
    chainName: 'Arbitrum One',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    blockExplorerUrls: ['https://arbiscan.io'],
  },
})
```

## `getProvider`

Returns the active EIP-1193 Ethereum provider object.
The provider is available immediately after `createEVMClient` resolves, even before calling `connect`.
Read-only RPC calls work immediately; account-dependent calls require `connect` first.

### Returns

An EIP-1193 compatible provider object.

### Example

```javascript
const provider = evmClient.getProvider()
const chainId = await provider.request({ method: 'eth_chainId' })
console.log('Current chain:', chainId)
```

## `getChainId`

Returns the currently selected chain ID.

### Returns

`Hex | undefined` - The currently selected chain ID as a hex string, or `undefined` if not connected.

### Example

```javascript
const chainId = evmClient.getChainId()
console.log('Current chain:', chainId) // e.g., '0x1'
```

## `getAccount`

Returns the currently selected account.

### Returns

`Address | undefined` - The currently selected account address, or `undefined` if not connected.

### Example

```javascript
const account = evmClient.getAccount()
console.log('Current account:', account) // e.g., '0x...'
```

## `disconnect`

Disconnects all EVM (`eip155`) scopes from MetaMask and cleans up local state.
This only revokes the EVM-specific scopes currently held in the session; it does not terminate the broader multichain session if non-EVM scopes (such as Solana) are also active.

:::tip Multichain partial disconnect
If your dapp also uses Solana via the [multichain client](../../multichain/index.md), calling
`disconnect` on the EVM client only revokes EVM (`eip155`) scopes.
Non-EVM scopes remain active, so the user stays connected to Solana.
:::

### Example

```javascript
await evmClient.disconnect()
```

## `getInfuraRpcUrls`

Generates a map of Infura RPC URLs keyed by hex chain ID.
Use this utility to populate `api.supportedNetworks` when calling `createEVMClient`.

:::note
Each chain must be activated in your [Infura dashboard](https://developer.metamask.io/) before `getInfuraRpcUrls` can generate working URLs for it.
:::

### Parameters

| Name           | Type       | Required | Description                                                                                                |
| -------------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `infuraApiKey` | `string`   | Yes      | Your Infura API key.                                                                                       |
| `chainIds`     | `string[]` | No       | Array of hex chain IDs to include (e.g. `['0x1', '0x89']`). If omitted, all supported chains are included. |

### Returns

A `Record<string, string>` mapping hex chain IDs to Infura RPC URLs. When `chainIds` is provided, only matching chains are included.

### Example

```javascript
import { createEVMClient, getInfuraRpcUrls } from '@metamask/connect-evm'

const evmClient = await createEVMClient({
  dapp: { name: 'My DApp', url: window.location.href },
  api: {
    supportedNetworks: {
      // Each chain must be active in your Infura dashboard
      ...getInfuraRpcUrls({ infuraApiKey: 'YOUR_INFURA_API_KEY', chainIds: ['0x1', '0xaa36a7'] }),
    },
  },
})
```

## Properties

The EVM client exposes the following read-only properties:

| Property          | Type                   | Description                                                                                     |
| ----------------- | ---------------------- | ----------------------------------------------------------------------------------------------- |
| `accounts`        | `Address[]`            | Currently permitted accounts.                                                                   |
| `selectedAccount` | `Address \| undefined` | Currently selected account (first in `accounts`).                                               |
| `selectedChainId` | `Hex \| undefined`     | Currently selected chain ID as a hex string.                                                    |
| `status`          | `ConnectionStatus`     | Connection status: `'loaded'`, `'pending'`, `'connecting'`, `'connected'`, or `'disconnected'`. |

### Example

```javascript
console.log('Status:', evmClient.status)
console.log('Accounts:', evmClient.accounts)
console.log('Selected account:', evmClient.selectedAccount)
console.log('Selected chain:', evmClient.selectedChainId)
```
