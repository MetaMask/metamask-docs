---
description: Manage networks with the SDK in your JavaScript dapp.
keywords: [SDK, JavaScript, detect, switch, add, network, networks, dapp]
toc_max_heading_level: 2
---

# Manage networks

Manage networks in your JavaScript dapp.
With the SDK, you can:

- **Detect the current network** and monitor network changes.
- **Switch between networks** programmatically.
- **Add new networks** to MetaMask.
- **Handle common network-related errors**.

<p align="center">
  <a href="https://metamask-sdk-examples.vercel.app/" target="_blank">
    <img src={require("../../_assets/network.gif").default} alt="Switch Networks" width="450px" />
  </a>
</p>

## Detect and switch networks

You can implement network management directly in JavaScript.

The following example detects the current network using the
[`eth_chainId`](../../reference/json-rpc-api/index.md) RPC method and
[`chainChanged`](../../reference/provider-api.md#chainchanged) provider event:

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

The following example switches networks using the
[`wallet_switchEthereumChain`](../../reference/json-rpc-api/index.md)
and [`wallet_addEthereumChain`](../../reference/json-rpc-api/index.md)
RPC methods:

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
| `4902`   | Network not added       | Use [`wallet_addEthereumChain`](../../reference/json-rpc-api/index.md) to add the network first. |
| `4001`   | User rejected request   | Show a message asking the user to approve the network switch. |
| `-32002` | Request already pending | Disable the switch network button while the request is pending. |

## Next steps

See the following guides to add more functionality to your dapp:

- [Manage user accounts](manage-user-accounts.md)
- [Send transactions](send-transactions/index.md)
- [Interact with smart contracts](interact-with-contracts.md)
