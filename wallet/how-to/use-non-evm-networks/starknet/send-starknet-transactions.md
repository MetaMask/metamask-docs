---
description: Send Starknet transactions in MetaMask.
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Send Starknet transactions

You can send Starknet transactions using the
[`get-starknet`](https://github.com/starknet-io/get-starknet) library or the
[`wallet_invokeSnap`](/snaps/reference/wallet-api-for-snaps/#wallet_invokesnap) JSON-RPC method.

## Prerequisites

[Connect to Starknet](connect-to-starknet.md) from your dapp.

## Send a transaction

Send a transaction using the
[`starknet.account.execute()`](https://starknetjs.com/docs/api/classes/accountinterface/#execute)
function (with `get-starknet`) or the
[`starknet_executeTxn`](../../../reference/non-evm-apis/starknet-snap-api.md#starknet_executetxn)
method (with `wallet_invokeSnap`):

<Tabs>
  <TabItem value="get-starknet" default>

  ```javascript
  const sendStarknetTransaction = async (wallet, contractAddress, entrypoint, calldata) => {
    try {
      if(wallet?.isConnected !== true){
        throw("Wallet not connected");
      } 
    
      // Send the transaction.
      const result = await wallet?.account?.execute({
        contractAddress: contractAddress,  // The address of the contract.
        entrypoint: entrypoint,            // The function to call in the contract.
        calldata: calldata                 // The parameters to pass to the function.
      });
      console.log("Transaction successful:", result);
      return result;
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };
  ```

  </TabItem>
  <TabItem value="wallet_invokeSnap">

  ```javascript
  const sendStarknetTransaction = async (address, chainId, contractAddress, entrypoint, calldata, maxFee = null) => {
    const provider = await getEip6963Provider() // Or window.ethereum if you don't support EIP-6963.
    if (!provider) {
      throw new Error("MetaMask not detected or Snaps not supported");
    }
    try {
      const response = await provider.request({
        method: "wallet_invokeSnap",
        params: {
          snapId: "npm:@consensys/starknet-snap",
          request: {
            method: "starkNet_executeTxn",
            params: {
              address,            // The address of the account.
              chainId,            // The chain ID of the request.
              calls: {
                contractAddress,  // The address of the contract.
                entrypoint,       // The function to call in the contract.
                calldata          // Arguments to the contract.
              },
              details: {
                maxFee,           // This is optional. It will re-estimate in the snap if not provided.
              }
            }
          }
        }
      });
      console.log("Transaction sent:", response);
      return response;
    } catch (error) {
      console.error("Error sending transaction:", error);
      throw error;
    }
  };
  ```

  </TabItem> 
</Tabs>

## Simplified example

The following is a full, simplified example of connecting to a Starknet account and sending a transaction:

<Tabs>
  <TabItem value="get-starknet" default>

```javascript
  import { connect } from "get-starknet";

  const connectStarknetAccount = async () => {
    const starknet = await connect();
    await starknet.enable();  // Prompts the user to connect their Starknet account using MetaMask.
    return starknet;
  };

  const sendStarknetTransaction = async (contractAddress, entrypoint, calldata) => {
    try {
      const starknet = await connectStarknetAccount();  // Ensure the account is connected.

      // Send the transaction.
      const result = await starknet.account.execute({
        contractAddress: contractAddress, 
        entrypoint: entrypoint,            
        calldata: calldata                 
      });

      console.log("Transaction successful:", result);
      return result;
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  const contractAddress = "0xYourContractAddress";  
  const entrypoint = "your_function_name";          
  const calldata = [/* your function arguments */]; 

  sendStarknetTransaction(contractAddress, entrypoint, calldata);
  ```

  </TabItem>
  <TabItem value="wallet_invokeSnap">

  ```javascript
  const connectStarknetAccount = async (provider) => {
    try {
      await provider // Or window.ethereum if you don't support EIP-6963.
        .request({
          method: "wallet_requestSnaps",
          params: {
            "npm:@consensys/starknet-snap": {}
          }
        });
      console.log("Starknet Snap connected");
    } catch (error) {
      console.error("Error connecting to Starknet Snap:", error);
      throw error;
    }
  };

  const sendStarknetTransaction = async (provider, address, calls, maxFee = null) => {
    try {
      await connectStarknetAccount(provider);
      const requestParams = {
        address,
        calls,
        details,
      };
      if (maxFee) {
        requestParams.details = {
          maxFee
        }; 
      } 
      const response = await provider.request({ // Or window.ethereum if you don't support EIP-6963.
        method: "wallet_invokeSnap",
        params: {
          snapId: "npm:@consensys/starknet-snap",
          request: {
            method: "starkNet_executeTxn"
            params: requestParams
          }
        }
      });
      console.log("Transaction sent:", response);
      return response;
    } 
    catch (error) {
      console.error("Error sending transaction:", error);
      throw error;
    }
  };

  // Example usage.
  const calls = [
      { 
        "entrypoint": "transfer",
        "calldata": ["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "1000"],
        "contractAddress": "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4"
      }
  ];
  const address = "0xb60e8dd61c5d32be8058bb8eb970870f07233155";
  const maxFee = "1000000000000000"; // Optional.

  sendStarknetTransaction(address, calls, maxFee)
    .then(result => console.log("Transaction result:", result))
    .catch(error => console.error("Transaction error:", error));
}
```

  </TabItem> 
</Tabs>
