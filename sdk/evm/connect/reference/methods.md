---
description: Methods reference for MM Connect.
keywords: [SDK, method, methods, dapp]
toc_max_heading_level: 2
---

# MM Connect methods

MM Connect provides several convenience methods for connecting to and interacting with MetaMask, including the following.

## `connect`

Connects to MetaMask and requests account access.

### Returns

A promise that resolves to an array of account addresses.

### Example

```javascript
const accounts = await sdk.connect();
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
const signature = await sdk.connectAndSign({ 
  msg: "Hello from my dapp!" 
});
console.log("Signature:", signature);
```

## `connectWith`

Connects to MetaMask and executes a specific [JSON-RPC method](/wallet/reference/json-rpc-methods).

### Parameters

- `rpc`: `object` - The RPC method to execute.
  - `method`: `string` - The RPC method name.
  - `params`: `any[]` - The parameters for the RPC method.

### Returns

A promise that resolves to the result of the RPC call.

### Example

```javascript
const result = await sdk.connectWith({
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
const provider = sdk.getProvider();
if (provider) {
  // Use the provider for RPC calls
  const accounts = await provider.request({
    method: "eth_requestAccounts"
  });
}
```

## `isInitialized`

Checks if the SDK has been initialized.

### Returns

`True` if the SDK is initialized, `false` otherwise.

### Example

```javascript
if (sdk.isInitialized()) {
  console.log("SDK is ready to use");
}
```

## `terminate`

Terminates the MetaMask connection, switching back to the injected provider if connected via extension.

:::note
The `disconnect()` SDK method is deprecated.
Use `terminate()` instead.
:::

### Example

```javascript
await sdk.terminate();
console.log("Connection terminated");
```
