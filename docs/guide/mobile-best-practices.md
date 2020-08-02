# Best Practices

If this page doesn't answer your question, please feel free to open an issue [in our repository](https://github.com/MetaMask/metamask-mobile).

## The Provider (window.ethereum)

The [provider API](./ethereum-provider.html) is the same for both MetaMask mobile and the desktop extension.
However, the providers become available (i.e., are injected into the page) at different points in the page lifecycle.

### Provider Availability

If you use [`@metamask/detect-provider`](https://npmjs.com/package/@metamask/detect-provider), there's nothing to worry about; it will reliably detect both the mobile and extension provider.

If you don't use the `detect-provider` package, you have to detect the mobile provider manually.

The extension provider will always be available by the time your code is executed.
Because of platform limitations, the mobile provider may not be injected until later in the page lifecycle.
For this purpose, the MetaMask provider dispatches the event `ethereum#initialized` on `window` when it is fully initialized.

You can reliably detect both the mobile and extension provider with the following snippet.

```javascript
if (window.ethereum) {
  handleEthereum();
} else {
  window.addEventListener('ethereum#initialized', handleEthereum, {
    once: true,
  });

  // If the event is not dispatched by the end of the timeout,
  // the user probably doesn't have MetaMask installed.
  setTimeout(handleEthereum, 3000); // 3 seconds
}

function handleEthereum() {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    console.log('Ethereum successfully detected!');
    // Access the decentralized web!
  } else {
    console.log('Please install MetaMask!');
  }
}
```

## Using WalletConnect

With WalletConnect, you can use MetaMask mobile as a signer while using applications on another browser, desktop, or mobile application.
Check out the [WalletConnect mobile linking docs](https://docs.walletconnect.org/mobile-linking) for more info.

## Deeplinking

::: tip
[Click here to create deeplinks for your application.](https://metamask.github.io/metamask-deeplinks/#)
:::

Deeplinks enable instant invocation of the user's preferred wallet application with correctly parameterized transactions.

Only the (authenticated) user can confirm the transaction, and the wallet can be a web, mobile or desktop app.

URLs embedded in QR codes, hyperlinks in web pages, emails, or chat messages enable robust, cross-application signaling between otherwise loosely coupled applications.

You can use deeplinks for things like:

- Creating a URL so your users can open your app directly in MetaMask mobile to interact with your application with their Ethereum account.

- Providing a one-click experience such that users can easily make payments to another account (with pre-filled parameters like recipient address, amount, network, etc.)

- Let your users make gasless and instant transactions with Connext payment channel requests
  - This requires that the user opts in for the InstaPay experimental feature.
