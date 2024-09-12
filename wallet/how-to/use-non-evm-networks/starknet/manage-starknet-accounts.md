---
description: Manage Starknet accounts in MetaMask.
sidebar_position: 2
---

# Manage Starknet accounts

## View account information

After a user connects, you can display the account details, such as the account address: 

```javascript
const showAccountInfo = async () => {
  const account = await connectStarknetAccount();
  if (account) {
    document.getElementById('accountAddress').innerText = `Account Address: ${account}`;
  }
};
```

## Switch between accounts

With the `get-starknet` library, you can allow users to switch accounts by re-enabling the wallet. 
MetaMask will prompt the user to select a different account if multiple accounts are available.

```javascript
const switchStarknetAccount = async () => {
  try {
    const starknet = getStarknet();
    await starknet.enable();  // Prompts the user to select an account
    const account = starknet.selectedAddress;
    console.log('Switched to Starknet Account:', account);
    
    return account;
  } catch (error) {
    console.error('Error switching Starknet account:', error);
  }
};
```

## Manage account transactions

You can manage transactions with `get-starknet`:

```javascript

const invokeStarknetContract = async () => {
  try {
    const starknet = getStarknet();
    await starknet.enable();  // Make sure the wallet is enabled

    const contractAddress = '0xYourContractAddress';  // Replace with your contract address
    const entrypoint = 'function_name';  // The function you want to call
    const calldata = [/* your function arguments */];  // Replace with calldata

    const result = await starknet.invoke({
      contractAddress: contractAddress,
      entrypoint: entrypoint,
      calldata: calldata
    });

    console.log('Transaction result:', result);
  } catch (error) {
    console.error('Error invoking contract:', error);
  }
};
```