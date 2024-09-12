---
description: Manage Starknet networks in MetaMask.
sidebar_position: 3
---

# Manage Starknet networks
 
## Switch between networks

Allow users to switch between different Starknet networks, such as mainnet and testnet. This function enables switching by setting the appropriate network RPC URL.

```javascript
const switchNetwork = async (network) => {
  try {
    const starknet = getStarknet();

    // Example network URLs
    const networks = {
      mainnet: 'https://mainnet.starknet.io',
      testnet: 'https://sepolia.starknet.io'
    };

    // Set the provider based on the selected network
    starknet.setProvider({ rpcUrl: networks[network] });

    console.log(`Switched to ${network}:`, starknet.provider);
  } catch (error) {
    console.error('Error switching network:', error);
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