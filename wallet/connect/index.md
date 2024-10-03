---
description: Connect to MetaMask using various options.
---

# Connect to MetaMask

You can connect your dapp to MetaMask using one of the following methods:

- [MetaMask SDK](metamask-sdk/index.md)
- Third-party libraries with SDK support, such as [Wagmi](3rd-party-libraries/wagmi.md) or
  [Web3-Onboard](3rd-party-libraries/web3-onboard.md)
- The [Wallet API](wallet-api.md) directly

The following table compares the supported features of each connection option:

| Feature                                                                                                                                                                                                                                                                                            | MetaMask SDK | Third-party libraries with SDK | Wallet API only |
|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:------------:|:------------------------------:|:---------------:|
| Connect from a web dapp to the MetaMask extension                                                                                                                                                                                                                                                  |      ✓       |               ✓                |        ✓        |
| Connect from a web dapp, desktop, mobile, and gaming dapps to MetaMask Mobile                                                                                                                                                                                                                      |      ✓       |               ✓                |                 |
| Connect to MetaMask using the [EIP-6963 provider](../concepts/wallet-interoperability.md)                                                                                                                                                                                                          |      ✓       |               ✓                |        ✓        |
| Compatible with other [EIP-6963](../concepts/wallet-interoperability.md) wallets                                                                                                                                                                                                                   |              |               ✓                |        ✓        |
| Custom RPC methods such as [`connectAndSign`](../how-to/sign-data/connect-and-sign.md), [custom modals](../how-to/display/display-custom-modals.md), [read-only requests](../how-to/make-read-only-requests.md) using Infura API, and [RPC request batching](../how-to/batch-json-rpc-requests.md) |      ✓       |               ✓                |                 |

## MetaMask SDK

MetaMask SDK enables a reliable, secure, and seamless connection between your dapp and the MetaMask browser extension or MetaMask Mobile. You can call any Wallet API method from a dapp with the SDK installed, and you can integrate the SDK into existing projects without modifying existing Wallet API calls.

Key features include:

- **Multi-platform support** – Connect from web, desktop, mobile, and gaming platforms.
- **Seamless mobile integration** – Use QR codes or deeplinks to establish persistent connections with MetaMask Mobile.
- **EIP-6963 detection** – Automatically detect MetaMask wallets, with or without third-party libraries.
- **RPC request batching** – Improve efficiency by batching multiple requests into a single call.

Get started using [MetaMask SDK](metamask-sdk/index.md).

## Third-party libraries

MetaMask SDK integrates seamlessly with libraries like Wagmi and Web3-Onboard, simplifying wallet connections and supporting multiple wallets. These libraries streamline connection logic and offer additional features for managing wallets.

:::note Trade-offs when using third-party libraries:

- Reduced control over specific MetaMask features.
- Potential inconsistencies across different wallets due to multi-wallet support.
:::

Get started with [Wagmi](3rd-party-libraries/wagmi.md) or [Web3-Onboard](3rd-party-libraries/web3-onboard.md).

## Wallet API

The Wallet API consists of an [Ethereum Provider API](../reference/provider-api.md) and a [JSON-RPC API](/wallet/reference/json-rpc-api),
which allow you to interact with users' Ethereum accounts in MetaMask.
For most dapps, we recommend integrating with MetaMask using the SDK or third-party libraries in
conjunction with the Wallet API, to take advantage of the SDK's benefits.
However, you can also connect to the MetaMask extension directly using the Wallet API.

Get started with the [Wallet API](wallet-api.md).
