---
sidebar_position: 1
---

# Use MetaMask SDK

MetaMask SDK provides a reliable, secure, and seamless [connection](../../concepts/sdk-connections.md)
from your dapp to a MetaMask wallet client.
It supports the following dapp platforms:

<div class="cards">
  <div class="card">
    <div class="card__header">![punk0860](https://github.com/MetaMask/metamask-docs/assets/127161846/c6ad1934-3f8d-409a-9739-81d5b0970637)

      <h3><a href="javascript">JavaScript</a></h3>
    </div>
    <div class="card__body">
      <ul>
        <li><a href="javascript/react">React</a></li>
        <li><a href="javascript/pure-js">Pure JavaScript</a></li>
        <li><a href="javascript/other-web-frameworks">Other web frameworks</a></li>
        <li><a href="javascript/react-native">React Native</a></li>
        <li><a href="javascript/nodejs">Node.js</a></li>
        <li><a href="javascript/electron">Electron</a></li>
      </ul>
    </div>
  </div>
  <div class="card">
    <div class="card__header">
      <h3><a href="mobile">Mobile</a></h3>
    </div>
    <div class="card__body">
      <ul>
        <li><a href="javascript/react-native">React Native</a></li>
        <li><a href="mobile/ios">Native iOS</a></li>
        <li><a href="mobile/android">Native Android</a> (coming soon)</li>
      </ul>
    </div>
  </div>
  <div class="card">
    <div class="card__header">
      <h3><a href="gaming">Gaming</a></h3>
    </div>
    <div class="card__body">
      <ul>
        <li><a href="gaming/unity">Unity</a></li>
        <li><a href="gaming/unreal-engine">Unreal Engine</a> (coming soon)</li>
      </ul>
    </div>
  </div>
</div>

:::note
MetaMask SDK uses the [Ethereum provider](../../reference/provider-api.md) that developers are
already used to, so existing dapps work out of the box with the SDK.
:::

## How it works

The following are examples of how a user experiences a dapp with the SDK installed, on various platforms.

<!--tabs-->

# Desktop

When a user accesses your web dapp on a desktop browser that doesn't have the MetaMask extension
installed, a popup appears that prompts the user to either install the MetaMask extension or connect
to MetaMask Mobile using a QR code.

![SDK desktop browser example](../../assets/sdk-desktop-browser.gif)

You can try the
[hosted test dapp with the SDK installed](https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/test-dapp-2/).
You can also download the
[React project example](https://github.com/MetaMask/examples/tree/main/metamask-with/metamask-sdk-create-react-app).
Install the example using `yarn` and run it using `yarn start`.

# Mobile

When a user accesses your mobile dapp, or web dapp on a mobile browser, the SDK automatically
deeplinks to MetaMask Mobile (or if the user doesn't already have it, prompts them to install it).
After the user accepts the connection, they're automatically redirected back to your dapp.
This happens for all actions that need user approval.

<p align="center">

![SDK mobile browser example](../../assets/sdk-mobile-browser.gif)

</p>

You can try the
[hosted test dapp with the SDK installed](https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/test-dapp-2/).
You can also download the
[React project example](https://github.com/MetaMask/examples/tree/main/metamask-with/metamask-sdk-create-react-app).
Install the example using `yarn` and run it using `yarn start`.

# Node.js

When a user accesses your Node.js dapp, the SDK renders a QR code on the console which users can
scan with their MetaMask Mobile app.

<p align="center">

![SDK Node.js example](../../assets/sdk-nodejs.gif)

</p>

You can download the
[Node.js example](https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/downloads/nodejs_v0.0.1_beta5.zip).
Install the example using `yarn` and run it using `node .`.

<!--/tabs-->
