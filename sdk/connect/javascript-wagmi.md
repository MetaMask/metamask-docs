---
description: Quickstart guide for using the MetaMask SDK with a JavaScript and Wagmi dapp.
toc_max_heading_level: 2
sidebar_label: JavaScript + Wagmi (recommended)
keywords: [connect, MetaMask, JavaScript, Wagmi, SDK, dapp, Wallet SDK]
---

# Connect to MetaMask using JavaScript + Wagmi

Get started with [MetaMask SDK](https://github.com/MetaMask/metamask-sdk) in a JavaScript and Wagmi dapp.
You can set up the SDK in the following ways:

- [Quickstart template](#set-up-using-a-template) - Clone the template to set up a Next.js and Wagmi dapp.
- [Manual setup](#set-up-manually) - Set up the SDK in an existing dapp.

<p align="center">
  <a href="https://metamask-wagmi-demo.vercel.app/" target="_blank">
    <img src={require("../_assets/quickstart.jpg").default} alt="Quickstart" width="600px" />
  </a>
</p>

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.

## Set up using a template

1. Download the [MetaMask SDK Wagmi template](https://github.com/MetaMask/metamask-sdk-examples/tree/main/quickstart/wagmi):

   ```bash
   npx degit MetaMask/metamask-sdk-examples/quickstart/wagmi metamask-wagmi
   ```

   > `degit` is a tool that enables cloning only the directory structure from a GitHub repository, without retrieving the entire repository.

2. Navigate into the repository:

   ```bash
   cd metamask-wagmi
   ```

    <details>
    <summary>GitHub clone instead of degit?</summary>
    <div>
    Clone the MetaMask SDK examples repository and navigate into the `quickstart/wagmi` directory:

   ```bash
   git clone https://github.com/MetaMask/metamask-sdk-examples
   cd metamask-sdk-examples/quickstart/wagmi
   ```

   > Note: _this will download the entire repository._

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
npm install @metamask/sdk wagmi viem@2.x @tanstack/react-query
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
For example:

```jsx
const config = createConfig({
  ssr: true, // Make sure to enable this for server-side rendering (SSR) applications.
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

You can configure your RPC endpoints in the Wagmi configuration as follows:

```jsx
const config = createConfig({
  // ... other config options
  transports: {
    [mainnet.id]: http('https://mainnet.infura.io/v3/<YOUR-API-KEY>'),
    [sepolia.id]: http('https://sepolia.infura.io/v3/<YOUR-API-KEY>'),
  },
})
```

Sign up to [MetaMask Developer](https://developer.metamask.io/) for a free account and get your API key.

## Next steps

After completing the basic setup, you can follow these guides to add your own functionality:

- [Authenticate users](../guides/authenticate-users.md)
- [Manage networks](../guides/manage-networks.md)
- [Handle transactions](../guides/handle-transactions.md)
- [Interact with smart contracts](../guides/interact-with-contracts.md)
