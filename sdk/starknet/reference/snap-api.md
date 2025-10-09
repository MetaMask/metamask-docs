---
description: See the Starknet Snap API reference.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Starknet Snap API

When connected to the Starknet Snap, dapps
can use the Starknet Snap API to interact with users' Starknet accounts (for example, to send transactions).

The examples on this page use the
[`wallet_invokeSnap`](/snaps/reference/wallet-api-for-snaps/#wallet_invokesnap) JSON-RPC method,
which supports all Starknet Snap API methods.

:::note

We recommend using [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) for detecting the MetaMask wallet when using the `wallet_invokeSnap` approach. This ensures better interoperability and improved wallet integration.

:::

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
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_createAccount",
      params: {
        addressIndex: 1,
        deploy: true,
        chainId: "0x534e5f5345504f4c4941"
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

### `starkNet_declareContract`

Registers a contract's class on the Starknet blockchain without deploying it.

#### Parameters

- `senderAddress`: `string` - Address of the sender.
- `chainId`: `string` - (Optional) ID of the target Starknet network. The default is the Starknet Sepolia testnet.
- `contractPayload`: `object` - Transaction payload to be deployed.
  - `contract`: `CompiledContract` | `string` - The compiled contract code ([in Cairo](https://book.cairo-lang.org/ch13-00-introduction-to-starknet-smart-contracts.html)).
  - `classHash?`: `string` - (Optional) The computed class hash of compiled contract.
  - `casm?`: `CompiledContract` | `string` - (Optional) - The compiled [casm](https://docs.starknet.io/architecture-and-concepts/smart-contracts/cairo-and-sierra/).
  - `compiledClassHash?`: `string` - (Optional) The compiled class hash from casm.
- `invocationsDetails`: `object` - (Optional) Transaction details object containing:
  - `nonce`: (Optional) Nonce for the transaction.
  - `blockIdentifier`: (Optional) Block identifier for the transaction.
  - `maxFee`: (Optional) Maximum gas fee allowed for the transaction. If not specified, the fee is automatically calculated.
  - `tip`: (Optional) Additional fee to incentivize miners.
  - `paymasterData`: (Optional) Paymaster-related data for the transaction.
  - `accountDeploymentData`: (Optional) Data for account deployment.
  - `nonceDataAvailabilityMode`: (Optional) Mode for nonce data availability.
  - `feeDataAvailabilityMode`: (Optional) Mode for fee data availability.
  - `version`: (Optional) The transaction version.
  - `resourceBounds`: (Optional) The boundaries on resource consumption during the transaction.
  - `skipValidate`: `boolean` - (Optional) Skip validation of the transaction.

#### Returns

The confirmation of sending a transaction on the Starknet contract, which contains:
  
- `transaction_hash`: `string` - The transaction hash.
- `class_hash`: `string` - The computed class hash of compiled contract.

#### Example

<Tabs>
<TabItem value="Request">

```js
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_declareContract",
      params: {
        senderAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        contractPayload: {
          contract: {
            // The compiled contract code
          }
        },
        chainId: "0x534e5f5345504f4c4941",
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
  "class_hash": "0xb60e8dd61c5d32be8058bb8eb970870f07233155"
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
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_displayPrivateKey",
      params: {
        userAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        chainId: "0x534e5f5345504f4c4941"
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
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_estimateAccountDeployFee",
      params: {
        addressIndex: 0,
        chainId: "0x534e5f5345504f4c4941"
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
  If not provided, the default is the Starknet Sepolia testnet.
- `details`: `object` - (Optional) The [universal details](https://starknetjs.com/docs/API/interfaces/types.EstimateFeeDetails)
  associated with the invocations, such as nonce and version.

#### Returns

A promise that resolves to an `EstimateFeeResponse` object, which contains the following properties:

- `suggestedMaxFee`: `string` - The maximum suggested fee for the transaction, in wei.
  This value is originally a `bigint` and is converted to a base-10 `string`.
- `overallFee`: `string` - The overall fee for the transaction, in wei.
  This value is originally a `bigint` and is converted to a base-10 `string`.
- `gasConsumed`: `string`- The estimated amount of gas the transaction uses.
- `gasPrice`: `string` - The gas price per unit, represented as a string in wei.
- `unit`: `string` - The unit of the fees, typically `wei`.
- `includeDeploy`: `boolean` - Whether the transaction includes an account deployment step.

#### Example

<Tabs>
<TabItem value="Request">

```js
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_estimateFee",
      params: {
        address: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        invocations: [
          {
            entrypoint: "transfer", 
            calldata: [
              "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
              "1000000000000000000"
            ]
          }
        ],
        chainId: "0x534e5f5345504f4c4941",
        details: {
          nonce: 1,
          maxFee: "2000000000000000"
        }
      },
    },
  },
});
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
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_executeTxn",
      params: {
        address: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        calls: [
          {
            entrypoint: "transfer",
            calldata: [
              "0x1234567890abcdef1234567890abcdef12345678",
              "1000000000000000000"
            ]
          }
        ],
        details: {
          nonce: 1,
          maxFee: "2000000000000000",
        },
        chainId: "0x534e5f5345504f4c4941"
      }
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

### `starkNet_extractPublicKey`

Extracts the public key from a Starknet account address.

#### Parameters

- `userAddress`: `string` - Address of the account contract.
- `chainId`: `string` - (Optional) ID of the target Starknet network. The default network is the Starknet Sepolia testnet.

#### Returns

The public key associated with the specified account address (which may differ from the signer's public key).

#### Example

<Tabs>
<TabItem value="Request">

```js
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_extractPublicKey",
      params: {
        userAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        chainId: "0x534e5f5345504f4c4941"
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

### `starkNet_getCurrentNetwork`

Retrieves the current Starknet Snap's network.

#### Parameters

None

#### Returns

A network object containing the name and chain ID of the network.

#### Example

<Tabs>
<TabItem value="Request">

```js
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_getCurrentNetwork"
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
{
  "name": "StarkNet Sepolia Testnet",
  "chainId": "0x534e5f5345504f4c4941"
}
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

The latest and pending token balance, represented in hexadecimal.

#### Example

<Tabs>
<TabItem value="Request">

```js
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_getErc20TokenBalance",
      params: {
        tokenAddress: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
        userAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        chainId: "0x534e5f5345504f4c4941"
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

### `starkNet_addErc20Token`

Add an ERC-20 token to the watch list.

#### Parameters

- `address`: `string` - Address of the sender.
- `chainId`: `string` - ID of the target Starknet network. 
- `tokenAddress`: `string` - The contract address of the token. 
- `tokenName`: `string` - The name of the token. 
- `tokenSymbol`: `string` - The string symbol of the token. 
- `tokenDecimals?`: `string` | `number` - The decimals of the token. 

#### Returns

The token object that was added to the watch list.

#### Example

<Tabs>
<TabItem value="Request">

```js
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_addErc20Token",
      params: {
        address: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        chainId: "0x534e5f5345504f4c4941",
        tokenAddress: "0x1234567890123456789012345678901234567890",
        tokenName: "Ether",
        tokenSymbol: "ETH",
        tokenDecimals: 18
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
{
  "address": "0x1c4c12F3dfDAEa0D9a2b981A5a5DDE1a3c11dD54", 
  "symbol": "SNK", 
  "decimals": 18, 
  "logo": "https://starknet-logo.com/snk-logo.png"
}
```

</TabItem>
</Tabs>

### `starkNet_getTransaction`

Gets the transaction records from a sender address.

#### Parameters

- `senderAddress`: `string` - Address of the sender.
- `contractAddress`: `string` - (Optional) Address of the called contract.
- `pageSize`: `integer` - (Optional) Number of records to fetch per page from the Voyager API `/txn` endpoints.
  Options are `10`, `25`, and `50`.
  The default is `10`.
- `txnsInLastNumOfDays`: `integer` - (Optional) Number of days of transaction records to retrieve from Voyager.
  The default is `5`.
- `withDeployTxn`: `boolean` - (Optional) Indicates whether to include the deployment transaction of the
  sender's account contract.
  The default is `false`.
- `onlyFromState`: `boolean` - (Optional) Indicates whether to only retrieve transaction records
  that are stored in Snap state, such as those in `RECEIVED`, `PENDING`, `ACCEPTED_ON_L2`, or
  `REJECTED` statuses.
  The default is `false`.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

#### Returns

The list of the transaction records.

#### Example

<Tabs>
<TabItem value="Request">

```js
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
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
        chainId: "0x534e5f5345504f4c4941"
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
{
  "txnHash": "0x12f84d2b52a172c817161883f50c441c3e5f84d9f84b5b5b8b1c8b8e0e6f7e6f",
  "txnType": "invoke",
  "senderAddress": "0x1a2B3c4D5e6F7G8h9I0J1K2L3M4N5P6Q7R8S9T0U",
  "contractAddress": "0x7AeD16c89125645FA675bD12C1f894Ae6458bcdF",
  "contractFuncName": "transfer",
  "contractCallData": [
    "0x3cAe7bD56f7b6A7De348F5dC856E1b123D45B3A5",
    "1000000000000000000",
  ],
  "status": "ACCEPTED_ON_L2",
  "failureReason": null,
  "eventIds": [
    "0xabc123def4567890abc123def4567890"
  ],
  "timestamp": 1697070653, 
  "chainId": "0x534e5f5345504f4c4941"
}
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
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_getTransactionStatus",
      params: {
        transactionHash: "0x05a56e2d52c817161883f50c441c3228cfe54d9f84b5b5b8b1c8b8e0e6f7e6d8",
        chainId: "0x534e5f5345504f4c4941"
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
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_recoverAccounts",
      params: {
        startScanIndex: 0,
        maxScanned: 5,
        maxMissed: 2,
        chainId: "0x534e5f5345504f4c4941"
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
    "addressSalt": "0x789abc123456789abc123456789abc123456789abc123456789abc1234567890",
    "deployTxnHash": "0x05a56e2d52c817161883f50c441c3228cfe54d9f84b5b5b8b1c8b8e0e6f7e6d8",
    "derivationPath": "m/44'/9004'/0'/0/0",
    "chainId": "0x534e5f5345504f4c4941"
  },
  ...
]
```

</TabItem>
</Tabs>

### `starkNet_signDeclareTransaction`

Signs a [`DECLARE` transaction](https://docs.starknet.io/architecture-and-concepts/network-architecture/transactions/#declare-transaction) using the private key, returns the signature, and uses it to declare the contract class on Starknet.

#### Parameters

- `address`: `string` - Address of the sender.
- `chainId`: `string` - ID of the target Starknet network. 
- `details`: `object` - The declare transaction details to be signed, including:
  - `nonce`: (Optional) Nonce for the transaction.
  - `blockIdentifier`: (Optional) Block identifier for the transaction.
  - `maxFee`: (Optional) Maximum gas fee allowed for the transaction. If not specified, the fee is automatically calculated.
  - `tip`: (Optional) Additional fee to incentivize miners.
  - `paymasterData`: (Optional) Paymaster-related data for the transaction.
  - `accountDeploymentData`: (Optional) Data for account deployment.
  - `nonceDataAvailabilityMode`: (Optional) Mode for nonce data availability.
  - `feeDataAvailabilityMode`: (Optional) Mode for fee data availability.
  - `version`: (Optional) The transaction version.
  - `resourceBounds`: (Optional) The boundaries on resource consumption during the transaction.
  - `skipValidate`: `boolean` - (Optional) Skip validation of the transaction.
  - `classHash`: The computed class hash of compiled contract
  - `compiledClassHash`: `string` - (Optional) The compiled class hash from casm.
  - `senderAddress`: `string` - Address of the sender.
  - `chainId`: `string` - ID of the target Starknet network. 

#### Returns

The signature of the transaction that declares a contract class.

#### Example

<Tabs>
<TabItem value="Request">

```js
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_signDeclareTransaction",
      params: {
        senderAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        chainId: "0x534e5f5345504f4c4941",
        details: {
          version: "0x2",
          chainId:  "0x534e5f5345504f4c4941",
          senderAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
          classHash: "0x5f3614e8671257aff9ac38e929c74d65b02d460ae966cd826c9f04a7fa8e0d4"
        }
      },
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```js
{
  "signature": [
    "0x1b6efab56d39b2acdf5c631c5b1ec1e365e8a36576fa8e3e29ec53566b5782c6", 
    "0x43a9e7f9f9c9238b4d534c5a7621a9c5946f34e72604b539c7bb1ac0a7c2b95b"
  ]
}
```

</TabItem>
</Tabs>

### `starkNet_signMessage`

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
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_signMessage",
      params: {
        typedDataMessage,
        signerAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        chainId: "0x534e5f5345504f4c4941"
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

### `starkNet_signTransaction`

Signs a transaction using the private key and returns the resulting signature.

#### Parameters

- `address`: `string` - Address of the sender.
- `chainId`: `string` - ID of the target Starknet network. 
- `transactions`: `object` - An array of call objects to be executed. Each call contains the target contract address, function name, and call data.
- `transactionsDetail`: `object` - (Optional) The transaction details to be signed, including:
  - `nonce`: (Optional) Nonce for the transaction.
  - `blockIdentifier`: (Optional) Block identifier for the transaction.
  - `maxFee`: (Optional) Maximum gas fee allowed for the transaction. If not specified, the fee is automatically calculated.
  - `tip`: (Optional) Additional fee to incentivize miners.
  - `paymasterData`: (Optional) Paymaster-related data for the transaction.
  - `accountDeploymentData`: (Optional) Data for account deployment.
  - `nonceDataAvailabilityMode`: (Optional) Mode for nonce data availability.
  - `feeDataAvailabilityMode`: (Optional) Mode for fee data availability.
  - `version`: (Optional) The transaction version.
  - `resourceBounds`: (Optional) The boundaries on resource consumption during the transaction.
  - `skipValidate`: `boolean` - (Optional) Skip validation of the transaction.

#### Returns

The signature of the transaction.

#### Example

<Tabs>
<TabItem value="Request">

```js
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_signTransaction",
      params: {
        senderAddress: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        chainId: "0x534e5f5345504f4c4941",
        transactions: [
          {
            entrypoint: "transfer",
            calldata: [
              "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", 
              "1000000000000000000"
            ]
          }
        ]
      }
    },
  },
})
```

</TabItem>
<TabItem value="Result">

```json
[
  "0x1b6efab56d39b2acdf5c631c5b1ec1e365e8a36576fa8e3e29ec53566b5782c6", 
  "0x43a9e7f9f9c9238b4d534c5a7621a9c5946f34e72604b539c7bb1ac0a7c2b95b"
]
```

</TabItem>
</Tabs>

### `starkNet_switchNetwork`

Switch the current Starknet Snap's network to a different Starknet network.

#### Parameters

`chainId`: `string` - ID of the target Starknet network. 

#### Returns

`true` if the network switch was successful, `false` otherwise.

#### Example

<Tabs>
<TabItem value="Request">

```js
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_switchNetwork",
      "params": {
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


### `starkNet_verifySignedMessage`

Verifies a signed typed data message.

#### Parameters

- `typedDataMessage`: `string` - JSON representation of the original typed data message to be verified.
- `address`: `string` - Address of the signer.
- `signature`: `string` - Signature of the typed data message.
- `chainId`: `string` - (Optional) ID of the target Starknet network.
  The default is the Starknet Sepolia testnet.

#### Returns

`true` if the signature verification was successful, `false` otherwise.

#### Example

<Tabs>
<TabItem value="Request">

```js
await provider.request({           // Or window.ethereum if you don't support EIP-6963.
  method: "wallet_invokeSnap",
  params: {
    snapId: "npm:@consensys/starknet-snap",
    request: {
      method: "starkNet_verifySignedMessage",
      params: {
        typedDataMessage: {
          "types": {
            "StarkNetDomain": [
              { "name": "name", "type": "felt" },
              { "name": "version", "type": "felt" },
              { "name": "chainId", "type": "felt" },
              { "name": "verifyingContract", "type": "felt" }
            ],
            "Transaction": [
              { "name": "from", "type": "felt" },
              { "name": "to", "type": "felt" },
              { "name": "amount", "type": "felt" }
            ]
          },
          "primaryType": "Transaction",
          "domain": {
            "name": "StarkNet",
            "version": "1",
            "chainId": "0x534e5f5345504f4c4941",
            "verifyingContract": "0x6789abcd1234ef567890abcdef1234567890abcd"
          },
          "message": {
            "from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
            "to": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
            "amount": "1000000000000000000"
          }
        },
        address: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
        signature: "0x1b2d3f4e5a6c7b8d9e0f1234567890ab,0x9876543210fedcba0123456789abcdef",
        chainId: "0x534e5f5345504f4c4941"
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
