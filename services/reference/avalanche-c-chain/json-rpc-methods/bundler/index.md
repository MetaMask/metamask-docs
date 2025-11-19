---
title: Avalanche (C-Chain) bundler methods
sidebar_label: Bundler methods
sidebar_key: avalanche-c-chain-bundler-methods
description: Avalanche (C-Chain) bundler methods
---

Infura integrates with the Pimlico account abstraction bundler infrastructure, enabling
developers to access [ERC-4337](https://docs.erc4337.io/) smart account features.

The following [bundler methods](../../../../concepts/bundler.md) are supported on Avalanche mainnet
and Fuji:

- [`eth_sendUserOperation`](eth_senduseroperation.mdx):
    Submits a user operation to be included onchain.
- [`eth_estimateUserOperationGas`](eth_estimateuseroperationgas.mdx):
    Simulates the user operation and estimates the appropriate gas limits.
- [`eth_getUserOperationReceipt`](eth_getuseroperationreceipt.mdx):
    Fetches the receipt of a user operation.
- [`eth_getUserOperationByHash`](eth_getuseroperationbyhash.mdx):
    Fetches the user operation by hash.
- [`eth_supportedEntryPoints`](eth_supportedentrypoints.mdx):
    Fetches the EntryPoint addresses supported by the bundler.
- [`pimlico_getUserOperationGasPrice`](pimlico_getuseroperationgasprice.mdx):
    Returns the gas prices that must be used for the user operation.
- [`pimlico_getUserOperationStatus`](pimlico_getuseroperationstatus.mdx):
    Returns the user operation status.
- [`pimlico_simulateAssetChanges`](pimlico_simulateassetchanges.mdx):
    Simulates a user operation to predict the asset changes it will cause.