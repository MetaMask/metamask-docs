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

The [`get-starknet`](about-get-starknet) library:

- Provides a high-level API that abstracts complex operations.
- Supports [a subset of the Starknet Snap API methods](#supported-methods).
- Standardizes error handling.
- Supports connecting to multiple Starknet wallets, not limited to MetaMask.
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
Learn more [about how `get-starknet` interacts with MetaMask](about-get-starknet.md).

:::

## Interaction with Starknet Snap

After it is connected to the Starknet Snap, your dapp can interact with the Starknet network through two main integration options: `get-starknet` and `wallet_invokeSnap`. 
Both options provide access to similar functionalities, but offer different ways of interacting with users' Starknet accounts.

- `wallet_invokeSnap: Manages direct interactions between the dApp and the Starknet Snap. It facilitates network communication for account creation, transaction signing, fee estimation, and other Starknet-related actions.

- `get-starknet`: Provides the same functionalities as `wallet_invokeSnap` and integrates a Starknet Window Object (SWO). 
The SWO simplifies account management and signing, and enhances the  experience of handling account states and transactions. 
You interact with the [Account object](https://starknetjs.com/docs/API/classes/Account) in the SWO for operations.

The following table lists the core functionalities that each integration option supports:

| Functionality | `get-starknet` | `wallet_invokeSnap` |
|---------------|----------------|---------------------|
| Create an account |  | [`starkNet_createAccount`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_createAccount) |
| Estimate a fee | [`estimateFeeBulk`](https://starknetjs.com/docs/API/classes/Account/#estimatefeebulk) | [`starkNet_estimateFee`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_estimateFee) |
| Estimate the account deploy fee | [`estimateAccountDeployFee`](https://starknetjs.com/docs/API/classes/Account/#estimateaccountdeployfee) | [`starkNet_estimateAccountDeployFee`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_estimateaccountdeployfee) |
| Extract the public key | [`getPublicKey`](https://starknetjs.com/docs/api/classes/Signer/#getpubkey) | [`starkNet_extractPublicKey`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_extractPublicKey) |
| Get an ERC20 token balance | [`callContract`](http://starknetjs.com/docs/API/classes/Provider/#callcontract) | [`starkNet_getErc20TokenBalance`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_getErc20TokenBalance) |
| Recover an account address | [`getAddress`](https://github.com/starknet-io/get-starknet/blob/ff37390b25b8368ebeb5f2323e2d8826964b41ae/packages/core/src/StarknetWindowObject.ts#L95) | [`starkNet_recoverAccounts`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_recoverAccounts) |
| Get transaction status | [`getTransactionStatus`](https://starknetjs.com/docs/API/classes/Account/#gettransactionstatus) | [`starkNet_getTransactionStatus`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_getTransactionStatus) |
| Sign a message | [`signMessage`](https://starknetjs.com/docs/API/classes/Signer#signmessage) | [`starkNet_signMessage`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_signMessage) |
| Sign a transaction | [`signTransaction`](https://starknetjs.com/docs/API/classes/Signer#signtransaction) | [`starkNet_signTransaction`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_signTransaction) |
| Sign eclare Transaction | [`signDeclareTransaction`](https://starknetjs.com/docs/API/classes/Signer#signdeclaretransaction) | [`starkNet_signDeclareTransaction`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_signDeclareTransaction) |
| Execute a transaction | [`execute`](https://starknetjs.com/docs/API/classes/Account/#execute) | [`starkNet_executeTxn`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_executeTxn) |
| Add an ERC20 token | [`watchAsset`](https://github.com/starknet-io/get-starknet/blob/ff37390b25b8368ebeb5f2323e2d8826964b41ae/packages/core/src/StarknetWindowObject.ts#L58) | [`starkNet_addErc20Token`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_addErc20Token) |
| Switch networks | [`switchNetwork`](https://github.com/starknet-io/get-starknet/blob/ff37390b25b8368ebeb5f2323e2d8826964b41ae/packages/core/src/StarknetWindowObject.ts#L58) | [`starkNet_switchNetwork`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_switchNetwork) |
| Get the current network | [`getChainId`](https://starknetjs.com/docs/API/classes/Provider#getchainid) | [`starkNet_getCurrentNetwork`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_getCurrentNetwork) |
| Declare a contract | [`declareContract`](https://starknetjs.com/docs/API/classes/Account/#declarecontract) | [`starkNet_declareContract`](../../../reference/non-evm-apis/starknet-snap-api.md#starkNet_declareContract) |