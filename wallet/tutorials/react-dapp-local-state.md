---
description: Create a single component React dapp with local state.
toc_max_heading_level: 4
sidebar_position: 1
---

# Create a React dapp with local state

This tutorial walks you through integrating a simple React dapp with MetaMask.
The dapp has a single component, so only requires managing local state.
You'll use the [Vite](https://v3.vitejs.dev/guide) build tool with React and TypeScript to create
the dapp.

This tutorial builds up your knowledge of working with MetaMask incrementally; this means you won't
implement the best solution at first, but you'll experiment with the MetaMask API and continually
work towards better solutions.

:::tip Why React?
React is familiar to most web developers, and it makes it easy to work with state management and
build with components that need updating.
:::

:::info Project source code
You can see the source code for the
[starting point](https://github.com/MetaMask/react-dapp-tutorial/tree/local-state-start) and
[final state](https://github.com/MetaMask/react-dapp-tutorial/tree/local-state-final) of this dapp.
:::

## Prerequisites

- [Node.js](https://nodejs.org/) version 18+
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 9+
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- The [MetaMask extension](https://metamask.io/download) installed
- Basic knowledge of JavaScript and React

## Steps

### 1. Set up the project

Set up a new project using Vite, React, and TypeScript, by running the following command:

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

This displays a `localhost` URL on your terminal. Copy this URL into your browser and open it.

:::note
You can use the `npx vite` or `npm run dev` command to run your project at any time if the
development server has been stopped.
:::

Open the project in your editor editor.
To start with a blank slate, replace the code in `src/App.tsx` with the following:

```tsx title="App.tsx"
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <button>Button for Discovered Wallets</button>
    </div>
  );
};

export default App;
```

You'll need to get around type-checking by defining the `window.ethereum` object as `any`.
Update `src/vite-env.d.ts` to the following:

```tsx title="vite-env.d.ts"
/// <reference types="vite/client" />

interface Window {
  ethereum: any;
}
```

Also, update `src/App.css` to the following:

```css title="App.css"
.App {
  display: flex;
  flex-direction: column;
  place-items: center;
  min-width: 100vw;
  min-height: 100vh;
}
button {
  margin-top: 0.5em;
}
```

At this point, you have a working React app with some basic styling and a button that you'll use to
connect to MetaMask.

![Initial App State with Button](../assets/tutorials/react-dapp/pt1-01.png)

### 2. Discover Wallet Providers (Browser Extensions)

Currently we do not recommend the Vanilla JS detection of injected provider or the legacy MetaMask Detect provider, but they are working solutions and I will cover them quickly or you can choose to skip this section as we will not be using it in the dapp that we are building.

[Skip to Modern EIP-6963" Multi Injected Provider Discovery](#3-using-eip-6963)

### 3. Detect Multiple Wallet Providers

We will opt to use the most up to date way of detecting wallet providers with EIP-6963.

> [Why EIP-6963](https://eips.ethereum.org/EIPS/eip-6963): The current method where browser extensions inject Ethereum providers (EIP-1193) into `window.ethereum` leads to conflicts when multiple extensions are installed, due to a race condition that favors the last loaded wallet. This creates an undesirable user experience. EIP-6963 improves interoperability and user experience by introducing a two-way communication protocol via `window` events, enabling discovery and users ability to connect to their preferred wallet provider through a unique identifier.

The first code we need to update is our environment variable file. 
For the purpose of using EIP-6963 we will import the the types and interfaces needed that are outlined in EIP-6963 and EIP-1193. 

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
    info: EIP6963ProviderInfo,
    provider: EIP1193Provider
  }
}
```

To manage the state of detected wallet providers across our application, we'll create a store file. This file provides a centralized place to store and synchronize the detected wallet providers, ensuring that our application always has access to the latest provider information. Comments within the code explain its various parts (feel free to remove them if you like):

Add the following code to `src/hooks/store.ts`:

```ts title="store.ts"
// This part extends the WindowEventMap interface to include a custom event named "eip6963:announceProvider".
declare global{
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent
  }
}

// An array that stores detected wallet providers along with their details.
let providers: EIP6963ProviderDetail[] = []

// An object containing two methods, the store holds the state of detected Ethereum wallet providers. 
// It's implemented as an external store, making it available for subscription and synchronization across the app. 
export const store = {
  // A function that returns the current state of providers.
  value: ()=> providers,
  // A function that subscribes to provider announcements and updates the store accordingly. 
  // It takes a callback function to be invoked on each store update and returns a function to unsubscribe from the event.
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

The useSyncExternalStore hook is used to synchronize the external store (store) with a React component.
It takes three arguments:
- A subscription function (store.subscribe in our case) to listen for changes in the external store.
- A function to get the current value of the store (store.value).
- An initial value for the store (also store.value in our case).

Whenever the external store (store) updates, useSyncExternalStore automatically triggers a re-render of the component with the latest state.

Next, we want to list out our providers as buttons that will connect to the EIP-6963 compliant wallet providers that we find.
Update `src/App.tsx` to the following:

```tsx title="App.tsx"
import { useSyncProviders } from './hooks/useSyncProviders'

const App = () => {
  const providers = useSyncProviders()

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      await providerWithInfo.provider.request({ 
        method: 'eth_requestAccounts' 
      });

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
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
    </div>
  )
}

export default App
```

Let's add some CSS to clean things up. Update the file at `src/index.css`

```css title="index.css"
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}

.App {
  margin: 1em;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

hr {
  margin-top: 2em;
  height: 1px;
}

button {
  min-width: 12em;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;

  align-items: center;
  border-radius: 0.5em;
  padding: 0.6em 1.2em;
  margin-bottom: 0.5em;

  font-family: inherit;
  font-size: 1em;
  font-weight: 500;

  cursor: pointer;

  transition: border-color 0.25s;
  border: 1px solid transparent;
  background-color: #1a1a1a;
}
button > img {
  width: 1.5em;
  height: 1.5em;
  margin-right: 1em;
}
button:hover {
  border-color: #75079d;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
button:first-child {
  margin-top: 0.5em;
}
button:last-child {
  margin-bottom: 0;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```

To test our application, let's ensure that we are signed into our MetaMask wallet and that it is not currently connected to our dapp.
Then we can run:

```bash
npm run dev
```

## Conclusion

This tutorial walked you through creating a single component dapp using Vite, some basics of
detecting wallet providers via EIP-6963, and managing the state in React locally.

You can see the [UPDATE TBD](https://github.com/MetaMask/react-dapp-tutorial/tree/local-state-final)
for the final state of this dapp tutorial.

As a next step, you can [create a React dapp with global state](react-dapp-global-state.md).
This follow-up tutorial walks you through adding more than one component and working with global state.
You'll use [React's Context API](https://react.dev/reference/react/useContext) to manage the state
globally and ensure that any component in your dapp can be aware and conditionally render or display
information about your MetaMask wallet.
