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
Both options support similar functionalities, but offer different ways of interacting with users'
Starknet accounts.
See [Connect to Starknet](connect-to-starknet.md) to get started.


The following sections compare the two connection options.

## `get-starknet`

:::warning Important

We recommend using the `get-starknet` library for most use cases due to its ease of configuration
and multi-wallet support.
Learn more [about how `get-starknet` interacts with MetaMask](about-get-starknet.md).

:::

The `get-starknet` library:

- Provides a high-level API that abstracts complex operations.
- Standardizes error handling.
- Supports connecting to multiple Starknet wallets, not limited to MetaMask.
- Manages wallet connections and Starknet interactions.
- Provides results in more readable code.

`get-starknet` provides the same functionalities as `wallet_invokeSnap` and integrates a Starknet
Window Object (SWO).
The SWO simplifies account management and signing, and enhances the  experience of handling account
states and transactions.
A dapp uses the [Account object](https://starknetjs.com/docs/API/classes/Account) in the SWO to manage operations.

## `wallet_invokeSnap`

The `wallet_invokeSnap` method:

- Requires precise method names and parameter structures.
- Handles both MetaMask-specific and Starknet-specific errors.
- Is designed for operating within the MetaMask framework.
- Manages lower-level Starknet interactions directly.
- Provides results in more detailed, lower-level code.

`wallet_invokeSnap` manages direct interactions between the dapp and the Starknet Snap.
It facilitates network communication for account creation, transaction signing, fee estimation, and
other Starknet-related actions.

## Supported functionalities

The following section lists the core functionalities and API methods that each connection option supports:

### Account management

| **Functionality**               | `get-starknet`                                                                                                                                                         | `wallet_invokeSnap`                                                                                                           |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Deploy an account               | [`deployAccount` ↗](https://starknetjs.com/docs/API/classes/Account/#deployaccount)                                                                                    | [`starkNet_createAccount`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_createaccount)                       |
| Recover an account address      | [`getAddress` ↗](https://github.com/starknet-io/get-starknet/blob/ff37390b25b8368ebeb5f2323e2d8826964b41ae/packages/core/src/StarknetWindowObject.ts#L95)              | [`starkNet_recoverAccounts`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_recoveraccounts)                   |
| Display a private key           |                                                                                                                                                                        | [`starkNet_displayPrivateKey`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_displayprivatekey)               |

### Gas and fees

| **Functionality**               | `get-starknet`                                                                                                                                                         | `wallet_invokeSnap`                                                                                                           |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Estimate the gas fee            | [`estimateFeeBulk` ↗](https://starknetjs.com/docs/API/classes/Account/#estimatefeebulk)                                                                                | [`starkNet_estimateFee`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_estimatefee)                           |
| Estimate the account deploy fee | [`estimateAccountDeployFee` ↗](https://starknetjs.com/docs/API/classes/Account/#estimateaccountdeployfee)                                                              | [`starkNet_estimateAccountDeployFee`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_estimateaccountdeployfee) |

### Token management

| **Functionality**               | `get-starknet`                                                                                                                                                         | `wallet_invokeSnap`                                                                                                           |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Add an ERC-20 token             | [`watchAsset` ↗](https://github.com/starknet-io/get-starknet/blob/ff37390b25b8368ebeb5f2323e2d8826964b41ae/packages/core/src/StarknetWindowObject.ts#L58)              | [`starkNet_addErc20Token`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_adderc20token)                       |
| Get the ERC-20 token balance    | [`callContract` ↗](http://starknetjs.com/docs/API/classes/Provider/#callcontract)                                                                                      | [`starkNet_getErc20TokenBalance`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_geterc20tokenbalance)         |

### Signing and transactions

| **Functionality**               | `get-starknet`                                                                                                                                                         | `wallet_invokeSnap`                                                                                                           |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Sign a message                  | [`signMessage` ↗](https://starknetjs.com/docs/API/classes/Signer#signmessage)                                                                                          | [`starkNet_signMessage`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_signmessage)                           |
| Sign a transaction              | [`signTransaction` ↗](https://starknetjs.com/docs/API/classes/Signer#signtransaction)                                                                                  | [`starkNet_signTransaction`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_signtransaction)                   |
| Sign a declare transaction      | [`signDeclareTransaction` ↗](https://starknetjs.com/docs/API/classes/Signer#signdeclaretransaction)                                                                    | [`starkNet_signDeclareTransaction`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_signdeclaretransaction)     |
| Verify a signed message         |                                                                                                                                                                        | [`starkNet_verifySignedMessage`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_verifysignedmessage)           |
| Execute a transaction           | [`execute` ↗](https://starknetjs.com/docs/API/classes/Account/#execute)                                                                                                | [`starkNet_executeTxn`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_executetxn)                             |
| Declare a contract              | [`declareContract` ↗](https://starknetjs.com/docs/API/classes/Account/#declarecontract)                                                                                | [`starkNet_declareContract`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_declarecontract)                   |

### Network management

| **Functionality**               | `get-starknet`                                                                                                                                                         | `wallet_invokeSnap`                                                                                                           |
|---------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| Switch networks                 | [`switchNetwork` ↗](https://github.com/starknet-io/get-starknet/blob/ff37390b25b8368ebeb5f2323e2d8826964b41ae/packages/core/src/StarknetWindowObject.ts#L58)           | [`starkNet_switchNetwork`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_switchnetwork)                       |
| Get the current network         | [`getChainId` ↗](https://starknetjs.com/docs/API/classes/Provider#getchainid)                                                                                          | [`starkNet_getCurrentNetwork`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_getcurrentnetwork)               |
| Get transactions                | [`getTransaction` ↗](https://starknetjs.com/docs/API/classes/Account/#gettransaction)                                                                                   | [`starkNet_getTransaction`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_gettransaction)                     |
| Get the transaction status      | [`getTransactionStatus` ↗](https://starknetjs.com/docs/API/classes/Account/#gettransactionstatus)                                                                      | [`starkNet_getTransactionStatus`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_gettransactionstatus)         |
