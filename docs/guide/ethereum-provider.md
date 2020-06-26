# Ethereum Provider API

MetaMask injects a global API into websites visited by its users at `window.ethereum`.
This API allows websites to request users' Ethereum accounts, read data from blockchains the user is connected to, and suggest that the user sign messages and transactions.
The presence of the provider object indicates an Ethereum user.

```javascript
// this function detects most providers injected at window.ethereum
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

::: warning
In Q3 and Q4 of 2020, we are making changes to our provider API that will be breaking for some web3 sites.

Please read the [Upcoming Breaking Changes section](#upcoming-breaking-changes) for details.
:::

The provider API is specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193), and is designed to be minimal.
We recommend that all web3 site developers read the [Basic Usage section](#basic-usage).

## Table of Contents

[[toc]]

## Upcoming Breaking Changes

::: tip
These changes are _upcoming._ Follow [this GitHub issue](https://github.com/MetaMask/metamask-extension/issues/8077) for details.

If you are new to using the provider, or use [ethers](https://www.npmjs.com/package/ethers), you do not have to worry about these changes, and can skip ahead [to the next section](#api).
:::

### `window.ethereum` API Changes

In **Q3 2020** (date TBD), we are introducing some breaking changes to this API, which we encourage you to
[read more about here](https://medium.com/metamask/breaking-changes-to-the-metamask-inpage-provider-b4dde069dd0a).

At that time, we will:

- Stop emitting `chainIdChanged`, and instead emit `chainChanged`
- Ensure that all `chainId` values are **not** 0-prefixed
  - For example, instead of `0x01`, we will always return `0x1`, wherever the chain ID is returned or accessible.
- Remove the following experimental methods:
  - `ethereum._metamask.isEnabled`
  - `ethereum._metamask.isApproved`

These changes _may_ break your website.
Please read our [migration guide](about:blank) for more details.

### `window.web3` Removal

::: tip
If you do not use the `window.web3` object injected by MetaMask, you will not be affected by these changes.
:::

In **Q4 2020** (date TBD), we will:

- Stop injecting `window.web3` into web pages
- Remove the `ethereum.autoRefreshOnNetworkChange` property

If you rely on the `window.web3` object currently injected by MetaMask, these changes _will_ break your website.
Please read our [migration guide](about:blank) for more details.

## Basic Usage

For any non-trivial Ethereum web application — a.k.a. web3 site — to work, you will have to:

- Detect the Ethereum provider (`window.ethereum`)
- Detect which Ethereum network the user is connected to
- Get the user's Ethereum account(s)

The snippet at the top of this page is sufficient for detecting the provider.
You can learn how to accomplish the other two by reviewing the snippet in the [Using the Provider section](#using-the-provider).

Although any Ethereum operation can be performed via the provider API, most developers use a convenience library with higher-level abstractions.
The most common such libraries are [ethers](https://www.npmjs.com/package/ethers) and [web3.js](https://www.npmjs.com/package/web3).

Even if you use a convenience library, you will likely still need to detect the provider before initializing the library.
Other than that, you can generally learn everything you need to know from the documentation of those libraries, without reading this lower-level API.

However, for developers of convenience libraries, and for developers who would like to use features that are not yet supported by their favorite libraries, knowledge of the provider API is essential. Read on for more details.

## Chain IDs

::: warning
At the moment, the [`ethereum.chainId`](#ethereum-chainid) property and the [`chainChanged`](#chainchanged) event should be preferred over the `eth_chainId` RPC method.
Their chain ID values are correctly formatted, per the table below.

`eth_chainId` returns an incorrectly formatted (0-prefixed) chain ID for the chains in the table below, e.g. `0x01` instead of `0x1`.
See the [Upcoming Breaking Changes section](#upcoming-breaking-changes) for details on when the `eth_chainId` RPC method will be fixed.

Custom RPC endpoints are not affected; they always return the chain ID specified by the user.
:::

These are the IDs of the Ethereum chains that MetaMask supports by default.
Consult [chainid.network](https://chainid.network) for more.

| Hex  | Decimal | Network                         |
| ---- | ------- | ------------------------------- |
| 0x1  | 1       | Ethereum Main Network (MainNet) |
| 0x3  | 3       | Ropsten Test Network            |
| 0x4  | 4       | Rinkeby Test Network            |
| 0x5  | 5       | Goerli Test Network             |
| 0x2a | 42      | Kovan Test Network              |

## Properties

### ethereum.isMetaMask

::: tip
This property is just a convention, and it may be `true` for non-MetaMask providers.
:::

`true` if the user has MetaMask installed, some falsy value otherwise.

### ethereum.chainId

::: warning
The value of this property can change at any time, and should not be exclusively relied upon. See the [`chainChanged`](#chainchanged) event for details.

**NOTE:** See the [Chain IDs section](#chain-ids) for important information about the MetaMask provider's chain IDs.
:::

A hexadecimal string representing the current chain ID.

## Methods

### ethereum.request(args)

```typescript
interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

ethereum.request(args: RequestArguments): Promise<unknown>;
```

Use `request` to submit RPC requests to Ethereum via MetaMask.
It method a `Promise` that resolves to the result of the RPC method call.

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
    // The result varies by by RPC method.
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
  // We recommend reloading the page.
  window.location.reload();
});
```

### connect

```typescript
interface ConnectInfo {
  chainId: string;
}

ethereum.on('connect', handler: (connectInfo: ConnectInfo) => void);
```

The MetaMask provider emits this event when it first becomes able to submit RPC requests to a chain.
In general, you can assume that the MetaMask provider is connected and has emitted this event by the time you are able to reference it.

### disconnect

```typescript
ethereum.on('disconnect', handler: (error: ProviderRpcError) => void);
```

The MetaMask provider emits this event if it becomes unable to submit RPC requests to any chain.
In general, this will only happen due to network connectivity issues or some unforeseen error.

Once `disconnect` has been emitted, MetaMask will not accept any new requests until until `connect` is emitted, which may require reloading the page.

### accountsChanged

```typescript
ethereum.on('accountsChanged', handler: (accounts: Array<string>) => void);
```

The MetaMask provider emits this event whenever the return value of the `eth_accounts` RPC method changes.
`eth_accounts` returns an array that is either empty or contains a single account address that the user decided to expose to the requesting domain (in the case of a website, identified by the _hostname_ of its URL).

This means that `accountsChanged` will be emitted whenever the user's exposed account address changes.

::: tip
We plan to allow the `eth_accounts` array to be able to contain multiple addresses in the near future.
:::

### chainChanged

::: warning
**NOTE:** See the [Chain IDs section](#chain-ids) for important information about the MetaMask provider's chain IDs.
:::

```typescript
ethereum.on('chainChanged', handler: (chainId: string) => void);
```

The MetaMask provider emits this event when the currently connected chain changes.

All RPC requests are be submitted to the currently connected chain.
Therefore, it's critical to keep track of the current chain ID by listening for this event.

We _strongly_ recommend reloading the page on chain changes, unless absolutely necessary not to.

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

One prominent example of such messages include updates from RPC subscriptions, such as `eth_subscribe`. For such messages, the message `type` will be `eth_subscription`.

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

::: tip
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

### ethereum.\_metamask.isApproved() (TO BE REMOVED)

::: danger DANGER
This will be removed in **Q3 2020**.
:::

```typescript
ethereum._metamask.isApproved(): Promise<boolean>;
```

This method returns a `Promise` that resolves to a `boolean` indicating if the caller has access to user accounts.

### ethereum.\_metamask.isEnabled() (TO BE REMOVED)

::: danger DANGER
This will be removed in **Q3 2020**.
:::

```typescript
ethereum._metamask.isEnabled(): boolean;
```

This method returns a `boolean` indicating if the caller has access to user accounts.

### ethereum.\_metamask.isUnlocked()

```typescript
ethereum._metamask.isUnlocked(): Promise<boolean>;
```

This method returns a `Promise` that resolves to a `boolean` indicating if MetaMask is unlocked by the user.
This is useful for knowing if MetaMask is unlocked in order to provide meaningful instructions to the user during onboarding.
Note that this does not indicate if the user has exposed any accounts.

## Legacy API

::: warning
You should **never** rely on any of these methods, properties, or events in practice.
:::

Historically, the Ethereum provider API has been a mess.
Here, we document the remains of this mess in case you see it used in the wild and wonder what's going on.

## Legacy Properties

### ethereum.autoRefreshOnNetworkChange (TO BE REMOVED)

::: danger DANGER
When `window.web3` is removed in **Q4 2020**, this property will also be removed.

If you don't access `window.web3`, the value of this property will not affect the behavior of your application or MetaMask.

As the consumer of this API, it is your responsbility to handle chain changes using the [`chainChanged` event](#chainChanged).
We recommend reloading the page on `chainChange` or using [ethers](https://www.npmjs.com/package/ethers), which will do so for you.
:::

By default, this property is `true`.

If this property is truthy, MetaMask will reload the page in the following cases:

- When the connected chain (network) changes, if `window.web3` has been accessed during the page lifecycle
- When `window.web3` is accessed, if the connected chain (network) has changed during the page lifecycle

To disable this behavior, set this property to `false` immediately after detecting the provider:

```javascript
ethereum.autoRefreshOnNetworkChange = false;
```

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

See [the Ethereum JSON-RPC API](https://eips.ethereum.org/EIPS/eip-1474) for details.

### ethereum.send() (DEPRECATED)

::: warning
Use [`ethereum.request()`](#ethereum-request-args) instead.
:::

```typescript
ethereum.send(
  methodOrPayload: string | JsonRpcRequest,
  paramsOrCallback: Array<unknown> | JsonRpcCallback,
): Promise<JsonRpcResponse> | unknown;
```

This method is mostly a Promise-based `sendAsync` with `method` and `params` instead of a payload as arguments.
However, it behaves in unexpected ways and should be avoided at all costs.

## Deprecated Events

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
