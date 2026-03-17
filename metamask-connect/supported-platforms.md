---
title: "MetaMask Connect Supported Platforms and Connection Methods"
sidebar_label: Supported platforms
description: View supported platforms, browsers, and connection methods for MetaMask Connect, including desktop extensions, mobile QR codes, and native deeplinks.
keywords:
  [
    connect,
    sdk,
    platform,
    desktop,
    mobile,
    deeplink,
    qr code,
    react,
    react native,
    node,
    wagmi,
    wallet standard,
    solana,
    evm,
    multichain,
    browser extension,
    mobile browser,
    native app,
    connection methods,
    QR code connection,
    wallet deeplink,
    cross-platform wallet,
  ]
---

# Supported platforms

MetaMask Connect works across multiple environments, ecosystems, and devices.
This page covers how MetaMask Connect routes connections depending on where your dapp runs,
and which development environments and blockchain ecosystems are supported.

## Connection methods

MetaMask Connect detects the user's environment and selects the best connection method automatically:

- **Desktop web** — Connects directly to the MetaMask browser extension when available. If the extension isn't installed, a QR code is displayed so users can scan it with MetaMask Mobile.
- **Mobile browser and native apps** — Generates a deeplink that opens MetaMask Mobile directly, keeping the experience seamless on mobile devices.
- **Node.js** — Renders a QR code in the terminal for users to scan with MetaMask Mobile, enabling wallet interactions from CLI tools and server-side scripts.

Here's how each connection method compares across dapp locations:

| Dapp location         | User wallet                                           | Connection method               | MetaMask Connect |  Other SDKs  |
| --------------------- | ----------------------------------------------------- | ------------------------------- | :--------------: | :----------: |
| Desktop web browser   | 🧩 [Browser extension](https://metamask.io/download/) | Direct connection via extension |   ✅ Supported   | ✅ Supported |
| Desktop web browser   | 📱 [Mobile app](https://metamask.io/download/)        | QR code scan                    |   ✅ Supported   | ⚠️ Limited\* |
| Mobile browser        | 📱 [Mobile app](https://metamask.io/download/)        | Deeplink                        |   ✅ Supported   | ⚠️ Limited\* |
| Mobile in-app browser | 📱 [Mobile app](https://metamask.io/download/)        | Deeplink                        | ✅ Supported\*\* | ⚠️ Limited\* |
| Native mobile app     | 📱 [Mobile app](https://metamask.io/download/)        | Deeplink                        |   ✅ Supported   | ⚠️ Limited\* |
| Node.js               | 📱 [Mobile app](https://metamask.io/download/)        | QR code in terminal             |   ✅ Supported   | ⚠️ Limited\* |

\* **Limited**: Most other SDKs don't include built-in QR code or deeplink support for connecting to MetaMask Mobile, and typically require additional configuration or third-party relay services.

\*\* **In-app browsers**: WebViews inside apps like Twitter, Discord, or Reddit have inconsistent deeplink support. Some block external deeplinks or handle them incorrectly. Test in your target environments, or guide users to open your dapp in a full mobile browser.

:::tip
For relay-based connections (QR code and deeplink), use a reliable RPC provider instead of public nodes.
Relay connections are more sensitive to network latency, so services like [Infura](https://developer.metamask.io/) provide better reliability and performance.
:::

## Supported environments

The following table shows which environment and ecosystem combinations MetaMask Connect supports.
Select a ✅ to jump to the relevant quickstart or guide.

| Environment             |            [EVM](/metamask-connect/evm)             |            [Solana](/metamask-connect/solana)             |        [Multichain](/metamask-connect/multichain)        |
| ----------------------- | :-------------------------------------------------: | :-------------------------------------------------------: | :------------------------------------------------------: |
| Browser (vanilla JS/TS) |  [✅](/metamask-connect/evm/quickstart/javascript)  |   [✅](/metamask-connect/solana/quickstart/javascript)    | [✅](/metamask-connect/multichain/quickstart/javascript) |
| React                   |  [✅](/metamask-connect/evm/quickstart/javascript)  | [✅](/metamask-connect/solana/guides/use-wallet-adapter)  | [✅](/metamask-connect/multichain/quickstart/javascript) |
| React Native            | [✅](/metamask-connect/evm/quickstart/react-native) |              [✅](/metamask-connect/solana)               | [✅](/metamask-connect/multichain/quickstart/javascript) |
| wagmi                   |             [✅](/metamask-connect/evm)             |                             —                             |                            —                             |
| Wallet Standard         |                          —                          | [✅](/metamask-connect/solana/guides/use-wallet-adapter/) |                            —                             |
| Node.js                 |                         ✅                          |                             —                             |                            ✅                            |

:::note
Node.js support uses QR code connections via MetaMask Mobile.
See the [Node.js playground](https://github.com/MetaMask/connect-monorepo/tree/main/playground/node-playground) for a working example.
:::

## Next steps

- [Choose an integration option](./integration-options.md)
- [EVM JavaScript quickstart](./evm/quickstart/javascript.md)
- [Solana JavaScript quickstart](./solana/quickstart/javascript.md)
