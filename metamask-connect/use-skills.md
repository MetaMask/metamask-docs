---
sidebar_label: Use skills
description: Use MetaMask Connect skills to give your agent framework context on integrating the SDK into your dapp.
keywords: [skill, ai, agent framework, metamask connect, sdk, evm, solana, multichain]
---

# Use skills

Use skills to give your agent framework context on integrating MetaMask Connect into your dapp.
Skills guide your agent through client setup for EVM, Solana, and multichain, connections and
sessions, signing and sending transactions, and migrating from the legacy SDK.

Skills are available through the open-source
[`metamask/connect-monorepo`](https://github.com/metamask/connect-monorepo) repository.

## MetaMask Connect

This skill gives your agent context on MetaMask Connect and how to integrate its capabilities into
your dapp, including client setup, connections, sessions, and signing and sending transactions
across EVM and Solana.

```bash
npx skills add MetaMask/connect-monorepo
```

### Key capabilities

| Capability               | Description                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------- |
| Client setup             | Set up EVM, Solana, or multichain clients in browser JavaScript/TypeScript, React, or React Native.   |
| Connections and sessions | Connect, disconnect, manage the provider and session state, and switch chains.                        |
| Sign and send            | Sign messages (`personal_sign`, `eth_signTypedData_v4`, Solana `signMessage`) and send transactions.  |
| Wagmi and migration      | Use the Wagmi `metaMask()` connector, or migrate an existing `@metamask/sdk` integration.             |
| Headless mode            | Build Node.js CLI, server, or bot integrations that connect to the MetaMask mobile app via a QR code. |

## Next steps

- [Compare integration options](integration-options.md)
- [Get started with EVM](evm/index.mdx)
- [Get started with multichain](multichain/index.mdx)
- [Get started with Solana](solana/index.mdx)
