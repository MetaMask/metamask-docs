# The Ethereum RPC API

MetaMask uses the `ethereum.sendAsync()` (and soon, `ethereum.send()`) API to wrap an RPC API which is based on an interface exposed by all Ethereum clients, with some extra methods that are provided by MetaMask, as a key-holding signer. You can look up how to pass these methods to the `window.ethereum` object [here](./Ethereum_Provider).

This document is a cross-post of [EIP 1474](https://github.com/ethereum/EIPs/pull/1474/), which aims to standardize the declaration of this interface.

For the full API, please see [EIP 1474](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1474.md).
