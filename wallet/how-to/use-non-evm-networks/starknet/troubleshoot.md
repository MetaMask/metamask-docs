---
description: Troubleshoot common Starknet issues.
sidebar_position: 7
---

# Troubleshoot

<!--For the dapp, the primary action to initiate interacting with Starknet accounts is to connect to the Snap, just like a dapp connects with MetaMask to interact with Ethereum accounts. Whether the user has the Starknet Snap installed already is not important. If the user needs to install the Snap, they will be prompted to do so.
Despite this, we do need to explain that the user can reject the prompt to add the Snap to MetaMask and document what to expect (the response that the dapp will receive if the user rejects the request) and encourage the dapp to do something in that instance, like display a message to the user that they need to add the Snap to MetaMask in order to proceed.
Also, in terms of working with Starknet specifically, we may need to explain that a user will need to take some steps to set up a Starknet account before they can actually use it with the dapp, so the dapp should thoughtfully design that onboarding flow. Whether the user needs to add the Snap (and thus they will be completely new to Starknet) or they already have it but their account is not funded or deployed, the dapp should handle those scenarios.-->


When using get-starknet MetaMask detection, connection and starknet snap installation is handled automatically. 

In case you are using `invokeSnaps` directly then this needs to be handled manually. 

You need to check first that MetaMask is installed : 


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
    
    /**
     * Detects if MetaMask is installed and supports Snaps by invoking the 'wallet_getSnaps' method.
     * 
     * @param {any} provider - The provider object, typically obtained from MetaMask.
     * @returns {Promise<boolean>} - A promise that resolves to `true` if the provider supports Snaps, and `false` otherwise.
     */
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
    
    /**
     * Type guard function to check if a given object is a valid MetaMaskProvider.
     * 
     * @param {unknown} obj - The object to check.
     * @returns {boolean} - `true` if the object is a MetaMask provider, `false` otherwise.
     */
    function isMetaMaskProvider(obj: unknown): obj is MetaMaskProvider {
      return (
        obj !== null &&
        typeof obj === 'object' &&
        obj.hasOwnProperty('isMetaMask') &&
        obj.hasOwnProperty('request')
      );
    }
    
    /**
     * Detects a MetaMask provider by listening for the 'eip6963:announceProvider' event.
     * 
     * @param {Window & typeof globalThis} windowObject - The window object used to access global browser features.
     * @param {Object} options - Optional parameters, including a timeout for the detection process.
     * @param {number} [options.timeout=3000] - The time to wait (in milliseconds) for the provider to announce itself.
     * @returns {Promise<MetaMaskProvider | null>} - A promise that resolves to a MetaMaskProvider object if detected, or `null` if no provider is found.
     */
    function detectMetaMaskProvider(
      windowObject: Window & typeof globalThis,
      { timeout = 3000 } = {},
    ): Promise<MetaMaskProvider | null> {
      let handled = false;
      return new Promise<MetaMaskProvider | null>((resolve) => {
        const handleEIP6963Provider = (event: CustomEvent) => {
          const { info, provider } = event.detail;
          if (
            ['io.metamask', 'io.metamask.flask'].includes(info.rdns) &&
            isMetaMaskProvider(provider)
          ) {
            resolve(provider);
            handled = true;
          }
        };
    
        if (typeof windowObject.addEventListener === 'function') {
          windowObject.addEventListener(
            'eip6963:announceProvider',
            (event: Event) => {
              handleEIP6963Provider(event as CustomEvent);
            },
          );
        }
    
        setTimeout(() => {
          if (!handled) {
            resolve(null);
          }
        }, timeout);
    
        if (typeof windowObject.dispatchEvent === 'function') {
          windowObject.dispatchEvent(new Event('eip6963:requestProvider'));
        }
      });
    }
    
    /**
     * Waits for a MetaMask provider to be detected, retrying if necessary.
     * 
     * @param {Window & typeof globalThis} windowObject - The window object used to access global browser features.
     * @param {Object} options - Optional parameters, including timeout and retries.
     * @param {number} [options.timeout=1000] - The time (in milliseconds) to wait for each detection attempt.
     * @param {number} [options.retries=0] - The number of retry attempts if no provider is detected.
     * @returns {Promise<MetaMaskProvider | null>} - A promise that resolves to a MetaMaskProvider object if detected, or `null` if no provider is found.
     */
    async function waitForMetaMaskProvider(
      windowObject: Window & typeof globalThis,
      { timeout = 1000, retries = 0 } = {},
    ): Promise<MetaMaskProvider | null> {
      return detectMetaMaskProvider(windowObject, { timeout })
        .catch(function () {
          return null;
        })
        .then(function (provider) {
          if (provider || retries === 0) {
            return provider;
          }
          return waitForMetaMaskProvider(windowObject, {
            timeout,
            retries: retries - 1,
          });
        });
    }
    
    /**
     * Detects if MetaMask is installed by calling the waitForMetaMaskProvider function with retries.
     * 
     * @param {Window & typeof globalThis} windowObject - The window object used to access global browser features.
     * @returns {Promise<MetaMaskProvider | null>} - A promise that resolves to a MetaMaskProvider object if MetaMask is detected, or `null` otherwise.
     */
    async function detectMetamaskSupport(windowObject: Window & typeof globalThis): Promise<MetaMaskProvider | null> {
      const provider = await waitForMetaMaskProvider(windowObject, { retries: 3 });
      return provider;
    }
    
    ```


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
## 2. Snap permissions

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