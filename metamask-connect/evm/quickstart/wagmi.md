---
title: 'Wagmi Integration - MetaMask Connect EVM'
description: Integrate MetaMask Connect EVM into a React dapp using Wagmi hooks like useConnect and useConnection, with the MetaMask connector and wallet connection UI.
toc_max_heading_level: 3
sidebar_label: Wagmi
keywords:
  [
    connect,
    MetaMask,
    JavaScript,
    Wagmi,
    MetaMask Connect,
    dapp,
    connect-evm,
    wagmi connector,
    react hooks,
    useConnect,
    useConnection,
    wallet connector,
    web3 react,
  ]
---

# Connect to EVM - Wagmi quickstart

Get started with MetaMask Connect EVM in a React and Wagmi dapp.
[Download the quickstart template](#set-up-using-a-template) or [manually set up MetaMask Connect EVM](#set-up-manually) in an existing dapp.

:::tip Migrating from @MetaMask/sdk?
If you are upgrading an existing wagmi project that used `@metamask/sdk`, see the
[Wagmi connector migration reference](#migrate-from-metamasksdk) at the bottom of this page
for a parameter mapping table.
:::

<!--
TOD0: Update with new screenshot and link
<p align="center">
  a href="https://metamask-wagmi-demo.vercel.app/" target="_blank"
    <img src={require("../_assets/quickstart.jpg").default} alt="MetaMask Connect EVM with Wagmi dapp interface" width="600px" class="appScreen" />
  /a
</p> -->

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/download) installed in your browser or on mobile.
- An [Infura API key](/developer-tools/dashboard/get-started/create-api) from the MetaMask Developer dashboard.

## Set up using a template

1. Download the [MetaMask Connect Wagmi template](https://github.com/MetaMask/metamask-connect-examples/tree/main/integrations/wagmi):

   ```bash
   npx degit MetaMask/metamask-connect-examples/integrations/wagmi metamask-wagmi
   ```

2. Navigate into the repository:

   ```bash
   cd metamask-wagmi
   ```

    <details>
    <summary>Degit vs. Git clone</summary>
    <div>

   `degit` is a tool that enables cloning only the directory structure from a GitHub repository, without retrieving the entire repository.

   Alternatively, use `git clone` to download the entire repository.
   Clone the MetaMask Connect examples repository and navigate into the `quickstarts/wagmi` directory:

   ```bash
   git clone https://github.com/MetaMask/metamask-connect-examples
   cd metamask-connect-examples/integrations/wagmi
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

### 1. Install dependencies

Install MetaMask Connect EVM along with its peer dependencies to an existing React project:

:::note Version requirements
This quickstart requires `wagmi@^3.6.0` and `wagmi/connectors@^8.0.0`
:::

```bash npm2yarn
npm install @metamask/connect-evm wagmi@^3.6.0 wagmi/connectors@^8.0.0 viem@2.x @tanstack/react-query
```

### 2. Import required dependencies

In the root of your project, import the required dependencies:

```jsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { http, WagmiProvider, createConfig } from 'wagmi'
import { mainnet, sepolia, lineaSepolia } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'
```

### 3. Configure your project

Set up your configuration with the desired chains and connectors.
In the following example, replace `<VITE_INFURA_API_KEY>` with your [Infura API key](/developer-tools/dashboard/get-started/create-api):

```jsx
const INFURA_KEY = import.meta.env.VITE_INFURA_API_KEY

const config = createConfig({
  chains: [mainnet, sepolia, lineaSepolia],
  connectors: [
    metaMask({
      dapp: {
        name: 'My Dapp',
        url: window.location.origin,
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(`https://mainnet.infura.io/v3/${INFURA_KEY}`),
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${INFURA_KEY}`),
    [lineaSepolia.id]: http(`https://linea-sepolia.infura.io/v3/${INFURA_KEY}`),
  },
})
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
import { useConnection, useConnect, useConnectors, useDisconnect } from 'wagmi'

export const ConnectButton = () => {
  const { address, isConnected } = useConnection()
  const connectors = useConnectors()
  const connect = useConnect()
  const disconnect = useDisconnect()

  const handleConnect = async () => {
    // highlight-start
    const connector = connectors.find(c => c.id === 'metaMaskSDK') ?? connectors[0]
    await connect.mutateAsync({ connector })
    // highlight-end
  }

  return (
    <div>
      {isConnected ? (
        <button onClick={() => disconnect.mutate()}>Disconnect</button>
      ) : (
        <button onClick={handleConnect}>Connect MetaMask</button>
      )}
      {address && <p>Connected: {address}</p>}
    </div>
  )
}
```

After adding the connect button, test your dapp by running `pnpm run dev`.

## Common operations

### Switch chains

Use `useConnection`, `useChains`, and `useSwitchChain` to let users switch between your configured chains:

```tsx
import { useConnection, useChains, useSwitchChain } from 'wagmi'

function ChainSwitcher() {
  const { chainId } = useConnection()
  const chains = useChains()
  const switchChain = useSwitchChain()

  return (
    <div>
      {chains.map(chain => (
        <button
          key={chain.id}
          disabled={chainId === chain.id}
          onClick={() => switchChain.mutate({ chainId: chain.id })}>
          {chain.name}
        </button>
      ))}
    </div>
  )
}
```

### Sign a message

Use `useSignMessage` to request a `personal_sign` signature from the connected wallet:

```tsx
import { useSignMessage } from 'wagmi'

function SignMessage() {
  const signMessage = useSignMessage()

  const handleSign = async () => {
    const signature = await signMessage.mutateAsync({ message: 'Hello from my dapp!' })
    console.log('Signature:', signature)
  }

  return (
    <div>
      <button disabled={signMessage.isPending} onClick={handleSign}>
        {signMessage.isPending ? 'Signing...' : 'Sign Message'}
      </button>
      {signMessage.data && <p>Signature: {signMessage.data}</p>}
    </div>
  )
}
```

### Send a transaction

Use `useSendTransaction` to send ETH:

```tsx
import { useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

function SendTransaction() {
  const sendTx = useSendTransaction()

  const handleSend = async () => {
    const hash = await sendTx.mutateAsync({
      to: '0xRecipientAddress',
      value: parseEther('0.01'),
    })
    console.log('Transaction hash:', hash)
  }

  return (
    <div>
      <button disabled={sendTx.isPending} onClick={handleSend}>
        {sendTx.isPending ? 'Sending...' : 'Send 0.01 ETH'}
      </button>
      {sendTx.data && <p>Transaction hash: {sendTx.data}</p>}
    </div>
  )
}
```

### Connect and sign

Use the `connectAndSign` connector option to connect and prompt the user to sign a message in a single approval:

```jsx
metaMask({
  dapp: { name: 'My Dapp', url: window.location.origin },
  connectAndSign: 'By signing, you agree to our Terms of Service.',
})
```

### Connect and execute

Use the `connectWith` connector option to connect and execute any RPC method in a single approval:

```jsx
metaMask({
  dapp: { name: 'My Dapp', url: window.location.origin },
  connectWith: {
    method: 'eth_signTypedData_v4',
    params: [address, JSON.stringify(typedData)],
  },
})
```

## Production readiness

:::tip
For production deployments, use reliable RPC providers instead of public nodes.
We recommend using services like [Infura](https://developer.metamask.io/) to ensure better reliability and performance.
See the [production readiness checklist](../guides/best-practices/production-readiness.md) for more details.
:::

## Migrate from `@metamask/sdk`

If you previously used `@metamask/sdk` with Wagmi, the MetaMask connector now uses `@metamask/connect-evm` under the hood. Update your dependencies and connector configuration:

1. Replace `@metamask/sdk` with `@metamask/connect-evm` and update Wagmi packages:

   ```bash npm2yarn
   npm uninstall @metamask/sdk
   npm install @metamask/connect-evm wagmi@^3.6.0 wagmi/connectors@^8.0.0
   ```

2. Update hook usage for wagmi v3:

   | Old (wagmi v2)                    | New (wagmi v3)                         | Notes                                       |
   | --------------------------------- | -------------------------------------- | ------------------------------------------- |
   | `useAccount`                      | `useConnection`                        | Returns `address`, `isConnected`, `chainId` |
   | `useConnect` returns `connectors` | `useConnectors` hook                   | Connectors are a separate hook              |
   | `connect({ connector })`          | `connect.mutate({ connector })`        | Hooks return mutation objects               |
   | `signMessage({ message })`        | `signMessage.mutateAsync({ message })` | Use `.mutateAsync` for async results        |
   | `sendTransaction({...})`          | `sendTx.mutateAsync({...})`            | Use `.mutateAsync` for async results        |
   | `switchChain({ chainId })`        | `switchChain.mutate({ chainId })`      | Mutation pattern                            |

3. Update connector options:

   | Old parameter (`@metamask/sdk`) | New parameter (`@metamask/connect-evm`) | Notes                                         |
   | ------------------------------- | --------------------------------------- | --------------------------------------------- |
   | `dappMetadata: { name, url }`   | `dapp: { name, url, iconUrl }`          | `dappMetadata` still works but is deprecated  |
   | `logging: { sdk: true }`        | `debug: true`                           | `logging` still works but is deprecated       |
   | `useDeeplink: boolean`          | `mobile: { useDeeplink: boolean }`      | Moved into `mobile` namespace                 |
   | `preferredOpenLink`             | `mobile: { preferredOpenLink }`         | Moved into `mobile` namespace                 |
   | `forceDeleteProvider`           | _(removed)_                             | Not needed with new SDK                       |
   | `forceInjectProvider`           | _(removed)_                             | Not needed with new SDK                       |
   | `injectProvider`                | _(removed)_                             | Not needed with new SDK                       |
   | `readonlyRPCMap`                | _(auto-configured)_                     | Built automatically from Wagmi's chain config |

For non-Wagmi migration details, see the full [migration guide](../guides/migrate-from-sdk.md).

## Next steps

After completing the basic setup, follow these guides to add your own functionality:

- [Manage user accounts](../guides/manage-user-accounts.md)
- [Manage networks](../guides/manage-networks.md)
- [Send transactions](../guides/send-transactions/index.md)
- [Sign data](../guides/sign-data/index.md)
- [Interact with smart contracts](../guides/interact-with-contracts.md)

<!-- ## Live example

<iframe className="mt-6" width="100%" height="600px" frameBorder="0" src="https://stackblitz.com/github/MetaMask/metamask-sdk-examples/tree/main/quickstarts/wagmi?ctl=1&embed=1&file=wagmi.config.ts&hideNavigation=1"></iframe> -->
