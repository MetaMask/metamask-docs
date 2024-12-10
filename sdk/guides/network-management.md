---
description: Network Management
---

# Network Management

This guide covers everything you need to know about managing networks in your dApp using the MetaMask SDK. You'll learn how to:
- **Detect the current network** and monitor network changes
- **Switch between networks** programmatically
- **Add new networks** to MetaMask
- Handle common network-related errors

We provide implementations using both **Wagmi** (recommended) and **vanilla JavaScript**.

### Using Wagmi

Wagmi provides intuitive hooks for all network-related operations, making chain management straightforward in React applications.

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

For non-React applications, here's how to implement network management using vanilla JavaScript:

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