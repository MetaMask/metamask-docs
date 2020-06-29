# Dapp Compatibility

Include MetaMask mobile as a listed wallet in your application, and link to open MetaMask app (if installed) or to go to play/app store (if not yet installed).

Please direct your users to either the listing on their preferred app store, or to [our homepage](https://metamask.io/download.html) to download MetaMask mobile.

Support the MetaMask inpage provider and test that your integration works well.

## MetaMask Mobile Compatibility Checklist

To ensure proper compatiblilty with MetaMask Mobile, your Dapp should:

- Have the ability to connect to an Ethereum Provider. ([Here](https://github.com/MetaMask/detect-provider))
- Have an option to use MetaMask Mobile as a Wallet.
  - Create a `Connect with MetaMask` Button.
  - Create a [Deeplink](https://metamask.github.io/metamask-deeplinks/#) to open the Dapp in the MetaMask App.

### User Doesn't have Metamask?
- Redirect the user to the App store to download the app

### Calling Transactions
In order for MetaMask to work properly with your dapp, it's best to have clear logic that can tell the Ethereum Provider when to trigger, sign, confirm, and approve transactions. Please see our [Mobile Best Practices](/guide/mobile-best-practices) page.


## Other Dapp UI Library Options
Instead of creating your own `Connect with MetaMask` button here area list of alternative options:
- [Rimble UI](https://rimble.consensys.design/)
- [MetaMask UI](https://github.com/MetaMask/metamask-extension/tree/develop/ui/app/components)
- [Decentraland UI](https://ui.decentraland.org/?path=/story/atlas--uncontrolled)