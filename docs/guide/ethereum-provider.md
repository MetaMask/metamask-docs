# Ethereum Provider API

::: tip Recommended Reading
We recommend that all web3 site developers read the [Basic Usage](#basic-usage) section.
:::

::: tip Recent Breaking Provider Changes
If you are an Ethereum application developer and are looking for information about our January 2021 provider API changes,
please see our [Migration Guide](./provider-migration.html) for more details.
:::

MetaMask injects a global API into websites visited by its users at `window.ethereum`.
This API allows websites to request users' Ethereum accounts, read data from blockchains the user is connected to, and suggest that the user sign messages and transactions.
The presence of the provider object indicates an Ethereum user.
We recommend using [`@metamask/detect-provider`](https://npmjs.com/package/@metamask/detect-provider) to detect our provider, on any platform or browser.

The Ethereum JavaScript provider API is specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193).

```javascript
// This function detects most providers injected at window.ethereum
import detectEthereumProvider from '@metamask/detect-provider';

const provider = await detectEthereumProvider();

if (provider) {
  // From now on, this should always be true:
  // provider === window.ethereum
  startApp(provider); // initialize your app
} else {
  console.log('Please install MetaMask!');
}
```

## Table of Contents

[[toc]]

## Basic Usage

For any non-trivial Ethereum web application — a.k.a. dapp, web3 site etc. — to work, you will have to:

- Detect the Ethereum provider (`window.ethereum`)
- Detect which Ethereum network the user is connected to
- Get the user's Ethereum account(s)

The snippet at the top of this page is sufficient for detecting the provider.
You can learn how to accomplish the other two by reviewing the snippet in the [Using the Provider section](#using-the-provider).

The provider API is all you need to create a full-featured web3 application.

That said, many developers use a convenience library, such as [ethers](https://www.npmjs.com/package/ethers), instead of using the provider directly.
If you are in need of higher-level abstractions than those provided by this API, we recommend that you use a convenience library.

## Chain IDs

These are the IDs of the Ethereum chains that MetaMask supports by default.
Consult [chainid.network](https://chainid.network) for more.

| Hex  | Decimal | Network                         |
| ---- | ------- | ------------------------------- |
| 0x1  | 1       | Ethereum Main Network (Mainnet) |
| 0x3  | 3       | Ropsten Test Network            |
| 0x4  | 4       | Rinkeby Test Network            |
| 0x5  | 5       | Goerli Test Network             |
| 0x2a | 42      | Kovan Test Network              |

## Properties

### ethereum.isMetaMask

::: warning Note
This property is non-standard. Non-MetaMask providers may also set this property to `true`.
:::

`true` if the user has MetaMask installed.

## Methods

### ethereum.isConnected()

::: tip Tip
Note that this method has nothing to do with the user's accounts.

You may often encounter the word "connected" in reference to whether a web3 site can access the user's accounts.
In the provider interface, however, "connected" and "disconnected" refer to whether the provider can make RPC requests to the current chain.
:::

```typescript
ethereum.isConnected(): boolean;
```

Returns `true` if the provider is connected to the current chain, and `false` otherwise.

If the provider is not connected, the page will have to be reloaded in order for connection to be re-established.
Please see the [`connect`](#connect) and [`disconnect`](#disconnect) events for more information.

### ethereum.request(args)

```typescript
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

ethereum.request(args: RequestArguments): Promise<unknown>;
```

Use `request` to submit RPC requests to Ethereum via MetaMask.
It returns a `Promise` that resolves to the result of the RPC method call.

The `params` and return value will vary by RPC method.
In practice, if a method has any `params`, they are almost always of type `Array<any>`.

If the request fails for any reason, the Promise will reject with an [Ethereum RPC Error](#errors).

MetaMask supports most standardized Ethereum RPC methods, in addition to a number of methods that may not be
supported by other wallets.
See the MetaMask [RPC API documentation](./rpc-api.html) for details.

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

Also, don't forget to remove listeners once you are done listening to them (for example on component unmount in React):

```javascript
function handleAccountsChanged(accounts) {
  // ...
}

ethereum.on('accountsChanged', handleAccountsChanged);

// Later

ethereum.removeListener('accountsChanged', handleAccountsChanged);
```

The first argument of the `ethereum.removeListener` is the event name and the second argument is the reference to the same function which has passed to `ethereum.on` for the event name mentioned in the first argument.

### connect

```typescript
interface ConnectInfo {
  chainId: string;
}

ethereum.on('connect', handler: (connectInfo: ConnectInfo) => void);
```

The MetaMask provider emits this event when it first becomes able to submit RPC requests to a chain.
We recommend using a `connect` event handler and the [`ethereum.isConnected()` method](#ethereum-isconnected) in order to determine when/if the provider is connected.

### disconnect

```typescript
ethereum.on('disconnect', handler: (error: ProviderRpcError) => void);
```

The MetaMask provider emits this event if it becomes unable to submit RPC requests to any chain.
In general, this will only happen due to network connectivity issues or some unforeseen error.

Once `disconnect` has been emitted, the provider will not accept any new requests until the connection to the chain has been re-restablished, which requires reloading the page.
You can also use the [`ethereum.isConnected()` method](#ethereum-isconnected) to determine if the provider is disconnected.

### accountsChanged

```typescript
ethereum.on('accountsChanged', handler: (accounts: Array<string>) => void);
```

The MetaMask provider emits this event whenever the return value of the `eth_accounts` RPC method changes.
`eth_accounts` returns an array that is either empty or contains a single account address.
The returned address, if any, is the address of the most recently used account that the caller is permitted to access.
Callers are identified by their URL _origin_, which means that all sites with the same origin share the same permissions.

This means that `accountsChanged` will be emitted whenever the user's exposed account address changes.

::: tip Tip
We plan to allow the `eth_accounts` array to be able to contain multiple addresses in the near future.
:::

### chainChanged

::: tip Tip
See the [Chain IDs section](#chain-ids) for MetaMask's default chains and their chain IDs.
:::

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

### message

```typescript
interface ProviderMessage {
  type: string;
  data: unknown;
}

ethereum.on('message', handler: (message: ProviderMessage) => void);
```

The MetaMask provider emits this event when it receives some message that the consumer should be notified of.
The kind of message is identified by the `type` string.

RPC subscription updates are a common use case for the `message` event.
For example, if you create a subscription using `eth_subscribe`, each subscription update will be emitted as a `message` event with a `type` of `eth_subscription`.

## Errors

All errors thrown or returned by the MetaMask provider follow this interface:

```typescript
interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}
```

The [`ethereum.request(args)` method](#ethereum-request-args) throws errors eagerly.
You can often use the error `code` property to determine why the request failed.
Common codes and their meaning include:

- `4001`
  - The request was rejected by the user
- `-32602`
  - The parameters were invalid
- `-32603`
  - Internal error

For the complete list of errors, please see [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193#provider-errors) and [EIP-1474](https://eips.ethereum.org/EIPS/eip-1474#error-codes).

::: tip Tip
The [`eth-rpc-errors`](https://npmjs.com/package/eth-rpc-errors) package implements all RPC errors thrown by the MetaMask provider, and can help you identify their meaning.
:::

## Using the Provider

This snippet explains how to accomplish the three most common requirements for web3 sites:

- Detect the Ethereum provider (`window.ethereum`)
- Detect which Ethereum network the user is connected to
- Get the user's Ethereum account(s)

<<< @/docs/snippets/handleProvider.js

## Experimental API

::: warning
There is no guarantee that the methods and properties defined in this section will remain stable.
Use it at your own risk.
:::

We expose some experimental, MetaMask-specific methods under the `ethereum._metamask` property.

## Experimental Methods

### ethereum.\_metamask.isUnlocked()

```typescript
ethereum._metamask.isUnlocked(): Promise<boolean>;
```

This method returns a `Promise` that resolves to a `boolean` indicating if MetaMask is unlocked by the user.
MetaMask must be unlocked in order to perform any operation involving user accounts.
Note that this method does not indicate if the user has exposed any accounts to the caller.

## Legacy API

::: warning
You should **never** rely on any of these methods, properties, or events in practice.
:::

This section documents our legacy provider API.
MetaMask only supported this API before the provider API was standardized via [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) in 2020.
Because of this, you may find web3 sites that use this API, or other providers that implement it.

## Legacy Properties

### ethereum.chainId (DEPRECATED)

::: warning
This property is non-standard, and therefore deprecated.

If you need to retrieve the current chain ID, use [`ethereum.request({ method: 'eth_chainId' })`](#ethereum-request-args).
See also the [`chainChanged`](#chainchanged) event for more information about how to handle chain IDs.

The value of this property can change at any time.
:::

A hexadecimal string representing the current chain ID.

### ethereum.networkVersion (DEPRECATED)

::: warning
You should always prefer the chain ID over the network ID.

If you must get the network ID, use [`ethereum.request({ method: 'net_version' })`](#ethereum-request-args).

The value of this property can change at any time.
:::

A decimal string representing the current blockchain's network ID.

### ethereum.selectedAddress (DEPRECATED)

::: warning
Use [`ethereum.request({ method: 'eth_accounts' })`](#ethereum-request-args) instead.

The value of this property can change at any time.
:::

Returns a hexadecimal string representing the user's "currently selected" address.

The "currently selected" address is the first item in the array returned by `eth_accounts`.

## Legacy Methods

### ethereum.enable() (DEPRECATED)

::: warning
Use [`ethereum.request({ method: 'eth_requestAccounts' })`](#ethereum-request-args) instead.
:::

Alias for `ethereum.request({ method: 'eth_requestAccounts' })`.

### ethereum.sendAsync() (DEPRECATED)

::: warning
Use [`ethereum.request()`](#ethereum-request-args) instead.
:::

```typescript
interface JsonRpcRequest {
  id: string | undefined;
  jsonrpc: '2.0';
  method: string;
  params?: Array<any>;
}

interface JsonRpcResponse {
  id: string | undefined;
  jsonrpc: '2.0';
  method: string;
  result?: unknown;
  error?: Error;
}

type JsonRpcCallback = (error: Error, response: JsonRpcResponse) => unknown;

ethereum.sendAsync(payload: JsonRpcRequest, callback: JsonRpcCallback): void;
```

This is the ancestor of `ethereum.request`. It only works for JSON-RPC methods, and takes a JSON-RPC request payload object and an error-first callback function as its arguments.

See the [Ethereum JSON-RPC API](https://eips.ethereum.org/EIPS/eip-1474) for details.

### ethereum.send() (DEPRECATED)

::: warning
Use [`ethereum.request()`](#ethereum-request-args) instead.
:::

```typescript
ethereum.send(
  methodOrPayload: string | JsonRpcRequest,
  paramsOrCallback: Array<unknown> | JsonRpcCallback,
): Promise<JsonRpcResponse> | void;
```

This method behaves unpredictably and should be avoided at all costs.
It is essentially an overloaded version of [`ethereum.sendAsync()`](#ethereum-sendasync-deprecated).

`ethereum.send()` can be called in three different ways:

```typescript
// 1.
ethereum.send(payload: JsonRpcRequest, callback: JsonRpcCallback): void;

// 2.
ethereum.send(method: string, params?: Array<unknown>): Promise<JsonRpcResponse>;

// 3.
ethereum.send(payload: JsonRpcRequest): unknown;
```

You can think of these signatures as follows:

1. This signature is exactly like `ethereum.sendAsync()`

2. This signature is like an async `ethereum.sendAsync()` with `method` and `params` as arguments, instead of a JSON-RPC payload and callback

3. This signature enables you to call the following RPC methods synchronously:

   - `eth_accounts`
   - `eth_coinbase`
   - `eth_uninstallFilter`
   - `net_version`

## Legacy Events

### close (DEPRECATED)

::: warning
Use [`disconnect`](#disconnect) instead.
:::

```typescript
ethereum.on('close', handler: (error: Error) => void);
```

### chainIdChanged (DEPRECATED)

::: warning
Use [`chainChanged`](#chainchanged) instead.
:::

Misspelled alias of [`chainChanged`](#chainchanged).

```typescript
ethereum.on('chainChanged', handler: (chainId: string) => void);
```

### networkChanged (DEPRECATED)

::: warning
Use [`chainChanged`](#chainchanged) instead.
:::

Like [`chainChanged`](#chainchanged), but with the `networkId` instead.
Network IDs are insecure, and were effectively deprecated in favor of chain IDs by [EIP-155](https://eips.ethereum.org/EIPS/eip-155).
Avoid using them unless you know what you are doing.

```typescript
ethereum.on('networkChanged', handler: (networkId: string) => void);
```

### notification (DEPRECATED)

::: warning
Use [`message`](#message) instead.
:::

```typescript
ethereum.on('notification', handler: (payload: any) => void);
```
