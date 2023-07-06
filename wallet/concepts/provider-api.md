---
sidebar_position: 1.5
description: Learn about the MetaMask Ethereum provider API.
---

# Ethereum provider API

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
  provider method wraps the [MetaMask JSON-RPC API](rpc-api.md); dapps can use this
  provider method to call any RPC method.
- [Events](../reference/provider-api.md#events) - The provider emits events that dapps can listen to.

View the [provider API reference](../reference/provider-api.md) for all the provider properties,
methods, and events.

:::tip Use MetaMask SDK with the provider API
You can call the provider API from a dapp with or without [MetaMask SDK](sdk.md) installed, but we
recommend using the SDK to enable users to easily connect to the MetaMask browser extension and
MetaMask Mobile.
The SDK supports multiple dapp platforms including mobile and gaming dapps.

Get started by [setting up the SDK](../how-to/connect/set-up-sdk/index.md).
:::
