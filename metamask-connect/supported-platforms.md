---
sidebar_label: Supported platforms
description: Learn about MetaMask Connect platform support and connection methods.
keywords: [connect, sdk, platform, desktop, mobile, deeplink, qr code]
---

# Supported platforms

Your dapp can reach users on desktop and mobile with a single integration:

- **Desktop web dapps** — Automatically connect to the MetaMask extension, or connect to MetaMask Mobile using a QR code when the extension isn't installed.
- **Mobile dapps** — MetaMask Connect generates a deeplink that takes users directly to MetaMask Mobile.

Here's how each connection method compares:

| Dapp location  | User wallet location             | Connection method                          | MetaMask Connect | Other SDKs |
| -------------- | -------------------------------- | ------------------------------------------ | ---------------- | ---------- |
| Desktop web    | MetaMaskWallet browser extension | Automatic connection via browser extension | Supported        | Supported  |
| Desktop web    | MetaMask mobile app              | QR code scan with wallet mobile app        | Supported        | Limited    |
| Mobile browser | MetaMask mobile app              | Deeplink directly to wallet mobile app     | Supported        | Limited    |
| Mobile dapp    | MetaMask mobile app              | Deeplink directly to wallet mobile app     | Supported        | Limited    |

:::tip
For a better user experience on mobile, use reliable RPC providers instead of public nodes.
We recommend using services like [Infura](https://developer.metamask.io/) to ensure better reliability and performance.
:::
