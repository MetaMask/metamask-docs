---
description: Troubleshoot common Starknet issues.
sidebar_position: 6
---

# Troubleshoot

## 1. Connection issues

### Wallet connection fails or doesn't respond.

Ensure that MetaMask is installed and the StarkNet Snap is properly set up. You can check if the Snap is available using:

```javascript
const availableWallets = getAvailableWallets();
if (!availableWallets.some(wallet => wallet.type === 'snap')) {
  alert('Please install StarkNet Snap in MetaMask to proceed.');
}
```

### The `connect()` function returns null or undefined.

Verify that the Snap is installed and MetaMask has granted permission for the dapp to connect. Always include error handling in the connect method to manage issues:

```javascript
try {
  const res = await connect();
  if (!res) {
    console.log('No wallet connected');
  }
} catch (error) {
  console.error('Error connecting to wallet:', error);
}
```

## 2. Snap permissions

### Snap is not properly approved.

Guide users through the process of approving the Snap in MetaMask. If they deny the connection, provide a retry option.

### Stale wallet data

If the wallet address or account information doesn't update after reconnection, always listen for account or network changes and handle them appropriately. Use event listeners:

```javascript
ethereum.on('accountsChanged', (accounts) => {
  // Handle account change
});
ethereum.on('chainChanged', (chainId) => {
  // Handle network change
});
```

### Snap ID error

Ensure you're using the correct Snap ID for the StarkNet Snap. Incorrect IDs will result in failed connections.


## Best practices

### 1. Graceful error handling

Provide clear feedback to the user, such as offering a retry option or showing a message that StarkNet Snap needs to be installed.

```javascript
const handleConnect = async () => {
  try {
    const res = await connect();
    if (!res) {
      console.log('No wallet connected');
    }
  } catch (error) {
    console.error('Failed to connect to wallet:', error);
    alert('An error occurred while connecting to the wallet. Please try again.');
  }
};
```

### 2. Detect and Handle account changes

Ensure that you detect when the user switches accounts or changes networks. MetaMask emits events like `accountsChanged` and `chainChanged` that you can listen for and handle appropriately.

```javascript
window.ethereum.on('accountsChanged', (accounts) => {
  console.log('Accounts changed:', accounts);
  // Update the UI or re-fetch account data
});

window.ethereum.on('chainChanged', (chainId) => {
  console.log('Network changed:', chainId);
  // Handle network change
});
```

### 3. Support for multiple wallets

`get-starknet` supports connecting to multiple wallets. Provide users with options to select the wallet they want to connect, if applicable. You can specify wallet options when calling connect().

```javascript
const handleConnect = async () => {
  const options = {
    modalMode: 'alwaysAsk',  // Force the wallet selection modal to appear
  };
  const res = await connect(options);
  console.log('Connected to wallet:', res?.name);
};
```