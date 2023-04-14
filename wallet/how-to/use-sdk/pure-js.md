---
title: Pure JavaScript
---

# Use MetaMask SDK with pure JavaScript

You can import MetaMask SDK into your pure JavaScript dapp to enable your users to easily connect
with a MetaMask wallet client.
The SDK for pure JavaScript [works the same way](index.md#how-it-works) and has the
[same prerequisites](index.md#prerequisites) as for standard JavaScript and other web frameworks.

To import, instantiate, and use the SDK, you can insert a script in the head section of your website:

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

You can configure the SDK using any [options](../../reference/sdk-js-options.md) and call any
[provider API methods](../../reference/provider-api.md).
Always call [`eth_requestAccounts`](../../reference/rpc-api.md#eth_requestaccounts) using
[`ethereum.request(args)`](../../reference/provider-api.md#windowethereumrequestargs) first, since
it prompts the installation or connection popup to appear.
