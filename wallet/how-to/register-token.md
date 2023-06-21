---
description: Register a token with users using wallet_watchAsset.
sidebar_position: 6
---

# Register a token with users

When a user opens MetaMask, they're shown a variety of assets, including tokens.
By default, MetaMask detects some major ERC-20 tokens and displays them, but for most custom ERC-20
tokens, the user must [register the token
manually](https://support.metamask.io/hc/en-us/articles/360015489031-How-to-display-tokens-in-MetaMask#h_01FWH492CHY60HWPC28RW0872H).
This process involves the user interacting with contract addresses, and is error-prone.

MetaMask also supports displaying a user's NFTs in their wallet, but MetaMask doesn't detect and
display the NFTs by default.
The user must [explicitly turn on NFT autodetection or add their NFTs
manually](https://support.metamask.io/hc/en-us/articles/360058238591-NFT-tokens-in-your-MetaMask-wallet).
Moreover, NFT autodetection only detects NFTs on Ethereum Mainnet.

You can improve the security and experience of users registering your [ERC-20 token](#register-an-erc-20-token)
or their [NFTs](#register-nfts) on their MetaMask interface by using the
[`wallet_watchAsset`](../reference/rpc-api.md#wallet_watchasset) RPC method.
`wallet_watchAsset` provides a friendly interface that prompts users to add tokens to their wallet,
without having to interact with contract addresses.

:::tip Adding NFTs
With `wallet_watchAsset`, you can prompt users to add their NFTs even when they have NFT
autodetection disabled.
You can also add NFTs from networks other than Ethereum Mainnet.
:::

## Register an ERC-20 token

To prompt users to register an ERC-20 token, you can add something like the following to your
project script:

```javascript
const tokenAddress = '0xd00981105e61274c8a5cd5a88fe7e037d935b513';
const tokenSymbol = 'TUT';
const tokenDecimals = 18;
const tokenImage = 'http://placekitten.com/200/300';

try {
  // 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
  const wasAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress, // The address of the token.
        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 characters.
        decimals: tokenDecimals, // The number of decimals in the token.
        image: tokenImage, // A string URL of the token logo.
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

For more examples, the following are live web dapps that let you enter your token details and share
them using a simple web link:

- [WatchToken](https://vittominacori.github.io/watch-token/create/)
- [Add Token dapp](https://metamask.github.io/Add-Token/#edit)

## Register NFTs

To prompt users to add an NFT, you can add something like the following to your project script.
`wallet_watchAsset` supports both ERC-721 and ERC-1155 NFT standards.

```javascript
try {
  // 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
  const wasAdded = await ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC721`, // or 'ERC1155'
      options: {
        address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e', // The address of the token.
        tokenId: '1', // ERC-721 or ERC-1155 token ID.
      },
    },
  });

  if (wasAdded) {
    console.log('User successfully added the token!');
  } else {
    console.log('User did not add the token.');
  }
} catch (error) {
  console.log(error);
}
```

You can prompt users to add multiple NFTs using `window.ethereum.sendAsync()` instead of
`window.ethereum.request()`:

```javascript
window.ethereum.sendAsync([{
 method: 'wallet_watchAsset',
  params: {
    type: 'ERC721',
    options: {
      address: contractAddress,
      tokenId: 1,
    },
  }, {
  method: 'wallet_watchAsset',
    params: {
      type: 'ERC721',
      options: {
        address: contractAddress,
        tokenId: 2,
      },
    },
  ...
])
```
