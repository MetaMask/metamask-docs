---
sidebar_position: 2
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

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
   - `type`: `string` - [Transaction type.](/services/concepts/transaction-types/)
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
       - `name` - User-readable name of the signing domain, that is, name of the dapp or the protocol.
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
