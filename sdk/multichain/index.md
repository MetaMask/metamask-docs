---
sidebar_label: Introduction
description: Connect to multiple blockchain ecosystems using the Multichain API.
keywords: [multichain, caip-25, evm, solana, session, scope]
---

import CardList from '@site/src/components/CardList'

# Connect to multiple ecosystems

Connect to multiple blockchain networks and ecosystems in MetaMask at the same time using `@metamask/connect-multichain`.

With the multichain client, your dapp can request access to EVM networks and Solana (and future ecosystems like **Bitcoin** and **Tron**) in a single connection prompt — no separate connect flows per chain.
This gives you more control than the [ecosystem-specific clients](/sdk#integration-options), but requires adapting your dapp to work with the Multichain API rather than traditional per-chain RPC.

## How the Multichain API works

MetaMask Connect is built on the [Multichain API (CAIP-25)](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) specification, a chain-agnostic standard for wallet-dapp communication.
For the full rationale and specification, see [MIP-5](https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-5.md).

Instead of connecting to one chain at a time, the Multichain API lets you:

- **Request access to multiple ecosystems at once** — for example, Ethereum Mainnet, Polygon, and Solana Mainnet in a single session
- **Send requests to any chain in the session** — send a Solana transaction and an EVM transaction through the same connection
- **Manage the full session lifecycle** — create, query, invoke methods on, and revoke sessions with `wallet_createSession`, `wallet_getSession`, `wallet_invokeMethod`, and `wallet_revokeSession`

For dapps that support both EVM and Solana, this means one session covers both — and users see a single approval prompt.

<!-- Insert the MetaMask Connect Image -->
<p align="center">
    <img height="500" src={require("./_assets/metamask-connect-modal.png").default} alt="MetaMask Connect Multichain Connect Modal" class="appScreen" />
</p>

## Quick example

```typescript
import { createMultichainClient } from '@metamask/connect-multichain'
import { address, createSolanaRpc } from '@solana/kit'

const client = createMultichainClient({
  dapp: { name: 'My DApp', url: 'https://mydapp.com' },
  api: {
    supportedNetworks: {
      'eip155:1': 'https://mainnet.infura.io/v3/YOUR_API_KEY',
      'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp': 'https://api.mainnet-beta.solana.com',
    },
  },
})

// Connect with scopes across ecosystems — one approval for all chains
await client.connect(['eip155:1', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'], [])

// Get accounts from session
const session = await client.getSession()
const ethAccounts = session.sessionScopes['eip155:1']?.accounts || []
const solAccounts =
  session.sessionScopes['solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp']?.accounts || []

// Get ETH balance via invokeMethod
if (ethAccounts.length > 0) {
  const ethAddress = ethAccounts[0].split(':')[2]
  const ethBalance = await client.invokeMethod({
    scope: 'eip155:1',
    request: { method: 'eth_getBalance', params: [ethAddress, 'latest'] },
  })
  console.log('ETH balance:', ethBalance)
}

// Get SOL balance via @solana/kit (getBalance is not supported via invokeMethod)
if (solAccounts.length > 0) {
  const solAddress = solAccounts[0].split(':')[2]
  const rpc = createSolanaRpc('https://api.mainnet-beta.solana.com')
  const balance = await rpc.getBalance(address(solAddress)).send()
  console.log('SOL balance:', balance)
}
```

## When to use the multichain client

The multichain client is a good fit when you're:

- **Building a new dapp** designed from the ground up for multiple ecosystems
- **Looking for the best cross-chain UX** — one connection prompt for all chains
- **Needing full control** over the session lifecycle

If you're adding MetaMask Connect to an existing dapp and want minimal code changes, the [ecosystem-specific clients](/sdk#integration-options) (`@metamask/connect-evm` or `@metamask/connect-solana`) are a simpler starting point — you can always migrate later.

## Get started

<CardList
items={[
{
href: '/sdk/multichain/connect/guides/connect-to-multichain',
title: 'Connect to EVM and Solana',
description: 'Connect to EVM networks and Solana in MetaMask.',
},
{
href: '/sdk/multichain/connect/guides/send-transactions',
title: 'Send EVM and Solana transactions',
description: 'Send transactions on EVM networks and Solana.',
},
{
href: '/sdk/multichain/connect/guides/connector-libraries',
title: 'Connector library guide',
description: 'Integrate MetaMask Connect into your existing multichain connector library.',
},
{
href: '/sdk/multichain/connect/reference/api',
title: 'API reference',
description: 'Full Multichain API method and event reference.',
}
]}
/>
