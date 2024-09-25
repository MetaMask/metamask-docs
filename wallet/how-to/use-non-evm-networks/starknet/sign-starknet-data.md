---
description: Sign Starknet transactions in MetaMask.
sidebar_position: 5
---

# Sign Starknet transactions

After an account is connected, you can sign a transaction using the `wallet.account.signer.signTransaction` function:

```typescript
const signStarknetTransaction = async (wallet, contractAddress, entrypoint, calldata) => {
  try {
    if(wallet?.isConnected !== true){
      throw("Wallet not connected");
    } 
  
    // Send the transaction
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