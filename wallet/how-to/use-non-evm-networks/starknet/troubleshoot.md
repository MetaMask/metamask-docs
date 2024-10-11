---
description: Troubleshoot common Starknet issues.
sidebar_position: 7
toc_max_heading_level: 4
---

# Troubleshoot

This guide addresses issues that might occur when connecting your dapp to the Starknet Snap in MetaMask.

## Connection issues

When using `get-starknet`, the library automatically handles detecting and connecting to MetaMask,
and adding the Starknet Snap.
If you're using `wallet_invokeSnap` directly, you might need to manage these processes manually.

### Detect MetaMask

When using `wallet_invokeSnap`, use the following function to detect if MetaMask is installed:

```typescript
async function detectMetamaskSupport(windowObject: Window & typeof globalThis): Promise<MetaMaskProvider | null> {
  const provider = await waitForMetaMaskProvider(windowObject, { retries: 3 });
  return provider;
}
```

This function uses the [`waitForMetaMaskProvider`](#waitformetamaskprovider) helper function, which
attempts to detect the MetaMask provider three times.

In the event MetaMask is not installed, for example `isMetaMaskInstallRequired=true`, you can prompt
the user to install MetaMask using the following:

```typescript
function checkAndPromptForMetaMask() {
  const isMetaMaskInstalled = typeof getEip6963Provider !== "undefined" && getEip6963Provider.isMetaMask;
  
  if (!isMetaMaskInstalled) {
    console.log("MetaMask is not installed. Prompting user to install.");
    
    // Update UI to inform the user.
    const messageElement = document.getElementById("metamask-message") || document.createElement("div");
    messageElement.id = "metamask-message";
    messageElement.innerHTML = `
      <p>MetaMask is required to use this dapp. Please install MetaMask to continue.</p>
      <button id="install-metamask">Install MetaMask</button>
    `;
    document.body.appendChild(messageElement);

    // Add click event to the install button.
    document.getElementById("install-metamask").addEventListener("click", () => {
      window.open("https://metamask.io/download.html", "_blank");
    });
  } else {
    console.log("MetaMask is installed. Proceeding with this dapp.");
  }
}

// Call this function when your dapp initializes.
checkAndPromptForMetaMask();
```

### Verify Snap support

After detecting MetaMask, verify if it supports Snaps:

```typescript
const isSupportSnap = async (provider: any): Promise<boolean> => {
  try {
    await provider.request({
      method: "wallet_getSnaps",
    });
    return true;
  } catch {
    return false;
  }
};
```

If MetaMask is installed but the Snap is not, use the following code to prompt the user to install the Snap:

```typescript
async function installSnap(provider: MetaMaskProvider, snapId: string, snapVersion: string) {
  try {
    await provider.request({
      method: "wallet_requestSnaps",
      params: {
        [snapId]: { version: snapVersion },
      },
    });
    console.log("Snap installed successfully");
  } catch (error) {
    console.error("Failed to install Snap:", error);
    // Handle the error (for example, user rejected installation).
  }
}
```

### Handle user rejection

Users can reject the prompt to add the Snap, resulting in a 4001 error. 
Provide an error message to ensure users have clear guidance on next steps.

For example:

```javascript
function handleConnectionError(error) {
  if (error.code === 4001) {
    console.log("User rejected the request to add the Starknet Snap");
    displayUserMessage("To proceed, you need to add the Starknet Snap to MetaMask. Please try connecting again.");
  } else {
    console.error("An error occurred while connecting to Starknet Snap:", error);
    displayUserMessage("An error occurred. Please ensure MetaMask is installed and try again.");
  }
}

function displayUserMessage(message) {
  // Update your UI to display the message to the user.
  // For example:
  // document.getElementById("status-message").textContent = message;
}
```