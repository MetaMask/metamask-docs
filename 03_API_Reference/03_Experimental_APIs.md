# Experimental APIs

## wallet_watchAsset

Most all Ethereum wallets display some set of tokens, usually from a centrally curated registry of tokens.

At MetaMask, we believe the future of tokens has the potential to be much bigger than any one party can curate, and we want to enable this explosion of creativity.

In support of this goal, we have implemented support for [EIP 747](https://github.com/estebanmino/EIPs/blob/master/EIPS/eip-747.md), which provides a way for your site to suggest a token that a user might want to track in their wallet.

The code is simple:

```javascript
ethereum.sendAsync({
	method: 'metamask_watchAsset',
	params: {
		"type":"ERC20", // Initially only supports ERC20, but eventually more!
		"options":{
			"address": tokenAddress, // The address that the token is at.
			"symbol": tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
			"decimals": tokenDecimals, // The number of decimals in the token
			"image": tokenImage, // A string url of the token logo
		},
	},
	id: Math.round(Math.random() * 100000),
}, (err, addedBoolean) => {

})
```

We even created a sample Dapp so developers could suggest their tokens to users with a simple hyperlink, without a line of code. [Visit it here](https://github.com/MetaMask/Add-Token).

