---
description: Learn about MetaMask SDK.
sidebar_position: 2
---

# MetaMask SDK

MetaMask SDK is a library that provides a reliable, secure, and seamless connection from your dapp
to the MetaMask browser extension and MetaMask Mobile.
You can install the SDK in existing dapps, and call any [provider API](provider-api.md) methods from
your dapp.

:::tip Get started
MetaMask SDK is the recommended method of integrating your dapp with the MetaMask wallet.
You can get started by [setting up the SDK](../how-to/connect/set-up-sdk/index.md).
:::

## Why MetaMask SDK?

Before MetaMask SDK, there were three ways to connect a dapp to MetaMask:

1. Connect from a web dapp in a desktop browser to the MetaMask browser extension
2. Have a user open a web dapp in MetaMask Mobile's in-app browser
3. Use third party libraries such as [WalletConnect](https://walletconnect.com/) to connect a mobile
   dapp to MetaMask Mobile

With MetaMask SDK, there are more ways to seamlessly connect:

1. Connect from a web dapp in a desktop browser to the MetaMask browser extension or to MetaMask Mobile
2. Connect from a web dapp in a mobile browser to MetaMask Mobile
3. Connect from desktop, mobile, and gaming dapps to MetaMask Mobile

MetaMask SDK enables your dapp to provide a seamless user experience for MetaMask users, from
multiple dapp platforms, without relying on third party libraries.

## User experience

The following are examples of how a user experiences a dapp with the SDK installed, on various platforms.

<!--tabs-->

# Desktop

When a user accesses your web dapp on a desktop browser that doesn't have the MetaMask extension
installed, a popup appears that prompts the user to either install the MetaMask extension or connect
to MetaMask Mobile using a QR code.

![SDK desktop browser example](../assets/sdk-desktop-browser.gif)

You can download the
[React project example](https://github.com/MetaMask/examples/tree/main/metamask-with/metamask-sdk-create-react-app).
Install the example using `yarn` and run it using `yarn start`.

# Mobile

When a user accesses your mobile dapp, or web dapp on a mobile browser, the SDK automatically
deeplinks to MetaMask Mobile (or if the user doesn't already have it, prompts them to install it).
After the user accepts the connection, they're automatically redirected back to your dapp.
This happens for all actions that need user approval.

<p align="center">

![SDK mobile browser example](../assets/sdk-mobile-browser.gif)

</p>

You can download the
[React project example](https://github.com/MetaMask/examples/tree/main/metamask-with/metamask-sdk-create-react-app).
Install the example using `yarn` and run it using `yarn start`.

You can also download the
[React Native example](https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/downloads/reactNativeApp_v0.1.0.zip).
Install the example using `yarn setup` and run it using `yarn ios` or `yarn android`.

# Node.js

When a user accesses your Node.js dapp, the SDK renders a QR code on the console which users can
scan with their MetaMask Mobile app.

<p align="center">

![SDK Node.js example](../assets/sdk-nodejs.gif)

</p>

You can download the
[Node.js example](https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/downloads/nodejs_v0.0.1_beta5.zip).
Install the example using `yarn` and run it using `node .`.

# Unity

When a user accesses your Unity game, the SDK renders a QR code in the game UI using a dedicated
prefab which players can scan with their MetaMask Mobile app.
It also supports deeplinking on mobile platforms.

<!--/tabs-->

## Communication layer

The SDK uses elliptic curve integrated encryption scheme (ECIES) to communicate with MetaMask Mobile.
ECIES is a hybrid encryption scheme that combines the benefits of both symmetric and asymmetric encryption.
It's a secure method of exchanging encrypted messages between two parties.

In ECIES, the sender (your dapp) generates a shared secret using the recipient's (MetaMask Mobile's)
public key and their own private key.
The shared secret is used to encrypt the message using a symmetric cipher (the SDK uses `AES-256-GCM`).
The encrypted message is then combined with a message authentication code (MAC) and sent to the recipient.

MetaMask Mobile uses its private key and the dapp's public key to recreate the shared secret and
decrypt the message.
The MAC is used to verify the authenticity of the message.

One of the main benefits of ECIES is that it allows the sender and recipient to exchange messages
without having to exchange a shared secret beforehand.
It also provides security against eavesdropping and tampering, since the shared secret is derived
from the sender's and recipient's private keys, which are both kept secret.

## Connection status

The connection from the SDK to MetaMask Mobile can [pause](#paused-connections) and
[clear](#cleared-connections).

### Paused connections

Connections pause after MetaMask Mobile is in background (minimized) for 20 seconds.
This is to accommodate OS restrictions.

When a connection pauses, all traffic to MetaMask Mobile pauses, and the SDK doesn't produce any
response until the user opens MetaMask Mobile again.
The SDK automatically deeplinks to MetaMask Mobile, so connections resume automatically.
If MetaMask Mobile is paused and the user completely closes MetaMask Mobile, the connection remains
paused and resumes when the user opens it again.

Because of this, polling data from MetaMask Mobile may not work for long periods of time.

:::info known issue
When MetaMask Mobile is running in the background, the connection may pause and fail to resume properly when the user reopens MetaMask.
The user must return to your dapp so the request is re-sent.
The SDK team is working on this issue, and is researching decentralized communication solutions that
hold state such as [Waku](https://waku.org/).
:::

### Cleared connections

Connections clear if the user closes or refreshes your dapp, since MetaMask doesn't persist
connections on the dapp side.
This is for simplicity and security purposes.

If the user completely closes MetaMask Mobile without [pausing the connection](#paused-connections)
first, MetaMask infers that the user isn't using the wallet and closes the connection.

#### Close connections manually

To close connections manually from MetaMask Mobile, go to **Settings > Experimental**, and select
**Clear MetaMask SDK connections**.
