---
description: Quickstart guide for using MM Connect with a JavaScript and Wagmi dapp.
toc_max_heading_level: 3
sidebar_label: Wagmi
keywords: [connect, MetaMask, JavaScript, Wagmi, SDK, dapp, Wallet SDK]
---

# Connect to MetaMask using JavaScript + Wagmi

Get started with MM Connect in a JavaScript and Wagmi dapp.
You can [download the quickstart template](#set-up-using-a-template) or [manually set up the SDK](#set-up-manually) in an existing dapp.

<p align="center">
  <!-- a href="https://metamask-wagmi-demo.vercel.app/" target="_blank" -->
    <img src={require("../../_assets/quickstart.jpg").default} alt="Quickstart" width="600px" class="appScreen" />
  <!-- /a -->
</p>

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.

## Set up using a template

1. Download the [MM Connect Wagmi template](https://github.com/MetaMask/metamask-sdk-examples/tree/main/quickstarts/wagmi):

   ```bash
   npx degit MetaMask/metamask-sdk-examples/quickstarts/wagmi metamask-wagmi
   ```

2. Navigate into the repository:

   ```bash
   cd metamask-wagmi
   ```

    <details>
    <summary>Degit vs. Git clone</summary>
    <div>

    `degit` is a tool that enables cloning only the directory structure from a GitHub repository, without retrieving the entire repository.

    Alternatively, you can use `git clone`, which will download the entire repository.
    To do so, clone the MM Connect examples repository and navigate into the `quickstarts/wagmi` directory:

    ```bash
    git clone https://github.com/MetaMask/metamask-sdk-examples
    cd metamask-sdk-examples/quickstarts/wagmi
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

### 1. Install MM Connect

Install MM Connect along with its peer dependencies to an existing React project:

```bash npm2yarn
npm install @metamask/connect/evm wagmi viem@2.x @tanstack/react-query
```

### 2. Import required dependencies

In the root of your project, import the required dependencies:

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, WagmiProvider, createConfig } from 'wagmi'
import { mainnet, linea, lineaSepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'
```

### 3. Configure your project

Set up your configuration with the desired chains and connectors.
In the following example, set the [`infuraAPIKey`](../../../../reference/options.md#infuraapikey) option to your [Infura API key](/developer-tools/dashboard/get-started/create-api) to use for RPC requests:

```jsx
const config = createConfig({
  ssr: true, // Enable this if your dapp uses server-side rendering.
  chains: [mainnet, linea, lineaSepolia],
  connectors: [
    metaMask({
      infuraAPIKey: process.env.NEXT_PUBLIC_INFURA_API_KEY!,
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [linea.id]: http(),
    [lineaSepolia.id]: http(),
  },
});
```

### 4. Set up providers

Wrap your application with the necessary providers:

```jsx
const client = new QueryClient()

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

### 5. Add the connect button

Add the wallet connect and disconnect buttons to your application:

```jsx
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export const ConnectButton = () => {
  const { address } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div>
      {address ? (
        <button onClick={() => disconnect()}>Disconnect</button>
      ) : (
        connectors.map(connector => (
          <button key={connector.uid} onClick={() => connect({ connector })}>
            {connector.name}
          </button>
        ))
      )}
    </div>
  )
}
```

Once you've added the connect button, you can test your dapp by running `pnpm run dev`.

## Production readiness

:::tip
For production deployments, it's important to use reliable RPC providers instead of public nodes.
We recommend using services like [MetaMask Developer](https://developer.metamask.io/) to ensure better reliability and performance.
:::

You can configure your RPC endpoints in the Wagmi configuration as follows, replacing `<YOUR-API-KEY>` with your [Infura API key](/developer-tools/dashboard/get-started/create-api):

```jsx
const config = createConfig({
  // ... other config options
  transports: {
    [mainnet.id]: http('https://mainnet.infura.io/v3/<YOUR-API-KEY>'),
    [sepolia.id]: http('https://sepolia.infura.io/v3/<YOUR-API-KEY>'),
  },
})
```

## Next steps

After completing the basic setup, you can follow these guides to add your own functionality:

- [Manage user accounts](manage-user-accounts.md)
- [Manage networks](manage-networks.md)
- [Send transactions](send-transactions.md)
- [Interact with smart contracts](interact-with-contracts.md)

## Live example

<iframe className="mt-6" width="100%" height="600px" frameBorder="0" src="https://stackblitz.com/github/MetaMask/metamask-sdk-examples/tree/main/quickstarts/wagmi?ctl=1&embed=1&file=wagmi.config.ts&hideNavigation=1"></iframe>
