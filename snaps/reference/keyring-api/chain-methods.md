---
sidebar_position: 2
tags:
  - Keyring API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Chain Methods API

[Account management Snaps](../../features/custom-evm-accounts/index.md) can choose to implement the
following EVM methods to support dapp requests from custom accounts.

## EOA methods

The following methods are used by externally owned accounts (EOAs).

### `personal_sign`

Presents a plain text signature challenge to the user and returns the signed response.
Equivalent to `eth_sign` on some other wallets, and prepends a safe prefix to the signed message to
prevent the challenge tricking users into signing a financial transaction.

#### Parameters

An array containing:

1. Message to sign: `string` - Hex-encoded UTF-8 string to present to the user.
2. Address: `string` - Address of the requested signing account.

#### Returns

Signature: `string` - Hex-encoded signature.

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "personal_sign",
  "params": [
    "0x4578616d706c652060706572736f6e616c5f7369676e60206d657373616765",
    "0x5874174dcf1ab6F7Efd8496f4f09404CD1c5bA84"
  ]
}
```

</TabItem>
<TabItem value="Response">

```json
"0x262d12322b75228d09bbe3c104b91c1df32794126ce6a851e5c2721deb42d60e20b6eff3a1e2b5d29c2680edfb42e8497dbd7e75d0591a390a9385861b40f73d1c"
```

</TabItem>
</Tabs>

### `eth_signTransaction`

Signs a transaction that can be submitted to the network later using
[`eth_sendRawTransaction`](https://ethereum.org/developers/docs/apis/json-rpc#eth_sendrawtransaction).

#### Parameters

An array containing:

1. Transaction object to sign, which contains:
   - `type`: `string` - [Transaction type.](https://docs.infura.io/api/networks/ethereum/concepts/transaction-types)
   - `nonce`: `string` - Anti-replay parameter.
   - `to`: `string` - Recipient address, or `null` if this is a contract creation transaction.
   - `from`: `string` - Sender address.
   - `value`: `string` - Value to be transferred, in wei.
   - `data`: `string` - Compiled code of a contract OR hash of the invoked method signature and
     encoded parameters.
   - `gasLimit`: `string` - Gas provided by the sender.
   - `gasPrice`: `string` - (Optional) Gas price, in wei, provided by the sender.
   - `maxPriorityFeePerGas`: `string` - (Optional) Maximum fee, in wei, the sender is willing to
     pay per gas above the base fee.
   - `maxFeePerGas`:`string` - (Optional) Maximum total fee (base fee + priority fee), in wei, the
     sender is willing to pay per gas.
   - `accessList`: `object[]` - (Optional) List of addresses and storage keys the transaction plans to access.
   - `chainId`: `string` - Chain ID.

#### Returns

A signature object containing:

- `v`: `string` - ECDSA Recovery ID.
- `r`: `string` - ECDSA signature r.
- `s`: `string` - ECDSA signature s.

#### Example

<Tabs>
<TabItem value="EIP-1559 request">

```json
{
  "method": "eth_signTransaction",
  "params": [
    {
      "type": "0x2",
      "nonce": "0x1",
      "to": "0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb",
      "from": "0x660265edc169bab511a40c0e049cc1e33774443d",
      "value": "0x0",
      "data": "0x",
      "gasLimit": "0x5208",
      "maxPriorityFeePerGas": "0x3b9aca00",
      "maxFeePerGas": "0x2540be400",
      "accessList": [],
      "chainId": "0xaa36a7"
    }
  ]
}
```

</TabItem>
<TabItem value="Legacy request">

```json
{
  "method": "eth_signTransaction",
  "params": [
    {
      "type": "0x0",
      "nonce": "0x0",
      "to": "0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb",
      "from": "0x660265edc169bab511a40c0e049cc1e33774443d",
      "value": "0x0",
      "data": "0x",
      "gasLimit": "0x5208",
      "gasPrice": "0x2540be400",
      "chainId": "0xaa36a7"
    }
  ]
}
```

</TabItem>
<TabItem value="Response">

```json
{
  "v": "0x1",
  "r": "0x51991c5099327d3c7eaa745de60c52a93555e5cbc418eb9b405fe92d986dee08",
  "s": "0x65b1d20a39360c31de69f872244e23a3549b702e11bc7d8eb3586812ac62be8d"
}
```

</TabItem>
</Tabs>

### `eth_signTypedData_v4`

Presents a data message for the user to sign in a structured and readable format, and returns the
signed response.
Introduced by [EIP-712](https://eips.ethereum.org/EIPS/eip-712).

#### Parameters

An array containing:

1. Address: `string` - Address of the requested signing account.
2. Typed data: `object` - Typed data object containing:
   - `types`: `object` - Types object containing:
     - `EIP712Domain`: `array` - Array specifying one or more of the following domain separator values:
       - `name` - User-readable name of the signing domain, i.e., name of the dapp or the protocol.
       - `version` - Current major version of the signing domain.
       - `chainId` - Chain ID of the network.
       - `verifyingContract` - Address of the contract that will verify the signature.
       - `salt` - Disambiguating salt for the protocol.
   - `primaryType`: `string` - Primary type.
   - `domain`: `object` - Domain separator values specified in the `EIP712Domain` type.
   - `message`: `object` - Message to present to the user.

#### Returns

Signature: `string` - Hex-encoded signature.

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "eth_signTypedData_v4",
  "params": [
    "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
    {
      "types": {
        "EIP712Domain": [
          { "name": "name", "type": "string" },
          { "name": "version", "type": "string" },
          { "name": "chainId", "type": "uint256" },
          { "name": "verifyingContract", "type": "address" }
        ],
        "Person": [
          { "name": "name", "type": "string" },
          { "name": "wallet", "type": "address" }
        ],
        "Mail": [
          { "name": "from", "type": "Person" },
          { "name": "to", "type": "Person" },
          { "name": "contents", "type": "string" }
        ]
      },
      "primaryType": "Mail",
      "domain": {
        "name": "Ether Mail",
        "version": "1",
        "chainId": 1,
        "verifyingContract": "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC"
      },
      "message": {
        "from": {
          "name": "Cow",
          "wallet": "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826"
        },
        "to": {
          "name": "Bob",
          "wallet": "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB"
        },
        "contents": "Hello, Bob!"
      }
    }
  ]
}
```

</TabItem>
<TabItem value="Response">

```json
"0x4355c47d63924e8a72e509b65029052eb6c299d53a04e167c5775fd466751c9d07299936d304c153f6443dfa05f40ff007d72911b6f72307f996231605b915621c"
```

</TabItem>
</Tabs>

### Deprecated methods

Snaps can also implement [deprecated signing
methods](/wallet/concepts/signing-methods/#deprecated-signing-methods) that some dapps might use.

## ERC-4337 methods

:::flaskOnly
:::

The following methods are used by [ERC-4337 accounts](../../features/custom-evm-accounts/index.md#account-abstraction-erc-4337).

### `eth_prepareUserOperation`

Prepares a new user operation from transaction data.

#### Parameters

An array containing:

1. Transaction intents object, which contains:
   - `to`: `string` - Recipient address, or `null` if this is a contract creation transaction.
   - `value`: `string` - Value to be transferred, in wei.
   - `data`: `string` - Compiled code of a contract OR hash of the invoked method signature and
     encoded parameters.

#### Returns

A user operation details object containing:

- `callData`: `string` - Data to pass to the sender during the main execution call.
- `initCode`: `string` - Account bytecode (needed if and only if the account is not yet on-chain and
  needs to be created).
- `nonce`: `string` - Anti-replay parameter.
- `gasLimits` - (Optional) Gas limits object containing:
  - `callGasLimit`: `string` - Amount of gas to allocate to the main execution call.
  - `verificationGasLimit`: `string` - Amount of gas to allocate to the verification step.
  - `preVerificationGas`: `string` - Amount of gas to compensate the bundler for pre-verification
    execution, to pay for `callData`, and to account for overhead that can't be tracked on-chain.
- `dummySignature`: `string` - Dummy `signature`.
- `dummyPaymasterAndData`: `string` - Dummy `paymasterAndData`.
- `bundlerUrl`: `string` - Bundler URL.

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "eth_prepareUserOperation",
  "params": [
    {
      "to": "0x0c54fccd2e384b4bb6f2e405bf5cbc15a017aafb",
      "value": "0x0",
      "data": "0x"
    },
    {
      "to": "0x660265edc169bab511a40c0e049cc1e33774443d",
      "value": "0x0",
      "data": "0x619a309f"
    }
  ]
}
```

</TabItem>
<TabItem value="Response">

```json
{
  "callData": "0x70641a22000000000000000000000000f3de3c0d654fda23dad170f0f320a921725091270000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000e49871efa4000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000000000000000000000000000000000000067fd192000000000000000000000000000000000000000001411a0c3b763237f484fdd70000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000280000000000000003b6d03400d4a11d5eeaac28ec3f61d100daf4d40471f185280000000000000003b6d03408f1b19622a888c53c8ee4f7d7b4dc8f574ff906800000000000000000000000000000000000000000000000000000000",
  "initCode": "0x22ff1dc5998258faa1ea45a776b57484f8ab80a2296601cd0000000000000000000000005147ce3947a407c95687131be01a2b8d55fd0a400000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000007d91ea6a0bc4a4238cd72386d935e35e3d8c318400000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000000",
  "nonce": "0x1",
  "gasLimits": {
    "callGasLimit": "0x58a83",
    "verificationGasLimit": "0xe8c4",
    "preVerificationGas": "0xc57c"
  },
  "dummySignature": "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "dummyPaymasterAndData": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "bundlerUrl": "https://bundler.example.com/rpc"
}
```

</TabItem>
</Tabs>

### `eth_patchUserOperation`

Patches some allowed properties of a user operation.

#### Parameters

An array containing:

1. User operation object, which contains:
   - `sender`: `string` - Account making the operation.
   - `callData`: `string` - Data to pass to the sender during the main execution call.
   - `initCode`: `string` - Account bytecode (needed if and only if the account is not yet on-chain
     and needs to be created).
   - `nonce`: `string` - Anti-replay parameter.
   - `callGasLimit`: `string` - Amount of gas to allocate to the main execution call.
   - `verificationGasLimit`: `string` - Amount of gas to allocate to the verification step.
   - `preVerificationGas`: `string` - Amount of gas to compensate the bundler for pre-verification
     execution, to pay for callData, and to account for overhead that can't be tracked on-chain.
   - `maxFeePerGas`: `string` - Maximum total fee the sender is willing to pay per gas.
   - `maxPriorityFeePerGas`: `string` - Maximum fee the sender is willing to pay per gas above the
     base fee.
   - `paymasterAndData`: `string` - Address of the paymaster sponsoring the transaction, followed
     by extra data to send to the paymaster (empty for self-sponsored transactions).
   - `signature`: `string` - Data passed into the account along with the nonce during the
     verification step.

#### Returns

A partial user operation object containing:

- `paymasterAndData`: `string` - Address of the paymaster sponsoring the transaction, followed
  by extra data to send to the paymaster (empty for self-sponsored transactions).
- `callGasLimit`: `string` - (Optional) Amount of gas to allocate to the main execution call.
- `verificationGasLimit`: `string` - (Optional) Amount of gas to allocate to the verification step.
- `preVerificationGas`: `string` - (Optional) Amount of gas to compensate the bundler for
  pre-verification execution, to pay for callData, and to account for overhead that can't be tracked on-chain.

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "eth_patchUserOperation",
  "params": [
    {
      "sender": "0x4584d2B4905087A100420AFfCe1b2d73fC69B8E4",
      "nonce": "0x1",
      "initCode": "0x",
      "callData": "0x70641a22000000000000000000000000f3de3c0d654fda23dad170f0f320a921725091270000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000e49871efa4000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000000000000000000000000000000000000067fd192000000000000000000000000000000000000000001411a0c3b763237f484fdd70000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000280000000000000003b6d03400d4a11d5eeaac28ec3f61d100daf4d40471f185280000000000000003b6d03408f1b19622a888c53c8ee4f7d7b4dc8f574ff906800000000000000000000000000000000000000000000000000000000",
      "callGasLimit": "0x58a83",
      "verificationGasLimit": "0xe8c4",
      "preVerificationGas": "0xc57c",
      "maxFeePerGas": "0x87f0878c0",
      "maxPriorityFeePerGas": "0x1dcd6500",
      "paymasterAndData": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "signature": "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
    }
  ]
}
```

</TabItem>
<TabItem value="Response">

```json
{
  "paymasterAndData": "0x952514d7cBCB495EACeB86e02154921401dB0Cd9dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000000000000000000000000000000000000779b3fbb00000000000000006565b267000000000000000000000000000000000000000029195b31a9b1c6ccdeff53e359ebbcd5f075a93c1aaed93302e5fde5faf8047028b296b8a3fa4e22b063af5069ae9f656736ffda0ee090c0311155722b905f781b",
  "callGasLimit": "0x58a83",
  "verificationGasLimit": "0xe8c4",
  "preVerificationGas": "0xc57c"
}
```

</TabItem>
</Tabs>

### `eth_signUserOperation`

Signs a user operation.

#### Parameters

An array containing:

1. User operation object, which contains:
   - `sender`: `string` - Account making the operation.
   - `callData`: `string` - Data to pass to the sender during the main execution call.
   - `initCode`: `string` - Account bytecode (needed if and only if the account is not yet on-chain
     and needs to be created).
   - `nonce`: `string` - Anti-replay parameter.
   - `callGasLimit`: `string` - Amount of gas to allocate to the main execution call.
   - `verificationGasLimit`: `string` - Amount of gas to allocate to the verification step.
   - `preVerificationGas`: `string` - Amount of gas to compensate the bundler for pre-verification
     execution, to pay for callData, and to account for overhead that can't be tracked on-chain.
   - `maxFeePerGas`: `string` - Maximum total fee the sender is willing to pay per gas.
   - `maxPriorityFeePerGas`: `string` - Maximum fee the sender is willing to pay per gas above the
     base fee.
   - `paymasterAndData`: `string` - Address of the paymaster sponsoring the transaction, followed
     by extra data to send to the paymaster (empty for self-sponsored transactions).
   - `signature`: `string` - Data passed into the account along with the nonce during the
     verification step.
2. Entry point: `string` - Hash of the entry point contract.

#### Returns

Signature: `string` - Hex-encoded signature.

#### Example

<Tabs>
<TabItem value="Request">

```json
{
  "method": "eth_signUserOperation",
  "params": [
    {
      "sender": "0x4584d2B4905087A100420AFfCe1b2d73fC69B8E4",
      "nonce": "0x1",
      "initCode": "0x",
      "callData": "0x70641a22000000000000000000000000f3de3c0d654fda23dad170f0f320a921725091270000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000e49871efa4000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000000000000000000000000000000000000067fd192000000000000000000000000000000000000000001411a0c3b763237f484fdd70000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000280000000000000003b6d03400d4a11d5eeaac28ec3f61d100daf4d40471f185280000000000000003b6d03408f1b19622a888c53c8ee4f7d7b4dc8f574ff906800000000000000000000000000000000000000000000000000000000",
      "callGasLimit": "0x58a83",
      "verificationGasLimit": "0xe8c4",
      "preVerificationGas": "0xc57c",
      "maxFeePerGas": "0x87f0878c0",
      "maxPriorityFeePerGas": "0x1dcd6500",
      "paymasterAndData": "0x952514d7cBCB495EACeB86e02154921401dB0Cd9dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000000000000000000000000000000000000779b3fbb00000000000000006565b267000000000000000000000000000000000000000029195b31a9b1c6ccdeff53e359ebbcd5f075a93c1aaed93302e5fde5faf8047028b296b8a3fa4e22b063af5069ae9f656736ffda0ee090c0311155722b905f781b",
      "signature": "0x"
    },
    "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789"
  ]
}
```

</TabItem>
<TabItem value="Response">

```json
"0x6565acc7efd3c85e4c0c221c2958ff6c3ae68401b23b33fdcd1a2d49034c30d97b1cfa17487b90253a5dfd54ef5188688592c2fd56ba44ee4d948ea259d636cd550f6dd21b"
```

</TabItem>
</Tabs>
