---
description: Connect to the MetaMask extension using the Wallet API and EIP-6963.
toc_max_heading_level: 4
keywords: [extension, API]
---

# Connect to the MetaMask extension

:::tip Building a cross-platform or mobile dapp?
For cross-platform development, mobile integration, or advanced features like QR codes and 
deeplinking, connect to MetaMask using [**MetaMask SDK**](/sdk) instead.
:::

You can connect your dapp to users' MetaMask wallets by detecting MetaMask in their browsers and
connecting to their accounts.
This page provides instructions for connecting to MetaMask using the wallet detection mechanism
introduced by [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963).
This approach allows you to detect multiple installed wallets and connect to them without conflicts.

:::info
Learn more about EIP-6963 in [Wallet interoperability](../concepts/wallet-interoperability.md).
:::

You can connect to the MetaMask browser extension [using third-party libraries](#connect-to-metamask-using-third-party-libraries)
or [directly using Vite](#connect-to-metamask-directly-using-vite).

## Connect to MetaMask using third-party libraries

You can connect to MetaMask using the following third-party libraries that support EIP-6963:

- [Wagmi 2+](/sdk/connect/javascript-wagmi)
- [Reown AppKit](https://docs.reown.com/appkit/overview)
- [MIPD Store](https://github.com/wevm/mipd)
- [RainbowKit](https://rainbowkit.com/docs/introduction)
- [Web3-Onboard](https://onboard.blocknative.com)
- [ConnectKit](https://docs.family.co/connectkit)

## Connect to MetaMask directly using Vite

To connect to MetaMask directly, we recommend implementing support for EIP-6963 using the
[Vite](https://vitejs.dev/) build tool with [vanilla TypeScript](#vanilla-typescript) or
[React TypeScript](#react-typescript).

### Vanilla TypeScript

Follow these steps for creating a vanilla TypeScript project to connect to MetaMask:

#### 1. Create a project

[Create a Vite project](https://v3.vitejs.dev/guide/#scaffolding-your-first-vite-project) using the
template for vanilla TypeScript:

```bash
npm create vite@latest vanilla-ts-6963 -- --template vanilla-ts
```

#### 2. Set up the project

In your Vite project, update `src/vite-env.d.ts` with the
[EIP-6963 interfaces](../concepts/wallet-interoperability.md#eip-6963-interfaces):

```typescript title="vite-env.d.ts"
/// <reference types="vite/client" />

interface EIP6963ProviderInfo {
  rdns: string
  uuid: string
  name: string
  icon: string
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo
  provider: EIP1193Provider
}

type EIP6963AnnounceProviderEvent = {
  detail: {
    info: EIP6963ProviderInfo
    provider: Readonly<EIP1193Provider>
  }
}

interface EIP1193Provider {
  isStatus?: boolean
  host?: string
  path?: string
  sendAsync?: (
    request: { method: string; params?: Array<unknown> },
    callback: (error: Error | null, response: unknown) => void
  ) => void
  send?: (
    request: { method: string; params?: Array<unknown> },
    callback: (error: Error | null, response: unknown) => void
  ) => void
  request: (request: {
    method: string
    params?: Array<unknown>
  }) => Promise<unknown>
}
```

:::note
In addition to the EIP-6963 interfaces, you need a `EIP1193Provider` interface (defined by
[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)), which is the foundational structure for
Ethereum wallet providers, and represents the essential properties and methods for interacting with
MetaMask and other Ethereum wallets in JavaScript.
:::

#### 3. Update `main.ts`

Update `src/main.ts` with the following code:

```typescript title="main.ts"
import "./style.css"
import { listProviders } from "./providers.ts"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <div id="providerButtons"></div>
  </div>
`

listProviders(document.querySelector<HTMLDivElement>("#providerButtons")!)
```

The `querySelector` finds and returns the first HTML element that matches the CSS selector `app`,
and sets its `innerHTML`.
You need to include a basic HTML structure with an inner `div` to inject a list of buttons, each
representing a detected wallet provider.

You'll create the `listProviders` function in the next step, and pass an argument which represents
the `div` element.

#### 4. Connect to wallets

Create a file `src/providers.ts` with the following code:

```ts title="providers.ts"
declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent
  }
}

// Connect to the selected provider using eth_requestAccounts.
const connectWithProvider = async (
  wallet: EIP6963AnnounceProviderEvent["detail"]
) => {
  try {
    await wallet.provider.request({ method: "eth_requestAccounts" })
  } catch (error) {
    console.error("Failed to connect to provider:", error)
  }
}

// Display detected providers as connect buttons.
export function listProviders(element: HTMLDivElement) {
  window.addEventListener(
    "eip6963:announceProvider",
    (event: EIP6963AnnounceProviderEvent) => {
      const button = document.createElement("button")

      button.innerHTML = `
        <img src="${event.detail.info.icon}" alt="${event.detail.info.name}" />
        <div>${event.detail.info.name}</div>
      `

      // Call connectWithProvider when a user selects the button.
      button.onclick = () => connectWithProvider(event.detail)
      element.appendChild(button)
    }
  )

  // Notify event listeners and other parts of the dapp that a provider is requested.
  window.dispatchEvent(new Event("eip6963:requestProvider"))
}
```

The `connectWithProvider` function connects the user to the selected provider using
[`eth_requestAccounts`](/wallet/reference/json-rpc-methods/eth_requestaccounts).
The `wallet` object is passed as an argument to the function, indicating the argument type.

The `listProviders` function uses a simplified approach.
Instead of mapping and joining an entire block of HTML, it directly passes the `event.detail` object
to the `connectWithProvider` function when a provider is announced.

#### 5. View the project

Run the following command to view and test the Vite project in your browser:

```bash
npm run dev
```

#### Example

See the [vanilla TypeScript example](https://github.com/MetaMask/vite-vanilla-ts-eip-6963) for more information.
You can clone the repository and run the example locally using `npm i && npm run dev`.

### React TypeScript

Follow these steps for creating a React TypeScript project to connect to MetaMask:

#### 1. Create a project

[Create a Vite project](https://v3.vitejs.dev/guide/#scaffolding-your-first-vite-project) using the
template for React TypeScript:

```bash
npm create vite@latest react-ts-6963 -- --template react-ts
```

#### 2. Set up the project

In your Vite project, update `src/vite-env.d.ts` with the
[EIP-6963 interfaces](../concepts/wallet-interoperability.md#eip-6963-interfaces):

```typescript title="vite-env.d.ts"
/// <reference types="vite/client" />

interface EIP6963ProviderInfo {
  rdns: string
  uuid: string
  name: string
  icon: string
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo
  provider: EIP1193Provider
}

type EIP6963AnnounceProviderEvent = {
  detail: {
    info: EIP6963ProviderInfo
    provider: Readonly<EIP1193Provider>
  }
}

interface EIP1193Provider {
  isStatus?: boolean
  host?: string
  path?: string
  sendAsync?: (
    request: { method: string; params?: Array<unknown> },
    callback: (error: Error | null, response: unknown) => void
  ) => void
  send?: (
    request: { method: string; params?: Array<unknown> },
    callback: (error: Error | null, response: unknown) => void
  ) => void
  request: (request: {
    method: string
    params?: Array<unknown>
  }) => Promise<unknown>
}
```

:::note
In addition to the EIP-6963 interfaces, you need a `EIP1193Provider` interface (defined by
[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)), which is the foundational structure for
Ethereum wallet providers, and represents the essential properties and methods for interacting with
MetaMask and other Ethereum wallets in JavaScript.
:::

#### 3. Update `App.tsx`

Update `src/App.tsx` with the following code:

```ts title="App.tsx"
import "./App.css"
import { DiscoverWalletProviders } from "./components/WalletProviders"

function App() {
  return (
    <DiscoverWalletProviders/>
  )
}

export default App
```

This code renders the `WalletProviders` component that you'll create in the next step, which
contains the logic for detecting and connecting to wallet providers.

#### 4. Detect and connect to wallets

Create a `src/components` directory and add a file `WalletProviders.tsx` with the following code:

```ts title="WalletProviders.tsx"
import { useState } from "react"
import { useSyncProviders } from "../hooks/useSyncProviders"
import { formatAddress } from "../utils"

export const DiscoverWalletProviders = () => {
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [userAccount, setUserAccount] = useState<string>("")
  const providers = useSyncProviders()

  // Connect to the selected provider using eth_requestAccounts.
  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    const accounts: string[] | undefined =
      await (
        providerWithInfo.provider
          .request({ method: "eth_requestAccounts" })
          .catch(console.error)
      ) as string[] | undefined;

    if (accounts?.[0]) {
      setSelectedWallet(providerWithInfo)
      setUserAccount(accounts?.[0])
    }
  }

  // Display detected providers as connect buttons.
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

In this code:

- `selectedWallet` is a state variable that holds the user's most recently selected wallet.
- `userAccount` is a state variable that holds the user's connected wallet's address.
- `useSyncProviders` is a custom hook that returns the providers array (wallets installed in the browser).

The `handleConnect` function takes a `providerWithInfo`, which is an `EIP6963ProviderDetail` object.
That object is used to request the user's accounts from the provider using
[`eth_requestAccounts`](/wallet/reference/json-rpc-methods/eth_requestaccounts).

If the request succeeds, the `selectedWallet` and `userAccount` local state variables are set.

Then, the component maps over the providers array and renders a button for each detected provider.

Finally, if the `userAccount` state variable is not empty, the selected wallet icon, name, and
address are displayed.

#### 5. Add React hooks

Create a `src/hooks` directory and add a file `store.ts` with the following code:

```ts title="hooks/store.ts"
declare global {
  interface WindowEventMap {
    "eip6963:announceProvider": CustomEvent
  }
}

// An array to store the detected wallet providers.
let providers: EIP6963ProviderDetail[] = []

export const store = {
  value: () => providers,
  subscribe: (callback: () => void) => {
    function onAnnouncement(event: EIP6963AnnounceProviderEvent) {
      if (providers.map((p) => p.info.uuid).includes(event.detail.info.uuid))
        return
      providers = [...providers, event.detail]
      callback()
    }

    // Listen for eip6963:announceProvider and call onAnnouncement when the event is triggered.
    window.addEventListener("eip6963:announceProvider", onAnnouncement)

    // Dispatch the event, which triggers the event listener in the MetaMask wallet.
    window.dispatchEvent(new Event("eip6963:requestProvider"))

    // Return a function that removes the event listener.
    return () =>
      window.removeEventListener("eip6963:announceProvider", onAnnouncement)
  },
}
```

Also, add a file `useSyncProviders.ts` with the following code to the `hooks` directory:

```ts title="hooks/useSyncProviders.ts"
import { useSyncExternalStore } from "react"
import { store } from "./store"

export const useSyncProviders = () =>
  useSyncExternalStore(store.subscribe, store.value, store.value)
```

This hook allows you to subscribe to MetaMask events, read updated values, and update components.
It uses the `store.value` and `store.subscribe` methods defined in the `store.ts` hook.

#### 6. Create utility functions

Create a `src/utils` directory and add a file `index.ts` with the following code:

```ts title="index.ts"
export const formatBalance = (rawBalance: string) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2)
  return balance
}

export const formatChainAsNum = (chainIdHex: string) => {
  const chainIdNum = parseInt(chainIdHex)
  return chainIdNum
}

export const formatAddress = (addr: string) => {
  const upperAfterLastTwo = addr.slice(0, 2) + addr.slice(2)
  return `${upperAfterLastTwo.substring(0, 5)}...${upperAfterLastTwo.substring(39)}`
}
```

This is a good place to store utility functions that you might need to reuse throughout your dapp.
This example only uses the `formatAddress` function, but the others might be useful for other applications.

#### Example

See the [React TypeScript example](https://github.com/MetaMask/vite-react-ts-eip-6963) for more information.
You can clone the repository and run the example locally using `npm i && npm run dev`.

### Next steps

After connecting to MetaMask directly, you can:

- [Detect, add, and switch networks](/wallet/how-to/manage-networks).
- [Send transactions](../how-to/send-transactions/index.md).
- [Sign data](../how-to/sign-data/index.md).
- [Display tokens, contract methods, and icons in MetaMask](/wallet/how-to/display).
