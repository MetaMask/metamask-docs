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

:::info Note
MetaMask supports [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), which introduces an
alternative wallet detection mechanism to the `window.ethereum` injected provider.
This alternative mechanism enables dapps to support [wallet interoperability](wallet-interoperability.md)
by discovering multiple injected wallet providers in a user's browser.
We recommend [using this mechanism to connect to MetaMask](../how-to/connect/index.md).

You can access the provider API using the selected EIP-6963 provider object.
Throughout this documentation, we refer to the selected provider using `provider`.
:::

The MetaMask Ethereum provider API contains the following:

- [Properties](../reference/provider-api.md#properties) - The provider contains a property that
  detects if a user has MetaMask installed.
- [Methods](../reference/provider-api.md#methods) - The provider contains methods that dapps can call.
  The [`request()`](../reference/provider-api.md#request)
  provider method wraps the [JSON-RPC API](#json-rpc-api); dapps can use this
  provider method to call any RPC method.
- [Events](../reference/provider-api.md#events) - The provider emits events that dapps can listen to.

View the [provider API reference](../reference/provider-api.md) for all the provider properties,
methods, and events.

## JSON-RPC API

MetaMask uses the [`request()`](../reference/provider-api.md#request)
method of the [provider API](#ethereum-provider-api) to wrap a JSON-RPC API.
The JSON-RPC API contains standard Ethereum JSON-RPC API methods and MetaMask-specific methods.

The RPC methods are documented in the interactive [JSON-RPC API reference](/wallet/reference/json-rpc-api).

:::note
All RPC method requests can return errors.
Make sure to handle errors for every call to
[`request()`](../reference/provider-api.md#request).
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
