---
sidebar_position: 1
sidebar_label: Objects
---

# Account Management API objects

[Account management Snaps](../../../features/custom-evm-accounts/index.md) use the following objects
with the [Account Management API](index.md).

### `KeyringAccount`

An object representing an account with its properties and capabilities.
An account object contains:

- `address`: `string` - Account address or next receive address (UTXO).
- `id`: `string` - Account ID (UUIDv4).
- `methods`: `string[]` - List of supported [Keyring Interface API](../chain-methods.md) methods.
- `options`: `Record<string, Json>` - Snap-defined account options.
- `type`: `string` - Account type.
  `"eip155:eoa"` for an externally owned account (EOA) or `"eip155:erc4337"` for an
  [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337) account.

#### Example

```json
{
  "address": "0xd1f5279be4b4dd94133a23dee1b23f5bfc0db1d0",
  "id": "091bbc2e-6625-44d0-ac5c-658670ca649a",
  "methods": [
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData_v4",
    "personal_sign"
  ],
  "options": {
    "signerCount": 5,
    "threshold": 3
  },
  "type": "eip155:eoa"
}
```

### `KeyringRequest`

An object representing a request made to the account management Snap for account-related operations.
A request object contains:

- `account`: `string` - Account ID (UUIDv4).
- `id`: `string` - Request ID (UUIDv4).
- `request` - Inner request sent by the client application, containing:
  - `method`: `string` - The request method.
  - `params`: `Json[]` - Optional method parameters.
- `scope`: `string` - [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md)
  chain ID of the blockchain network for the request.

#### Example

```json
{
  "address": "0xd1f5279be4b4dd94133a23dee1b23f5bfc0db1d0",
  "id": "f84d3a97-b6e1-47ea-8b0c-fd8609efaad4",
  "request": {
    "method": "personal_sign",
    "params": [
      "0x4578616d706c652060706572736f6e616c5f7369676e60206d657373616765",
      "0xe887f3b50232722e6eb4c1d3a03b34c9b345acd1"
    ]
  },
  "scope": "eip155:1"
}
```
