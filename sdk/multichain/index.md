---
sidebar_label: Introduction
description: Connect to multiple blockchain ecosystems using the Multichain API.
keywords: [multichain, caip-25, evm, solana, session, scope]
---

import CardList from '@site/src/components/CardList'

# Connect to multiple ecosystems

Use `@metamask/connect-multichain` to connect to multiple blockchain networks and ecosystems in MetaMask at the same time.

With the multichain client, your dapp can request access to EVM networks, Solana, and future ecosystems in a single connection prompt, instead of using separate connection flows for each chain.
This gives you more control than the [ecosystem-specific clients](/sdk/#integration-options), but requires adapting your dapp to work with the Multichain API rather than traditional per-chain RPC.

:::tip Ready to code?
Jump to the [Quickstart](/sdk/multichain/connect/quickstart) to set up MetaMask Connect Multichain in minutes.
:::

## How the Multichain API works

MetaMask Connect is built on the [Multichain API (CAIP-25)](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) specification, a chain-agnostic standard for wallet-dapp communication.
For the full rationale and specification, see [MetaMask Improvement Proposal-5 (MIP-5)](https://github.com/MetaMask/metamask-improvement-proposals/blob/main/MIPs/mip-5.md).

Instead of connecting to one chain at a time, the Multichain API lets you do the following:

- **Request access to multiple ecosystems at once**: For example, request Ethereum Mainnet, Polygon, and Solana Mainnet in a single session.
- **Send requests to any chain in the session**: For example, send a Solana transaction and an EVM transaction through the same connection.
- **Manage the full session lifecycle**: Connect, retrieve session data, invoke methods on any chain, and disconnect — using [`connect`](/sdk/multichain/connect/reference/methods#connect), [`getSession`](/sdk/multichain/connect/reference/methods#getsession), [`invokeMethod`](/sdk/multichain/connect/reference/methods#invokemethod), and [`disconnect`](/sdk/multichain/connect/reference/methods#disconnect). These SDK methods wrap the underlying [Multichain API](/sdk/multichain/connect/reference/api) ([`wallet_createSession`](/sdk/multichain/connect/reference/api#wallet_createsession), [`wallet_getSession`](/sdk/multichain/connect/reference/api#wallet_getsession), [`wallet_invokeMethod`](/sdk/multichain/connect/reference/api#wallet_invokemethod), [`wallet_revokeSession`](/sdk/multichain/connect/reference/api#wallet_revokesession)).

For dapps that support both EVM and Solana, this means one session covers both — and users see a single approval prompt.

<!-- Insert the MetaMask Connect Image -->
<p align="center">
    <img height="500" src={require("./_assets/metamask-connect-modal.png").default} alt="MetaMask Connect Multichain Connect Modal" class="appScreen" />
</p>

## When to use the multichain client

The multichain client is a good fit when you're:

- **Building a new dapp** designed from the ground up for multiple ecosystems
- **Looking for the best cross-chain UX** — one connection prompt for all chains
- **Needing full control** over the session lifecycle

If you're adding MetaMask Connect to an existing dapp and want minimal code changes, the [ecosystem-specific clients](/sdk/#integration-options) ([`@metamask/connect-evm`](/sdk/evm) or [`@metamask/connect-solana`](/sdk/solana)) are a simpler starting point — you can always migrate later.

## Get started

<CardList
items={[
{
href: '/sdk/multichain/connect/quickstart',
title: 'Quickstart',
description: 'Get started with MetaMask Connect Multichain in minutes.',
},
{
href: '/sdk/multichain/connect/guides/sign-transactions',
title: 'Sign messages',
description: 'Sign messages and typed data on EVM and Solana.',
},
{
href: '/sdk/multichain/connect/guides/send-transactions',
title: 'Send transactions',
description: 'Send transactions on EVM networks and Solana.',
},
{
href: '/sdk/multichain/connect/tutorials/create-multichain-dapp',
title: 'Create a multichain dapp',
description: 'Build a React dapp that connects to Ethereum, Linea, Base, and Solana.',
},
{
href: '/sdk/multichain/connect/reference/methods',
title: 'SDK methods',
description: 'Reference for connect, invokeMethod, disconnect, and more.',
},
{
href: '/sdk/multichain/connect/reference/api',
title: 'API reference',
description: 'Full Multichain API method and event reference.',
}
]}
/>
