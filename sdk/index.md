---
sidebar_label: Introduction
description: Introduction page for MetaMask Connect documentation.
keywords: [connect, sdk, integrate, dapp, multichain, evm, solana]
---

import CardList from '@site/src/components/CardList'

# MetaMask Connect

MetaMask Connect is a unified SDK for dapps to connect to MetaMask across all platforms and ecosystems.
It replaces the previous MetaMask SDK with a ground-up rewrite built on the [CAIP-25 Multichain API](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md).

A single integration handles:

- **Desktop browser with Extension installed** — communicates directly with the extension
- **Desktop browser without Extension** — connects to MetaMask Mobile via QR code + relay
- **Mobile native browser** — connects to MetaMask Mobile via deeplink + relay
- **In-app browser (inside MetaMask Mobile)** — direct bridge, no relay needed
- **React Native apps** — deeplink + relay to MetaMask Mobile

The dapp doesn't need to detect or handle any of this — the SDK figures out the right transport automatically.

## Why not just EIP-6963?

[EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) solves wallet discovery — it lets dapps find which wallets are available as injected providers (`window.ethereum`).
That's useful, but it only works when the Extension is present in the same browser.

MetaMask Connect gives you:

1. **Remote connections** when the Extension isn't installed — mobile wallet connections via relay, replacing WalletConnect for MetaMask-specific flows with better stability and UX
2. **Multichain session management** — request access to EVM + Solana (+ future ecosystems) in a single session, instead of connecting per-chain
3. **Automatic session persistence** — sessions survive page reloads and new tabs without re-prompting the user
4. **Cross-platform consistency** — same API whether connecting to Extension or Mobile

## Get started

<CardList
items={[
{
href: '/sdk/multichain',
title: 'Multichain',
description: 'Connect to multiple ecosystems at the same time.',
},
{
href: '/sdk/evm',
title: 'EVM networks',
description: 'Connect to Ethereum and other EVM networks.',
},
{
href: '/sdk/solana',
title: 'Solana',
description: 'Connect to Solana.',
}
]}
/>

## Integration options

There are two ways to integrate, depending on how much you want to adopt:

### Option A: Ecosystem-specific clients (drop-in)

Use [`@metamask/connect-evm`](/sdk/evm) and/or [`@metamask/connect-solana`](/sdk/solana) for a familiar developer experience with minimal changes to your existing code.

- **EVM** — Provides an EIP-1193 compatible provider, so your existing `ethers.js`, `viem`, or `web3.js` code works as-is
- **Solana** — Provides a Wallet Standard compatible wallet, so it integrates with the Solana wallet adapter ecosystem

### Option B: Multichain client (full API)

Use [`@metamask/connect-multichain`](/sdk/multichain) directly for the full Multichain API experience.
This is more powerful but requires adapting your dapp to work with scopes and `wallet_invokeMethod` rather than traditional per-chain RPC.

This is the path that unlocks the best UX for multichain dapps — a single connection prompt for all ecosystems.

You can also **start with Option A and migrate to Option B** incrementally.
The ecosystem clients are wrappers around the multichain client — they use the same transport, session, and relay infrastructure under the hood.

## Packages

| Package | Purpose |
|---------|---------|
| [`@metamask/connect-evm`](https://www.npmjs.com/package/@metamask/connect-evm) | EVM client — EIP-1193 provider |
| [`@metamask/connect-solana`](https://www.npmjs.com/package/@metamask/connect-solana) | Solana client — Wallet Standard |
| [`@metamask/connect-multichain`](https://www.npmjs.com/package/@metamask/connect-multichain) | Core — full Multichain API |

## Install

```bash npm2yarn
# For EVM dapps
npm install @metamask/connect-evm

# For Solana dapps
npm install @metamask/connect-solana

# For full multichain control
npm install @metamask/connect-multichain
```
