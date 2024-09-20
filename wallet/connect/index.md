---
description: Connect to MetaMask using various options.
---

# Connect to MetaMask

You can connect your dapp to MetaMask in the following ways:

- Using [MetaMask SDK](metamask-sdk/index.md)
- Using third-party libraries that support the SDK, such as [Wagmi](3rd-party-libraries/wagmi.md) or
  [Web3-Onboard](3rd-party-libraries/web3-onboard.md)
- Directly using the [Wallet API](wallet-api.md)

The following table compares the supported features of each connection option:

| Feature                                                                                                                                                                                                                                                                                            | MetaMask SDK only | Third-party libraries with SDK | Wallet API only |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------:|:------------------------------:|:---------------:|
| Connect from a web dapp to the MetaMask extension                                                                                                                                                                                                                                                  |         ✓         |               ✓                |        ✓        |
| Connect from a web dapp, desktop, mobile, and gaming dapps to MetaMask Mobile                                                                                                                                                                                                                      |         ✓         |               ✓                |                 |
| Connect to MetaMask using the [EIP-6963 provider](../concepts/wallet-interoperability.md)                                                                                                                                                                                                          |         ✓         |               ✓                |        ✓        |
| Connect to other wallets using the [EIP-6963 provider](../concepts/wallet-interoperability.md)                                                                                                                                                                                                     |                   |               ✓                |        ✓        |
| Custom RPC methods such as [`connectAndSign`](../how-to/sign-data/connect-and-sign.md), [custom modals](../how-to/display/display-custom-modals.md), [read-only requests](../how-to/make-read-only-requests.md) using Infura API, and [RPC request batching](../how-to/batch-json-rpc-requests.md) |         ✓         |               ✓                |                 |

## MetaMask SDK

MetaMask SDK is a library that provides a reliable, secure, and seamless connection from your dapp
to the MetaMask browser extension and MetaMask Mobile.
You can install the SDK in existing dapps, and call any Wallet API methods from your dapp.
Key features of MetaMask SDK include:

- **Connection to MetaMask extension and Mobile** - For web dapps, users have the option of connecting
  to the MetaMask browser extension or to MetaMask Mobile using a QR code.
  Connecting to MetaMask Mobile creates a persistent connection between the dapp and the mobile wallet.

- **Multiple supported dapp platforms** - You can connect from web, desktop, mobile, and gaming dapps
  to MetaMask Mobile.

- **EIP-6963 detection** - The SDK detects MetaMask using the
  [EIP-6963 multi-wallet detection mechanism](../concepts/wallet-interoperability.md).
  When used on its own, the SDK discovers *only* the MetaMask wallet.
  You can also use the SDK with [third-party libraries](#third-party-libraries), where its only job
  is to detect and connect to MetaMask, and the libraries handle detecting other wallets.

## Third-party libraries

MetaMask SDK is fully integrated with third-party libraries such as
[Wagmi](3rd-party-libraries/wagmi.md) and [Web3-Onboard](3rd-party-libraries/web3-onboard.md).
These libraries enable multi-wallet support in your dapp, and provide pre-built tools for managing
wallet connections, enabling more flexibility in how users connect to your dapp.
Key benefits of third-party libraries include:

- **Simplified connection logic**  – Third-party libraries handle much of the complexity of wallet
  integrations, saving development time and reducing the need to manage multiple connection states manually.

- **Feature-rich ecosystem** – Many libraries come with additional features such as hooks (Wagmi) or
  connection management tools (Web3-Onboard), providing a more structured way to implement wallet
  connections in dapps.

However, you should also consider the trade-offs of third-party libraries:

- **Reduced control** – Third-party libraries might limit direct access to certain MetaMask-specific
  features or custom integrations, because they abstract some connection logic.

- **Cross-wallet compatibility** – Since these libraries support multiple wallets, not all
  wallet-specific features are available or guaranteed to behave consistently across different wallets.

In general, using the MetaMask SDK integration with third-party libraries can provide the best of
both worlds: broad wallet support and the reliability of MetaMask's advanced features.

## Wallet API

You can connect to MetaMask using the [Wallet API](../concepts/wallet-api.md) directly, without the SDK.

*Paragraph explaining use cases for connecting directly via Wallet API.*
