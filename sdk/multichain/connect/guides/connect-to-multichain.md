---
sidebar_label: Connect to EVM and Solana
---

# Connect to EVM and Solana in MetaMask

Get started with MM Connect in your multichain JavaScript dapp.
You can connect to EVM networks and Solana in MetaMask at the same time, and make requests to each network without having to switch between them.

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [bun](https://bun.sh/).
- [MetaMask](https://metamask.io/) installed in your browser or on mobile.

## Steps

### 1. Install MM Connect

Install MM Connect in an existing JavaScript project:

```bash npm2yarn
npm install @metamask/connect/multichain
```

### 2. Initialize MM Connect

Initialize MM Connect with configuration options:

```javascript
import { createMultichainClient } from "@metamask/connect/multichain"

const multichainClient = createMultichainClient({
  dappMetadata: {
    name: "Example multichain dapp",
    url: window.location.href,
    iconUrl: "https://mydapp.com/icon.png" // Optional
  },
  infuraAPIKey: process.env.INFURA_API_KEY,
})
```

This example configures MM Connect with the following options:

- [`dappMetadata`](../../../reference/options.md#dappmetadata) - Ensures trust by showing your dapp's `name`, `url`, and `iconUrl` during connection.
- [`infuraAPIKey`](../../../reference/options.md#infuraapikey) - Enables read-only RPC and load‑balancing.
  Set this option to your [Infura API key](/developer-tools/dashboard/get-started/create-api).

### 3. Connect and use provider

Connect to MetaMask and get the provider for RPC requests:

```javascript
const provider = multichainClient.getProvider()

await provider.request({
  chain: 'eip155:1',
  method: 'eth_sendTransaction',
  params: [...]
});
```

## Next steps

Now that you've connected to multiple ecosystems in MetaMask, learn how to [send EVM and Solana transactions](send-transactions.md).
