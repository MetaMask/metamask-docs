---
description: Create a multi-component React dapp with global state using EIP-6963.
toc_max_heading_level: 4
sidebar_position: 2
---

# Create a React dapp with global state

This tutorial walks you through integrating a React dapp with MetaMask.
The dapp has multiple components and requires managing the state globally.
You'll use the [Vite](https://v3.vitejs.dev/guide) build tool with React and TypeScript to create
the dapp.

:::tip
We recommend first completing the [creating a React dapp with local state](react-dapp-local-state.md) tutorial, which contains essential information and introduces [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963. If you skip the first tutorial, ensure you review [wallet interoperability](../concepts/wallet-interoperability.md) documentation to learn about multiple injected wallet providers.
:::

The [previous tutorial](react-dapp-local-state.md) walks you through creating a dapp that uses EIP-6963. It demonstrates how to iterate over all discovered providers, connect to the selected wallet, and remember the selection, all within a single component.

In real-world use cases, a dapp usually shares a global state across many components. This tutorial is intentionally complex for what it does, but it will be a great primer if you are planning on rolling your own wallet detection and connection solution.

ADD IMAGE OF FINAL VIEW OF APPLICATION

In this tutorial, the state is put into a [React Context](https://react.dev/reference/react/useContext) component, creating a [global state](https://react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-sharing-logic-between-components)
that allows other components and UI elements to benefit from its data and functions. 

We will also persist with the selected wallet using `localStorage` to ensure that the last connected wallet state remains intact even after a page refresh.

Finally, this tutorial addresses the edge case where a browser wallet may be disabled or uninstalled between refreshes or visits to the dapp. A disconnect function is also added to reset the state and use [`wallet_revokePermissions`](/wallet/reference/wallet_revokePermissions) to disconnect properly from MetaMask.

:::info Project source code
You can view the [dapp source code on GitHub](https://github.com/MetaMask/vite-react-global-tutorial).
:::

## Prerequisites

- [Node.js](https://nodejs.org/) version 18+
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 9+
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- The [MetaMask extension](https://metamask.io/download) installed
- Basic knowledge of TypeScript, React, React Context and React Hooks
- You have completed the [Creating a React dapp with local state](react-dapp-local-state.md) tutorial

## Steps

### 1. Set up the project

This project takes a fresh approach to its structure. The code or last known state from previous tutorials are not used. Instead, this tutorial walks through steps to break the single-component structure into multiple components.

The previous tutorial minimized steps to discover and connect to wallets; this tutorial prepares for more advanced, real-world scenarios.

Begin by creating a new ViteJS project and adding the necessary directory structure:

```bash
npm create vite@latest vite-react-global-state -- --template react-ts
```

Install the node module dependencies:

```bash
cd vite-react-global-state && npm install
```

Launch the development server:

```bash
npm run dev
```

The terminal will have a `localhost` URL, from which you can view the dapp in your browser.

:::note tip
If you are using VS Code, you can run the `code .` command to open the project.

If the development server stops, you can use the `npx vite` or
`npm run dev` command to re-run your project. 
:::

After you open the ViteJS React project in your editor of choice, add three directories within the `src` directory. 
Create a `src/components`, `src/hooks` and `src/utils` directory in the root of the project using the following commands:

```bash
mkdir src/components && mkdir src/hooks && mkdir src/utils
```

Next, create components for listing the installed wallets, displaying the connected wallet information, and handling errors. 
Additionally, create a CSS module for each component.

Create the following files in `src/components`:

- `SelectedWallet.module.css`
- `SelectedWallet.tsx`
- `WalletError.module.css`
- `WalletError.tsx`
- `WalletList.module.css`
- `WalletList.tsx`

Create the following files in `src/hooks`:

- `Eip6963Provider.tsx`
- `useEip6963Provider.tsx`

Create the following file in `src/utils`:

- `index.ts`

#### Styling

Add the following CSS to `SelectedWallet.module.css:

```css title="SelectedWallet.module.css"
.selectedWallet {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;

  padding: 0.6em 1.2em;
  margin-bottom: 0.5em;

  font-family: inherit;
  font-size: 1em;
  font-weight: 500;
}
.selectedWallet > img {
  width: 2em;
  height: 1.5em;
  margin-right: 1em;
}

.providers {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  align-content: center;

  padding: 0.6em 1.2em;
}
```

Add the following CSS to `WalletError.module.css`:

```css title="WalletError.module.css"
.walletError {
  margin-top: 1em;
  border-radius: 0.5em;
  height: 36px;
  padding: 16px;
  color: #EFEFEF;
  background-color: transparent;
  user-select: none;
}
```

Add the following CSS to `WalletList.module.css`:

```css title="WalletList.module.css"
.walletList {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```
Append the following code (to the end of) `src/index.css`:

```css title="index.css"
/* added css */
:root {
  text-align: left;
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
  margin-bottom: 0.5em;
  border: 1px solid transparent;
}

button > img {
  width: 1.5em;
  height: 1.5em;
  margin-right: 1em;
}

button:hover {
  border-color: #75079d;
}

button:first-child {
  margin-top: 0.5em;
}
button:last-child {
  margin-bottom: 0;
}
```

We can add these changes to the end of an updated CSS file rather than giving you a file with these changes peppered throughout.

#### Project structure

You now have some basic global and component-level styling for your application.
The directory structure in the dapp's `/src` directory should look like the following:

```text
├── src
│   ├── assets
│   ├── components
│   │   ├──  SelectedWallet.module.css
│   │   ├──  SelectedWallet.tsx
│   │   ├──  WalletError.module.css
│   │   ├──  WalletError.tsx
│   │   ├──  WalletList.module.css
│   │   └──  WalletList.tsx
│   ├── hooks
│   │   ├── WalletProvider.tsx
│   │   └── useWalletProvider.tsx
│   ├── utils
│   │   └── index.tsx
├── App.css
├── App.tsx
├── index.css
├── main.tsx
├── vite-env.d.ts
```

### 2. Import EIP-6963 interfaces

Your dapp will connect to MetaMask using [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) introduced in the first tutorial.

:::info Why EIP-6963?
[EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) introduces an alternative wallet detection
mechanism to the `window.ethereum` injected provider.
This alternative mechanism enables dapps to support
[wallet interoperability](../concepts/wallet-interoperability.md) by discovering multiple injected
wallet providers in a user's browser.
:::

Update the Vite environment variable file, `src/vite-env.d.ts`, with the types and interfaces
needed for [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) and
[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193):

```tsx title="vite-env.d.ts"
/// <reference types="vite/client" />

interface EIP1193Provider {
  isStatus?: boolean;
  host?: string;
  path?: string;
  sendAsync?: (request: { method: string, params?: Array<unknown> }, callback: (error: Error | null, response: unknown) => void) => void
  send?: (request: { method: string, params?: Array<unknown> }, callback: (error: Error | null, response: unknown) => void) => void
  request: (request: { method: string, params?: Array<unknown> }) => Promise<unknown>
}

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

interface WalletError {
  code?: string
  message?: string
}
```

We also added an interface for our WalletErrors too.

### 2. Build the context provider

This will be the most involved coding section of the tutorial as we understand what types, interfaces, functions, hooks, events, effects, and RPC calls will be needed to create our React Context component. This component will wrap our application, providing all components access to the state and functions required to modify the state and perform connection and disconnection to the discovered wallets. We will add each piece in succession and explain each.

Add the following code to `src/hooks/WalletProvider`:

```ts title="WalletProvider" showLineNumbers
import { PropsWithChildren, createContext, useCallback, useEffect, useState } from 'react'
type SelectedAccountByWallet = Record<string, string | null>
interface WalletProviderContext {
  wallets: Record<string, EIP6963ProviderDetail>
  selectedWallet: EIP6963ProviderDetail | null
  selectedAccount: string | null
  errorMessage: string | null
  connectWallet: (walletUuid: string) => Promise<void>
  disconnectWallet: () => void
  clearError: () => void
}
```

1. The first line is the imports needed for our Context provider.
2. The second line is a type alias for a record where the keys are wallet identifiers, and the values are account addresses (or null).
3. Starting on line 3, the context interface for the EIP-6963 provider is defined. This definition includes the list of wallets (record of wallets by `runs`), the selected wallet (of type `EIP6963ProviderDetail`), the account address chosen (`string`), an error message (`string`), and functions to connect and disconnect wallets.

Add the following code to `src/hooks/WalletProvider`:

```ts title="WalletProvider"
declare global{
  interface WindowEventMap {
    'eip6963:announceProvider': CustomEvent
 }
}
```

Here, we extend the global `WindowEventMap` interface to include the custom `eip6963:announceProvider` event, ensuring type safety and a better developer experience when working with TypeScript. Since this custom event is not natively recognized by TypeScript, we need to declare it explicitly to avoid type errors, provide proper type checking and autocompletion, and help TypeScript understand the new event type.

Add the following code to `src/hooks/WalletProvider`:

```ts title="WalletProvider" showLineNumbers
export const WalletProviderContext = createContext<WalletProviderContext>(null)

export const WalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [wallets, setWallets] = useState<Record<string, EIP6963ProviderDetail>>({})
  const [selectedWalletRdns, setSelectedWalletRdns] = useState<string | null>(null)
  const [selectedAccountByWalletRdns, setSelectedAccountByWalletRdns] = useState<SelectedAccountByWallet>({})

  const [errorMessage, setErrorMessage] = useState('')
  const clearError = () => setErrorMessage('')
  const setError = (error: string) => setErrorMessage(error)

  useEffect(() => {
    const savedSelectedWalletRdns = localStorage.getItem('selectedWalletRdns')
    const savedSelectedAccountByWalletRdns = localStorage.getItem('selectedAccountByWalletRdns')

    if (savedSelectedAccountByWalletRdns) {
      setSelectedAccountByWalletRdns(JSON.parse(savedSelectedAccountByWalletRdns))
 }

    function onAnnouncement(event: EIP6963AnnounceProviderEvent){
      setWallets(currentWallets => ({
 ...currentWallets,
        [event.detail.info.rdns]: event.detail
 }))

      if (savedSelectedWalletRdns && event.detail.info.rdns === savedSelectedWalletRdns) {
        setSelectedWalletRdns(savedSelectedWalletRdns)
 }
 }

    window.addEventListener('eip6963:announceProvider', onAnnouncement)
    window.dispatchEvent(new Event('eip6963:requestProvider'))
    
    return () => window.removeEventListener('eip6963:announceProvider', onAnnouncement)
 }, [])
```

1. On line 1, we create a React Context for the EIP-6963 WalletProvider with the defined interface `WalletProviderContext` with a default of `null`.
2. On line 3, we define the `WalletProvider` component. The WalletProvider component wraps all other components in our dApp, providing them with the necessary data and functions related to wallets. Using `React.FC<PropsWithChildren>` ensures that the component properly types the children it wraps, reducing errors and improving reliability by clearly indicating that WalletProvider will have children components. This approach also simplifies the definition of props, making the code cleaner and more concise.
3. Lines 4 through 10 are our state Definitions: 
  - `wallets`: State to hold detected wallets. 
  - `selectedWalletRdns`: State to hold the RDNS of the selected wallet. 
  - `selectedAccountByWalletRdns`: State to hold accounts associated with each wallet.
  - `errorMessage`: State to hold the error message when a wallet errors on connection.
  - `clearError`: Function to clear the state in `errorMessage`.
  - `setError`: Function to set the state in `errorMessage` (with a `string`)
4. Line 12 is our `useEffect` hook and it handles:
  - Local Storage Retrieval: On mount, retrieve the saved selected wallet and accounts from local storage.
  - Event Listener: Adds an event listener for the custom `eip6963:announceProvider` event. 
  - `OnAnnouncement`: When a provider announces itself, update the state.
  - Provider Request: Dispatch an event to request existing providers.
  - Cleanup: A `return` statement in a `useEffect` is used for cleanup, in our case it removes the event listener on unmount.

Add the following code to `src/hooks/WalletProvider`:

```ts title="WalletProvider" showLineNumbers
  const connectWallet = useCallback(async (walletRdns: string) => {
    try {
      const wallet = wallets[walletRdns]
      const accounts = await wallet.provider.request({method:'eth_requestAccounts'}) as string[]

      if(accounts?.[0]) {
        setSelectedWalletRdns(wallet.info.rdns)
        setSelectedAccountByWalletRdns((currentAccounts) => ({
 ...currentAccounts,
          [wallet.info.rdns]: accounts[0],
 }))
        
        localStorage.setItem('selectedWalletRdns', wallet.info.rdns)
        localStorage.setItem('selectedAccountByWalletRdns', JSON.stringify({
 ...selectedAccountByWalletRdns,
          [wallet.info.rdns]: accounts[0],
 }))
 }
 } catch (error) {
      console.error('Failed to connect to provider:', error)
      const walletError: WalletError = error as WalletError
      setError(`Code: ${walletError.code} \nError Message: ${walletError.message}`)
 }
 }, [wallets, selectedAccountByWalletRdns])
```

This function connects a wallet and updates the component's state accordingly. The parameter `walletRdns` is the wallet's Reverse Domain Name System identifier for connecting.

Inside the function, an asynchronous operation requests accounts from the wallet provider using the Ethereum JSON-RPC method `eth_requestAccounts`.

**State Update:** If the operation is successful (`accounts?.[0]` evaluates to `true`), the selected wallet `rdns` and the corresponding account are updated in the component's state.

**Local Storage:** The selected wallet `rdns` and account information are also stored in the browser's local storage to persist the state across page reloads.

**Error Handling:** Errors that occur during the connection process are caught and logged to the console.

Add the following code to `src/hooks/WalletProvider`:

```ts title="WalletProvider"
  const disconnectWallet = useCallback(async () => {
    if (selectedWalletRdns) {
      setSelectedAccountByWalletRdns((currentAccounts) => ({
 ...currentAccounts,
        [selectedWalletRdns]: null,
 }))

      const wallet = wallets[selectedWalletRdns];
      setSelectedWalletRdns(null)
      localStorage.removeItem('selectedWalletRdns')

      try {
        await wallet.provider.request({
          method: 'wallet_revokePermissions',
          params: [{ 'eth_accounts': {} }]
 });
 } catch (error) {
        console.error('Failed to revoke permissions:', error);
 }
 }
 }, [wallets, selectedWalletRdns])
```

**Definition:** This function is responsible for disconnecting the currently selected wallet and performing necessary cleanup tasks.

**Condition Check:** It checks if a wallet is currently selected (`selectedWalletRdns` is true).

**Update State:** If a wallet is selected, it sets the account for that wallet to `null` in the component's state, effectively disconnecting the wallet.

**Local Storage Cleanup:** This function removes the selected wallet `rdns` from local storage to clear any persisted state related to the disconnected wallet.

**Revoke Permissions:** Programmatically sends a request to revoke permissions (disconnects from the dapp) for the disconnected wallet using the [`wallet_revokePermissions`](/wallet/reference/wallet_revokePermissions) method. This ensures that the dapp no longer has access to the disconnected wallet's account information.

:::caution important
`wallet_revokePermission` is an experimental RPC method that may only work with MetaMask; setting it up in a try/catch and having it separated from the rest of the cleanup ensures that if a wallet does not support it, the rest of the disconnect functionality happens. It fails gracefully with a simple console log indicating: **__"WalletProvider.tsx:141 Failed to revoke permissions: method [wallet_revokePermissions] doesn't has corresponding handler"__**.
:::

**Error Handling:** Errors that occur during the permission revocation process are caught and logged to the console.

#### The reason for utilizing `useCallback`

Both of the previous functions utilize `useCallback`. It is used to memoize the `connectWallet` function, optimize performance and prevent unnecessary re-renders. It ensures the function instance remains consistent between renders if its dependencies haven't changed. 

Let's take the case of `disconnectWallet`:

Each time the `WalletProvider` component re-renders without `useCallback`, a new instance of `disconnectWallet` would be created, leading to unnecessary re-renders of child components that depend on this function. By memoizing it with `useCallback`, React ensures that the function instance remains the same between renders if its dependencies (`wallets` and `selectedWalletRdns`) haven't changed, preventing child components from re-rendering unnecessarily.

Even though `useCallback` is not completely necessary, we can't always assume how a context provider like this will be used or how the dapp might change or scale. Using `useCallback` was a choice to show how to do it, which can be a best practice and help performance in some cases.

Add the following code to `src/hooks/WalletProvider`:

```ts title="WalletProvider" showLineNumbers
  const contextValue: WalletProviderContext = {
    wallets,
    selectedWallet: selectedWalletRdns === null ? null : wallets[selectedWalletRdns],
    selectedAccount: selectedWalletRdns === null ? null : selectedAccountByWalletRdns[selectedWalletRdns],
    errorMessage,
    connectWallet,
    disconnectWallet,
    clearError,
 }

  return (
 <WalletProviderContext.Provider value={contextValue}>
 {children}
 </WalletProviderContext.Provider>
 )
```

The purpose of `contextValue` is to bundle together the state and functions related to wallet management, making them accessible to all components within the `WalletProvider` context. It is important because it centralizes the wallet-related logic and state, allowing any component in the component tree to easily access and interact with the wallet data and actions without prop drilling, thereby promoting cleaner and more maintainable code.

We already know what each of these values are that make up the `WalletProviderContext`, but let's cover the logic behind lines 3 and 4 as they have similar logic but provide a different value in each case based on `selectedWalletRdns` being null or not:

**selectedWallet:** If `selectedWalletRdns` is null, we set `selectedWallet` to null. Otherwise, we retrieve the wallet details from the wallet state using the `runs` identifier.

**selectedAccount:** If `selectedWalletRdns` is null, we set `selectedAccount` to null. Otherwise, we retrieve the account address from the `selectedAccountByWalletRdns` state using the `rdns` identifier.

Finally, within the component's return statement, the `contextValue` object is constructed with all necessary state and functions related to wallet management. It is passed to the `WalletProviderContext.Provider`, making the wallet-related data and functions available to all descendant components, enabling them to access and interact with the wallet state without prop drilling. 

The return statement effectively wraps the children components with the context provider, ensuring they can consume the context values.

Add the following code to `src/hooks/WalletProvider`:

```tsx title="useWalletProvider.tsx"
import { useContext } from 'react'
import { WalletProviderContext } from './WalletProvider'

export const useWalletProvider = () => useContext(WalletProviderContext)
```

The `useWalletProvider.tsx` file provides a custom hook that simplifies the process of consuming the `WalletProviderContext`.

In the code, we export the `useWalletProvider` hook, which leverages the `useContext` hook to consume the `WalletProviderContext`.

The benefit of this separate file exporting the hook is that components can directly call `useWalletProvider() ` instead of `useContext(WalletProviderContext)`, making the code cleaner and more readable.
It also encapsulates the context consumption logic, promoting better separation of concerns and allowing for more accessible updates or changes to the context logic and state for added features and maintenance.

With `WalletProvider.tsx` and `useWalletProvider.tsx` in place, our dapp can now efficiently manage and access wallet-related state and functionality across various components. We can now wrap our entire application (or at least the part that requires wallet connection and data) with a `<WalletProvider></WalletProvider>` component, providing the wallet context to all child components wrapped.

Add the following code to `src/utils/index.ts`:

```tsx title="useWalletProvider.tsx"
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

Although we only use `formatAddress` and not `formatBalance` and `formatChainAsNum`, I added these useful utility functions. You can also look into how to do this with [Viem Formatters](https://viem.sh/docs/chains/formatters) or other libraries.

### 3. Wrap components with the context provider

Next, we need to replace all of the code within the file `src/App.tsx`:

```tsx title="App.tsx"
import './App.css'
import { WalletProvider } from '~/hooks/WalletProvider'
// import { SelectedWallet } from './components/SelectedWallet'
// import { WalletList } from './components/WalletList'
// import { WalletError } from './components/WalletError'

function App() {
  return (
    <WalletProvider>
    {/* 
 <WalletList />
 <hr />
 <SelectedWallet />
 <WalletError /> 
 */}
    </WalletProvider>
 )
}

export default App
```

This is very simple: Our application only discovers injected providers (browser-installed wallets). We get a list of wallet providers (supplied by our context provider), iterate over them, provide a button for each one that uses the `connectWallet` function, and finally display the selected wallet and some basic information like the user's wallet address.

We will also have a UI component to show errors.

We have commented out the child components for now, but as we create each of these components, we will uncomment those specific lines. Let's move to the next step of creating each of the components we have defined here and adding the logic and UI needed to accomplish our goals.

### 4. Create the UI components

We want to create them in the order that we have them listed top to bottom in the `App.tsx` file, so let's start with `WalletList.tsx`.

Add the following code to `src/components/WalletList.tsx`:

```tsx title="WalletList.tsx"
import { useWalletProvider } from '~/hooks/useWalletProvider'
import styles from './WalletList.module.css'

export const WalletList = () => {
  const { wallets, connectWallet } = useWalletProvider()
  return (
    <>
      <h2>Wallets Detected:</h2>
      <div className={styles.walletList}>
        {
          Object.keys(wallets).length > 0 ? Object.values(wallets).map((provider: EIP6963ProviderDetail) => (
            <button key={provider.info.uuid} onClick={() => connectWallet(provider.info.rdns)}>
              <img src={provider.info.icon} alt={provider.info.name} />
              <div>{provider.info.name}</div>
            </button>
 )) :
            <div>
 there are no Announced Providers
            </div>
        }
      </div>
    </>
 )
}
```

In this code, we import the `wallets` data and the `connectWallet` function from the `useWalletProvider` hook.

The component first checks if there are any detected wallets using `Object.keys(wallets).length > 0`. This check ensures that if no wallets are found, a message: "No wallets detected", is displayed instead of an empty list.


If wallets are detected, `Object.values(wallets).map(wallet => (...))` iterates over them and renders a button for each one.

- `Object.keys(wallets)` returns an array of the wallet keys (rdns values) but is used here just to check the length.
- `Object.values(wallets)` returns an array of the wallet objects, which is what we need to map over and render.
- Using `wallet.info.rdns` as the key ensures that each wallet button is uniquely identified.

ADD IMAGE OF APPLICATION WITH `WalletList` COMPONENT

### 5. Display MetaMask data

Next, add the following code to `src/components/SelectedWallet.tsx`:

```tsx title="SelectedWallet.tsx" showLineNumbers
import { useWalletProvider } from '~/hooks/useWalletProvider'
import { formatAddress } from '~/utils'
import styles from './SelectedWallet.module.css'

export const SelectedWallet = () => {
  const { selectedWallet, selectedAccount, disconnectWallet } = useWalletProvider()

  return (
    <>
      <h2 className={styles.userAccount}>{selectedAccount ? '' : 'No '}Wallet Selected</h2>
      {selectedAccount &&
        <>
          <div className={styles.selectedWallet}>
            <img src={selectedWallet.info.icon} alt={selectedWallet.info.name} />
            <div>{selectedWallet.info.name}</div>
            <div>({formatAddress(selectedAccount)})</div>
            <div><strong>uuid:</strong> {selectedWallet.info.uuid}</div>
            <div><strong>rdns:</strong> {selectedWallet.info.rdns}</div>
          </div>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </>
      }
    </>
 )
}
```

In this code, we import the `selectedWallet` and `selectedAccount` functions and the function `disconnectWallet` from the `useWalletProvider` hook.

The code occupying lines 11 through 22 above has some conditional rendering `{selectedAccount && (...)}`. This conditional rendering means that the content inside will only be rendered if `selectedAccount` is tre (i.e., the user has selected and connected a wallet account). This ensures that detailed information about the selected wallet is only displayed when an active wallet is connected. We then display information about the wallet, but you could conditionally render anything like:

- Wallet Address
- Wallet Balance
- Chain ID or Name
- or render other components that first need a connected wallet to work

ADD IMAGE OF APPLICATION WITH `SelectedWallet` COMPONENT

### 6. Show wallet connection errors

Add the following code to `src/components/WalletError.tsx`:

```tsx title="WalletError.tsx"
import { useWalletProvider } from '~/hooks/useWalletProvider'
import styles from './WalletError.module.css'

export const WalletError = () => {
  const { errorMessage, clearError } = useWalletProvider()
  const isError = !!errorMessage

  return (
    <div className={styles.walletError} style={isError ? { backgroundColor: 'brown' } : {}}>
      {isError &&
        <div onClick={clearError}>
          <strong>Error:</strong> {errorMessage}
        </div>
      }
    </div>
 )
}
```

This last component is very straightforward. We have some CSS that activates only if an error is present, as well as a `div` with the error message that will also only render if the `errorMessage` has data. 

Upon clicking on the `div`, we set `errorMessage` back to nothing, which then hides the content.

Although hacky, it illustrates that you could have specific content that only shows (like a modal or notification) upon connection errors when connecting to a wallet.

ADD IMAGE OF APPLICATION WITH `WalletError` COMPONENT SHOWN

### Run the final state of the dapp

Now that we have all of this in place let's uncomment the code in `App.tsx`

```tsx title="App.tsx"
import './App.css'
import { WalletProvider } from '~/hooks/WalletProvider'
import { SelectedWallet } from './components/SelectedWallet'
import { WalletList } from './components/WalletList'
import { WalletError } from './components/WalletError'

function App() {
  return (
    <WalletProvider>
      <WalletList />
      <hr />
      <SelectedWallet />
      <WalletError />
    </WalletProvider>
 )
}

export default App
```

Now, we can run `npm run dev` to view the wallet list and select a wallet to connect to.

ADD IMAGE OF FINAL VIEW OF APPLICATION

A few user tests you can perform to test the various features and functionality we have built:

1. Have more than one wallet installed in your browser; test connecting and disconnecting from each
2. Once a wallet is selected, refresh the page. 
  - Ensure the selected wallet persists and does not revert to **"No Wallet Selected"**
3. Once you have a wallet selected, disable that wallet and refresh the page, then re-enable the wallet and refresh the page. Notice how the dapp behaves.
4. Upon connecting to a wallet, cancel the connection or close the wallet prompt.
  - This should trigger our WalletError component, then click to dismiss it.

## Conclusion

We have finished taking what we have learned about EIP-6963 and connecting to wallets, specifically Metamask. Still, it works with all wallets found on that [comply with EIP-6963](https://github.com/WalletConnect/EIP6963/blob/master/src/utils/constants.ts) and the integrate Multi Injected Provider Discovery.

We have also considered many edge cases and created a context provider that facilitates sharing data, functions for connecting and disconnecting from these wallets, and handles errors.

You can see the [source code](https://github.com/MetaMask/vite-react-global-tutorial)
for the final state of this dapp tutorial.