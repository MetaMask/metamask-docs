---
description: Learn about MetaMask SDK.
sidebar_position: 3
tags:
  - JavaScript SDK
  - iOS SDK
  - Android SDK
  - Unity SDK
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# About MetaMask SDK

MetaMask SDK is a library that provides a reliable, secure, and seamless connection from your dapp
to the MetaMask browser extension and MetaMask Mobile.
You can install the SDK in existing dapps, and call any [Wallet API](../wallet-api.md) methods from
your dapp.
Get started [using the SDK](../../how-to/use-sdk/index.md).

## Benefits of MetaMask SDK

MetaMask SDK enables your dapp to provide a seamless user experience for MetaMask users, from
multiple dapp platforms, without relying on third-party libraries.
By integrating your dapp using the SDK, millions of MetaMask Mobile users can connect to their
preferred MetaMask client.
The SDK uses the [MetaMask Ethereum provider](../wallet-api.md#ethereum-provider-api), so existing
dapps work out of the box with the SDK.

The following table outlines some of the features available when you integrate your dapp with
MetaMask using the SDK.
Most of these features are not available if you only integrate your dapp directly using the
[Wallet API](../wallet-api.md).

| Feature                                                                                       | Wallet API only | MetaMask SDK |
|-----------------------------------------------------------------------------------------------|:---------------:|:------------:|
| Connect from a web dapp to the MetaMask extension                                             |        ✅        |      ✅       |
| Connect from a web dapp to MetaMask Mobile                                                    |        ❌        |      ✅       |
| Connect from desktop, mobile, and gaming dapps to MetaMask Mobile                             |        ❌        |      ✅       |
| Use custom RPC methods such as [`connectAndSign`](../../how-to/sign-data/connect-and-sign.md) |        ❌        |      ✅       |
| [Display custom modals](../../how-to/display/custom-modals.md) in MetaMask                    |        ❌        |      ✅       |
| [Make read-only requests](../../how-to/make-read-only-requests.md) using the Infura API                 |        ❌        |      ✅       |
| [Batch multiple RPC requests](../../how-to/batch-json-rpc-requests.md)                        |        ❌        |      ✅       |

## User experience

The following are examples of how a user experiences a dapp with the SDK installed, on various platforms.

<Tabs>
<TabItem value="Desktop browser">

When a user accesses your web dapp on a desktop browser that doesn't have the MetaMask extension
installed, a popup appears that prompts the user to either install the MetaMask extension or connect
to MetaMask Mobile using a QR code.

<p align="center">
  <video width="100%" controls>
    <source src="/sdk-desktop.mp4" type="video/mp4" />
  </video>
</p>

:::tip Get started
- Get started by [setting up the SDK in your web dapp](../../how-to/use-sdk/javascript/index.md).
- See the [example JavaScript dapps](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples)
  in the JavaScript SDK GitHub repository for advanced use cases.
:::

</TabItem>
<TabItem value="Mobile browser">

When a user accesses your web dapp on a mobile browser, the SDK automatically deeplinks to MetaMask
Mobile (or if the user doesn't already have it, prompts them to install it).
After the user accepts the connection, they're automatically redirected back to your dapp.
This happens for all actions that need user approval.

<p align="center">
  <video width="300" controls>
    <source src="/sdk-mobile-browser.mp4" type="video/mp4" />
  </video>
</p>

:::tip Get started
- Get started by [setting up the SDK in your web dapp](../../how-to/use-sdk/javascript/index.md).
- See the [example JavaScript dapps](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples)
  in the JavaScript SDK GitHub repository for advanced use cases.
:::

</TabItem>
<TabItem value="iOS">

When a user accesses your iOS dapp, the SDK automatically deeplinks to MetaMask Mobile (or if the
user doesn't already have it, prompts them to install it).
After the user accepts the connection, they're automatically redirected back to your dapp.
This happens for all actions that need user approval.

<p align="center">
  <video width="300" controls>
    <source src="/sdk-ios.mp4" type="video/mp4" />
  </video>
</p>

:::tip Get started
- Get started by [setting up the SDK in your iOS dapp](../../how-to/use-sdk/mobile/ios.md).
- See the [example iOS dapp](https://github.com/MetaMask/metamask-ios-sdk) in the iOS SDK GitHub
  repository for advanced use cases.
:::

</TabItem>
<TabItem value="Android">

When a user accesses your Android dapp, the SDK automatically deeplinks to MetaMask Mobile (or if
the user doesn't already have it, prompts them to install it).
After the user accepts the connection, they're automatically redirected back to your dapp.
This happens for all actions that need user approval.

<p align="center">
  <video width="300" controls>
    <source src="/sdk-android.mp4" type="video/mp4" />
  </video>
</p>

:::tip Get started
- Get started by [setting up the SDK in your Android dapp](../../how-to/use-sdk/mobile/android.md).
- See the [example Android dapp](https://github.com/MetaMask/metamask-android-sdk/tree/main/app) in
  the Android SDK GitHub repository and the [Android SDK architecture](android.md) for more information.
:::

</TabItem>
<TabItem value="Node.js">

When a user accesses your Node.js dapp, the SDK renders a QR code on the console which users can
scan with their MetaMask Mobile app.

<p align="center">
  <video width="625" controls>
    <source src="/sdk-nodejs.mp4" type="video/mp4" />
  </video>
</p>

:::tip Get started
- Get started by [setting up the SDK in your Node.js dapp](../../how-to/use-sdk/javascript/nodejs.md).
- See the [example Node.js dapp](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/nodejs)
  in the Node.js SDK GitHub repository for advanced use cases.
:::

</TabItem>
<TabItem value="Unity">

When a user accesses your Unity game, the SDK renders a QR code in the game UI using a dedicated
prefab which players can scan with their MetaMask Mobile app.
It also supports deeplinking on mobile platforms, as demonstrated in the following screen recording.

<p align="center">
  <video width="300" controls>
    <source src="/sdk-unity.mp4" type="video/mp4" />
  </video>
</p>

:::tip Get started
- Get started by [setting up the SDK in your Unity game](../../how-to/use-sdk/gaming/unity/index.md).
- See the [Unity demo game with the SDK installed](https://assetstore.unity.com/packages/decentralization/demo-game-dragon-crasher-with-metamask-sdk-infura-and-truffle-249789)
  for advanced use cases.
:::

</TabItem>
</Tabs>

You can read more about the [connection flow between the SDK and MetaMask](connections.md).
