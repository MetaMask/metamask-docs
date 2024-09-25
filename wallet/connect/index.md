---
description: Connect to MetaMask using various options.
---

# Connect to MetaMask

You can connect your dapp to MetaMask using one of the following methods:

- [MetaMask SDK](metamask-sdk/index.md)
- Third-party libraries that support the SDK, such as [Wagmi](3rd-party-libraries/wagmi.md) or
  [Web3-Onboard](3rd-party-libraries/web3-onboard.md)
- The [Wallet API](wallet-api.md) directly

The following table compares the supported features of each connection option:

| Feature                                                                                                                                                                                                                                                                                            | MetaMask SDK only | Third-party libraries with SDK | Wallet API only |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------:|:------------------------------:|:---------------:|
| Connect from a web dapp to the MetaMask extension                                                                                                                                                                                                                                                  |         ✓         |               ✓                |        ✓        |
| Connect from a web dapp, desktop, mobile, and gaming dapps to MetaMask Mobile                                                                                                                                                                                                                      |         ✓         |               ✓                |                 |
| Connect to MetaMask using the [EIP-6963 provider](../concepts/wallet-interoperability.md)                                                                                                                                                                                                          |         ✓         |               ✓                |        ✓        |
| Connect to other wallets using the [EIP-6963 provider](../concepts/wallet-interoperability.md)                                                                                                                                                                                                     |                   |               ✓                |        ✓        |
| Custom RPC methods such as [`connectAndSign`](../how-to/sign-data/connect-and-sign.md), [custom modals](../how-to/display/display-custom-modals.md), [read-only requests](../how-to/make-read-only-requests.md) using Infura API, and [RPC request batching](../how-to/batch-json-rpc-requests.md) |         ✓         |               ✓                |                 |

## MetaMask SDK

MetaMask SDK provides a reliable and secure connection to MetaMask Mobile from any platform. From a web dapp, you can also give your users the option of connecting to the MetaMask browser extension. You can integrate the SDK into existing projects without altering the underlying calls to the Wallet API.

Key features include:

- **Multi-platform support** – Connect from web, desktop, mobile, or gaming platforms.
- **Seamless mobile integration** – Use QR codes or deeplinks to create persistent connections with MetaMask Mobile.
- **EIP-6963 detection** – Automatically detect MetaMask wallets with or without third-party libraries.
- **RPC request batching** – Enhance efficiency by batching multiple requests into a single call.

Get started using [MetaMask SDK](metamask-sdk/index.md).

## Third-party libraries

MetaMask SDK integrates smoothly with libraries such as Wagmi and Web3-Onboard, which simplify wallet connections and support multiple wallets. These libraries offer tools to streamline connection logic and provide additional features for managing wallets.

:::note
Using third-party libraries might come with trade-offs:

- Less control over specific MetaMask features.
- Inconsistent behavior across different wallets due to multi-wallet support.
:::

Get started using [Wagmi](3rd-party-libraries/wagmi.md) or [Web3-Onboard](3rd-party-libraries/web3-onboard.md).

## Wallet API

You can integrate your dapp with MetaMask directly using the Wallet API, which allows you to manage Ethereum accounts, sign data, and send transactions without requiring the SDK.

Get started using the [Wallet API](wallet-api.md).
