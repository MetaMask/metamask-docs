---
description: Manage Starknet networks in MetaMask.
sidebar_position: 3
---

# Manage Starknet networks

You can detect a user's Starknet network and prompt them to switch Starknet networks in MetaMask.
The following examples use the [`get-starknet`](https://github.com/starknet-io/get-starknet) library.

## Detect a user's network

Detect the Starknet network a user is currently connected to using the following:

```javascript
const checkCurrentNetwork = () => {
  const starknet = getStarknet();
  const currentNetwork = starknet.provider.rpcUrl;
  console.log("Currently connected to:", currentNetwork);
  return currentNetwork;
};
```
 
## Switch networks

Starknet currently supports two public networks, Mainnet and Sepolia testnet.
Prompt users to switch between networks by setting the
[chain ID](../../../reference/non-evm-apis/starknet-snap-api.md#supported-networks) of the target network:

```javascript
const switchChain = async (chainId: string) => {
  try {
    await wallet?.request({
      type: "wallet_switchStarknetChain",
      params: { chainId: chainId },
    });
      console.log(`Switched to chainId: ${chainId}`);
  } catch (e) {
    console.error("Failed to switch chain:", e);
  }
};
```