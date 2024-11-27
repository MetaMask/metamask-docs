---
description: Integrate MetaMask SDK with Wagmi in your JavaScript dapp.
tags:
  - JavaScript SDK
---

# Connect to MetaMask using Wagmi

[Wagmi](https://wagmi.sh/) is a powerful and efficient React Hooks library designed to streamline
dapp development by simplifying Ethereum interactions.

You can integrate MetaMask SDK into your dapp alongside Wagmi,
using the MetaMask connector with Wagmi, to enable your users to seamlessly and securely connect to
the MetaMask browser extension and MetaMask Mobile.

## Prerequisites

- [Node.js](https://nodejs.org/en/) version 20+
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/) version 9+
- A text editor (for example, [VS Code](https://code.visualstudio.com/))
- The [MetaMask extension](https://metamask.io/) or
  [MetaMask Flask](/developer-tools/dashboard/get-started/create-api) installed
- Basic knowledge of [React](https://react.dev/)

## Steps

### 1. Set up the project

If you don't have an existing Wagmi project, set up a new project using Wagmi's `create wagmi` command
with the `vite-react` template:

```bash
npm create wagmi@latest  --template vite-react
```

This prompts you for a project name.
For example, use `mmsdk-wagmi`.
Once your project is created, navigate into it and install the node module dependencies:

```bash
cd mmsdk-wagmi && npm install
```

### 2. Configure the MetaMask connector

In `wagmi.ts`, configure the MetaMask connector with any [parameters](https://wagmi.sh/core/api/connectors/metaMask#parameters).
Specify [`dappMetadata`](https://wagmi.sh/core/api/connectors/metaMask#dappmetadata), including the `name`, `url`, and `iconUrl`,
to help identify your dapp within the MetaMask ecosystem.

```typescript title="wagmi.ts"
import { metaMask } from "wagmi/connectors"

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
    metaMask({
      dappMetadata: {
        name: "Example Wagmi dapp",
        url: "https://wagmi.io",
        iconUrl: "https://wagmi.io/favicon.ico",
      },
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
```

:::note
By default, if the EIP-6963 MetaMask injected provider is detected, this connector will replace it.
See Wagmi's [`rdns`](https://wagmi.sh/dev/creating-connectors#properties) property for more information.
:::

### 3. Run the dapp

Start the development server:

```bash
npm run dev
```

Navigate to the displayed localhost URL to view and test your dapp.

## Next steps

See the [Create a React dapp with the SDK and Wagmi](../../tutorials/react-dapp-sdk-wagmi.md) tutorial
for more information about configuring the SDK with Wagmi, and how the dapp behaves out of the box.
