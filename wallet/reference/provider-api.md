# Ethereum provider API

MetaMask injects a global JavaScript API into websites visited by its users at `window.ethereum`.
This API allows websites to request users' Ethereum accounts, read data from blockchains the user is
connected to, and suggest that the user sign messages and transactions.

## Properties

### `ethereum.isMetaMask`

:::note
This property is non-standard.
Non-MetaMask providers may also set this property to `true`.
:::

`true` if the user has MetaMask installed.

## Methods

### `ethereum.isConnected()`

:::note
This method has nothing to do with the user's accounts.

You may often encounter the word "connected" in reference to whether a Web3 site can access the
user's accounts.
In the provider interface, however, "connected" and "disconnected" refer to whether the provider can
make RPC requests to the current chain.
:::

```typescript
ethereum.isConnected(): boolean;
```

Returns `true` if the provider is connected to the current chain, and `false` otherwise.

If the provider is not connected, the page must be reloaded in order for connection to be re-established.
Please see the [`connect`](#connect) and [`disconnect`](#disconnect) events for more information.

### `ethereum.request(args)`

```typescript
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

ethereum.request(args: RequestArguments): Promise<unknown>;
```

Use `request` to submit RPC requests to Ethereum via MetaMask.
It returns a `Promise` that resolves to the result of the RPC method call.

The `params` and return value vary by RPC method.
In practice, if a method has any `params`, they are almost always of type `Array<any>`.

If the request fails for any reason, the Promise rejects with an [Ethereum RPC Error](#errors).

MetaMask supports most standardized Ethereum RPC methods, in addition to a number of methods that
may not be supported by other wallets.
See the MetaMask [RPC API documentation](rpc-api.md) for details.

#### Example

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

ethereum
  .request({
    method: 'eth_sendTransaction',
    params,
  })
  .then((result) => {
    // The result varies by RPC method.
    // For example, this method will return a transaction hash hexadecimal string on success.
  })
  .catch((error) => {
    // If the request fails, the Promise will reject with an error.
  });
```

## Events

The MetaMask provider implements the [Node.js `EventEmitter`](https://nodejs.org/api/events.html) API.
This sections details the events emitted via that API.
There are innumerable `EventEmitter` guides elsewhere, but you can listen for events like this:

```javascript
ethereum.on('accountsChanged', (accounts) => {
  // Handle the new accounts, or lack thereof.
  // "accounts" will always be an array, but it can be empty.
});

ethereum.on('chainChanged', (chainId) => {
  // Handle the new chain.
  // Correctly handling chain changes can be complicated.
  // We recommend reloading the page unless you have good reason not to.
  window.location.reload();
});
```

Also, don't forget to remove listeners once you are done listening to them (for example on component
unmount in React):

```javascript
function handleAccountsChanged(accounts) {
  // ...
}

ethereum.on('accountsChanged', handleAccountsChanged);

// Later

ethereum.removeListener('accountsChanged', handleAccountsChanged);
```

The first argument of the `ethereum.removeListener` is the event name and the second argument is the
reference to the same function which has passed to `ethereum.on` for the event name mentioned in the
first argument.

### `connect`

```typescript
interface ConnectInfo {
  chainId: string;
}

ethereum.on('connect', handler: (connectInfo: ConnectInfo) => void);
```

The MetaMask provider emits this event when it first becomes able to submit RPC requests to a chain.
We recommend using a `connect` event handler and the [`ethereum.isConnected()` method](#ethereum-isconnected) in order to determine when/if the provider is connected.

### `disconnect`

```typescript
ethereum.on('disconnect', handler: (error: ProviderRpcError) => void);
```

The MetaMask provider emits this event if it becomes unable to submit RPC requests to any chain.
In general, this only happens due to network connectivity issues or some unforeseen error.

Once `disconnect` is emitted, the provider doesn't accept any new requests until the connection to
the chain is re-established, which requires reloading the page.
You can also use the [`ethereum.isConnected()` method](#ethereumisconnected) to determine if the
provider is disconnected.

### `accountsChanged`

```typescript
ethereum.on('accountsChanged', handler: (accounts: Array<string>) => void);
```

The MetaMask provider emits this event whenever the return value of the `eth_accounts` RPC method changes.
`eth_accounts` returns an array that is either empty or contains a single account address.
The returned address, if any, is the address of the most recently used account that the caller is
permitted to access.
Callers are identified by their URL _origin_, which means that all sites with the same origin share
the same permissions.

This means that `accountsChanged` is emitted whenever the user's exposed account address changes.

:::note
We plan to allow the `eth_accounts` array to be able to contain multiple addresses in the near future.
:::

### `chainChanged`

```typescript
ethereum.on('chainChanged', handler: (chainId: string) => void);
```

The MetaMask provider emits this event when the currently connected chain changes.

All RPC requests are submitted to the currently connected chain.
Therefore, it's critical to keep track of the current chain ID by listening for this event.

We _strongly_ recommend reloading the page on chain changes, unless you have good reason not to.

```javascript
ethereum.on('chainChanged', (_chainId) => window.location.reload());
```

### `message`

```typescript
interface ProviderMessage {
  type: string;
  data: unknown;
}

ethereum.on('message', handler: (message: ProviderMessage) => void);
```

The MetaMask provider emits this event when it receives some message that the consumer should be
notified of.
The kind of message is identified by the `type` string.

RPC subscription updates are a common use case for the `message` event.
For example, if you create a subscription using `eth_subscribe`, each subscription update is emitted
as a `message` event with a `type` of `eth_subscription`.

## Errors

All errors thrown or returned by the MetaMask provider follow this interface:

```typescript
interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
```

The [`ethereum.request(args)` method](#ethereumrequestargs) throws errors eagerly.
You can often use the error `code` property to determine why the request failed.
Common codes and their meaning include:

- `4001` - The request is rejected by the user.
- `-32602` - The parameters are invalid.
- `-32603` - Internal error.

For the complete list of errors, see [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193#provider-errors)
and [EIP-1474](https://eips.ethereum.org/EIPS/eip-1474#error-codes).

:::tip
The [`eth-rpc-errors`](https://npmjs.com/package/eth-rpc-errors) package implements all RPC errors
thrown by the MetaMask provider, and can help you identify their meaning.
:::

## Experimental API

:::caution
There's no guarantee that the methods and properties defined in this section will remain stable.
Use it at your own risk.
:::

We expose some experimental, MetaMask-specific methods under the `ethereum._metamask` property.

### `ethereum.\_metamask.isUnlocked()`

```typescript
ethereum._metamask.isUnlocked(): Promise<boolean>;
```

This method returns a `Promise` that resolves to a `boolean` indicating if MetaMask is unlocked by
the user.
MetaMask must be unlocked in order to perform any operation involving user accounts.
Note that this method does not indicate if the user has exposed any accounts to the caller.
