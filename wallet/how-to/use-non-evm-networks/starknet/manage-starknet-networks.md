---
description: Manage Starknet networks in MetaMask.
sidebar_position: 3
---

# Manage Starknet networks
 
## Switch between networks

Allow users to switch between different Starknet networks, such as mainnet and testnet. This function enables switching by setting the 
appropriate chain Id. Starknet network has two official networks: 

- Ssepolia testnet chain ID -  `0x534e5f5345504f4c4941`
- Mainnet chain ID -  `0x534e5f4d41494e`

```javascript
const switchChain = async (chainId: string) => {
    try {
        await wallet?.request({
            type: 'wallet_switchStarknetChain',
            params: { chainId: chainId },
        });
        console.log(`Switched to chainId: ${chainId}`);
    } catch (e) {
        console.error("Failed to switch chain:", e);
    }
};
```

### Check the current network

Confirm that the dapp is connected to the correct network:

```javascript
const checkCurrentNetwork = () => {
  const starknet = getStarknet();
  const currentNetwork = starknet.provider.rpcUrl;
  console.log('Currently connected to:', currentNetwork);
  return currentNetwork;
};
```