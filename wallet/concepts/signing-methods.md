---
description: Learn about the RPC methods for signing transactions in MetaMask.
---

# Signing methods

This page describes the signing RPC methods in MetaMask.
Learn how to [use the recommended signing methods](../how-to/sign-data/index.md).

### `eth_signTypedData_v4`

[`eth_signTypedData_v4`](/wallet/reference/json-rpc-methods/eth_signtypeddata_v4)
is:

- Cheap to verify onchain.
- Human-readable.
- Protected against phishing signatures.

If onchain verifiability cost is a high priority,
[use `eth_signTypedData_v4`](../how-to/sign-data/index.md#use-eth_signtypeddata_v4).

### `personal_sign`

[`personal_sign`](/wallet/reference/json-rpc-methods/personal_sign):

- Displays human-readable text when UTF-8 encoded, making it a popular choice for site logins
  (for example, [Sign-In with Ethereum](../how-to/sign-data/siwe.md)).
- Is protected against phishing signatures.

The text prefix of `personal_sign` makes signatures expensive to verify onchain.
If onchain verifiability cost is not a priority, you can
[use `personal_sign`](../how-to/sign-data/index.md#use-personal_sign).

:::note
MetaMask implements `personal_sign` similarly to the Go Ethereum client's updated `eth_sign` implementation.
MetaMask's `personal_sign` doesn't accept a password.
:::

## Deprecated signing methods

:::caution important
`eth_sign`, `eth_signTypedData_v1`, and `eth_signTypedData_v3` are deprecated.
Use `eth_signTypedData_v4` or `personal_sign`.
:::

### Migration Guide

To help you migrate from deprecated methods to recommended ones, use this guide:

| Deprecated Method | Recommended Method | Use Case | Benefits |
|------------------|-------------------|-----------|----------|
| `eth_sign` | `personal_sign` | Simple text signing, login messages | <ul><li>Phishing protection</li><li>Popular for SIWE</li></ul> |
| `eth_signTypedData_v1/v3` | `eth_signTypedData_v4` | Structured data signing | <ul><li>Lower chain verification cost</li><li>Better type safety</li></ul> |

#### Example Migration

```javascript
// OLD: eth_sign
const msg = 'Hello World';
const signedMessage = await ethereum.request({
    method: 'eth_sign',
    params: [address, msg]
});

// NEW: personal_sign
const msg = 'Hello World';
const signedMessage = await ethereum.request({
    method: 'personal_sign',
    params: [msg, address]
});
```

```javascript
// OLD: eth_signTypedData_v3
const msgParams = {
    types: {
        EIP712Domain: [/*...*/],
        Person: [/*...*/]
    },
    // ...
};

// NEW: eth_signTypedData_v4
const msgParams = {
    types: {
        EIP712Domain: [/*...*/],
        Person: [/*...*/]
    },
    // Additional type safety and features
    // ...
};
```

:::tip Best Practices
- Always use `personal_sign` for simple text signing
- Use `eth_signTypedData_v4` for structured data
- Include clear messages for users about what they're signing
:::

### `eth_sign`

`eth_sign` allows signing an arbitrary hash, which means an attacker can use it to request users to
sign transactions or any other data.
Using `eth_sign` is a dangerous phishing risk.

To enhance user security, MetaMask no longer supports using `eth_sign`.
Use [`eth_signTypedData_v4`](#eth_signtypeddata_v4) or [`personal_sign`](#personal_sign) instead.

:::note
See [MIP-3](https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-3.md) for
more information about the discontinuation of `eth_sign`.
:::

### `eth_signTypedData_v1` and `eth_signTypedData_v3`

`eth_signTypedData` was introduced by [EIP-712](https://eips.ethereum.org/EIPS/eip-712).
The EIP-712 specification changed several times resulting in multiple versions
of `eth_signTypedData`.

The earlier versions are:

- `eth_signTypedData_v1` - The same as `eth_signTypedData`.
  Read the
  [introductory blog post to this method](https://medium.com/metamask/scaling-web3-with-signtypeddata-91d6efc8b290).
- `eth_signTypedData_v3` - A highly used version of the EIP-712 specification.
  Read the
  [introductory blog post to this method](https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26).

The missing `v2` represents an intermediary design that the Cipher browser implemented.

All early versions of this method lack later security improvements.
Use the latest version, [`eth_signTypedData_v4`](#eth_signtypeddata_v4).
