---
description: JavaScript + Wagmi (recommended)
toc_max_heading_level: 2
---

# JavaScript + Wagmi (recommended)

Get started with MetaMask SDK in a JavaScript and Wagmi dapp.

You can [use the quickstart template](#set-up-using-a-template), which automatically sets up
the SDK with a [Next.js](https://nextjs.org/) and [Wagmi](https://wagmi.sh/) dapp.
You can also [manually set up the SDK](#set-up-manually) in an existing dapp.

<br/>

<div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
    <div style={{ flex: '2' }}>
        <a href="https://metamask-sdk-examples-relink.vercel.app/" target="_blank">
            <img src={require("../_assets/quickstart.jpg").default} alt="Quickstart" style={{border: '1px solid #DCDCDC', width: '100%'}} />
        </a>
    </div>
    <div style={{ flex: '3' }}>
        <h3>Features</h3>
        <ul>
            <li><strong>Wallet connection</strong> - Connect to the MetaMask wallet seamlessly.</li>
            <li><strong>Network switching</strong> - Switch between Ethereum networks like Linea Sepolia, Linea, and Mainnet.</li>
            <li><strong>Interactive UI</strong> - Responsive design with interactive cards guiding users.</li>
            <li><strong>Modular components</strong> - Easy-to-understand and customizable components.</li>
        </ul>
    </div>
</div>

## Set up using a template

1. Download the template from the
    <a href="https://github.com/metamask/metamask-sdk-examples" target="_blank">SDK examples repository</a>:

    ```bash
    git clone https://github.com/metamask/metamask-sdk-examples.git
    ```

2. Navigate into the quickstart example:

    ```bash
    cd metamask-sdk-examples/examples/quickstart/
    ```

3. Install dependencies:

    ```bash
    pnpm install
    ```

4. Run the project:

    ```bash
    pnpm dev
    ```

You've successfully set up MetaMask SDK with Wagmi.
You can now [add your own functionality](#add-your-own-functionality).

## Set up manually

### 1. Install the SDK

Install MetaMask SDK along with its peer dependencies to an existing React project:

```bash
pnpm install @metamask/sdk wagmi viem@2.x @tanstack/react-query
```

### 2. Import required dependencies

In the root of your project, import the required dependencies:

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, WagmiProvider, createConfig } from "wagmi";
import { mainnet, linea, lineaSepolia } from "wagmi/chains";
import { metaMask } from "wagmi/connectors";
```

### 3. Configure your project

Set up your configuration with the desired chains and connectors.
For example:

```jsx
const config = createConfig({
  ssr: true, // Make sure to enable this for server-side rendering (SSR) applications.
  chains: [mainnet, linea, lineaSepolia],
  connectors: [metaMask()],
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

### 5. Add the connect button

Add the wallet connect and disconnect buttons to your application:

```jsx
import { useAccount, useConnect, useDisconnect } from "wagmi"

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

Once you've added the connect button, you can test your dapp by running `npm run dev` or `pnpm run dev` or `yarn dev`.
It should work with the [MetaMask browser extension](https://metamask.io/download/) installed 
or [MetaMask Mobile](https://metamask.io/download/).

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
    [mainnet.id]: http("https://mainnet.infura.io/v3/<YOUR-API-KEY>"),
    [sepolia.id]: http("https://sepolia.infura.io/v3/<YOUR-API-KEY>"),
  },
});
```

Sign up to [MetaMask Developer](https://developer.metamask.io/) for a free account and get your API key.

## Add your own functionality

After completing the basic setup, you can follow these guides to add your own functionality:

- [Authenticate users](../guides/authenticate-users.md)
- [Manage networks](../guides/manage-networks.md)
- [Handle transactions](../guides/handle-transactions.md)
- [Interact with smart contracts](../guides/interact-with-contracts.md)

## More examples

See the [`metamask-sdk-examples`](https://github.com/metamask/metamask-sdk-examples) GitHub
repository for more examples.
