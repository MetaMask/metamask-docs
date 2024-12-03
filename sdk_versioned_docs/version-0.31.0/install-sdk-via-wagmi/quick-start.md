---
description: Quick start 
---

# Quick start

Get started with MetaMask SDK in your web application.

### Setup via template

Quickly bootstrap a new MetaMask SDK + [wagmi](https://wagmi.sh/) + [Next.js](https://nextjs.org/) project using one of these methods:

Download directly from our examples repository:
```bash
git clone https://github.com/metamask/sdk-examples.git
```

Or bootstrap using our creation tool:
```bash
npx create-mm-sdk-app
# or
pnpm create mm-sdk-app --example https://github.com/metamask/sdk-examples/tree/main/demo-app
# or
yarn create mm-sdk-app --example https://github.com/metamask/sdk-examples/tree/main/demo-app
```

This will guide you through creating a new project directory with all necessary dependencies installed.

### Manual setup

#### Installation

Install MetaMask SDK along with its peer dependencies:

```bash
npm install @metamask/sdk wagmi viem@2.x @tanstack/react-query
```

#### Import required dependencies

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, WagmiProvider, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';
```

#### Configure

Set up your configuration with desired chains and connectors.

```jsx
const config = createConfig({
  ssr: true, // make sure to enable this for server-side rendering (SSR) applications
  chains: [mainnet, sepolia],
  connectors: [metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
```

#### Set up providers

Wrap your application with the necessary providers:

```jsx
const client = new QueryClient();

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

#### Add connect button

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
        connectors.map((connector) => (
          <button key={connector.uid} onClick={() => connect({ connector })}>
            {connector.name}
          </button>
        ))
      )}
    </div>
  )
}
```

Once you've added the connect button, you can test your app by running `npm run dev` or `pnpm run dev` or `yarn dev`.
It should work with the [extension](https://metamask.io/download/) installed or the [mobile app](https://metamask.io/download/).

### Production readiness

For production deployments, it's important to use reliable RPC providers instead of public nodes. We recommend using services like [Infura](https://infura.io/) to ensure better reliability and performance. 

This is how you can configure your RPC endpoints via the Wagmi config:

```jsx
const config = createConfig({
  // ... other config options
  transports: {
    [mainnet.id]: http("https://mainnet.infura.io/v3/YOUR-API-KEY"),
    [sepolia.id]: http("https://sepolia.infura.io/v3/YOUR-API-KEY"),
  },
});
```

Sign up [here](https://infura.io/) to Infura for a free account and get your API key.

### Add your own functionality

Now that you have the basic setup complete, check out these guides to add your own functionality:

- [User authentication](/sdk/guides/user-authentication)
- [Network management](/sdk/guides/manage-networks)
- [Transaction handling](/sdk/guides/handle-transactions)
- [Smart contract interactions](/sdk/guides/interact-with-contracts)
- [Production ready checklist](/sdk/guides/production-ready)

### More examples

Check out our example implementations for various frameworks:

- [Next.js + Wagmi starter](/sdk/examples/nextjs)
- [Remix + Wagmi starter](/sdk/examples/remix)
- [Vite + Wagmi starter](/sdk/examples/vite)
- [Create React App + Wagmi starter](/sdk/examples/create-react-app)
