---
sidebar_class_name: "visible"
description: See the MetaMask JSON-RPC API reference.
---

# JSON-RPC API

This section provides an interactive reference for the JSON-RPC API of MetaMask's [Wallet API](../../concepts/wallet-api.md). The API builds on a set of standard Ethereum methods with MetaMask-specific enhancements, and is designed for seamless integration into dapps.

View the JSON-RPC API methods by selecting a method in the left sidebar. You can test the methods directly in the page using the API playground, with pre-configured examples or custom parameters. You can also save URLs with custom parameters using your browser's bookmarks.

Each method may have one or more of the following labels:

- **MetaMask** - The functionalities of these methods are specific to MetaMask, and may or may not be supported by other wallets.
- **Restricted** - These methods are restricted and require requesting permission using [`wallet_requestPermissions`](/wallet/reference/json-rpc-methods/wallet_requestpermissions).
- **Mobile** - These methods are only available on the MetaMask mobile app.
- **Ethereum API** - These are standard Ethereum JSON-RPC API methods. See the [Ethereum wiki](https://ethereum.org/en/#json-rpc-methods) for more information about these methods.
- **Multichain API** - These methods are compatible with the [Multichain API](../multichain-api.md).
- **Experimental** - These methods are experimental and may be changed in the future.
- **Deprecated** - These methods are deprecated and may be removed in the future.
