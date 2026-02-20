---
sidebar_label: Introduction
description: Introduction page for MetaMask Connect documentation.
keywords: [connect, sdk, integrate, dapp, multichain, evm, solana]
---

import CardList from '@site/src/components/CardList'

# Seamlessly connect to the MetaMask wallet

MetaMask Connect enables a fast, reliable connection from your dapp to the MetaMask extension and MetaMask Mobile.
With a single integration, onboard users and interact with their accounts across desktop browsers, mobile browsers, and native apps.

It replaces the previous MetaMask SDK with a ground-up rewrite built on the [Multichain API](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md).
The SDK automatically detects the user's environment and picks the best connection method — whether that's communicating directly with the extension, scanning a QR code, or deeplinking to MetaMask Mobile.

## Why use MetaMask Connect?

If the MetaMask extension is installed, standards like [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) handle wallet discovery well.
But when the extension isn't available — on mobile, in a different browser, or on a new device — your users need another way in.
MetaMask Connect fills that gap and gives you more:

1. **Cross-platform connections** — Reach users on any device. When the extension isn't available, the SDK connects to MetaMask Mobile through a relay, with no extra setup on your side.
2. **Multichain sessions** — Request access to EVM and Solana (and future ecosystems) in a single connection, instead of connecting per chain.
3. **Persistent sessions** — Sessions survive page reloads and new tabs, so users aren't prompted to reconnect.
4. **Consistent API** — The same interface works whether the user connects through the extension or Mobile.

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

There are two ways to integrate, depending on what works best for your dapp:

### Option A: Ecosystem-specific clients (drop-in)

Use [`@metamask/connect-evm`](/sdk/evm) and/or [`@metamask/connect-solana`](/sdk/solana) for a familiar experience with minimal changes to your existing code.

- **EVM** — Gives you an [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) compatible provider, so your existing `ethers.js`, `viem`, or `web3.js` code works as-is.
- **Solana** — Gives you a [Wallet Standard](https://github.com/wallet-standard/wallet-standard) compatible wallet that plugs into the Solana wallet adapter ecosystem.

This is the fastest path if you already have a working dapp and want to add MetaMask Connect.

### Option B: Multichain client (full control)

Use [`@metamask/connect-multichain`](/sdk/multichain) directly for the full [Multichain API](/sdk/multichain).
This gives you more control — you work with scopes and `wallet_invokeMethod` rather than per-chain RPC — and unlocks the best experience for multichain dapps with a single connection prompt for all ecosystems.

Also **start with Option A and migrate to Option B** over time.
The ecosystem clients are built on the multichain client under the hood, so they share the same transport and session infrastructure.

### Packages

| Package                                                                                      | Purpose                                 |
| -------------------------------------------------------------------------------------------- | --------------------------------------- |
| [`@metamask/connect-evm`](https://www.npmjs.com/package/@metamask/connect-evm)               | EVM client — EIP-1193 provider          |
| [`@metamask/connect-solana`](https://www.npmjs.com/package/@metamask/connect-solana)         | Solana client — Wallet Standard         |
| [`@metamask/connect-multichain`](https://www.npmjs.com/package/@metamask/connect-multichain) | Multichain client — full Multichain API |
