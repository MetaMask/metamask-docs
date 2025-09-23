---
description: Quickstart guide for using the MetaMask SDK with a JavaScript and RainbowKit dapp.
toc_max_heading_level: 2
sidebar_label: JavaScript + RainbowKit
keywords: [connect, MetaMask, JavaScript, RainbowKit, SDK, dapp, Wallet SDK]
---

# Connect to MetaMask using JavaScript + RainbowKit

Get started with MetaMask SDK in a JavaScript and RainbowKit dapp.
You can [download the quickstart template](#set-up-using-a-template) or [manually set up the SDK](#set-up-manually) in an existing dapp.

<p align="center">
  <a href="https://metamask-rainbowkit-demo.vercel.app/" target="_blank">
    <img src={require("../_assets/quickstart.jpg").default} alt="Quickstart" width="600px" />
  </a>
</p>

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.

## Set up using a template

1. Download the [MetaMask SDK RainbowKit template](https://github.com/MetaMask/metamask-sdk-examples/tree/main/quickstarts/rainbowkit):

   ```bash
   npx degit MetaMask/metamask-sdk-examples/quickstarts/rainbowkit metamask-rainbowkit
   ```

2. Navigate into the repository:

   ```bash
   cd metamask-rainbowkit
   ```

    <details>
    <summary>Degit vs. Git clone</summary>
    <div>

   `degit` is a tool that enables cloning only the directory structure from a GitHub repository, without retrieving the entire repository.

   Alternatively, you can use `git clone`, which will download the entire repository.
   To do so, clone the MetaMask SDK examples repository and navigate into the `quickstarts/rainbowkit` directory:

   ```bash
   git clone https://github.com/MetaMask/metamask-sdk-examples
   cd metamask-sdk-examples/quickstarts/rainbowkit
   ```

    </div>
    </details>

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Run the project:

   ```bash
   pnpm dev
   ```

## Set up manually

### 1. Install the SDK

Install MetaMask SDK along with its peer dependencies to an existing React project:

```bash npm2yarn
npm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
```

### 2. Import required dependencies

In the root of your project, import the required RainbowKit, Wagmi and TanStack Query dependencies:

```jsx
import "@rainbow-me/rainbowkit/styles.css"
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit"
import { WagmiProvider } from "wagmi"
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets"
import { mainnet, linea, sepolia, lineaSepolia } from "wagmi/chains"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
```

### 3. Configure your project

Set up your configuration with the desired chains and wallets.

For example:

```jsx
const config = getDefaultConfig({
  appName: "MetaMask SDK RainbowKit Quickstart",
  projectId: "WALLETCONNECT_PROJECT_ID",
  chains: [mainnet, linea, sepolia, lineaSepolia],
  wallets: [
    {
      groupName: "Preferred",
      wallets: [metaMaskWallet],
    },
  ],
  ssr: false, // true if your dApp uses SSR
})
```

> **Note**: Don't forget to set the `projectId` to your WalletConnect project ID.

### 4. Set up providers

Wrap your application with the `RainbowKitProvider`, `WagmiProvider`, and `QueryClientProvider` providers:

```jsx
const queryClient = new QueryClient()

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

### 5. Add the connect button

Then, in your app, import and render the `ConnectButton` component.

```jsx
import { ConnectButton } from "@rainbow-me/rainbowkit"

function App() {
  return <ConnectButton />
}

export default App
```

Once you've added the connect button, you can test your dapp by running `pnpm run dev`.

## Live example

<iframe className="mt-6" width="100%" height="600px" frameBorder="0" src="https://stackblitz.com/github/MetaMask/metamask-sdk-examples/tree/main/quickstarts/rainbowkit?ctl=1&embed=1&file=src%2Fmain.tsx&hideNavigation=1"></iframe>
