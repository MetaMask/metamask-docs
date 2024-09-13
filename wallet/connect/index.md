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


## Connecting via Third-Party Libraries
MetaMask SDK is fully integrated with third-party libraries like [Wagmi](3rd-party-libraries/wagmi.md) or [Web3-Onboard](3rd-party-libraries/web3-onboard.md), which enable multi-wallet support in your dapp. These libraries provide pre-built tools for managing wallet connections, making it easier to offer users flexibility in how they connect to your dapp.

### Benefits of Using Third-Party Libraries

- **Simplified Connection Logic:** Third-party libraries handle much of the complexity of wallet integrations, saving development time and reducing the need to manage multiple connection states manually.
- **Feature-Rich Ecosystem:** Many libraries come with additional features like hooks (Wagmi) or connection management tools (Web3-Onboard), providing a more structured way to implement wallet connections in dapps.

### Considerations of Using Third-Party Libraries
- **Reduced Control:** Might limit direct access to certain MetaMask-specific features or custom integrations, as the library abstracts some connection logic.
- **Cross-Wallet Compatibility:** Since these libraries support multiple wallets, not all wallet-specific features are available or guaranteed to behave consistently across different wallets.

By integrating MetaMask SDK with a third-party library, developers can get the best of both worlds: broad wallet support and the reliability of MetaMask’s advanced features.

## Wallet API

You can connect to MetaMask using the [Wallet API](../concepts/wallet-api.md) directly, without the SDK.

*Paragraph explaining use cases for connecting directly via Wallet API.*
