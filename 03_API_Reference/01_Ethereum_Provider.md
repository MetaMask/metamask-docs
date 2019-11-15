# Ethereum Provider API

MetaMask injects a global API into websites visited by its users at `window.ethereum`.
This API allows websites to request user login, load data from blockchains the user has a connection to, and suggest that the user sign messages and transactions.
You can use this API to detect the user of an Ethereum browser.

```javascript
if (typeof window.ethereum !== 'undefined') {

  // Ethereum user detected. You can now use the provider.
  const provider = window['ethereum']
}
```

The provider API itself is very simple, and wraps [Ethereum JSON-RPC](./JSON_RPC_API) formatted messages, which is why developers usually use a convenience library for interacting with the provider,
like [web3](https://www.npmjs.com/package/web3), [ethers](https://www.npmjs.com/package/ethers), [truffle](https://truffleframework.com/), [Embark](https://embark.status.im/), or others.
From those tools, you can generally find sufficient documentation to interact with the provider, without reading this lower-level API.

However, for developers of convenience libraries, and for developers who would like to use features that are not yet supported by their favorite libraries, knowledge of the provider API is essential.

## Upcoming Breaking Changes

On **January 13, 2020**, we are introducing breaking changes to this API, which we encourage you to
[read more about here](https://medium.com/metamask/breaking-changes-to-the-metamask-inpage-provider-b4dde069dd0a).
We only break APIs as a last resort, and unfortunately had to pursue this change.

We will begin supporting the new API during the week of **November 25, 2019**.
At that point, we will support the old and new API until January 13, 2020, after which only the new API will be supported.
This update will make the MetaMask inpage provider fully compatible with
[EIP 1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md)
and [EIP 1102](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md) as of November 6, 2019.

You can continue reading to learn about the current API. Otherwise, [click here to learn about the new API](#new-api).

#### A Note on Language

In our usage, if a feature is _deprecated_, we strongly discourage its use, and may remove it in the future.
Features that will be _removed_ or _replaced_ on a particular date are clearly marked as such.
We do not anticipate any need for further breaking changes after January 13, 2020.

# Current API

This API will be available until **January 13, 2020**, when it will be replaced by [the new API](#new-api).

## Properties

These properties can be used to check the current state of the connected user,
which can be important things to verify before sending a transaction.

### ethereum.networkVersion

Returns a numeric string representing the current blockchain's network ID. A few example values:

```javascript
'1': Ethereum Main Network
'2': Morden Test network
'3': Ropsten Test Network
'4': Rinkeby Test Network
'5': Goerli Test Network
'42': Kovan Test Network
```

### ethereum.selectedAddress

Returns a hex-prefixed string representing the current user's selected address, ex: `"0xfdea65c8e26263f6d9a1b5de9555d2931a33b825"`.

### ethereum.isMetaMask

Returns `true` or `false`, representing whether the user has MetaMask installed.

## Methods

### ethereum.enable()

Requests the user provides an ethereum address to be identified by.
Returns a promise of an array of hex-prefixed ethereum address strings.

#### Example (ES6)
Using an [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

```javascript
try {
  const accounts = await ethereum.enable()
  // You now have an array of accounts!
  // Currently only ever one:
  // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']

} catch (error) {
  // Handle error. Likely the user rejected the login
  console.error(error)
}
```

#### Example (ES5)
```javascript
ethereum.enable()
.then(function (accounts) {
  // You now have an array of accounts!
  // Currently only ever one:
  // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
})
.catch(function (error) {
  // Handle error. Likely the user rejected the login
  console.error(error)
})
```

### ethereum.send(options, callback) (To Be Replaced)

_This will be replaced with `ethereum.send(method: string, params: Array<any>)` on **January 13, 2020**._
_[Click here](https://github.com/MetaMask/metamask-docs/blob/new-provider/03_API_Reference/01_Ethereum_Provider.md#ethereumsendmethod-string-params-array) for more information._

See `ethereum.sendAsync`, directly below.

### ethereum.sendAsync(options, callback)

_To be superceded by the promise-returning send() method in
[EIP 1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md)._

Sends a message to the web3 browser. Message format maps to the format of
[the Ethereum JSON-RPC API](https://github.com/ethereum/wiki/wiki/JSON-RPC#json-rpc-methods).

Here's an example of everyone's favorite method, `eth_sendTransaction`, which is both how Ether is sent, and how smart contract methods are called:
```javascript
params: [{
  "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
  "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  "gas": "0x76c0", // 30400
  "gasPrice": "0x9184e72a000", // 10000000000000
  "value": "0x9184e72a", // 2441406250
  "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}]

ethereum.sendAsync({
  method: 'eth_sendTransaction',
  params: params,
  from: accounts[0], // Provide the user's account to use.
}, function (err, result) {
  // A typical node-style, error-first callback.
  // The result varies by method, per the JSON RPC API.
  // For example, this method will return a transaction hash on success.
})
```

### ethereum.autoRefreshOnNetworkChange (To Be Removed)

_This will be removed on January 13, 2020. At this time, MetaMask will also stop reloading the page on network changes._
_[Click here](https://medium.com/metamask/no-longer-reloading-pages-on-network-change-fbf041942b44) for more details._

When the network is changed, MetaMask will reload any pages that have made requests to the provider.
This automatic reload behavior will be removed in a future release of MetaMask, but in the meantime it can be disabled with this flag.

To disable auto-refresh on a network change you can do:

```javascript
ethereum.autoRefreshOnNetworkChange = false;
```

This can be toggled on or off at any time.

**Note:** Setting this flag to `true` results in the default behavior, which is subject to change. If your site relies upon MetaMask reloading it upon network change, you will need to trigger the reload yourself in a `networkChanged` event handler to ensure it continues to work with future releases.

### ethereum.on(eventName, callback)

The provider supports listening for some events:
- `accountsChanged`, returns updated account array.
- `networkChanged`, returns network ID string.

#### Example
```javascript
ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
})
```

**Note:** At the moment, the `networkChanged` event is only useful if you disable auto-refresh on network
change by setting [`ethereum.autoRefreshOnNetworkChange`](#ethereum.autorefreshonnetworkchange) to `false`.
Otherwise, MetaMask will default to auto-reloading pages upon network change if they have made requests to the provider.
_MetaMask will stop reloading pages on network change on January 13, 2020, and this setting will be removed._
_[Click here](https://medium.com/metamask/no-longer-reloading-pages-on-network-change-fbf041942b44) for more details._

# New API

This API will become available during the week of **November 25, 2019**.
It will be the only API supported starting **January 13, 2020.**
If you want examples of how to setup your dapp using the new API, you can check out
[this gist](https://gist.github.com/rekmarks/d318677c8fc89e5f7a2f526e00a0768a).

## Methods

### ethereum.send('eth_requestAccounts')

#### ethereum.enable() (Deprecated)

Requests that the user provides an ethereum address to be identified by.
Returns a promise of an array of hex-prefixed ethereum address strings.
See [EIP 1102](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md) for more details.

#### Example (ES6)
Using an [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function).

```javascript
try {
  const accounts = await ethereum.send('eth_requestAccounts')
  // You now have an array of accounts!
  // Currently only ever one:
  // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']

} catch (error) {
  if (error.code === 4001) { // EIP 1193 userRejectedRequest error
    console.log('Please connect to MetaMask.')
  } else {
    console.error(error)
  }
}
```

#### Example (ES5)

```javascript
ethereum.send('eth_requestAccounts')
.then(function (accounts) {
  // You now have an array of accounts!
  // Currently only ever one:
  // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
})
.catch(function (error) {
  if (error.code === 4001) { // EIP 1193 userRejectedRequest error
    console.log('Please connect to MetaMask.')
  } else {
    console.error(error)
  }
})
```

### ethereum.send(method: string, params: Array<any>)

The way to send requests to the dapp browser. `method` and `params` should follow [the Ethereum JSON-RPC API](https://github.com/ethereum/wiki/wiki/JSON-RPC#json-rpc-methods).

Returns a `Promise` that resolves to the result of the method. Not all methods require `params`, e.g. `ethereum.send('eth_accounts')`.

Here's an example of everyone's favorite method, `eth_sendTransaction`, which is both how Ether is sent, and how smart contract methods are called:
```javascript
params: [{
  "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
  "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  "gas": "0x76c0", // 30400
  "gasPrice": "0x9184e72a000", // 10000000000000
  "value": "0x9184e72a", // 2441406250
  "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}]

ethereum.send('eth_sendTransaction', params)
.then(function (result) {
  // The result varies by method, per the JSON RPC API.
  // For example, this method will return a transaction hash on success.
})
.catch(function (error) {
 // Like a typical promise, returns an error on rejection.
})
```

### ethereum.on(eventName, callback)

The provider supports listening for all events specified in [EIP 1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md#events).

The following are especially important for managing the state of your dapp:
- `accountsChanged`, returns an array of the currently available accounts.
- `chainChanged`, returns the hex-formatted chain ID string of the currently used chain/network.
- `networkChanged`, _(Discouraged)_ returns decimal-formatted network ID string of the currently used chain/network.

#### Example
```javascript
ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
})

ethereum.on('chainChanged', function (chainId) {
  // Time to make sure your any calls are directed to the correct chain!
})
```

#### List of Chain and Network IDs
```javascript
'1': Ethereum Main Network
'2': Morden Test network
'3': Ropsten Test Network
'4': Rinkeby Test Network
'5': Goerli Test Network
'42': Kovan Test Network
```

### ethereum.sendAsync(options, callback) (Deprecated)

_We strongly discourage the use of this method, which may be removed in the future._

Sends a message to the dapp browser. Message format maps to the format of
[the Ethereum JSON-RPC API](https://github.com/ethereum/wiki/wiki/JSON-RPC#json-rpc-methods).

Here's an example of everyone's favorite method, `eth_sendTransaction`, which is both how Ether is sent, and how smart contract methods are called:
```javascript
params: [{
  "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
  "to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
  "gas": "0x76c0", // 30400
  "gasPrice": "0x9184e72a000", // 10000000000000
  "value": "0x9184e72a", // 2441406250
  "data": "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675"
}]

ethereum.sendAsync({
  method: 'eth_sendTransaction',
  params: params,
  from: accounts[0], // Provide the user's account to use.
}, function (err, result) {
  // A typical node-style, error-first callback.
  // The result varies by method, per the JSON RPC API.
  // For example, this method will return a transaction hash on success.
})
```

## Properties

Useful for knowing whether `window.ethereum` is MetaMask, but not much else.

### ethereum.isMetaMask

`true` if the user has MetaMask installed, `false` otherwise.

### ethereum.networkVersion (Deprecated)

_We strongly discourage the use of this property, which may be removed in the future._

Returns a numeric string representing the current blockchain's network ID. A few example values:

```javascript
'1': Ethereum Main Network
'2': Morden Test network
'3': Ropsten Test Network
'4': Rinkeby Test Network
'5': Goerli Test Network
'42': Kovan Test Network
```

### ethereum.selectedAddress (Deprecated)

_We strongly discourage the use of this property, which may be removed in the future._

Returns a hex-prefixed string representing the current user's selected address, ex: `"0xfdea65c8e26263f6d9a1b5de9555d2931a33b825"`.
