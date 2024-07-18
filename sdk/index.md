---
sidebar_label: Introduction
description: Use the SDK in your dapp.
---

# MetaMask SDK documentation

MetaMask SDK is a library that provides a reliable, secure, and seamless connection from your dapp
to the MetaMask browser extension and MetaMask Mobile.
You can install the SDK in existing dapps, and call any [Wallet API](/wallet) methods from your dapp.

## Why MetaMask SDK?

MetaMask SDK enables your dapp to provide a seamless user experience for MetaMask users, from
multiple dapp platforms, without relying on third-party libraries.
By integrating your dapp using the SDK, millions of MetaMask Mobile users can connect to their
preferred MetaMask client.
The SDK uses the [MetaMask Ethereum provider](/wallet/concepts/wallet-api/#ethereum-provider-api),
so existing dapps work out of the box with the SDK.

The following table outlines some of the features available when you integrate your dapp with
MetaMask using the SDK.
Most of these features are not available if you only integrate your dapp directly using the
[Wallet API](/wallet).

| Feature                                                                                       | Wallet API only | MetaMask SDK |
|-----------------------------------------------------------------------------------------------| :-------------: | :----------: |
| Connect from a web dapp to the MetaMask extension                                             |       ✅        |      ✅      |
| Connect from a web dapp to MetaMask Mobile                                                    |       ❌        |      ✅      |
| Connect from desktop, mobile, and gaming dapps to MetaMask Mobile                             |       ❌        |      ✅      |
| Use custom RPC methods such as [`connectAndSign`](how-to/javascript/connect-and-sign.md)      |       ❌        |      ✅      |
| [Display custom modals](how-to/javascript/display-custom-modals.md) in MetaMask               |       ❌        |      ✅      |
| [Make read-only requests](how-to/javascript/make-read-only-requests.md) using the Infura API  |       ❌        |      ✅      |
| [Batch multiple RPC requests](how-to/javascript/batch-json-rpc-requests.md)                   |       ❌        |      ✅      |

## Questions?

If you have questions about integrating your dapp with MetaMask using the SDK, you can ask on the
**mm-sdk** channel on [Consensys Discord](https://discord.gg/consensys).

:::info MetaMask user support
If you need MetaMask user support, visit the [MetaMask Help Center](https://support.metamask.io/).
:::
