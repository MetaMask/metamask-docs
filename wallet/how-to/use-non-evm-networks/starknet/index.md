---
description: Interact with users' Starknet accounts in MetaMask.
sidebar_position: 1
---

# Use Starknet

Starknet is a non-EVM Layer 2 network. To interact with Starknet accounts in MetaMask, you need to use the Starknet Snap.

You can use the [`get-starknet`](https://github.com/starknet-io/get-starknet) library or the `wallet_invokeSnap` JSON-RPC method to connect to the Starknet Snap.

[`get-starknet`](architecture):
- Provides a high-level API that abstracts complex operations.
- Offers standardized error handling.
- Supports multiple wallets, not limited to MetaMask.
- Manages wallet connections and Starknet interactions.
- Results are in more readable code.

[`wallet_invokeSnap`](../../../../snaps/reference/wallet-api-for-snaps/#wallet_invokesnap):
- Requires precise method names and parameter structures.
- Handles both MetaMask-specific and Starknet-specific errors.
- Is designed for operating within the MetaMask framework.
- Manages lower-level Starknet interactions directly.
- Provides results in more detailed, lower-level code.

:::note

We recommend using the `get-starknet` library for most use cases due to its ease of configuration. 

There are [limitations](#limitations) on the methods that are avilabile when using `get-starknet`. For more information on the methods you can use when interacting with users' Starknet accounts, see the [Starknet Snap API documentation](../../../reference/non-evm-apis/starknet-snap-api.md).

:::


## Limitations

Not all methods are supported by both `get-starknet` and `wallet_invokeSnap`. The following table lists which methods are availabile for the two implemnatations. 

| Method | `wallet_invokeSnap` | `get-starknet` |
|--------|:---:|:---:|
| [`starkNet_createAccount`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_createAccount) | ✓ | |
| [`starkNet_displayPrivateKey`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_displayPrivateKey) | ✓ | |
| [`starkNet_estimateAccountDeployFee`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_estimateAccountDeployFee) | ✓ | |
| [`starkNet_estimateFee`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_estimateFee) | ✓ | |
| [`starkNet_extractPublicKey`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_extractPublicKey) | ✓ | ✓ |
| [`starkNet_getErc20TokenBalance`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_getErc20TokenBalance) | ✓ | |
| [`starkNet_getStoredUserAccounts`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_getStoredUserAccounts) | ✓ | |
| [`starkNet_getTransactions`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_getTransactions) | ✓ | |
| [`starkNet_getTransactionStatus`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_getTransactionStatus) | ✓ | |
| [`starkNet_getValue`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_getValue) | ✓ | |
| [`starkNet_recoverAccounts`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_recoverAccounts) | ✓ | |
| [`starkNet_sendTransaction`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_sendTransaction) | ✓ | |
| [`starkNet_signMessage`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_signMessage) | ✓ | ✓ |
| [`starkNet_upgradeAccContract`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_upgradeAccContract) | ✓ | ✓ |
| [`starkNet_verifyMessage`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_verifyMessage) | ✓ | ✓ |
