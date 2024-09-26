---
description: Manage Starknet networks in MetaMask.
sidebar_position: 3
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Manage Starknet networks

You can detect a user's Starknet network and prompt them to switch Starknet networks in MetaMask.
The following examples use the [`get-starknet`](https://github.com/starknet-io/get-starknet) library.

## Detect a user's network

Detect the Starknet network a user is currently connected to using the following:

<Tabs>
  <TabItem value="get-starknet" default>

  ```javascript
  const checkCurrentNetwork = () => {
    const starknet = getStarknet();
    const currentNetwork = starknet.provider.rpcUrl;
    console.log("Currently connected to:", currentNetwork);
    return currentNetwork;
  };
  ```
  
  </TabItem>
  <TabItem value="wallet_invokeSnap">

  ```javascript
  const checkCurrentNetwork = async () => {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      try {
        const response = await window.ethereum.request({
          method: "wallet_invokeSnap",
          params: {
            snapId: "npm:@consensys/starknet-snap",
            request: {
              method: "starknet_getChainId"
            }
          }
        });
        
        let networkName;
        switch (response) {
          case "0x534e5f4d41494e":
            networkName = "Mainnet";
            break;
          case "0x534e5f5345504f4c4941":
            networkName = "Sepolia Testnet";
            break;
          default:
            networkName = "Unknown Network";
        }
        
        console.log("Currently connected to:", networkName);
        return response;  // Returns the chain ID.
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

  </TabItem>
  <TabItem value="wallet_invokeSnap">

  ```javascript
  const switchStarknetNetwork = async (chainId) => {
    if (typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask) {
      try {
        await window.ethereum.request({
          method: "wallet_invokeSnap",
          params: {
            snapId: "npm:@consensys/starknet-snap",
            request: {
              method: "wallet_switchStarknetChain",
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