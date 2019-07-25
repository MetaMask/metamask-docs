# Registering Tokens with Users

When a user opens their MetaMask, they are shown a variety of assets, including tokens. By default, MetaMask auto-detects some major popular tokens and auto-displays them, but for most tokens, the user will need to add the token themselves.

While this is possible using our UI with the `Add Token` button, that process can be cumbersome, and involves the user interacting with contract addresses, and is very error prone.

You can greatly improve the security and experience of users adding your token to their MetaMask by taking advantage of the `wallet_watchAsset` API as defined in [EIP 747](https://github.com/estebanmino/EIPs/blob/master/EIPS/eip-747.md).

## Code-free Example

Here are a couple live web applications that let you enter your token details, and then share them with a simple web link:

- [Watch Token](https://vittominacori.github.io/watch-token/create.html)
- [Add Token App](https://metamask.github.io/Add-Token/#edit)

## Example

If you'd like to integrate suggesting a token into your own web app, you can follow this code snippet to implement it:

```javascript
const tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513'
const tokenSymbol = 'TUT'
const tokenDecimals = 18
const tokenImage = 'http://placekitten.com/200/300'

ethereum.sendAsync({
    method: 'wallet_watchAsset',
    params: {
      "type":"ERC20",
      "options":{
        "address": tokenAddress,
        "symbol": tokenSymbol,
        "decimals": tokenDecimals,
        "image": tokenImage,
      },
    },
    id: Math.round(Math.random() * 100000),
}, (err, added) => {

  if (added) {
    console.log('Thanks for your interest!')
  } else {
    console.log('Your loss!')
  }

})
```

## Default Token List

If you're a major and popular token, you may qualify to be listed in our [eth-contract-metadata](https://github.com/MetaMask/eth-contract-metadata) registry. This is a centralized solution and takes a larger toll on our development team, so we prefer to avoid the politics of picking and choosing tokens that get auto-detected in users' accounts, so please see if the EIP-747 method above can suit your needs before submitting a new token there for inclusion.

If you have a user on your site, asking them to click once to add a token is a small burden on them, and allows you to leverage the trusting relationship you already have with your user instead of our central repository.

