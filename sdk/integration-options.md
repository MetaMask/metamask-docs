---
sidebar_label: Integration options
description: Choose the right MetaMask Connect integration for your dapp.
keywords: [connect, sdk, integration, evm, solana, multichain, packages]
---

# Integration options

MetaMask Connect offers three integration paths. All share the same underlying transport and session
infrastructure, so you can start with the option that fits your dapp today and migrate later.

## Single-ecosystem

If your dapp targets a single ecosystem, use [`@metamask/connect-evm`](/sdk/evm) or [`@metamask/connect-solana`](/sdk/solana) to add MetaMask Connect to an existing dapp with minimal code changes.

- **EVM**: Provides an [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) compatible provider that
  works with `ethers.js`, `viem`, and `web3.js`.
- **Solana**: Provides a [Wallet Standard](https://github.com/wallet-standard/wallet-standard)
  compatible wallet that works with the Solana wallet adapter ecosystem.

## Multi-ecosystem

f your dapp supports both EVM and Solana, use [`@metamask/connect-evm`](/sdk/evm) and
[`@metamask/connect-solana`](/sdk/solana) together to
support both ecosystems while keeping familiar provider interfaces for each.

## Multichain (recommended)

Use [`@metamask/connect-multichain`](/sdk/multichain) to work directly with the
[Multichain API](https://github.com/ChainAgnostic/CAIPs/blob/main/CAIPs/caip-25.md). This uses
scopes and `wallet_invokeMethod` instead of per-chain RPC, and supports a single connection prompt
across all ecosystems. **This is the recommended long-term path.**

## Compare options

|                    | Single-ecosystem | Multi-ecosystem | Multichain |
| ------------------ | ---------------- | --------------- | ---------- |
| **Package**        | [`connect-evm`](/sdk/evm) or [`connect-solana`](/sdk/solana) | Both `connect-evm` and `connect-solana` | [`connect-multichain`](/sdk/multichain) |
| **Effort**         | Low — drop-in provider | Low — two providers | Medium — scope-based API |
| **EVM support**    | EIP-1193 provider | EIP-1193 provider | Via `wallet_invokeMethod` |
| **Solana support** | Wallet Standard | Wallet Standard | Via `wallet_invokeMethod` |
| **Cross-chain UX** | Single ecosystem | Separate connect per ecosystem | Single prompt for all ecosystems |
| **Sessions**       | Automatic | Automatic per-client | Full control |
| **Best for**       | Existing single-chain dapps | Dapps supporting EVM and Solana | Multichain-native dapps |

## Wallet connector libraries

If your dapp already uses a wallet connector library, adopting MetaMask Connect is straightforward.
In most cases, update a dependency or add a connector with no changes to your application code.

| Library        | Documentation                                                   |
| -------------- | --------------------------------------------------------------- |
| **Wagmi**      | [Quickstart](/sdk/evm/connect/quickstart/wagmi)           |
| **RainbowKit** | [Quickstart](/sdk/evm/connect/quickstart/rainbowkit) |
| **ConnectKit** | [Quickstart](/sdk/evm/connect/quickstart/connectkit) |
| **Web3Auth**   | [Quickstart](/sdk/evm/connect/quickstart/web3auth)     |
| **Dynamic**    | [Quickstart](/sdk/evm/connect/quickstart/dynamic)       |
