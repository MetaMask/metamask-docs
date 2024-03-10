---
description: Integrate your React dapp with MetaMask.
sidebar_position: 2
---

# React quickstart

This page provides a code sample to quickly connect to your users' MetaMask accounts from a
React dapp.

Connect to the MetaMask browser extension directly using the [Wallet API](../concepts/wallet-api.md).
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
