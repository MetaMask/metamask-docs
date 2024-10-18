---
description: Manage Starknet networks in MetaMask.
sidebar_position: 3
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Manage Starknet networks

You can detect a user's Starknet network and prompt them to switch Starknet networks in MetaMask,
using the
[`get-starknet`](https://github.com/starknet-io/get-starknet) library or the
[`wallet_invokeSnap`](/snaps/reference/wallet-api-for-snaps/#wallet_invokesnap) JSON-RPC method.

## Prerequisites

[Connect to Starknet](connect-to-starknet.md) from your dapp.

## Detect a user's network

Detect the Starknet network a user is currently connected to using the following:

<Tabs>
  <TabItem value="get-starknet" default>

  ```javascript
  const checkCurrentNetwork = (wallet) => {
    try {
      if(wallet?.isConnected !== true){
        throw("Wallet not connected");
      } 
      const currentNetwork = wallet?.chainId
      console.log("Currently connected to:", currentNetwork);
      return currentNetwork;
    } catch (error) {
      console.error("Error of detect current connected network:", error);
    }
  };
  ```
  
  </TabItem>
  <TabItem value="wallet_invokeSnap">

  ```javascript
  const checkCurrentNetwork = async () => {
    const provider = await provider()        // Or window.ethereum.isMetaMask if you don't support EIP-6963.

    if (provider) {
      try {
        const response = await provider.request({
          method: "wallet_invokeSnap",
          params: {
            snapId: "npm:@consensys/starknet-snap",
            request: {
              method: "starkNet_getCurrentNetwork"
            }
          }
        });
        
        console.log("Currently connected to:", response.name);
        return response.chainId;  // Returns the chain ID.
      } catch (error) {
        console.error("Error getting current Starknet network:", error);
        throw error;
      }
    } else {
      console.error("MetaMask not detected or Snaps not supported");
      throw new Error("MetaMask not detected or Snaps not supported");
    }
  };

  checkCurrentNetwork().then(chainId => {
    console.log("Chain ID:", chainId);
  }).catch(error => {
    console.error("Error:", error);
  });
  ```

  </TabItem> 
</Tabs>
  
## Switch networks

Starknet currently supports two public networks, Mainnet and Sepolia testnet.
Prompt users to switch between networks by setting the
[chain ID](../../../reference/non-evm-apis/starknet-snap-api.md#supported-networks) of the target network:

<Tabs>
  <TabItem value="get-starknet" default>

  ```javascript
  const switchChain = async (wallet, chainId) => {
    try {
      if(wallet?.isConnected !== true){
          throw("Wallet not connected");
      }
       
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

  </TabItem>
  <TabItem value="wallet_invokeSnap">

  ```javascript
  const switchStarknetNetwork = async (chainId) => {
    const provider = await getEip6963Provider();
    // Or window.ethereum.isMetaMask if you don't support EIP-6963.
    if (provider) {
      try {
        await provider.request({
          method: "wallet_invokeSnap",
          params: {
            snapId: "npm:@consensys/starknet-snap",
            request: {
              method: "starkNet_switchNetwork",
              params: { chainId: chainId }
            }
          }
        });
        console.log(`Switched to Starknet network with chainId: ${chainId}`);
      } catch (error) {
        console.error("Error switching Starknet network:", error);
        throw error;
      }
    } else {
      console.error("MetaMask not detected or Snaps not supported");
      throw new Error("MetaMask not detected or Snaps not supported");
    }
  };
  ```

  </TabItem> 
</Tabs>