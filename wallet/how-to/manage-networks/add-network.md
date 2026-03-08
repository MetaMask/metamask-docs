---
description: Prompt a user to add or switch to an Ethereum network.
---

# Add a network

In some cases, such as when [interacting with smart contracts](../../concepts/smart-contracts.md),
your dapp must connect a user to a new network in MetaMask.
Instead of the user [adding a new network manually](https://support.metamask.io/configure/networks/how-to-add-a-custom-network-rpc/#adding-a-network-manually),
which requires them to configure RPC URLs and chain IDs, your dapp can use the
[`wallet_addEthereumChain`](/wallet/reference/json-rpc-methods/wallet_addethereumchain) and
[`wallet_switchEthereumChain`](/wallet/reference/json-rpc-methods/wallet_switchethereumchain) RPC methods to prompt
the user to add a specific, pre-configured network to their MetaMask wallet.

These methods are specified by [EIP-3085](https://eips.ethereum.org/EIPS/eip-3085) and
[EIP-3326](https://eips.ethereum.org/EIPS/eip-3326), and we recommend using them together.

1. `wallet_addEthereumChain` creates a confirmation asking the user to add the specified network to MetaMask.
2. `wallet_switchEthereumChain` creates a confirmation asking the user to switch to the specified network.

The confirmations look like the following:

<div class="imgRow">
    <div class="imgCol">
        <img src={require("../../assets/add-network.png").default} alt="Add network confirmation" class="appScreen" />
    </div>
    <div class="imgCol">
        <img src={require("../../assets/switch-network.png").default} alt="Switch network confirmation" class="appScreen" />
    </div>
</div>

:::info Development and non-EVM networks
- To add a local development network such as [Hardhat](https://hardhat.org) to MetaMask, see [Run a development network](../run-devnet.md).
- To add a non-EVM network such as [Starknet](../use-non-evm-networks/starknet/index.md) to MetaMask,
  see [Use non-EVM networks](/wallet/how-to/use-non-evm-networks).
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
