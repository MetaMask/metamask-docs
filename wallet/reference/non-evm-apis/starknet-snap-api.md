---
description: See the Starknet Snap API reference.
sidebar_position: 1
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Starknet Snap API

When connected to the [Starknet Snap](../../how-to/use-non-evm-networks/starknet/index.md), dapps
can use the Starknet Snap API to interact with users' Starknet accounts (for example, to send transactions).

The examples on this page use the
[`wallet_invokeSnap`](/snaps/reference/wallet-api-for-snaps/#wallet_invokesnap) JSON-RPC method,
which supports all Starknet Snap API methods.

:::note

You can also communicate with the Starknet network using the
[Starknet API](/services/reference/starknet).

:::

## Supported networks

Starknet currently supports two public networks.
Use these networks' chain IDs with the Starknet Snap API methods.

| Network           | Chain ID (Hexadecimal)   |
|-------------------|--------------------------|
| Mainnet           | `0x534e5f4d41494e`       |
| Testnet (Sepolia) | `0x534e5f5345504f4c4941` |

## API methods

### `starkNet_createAccount`

Deploys an account contract.

#### Parameters

- `addressIndex`: `integer` - (Optional) Specific address index of the derived key in
  [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki).
- `deploy`: `boolean` - (Optional) Indicate whether to include send the deploy transaction for the
  account contract.
  The default is `false`.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

#### Returns

The address of the account and the transaction hash if the account has been created.

#### Example

<Tabs>
<TabItem value="Request">

```js
await getEip6963Provider.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_createAccount",
      "params": {
        "addressIndex": 1,
        "deploy": true,
        "chainId": "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
{
  "transaction_hash": "0x05a56e2d52c817161883f50c441c3228cfe54d9f84b5b5b8b1c8b8e0e6f7e6d8",
  "address": "0xb60e8dd61c5d32be8058bb8eb970870f07233155"
}
```

</TabItem>
</Tabs>

### `starkNet_displayPrivateKey`

Extracts the private key from the deployed Starknet account and displays it in MetaMask.

#### Parameters

- `userAddress`: `string` - Address of the account contract.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

#### Returns

Always returns `null` for security reasons.
The private key is only shown in the MetaMask pop-up window.

#### Example

<Tabs>
<TabItem value="Request">

```js
await getEip6963Provider.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_displayPrivateKey",
      params: {
        userAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        "chainId": "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
null
```

</TabItem>
</Tabs>

### `starkNet_estimateAccountDeployFee`

Gets the estimated gas fee for deploying an account contract.

#### Parameters

- `addressIndex`: `integer` - (Optional) Specific address index of the derived key in
  [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki).
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

#### Returns

An object with the following properties (where values are originally `bigint` but converted to
base-10 `string` format using `.toString(10)`):

- `suggestedMaxFee`: `string` - The maximum suggested fee for deploying the contract, in wei.
- `overallFee`: `string` - The overall fee for the deployment transaction, in wei.
- `gasConsumed`: `string` - The amount of gas consumed during the transaction.
  The default is `0`.
- `gasPrice`: `string` - The gas price used for the transaction, in wei.
  The default is `0`.
- `unit`: `string` - The unit of the fees and gas values, which is `wei`.

#### Example

<Tabs>
<TabItem value="Request">

```js
await getEip6963Provider.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_estimateAccountDeployFee",
      params: {
        addressIndex: 0,
        "chainId": "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
{
  "suggestedMaxFee": "1000000000000000",
  "overallFee": "900000000000000",
  "gasConsumed": "1000000",
  "gasPrice": "1000000000",
  "unit": "wei"
}
```

</TabItem>
</Tabs>

### `starkNet_estimateFee`

Gets the estimated gas fee for calling a method on any contract.

#### Parameters

- `address`: `string` - The account address from which the transaction is being made.
- `invocations`: `array` - The [invocations](https://starknetjs.com/docs/API/namespaces/types#invocations)
  to estimate the fee for.
  Each invocation represents a contract call.
- `chainId`: `string` - The chain ID of the target Starknet network.
  If not provided, the default is the Starknet Goerli testnet.
- `details`: `object` - (Optional) The [universal details](https://starknetjs.com/docs/API/interfaces/types.EstimateFeeDetails)
  associated with the invocations, such as nonce and version.

#### Returns

A promise that resolves to an `EstimateFeeResponse` object, which contains the following properties:

- `suggestedMaxFee`: `string` - The maximum suggested fee for the transaction, in wei.
  This value is originally a `bigint` and is converted to a base-10 `string`.
- `overallFee`: `string` - The overall fee for the transaction, in wei.
  This value is originally a `bigint` and is converted to a base-10 `string`.
- `unit`: `string` - The unit of the fees, typically `wei`.
- `includeDeploy`: `boolean` - Whether the transaction includes an account deployment step.

#### Example

<Tabs>
<TabItem value="Request">

```js
await getEip6963Provider.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_estimateFee",
      params: {
        contractAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        contractFuncName: "transfer",
        contractCallData: "0x456...,0x789...,100",
        senderAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        "chainId": "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
{
  "suggestedMaxFee": "1000000000000000",
  "overallFee": "900000000000000",
  "gasConsumed": "1000000",
  "gasPrice": "1000000000",
  "unit": "wei",
  "includeDeploy": false
}
```

</TabItem>
</Tabs>

### `starkNet_extractPublicKey`

:::note

This method is supported by the `get-starknet` library.

:::

Extracts the public key from a Starknet account address.

#### Parameters

- `userAddress`: `string` - Address of the account contract.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

#### Returns

The public key of the given account address (can be different from the actual signer).

#### Example

<Tabs>
<TabItem value="Request">

```js
await getEip6963Provider.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_extractPublicKey",
      params: {
        userAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        "chainId": "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
"0x04bfcab3b7ca7e8b3f3b62b2f7f77e9e4b68080bbf8f0f4a1c8f890864d2c7c1d3c45d8b2e3f5f1c27dfeea4c2f5733e90bfc7484e2a690aa9b8ac4559d2e6a8d7"
```

</TabItem>
</Tabs>

### `starkNet_getErc20TokenBalance`

Gets the user's current balance of an ERC-20 token.

#### Parameters

- `tokenAddress`: `string` - Address of the ERC-20 token contract.
- `userAddress`: `string` - Address of the user account.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

#### Returns

The latest and pending token balance in hexadecimal.

#### Example

<Tabs>
<TabItem value="Request">

```js
await getEip6963Provider.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_getErc20TokenBalance",
      params: {
        tokenAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        userAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        "chainId": "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
{ 
  "balancePending": "0x3e8", 
  "balanceLatest": "0x3e8", 
}
```

</TabItem>
</Tabs>

### `starkNet_getTransactions`

Gets the transaction records from a sender address.

#### Parameters

- `senderAddress`: `string` - Address of the sender.
- `contractAddress`: `string` - (Optional) Address of the called contract.
- `pageSize`: `integer` - (Optional) Page size when calling the Voyager get "api/txns" endpoint.
  Options are `10`, `25`, and `50`.
  The default is `10`.
- `txnsInLastNumOfDays`: `integer` - (Optional) Number of past days of transaction records to be
  fetched from Voyager.
  The default is `5`.
- `withDeployTxn`: `boolean` - (Optional) Indicates whether to include the deploy transaction of the
  sender's account contract.
  The default is `false`.
- `onlyFromState`: `boolean` - (Optional) Indicates whether to only retrieve transaction records
  that are stored in Snap state, that is, those in `RECEIVED`, `PENDING`, `ACCEPTED_ON_L2`, or
  `REJECTED` state.
  The default is `false`.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

#### Returns

The list of the transaction records.

#### Example

<Tabs>
<TabItem value="Request">

```js
await getEip6963Provider.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_getTransactions",
      params: {
        senderAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        contractAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        pageSize: 25,
        txnsInLastNumOfDays: 7,
        withDeployTxn: true,
        onlyFromState: false,
        "chainId": "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
[
  {
    "txnHash": "0x05a56e2d52c817161883f50c441c3228cfe54d9f84b5b5b8b1c8b8e0e6f7e6d8",
    "txnType": "invoke",
    "senderAddress": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    "contractAddress": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    "contractFuncName": "transfer",
    "contractCallData": ["0x789...", "100"],
    "status": "ACCEPTED_ON_L2",
    "failureReason": null,
    "eventIds": ["0xdef..."],
    "timestamp": 1234567890,
    "chainId": "0x534e5f5345504f4c4941"
  },
  // ... more transactions
]
```

</TabItem>
</Tabs>

### `starkNet_getTransactionStatus`

Gets the status of a transaction.

#### Parameters

- `transactionHash`: `string` - Hash of the target transaction.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

#### Returns

The [status](https://docs.starknet.io/architecture-and-concepts/network-architecture/transaction-life-cycle/)
of the transaction.

#### Example

<Tabs>
<TabItem value="Request">

```js
await getEip6963Provider.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_getTransactionStatus",
      params: {
        transactionHash: "0x05a56e2d52c817161883f50c441c3228cfe54d9f84b5b5b8b1c8b8e0e6f7e6d8",
        "chainId": "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
"ACCEPTED_ON_L2"
```

</TabItem>
</Tabs>

### `starkNet_getValue`

Calls a `VIEW` method on any contract.

#### Parameters

- `contractAddress`: `string` - Address of the target contract.
- `contractFuncName`: `string` - Target function name of the contract.
- `contractCallData`: `string` - (Optional) Call data for the target function with `,` as a separator.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

#### Returns

The response from the [`starknet_call`](/services/reference/starknet/json-rpc-methods/starknet_call)
API method.

#### Example

<Tabs>
<TabItem value="Request">

```js
await getEip6963Provider.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_getValue",
      params: {
        contractAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        contractFuncName: "balanceOf",
        contractCallData: "0x456...",
        "chainId": "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
{
  "result": ["1000"]
}
```

</TabItem>
</Tabs>

### `starkNet_recoverAccounts`

Recovers deployed user accounts from the seed phrase of MetaMask based on
[BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki).

#### Parameters

- `startScanIndex`: `integer` - (Optional) Starting address index of the derived key in
  [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki).
  The default is `0`.
- `maxScanned`: `integer` - (Optional) Maximum number of addresses to scan during the recovery process.
  The default is `1`.
- `maxMissed`: `integer` - (Optional) Maximum number of uninitialized addresses hit during the
  recovery process.
  The default is `1`.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

#### Returns

The list of the scanned user accounts during the recovery process.

#### Example

<Tabs>
<TabItem value="Request">

```js
await getEip6963Provider.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_recoverAccounts",
      params: {
        startScanIndex: 0,
        maxScanned: 5,
        maxMissed: 2,
        "chainId": "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
[
  {
    "address": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    "addressIndex": 0,
    "publicKey": "0x04bfcab3b7ca7e8b3f3b62b2f7f77e9e4b68080bbf8f0f4a1c8f890864d2c7c1d3c45d8b2e3f5f1c27dfeea4c2f5733e90bfc7484e2a690aa9b8ac4559d2e6a8d7",
    "addressSalt": "0x789...",
    "deployTxnHash": "0x05a56e2d52c817161883f50c441c3228cfe54d9f84b5b5b8b1c8b8e0e6f7e6d8",
    "derivationPath": "m/44'/9004'/0'/0/0",
    "chainId": "0x534e5f5345504f4c4941"
  },
  // ... more accounts
]
```

</TabItem>
</Tabs>

### `starkNet_executeTxn`

Signs and executes a transaction.

#### Parameters

- `address`: `string` - The address of the sender.
- `calls`: An array of call objects to be executed.
  Each call contains the target contract address, function name, and call data.
- `details`: `object` - (Optional) Transaction details as received by `starknet.js`, including:
  - `nonce`: (Optional) Nonce for the transaction.
  - `blockIdentifier`: (Optional) Block identifier for the transaction.
  - `maxFee`: (Optional) Maximum gas fee allowed for the transaction.
    If not specified, the fee is automatically calculated.
  - `tip`: (Optional) Additional fee to incentivize miners.
  - `paymasterData`: (Optional) Paymaster-related data for the transaction.
  - `accountDeploymentData`: (Optional) Data for account deployment.
  - `nonceDataAvailabilityMode`: (Optional) Mode for nonce data availability.
  - `feeDataAvailabilityMode`: (Optional) Mode for fee data availability.
  - `version`: (Optional) The transaction version.
  - `resourceBounds`: (Optional) The boundaries on resource consumption during the transaction.
  - `skipValidate`: `boolean` - (Optional) Skip validation of the transaction.
- `abis`: `any` - (Optional) Contract ABI for decoding the call data.
- `chainId`: `string` - The Starknet chain ID. Default is Starknet Sepolia testnet.

#### Returns

The hash of the transaction.

#### Example

<Tabs>
<TabItem value="Request">

```js
await getEip6963Provider.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_executeTxn",
      params: {
        contractAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        contractFuncName: "transfer",
        contractCallData: "0x456...,0x789...,100",
        senderAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        maxFee: "1000000000000000",
        "chainId": "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
{
  "transaction_hash": "0x05a56e2d52c817161883f50c441c3228cfe54d9f84b5b5b8b1c8b8e0e6f7e6d8"
}
```

</TabItem>
</Tabs>

### `starkNet_signMessage`

:::note
This method is supported by the `get-starknet` library.
:::

Signs a typed data message.

#### Parameters

- `typedDataMessage`: `string` - JSON representation of the typed data to be signed.
- `signerAddress`: `string` - Address of the signer.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

#### Returns

The signed hash of typed data.

#### Example

<Tabs>
<TabItem value="Request">

```js
await getEip6963Provider.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_signMessage",
      params: {
        typedDataMessage,
        signerAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        "chainId": "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
"1234567890,9876543210"
```

</TabItem>
</Tabs>

### `starkNet_upgradeAccContract`

:::note

This method is supported by the `get-starknet` library.

:::

Upgrades an account contract.

#### Parameters

- `contractAddress`: `string` - Address of the target contract.
- `maxFee`: `string` - (Optional) Maximum gas fee allowed from the sender.
  If not specified, the maximum fee is automatically calculated.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

#### Returns

The hash of the transaction.

#### Example

<Tabs>
<TabItem value="Request">

```js
await getEip6963Provider.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_upgradeAccContract",
      params: {
        contractAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        maxFee: "1000000000000000",
        "chainId": "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
{
  "transaction_hash": "0xdef..."
}
```

</TabItem>
</Tabs>

### `starkNet_verifySignedMessage`

:::note

This method is supported by the `get-starknet` library.

:::

Verifies a signed typed data message.

#### Parameters

- `typedDataMessage`: `string` - JSON representation of the original typed data message to be verified.
- `address`: `string` - Address of the signer.
- `signature`: `string` - Signature of the typed data message.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

#### Returns

`true` if the signature is verified, `false` otherwise.

#### Example

<Tabs>
<TabItem value="Request">

```js
await getEip6963Provider.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_verifySignedMessage",
      params: {
        typedDataMessage: "{ ... }",
        address: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        signature: "1234567890,9876543210",
        "chainId": "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
true
```

</TabItem>
</Tabs>
