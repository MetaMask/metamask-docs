---
sidebar_label: Pure JavaScript
sidebar_position: 2
description: Get started with MetaMask SDK using pure JavaScript.
---

# Get started using pure JavaScript

Import MetaMask SDK into your pure JavaScript dapp to enable
your users to easily connect to the MetaMask browser extension and MetaMask Mobile.
The SDK for pure JavaScript has the [same prerequisites](index.md#prerequisites) as for standard JavaScript.

To import, instantiate, and use the SDK, you can insert a script in the head section of your website:

```html title="index.html"
<head>
  ...
  <script src="https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/cdn/metamask-sdk.js"></script>
  <script>
    const MMSDK = new MetaMaskSDK.MetaMaskSDK({
      dappMetadata: {
        name: "Example Pure JS Dapp",
        url: window.location.href,
      },
      infuraAPIKey: process.env.INFURA_API_KEY,
      // Other options.
    });
    // Because the init process of MetaMask SDK is async.
    setTimeout(() => {
      // You can also access via window.ethereum.
      const ethereum = MMSDK.getProvider();

      ethereum.request({ method: 'eth_requestAccounts' });
    }, 0);
  </script>
  ...
</head>
```

You can configure the SDK using any [options](../../reference/js-options.md):

- Use [`dappMetadata`](../../reference/js-options.md#dappmetadata) to display information
  about your dapp in the MetaMask connection modal.
- Use [`infuraAPIKey`](../../reference/js-options.md#infuraapikey) to
  [make read-only RPC requests](../../how-to/javascript/make-read-only-requests.md) from your dapp.
- Use [`modals`](../../reference/js-options.md#modals) to [customize the logic and UI of
  the displayed modals](../../how-to/javascript/display-custom-modals.md).

You can call any [provider API methods](/wallet/reference/provider-api) using the SDK.
Always call [`eth_requestAccounts`](/wallet/reference/eth_requestaccounts) using
[`request()`](/wallet/reference/provider-api/#request) first, since it prompts the installation
or connection popup to appear.

You can also call the SDK's [`connectAndSign`](../../how-to/javascript/connect-and-sign.md) method, and
[batch multiple JSON-RPC requests](../../how-to/javascript/batch-json-rpc-requests.md) using the `metamask_batch` method.

## Example

See the [example pure JavaScript dapp](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/pure-javascript)
in the JavaScript SDK GitHub repository for more information.
