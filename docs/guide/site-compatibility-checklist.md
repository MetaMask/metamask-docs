# Site Compatibility Checklist

## Ethereum Provider

Make sure your site is following and using the most recent API methods of the [Ethereum Provider](/guide/ethereum-provider.md)

Include MetaMask mobile as a listed wallet in your application, and link to open MetaMask app (if installed) or to go to play/app store (if not yet installed).

Please direct your users to either the listing on their preferred app store, or to [our homepage](https://metamask.io/download.html) to download MetaMask mobile.

Support the MetaMask inpage provider and test that your integration works well.

## Dapp Compatibility

To ensure proper compatiblilty with MetaMask Mobile, your Dapp should:

- Support _asynchronously injected_ Ethereum providers. (as explained [here](./mobile-best-practices.html#provider-availability))

- Have an option to use MetaMask Mobile as a Wallet.
  - Create a `Connect with MetaMask` Button.
  - Create a [Deeplink](https://metamask.github.io/metamask-deeplinks/#) to open the Dapp in the MetaMask App.

### User Doesn't have MetaMask?

- Redirect the user to the App store to download the app

## Transaction Calls

- For further information on calling transactions please visit our [Mobile Best Practices](/guide/mobile-best-practices) page.

### Other Dapp UI Library Options

Instead of creating your own `Connect with MetaMask` button here area list of alternative options:

- [Rimble UI](https://rimble.consensys.design/)
- [Decentraland UI](https://ui.decentraland.org/?path=/story/atlas--uncontrolled)
