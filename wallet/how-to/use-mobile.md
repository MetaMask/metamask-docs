---
description: Integrate your dapp with MetaMask Mobile.
---

# Use MetaMask Mobile

With MetaMask Mobile, you can onboard your users in seconds, whether they're new or existing
MetaMask users.
Your users can sign with their MetaMask wallet, whether they use your dapp on MetaMask browser,
other primary browsers, mobile, or desktop.

To use MetaMask Mobile:

- Ensure your dapp is compatible with the [MetaMask Ethereum provider API](../reference/provider-api.md).
- Include MetaMask Mobile as a listed wallet in your dapp, and link to open the MetaMask Mobile app
  (if installed) or to go to the app store (if not yet installed).
  We recommend adding a **Connect with MetaMask** button and [using deeplinks](#use-deeplinks).
- Direct your users to either the relevant app store listing or to the
  [MetaMask homepage](https://metamask.io/download.html) to download MetaMask Mobile.

:::tip
We recommend using [MetaMask SDK](use-sdk/index.md) to enable a reliable, secure,
and seamless connection from your dapp to both the MetaMask extension and MetaMask Mobile.
:::

## Detect the provider

The [provider API](../reference/provider-api.md) is the same for MetaMask Mobile and the desktop extension.
However, the providers become available (injected into the page) at different points in the page lifecycle.

If you
[use the `@metamask/detect-provider` module](../get-started/detect-metamask.md#use-metamaskdetect-provider),
it reliably detects both the mobile and extension provider.
If you don't use `@metamask/detect-provider`, you must detect the mobile provider manually.
For example, you can manually detect the mobile and extension provider with the following code:

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

The extension provider is always available when your code executes.
Because of platform limitations, the mobile provider may not be injected until later in the page
lifecycle, so the MetaMask provider dispatches the event `ethereum#initialized` on `window` when
it's fully initialized.

## Use WalletConnect

With WalletConnect, your users can use MetaMask Mobile as a signer while using other web, desktop,
or mobile apps.
Read the [WalletConnect mobile linking documentation](https://docs.walletconnect.org/mobile-linking)
for more information.

## Use deeplinks

Deeplinks enable instant invocation of the user's preferred wallet app with correctly parameterized
transactions.
Only the user can confirm the transaction, and the wallet can be a web, desktop, or mobile app.

URLs embedded in QR codes, and hyperlinks in web pages, emails, or chat messages enable robust
signaling between otherwise loosely coupled apps.

With deeplinks, you can enable your users to:

- Open your dapp directly in MetaMask Mobile to interact with your dapp with their Ethereum account.
- Make payments to another account in one click (with pre-filled parameters such as recipient
  address, amount, and network).
- Make gasless and instant transactions with Connext payment channel requests.
  This requires that the user opt in for the InstaPay experimental feature.

Use the [MetaMask deeplink generator](https://metamask.github.io/metamask-deeplinks/) to create deeplinks.

## Test your dapp

To test your dapp's integration with MetaMask Mobile:

1. Configure your development server to run on your host machine's local IP address `192.168.x.x`,
    or `0.0.0.0`.
1. Ensure your testing device uses the same WiFi connection as the machine hosting the server.
1. In the MetaMask Mobile web browser, navigate to your website at `http://YOUR_LOCAL_IP:PORT`.

:::note
If you use an Android device, you must use `sslip` in your URL.
For example, `http://192.168.x.x.sslip.io:8000`.
:::

## Debug your dapp

:::caution
For security purposes, web browser debugging on both iOS and Android doesn't work if you downloaded
MetaMask Mobile through the Apple App Store or Google Play Store.
You must build MetaMask Mobile locally from the [GitHub repository](https://github.com/MetaMask/metamask-mobile)
and run it on a simulator or physical device.
:::

### iOS

To debug your dapp on iOS:

1. Open **Safari Preferences > Advanced** and check **Show Develop menu in the menu bar**.
1. Open MetaMask Mobile in an iOS simulator or iOS device.
1. In the Safari menu bar, select **Develop > [device name] > [dapp name] > [url - title]**.

:::note
When debugging on a physical device, you must enable Web Inspector in your device's settings by
selecting **Settings > Safari > Advanced > Web Inspector**.
:::

### Android

To debug your dapp on Android:

1. Open MetaMask Mobile in an Android emulator or Android device.
1. Open Google Chrome's **DevTools > menu (`...`) > More tools > Remote devices**.
    You can also navigate to `chrome://inspect` from Chrome to display the list of available devices
    for debugging.
1. Select your device on the left and select **Inspect** on the browser contents you'd like to inspect.

:::note
When debugging on a physical device you must enable USB debugging in your device's settings by
selecting **Settings > System > About Phone > Developer options > Enable USB debugging**.
:::
