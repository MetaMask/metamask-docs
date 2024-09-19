---
description: Manage Starknet networks in MetaMask.
sidebar_position: 3
---

# Manage Starknet networks

You can manage network interactions in your Starknet dapp.


## Detect the user's network

You can detect the network a user is currently connected to using the following:

```javascript
const checkCurrentNetwork = () => {
  const starknet = getStarknet();
  const currentNetwork = starknet.provider.rpcUrl;
  console.log("Currently connected to:", currentNetwork);
  return currentNetwork;
};
```
 
## Switch between networks

Starknet currently operates two public networks. Each network is identified by a unique chain ID. Use these chain IDs when configuring your dapp or interacting with the Starknet networks.

You can allow users to switch between different Starknet networks by setting the appropriate chain ID. 
Starknet has two official networks: 

| Network | Chain ID (Hexadecimal) |
|---------|------------------------|
| Mainnet | `0x534e5f4d41494e`     |
| Sepolia testnet | `0x534e5f5345504f4c4941` |

The following code example enables switching by setting the appropriate chain ID. 

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