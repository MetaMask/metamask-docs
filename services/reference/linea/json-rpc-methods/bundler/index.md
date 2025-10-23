---
title: Linea bundler methods
sidebar_label: Bundler methods
sidebar_key: linea-bundler-methods
description: Linea bundler methods
---

Infura integrates with the Pimlico account abstraction bundler infrastructure, enabling
developers to access [ERC-4337](https://docs.erc4337.io/) smart account features.

The following [bundler methods](../../../../concepts/bundler.md) are supported on Linea mainnet
and Sepolia:

- [`eth_sendUserOperation`](./eth_senduseroperation):
    Submits a user operation to be included onchain.
- [`eth_estimateUserOperationGas`](./eth_estimateuseroperationgas):
    Simulates the user operation and estimates the appropriate gas limits.
- [`eth_getUserOperationReceipt`](./eth_getuseroperationreceipt):
    Fetches the receipt of a user operation.
- [`eth_getUserOperationByHash`](./eth_getuseroperationbyhash):
    Fetches the user operation by hash.
- [`eth_supportedEntryPoints`](./eth_supportedentrypoints):
    Fetches the EntryPoint addresses supported by the bundler.
- [`pimlico_getUserOperationGasPrice`](./pimlico_getuseroperationgasprice):
    Returns the gas prices that must be used for the user operation.
- [`pimlico_getUserOperationStatus`](./pimlico_getuseroperationstatus):
    Returns the user operation status.
- [`pimlico_simulateAssetChanges`](./pimlico_simulateassetchanges):
    Simulates a user operation to predict the asset changes it will cause.