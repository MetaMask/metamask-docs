---
description: Methods reference for MetaMask Connect EVM.
keywords: [evm, connect, method, methods, dapp]
toc_max_heading_level: 2
sidebar_label: EVM SDK methods
---

# MetaMask Connect EVM SDK methods

MetaMask Connect EVM (`@metamask/connect-evm`) provides several convenience methods for connecting to and interacting with MetaMask, including the following.

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

A promise that resolves to an object containing `accounts` (an array of account addresses), `chainId`, and `signature`.

### Example

```javascript
const { accounts, chainId, signature } = await evmClient.connectAndSign({
  message: 'Sign in to My DApp',
  chainIds: ['0x1'],
})
console.log('Connected:', accounts[0])
console.log('Signature:', signature)
```

## `connectWith`

Connects to MetaMask and executes a specific [JSON-RPC method](json-rpc-api/index.md) in a single user approval.

### Parameters

| Name               | Type                | Required | Description                                                                                                      |
| ------------------ | ------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `options.method`   | `string`            | Yes      | The JSON-RPC method name.                                                                                        |
| `options.params`   | `any[] \| Function` | Yes      | The parameters for the method. Can be a function `(accounts: Address[]) => any[]` for dynamic account injection. |
| `options.chainIds` | `Hex[]`             | No       | Array of hex chain IDs to request permission for (defaults to `['0x1']`).                                        |

### Returns

A promise that resolves to an object containing `accounts`, `chainId`, and `result` (the return value of the RPC call).

### Example

```javascript
const { accounts, chainId, result } = await evmClient.connectWith({
  method: 'eth_sendTransaction',
  params: [
    {
      from: '0xYourAddress',
      to: '0xRecipientAddress',
      value: '0x2386F26FC10000',
    },
  ],
  chainIds: ['0x1'],
})
console.log('Transaction hash:', result)
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
The provider is available immediately after `createEVMClient` resolves, even before calling `connect()`.
Read-only RPC calls work immediately; account-dependent calls require `connect()` first.

### Returns

An EIP-1193 compatible provider object.

### Example

```javascript
const provider = evmClient.getProvider()
const chainId = await provider.request({ method: 'eth_chainId' })
console.log('Current chain:', chainId)
```

## `isInitialized`

Checks if MetaMask Connect has been initialized.

### Returns

`true` if MetaMask Connect is initialized, `false` otherwise.

### Example

```javascript
if (evmClient.isInitialized()) {
  console.log('SDK is ready to use')
}
```

## `disconnect`

Disconnects all EVM (`eip155`) scopes from MetaMask and cleans up local state.
This only revokes the EVM-specific scopes currently held in the session; it does not terminate the broader multichain session if non-EVM scopes (such as Solana) are also active.

### Example

```javascript
await evmClient.disconnect()
```
