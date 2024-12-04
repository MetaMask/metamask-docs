---
description: Network Management
---

# Network Management

Managing networks is essential for dApps that support multiple chains. This guide covers how to detect, switch, and add networks using both Wagmi (recommended) and vanilla JavaScript.

### Using Wagmi

Wagmi provides hooks for all network-related operations, making it easy to handle chain management in React applications.

#### Detect Current Network

```tsx
import { useNetwork } from 'wagmi'

function NetworkStatus() {
  const { chain, chains } = useNetwork()
  
  if (!chain) {
    return <div>Not connected to any network</div>
  }

  return (
    <div>
      <div>Connected to {chain.name}</div>
      <div>Chain ID: {chain.id}</div>
      <div>Supported chains: {chains.map(c => c.name).join(', ')}</div>
    </div>
  )
}
```

#### Switch Networks

```tsx
import { useSwitchNetwork } from 'wagmi'
import { mainnet, optimism, base } from 'wagmi/chains'

function NetworkSwitcher() {
  const { chains, switchNetwork, isLoading } = useSwitchNetwork()
  
  return (
    <div>
      {chains.map((chain) => (
        <button
          key={chain.id}
          onClick={() => switchNetwork?.(chain.id)}
          disabled={isLoading}
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
import { useNetwork } from 'wagmi'

function NetworkWatcher() {
  const { chain } = useNetwork({
    onConnect: ({ chain }) => {
      console.log('Connected to', chain?.name)
    },
    onDisconnect: () => {
      console.log('Disconnected from network')
    }
  })
  
  return null
}
```

### Using Vanilla JavaScript

If you're not using React, here's how to implement network management using vanilla JavaScript:

#### Detect Current Network

```javascript
// Initialize provider
const provider = window.ethereum;

// Get current chain ID
async function getCurrentChain() {
  try {
    const chainId = await provider.request({ 
      method: 'eth_chainId' 
    });
    console.log('Current chain ID:', chainId);
    return chainId;
  } catch (err) {
    console.error('Error getting chain:', err);
  }
}

// Listen for network changes
provider.on('chainChanged', (chainId) => {
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
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: network.chainId }]
    });
  } catch (err) {
    // If the error code is 4902, the network needs to be added
    if (err.code === 4902) {
      try {
        await provider.request({
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

#### Example HTML

```html
<div>
  <div id="networkStatus">Current Network: Loading...</div>
  <button onclick="switchNetwork('mainnet')">Switch to Mainnet</button>
  <button onclick="switchNetwork('optimism')">Switch to Optimism</button>
</div>
```

### Common Networks

Here are some commonly used network configurations:

```javascript
const networks = {
  mainnet: {
    chainId: '0x1',
    name: 'Ethereum Mainnet'
  },
  optimism: {
    chainId: '0xA',
    name: 'Optimism',
    rpcUrls: ['https://mainnet.optimism.io'],
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://optimistic.etherscan.io']
  },
  base: {
    chainId: '0x2105',
    name: 'Base',
    rpcUrls: ['https://mainnet.base.org'],
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://basescan.org']
  },
  arbitrum: {
    chainId: '0xA4B1',
    name: 'Arbitrum One',
    rpcUrls: ['https://arb1.arbitrum.io/rpc'],
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://arbiscan.io']
  }
}
```

### Best Practices

1. **Error Handling**
   - Always handle network switching errors gracefully
   - Provide clear feedback to users when network operations fail
   - Handle cases where networks need to be added first

2. **User Experience**
   - Show loading states during network switches
   - Provide clear network status information
   - Consider warning users before switching networks
   - Consider using an RPC provider that supports the networks you want to support

### Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| 4902 | Network not added | Use `wallet_addEthereumChain` to add the network first |
| 4001 | User rejected request | Show a message asking user to approve the network switch |
| -32002 | Request already pending | Disable network switch button while request is pending |

### Next Steps

- [Transaction Handling](/sdk/guides/transaction-handling)
- [Interact with Contracts](/sdk/guides/interact-with-contracts)
- [Production Readiness](/sdk/guides/production-readiness)
