# Experimental APIs

## `wallet_` RPC methods

### wallet_watchAsset

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

### wallet_registerOnboarding

This method is in support of a new onboarding process that helps users find their way back to the site that requested MetaMask be installed. This RPC method is used by the [`@metamask/onboarding`](https://github.com/MetaMask/metamask-onboarding) library to tell MetaMask which site initiated onboarding. It should be send directly from the site doing the onboarding; there are no parameters. We recommend using our [`@metamask/onboarding`](https://github.com/MetaMask/metamask-onboarding) library instead of using this method directly.

## `ethereum._metamask`

MetaMask supports the standard Ethereum Provider API as defined in both [EIP-1193](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1193.md) and [EIP-1102](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1102.md). In addition to `ethereum.enable()` and its RPC equivalent `ethereum.send('eth_requestAccounts')`, MetaMask also exposes a collection of nonstandard convenience methods on the provider object at `ethereum._metamask`. **Using these methods is dangerous** since other dapp browsers may or may not implement them; for this reason, these methods are intentionally kept at a MetaMask-specific namespace to avoid confusion with standard provider functionality.

Each method and its intended use is described below.

### `ethereum._metamask.isEnabled: () => boolean` (To Be Removed)

**Note:** This will be removed in **Q1 2020**.

This method returns a `boolean` indicating if the current domain has access to user accounts. This is useful for determining if a user has approved account access for the current session.

### `ethereum._metamask.isApproved: () => Promise<boolean>` (To Be Removed)

**Note:** This will be removed in **Q1 2020**.

This method returns a `Promise` that resolves to a `Boolean` indicating if the current domain has a cached approval. This is useful for determining if an approval popup will show when `ethereum.enable()` is called, since it indicates if a past approval exists.

### `ethereum._metamask.isUnlocked: () => Promise<boolean>`

This method returns a `Promise` that resolves to a `Boolean` indicating if MetaMask is unlocked by the user. This is useful for knowing if MetaMask is unlocked in order to provide meaningful instructions to the user during onboarding. Note that this does not indicate if a user has approved account exposure.

## `eth_` RPC methods

### eth_getEncryptionPublicKey

This method is used for getting a public key that based on the `nacl` [library](https://github.com/dchest/tweetnacl-js). With such a key, you can encrypt a message.

```javascript
ethereum.sendAsync({
    jsonrpc: '2.0',
    method: 'eth_getEncryptionPublicKey',
    params: [web3.eth.defaultAccount],
    from: web3.eth.defaultAccount,
}, function(error, encryptionpublickey) {
    if (!error) {
	window.encryptionpublickey = encryptionpublickey.result;
    } else {
	console.log(error);
    }
})
```

An example of how to encrypt a message via [sigUtil](https://github.com/MetaMask/eth-sig-util)

```javascript
const encryptedMessage = web3.toHex(JSON.stringify(sigUtil.encrypt(window.encryptionpublickey, {'data': 'Hello world!'}, 'x25519-xsalsa20-poly1305')));
```

### eth_decrypt

This method is used to decrypt a message that was encrypted using the public key based on the `nacl` library.

```javascript
web3.currentProvider.sendAsync({
    jsonrpc: '2.0',
    method: 'eth_decrypt',
    params: [encryptedMessage, web3.eth.defaultAccount],
    from: web3.eth.defaultAccount,
}, function(error, message) {
    console.log(error, message);
    if (!error) {
	console.log(message.result); // Hello world!
    } else {
	console.log(error.message);
    }
});
```
