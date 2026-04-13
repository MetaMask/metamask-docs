---
title: 'MetaMask Connect Integration Options - Multichain, EVM, and Solana'
sidebar_label: Integration options
toc_max_heading_level: 2
description: Compare MetaMask Connect integration options including multichain, single-ecosystem EVM, and Solana clients to find the right fit for your dapp.
keywords:
  [
    connect,
    sdk,
    integration,
    evm,
    solana,
    multichain,
    packages,
    connect-evm,
    connect-solana,
    connect-multichain,
    single ecosystem,
    npm package,
    wallet integration guide,
  ]
---

# Integration options

MetaMask Connect offers three integration paths:

- **Multichain** (`@metamask/connect-multichain`) for connecting to EVM and Solana in a single session.
- **Single-ecosystem** (`@metamask/connect-evm` or `@metamask/connect-solana`) for drop-in per-chain providers.
- **Multi-ecosystem** (both single-ecosystem packages together) for dapps supporting both chains with familiar interfaces.

We recommend using the multichain client, which provides a single connection prompt across
all ecosystems.
If your dapp targets a single chain or you prefer per-chain provider interfaces, you can use the single-ecosystem or multi-ecosystem option.

All options share the same underlying transport and session infrastructure, so you can start with the option that fits your dapp today and migrate later.

## Multichain (recommended)

Use [`@metamask/connect-multichain`](multichain/index.md) to work directly with the
[Multichain API](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md). This uses
scopes and `wallet_invokeMethod` instead of per-chain RPC, and supports a single connection prompt
across all ecosystems.

## Single-ecosystem

If your dapp targets a single ecosystem, use [`@metamask/connect-evm`](evm/index.md) or [`@metamask/connect-solana`](solana/index.md) to add MetaMask Connect to an existing dapp with minimal code changes.

- **EVM**: Provides an [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) compatible provider that
  works with `ethers.js`, `viem`, and `web3.js`.
- **Solana**: Provides a [Wallet Standard](https://github.com/wallet-standard/wallet-standard)
  compatible wallet that works with the Solana wallet adapter ecosystem.

## Multi-ecosystem

If your dapp supports both EVM and Solana, use [`@metamask/connect-evm`](evm/index.md) and
[`@metamask/connect-solana`](solana/index.md) together to
support both ecosystems while keeping familiar provider interfaces for each.

## Compare options

|                    | Multichain                                  | Single-ecosystem                                                     | Multi-ecosystem                         |
| ------------------ | ------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------- |
| **Package**        | [`connect-multichain`](multichain/index.md) | [`connect-evm`](evm/index.md) or [`connect-solana`](solana/index.md) | Both `connect-evm` and `connect-solana` |
| **Effort**         | Medium (scope-based API)                    | Low (drop-in provider)                                               | Low (two providers)                     |
| **EVM support**    | Via `wallet_invokeMethod`                   | EIP-1193 provider                                                    | EIP-1193 provider                       |
| **Solana support** | Via `wallet_invokeMethod`                   | Wallet Standard                                                      | Wallet Standard                         |
| **Cross-chain UX** | Single prompt for all ecosystems            | Single ecosystem                                                     | Separate connect per ecosystem          |
| **Sessions**       | Full control                                | Automatic                                                            | Automatic per-client                    |
| **Best for**       | Multichain-native dapps                     | Existing single-chain dapps                                          | Dapps supporting EVM and Solana         |

<!-- ## Wallet connector libraries

If your dapp already uses a wallet connector library, adopting MetaMask Connect is straightforward.
In most cases, update a dependency or add a connector with no changes to your application code.

| Library | Ecosystem | Documentation |
| --- | --- | --- |
| [Wagmi](https://wagmi.sh) | EVM | [Quickstart](/metamask-connect/evm/quickstart/wagmi) |
| [RainbowKit](https://www.rainbowkit.com) | EVM | [Quickstart](/metamask-connect/evm/quickstart/rainbowkit) |
| [ConnectKit](https://docs.family.co/connectkit) | EVM | [Quickstart](/metamask-connect/evm/quickstart/connectkit) |
| [Web3Auth](https://web3auth.io) | EVM, Solana | [EVM Quickstart](/metamask-connect/evm/quickstart/web3auth), [Solana Quickstart](/metamask-connect/solana/quickstart/web3auth) |
| [Dynamic](https://www.dynamic.xyz) | EVM, Solana | [EVM Quickstart](/metamask-connect/evm/quickstart/dynamic), [Solana Quickstart](/metamask-connect/solana/quickstart/dynamic) |
| [Wallet Adapter](https://github.com/solana-labs/wallet-adapter) | Solana | [Guide](/metamask-connect/solana/guides/use-wallet-adapter) |
| [Framework Kit](https://www.framework-kit.com/) | Solana | [Guide](/metamask-connect/solana/guides/use-framework-kit) | -->

## Frequently asked questions

### Which integration option should I choose?

Choose **multichain** (`@metamask/connect-multichain`) if your dapp needs to connect to both EVM and Solana in a single session with one approval prompt.
Choose **single-ecosystem** (`@metamask/connect-evm` or `@metamask/connect-solana`) if your dapp targets one chain and you want a drop-in provider compatible with existing libraries.
Choose **multi-ecosystem** (both single-ecosystem packages) if you want per-chain providers for both EVM and Solana.

### Can I migrate between integration options later?

Yes. All three options share the same underlying transport and session infrastructure, so you can start with a single-ecosystem client and migrate to multichain later without changing your backend or connection logic.
The migration involves updating your client initialization code and adopting scope-based RPC routing.

### Does MetaMask Connect work with wagmi, ethers.js, and viem?

Yes. The EVM client (`@metamask/connect-evm`) provides an EIP-1193 compatible provider that works directly with viem's `custom` transport, ethers.js `BrowserProvider`, and web3.js `Web3` constructor.
The Solana client provides a Wallet Standard compatible wallet that works with the Solana Wallet Adapter ecosystem.
