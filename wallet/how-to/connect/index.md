---
description: Connect to MetaMask via EIP-6963.
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Connect to MetaMask

You can connect your dapp to users' MetaMask wallets by detecting MetaMask in their browsers and
connecting to their accounts.

The best practice for detecting MetaMask or any other browser extension wallet (wallet provider) uses the wallet detection mechanism introduced by [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963). If a user has multiple wallet browser extensions installed, you can detect multiple wallets and connect to each one without conflicts.

:::note
[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) aimed to standardize the wallet interface, but conflicts emerged among implementations, causing race conditions. Wallets injecting providers clashed impacting user experience. This created UX issues for wallet discovery, onboarding, and connection, when multiple wallet extensions are enabled in the same browser. EIP-6963 solves this.

EIP-6963 enables [wallet interoperability](../../concepts/wallet-interoperability.md), and shifts
dapps from relying solely on [`window.ethereum`](detect-metamask.md) for wallet detection.
:::

You can connect to MetaMask [using third-party libraries](#use-third-party-libraries) or
[directly using the Wallet API](#connect-to-metamask-directly).

## Use third-party libraries

You can connect to MetaMask using the following third-party libraries that support EIP-6963:

- [Wagmi 2+](https://wagmi.sh)
- [Web3Modal 3+](https://docs.walletconnect.com/web3modal/about)
- [MIPD Store](https://github.com/wevm/mipd)
- [RainbowKit](https://www.rainbowkit.com)
- [Web3Onboard](https://onboard.blocknative.com)

## Connect to MetaMask with ViteJS

For connecting to MetaMask, we suggest implementing support for EIP-6963 in JavaScript/TypeScript or React and use the
[Wallet API's](../../concepts/wallet-api.md) `eth_requestAccounts` RPC endpoint. 

### Prerequisites

- Review and understand the [EIP-6963 interfaces](../../concepts/wallet-interoperability.md#eip-6963-interfaces).
- [Set up a Vanilla TypeScript or React TypeScript Vite project](https://v3.vitejs.dev/guide/#scaffolding-your-first-vite-project).

#### Create a Vite project with the EIP-6963 interfaces and types

This page will walk you through basic examples using Vite + Vanilla TypScript and Vite + React & TypeScript. Choose the correct following step for you're adventure:

```bash title="Create a Vanilla JavaScript/TypeScript Vite project"
npm create vite@latest vanilla-ts-6963 -- --template vanilla-ts
```

or 

```bash title="Create a React JavaScript/TypeScript Vite project"
npm create vite@latest react-ts-6963 -- --template react-ts
```

### Vite + Vanilla TypeScript Code

<Tabs>
  <TabItem value="vite-env.d.ts">

```typescript title="vite-env.d.ts"
/// <reference types="vite/client" />

interface EIP6963ProviderInfo {
  rdns: string;
  uuid: string;
  name: string;
  icon: string;
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: EIP1193Provider;
}

type EIP6963AnnounceProviderEvent = {
  detail:{
    info: EIP6963ProviderInfo,
    provider: Readonly<EIP1193Provider>
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

In addition to the EIP-6963 interfaces, you need a `EIP1193Provider` interface (defined by [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)), which is the foundational structure for Ethereum wallet providers and represents the essential properties and methods for interacting with MetaMask with JavaScript.

  </TabItem>
  <TabItem value="main.ts">

```typescript title="main.ts"
import './style.css'
import { listProviders } from './providers.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="providerButtons"></div>
  </div>
`

listProviders(document.querySelector<HTMLDivElement>('#providerButtons')!)
```

The `querySelector` finds and returns the first HTML element that matches the CSS selector `app` and set its innerHTML 
to include a basic HMTL structure with an inner div that we can inject a list of buttons each representing any wallet provider we have discovered.

The `listProviders` function is what we will create next and we need to pass an argument which represents the div element
This function will be responsible for connecting to the specific provider using `eth_requestAccounts`
then using appendChild to add each button to the element within the div with the id of `providerButtons`

  </TabItem>
  <TabItem value="providers.ts">

```ts title="providers.ts"
declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent;
  }
}

const connectWithProvider = async (wallet: EIP6963AnnounceProviderEvent['detail']) => {
  try {
    await wallet.provider
      .request({ method: 'eth_requestAccounts' })
  } catch (error) {
    console.error("Failed to connect to provider:", error);
  }
};

export function listProviders(element: HTMLDivElement) {
  window.addEventListener('eip6963:announceProvider',
    (event: EIP6963AnnounceProviderEvent) => {
      const button = document.createElement('button');
    
      button.innerHTML = `
        <img src="${event.detail.info.icon}" alt="${event.detail.info.name}" />
        <div>${event.detail.info.name}</div>`;
    
      button.onclick = () => connectWithProvider(event.detail);
      element.appendChild(button);
    }
  );

  window.dispatchEvent(new Event("eip6963:requestProvider"));
}
```

The `connectWithProvider` function is responsible for connecting to the provider using `eth_requestAccounts`.
The `wallet` object is passed as an argument to the function indicating the detail of its type as the argument type.

In the `listProviders` function we've opted for a simplified approach (over mapping and joining an entire block of HTML).
And we are directly passing the `event.detail` object to the `connectWithProvider` function when a provider is announced.

The `connectWithProvider` is then called when the button is clicked.

We `dispatchEvent` on `window` to notify other parts of the dapp that a provider is being requested, and that any event listeners set up to listen for this event, respond accordingly.

At this point you could run `npm run dev` to test the Vite project in a browser.

  </TabItem>
</Tabs>

### Vite + Vanilla TypeScript Code

<Tabs>
  <TabItem value="App.tsx">

```ts title="App.tsx"
import './App.css'
import { DiscoverWalletProviders } from './components/DiscoverWalletProviders'

function App() {
  return (
    <DiscoverWalletProviders/>
  )
}

export default App
```

In our App.tsx we are simply rendering the DiscoverWalletProviders component that contains the logic for detecting and connecting to wallet providers.

  </TabItem>
  <TabItem value="DiscoverWalletProviders.tsx">

```ts title="/components/DiscoverWalletProviders.tsx"
import { useState } from 'react'
import { useSyncProviders } from '../hooks/useSyncProviders'
import { formatAddress } from '~/utils'

export const DiscoverWalletProviders = () => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [userAccount, setUserAccount] = useState<string>('')
  const providers = useSyncProviders()

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = await providerWithInfo.provider.request({ 
        method: 'eth_requestAccounts' 
      });

      setSelectedWallet(providerWithInfo);
      setUserAccount(accounts?.[0]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2>Wallets Detected:</h2>
      <div>
        {
          providers.length > 0 ? providers?.map((provider: EIP6963ProviderDetail) => (
            <button key={provider.info.uuid} onClick={() => handleConnect(provider)} >
              <img src={provider.info.icon} alt={provider.info.name} />
              <div>{provider.info.name}</div>
            </button>
          )) :
            <div>
              No Announced Wallet Providers
            </div>
        }
      </div>
      <hr />
      <h2>{userAccount ? "" : "No "}Wallet Selected</h2>
      {userAccount &&
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

  - `selectedWallet` is a state variable that holds the users most recent selected wallet.
  - `userAccount` is a state variable that holds the users connected wallet's address.
  - `useSyncProviders` is a custom hook that returns the providers array (wallets extensions installed in the browser).
  
  The `handleConnect` function takes a `providerWithInfo` which is an `EIP6963ProviderDetail` object.
  That object is then used to request the users accounts from the provider using the `eth_requestAccounts` RPC method.
  
  If the request is **successful** we set the `selectedWallet` and `userAccount` local state variables
  If we encounter an **error** we log it using `error.log` a console function.
  
  In the `return` we are mapping over the providers array and rendering a button for each provider detected unless there are no providers in which case we display a message: __"No Announced Wallet Providers"__.
  
  Finally,  if the `userAccount` state variable is not empty we display the selected wallet icon, name, and `selectedWallet` address. When displaying the address we use the `formatAddress` utility function to only show the beginning and end of the address for readability.

  </TabItem>
  <TabItem value="store.ts">

```ts title="hooks/store.ts"
declare global{
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent
  }
}

let providers: EIP6963ProviderDetail[] = []

export const store = {
  value: ()=> providers,
  subscribe: (callback: ()=> void) => {
    function onAnnouncement(event: EIP6963AnnounceProviderEvent){
      if(providers.map(p => p.info.uuid).includes(event.detail.info.uuid)) return
      providers = [...providers, event.detail]
      callback()
    }

    window.addEventListener("eip6963:announceProvider", onAnnouncement);
    window.dispatchEvent(new Event("eip6963:requestProvider"));
    
    return () => window.removeEventListener("eip6963:announceProvider", onAnnouncement)
  }
}
```

We `declare` the `global` window event map to include the `"eip6963:announceProvider"` event as it is not standard.
We need an array of `EIP6963ProviderDetail` objects to store the wallet providers that we will discover.

`store` is an object that contains the `value` and `subscribe` methods that we use with the `useSyncExternalStore` hook as it allows us to subscribe, read updated values from this store, and update components if necessary.

The `value` method returns the providers array (wallets extensions detected installed in the browser)
The `subscribe` method takes a callback function that creates an event listener for the `"eip6963:announceProvider"` event
We listen for the `"eip6963:announceProvider"` event and call the `onAnnouncement` function when the event is triggered.

Next we  dispatch the `"eip6963:requestProvider"` event which triggers the event listener in the MetaMask wallet
Finally we are returning a function that removes the event listener.

  </TabItem>
  <TabItem value="useSyncProviders.ts">

```ts title="hooks/useSyncProviders.ts"
import { useSyncExternalStore } from "react";
import { store } from "./store";

export const useSyncProviders = ()=> useSyncExternalStore(store.subscribe, store.value, store.value)
```

This hook allows us to subscribe, read updated values from, and update components if necessary using the `store` and its subscribe and value methods.

In our case the external store is MetaMask wallet state and events.

The `store` object contains the `value` and `subscribe` methods:
- `value` method returns the providers array (wallets extensions detected installed in the browser)
- `subscribe` method takes a callback function that creates an event listener for the "eip6963:announceProvider" event

  </TabItem>
  <TabItem value="Utility Functions">

```ts title="util/index.ts"
export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
  return balance
}

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex)
  return chainIdNum
}

export const formatAddress = (addr: string) => {
  const upperAfterLastTwo = addr.slice(0,2) + addr.slice(2)
  return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`
}
```

This is a good place to store utility functions that we might need to reuse throughout our dapps.
We are only using the `formatAddress` function, but the others are useful in a dapp so we left them in.

  </TabItem>
</Tabs>

#### Examples

For both Vanilla TypeScript and React + TypeScript examples, feel free to clone the repos and try them out locally.

##### Vanilla TypeScript Repo

[Vanilla TypeScript Repo Link](https://github.com/MetaMask/vite-vanilla-ts-eip-6963)

```bash title="Run the code"
git clone https://github.com/MetaMask/vite-vanilla-ts-eip-6963 && cd vite-vanilla-ts-eip-6963 &&
npm i && npm run dev
```

##### React + TypeScript Repo

[React + TypeScript Repo](https://github.com/MetaMask/vite-react-ts-eip-6963)

```bash title="Run the code"
git clone https://github.com/MetaMask/vite-react-ts-eip-69633 && cd vite-react-ts-eip-6963 &&
npm i && npm run dev
```

### Next steps

After connecting to MetaMask directly, you can:

- [Detect, add, and switch networks](../manage-networks).
- [Send transactions](../send-transactions.md).
- [Sign data](../sign-data/index.md).
- [Display tokens, contract methods, and icons in MetaMask](../display).
