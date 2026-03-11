---
sidebar_label: Introduction
description: Introduction page for MetaMask Connect documentation.
keywords: [connect, sdk, integrate, dapp, multichain, evm, solana]
---

import CardList from '@site/src/components/CardList'

# Seamlessly connect to the MetaMask wallet

MetaMask Connect enables a fast, reliable connection from your dapp to the MetaMask browser extension and the MetaMask mobile app.
With a single integration, you can onboard users and interact with their accounts across desktop browsers, mobile browsers, and native apps. It offers multiple
[integration options](./integration-options.md), from single-ecosystem clients for EVM or Solana to a multichain client that connects to multiple chains in a single session.

MetaMask Connect replaces the legacy MetaMask SDK with a complete rewrite built on the [CAIP-25 Multichain API](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) and a more secure and robust relay server infrastructure for improved reliability.
The MetaMask Connect detects the user’s environment and selects the best connection method, whether it communicates directly with the MetaMask browser extension, prompts the user to scan a QR code, or deep links to the MetaMask mobile app.

## Why use MetaMask Connect?

If the MetaMask browser extension is installed, standards such as [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) and [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) support wallet discovery.
When the extension isn't available (for example, on mobile, in a different browser, or on a new device), users need another way to connect.
MetaMask Connect fills that gap and provides the following benefits:

1. **Cross-platform connections**: Reach users on any device. When the MetaMask browser extension isn’t available, MetaMask Connect connects users through the MetaMask mobile app with no additional setup.
2. **Multichain sessions** : Request access to EVM, Solana, and future ecosystems in a single connection instead of connecting per chain.
3. **Persistent sessions**: Keep sessions across page reloads and new tabs so users don’t need to reconnect.
4. **Consistent API**: Use the same interface whether users connect through the extension or MetaMask Mobile.

## Get started

<CardList
items={[
{
href: '/metamask-connect/integration-options',
title: 'Integration options',
description: 'Compare single-ecosystem, multi-ecosystem, and multichain integration paths to find the right fit for your dapp.',
},
{
href: '/metamask-connect/multichain',
title: 'Multichain',
description: 'Connect to multiple ecosystems at the same time.',
},
{
href: '/metamask-connect/evm',
title: 'EVM networks',
description: 'Connect to Ethereum and other EVM networks.',
},
{
href: '/metamask-connect/solana',
title: 'Solana',
description: 'Connect to Solana.',
}
]}
/>
