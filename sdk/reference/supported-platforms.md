---
description: Supported dapp platforms for MetaMask SDK.
---

# Supported platforms

With MetaMask SDK, you can connect your dapp to MetaMask in the following ways:

- **Desktop web dapps** - Automatically connect to the MetaMask extension, or connect to the MetaMask mobile app using a QR code.

- **Mobile dapps** - The SDK generates a deeplink that takes users directly to the MetaMask mobile app.

The following table expands on the SDK's connection methods:

| Dapp location | User wallet location | Connection method | MetaMask SDK | Other SDKs |
|---------------|-------------|------------------|--------------------------|--------------------------|
| Desktop web | Wallet browser extension | Automatic connection via browser extension | Supported | Supported |
| Desktop web | Wallet mobile app | QR code scan with wallet mobile app | Supported | Limited |
| Mobile browser | Wallet mobile app | Deeplink directly to wallet mobile app | Supported | Limited |
| Mobile dapp | Wallet mobile app | Deeplink directly to wallet mobile app | Supported | Limited |

<br />

:::tip 
For a better user experience on mobile, it's important to use reliable RPC providers instead of public nodes.
We recommend using services like [MetaMask Developer](https://developer.metamask.io/) to ensure better reliability and performance.
:::
