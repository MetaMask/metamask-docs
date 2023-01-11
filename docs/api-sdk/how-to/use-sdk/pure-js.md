---
title: Pure JavaScript
---

# Use MetaMask SDK with pure JavaScript

If you're developing a web application that users can access via a desktop or mobile browser, you
can import the MetaMask SDK and it will guide users to easily connect with MetaMask.

If the user is on a desktop browser and doesn't have the MetaMask extension installed, a popup will
appear that will prompt users to either install MetaMask extension or to connect with MetaMask
Mobile via a QR code.

If on a mobile browser, the SDK will automatically deeplink into MetaMask Mobile (or prompt users to
install if they don't already have it) and once users accept the connection, they will be
automatically redirected back to your web app.
This will happen for all actions that need user approval.

If your project just uses pure javascript, you can import the SDK by putting a script on the head
section of your website:

```javascript
<head>
...

<script src="https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/cdn/metamask-sdk.js"></script>

<script>

    const MMSDK = new MetaMaskSDK()

    const ethereum = MMSDK.getProvider() // You can also access via window.ethereum

    ethereum.request({method: 'eth_requestAccounts'})

</script>

...
</head>
```

For a list of possible `options` check [here](/metamask-sdk-js/metamask-sdk-js-options.html)

:::tip
You should always call `eth_requestAccounts` first, that is what prompts the installation/connection popup to appear!

For other possible methods, check [the Ethereum Provider API](/ethereum-provider.html)
:::
