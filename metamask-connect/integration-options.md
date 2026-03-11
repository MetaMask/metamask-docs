---
sidebar_label: Integration options
description: Choose the right MetaMask Connect integration for your dapp.
keywords: [connect, sdk, integration, evm, solana, multichain, packages]
---

# Integration options

MetaMask Connect lets you add wallet connectivity to your dapp.
The recommended approach is the Multichain client, which provides a single connection prompt across
all ecosystems. If your dapp targets a single chain or you prefer per-chain provider interfaces,
single-ecosystem and multi-ecosystem options are also available.

All options share the same underlying transport and session infrastructure, so you can start with the
option that fits your dapp today and migrate later.

## Multichain (recommended)

Use [`@metamask/connect-multichain`](/metamask-connect/multichain) to work directly with the
[Multichain API](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md). This uses
scopes and `wallet_invokeMethod` instead of per-chain RPC, and supports a single connection prompt
across all ecosystems.

## Single-ecosystem

If your dapp targets a single ecosystem, use [`@metamask/connect-evm`](/metamask-connect/evm) or [`@metamask/connect-solana`](/metamask-connect/solana) to add MetaMask Connect to an existing dapp with minimal code changes.

- **EVM**: Provides an [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) compatible provider that
  works with `ethers.js`, `viem`, and `web3.js`.
- **Solana**: Provides a [Wallet Standard](https://github.com/wallet-standard/wallet-standard)
  compatible wallet that works with the Solana wallet adapter ecosystem.

## Multi-ecosystem

If your dapp supports both EVM and Solana, use [`@metamask/connect-evm`](/metamask-connect/evm) and
[`@metamask/connect-solana`](/metamask-connect/solana) together to
support both ecosystems while keeping familiar provider interfaces for each.

## Compare options

|                    | Multichain                                           | Single-ecosystem                                                                       | Multi-ecosystem                         |
| ------------------ | ---------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------------- |
| **Package**        | [`connect-multichain`](/metamask-connect/multichain) | [`connect-evm`](/metamask-connect/evm) or [`connect-solana`](/metamask-connect/solana) | Both `connect-evm` and `connect-solana` |
| **Effort**         | Medium — scope-based API                             | Low — drop-in provider                                                                 | Low — two providers                     |
| **EVM support**    | Via `wallet_invokeMethod`                            | EIP-1193 provider                                                                      | EIP-1193 provider                       |
| **Solana support** | Via `wallet_invokeMethod`                            | Wallet Standard                                                                        | Wallet Standard                         |
| **Cross-chain UX** | Single prompt for all ecosystems                     | Single ecosystem                                                                       | Separate connect per ecosystem          |
| **Sessions**       | Full control                                         | Automatic                                                                              | Automatic per-client                    |
| **Best for**       | Multichain-native dapps                              | Existing single-chain dapps                                                            | Dapps supporting EVM and Solana         |

## Wallet connector libraries

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
| [Framework Kit](https://www.framework-kit.com/) | Solana | [Guide](/metamask-connect/solana/guides/use-framework-kit) |
