---
description: Quickstart guide for using MM Connect with a JavaScript and RainbowKit dapp.
toc_max_heading_level: 3
sidebar_label: RainbowKit
keywords: [connect, MetaMask, JavaScript, RainbowKit, SDK, dapp, Wallet SDK]
---

# Connect to MetaMask using JavaScript + RainbowKit

Get started with MM Connect in a JavaScript and RainbowKit dapp.
You can [download the quickstart template](#set-up-using-a-template) or [manually set up MM Connect](#set-up-manually) in an existing dapp.

<p align="center">
  <a href="https://metamask-rainbowkit-demo.vercel.app/" target="_blank">
    <img src={require("../_assets/quickstart-rainbowkit.png").default} alt="Quickstart" width="600px" class="appScreen" />
  </a>
</p>

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.
- A WalletConnect project ID from the [Reown dashboard](https://dashboard.reown.com/sign-in).

## Set up using a template

1. Download the [MM Connect RainbowKit template](https://github.com/MetaMask/metamask-sdk-examples/tree/main/quickstarts/rainbowkit):

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
   To do so, clone the MM Connect examples repository and navigate into the `quickstarts/rainbowkit` directory:

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

4. Create a `.env.local` file:

   ```bash
   touch .env.local
   ```

5. In `.env.local`, add a `VITE_WALLETCONNECT_PROJECT_ID` environment variable, replacing `<YOUR-PROJECT-ID>` with your WalletConnect project ID:

   ```text title=".env.local"
   VITE_WALLETCONNECT_PROJECT_ID=<YOUR-PROJECT-ID>
   ```

6. Run the project:

   ```bash
   pnpm dev
   ```

## Set up manually

### 1. Install MM Connect

Install MM Connect along with its peer dependencies to an existing React project:

```bash npm2yarn
npm install @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
```

### 2. Import required dependencies

In the root of your project, import the required RainbowKit, Wagmi, and TanStack Query dependencies:

```jsx
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { metaMaskWallet } from '@rainbow-me/rainbowkit/wallets'
import { mainnet, linea, sepolia, lineaSepolia } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
```

### 3. Configure your project

Set up your configuration with the desired chains and wallets.
In the following example, replace `<YOUR-PROJECT-ID>` with your WalletConnect project ID:

```jsx
const config = getDefaultConfig({
  appName: 'MM Connect RainbowKit Quickstart',
  projectId: '<YOUR-PROJECT-ID>',
  chains: [mainnet, linea, sepolia, lineaSepolia],
  wallets: [
    {
      groupName: 'Preferred',
      wallets: [metaMaskWallet],
    },
  ],
  ssr: false, // true if your dapp uses server-side rendering.
})
```

### 4. Set up providers

Wrap your application with the `WagmiProvider`, `QueryClientProvider`, and `RainbowKitProvider` providers:

```jsx
const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
```

### 5. Add the connect button

Import and render the `ConnectButton` component:

```jsx
import { ConnectButton } from '@rainbow-me/rainbowkit'

function App() {
  return <ConnectButton />
}

export default App
```

You can now test your dapp by running `pnpm run dev`.

## Live example

<iframe className="mt-6" width="100%" height="600px" frameBorder="0" src="https://stackblitz.com/github/MetaMask/metamask-sdk-examples/tree/main/quickstarts/rainbowkit?ctl=1&embed=1&file=src%2Fmain.tsx&hideNavigation=1"></iframe>
