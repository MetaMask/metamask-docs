---
description: Prompt a user to add or switch to an Ethereum network.
sidebar_position: 2
---

# Add a network

:::note

You can add a non-EVM network ... (point to docs section)

:::

In some cases, such as when [interacting with smart contracts](../../concepts/smart-contracts.md),
your dapp must connect a user to a new network in MetaMask.
Instead of the user [adding a new network manually](https://support.metamask.io/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC#h_01G63GGJ83DGDRCS2ZWXM37CV5),
which requires them to configure RPC URLs and chain IDs, your dapp can use the
[`wallet_addEthereumChain`](/wallet/reference/wallet_addethereumchain) and
[`wallet_switchEthereumChain`](/wallet/reference/wallet_switchethereumchain) RPC methods to prompt
the user to add a specific, pre-configured network to their MetaMask wallet.

These methods are specified by [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085) and
[EIP-3326](https://eips.ethereum.org/EIPS/eip-3326), and we recommend using them together.

1. `wallet_addEthereumChain` creates a confirmation asking the user to add the specified network to MetaMask.
2. `wallet_switchEthereumChain` creates a confirmation asking the user to switch to the specified network.

The confirmations look like the following:

<div class="row">
    <div class="column">
        <img src={require("../../assets/add-network.png").default} alt="Add network confirmation" style={{border: '1px solid #DCDCDC'}} />
    </div>
    <div class="column">
        <img src={require("../../assets/switch-network.png").default} alt="Switch network confirmation" style={{border: '1px solid #DCDCDC'}} />
    </div>
</div>

:::note

To add a local development network such as [Hardhat](https://hardhat.org) to MetaMask, see [Run a development network](../run-devnet.md).

:::

## Example

The following is an example of using `wallet_addEthereumChain` and `wallet_switchEthereumChain` to
prompt a user to add and switch to a new network:

```javascript
try {
  await provider // Or window.ethereum if you don't support EIP-6963.
    .request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xf00" }],
    })
} catch (switchError) {
  // This error code indicates that the chain has not been added to MetaMask.
  if (switchError.code === 4902) {
    try {
      await provider // Or window.ethereum if you don't support EIP-6963.
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xf00",
              chainName: "...",
              rpcUrls: ["https://..."] /* ... */,
            },
          ],
        })
    } catch (addError) {
      // Handle "add" error.
    }
  }
  // Handle other "switch" errors.
}
```
