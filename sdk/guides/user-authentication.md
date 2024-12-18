---
description: User Authentication
---

# User Authentication

Connect and manage user wallet sessions in your dApp. This guide covers both **Wagmi** (recommended) and **vanilla JavaScript** approaches.

<div style={{ 
    display: 'flex', 
    flexDirection: 'row', 
    gap: '12px', 
    marginBottom: '24px', 
    overflow: 'hidden', 
    overflowX: 'scroll', 
    WebkitOverflowScrolling: 'touch',
}}>
    <img 
        src={require("../_assets/quickstart-step-1.jpg").default} 
        alt="Connect to MetaMask - Step 1" 
        style={{ flex: '1', maxWidth: '35%', border: '1px solid #DCDCDC' }} 
    />
    <img 
        src={require("../_assets/quickstart-step-2.jpg").default} 
        alt="Connect to MetaMask - Step 2" 
        style={{ flex: '1', maxWidth: '35%', border: '1px solid #DCDCDC' }} 
    />
    <img 
        src={require("../_assets/quickstart-step-3.jpg").default} 
        alt="Connect to MetaMask - Step 3" 
        style={{ flex: '1', maxWidth: '35%', border: '1px solid #DCDCDC' }} 
    />
    <img 
        src={require("../_assets/quickstart-step-4.jpg").default} 
        alt="Connect to MetaMask - Step 4" 
        style={{ flex: '1', maxWidth: '35%', border: '1px solid #DCDCDC' }} 
    />
    <img 
        src={require("../_assets/quickstart-step-9.jpg").default} 
        alt="Connect to MetaMask - Step 9" 
        style={{ flex: '1', maxWidth: '35%', border: '1px solid #DCDCDC' }} 
    />
</div>

With MetaMask SDK, you can:
- **Connect users' wallets** to your dApp
- **Access user accounts** (addresses)
- **Handle connection states** (connected/disconnected)
- **Listen for account changes** in real-time
- **Manage wallet sessions** (connect/disconnect)
- **Support multiple wallet types** (extension, mobile app)


### Using Wagmi

Wagmi provides a simple, hook-based approach for handling wallet connections:

```tsx
import { useAccount, useConnect, useDisconnect } from 'wagmi'

function ConnectWallet() {
  const { address, isConnected, status } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div>
        <div>Connected to {address}</div>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          disabled={isPending}
        >
          {isPending ? 'Connecting...' : `Connect ${connector.name}`}
        </button>
      ))}
    </div>
  )
}
```

#### Handle Account Changes

Wagmi provides a dedicated hook for handling account lifecycle events:

```tsx
import { useAccountEffect } from 'wagmi'

function WatchAccount() {
  useAccountEffect({
    onConnect(data) {
      console.log('Connected!', {
        address: data.address,
        chainId: data.chainId,
        isReconnected: data.isReconnected
      })
    },
    onDisconnect() {
      console.log('Disconnected!')
    }
  })
  
  return <div>Watching for account changes...</div>
}
```

### Using Vanilla JavaScript

If you're not using React, here's how to implement authentication directly:

```javascript
import { MetaMaskSDK } from '@metamask/sdk';

// Initialize SDK
const MMSDK = new MetaMaskSDK();
const provider = MMSDK.getProvider();

// Connect wallet
async function connectWallet() {
  try {
    // Disable button while request is pending
    document.getElementById('connectBtn').disabled = true;
    
    const accounts = await provider.request({ 
      method: 'eth_requestAccounts' 
    });
    
    const account = accounts[0];
    console.log('Connected:', account);
    
    // Update UI
    document.getElementById('status').textContent = `Connected: ${account}`;
    document.getElementById('connectBtn').style.display = 'none';
    document.getElementById('disconnectBtn').style.display = 'block';
  } catch (err) {
    if (err.code === 4001) {
      console.log('User rejected connection');
    } else {
      console.error(err);
    }
  } finally {
    document.getElementById('connectBtn').disabled = false;
  }
}

// Handle account changes
provider.on('accountsChanged', (accounts) => {
  if (accounts.length === 0) {
    // User disconnected
    document.getElementById('status').textContent = 'Not connected';
    document.getElementById('connectBtn').style.display = 'block';
    document.getElementById('disconnectBtn').style.display = 'none';
  } else {
    // Account changed
    document.getElementById('status').textContent = `Connected: ${accounts[0]}`;
  }
});
```

#### HTML

```html
<div>
  <div id="status">Not connected</div>
  <button id="connectBtn" onclick="connectWallet()">Connect MetaMask</button>
  <button id="disconnectBtn" style="display: none" onclick="disconnectWallet()">
    Disconnect
  </button>
</div>
```

### Best Practices

1. **User Interaction**
   - Only trigger connection requests in response to user actions (like button clicks)
   - Never auto-connect on page load
   - Provide clear feedback during connection states

2. **Error Handling**
   - Handle common errors like user rejection (code 4001)
   - Provide clear error messages to users
   - Fallback gracefully when MetaMask is not installed

3. **Account Changes**
   - Always listen for account changes
   - Update your UI when accounts change
   - Handle disconnection events

4. **Chain Support**
   - Listen for network/chain changes
   - Verify the current chain meets your requirements
   - Provide clear messaging when users need to switch networks
   - Learn more here: [Network Management](/sdk/guides/network-management)

### Common Errors

| Error Code | Description | Solution |
|------------|-------------|----------|
| **4001** | User rejected request | Show a message asking user to approve the connection |
| **-32002** | Request already pending | Disable connect button while request is pending |
| **-32603** | Internal JSON-RPC error | Check if MetaMask is properly installed |

### Next Steps

- [Network Management](/sdk/guides/network-management)
- [Transaction Handling](/sdk/guides/transaction-handling)
- [Interact with Contracts](/sdk/guides/interact-with-contracts)