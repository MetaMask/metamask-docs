---
sidebar_position: 3
description: Learn about the MetaMask JSON-RPC API.
---

# JSON-RPC API

MetaMask uses the [`window.ethereum.request(args)`](../reference/provider-api.md#windowethereumrequestargs)
method of the [provider API](provider-api.md) to wrap a JSON-RPC API.
The JSON-RPC API contains standard Ethereum JSON-RPC API methods and MetaMask-specific methods.

:::tip MetaMask API Playground
The RPC methods are documented in the interactive
[MetaMask JSON-RPC API Playground](/wallet/reference/eth_subscribe).
:::

Methods in the API playground may have the following tags:

- **MetaMask** - These methods behave in ways specific to MetaMask, and may or may not be supported
  by other wallets.
  Some of these methods are documented in more detail on this page.
- **Restricted** - These methods are [restricted](#restricted-methods), which require requesting
  permission using [`wallet_requestPermissions`](/wallet/reference/wallet_requestpermissions).
- **Mobile** - These methods are only available on MetaMask Mobile.

For more information on the standard Ethereum RPC methods, see the
[Ethereum wiki](https://eth.wiki/json-rpc/API#json-rpc-methods).

:::note
All RPC method requests can return errors.
Make sure to handle errors for every call to
[`window.ethereum.request(args)`](../reference/provider-api.md#windowethereumrequestargs).
:::

## Restricted methods

MetaMask introduced web3 wallet permissions in [EIP-2255](https://eips.ethereum.org/EIPS/eip-2255).
In this permissions system, each RPC method is restricted or unrestricted.
If a method is restricted, a dapp must request permission to call it using
[`wallet_requestPermissions`](/wallet/reference/wallet_requestpermissions).
Under the hood, permissions are plain, JSON-compatible objects, with fields that are mostly used
internally by MetaMask.

Outside of [Snaps restricted methods](/snaps/reference/rpc-api/#restricted-methods), the only
restricted method is [`eth_accounts`](/wallet/reference/eth_accounts), which allows you to access
the user's Ethereum accounts.
More restricted methods will be added in the future.

## Unrestricted methods

Unrestricted methods have no corresponding permission, but they might still rely on permissions to
succeed (for example, the signing methods require calling the restricted
[`eth_accounts`](/wallet/reference/eth_accounts) method), or they might require confirmation by the
user (for example, [`wallet_addEthereumChain`](/wallet/reference/wallet_addethereumchain)).

See the [JSON-RPC API reference](../reference/rpc-api.md) for some MetaMask-specific unrestricted
methods and examples of how to implement them.
For the full list of MetaMask JSON-RPC API methods, see the
[API playground](/wallet/reference/eth_subscribe).
