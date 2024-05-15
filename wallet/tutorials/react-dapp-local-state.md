---
description: Create a single component React dapp with local state using EIP-6963 for Multi Injected Provider Discovery.
toc_max_heading_level: 4
sidebar_position: 1
---

# Create a React dapp with local state

This tutorial walks you through integrating a simple React dapp with MetaMask. The dapp has a single JSX component, which we use for state management locally. There is a [part 2](/wallet/tutorials/react-dapp-global-state) that is more component-oriented and uses global state.

You'll use the [Vite](https://v3.vitejs.dev/guide) build tool with React and TypeScript to create
the dapp.

:::tip Why React?
React is familiar to most web developers and pretty standard within Web3. It makes it easy to work with state management, build components that use a one-way data flow, and re-render those components upon state changes.
:::

:::info Project source code
Source code:  
[mm-dapp-react-6963](https://github.com/MetaMask/mm-dapp-react-6963)
:::

## Prerequisites

- [Node.js](https://nodejs.org/) version 18+
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 9+
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- The [MetaMask extension](https://metamask.io/download) installed
- Basic knowledge of JavaScript and React

## Steps

### 1. Set up the project

Set up a new project using Vite, React, and TypeScript by running the following command:

```bash
npm create vite@latest mm-dapp-react -- --template react-ts
```

Install the node module dependencies:

```bash
cd mm-dapp-react && npm install
```

Launch the development server:

```bash
npm run dev
```

This displays a `localhost` URL in your terminal, which can be CMD + Clicked on to view the dapp in your browser.

:::note
If the development server has been stopped, you can run your project using the `npx vite` or `npm run dev` command.
:::

Open the project in your editor editor.
To start with a blank slate, replace the code in `src/App.tsx` with the following:

```tsx title="App.tsx"
import "./App.css"

const App = () => {
  return (
    <div className="App">
      <h2>Wallets Detected:</h2>
    </div>
  )
}

export default App
```

We will need basic styling for the `App` class (the outermost `div` in our dapp). I also added new styles like `metaMaskError` for a component that we will make last for displaying errors when connecting to Metamask. The `providers` class will create a container `div` allowing us to display many buttons for each provider in a flex column using rows (default for flexbox if not specified). We also set a width on the buttons and icons to ensure they stay uniform regardless of the original size.

Update `src/App.css` to the following:

```css title="App.css"
.App {
  min-width: 100vw;
  min-height: 100vh;
  text-align: center;
}

.metaMaskError {
  height: 36px;
  padding: 16px;
  color: #EFEFEF;
  background-color: transparent;
}

.providers {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  gap: 1em;

  padding: 0.6em 1.2em;
}

.providers button {
  width: 12em;
}

.providers button img {
  width: 2em;
}
```

### 2. Detect Multiple Wallet Providers

We will use the most up-to-date way of detecting wallet providers with EIP-6963.

> [Why EIP-6963](https://eips.ethereum.org/EIPS/eip-6963): The current method where browser extensions inject Ethereum providers (EIP-1193) into `window.ethereum` leads to conflicts when multiple extensions are installed, due to a race condition that favours the last loaded wallet. These issues create an undesirable user experience. EIP-6963 improves interoperability and user experience by introducing a two-way communication protocol via `window` events, enabling discovery and users to connect to their preferred wallet provider through a unique identifier.

The first code we need to update is our environment variable file. 
To use EIP-6963, we will import the types and interfaces needed for EIP-6963 and EIP-1193. 

Update the `src/vite-env.d.ts` to the following:

```tsx title="vite-env.d.ts"
/// <reference types="vite/client" />

// Describes metadata related to a provider according to EIP-6963
interface EIP6963ProviderInfo {
  walletId: string
  uuid: string
  name: string
  icon: string
}

// Represents the structure of an Ethereum provider based on the EIP-1193 standard
interface EIP1193Provider {
  isStatus?: boolean
  host?: string
  path?: string
  sendAsync?: (request: { method: string, params?: Array<unknown> }, callback: (error: Error | null, response: unknown) => void) => void
  send?: (request: { method: string, params?: Array<unknown> }, callback: (error: Error | null, response: unknown) => void) => void
  request: (request: { method: string, params?: Array<unknown> }) => Promise<unknown>
}

// Combines the provider's metadata with an actual provider object
// Creating a complete picture of a wallet provider at a glance and for purposes of working with them
interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo
  provider: EIP1193Provider
}

// This type represents the structure of an event dispatched by a wallet to announce its presence based on EIP-6963
type EIP6963AnnounceProviderEvent = {
  detail:{
    info: EIP6963ProviderInfo
    provider: EIP1193Provider
  }
}

// An error object with optional properties, commonly encountered when handling MetaMask `eth_requestAccounts` errors
interface MMError {
  code?: string
  message?: string
}
```

We'll create a store file to manage the state of detected wallet providers across our application. This file provides a centralized place to store and synchronize the detected wallet providers, ensuring that our application always has access to the latest provider information. Comments within the code explain its various parts (feel free to remove them if you like):

Add the following code to `src/hooks/store.ts`:

```ts title="store.ts"
// Extends WindowEventMap interface, including a custom event: "eip6963:announceProvider"
declare global{
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent
  }
}

// Array that stores detected wallet providers and their details
let providers: EIP6963ProviderDetail[] = []

// Object containing two methods, the store holds the state of detected Ethereum wallet providers,
// It's implemented as an external store, making it available for subscription and synchronization across the dapp
export const store = {
  // Returns the current state of providers
  value: ()=> providers,
  // Subscribes to provider announcements and updates the store accordingly
  // Takes a callback function to be invoked on each store update, returning a function to unsubscribe from the event
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

With the store in place, we will use a custom hook that synchronizes the provider state with the React component. It uses [useSyncExternalStore](https://react.dev/reference/react/useSyncExternalStore) from "react" to subscribe to changes in the provider store and ensure the component re-renders whenever the store updates. 

In our example, the external store refers to the store object defined in store.ts. This store object holds the state of detected Ethereum wallet providers.

Create the following file at `src/hooks/useSyncProviders.ts`

```tsx title="useSyncProviders.ts"
import { useSyncExternalStore } from "react";
import { store } from "./store";

export const useSyncProviders = ()=> useSyncExternalStore(store.subscribe, store.value, store.value)
```

The useSyncExternalStore hook synchronises the external store (store) with a React component.
It takes three arguments:
- A subscription function (store.subscribe in our case) to listen for changes in the external store.
- A function to get the current value of the store (store.value).
- An initial value for the store (also store.value in our case).

Whenever the external store (store) updates, useSyncExternalStore automatically triggers a re-render of the component with the latest state.

:::note
If we did not have the `useSyncExternalStore` hook from React: We could use `useState` to manage the state of providers and `useEffect` to subscribe to changes in the `store`. When our component mounts, we could subscribe to changes in the `store`, set the initial state using the current value from the `store`, and return a cleanup function to `unsubscribe` from the `store` when the component unmounts.
:::

Next, we want to list our providers as buttons that will connect to the EIP-6963-compliant wallet providers that we find.  

Update `src/App.tsx` to the following:

```tsx title="App.tsx"
import { useSyncProviders } from './hooks/useSyncProviders'
import "./App.css"

const App = () => {
  const providers = useSyncProviders()

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: 'eth_requestAccounts'
      }) as string[]

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <h2>Wallets Detected:</h2>
      <div className="providers">
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
    </div>
  )
}

export default App
```

To test our application, let's ensure that we are signed in to our MetaMask wallet and that it is not currently connected to our dapp.  

Then we can run:

```bash
npm run dev
```

<p align="center">
![View of Dapp - Wallets Detected](../assets/react-tutorial-01-final.png)
</p>

At this point, we can connect to the wallets installed in our browser.

## Showing the Connected Wallet Address

Let's indicate when a wallet has been connected to by displaying the user's address on the page.

We want to add two `useState` hooks just above the line where we declare our `providers` and add some code during the `handleConnect` function. We also want to add a `formatAddress` function for displaying a readable user address, along with some basic error catching, formatting, display, and a way for the user to click on and dismiss the error message.

Update everything above the `return` statement in the `App.tsx` file:

```tsx title="App.tsx"
import { useState } from 'react'
import { useSyncProviders } from './hooks/useSyncProviders'
import "./App.css"

const App = () => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [userAccount, setUserAccount] = useState<string>('')
  const providers = useSyncProviders()

  const [errorMessage, setErrorMessage] = useState('')
  const clearError = () => setErrorMessage('')
  const setError = (error: string) => setErrorMessage(error)
  const isError = !!errorMessage

  const formatAddress = (addr: string) => {
    const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2)
    return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`
  }

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: 'eth_requestAccounts'
      }) as string[]

      setSelectedWallet(providerWithInfo)
      setUserAccount(accounts?.[0])
    } catch (error) {
      console.error(error)
      const mmError: MMError = error as MMError
      setError(`Code: ${mmError.code} \nError Message: ${mmError.message}`)
    }
  }
  ...
```

Next, in the JSX wrapped by our return statement of the component, we will add some code below the existing provider buttons:

Update the `div` with the class of `.App` to the following:

```tsx title
    <div className="App">
      <h2>Wallets Detected:</h2>
      <div className="providers">
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
      <h2>{userAccount ? "" : "No"} Wallet Selected</h2>
      {userAccount &&
        <div className="selectedWallet">
          <img src={selectedWallet?.info.icon} alt={selectedWallet?.info.name} />
          <div>{selectedWallet?.info.name}</div>
          <div>({formatAddress(userAccount)})</div>
        </div>
      }
      <div className="mmError" style={isError ? { backgroundColor: 'brown' } : {}}>
        {isError &&
          <div onClick={clearError}>
            <strong>Error:</strong> {errorMessage}
          </div>
        }
      </div>
    </div>
```

Your dapp should look similar to the following:

<p align="center">
![Final View of Dapp](../assets/react-tutorial-01-final.png)
</p>

### Doesn't Look Right?
As we have created `className`'s for each section's parent `div` in our JSX (HTML), if your dapp does not look the same but functions properly, consider checking the naming of your classes and their corresponding CSS.

### Doesn't Function Properly?

Check the code examples against your own. Place `console` statements in key areas like `handleConnect` and `store`. Have you made any personal code changes? Clone the repository and run it. If you ever find inconsistencies or erroneous code, feel free to create an issue on our repo, and we will give you credit for the contribution.

## What's Next?

From here, before iterating anymore, it would be wise to make a list of the additional features and interactions that could be improved. We will cover a few extras when we take our application from mostly working on local state within our `App.tsx` to lifting that state and other functions into global state and abstractions and creating a more component-oriented project.

## Conclusion

This tutorial walked you through creating a single component dapp using Vite, some basics of
detecting wallet providers via EIP-6963 and managing the state in React locally.

We also have added functionality to show the wallet connected to it and a function to format the user's address.

Dapp Source Code: [vite-react-local-tutorial](https://github.com/MetaMask/vite-react-local-tutorial).

As a next step, you can [create a React dapp with global state](react-dapp-global-state.md).  This follow-up tutorial walks you through adding more than one component and working with global state.  You'll use [React's Context API](https://react.dev/reference/react/useContext) to manage the state globally and ensure that any component in your dapp can be aware and conditionally render or display information about your MetaMask wallet.