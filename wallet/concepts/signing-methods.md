---
description: Learn about the RPC methods for signing transactions in MetaMask.
sidebar_position: 6
---

# Signing methods

This page describes the signing RPC methods in MetaMask.
Learn how to [use the recommended signing methods](../how-to/sign-data/index.md).

### `eth_signTypedData_v4`

[`eth_signTypedData_v4`](/wallet/reference/eth_signtypeddata_v4)
is:

- Cheap to verify on chain.
- Human-readable.
- Protected against phishing signatures.

If onchain verifiability cost is a high priority,
[use `eth_signTypedData_v4`](../how-to/sign-data/index.md#use-eth_signtypeddata_v4).

### `personal_sign`

[`personal_sign`](/wallet/reference/personal_sign):

- Displays human-readable text when UTF-8 encoded, making it a popular choice for site logins
  (for example, [Sign-In with Ethereum](../how-to/sign-data/siwe.md)).
- Is protected against phishing signatures.

The text prefix of `personal_sign` makes signatures expensive to verify on-chain.
If onchain verifiability cost is not a priority, you can
[use `personal_sign`](../how-to/sign-data/index.md#use-personal_sign).

## Deprecated signing methods

:::caution important
`eth_sign`, `eth_signTypedData_v1`, and `eth_signTypedData_v3` are deprecated.
Use `eth_signTypedData_v4` or `personal_sign`.
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

- `eth_signTypedData_v1` – The same as `eth_signTypedData`.
  Read the
  [introductory blog post to this method](https://medium.com/metamask/scaling-web3-with-signtypeddata-91d6efc8b290).
- `eth_signTypedData_v3` – A highly used version of the EIP-712 specification.
  Read the
  [introductory blog post to this method](https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26).

The missing `v2` represents an intermediary design that the Cipher browser implemented.

All early versions of this method lack later security improvements.
Use the latest version, [`eth_signTypedData_v4`](#eth_signtypeddata_v4).
