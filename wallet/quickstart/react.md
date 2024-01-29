---
description: Integrate your React dapp with MetaMask.
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# React quickstart

## Connect to the MetaMask browser extension

```typescript title="App.tsx"
import './App.css'
import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

// Detect the MetaMask Ethereum provider

const App = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialState = { accounts: [] } 
  const [wallet, setWallet] = useState(initialState) 

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))
    }
    getProvider()
  }, [])

// Prompt users to connect to MetaMask

  const updateWallet = async (accounts:any) => {
    setWallet({ accounts })
  }  

  const handleConnect = async () => {  
    let accounts = await window.ethereum.request({  method: "eth_requestAccounts" })  
    updateWallet(accounts)   
  }  

  return (
    <div className="App">
      <div>Injected Provider {hasProvider ? 'DOES' : 'DOES NOT'} Exist</div>
      { hasProvider && 
        <button onClick={handleConnect}>Connect MetaMask</button>
      }
      { wallet.accounts.length > 0 &&  
        <div>Wallet Accounts: { wallet.accounts[0] }</div>
      }
    </div>
  )
}
export default App
```

```typescript title="vite-env.d.ts"
interface Window {
  ethereum: any;
}
```

## Connect to multiple wallets

## Connect to the MetaMask extension and MetaMask Mobile

```typescript title="index.tsx"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MetaMaskProvider } from '@metamask/sdk-react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Initialize the SDK

root.render(
  <React.StrictMode>
    <MetaMaskProvider debug={false} sdkOptions={{
      dappMetadata: {
        name: "Example React Dapp",
        url: window.location.host,
      }
    }}>
      <App />
    </MetaMaskProvider>
  </React.StrictMode>
);
```

```typescript title="App.tsx"
import { useSDK } from '@metamask/sdk-react';
import React, { useState } from 'react';

// Prompt users to connect to MetaMask

export const App = () => {
  const [account, setAccount] = useState<string>();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch(err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <div className="App">
      <button style={{ padding: 10, margin: 10 }} onClick={connect}>
        Connect
      </button>
      {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${chainId}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )}
    </div>
  );
};
```
