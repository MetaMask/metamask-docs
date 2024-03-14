---
sidebar_label: Pure JavaScript
sidebar_position: 2
description: Set up the SDK in your Pure JavaScript dapp.
tags:
  - JavaScript SDK
---

# Use MetaMask SDK with pure JavaScript

Import [MetaMask SDK](../../../concepts/sdk/index.md) into your pure JavaScript dapp to enable
your users to easily connect to the MetaMask browser extension and MetaMask Mobile.
The SDK for pure JavaScript has the [same prerequisites](index.md#prerequisites) as for standard JavaScript.

To import, instantiate, and use the SDK, you can insert a script in the head section of your website:

```html title="index.html"
<head>
    ...
    <script src="https://c0f4f41c-2f55-4863-921b-sdk-docs.github.io/cdn/metamask-sdk.js"></script>
    <script>
        const MMSDK = new MetaMaskSDK.MetaMaskSDK(
            dappMetadata: {
                name: "Example Pure JS Dapp",
                url: window.location.href,
            },
            // Other options
        )
        // Because the init process of MetaMask SDK is async.
        setTimeout(() => {
            // You can also access via window.ethereum
            const ethereum = MMSDK.getProvider();

            ethereum.request({ method: 'eth_requestAccounts' });
        }, 0)
    </script>
    ...
</head>
```

You can configure the SDK using any [options](../../../reference/sdk-js-options.md) and call any
[provider API methods](../../../reference/provider-api.md).
Always call [`eth_requestAccounts`](/wallet/reference/eth_requestaccounts) using
[`request()`](../../../reference/provider-api.md#request) first,
since it prompts the installation or connection popup to appear.

:::note Important SDK options
- Use [`dappMetadata`](../../../reference/sdk-js-options.md#dappmetadata) to display information
  about your dapp in the MetaMask connection modal.
- Use [`modals`](../../../reference/sdk-js-options.md#modals) to [customize the logic and UI of
  the displayed modals](../../display/custom-modals.md).
- Use [`infuraAPIKey`](../../../reference/sdk-js-options.md#infuraapikey) to
  [make read-only RPC requests](../../make-read-only-requests.md) from your dapp.
:::

## Example

See the [example pure JavaScript dapp](https://github.com/MetaMask/metamask-sdk/tree/main/packages/examples/pure-javascript)
in the JavaScript SDK GitHub repository for more information.
