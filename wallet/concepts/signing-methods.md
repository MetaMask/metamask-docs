---
title: Signing methods
description: A brief history of the signing RPC methods.
---

# History of the signing methods

This page describes a brief history of the signing RPC methods in MetaMask.
Learn how to [use the recommended signing methods](../how-to/sign-data.md).

### eth_sign

`eth_sign` is MetaMask's original signing method.
It allows signing an arbitrary hash, which means it can be used to sign transactions, or any other
data, making it a dangerous phishing risk.

:::caution important
`eth_sign` is deprecated.
MetaMask disables this method by default and doesn't recommend using this method in production.
However, some applications (usually internal administrator panels) use this method for its ease of
use, or because of an inability to change the associated dapp.
If a wallet user must interact with a dapp that still uses `eth_sign` and accepts the risks,
they can still re-enable it through advanced settings.
:::

### personal_sign

[`personal_sign`](https://metamask.github.io/api-playground/api-documentation/#personal_sign) is
the next implemented signing method, which adds a prefix to the signed data so it can't impersonate
transactions.
This method also displays human-readable text when UTF-8 encoded, making it a popular choice for
site logins.

The text prefix of `personal_sign` makes signatures expensive to verify on-chain.
If you don't need signatures to be efficiently processed on-chain, you can
[use this method](../how-to/sign-data.md#use-personalsign).

### eth_signTypedData

[EIP-712](https://eips.ethereum.org/EIPS/eip-712) introduced `eth_signTypedData`, which is:

- Cheap to verify on chain.
- Human-readable.
- Protected against phishing signatures.

If on-chain verifiability cost is a high priority for you, we recommend
[using this method](../how-to/sign-data.md#use-ethsigntypeddatav4).

The EIP-712 specification changed several times while retaining the same EIP, meaning that MetaMask
originally implemented `eth_signTypedData` as the earliest proposed version, then implemented later
versions with hard-versioned method names:

- `eth_signTypedData_v1` – The same as `eth_signTypedData`.
  Read the
  [introductory blog post to this method](https://medium.com/metamask/scaling-web3-with-signtypeddata-91d6efc8b290).
- `eth_signTypedData_v3` – A highly used version of the EIP-712 specification.
  Read the
  [introductory blog post to this method](https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26).
- [`eth_signTypedData_v4`](https://metamask.github.io/api-playground/api-documentation/#eth_signTypedData_v4)
  – The latest version of the EIP-712 specification, with added support for arrays and a breaking
  fix for the way structs are encoded.
  Read the
  [introductory blog post to this method](https://medium.com/metamask/eip712-is-coming-what-to-expect-and-how-to-use-it-bb92fd1a7a26).

:::caution important
All early versions of this method lack later security improvements.
We recommend using the latest version, `eth_signTypedData_v4`.
:::

To avoid compatibility issues between clients, we recommend using the hard-versioned method names.
The missing `v2` represents an intermediary design that the Cipher browser implemented –
MetaMask has room to implement it if there's enough developer demand for it.
