---
title: Dapp Tutorial
description: Beyond getting started, working with the MetaMask API and SDK to connect to MetaMask from a dApp.
---

## Table of Contents

- [Pre Requisites](#pre-requisites)
- [Why Vite and React](#why-vite-and-react)
- [Scaffold a Vite React Project](#scaffold-vite)
- [Detecting MetaMask](#detecting-metamask)
- [Connecting to MetaMask](#connecting-to-metamask)
- [Manage More MetaMask State Locally](#manage-more-metamask-state-locally)
  - [Watch User Balance](#watch-user-balance)
  - [Watch User Chain](#watch-user-chain)
  - [Single Component Conclusion](#single-component-conclusion)
<!-- - [Connect MetaMask via SDK](#Connect-metamask-via-SDK) -->
- [Manage MetaMask State Globally](#manage-metamask-state-globally)

## Pre Requisites

Ensure you have the following before starting this tutorial.

- Node Version 18+
- NPM Version 9+
- Code Editor
- [MetaMask Extension](https://metamask.io/download)
- Basic Knowledge of JavaScript and React

<!-- You can use MetaMask Extension exclusively for this tutorial, however; the MetaMask SDK enables the ability to easily connect to Extension or Mobile, having MetaMask Mobile installed on iOS or Android is recommended for Part 2. -->

## Why Vite and React

[Vite.js](https://v3.vitejs.dev/guide) is a build tool for modern web projects. You can create VanillaJS, Vue, React, Preact, Lit, and Svelte projects using JavaScript or TypeScript.

This tutorial uses Vite + React (with TypeScript). We will step up our use of TypeScript only as we need to.

We will build up our knowledge of working with MetaMask incrementally, this may mean we don't go with the best solution right out of the gate, but the idea is to experiment with the MetaMask API and continually work towards better solutions.

Using React makes working with state management and building with components that need to update easy and allows us to rapidly develop an application using a library and concepts that are familiar to most web developers.

## Scaffold Vite

Scaffold a new project with [Vite.js](https://v3.vitejs.dev/guide), React & TypeScript:

```bash
npm create vite@latest mm-sdk-react -- --template react-ts
```

Install our dependencies:

```bash
cd mm-sdk-react && npm install
```

Open the project in your code editor of choice. We will start by resetting the `App.tsx` page to give us a blank slate.

Update `App.tsx` to:

```ts
import './App.css'

const App = () => {

  return (
    <div className="App">
      
    </div>
  )
}

export default App
```

We want to define the `window.ethereum` object as `any` to get around type checking. This is ok for the purpose of this demo, but there are other approaches that are beyond the scope of this tutorial.

In the `src/vite-env.d.ts` file, update to:

```ts
/// <reference types="vite/client" />

interface Window {
  ethereum: any;
}
```

Also, for some basic styling purposes, let's change the `src/App.css` to:

```css
.App {
  margin: 1em;
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

## Detecting MetaMask

Detecting the injected provider that browser extension wallets use is straight forward. Let's write some code in our component that will let us conditionally render a "Connect MetaMask" button.

Update the `src/App.tsx` as follows:

```ts
import './App.css'
let injectedProvider = false

if (typeof window.ethereum !== 'undefined') {
  injectedProvider = true
  console.log(window.ethereum)
}

const isMetaMask = injectedProvider ? window.ethereum.isMetaMask : false

const App = () => {

  return (
    <div className="App">
      <div>Injected Provider { injectedProvider ? 'DOES' : 'DOES NOT'} Exist</div>
      { isMetaMask && 
        <button>Connect MetaMask</button>
      }
    </div>
  )
}

export default App
```

If we have MetaMask installed, we manage our browser extensions and disable MetaMask refresh our application and then enable it again and refresh and we should see that our application is properly detecting the presence of our MetaMask wallet

The approach above is often what developers will try when first tasked in detecting an injected provider (Wallet Extension), but the MetaMask team provides a library called [@metamask/detect-provider](https://github.com/MetaMask/detect-provider) with a module to detect the MetaMask Ethereum provider or any provider injected at `window.ethereum` on any platform or browser. Let's install it and change our code to implement it instead.

Install the dependency:

```bash
npm install @metamask/detect-provider
```

With this, we can update our `src/App.tsx` to:

```ts
import './App.css'
import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

const App = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider)) // transform provider to true or false
    }

    getProvider()
  }, [])

  return (
    <div className="App">
      <div>Injected Provider {hasProvider ? 'DOES' : 'DOES NOT'} Exist</div>
      { hasProvider &&
        <button>Connect MetaMask</button>
      }
    </div>
  )
}

export default App
```

We are creating a piece of local state that be of type boolean or of null value, initialized with a null value.  

Next we create a `useEffect` with zero dependencies (it will only run once in our component lifecycle). React’s `useEffect` hook allows components to run code when a component is mounted or when some property's state changes. This hook also allows cleaning up when the component is unmounted. If you explicitly declare no dependencies by passing in an empty array `[]` like we have done on line 15, `useEffect` will only run once before the component mounts.

Inside that `useEffect` we create an `async` function called `getProvider`. We need to define an async function inside of our `useEffect` because the `useEffect` function itself cannot be `async`. This function `await`s the `detectEthereumProvider` call using an option (`silent: true`) to silence the error we had seen before (it is expected if no provider is present). We use our setter function from within our `useState` and transform the detection of the provider to a `boolean` (true/false) value.

If we run our code again in this new configuration, we will see that we are no longer blocking our components rendering and there is no error in our console.

## Connecting to MetaMask

In the next scenario, we will create another `useState` to hold our `wallet` state. We will be keeping our application up to date with various MetaMask wallet properties like `accounts`, `balance`, and  `chainId`. These are the most important properties of the MetaMask wallet that we want to constantly sync with our application. We will start with first adding state for `accounts` and slowly build up our state over the next few sections of the tutorial.

We will also be wiring up our button to connect to the MetaMask wallet.

Update the `src/App.tsx` to:

```ts
import './App.css'
import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

const App = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialState = { accounts: [] }               /* New */
  const [wallet, setWallet] = useState(initialState)  /* New */

  useEffect(() => {
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))
    }

    getProvider()
  }, [])

  const updateWallet = async (accounts:any) => {     /* New */
    setWallet({ accounts })                          /* New */
  }                                                  /* New */

  const handleConnect = async () => {                /* New */
    let accounts = await window.ethereum.request({   /* New */
      method: "eth_requestAccounts",                 /* New */
    })                                               /* New */
    updateWallet(accounts)                           /* New */
  }                                                  /* New */

  return (
    <div className="App">
      <div>Injected Provider {hasProvider ? 'DOES' : 'DOES NOT'} Exist</div>

      { hasProvider &&                               /* Updated */
        <button onClick={handleConnect}>Connect MetaMask</button>
      }
      
      { wallet.accounts.length > 0 &&                /* New */
        <div>Wallet Accounts: { wallet.accounts[0] }</div>
      }
    </div>
  )
}

export default App
```
The code above has comments on each new line of code and those lines of code that have been updated. Let's talk about these changes.

We create an object that represent the initial empty state object, as well a new `useState` that will hold our important `wallet` state.

We have added an `updateWallet` function to update our wallet state and this function will come in handy as we add `balance` and `chainId` to our state. Right now it looks a bit overkill. But we are forecasting what we will need in the next few steps.

We have added a `handleConnect` function that our button will call to connect to MetaMask using `window.ethereum.request` and it's `eth_requestAccounts` method. We store the awaited result from this RPC call in a variable named `accounts` and then pass it to our `updateWallet` function, storing that account array in our local state.

### React We Have a Problem

We lose our account data if we refresh the page. When we connect with the button, we set those accounts in our state, but when the page refreshes, we need something in our `useEffect` that will check to see if we are already connected and update our wallet state.

Thinking ahead we know that once we are tracking more than just `accounts`, we will need a mechanism to also get the `balance` and `chainId` and update their state too.

Let's update our `src/App.tsx` with some added logic to our `useEffect`:

```ts
import './App.css'
import { useState, useEffect } from 'react'
import detectEthereumProvider from '@metamask/detect-provider'

const App = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialState = { accounts: [] }
  const [wallet, setWallet] = useState(initialState)

  useEffect(() => {
    const refreshAccounts = (accounts: any) => {                /* New */
      if (accounts.length > 0) {                                /* New */
        updateWallet(accounts)                                  /* New */
      } else {                                                  /* New */
        // if length 0, user is disconnected                    /* New */
        setWallet(initialState)                                 /* New */
      }                                                         /* New */
    }                                                           /* New */

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))

      if (provider) {                                           /* New */
        const accounts = await window.ethereum.request(         /* New */
          { method: 'eth_accounts' }                            /* New */
        )                                                       /* New */
        refreshAccounts(accounts)                               /* New */
        window.ethereum.on('accountsChanged', refreshAccounts)  /* New */
      }                                                         /* New */
    }

    getProvider()
    return () => {                                              /* New */
      window.ethereum?.removeListener('accountsChanged', refreshAccounts)
    }                                                           /* New */
  }, [])

  const updateWallet = async (accounts:any) => {
    setWallet({ accounts })
  }

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    updateWallet(accounts)
  }

  return (
    <div className="App">
      <div>Injected Provider {hasProvider ? 'DOES' : 'DOES NOT'} Exist</div>

      { window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&  /* Updated */
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

One thing to note on the code added is that `useEffect` is a side effect, we use them for fetching data, reads and writes to local storage, and in our case, setting up an event listener or subscription. Our side effect occurs on first render only until we add to our dependency array, so upon unmount of our component, we want to clean-up those listeners.

We can now test our application and see that when we refresh the page, we retain our display of the users address. We can also see that managing state in a single component is a lot of work when we are syncing with a source outside of our application. But most of the logic is in place to start adding a few more properties to our state object.

### Connection Wrap Up

In learning how to connect to MetaMask from a React application, we have learned how to track some basic state of our wallet (accounts), specifically, which one is selected and active in the MetaMask wallet. We sync this state locally using React `useState` and the React `useEffect` Hooks. We ensure that if a user manually disconnects, changes the account or refreshes the page, that our single component is aware of any state change.

## Manage More MetaMask State Locally

We will add `balance` and `chainId` to our state, these are important pieces of MetaMask wallet state that we want to keep in sync with our app.

### Watching The Users Balance and Chain

To update our current component for displaying the connected address's balance and the current `chainId` we need to update our `initialState` object and since we already use the `eth_requestAccounts` RPC endpoint to determine the accounts, we need to add a dependent call to `eth_getBalance` once we have that account information.

Finally, we need to parse the returned value of the balance and format it into a human readable string. We'll create a function called `formatBalance` as well.

```ts
import './App.css'
import { useState, useEffect } from 'react'
import { formatBalance, formatChainAsNum } from './utils'          /* New */
import detectEthereumProvider from '@metamask/detect-provider'

const App = () => {
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialState = { accounts: [], balance: "", chainId: "" }  /* Updated */
  const [wallet, setWallet] = useState(initialState)

  useEffect(() => {
    const refreshAccounts = (accounts: any) => {
      if (accounts.length > 0) {
        updateWallet(accounts)
      } else {
        // if length 0, user is disconnected
        setWallet(initialState)
      }
    }

    const refreshChain = (chainId: any) => {           /* New */
      setWallet((wallet) => ({ ...wallet, chainId }))  /* New */
    }                                                  /* New */

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))

      if (provider) {                                           
        const accounts = await window.ethereum.request(
          { method: 'eth_accounts' }
        )
        refreshAccounts(accounts)
        window.ethereum.on('accountsChanged', refreshAccounts)
        window.ethereum.on("chainChanged", refreshChain)             /* New */
      }
    }

    getProvider()

    return () => {
      window.ethereum?.removeListener('accountsChanged', refreshAccounts)
      window.ethereum?.removeListener("chainChanged", refreshChain)  /* New */
    }
  }, [])

  const updateWallet = async (accounts:any) => {
    const balance = formatBalance(await window.ethereum!.request({   /* New */
      method: "eth_getBalance",                                      /* New */
      params: [accounts[0], "latest"],                               /* New */ 
    }))                                                              /* New */
    const chainId = await window.ethereum!.request({                 /* New */ 
      method: "eth_chainId",                                         /* New */ 
    })                                                               /* New */ 
    setWallet({ accounts, balance, chainId })                        /* Updated */ 
  }

  const handleConnect = async () => {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    })
    updateWallet(accounts)
  }

  return (
    <div className="App">
      <div>Injected Provider {hasProvider ? 'DOES' : 'DOES NOT'} Exist</div>

      { window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&
        <button onClick={handleConnect}>Connect MetaMask</button>
      }

      { wallet.accounts.length > 0 &&
        <>                                                               {/* New */}
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>                    {/* New */}
          <div>Hex ChainId: {wallet.chainId}</div>                       {/* New */}
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div> {/* New */}
        </>
      }
    </div>
  )
}

export default App
```

That wasn't too bad, the changes were minimal in that we only needed to update or duplicate existing functionality and add a few utility functions.

We detect any change of the `balance` or `chain`, and our utility functions help us in formatting hex strings into human readable from ready for display. For chainId's we want to be able to use the hex version in RPC calls and the numeric version for display. We use `parseInt`, no clever formatting like we did for the balance but we put them both in easy to import and use functions.

A few things to note is that our tutorial's app only needs to display information about our wallet. But in a real Web3 app, you may need to add more functionality for switching chains programmatically or initiating transactions. 

You may need to have a list of whitelisted chainId's that your app supports, you may need to create UI that shows information on that network, you might want to present a button that allows them to connect to a supported chain, and other things. Knowing the users wallet is on the correct chain and reacting to that in your application is important in almost every Web3 application.

### Single Component Conclusion

Our code is starting to get a little confusing. But don't think we have led you astray. We now have our head around connecting and listening to the MetaMask wallet state. But, if we want to bring this functionality to an application with more than one component subscribing to its state, we're going to have to break out of this local state and use something like [React's Context API](https://react.dev/reference/react/useContext) to manage the state globally and ensure that any component in our application can be aware and conditionally render or display information pertaining to our MetaMask wallet.

We also would like to bring in the MetaMask SDK, it's only an import and a few lines of code, we will do that now before lifting up our state to a global context so that you can see it's implementation in both scenarios. In the next section of the tutorial we will introduce MetaMask SDK which will enable our users to connect via Metamask Extension or MetaMask mobile and we will sort out our application state and make it global.

