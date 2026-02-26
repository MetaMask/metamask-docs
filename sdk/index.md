---
sidebar_label: Introduction
description: Introduction page for MetaMask Connect documentation.
keywords: [connect, sdk, integrate, dapp, multichain, evm, solana]
---

import CardList from '@site/src/components/CardList'

# Seamlessly connect to the MetaMask wallet

MetaMask Connect enables a fast, reliable connection from your dapp to the MetaMask browser extension and the MetaMask mobile app.
With a single integration, onboard users and interact with their accounts across desktop browsers, mobile browsers, and native apps.

MetaMask Connect replaces the legacy MetaMask SDK with a complete rewrite built on the [CAIP-25 Multichain API](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md).
The MetaMask Connect SDK detects the user’s environment and selects the best connection method, whether it communicates directly with the MetaMask browser extension, prompts the user to scan a QR code, or deep links to the MetaMask mobile app.

## Why use MetaMask Connect?

If the MetaMask browser extension is installed, standards such as [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) support wallet discovery.
When the extension isn't available (for example, on mobile, in a different browser, or on a new device), users need another way to connect.
MetaMask Connect fills that gap and provides the following benefits:

1. **Cross-platform connections**: Reach users on any device. When the MetaMask browser extension isn’t available, MetaMask Connect connects users through the MetaMask mobile app with no additional setup.
2. **Multichain sessions** : Request access to EVM, Solana, and future ecosystems in a single connection instead of connecting per chain.
3. **Persistent sessions**: Keep sessions across page reloads and new tabs so users don’t need to reconnect.
4. **Consistent API**Use the same interface whether users connect through the extension or MetaMask Mobile.

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

There are three ways to integrate, depending on what works best for your dapp:

### Option A: Single-ecosystem client (drop-in for existing dapps)

If your dapp already targets a single ecosystem, use [`@metamask/connect-evm`](/sdk/evm) or [`@metamask/connect-solana`](/sdk/solana) for a familiar experience with minimal changes to your existing code.

- **EVM** — Gives you an [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) compatible provider, so your existing `ethers.js`, `viem`, or `web3.js` code works as-is.
- **Solana** — Gives you a [Wallet Standard](https://github.com/wallet-standard/wallet-standard) compatible wallet that plugs into the Solana wallet adapter ecosystem.

This is the fastest path if you already have a working single-chain dapp and want to add MetaMask Connect.

### Option B: Multiple ecosystem clients

If your dapp needs to support both EVM and Solana, you can use [`@metamask/connect-evm`](/sdk/evm) and [`@metamask/connect-solana`](/sdk/solana) together.
This gives you per-ecosystem APIs while covering multiple chains, and is a good fit when you want to keep familiar provider interfaces for each ecosystem.

### Option C: Multichain client (full control, recommended)

Use [`@metamask/connect-multichain`](/sdk/multichain) directly for the full [Multichain API](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md).
This gives you more control — you work with **scopes** and `wallet_invokeMethod` rather than per-chain RPC — and unlocks the best experience for multichain dapps with a single connection prompt for all ecosystems.
**This is the recommended long-term path.**

All three options are built on the same multichain client under the hood, sharing the same transport and session infrastructure.
You can start with whichever option fits your dapp today and migrate to **Option C** when you're ready for full multichain control.

### Packages

| Package                                                                                      | Purpose                                 |
| -------------------------------------------------------------------------------------------- | --------------------------------------- |
| [`@metamask/connect-evm`](https://www.npmjs.com/package/@metamask/connect-evm)               | EVM client — EIP-1193 provider          |
| [`@metamask/connect-solana`](https://www.npmjs.com/package/@metamask/connect-solana)         | Solana client — Wallet Standard         |
| [`@metamask/connect-multichain`](https://www.npmjs.com/package/@metamask/connect-multichain) | Multichain client — full Multichain API |
