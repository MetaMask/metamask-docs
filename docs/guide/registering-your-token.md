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
const tokenAddress = '0x7659ce147d0e714454073a5dd7003544234b6aa0';
const tokenSymbol = 'XCAD';
const tokenDecimals = 18;
const tokenImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAM7SURBVFhH7ZZrSBRRFMfPmbtiZllJaQWFpGX1Kc1Ce1AYZhEEfsggK4uwIiMrED8UQiF+EIqeYBGRJAkRRdCbwkIqCo2gwDCzBxS9iILIdZ07pzO7h3HXHd3xUx/yB5e9//99nXvn3JmFYf57UH4H5NzspmlI+jBXo/oi0K6N7RveiwzSMPNcHKDvJFdTQ044eLW0veSsiCAxA7C5mHnmFhEVinQwAGrXdJTtExnk0ozTNRowwrNBwJemoRave7X5p1hBPAVwM+NEAZF1G4Ai+vOk3xXoKcvf7PHb+k760WITsIn7cWzh4A8TVd7qzvIOMRw8BWDTklbXQmAtEumgAEsWvqu68DitNt0E9ZSAkqUpCAfZa6FRtORt5XWxIvAcwPOpB4uI9GWRDjzBgzjSK3iHzRZArtgOhKoq+0N1ncgoPAdg0zm56hnvMEtkEN4hGGRd0YhFYjlwSz1h/I7pHw+QWFEMKYCvqRUlFliNMOB0YSDeC6CxaurnIz3iuDKkAPzjtqNWup1vRKZYriDiOw1GbtL3U1/EGpAhBWCjk0vLOBlPi3TjNx/9UvWjoU30oPS7Lh4wem8Aar5tmsN3K9ZOr4vbDCkAc0LxCELdxAv5ohcOFTRMU7p7wvMjCKSsQQOonhNwq1juILTxS2t+3LfLfCtj4/kEFJqVnAFb3XYdUUDPNQwqCI2KjacA9MTVxQS61mXBPy4ev3x0hQyNScxHoCetyuJrf5+rSSHHwY+EywjpKtfHh6w+ECFHfboeMxkHPQE9Kz+FEnsuwcieJC7QVwKA8b371edrjyAh0BTZ5pTdMs2gDHgCekFePAXUDU66fLEc0MLzZPpKfS+aSWcvzuZTaLXtUKsDoY8y1JOHXaJdcQ3AWjkHyVTHQWO5WOG0Q6/KUy1PfokGnZ/zlH/mhVQYBhxTd1sHzQf3RzAqsBdG+8thbDdEFn83jA6sD1/cBsf0NHBbv75ckvzbrbWzo/IjnKgTsLakF4KFjUTgE8uBk67aaHh9XKSD3pSRyEn3msckiOXAL48a42znIZFRRAVAZemG/S9DZARY/4bvmTu0jcfZ3+Z+8IeLjFNdnl5KwwwzzD8A4C8M/zdzwBw3GwAAAABJRU5ErkJggg==';

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
