---
description: Integrate your React dapp with MetaMask.
sidebar_position: 2
---

# React quickstart

This page provides code samples to quickly connect to your users' MetaMask accounts from a
React dapp.
You can:

- [Connect to the MetaMask browser extension](#connect-to-the-metamask-browser-extension)
  directly using the MetaMask APIs.
- [Connect to the MetaMask extension and MetaMask mobile](#connect-to-the-metamask-extension-and-metamask-mobile)
  using the SDK.

## Connect to the MetaMask browser extension

Connect to the MetaMask browser extension directly using the
[MetaMask Ethereum provider API](../concepts/apis.md).
This example uses the [Vite](https://v3.vitejs.dev/guide/) build tool with React and Typescript, so
you can get started quickly with an optimized dapp.

1. Follow Step 1 in the [React dapp tutorial](../tutorials/react-dapp-local-state.md) to set up a
    Vite project.

2. Add the following code to your project file:

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

## Connect to the MetaMask extension and MetaMask Mobile

Connect to the MetaMask browser extension and MetaMask Mobile using [MetaMask SDK](../concepts/sdk/index.md).
The SDK automatically detects MetaMask in the user's browsers, and enables them to seamlessly
connect to the extension and the mobile wallet.

:::note
The SDK uses the [Ethereum provider](../concepts/apis.md#ethereum-provider-api), so you can use the
SDK as a wrapper around an existing JavaScript dapp and call
[MetaMask Ethereum provider API methods](../reference/provider-api.md) from your dapp as normal.
:::

1. Install the [MetaMask React SDK](../how-to/use-sdk/javascript/react/index.md) in your project directory:

    ```bash
    npm i @metamask/sdk-react
    ```

2. Wrap your root component in a `MetaMaskProvider`:

    ```typescript title="index.tsx"
    import React from 'react';
    import ReactDOM from 'react-dom/client';
    import App from './App';
    import { MetaMaskProvider } from '@metamask/sdk-react';
    
    const root = ReactDOM.createRoot(
      document.getElementById('root') as HTMLElement
    );
    
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

3. To use the SDK, use the `useSDK` hook in your React components:

    ```typescript title="App.tsx"
    import { useSDK } from '@metamask/sdk-react';
    import React, { useState } from 'react';
    
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
