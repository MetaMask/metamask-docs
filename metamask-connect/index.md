---
title: 'MetaMask Connect - Dapp Wallet Integration SDK'
sidebar_label: Introduction
toc_max_heading_level: 2
description: Connect your dapp to the MetaMask wallet across desktop, mobile, and native apps with multichain EVM and Solana support using a single SDK integration.
keywords:
  [
    connect,
    sdk,
    integrate,
    dapp,
    multichain,
    evm,
    solana,
    metamask connect,
    wallet connection,
    browser extension,
    mobile wallet,
    CAIP-25,
    wallet SDK,
    web3 wallet,
    cryptocurrency wallet,
  ]
---

import CardList from '@site/src/components/CardList'

# Seamlessly connect to the MetaMask wallet

MetaMask Connect enables a fast, reliable connection from your dapp to the MetaMask browser extension and the MetaMask mobile app.
With a single integration, you can onboard users and interact with their accounts across desktop browsers, mobile browsers, and native apps. It offers multiple
[integration options](./integration-options.md), from single-ecosystem clients for EVM or Solana to a multichain client that connects to multiple chains in a single session.

MetaMask Connect replaces the legacy MetaMask SDK with a complete rewrite built on the [CAIP-25 Multichain API](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md) and a more secure and robust relay server infrastructure for improved reliability.
MetaMask Connect detects the user's environment and selects the best connection method, whether it communicates directly with the MetaMask browser extension, prompts the user to scan a QR code, or deeplinks to the MetaMask mobile app.

## Why use MetaMask Connect?

If a user has the MetaMask browser extension installed, standards such as [EIP-6963](https://eips.ethereum.org/EIPS/eip-6963) and [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) support wallet discovery.
When the extension isn't available (for example, on mobile, in a different browser, or on a new device), users need another way to connect.
MetaMask Connect fills that gap and provides the following benefits:

- **Cross-platform connections**: Reach users on any device. When the MetaMask browser extension isn't available, MetaMask Connect connects users through the MetaMask mobile app with no additional setup.
- **Multichain sessions**: Request access to EVM, Solana, and future ecosystems in a single connection instead of connecting per chain.
- **Persistent sessions**: Keep sessions across page reloads and new tabs so users don't need to reconnect.
- **Consistent API**: Use the same interface whether users connect through the extension or the MetaMask mobile app.

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

## Frequently asked questions

### How is MetaMask Connect different from the legacy MetaMask SDK?

MetaMask Connect is a complete rewrite of the legacy SDK.
Key differences include:

- Async initialization with `createEVMClient`.
- A singleton client pattern.
- Built-in multichain support for both EVM and Solana.
- CAIP-25 session management.
- Improved relay server infrastructure.

See the [migration guide](evm/guides/migrate-from-sdk.md) for step-by-step upgrade instructions.

### Does MetaMask Connect support mobile?

Yes. MetaMask Connect automatically detects the user's platform and selects the best connection method.
On mobile browsers and native apps it uses deeplinks to open the MetaMask mobile app, and on desktop browsers without the extension it shows a QR code to scan with the MetaMask mobile app.
See [supported platforms](supported-platforms.md) for the full matrix.

### Which blockchain networks does MetaMask Connect support?

MetaMask Connect supports Ethereum and all EVM-compatible networks (Polygon, Arbitrum, Optimism, Linea, Base, etc.) through `@metamask/connect-evm`, Solana through `@metamask/connect-solana`, and both simultaneously through `@metamask/connect-multichain`.
See [integration options](integration-options.md) to choose the right package.

### Do I need an Infura API key to use MetaMask Connect?

We recommend using an Infura API key for reliable RPC access and relay connections.
You can get a free API key from the [MetaMask Developer dashboard](/developer-tools/dashboard/get-started/create-api).
MetaMask Connect uses the API key to generate RPC URLs for supported networks via the `getInfuraRpcUrls` helper.
