---
description: See the MetaMask Ethereum provider API reference.
sidebar_position: 4
---

# Ethereum provider API

This page is a reference for the Ethereum provider API of MetaMask's [Wallet API](../concepts/wallet-api.md).
MetaMask injects the provider API into websites visited by its users using the `window.ethereum` provider object.
You can use the provider [properties](#properties), [methods](#methods), and [events](#events) in your dapp.

:::info Note
MetaMask supports [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), which introduces an
alternative wallet detection mechanism to the `window.ethereum` injected provider.
This alternative mechanism enables dapps to support [wallet interoperability](../concepts/wallet-interoperability.md)
by discovering multiple injected wallet providers in a user's browser.
We recommend [using this mechanism to connect to MetaMask](../connect/index.md).

You can access the provider API using the selected EIP-6963 provider object.
Throughout this documentation, we refer to the selected provider using `provider`.
:::

## Properties

### `isMetaMask`

This property is `true` if the user has MetaMask installed, and `false` otherwise.

:::note
This property is non-standard.
Non-MetaMask providers may also set this property to `true`.
:::

#### Example

```typescript
provider.isMetaMask // Or window.ethereum.isMetaMask if you don't support EIP-6963.
```

## Methods

### `isConnected()`

Indicates whether the provider is connected to the current chain.
If the provider isn't connected, the page must be reloaded to re-establish the connection.
See the [`connect`](#connect) and [`disconnect`](#disconnect) events for more information.

:::note
This method is unrelated to [accessing a user's accounts](../how-to/access-accounts.md).
In the provider interface, "connected" and "disconnected" refer to whether the provider can make RPC
requests to the current chain.
:::

#### Parameters

None.

#### Returns

`true` if the provider is connected to the current chain, `false` otherwise.

#### Example

```typescript
provider.isConnected() // Or window.ethereum.isConnected() if you don't support EIP-6963.
```

### `request()`

This method is used to submit [JSON-RPC API requests](/wallet/reference/json-rpc-methods) to Ethereum using MetaMask.

#### Parameters

An object containing:

- `method`: `string` - The JSON-RPC API method name.
- `params`: `array` or `object` - (Optional) Parameters of the RPC method.
  In practice, if a method has parameters, they're almost always of type `array`.

#### Returns

A promise that resolves to the result of the RPC method call.
If the request fails, the promise rejects with an [error](#errors).

#### Example

The following is an example of using `request()` to call
[`eth_sendTransaction`](/wallet/reference/json-rpc-methods/eth_sendTransaction):

```javascript
provider // Or window.ethereum if you don't support EIP-6963.
  .request({
    method: "eth_sendTransaction",
    params: [
      {
        from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
        gas: "0x76c0", // 30400
        gasPrice: "0x9184e72a000", // 10000000000000
        value: "0x9184e72a", // 2441406250
        data: "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
      },
    ],
  })
  .then((result) => {
    // The result varies by RPC method.
    // For example, this method returns a transaction hash hexadecimal string upon success.
  })
  .catch((error) => {
    // If the request fails, the Promise rejects with an error.
  })
```

### `_metamask.isUnlocked()`

:::caution
This method is experimental.
Use it at your own risk.
:::

Indicates if MetaMask is unlocked by the user.
MetaMask must be unlocked to perform any operation involving user accounts.
Note that this method doesn't indicate if the user has exposed any accounts to the caller.

#### Parameters

None.

#### Returns

A promise that resolves to `true` if MetaMask is unlocked by the user, and `false` otherwise.

#### Example

```typescript
provider._metamask.isUnlocked() // Or window.ethereum._metamask.isUnlocked() if you don't support EIP-6963.
```

## Events

The MetaMask provider emits events using the Node.js
[`EventEmitter`](https://nodejs.org/api/events.html) API.
The following is an example of listening to the [`accountsChanged`](#accountschanged) event.

You should [remove listeners](#remove-event-listeners) after you're done listening to an event (for example, on component
`unmount` in React).

```javascript
function handleAccountsChanged(accounts) {
  // Handle new accounts, or lack thereof.
}

provider // Or window.ethereum if you don't support EIP-6963.
  .on("accountsChanged", handleAccountsChanged)

// Later

provider // Or window.ethereum if you don't support EIP-6963.
  .removeListener("accountsChanged", handleAccountsChanged)
```

### `accountsChanged`

```typescript
provider // Or window.ethereum if you don't support EIP-6963.
  .on("accountsChanged", handler: (accounts: Array<string>) => void);
```

The provider emits this event when the return value of the
[`eth_accounts`](/wallet/reference/json-rpc-methods/eth_accounts) RPC
method changes.
`eth_accounts` returns either an empty array, or an array that contains the addresses of the accounts
the caller is permitted to access with the most recently used account first.
Callers are identified by their URL origin, which means that all sites with the same origin share
the same permissions.

This means that the provider emits `accountsChanged` when the user's exposed account address changes.
Listen to this event to [handle accounts](../how-to/access-accounts.md#handle-accounts).

### `chainChanged`

```typescript
provider // Or window.ethereum if you don't support EIP-6963.
  .on("chainChanged", handler: (chainId: string) => void);
```

The provider emits this event when the currently connected chain changes.
Listen to this event to [detect a user's network](../how-to/manage-networks/detect-network.md).

:::caution Important

We strongly recommend reloading the page upon chain changes, unless you have a good reason not to:

```typescript
provider // Or window.ethereum if you don't support EIP-6963.
  .on("chainChanged", (chainId) => window.location.reload())
```

:::

### `connect`

```typescript
interface ConnectInfo {
  chainId: string;
}

provider // Or window.ethereum if you don't support EIP-6963.
  .on("connect", handler: (connectInfo: ConnectInfo) => void);
```

The provider emits this event when it's first able to submit RPC requests to a chain.
We recommend listening to this event and using the
[`isConnected()`](#isconnected) provider method to determine when
the provider is connected.

### `disconnect`

```typescript
provider // Or window.ethereum if you don't support EIP-6963.
  .on("disconnect", handler: (error: ProviderRpcError) => void);
```

The provider emits this event if it becomes unable to submit RPC requests to a chain.
In general, this only happens due to network connectivity issues or some unforeseen error.

When the provider emits this event, it doesn't accept new requests until the connection to the chain
is re-established, which requires reloading the page.
You can also use the [`isConnected()`](#isconnected) provider method
to determine if the provider is disconnected.

### `message`

```typescript
interface ProviderMessage {
  type: string;
  data: unknown;
}

provider // Or window.ethereum if you don't support EIP-6963.
  .on("message", handler: (message: ProviderMessage) => void);
```

The provider emits this event when it receives a message that the user should be notified of.
The `type` property identifies the kind of message.

RPC subscription updates are a common use case for this event.
For example, if you create a subscription using
[`eth_subscribe`](/wallet/reference/json-rpc-methods/eth_subscribe), each
subscription update is emitted as a `message` event with a `type` of `eth_subscription`.

### Remove event listeners

#### `removeListener`

Use the `removeListener` method to remove specific event listeners from an `EventEmitter` object.
In the following example `removeListener` is used to remove the `connect` and `accountsChanged` events:

```javascript
// Use window.ethereum instead of provider if EIP-6963 is not supported.

// Add listeners
provider.on("_initialized", updateWalletAndAccounts)
provider.on("connect", updateWalletAndAccounts)
provider.on("accountsChanged", updateWallet)
provider.on("chainChanged", updateWalletAndAccounts)
provider.on("disconnect", disconnectWallet)

// Remove individual listeners
provider.removeListener("connect", updateWalletAndAccounts)
provider.removeListener("accountsChanged", updateWallet)
```

The first argument of `removeListener` is the event name, and the second argument is
a reference to the function passed to `on` for the event.

#### `removeAllListeners`

You can use `removeAllListeners` to remove all listeners from the event emitter at once. This method is helpful when you need to clean up all listeners simultaneously.

:::caution

Use `removeAllListeners` with caution.
This method clears all event listeners associated with the emitter, not only the listeners set up by the application code.
Using this method can unexpectedly clear important event handlers, interfere with scripts, and make debugging more complex.
You can use the `removeListener` method to safely remove specific listeners.

:::

```javascript
// Use window.ethereum instead of provider if EIP-6963 is not supported.

// Add listeners
provider.on("_initialized", updateWalletAndAccounts)
provider.on("connect", updateWalletAndAccounts)
provider.on("accountsChanged", updateWallet)
provider.on("chainChanged", updateWalletAndAccounts)
provider.on("disconnect", disconnectWallet)

// Remove all listeners
provider.removeAllListeners()
```

In the provided code example, `removeAllListeners` is called to remove all event listeners attached to the `provider` object. This cleanup function deletes any event listeners that are no longer needed.

## Errors

All errors returned by the MetaMask provider follow this interface:

```typescript
interface ProviderRpcError extends Error {
  message: string
  code: number
  data?: unknown
}
```

The [`request()`](#request) provider method throws errors eagerly.
You can use the error `code` property to determine why the request failed.
Common codes and their meaning include:

- `4001` - The request is rejected by the user.
- `-32602` - The parameters are invalid.
- `-32603` - Internal error.

For the complete list of errors, see [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193#provider-errors)
and [EIP-1474](https://eips.ethereum.org/EIPS/eip-1474#error-codes).

:::tip
The [`eth-rpc-errors`](https://npmjs.com/package/eth-rpc-errors) package implements all RPC errors
returned by the MetaMask provider, and can help you identify their meaning.
:::
