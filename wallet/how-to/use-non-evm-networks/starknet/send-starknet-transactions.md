---
description: Send Starknet transactions in MetaMask.
sidebar_position: 4
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Send Starknet transactions

After the account is connected, you can send a transaction using the `starknet.account.execute()` function:

<Tabs>
  <TabItem value="get-starknet" default>

  ```javascript
  const sendStarknetTransaction = async (wallet, contractAddress, entrypoint, calldata) => {
    try {
      if(wallet?.isConnected !== true){
        throw('Wallet not connected');
      } 
    
      // Send the transaction
      const result = await wallet?.account?.execute({
        contractAddress: contractAddress,  // The address of the contract
        entrypoint: entrypoint,            // The function to call in the contract
        calldata: calldata                 // The parameters to pass to the function
      });
      console.log('Transaction successful:', result);
      return result;
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };
  ```

  </TabItem>
  <TabItem value="wallet_invokeSnap">

  ```javascript
  const sendStarknetTransaction = async (contractAddress, contractFuncName, contractCallData, senderAddress, maxFee = null) => {
    if (typeof window.ethereum === 'undefined' || !window.ethereum.isMetaMask) {
      throw new Error('MetaMask not detected or Snaps not supported');
    }

    try {
      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: 'npm:@consensys/starknet-snap',
          request: {
            method: 'starkNet_sendTransaction',
            params: {
              contractAddress,
              contractFuncName,
              contractCallData,
              senderAddress,
              maxFee,
              // chainId is optional, defaults to Starknet Sepolia testnet
            }
          }
        }
      });
      console.log('Transaction sent:', response);
      return response;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  };
  ```

  </TabItem> 
</Tabs>

## Simplified example

The following is a simplified example of how to connect to a Starknet account and send a transaction using the `get-starknet` library:

<Tabs>
  <TabItem value="get-starknet" default>

  ```javascript
  import { connect } from 'get-starknet';

  const connectStarknetAccount = async () => {
    const starknet = await connect();
    await starknet.enable();  // Prompts the user to connect their Starknet account using MetaMask
    return starknet;
  };

  const sendStarknetTransaction = async (contractAddress, entrypoint, calldata) => {
    try {
      const starknet = await connectStarknetAccount();  // Ensure the account is connected

      // Send the transaction
      const result = await starknet.account.execute({
        contractAddress: contractAddress, 
        entrypoint: entrypoint,            
        calldata: calldata                 
      });

      console.log('Transaction successful:', result);
      return result;
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  const contractAddress = '0xYourContractAddress';  
  const entrypoint = 'your_function_name';          
  const calldata = [/* your function arguments */]; 

  sendStarknetTransaction(contractAddress, entrypoint, calldata);
  ```

  </TabItem>
  <TabItem value="wallet_invokeSnap">

  ```javascript
  const connectStarknetAccount = async () => {
    if (typeof window.ethereum === 'undefined' || !window.ethereum.isMetaMask) {
      throw new Error('MetaMask not detected or Snaps not supported');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_requestSnaps',
        params: {
          'npm:@consensys/starknet-snap': {}
        }
      });
      console.log('Starknet Snap connected');
    } catch (error) {
      console.error('Error connecting to Starknet Snap:', error);
      throw error;
    }
  };

  const sendStarknetTransaction = async (contractAddress, contractFuncName, contractCallData, senderAddress, maxFee = null) => {
    try {
      await connectStarknetAccount();
      
      const requestParams = {
        contractAddress,
        contractFuncName,
        contractCallData,
        senderAddress
      };

      if (maxFee) {
        requestParams.maxFee = maxFee; // Include maxFee only if it's provided.
      }

      const response = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: {
          snapId: 'npm:@consensys/starknet-snap',
          request: {
            method: 'starkNet_sendTransaction',
            params: requestParams
          }
        }
      });

      console.log('Transaction sent:', response);
      return response;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  };

  const contractAddress = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';
  const contractFuncName = 'transfer';
  const contractCallData = ["0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", "1000"];
  const senderAddress = '0xb60e8dd61c5d32be8058bb8eb970870f07233155';
  const maxFee = '1000000000000000'; // Optional

  sendStarknetTransaction(contractAddress, contractFuncName, contractCallData, senderAddress, maxFee)
    .then(result => console.log('Transaction result:', result))
    .catch(error => console.error('Transaction error:', error));
  ```

  </TabItem> 
</Tabs>