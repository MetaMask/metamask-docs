import { useState, useEffect, createContext, PropsWithChildren, useContext } from 'react'

import detectEthereumProvider from '@metamask/detect-provider'
import { formatBalance } from '../utils'

interface MetaMaskData {
  wallet: typeof initialState
  hasProvider: boolean | null
  error: boolean
  errorMessage: string
  isConnecting: boolean
  connectMetaMask: () => void
  clearError: () => void
}

const initialState = { accounts: [], balance: '', chainId: '' }

const MetaMaskContext = createContext<MetaMaskData>({} as MetaMaskData)

export const MetaMaskContextProvider = ({ children }: PropsWithChildren) => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const [wallet, setWallet] = useState(initialState)

  const [isConnecting, setIsConnecting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
const refreshAccounts = (accounts: any) => {
  if (accounts.length > 0) {
    updateWallet(accounts)
  } else {
    // if length 0, user is disconnected
    setWallet(initialState)
  }
}

const refreshChain = async (chainId: any) => {
  const accounts = await window.ethereum.request(
    { method: 'eth_accounts' }
  )
  refreshAccounts(accounts)
  setWallet((wallet) => ({ ...wallet, chainId }))
}

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))

      if (provider) {
        updateWallet()
        window.ethereum.on('accountsChanged', updateWallet)
        window.ethereum.on('chainChanged', updateWallet)
      }
    }

    getProvider()

    return () => {
      window.ethereum?.removeListener('accountsChanged', updateWallet)
      window.ethereum?.removeListener('chainChanged', updateWallet)
    }
  }, [])

  const updateWallet = async () => {
    const accounts = await window.ethereum.request(
      { method: 'eth_accounts' }
    )

    if (accounts.length === 0) {
      setWallet(initialState)
      return
    }

    const balance = formatBalance(await window.ethereum!.request({
      method: 'eth_getBalance',
      params: [accounts[0], 'latest'],
    }))
    const chainId = await window.ethereum!.request({
      method: 'eth_chainId',
    })
    setWallet({ accounts, balance, chainId })
  }

  const connectMetaMask = async () => {
    setIsConnecting(true)
    await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
      .then((accounts: []) => {
        setErrorMessage('')
        updateWallet(accounts)
      })
      .catch((err: any) => {
        setErrorMessage(err.message)
      })
    setIsConnecting(false)
  }

  const clearError = () => setErrorMessage('')

  return (
    <MetaMaskContext.Provider
      value={{
        wallet,
        hasProvider,
        error: !!errorMessage,
        errorMessage,
        isConnecting,
        connectMetaMask: connectMetaMask,
        clearError
      }}
    >
      {children}
    </MetaMaskContext.Provider>
  )
}

export const useMetaMask = () => {
  const context = useContext(MetaMaskContext)
  if (context === undefined) {
    throw new Error('useMetaMask must be used within a "MetaMaskContextProvider"')
  }
  return context
}