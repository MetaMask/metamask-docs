---
sidebar_position: 2
description: Learn about the MetaMask Ethereum provider API.
---

# About the Wallet API

MetaMask's Wallet API consists of an [Ethereum provider API](#ethereum-provider-api), which wraps
a [JSON-RPC API](#json-rpc-api).

:::tip API documentation
The API methods are documented in the following references:

- [Ethereum provider API reference](../reference/provider-api.md)
- [JSON-RPC API reference](/wallet/reference/json-rpc-api)
:::

## Ethereum provider API

MetaMask injects a global JavaScript API into websites visited by its users using the
`window.ethereum` provider object.
This API is specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193), and it allows dapps to
request users' Ethereum accounts, read data from blockchains the user is connected to, suggest
that the user sign messages and transactions, and more.

:::note
MetaMask supports [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), which introduces an
alternative discovery mechanism to the `window.ethereum` injected provider.
This alternative mechanism enables dapps to support [wallet interoperability](wallet-interoperabilty.md)
by discovering multiple injected wallet providers in a user's browser.
We recommend using this mechanism for provider discovery.
:::

The MetaMask Ethereum provider API contains the following:

- [Properties](../reference/provider-api.md#properties) - The provider contains a property that
  detects if a user has MetaMask installed.
- [Methods](../reference/provider-api.md#methods) - The provider contains methods that dapps can call.
  The [`window.ethereum.request(args)`](../reference/provider-api.md#windowethereumrequestargs)
  provider method wraps the [JSON-RPC API](#json-rpc-api); dapps can use this
  provider method to call any RPC method.
- [Events](../reference/provider-api.md#events) - The provider emits events that dapps can listen to.

View the [provider API reference](../reference/provider-api.md) for all the provider properties,
methods, and events.

## JSON-RPC API

MetaMask uses the [`window.ethereum.request(args)`](../reference/provider-api.md#windowethereumrequestargs)
method of the [provider API](#ethereum-provider-api) to wrap a JSON-RPC API.
The JSON-RPC API contains standard Ethereum JSON-RPC API methods and MetaMask-specific methods.

The RPC methods are documented in the interactive [JSON-RPC API reference](/wallet/reference/json-rpc-api).

:::note
All RPC method requests can return errors.
Make sure to handle errors for every call to
[`window.ethereum.request(args)`](../reference/provider-api.md#windowethereumrequestargs).
:::

Dapps communicate with MetaMask through JSON-RPC methods. 
These methods are divided into the following:

- [Restricted methods](#restricted-methods) -  Require user consent for actions that impact assets or data (for example initiating a transaction).
- [Unrestricted methods](#unrestricted-methods) - Allow dapps to perform basic actions without permission (for example retrieving a public address).

### Restricted methods

MetaMask implements permissions based on [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255) to enhance security for when users interact with dapps. 
This requires that dapps obtain user consent before accessing certain features. 
Under the hood, permissions are plain, JSON-compatible objects, with fields that are mostly used
internally by MetaMask.

Restricted methods are methods that cannot be called unless you have permission to do so using [`wallet_requestPermissions`](/wallet/reference/wallet_requestpermissions) or [`wallet_requestSnaps`](/wallet/reference/wallet_requestSnaps).

The following methods are restricted:

- [eth_accounts](/wallet/reference/eth_accounts) - Gaining permission requires calling `wallet_requestPermissions`. 
Granting permissions for `eth_accounts` also provides permissions for the following methods:
  - [`eth_sendTransaction`](/wallet/reference/eth_sendTransaction)
  - [`personal_sign`](/wallet/reference/personal_sign)
  - [`eth_signTypedData_v4`](/wallet/reference/eth_signTypedData_v4)

:::info note
To access accounts, we recommend using [`eth_requestAccounts`](/wallet/reference/eth_requestAccounts).
This method automatically obtains permissions for `eth_accounts` through an internal `wallet_requestPermissions` call.
See [how to access a user's accounts](../how-to/connect/access-accounts.md) for more information.
:::

- [`wallet_snap`](/wallet/reference/wallet_snap) - Gaining permission requires calling `wallet_requestSnap`.
- [`wallet_invokeSnap`](/wallet/reference/wallet_invokeSnap) - Gaining permission requires calling `wallet_requestSnap`.
  
:::info note
For more information on requesting permission to connect to `wallet_snap` and `wallet_invokeSnap`, see the example at the end of the [About the Snaps APIs](../../../../snaps/learn/about-snaps/apis/#custom-json-rpc-apis) page.
:::

### Unrestricted methods

Unrestricted methods do not require requesting permission to call them, but they might require confirmation by the
user (for example, [`wallet_addEthereumChain`](/wallet/reference/wallet_addethereumchain)).