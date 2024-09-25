---
description: Troubleshoot common Starknet issues.
sidebar_position: 7
---

# Troubleshoot

Use this guide to resolve common issues when connecting to MetaMask and using the Starknet Snap.

## Connection issus

When using `get-starknet`, the library automatically handles MetaMask detection, connection, and Starknet Snap installation. 
If you're using `wallet_invokeSnaps` directly, you might need to manage these processes manually.

### Detect MetaMask

Use the following function to detect if MetaMask is installed when using `wallet_ìnvokeSnap`:

```typescript
async function detectMetamaskSupport(windowObject: Window & typeof globalThis): Promise<MetaMaskProvider | null> {
    const provider = await waitForMetaMaskProvider(windowObject, { retries: 3 });
    return provider;
}
```

This function uses the `waitForMetaMaskProvider` helper function, which attempts to detect the MetaMask provider up to three times.

### Verify Snap support

After detecting MetaMask, verify if it supports Snaps:

```typescript
const isSupportSnap = async (provider: any): Promise<boolean> => {
    try {
        await provider.request({
            method: 'wallet_getSnaps',
        });
        return true;
    } catch {
        return false;
    }
};
```

### Helper Functions

The following helper functions support the detection process:

#### `isMetaMaskProvider`

This type guard function checks if a given object is a valid MetaMaskProvider:

```typescript
function isMetaMaskProvider(obj: unknown): obj is MetaMaskProvider {
    return (
        obj !== null &&
        typeof obj === 'object' &&
        obj.hasOwnProperty('isMetaMask') &&
        obj.hasOwnProperty('request')
    );
}
```

### `detectMetaMaskProvider`

This function detects a MetaMask provider by listening for the `eip6963:announceProvider` event:

```typescrip
function detectMetaMaskProvider(
    windowObject: Window & typeof globalThis,
    { timeout = 3000 } = {},
): Promise<MetaMaskProvider | null> {
    // ... (function implementation)
}
```

### `waitForMetaMaskProvider`

This function waits for a MetaMask provider to be detected and retrys if necessary:

```typescript
async function waitForMetaMaskProvider(
    windowObject: Window & typeof globalThis,
    { timeout = 1000, retries = 0 } = {},
): Promise<MetaMaskProvider | null> {
    // ... (function implementation)
}
```

## Types and Interfaces

```typescript
interface MetaMaskProvider {
    isMetaMask: boolean;
    request(options: { method: string }): Promise<void>;
}

declare global {
    interface Window {
        ethereum?: MetaMaskProvider;
    }
}
```

## Best Practices

1. Always check for MetaMask installation before attempting to use Snap functionality.
2. Handle cases where MetaMask is not installed or doesn't support Snaps gracefully.
3. Provide clear feedback to users if MetaMask or Snap support is missing.
4. Consider implementing a retry mechanism for provider detection to account for potential timing issues.

By following these steps and using the provided functions, you can reliably detect MetaMask and verify Snap support in your application.


This can be used as follow to check for Metamask Snap Support. This will check for MetaMask presence, and the support of Snap in the installed MetaMask version if any. If there is no MetaMask installed or the version of MetaMask does not support snap 

    ```typescript
    let isMetaMaskInstallRequired = false;
    let provider = null;
    try {
      provider = await detectMetamaskSupport(window);
      // Use the new detection method
    
      if (provider && (await isSupportSnap(provider))) {
        isMetaMaskInstallRequired = provider === null;
      } else {
        isMetaMaskInstallRequired = true;
      }
    } catch (err) {
      isMetaMaskInstallRequired = true;
    }
    ```

In case MetaMask is not installed (e.g. `isMetaMaskInstallRequired=true` we can prompt the user to install MetaMask. 

In case MetaMask is installed, we can prompt the user to install the Snap 

    ```typescript
    provider
      .request({
        method: 'wallet_requestSnaps',
        params: {
          [snapId]: { version: snapVersion },
        },
      })
      .then(() => {
        // The snap has been installed proceed accordingly.
      })
      .catch(() => {
        // The snap has not been installed (user rejected the installation) 
      });
    ```
## Snap permissions

### Snap is not properly approved.

Guide users through the process of approving the Snap in MetaMask. If they deny the connection, provide a retry option.

### Snap ID error

Ensure you're using the correct Snap ID for the StarkNet Snap. Incorrect IDs will result in failed connections.
The Starknet Snap ID is the name of the npm package of the snap: `@consensys/starknet-snap`.


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