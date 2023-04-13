---
description: MetaMask Ethereum provider API reference
---

# Ethereum provider API

MetaMask injects a global JavaScript API into websites visited by its users using the
`window.ethereum` provider object.
This API allows websites to request users' Ethereum accounts, read data from blockchains the user is
connected to, and suggest that the user sign messages and transactions.

You can use the provider [properties](#properties), [methods](#methods), and [events](#events) in
your dapp.
Get started by [setting up your development environment](../get-started/set-up-dev-environment.md).

## Properties

### window.ethereum.isMetaMask

This property is `true` if the user has MetaMask installed.

:::note
This property is non-standard.
Non-MetaMask providers may also set this property to `true`.
:::

## Methods

### window.ethereum.isConnected()

```typescript
window.ethereum.isConnected(): boolean;
```

Returns `true` if the provider is connected to the current chain.

If the provider isn't connected, the page must be reloaded to re-establish the connection.
See the [`connect`](#connect) and [`disconnect`](#disconnect) events for more information.

:::note
This method is unrelated to [accessing a user's accounts](../get-started/access-accounts.md).
In the provider interface, "connected" and "disconnected" refer to whether the provider can make RPC
requests to the current chain.
:::

### window.ethereum.request(args)

```typescript
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

window.ethereum.request(args: RequestArguments): Promise<unknown>;
```

Use this method to submit [RPC API](rpc-api.md) requests to Ethereum using MetaMask.
It returns a promise that resolves to the result of the RPC method call.

The parameters and return value vary by RPC method.
In practice, if a method has parameters, they're almost always of type `Array<any>`.

If the request fails, the promise rejects with an [error](#errors).

The following is an example of using `window.ethereum.request(args)` to call
[`eth_sendTransaction`](https://metamask.github.io/api-playground/api-documentation/#eth_sendTransaction):

```javascript
params: [
  {
    from: '0xb60e8dd61c5d32be8058bb8eb970870f07233155',
    to: '0xd46e8dd67c5d32be8058bb8eb970870f07244567',
    gas: '0x76c0', // 30400
    gasPrice: '0x9184e72a000', // 10000000000000
    value: '0x9184e72a', // 2441406250
    data:
      '0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675',
  },
];

window.ethereum
  .request({
    method: 'eth_sendTransaction',
    params,
  })
  .then((result) => {
    // The result varies by RPC method.
    // For example, this method returns a transaction hash hexadecimal string upon success.
  })
  .catch((error) => {
    // If the request fails, the Promise rejects with an error.
  });
```

### window.ethereum._metamask.isUnlocked()

:::caution
This method is experimental.
Use it at your own risk.
:::

```typescript
window.ethereum._metamask.isUnlocked(): Promise<boolean>;
```

Returns a promise that resolves to a `boolean` indicating if MetaMask is unlocked by the user.
MetaMask must be unlocked to perform any operation involving user accounts.
Note that this method doesn't indicate if the user has exposed any accounts to the caller.

## Events

The MetaMask provider emits events using the Node.js
[`EventEmitter`](https://nodejs.org/api/events.html) API.
The following is an example of listening to the [`accountsChanged`](#accountschanged) event.
You should remove listeners once you're done listening to an event (for example, on component
unmount in React).

```javascript
function handleAccountsChanged(accounts) {
  // Handle new accounts, or lack thereof.
}

window.ethereum.on('accountsChanged', handleAccountsChanged);

// Later

window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
```

The first argument of `window.ethereum.removeListener` is the event name, and the second argument is
a reference to the function passed to `window.ethereum.on` for the event.

### accountsChanged

```typescript
window.ethereum.on('accountsChanged', handler: (accounts: Array<string>) => void);
```

The provider emits this event when the return value of the
[`eth_accounts`](https://metamask.github.io/api-playground/api-documentation/#eth_accounts) RPC
method changes.
`eth_accounts` returns either an empty array, or an array that contains the address of the most
recently used account the caller is permitted to access.
Callers are identified by their URL origin, which means that all sites with the same origin share
the same permissions.

This means that the provider emits `accountsChanged` when the user's exposed account address changes.
Listen to this event to [handle accounts](../get-started/access-accounts.md#handle-accounts).

### chainChanged

```typescript
window.ethereum.on('chainChanged', handler: (chainId: string) => void);
```

The provider emits this event when the currently connected chain changes.
Listen to this event to [detect a user's network](../get-started/detect-network.md).

:::caution important

We strongly recommend reloading the page upon chain changes, unless you have a good reason not to:

```javascript
window.ethereum.on('chainChanged', (chainId) => window.location.reload());
```

:::

### connect

```typescript
interface ConnectInfo {
  chainId: string;
}

window.ethereum.on('connect', handler: (connectInfo: ConnectInfo) => void);
```

The provider emits this event when it's first able to submit RPC requests to a chain.
We recommend listening to this event and using the
[`window.ethereum.isConnected()`](#windowethereumisconnected) provider method to determine when
the provider is connected.

### disconnect

```typescript
ethereum.on('disconnect', handler: (error: ProviderRpcError) => void);
```

The provider emits this event if it becomes unable to submit RPC requests to a chain.
In general, this only happens due to network connectivity issues or some unforeseen error.

When the provider emits this event, it doesn't accept new requests until the connection to the chain
is re-established, which requires reloading the page.
You can also use the [`window.ethereum.isConnected()`](#windowethereumisconnected) provider method
to determine if the provider is disconnected.

### message

```typescript
interface ProviderMessage {
  type: string;
  data: unknown;
}

window.ethereum.on('message', handler: (message: ProviderMessage) => void);
```

The provider emits this event when it receives a message that the user should be notified of.
The `type` property identifies the kind of message.

RPC subscription updates are a common use case for this event.
For example, if you create a subscription using
[`eth_subscribe`](https://metamask.github.io/api-playground/api-documentation/#eth_subscribe), each
subscription update is emitted as a `message` event with a `type` of `eth_subscription`.

## Errors

All errors returned by the MetaMask provider follow this interface:

```typescript
interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
```

The [`window.ethereum.request(args)`](#windowethereumrequestargs) provider method throws errors
eagerly.
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
