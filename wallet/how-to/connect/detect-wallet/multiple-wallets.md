---
description: Detect MetaMask and other wallets via EIP-6963.
sidebar_position: 2
---

# Detect multiple wallets

[EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) introduces an alternative discovery mechanism
for multiple wallets, shifting from relying solely on [`window.ethereum`](metamask.md) for wallet detection.

If a user has multiple wallet browser extensions installed, your web dapp can support
[wallet interoperability](../../../concepts/wallet-interoperabilty.md) by adding support for
EIP-6963, which enables your dapp to detect and connect to multiple installed wallets.
You can [use third-party libraries](#use-third-party-libraries) or directly
[implement EIP-6963](#implement-eip-6963) in your dapp.

## Use third-party libraries

You can add support for EIP-6963 by using the following third-party libraries:

- [MetaMask SDK](../set-up-sdk/javascript/index.md)

  :::note
  MetaMask SDK does not support connecting to non-MetaMask wallets via EIP-6963.
  If you intend to support discovery of other wallets, we recommend using other methods of adding
  EIP-6963 support such as Wagmi 2+.
  :::

- [Wagmi 2+](https://wagmi.sh)

- [Web3Modal 3+](https://docs.walletconnect.com/web3modal/about)

- [MIPD Store](https://github.com/wevm/mipd)

## Implement EIP-6963

To directly implement support for EIP-6963 in your React dapp:

### 1. Review the EIP-6963 interfaces

Review and understand the interfaces implemented and exposed by wallets that support EIP-6963:

#### Provider info

The [`EIP6963ProviderInfo`](https://eips.ethereum.org/EIPS/eip-6963#provider-info) interface
represents the assets needed to display a wallet:

```typescript
interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}
```

#### Provider detail

The [`EIP6963ProviderDetail`](https://eips.ethereum.org/EIPS/eip-6963#provider-detail) interface
represents additional metadata about the wallet:

```typescript
interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: EIP1193Provider;
}
```

#### Announce and request events

The [`EIP6963AnnounceProviderEvent`](https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events)
interface announces an event dispatched by the wallet:

```typescript
interface EIP6963AnnounceProviderEvent extends CustomEvent {
  type: "eip6963:announceProvider";
  detail: EIP6963ProviderDetail;
}
```

The [`EIP6963RequestProviderEvent`](https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events)
interface requests an event dispatched by a dapp:

```typescript
interface EIP6963RequestProviderEvent extends Event {
  type: "eip6963:requestProvider";
}
```

### 2. Set up a Vite project

Set up a Vite project and update `src/vite-env.d.ts` with the EIP-6963 interfaces:

```typescript title="vite-env.d.ts"
/// <reference types="vite/client" />

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: EIP1193Provider;
}

interface EIP6963ProviderInfo {
  walletId: string;
  uuid: string;
  name: string;
  icon: string;
}

type EIP6963AnnounceProviderEvent = {
  detail:{
    info: EIP6963ProviderInfo,
    provider: EIP1193Provider
  }
}

interface EIP1193Provider {
  isStatus?: boolean;
  host?: string;
  path?: string;
  sendAsync?: (request: { method: string, params?: Array<unknown> }, callback: (error: Error | null, response: unknown) => void) => void
  send?: (request: { method: string, params?: Array<unknown> }, callback: (error: Error | null, response: unknown) => void) => void
  request: (request: { method: string, params?: Array<unknown> }) => Promise<unknown>
}
```

:::note
In addition to the EIP-6963 interfaces, you need the `EIP1193Provider`` interface (defined by
[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)), which is the foundational structure for
Ethereum wallet providers. This structure represents the essential properties and methods for interacting with dapps.
:::

Then, create a `hooks` directory and add the following two files:

```tsx title="useSyncProviders.tsx"
import { useSyncExternalStore } from "react";
import { store } from "./store";

export const useSyncProviders = ()=> useSyncExternalStore(store.subscribe, store.value, store.value)
```

```tsx title="store.tsx"
declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent
  }
}

let providers: EIP6963ProviderDetail[] = []

export const store = {
  value: ()=>providers,
  subscribe: (callback: ()=>void)=>{
    function onAnnouncement(event: EIP6963AnnounceProviderEvent){
      if(providers.map(p => p.info.uuid).includes(event.detail.info.uuid)) return
      providers = [...providers, event.detail]
      callback()
    }
    window.addEventListener("eip6963:announceProvider", onAnnouncement);
    window.dispatchEvent(new Event("eip6963:requestProvider"));
    
    return ()=>window.removeEventListener("eip6963:announceProvider", onAnnouncement)
  }
}
```

### 3. Detect and connect to wallets

Create a component in the `src/components` directory with the following code:

```tsx title="DiscoverWalletProviders.tsx"
import { useState } from 'react'
import { useSyncProviders } from '../hooks/useSyncProviders'
import { formatAddress } from '~/utils'

export const DiscoverWalletProviders = () => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [userAccount, setUserAccount] = useState<string>('')
  const providers = useSyncProviders()
  
  const handleConnect = async(providerWithInfo: EIP6963ProviderDetail)=> {
    const accounts = await providerWithInfo.provider
      .request({method:'eth_requestAccounts'})
      .catch(console.error)
      
    if(accounts?.[0]){
      setSelectedWallet(providerWithInfo)
      setUserAccount(accounts?.[0])
    }
  }
 
  return (
    <>
      <h2>Wallets Detected:</h2>
      <div>
        {
          providers.length > 0 ? providers?.map((provider: EIP6963ProviderDetail)=>(
            <button key={provider.info.uuid} onClick={()=>handleConnect(provider)} >
              <img src={provider.info.icon} alt={provider.info.name} />
              <div>{provider.info.name}</div>
            </button>
          )) :
          <div>
            there are no Announced Providers
          </div>
        }
      </div>
      <hr />
      <h2>{ userAccount ? "" : "No " }Wallet Selected</h2>
      { userAccount &&
        <div>
          <div>
            <img src={selectedWallet.info.icon} alt={selectedWallet.info.name} />
            <div>{selectedWallet.info.name}</div>
            <div>({formatAddress(userAccount)})</div>
          </div>
        </div>
      }
    </>
  )
}
```

This component detects the installed wallets and creates a connection button for each one, which can
be used to call [`eth_requestAccounts`](/wallet/reference/eth_requestaccounts).

Finally, link to this component from `src/App.tsx`:

```tsx title="App.tsx"
import './App.css'
import { DiscoverWalletProviders } from './components/DiscoverWalletProviders'

function App() {

  return (
    <>
      <DiscoverWalletProviders/>
    </>
  )
}

export default App
```

### Example

See the [EIP-6963 Vite React + TypeScript demo](https://github.com/MetaMask/vite-react-ts-eip-6963/tree/main)
for a detailed example and more information.
