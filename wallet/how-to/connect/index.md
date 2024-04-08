---
description: Connect to MetaMask via EIP-6963.
sidebar_position: 1
---

# Connect to MetaMask

You can connect your dapp to users' MetaMask wallets by detecting MetaMask in their browsers and
connecting to their accounts.

This page describes how to connect to MetaMask using the wallet detection mechanism introduced by
[EIP-6963](https://eips.ethereum.org/EIPS/eip-6963).

EIP-6963 enables [wallet interoperability](../../concepts/wallet-interoperability.md), and shifts
dapps from relying solely on [`window.ethereum`](detect-metamask.md) for wallet detection.
If a user has multiple wallet browser extensions installed, you can detect multiple wallets and
connect to each one without conflict.

You can connect to MetaMask [using third-party libraries](#use-third-party-libraries) or
[directly using the Wallet API](#connect-to-metamask-directly).

## Use third-party libraries

You can connect to MetaMask using the following third-party libraries that support EIP-6963:

- [Wagmi 2+](https://wagmi.sh)
- [Web3Modal 3+](https://docs.walletconnect.com/web3modal/about)
- [MIPD Store](https://github.com/wevm/mipd)
- [RainbowKit](https://www.rainbowkit.com)
- [Web3Onboard](https://onboard.blocknative.com)

## Connect to MetaMask directly

To connect to MetaMask directly, implement support for EIP-6963 in JavaScript/TypeScript and use the
[Wallet API's](../../concepts/wallet-api.md) `eth_requestAccounts` RPC endpoint.  

The following steps describe how to connect to MetaMask from a React dapp.

### Prerequisites

- Review and understand the [EIP-6963 interfaces](../../concepts/wallet-interoperability.md#eip-6963-interfaces).
- [Set up a Vite Vanilla TypeScript project](https://v3.vitejs.dev/guide/#scaffolding-your-first-vite-project).

```bash title="vite-env.d.ts"
npm create vite@latest vite-ts-6963 -- --template vanilla-ts
```

### Steps

#### 1. Set up the project

In a Vite project, update `src/vite-env.d.ts` with the EIP-6963 interfaces:

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

:::note
In addition to the EIP-6963 interfaces, you need the `EIP1193Provider` interface (defined by
[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193)), which is the foundational structure for
Ethereum wallet providers.

This `EIP1193Provider` interface represents the essential properties and methods for interacting with dapps.
:::

#### 2. Update Main.ts 

Create a `div` to manipulate with our JavaScript

```tsx title="main.ts"
import './style.css'
import { listProviders } from './providers.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="providerButtons"></div>
  </div>
`

listProviders(document.querySelector<HTMLDivElement>('#providerButtons')!)
```

The `querySelector` is used to select an element with the id of `app` and set its innerHTML 
to include a div (or place) that we can inject our provider buttons into after discovering which wallet providers exits.

The `listProviders` function is what we will create next and we need to pass an argument which represents the div element
This function will be responsible for connecting to the specific provider using `eth_requestAccounts`
then using appendChild to add each button to the element within the div with the id of `providerButtons`

#### 3. Our JavaScript/TypeScript Functions

Create a TypeScript file in the `src/` directory named `providers.ts`

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
    // Event handler function: second argument called to perform work when the event occurs. 
    (event: EIP6963AnnounceProviderEvent) => {
      const button = document.createElement('button');

      // use string interpolation to set the button's innerHTML
      button.innerHTML = `
        <img src="${event.detail.info.icon}" alt="${event.detail.info.name}" />
        <div>${event.detail.info.name}</div>`;
      
      // Add an onClick event listener to the button that calls the `connectWithProvider` function
      button.onclick = () => connectWithProvider(event.detail);
      element.appendChild(button);
    }
  );

  /*
    dispatch custom event on `window` object used to notify other parts of the dapp that a provider 
    is being requested, and any event listeners set up to listen for this event, respond accordingly.
  */
  window.dispatchEvent(new Event("eip6963:requestProvider"));
}
```

The `connectWithProvider` function is responsible for connecting to the provider using `eth_requestAccounts`.
The `wallet` object is passed as an argument to the function indicating the detail of its type as the argument type.

In the `listProviders` function we've opted for a simplified approach (over mapping and joining an entire block of HTML).
And we are directly passing the `event.detail` object to the `connectWithProvider` function when a provider is announced.

The `connectWithProvider` is then called when the button is clicked.

This method seems to be more straightforward and less error-prone as it directly passes the required data without 
attempting to stringify data objects which led to circular reference errors due to the object's structure. 

### Example

See the [EIP-6963 TypeScript implementation](https://github.com/MetaMask/vite-vanilla-ts-eip-6963)
for cloning a runnable example.

### Next steps

After connecting to MetaMask directly, you can:

- [Detect, add, and switch networks](../manage-networks).
- [Send transactions](../send-transactions.md).
- [Sign data](../sign-data/index.md).
- [Display tokens, contract methods, and icons in MetaMask](../display).
