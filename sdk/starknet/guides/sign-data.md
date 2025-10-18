---
description: Sign Starknet transactions in MetaMask.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Sign data

You can sign Starknet transactions using the
[`get-starknet`](https://github.com/starknet-io/get-starknet) library or the
[`wallet_invokeSnap`](/snaps/reference/wallet-api-for-snaps/#wallet_invokesnap) JSON-RPC method.

## Prerequisites

[Connect to Starknet](connect-to-starknet.md) from your dapp.

## Sign a transaction

Sign a Starknet transaction using the following:

<Tabs>
  <TabItem value="get-starknet" default>

  ```typescript
  const signStarknetTransaction = async (wallet, contractAddress, entrypoint, calldata) => {
    try {
      if(wallet?.isConnected !== true){
        throw("Wallet not connected");
      } 
    
      // Sign the transaction.
      const result = await wallet?.account?.signer.signTransaction({
        contractAddress: contractAddress,  // The address of the contract.
        entrypoint: entrypoint,            // The function to call in the contract.
        calldata: calldata                 // The parameters to pass to the function.
      });
      console.log("Transaction signed successfully:", result);
      return result;
    } catch (error) {
      console.error("Error signing transaction:", error);
    }
  };
  ```
  </TabItem>
  <TabItem value="wallet_invokeSnap">

  ```typescript
  const signStarknetTransactionWithSnap = async (contractAddress, entrypoint, calldata, chainId, address) => {
    try {
      const provider = await getEip6963Provider(); // Or window.ethereum if you don't support EIP-6963.
      if (!provider) {
        throw new Error("MetaMask not detected or Snaps not supported");
      }
      // Connect to the Starknet Snap if it's not already connected.
      await provider.request({
        method: "wallet_requestSnaps",
        params: {
          "npm:@consensys/starknet-snap": {}
        }
      });
      console.log("Starknet Snap connected");

      // Use the wallet_invokeSnap method to sign the transaction.
      const response = await provider.request({
        method: "wallet_invokeSnap",
        params: {
          snapId: "npm:@consensys/starknet-snap",
          request: {
            method: "starkNet_signTransaction",
            params: {
              address,            // The address of the account.
              chainId,            // The chain ID of the request.
              transactions: {
                contractAddress,  // The address of the contract.
                entrypoint,       // The function to call in the contract.
                calldata          // The parameters to pass to the function (as an array).
              }
            }
          }
        }
      });
      
      console.log("Transaction signed successfully:", response);
      return response;
    } catch (error) {
      console.error("Error signing transaction:", error);
      throw error;
    }
  };

  // Example usage.
  const contractAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
  const entrypoint = "transfer";
  const calldata = ["0xRecipientAddress", "1000"];

  signStarknetTransactionWithSnap(contractAddress, entrypoint, calldata)
    .then(result => console.log("Signed transaction result:", result))
    .catch(error => console.error("Transaction error:", error));
  ```
 
  </TabItem> 
</Tabs>