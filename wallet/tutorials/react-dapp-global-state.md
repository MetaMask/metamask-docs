---
description: Create a multi-component React dapp with global state using EIP-6963.
toc_max_heading_level: 4
sidebar_position: 2
---

# Create a React dapp with global state

This tutorial walks you through integrating a React dapp with MetaMask.
The dapp has multiple components, and requires managing state globally.
You'll use the [Vite](https://v3.vitejs.dev/guide) build tool with React and TypeScript to create
the dapp.

:::tip
We recommend first completing the [creating a React dapp with local state](react-dapp-local-state.md) tutorial, which contains important information and introduces [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963. If you skip the first tutorial, ensure you review [wallet interoperability](../concepts/wallet-interoperability.md) documentation to learn about multiple injected wallet providers.
:::

The [previous tutorial](react-dapp-local-state.md) walks you through creating a dapp that uses EIP-6963. It demonstrates how to iterate over all discovered providers, connect to the selected wallet, and remember the selection, all within a single component.

In real world use cases, a dapp usually shares global state across many components.

In this tutorial, the state is put into a [React Context](https://react.dev/reference/react/useContext) component, creating a [global state](https://react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-sharing-logic-between-components)
that allows other components and UI elements to benefit from its data and functions. 
This process involves re-evaluating the synchronization of the wallet state and ensuring the persistence of the selected wallet using localStorage. 
This ensuers that the last connected wallet state remains intact even after a page refresh.

Finally, this tutorial addresses the edge case where a browser wallet may be disabled or uninstalled between refreshes. 
A disconnect function is added to reset the state and use [`wallet_revokePermissions`](/wallet/reference/wallet_revokePermissions) to properly disconnect from MetaMask.

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

This project takes a fresh approach to its structure, the code or last known state from previous tutorials are not used. Instead, this tutorial walks through steps to break the single component structure into multiple components.

The previous tutorial minimized steps to discover and connect to wallets, this tutorial prepares for more advanced, real-world scenarios.

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

This displays a `localhost` URL in your terminal, where you can view the dapp in your browser.

:::note tip
If you are using VS Code, you can run the `code .` command to open the project.

If the development server stops, you can use the `npx vite` or
`npm run dev` command to re-run your project. 
:::

After you open the ViteJS React project in your editor of choice, add three directories within the `src` directory. 
Create a `src/components`, `src/hooks` and `src/utils` directory in the root of the project, using the followinng commands:

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

The components, hooks, and utility files are required for the project. 
Each file includes the necessary code to meet the project goals: creating multiple UI components, establishing shared state with a context provider, and implementing custom hooks and helper functions. 

#### Styling

Add the following CSS to `SelectedWallet.module.css`, `WalletError.module.css`, and `WalletList.module.css`:

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

```css title="WalletError.module.css"
.walletError {
  margin-top: 1em;
  border-radius: 0.5em;
  height: 36px;
  padding: 16px;
  color: #EFEFEF;
  background-color: transparent;
  user-select: none; /* Standard syntax */
}
```

```css title="WalletList.module.css"
.walletList {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

Replace the existing code in `src/index.css` with the following:

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

#### Project structure

You now have some basic global and component level styling for your application.
The directory tree in the dapp's `/src` directory should look similar to the following:

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
│   │   ├── Eip6963Provider.tsx
│   │   └── useEip6963Provider.tsx
│   ├── utils
│   │   └── index.tsx
├── App.css
├── App.tsx
├── index.css
├── main.tsx
├── vite-env.d.ts
```

### 2. Import EIP-6963 interfaces

Your dapp will connect to MetaMask using the mechanism introduced by
[EIP-6963](https://eips.ethereum.org/EIPS/eip-6963).

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

### 2. Build the context provider

This will be the most involved coding section of the tutorial as we understand what types, interfaces, functions, hooks, events, effects and RPC calls will be needed to create our React Context component that will wrap our application providing all components access to the state and functions required to modify the state and perform connection and disconnection to the discovered wallets.


### 3. Wrap components with the context provider


### 4. Create the components that discover, list and connect to installed wallets


### 5. Display MetaMask data


### 6. Show MetaMask errors in the footer


## Conclusion

You can see the [source code](https://github.com/MetaMask/react-dapp-tutorial/tree/global-state-final)
for the final state of this dapp tutorial.
