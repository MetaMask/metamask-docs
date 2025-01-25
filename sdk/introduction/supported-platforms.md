---
description: Supported platforms
---

# Supported platforms

With MetaMask SDK, you can connect your dapp to MetaMask in the following ways:

- **Desktop web dapps** - Automatically connect to the MetaMask wallet extension, or connect to MetaMask Mobile using a QR code.

- **Mobile dapps** - The SDK generates a deeplink that takes users directly to MetaMask Mobile.

The following table expands on the SDK's connection methods:

| Dapp location | User wallet location | Connection method | Metamask SDK | Other SDKs |
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
