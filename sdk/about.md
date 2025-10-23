# About MM Connect

## Supported platforms

With MM Connect, you can connect your dapp to MetaMask in the following ways:

- **Desktop web dapps** - Automatically connect to the MetaMask extension, or connect to the MetaMask mobile app using a QR code.
- **Mobile dapps** - MM Connect generates a deeplink that takes users directly to the MetaMask mobile app.

The following table expands on the supported connection methods:

| Dapp location | User wallet location | Connection method | MM Connect | Other SDKs |
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

## Architecture

[Old architecture diagram as an example, this should be updated:]

<p align="center">

![SDK architecture](_assets/architecture.png)

</p>
