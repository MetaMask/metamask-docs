---
description: Learn about MetaMask SDK.
sidebar_position: 2
---

# About MetaMask SDK

MetaMask SDK is a library that provides a reliable, secure, and seamless connection from your dapp
to the MetaMask browser extension and MetaMask Mobile.
You can install the SDK in existing dapps, and call any [provider API](../apis.md) methods from
your dapp.

:::tip Get started
MetaMask SDK is the recommended method of integrating your dapp with MetaMask.
You can get started by [setting up the SDK](../../how-to/connect/set-up-sdk/index.md).
:::

## Benefits of MetaMask SDK

Before MetaMask SDK, there were three ways to connect a dapp to a user's MetaMask wallet:

1. Connect from a web dapp in a desktop browser to the MetaMask browser extension
2. Connect from a web dapp in MetaMask Mobile's in-app browser to MetaMask Mobile
3. Use third party libraries to connect a mobile dapp to MetaMask Mobile

With MetaMask SDK, there are more ways to connect:

1. Connect from a web dapp in a desktop browser to the MetaMask browser extension or to MetaMask Mobile
2. Connect from a web dapp in a mobile browser to MetaMask Mobile
3. Connect from desktop, mobile, and gaming dapps to MetaMask Mobile

MetaMask SDK enables your dapp to provide a seamless user experience for MetaMask users, from
multiple dapp platforms, without relying on third party libraries.

## User experience

The following are examples of how a user experiences a dapp with the SDK installed, on various platforms.

<!--tabs-->

# Desktop browser

When a user accesses your web dapp on a desktop browser that doesn't have the MetaMask extension
installed, a popup appears that prompts the user to either install the MetaMask extension or connect
to MetaMask Mobile using a QR code.

<p align="center">
  <video width="950" controls>
    <source src="/sdk-concepts/sdk-desktop.mp4" type="video/mp4" />
  </video>
</p>

:::tip Get started
- Get started by [setting up the SDK in your web dapp](../../how-to/connect/set-up-sdk/javascript/index.md).
- See the [JavaScript SDK examples](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples)
  for advanced use cases.
:::

# Mobile browser

When a user accesses your web dapp on a mobile browser, the SDK automatically deeplinks to MetaMask
Mobile (or if the user doesn't already have it, prompts them to install it).
After the user accepts the connection, they're automatically redirected back to your dapp.
This happens for all actions that need user approval.

<p align="center">
  <video width="300" controls>
    <source src="/sdk-concepts/sdk-mobile-browser.mp4" type="video/mp4" />
  </video>
</p>

:::tip Get started
- Get started by [setting up the SDK in your web dapp](../../how-to/connect/set-up-sdk/javascript/index.md).
- See the [JavaScript SDK examples](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples)
  for advanced use cases.
:::

# iOS

When a user accesses your iOS dapp, the SDK automatically deeplinks to MetaMask Mobile (or if the
user doesn't already have it, prompts them to install it).
After the user accepts the connection, they're automatically redirected back to your dapp.
This happens for all actions that need user approval.

<p align="center">
  <video width="300" controls>
    <source src="/sdk-concepts/sdk-ios.mp4" type="video/mp4" />
  </video>
</p>

:::tip Get started
- Get started by [setting up the SDK in your iOS dapp](../../how-to/connect/set-up-sdk/mobile/ios.md).
- See the [iOS SDK example](https://github.com/MetaMask/metamask-ios-sdk) for advanced use cases.
:::

# Android

When a user accesses your Android dapp, the SDK automatically deeplinks to MetaMask Mobile (or if
the user doesn't already have it, prompts them to install it).
After the user accepts the connection, they're automatically redirected back to your dapp.
This happens for all actions that need user approval.

<p align="center">
  <video width="300" controls>
    <source src="/sdk-concepts/sdk-android.mp4" type="video/mp4" />
  </video>
</p>

:::tip Get started
- Get started by [setting up the SDK in your Android dapp](../../how-to/connect/set-up-sdk/mobile/android.md).
- See the [Android SDK example](https://github.com/MetaMask/metamask-android-sdk/tree/main/app) and
  [Android SDK architecture](android.md) for more information.
:::

# Node.js

When a user accesses your Node.js dapp, the SDK renders a QR code on the console which users can
scan with their MetaMask Mobile app.

<p align="center">
  <video width="625" controls>
    <source src="/sdk-concepts/sdk-nodejs.mp4" type="video/mp4" />
  </video>
</p>

:::tip Get started
- Get started by [setting up the SDK in your Node.js dapp](../../how-to/connect/set-up-sdk/javascript/nodejs.md).
- See the [Node.js SDK example](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/nodejs)
for advanced use cases.
:::

# Unity

When a user accesses your Unity game, the SDK renders a QR code in the game UI using a dedicated
prefab which players can scan with their MetaMask Mobile app.
It also supports deeplinking on mobile platforms, such as in the following screen recording.

<p align="center">
  <video width="300" controls>
    <source src="/sdk-concepts/sdk-unity.mp4" type="video/mp4" />
  </video>
</p>

:::tip Get started
- Get started by [setting up the SDK in your Unity game](../../how-to/connect/set-up-sdk/gaming/unity.md).
- See the [Unity demo game with the SDK installed](https://assetstore.unity.com/packages/decentralization/demo-game-dragon-crasher-with-metamask-sdk-infura-and-truffle-249789)
for advanced use cases.
:::

<!--/tabs-->

You can read more about the [connection flow between the SDK and MetaMask](connections.md).
