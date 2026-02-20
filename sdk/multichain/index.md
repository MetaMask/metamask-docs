---
sidebar_label: Introduction
description: Connect to multiple blockchain ecosystems using the Multichain API.
keywords: [multichain, caip-25, evm, solana, session, scope]
---

import CardList from '@site/src/components/CardList'

# Connect to multiple ecosystems

Connect to multiple blockchain networks and ecosystems in MetaMask at the same time using `@metamask/connect-multichain`.

This is the full Multichain API experience — more powerful than the ecosystem-specific clients, but requires adapting your dapp to work with scopes and `wallet_invokeMethod` rather than traditional per-chain RPC.

## The Multichain API

MetaMask Connect is built on the [CASA Multichain API](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) (CAIP-25), a chain-agnostic standard for wallet-dapp communication.
For the full rationale and specification of MetaMask's adoption of these standards, see [MIP-5: Adopt Chain Agnostic Standards for a Multichain API](https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-5.md).

Instead of the traditional EIP-1193 model (`eth_requestAccounts` on one chain at a time), the Multichain API lets dapps:

- **Request permissions across ecosystems in one call** — e.g., "I need Ethereum Mainnet, Polygon, and Solana Mainnet" as a single session request
- **Invoke methods on any permitted scope** — send a Solana transaction and an EVM transaction through the same session
- **Use standardized session lifecycle** — `wallet_createSession`, `wallet_invokeMethod`, `wallet_getSession`, `wallet_revokeSession`

This means a dapp that supports both EVM and Solana doesn't need separate connection flows — one session covers both.

## Quick example

```typescript
import { createMultichainClient } from '@metamask/connect-multichain';

const client = await createMultichainClient({
  dapp: { name: 'My DApp', url: 'https://mydapp.com' },
});

// Connect with scopes across ecosystems
await client.connect(
  ['eip155:1', 'eip155:137', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp'],
  [],
);

// Invoke methods on any scope
const ethBalance = await client.invokeMethod({
  scope: 'eip155:1',
  request: { method: 'eth_getBalance', params: ['0x...', 'latest'] },
});

const solBalance = await client.invokeMethod({
  scope: 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp',
  request: { method: 'getBalance', params: ['...'] },
});
```

## When to use the Multichain Client

The Multichain Client is best for:

- **New dapps** designed from the ground up for multichain
- **Dapps requiring the best cross-chain UX** — a single connection prompt for all ecosystems
- **Advanced use cases** requiring full control over the session lifecycle

If you're integrating MetaMask Connect into an existing dapp and want minimal code changes, consider using the [ecosystem-specific clients](/sdk#integration-options) instead (`@metamask/connect-evm` or `@metamask/connect-solana`).

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
