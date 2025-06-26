---
description: Quickstart guide for using the SDK with a JavaScript and Wagmi dapp.
toc_max_heading_level: 2
sidebar_label: JavaScript + Wagmi (recommended)
keywords: [connect, MetaMask, JavaScript, Wagmi, SDK, dapp]
---

# Connect to MetaMask using JavaScript + Wagmi

Get started with MetaMask SDK in a JavaScript and Wagmi dapp.
You can set up the SDK in the following ways:

- [SDK CLI](#set-up-using-the-cli) - Use the CLI to scaffold a Next.js and Wagmi dapp.
- [Quickstart template](#set-up-using-a-template) - Clone the template to set up a Next.js and Wagmi dapp.
- [Manual setup](#set-up-manually) - Set up the SDK in an existing dapp.

<details>
<summary>Project structure</summary>
<div>
The project you set up using the CLI or template has the following structure:

```text
├── app/
│   ├── providers.tsx # Main providers configuration
│   └── layout.tsx    # Root layout with providers
├── components/
│   ├── Navbar.tsx    # Navigation with wallet connection
│   └── Hero.tsx      # Hero section with wallet status
├── wagmi.config.ts   # Wagmi configuration
├── next.config.ts    # Next.js configuration
└── package.json      # Project dependencies
```
</div>
</details>

<p align="center">
  <a href="https://metamask-sdk-examples.vercel.app/" target="_blank">
    <img src={require("../_assets/quickstart.jpg").default} alt="Quickstart" width="600px" />
  </a>
</p>


## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed.
  The examples in this quickstart use [pnpm](https://pnpm.io/installation).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.

## Set up using the CLI

1. Run the CLI command, replacing `<project-name>` with your project name:

    ```bash
    npx @consensys/create-web3-app <project-name>
    ```

2. Select the Next.js Quickstart template:

    ```bash
    ? Please select the template you want to use:
    ❯ Next.js Quickstart (MetaMask SDK Example) (Recommended) 
      MetaMask <-> Dynamic Quickstart
    ```

3. Select your preferred blockchain tooling if your project requires it:

    ```bash
    ? Would you like to include blockchain tooling? (Use arrow keys)
    ❯ HardHat 
      Foundry 
      None 
    ```

4. Select your preferred package manager.
    We recommend pnpm for speed and efficiency:

    ```bash
    ? Please select the package manager you want to use: 
      Yarn 
      NPM 
    ❯ pnpm 
    ```

5. The CLI will take a few minutes to set up your project.
    Once complete, you can run the project using the following command in `<project-name>/packages/site`:

    ```bash
    pnpm run dev
    ```

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
    [mainnet.id]: http("https://mainnet.infura.io/v3/<YOUR-API-KEY>"),
    [sepolia.id]: http("https://sepolia.infura.io/v3/<YOUR-API-KEY>"),
  },
});
```

Sign up to [MetaMask Developer](https://developer.metamask.io/) for a free account and get your API key.

## Next steps

After completing the basic setup, you can follow these guides to add your own functionality:

- [Authenticate users](../guides/authenticate-users.md)
- [Manage networks](../guides/manage-networks.md)
- [Handle transactions](../guides/handle-transactions.md)
- [Interact with smart contracts](../guides/interact-with-contracts.md)
