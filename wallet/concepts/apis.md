---
sidebar_position: 3
description: Learn about the MetaMask Ethereum provider API.
---

# About the MetaMask APIs

MetaMask supports an [Ethereum provider API](#ethereum-provider-api), which wraps a [JSON-RPC API](#json-rpc-api).

:::tip API documentation
The API methods are documented in the following references:

- [Ethereum provider API reference](../reference/provider-api.md)
- [JSON-RPC API playground](/wallet/reference/eth_subscribe)
:::

## Ethereum provider API

MetaMask injects a global JavaScript API into websites visited by its users using the
`window.ethereum` provider object.
This API is specified by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193), and it allows dapps to
request users' Ethereum accounts, read data from blockchains the user is connected to, suggest
that the user sign messages and transactions, and more.

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

:::tip Use MetaMask SDK with the provider API
You can call the provider API from a dapp without [MetaMask SDK](sdk/index.md) installed, but we
recommend using the SDK to enable users to easily connect to the MetaMask browser extension and
MetaMask Mobile.
The SDK supports multiple dapp platforms including mobile and gaming dapps.

Get started by [setting up the SDK](../how-to/connect/set-up-sdk/index.md).
:::

## JSON-RPC API

MetaMask uses the [`window.ethereum.request(args)`](../reference/provider-api.md#windowethereumrequestargs)
method of the [provider API](#ethereum-provider-api) to wrap a JSON-RPC API.
The JSON-RPC API contains standard Ethereum JSON-RPC API methods and MetaMask-specific methods.

The RPC methods are documented in the interactive
[JSON-RPC API playground](/wallet/reference/eth_subscribe).
Methods in the API playground may have the following tags:

- **MetaMask** - These methods behave in ways specific to MetaMask, and may or may not be supported
  by other wallets.
- **Restricted** - These methods are [restricted](#restricted-methods), which require requesting
  permission using [`wallet_requestPermissions`](/wallet/reference/wallet_requestpermissions).
- **Mobile** - These methods are only available on MetaMask Mobile.
- **Ethereum API** - These are standard Ethereum JSON-RPC API methods.
  See the [Ethereum wiki](https://eth.wiki/json-rpc/API#json-rpc-methods) for more information on
  these methods.

:::note
All RPC method requests can return errors.
Make sure to handle errors for every call to
[`window.ethereum.request(args)`](../reference/provider-api.md#windowethereumrequestargs).
:::

### Restricted methods

MetaMask introduced wallet permissions in [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255).
In this permissions system, each RPC method is restricted or unrestricted.
If a method is restricted, a dapp must request permission to call it using
[`wallet_requestPermissions`](/wallet/reference/wallet_requestpermissions).
Under the hood, permissions are plain, JSON-compatible objects, with fields that are mostly used
internally by MetaMask.

Outside of [Snaps restricted methods](/snaps/reference/rpc-api/#restricted-methods), the only
restricted method is [`eth_accounts`](/wallet/reference/eth_accounts), which allows you to access
the user's Ethereum accounts.
More restricted methods will be added in the future.

### Unrestricted methods

Unrestricted methods do not require requesting permission to call them, but they might still rely on
permissions to succeed (for example, the signing methods require calling the restricted
[`eth_accounts`](/wallet/reference/eth_accounts) method), or they might require confirmation by the
user (for example, [`wallet_addEthereumChain`](/wallet/reference/wallet_addethereumchain)).
