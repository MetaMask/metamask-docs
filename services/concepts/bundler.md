---
description: Infura supports ERC-4337 bundler methods.
sidebar_label: Bundler methods
---

# Bundler methods (ERC-4337)

Infura supports [ERC-4337](https://docs.erc4337.io/) bundler JSON-RPC methods that enable you to build
account abstraction (AA) experiences like gas sponsorship (paymasters), ERC-20 gas payment, session keys, or
batched actions using smart accounts.

Use the bundler JSON-RPC methods if your app or wallet uses smart accounts, if you use an externally
owned account (EOA) only, use standard Ethereum JSON-RPC methods.

:::info
AA moves validation and fee-payment logic into smart contracts. Instead of sending raw transactions
from an EOA, clients submit [user operations (UserOps)](#user-operations) to a bundler. The
bundler collects and simulates these operations, then executes them through a
[shared coordination contract (EntryPoint)](#entrypoint-contracts) on the network.

Smart accounts are smart contract-based wallets that serve as the foundation of AA. They embed custom
logic for authentication, authorization, network fee payment, nonce management and execution.
:::

:::info
Refer to the [official Pimlico documentation](https://docs.pimlico.io/references/bundler)
for more about the bundler methods and
[EntryPoint errors](https://docs.pimlico.io/references/bundler/entrypoint-errors#entrypoint-errors).
:::

## User operations

A user operation (UserOp) is an is an off-chain request that a bundler later includes onchain by
calling the EntryPoint. UserOps go to a dedicated mempool watched by bundlers instead of being broadcast
as raw L1/L2 transactions.

## EntryPoint contract

The EntryPoint contract is the shared coordination contract defined by ERC-4337. Bundlers call them to
validate and execute user operations (UserOps) from smart accounts. At a high level, an EntryPoint:

- Runs the ERC-4337 validation and execution.
- Enforces nonce and signature checks exposed by each smart account.
- Coordinates fee payment (including paymasters).
- Executes the requested calls onchain.

The bundler supports calling multiple EntryPoint versions (v0.6 and v0.7/v0.8) through the same set
of RPC methods, allowing it to handle both older and modern smart account schemes.

Use the [`eth_supportedEntryPoints`](../reference/ethereum/json-rpc-methods/bundler/eth_supportedentrypoints)
method to fetch the EntryPoint addresses supported by the bundler.

## Supported methods

The following bundler methods are available on the [supported networks](#supported-networks):

- [`eth_sendUserOperation`](../reference/ethereum/json-rpc-methods/bundler/eth_senduseroperation.mdx):
    Submits a user operation to be included onchain.
- [`eth_estimateUserOperationGas`](../reference/ethereum/json-rpc-methods/bundler/eth_estimateuseroperationgas):
    Simulates the user operation and estimates the appropriate gas limits.
- [`eth_getUserOperationReceipt`](../reference/ethereum/json-rpc-methods/bundler/eth_getuseroperationreceipt):
    Fetches the receipt of a user operation.
- [`eth_getUserOperationByHash`](../reference/ethereum/json-rpc-methods/bundler/eth_getuseroperationbyhash):
    Fetches the user operation by hash.
- [`eth_supportedEntryPoints`](../reference/ethereum/json-rpc-methods/bundler/eth_supportedentrypoints):
    Fetches the EntryPoint addresses supported by the bundler.
- [`pimlico_getUserOperationGasPrice`](../reference/ethereum/json-rpc-methods/bundler/pimlico_getuseroperationgasprice):
    Returns the gas prices that must be used for the user operation.
- [`pimlico_getUserOperationStatus`](../reference/ethereum/json-rpc-methods/bundler/pimlico_getuseroperationstatus):
    Returns the user operation status.
- [`pimlico_simulateAssetChanges`](../reference/ethereum/json-rpc-methods/bundler/pimlico_simulateassetchanges):
    Simulates a user operation to predict the asset changes it will cause.

## Supported networks

Bundler methods are active on the following networks:

- [Arbitrum](../reference/arbitrum/json-rpc-methods/bundler/index.md) (mainnet and Sepolia)
- [Avalanche](../reference/avalanche-c-chain/json-rpc-methods/bundler/index.md) (mainnet and Fuji)
- [Base](../reference/base/json-rpc-methods/bundler/index.md) (mainnet and Sepolia)
- [Blast](../reference/blast/json-rpc-methods/bundler/index.md) (mainnet and Sepolia)
- [BNB Smart Chain](../reference/bnb-smart-chain/json-rpc-methods/bundler/index.md) (mainnet and testnet)
- [Celo](../reference/celo/json-rpc-methods/bundler/index.md) (mainnet and Alfajores)
- [Ethereum](../reference/ethereum/json-rpc-methods/bundler/index.md) (mainnet and Sepolia)
- [Linea](../reference/linea/json-rpc-methods/bundler/index.md) (mainnet and Sepolia)
- [Mantle](../reference/mantle/json-rpc-methods/bundler/index.md) (mainnet and Sepolia)
- [opBNB](../reference/opbnb/json-rpc-methods/bundler/index.md) (mainnet)
- [Optimism](../reference/optimism/json-rpc-methods/bundler/index.md) (mainnet and Sepolia)
- [Polygon](../reference/polygon-pos/json-rpc-methods/bundler/index.md) (mainnet and Amoy)
- [Scroll](../reference/scroll/json-rpc-methods/bundler/index.md) (mainnet and Sepolia)
- [Sei](../reference/sei/json-rpc-methods/bundler/index.md) (mainnet and testnet)
- [Unichain](../reference/unichain/json-rpc-methods/bundler/index.md) (mainnet and Sepolia)

:::info
[Contact support](https://support.infura.io/) if you require bundler method activation on a network not listed here that’s currently supported by Pimlico.
:::