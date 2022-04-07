# Best Practices

If this page doesn't answer your question, please feel free to open an issue [in our repository](https://github.com/MetaMask/metamask-mobile).

## The Provider (window.ethereum)

::: tip Recent Breaking Provider Changes
If you are an Ethereum application developer and are looking for information about our January 2021 provider API changes,
please see our [Migration Guide](./provider-migration.html) for more details.
:::

The [provider API](./ethereum-provider.html) is the same for both MetaMask Mobile and the desktop extension.
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

With WalletConnect, you can use MetaMask Mobile as a signer while using applications on another browser, desktop, or mobile application.
Check out the [WalletConnect mobile linking docs](https://docs.walletconnect.org/mobile-linking) for more info.

## Deeplinking

::: tip Tip
[Click here to create deeplinks for your application.](https://metamask.github.io/metamask-deeplinks/#)
:::

Deeplinks enable instant invocation of the user's preferred wallet application with correctly parameterized transactions.

Only the (authenticated) user can confirm the transaction, and the wallet can be a web, mobile or desktop app.

URLs embedded in QR codes, hyperlinks in web pages, emails, or chat messages enable robust, cross-application signaling between otherwise loosely coupled applications.

You can use deeplinks for things like:

- Creating a URL so your users can open your app directly in MetaMask Mobile to interact with your application with their Ethereum account.

- Providing a one-click experience such that users can easily make payments to another account (with pre-filled parameters like recipient address, amount, network, etc.)

- Let your users make gasless and instant transactions with Connext payment channel requests
  - This requires that the user opts in for the InstaPay experimental feature.

## Website Testing and Debugging

Test and debug your web3 site using MetaMask Mobile on any iOS or Android device with ease.

### Testing

1. Configure your development server to run on your host machine's local IP address `192.168.x.x`, or `0.0.0.0`.
2. Make sure your testing device is using the same WiFi connection as the machine hosting the server.
3. In the MetaMask Mobile web browser, navigate to your website at `http://YOUR_LOCAL_IP:PORT`.

::: tip Tip
If you're using an Android device, you must use `sslip` in your url. Example: `http://192.168.x.x.sslip.io:8000`
:::

### Debugging

::: warning Important
For security purposes, web browser debugging on both iOS and Android will not work if the app was downloaded through the Apple App Store or Google Play Store.
You must build the app locally from [MetaMask Mobile repository](https://github.com/MetaMask/metamask-mobile) and run it on a simulator or physical device.
:::

#### iOS

1. Open **Safari Preferences** -> **Advanced** -> enable the **Show Develop menu in menu bar** checkbox
2. Open MetaMask Mobile in an iOS simulator or iOS device
3. In the Safari menu bar -> **Develop** -> **[device name]** -> **[app name]** -> **[url - title]**

::: tip Tip
When debugging on a physical device, you must enable Web Inspector in your device's settings:

**Settings** -> **Safari** -> **Advanced** -> **Web Inspector**
:::

#### Android

1. Open MetaMask Mobile in an Android emulator or Android device
2. Open Google Chrome's DevTools -> menu (3 dots) -> **More tools** -> **Remote devices**
   You may also navigate to `chrome://inspect` from Chrome to display the list of available devices for debugging
3. Select your device on the left and click **Inspect** on the browser contents you'd like to inspect.

::: tip Tip
When debugging on a physical device you must enable USB debugging in your device's settings:

**Settings** -> **System** -> **About Phone** -> **Developer options** -> **Enable USB debugging**
:::

You can now debug MetaMask Mobile's browser contents just as you would on the web!
