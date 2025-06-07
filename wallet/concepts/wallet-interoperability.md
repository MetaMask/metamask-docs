---
description: Learn about wallet interoperability via EIP-6963.
---

# Wallet interoperability

A web dapp can integrate with multiple installed browser wallets simultaneously by adding support for
[EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), which introduces an alternative wallet detection
mechanism to the [`window.ethereum`](wallet-api.md#ethereum-provider-api) injected provider.
This mechanism is enabled by using the standardized interfaces defined by EIP-6963.

:::info Why EIP-6963?
[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) standardizes the interface for wallet providers,
but it results in conflicts when users have multiple wallets installed, due to how the provider
object is injected.
This can cause issues with wallet discovery, user onboarding, and connecting.
The wallet discovery mechanism introduced by EIP-6963 solves these issues.
:::

The following is a demo of the user experience of detecting multiple wallets, showing the data
provided from each installed wallet:

<p align="center">
  <video width="100%" controls>
    <source src="/eip-6963.mp4" />
  </video>
</p>

You can [connect to MetaMask using EIP-6963](../how-to/connect-extension.md) and see the
[EIP-6963 Vite React + TypeScript demo](https://github.com/MetaMask/vite-react-ts-eip-6963/tree/main)
for more information.

## EIP-6963 interfaces

Wallets that support EIP-6963 implement and expose the following standardized interfaces.
When [connecting to MetaMask using EIP-6963](../how-to/connect-extension.md), it's important to review
and understand these interfaces.

### Provider info

The [`EIP6963ProviderInfo`](https://eips.ethereum.org/EIPS/eip-6963#provider-info) interface
represents the assets needed to display a wallet:

- `uuid` - The wallet ID ([UUIDv4](https://www.rfc-editor.org/rfc/rfc4122)).
- `name` - A human-readable name of the wallet.
- `icon` - A [URI](https://www.rfc-editor.org/rfc/rfc3986) pointing to an icon of the wallet.
- `rdns` - The wallet's domain name.

### Provider detail

The [`EIP6963ProviderDetail`](https://eips.ethereum.org/EIPS/eip-6963#provider-detail) interface
represents additional metadata about the wallet:

- `info` - The [`EIP6963ProviderInfo`](#provider-info).
- `provider` - The `EIP1193Provider` defined by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193).

### Announce and request events

The [`EIP6963AnnounceProviderEvent`](https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events)
interface announces an event dispatched by the wallet:

```typescript
interface EIP6963AnnounceProviderEvent extends CustomEvent {
  type: "eip6963:announceProvider"
  detail: EIP6963ProviderDetail
}
```

The [`EIP6963RequestProviderEvent`](https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events)
interface requests an event dispatched by a dapp:

```typescript
interface EIP6963RequestProviderEvent extends Event {
  type: "eip6963:requestProvider"
}
```

## Third-party library support

The following third-party libraries support EIP-6963:

- [Wagmi 2+](/sdk/connect/javascript-wagmi)
- [Reown AppKit](https://docs.reown.com/appkit/overview)
- [MIPD Store](https://github.com/wevm/mipd)
- [RainbowKit](https://www.rainbowkit.com)
- [Web3-Onboard](https://onboard.blocknative.com)
- [ConnectKit](https://docs.family.co/connectkit)

### MIPD Store

The [MIPD Store](https://github.com/wevm/mipd) stores the wallet providers and enables you to
subscribe to the store and retrieve the providers.
Unlike [Wagmi](https://wagmi.sh) and [Web3-Onboard](https://onboard.blocknative.com/), which are
libraries that provide components and connectors for multiple wallets and depend on MetaMask SDK for
integration, the MIPD Store is a utility library that makes it easier to work with EIP-6963 and
supports TypeScript types.

## MetaMask SDK support

:::note
MetaMask SDK does not support connecting to non-MetaMask wallets via EIP-6963.
If you intend to support discovery of other wallets, we recommend using a third-party library such as [Wagmi](/sdk/connect/javascript-wagmi).
:::

[MetaMask SDK](/sdk) automatically checks for the presence of the MetaMask extension via EIP-6963.
This eliminates the need for manual configuration or detection methods, simplifying the initial
setup process for both developers and users.

By adhering to the standards set by EIP-6963, the SDK unambiguously identifies and connects to
MetaMask, resolving potential conflicts that might arise with other wallet extensions, ensuring a
more stable and reliable interaction for users.

The SDK is also integrated into third-party libraries, like [Wagmi](/sdk/connect/javascript-wagmi), which support EIP-6963.
The SDK on its own supports connecting _only_ to MetaMask via EIP-6963, so if you intend to support
discovery of other wallets, we recommend using third-party libraries.

## Wallet support

The EIP-6963 alternative discovery mechanism works for wallets that have implemented support for EIP-6963.
This includes MetaMask, Coinbase, Trust Wallet, OKX, and other major wallets.
See the [list of wallets that support EIP-6963](https://github.com/WalletConnect/EIP6963/blob/master/src/utils/constants.ts).

## Backwards compatibility

Dapps that do not support EIP-6963 can still
[detect MetaMask using the `window.ethereum` provider](../tutorials/javascript-dapp-simple.md).
However, we recommend adding support to improve the user experience for multiple installed wallets.
Read more about [EIP-6963 backwards compatibility](https://eips.ethereum.org/EIPS/eip-6963#backwards-compatibility).
