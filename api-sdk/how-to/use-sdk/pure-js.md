---
title: Pure JavaScript
---

# Use MetaMask SDK with pure JavaScript

If your project just uses pure JavaScript, you can import the SDK by putting a script on the head
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
