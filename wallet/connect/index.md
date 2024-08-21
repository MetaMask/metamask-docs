---
description: Connect to MetaMask using various options.
---

# Connect to MetaMask

You can connect your dapp to MetaMask in the following ways:

- Using [MetaMask SDK](sdk.md)
- Using third-party libraries that support the SDK, such as [Wagmi](3rd-party-libraries/wagmi.md) or
  [Web3-Onboard](3rd-party-libraries/web3-onboard.md)
- Directly using the [Wallet API](wallet-api.md)

The following table compares the supported features of each connection option:

| Feature                                                                                        | MetaMask SDK only | Third-party libraries with SDK | Wallet API only |
|------------------------------------------------------------------------------------------------|:-----------------:|:------------------------------:|:---------------:|
| Connect from a web dapp to the MetaMask extension                                              |         ✅         |               ✅                |        ✅        |
| Connect from a web dapp to MetaMask Mobile                                                     |         ✅         |               ✅                |        ❌        |
| Connect from desktop, mobile, and gaming dapps to MetaMask Mobile                              |         ✅         |               ✅                |        ❌        |
| Connect to MetaMask using the [EIP-6963 provider](../concepts/wallet-interoperability.md)      |         ✅         |               ✅                |        ✅        |
| Connect to other wallets using the [EIP-6963 provider](../concepts/wallet-interoperability.md) |         ❌         |               ✅                |        ✅        |
| Use custom RPC methods such as [`connectAndSign`](../how-to/sign-data/connect-and-sign.md)     |         ✅         |               ✅                |        ❌        |
| [Display custom modals](../how-to/display/display-custom-modals.md) in MetaMask                |         ✅         |               ✅                |        ❌        |
| [Make read-only requests](../how-to/make-read-only-requests.md) using the Infura API           |         ✅         |               ✅                |        ❌        |
| [Batch multiple RPC requests](../how-to/batch-json-rpc-requests.md)                            |         ✅         |               ✅                |        ❌        |


## MetaMask SDK

MetaMask SDK is a library that provides a reliable, secure, and seamless connection from your dapp
to the MetaMask browser extension and MetaMask Mobile.
You can install the SDK in existing dapps, and call any [Wallet API](../concepts/wallet-api.md) methods from
your dapp.

Key features of MetaMask SDK include:

- **Connection to MetaMask extension and Mobile** - For web dapps, users have the option of connecting
  to the MetaMask browser extension or to MetaMask Mobile using a QR code.
  Connecting to MetaMask Mobile creates a persistent connection between the dapp and the mobile wallet.

- **Multiple supported dapp platforms** - You can connect from web, desktop, mobile, and gaming dapps
  to MetaMask Mobile.

- **EIP-6963 detection** - The SDK detects MetaMask using the
  [EIP-6963 multi-wallet detection mechanism](../concepts/wallet-interoperability.md).
  Note that the SDK discovers *only* the MetaMask wallet.
  You can use the SDK on its own, or integrated with [third-party libraries](#third-party-libraries)
  where its only job is to detect and connect to MetaMask, as the libraries handle other wallets separately.

## Third-party libraries

You can use MetaMask SDK integrated with third-party libraries such as
[Wagmi](3rd-party-libraries/wagmi.md) or [Web3-Onboard](3rd-party-libraries/web3-onboard.md).

*Paragraph explaining use cases for connecting via third-party libraries.*

## Wallet API

You can connect to MetaMask using the [Wallet API](../concepts/wallet-api.md) directly, without the SDK.

*Paragraph explaining use cases for connecting directly via Wallet API.*
