---
sidebar_position: 1
description: Use the SDK in your dapp.
tags:
  - JavaScript SDK
  - iOS SDK
  - Android SDK
  - Unity SDK
---

# Use MetaMask SDK

MetaMask SDK is a library that provides a reliable, secure, and seamless connection from your dapp
to the MetaMask browser extension and MetaMask Mobile.
You can install the SDK in existing dapps, and call any [Wallet API](../../concepts/wallet-api.md) methods from
your dapp.

## Benefits of MetaMask SDK

MetaMask SDK enables your dapp to provide a seamless user experience for MetaMask users, from
multiple dapp platforms, without relying on third-party libraries.
By integrating your dapp using the SDK, millions of MetaMask Mobile users can connect to their
preferred MetaMask client.
The SDK uses the [MetaMask Ethereum provider](../../concepts/wallet-api.md#ethereum-provider-api), so existing
dapps work out of the box with the SDK.

The following table outlines some of the features available when you integrate your dapp with
MetaMask using the SDK.
Most of these features are not available if you only integrate your dapp directly using the
[Wallet API](../../concepts/wallet-api.md).

| Feature                                                                             | Wallet API only | MetaMask SDK |
|-------------------------------------------------------------------------------------| :-------------: | :----------: |
| Connect from a web dapp to the MetaMask extension                                   |       ✅        |      ✅      |
| Connect from a web dapp to MetaMask Mobile                                          |       ❌        |      ✅      |
| Connect from desktop, mobile, and gaming dapps to MetaMask Mobile                   |       ❌        |      ✅      |
| Use custom RPC methods such as [`connectAndSign`](../sign-data/connect-and-sign.md) |       ❌        |      ✅      |
| [Display custom modals](../display/display-custom-modals.md) in MetaMask            |       ❌        |      ✅      |
| [Make read-only requests](../make-read-only-requests.md) using the Infura API       |       ❌        |      ✅      |
| [Batch multiple RPC requests](../batch-json-rpc-requests.md)                        |       ❌        |      ✅      |

## Supported platforms

The SDK supports the following dapp platforms:

<div class="cards">
  <div class="card">
    <div class="card__header">
      <h3>💻 <a href="/wallet/how-to/use-sdk/javascript">JavaScript</a></h3>
    </div>
    <div class="card__body">
      <ul>
        <li><a href="/wallet/how-to/use-sdk/javascript/react">React</a></li>
        <li><a href="/wallet/how-to/use-sdk/javascript/pure-js">Pure JavaScript</a></li>
        <li><a href="/wallet/how-to/use-sdk/javascript/other-web-frameworks">Other web frameworks</a></li>
        <li><a href="/wallet/how-to/use-sdk/javascript/nodejs">Node.js</a></li>
        <li><a href="/wallet/how-to/use-sdk/javascript/electron">Electron</a></li>
      </ul>
    </div>
  </div>
  <div class="card">
    <div class="card__header">
      <h3>📱 <a href="/wallet/how-to/use-sdk/mobile">Mobile</a></h3>
    </div>
    <div class="card__body">
      <ul>
        <li><a href="/wallet/how-to/use-sdk/mobile/ios">iOS</a></li>
        <li><a href="/wallet/how-to/use-sdk/mobile/android">Android</a></li>
        <li><a href="/wallet/how-to/use-sdk/mobile/react-native">React Native</a></li>
      </ul>
    </div>
  </div>
  <div class="card">
    <div class="card__header">
      <h3>🎮 <a href="/wallet/how-to/use-sdk/gaming">Gaming</a></h3>
    </div>
    <div class="card__body">
      <ul>
        <li><a href="/wallet/how-to/use-sdk/gaming/unity">Unity</a></li>
        <li><a href="/wallet/how-to/use-sdk/gaming/unreal-engine">Unreal Engine</a> (coming soon)</li>
      </ul>
    </div>
  </div>
</div>
<div class="card margin-bottom--lg">
  <div class="card__header">
    <h3>↔️ <a href="/wallet/how-to/use-sdk/3rd-party-libraries">Third-party libraries</a></h3>
  </div>
  <div class="card__body">
    <ul>
      <li><a href="/wallet/how-to/use-sdk/3rd-party-libraries/web3-onboard">Web3-Onboard</a></li>
      <li><a href="/wallet/how-to/use-sdk/3rd-party-libraries/wagmi">Wagmi</a></li>
    </ul>
  </div>
</div>
