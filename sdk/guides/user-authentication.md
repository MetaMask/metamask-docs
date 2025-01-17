---
description: User Authentication
---

# User Authentication

Connect and manage user wallet sessions in your dApp. This guide covers both **Wagmi** (recommended) and **vanilla JavaScript** approaches.

<div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
    <div style={{ flex: '3' }}>
        <a href="https://metamask-sdk-examples-relink.vercel.app/" target="_blank">
            <img src={require("../_assets/connect.gif").default} alt="Connect to MetaMask" style={{border: '1px solid #DCDCDC', width: '100%'}} />
        </a>
    </div>
    <div style={{ flex: '3' }}>
        <ul>
            <li><strong>Connect users' wallets</strong> to your dApp</li>
            <li><strong>Access user accounts</strong> (addresses)</li>
            <li><strong>Handle connection states</strong> (connected/disconnected)</li>
            <li><strong>Listen for account changes</strong> in real-time</li>
            <li><strong>Manage wallet sessions</strong> (connect/disconnect)</li>
            <li><strong>Support multiple wallet types</strong> (extension, mobile app)</li>
        </ul>
    </div>
</div>


### Using Wagmi

Wagmi provides a simple, hook-based approach for handling wallet connections:

```tsx
import { useAccount, useConnect, useDisconnect } from 'wagmi'

function ConnectWallet() {
  const { address, isConnected } = useAccount()
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

:::info

Check out the [Provider API](/wallet/reference/provider-api) reference for more information.

:::

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