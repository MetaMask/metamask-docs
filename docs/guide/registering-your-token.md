# Registering Tokens with Users

When a user opens their MetaMask, they are shown a variety of assets, including tokens. By default, MetaMask auto-detects some major popular tokens and auto-displays them, but for most tokens, the user will need to add the token themselves.

While this is possible using our UI with the `Add Token` button, that process can be cumbersome, and involves the user interacting with contract addresses, and is very error prone.

You can greatly improve the security and experience of users adding your token to their MetaMask by taking advantage of the `wallet_watchAsset` API as defined in [EIP-747](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-747.md).

## Code-free Example

Here are a couple live web applications that let you enter your token details, and then share them with a simple web link:

- [Watch Token](https://vittominacori.github.io/watch-token/create/)
- [Add Token App](https://metamask.github.io/Add-Token/#edit)

## Example

If you'd like to integrate suggesting a token into your own web app, you can follow this code snippet to implement it:

```javascript
const tokenAddress = '0x2747f48dBE72a0534798F757571a64E748CC7DbD';
const tokenSymbol = 'MARA';
const tokenDecimals = 18;
const tokenImage = 'http://mara.xyz';

try {
  // wasAdded is a boolean. Like any RPC method, an error may be thrown.
  const wasAdded = await ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20', // Initially only supports ERC20, but eventually more!
      options: {
        address: tokenAddress, // https://etherscan.io/address/0x2747f48dBE72a0534798F757571a64E748CC7DbD .
        symbol: tokenSymbol, // MARA.
        decimals: tokenDecimals, // 18
        image: tokenImage, // https://drive.google.com/file/d/1b4wHhO0u4VXwvrFZkAoJyq7lE1xcMiGp/view?usp=drivesdk
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
