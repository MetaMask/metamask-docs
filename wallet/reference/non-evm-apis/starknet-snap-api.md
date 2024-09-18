---
description: See the Starknet Snap API reference.
sidebar_position: 1
toc_max_heading_level: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Starknet Snap API

With the [Starknet Snap](../../how-to/use-non-evm-networks/starknet/index.md) installed, dapps can
use the Starknet Snap API to interact with users' Starknet accounts (for example, to send transactions).

:::note

You can also communicate with the Starknet network using the
[Starknet API](/services/reference/starknet).

:::

Starknet currently operates two public networks. Each network is identified by a unique chain ID. Use these chain IDs when configuring your dapp or interacting with the Starknet networks.

| Network | Chain ID (Hexadecimal) |
|---------|------------------------|
| Mainnet | `0x534e5f4d41494e`     |
| Sepolia testnet | `0x534e5f5345504f4c4941` |

Use these constants when specifying the network in your Starknet transactions or when configuring your development environment.

:::note

Always verify you're using the correct chain ID for your intended network to avoid unintended transactions on the wrong network.

:::

## `starkNet_createAccount`

Deploys an account contract.

### Parameters

- `addressIndex`: `integer` - (Optional) Specific address index of the derived key in
  [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki).
- `deploy`: `boolean` - (Optional) Indicate whether to include send the deploy transaction for the
  account contract.
  The default is `false`.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

### Returns

The response from Starknet's `gateway/add_transaction` API endpoint.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
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

## `starkNet_displayPrivateKey`

Extracts the private key from the deployed Starknet account and displays it in MetaMask.

### Parameters

- `userAddress`: `string` - Address of the account contract.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

### Returns

Always returns `null` for security reasons.
The private key is only shown in the MetaMask pop-up window.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
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

## `starkNet_estimateAccountDeployFee`

Gets the estimated gas fee for deploying an account contract.

### Parameters

- `addressIndex`: `integer` - (Optional) Specific address index of the derived key in
  [BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki).
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

### Returns

The response from Starknet's `feeder_gateway/estimate_fee` API endpoint.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
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
  "unit": "wei",
  "includeDeploy": true
}
```

</TabItem>
</Tabs>

## `starkNet_estimateFee`

Gets the estimated gas fee for calling a method on any contract.

### Parameters

- `contractAddress`: `string` - Address of the target contract.
- `contractFuncName`: `string` - Target function name of the contract.
- `contractCallData`: `string` - (Optional) Call data for the target function with `,` as a separator.
- `senderAddress`: `string` - Address of the sender.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

### Returns

The response from Starknet's `feeder_gateway/estimate_fee` API endpoint.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
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

## `starkNet_extractPublicKey`

:::note

This method is integrated into `get-starknet`.

:::

Extracts the public key from a Starknet account address.

### Parameters

- `userAddress`: `string` - Address of the account contract.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

### Returns

The public key of the given account address (can be different from the actual signer).

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
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

## `starkNet_getErc20TokenBalance`

Gets the user's current balance of an ERC-20 token.

### Parameters

- `tokenAddress`: `string` - Address of the ERC-20 token contract.
- `userAddress`: `string` - Address of the user account.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

### Returns

The token balance in hexadecimal.

```js
{ 
  balancePending: "0x0", 
  balanceLatest: "0x0", 
}
```

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
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

## `starkNet_getStoredUserAccounts`

Gets a list of stored user accounts that are either initialized or initializing.

### Parameters

`chainId`: `string` - (Optional) ID of the target Starknet network.
The default is the Starknet Sepolia testnet.

### Returns

The list of the stored user accounts.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_getStoredUserAccounts",
      params: {
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

## `starkNet_getTransactions`

Gets the transaction records from a sender address.

### Parameters

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

### Returns

The list of the transaction records.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
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

## `starkNet_getTransactionStatus`

Gets the status of a transaction.

### Parameters

- `transactionHash`: `string` - Hash of the target transaction.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

### Returns

The [status](https://docs.starknet.io/architecture-and-concepts/network-architecture/transaction-life-cycle/)
of the transaction.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
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

## `starkNet_getValue`

Calls a `VIEW` method on any contract.

### Parameters

- `contractAddress`: `string` - Address of the target contract.
- `contractFuncName`: `string` - Target function name of the contract.
- `contractCallData`: `string` - (Optional) Call data for the target function with `,` as a separator.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

### Returns

The response from Starknet's `feeder_gateway/call_contract` API endpoint.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
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

## `starkNet_recoverAccounts`

:::note
This method is integrated into `get-starknet`.
:::

Recovers deployed user accounts from the seed phrase of MetaMask based on
[BIP-44](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki).

### Parameters

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

### Returns

The list of the scanned user accounts during the recovery process.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
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

## `starkNet_sendTransaction`

Signs and sends a transaction.

### Parameters

- `contractAddress`: `string` - Address of the target contract.
- `contractFuncName`: `string` - Target function name of the contract.
- `contractCallData`: `string` - (Optional) Call data for the target function with `,` as a separator.
- `senderAddress`: `string` - Address of the sender.
- `maxFee`: `string` - (Optional) Maximum gas fee allowed from the sender.
  If not specified, the maximum fee is automatically calculated.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

### Returns

The response from Starknet's `gateway/add_transaction` API endpoint.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_sendTransaction",
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

## `starkNet_signMessage`

:::note
This method is integrated into `get-starknet`.
:::

Signs a typed data message.

### Parameters

- `typedDataMessage`: `string` - JSON representation of the typed data to be signed.
- `signerAddress`: `string` - Address of the signer.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

### Returns

The signed hash of typed data.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_signMessage",
      params: {
        typedDataMessage: "{ ... }",
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

## `starkNet_upgradeAccContract`

Upgrades an account contract.

### Parameters

- `contractAddress`: `string` - Address of the target contract.
- `maxFee`: `string` - (Optional) Maximum gas fee allowed from the sender.
  If not specified, the maximum fee is automatically calculated.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

### Returns

The response from Starknet's `gateway/call_contract` API endpoint.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
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

## `starkNet_verifyMessage`

Verifies a signed typed data message.

### Parameters

- `typedDataMessage`: `string` - JSON representation of the original typed data message to be verified.
- `signerAddress`: `string` - Address of the signer.
- `signature`: `string` - Signature of the typed data message.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

### Returns

`true` if the signature is verified, `false` otherwise.

### Example

<Tabs>
<TabItem value="Request">

```js
await window.ethereum.request({
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_verifyMessage",
      params: {
        typedDataMessage: "{ ... }",
        signerAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
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
