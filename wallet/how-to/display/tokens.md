---
description: Register a token with users using wallet_watchAsset.
sidebar_position: 1
---

# Display tokens

When a user opens MetaMask, they're shown some major tokens by default.
However, to display most custom ERC-20 tokens, the user must [add the token
manually](https://support.metamask.io/hc/en-us/articles/360015489031-How-to-display-tokens-in-MetaMask#h_01FWH492CHY60HWPC28RW0872H).
To display a user's NFTs, the user must [explicitly turn on NFT autodetection or add their NFTs
manually](https://support.metamask.io/hc/en-us/articles/360058238591-NFT-tokens-in-your-MetaMask-wallet).

Manually adding tokens involves the user interacting with contract addresses, and is error-prone.

You can improve the security and experience of displaying your
[ERC-20 token](#display-an-erc-20-token) or users' [NFTs](#display-nfts) in MetaMask by using the
[`wallet_watchAsset`](/wallet/reference/wallet_watchasset) RPC method.
`wallet_watchAsset` provides a friendly interface that prompts users to register tokens to their
MetaMask wallet, without having to interact with contract addresses.

:::tip Displaying NFTs
With `wallet_watchAsset`, you can prompt users to add their NFTs even when they have NFT
autodetection disabled.
Moreover, NFT autodetection only detects NFTs on Ethereum Mainnet.
With `wallet_watchAsset`, users can add NFTs from other networks.
:::

:::caution Experimental feature
Using `wallet_watchAsset` to display NFTs is experimental and currently only available on the
extension (not on mobile).
:::

## Display an ERC-20 token

To prompt users to add an ERC-20 token, you can add something like the following to your project script:

```javascript
const tokenAddress = "0xd00981105e61274c8a5cd5a88fe7e037d935b513";
const tokenSymbol = "TUT";
const tokenDecimals = 18;
const tokenImage = "http://placekitten.com/200/300";

try {
  // 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
  const wasAdded = await provider // Or window.ethereum if you don't support EIP-6963.
    .request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          // The address of the token.
          address: tokenAddress,
          // A ticker symbol or shorthand, up to 5 characters.
          symbol: tokenSymbol,
          // The number of decimals in the token.
          decimals: tokenDecimals,
          // A string URL of the token logo.
          image: tokenImage,
        },
      },
    });

  if (wasAdded) {
    console.log("Thanks for your interest!");
  } else {
    console.log("Your loss!");
  }
} catch (error) {
  console.log(error);
}
```

:::note
If the chain ID of your token doesn't match the user's network, they can get unexpected results.
We recommend [detecting the user's network chain ID](../manage-networks/detect-network.md) and
[prompting them to switch chains](/wallet/reference/wallet_switchethereumchain), if necessary.
:::

For more examples, the following are live web dapps that let you enter your token details and share
them using a simple web link:

- [WatchToken](https://vittominacori.github.io/watch-token/create/)
- [Add Token dapp](https://metamask.github.io/Add-Token/#edit)

## Display NFTs

:::caution Experimental feature
Using `wallet_watchAsset` to display NFTs is experimental and currently only available on the
extension (not on mobile).
See [MIP-1](https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-1.md)
and the [MIP proposal lifecycle](https://github.com/MetaMask/metamask-improvement-proposals/blob/main/PROCESS-GUIDE.md#proposal-lifecycle)
for more information.
:::

You can prompt users to add a single NFT or multiple NFTs using `wallet_watchAsset`.
The add NFT interfaces look like the following:

<div class="row">
    <div class="column">
        <img src={require("../../assets/watchasset-nft.png").default} alt="NFT confirmation" style={{border: '1px solid #DCDCDC'}} />
    </div>
    <div class="column">
        <img src={require("../../assets/watchasset-nft-2.png").default} alt="Multiple NFTs confirmation" style={{border: '1px solid #DCDCDC'}} />
    </div>
</div>

### Display a single NFT

To prompt users to add a single NFT, add something like the following to your project script.
`wallet_watchAsset` supports both ERC-721 and ERC-1155 NFT standards.

```javascript
try {
  // wasAdded is a boolean. Like any RPC method, an error can be thrown.
  const wasAdded = await provider // Or window.ethereum if you don't support EIP-6963.
    .request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC721", // Or "ERC1155".
        options: {
          // The address of the token.
          address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
          // ERC-721 or ERC-1155 token ID.
          tokenId: "1",
        },
      },
    });

  if (wasAdded) {
    console.log("User successfully added the token!");
  } else {
    console.log("User did not add the token.");
  }
} catch (error) {
  console.log(error);
}
```

### Display multiple NFTs

To prompt users to add multiple NFTs, use `sendAsync()` instead of
`request()` to call `wallet_watchAsset`.
For example:

```javascript
provider // Or window.ethereum if you don't support EIP-6963.
  .sendAsync([{
    method: "wallet_watchAsset",
    params: {
      type: "ERC721",
      options: {
        address: contractAddress,
        tokenId: 1,
      },
    }
  }, {
    method: "wallet_watchAsset",
    params: {
      type: "ERC721",
      options: {
        address: contractAddress,
        tokenId: 2,
      },
    },
  },
  ...
  ])
```
