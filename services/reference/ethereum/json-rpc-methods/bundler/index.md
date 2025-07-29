---
title: Ethereum bundler methods
sidebar_label: Bundler methods
description: Ethereum bundler methods
---

Infura provides seamless integration with Pimlico's account abstraction bundler infrastructure, enabling
developers to access ERC‑4337 smart account features.
Infura transparently routes supported smart‑account methods to Pimlico's backend, allowing
teams to construct, validate, simulate, and submit user‑operations without needing to directly call
Pimlico endpoints or manage bundler infrastructure.

The following bundler methods are supported on Ethereum Mainnet and Sepolia:

- [`eth_sendUserOperation`](./eth_senduseroperation): Submits a user operation to be included onchain.
- [`eth_estimateUserOperationGas`](./eth_estimateuseroperationgas): Simulates the user operation and estimates the appropriate gas limits.
- [`eth_getUserOperationReceipt`](./eth_getuseroperationreceipt): Fetches the receipt of a user operation.
- [`eth_getUserOperationByHash`](./eth_getuseroperationbyhash): Fetches the user operation by hash.
- [`eth_supportedEntryPoints`](./eth_supportedentrypoints): Fetches the entry point addresses supported by the bundler.
- [`pimlico_getUserOperationGasPrice`](./pimlico_getuseroperationgasprice): Returns the gas prices that must be used for the user operation.
- [`pimlico_getUserOperationStatus`](./pimlico_getuseroperationstatus): Returns the user operation status.
- [`pimlico_simulateAssetChanges`](./pimlico_simulateassetchanges): Simulates a user operation to predict the asset changes it will cause.
