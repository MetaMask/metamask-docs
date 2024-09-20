---
description: Interact with users' Starknet accounts in MetaMask.
sidebar_position: 1
---

# Use Starknet

[Starknet](https://www.starknet.io/) is a non-EVM Layer 2 network.
You can interact with users' Starknet accounts in MetaMask by connecting to the
[Starknet Snap](https://snaps.metamask.io/snap/npm/consensys/starknet-snap/).

You can use the [`get-starknet`](https://github.com/starknet-io/get-starknet) library or the
[`wallet_invokeSnap`](/snaps/reference/wallet-api-for-snaps/#wallet_invokesnap) JSON-RPC method from
your dapp to connect to the Starknet Snap.
See [Connect to Starknet](connect-to-starknet.md) to get started.

## Connection options

The [`get-starknet`](architecture) library:

- Provides a high-level API that abstracts complex operations.
- Supports [a subset of the Starknet Snap API methods](#supported-methods).
- Standardizes error handling.
- Supports multiple wallets, not limited to MetaMask.
- Manages wallet connections and Starknet interactions.
- Provides results in more readable code.

The [`wallet_invokeSnap`](/snaps/reference/wallet-api-for-snaps/#wallet_invokesnap) method:

- Requires precise method names and parameter structures.
- Supports [all Starknet Snap API methods](#supported-methods).
- Handles both MetaMask-specific and Starknet-specific errors.
- Is designed for operating within the MetaMask framework.
- Manages lower-level Starknet interactions directly.
- Provides results in more detailed, lower-level code.

:::warning Important

We recommend using the `get-starknet` library for most use cases due to its ease of configuration
and multi-wallet support. 

:::


## Supported methods

Once connected to the Starknet Snap, your dapp can call
[Starknet Snap API](../../../reference/non-evm-apis/starknet-snap-api.md) methods to interact with
users' Starknet accounts.
Not all methods are supported by both `get-starknet` and `wallet_invokeSnap`.
The following table lists the supported methods for each connection option: 

| Method                                                                                                                        | `get-starknet` |           `wallet_invokeSnap`            |
|-------------------------------------------------------------------------------------------------------------------------------|:--------------:|:----------------------------------------:|
| [`starkNet_createAccount`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_createAccount)                       |                |                    ✓                     |
| [`starkNet_displayPrivateKey`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_displayPrivateKey)               |                |                    ✓                     |
| [`starkNet_estimateAccountDeployFee`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_estimateAccountDeployFee) |                |                    ✓                     |
| [`starkNet_estimateFee`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_estimateFee)                           |                |                    ✓                     |
| [`starkNet_extractPublicKey`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_extractPublicKey)                 |       ✓        |                    ✓                     |
| [`starkNet_getErc20TokenBalance`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_getErc20TokenBalance)         |                |                    ✓                     |
| [`starkNet_getStoredUserAccounts`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_getStoredUserAccounts)       |                |                    ✓                     |
| [`starkNet_getTransactions`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_getTransactions)                   |                |                    ✓                     |
| [`starkNet_getTransactionStatus`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_getTransactionStatus)         |                |                    ✓                     |
| [`starkNet_getValue`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_getValue)                                 |                |                    ✓                     |
| [`starkNet_recoverAccounts`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_recoverAccounts)                   |                |                    ✓                     |
| [`starkNet_sendTransaction`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_sendTransaction)                   |                |                    ✓                     |
| [`starkNet_signMessage`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_signMessage)                           |       ✓        |                    ✓                     |
| [`starkNet_upgradeAccContract`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_upgradeAccContract)             |       ✓        |                    ✓                     |
| [`starkNet_verifyMessage`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_verifyMessage)                       |       ✓        |                    ✓                     |
