---
title: React Dapp with Global State
description: Create a simple React dapp that integrates MetaMask and utilize React Context Provider for global state.
toc_max_heading_level: 4
---

# Create a Simple React Dapp with Global State

This tutorial picks up where the [previous tutorial](./react-dapp-local-state.md) left off. We will be starting our work from the [multi-component-start](https://github.com/MetaMask/dapp-tutorial-react/tree/multi-component-start) branch of the [dapp-tutorial-react](https://github.com/MetaMask/dapp-tutorial-react) source code repository.

We will also be utilizing TypeScript and a few best practices to ensure a clean code base as we will now have multiple components and a slightly more complex file structure in our [Vite](https://v3.vitejs.dev/guide/) + React project.

:::info Why Global State?
Our previous tutorial approached connecting to MetaMask and keeping the changes of account, balance and chainId in sync with a single component. Sooner or later you will have to respond to some state change in a different component. In this tutorial we are going to move that state and its relevant functions into React Context and making it global state so that other components and UI can be aware of changes in wallet state.
:::

## Prerequisites

- [Node.js](https://nodejs.org/) version 18+
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 9+
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- The [MetaMask extension](https://metamask.io/download) installed
- Basic knowledge of TypeScript, React and React Hooks

## Steps

### 1. Clone React Dapp Repository

Our first step to get started with this tutorial is to clone the [dapp-tutorial-react](https://github.com/MetaMask/dapp-tutorial-react) repository on GitHub and switch to the `multi-component-start` branch and install our node module dependencies.

```bash
git clone https://github.com/MetaMask/dapp-tutorial-react.git \
&& cd dapp-tutorial-react && git checkout multi-component-start \
&& npm install
```

At this point we should have a basic running application, but we have wiped out the code that we wrote in our previous branches [App.tsx file](https://github.com/MetaMask/dapp-tutorial-react/blob/single-component-final/src/App.tsx).

We will go over the structure of this new architecture, as it's still fairly simple. But first let's run our app using `npx vite` and make sure that your starting point looks the same as the image below:

![](../assets/tutorials/react-dapp/pt2-01.png)

Here we have three components, each with just static text, but the structure exists for a multi-component application consisting of a logo, navigation, main content "Display" area, and footer area that we will utilize to show errors when we have them.

Before we get started, let's comment out or remove the `border` selector line of code in each of the style sheets

```css
border: 1px solid rgb(...);
```

This code was only there to distinctly show the three different components as a visual aid and you can remove it from the following files if you like:

- `Display.module.css`
- `MetaMaskError.module.css`
- `Navigation.module.css`

#### Styling Strategy

NOt specific to MetaMask, but we wanted our new app to have a bit more structured and appealing layout, use some common best practices around styling that you could actually use in a real app.

Vite's typical `App.css` and `index.css` have been removed and we are opting for a modular approach to CSS.

In the `/src` directory we have `App.global.css` who's styles are specific to the entire application (not related to a single component) or has styles that we might want to reuse in many places (like buttons).

In the `/src` directory we have `App.module.css`. Since our `App.tsx` is the container component for our application, `App.module.css` relates to it and its `appContainer` class which utilizes [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox) to define the `display` type (`flex`) and the `flex-direction` (`column`). This ensures that any child `div`s are laid out in a single column layout (vertically).

Finally, we have a `/src/components` directory which has a folder for `Display`, `Navigation`, and `MetaMaskError`. Inside those folders are the component file and a corresponding modular CSS file that is specific to the component it is paired up with and are specific to that component. Each of these three components are [flex-items](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#aa-basics-and-terminology) within a [flex-container](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#aa-flexbox-properties), stacked in a vertical column with the top (`Navigation`) and Footer (`MetaMaskError`) being of fixed height and the middle component (`Display`) taking up the remaining vertical space.

#### Project Structure

Below is a tree representation of our application's `/src` directory.

```
├── src
│   ├── assets
│   ├── components
│   │   └── Display
│   │   |   └── index.tsx
│   │   |   └── Display.module.css
│   │   |   └── Display.tsx
│   │   ├── MetaMaskError
│   │   |   └── index.tsx
│   │   |   └── MetaMaskError.module.css
│   │   |   └── MetaMaskError.tsx
│   │   ├─── Navigation
│   │   |   └── index.tsx
│   │   |   └── Navigation.module.css
│   │   |   └── Navigation.tsx
│   ├── hooks
│   │   ├── useMetaMask.tsx
│   ├── utils
│   │   └── index.tsx
├── App.global.css
├── App.module.css
├── App.tsx
├── main.tsx
├── vite-env.d.ts
```

Rather than building our page with a single component, you can see we have broken it up into multiple components and added the `src/components` directory. We also have a directory named `hooks` where we will track our state by creating a Context Provider. This provider will sit in our `src/App.tsx` file and wrap all other component which are described in our app as it's children. 

Those child component will have access to the state and functions which update our global state thereby ensuring that any change to our wallet `address`, `balance` or `chainId`  state that happen get reflected by rerendering those child component when it changes.

![](../assets/tutorials/react-dapp/pt2-02.png)

In the graphic above we demonstrate how this Context Provider wraps its child components providing them access to the state modifier functions and the actual state itself. SInce React uses a one-way data flow, any change to the data gets rerendered in those components automatically.

### 2. Building Our Context Provider

We have provided a file `/src/hooks/useMetaMask` which we will create this Context and Provider component named `MetaMaskContextProvider`. This provider component will utilize the same `useState` and `useEffect` hooks with minimal change from our previous tutorials single component. It will also have similar `UpdateWallet`, `ConnectMetaMask`, and `clearError` functions all of which do their part to either connect to MetaMask or update our MetaMask state.

:::note Check the Comments
The `useMetaMask` file we have supplied does not have code in it yet, but we have added some basic comments (psuedo-code) that notes the changes we need to make to this file. Reading through those comments before pasting in your code will be useful.
:::

It will return a `MetaMaskContext.Provider` which takes a value of type `MetaMaskData` supplying that to it's `{children}`.

And Finally we will export a React Hook called `useMetaMask`  which uses our `MetaMaskContext`.

Let's add that code to the file `/src/hooks/useMetaMask`:

```ts
import { useState, useEffect, createContext, PropsWithChildren, useContext } from 'react'

import detectEthereumProvider from '@metamask/detect-provider'
import { formatBalance } from '@/utils'

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

    const refreshChain = (chainId: any) => {
      setWallet((wallet) => ({ ...wallet, chainId }))
    }

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))

      if (provider) {
        const accounts = await window.ethereum.request(
          { method: 'eth_accounts' }
        )
        refreshAccounts(accounts)
        window.ethereum.on('accountsChanged', refreshAccounts)
        window.ethereum.on('chainChanged', refreshChain)
      }
    }

    getProvider()

    return () => {
      window.ethereum?.removeListener('accountsChanged', refreshAccounts)
      window.ethereum?.removeListener('chainChanged', refreshChain)
    }
  }, [])

  const updateWallet = async (accounts: any) => {
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
```

:::note We are using tsconfig-paths
One configuration change we have made to this application is the use of `tsconfig-paths` which lets us load modules whose location is specified in the paths section of `tsconfig.json`.

We have installed a package named `vite-tsconfig-paths` and we import that into the `vite.config.ts` and add it to the plugin array. As well we have updated the `tsconfig.json` to add a path corresponding to the `./src/*` directory using the `@/*` symbol to represent it. We also add the reference to the `./tsconfig.node.json` as a reference.

You can find additional information at [vite-tsconfig-paths](https://github.com/aleclarson/vite-tsconfig-paths)

This allows us to use `'@/utils'` to import our utility functions and is a best practice.
:::

Nothing special outside of the creation of the Context Provider is happening in this file that we have not previously done is some form in our previous tutorial.

With this Context Provider in place, we can now update our `/src/App.tsx` file to include that provider and wrap it around those three components.

### 3. Wrap Components with Context Provider

Let's open the `/src/App.tsx` file and import our new Context Provider and wrap that component around the existing `Display`, `Navigation`, and `MetaMaskError` components.

Update the code in `/src/App.tsx`:

```ts
import './App.global.css'
import styles from './App.module.css'

import { Navigation } from './components/Navigation'
import { Display } from './components/Display'
import { MetaMaskError } from './components/MetaMaskError'
import { MetaMaskContextProvider } from './hooks/useMetaMask'

export const App = () => {

  return (
    <MetaMaskContextProvider>
      <div className={styles.appContainer}>
        <Navigation />
        <Display />
        <MetaMaskError />
      </div>
    </MetaMaskContextProvider>
  )
}
```

With our `App.tsx` file updated we can move on to updating our `Display`, `Navigation`, and `MetaMaskError` components which will each in some form utilize our `useMetaMask` hooks to invoke our functions that modify state or use the state itself.

### 4. Connect to MetaMask in Navigation

In our previous tutorial were connecting to MetaMask, displaying `address`, `balance`, and `chainId` information all in one component. But now we want to split all of that up amongst our various components. 

Navigation will simply connect to MetaMask, use conditional rendering to show an Install or Connect button or once connected display our wallet address in a link that connects to [etherescan](https://etherscan.io).

In the `/src/components/Navigation/Navigation.tsx` file add the following code:

```ts
import { useMetaMask } from '@/hooks/useMetaMask'
import { formatAddress } from '@/utils'
import styles from './Navigation.module.css'

export const Navigation = () => {

  const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()

  return (
    <div className={styles.navigation}>
      <div className={styles.flexContainer}>
        <div className={styles.leftNav}>Vite + React & MetaMask</div>
        <div className={styles.rightNav}>
          {!hasProvider &&
            <a href="https://metamask.io" target="_blank">
              Install MetaMask
            </a>
          }
          {window.ethereum?.isMetaMask && wallet.accounts.length < 1 &&
            <button disabled={isConnecting} onClick={connectMetaMask}>
              Connect MetaMask
            </button>
          }
          {hasProvider && wallet.accounts.length > 0 &&
            <a
              className="text_link tooltip-bottom"
              href={`https://etherscan.io/address/${wallet}`}
              target="_blank"
              data-tooltip="Open in Block Explorer"
            >
              {formatAddress(wallet.accounts[0])}
            </a>
          }
        </div>
      </div>
    </div>
  )
}
```

Notice how we are now using `useMetaMask` and destrucuring its return value to get just the parts of the `MetaMaskData` state and functions that we need.

```ts
const { wallet, hasProvider, isConnecting, connectMetaMask } = useMetaMask()
```

Also we are using a function to format our wallet address for display purposes:

```ts
{formatAddress(wallet.accounts[0])}
```

This `formatAddress` function doesn't exist in that `@utils` file yet, let's add it. 

Update `/src/utils/index.tsx` with the following code:

```ts
export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
  return balance
}

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex)
  return chainIdNum
}

export const formatAddress = (addr: string) => {
  return `${addr.substring(0, 8)}...`
}
```

Great, that should take care of any errors we were getting in our `Navigation` component.

Other than the use of our new styling practice, the only thing we are dong different from our previous tutorial is that we are displaying the users `address` formatted inside of a lnk once they are connected.

![](../assets/tutorials/react-dapp/pt2-03.png)

### 5. Display MetaMaskData in Display

In our `Display` component we will not be calling any functions that modify state, we will simply be reading from our `MetaMaskData` so this will be a very simple update.

Update the `/src/components/Display/Display.tsx` file with the following code:

```ts
import { useMetaMask } from '@/hooks/useMetaMask'
import styles from './Display.module.css'
import { formatChainAsNum } from '@/utils'

export const Display = () => {

  const { wallet } = useMetaMask()

  return (
    <div className={styles.display}>
      {wallet.accounts.length > 0 &&
        <>
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>
          <div>Hex ChainId: {wallet.chainId}</div>
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
        </>
      }
    </div>
  )
}
```

Notice how we are now using `useMetaMask` and destrucuring its return value to get only the `{ wallet }` data.

```ts
const { wallet } = useMetaMask()
```

At this point we will be able to display `account`, `balance`, and `chainId` in our `Display` component:

![](../assets/tutorials/react-dapp/pt2-04.png)

### 5. Show and Hide Errors in MetaMaskError

We are almost done, but we want to make sure that if MetaMask errors or if the user rejects a connection that we have a component to display that error. 

If a user clicks on that error we will dismiss the error which will again hide that information and we do this using the `clearError` function that we set up in the `useMetaMask` hook.

In the `/src/components/MetaMaskError/MetaMaskError.tsx` file add the following code:

```ts
import { useMetaMask } from '@/hooks/useMetaMask'
import styles from './MetaMaskError.module.css'

export const MetaMaskError = () => {
  const { error, errorMessage, clearError } = useMetaMask()
  return (
    <div className={styles.metaMaskError} style={
      error ? { backgroundColor: 'brown' } : {}
    }>
      { error && (
          <div onClick={clearError}>
            <strong>Error:</strong> {errorMessage}
          </div>
        )
      }
    </div>
  )
}
```

Notice how we are now using `useMetaMask` and destrucuring its return value to get only the `{ error, errorMessage, clearError }`, data and a function that will modify the error state.

```ts
const { error, errorMessage, clearError } = useMetaMask()
```

When we generate an error by canceling the connection to MetaMask this will show that footer component as well it will temporarily make it's background a dark red color:

![](../assets/tutorials/react-dapp/pt2-05.png)

Upon clicking on that red area, the error will be dismissed. In a real world application the best UI/UX for this would a component that displays in a modal or overlay, for the sake of simplicity we have just utilized our footer area for this but the logic we have learned can be applied to any situation.

## Conclusion

We've successfully converted an app using simple local component state to one that utilizes REact Context and Provider to have a global state that we can modify through the use of functions and data that when used anywhere in our application will show up to date data associated with our MetaMask wallet. 👊😉👍