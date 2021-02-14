# Site Compatibility Checklist

- Ensure that your site is compatible with the [MetaMask Ethereum provider API](./ethereum-provider.html) and review the [MetaMask Mobile best practices](./mobile-best-practices.html)

- Include MetaMask Mobile as a listed wallet in your application, and link to open the MetaMask Mobile app (if installed) or to go to the app store (if not yet installed)
  - We recommend adding a `Connect With MetaMask` button and using [deeplinks](https://metamask.github.io/metamask-deeplinks/)
  - For more information about deeplinks, please see the [deeplinking documentation](./mobile-best-practices.html#deeplinking)

Please direct your users to either the relevant app store listing or to [the MetaMask homepage](https://metamask.io/download.html) to download MetaMask Mobile

## Web3 Site UI Libraries

Instead of creating your own `Connect With MetaMask` button here are a couple of options:

- [Rimble UI](https://rimble.consensys.design/)
- [Decentraland UI](https://ui.decentraland.org/?path=/story/atlas--uncontrolled)
