---
description: Send Starknet transactions in MetaMask.
sidebar_position: 4
---

# Send Starknet transactions

After the account is connected, you can send a transaction using the `starknet.invoke()` function:

```javascript
const sendStarknetTransaction = async (contractAddress, entrypoint, calldata) => {
  try {
    const starknet = await connectStarknetAccount();  // Ensure the account is connected

    // Send the transaction
    const result = await starknet.invoke({
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

## Simplified Example

```javascript

import { getStarknet } from 'get-starknet';

const connectStarknetAccount = async () => {
  const starknet = getStarknet();
  await starknet.enable();  // Prompts the user to connect their Starknet account via MetaMask
  return starknet;
};

const sendStarknetTransaction = async (contractAddress, entrypoint, calldata) => {
  try {
    const starknet = await connectStarknetAccount();  // Ensure the account is connected

    // Send the transaction
    const result = await starknet.invoke({
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

// Example Usage
const contractAddress = '0xYourContractAddress';  
const entrypoint = 'your_function_name';          
const calldata = [/* your function arguments */]; 

sendStarknetTransaction(contractAddress, entrypoint, calldata);
```