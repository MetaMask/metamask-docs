# Register a token with users

When a user opens MetaMask, they're shown a variety of assets, including tokens.
By default, MetaMask auto-detects some major popular tokens and auto-displays them, but for most
tokens, the user must add the token themselves.

While this is possible using our UI with the **Add Token** button, that process can be cumbersome,
involves the user interacting with contract addresses, and is very error prone.

You can improve the security and experience of users adding your token to their MetaMask interface
by taking advantage of the [`wallet_watchAsset`](../reference/rpc-api.md#wallet_watchasset) RPC API
method.

## Code-free examples

The following are live web applications that let you enter your token details, and then share them
with a simple web link:

- [Watch Token](https://vittominacori.github.io/watch-token/create/)
- [Add Token App](https://metamask.github.io/Add-Token/#edit)

## Example

If you'd like to integrate suggesting a token into your own web app, you can use the following code
snippet:

```javascript
const tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513';
const tokenSymbol = 'TUT';
const tokenDecimals = 18;
const tokenImage = 'http://placekitten.com/200/300';

try {
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = await ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenAddress, // The address that the token is at.
        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals: tokenDecimals, // The number of decimals in the token
        image: tokenImage, // A string url of the token logo
      },
    },
  });

  if (wasAdded) {
    console.log('Thanks for your interest!');
  } else {
    console.log('Your loss!');
  }
} catch (error) {
  console.log(error);
}
```
