# Registering Tokens with Users

When a user opens their MetaMask, they are shown a variety of assets, including tokens. By default, MetaMask auto-detects some major popular tokens and auto-displays them, but for most tokens, the user will need to add the token themselves.

While this is possible using our UI with the `Add Token` button, that process can be cumbersome, and involves the user interacting with contract addresses, and is very error prone.

You can greatly improve the security and experience of users adding your token to their MetaMask by taking advantage of the `wallet_watchAsset` API as defined in [EIP 747](https://github.com/estebanmino/EIPs/blob/master/EIPS/eip-747.md).

You can see some working code [here](https://github.com/MetaMask/Add-Token/blob/master/src/AddTokenPanel.jsx#L119-L131), but we have also made a simple web app that allows you to enter your token details once (including an icon) and then share a link with others so they can easily see those tokens in their wallet.

[Add Token App](https://metamask.github.io/Add-Token/#edit)

