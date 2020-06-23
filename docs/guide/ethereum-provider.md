# Ethereum Provider API

MetaMask injects a global API into websites visited by its users at `window.ethereum`.
This API allows websites to request user login, load data from blockchains the user has a connection to, and suggest that the user sign messages and transactions.
You can use this API to detect the user of an Ethereum browser.

```javascript
if (typeof window.ethereum !== 'undefined') {
  // Ethereum user detected. You can now use the provider.
  const provider = window['ethereum'];
}
```

The provider API itself is very simple, and wraps [Ethereum JSON-RPC](./rpc-api) formatted messages, which is why developers usually use a convenience library for interacting with the provider,
like [web3](https://www.npmjs.com/package/web3), [ethers](https://www.npmjs.com/package/ethers), [truffle](https://truffleframework.com/), [Embark](https://embark.status.im/), or others.
From those tools, you can generally find sufficient documentation to interact with the provider, without reading this lower-level API.

However, for developers of convenience libraries, and for developers who would like to use features that are not yet supported by their favorite libraries, knowledge of the provider API is essential.

[[toc]]

## Upcoming Provider Changes

In **Q3 2020**, we are introducing a new version of this API. The existing API will mostly remain in place, however, in **late Q3/early Q4 2020**, we will break parts of the existing API. We encourage you to
[read more about this here](https://github.com/MetaMask/metamask-extension/issues/8077).

Documentation for the new API will be released as soon as it's in production.

## List of Chain and Network IDs

::: tip
The chain and network IDs of these chains are the same.

Network IDs are decimal strings, while chain IDs are hexadecimal strings.
:::

```javascript
'1': Ethereum Main Network
'2': Morden Test network
'3': Ropsten Test Network
'4': Rinkeby Test Network
'5': Goerli Test Network
'42': Kovan Test Network
```

## Properties

### ethereum.isMetaMask

Returns `true` or `false`, representing whether the user has MetaMask installed.

### ethereum.autoRefreshOnNetworkChange

When the network is changed, MetaMask will reload any pages that have made requests to the provider.
This automatic reload behavior will be removed in a future release of MetaMask, but in the meantime it can be disabled with this flag.

To disable auto-refresh on a network change you can do:

```javascript
ethereum.autoRefreshOnNetworkChange = false;
```

This can be toggled on or off at any time.

### ethereum.networkVersion (DEPRECATED)

::: warning
Use the `net_version` RPC method via `ethereum.sendAsync()` instead.
:::

Returns a numeric string representing the current blockchain's network ID.

### ethereum.selectedAddress (DEPRECATED)

::: warning
Use `ethereum.sendAsync({ method: 'eth_accounts' }, callback)` instead.
:::

Returns a hex-prefixed string representing the current user's selected address, ex: `"0xfdea65c8e26263f6d9a1b5de9555d2931a33b825"`.

## Methods

### ethereum.sendAsync(payload, callback)

```typescript
interface JsonRpcResponse {
  id: string | undefined,
  jsonrpc: '2.0',
  method: string,
  result: any,
}

ethereum.sendAsync(payload: Object, callback: Function): JsonRpcResponse
```

_To be superseded by the Promise-returning `ethereum.send()` method in_
_[EIP 1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md). (See also **[the new API](#new-api)**.)_

Sends a message to the web3 browser. Message format maps to the format of
[the Ethereum JSON-RPC API](https://github.com/ethereum/wiki/wiki/JSON-RPC#json-rpc-methods).

Here's an example of everyone's favorite method, `eth_sendTransaction`, which is both how Ether is sent, and how smart contract methods are called:

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

ethereum.sendAsync(
  {
    method: 'eth_sendTransaction',
    params: params,
    from: accounts[0], // Provide the user's account to use.
  },
  (err, response) => {
    if (err) {
      // Handle the error
    } else {
      // This always returns a JSON RPC response object.
      // The result varies by method, per the RPC method specification
      // For example, this method will return a transaction hash on success.
      const result = response.result;
    }
  }
);
```

### ethereum.sendAsync({ method: 'eth_requestAccounts'}, callback)

Requests to view the user's Ethereum address.

#### Example

```javascript
ethereum.sendAsync({
    method: 'eth_requestAccounts',
  },
  (error, response) => {
    if (error) {
      // Handle error. Likely the user rejected the login
      console.error(error);
    } else {
      const accounts = response.result
    // You now have an array of accounts!
    // Currently only ever one, e.g.:
    // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
    }
  }
);
```

### ethereum.enable() (DEPRECATED)

::: warning
Use `ethereum.sendAsync({ method: 'eth_requestAccounts' }, callback)` instead.
:::

Requests to view the user's Ethereum address.
Returns a promise of an array of hex-prefixed ethereum address strings.

### ethereum.send(payload, callback) (DEPRECATED)

::: warning
Use `ethereum.sendAsync()` instead.
:::

See `ethereum.sendAsync`, directly below.

### ethereum.on(eventName, callback)

The provider supports listening for some events:

- `accountsChanged`, returns the currently available account(s).
- `networkChanged`, returns the current network ID as a decimal string.
- `chainIdChanged`, returns the current chain ID as a hexadecimal string.

#### Example

```javascript
ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
});
```

**Note:** The `networkChanged` event is only useful if you disable auto-refresh on network
change by setting [`ethereum.autoRefreshOnNetworkChange`](#ethereum-autorefreshonnetworkchange) to `false`.
Otherwise, MetaMask will default to auto-reloading pages upon network change if they have made requests to the provider.
