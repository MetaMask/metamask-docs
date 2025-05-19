---
description: Manage networks with the SDK in your Wagmi or Vanilla JavaScript dapp.
toc_max_heading_level: 2
---

# Manage networks

Manage networks in your [Wagmi](#use-wagmi) or [Vanilla JavaScript](#use-vanilla-javascript) dapp.
With the SDK, you can:

- **Detect the current network** and monitor network changes.
- **Switch between networks** programmatically.
- **Add new networks** to MetaMask.
- **Handle common network-related errors**.

<p align="center">
  <a href="https://metamask-sdk-examples.vercel.app/" target="_blank">
    <img src={require("../_assets/network.gif").default} alt="Switch Networks" width="450px" />
  </a>
</p>

## Use Wagmi

Wagmi provides intuitive hooks for several network-related operations.
The following are examples of using these hooks.

Detect the current network:

```tsx
import { useChainId, useChains } from "wagmi"

function NetworkStatus() {
  const chainId = useChainId()
  const chains = useChains()
  
  const currentChain = chains.find(c => c.id === chainId)
  
  if (!currentChain) {
    return <div>Not connected to any network</div>
  }

  return (
    <div>
      <div>Connected to {currentChain.name}</div>
      <div>Chain ID: {chainId}</div>
      <div>Supported chains: {chains.map(c => c.name).join(", ")}</div>
    </div>
  )
}
```

Switch networks:

```tsx
import { useSwitchChain } from "wagmi"

function NetworkSwitcher() {
  const { chains, switchChain } = useSwitchChain()
  
  return (
    <div>
      {chains.map((chain) => (
        <button
          key={chain.id}
          onClick={() => switchChain({ chainId: chain.id })}
        >
          Switch to {chain.name}
        </button>
      ))}
    </div>
  )
}
```

Handle network changes:

```tsx
import { useChainId } from "wagmi"
import { useEffect } from "react"

function NetworkWatcher() {
  const chainId = useChainId()
  
  useEffect(() => {
    console.log("Chain ID changed:", chainId)
  }, [chainId])
  
  return null
}
```

## Use Vanilla JavaScript

You can implement network management directly in Vanilla JavaScript.

For example, detect the current network:

```javascript
// Get current chain ID
async function getCurrentChain() {
  try {
    const chainId = await ethereum.request({ 
      method: "eth_chainId" 
    });
    console.log("Current chain ID:", chainId);
    return chainId;
  } catch (err) {
    console.error("Error getting chain:", err);
  }
}

// Listen for network changes
ethereum.on("chainChanged", (chainId) => {
  console.log("Network changed to:", chainId);
  // We recommend reloading the page
  window.location.reload();
});
```

Switch networks:

```javascript
// Network configurations
const networks = {
  mainnet: {
    chainId: "0x1",
    name: "Ethereum Mainnet"
  },
  optimism: {
    chainId: "0xA",
    name: "Optimism",
    rpcUrls: ["https://mainnet.optimism.io"],
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18
    },
    blockExplorerUrls: ["https://optimistic.etherscan.io"]
  }
};

async function switchNetwork(networkKey) {
  const network = networks[networkKey];
  
  try {
    // Try to switch to the network
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: network.chainId }]
    });
  } catch (err) {
    // If the error code is 4902, the network needs to be added
    if (err.code === 4902) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: network.chainId,
            chainName: network.name,
            rpcUrls: network.rpcUrls,
            nativeCurrency: network.nativeCurrency,
            blockExplorerUrls: network.blockExplorerUrls
          }]
        });
      } catch (addError) {
        console.error("Error adding network:", addError);
      }
    } else {
      console.error("Error switching network:", err);
    }
  }
}
```

Display the current network and a switch network button in HTML:

```html
<div>
  <div id="networkStatus">Current Network: Loading...</div>
  <button onclick="switchNetwork("mainnet")">Switch to Mainnet</button>
  <button onclick="switchNetwork("optimism")">Switch to Optimism</button>
</div>
```

:::info
See the [Provider API](/wallet/reference/provider-api) reference and [JSON-RPC API](/wallet/reference/json-rpc-methods) reference for more information.
:::

## Best practices

Follow these best practices when managing networks.

#### Error handling

- Implement error handling for network switching operations.
- Provide **clear feedback messages** to users when network operations fail.
- Handle cases where networks need to be **added before switching**.

#### User experience

- Display **loading states** during network switches.
- Show **clear network status information** at all times.
- Consider **warning users** before initiating network switches.
- Use an **RPC provider** that supports your target networks.

## Common errors

The following table lists common network management errors and their codes:

| Error code | Description | Solution |
|------------|-------------|----------|
| `4902`   | Network not added       | Use [`wallet_addEthereumChain`](/wallet/reference/json-rpc-methods/wallet_addethereumchain) to add the network first. |
| `4001`   | User rejected request   | Show a message asking the user to approve the network switch. |
| `-32002` | Request already pending | Disable the switch network button while the request is pending. |

## Next steps

See the following guides to add more functionality to your dapp:

- [Authenticate users](authenticate-users.md)
- [Handle transactions](handle-transactions.md)
- [Interact with smart contracts](interact-with-contracts.md)
