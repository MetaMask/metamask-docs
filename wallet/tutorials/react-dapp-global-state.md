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
We recommend first [creating a React dapp with local state](react-dapp-local-state.md) as it contains important information and introductions to [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963), however; if you skip the first tutorial, you may still want to check out our [wallet interoperability](../concepts/wallet-interoperability.md) page to get up to speed on discovering multiple injected wallet providers.
:::

The [previous tutorial](react-dapp-local-state.md) walks you through creating a dapp that uses EIP-6963: Multi Injected Provider Discovery, iterates over all found providers and connects and remembers the selected wallet, all within a single component.
In real world use cases, a dapp will need to share global state across many components.

In this tutorial, the state will be lifted up and put into a [React Context](https://react.dev/reference/react/useContext) component, creating a [global state](https://react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-sharing-logic-between-components)
ensuring other components and UI can benefit from it's data and functions. This will involve rethinking how we deal with synchronization of the wallet state and persisting the selected wallet in the case of a page refresh with the help of localstorage, ensuring that the last connected wallet state does not get wiped out.

Finally, we'll deal with an edge case where a browser wallet could be disabled or uninstalled between refreshes and add a disconnect function that resets the state and uses [`wallet_revokePermissions`](/wallet/reference/wallet_revokePermissions) to correctly disconnect from MetaMask.

:::info Project source code
You can view the [dapp source code on GitHub](https://github.com/MetaMask/vite-react-global-tutorial).
:::

## Prerequisites

- [Node.js](https://nodejs.org/) version 18+
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 9+
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- The [MetaMask extension](https://metamask.io/download) installed
- Basic knowledge of TypeScript, React, React Context and React Hooks
- Complete the [Creating a React dapp with local state](react-dapp-local-state.md)

## Steps

### 1. Set up the project

Since we will be taking a fresh approach to the structure of this project, we will not be using the previous tutorials code or last known state. Instead, I will walk you through a few steps to break the single component structure into multiple components.

Where the previous tutorial took the least amount of steps possible to discover and connect to wallets, this tutorial will prepare you for building in a more advanced and real world situation.

Let's start by creating a new ViteJS project and adding the necessary directory structure we will need.

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
1. If you use VS Code, you can run the command `code .` to open the project.
2. If the development server has been stopped, you can re-run your project using the `npx vite` or
`npm run dev` command.
:::

Once you have opened up the ViteJS React project in your editor of choice, we will want to add three directories within the `src` directory. You can use your code editor to create a `src/components`, `src/hooks` and `src/utils` directory or (if on a mac) use the command below in the terminal at the root of the project:

```bash
mkdir src/components && mkdir src/hooks && mkdir src/utils
```

Next we will need to create the components that will list the wallets installed, show the connected wallet information and a component for our errors as well as a CSS module for each component.

Create the following files inside `src/components`:

- `SelectedWallet.module.css`
- `SelectedWallet.tsx`
- `WalletError.module.css`
- `WalletError.tsx`
- `WalletList.module.css`
- `WalletList.tsx`

Create the following files inside `src/hooks`:

- `Eip6963Provider.tsx`
- `useEip6963Provider.tsx`

Create the following files inside `src/utils`:

- `index.ts`

These are all of the components, hooks, and utility files we will need for our project. As we add code to each one, we will go over their purpose and the code needed to meet our goals: multiple components for UI, shared state (context provider), custom hooks and and helper functions.

#### Styling

Since our tutorial's scope does not really involve learning about CSS and styling, we are keeping it simple, so I will just flat out give you the CSS we need for each CSS file in out project, let's get that out of the way:

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

And finally, the `src/index.css` needs a few changes, just replace the existing code with:

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

We now have some basic global and component level styling for our application.
Check your directory structure in comparison to the The following directory tree from within the dapp's `/src` directory:

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

### 2. Build the context provider


### 3. Wrap components with the context provider


### 4. Create the components that discover, list and connect to installed wallets


### 5. Display MetaMask data


### 6. Show MetaMask errors in the footer


## Conclusion

You can see the [source code](https://github.com/MetaMask/react-dapp-tutorial/tree/global-state-final)
for the final state of this dapp tutorial.
