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
In real world use cases, a dapp might need to respond to state changes in different components.

In this tutorial, you'll move that state and its relevant functions into
[React context](https://react.dev/reference/react/useContext), creating a
[global state](https://react.dev/learn/reusing-logic-with-custom-hooks#custom-hooks-sharing-logic-between-components)
so other components and UI can affect it and get MetaMask wallet updates.

This tutorial uses multiple components and a more complex file structure. We'll move the logic from our one component into many components and rethink how we deal with synchronization of the wallet state.

We'll solve the issue where the dapp is refreshed and we lose track of the last connected wallet and add a disconnect function that resets the state and uses [`wallet_revokePermissions`](/wallet/reference/wallet_revokePermissions) to correctly disconnect from MetaMask.

Finally, we'll deal with an edge case where a browser wallet could be disabled or uninstalled between refreshes.

:::info Project source code
You can view the [dapp source code on GitHub](https://github.com/MetaMask/vite-react-global-tutorial).
:::

## Prerequisites

- [Node.js](https://nodejs.org/) version 18+
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) version 9+
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- The [MetaMask extension](https://metamask.io/download) installed
- Basic knowledge of TypeScript, React, React Context and React Hooks
- Have read [Creating a React dapp with local state](react-dapp-local-state.md)

## Steps

### 1. Set up the project

Since we will be taking a fresh approach to the structure of this project, we will not be using the previous tutorials code. Instead, I will walk you through a few steps of organizing the original component that we built into several new components and ensure that code can be reused.

For this reason there will be some familiar code from our previous tutorials single component, but our hooks and supporting files will be rewritten from scratch with global state (React Context) in mind. Where the previous tutorial took the least amount of steps possible to discover and connect to wallets, this tutorial will prepare you for building in a more advanced way.

```bash
git clone https://github.com/MetaMask/react-dapp-tutorial.git
```

Checkout the `global-state-start` branch:

```bash
cd react-dapp-tutorial && git checkout global-state-start
```

Install the node module dependencies:

```bash
npm install
```

Open the project in a text editor.

:::note tip
If you use VS Code, you can run the command `code .` to open the project.
:::

This is a working React dapp, but it's wiped out the code from the previous tutorial's
[`App.tsx`](https://github.com/MetaMask/react-dapp-tutorial/blob/local-state-final/src/App.tsx) file.

Run the dapp using the command `npx vite`.
The starting point looks like the following:

![](../assets/tutorials/react-dapp/pt2-01.png)

There are three components, each with static text: navigation (with a logo area and connect button),
display (main content area), and footer.
You'll use the footer to show any MetaMask errors.

Before you start, comment out or remove the `border` CSS selector, as it's only used as a visual aid.
Remove the following line from each component style sheet:

```css title="Display.module.css | MetaMaskError.module.css | Navigation.module.css"
// border: 1px solid rgb(...);
```

#### Styling

#### Optional: Linting with ESLint

This dapp uses a standard ESLint configuration to keep the code consistent.
There are two ways to use ESLint:

1. Run `npm run lint` or `npm run lint:fix` from the command line.
    The former displays all the linting errors, and the latter updates your code to fix linting
    errors where possible.
2. Set up your IDE to show linting errors and automatically fix them on save.
    For example, in VS Code, you can create or update the file at `.vscode/settings.json` in the
    root of the project with the following settings:

    ```json title="settings.json"
    {
      "eslint.format.enable": true,
      "eslint.packageManager": "npm",
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
      },
      "eslint.codeActionsOnSave.mode": "all"
    }
    ```

#### Project structure

The following is a tree representation of the dapp's `/src` directory:

```text
├── src
│   ├── assets
│   ├── components
│   │   ├──  SelectedWallet.module.css
│   │   ├──  SelectedWallet.tsx
│   │   ├──  WalletError.module.css
│   │   ├──  WalletError.tsx
│   │   ├──  WalletList.module.css
│   │   └── WalletList.tsx
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

Instead of a single component, there's a `src/components` directory with UI and functionality
distributed into multiple components.
You'll modify the dapp's state in this directory and make it available to the rest of the dapp using
a [context provider](https://react.dev/reference/react/useContext).
This provider will sit in the `src/App.tsx` file and wrap it's child components.

The child components will have access to the global state and the functions that modify the global state.
This ensures that any change to selected wallet is remembered and that any component could subscribe to those state changes.

The following graphic shows how the context provider wraps its child components, providing access to
the state modifier functions and the actual state itself.
Since React uses a one-way data flow, any change to the data gets re-rendered in those components automatically.

![](../assets/tutorials/react-dapp/pt2-02.png)

### 2. Build the context provider


### 3. Wrap components with the context provider


### 4. Create the components that discover, list and connect to installed wallets


### 5. Display MetaMask data


### 6. Show MetaMask errors in the footer


## Conclusion

You can see the [source code](https://github.com/MetaMask/react-dapp-tutorial/tree/global-state-final)
for the final state of this dapp tutorial.
