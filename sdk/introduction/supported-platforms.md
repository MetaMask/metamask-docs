---
description: Supported platforms
---

# Supported platforms

MetaMask SDK lets you connect your apps to MetaMask Wallet in the following ways:

- **Desktop web**: Automatically connects to Wallet extension or Wallet mobile app via QR code.

- **Mobile**: Wallet SDK generates a deep link that takes users straight to the Wallet mobile app.

| Dapp Location | User Device | Connection Method | Metamask SDK | Other SDKs |
|---------------|-------------|------------------|--------------------------|--------------------------|
| Desktop Web | Wallet Extension | Automatic connection via browser extension | Supported | Supported |
| Desktop Web | Wallet Mobile App | QR code scan with mobile wallet | Supported | Limited |
| Mobile Browser | Wallet Mobile App | Deep link directly to mobile wallet app | Supported | Limited |
| Mobile App | Wallet Mobile App | Deep link directly to mobile wallet app | Supported | Limited |

<br />

:::tip 

For better user experience on **mobile**, it's important to use reliable RPC providers instead of public nodes. We recommend using services like [Infura](https://infura.io/) to ensure better reliability and performance.

:::
