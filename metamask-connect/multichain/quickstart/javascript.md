---
title: 'JavaScript Quickstart - MetaMask Connect Multichain'
sidebar_label: JavaScript
description: Set up MetaMask Connect Multichain in a Vite JavaScript dapp to connect to EVM and Solana ecosystems from a single session using CAIP-25.
keywords:
  [
    multichain,
    evm,
    solana,
    connect,
    caip-25,
    scope,
    vite template,
    createMultichainClient,
    multichain setup,
    EVM Solana dapp,
  ]
---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

# Multichain quickstart

Get started with MetaMask Connect Multichain in your JavaScript (Vite) dapp.

<!-- [Download the quickstart template](#set-up-using-a-template) or [manually set up MetaMask Connect Multichain](#set-up-manually) in an existing dapp. -->

<!-- <p align="center">
  <a href="" target="_blank">
    <img src={require("../_assets/quickstart-multichain.png").default} alt="MetaMask Connect Multichain JavaScript quickstart dapp showing EVM and Solana connections" width="600px" class="appScreen" />
  </a>
</p> -->

## Prerequisites

- [Node.js](https://nodejs.org/) version 19 or later installed.
- [Vite](https://vite.dev/) installed and configured.
- A package manager installed, such as [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), [Yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/installation), or [Bun](https://bun.sh/).
- [MetaMask](https://metamask.io/download) installed in your browser or on mobile.
- An [Infura API key](/developer-tools/dashboard/get-started/create-api) from the [MetaMask Developer dashboard](https://developer.metamask.io).

:::note
This quickstart uses [Vite](https://vite.dev/) as the build tool for convenience, but MetaMask Connect Multichain works with vanilla JavaScript or any build tool of your choice.
:::

<!--
## Set up using a template

1. Download the [MetaMask Connect JavaScript (Vite) template](https://github.com/MetaMask/metamask-sdk-examples/tree/main/quickstarts/javascript):

   ```bash
   npx degit MetaMask/metamask-connect-examples/multichain/quickstart/javascript metamask-multichain-quickstart
   ```

2. Navigate into the repository:

   ```bash
   cd metamask-multichain-quickstart
   ```

    <details>
    <summary>Degit vs. Git clone</summary>
    <div>

   `degit` is a tool that enables cloning only the directory structure from a GitHub repository, without retrieving the entire repository.

   Alternatively, use `git clone` to download the entire repository.
   Clone the MetaMask Connect examples repository and navigate into the `multichain/quickstart/javascript` directory:

   ```bash
   git clone https://github.com/MetaMask/metamask-connect-examples
   cd metamask-connect-examples/multichain/quickstart/javascript
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

5. In `.env.local`, add a `VITE_INFURA_API_KEY` environment variable, replacing `<YOUR-API-KEY>` with your Infura API key:

   ```text title=".env.local"
   VITE_INFURA_API_KEY=<YOUR-API-KEY>
   ```

6. Run the project:

   ```bash
   pnpm dev
   ```

You've successfully set up MetaMask Connect Multichain SDK.
-->

## Steps

### 1. Install MetaMask Connect Multichain

Install the multichain client in an existing JavaScript (Vite) project:

```bash npm2yarn
npm install @metamask/connect-multichain
```

### 2. Initialize MetaMask Connect Multichain

The following is an example of using MetaMask Connect Multichain for a multichain dapp in a JavaScript (Vite) project:

```javascript
import { createMultichainClient } from '@metamask/connect-multichain'

const client = await createMultichainClient({
  dapp: {
    name: 'My Multichain Dapp',
    url: window.location.href,
    iconUrl: 'https://mydapp.com/icon.png',
  },
  api: {
    supportedNetworks: {
      'eip155:1': 'https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
      'eip155:137': 'https://polygon-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
      'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp':
        'https://solana-mainnet.infura.io/v3/YOUR_INFURA_API_KEY',
    },
  },
})
```

This example configures MetaMask Connect Multichain with the following options:

- `dapp` - Ensures trust by showing your dapp's `name`, `url`, and `iconUrl` during connection.
- `api.supportedNetworks` - A map of [CAIP-2](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-2.md) chain IDs to RPC URLs for all networks supported by the dapp.

### 3. Connect and use the Multichain client

Connect to MetaMask, get accounts from the session, and invoke RPC methods on chain of your choice:

```javascript
await client.connect(['eip155:1', 'eip155:137', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'], [])

const session = await client.provider.getSession()
const ethAccounts = session.sessionScopes['eip155:1']?.accounts || []
const solAccounts = session.sessionScopes['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp']?.accounts || []
console.log('ETH accounts:', ethAccounts)
console.log('SOL accounts:', solAccounts)

if (ethAccounts.length > 0) {
  const ethAddress = ethAccounts[0].split(':')[2]
  const ethBalance = await client.invokeMethod({
    scope: 'eip155:1', // Ethereum Mainnet
    request: {
      method: 'eth_getBalance',
      params: [ethAddress, 'latest'],
    },
  })
  console.log('ETH balance:', ethBalance)
}
```

The user sees a single approval prompt for all requested chains.
Use [`invokeMethod`](../reference/methods.md#invokemethod) to call RPC methods on any chain in the session by specifying a [scope](../concepts/scopes.md).

## Multichain client methods at a glance

| Method                                                                           | Description                                                                     |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [`connect(scopes, caipAccountIds)`](../reference/methods.md#connect)             | Connects to MetaMask with multichain [scopes](../concepts/scopes.md)            |
| [`getSession`](../reference/methods.md#getsession)                               | Returns the current [session](../concepts/sessions.md) with approved accounts   |
| [`invokeMethod({ scope, request })`](../reference/methods.md#invokemethod)       | Calls an RPC method on a specific chain using a [scope](../concepts/scopes.md)  |
| [`disconnect`](../reference/methods.md#disconnect)                               | Disconnects all [scopes](../concepts/scopes.md) and ends the session            |
| [`disconnect(scopes)`](../reference/methods.md#disconnect)                       | Disconnects specific [scopes](../concepts/scopes.md) without ending the session |
| [`on(event, handler)`](../reference/methods.md#on)                               | Registers an event handler                                                      |
| [`off(event, handler)`](../reference/methods.md#off)                             | Removes an event handler                                                        |
| [`getInfuraRpcUrls({ infuraApiKey })`](../reference/methods.md#getinfurarpcurls) | Generates Infura RPC URLs keyed by CAIP-2 chain ID                              |

## Next steps

- Understand [scopes](../concepts/scopes.md), [accounts](../concepts/accounts.md), and [sessions](../concepts/sessions.md) for CAIP-2 chain identifiers, CAIP-10 account IDs, and CAIP-25 sessions.
- [Send transactions on EVM and Solana](../guides/send-transactions.md) from a single multichain session.
- [Sign messages on EVM and Solana](../guides/sign-transactions.md) using `invokeMethod`.
- See [Create a multichain dapp](../tutorials/create-multichain-dapp.md) for a full step-by-step tutorial with React.
