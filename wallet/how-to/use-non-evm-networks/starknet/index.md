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

<table>
  <thead>
    <tr>
      <th></th>
      <th>Functionality</th>
      <th>`get-starknet`</th>
      <th>`wallet_invokeSnap`</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3"><b>Account management</b></td>
      <td>Deploy an account</td>
      <td><a href="https://starknetjs.com/docs/API/classes/Account/#deployaccount">`deployAccount` ↗</a></td>
      <td><a href=" /wallet/reference/non-evm-apis/starknet-snap-api/#starknet_createaccount">`starkNet_createAccount`</a></td>
    </tr>
    <tr>
      <td>Recover an account address</td>
      <td><a href="https://github.com/starknet-io/get-starknet/blob/ff37390b25b8368ebeb5f2323e2d8826964b41ae/packages/core/src/StarknetWindowObject.ts#L95">`getAddress` ↗</a></td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_recoveraccounts">`starkNet_recoverAccounts`</a></td>
    </tr>
    <tr>
      <td>Display a private key</td>
      <td>n/a</td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_displayprivatekey">`starkNet_displayPrivateKey`</a></td>
    </tr>
    <tr>
      <td rowspan="2"><b>Gas and fees</b></td>
      <td>Estimate the gas fee</td>
      <td><a href="https://starknetjs.com/docs/API/classes/Account/#estimatefeebulk">`estimateFeeBulk` ↗</a></td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_estimatefee">`starkNet_estimateFee`</a></td>
    </tr>
    <tr>
      <td>Estimate the account deploy fee</td>
      <td><a href="https://starknetjs.com/docs/API/classes/Account/#estimateaccountdeployfee">`estimateAccountDeployFee` ↗</a></td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_estimateaccountdeployfee">`starkNet_estimateAccountDeployFee`</a></td>
    </tr>
    <tr>
      <td rowspan="2"><b>Token management</b></td>
      <td>Add an ERC-20 token</td>
      <td><a href="https://github.com/starknet-io/get-starknet/blob/ff37390b25b8368ebeb5f2323e2d8826964b41ae/packages/core/src/StarknetWindowObject.ts#L58">`watchAsset` ↗</a></td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_adderc20token">`starkNet_addErc20Token`</a></td>
    </tr>
    <tr>
      <td>Get the ERC-20 token balance</td>
      <td><a href="http://starknetjs.com/docs/API/classes/Provider/#callcontract">`callContract` ↗</a></td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_geterc20tokenbalance">`starkNet_getErc20TokenBalance`</a></td>
    </tr>
    <tr>
      <td rowspan="8"><b>Signing and transactions</b></td>
      <td>Sign a message</td>
      <td><a href="https://starknetjs.com/docs/API/classes/Signer#signmessage">`signMessage` ↗</a></td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_signmessage">`starkNet_signMessage`</a></td>
    </tr>
    <tr>
      <td>Sign a transaction</td>
      <td><a href="https://starknetjs.com/docs/API/classes/Signer#signtransaction">`signTransaction` ↗</a></td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_signtransaction">`starkNet_signTransaction`</a></td>
    </tr>
    <tr>
      <td>Sign a declare transaction</td>
      <td><a href="https://starknetjs.com/docs/API/classes/Signer#signdeclaretransaction">`signDeclareTransaction` ↗</a></td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_signdeclaretransaction">`starkNet_signDeclareTransaction`</a></td>
    </tr>
    <tr>
      <td>Verify a signed message</td>
      <td>n/a</td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_verifysignedmessage">`starkNet_verifySignedMessage`</a></td>
    </tr>
    <tr>
      <td>Execute a transaction</td>
      <td><a href="https://starknetjs.com/docs/API/classes/Account/#execute">`execute` ↗</a></td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_executetxn">`starkNet_executeTxn`</a></td>
    </tr>
    <tr>
      <td>Declare a contract</td>
      <td><a href="https://starknetjs.com/docs/API/classes/Account/#declarecontract">`declareContract` ↗</a></td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_declarecontract">`starkNet_declareContract`</a></td>
    </tr>
    <tr>
      <td>Get transactions</td>
      <td><a href="https://starknetjs.com/docs/API/classes/Account/#gettransaction">`getTransaction` ↗</a></td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_gettransaction">`starkNet_getTransaction`</a></td>
    </tr>
    <tr>
      <td>Get the transaction status</td>
      <td><a href="https://starknetjs.com/docs/API/classes/Account/#gettransactionstatus">`getTransactionStatus` ↗</a></td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_gettransactionstatus">`starkNet_getTransactionStatus`</a></td>
    </tr>
    <tr>
      <td rowspan="4"><b>Network management</b></td>
      <td>Switch networks</td>
      <td><a href="https://github.com/starknet-io/get-starknet/blob/ff37390b25b8368ebeb5f2323e2d8826964b41ae/packages/core/src/StarknetWindowObject.ts#L58">`switchNetwork` ↗</a></td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_switchnetwork">`starkNet_switchNetwork`</a></td>
    </tr>
    <tr>
      <td>Get the current network</td>
      <td><a href="https://starknetjs.com/docs/API/classes/Provider#getchainid">`getChainId` ↗</a></td>
      <td><a href="../../../reference/non-evm-apis/starknet-snap-api.md#starknet_getcurrentnetwork">`starkNet_getCurrentNetwork`</a></td>
    </tr>
  </tbody>
</table>
