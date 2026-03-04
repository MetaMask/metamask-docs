---
description: Methods reference for MetaMask Connect.
keywords: [SDK, method, methods, dapp]
toc_max_heading_level: 2
---

# MetaMask Connect methods

MetaMask Connect provides several convenience methods for connecting to and interacting with MetaMask, including the following.

## `connect`

Connects to MetaMask and requests account access.

### Parameters

| Name                   | Type      | Required | Description                                                                                                                                                                              |
| ---------------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options.chainIds`     | `Hex[]`   | No       | Array of hex chain IDs to request permission for (defaults to `['0x1']` if not provided). Ethereum Mainnet (`0x1`) is always included in the request regardless of what is passed. |
| `options.account`      | `string`  | No       | Specific account address to connect.                                                                                                                                                     |
| `options.forceRequest` | `boolean` | No       | Force a new connection request even if already connected.                                                                                                                                |

### Returns

A promise that resolves to an object containing `accounts` (an array of account addresses) and `chainId`.

### Example

```javascript
const { accounts, chainId } = await evmClient.connect({
  chainIds: ['0x1', '0x89'],
});
console.log("Connected accounts:", accounts);
```

## `connectAndSign`

Connects to MetaMask and signs a message in a single operation.

### Parameters

- `msg`: `string` - The message to sign.

### Returns

A promise that resolves to the signature of the signed message.

### Example

```javascript
const signature = await evmClient.connectAndSign({ 
  msg: "Hello from my dapp!" 
});
console.log("Signature:", signature);
```

## `connectWith`

Connects to MetaMask and executes a specific [JSON-RPC method](json-rpc-api/index.md).

### Parameters

- `rpc`: `object` - The RPC method to execute.
  - `method`: `string` - The RPC method name.
  - `params`: `any[]` - The parameters for the RPC method.

### Returns

A promise that resolves to the result of the RPC call.

### Example

```javascript
const result = await evmClient.connectWith({
  rpc: {
    method: "eth_getBalance",
    params: ["0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6", "latest"]
  }
});
console.log("Balance:", result);
```

## `getProvider`

Returns the active Ethereum provider object.

### Returns

The active provider, or undefined if no provider is found.

### Example

```javascript
const provider = evmClient.getProvider();
if (provider) {
  // Use the provider for RPC calls
  const accounts = await provider.request({
    method: "eth_requestAccounts"
  });
}
```

## `isInitialized`

Checks if MetaMask Connect has been initialized.

### Returns

`True` if MetaMask Connect is initialized, `false` otherwise.

### Example

```javascript
if (evmClient.isInitialized()) {
  console.log("SDK is ready to use");
}
```

## `disconnect`

Disconnects all EVM (`eip155`) scopes from MetaMask and cleans up local state.
This only revokes the EVM-specific scopes currently held in the session; it does not terminate the broader multichain session if non-EVM scopes (such as Solana) are also active.

### Example

```javascript
await evmClient.disconnect();
```
