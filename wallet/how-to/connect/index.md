---
description: Connect to MetaMask via EIP-6963.
sidebar_position: 1
---

# Connect to MetaMask

You can connect to your users' MetaMask wallets from your dapp by detecting MetaMask in their
browsers and connecting to their accounts.

This page describes how to connect to MetaMask using the alternative wallet detection mechanism
introduced by [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963).
EIP-6963 enables
[wallet interoperability](../../concepts/wallet-interoperabilty.md), and shifts dapps from
relying solely on [`window.ethereum`](detect-metamask.md) for wallet detection.
If a user has multiple wallet browser extensions installed, you can detect multiple wallets and
connect to each one without conflict.

You can connect to MetaMask [using third-party libraries](#use-third-party-libraries) or
[directly using the Wallet API](#connect-to-metamask-directly).

## Use third-party libraries

You can connect to MetaMask using the following third-party libraries that support EIP-6963:

- [Wagmi 2+](https://wagmi.sh)
- [Web3Modal 3+](https://docs.walletconnect.com/web3modal/about)
- [MIPD Store](https://github.com/wevm/mipd)
- [RainbowKit](https://www.rainbowkit.com/)

## Connect to MetaMask directly

To connect to MetaMask directly, implement support for EIP-6963 in your dapp and use the
[Wallet API](../../concepts/wallet-api.md).
The following steps describe how to connect to MetaMask from a React dapp.

### 1. Review the EIP-6963 interfaces

Review and understand the interfaces implemented and exposed by wallets that support EIP-6963:

#### Provider info

The [`EIP6963ProviderInfo`](https://eips.ethereum.org/EIPS/eip-6963#provider-info) interface
represents the assets needed to display a wallet:

- `uuid` - The wallet ID ([UUIDv4](https://www.rfc-editor.org/rfc/rfc4122)).
- `name` - A human-readable name of the wallet.
- `icon` - A [URI](https://www.rfc-editor.org/rfc/rfc3986) pointing to an icon of the wallet.
- `rdns` - The wallet's domain name.

#### Provider detail

The [`EIP6963ProviderDetail`](https://eips.ethereum.org/EIPS/eip-6963#provider-detail) interface
represents additional metadata about the wallet:

- `info` - The [`EIP6963ProviderInfo`](#provider-info).
- `provider` - The `EIP1193Provider` defined by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193).

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

[Set up a Vite project](https://v3.vitejs.dev/guide/#scaffolding-your-first-vite-project) and update
`src/vite-env.d.ts` with the EIP-6963 interfaces:

```typescript title="vite-env.d.ts"
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
    detail: {
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
In addition to the EIP-6963 interfaces, you need the `EIP1193Provider` interface (defined by
[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)), which is the foundational structure for
Ethereum wallet providers.
This interface represents the essential properties and methods for interacting with dapps.
:::

### 3. Add React Hooks

Create a `hooks` directory and add the following two files:

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

### 4. Detect and connect to wallets

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
                        There are no announced providers.
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

This component detects the installed wallets and creates a connect button for each one, which is
used to call the [`eth_requestAccounts`](/wallet/reference/eth_requestaccounts) RPC method of the
Wallet API to [access the user's accounts](access-accounts.md).

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
for a full example.

### Next steps

After connecting to MetaMask directly, you can:

- [Detect, add, and switch networks](../manage-networks).
- [Send transactions](../send-transactions.md).
- [Sign data](../sign-data/index.md).
- [Display tokens, contract methods, and icons in MetaMask](../display).
