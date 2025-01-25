---
description: Manage networks
---

# Manage networks

This guide covers everything you need to know about managing networks in your dApp using the MetaMask SDK. 
We provide implementations using both **Wagmi** (recommended) and **vanilla JavaScript**.

<div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
    <div style={{ flex: '3' }}>
        <a href="https://metamask-sdk-examples-relink.vercel.app/" target="_blank">
            <img src={require("../_assets/network.gif").default} alt="Switch Networks" style={{border: '1px solid #DCDCDC', width: '100%'}} />
        </a>
    </div>
    <div style={{ flex: '3' }}>
        <ul>
            <li><strong>Detect the current network</strong> and monitor network changes</li>
            <li><strong>Switch between networks</strong> programmatically</li>
            <li><strong>Add new networks</strong> to MetaMask</li>
            <li><strong>Handle common network-related errors</strong></li>
        </ul>
    </div>
</div>

### Using Wagmi

Wagmi provides intuitive hooks for all network-related operations, making chain management straightforward in React applications.

#### Detect Current Network

```tsx
import { useChainId, useChains } from 'wagmi'

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
      <div>Supported chains: {chains.map(c => c.name).join(', ')}</div>
    </div>
  )
}
```

#### Switch Networks

```tsx
import { useSwitchChain } from 'wagmi'

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

#### Handle Network Changes

```tsx
import { useChainId } from 'wagmi'
import { useEffect } from 'react'

function NetworkWatcher() {
  const chainId = useChainId()
  
  useEffect(() => {
    console.log('Chain ID changed:', chainId)
  }, [chainId])
  
  return null
}
```

### Using Vanilla JavaScript

For non-React applications, here's how to implement network management using vanilla JavaScript:

:::info

Check out the [Provider API](/wallet/reference/provider-api) reference and [JSON-RPC API](/wallet/reference/json-rpc-methods) reference for more information.

:::

#### Initialize MetaMask SDK

```javascript
import MetaMaskSDK from '@metamask/sdk';

const MMSDK = new MetaMaskSDK();
const ethereum = MMSDK.getProvider();
```

#### Detect Current Network

```javascript
// Get current chain ID
async function getCurrentChain() {
  try {
    const chainId = await ethereum.request({ 
      method: 'eth_chainId' 
    });
    console.log('Current chain ID:', chainId);
    return chainId;
  } catch (err) {
    console.error('Error getting chain:', err);
  }
}

// Listen for network changes
ethereum.on('chainChanged', (chainId) => {
  console.log('Network changed to:', chainId);
  // We recommend reloading the page
  window.location.reload();
});
```

#### Switch Networks

```javascript
// Network configurations
const networks = {
  mainnet: {
    chainId: '0x1',
    name: 'Ethereum Mainnet'
  },
  optimism: {
    chainId: '0xA',
    name: 'Optimism',
    rpcUrls: ['https://mainnet.optimism.io'],
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18
    },
    blockExplorerUrls: ['https://optimistic.etherscan.io']
  }
};

async function switchNetwork(networkKey) {
  const network = networks[networkKey];
  
  try {
    // Try to switch to the network
    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.chainId }]
    });
  } catch (err) {
    // If the error code is 4902, the network needs to be added
    if (err.code === 4902) {
      try {
        await ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: network.chainId,
            chainName: network.name,
            rpcUrls: network.rpcUrls,
            nativeCurrency: network.nativeCurrency,
            blockExplorerUrls: network.blockExplorerUrls
          }]
        });
      } catch (addError) {
        console.error('Error adding network:', addError);
      }
    } else {
      console.error('Error switching network:', err);
    }
  }
}
```

#### Example HTML Implementation

```html
<div>
  <div id="networkStatus">Current Network: Loading...</div>
  <button onclick="switchNetwork('mainnet')">Switch to Mainnet</button>
  <button onclick="switchNetwork('optimism')">Switch to Optimism</button>
</div>
```



### Best Practices

1. **Error Handling**
   - Implement error handling for network switching operations
   - Provide **clear feedback messages** to users when network operations fail
   - Handle cases where networks need to be **added before switching**

2. **User Experience**
   - Display **loading states** during network switches
   - Show **clear network status information** at all times
   - Consider **warning users** before initiating network switches
   - Use an **RPC provider** that supports your target networks

### Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| **4902** | Network not added | Use `wallet_addEthereumChain` to add the network first |
| **4001** | User rejected request | Show a message asking user to approve the network switch |
| **-32002** | Request already pending | Disable network switch button while request is pending |

### Next Steps

- [User Authentication](/sdk/guides/user-authentication)
- [Transaction Handling](/sdk/guides/transaction-handling)
- [Interact with Contracts](/sdk/guides/interact-with-contracts)